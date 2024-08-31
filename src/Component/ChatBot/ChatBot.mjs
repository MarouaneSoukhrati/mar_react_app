import OpenAI from "openai";

const OPENAI_API_KEY = process.env.REACT_APP_OPENAI;

const openai = new OpenAI({
  organization: "org-HLfIFoX452P8MKAwfhbfRvRx",
  project: "proj_wZ4qMZ8wZmxaFd1c52xb1lec",
  apiKey: OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

export const chatCompletion = await openai.chat.completions.create({
  messages: [{ role: "user", content: "Say this is a test" }],
  model: "gpt-4o-mini",
});
