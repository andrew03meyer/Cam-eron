import { useState, useEffect } from "react";
import { CardSwipe } from "./Card-Swipe";

import { questions } from "../lib/claims/questions";

// const questions = [
//   {
//     id: "driver",
//     question: "Were you the driver of the vehicle?",
//     extraInfoNeeded: false,
//   },
//   {
//     id: "vehicle_stationary",
//     question: "Was your vehicle stationary at the time?",
//     extraInfoNeeded: false,
//   },
//   {
//     id: "public_road",
//     question: "Did the incident occur on a public road?",
//     extraInfoNeeded: false,
//   },
//   {
//     id: "car_park",
//     question: "Did the incident occur in a car park?",
//     extraInfoNeeded: false,
//   },
//   {
//     id: "junction",
//     question: "Did the incident occur at a junction?",
//     extraInfoNeeded: false,
//   },
//   {
//     id: "motorway",
//     question: "Did the incident occur on a motorway?",
//     extraInfoNeeded: false,
//   },
//   {
//     id: "dark",
//     question: "Was it dark at the time of the incident?",
//     extraInfoNeeded: false,
//   },
//   {
//     id: "weather_affecting_visibility",
//     question: "Was weather affecting visibility?",
//     extraInfoNeeded: true,
//   },
//   {
//     id: "road_wet_or_icy",
//     question: "Was the road wet or icy?",
//     extraInfoNeeded: false,
//   },
//   {
//     id: "roadworks",
//     question: "Were there roadworks present?",
//     extraInfoNeeded: true,
//   },
//   {
//     id: "another_vehicle",
//     question: "Was another vehicle involved?",
//     extraInfoNeeded: false,
//   },
//   {
//     id: "more_than_one_vehicle",
//     question: "Were more than one other vehicle involved?",
//     extraInfoNeeded: false,
//   },
//   {
//     id: "other_vehicle_stationary",
//     question: "Was the other vehicle stationary?",
//     extraInfoNeeded: false,
//   },
//   {
//     id: "other_vehicle_commercial",
//     question: "Was the other vehicle a commercial vehicle?",
//     extraInfoNeeded: false,
//   },
//   {
//     id: "pedestrian",
//     question: "Was a pedestrian involved?",
//     extraInfoNeeded: false,
//   },
//   {
//     id: "cyclist",
//     question: "Was a cyclist involved?",
//     extraInfoNeeded: false,
//   },
//   { id: "animal", question: "Was an animal involved?", extraInfoNeeded: true },
//   {
//     id: "stationary_object",
//     question: "Did you hit a stationary object?",
//     extraInfoNeeded: true,
//   },
//   {
//     id: "rear_end_shunt",
//     question: "Was it a rear-end shunt?",
//     extraInfoNeeded: false,
//   },
//   {
//     id: "head_on",
//     question: "Was it a head-on collision?",
//     extraInfoNeeded: false,
//   },
//   {
//     id: "side_on",
//     question: "Was it a side-on collision?",
//     extraInfoNeeded: false,
//   },
// ];

const getNextIndex = (fromIndex, answers) => {
  console.log("Getting Next Index!");
  for (let i = fromIndex; i < questions.length; i++) {
    const q = questions[i];
    console.log(q);
    if (q.skipIf?.(answers)) {
      console.log("Skipping: ->  " + q);
      continue;
    }
    return i;
  }
};

const autoFillSkipped = (fromIndex, answers) => {
  console.log("AutoFilling...");
  let skipped = 0;
  const filled = { ...answers };
  for (let i = fromIndex; i < questions.length; i++) {
    const q = questions[i];
    if (q.skipIf?.(filled)) {
      skipped++;
      filled[q.id] = "no";
    } else {
      break;
    }
  }
  return { filled, skipped };
};

const CardContainer = ({ userId, carId, setNewClaim }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(() =>
    getNextIndex(0, {}),
  );
  const [answers, setAnswers] = useState({});
  const [skipCount, setSkipCount] = useState(0);

  const handleSwipe = (direction, extra_info) => {
    console.log(
      "Swiped:",
      direction,
      "on question:",
      questions[currentQuestionIndex].id,
    );

    const updatedAnswers = {
      ...answers,
      [questions[currentQuestionIndex].id]: extra_info
        ? { boolean: direction, details: extra_info }
        : direction,
    };
    const { filled: filledAnswers, skipped } = autoFillSkipped(
      currentQuestionIndex + 1,
      updatedAnswers,
    );
    setSkipCount((prev) => prev + skipped);

    const nextIndex = getNextIndex(currentQuestionIndex + 1, filledAnswers);
    console.log(filledAnswers + "filled");
    console.log(nextIndex + "Next");

    setAnswers(filledAnswers);
    setCurrentQuestionIndex(nextIndex ?? questions.length);

    // var new_answer = {};
    // console.log("Extra info: " + extra_info);
    // if (!extra_info || extra_info.length == 0) {
    //   new_answer = { id: questions[currentQuestionIndex].id, direction };
    // } else {
    //   new_answer = {
    //     id: questions[currentQuestionIndex].id,
    //     output: { boolean: direction, details: extra_info },
    //   };
    // }
    // setAnswers((prev) => ({
    //   ...prev,
    //   [questions[currentQuestionIndex].id]: direction,
    // }));
    // setCurrentQuestionIndex((prev) => prev + 1);
  };

  const currentQuestion = questions[currentQuestionIndex];

  // if (currentQuestionIndex == questions.length) {
  //   console.log(answers);
  // }

  const addDefaults = () => {
    let defaults = {
      "img": "",
      "date": "",
      "brief": "",
      "status": ""
    }
    return { ...defaults, ...answers }
  }
  useEffect(() => {
    if (currentQuestionIndex !== questions.length) return

    const submitClaim = async () => {
      const answersWithDef = addDefaults()
      const response = await fetch(`/write_to_json?json=${encodeURIComponent(JSON.stringify(answersWithDef))}&user=${userId}&car=${carId}`)
      console.log(response)
    }

    submitClaim()
  }, [currentQuestionIndex])

  return (
    <>
      {currentQuestionIndex != questions.length && (
        <CardSwipe
          key={currentQuestion.id}
          onSwipe={handleSwipe}
          question={currentQuestion.question}
          questionId={currentQuestion.id}
          extraInfoNeeded={currentQuestion.extraInfoNeeded}
        />
      )}
      {currentQuestionIndex == questions.length && (
        <div>
          <p className="max-w-sm rounded overflow-hidden shadow-lg bg-white m-2 h-max p-2">
            Thanks for completing your claim! <br />
            You answered: {questions.length - skipCount} during this claim. This
            saved you answering {skipCount} questions. Total Questions:{" "}
            {questions.length}

          </p>
          <button onClick={setNewClaim} className="m-8 mb-2 w-1/2 justify-center text-body bg-neutral-secondary-medium box-border border border-default-medium hover:bg-neutral-tertiary-medium hover:text-heading focus:ring-4 focus:ring-neutral-tertiary shadow-xs font-medium leading-5 rounded-full text-sm px-4 py-2.5 focus:outline-none">Back</button>
        </div>
      )}
    </>
  );
};

export { CardContainer };
