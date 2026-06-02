import { memo } from "react";
import { Pressable, Text } from "react-native";

import { CategoryItem } from "@/types/category.type";

interface CategoryChipProps {
  item: CategoryItem;
  selected: boolean;
  onPress: () => void;
}

const CategoryChip = memo(({ item, selected, onPress }: CategoryChipProps) => {
  return (
    <Pressable
      onPress={onPress}
      className={`mr-3 rounded-full px-4 py-2 ${
        selected ? "bg-primary" : "bg-neutral-200 dark:bg-neutral-700"
      }`}
    >
      <Text
        className={`font-medium ${
          selected ? "text-white" : "uppercase text-neutral-900 dark:text-white"
        }`}
      >
        {item.name}
      </Text>
    </Pressable>
  );
});

CategoryChip.displayName = "CategoryChip";

export default CategoryChip;
