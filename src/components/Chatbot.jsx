import { useState } from "react";

const faqResponses = {
  hello: "Hello! How can I assist you today?",
  appointment: "You can book a free consultation using the support form.",
  book: "You can book a free consultation using the support form.",
  schedule: "Use the support form to request an appointment.",
  emergency: "Please contact the nearest hospital immediately.",
  urgent: "If this is urgent, call your local emergency number now.",
  volunteer: "You can register as a volunteer using the support form.",
  help: "Describe your issue and our team will respond shortly.",
};

function Chatbot() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  const sendMessage = () => {
    if (!input.trim()) return;

    const text = input.toLowerCase();
    let reply = faqResponses[text];

    if (!reply) {
      const key = Object.keys(faqResponses).find((k) =>
        text.includes(k)
      );
      reply = key
        ? faqResponses[key]
        : "Thank you. Our support team will contact you shortly.";
    }

    setMessages((prev) => [
      ...prev,
      { text: input, type: "user" },
      { text: reply, type: "bot" },
    ]);

    setInput("");
  };

  return (
    <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6">
      <h2 className="text-2xl font-semibold text-green-600 mb-1">
        🤖 AI Assistant
      </h2>
      <p className="text-sm text-gray-500 mb-4">
        Automated FAQ Support
      </p>

      <div className="flex flex-wrap gap-2 mb-4">
        {["Hello", "Appointment", "Emergency", "Volunteer"].map((q) => (
          <button
            key={q}
            className="text-xs px-3 py-1 rounded-full border bg-gray-50 hover:bg-gray-100"
            onClick={() => setInput(q)}
          >
            {q}
          </button>
        ))}
      </div>

      <div className="h-56 border rounded-lg p-3 overflow-y-auto bg-gray-50 mb-4">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`mb-2 max-w-[80%] p-2 rounded-lg text-sm ${
              msg.type === "user"
                ? "ml-auto bg-blue-600 text-white"
                : "mr-auto bg-white border"
            }`}
          >
            {msg.text}
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Ask a question..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          className="flex-1 border rounded-lg px-3 py-2"
        />
        <button
          onClick={sendMessage}
          className="bg-green-600 hover:bg-green-700 text-white px-4 rounded-lg"
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default Chatbot;
