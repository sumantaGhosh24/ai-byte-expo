import { useCallback, useMemo, useState } from "react";

interface QuizAnswer {
  questionId: string;
  selectedOptionId: string;
}

type AnswerMap = Record<string, QuizAnswer>;

export function useQuizAttempt(totalQuestions: number) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const [answers, setAnswers] = useState<AnswerMap>({});

  const answerQuestion = useCallback((questionId: string, selectedOptionId: string) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: {
        questionId,
        selectedOptionId,
      },
    }));
  }, []);

  const next = useCallback(() => {
    setCurrentIndex((prev) => Math.min(prev + 1, totalQuestions - 1));
  }, [totalQuestions]);

  const previous = useCallback(() => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  }, []);

  const payload = useMemo(() => Object.values(answers), [answers]);

  const progress = useMemo(
    () => (totalQuestions ? ((currentIndex + 1) / totalQuestions) * 100 : 0),
    [currentIndex, totalQuestions]
  );

  return {
    answers,
    payload,
    progress,
    currentIndex,
    answerQuestion,
    next,
    previous,
  };
}
