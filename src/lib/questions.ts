export type Question = {
  id: number;
  emoji: string;
  text: string;
  short: string;
  instruction?: string;
  noteLabel?: string;
  notePlaceholder?: string;
};

export const QUESTIONS: Question[] = [
  {
    id: 1,
    emoji: "🎶",
    text: "Knows a worship song in another language",
    short: "Worship in another tongue",
    instruction: "Write their name and the song they shared.",
    noteLabel: "the song",
    notePlaceholder: "Way Maker · Resucitó · Cuán Grande es Él…",
  },
  {
    id: 2,
    emoji: "✈️",
    text: "Has visited another country on a mission trip",
    short: "Mission abroad",
  },
  {
    id: 3,
    emoji: "🛐",
    text: "Has been to five Public Worship events",
    short: "Public Worship Stan",
  },
  {
    id: 4,
    emoji: "✝️",
    text: "Became a Christian within the last year",
    short: "New in the faith",
  },
  {
    id: 5,
    emoji: "📖",
    text: "Has read through the entire Bible",
    short: "Cover to cover",
  },
  {
    id: 6,
    emoji: "🌊",
    text: "Was baptized in a lake, river, or ocean",
    short: "Baptized in nature",
  },
  {
    id: 7,
    emoji: "🙏🏾",
    text: "Has a testimony of answered prayer from this year",
    short: "Answered prayer",
  },
  {
    id: 8,
    emoji: "🎉",
    text: "Has the same birthday as you",
    short: "Same birthday",
  },
  {
    id: 9,
    emoji: "✋🏻",
    text: "Is left-handed",
    short: "Left-handed",
  },
  {
    id: 10,
    emoji: "🌆",
    text: "Has lived in at least three different cities",
    short: "Three cities or more",
  },
  {
    id: 11,
    emoji: "🎸",
    text: "Plays a musical instrument",
    short: "Plays an instrument",
  },
  {
    id: 12,
    emoji: "🏃‍♂️",
    text: "Has run a marathon",
    short: "Ran a marathon",
  },
  {
    id: 13,
    emoji: "🙏🏾",
    text: "Has a prayer request they're comfortable sharing",
    short: "A prayer to share",
    instruction: "Take a moment to pray with them after they share.",
  },
  {
    id: 14,
    emoji: "🏓",
    text: "Shares a hobby with you",
    short: "Shared hobby",
  },
  {
    id: 15,
    emoji: "🎧",
    text: "Can recommend a sermon, podcast, or devotional",
    short: "A recommendation",
  },
  {
    id: 16,
    emoji: "🧠",
    text: "Can quote a Bible verse from memory",
    short: "A verse by heart",
    instruction: "Write their name and the Bible verse they quoted.",
    noteLabel: "the verse they quoted",
    notePlaceholder: "John 3:16…",
  },
  {
    id: 17,
    emoji: "🎓",
    text: "Came to faith in college",
    short: "Faith in college",
  },
  {
    id: 18,
    emoji: "📚",
    text: "Has something in common with your career or field of study",
    short: "Same field",
  },
  {
    id: 19,
    emoji: "🌎",
    text: "Can teach you a phrase in another language",
    short: "Teach a phrase",
    instruction: "Write the phrase they taught you and what it means.",
    noteLabel: "the phrase + meaning",
    notePlaceholder: "'hola' — hello",
  },
  {
    id: 20,
    emoji: "😴",
    text: "Has fallen asleep during a sermon",
    short: "Sermon snoozer",
  },
];

export const TOTAL_QUESTIONS = QUESTIONS.length;
