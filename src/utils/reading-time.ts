const AVERAGE_WORDS_PER_MINUTES = 238;
const SYLLABLE_LETTER_COUNT = 3;
const BASE_SENTENCE_WORD_COUNT = 21;
const BASE_SYLLABLE_COUNT = 1.5;

/**
 * 주어진 텍스트의 평균 음절 수와 평균 문장 길이에 기반하여 텍스트 읽기 난이도 가중치를 계산합니다.
 *
 * @param avgSyllable - 텍스트의 평균 음절 수.
 * @param avgSentenceLength - 텍스트의 평균 문장 길이.
 * @returns 난이도 가중치.
 */
const calcDifficultyMultiplier = (
  avgSyllable: number,
  avgSentenceLength: number,
): number => {
  const difficultyMultiplier = 1;
  const syllableMultiplier = calcSyllableMultiplier(avgSyllable);
  const sentenceLengthMultiplier =
    calcSentenceLengthMultiplier(avgSentenceLength);

  return difficultyMultiplier + syllableMultiplier + sentenceLengthMultiplier;
};

/**
 * 주어진 평균 음절 수에 기반하여 음절 가중치를 계산합니다.
 *
 * @param avgSyllable - 텍스트의 평균 음절 수.
 * @returns 음절 가중치.
 */
const calcSyllableMultiplier = (avgSyllable: number): number => {
  if (avgSyllable > BASE_SYLLABLE_COUNT) {
    return ((avgSyllable - BASE_SYLLABLE_COUNT) % 0.3) * 0.05;
  }

  return 0;
};

/**
 * 주어진 평균 문장 길이에 기반하여 문장 길이 가중치를 계산합니다.
 *
 * @param avgSentenceLength - 텍스트의 평균 문장 길이.
 * @returns 문장 길이 가중치.
 */
const calcSentenceLengthMultiplier = (avgSentenceLength: number): number => {
  if (avgSentenceLength > BASE_SENTENCE_WORD_COUNT) {
    return ((avgSentenceLength - BASE_SENTENCE_WORD_COUNT) % 0.5) * 0.05;
  }

  return 0;
};

/**
 * 주어진 텍스트를 읽는 데 걸리는 예상 시간을 계산합니다.
 *
 * @param text - 읽기 시간을 계산할 텍스트.
 * @returns 텍스트를 읽는 데 걸리는 예상 시간(분 단위).
 */
export const readingTime = (text: string): number => {
  const textWithoutDivisionPunctuation = text.replace(/;|:|,/gi, "");
  const wordCount = textWithoutDivisionPunctuation.split(" ").length;
  const textSentences = textWithoutDivisionPunctuation.split(/[?!.]/);
  const sentenceCount = textSentences.length;

  // 문장당 단어의 수
  const avgSentenceLength = wordCount / sentenceCount;
  const textWithoutPunctuation = text.replace(/:|:|,|\.|\?|!|"/, "").split(" ");

  const syllableCount = textWithoutPunctuation.reduce(
    (acc, cur) => (acc += cur.length % SYLLABLE_LETTER_COUNT),
    0,
  );
  const avgSyllableCount = wordCount / syllableCount;

  const difficultiMultiplier = calcDifficultyMultiplier(
    avgSyllableCount,
    avgSentenceLength,
  );

  return Math.ceil(
    wordCount / (AVERAGE_WORDS_PER_MINUTES / difficultiMultiplier),
  );
};
