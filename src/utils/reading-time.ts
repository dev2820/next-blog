import { readingTime as _readingTime } from "reading-time-estimator";

const KOREAN_READING_SPEED_PER_WORD = 50;
export const readingTime = (content: string) => {
  return _readingTime(content, KOREAN_READING_SPEED_PER_WORD);
};
