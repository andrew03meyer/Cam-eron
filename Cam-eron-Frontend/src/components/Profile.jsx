import { useState } from "react";

export default function Profile({ newCaseProp, editClaim }) {
    const [expanded, setExpanded] = useState({});


    const toggleClaim = (id) => {
        setExpanded(prev => ({ ...prev, [id]: !prev[id] }));
    };

    const claims = [
        { id: 1, img: "../../public/crash1.jpg", date: "01/01/2024", brief: "Dinged front-wing", status: "Open" },
        { id: 2, img: "../../public/crash2.jpg", date: "03/05/2024", brief: "Rear bumper damage", status: "Closed" },
        { id: 3, img: "../../public/crash1.jpg", date: "12/09/2024", brief: "Side mirror broken", status: "Open" },
    ];

    return (
        <div className="flex flex-row">
            <button id="new-claim" onClick={newCaseProp}>New Claim</button>
            <div id="pfp">
                <img src="../../public/car1.jpg" />
            </div>
            <div id="about">
                <p>Name: John Deere</p>
                <p>Age: 23</p>
                <p>Car Make: VW</p>
                <p>Car Model: Polo</p>
                <p>Policy Number: ABCDE123456789</p>
            </div>
            <div id="previous-claims">
                {claims.map(claim => (
                    <div key={claim.id} className="claim-box">
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <h3>Claim {claim.id}</h3>
                            <button onClick={() => toggleClaim(claim.id)}>
                                {expanded[claim.id] ? "▲" : "▼"}
                            </button>
                        </div>
                        {expanded[claim.id] && (
                            <>
                                <img src={claim.img} />
                                <h2>Details:</h2>
                                <p>Date: {claim.date}</p>
                                <p>Brief: {claim.brief}</p>
                                <p>Status: {claim.status}</p>
                                <button id={claim.id} onClick={editClaim}>Edit Claim</button>
                            </>
                        )}
                    </div>
                ))}
            </div>
        </div >
    );
}