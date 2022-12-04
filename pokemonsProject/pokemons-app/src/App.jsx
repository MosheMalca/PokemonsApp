import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Form } from "./components/Form/Form";
import { Home } from "./components/Home/Home";
import { Navbar } from "./components/Navbar/Navbar";

function App() {
  return (
    <div>
      <BrowserRouter>
        {/* ff ctrl + / */}
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add" element={<Form />} />
          <Route path="/pokemon/:pokemonId" element={<Form />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
