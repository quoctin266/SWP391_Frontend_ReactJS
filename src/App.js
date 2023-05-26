import "./App.scss";
// import TestData from "./components/TestData";
import Header from "./components/guestAndCustomer/header/Header";
import Footer from "./components/guestAndCustomer/footer/Footer";
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
        <Header />
        <div className="body-container">
          <Outlet />
          {/* <TestData /> */}
        </div>
        <Footer />
      </Scrollbars>
    </div>
  );
}

export default App;
