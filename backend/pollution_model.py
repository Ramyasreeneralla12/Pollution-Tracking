import random

def predict_pollution(city_name):
    # Generate random values for O3 and NO2 in µg/m³ (micrograms per cubic meter)
    o3 = round(random.uniform(10, 120), 2)
    no2 = round(random.uniform(10, 100), 2)
    wind = random.choice(["N", "NE", "E", "SE", "S", "SW", "W", "NW"])
    return o3, no2, wind

def get_predictions():
    cities = [
        "Delhi", "Mumbai", "Chennai", "Bengaluru", "Hyderabad", "Kolkata", "Ahmedabad",
        "Lucknow", "Bhopal", "Jaipur", "Patna", "Ranchi", "Raipur", "Guwahati", "Panaji",
        "Thiruvananthapuram", "Shimla", "Chandigarh", "Gangtok", "Aizawl", "Kohima", "Agartala",
        "Itanagar", "Imphal", "Dispur", "Srinagar", "Dehradun", "Bhubaneswar", "Gandhinagar"
    ]

    prediction_data = []
    for city in cities:
        o3, no2, wind = predict_pollution(city)
        prediction_data.append({
            "city": city,
            "o3": o3,
            "no2": no2,
            "wind": wind
        })
    return prediction_data
