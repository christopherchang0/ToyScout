ToyScout is a web app to help sellers find their old, unfamiliar toys, and sell it at the correct price. Users can upload a photo of their toy, ToyScout analyzes, and returns the identified toy and its own estimated value. Scan History is also indicated alongside recent purchases, keeping track of sales and inventory.

## Tech Stack:
    - Frontend: React + Vite
    - Backend: FastAPI, Python
    - AI: Claude Sonnet 4-5
    - Auth: Firebase
    - Database: Supabase

## Features:
    - Real-time scan status updates and polling
    - Scan history with sorting
    - Multi-image upload
    - Resale value estimates (need to find alternative from ebay api)

## Getting Started:

## Backend
    cd backend && pip install -r 

    requirements.txt && uvicorn main:app --reload

## Frontend

    cd frontend && npm install && npm run dev

## Required Environment Variables:

    - ANTHROPIC_API_KEY
    - SUPABASE_URL
    - SUPABASE_KEY
    - FIREBASE_CREDENTIALS_PATH (path to the JSON service account file)
    - FIREBASE_DB_URL


## System Architecture:
    Image upload → FastAPI → Claude vision API → Supabase storage, with Firebase for real-time status polling