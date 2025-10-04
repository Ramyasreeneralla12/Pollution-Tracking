// Initialize Leaflet Map centered over India
const map = L.map('map').setView([22.9734, 78.6569], 5);

// Add OpenStreetMap tiles
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 18,
}).addTo(map);

// Cities with lat/lon coordinates
const locations = {
  "Delhi": [28.6139, 77.2090], "Mumbai": [19.0760, 72.8777], "Chennai": [13.0827, 80.2707],
  "Bengaluru": [12.9716, 77.5946], "Hyderabad": [17.3850, 78.4867], "Kolkata": [22.5726, 88.3639],
  "Ahmedabad": [23.0225, 72.5714], "Lucknow": [26.8467, 80.9462], "Bhopal": [23.2599, 77.4126],
  "Jaipur": [26.9124, 75.7873], "Patna": [25.5941, 85.1376], "Ranchi": [23.3441, 85.3096],
  "Raipur": [21.2514, 81.6296], "Guwahati": [26.1433, 91.7898], "Panaji": [15.4909, 73.8278],
  "Thiruvananthapuram": [8.5241, 76.9366], "Shimla": [31.1048, 77.1734], "Chandigarh": [30.7333, 76.7794],
  "Gangtok": [27.3389, 88.6065], "Aizawl": [23.7271, 92.7176], "Kohima": [25.6701, 94.1077],
  "Agartala": [23.8315, 91.2868], "Itanagar": [27.0844, 93.6053], "Imphal": [24.8170, 93.9368],
  "Dispur": [26.1433, 91.7898], "Srinagar": [34.0837, 74.7973], "Dehradun": [30.3165, 78.0322],
  "Bhubaneswar": [20.2961, 85.8245], "Gandhinagar": [23.2156, 72.6369]
};

// Wind direction in degrees (for arrows)
const windAngles = {
  N: 0, NE: 45, E: 90, SE: 135,
  S: 180, SW: 225, W: 270, NW: 315
};

// Health advice based on pollutant levels
function getHealthAdvice(o3, no2) {
  if (o3 > 100 || no2 > 80) {
    return "🔴 High Pollution: Avoid outdoor activities, wear N95 mask.";
  } else if (o3 > 70 || no2 > 60) {
    return "🟠 Moderate Pollution: Sensitive people should take precautions.";
  } else if (o3 > 30 || no2 > 20) {
    return "🟡 Low Pollution: General public should be cautious.";
  } else {
    return "🟢 Good Air Quality: Safe to go outside.";
  }
}

// ✅ Use deployed backend URL
const backendURL = 'https://pollution-tracking-1.onrender.com'; 

// Fetch pollution predictions from backend
fetch(`${backendURL}/predict`)
  .then(response => response.json())
  .then(data => {
    data.forEach(entry => {
      const city = entry.city;
      const o3 = entry.o3;
      const no2 = entry.no2;
      const wind = entry.wind;
      const coords = locations[city];

      if (!coords) return;

      const [lat, lon] = coords;

      let color = 'green';
      if (o3 > 100 || no2 > 80) {
        color = 'red';
      } else if (o3 > 70 || no2 > 60) {
        color = 'orange';
      } else if (o3 > 30 || no2 > 20) {
        color = 'yellow';
      }

      L.circle([lat, lon], {
        color: color,
        fillColor: color,
        fillOpacity: 0.6,
        radius: 5000
      }).addTo(map).bindPopup(`
        <b>📍 ${city}</b><br>
        <b>O₃ Level:</b> ${o3} µg/m³<br>
        <b>NO₂ Level:</b> ${no2} µg/m³<br>
        <b>Wind Direction:</b> ${wind}<br>
        <b>Health Advice:</b> ${getHealthAdvice(o3, no2)}
      `);

      const angle = windAngles[wind];
      if (angle !== undefined) {
        const arrowLength = 0.3;
        const dx = arrowLength * Math.cos(angle * Math.PI / 180);
        const dy = arrowLength * Math.sin(angle * Math.PI / 180);
        const latlngs = [[lat, lon], [lat + dy, lon + dx]];

        L.polyline(latlngs, {
          color: 'blue',
          weight: 2,
          dashArray: '5, 5'
        }).addTo(map);
      }
    });
  })
  .catch(err => console.error("Error fetching pollution data:", err));
