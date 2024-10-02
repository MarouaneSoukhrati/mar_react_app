import "../../ComponentStyle/ChatBotStyle/ChatBot.css";
import { useState, useEffect } from "react";
//import fetch from "node-fetch";

async function query(data) {
  const response = await fetch(
    "https://api-inference.huggingface.co/models/openai-community/gpt2",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer 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`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );
  const result = await response.json();
  return result;
}

export default function ChatBot({ request }) {
  let [cResponse, setCResponse] = useState("");

  useEffect(() => {
    query({
      inputs: request,
    }).then((response) => {
      setCResponse(response[0].generated_text);
    });
  }, [request]);
  return <div className="ChatBotResponse">{cResponse}</div>;
}
