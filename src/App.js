import "./App.scss";
// import TestData from "./components/TestData";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import { Outlet } from "react-router-dom";
import { Scrollbars } from "react-custom-scrollbars-2";

function App() {
  return (
    <div className="App">
      <Scrollbars
        style={{ height: "100vh" }}
        autoHide
        // Hide delay in ms
        autoHideTimeout={1000}
        // Duration for hide animation in ms.
        autoHideDuration={200}
      >
        {/* <TestData /> */}
        <Header />
        <div className="body-container">
          <Outlet />
        </div>
        <Footer />
      </Scrollbars>
    </div>
  );
}

export default App;
