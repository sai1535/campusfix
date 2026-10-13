from fastapi import FastAPI
from pydantic import BaseModel

from .model import get_pipeline


class ClassifyRequest(BaseModel):
  text: str


class ClassifyResponse(BaseModel):
  category: str
  confidence: float


app = FastAPI(title="CampusFix ML Service")


@app.get("/health")
def health():
  return {"status": "ok"}


@app.post("/classify", response_model=ClassifyResponse)
def classify(request: ClassifyRequest):
  pipeline = get_pipeline()
  probs = pipeline.predict_proba([request.text])[0]
  labels = pipeline.classes_
  best_index = probs.argmax()
  return ClassifyResponse(category=str(labels[best_index]), confidence=float(probs[best_index]))

