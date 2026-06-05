import { memo, useCallback, useMemo, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Pressable, Text, View, useWindowDimensions } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { zodResolver } from "@hookform/resolvers/zod";
import Animated, {
  FadeInDown,
  useSharedValue,
  withSequence,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import * as ImagePicker from "expo-image-picker";
import * as Linking from "expo-linking";
import { Image } from "expo-image";
import Toast from "react-native-toast-message";
import { Camera, Send } from "lucide-react-native";

import { useDeleteFile, useUploadImage } from "@/hooks/use-upload";
import { useUpdateProfile } from "@/hooks/use-profile";
import { ProfileFormValues, profileSchema } from "@/schemas/profile.schema";
import { Profile } from "@/types/profile.type";

import Button, { getButtonIconColor } from "../ui/button";
import Card from "../ui/card";
import Input from "../ui/input";

type ProfileProps = {
  profile?: Profile | null;
};

const ProfileForm = memo(({ profile }: ProfileProps) => {
  const uploadImage = useUploadImage();

  const deleteFile = useDeleteFile();

  const updateProfile = useUpdateProfile();

  const { width } = useWindowDimensions();
  const isTablet = width >= 768;

  const [avatar, setAvatar] = useState<ImagePicker.ImagePickerAsset | null>(null);

  const avatarScale = useSharedValue(1);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: profile?.name ?? "",
      username: profile?.username ?? "",
      bio: profile?.bio ?? "",
    },
  });

  const avatarUri = useMemo(() => {
    return avatar?.uri || profile?.avatarUrl;
  }, [avatar?.uri, profile?.avatarUrl]);

  const handleAvatarUpload = useCallback(async () => {
    try {
      let permission = await ImagePicker.getMediaLibraryPermissionsAsync();

      if (!permission.granted) {
        permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
      }

      if (!permission.granted && !permission.canAskAgain) {
        Toast.show({
          type: "error",
          text1: "Permission Denied",
          text2: "Enable photo access from Settings.",
        });

        Linking.openSettings();

        return;
      }

      if (!permission.granted) {
        Toast.show({
          type: "error",
          text1: "Permission Required",
          text2: "Please allow photo access to upload an avatar.",
        });

        return;
      }

      avatarScale.value = withSequence(
        withTiming(0.95, { duration: 100 }),
        withSpring(1)
      );

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ["images"],
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
        selectionLimit: 1,
      });

      if (result.canceled || !result.assets?.length) {
        return;
      }

      const selectedAsset = result.assets[0];

      if (selectedAsset.fileSize && selectedAsset.fileSize > 5 * 1024 * 1024) {
        Toast.show({
          type: "error",
          text1: "Image Too Large",
          text2: "Please select an image smaller than 5MB.",
        });

        return;
      }

      setAvatar(selectedAsset);

      Toast.show({
        type: "success",
        text1: "Image Selected",
      });
    } catch (error: any) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: error?.message ?? "Failed to select image.",
      });
    }
  }, [avatarScale]);

  const onSubmit = useCallback(
    (values: ProfileFormValues) => {
      try {
        if (avatar) {
          if (profile?.avatarPublicId) {
            deleteFile.mutate(
              {
                public_id: profile?.avatarPublicId,
              },
              {
                onError: (error) => {
                  Toast.show({
                    type: "error",
                    text1: "Error",
                    text2: error?.message,
                  });
                },
              }
            );
          }

          const formData = new FormData();

          formData.append("file", {
            uri: avatar.uri,
            type: avatar.mimeType ?? "image/jpeg",
            name: avatar.fileName ?? `avatar-${Date.now()}.jpg`,
          } as any);

          uploadImage.mutate(formData, {
            onSuccess: (data) => {
              updateProfile.mutate(
                {
                  ...values,
                  avatarUrl: data?.file?.url,
                  avatarPublicId: data?.file?.url,
                },
                {
                  onSuccess: (data) => {
                    Toast.show({
                      type: "success",
                      text1: "Success",
                      text2: data?.message,
                    });
                  },
                  onError: (error) => {
                    Toast.show({
                      type: "error",
                      text1: "Error",
                      text2: error?.message,
                    });
                  },
                }
              );
            },
            onError: (error) => {
              Toast.show({
                type: "error",
                text1: "Error",
                text2: error?.message,
              });
            },
          });
        } else {
          updateProfile.mutate(values, {
            onSuccess: (data) => {
              Toast.show({
                type: "success",
                text1: "Success",
                text2: data?.message,
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
        }
      } catch (error: any) {
        Toast.show({
          type: "error",
          text1: "Error",
          text2: error?.message ?? "Something went wrong.",
        });
      }
    },
    [avatar, profile?.avatarPublicId, deleteFile, uploadImage, updateProfile]
  );

  const isLoading =
    uploadImage.isPending || deleteFile.isPending || updateProfile.isPending;

  return (
    <KeyboardAwareScrollView
      enableOnAndroid
      keyboardShouldPersistTaps="handled"
      extraScrollHeight={20}
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
    >
      <View className="flex-1 px-5 py-8">
        <View className={`gap-6 ${isTablet ? "flex-row items-start" : ""}`}>
          <Animated.View
            entering={FadeInDown.delay(100)}
            className={isTablet ? "w-80" : ""}
          >
            <Card radius="xl" padding="lg">
              <View className="items-center">
                <Pressable onPress={handleAvatarUpload}>
                  <View>
                    <Image
                      source={{
                        uri:
                          avatarUri ||
                          `https://ui-avatars.com/api/?name=${encodeURIComponent(
                            profile?.name || "User"
                          )}`,
                      }}
                      contentFit="cover"
                      transition={300}
                      cachePolicy="memory-disk"
                      style={{
                        width: 120,
                        height: 120,
                        borderRadius: 999,
                      }}
                    />
                    <View className="absolute bottom-0 right-0 rounded-full bg-primary p-2">
                      <Camera size={18} color="#fff" />
                    </View>
                  </View>
                </Pressable>
                <Text className="mt-4 text-lg font-semibold dark:text-white">
                  Change Photo
                </Text>
                <Text className="mt-1 text-center text-xs text-neutral-500">
                  Tap to upload a new profile picture
                </Text>
              </View>
            </Card>
          </Animated.View>
          <View className="flex-1 gap-6">
            <Animated.View entering={FadeInDown.delay(200)}>
              <Card radius="xl" padding="lg">
                <Text className="mb-5 text-lg font-semibold dark:text-white">
                  Basic Information
                </Text>
                <View className="gap-5">
                  <Controller
                    control={control}
                    name="name"
                    render={({ field: { value, onChange } }) => (
                      <Input
                        label="Full Name"
                        value={value}
                        onChangeText={onChange}
                        placeholder="Enter your name"
                        error={errors.name?.message}
                      />
                    )}
                  />
                  <Controller
                    control={control}
                    name="username"
                    render={({ field: { value, onChange } }) => (
                      <Input
                        label="Username"
                        value={value}
                        onChangeText={onChange}
                        placeholder="Enter username"
                        autoCapitalize="none"
                        autoCorrect={false}
                        error={errors.username?.message}
                      />
                    )}
                  />
                  <Controller
                    control={control}
                    name="bio"
                    render={({ field: { value, onChange } }) => (
                      <Input
                        label="Bio"
                        value={value}
                        onChangeText={onChange}
                        placeholder="Tell learners about yourself"
                        multiline
                        numberOfLines={5}
                        maxLength={300}
                        error={errors.bio?.message}
                        textAlignVertical="top"
                      />
                    )}
                  />
                </View>
              </Card>
            </Animated.View>
            <Animated.View entering={FadeInDown.delay(300)}>
              <Button
                title="Update Profile"
                loading={isLoading}
                leftIcon={<Send size={18} color={getButtonIconColor()} />}
                fullWidth
                onPress={handleSubmit(onSubmit)}
              />
            </Animated.View>
          </View>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
});

ProfileForm.displayName = "ProfileForm";

export default ProfileForm;
