import os
from typing import List, Optional
from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware

from models.card import StoryCardData
from data.cards import ALL_CARDS
from services.ai_generator import CardGenerationRequest, generate_story_card

app = FastAPI(
    title="RevisionReel API",
    description="Backend API serving Class 11-12 Board & JEE Foundation bite-sized micro-learning story cards and quizzes",
    version="1.0.0",
)

# CORS configuration supporting local development and production deployments (Vercel)
env_origins = os.getenv("CORS_ORIGINS", "")
origins = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
]
if env_origins:
    origins.extend([o.strip() for o in env_origins.split(",") if o.strip()])

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_origin_regex=r"^https:\/\/.*\.vercel\.app$",
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/health", tags=["Health"])
def health_check():
    """Health check endpoint to verify backend service status."""
    return {
        "status": "healthy",
        "service": "RevisionReel API",
        "version": "1.0.0",
        "total_cards": len(ALL_CARDS),
        "subjects": ["physics", "chemistry", "mathematics"],
    }


@app.get("/cards", response_model=List[StoryCardData], tags=["Cards"])
def get_cards(
    subject: Optional[str] = Query(
        None, description="Optional subject filter: 'physics', 'chemistry', or 'mathematics'"
    ),
    track: Optional[str] = Query(
        None, description="Alias for subject filter: 'physics', 'chemistry', or 'mathematics'"
    ),
):
    """
    Returns all story cards matching the TypeScript StoryCardData shape.
    Supports optional ?subject= or ?track= filtering.
    """
    filter_val = subject or track
    if filter_val:
        filter_lower = filter_val.lower()
        filtered = [
            card
            for card in ALL_CARDS
            if card.get("subject") == filter_lower or card.get("track") == filter_lower
        ]
        return filtered
    return ALL_CARDS


@app.get("/cards/{card_id}", response_model=StoryCardData, tags=["Cards"])
def get_card_by_id(card_id: str):
    """Fetch a single concept story card by its unique ID."""
    for card in ALL_CARDS:
        if card.get("id") == card_id:
            return card
    raise HTTPException(
        status_code=404,
        detail=f"Card with id '{card_id}' not found",
    )


@app.get("/subjects", tags=["Subjects"])
def get_subjects():
    """Returns available subjects and concept counts."""
    return [
        {
            "id": "physics",
            "title": "Class 11-12 Physics",
            "tagline": "Mechanics, Waves, Electromagnetism & Modern Physics",
            "icon": "Atom",
            "count": len([c for c in ALL_CARDS if c.get("subject") == "physics"]),
        },
        {
            "id": "chemistry",
            "title": "Class 11-12 Chemistry",
            "tagline": "Physical, Organic & Inorganic Equilibrium",
            "icon": "FlaskConical",
            "count": len([c for c in ALL_CARDS if c.get("subject") == "chemistry"]),
        },
        {
            "id": "mathematics",
            "title": "Class 11-12 Mathematics",
            "tagline": "Calculus, Vectors, Probability & Algebra",
            "icon": "Sigma",
            "count": len([c for c in ALL_CARDS if c.get("subject") == "mathematics"]),
        },
    ]


@app.get("/tracks", tags=["Subjects"])
def get_tracks():
    """Alias for /subjects to maintain seamless architectural parity with FinFluence."""
    return get_subjects()


@app.post("/cards/generate", response_model=StoryCardData, tags=["AI Generation"])
def generate_card(req: CardGenerationRequest):
    """
    Generates a new RevisionReel Story Card following the locked pedagogical voice:
    Relatable Hook -> Plain-English Explanation -> Grounded Analogy -> 3-Option Quiz.
    """
    new_card = generate_story_card(req)
    return new_card


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
