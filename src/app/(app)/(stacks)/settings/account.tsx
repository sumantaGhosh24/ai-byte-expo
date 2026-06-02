import { useProfile } from "@/hooks/use-profile";
import ProfileForm from "@/components/profile/profile-form";
import ProfileFormSkeleton from "@/components/profile/profile-form-skeleton";

const AccountScreen = () => {
  const { data, isLoading } = useProfile();

  if (isLoading) {
    return <ProfileFormSkeleton />;
  }

  return <ProfileForm profile={data?.user?.profile} />;
};

export default AccountScreen;
