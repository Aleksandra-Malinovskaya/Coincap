import "./App.css";
import { TablePage } from "./Pages/TablePage";
import { Header } from "./Pages/Header";
import { Routes, Route, Navigate } from "react-router";
import { InfoCoinPage } from "./Pages/InfoCoinPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Header />}>
          <Route index element={<TablePage />} />
          <Route path="coin/:id" element={<InfoCoinPage />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

export default App;
