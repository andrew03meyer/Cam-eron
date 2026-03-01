import claims from "../lib/claims/claims.json"
import { jsPDF } from 'jspdf'
import { autoTable } from 'jspdf-autotable'

export default function EditClaim({ userId, claimId, setEditClaim }) {
    // var claims = JSON.parse(claims);
    let idClaim = claims[userId][claimId]
    console.log("ClaimdID: " + claimId)
    console.log(idClaim)

    const pdfClickHandler = () => {
        const doc = new jsPDF()
        autoTable(doc, { html: '#details' })
        doc.save(`claim_${claimId}_details.pdf`)
    }

    return (
        <div className="flex flex-col overflow-scroll w-full items-center">
            {/* <p>Hello there!</p> */}
            <table id="details" class="text-sm text-left rtl:text-right text-body m-8">
                <tr>
                    <th class="px-3 py-1 rounded-s-base font-medium border">Question</th>
                    <th class="px-3 py-1 rounded-s-base font-medium border">Answer</th>
                    <th class="px-3 py-1 rounded-s-base font-medium border">Details</th>
                </tr>

                {Object.entries(idClaim).map(([q, a]) => (
                    <tr>
                        <th class="px-3 py-1 font-medium text-heading whitespace-nowrap border">{q}</th>
                        <td class="px-3 py-1 border">{a}</td>
                        <td class="px-3 py-1 border"></td>
                    </tr>
                ))}
            </table>
            <button onClick={setEditClaim} className="m-8 mb-2 w-1/2 justify-center text-body bg-neutral-secondary-medium box-border border border-default-medium hover:bg-neutral-tertiary-medium hover:text-heading focus:ring-4 focus:ring-neutral-tertiary shadow-xs font-medium leading-5 rounded-full text-sm px-4 py-2.5 focus:outline-none">Back</button>
            <button onClick={pdfClickHandler} className="m-2 w-1/2 justify-center text-body bg-neutral-secondary-medium box-border border border-default-medium hover:bg-neutral-tertiary-medium hover:text-heading focus:ring-4 focus:ring-neutral-tertiary shadow-xs font-medium leading-5 rounded-full text-sm px-4 py-2.5 focus:outline-none">Download PDF</button>
        </div>
    )
}