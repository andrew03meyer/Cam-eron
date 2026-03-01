from flask import Flask, request, session, jsonify
import json
import os

app = Flask(__name__)

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

@app.route("/")
def hello():
    return({"message": "hello world"})


@app.route("/write_to_json", methods=["GET"])
def write_json():
    raw = request.args.get("json")
    user = request.args.get("user")
    car_index = int(request.args.get("car"))

    profiles_path = os.path.join(BASE_DIR, '../Cam-eron-Frontend/src/lib/profiles.json')
    claims_path = os.path.join(BASE_DIR, '../Cam-eron-Frontend/src/lib/claims/claims.json')

    parsed = json.loads(raw)

    with open(profiles_path, 'r') as f:
        profiles = json.load(f)
        car_model = profiles[user]["cars"][car_index]["car_model"].lower()

    with open(claims_path, 'r+') as file:
        data = json.load(file)
        claim_set = data[user][car_model]
        new_id = str(len(claim_set) + 1)
        data[user][car_model][new_id] = parsed
        file.seek(0)
        json.dump(data, file, indent=4)

    return {"status": "ok", "id": new_id}

@app.route("/update_claim", methods=["GET"])
def update_claim():  # ← renamed
    raw = request.args.get("json")
    user = request.args.get("user")
    car_index = int(request.args.get("car"))
    claimId = str(request.args.get("claimId"))

    profiles_path = os.path.join(BASE_DIR, '../Cam-eron-Frontend/src/lib/profiles.json')
    claims_path = os.path.join(BASE_DIR, '../Cam-eron-Frontend/src/lib/claims/claims.json')

    parsed = json.loads(raw)

    with open(profiles_path, 'r') as f:
        profiles = json.load(f)
        car_model = profiles[user]["cars"][car_index]["car_model"].lower()

    with open(claims_path, 'r+') as file:
        data = json.load(file)
        data[user][car_model][claimId] = parsed
        file.seek(0)
        json.dump(data, file, indent=4)

    return {"status": "ok", "claim_id": claimId}

@app.route("/get_claims", methods=["GET"])
def get_claims():
    user = request.args.get("user")
    car_index = int(request.args.get("car"))
    
    with open(os.path.join(BASE_DIR, '../Cam-eron-Frontend/src/lib/profiles.json'), 'r') as f:
        profiles = json.load(f)
        car_model = profiles[user]["cars"][car_index]["car_model"].lower()

    with open(os.path.join(BASE_DIR, '../Cam-eron-Frontend/src/lib/claims/claims.json'), 'r') as f:
        data = json.load(f)
        claims = data[user][car_model]

    return claims
