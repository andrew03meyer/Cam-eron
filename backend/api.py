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


@app.route("/create_user", methods=["GET"])
def create_user():
    name = request.args.get("name")
    age = request.args.get("age")
    policy = request.args.get("policy")
    make = request.args.get("make")
    model = request.args.get("model")

    print(f"Received: name={name}, age={age}, policy={policy}, make={make}, model={model}")

    user_key = name.replace(" ", "_").lower()

    new_entry_profile = {
        user_key: {
            "name": name,
            "age": age,
            "policy": policy.upper(),
            "cars": [
                {
                    "car_make": make[0].upper() + make[1:],
                    "car_model": model[0].upper() + model[1:]
                }
            ],
            "claims": []
        }
    }

    new_entry_claim = {
        user_key: {
            model.lower(): {
                "1": {}
            }
        }
    }

    profiles_path = os.path.join(BASE_DIR, '../Cam-eron-Frontend/src/lib/profiles.json')
    claims_path = os.path.join(BASE_DIR, '../Cam-eron-Frontend/src/lib/claims/claims.json')
    try:
        with open(profiles_path, 'r+') as f:
            profiles = json.load(f)
            profiles.update(new_entry_profile)
            f.seek(0)
            f.truncate()
            json.dump(profiles, f, indent=4)
        print("Profiles written successfully")
    except Exception as e:
        return({"Claims error": {e}})

    try:
        with open(claims_path, 'r+') as f:
            claims = json.load(f)
            claims.update(new_entry_claim)
            f.seek(0)
            f.truncate()
            json.dump(claims, f, indent=4)
        print("Claims written successfully")
    except Exception as e:
        return({"Claims error": {e}})

    return {"status": "ok"}
