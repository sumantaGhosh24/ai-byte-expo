import { memo } from "react";
import { View } from "react-native";

interface DotProps {
  active: boolean;
}

const Dot = memo(({ active }: DotProps) => {
  return (
    <View
      className={active ? "bg-primary" : "bg-neutral-300"}
      style={{
        width: active ? 24 : 8,
        height: 8,
        borderRadius: 999,
        marginHorizontal: 4,
      }}
    />
  );
});

Dot.displayName = "Dot";

interface Props {
  activeIndex: number;
  total: number;
}

const Pagination = memo(({ activeIndex, total }: Props) => {
  return (
    <View className="mb-8 flex-row justify-center">
      {Array.from({ length: total }).map((_, index) => (
        <Dot key={index} active={index === activeIndex} />
      ))}
    </View>
  );
});

Pagination.displayName = "Pagination";

export default Pagination;
