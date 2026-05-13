import "./App.css";
import BigButton from "./components/BigButton";
import Footer from "./components/Footer";
import TitleLogo from "./components/TitleLogo";

function App() {
  return (
    <div className="app-container">
      <TitleLogo />
      <BigButton />
      <Footer />
    </div>
  );
}

export default App;
