import { useCallback } from "react";
import { Alert } from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";

export function usePreventExitQuiz(enabled: boolean) {
  const navigation = useNavigation();

  useFocusEffect(
    useCallback(() => {
      if (!enabled) return;

      const unsubscribe = navigation.addListener("beforeRemove", (e) => {
        e.preventDefault();

        Alert.alert("Leave Quiz?", "Your current progress will be lost.", [
          {
            text: "Continue",
            style: "cancel",
          },
          {
            text: "Leave",
            style: "destructive",
            onPress: () => navigation.dispatch(e.data.action),
          },
        ]);
      });

      return unsubscribe;
    }, [enabled, navigation])
  );
}
