import { useState } from "react"
import claims from "../lib/claims/claims.json"
import profiles from "../lib/profiles.json"
import { jsPDF } from 'jspdf'
import { autoTable } from 'jspdf-autotable'

export default function EditClaim({ userId, claimId, carId, setEditClaim }) {
    const originalClaim = claims[userId][profiles[userId].cars[carId].car_model.toLowerCase()][claimId]

    const [claimData, setClaimData] = useState({ ...originalClaim })
    const [details, setDetails] = useState(
        Object.fromEntries(Object.keys(originalClaim).map(k => [k, ""]))
    )

    const handleAnswerChange = (key, val) => {
        setClaimData(prev => ({ ...prev, [key]: val }))
    }

    const handleDetailChange = (key, val) => {
        setDetails(prev => ({ ...prev, [key]: val }))
        console.log(details)
    }

    const pdfClickHandler = () => {
        const doc = new jsPDF()
        autoTable(doc, { html: '#details' })
        doc.save(`claim_${claimId}_details.pdf`)
    }

    return (
        <div className="flex flex-col overflow-scroll w-full items-center">
            <table id="details" className="text-sm text-left rtl:text-right text-body m-8">
                <thead>
                    <tr>
                        <th className="px-3 py-1 rounded-s-base font-medium border">Category</th>
                        <th className="px-3 py-1 rounded-s-base font-medium border">Answer</th>
                        <th className="px-3 py-1 rounded-s-base font-medium border">Details</th>
                    </tr>
                </thead>
                <tbody>
                    {Object.entries(claimData).map(([q, a]) => (
                        <tr key={q}>
                            <th className="px-3 py-1 font-medium text-heading whitespace-nowrap border">{q}</th>
                            <td contentEditable onBlur={(e) => handleAnswerChange(q, e.currentTarget.textContent)} className="px-3 py-1 border" dangerouslySetInnerHTML={{ __html: a ?? "" }} />
                            <td contentEditable onBlur={(e) => handleDetailChange(q, e.currentTarget.textContent)} className="px-3 py-1 border" dangerouslySetInnerHTML={{ __html: details[q] ?? "" }}
                            />
                        </tr>
                    ))}
                </tbody>
            </table>
            <button onClick={setEditClaim} className="m-8 mb-2 w-1/2 justify-center text-body bg-neutral-secondary-medium box-border border border-default-medium hover:bg-neutral-tertiary-medium hover:text-heading focus:ring-4 focus:ring-neutral-tertiary shadow-xs font-medium leading-5 rounded-full text-sm px-4 py-2.5 focus:outline-none">Back</button>
            <button onClick={pdfClickHandler} className="m-2 w-1/2 justify-center text-body bg-neutral-secondary-medium box-border border border-default-medium hover:bg-neutral-tertiary-medium hover:text-heading focus:ring-4 focus:ring-neutral-tertiary shadow-xs font-medium leading-5 rounded-full text-sm px-4 py-2.5 focus:outline-none">Download PDF</button>
        </div>
    )
}