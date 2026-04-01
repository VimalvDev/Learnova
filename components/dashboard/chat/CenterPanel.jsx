"use client";
import { useState, useRef, useEffect } from "react";
import { RiDeleteBinLine, RiDownloadLine, RiHistoryLine } from "react-icons/ri";
import UserMessage from "./UserMessage";
import AIMessage from "./AIMessage";
import ThinkingIndicator from "./ThinkingIndicator";
import LowConfidenceMessage from "./LowConfidenceMessage";
import InputBar from "./InputBar";
import SessionHistory from "./SessionHistory";

const privateMessages = [
  {
    id: 1,
    type: "user",
    text: "Explain 2NF with an example from my notes.",
    time: "2:41 PM",
  },
  {
    id: 2,
    type: "ai",
    time: "2:41 PM",
    confidence: 87,
    paragraphs: [
      "Based on your uploaded documents, 2NF (Second Normal Form) requires that a relation is already in 1NF and every non-prime attribute is fully functionally dependent on the entire primary key.",
      "Example from your notes: The relation R(A, B, C) where A→C exists and {A,B} is the primary key violates 2NF because C depends only on A.",
    ],
    bullets: [
      "No partial dependencies on a composite key",
      "All non-key attributes depend on the whole key",
      "Violations are resolved by decomposition",
    ],
    sources: [
      "DBMS_Notes.pdf · Chapter 4 · Page 67",
      "Unit2_Slides.pdf · Slide 14",
    ],
  },
  {
    id: 3,
    type: "user",
    text: "What is the difference between 2NF and 3NF?",
    time: "2:43 PM",
  },
  {
    id: 4,
    type: "low_confidence",
    time: "2:43 PM",
    bestMatch: 41,
    threshold: 75,
  },
];

const publicMessages = [
  {
    id: 1,
    type: "user",
    text: "What is quantum entanglement?",
    time: "3:10 PM",
  },
  {
    id: 2,
    type: "ai",
    time: "3:10 PM",
    paragraphs: [
      "Quantum entanglement is a phenomenon where two or more particles become correlated in such a way that the quantum state of each particle cannot be described independently of the others, even when separated by large distances.",
      "When a measurement is performed on one entangled particle, it instantly influences the state of its partner — regardless of the distance between them.",
    ],
    bullets: [
      "First proposed by Einstein, Podolsky, and Rosen in 1935",
      "Experimentally confirmed by Bell test experiments",
      "Foundation of quantum computing and quantum cryptography",
    ],
    sources: [],
  },
];

const suggestions = [
  "What is 2NF normalization?",
  "Explain ACID properties with an example.",
  "What are functional dependencies?",
];

const publicSuggestions = [
  "Explain quantum computing basics",
  "What is machine learning?",
  "How does TCP/IP work?",
];

export default function CenterPanel({ mode = "private" }) {
  const isPublic = mode === "public";
  const [privateHistory, setPrivate] = useState(privateMessages);
  const [publicHistory, setPublic] = useState(publicMessages);
  const [thinking, setThinking] = useState(false);
  const [showHistory, setShowHist] = useState(false);
  const [histVisible, setHistVis] = useState(false);
  const bottomRef = useRef();

  const messages = isPublic ? publicHistory : privateHistory;
  const setMessages = isPublic ? setPublic : setPrivate;

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, thinking, mode]);

  const openHistory = () => {
    setShowHist(true);
    requestAnimationFrame(() => requestAnimationFrame(() => setHistVis(true)));
  };
  const closeHistory = () => {
    setHistVis(false);
    setTimeout(() => setShowHist(false), 280);
  };

  const handleSend = (text) => {
    const now = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    setMessages((p) => [
      ...p,
      { id: Date.now(), type: "user", text, time: now },
    ]);
    setThinking(true);
    setTimeout(() => {
      setThinking(false);
      setMessages((p) => [
        ...p,
        {
          id: Date.now() + 1,
          type: "ai",
          time: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
          confidence: isPublic ? null : Math.floor(Math.random() * 15) + 75,
          paragraphs: [
            isPublic
              ? "Here is a detailed answer based on general AI knowledge."
              : "Based on your uploaded documents, here is the relevant information for your query.",
          ],
          bullets: [
            "Key concept point one",
            "Supporting definition or example",
            "Related topic",
          ],
          sources: isPublic ? [] : ["DBMS_Notes.pdf · Chapter 4 · Page 67"],
        },
      ]);
    }, 2600);
  };

  const accentColor = isPublic ? "#4ADE80" : "#FA6E43";
  const tips = isPublic ? publicSuggestions : suggestions;

  return (
    <div className="w-full h-full flex flex-col overflow-hidden">
      {/* Messages Area - Scrollable */}
      <div className="flex-1 overflow-y-auto px-4 py-6">
        {messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center">
            <div
              className="w-11 h-11 rounded-2xl flex items-center justify-center mb-4"
              style={{
                background: isPublic
                  ? "rgba(74,222,128,0.08)"
                  : "rgba(250,110,67,0.08)",
              }}
            >
              <span className="text-[18px]" style={{ color: accentColor }}>
                ◈
              </span>
            </div>
            <h3 className="text-[15px] font-semibold text-white/80 mb-1.5">
              {isPublic ? "Ask anything." : "Ask from your notes."}
            </h3>
            <p className="text-[12px] text-[#444] leading-relaxed max-w-[320px] mb-6">
              {isPublic
                ? "Answers from general AI knowledge."
                : "Learnova retrieves relevant sections from your uploaded documents before answering."}
            </p>
            <div className="w-full max-w-85 h-px bg-white/6 mb-4" />
            <p className="text-[10px] text-[#444] mb-2.5">Try asking:</p>
            <div className="flex flex-col gap-1.5 w-full max-w-85">
              {tips.map((s) => (
                <button
                  key={s}
                  onClick={() => handleSend(s)}
                  className="px-4 py-2.5 bg-card-dark text-[#888] text-[12px] rounded-xl hover:text-white hover:bg-[#2A2B2F] transition-all text-left"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <>
            {messages.map((msg) =>
              msg.type === "user" ? (
                <UserMessage key={msg.id} text={msg.text} time={msg.time} />
              ) : msg.type === "low_confidence" ? (
                <LowConfidenceMessage
                  key={msg.id}
                  time={msg.time}
                  bestMatch={msg.bestMatch}
                  threshold={msg.threshold}
                />
              ) : (
                <AIMessage key={msg.id} message={msg} isPublic={isPublic} />
              ),
            )}
            {thinking && <ThinkingIndicator isPublic={isPublic} />}
          </>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Session History Modal */}
      {showHistory && (
        <>
          <div
            className="absolute inset-0 z-40 bg-black/50 backdrop-blur-sm transition-opacity duration-300"
            style={{ opacity: histVisible ? 1 : 0 }}
            onClick={closeHistory}
          />
          <div
            className="absolute right-0 top-0 h-full z-50 shadow-2xl transition-transform duration-300 ease-out"
            style={{
              width: "min(320px, 100%)",
              transform: histVisible ? "translateX(0)" : "translateX(100%)",
            }}
          >
            <SessionHistory onClose={closeHistory} />
          </div>
        </>
      )}
    </div>
  );
}
