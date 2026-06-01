import { memo } from "react";
import { Controller, Control, FieldValues, Path } from "react-hook-form";
import { Pressable, Switch, Text, View } from "react-native";

type SettingSwitchProps<T extends FieldValues> = {
  label: string;
  description?: string;
  control: Control<T>;
  name: Path<T>;
};

function SettingSwitchComponent<T extends FieldValues>({
  label,
  description,
  control,
  name,
}: SettingSwitchProps<T>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <Pressable
          onPress={() => field.onChange(!field.value)}
          className="rounded-3xl border border-neutral-200 bg-white p-5 dark:border-neutral-800 dark:bg-neutral-900"
        >
          <View className="flex-row items-center justify-between">
            <View className="mr-4 flex-1">
              <Text className="text-base font-semibold text-neutral-900 dark:text-white">
                {label}
              </Text>
              {description && (
                <Text className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
                  {description}
                </Text>
              )}
            </View>
            <Switch
              value={field.value}
              onValueChange={field.onChange}
              trackColor={{
                false: "#d4d4d4",
                true: "#1447e6",
              }}
            />
          </View>
        </Pressable>
      )}
    />
  );
}

const SettingSwitch = memo(SettingSwitchComponent) as typeof SettingSwitchComponent;

export default SettingSwitch;
