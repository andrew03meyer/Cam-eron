import { useState } from "react";
import "./App.css";
import { CardContainer } from "./components/Card-Container"; import Profile from "./components/Profile";
import Claim from "./components/Claim"
import EditClaim from "./components/EditClaim"
import ProfileSelection from "./components/Profile-Selection";


function App() {
  let [newClaimBool, setNewClaim] = useState(false);
  let [editClaimBool, setEditClaim] = useState(false);
  let [claimIdValue, setClaimId] = useState(0)
  let [user, setUser] = useState("")
  let [car, setCar] = useState("")

  console.log("Vals at render: " + car + " : " + user)

  const toggleNewClaim = () => {
    setNewClaim(!newClaimBool)
    if (editClaimBool) {
      setEditClaim(!editClaimBool)
    }
    console.log(newClaimBool)
  }

  const toggleEditClaim = (passedClaimId) => {
    setEditClaim(!editClaimBool)
    setClaimId(passedClaimId)
    if (newClaimBool) {
      setNewClaim(!newClaimBool)
    }
    console.log(passedClaimId)
    console.log(editClaimBool)
  }

  const signIn = (profileId, carId) => {
    setUser(profileId)
    setCar(carId)
    console.log(carId)
    console.log(user)
  }


  return (
    <>
      <h1 className="text-3xl font-bold w-full text-center text-shadow-lg my-10">Car-Fish</h1>
      <div className="flex flex-row w-full">
        {user === "" && <ProfileSelection userSetter={signIn} />}
        {user !== "" && !newClaimBool && !editClaimBool && <Profile newCaseProp={toggleNewClaim} editClaim={toggleEditClaim} userId={user} carId={car} />}
        {user !== "" && newClaimBool && !editClaimBool && <CardContainer />}
        {user !== "" && editClaimBool && <EditClaim claimId={claimIdValue} setEditClaim={toggleEditClaim} />}

      </div>
    </>
  );
}

export default App;
