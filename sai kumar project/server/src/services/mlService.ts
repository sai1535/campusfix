import axios from "axios";
import { IssueCategory } from "../types/issue";

interface MlResponse {
  category: IssueCategory;
  confidence: number;
}

export const classifyIssue = async (
  text: string
): Promise<MlResponse | undefined> => {
  if (!process.env.ML_SERVICE_URL) return undefined;

  try {
    const { data } = await axios.post<MlResponse>(
      `${process.env.ML_SERVICE_URL}/classify`,
      { text }
    );
    return data;
  } catch (error) {
    console.warn("ML classification failed", error);
    return undefined;
  }
};


