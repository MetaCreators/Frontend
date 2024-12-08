import "./App.css";
import { useNavigate } from "react-router-dom";

function App() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-white flex">
      {/* Left Content Section */}
      <div className="w-1/2 p-16 flex flex-col justify-center">
        <div className="mb-12">
          <h1 className="text-blue-950 text-3xl font-bold mb-2">LitHouse</h1>
        </div>

        <div className="max-w-xl">
          <h2 className="text-blue-950 text-4xl font-bold mb-4">
            Simplifying Content Creation
          </h2>
          <p className="text-blue-950 text-2xl font-light">
            Unleash your creativity with our suite of AI-powered tools.
          </p>
        </div>
      </div>

      {/* Right Content Section */}
      <div className="w-1/2 p-16 flex flex-col justify-center items-center bg-slate-900">
        <div className="w-full max-w-md">
          <h2 className="text-white text-4xl font-bold mb-8 text-center">
            Get started
          </h2>

          <div className="flex space-x-4">
            <button
              className="flex-1 bg-red-500 text-white rounded-full py-3 px-6 text-lg font-semibold hover:bg-blue-500 transition-colors"
              onClick={() => navigate("/login")}
            >
              Log in
            </button>

            <button
              className="flex-1 bg-red-500 text-white rounded-full py-3 px-6 text-lg font-semibold hover:bg-blue-500 transition-colors"
              onClick={() => navigate("/signup")}
            >
              Sign up
            </button>
          </div>

          {/* <p className="text-white text-center mt-6">Try it first</p> */}
        </div>

        {/* Footer */}
        <div className="absolute bottom-8 left-auto right-auto text-gray-400 text-sm">
          <div className="flex items-center justify-end space-x-4">
            <a href="#" className="hover:text-gray-300">
              Terms of use
            </a>
            <span>|</span>
            <a href="#" className="hover:text-gray-300">
              Privacy policy
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
