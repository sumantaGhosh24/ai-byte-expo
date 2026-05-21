import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth, useSignUp } from "@clerk/expo";
import { type Href, useRouter } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import { Pressable, Text, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Toast from "react-native-toast-message";
import { z } from "zod";

import Button from "@/components/ui/button";
import Card from "@/components/ui/card";
import Input from "@/components/ui/input";

import ToggleThemeIcon from "../global/toggle-theme-icon";

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

  const handleVerify = async (values: VerifyFormData) => {
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
  };

  if (signUp.status === "complete" || isSignedIn) {
    return null;
  }

  return (
    <KeyboardAwareScrollView
      enableOnAndroid
      extraScrollHeight={20}
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
    >
      <View className="px-5 py-8">
        <Card className="gap-5">
          <View className="flex flex-row items-center justify-between">
            <View className="gap-2">
              <Text className="text-3xl font-bold text-neutral-900 dark:text-white">
                Verify your account
              </Text>
              <Text className="text-sm text-neutral-500 dark:text-neutral-400">
                Enter the verification code sent to your email.
              </Text>
            </View>
            <ToggleThemeIcon />
          </View>
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
        </Card>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default SignUpVerify;
