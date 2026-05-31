export const QUESTIONS: { id: number; text: string }[] = [
  { id: 1, text: "Speaks the same language as you, other than English" },
  { id: 2, text: "Has visited another country on a mission trip" },
  { id: 3, text: "Has been to every single Public Worship event" },
  { id: 4, text: "Became a Christian within the last year" },
  { id: 5, text: "Has read through the entire Bible" },
  { id: 6, text: "Is currently reading a Christian book" },
  { id: 7, text: "Has the same favorite worship song as you" },
  { id: 8, text: "Was baptized in a lake, river, or ocean" },
  { id: 9, text: "Has a testimony of answered prayer from this year" },
  { id: 10, text: "Has the same birthday as you" },
  { id: 11, text: "Is left-handed" },
  { id: 12, text: "Has lived in at least three different cities" },
  { id: 13, text: "Plays a musical instrument" },
  { id: 14, text: "Can teach you a phrase in another language" },
  { id: 15, text: "Has run a race or marathon" },
  { id: 16, text: "Is wearing your favorite color" },
  { id: 17, text: "Has a prayer request they're comfortable sharing" },
  { id: 18, text: "Has something in common with your career or field of study" },
  { id: 19, text: "Shares a hobby with you" },
  { id: 20, text: "Can recommend a sermon, podcast, or devotional" },
  { id: 21, text: "Has been a Christian longer than you've been alive" },
  { id: 22, text: "Came to faith in college" },
  { id: 23, text: "Can quote a Bible verse from memory" },
  { id: 24, text: "Has attended church in another country" },
];

export const TOTAL_QUESTIONS = QUESTIONS.length;

export function normalizeName(name: string): string {
  return name.trim().toLowerCase().replace(/\s+/g, " ");
}
