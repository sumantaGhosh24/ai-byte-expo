export const APP_URL = "https://aibyte.expo.app";

export const createCourseShareLink = (courseId: string) => {
  return `${APP_URL}/course/${courseId}`;
};
