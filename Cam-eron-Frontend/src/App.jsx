import { useState } from "react";
import "./App.css";
import { CardContainer } from "./components/Card-Container";
import Profile from "./components/Profile";
import EditClaim from "./components/EditClaim";
import ProfileSelection from "./components/Profile-Selection";
import UserCreation from "./components/UserCreation";
import logo from "./assets/logo.png";

function App() {
  let [newClaimBool, setNewClaim] = useState(false);
  let [editClaimBool, setEditClaim] = useState(false);
  let [claimIdValue, setClaimId] = useState(0);
  let [user, setUser] = useState("");
  let [car, setCar] = useState("");
  // let [newUser, setNewUser] = useState(false)

  const toggleNewClaim = () => {
    setNewClaim(!newClaimBool);
    if (editClaimBool) {
      setEditClaim(!editClaimBool);
    }
  };

  const toggleEditClaim = (passedClaimId) => {
    setEditClaim(!editClaimBool);
    setClaimId(passedClaimId);
    if (newClaimBool) {
      setNewClaim(!newClaimBool);
    }
  };

  const signIn = (profileId, carId) => {
    setUser(profileId);
    setCar(carId);
  };

  const backProfile = () => {
    setCar("");
    setUser("");
    setClaimId(0);
    setEditClaim(false);
    setNewClaim(false);
  };

  // const toggleNewUser = () => {
  //   setNewUser(!newUser)
  // }

  return (
    <>
      {/* <h1 className="text-3xl font-bold w-full text-center text-shadow-lg my-10">
        Car-Fish
      </h1> */}
      {!newClaimBool && <img src={logo} alt="Car-Fish" />}
      <div
        className={newClaimBool ? "h-screen w-full" : "flex flex-row w-full"}
      >
        {" "}
        {user === "" && <ProfileSelection userSetter={signIn} />}
        {/* {user == "new" && <UserCreation userSetter={signIn} />} */}
        {user !== "" && !newClaimBool && !editClaimBool && (
          <Profile
            newCaseProp={toggleNewClaim}
            editClaim={toggleEditClaim}
            userId={user}
            carId={car}
            backProfileButton={backProfile}
          />
        )}
        {user !== "" && newClaimBool && !editClaimBool && (
          <CardContainer
            userId={user}
            carId={car}
            setNewClaim={toggleNewClaim}
          />
        )}
        {user !== "" && editClaimBool && (
          <EditClaim
            claimId={claimIdValue}
            setEditClaim={toggleEditClaim}
            userId={user}
            carId={car}
          />
        )}
      </div>
    </>
  );
}

export default App;
