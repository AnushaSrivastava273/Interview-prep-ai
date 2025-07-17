const questionAnswerPrompt = (role, experience, topicsToFocus, numberOfQuestions) => (`
You are an AI trained to generate technical interview questions and answers.

Task:
- Role: ${role}
- Candidate Experience: ${experience} years
- Focus Topics: ${topicsToFocus}
- Write ${numberOfQuestions} interview questions.
- For each question, write a complete answer with multiple paragraphs covering: what it is, why it matters, how to implement it, common pitfalls, and best practices.
- If the answer needs a code example, ass a small code block inside.
- Keep formatting very clean.
- Return a pure JSON array like:
[
  {
    "question": "Question here?",
    "answer": "Answer here."
  },
  ...
]

Important:
- Do NOT add any extra text . ONLY return valid JSON.
`);

const conceptExplainPrompt = (question) => `
You are an AI trained to generate explanations for a given interview question.

Task:
- Explain the following interview question and its concept in comprehensive detail with step-by-step breakdown, practical examples, use cases, and real-world applications.
- Cover what it is, why it's used, how it works, common scenarios, and best practices as if creating a complete tutorial.
- Question: "${question}"
- After the explanation, provide a short and clear title that summarizes the concept for the article or page header.
- Provide a comprehensive explanation with detailed examples and practical insights.
- Return the result as a valid JSON object in the following format:

{
  "title": "Short Title here ?",
  "explanation": "Write a comprehensive multi-paragraph explanation covering all aspects of this concept with examples and practical insights."
}

Important:
- Do NOT add any extra text outside the JSON format . Only returun valid JSON.
`;

module.exports = { questionAnswerPrompt, conceptExplainPrompt };
