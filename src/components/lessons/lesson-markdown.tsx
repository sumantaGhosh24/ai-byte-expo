import { useColorScheme } from "nativewind";
import { memo } from "react";
import Markdown from "react-native-markdown-display";

interface LessonMarkdownProps {
  content: string;
}

const LessonMarkdown = memo(({ content }: LessonMarkdownProps) => {
  const { colorScheme } = useColorScheme();

  const isDark = colorScheme === "dark";

  return (
    <Markdown
      style={{
        body: {
          color: isDark ? "#fff" : "#171717",
          fontSize: 16,
          lineHeight: 28,
        },
        heading1: {
          fontSize: 32,
          fontWeight: "700",
          marginBottom: 12,
        },
        heading2: {
          fontSize: 24,
          fontWeight: "700",
          marginTop: 20,
          marginBottom: 8,
        },
        code_block: {
          borderRadius: 16,
          padding: 16,
        },
      }}
    >
      {content}
    </Markdown>
  );
});

LessonMarkdown.displayName = "LessonMarkdown";

export default LessonMarkdown;
