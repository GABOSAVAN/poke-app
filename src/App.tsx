import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import AppRoutes from "./Routes/AppRoutes";

function App() {
  return (
    <>
      <Header />
      <AppRoutes/>            
      <Footer />
    </>
  );
}

export default App;
