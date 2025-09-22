def get_recommendation(aqi):
    if aqi > 150:
        return "Hazardous: Stay indoors, wear N95 mask."
    elif aqi > 100:
        return "Unhealthy: Limit outdoor activities."
    elif aqi > 50:
        return "Moderate: Sensitive groups should wear masks."
    else:
        return "Good: Air is clean."
