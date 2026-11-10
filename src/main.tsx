import { createRoot } from "react-dom/client";
import { BrowserRouter, HashRouter } from "react-router-dom";
import App from "./App";
import "./styles.css";

const Router =
  import.meta.env.VITE_PORTABLE === "true" ||
  window.location.protocol === "file:"
    ? HashRouter
    : BrowserRouter;
createRoot(document.getElementById("root")!).render(
  <Router>
    <App />
  </Router>,
);

if (
  import.meta.env.PROD &&
  import.meta.env.VITE_PORTABLE !== "true" &&
  window.location.protocol !== "file:" &&
  "serviceWorker" in navigator
) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("/sw.js").catch(() => {
      /* The single-file package remains available if storage is restricted. */
    });
  });
}
