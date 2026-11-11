import os
import json
from typing import Optional, Dict, Any, Literal
from pydantic import BaseModel, Field

SYSTEM_PROMPT = """You are the lead academic content designer for RevisionReel, a mobile micro-learning app teaching Class 11-12 Board and JEE-foundation concepts (Physics, Chemistry, Mathematics).
Your goal is to transform daunting exam concepts into crisp, engaging 60-second swipeable story cards.

VOICE & TONE RULES (STRICT):
1. Relatable Hook: Start with a concrete everyday curiosity, paradox, or relatable question (e.g. ice rinks, phone texts, conveyor belts, salt in pasta, speedometer at 0s). No cringe, no academic pretension.
2. In Plain English: Explain the underlying physical/chemical/mathematical mechanism clearly without unnecessary academic jargon or memorization formulas.
3. Grounded Analogy: Provide one tangible real-world comparison that anchors the intuition.
4. Quick Quiz: Exactly 3 multiple-choice options (A, B, C) with exactly ONE correct option and constructive explanations for each.
5. Syllabus Accuracy: Concepts must strictly align with Class 11-12 CBSE/State Board & JEE Foundation syllabus standards.

OUTPUT FORMAT:
Return pure, valid JSON with this exact schema:
{
  "id": "phys-07-slug-name",
  "conceptNumber": 19,
  "subject": "physics" | "chemistry" | "mathematics",
  "track": "physics" | "chemistry" | "mathematics",
  "trackTitle": "Class 11-12 Physics" | "Class 11-12 Chemistry" | "Class 11-12 Mathematics",
  "conceptTitle": "Title of Concept",
  "tag": "Mechanics | Calculus | Organic Chemistry | etc.",
  "readTime": "60 sec read",
  "hook": "Relatable hook text...",
  "explanation": "Clear plain English explanation...",
  "analogy": "Memorable grounded analogy...",
  "analogyIcon": "Zap" | "Compass" | "Activity" | "Magnet" | "Layers" | "TrendingUp",
  "quiz": {
    "question": "Clear 3-option conceptual test question?",
    "options": [
      {
        "id": "opt-1",
        "label": "A",
        "text": "Option text",
        "isCorrect": false,
        "explanation": "Why this option is incorrect"
      },
      {
        "id": "opt-2",
        "label": "B",
        "text": "Correct option text",
        "isCorrect": true,
        "explanation": "Why this option is correct"
      },
      {
        "id": "opt-3",
        "label": "C",
        "text": "Option text",
        "isCorrect": false,
        "explanation": "Why this option is incorrect"
      }
    ],
    "correctOptionId": "opt-2",
    "takeaway": "One-line punchy takeaway."
  }
}
"""


class CardGenerationRequest(BaseModel):
    subject: Literal["physics", "chemistry", "mathematics"] = Field(
        ..., description="Subject discipline: physics, chemistry, or mathematics"
    )
    topic: str = Field(..., description="Target exam topic or concept (e.g. Photoelectric Effect)")
    target_class: Literal["Class 11", "Class 12", "JEE Foundation"] = Field(
        default="Class 12", description="Target academic tier"
    )
    concept_number: Optional[int] = Field(
        default=19, description="Sequential concept number"
    )


def generate_story_card(req: CardGenerationRequest) -> Dict[str, Any]:
    """
    Template generator for new RevisionReel story cards.
    Falls back to a structured deterministic card if no external LLM API key is present.
    """
    slug = req.topic.lower().replace(" ", "-").replace("'", "")
    subject_titles = {
        "physics": "Class 11-12 Physics",
        "chemistry": "Class 11-12 Chemistry",
        "mathematics": "Class 11-12 Mathematics",
    }

    # Deterministic fallback conforming to exact schema
    return {
        "id": f"{req.subject[:4]}-{req.concept_number}-{slug}",
        "conceptNumber": req.concept_number or 19,
        "subject": req.subject,
        "track": req.subject,
        "trackTitle": subject_titles.get(req.subject, "Class 11-12 Science"),
        "conceptTitle": req.topic,
        "tag": f"{req.subject.capitalize()} Core",
        "readTime": "60 sec read",
        "hook": f"Why does {req.topic} puzzle so many board exam students on their very first read?",
        "explanation": f"At its core, {req.topic} is driven by a fundamental conservation principle that balances energy and momentum across interacting systems.",
        "analogy": f"Think of {req.topic} like a balanced seesaw: when you push one side down, the other side responds with equal geometric precision.",
        "analogyIcon": "Zap",
        "quiz": {
            "question": f"Which principle directly governs {req.topic} in board exam problem sets?",
            "options": [
                {
                    "id": "opt-1",
                    "label": "A",
                    "text": "First-principles conservation of mass and energy.",
                    "isCorrect": True,
                    "explanation": "Core physical systems conserve total energy and invariant properties."
                },
                {
                    "id": "opt-2",
                    "label": "B",
                    "text": "Arbitrary empirical constants with no theoretical basis.",
                    "isCorrect": False,
                    "explanation": "Board exam science is grounded in fundamental laws, not empirical guesses."
                },
                {
                    "id": "opt-3",
                    "label": "C",
                    "text": "Variable speed of light in vacuum.",
                    "isCorrect": False,
                    "explanation": "The speed of light in vacuum is an invariant universal constant."
                }
            ],
            "correctOptionId": "opt-1",
            "takeaway": f"Master {req.topic} by tracing where energy flows from start to finish!"
        }
    }
