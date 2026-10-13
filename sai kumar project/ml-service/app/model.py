from __future__ import annotations

from dataclasses import dataclass
from functools import lru_cache
from typing import List

from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.pipeline import Pipeline


@dataclass(frozen=True)
class TrainingExample:
  text: str
  label: str


def _training_data() -> List[TrainingExample]:
  return [
    TrainingExample("bus route delay transport shuttle late", "Transport"),
    TrainingExample("wifi drops network connectivity internet lab", "Wi-Fi"),
    TrainingExample("projector not working lecture hall classroom", "Infrastructure"),
    TrainingExample("lab equipment broken chemicals missing", "Lab"),
    TrainingExample("hostel water leakage dormitory room", "Hostel"),
    TrainingExample("air conditioning broken library heat", "Infrastructure"),
    TrainingExample("elevator stuck maintenance", "Infrastructure"),
    TrainingExample("bus overcrowded students commute", "Transport"),
    TrainingExample("slow campus wifi authentication portal", "Wi-Fi"),
    TrainingExample("power outage engineering block", "Infrastructure"),
    TrainingExample("missing chairs classroom furniture", "Other"),
  ]


@lru_cache(maxsize=1)
def get_pipeline() -> Pipeline:
  examples = _training_data()
  pipeline = Pipeline(
    [
      ("vectorizer", TfidfVectorizer(ngram_range=(1, 2))),
      ("classifier", LogisticRegression(max_iter=1000)),
    ]
  )
  pipeline.fit([example.text for example in examples], [example.label for example in examples])
  return pipeline


