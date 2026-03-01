import { useState } from "react";
import { CardSwipe } from "./Card-Swipe";

const questions = [
  { id: 1, question: "Did another vehicle hit you?", extraInfoNeeded: false },
  { id: 2, question: "Were there any witnesses?", extraInfoNeeded: true },
];

const CardContainer = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);

  const handleSwipe = (direction, extra_info) => {
    var new_answer = {};
    console.log("Extra info: " + extra_info);
    if (!extra_info || extra_info.length == 0) {
      new_answer = { id: questions[currentQuestionIndex].id, direction };
    } else {
      new_answer = {
        id: questions[currentQuestionIndex].id,
        output: { boolean: direction, details: extra_info },
      };
    }
    setAnswers((prev) => [...prev, new_answer]);
    setCurrentQuestionIndex((prev) => prev + 1);
  };

  const currentQuestion = questions[currentQuestionIndex];

  if (currentQuestionIndex == questions.length) {
    console.log(answers);
  }

  return (
    <>
      {currentQuestionIndex != questions.length && (
        <CardSwipe
          onSwipe={handleSwipe}
          question={currentQuestion.question}
          questionId={currentQuestion.id}
          extraInfoNeeded={currentQuestion.extraInfoNeeded}
        />
      )}
      {currentQuestionIndex == questions.length && (
        <p className="max-w-sm rounded overflow-hidden shadow-lg bg-white m-2 h-max p-2">
          Thanks for answering all {questions.length} questions! Your claim has
          been submitted.
        </p>
      )}
    </>
  );
};

export { CardContainer };
