// Server-side validation copy of the questions. Keep id values in sync with
// src/lib/questions.ts.
export const QUESTIONS: { id: number; text: string }[] = [
  { id: 1, text: "Knows a worship song in another language" },
  { id: 2, text: "Has visited another country on a mission trip" },
  { id: 3, text: "Has been to five Public Worship events" },
  { id: 4, text: "Became a Christian within the last year" },
  { id: 5, text: "Has read through the entire Bible" },
  { id: 6, text: "Was baptized in a lake, river, or ocean" },
  { id: 7, text: "Has a testimony of answered prayer from this year" },
  { id: 8, text: "Has the same birthday as you" },
  { id: 9, text: "Is left-handed" },
  { id: 10, text: "Has lived in at least three different cities" },
  { id: 11, text: "Plays a musical instrument" },
  { id: 12, text: "Has run a marathon" },
  { id: 13, text: "Has a prayer request they're comfortable sharing" },
  { id: 14, text: "Shares a hobby with you" },
  { id: 15, text: "Can recommend a sermon, podcast, or devotional" },
  { id: 16, text: "Can quote a Bible verse from memory" },
  { id: 17, text: "Came to faith in college" },
  { id: 18, text: "Has something in common with your career or field of study" },
  { id: 19, text: "Can teach you a phrase in another language" },
];

export const TOTAL_QUESTIONS = QUESTIONS.length;

export function normalizeName(name: string): string {
  return name.trim().toLowerCase().replace(/\s+/g, " ");
}
