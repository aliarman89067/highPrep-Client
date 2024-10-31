import { createRoot } from "react-dom/client";
import "./index.css";
import axios from "axios";
import App from "./App.tsx";

axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL;
axios.defaults.withCredentials = true;

console.log(import.meta.env.VITE_API_BASE_URL);

createRoot(document.getElementById("root")!).render(<App />);
