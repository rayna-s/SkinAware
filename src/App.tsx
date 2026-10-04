import { Navigate, Route, Routes } from "react-router-dom";
import { Layout } from "./components/Layout";
import { AboutPage } from "./pages/AboutPage";
import { AssessPage } from "./pages/AssessPage";
import { ConditionPage } from "./pages/ConditionPage";
import { HomePage } from "./pages/HomePage";
import { SearchPage } from "./pages/SearchPage";

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/assess" element={<AssessPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/condition/:id/:tone" element={<ConditionPage />} />
        <Route path="/condition/:id" element={<ConditionPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Layout>
  );
}
