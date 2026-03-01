import profiles from "../lib/profiles.json"

export default function ProfileSelection() {
    return (
        <div>
            <h1>Please sign in!</h1>
            <div className="flex flex-row w-full bg-gray">
                {Object.entries(profiles).map(([id, person]) => (
                    <div key={id} className="m-10 flex flex-col w-50">{person.name}
                        {person.cars.map((car, i) => (
                            <button key={i} className="flex flex-row">{car.car_make} | {car.car_model}</button>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    )
}