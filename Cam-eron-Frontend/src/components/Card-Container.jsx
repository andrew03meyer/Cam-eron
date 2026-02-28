import { useState } from "react";
import { CardSwipe } from "./Card-Swipe";

const questions = [
  { id: 1, question: "Did another vehicle hit you?" },
  { id: 2, question: "Were there any witnesses?" },
];

const CardContainer = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);

  const handleSwipe = (direction) => {
    setAnswers((prev) => [
      ...prev,
      { id: questions[currentQuestionIndex].id, direction },
    ]);
    setCurrentQuestionIndex((prev) => prev + 1);
  };

  return (
    <>
      {currentQuestionIndex != questions.length && (
        <CardSwipe
          onSwipe={handleSwipe}
          question={questions[currentQuestionIndex].question}
        />
      )}
      {currentQuestionIndex == questions.length && (
        <p>Thanks for answering all the questions!</p>
      )}
    </>
  );
};

export { CardContainer };
