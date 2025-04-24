import { Routes, Route } from "react-router-dom";
import SignUpPage from "./pages/SignUpPage"; 
import LoginPage from "./pages/LoginPage";
import FeedPage from "./pages/FeedPage";
import MyRecipesPage from "./pages/MyRecipesPage";
import AddRecipePage from "./pages/AddRecipePage";

function App() {

  return (
    <Routes>
      <Route path="/" element={<FeedPage />} />
      <Route path="/feed" element={<FeedPage />} />
      <Route path="/myrecipes" element={<MyRecipesPage />} />
      <Route path="/addrecipe" element={<AddRecipePage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/login" element={<LoginPage />} />
    </Routes>
  )
}

export default App
