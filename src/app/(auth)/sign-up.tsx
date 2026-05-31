import { useCallback, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth, useSignUp } from "@clerk/expo";
import { Link, router } from "expo-router";
import { Checkbox } from "expo-checkbox";
import { Controller, useForm } from "react-hook-form";
import { Text, View } from "react-native";
import Toast from "react-native-toast-message";
import { z } from "zod";

import SignUpVerify from "@/components/auth/sign-up-verify";
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import AuthLayout from "@/components/auth/auth-layout";
import GoogleSignInButton from "@/components/auth/google-sign-in-button";

const signUpSchema = z.object({
  emailAddress: z.string().min(1, "Please enter a valid email"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(8, "Password must be at least 8 characters"),
});

type SignUpFormData = z.infer<typeof signUpSchema>;

const SignUpScreen = () => {
  const [isTermsChecked, setTermsChecked] = useState(false);

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

  const handleSignUp = useCallback(
    async (values: SignUpFormData) => {
      try {
        if (!isTermsChecked) {
          Toast.show({
            type: "error",
            text1: "Sign up failed",
            text2: "Please accept the terms and conditions",
          });

          return;
        }

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
    },
    [isTermsChecked, signUp]
  );

  const handleLinkPress = (linkType: "terms" | "privacy") => {
    router.push(linkType === "terms" ? "/terms" : "/privacy");
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
    <AuthLayout
      title="Create account"
      description="Sign up to get started with your account"
    >
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
              formErrors.emailAddress?.message || errors?.fields?.emailAddress?.message
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
      <View className="flex-row items-center gap-3">
        <View className="h-px flex-1 bg-neutral-200 dark:bg-neutral-800" />
        <Text className="text-xs text-neutral-400">OR</Text>
        <View className="h-px flex-1 bg-neutral-200 dark:bg-neutral-800" />
      </View>
      <GoogleSignInButton />
      <View className="flex-row items-center">
        <Checkbox
          value={isTermsChecked}
          onValueChange={(newValue) => {
            setTermsChecked(newValue);
          }}
          color={isTermsChecked ? "#155dfc" : undefined}
          className="mr-3"
        />
        <Text className="text-md font-Poppins_500Medium flex-1 flex-wrap text-gray-400">
          I agree to the{" "}
          <Text
            className="text-black underline dark:text-white"
            onPress={() => handleLinkPress("terms")}
          >
            Terms of Service
          </Text>{" "}
          and acknowledge Captions&apos;{" "}
          <Text
            className="text-black underline dark:text-white"
            onPress={() => handleLinkPress("privacy")}
          >
            Privacy Policy
          </Text>
        </Text>
      </View>
      <View className="flex-row items-center justify-center gap-1 pt-2">
        <Text className="text-sm text-neutral-500 dark:text-neutral-400">
          Already have an account?
        </Text>
        <Link href="/sign-in" asChild>
          <Text className="text-sm font-semibold text-primary">Sign in</Text>
        </Link>
      </View>
      <View nativeID="clerk-captcha" />
    </AuthLayout>
  );
};

export default SignUpScreen;
