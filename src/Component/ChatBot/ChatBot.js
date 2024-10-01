import "../../ComponentStyle/ChatBotStyle/ChatBot.css";
import { useState, useEffect } from "react";
import fetch from "node-fetch";

const inference = new HfInference("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");

async function query2(data) {
    const response = await fetch(
        "https://api-inference.huggingface.co/models/openai-community/gpt2",
        {
            method: "POST",
            headers: {
                Authorization: `Bearer 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`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        },
    );
    const result = await response.json();
    return result;
}

async function query(data) {
    let response = [];
    for await (const chunk of inference.chatCompletionStream({
        model: "google/gemma-2-2b-it",
        messages: [{ role: "user", content: request }],
        max_tokens: 500,
    })) {
        response.append(chunk.choices[0]?.delta?.content || "");
    }
    let fResponse = response.join();
    return fResponse;
}

export default function ChatBot({ request }) {
    let [cResponse, setCResponse] = useState("");

    useEffect(() => {
        /*query({
            inputs: request,
        }).then((response) => {
            setCResponse(response[0].generated_text);
        });*/
        query({
            inputs: request,
        }).then((response) => {
            setCResponse("lol");
            console.log(response);
        });
    }, [request]);
    return <div className="ChatBotResponse">{cResponse}</div>;
}
