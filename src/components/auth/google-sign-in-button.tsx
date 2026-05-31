import { memo, useCallback } from "react";
import { useSSO } from "@clerk/expo";
import { useRouter } from "expo-router";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Toast from "react-native-toast-message";

import Button from "../ui/button";

const GoogleSignInButton = memo(() => {
  const { startSSOFlow } = useSSO();

  const router = useRouter();

  const handleGoogleSignIn = useCallback(async () => {
    try {
      const { createdSessionId, setActive } = await startSSOFlow({
        strategy: "oauth_google",
      });

      if (!createdSessionId) return;

      await setActive?.({
        session: createdSessionId,
      });

      Toast.show({
        type: "success",
        text1: "Welcome!",
        text2: "Successfully signed in",
      });

      router.replace("/onboarding");
    } catch {
      Toast.show({
        type: "error",
        text1: "Google Sign In Failed",
      });
    }
  }, [router, startSSOFlow]);

  return (
    <Button
      variant="outline"
      title="Continue with Google"
      onPress={handleGoogleSignIn}
      leftIcon={<FontAwesome name="chrome" size={24} color="#1447e6" />}
      fullWidth
    />
  );
});

GoogleSignInButton.displayName = "GoogleSignInButton";

export default GoogleSignInButton;
