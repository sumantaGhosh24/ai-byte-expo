import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth, useSignUp } from "@clerk/expo";
import { Link } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import { Text, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Toast from "react-native-toast-message";
import { z } from "zod";

import SignUpVerify from "@/components/auth/sign-up-verify";
import Button from "@/components/ui/button";
import Card from "@/components/ui/card";
import Input from "@/components/ui/input";
import ToggleThemeIcon from "@/components/global/toggle-theme-icon";

const signUpSchema = z.object({
  emailAddress: z.string().min(1, "Please enter a valid email"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(8, "Password must be at least 8 characters"),
});

type SignUpFormData = z.infer<typeof signUpSchema>;

const SignUpScreen = () => {
  const { signUp, errors, fetchStatus } = useSignUp();

  const { isSignedIn } = useAuth();

  const {
    control,
    handleSubmit,
    formState: { errors: formErrors },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      emailAddress: "",
      password: "",
    },
  });

  const handleSignUp = async (values: SignUpFormData) => {
    try {
      const { error } = await signUp.password({
        emailAddress: values.emailAddress,
        password: values.password,
      });

      if (error) {
        Toast.show({
          type: "error",
          text1: "Sign up failed",
          text2: error.longMessage || "Something went wrong",
        });

        return;
      }

      await signUp.verifications.sendEmailCode();

      Toast.show({
        type: "success",
        text1: "Verification code sent",
        text2: "Please check your email",
      });
    } catch {
      Toast.show({
        type: "error",
        text1: "Error!",
        text2: "Failed to create account",
      });
    }
  };

  if (signUp.status === "complete" || isSignedIn) {
    return null;
  }

  if (
    signUp.status === "missing_requirements" &&
    signUp.unverifiedFields.includes("email_address") &&
    signUp.missingFields.length === 0
  ) {
    return <SignUpVerify />;
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
                Create account
              </Text>
              <Text className="text-sm text-neutral-500 dark:text-neutral-400">
                Sign up to get started with your account.
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
                  formErrors.emailAddress?.message ||
                  errors?.fields?.emailAddress?.message
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
                placeholder="Create a password"
                secureTextEntry
                error={formErrors.password?.message || errors?.fields?.password?.message}
              />
            )}
          />
          <Button
            title="Create Account"
            loading={fetchStatus === "fetching"}
            onPress={handleSubmit(handleSignUp)}
            fullWidth
          />
          <View className="flex-row items-center justify-center gap-1 pt-2">
            <Text className="text-sm text-neutral-500 dark:text-neutral-400">
              Already have an account?
            </Text>
            <Link href="/sign-in" asChild>
              <Text className="text-sm font-semibold text-primary">Sign in</Text>
            </Link>
          </View>
          <View nativeID="clerk-captcha" />
        </Card>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default SignUpScreen;
