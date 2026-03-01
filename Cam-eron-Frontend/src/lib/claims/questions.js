import { inCarPark, noOtherVehicle, skip } from "./dependancies";

const questions = [
  { id: "car_park", question: "Did it happen in a car park?" },
  {
    id: "motorway",
    question: "Did it happen on a motorway?",
    skipIf: inCarPark,
  },
  {
    id: "junction",
    question: "Did it happen at a junction?",
    skipIf: inCarPark,
  },
  {
    id: "another_vehicle",
    question: "Was another vehicle involved?",
    extraInfoNeeded: true,
  },
  {
    id: "other_vehicle_stationary",
    question: "Was the other vehicle stationary?",
    skipIf: noOtherVehicle,
  },
  {
    id: "other_vehicle_commercial",
    question: "Was it a commercial vehicle?",
    skipIf: skip(inCarPark, noOtherVehicle),
  },
];

export { questions };
