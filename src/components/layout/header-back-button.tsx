import { Pressable } from "react-native";
import { router } from "expo-router";
import * as Haptics from "expo-haptics";
import { ChevronLeft } from "lucide-react-native";

const HeaderBackButton = () => {
  return (
    <Pressable
      className="ml-2 h-10 w-10 items-center justify-center rounded-full"
      onPress={async () => {
        await Haptics.selectionAsync();

        router.back();
      }}
    >
      <ChevronLeft size={24} color="#1447e6" />
    </Pressable>
  );
};

export default HeaderBackButton;
