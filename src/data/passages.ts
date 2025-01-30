export interface Word {
  word: string;
  definition: string;
}

export interface Exercise {
  type: "fill-blanks" | "matching" | "multiple-choice" | "short-answer";
  question: string;
  options?: string[];
  answer: string | string[];
}

export interface Passage {
  id: string;
  title: string;
  content: string;
  vocabulary: Word[];
  exercises: Exercise[];
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
    exercises: [
      {
        type: "fill-blanks",
        question: "Eleanor was a wealthy __________ who used her money to help others.",
        answer: "philanthropist"
      },
      {
        type: "multiple-choice",
        question: "What allowed Thomas to take notes quickly while handling artifacts?",
        options: ["equilibrium", "ambidexterity", "precursors"],
        answer: "ambidexterity"
      },
      {
        type: "matching",
        question: "Match 'Malevolent' with its correct definition",
        options: ["Evil or harmful in intent", "To attract or tempt someone", "A look back at past events"],
        answer: "Evil or harmful in intent"
      },
      {
        type: "short-answer",
        question: "Why is the word malevolent appropriate to describe the spirit in the story?",
        answer: "The spirit is harmful and seeks to cause suffering, making malevolent fitting."
      }
    ]
  }
];