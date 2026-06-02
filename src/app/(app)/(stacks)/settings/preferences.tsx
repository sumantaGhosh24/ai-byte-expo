import { useProfile } from "@/hooks/use-profile";
import OnboardingSkeleton from "@/components/onboarding/onboarding-skeleton";
import OnboardingForm from "@/components/onboarding/onboarding-form";

const PreferencesScreen = () => {
  const { data, isLoading } = useProfile();

  if (isLoading) {
    return <OnboardingSkeleton />;
  }

  return <OnboardingForm profile={data?.user?.profile} header={false} />;
};

export default PreferencesScreen;
