import { createContext, useState, useCallback } from "react";
import {
  Question,
  QuestionStatus,
  QuestionType,
  User,
  UserPartial,
} from "@template/common";

type QuestionContextProps = {
  question: Question;
  updateQuestionType(type: QuestionType): void;
  updateText(text: string): void;
  updateQuestion(q: Question): void;
};

const QuestionContext = createContext<Partial<QuestionContextProps>>({});

type QuestionContextProviderProps = {
  children: React.ReactNode;
};

const QuestionContextProvider = ({
  children,
}: QuestionContextProviderProps) => {
  const [question, setQuestion] = useState<Question>(null);

  const updateQuestion = useCallback((newQuestion: Question) => {
    setQuestion(newQuestion);
  }, []);

  const updateText = useCallback(() => {}, []);
  const updateQuestionType = useCallback(() => {}, []);

  return (
    <QuestionContext.Provider
      value={{ question, updateQuestionType, updateText, updateQuestion }}
    >
      {children}
    </QuestionContext.Provider>
  );
};

export { QuestionContext, QuestionContextProvider };
