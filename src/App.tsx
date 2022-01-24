  
import Modal from "react-modal";
import { MainRoutes } from "../src/routes/Routes";

import { GlobalStyle } from "./styles/global";

Modal.setAppElement("#root");

export function App() {
  return (
    <>
      <MainRoutes />
      <GlobalStyle />
    </>
  );
}
