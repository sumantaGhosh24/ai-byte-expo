import { memo, useCallback, useMemo } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
import { Text, View, Pressable, useWindowDimensions, ScrollView } from "react-native";
import { zodResolver } from "@hookform/resolvers/zod";
import Animated, { FadeInDown, LinearTransition } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import {
  Brain,
  Code,
  Sparkles,
  Database,
  Trophy,
  Target,
  Flame,
  BookOpen,
  Sun,
  CloudSun,
  Sunset,
  Moon,
  TrendingUp,
  Send,
} from "lucide-react-native";

import { useUpdateProfilePreferences } from "@/hooks/use-profile";
import {
  ProfilePreferencesFormValues,
  profilePreferencesSchema,
} from "@/schemas/profile.schema";
import { Profile } from "@/types/profile.type";

import Button, { getButtonIconColor } from "../ui/button";
import Badge, { getBadgeIconColor } from "../ui/badge";
import Card from "../ui/card";
import SettingSwitch from "../ui/setting-switch";
import ProgressBar from "../ui/progress";

type ProfileProps = {
  profile?: Profile | null;
  header?: boolean;
};

const INTERESTS = [
  { id: "ai", label: "Artificial Intelligence", icon: Brain },
  { id: "python", label: "Python", icon: Code },
  { id: "javascript", label: "JavaScript", icon: Sparkles },
  { id: "typescript", label: "TypeScript", icon: Database },
] as const;

const GOALS = [
  { id: "complete_course", label: "Complete Courses", icon: Trophy },
  { id: "practice_daily", label: "Practice Daily", icon: Flame },
  { id: "achieve_streak", label: "Build Streaks", icon: Target },
  { id: "finish_lesson", label: "Finish Lessons", icon: BookOpen },
] as const;

const REMINDER_TIMES = [
  { id: "morning", label: "Morning", icon: Sun },
  { id: "afternoon", label: "Afternoon", icon: CloudSun },
  { id: "evening", label: "Evening", icon: Sunset },
  { id: "night", label: "Night", icon: Moon },
] as const;

type FormValues = ProfilePreferencesFormValues;

type GoalType = FormValues["goals"][number];
type InterestType = FormValues["interests"][number];

const OnboardingForm = memo(({ profile, header = true }: ProfileProps) => {
  const updatePreferences = useUpdateProfilePreferences();

  const { width } = useWindowDimensions();

  const isTablet = width >= 768;

  const { control, setValue, handleSubmit } = useForm<ProfilePreferencesFormValues>({
    resolver: zodResolver(profilePreferencesSchema),
    defaultValues: {
      interests: profile?.interests ?? [],
      goals: profile?.goals ?? [],
      dailyReminderTime: profile?.dailyReminderTime ?? "evening",
      dailyReminderEnabled: profile?.dailyReminderEnabled ?? true,
      streakReminderEnabled: profile?.streakReminderEnabled ?? true,
      lessonReminderEnabled: profile?.lessonReminderEnabled ?? true,
      pushNotificationsEnabled: profile?.pushNotificationsEnabled ?? true,
      emailNotificationsEnabled: profile?.emailNotificationsEnabled ?? false,
    },
  });

  const interests = useWatch({ control, name: "interests" });

  const goals = useWatch({ control, name: "goals" });

  const reminderTime = useWatch({ control, name: "dailyReminderTime" });

  const progress = useMemo(() => {
    let score = 0;

    if (interests.length > 0) score += 40;
    if (goals.length > 0) score += 40;
    if (reminderTime) score += 20;

    return score;
  }, [interests, goals, reminderTime]);

  const toggleInterest = useCallback(
    (value: InterestType) => {
      const selected = interests.includes(value);

      const next: InterestType[] = selected
        ? interests.filter((item) => item !== value)
        : [...interests, value];

      setValue("interests", next);
    },
    [interests, setValue]
  );

  const toggleGoal = useCallback(
    (value: GoalType) => {
      const selected = goals.includes(value);

      const next: GoalType[] = selected
        ? goals.filter((item) => item !== value)
        : [...goals, value];

      setValue("goals", next);
    },
    [goals, setValue]
  );

  const onSubmit = useCallback(
    (values: ProfilePreferencesFormValues) => {
      updatePreferences.mutate(values, {
        onSuccess: (data) => {
          Toast.show({
            type: "success",
            text1: "Success",
            text2: data.message,
          });
        },
        onError: (error) => {
          Toast.show({
            type: "error",
            text1: "Error",
            text2: error?.message,
          });
        },
      });
    },
    [updatePreferences]
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className={`px-5 py-8 ${isTablet ? "mx-auto max-w-3xl" : ""}`}>
          {header && (
            <Animated.View entering={FadeInDown.delay(100)}>
              <View className="mb-8">
                <Text className="text-3xl font-bold text-neutral-900 dark:text-white">
                  Personalize your learning
                </Text>
                <Text className="mt-2 text-sm text-neutral-500 dark:text-neutral-400">
                  Help us build your perfect learning path.
                </Text>
              </View>
            </Animated.View>
          )}
          <Animated.View entering={FadeInDown.delay(150)}>
            <Card radius="xl" padding="lg">
              <View className="gap-4">
                <View className="flex-row items-center justify-between">
                  <Text className="font-semibold dark:text-white">Setup Progress</Text>
                  <Badge
                    label={`${progress}%`}
                    leftIcon={<TrendingUp size={12} color={getBadgeIconColor()} />}
                  />
                </View>
                <ProgressBar progress={progress} showLabel={false} />
                <Text className="text-sm text-neutral-500">
                  Complete your profile for a better learning experience.
                </Text>
              </View>
            </Card>
          </Animated.View>
          <View className="mt-6 gap-6">
            <Animated.View entering={FadeInDown.delay(200)} layout={LinearTransition}>
              <Card radius="xl" padding="lg">
                <Text className="mb-4 text-xl font-semibold dark:text-white">
                  Interests
                </Text>
                <View className="flex-row flex-wrap gap-3">
                  {INTERESTS.map((item) => {
                    const selected = interests.includes(item.id);

                    const Icon = item.icon;

                    return (
                      <Pressable key={item.id} onPress={() => toggleInterest(item.id)}>
                        <Badge
                          label={item.label}
                          leftIcon={
                            <Icon size={14} color={selected ? "#ffffff" : "#525252"} />
                          }
                          variant={selected ? "primary" : "secondary"}
                        />
                      </Pressable>
                    );
                  })}
                </View>
              </Card>
            </Animated.View>
            <Animated.View entering={FadeInDown.delay(250)} layout={LinearTransition}>
              <Card radius="xl" padding="lg">
                <Text className="mb-4 text-xl font-semibold dark:text-white">
                  Learning Goals
                </Text>
                <View className="gap-3">
                  {GOALS.map((goal) => {
                    const selected = goals.includes(goal.id);

                    const Icon = goal.icon;

                    return (
                      <Pressable key={goal.id} onPress={() => toggleGoal(goal.id)}>
                        <View
                          className={`rounded-2xl border p-4 ${
                            selected
                              ? "border-primary bg-primary/10"
                              : "border-neutral-200 dark:border-neutral-800"
                          }`}
                        >
                          <View className="flex-row items-center gap-3">
                            <Icon size={20} color="#1447e6" />
                            <Text className="font-medium dark:text-white">
                              {goal.label}
                            </Text>
                          </View>
                        </View>
                      </Pressable>
                    );
                  })}
                </View>
              </Card>
            </Animated.View>
            <Animated.View entering={FadeInDown.delay(300)}>
              <Card radius="xl" padding="lg">
                <Text className="mb-4 text-xl font-semibold dark:text-white">
                  Reminder Time
                </Text>
                <Controller
                  control={control}
                  name="dailyReminderTime"
                  render={({ field }) => (
                    <View className="flex-row flex-wrap gap-3">
                      {REMINDER_TIMES.map((item) => {
                        const Icon = item.icon;

                        return (
                          <Pressable
                            key={item.id}
                            onPress={() => field.onChange(item.id)}
                          >
                            <Badge
                              label={item.label}
                              leftIcon={
                                <Icon
                                  size={14}
                                  color={field.value === item.id ? "#fff" : "#525252"}
                                />
                              }
                              variant={field.value === item.id ? "primary" : "secondary"}
                            />
                          </Pressable>
                        );
                      })}
                    </View>
                  )}
                />
              </Card>
            </Animated.View>
            <Animated.View entering={FadeInDown.delay(350)}>
              <Card radius="xl" padding="lg">
                <Text className="mb-4 text-xl font-semibold dark:text-white">
                  Notifications
                </Text>
                <View className="gap-3">
                  <SettingSwitch
                    label="Daily Reminder"
                    description="Stay consistent every day."
                    control={control}
                    name="dailyReminderEnabled"
                  />
                  <SettingSwitch
                    label="Streak Reminder"
                    description="Protect your streak."
                    control={control}
                    name="streakReminderEnabled"
                  />
                  <SettingSwitch
                    label="Lesson Reminder"
                    description="Continue unfinished lessons."
                    control={control}
                    name="lessonReminderEnabled"
                  />
                  <SettingSwitch
                    label="Push Notifications"
                    description="Receive updates instantly."
                    control={control}
                    name="pushNotificationsEnabled"
                  />
                  <SettingSwitch
                    label="Email Notifications"
                    description="Receive email summaries."
                    control={control}
                    name="emailNotificationsEnabled"
                  />
                </View>
              </Card>
            </Animated.View>
          </View>
          <Animated.View entering={FadeInDown.delay(400)} className="mt-8">
            <Button
              title="Continue"
              fullWidth
              loading={updatePreferences.isPending}
              leftIcon={<Send size={18} color={getButtonIconColor()} />}
              onPress={handleSubmit(onSubmit)}
            />
          </Animated.View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
});

OnboardingForm.displayName = "OnboardingForm";

export default OnboardingForm;
