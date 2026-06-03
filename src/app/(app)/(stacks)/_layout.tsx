import { Stack } from "expo-router";

import HeaderBackButton from "@/components/layout/header-back-button";

const StackLayout = () => {
  return (
    <>
      <Stack
        screenOptions={{
          headerShadowVisible: false,
          headerLeft: () => <HeaderBackButton />,
          headerBackVisible: false,
          headerTintColor: "#1447e6",
          headerTitleStyle: { fontWeight: "700" },
          animation: "slide_from_right",
        }}
      >
        <Stack.Screen name="achievements" options={{ title: "My Achievements" }} />
        <Stack.Screen name="bookmarks" options={{ title: "My Bookmarks" }} />
        <Stack.Screen name="my-courses" options={{ title: "My Courses" }} />
        <Stack.Screen name="my-reviews" options={{ title: "My Reviews" }} />
        <Stack.Screen name="my-quiz-attempts" options={{ title: "My Quiz Attempts" }} />
        <Stack.Screen name="settings/account" options={{ title: "Update Account" }} />
        <Stack.Screen
          name="settings/preferences"
          options={{ title: "Profile Preferences" }}
        />
        <Stack.Screen name="course/[id]/index" options={{ title: "Course" }} />
        <Stack.Screen name="course/[id]/lessons" options={{ title: "Lessons" }} />
        <Stack.Screen name="course/[id]/quizzes" options={{ title: "Quizzes" }} />
        <Stack.Screen
          name="course/[id]/reviews"
          options={{
            title: "Reviews",
            presentation: "formSheet",
            animation: "slide_from_bottom",
            sheetAllowedDetents: [0.5, 0.9],
            sheetGrabberVisible: true,
            headerShown: false,
          }}
        />
        <Stack.Screen name="lesson/[id]" options={{ title: "Lesson" }} />
        <Stack.Screen name="quiz/[id]" options={{ title: "Quiz" }} />
        <Stack.Screen name="quiz/result" options={{ title: "Quiz Attempts" }} />
        <Stack.Screen name="quiz/attempt/[id]" options={{ title: "Quiz Attempt" }} />
      </Stack>
    </>
  );
};

export default StackLayout;
