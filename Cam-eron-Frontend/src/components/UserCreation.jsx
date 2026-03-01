import profiles from "../lib/profiles.json"

export default function UserCreation({ userSetter }) {

    const handleSubmit = async (e) => {
        e.preventDefault()
        const name = e.target.name.value
        const age = e.target.age.value
        const policy = e.target.policy.value
        const make = e.target.make.value
        const model = e.target.model.value

        const response = await fetch(`/create_user?name=${encodeURIComponent(name)}&age=${age}&policy=${policy}&make=${make}&model=${model}`)
        console.log(response)
        // userSetter(name.replace(/ /g, "_").toLowerCase(), model.toLowerCase())
        console.log(name.replace(/ /g, "_").toLowerCase(), " : ", model.toLowerCase())
    }

    return (
        <div className="min-h-screen flex flex-col items-center p-8 w-full">
            <div className="flex flex-row flex-wrap gap-6 justify-center w-full items-center">
                <div className="flex flex-col gap-3 bg-gray-800 rounded-2xl p-6 w-56 shadow-lg items-center w-full">
                    <form id="new_user_form" onSubmit={handleSubmit}>
                        <div className="pt-5">
                            <h2 className="text-lg font-semibold text-white text-center border-b border-gray-600">Name</h2>
                            <input name="name" placeholder="Enter your name" className="placeholder-gray-500"></input>
                        </div>

                        <div className="pt-5">
                            <h2 className="text-lg font-semibold text-white text-center border-b border-gray-600">Age</h2>
                            <input name="age" placeholder="Please enter your age" className="placeholder-gray-500"></input>
                        </div>

                        <div className="pt-5">
                            <h2 className="text-lg font-semibold text-white text-center border-b border-gray-600">Policy Number</h2>
                            <input name="policy" placeholder="Enter your policy number" className="placeholder-gray-500 color-gray-300"></input>
                        </div>

                        <h2 className="text-2xl font-semibold text-white text-center border-b border-gray-600 mt-16">Enter your car details</h2>
                        <div className="pt-5">
                            <h2 className="text-lg font-semibold text-white text-center border-b border-gray-600">Make</h2>
                            <input name="make" placeholder="Enter your car make" className="placeholder-gray-500 color-gray-300"></input>
                        </div>
                        <div className="pt-5">
                            <h2 className="text-lg font-semibold text-white text-center border-b border-gray-600">Model</h2>
                            <input name="model" placeholder="Enter your car model" className="placeholder-gray-500 color-gray-300"></input>
                        </div>
                        <input type="submit"></input>
                    </form>
                </div>
            </div >
        </div >
    )
}