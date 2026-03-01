import claims from "../lib/claims/claims.json"
import profiles from "../lib/profiles.json"
import { jsPDF } from 'jspdf'
import { autoTable } from 'jspdf-autotable'


export default function EditClaim({ userId, claimId, carId, setEditClaim }) {
    // var claims = JSON.parse(claims);
    console.log(`user id: ${userId} | carId: ${carId} | claim id: ${claimId}`)
    let idClaim = claims[userId][profiles[userId].cars[carId].car_model.toLowerCase()][claimId]  // works... maybe? Returns... ... ... Something?
    console.log("ClaimdID: " + claimId)
    console.log(idClaim)

    const pdfClickHandler = () => {
        const doc = new jsPDF()
        // const imgData = idClaim.img.toBase64()  // claim.img is just "/crash1.jpg"
        // console.log(imgData)
        // doc.addImage(imgData, "JPEG", 10, 10, 100, 80)
        autoTable(doc, { html: '#details' })
        doc.save(`claim_${claimId}_details.pdf`)
    }

    return (
        <div className="flex flex-col overflow-scroll w-full items-center">
            {/* <p>Hello there!</p> */}
            <table id="details" class="text-sm text-left rtl:text-right text-body m-8">
                <thead>
                    <tr>
                        <th class="px-3 py-1 rounded-s-base font-medium border">Category</th>
                        <th class="px-3 py-1 rounded-s-base font-medium border">Answer</th>
                        <th class="px-3 py-1 rounded-s-base font-medium border">Details</th>
                    </tr>
                </thead>
                <tbody>
                    {Object.entries(idClaim).map(([q, a]) => (
                        <tr>
                            <th class="px-3 py-1 font-medium text-heading whitespace-nowrap border">{q}</th>
                            <td class="px-3 py-1 border">{a}</td>
                            <td class="px-3 py-1 border"></td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <button onClick={setEditClaim} className="m-8 mb-2 w-1/2 justify-center text-body bg-neutral-secondary-medium box-border border border-default-medium hover:bg-neutral-tertiary-medium hover:text-heading focus:ring-4 focus:ring-neutral-tertiary shadow-xs font-medium leading-5 rounded-full text-sm px-4 py-2.5 focus:outline-none">Back</button>
            <button onClick={pdfClickHandler} className="m-2 w-1/2 justify-center text-body bg-neutral-secondary-medium box-border border border-default-medium hover:bg-neutral-tertiary-medium hover:text-heading focus:ring-4 focus:ring-neutral-tertiary shadow-xs font-medium leading-5 rounded-full text-sm px-4 py-2.5 focus:outline-none">Download PDF</button>
        </div>
    )
}