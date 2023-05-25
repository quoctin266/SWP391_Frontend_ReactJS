import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "../App";
import Home from "../components/home/Home";
import Services from "../components/services/Services";
import Price from "../components/price/Price";
import FAQs from "../components/faqs/FAQs";
import AboutUs from "../components/about_us/AboutUs";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "home",
        element: <Home />,
      },
      {
        path: "services",
        element: <Services />,
      },
      {
        path: "price",
        element: <Price />,
      },
      {
        path: "faqs",
        element: <FAQs />,
      },
      {
        path: "about-us",
        element: <AboutUs />,
      },
    ],
  },

]);

const PageRouter = () => {
  return <RouterProvider router={router} />;
};

export default PageRouter;
