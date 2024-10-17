import "../../ComponentStyle/ChatBotStyle/ChatBot.css";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function ChatBot({ request }) {
  const [isLoading, setIsLoading] = useState(false);
  const [cResponse, setCResponse] = useState("");

  async function query(data) {
    setIsLoading(true);
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
    setIsLoading(false);
    return result;
  }

  useEffect(() => {
    query({
      inputs: request,
    }).then((response) => {
      setCResponse(response[0].generated_text);
    });
  }, [request]);
  return (
    <div className="ChatBotResponse">
      {isLoading ? (
        <motion.div
          animate={{
            scale: [1, 2, 2, 1, 1],
            rotate: [0, 0, 360, 360, 0],
            borderRadius: ["20%", "20%", "50%", "50%", "20%"],
          }}
          transition={{
            duration: 2,
            ease: "easeInOut",
            times: [0, 0.2, 0.5, 0.8, 1],
            repeat: Infinity,
            repeatDelay: 1,
          }}
          style={{
            padding: "7vh",
          }}
        >
          Loading
        </motion.div>
      ) : (
        cResponse
      )}
    </div>
  );
}
