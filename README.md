# MHP-Takeaway-Home


## Setup Instructions

### Prerequisites
- Node.js 18+
- OMDb API key from https://www.omdbapi.com/apikey.aspx

### Backend Setup
```bash
cd backend
npm install

# Add your OMDb API key to .env file:
# OMDB_API_KEY=your_key_here
# OMDB_BASE_URL=http://www.omdbapi.com

npm run start:dev
# Backend runs on http://localhost:3001