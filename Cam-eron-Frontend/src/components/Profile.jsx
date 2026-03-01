import { useState } from "react";
import claims from "../lib/claims/claims.json"
import profiles from "../lib/profiles.json"
export default function Profile({ newCaseProp, editClaim, userId, carId, backProfileButton }) {
    const [expanded, setExpanded] = useState({});

    const toggleClaim = (id) => {
        setExpanded(prev => ({ ...prev, [id]: !prev[id] }));
    };

    // const claims = [
    //     { id: 1, img: "/crash1.jpg", date: "01/01/2024", brief: "Dinged front-wing", status: "Open" },
    //     { id: 2, img: "/crash2.jpg", date: "03/05/2024", brief: "Rear bumper damage", status: "Closed" },
    //     { id: 3, img: "/crash1.jpg", date: "12/09/2024", brief: "Side mirror broken", status: "Open" },
    // ];

    return (
        <div className="flex flex-row w-full min-h-screen p-4 gap-6 w-full">
            <div className="flex flex-col gap-4 w-64 shrink-0 w-full justify-center items-center">
                <button onClick={newCaseProp} className="text-body bg-neutral-secondary-medium box-border border border-default-medium hover:bg-neutral-tertiary-medium hover:text-heading focus:ring-4 focus:ring-neutral-tertiary shadow-xs font-medium leading-5 rounded-full text-sm px-4 py-2.5 focus:outline-none">Find your claim match!</button>
                <div className="rounded-full overflow-hidden w-40 h-40 mx-auto">
                    <img src="../../public/car1.jpg" className="w-full h-full object-cover" />
                </div>
                <div class="text-body bg-neutral-secondary-medium box-border border border-default-medium hover:bg-neutral-tertiary-medium hover:text-heading focus:ring-4 focus:ring-neutral-tertiary shadow-xs font-medium leading-5 text-sm px-4 py-2.5 focus:outline-none">
                    <h2 className="text-xl font-bold w-full text-center text-shadow-lg">About you:</h2>
                    <p class="text-body bg-neutral-secondary-medium box-border border border-default-medium hover:bg-neutral-tertiary-medium hover:text-heading focus:ring-4 focus:ring-neutral-tertiary shadow-xs font-medium leading-5 text-sm px-4 py-2.5 focus:outline-none rounded-full m-2">Name: {profiles[userId].name}</p>
                    <p class="text-body bg-neutral-secondary-medium box-border border border-default-medium hover:bg-neutral-tertiary-medium hover:text-heading focus:ring-4 focus:ring-neutral-tertiary shadow-xs font-medium leading-5 text-sm px-4 py-2.5 focus:outline-none rounded-full m-2">Age: {profiles[userId].age}</p>
                    <p class="text-body bg-neutral-secondary-medium box-border border border-default-medium hover:bg-neutral-tertiary-medium hover:text-heading focus:ring-4 focus:ring-neutral-tertiary shadow-xs font-medium leading-5 text-sm px-4 py-2.5 focus:outline-none rounded-full m-2">Car Make: {profiles[userId].cars[carId].car_make}</p>
                    <p class="text-body bg-neutral-secondary-medium box-border border border-default-medium hover:bg-neutral-tertiary-medium hover:text-heading focus:ring-4 focus:ring-neutral-tertiary shadow-xs font-medium leading-5 text-sm px-4 py-2.5 focus:outline-none rounded-full m-2">Car Model: {profiles[userId].cars[carId].car_model}</p>
                    <p class="text-body bg-neutral-secondary-medium box-border border border-default-medium hover:bg-neutral-tertiary-medium hover:text-heading focus:ring-4 focus:ring-neutral-tertiary shadow-xs font-medium leading-5 text-sm px-4 py-2.5 focus:outline-none rounded-full m-2">Policy: {profiles[userId].policy}</p>
                </div>
                <div className="flex flex-col gap-4 flex-1 w-full">
                    {Object.entries(claims[userId][profiles[userId].cars[carId].car_model.toLowerCase()]).map(([key, claim]) => (
                        <div key={key} class="text-body bg-neutral-secondary-medium box-border border border-default-medium hover:bg-neutral-tertiary-medium hover:text-heading focus:ring-4 focus:ring-neutral-tertiary shadow-xs font-medium leading-5 text-sm px-4 py-2.5 focus:outline-none">
                            <div className="flex justify-between items-center">
                                <h3 className="text-lg font-semibold">Claim {key}</h3>
                                <button
                                    onClick={() => toggleClaim(key)}
                                    class="text-body bg-neutral-secondary-medium box-border border border-default-medium hover:bg-neutral-tertiary-medium hover:text-heading focus:ring-4 focus:ring-neutral-tertiary shadow-xs font-medium leading-5 rounded-full text-sm px-4 py-2.5 focus:outline-none"
                                >
                                    {expanded[key] ? "▲" : "▼"}
                                </button>
                            </div>

                            {expanded[key] && (
                                <div className="mt-4 flex flex-col gap-2">
                                    <img src={claim.img} className="w-full rounded-lg" />
                                    <h2 className="text-xl font-bold">Details:</h2>
                                    <p>Date: {claim.date}</p>
                                    <p>Brief: {claim.brief}</p>
                                    <p>Status: {claim.status}</p>
                                    <button
                                        id={key}
                                        onClick={() => editClaim(key)}
                                        class="text-body bg-neutral-secondary-medium box-border border border-default-medium hover:bg-neutral-tertiary-medium hover:text-heading focus:ring-4 focus:ring-neutral-tertiary shadow-xs font-medium leading-5 rounded-full text-sm px-4 py-2.5 focus:outline-none"
                                    >Edit Claim</button>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
                <button onClick={backProfileButton} className="m-8 mb-2 w-1/2 justify-center text-body bg-neutral-secondary-medium box-border border border-default-medium hover:bg-neutral-tertiary-medium hover:text-heading focus:ring-4 focus:ring-neutral-tertiary shadow-xs font-medium leading-5 rounded-full text-sm px-4 py-2.5 focus:outline-none">Back</button>
            </div>
        </div >
    );
}