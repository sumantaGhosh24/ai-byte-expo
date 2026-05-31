import { useCallback } from "react";
import { useSignIn } from "@clerk/expo";
import { type Href, useRouter } from "expo-router";
import { Pressable, View, Text } from "react-native";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Toast from "react-native-toast-message";

import Input from "../ui/input";
import Button from "../ui/button";
import AuthLayout from "./auth-layout";

const verifySchema = z.object({
  code: z
    .string()
    .min(6, "Verification code must be 6 digits")
    .max(6, "Verification code must be 6 digits"),
});

type VerifyFormData = z.infer<typeof verifySchema>;

const SignInVerify = () => {
  const { signIn, errors, fetchStatus } = useSignIn();

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
        await signIn.mfa.verifyEmailCode({ code: values.code });

        if (signIn.status === "complete") {
          await signIn.finalize({
            navigate: ({ session, decorateUrl }) => {
              if (session?.currentTask) {
                return;
              }

              Toast.show({
                type: "success",
                text1: "Success!",
                text2: "You are signed in",
              });

              router.replace(decorateUrl("/onboarding") as Href);
            },
          });
        } else {
          Toast.show({
            type: "error",
            text1: "Error!",
            text2: "Sign-in attempt not complete",
          });
        }
      } catch {
        Toast.show({ type: "error", text1: "Error!", text2: "Failed to sign-in" });
      }
    },
    [router, signIn]
  );

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
        title="Verify"
        loading={fetchStatus === "fetching"}
        onPress={handleSubmit(handleVerify)}
        fullWidth
      />
      <View className="gap-3">
        <Pressable className="items-center" onPress={() => signIn?.mfa.sendEmailCode()}>
          <Text className="text-sm font-medium text-primary">I need a new code</Text>
        </Pressable>
        <Pressable className="items-center" onPress={() => signIn?.reset()}>
          <Text className="text-sm font-medium text-primary">Start over</Text>
        </Pressable>
      </View>
    </AuthLayout>
  );
};

export default SignInVerify;
