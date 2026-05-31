import { memo, ReactNode, useMemo } from "react";
import { View, ViewProps } from "react-native";

import { cn } from "@/lib/cn";

const radiusStyles = {
  sm: "rounded-md",
  md: "rounded-xl",
  lg: "rounded-2xl",
  xl: "rounded-3xl",
  "2xl": "rounded-[32px]",
} as const;

const paddingStyles = {
  none: "p-0",
  sm: "p-2",
  md: "p-4",
  lg: "p-5",
  xl: "p-6",
  "2xl": "p-8",
} as const;

const shadowStyles = {
  none: "",
  sm: "shadow-sm shadow-black/10",
  md: "shadow-md shadow-black/15",
} as const;

type CardProps = ViewProps & {
  children: ReactNode;
  className?: string;
  shadow?: keyof typeof shadowStyles;
  bordered?: boolean;
  padding?: keyof typeof paddingStyles;
  radius?: keyof typeof radiusStyles;
};

function CardComponent({
  children,
  className,
  shadow = "sm",
  bordered = true,
  padding = "md",
  radius = "lg",
  ...props
}: CardProps) {
  const classes = useMemo(
    () =>
      cn(
        "w-full overflow-hidden bg-white dark:bg-neutral-900",
        radiusStyles[radius],
        paddingStyles[padding],
        shadowStyles[shadow],
        bordered && "border border-neutral-200 dark:border-neutral-800",
        className
      ),
    [bordered, className, padding, radius, shadow]
  );

  return (
    <View className={classes} {...props}>
      {children}
    </View>
  );
}

const Card = memo(CardComponent);

Card.displayName = "Card";

export default Card;
