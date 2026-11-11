from typing import List, Literal, Optional
from pydantic import BaseModel, Field

SubjectType = Literal["physics", "chemistry", "mathematics"]
OptionLabel = Literal["A", "B", "C"]


class QuizOption(BaseModel):
    id: str = Field(..., description="Unique option identifier (e.g. opt-1)")
    label: OptionLabel = Field(..., description="Option letter: A, B, or C")
    text: str = Field(..., description="Plain-English text of the choice")
    isCorrect: bool = Field(..., description="Whether this choice is the correct answer")
    explanation: Optional[str] = Field(
        None, description="Concise explanation why this choice is right or wrong"
    )


class Quiz(BaseModel):
    question: str = Field(..., description="Quick 3-option conceptual test question")
    options: List[QuizOption] = Field(..., description="List of 3 options")
    correctOptionId: str = Field(..., description="ID of the correct option")
    takeaway: str = Field(..., description="Single-sentence memory hook takeaway")


class StoryCardData(BaseModel):
    id: str = Field(..., description="Unique slug for the card, e.g. 'phys-01-newton-third-law'")
    conceptNumber: int = Field(..., description="Sequential index within syllabus")
    subject: SubjectType = Field(..., description="physics | chemistry | mathematics")
    track: str = Field(..., description="Backward compatible alias for subject")
    trackTitle: str = Field(..., description="Subject display title, e.g. 'Class 11-12 Physics'")
    conceptTitle: str = Field(..., description="Crisp concept title")
    tag: str = Field(..., description="Sub-discipline tag, e.g. 'Mechanics', 'Calculus'")
    readTime: str = Field(default="60 sec read", description="Estimated reading time")
    hook: str = Field(..., description="Relatable real-world paradox or hook question")
    explanation: str = Field(..., description="Plain-English explanation without jargon")
    analogy: str = Field(..., description="Grounded everyday mental model analogy")
    analogyIcon: Optional[str] = Field(default=None, description="Lucide icon identifier name")
    quiz: Quiz = Field(..., description="Interactive 3-option quiz")
