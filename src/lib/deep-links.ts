import { router } from "expo-router";

export const APP_URL = "https://aibyte--nlbvp9bhca.expo.app";

export const createCourseShareLink = (courseId: string) => {
  return `${APP_URL}/course/${courseId}`;
};

export function navigateFromNotification(data: Record<string, any>) {
  switch (data.type) {
    case "course":
      if (data.courseId) {
        router.push(`/course/${data.courseId}`);
        return;
      }
      break;

    case "lesson":
      if (data.lessonId) {
        router.push(`/lesson/${data.lessonId}`);
        return;
      }
      break;

    case "quiz":
      if (data.quizId) {
        router.push(`/quiz/${data.quizId}`);
        return;
      }
      break;
  }

  router.push(`/notifications`);
}
