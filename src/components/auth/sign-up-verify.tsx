import { useCallback } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth, useSignUp } from "@clerk/expo";
import { type Href, useRouter } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import { Pressable, Text } from "react-native";
import Toast from "react-native-toast-message";
import { z } from "zod";

import Button from "../ui/button";
import Input from "../ui/input";
import AuthLayout from "./auth-layout";

const verifySchema = z.object({
  code: z
    .string()
    .min(6, "Verification code must be 6 digits")
    .max(6, "Verification code must be 6 digits"),
});

type VerifyFormData = z.infer<typeof verifySchema>;

const SignUpVerify = () => {
  const { signUp, errors, fetchStatus } = useSignUp();

  const { isSignedIn } = useAuth();

  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { errors: formErrors },
  } = useForm<VerifyFormData>({
    resolver: zodResolver(verifySchema),
    defaultValues: {
      code: "",
    },
  });

  const handleVerify = useCallback(
    async (values: VerifyFormData) => {
      try {
        await signUp.verifications.verifyEmailCode({
          code: values.code,
        });

        if (signUp.status === "complete") {
          await signUp.finalize({
            navigate: ({ session, decorateUrl }) => {
              if (session?.currentTask) {
                return;
              }

              Toast.show({
                type: "success",
                text1: "Success!",
                text2: "Your account has been verified",
              });

              const url = decorateUrl("/onboarding");

              if (url.startsWith("http")) {
                window.location.href = url;
              } else {
                router.push(url as Href);
              }
            },
          });
        } else {
          Toast.show({
            type: "error",
            text1: "Error",
            text2: "Verification not complete",
          });
        }
      } catch {
        Toast.show({
          type: "error",
          text1: "Verification failed",
          text2: "Please try again",
        });
      }
    },
    [router, signUp]
  );

  if (signUp.status === "complete" || isSignedIn) {
    return null;
  }

  return (
    <AuthLayout
      title="Verify your account"
      description="Enter the verification code sent to your email"
    >
      <Controller
        control={control}
        name="code"
        render={({ field: { onChange, value } }) => (
          <Input
            label="Verification Code"
            value={value}
            onChangeText={onChange}
            keyboardType="numeric"
            placeholder="Enter 6-digit code"
            maxLength={6}
            error={formErrors.code?.message || errors?.fields?.code?.message}
          />
        )}
      />
      <Button
        title="Verify Account"
        loading={fetchStatus === "fetching"}
        onPress={handleSubmit(handleVerify)}
        fullWidth
      />
      <Pressable
        className="items-center pt-2"
        onPress={() => signUp.verifications.sendEmailCode()}
      >
        <Text className="text-sm font-medium text-primary">I need a new code</Text>
      </Pressable>
    </AuthLayout>
  );
};

export default SignUpVerify;
