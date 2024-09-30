import { useState, useEffect } from "react";
import fetch from "node-fetch";

async function query(data) {
    const response = await fetch(
        "https://api-inference.huggingface.co/models/gpt2",
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

export default function ChatBot() {
    let [cResponse, setCResponse] = useState("");

    useEffect(() => {
        query({ inputs: "Today is a great day" }).then((response) => {
            setCResponse(response[0].generated_text);
        });
    }, []);
    return <div>{cResponse}</div>;
}
