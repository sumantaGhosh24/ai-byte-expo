import { memo } from "react";
import { Text, View } from "react-native";

import Card from "../ui/card";
import ProgressBar from "../ui/progress";
import Button from "../ui/button";

type EnrollProgressCardProps = {
  enroll:
    | {
        finishedLessons: number;
        completed: boolean;
      }
    | undefined;
  progress: number;
  lessonsCount: number;
};

const EnrollProgressCard = memo(
  ({ enroll, progress, lessonsCount }: EnrollProgressCardProps) => {
    if (!enroll) return null;

    return (
      <Card radius="xl" padding="lg" shadow="md">
        <View className="gap-4">
          <View>
            <Text className="text-lg font-bold dark:text-white">Your Progress</Text>
            <Text className="text-neutral-500">
              {enroll.finishedLessons} of {lessonsCount} lessons completed
            </Text>
          </View>
          <ProgressBar progress={progress} showLabel />
          {enroll.completed ? (
            <Button title="Course Completed 🎉" variant="success" disabled />
          ) : (
            <Button title="Keep Learning" disabled />
          )}
        </View>
      </Card>
    );
  }
);

EnrollProgressCard.displayName = "EnrollProgressCard";

export default EnrollProgressCard;
