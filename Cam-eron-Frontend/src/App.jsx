import { useState } from "react";
import "./App.css";
import { CardContainer } from "./components/Card-Container"; import Profile from "./components/Profile";
import EditClaim from "./components/EditClaim"
import ProfileSelection from "./components/Profile-Selection";
import UserCreation from "./components/UserCreation";

function App() {
  let [newClaimBool, setNewClaim] = useState(false);
  let [editClaimBool, setEditClaim] = useState(false);
  let [claimIdValue, setClaimId] = useState(0)
  let [user, setUser] = useState("")
  let [car, setCar] = useState("")
  // let [newUser, setNewUser] = useState(false)

  const toggleNewClaim = () => {
    setNewClaim(!newClaimBool)
    if (editClaimBool) {
      setEditClaim(!editClaimBool)
    }
  }

  const toggleEditClaim = (passedClaimId) => {
    setEditClaim(!editClaimBool)
    setClaimId(passedClaimId)
    if (newClaimBool) {
      setNewClaim(!newClaimBool)
    }
  }

  const signIn = (profileId, carId) => {
    setUser(profileId)
    setCar(carId)
    console.log("App.jsx:  ", carId, " | ", profileId)
  }

  const backProfile = () => {
    setCar("")
    setUser("")
    setClaimId(0)
    setEditClaim(false)
    setNewClaim(false)
  }

  // const toggleNewUser = () => {
  //   setNewUser(!newUser)
  // }


  return (
    <>
      <h1 className="text-3xl font-bold w-full text-center text-shadow-lg my-10">Car-Fish</h1>
      <div className="flex flex-row w-full">
        {user === "" && <ProfileSelection userSetter={signIn} />}
        {user === "new" && <UserCreation userSetter={signIn} />}
        {user !== "" && user !== "new" && !newClaimBool && !editClaimBool && <Profile newCaseProp={toggleNewClaim} editClaim={toggleEditClaim} userId={user} carId={car} backProfileButton={backProfile} />}
        {user !== "" && user !== "new" && newClaimBool && !editClaimBool && <CardContainer userId={user} carId={car} setNewClaim={toggleNewClaim} />}
        {user !== "" && user !== "new" && editClaimBool && <EditClaim claimId={claimIdValue} setEditClaim={toggleEditClaim} userId={user} carId={car} />}

      </div>
    </>
  );
}

export default App;
