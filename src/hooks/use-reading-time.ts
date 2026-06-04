import { useMemo } from "react";

export function useReadingTime(content: string) {
  return useMemo(() => {
    const words = content
      .replace(/[#_*`>\-\[\]()]/g, "")
      .trim()
      .split(/\s+/).length;

    const minutes = Math.max(1, Math.ceil(words / 200));

    return {
      words,
      minutes,
    };
  }, [content]);
}
