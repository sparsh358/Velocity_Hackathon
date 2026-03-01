# GloBar Relocation

An AI-powered relocation intelligence platform that ranks countries based on real-time data from multiple APIs. Enter any 3+ countries and get data-driven recommendations based on safety, air quality, climate, and population density — personalized to your risk tolerance and stay duration.

---

## 🚀 Features

- **Real-Time Country Analysis** — Fetches live data from 4 external APIs for every analysis request
- **Multi-Factor Scoring** — Evaluates countries across travel safety, health conditions, and environmental quality
- **Dynamic Weight System** — Adjusts scoring weights based on user-selected risk tolerance and stay duration
- **Smart Input Handling** — Supports country aliases (USA, UK, UAE), auto Title Case, deduplication, and input validation
- **Data Quality Tracking** — Reports whether each data point came from a live API or a fallback source
- **Graceful Degradation** — Individual API failures don't crash the analysis; fallback values keep results usable
- **AI-Powered Insights** — Optional Google Gemini integration generates natural-language explanations for each ranking
- **Modern React UI** — Dark-themed dashboard with score bars, metric chips, and ranked country cards

---

## 🛠 Tech Stack

| Layer        | Technology                                                                |
| ------------ | ------------------------------------------------------------------------- |
| **Backend**  | Node.js, Express 5                                                        |
| **Frontend** | React 18, Vite 5                                                          |
| **APIs**     | REST Countries, OpenWeather (Weather + AQI), World Bank, Google Gemini AI |
| **HTTP**     | Axios (backend), Fetch API (frontend)                                     |
| **Tooling**  | dotenv, CORS, Vite dev proxy                                              |

---

## 📂 Project Structure

```
globar-relocation/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   │   └── analyze.controller.js    # Main request handler — orchestrates the full pipeline
│   │   ├── routes/
│   │   │   └── analyze.route.js         # GET /analyze endpoint
│   │   ├── services/
│   │   │   ├── api/
│   │   │   │   ├── country.service.js   # REST Countries API (profile, capital, ISO code)
│   │   │   │   ├── weather.service.js   # OpenWeather API (temperature, lat/lon)
│   │   │   │   ├── aqi.service.js       # OpenWeather Air Pollution API (AQI 1-5)
│   │   │   │   └── advisory.service.js  # World Bank API (homicide rate + political stability)
│   │   │   ├── aggregation.service.js   # Combines all 4 API results per country
│   │   │   ├── normalization.service.js # Converts raw values to 0-100 scale
│   │   │   ├── scoring.service.js       # Computes travel, health, environment scores
│   │   │   ├── weight.service.js        # Dynamic weight calculation per user preferences
│   │   │   ├── ranking.service.js       # Sorts countries by final weighted score
│   │   │   └── rag.services.js          # Google Gemini AI explanation layer
│   │   ├── middleware/                  # Error handling, logging, validation
│   │   ├── test/                        # Individual service test scripts
│   │   ├── app.js                       # Express app setup (CORS, routes)
│   │   └── server.js                    # Server entry point (port 5000)
│   ├── .env                             # API keys (not committed)
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── SearchForm.jsx           # Country input, risk tolerance, duration selectors
│   │   │   ├── ResultsSection.jsx       # Summary banner, weight bar, cards grid
│   │   │   └── CountryCard.jsx          # Individual country score card
│   │   ├── App.jsx                      # Root component — state management + API calls
│   │   ├── App.css                      # Component-scoped styles
│   │   ├── index.css                    # Global styles + dark theme
│   │   └── main.jsx                     # React entry point
│   ├── vite.config.js                   # Vite config + proxy to backend
│   └── package.json
├── .gitignore
└── README.md
```

---

## ⚙️ Installation & Setup

### Prerequisites

- **Node.js** v18+ and npm
- An **OpenWeather API key** ([get one free](https://openweathermap.org/api))
- _(Optional)_ A **Google Gemini API key** ([get one](https://aistudio.google.com/apikey)) for AI insights

### 1. Clone the Repository

```bash
git clone https://github.com/sparsh358/Velocity_Hackathon.git
cd Velocity_Hackathon
```

### 2. Install Backend Dependencies

```bash
cd backend
npm install
```

### 3. Create Environment File

```bash
# Inside the backend/ directory
cp .env.example .env   # or create manually
```

Add your API keys to `backend/.env`:

```env
OPENWEATHER_API_KEY=your_openweather_api_key
GEMINI_API_KEY=your_gemini_api_key          # optional
```

### 4. Install Frontend Dependencies

```bash
cd ../frontend
npm install
```

### 5. Run the Application

**Terminal 1 — Backend:**

```bash
cd backend
npm start
# Server running on http://localhost:5000
```

**Terminal 2 — Frontend:**

```bash
cd frontend
npm run dev
# App running on http://localhost:3000
```

Open **http://localhost:3000** in your browser.

---

## 🌍 Environment Variables

Create a `.env` file inside the `backend/` folder:

| Variable              | Description                              | Required |
| --------------------- | ---------------------------------------- | -------- |
| `OPENWEATHER_API_KEY` | OpenWeather API key (weather + AQI data) | Yes      |
| `GEMINI_API_KEY`      | Google Gemini API key (AI explanations)  | No       |
| `PORT`                | Backend server port (default: 5000)      | No       |

**Example `.env`:**

```env
OPENWEATHER_API_KEY=your_key_here
GEMINI_API_KEY=your_key_here
PORT=5000
```

> **Note:** REST Countries API and World Bank API are free and require no API key.

---

## ▶️ How to Use

1. Open the app at `http://localhost:3000`
2. Enter **3 or more countries** separated by commas (e.g., `Japan, Germany, Australia, Canada`)
3. Select your **Risk Tolerance** (Low / Medium / High)
4. Select your **Stay Duration** (Short-term / Long-term)
5. Click **Analyze Countries**

The app will:

- Fetch live weather, air quality, and safety data for each country
- Normalize all metrics to a 0–100 scale
- Apply dynamic weights based on your preferences
- Rank countries from best to worst
- Display ranked cards with score breakdowns and individual metrics

---

## 📡 API Endpoint

### Analyze Countries

```
GET /analyze
```

**Query Parameters:**

| Parameter       | Type   | Description                           | Example                   |
| --------------- | ------ | ------------------------------------- | ------------------------- |
| `countries`     | string | Comma-separated country names (min 3) | `Japan,Germany,Australia` |
| `riskTolerance` | string | `Low`, `Medium`, or `High`            | `Medium`                  |
| `duration`      | string | `Short-term` or `Long-term`           | `Long-term`               |

**Example Request:**

```bash
curl "http://localhost:5000/analyze?countries=Japan,Germany,Australia&riskTolerance=Medium&duration=Long-term"
```

**Example Response:**

```json
{
  "metadata": {
    "totalRequested": 3,
    "totalAnalyzed": 3,
    "totalFailed": 0,
    "timestamp": "2026-03-01T10:30:00.000Z",
    "modelVersion": "1.0"
  },
  "input": {
    "countries": ["Japan", "Germany", "Australia"],
    "riskTolerance": "Medium",
    "duration": "Long-term"
  },
  "weights": {
    "travelWeight": 0.28,
    "healthWeight": 0.48,
    "environmentalWeight": 0.24
  },
  "ranked": [
    {
      "rank": 1,
      "country": "Japan",
      "finalScore": 76.19,
      "scoreBreakdown": {
        "travelScore": 73.16,
        "healthScore": 85.03,
        "environmentalScore": 62.04
      },
      "individualScores": {
        "airQualityScore": 75,
        "safetyScore": 84.28,
        "climateScore": 53.4,
        "populationScore": 91.79,
        "rawAdvisory": 84.28
      },
      "dataQuality": {
        "weatherLive": true,
        "aqiFallback": false,
        "advisoryLive": true
      }
    }
  ],
  "summary": {
    "bestCountry": "Japan",
    "bestScore": 76.19,
    "worstCountry": "Germany",
    "worstScore": 68.42
  }
}
```

---

## 🔄 Data Pipeline

The backend processes each request through a 6-stage pipeline:

```
Input → Aggregation → Normalization → Scoring → Weighting → Ranking → Response
```

| Stage             | Description                                                            |
| ----------------- | ---------------------------------------------------------------------- |
| **Aggregation**   | Fetches data from 4 APIs per country with per-API fallbacks            |
| **Normalization** | Converts raw values (AQI 1-5, temp °C, population) to 0-100 scale      |
| **Scoring**       | Computes travel, health, and environmental scores from normalized data |
| **Weighting**     | Calculates dynamic weights based on risk tolerance and stay duration   |
| **Ranking**       | Applies weights, computes final score, sorts best-to-worst             |
| **AI Enrichment** | _(Optional)_ Generates Gemini AI explanations for each ranked country  |

---

## 🚢 Deployment

### Build Frontend for Production

```bash
cd frontend
npm run build
```

The output will be in `frontend/dist/`. Serve it with any static file server or configure Express to serve it:

```javascript
// In app.js (optional)
app.use(express.static(path.join(__dirname, "../../frontend/dist")));
```

### Environment

- Set all environment variables on your hosting platform
- Backend runs on any Node.js 18+ environment (Render, Railway, Heroku, EC2)
- Frontend can be deployed to Vercel, Netlify, or served by the backend

---

## 🧪 Future Improvements

- **Cost of Living Data** — Integrate Numbeo or similar API for economic scoring
- **Healthcare Index** — Add WHO data for healthcare quality per country
- **Visa Requirements** — Factor in visa difficulty based on user's nationality
- **User Accounts** — Save and compare past analyses
- **Database Caching** — Cache API responses in Redis/MongoDB to reduce external calls
- **Interactive Map** — Visualize ranked countries on a world map
- **PDF Export** — Generate downloadable relocation reports
- **Multi-Language** — Support for non-English country name inputs
- **WebSocket Updates** — Stream results as each country loads instead of waiting for all

---

## 🤝 Contributing

Contributions are welcome! To get started:

1. **Fork** the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m "Add your feature"`
4. Push to the branch: `git push origin feature/your-feature`
5. Open a **Pull Request**

Please ensure your code follows the existing CommonJS module style for the backend.

---

## 📄 License

This project is open source and available under the [MIT License](https://opensource.org/licenses/MIT).

---

<p align="center">Built with ❤️ for the Velocity Hackathon</p>
