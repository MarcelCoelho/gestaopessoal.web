import Modal from "react-modal";
import { MainRoutes } from "../src/routes/Routes";

Modal.setAppElement("#root");

export function App() {  

  return (
    <MainRoutes />
  );
}
