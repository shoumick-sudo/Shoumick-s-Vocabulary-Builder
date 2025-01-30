export interface Word {
  word: string;
  definition: string;
}

export interface FillBlankExercise {
  type: "fill-blanks";
  question: string;
  answer: string;
}

export interface MatchingExercise {
  type: "matching";
  word: string;
  definition: string;
  correctIndex: number;
}

export interface MultipleChoiceExercise {
  type: "multiple-choice";
  question: string;
  options: string[];
  correctAnswer: string;
}

export interface ShortAnswerExercise {
  type: "short-answer";
  question: string;
  sampleAnswer: string;
}

export type Exercise = 
  | FillBlankExercise
  | MatchingExercise
  | MultipleChoiceExercise
  | ShortAnswerExercise;

export interface Passage {
  id: string;
  title: string;
  content: string;
  vocabulary: Word[];
  fillBlanks: FillBlankExercise[];
  matching: MatchingExercise[];
  multipleChoice: MultipleChoiceExercise[];
  shortAnswer: ShortAnswerExercise[];
}

export const passages: Passage[] = [
  {
    id: "willowbrook",
    title: "The Shadows of Willowbrook",
    content: `In the quiet town of Willowbrook, philanthropist Eleanor Gray devoted her fortune to renovate the crumbling asylum on the outskirts, hoping to turn it into a community center. Though an introvert by nature, Eleanor's introspection led her to strive for social good, believing kindness was the antidote to the world's ills.

During renovations, workers uncovered strange, ambiguous symbols etched into the walls—precursors to a darker history. Local historian Thomas, ambidextrous and meticulous, deciphered them as warnings of a malevolent spirit trapped within. Eleanor dismissed the tales until odd occurrences began: tools went missing, cold spots aggravated workers' fears, and stray animals would stray near the building, only to vanish.

Determined to restore equilibrium, Eleanor organized a retrospective exhibit to confront the asylum's past. To entice skeptics, she displayed artifacts alongside Thomas's findings. But as visitors flocked in, the spirit's influence grew, twisting curiosity into paranoia.

In the end, Eleanor realized the true antidote wasn't ignoring the past but confronting it. With Thomas's help, she performed a ritual from the symbols, finally silencing the shadow. Willowbrook's scars began to heal, proving even darkness could be outshone by resolve.`,
    vocabulary: [
      { word: "philanthropist", definition: "Eleanor uses her wealth for community projects" },
      { word: "renovate", definition: "Restoring the old asylum into a functional space" },
      { word: "introvert", definition: "Eleanor's reserved personality contrasts with her public role" },
      { word: "introspection", definition: "Her reflective nature drives her charitable work" },
      { word: "strive", definition: "Her persistent effort to improve the town" },
      { word: "antidote", definition: "Symbolizes both literal and metaphorical solutions to evil" },
      { word: "ambiguous", definition: "The unclear symbols create mystery" },
      { word: "precursors", definition: "The markings hint at earlier supernatural events" },
      { word: "ambidextrous", definition: "Thomas's skill with both hands aids his research" },
      { word: "malevolent", definition: "The malicious spirit haunting the asylum" },
      { word: "aggravate", definition: "The spirit worsens the workers' anxiety" },
      { word: "equilibrium", definition: "Restoring balance to the town's energy" },
      { word: "retrospective", definition: "An exhibit reflecting on the asylum's history" },
      { word: "entice", definition: "Attracting visitors to the exhibit" },
      { word: "stray", definition: "Animals wandering near the dangerous site" }
    ],
    fillBlanks: [
      {
        type: "fill-blanks",
        question: "Eleanor was a wealthy __________ who used her money to help others.",
        answer: "philanthropist"
      },
      {
        type: "fill-blanks",
        question: "The asylum's __________ symbols left everyone unsure of their meaning.",
        answer: "ambiguous"
      },
      {
        type: "fill-blanks",
        question: "Thomas, who was __________, could write notes with both hands simultaneously.",
        answer: "ambidextrous"
      },
      {
        type: "fill-blanks",
        question: "The town hoped the community center would restore __________ after the chaos.",
        answer: "equilibrium"
      },
      {
        type: "fill-blanks",
        question: "The historian discovered the symbols were __________ to a haunting ritual.",
        answer: "precursors"
      }
    ],
    matching: [
      { type: "matching", word: "Malevolent", definition: "Evil or harmful in intent", correctIndex: 4 },
      { type: "matching", word: "Entice", definition: "To attract or tempt someone", correctIndex: 0 },
      { type: "matching", word: "Retrospective", definition: "A look back at past events", correctIndex: 2 },
      { type: "matching", word: "Stray", definition: "To wander away from safety", correctIndex: 5 },
      { type: "matching", word: "Aggravate", definition: "To make a situation worse", correctIndex: 1 },
      { type: "matching", word: "Ambidextrous", definition: "Skilled with both hands", correctIndex: 6 },
      { type: "matching", word: "Strive", definition: "To work hard toward a goal", correctIndex: 9 },
      { type: "matching", word: "Introspection", definition: "Deep self-reflection", correctIndex: 8 },
      { type: "matching", word: "Antidote", definition: "A solution to a problem, often metaphorical", correctIndex: 3 },
      { type: "matching", word: "Renovate", definition: "To repair or improve a building", correctIndex: 7 }
    ],
    multipleChoice: [
      {
        type: "multiple-choice",
        question: "The crumbling asylum needed to be __________ to become functional again.",
        options: ["Aggravated", "Renovated", "Introverted"],
        correctAnswer: "Renovated"
      },
      {
        type: "multiple-choice",
        question: "Thomas's __________ allowed him to take notes quickly while handling artifacts.",
        options: ["Equilibrium", "Ambidexterity", "Precursors"],
        correctAnswer: "Ambidexterity"
      },
      {
        type: "multiple-choice",
        question: "Eleanor believed kindness was the __________ to hatred.",
        options: ["Antidote", "Introspection", "Retrospective"],
        correctAnswer: "Antidote"
      },
      {
        type: "multiple-choice",
        question: "The __________ cat wandered too close to the haunted building.",
        options: ["Malevolent", "Stray", "Ambiguous"],
        correctAnswer: "Stray"
      },
      {
        type: "multiple-choice",
        question: "The historian's __________ exhibit revealed the asylum's hidden history.",
        options: ["Retrospective", "Equilibrium", "Precursors"],
        correctAnswer: "Retrospective"
      }
    ],
    shortAnswer: [
      {
        type: "short-answer",
        question: "Why is the word malevolent appropriate to describe the spirit in the story?",
        sampleAnswer: "The spirit is harmful and seeks to cause suffering, making malevolent fitting."
      },
      {
        type: "short-answer",
        question: "How does introspection influence Eleanor's actions?",
        sampleAnswer: "Eleanor's introspection (self-reflection) drives her to help others despite her shyness."
      },
      {
        type: "short-answer",
        question: "Explain how the precursors on the walls foreshadow events in the story.",
        sampleAnswer: "The precursors (early signs) hint at the ritual that trapped the spirit, foreshadowing the haunting."
      },
      {
        type: "short-answer",
        question: "What does equilibrium symbolize in Willowbrook's context?",
        sampleAnswer: "Equilibrium symbolizes balance and peace restored to the town after confronting the past."
      },
      {
        type: "short-answer",
        question: "Create your own sentence using strive and entice.",
        sampleAnswer: "The bakery used fresh bread smells to entice customers, making them strive to arrive early."
      }
    ]
  }
];