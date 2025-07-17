const { GoogleGenAI } = require("@google/genai");
const { questionAnswerPrompt , conceptExplainPrompt } = require("../utils/prompts");

const ai = new GoogleGenAI({apiKey: process.env.GEMINI_API_KEY});

//@desc Generate interview Questions and answers using Gemini
//@route POST /api/ai/generate-questions
//@access Private
const generateInterviewQuestions = async(req , res) =>{
     console.log("generateInterviewQuestions called with body:", req.body);
    try {
        const{role , experience , topicsToFocus,numberOfquestions} = req.body ;
        if(!role || !experience || !topicsToFocus || !numberOfquestions){
            return res.status(400).json({message:"Missing required fields"});
        }
       
        const prompt = questionAnswerPrompt(role , experience , topicsToFocus , numberOfquestions);
        console.log(prompt);
        const response = await ai.models.generateContent({
            model : "gemini-2.0-flash-lite",
            contents: prompt ,
        });

        let rawText = response.text;

        const cleanedText = rawText
        .replace(/^```json\s*/, "")
        .replace(/```$/, "")
        .trim(); //remove extra spaces

        //now parsing
        const data = JSON.parse(cleanedText);

        return res.status(200).json(data);
    } catch (error) {
       res.status(500).json({
        message : "Failed to generate questions" ,
        error: error.message ,
       }); 
    }
};
//@desc Generate explains a interview question
//@route POST /api/ai/generate-explanation
//@access Private
const generateConceptExplanation = async (req, res) => {
  try {
    const { question } = req.body;
    if (!question) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const prompt = conceptExplainPrompt(question);

    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash-lite",
      contents: prompt,
    });
    let rawText = response.text;

    const cleanedText = rawText
      .replace(/^```json\s*/, "")
      .replace(/```$/, "")
      .trim(); // remove extra spaces

    const data = JSON.parse(cleanedText);

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({
      message: "Failed to generate questions",
      error: error.message,
    });
  }
};


module.exports = {
  generateInterviewQuestions,
  generateConceptExplanation
};