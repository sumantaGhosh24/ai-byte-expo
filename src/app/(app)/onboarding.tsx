import { useEffect } from "react";
import { router } from "expo-router";

import { useProfile } from "@/hooks/use-profile";
import { useAuthStore } from "@/store/auth-store";
import OnboardingSkeleton from "@/components/onboarding/onboarding-skeleton";
import OnboardingForm from "@/components/onboarding/onboarding-form";

const OnboardingScreen = () => {
  const { data, isLoading } = useProfile();

  const { setUserHasCompletedOnboarding } = useAuthStore();

  useEffect(() => {
    if (!data?.user.profile) {
      return;
    }

    if (data.user.profile.onboardingCompleted) {
      setUserHasCompletedOnboarding();

      router.replace("/home");
    }
  }, [data, setUserHasCompletedOnboarding]);

  if (isLoading) {
    return <OnboardingSkeleton />;
  }

  if (data?.user.profile?.onboardingCompleted) {
    return null;
  }

  return <OnboardingForm profile={data?.user.profile} />;
};

export default OnboardingScreen;
