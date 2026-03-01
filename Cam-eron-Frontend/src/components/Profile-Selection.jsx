import profiles from "../lib/profiles.json"

export default function ProfileSelection({ userSetter }) {
    return (
        <div className="min-h-screen flex flex-col items-center p-8">
            <div className="flex flex-row flex-wrap gap-6 justify-center w-full">
                {Object.entries(profiles).map(([id, person]) => (
                    <div key={id} className="flex flex-col gap-3 bg-gray-800 rounded-2xl p-6 w-56 shadow-lg">
                        <h2 className="text-lg font-semibold text-white text-center border-b border-gray-600 pb-2">
                            {person.name}
                        </h2>
                        <p className="text-gray-400 text-sm text-center">Select a vehicle:</p>
                        {person.cars.map((car, i) => (
                            <button
                                key={i}
                                id={car.car_model}
                                onClick={() => userSetter(id, i)}
                                className="bg-gray-700 hover:bg-gray-600 text-white text-sm font-medium rounded-xl px-4 py-2 transition"
                            >
                                {car.car_make} {car.car_model}
                            </button>
                        ))}
                    </div>
                ))}
                <div className="flex flex-col gap-3 bg-gray-800 rounded-2xl p-6 w-56 shadow-lg">
                    <button onClick={() => userSetter("new", "none")} className="text-lg font-semibold text-white text-center ">Add User</button>
                </div>
            </div>
        </div>
    )
}