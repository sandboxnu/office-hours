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
  updateQuestionType(q: Question, type: QuestionType): void;
  updateText(q: Question, text: string): void;
};

const QuestionContext = createContext<Partial<QuestionContextProps>>({});

type QuestionContextProviderProps = {
  children: React.ReactNode;
};

const QuestionContextProvider = ({
  children,
}: QuestionContextProviderProps) => {
  const [question, setQuestion] = useState<Question>(null);

  const updateText = useCallback(() => {}, []);
  const updateQuestionType = useCallback(() => {}, []);

  return (
    <QuestionContext.Provider
      value={{ question, updateQuestionType, updateText }}
    >
      {children}
    </QuestionContext.Provider>
  );
};

export { QuestionContext, QuestionContextProvider };
