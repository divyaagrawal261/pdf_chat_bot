import "./App.css";
import { useState, useEffect, useRef } from "react";
import { Answer } from "./components/Answer.jsx";
import { Question } from "./components/Question.jsx";

function App() {
  const [fileName, setFileName] = useState("");
  const [isPdf, setIsPdf] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isQuestion, setIsQuestion] = useState("");
  const [messages, setMessages] = useState([]);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      if (file.type === "application/pdf") {
        setFileName(file.name);

        const formData = new FormData();
        formData.append("file", file);
        setIsLoading(true);
        fetch("http://localhost:8000/upload-pdf/", {
          method: "POST",
          body: formData,
        })
          .then((res) => res.json())
          .then((data) => {
            alert(data.message);
            setIsLoading(false);
            setIsPdf(true);
          });
      } else {
        alert("Only PDF files are allowed");
        setFileName("");
        setIsPdf(false);
        e.target.value = null;
      }
    }
  };

  return (
    <>
      <div className="bg-white shadow-lg h-14 flex justify-between p-2 mb-4">
        <div>
          <img
            src="https://framerusercontent.com/images/aH0aUDpSiUrVC1nwJAwiUCXUtU.svg?scale-down-to=512"
            className="h-full"
            alt="Logo"
          />
        </div>
        <div
          className={`border-2 ${
            isPdf ? "border-green-500" : "border-dashed border-gray-400"
          } rounded-md px-3 py-1`}
        >
          <label className="flex items-center space-x-2 cursor-pointer">
            <span className="text-gray-700">
              {fileName ? fileName : "+ Upload PDF"}
            </span>
            <input
              type="file"
              accept=".pdf"
              onChange={handleFileChange}
              className="hidden"
            />
          </label>
        </div>
      </div>

      <div className="overflow-scroll h-[80vh] px-4">
        {!isPdf && (
          <div className="text-center text-gray-500 mt-8 text-lg">
            Upload a PDF to get started.
          </div>
        )}

        {isPdf && (
          <div id="Conversation_Container" className="flex flex-col gap-4">
            {messages.map((msg, index) =>
              msg.type === "question" ? (
                <Question key={index} question={msg.text} />
              ) : (
                <Answer key={index} answer={msg.text} />
              )
            )}

            {isLoading && (
              <div className="flex justify-center w-full my-4 py-4">
                <div className="loader"></div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>
        )}
      </div>

      {isPdf && (
        <div className="absolute bottom-0 h-fit z-50 my-2 p-2 flex w-full gap-2 bg-white">
          <input
            type="text"
            className="text-xl border-2 rounded-lg w-full p-1"
            placeholder="Enter your query here"
            disabled={isLoading}
            value={isQuestion}
            onChange={(e) => setIsQuestion(e.target.value)}
          />

          <button
            type="submit"
            className={`border-2 p-2 rounded-lg ${
              isLoading ? "bg-gray-300 cursor-not-allowed" : "bg-gray-200"
            }`}
            disabled={isLoading}
            onClick={() => {
              if (!isQuestion.trim()) return;

              // Show loading, append the user's question
              setIsLoading(true);
              const currentQuestion = isQuestion;
              setMessages((prev) => [
                ...prev,
                { type: "question", text: currentQuestion },
              ]);
              setIsQuestion("");

              fetch(
                `http://localhost:8000/ask-question?question=${encodeURIComponent(
                  currentQuestion
                )}`,
                {
                  method: "POST",
                }
              )
                .then((res) => res.json())
                .then((data) => {
                  setMessages((prev) => [
                    ...prev,
                    { type: "answer", text: data.answer },
                  ]);
                  setIsLoading(false);
                })
                .catch((err) => {
                  console.error("Error:", err);
                  setIsLoading(false);
                });
            }}
          >
            Send
          </button>
        </div>
      )}
    </>
  );
}

export default App;
