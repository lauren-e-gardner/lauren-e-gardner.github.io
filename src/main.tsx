import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

const basename =
  import.meta.env.MODE === "development" ? "/" : "/lauren-e-gardner.github.io";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter basename={basename}>
    <App />
  </BrowserRouter>
);
