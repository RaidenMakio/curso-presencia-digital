/* Lógica pura del Ahorcado — sin UI, fácil de testear aislada. */

const DIACRITICS_REGEX = new RegExp("[\\u0300-\\u036f]", "g");

export function normalizeWord(raw) {
  return raw
    .toUpperCase()
    .normalize("NFD")
    .replace(DIACRITICS_REGEX, "")
    .replace(/[^A-Z]/g, "");
}

export function evaluateLetterGuess(word, letter, guessedLetters) {
  const upperLetter = letter.toUpperCase();
  const correct = word.includes(upperLetter);
  const nextGuessed = correct ? new Set([...guessedLetters, upperLetter]) : guessedLetters;
  const uniqueLetters = new Set(word.split(""));
  const wordSolved = correct && [...uniqueLetters].every((l) => nextGuessed.has(l));
  return { correct, wordSolved };
}
