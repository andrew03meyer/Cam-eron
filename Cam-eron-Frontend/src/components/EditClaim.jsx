import claims from "../lib/claims/claims.json"

export default function EditClaim({ claimId, setEditClaim }) {
    var claims = JSON.parse(claims);
    idClaim = claims.id[claimId]
    console.log(claims)

    return (
        <div className="flex flex-row">
            <p>Hello there!</p>
            <button onClick={setEditClaim}>Back</button>
        </div>
    )
}