import React, { useState, useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";
import Prism from "prismjs";
import "prismjs/themes/prism.css"; // Import PrismJS CSS
import CodeResponse from "./CodeResponse"; // Import CodeResponse component
import './Geminipage.css';
import analysisImage from './output_plot.png';


const GeminiAnalysis = () => {
  const [value, setValue] = useState("");
  const [error, setError] = useState("");
  const [chatHistory, setChatHistory] = useState([        {
    role: "user",
    parts: "start",
  },
  {
    role: "model",
    parts: "The histogram shows that the density of the crop is highest in the middle of the farm and lowest at the edges. This could be due to a number of factors, including the amount of sunlight that the different parts of the farm receive, the soil quality, and the availability of water. It is also possible that the farmer has planted more crops in the middle of the farm.The low density of crops at the edges of the farm could be due to a number of factors. It is possible that the soil is less fertile at the edges of the farm, or that the farmer has not planted as many crops there. It is also possible that the edges of the farm are more exposed to the wind, which could damage the crops.The farmer could take a number of steps to improve the density of the crop at the edges of the farm. They could add fertilizer to the soil, or they could plant more crops there. They could also build windbreaks to protect the crops from the wind.Overall, the farm appears to be in good condition. The density of the crop is highest in the middle of the farm and lowest at the edges, but this is likely due to a number of factors that can be easily addressed. With a few simple changes, the farmer could improve the density of the crop at the edges of the farm and increase their overall yield.",
  },]);
  const textareaRef = useRef(null);

  function autoResizeInput() {
    textareaRef.current.style.height = "auto";
    textareaRef.current.style.height = textareaRef.current.scrollHeight + "px";
  }

  const getResponse = async () => {
    if (!value) {
      setError("Please enter a question");
      return;
    }
    try {
      const options = {
        method: "POST",
        body: JSON.stringify({
          history: chatHistory,
          message: value,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      };
      const response = await fetch("http://localhost:8000/gemini", options);
      const data = await response.text();

      let formattedResponse = "";

      if (data.startsWith("**")) {
        formattedResponse = data;
      } else {
        formattedResponse = `**Bot:** ${data}`;
      }

      const formattedUserMessage = `**You:** ${value}`;

      setChatHistory((oldChatHistory) => [
        ...oldChatHistory,
        {
          role: "user",
          parts: formattedUserMessage,
        },
        {
          role: "model",
          parts: formattedResponse,
        },
      ]);

      setValue("");
      setError("");
      textareaRef.current.style.height = "auto";
    } catch (error) {
      console.error(error);
      setError("Something went wrong. Please try again later.");
    }
  };

  const clear = () => {
    setChatHistory([]);
    setValue("");
    setError("");
    textareaRef.current.style.height = "auto";
  };

  useEffect(() => {
    Prism.highlightAll();

  }, [chatHistory]);

  return (
    <div className="mn-container">
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <img
                src={analysisImage}
                alt=''
                style={{ height: '100%', width: '100%', objectFit: 'cover' }}
            />
        </div>
        <div>
            {/* <p>
                The histogram shows that the density of the crop is highest in the middle of the farm and lowest at the edges. This could be due to a number of factors, including the amount of sunlight that the different parts of the farm receive, the soil quality, and the availability of water. It is also possible that the farmer has planted more crops in the middle of the farm.
                The low density of crops at the edges of the farm could be due to a number of factors. It is possible that the soil is less fertile at the edges of the farm, or that the farmer has not planted as many crops there. It is also possible that the edges of the farm are more exposed to the wind, which could damage the crops.
                The farmer could take a number of steps to improve the density of the crop at the edges of the farm. They could add fertilizer to the soil, or they could plant more crops there. They could also build windbreaks to protect the crops from the wind.
                Overall, the farm appears to be in good condition. The density of the crop is highest in the middle of the farm and lowest at the edges, but this is likely due to a number of factors that can be easily addressed. With a few simple changes, the farmer could improve the density of the crop at the edges of the farm and increase their overall yield.
            </p> */}
        </div>
      <div className="input-container">
        <textarea
          ref={textareaRef}
          id="chat-input"
          value={value}
          placeholder="Ask further question...?"
          onChange={(e) => {
            setValue(e.target.value);
            autoResizeInput();
          }}
        />
        {!error && <button onClick={getResponse}>Ask me</button>}
        {error && <button onClick={clear}>Clear</button>}
      </div>
      {error && <p className="error">{error}</p>}
      <div className="search-result">
        {chatHistory.map((chatItem, index) => (
          <div key={index}>
            <div className="message">
              {chatItem.role === "user" ? (
                <div className="user-message">
                  <ReactMarkdown>{chatItem.parts}</ReactMarkdown>
                </div>
              ) : chatItem.parts.startsWith("```") ? (
                <CodeResponse code={chatItem.parts} />
              ) : (
                <div className="bot-message">
                  <ReactMarkdown>{chatItem.parts}</ReactMarkdown>
                </div>
              )}
            </div>
            {index !== chatHistory.length - 1 && <div className="message-gap" />}
          </div>
        ))}
      </div>
    </div>
  );
};

export default GeminiAnalysis;
