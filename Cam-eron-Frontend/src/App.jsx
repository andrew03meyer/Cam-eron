import { useState } from "react";
// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
// import { Routes } from "react-router"
import "./App.css";
import { CardContainer } from "./components/Card-Container"; import Profile from "./components/Profile";
import Claim from "./components/Claim"
import EditClaim from "./components/EditClaim"


function App() {
  const [count, setCount] = useState(0);
  let [newClaim, setNewClaim] = useState(false);
  let [editClaim, setEditClaim] = useState(false);

  const toggleNewClaim = () => {
    setNewClaim(!newClaim)
    if (editClaim) {
      setEditClaim(!editClaim)
    }
    console.log(newClaim)
  }

  const toggleEditClaim = () => {
    setEditClaim(!editClaim)
    if (newClaim) {
      setNewClaim(!newClaim)
    }
    console.log(editClaim)
  }


  return (
    <>
      <h1 className="text-3xl font-bold">Car-Fish</h1>
      <div>
        <CardContainer />
        {!newClaim && !editClaim && <Profile newCaseProp={toggleNewClaim} editClaim={toggleEditClaim} />}
        {newClaim && !editClaim && <Claim newCaseProp={toggleNewClaim} />}
        {editClaim && <EditClaim setEditClaim={toggleEditClaim} />}

      </div>
    </>
  );
}

export default App;
