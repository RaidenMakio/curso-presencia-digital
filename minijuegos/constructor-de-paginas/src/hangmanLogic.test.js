import { describe, it, expect } from "vitest";
import { normalizeWord, evaluateLetterGuess } from "./hangmanLogic.js";

describe("normalizeWord", () => {
  it("pasa a mayúsculas, saca acentos y quita caracteres no A-Z", () => {
    expect(normalizeWord("Párrafo!")).toBe("PARRAFO");
    expect(normalizeWord("  tipografía ")).toBe("TIPOGRAFIA");
  });
});

describe("evaluateLetterGuess", () => {
  it("detecta una letra correcta que no completa la palabra", () => {
    const result = evaluateLetterGuess("HTML", "H", new Set());
    expect(result.correct).toBe(true);
    expect(result.wordSolved).toBe(false);
  });

  it("detecta cuando la última letra correcta completa la palabra", () => {
    const result = evaluateLetterGuess("HI", "I", new Set(["H"]));
    expect(result.correct).toBe(true);
    expect(result.wordSolved).toBe(true);
  });

  it("detecta una letra incorrecta", () => {
    const result = evaluateLetterGuess("HTML", "Z", new Set());
    expect(result.correct).toBe(false);
    expect(result.wordSolved).toBe(false);
  });

  it("no depende de mayúsculas/minúsculas de la letra ingresada", () => {
    const result = evaluateLetterGuess("HTML", "h", new Set());
    expect(result.correct).toBe(true);
  });
});
