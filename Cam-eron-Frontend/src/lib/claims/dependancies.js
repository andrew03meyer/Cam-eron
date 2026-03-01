// conditions
const inCarPark = (answers) => answers.car_park === "yes";
const noOtherVehicle = (answers) => answers.another_vehicle === "no";
const notOnRoad = (answers) => answers.public_road === "no";

const skip =
  (...fns) =>
  (answers) =>
    fns.some((fn) => fn(answers));

export { inCarPark, noOtherVehicle, notOnRoad, skip };
