import { Bell } from "lucide-react-native";
import { Text, View } from "react-native";

import Card from "../ui/card";

const EmptyNotifications = () => {
  return (
    <View className="px-6 py-20">
      <Card className="items-center gap-4">
        <Bell size={48} color="#9ca3af" />
        <Text className="text-xl font-bold dark:text-white">No Notifications Found</Text>
        <Text className="text-center text-neutral-500">Try again later.</Text>
      </Card>
    </View>
  );
};

export default EmptyNotifications;
