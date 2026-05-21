import { zodResolver } from "@hookform/resolvers/zod";
import { useSignIn } from "@clerk/expo";
import { type Href, Link, useRouter } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import { Text, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Toast from "react-native-toast-message";
import { z } from "zod";

import SignInVerify from "@/components/auth/sign-in-verify";
import Button from "@/components/ui/button";
import Card from "@/components/ui/card";
import Input from "@/components/ui/input";
import ToggleThemeIcon from "@/components/global/toggle-theme-icon";

const signInSchema = z.object({
  emailAddress: z.string().min(1, "Please enter a valid email"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(8, "Password must be at least 8 characters"),
});

type SignInFormData = z.infer<typeof signInSchema>;

const SignInScreen = () => {
  const { signIn, errors, fetchStatus } = useSignIn();

  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { errors: formErrors },
  } = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),

    defaultValues: {
      emailAddress: "",
      password: "",
    },
  });

  const handleSignIn = async (values: SignInFormData) => {
    try {
      const { error } = await signIn.password({
        emailAddress: values.emailAddress,
        password: values.password,
      });

      if (error) {
        Toast.show({
          type: "error",
          text1: "Sign in failed",
          text2: error.longMessage || "Invalid credentials",
        });

        return;
      }

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
      } else if (signIn.status === "needs_client_trust") {
        const emailCodeFactor = signIn.supportedSecondFactors.find(
          (factor) => factor.strategy === "email_code"
        );

        if (emailCodeFactor) {
          await signIn.mfa.sendEmailCode();

          Toast.show({
            type: "success",
            text1: "Verification code sent",
            text2: "Check your email",
          });
        }
      } else {
        Toast.show({
          type: "error",
          text1: "Error",
          text2: "Sign-in attempt not complete",
        });
      }
    } catch {
      Toast.show({
        type: "error",
        text1: "Error!",
        text2: "Failed to sign in",
      });
    }
  };

  if (signIn.status === "needs_client_trust") {
    return <SignInVerify />;
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
                Welcome back
              </Text>
              <Text className="text-sm text-neutral-500 dark:text-neutral-400">
                Sign in to continue to your account.
              </Text>
            </View>
            <ToggleThemeIcon />
          </View>
          <Controller
            control={control}
            name="emailAddress"
            render={({ field: { onChange, value } }) => (
              <Input
                label="Email Address"
                value={value}
                onChangeText={onChange}
                placeholder="Enter your email"
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                error={
                  formErrors.emailAddress?.message || errors?.fields?.identifier?.message
                }
              />
            )}
          />
          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, value } }) => (
              <Input
                label="Password"
                value={value}
                onChangeText={onChange}
                placeholder="Enter your password"
                secureTextEntry
                error={formErrors.password?.message || errors?.fields?.password?.message}
              />
            )}
          />
          <Button
            title="Continue"
            loading={fetchStatus === "fetching"}
            onPress={handleSubmit(handleSignIn)}
            fullWidth
          />
          <View className="flex-row items-center justify-center gap-1 pt-2">
            <Text className="text-sm text-neutral-500 dark:text-neutral-400">
              Don&apos;t have an account?
            </Text>
            <Link href="/sign-up" asChild>
              <Text className="text-sm font-semibold text-primary">Sign up</Text>
            </Link>
          </View>
        </Card>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default SignInScreen;
