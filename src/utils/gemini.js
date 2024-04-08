import { GoogleGenerativeAI } from "@google/generative-ai";
import { GEMINI_KEY } from "./constants";

// Access your API key (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(GEMINI_KEY);


export default genAI; 