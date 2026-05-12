# Lahore Lead Matrix 📍

A geospatial lead generation and market gap analysis tool specializing in commercial real estate and business distribution for **DHA Lahore Phase 4**.

## 🚀 Overview
This tool identifies successful businesses in Lahore (specifically Gulberg and DHA Phases 5/6) that currently lack a presence in DHA Phase 4, highlighting high-potential expansion opportunities.

## 🛠 Features
- **AI-Powered Gap Analysis**: Uses **Groq (Llama 3.3)** to identify real-world business expansions and market voids.
- **Geospatial Visualization**: Interactive map powered by **OpenStreetMap** (no API key/billing required for mapping).
- **Sector Intelligence**: Breakdown of Sercors AA, BB, CC, XX, and DD commercial velocity.
- **Priority Filtering**: Categorizes leads by "High" or "Medium" based on distance from existing branches.

## 🔑 Setup
To run the AI research agent, you need an API key from [GroqCloud](https://console.groq.com/).

1. Open **Settings** > **Secrets** in AI Studio.
2. Add a new secret:
   - **Key**: `GROQ_API_KEY`
   - **Value**: `your_groq_api_key_here`
3. (Optional) `GEMINI_API_KEY` is supported as a fallback.

## 🗺 Technology Stack
- **Frontend**: React 19, Vite, Tailwind CSS 4.
- **Maps**: Leaflet & React-Leaflet (OpenStreetMap).
- **AI**: Groq SDK (Llama 3.3 70B).
- **Animations**: Motion (Framer Motion).
- **Icons**: Lucide React.

## 📊 Operational Phases
1. **Reasoning**: Analyzes demographic data for DHA Phase 4 (High-income residential).
2. **Research**: Scans for expanding brands in Gulberg and neighboring DHA phases.
3. **Filtering**: Applies "Gap Criteria" to ensure no current branch exists within a 2km radius.
