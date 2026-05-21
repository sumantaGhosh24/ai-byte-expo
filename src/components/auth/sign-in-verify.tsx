import { useSignIn } from "@clerk/expo";
import { type Href, useRouter } from "expo-router";
import { Pressable, View, Text } from "react-native";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Toast from "react-native-toast-message";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import Card from "@/components/ui/card";
import Input from "@/components/ui/input";
import Button from "@/components/ui/button";

import ToggleThemeIcon from "../global/toggle-theme-icon";

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

  const handleVerify = async (values: VerifyFormData) => {
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
          text1: "Error!",
          text2: "Sign-in attempt not complete",
        });
      }
    } catch {
      Toast.show({ type: "error", text1: "Error!", text2: "Failed to sign-in" });
    }
  };

  return (
    <KeyboardAwareScrollView
      enableOnAndroid={true}
      extraScrollHeight={20}
      contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
    >
      <View className="bg-background flex-1 px-5 py-8">
        <Card className="gap-5">
          <View className="flex flex-row items-center justify-between">
            <View className="gap-2">
              <Text className="text-2xl font-bold text-neutral-900 dark:text-white">
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
            title="Verify"
            loading={fetchStatus === "fetching"}
            onPress={handleSubmit(handleVerify)}
            fullWidth
          />
          <View className="gap-3">
            <Pressable
              className="items-center"
              onPress={() => signIn?.mfa.sendEmailCode()}
            >
              <Text className="text-sm font-medium text-primary">I need a new code</Text>
            </Pressable>
            <Pressable className="items-center" onPress={() => signIn?.reset()}>
              <Text className="text-sm font-medium text-primary">Start over</Text>
            </Pressable>
          </View>
        </Card>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default SignInVerify;
