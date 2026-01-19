import SupportForm from "./components/SupportForm";
import Chatbot from "./components/Chatbot";
import "./index.css";

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 px-6 py-10">
      
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-blue-700">
          Healthcare Support Portal
        </h1>
        <p className="text-gray-600 mt-2">
          Helping patients through digital support & automation
        </p>
      </div>

      {/* Cards */}
      <div className="flex flex-col lg:flex-row gap-10 justify-center items-start">
        <SupportForm />
        <Chatbot />
      </div>
    </div>
  );
}

export default App;
