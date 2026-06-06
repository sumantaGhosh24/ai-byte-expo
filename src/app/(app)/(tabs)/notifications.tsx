import { useCallback, useEffect, useMemo, useState } from "react";
import { RefreshControl, Text, View, Pressable, useWindowDimensions } from "react-native";
import Animated, {
  FadeIn,
  FadeInUp,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { FlashList } from "@shopify/flash-list";
import { X, CheckCheck, SlidersHorizontal } from "lucide-react-native";
import { useColorScheme } from "nativewind";

import { navigateFromNotification } from "@/lib/deep-links";
import {
  useNotifications,
  useMarkNotificationRead,
  useMarkAllNotificationsRead,
} from "@/hooks/use-notifications";
import Badge from "@/components/ui/badge";
import Button, { getButtonIconColor } from "@/components/ui/button";
import Card from "@/components/ui/card";
import NotificationItemCard from "@/components/notifications/notification-item-card";
import EmptyNotifications from "@/components/lessons/empty-notifications";
import {
  NotificationCardSkeleton,
  NotificationsSkeleton,
} from "@/components/notifications/notification-skeleton";
import { NotificationItem, NotificationType } from "@/types/notification.type";

const notificationTypes: NotificationType[] = [
  "general",
  "achievement",
  "course",
  "lesson",
  "quiz",
  "reminder",
  "system",
];

const NotificationsScreen = () => {
  const { width } = useWindowDimensions();

  const isTablet = width >= 768;

  const { colorScheme } = useColorScheme();

  const isDark = colorScheme === "dark";

  const [selectedType, setSelectedType] = useState<NotificationType>();

  const [filterVisible, setFilterVisible] = useState(false);

  const {
    data,
    isLoading,
    isRefetching,
    refetch,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useNotifications({
    limit: 20,
    type: selectedType,
  });

  const { mutate: markRead } = useMarkNotificationRead();

  const { mutate: markAllRead, isPending: markAllLoading } =
    useMarkAllNotificationsRead();

  const notifications = useMemo(
    () => data?.pages.flatMap((page) => page.result.items) ?? [],
    [data]
  );

  const unreadCount = useMemo(() => data?.pages?.[0]?.result?.unreadCount ?? 0, [data]);

  const loadMore = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  const handleNotificationPress = useCallback(
    (notification: NotificationItem) => {
      if (!notification.read) {
        markRead({
          id: notification.id,
        });
      }

      navigateFromNotification({
        type: notification.type,
        ...notification.metadata,
      });
    },
    [markRead]
  );

  const translateY = useSharedValue(500);

  useEffect(() => {
    translateY.value = withSpring(filterVisible ? 0 : 500);
  }, [filterVisible, translateY]);

  const sheetStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateY: translateY.value,
      },
    ],
  }));

  const renderNotification = useCallback(
    ({ item }: { item: NotificationItem }) => (
      <View className={isTablet ? "px-2" : ""}>
        <NotificationItemCard item={item} onPress={() => handleNotificationPress(item)} />
      </View>
    ),
    [handleNotificationPress, isTablet]
  );

  const renderHeader = useMemo(
    () => (
      <View className="gap-6 px-4 pb-4 pt-2">
        <Animated.View entering={FadeInUp.duration(400)}>
          <Text className="text-3xl font-bold text-neutral-900 dark:text-white">
            All Notifications
          </Text>
          <Text className="mt-1 text-neutral-500">
            Stay updated with your learning progress
          </Text>
        </Animated.View>
        <Card>
          <View className="flex-row items-center justify-between">
            <View>
              <Text className="text-sm text-neutral-500">Unread</Text>
              <Text className="text-2xl font-bold dark:text-white">{unreadCount}</Text>
            </View>
            {unreadCount > 0 && (
              <Button
                size="sm"
                title="Mark All Read"
                loading={markAllLoading}
                leftIcon={<CheckCheck size={18} color={getButtonIconColor()} />}
                onPress={() => markAllRead()}
                fullWidth={false}
              />
            )}
          </View>
        </Card>
        <Text className="text-lg font-semibold dark:text-white">
          Notifications ({notifications.length})
        </Text>
      </View>
    ),
    [notifications.length, unreadCount, markAllRead, markAllLoading]
  );

  const renderFooter = () => {
    if (!isFetchingNextPage) return null;

    return (
      <View className="px-4">
        {Array.from({ length: 2 }).map((_, i) => (
          <NotificationCardSkeleton key={i} />
        ))}
      </View>
    );
  };

  if (isLoading) {
    return <NotificationsSkeleton />;
  }

  return (
    <View className="flex-1">
      <FlashList
        data={notifications}
        renderItem={renderNotification}
        numColumns={isTablet ? 2 : 1}
        key={isTablet ? "tablet" : "mobile"}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={renderHeader}
        ListFooterComponent={renderFooter}
        ListEmptyComponent={<EmptyNotifications />}
        onEndReached={loadMore}
        onEndReachedThreshold={0.2}
        refreshControl={<RefreshControl refreshing={isRefetching} onRefresh={refetch} />}
        contentContainerStyle={{
          paddingHorizontal: isTablet ? 8 : 0,
          paddingBottom: 120,
        }}
      />
      <Animated.View entering={FadeIn} className="absolute bottom-6 right-6">
        <Button
          title="Filter"
          leftIcon={<SlidersHorizontal size={18} color={getButtonIconColor()} />}
          onPress={() => setFilterVisible(true)}
        />
      </Animated.View>
      {filterVisible && (
        <>
          <Pressable
            className="absolute inset-0 bg-black/40"
            onPress={() => setFilterVisible(false)}
          />
          <Animated.View
            style={sheetStyle}
            className="absolute bottom-0 left-0 right-0 rounded-t-[32px] bg-white p-6 dark:bg-neutral-950"
          >
            <View className="mb-6 flex-row items-center justify-between">
              <Text className="text-xl font-bold dark:text-white">Filters</Text>
              <Pressable onPress={() => setFilterVisible(false)}>
                <X size={22} color={isDark ? "white" : "black"} />
              </Pressable>
            </View>
            <View className="mb-6 flex-row flex-wrap gap-3">
              {notificationTypes.map((item) => (
                <Pressable
                  key={item}
                  onPress={() =>
                    setSelectedType(selectedType === item ? undefined : item)
                  }
                >
                  <Badge
                    label={item}
                    variant={selectedType === item ? "primary" : "secondary"}
                  />
                </Pressable>
              ))}
            </View>
            <Button
              variant="outline"
              title="Clear Filters"
              onPress={() => setSelectedType(undefined)}
            />
          </Animated.View>
        </>
      )}
    </View>
  );
};

export default NotificationsScreen;
