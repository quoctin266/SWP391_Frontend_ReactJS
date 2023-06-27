import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "../App";
import Home from "../components/guestAndCustomer/home/Home";
import Services from "../components/guestAndCustomer/services/Services";
import Price from "../components/guestAndCustomer/price/Price";
import FAQs from "../components/guestAndCustomer/faqs/FAQs";
import AboutUs from "../components/guestAndCustomer/about_us/AboutUs";
import Booking from "../components/guestAndCustomer/booking/Booking";
import BookingSuccess from "../components/guestAndCustomer/booking/BookingSuccess";
import Track from "../components/guestAndCustomer/track/Track";
import AccountDetail from "../components/guestAndCustomer/profile/AccountDetail";
import ViewHistory from "../components/guestAndCustomer/profile/ViewHistory";
import Login from "../components/guestAndCustomer/auth/Login";
import Register from "../components/guestAndCustomer/auth/Register";
import ForgetPassword from "../components/guestAndCustomer/auth/ForgetPassword";
import ResetPassword from "../components/guestAndCustomer/auth/ResetPassword";
import Staff from "../components/staff/Staff";
import ListOrder from "../components/staff/bookingOrder/ListOrder";
import Schedule from "../components/staff/schedule/Schedule";
import Feedback from "../components/staff/feedback/Feedback";
import Manager from "../components/manager/Manager";
import ManageService from "../components/manager/manageService/ManageService";
import ManageWebContent from "../components/manager/manageWebContent/ManageWebContent";
import ManageRouteTrip from "../components/manager/manageRouteTrip/ManageRouteTrip";
import Admin from "../components/admin/Admin";
import ManageAccount from "../components/admin/manageAccount/ManageAccount";
import Dashboard from "../components/admin/dashboard/Dashboard";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PrivateRoute from "../components/private-route/PrivateRoute";
import LimitedAccess from "../components/private-route/LimitedAccess";
import NotFound from "../components/private-route/NotFound";
import Visa from "../components/guestAndCustomer/payment/Visa";
import Momo from "../components/guestAndCustomer/payment/Momo";
import VnPay from "../components/guestAndCustomer/payment/VnPay";
import ManageSender from "../components/guestAndCustomer/profile/ManageSender";
import ChangePassword from "../components/guestAndCustomer/auth/ChangePassword";
import CheckCode from "../components/guestAndCustomer/auth/CheckCode";
import Protected from "../components/private-route/Protected";

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
      {
        path: "booking",
        element: (
          <PrivateRoute>
            <Booking />
          </PrivateRoute>
        ),
      },
      {
        path: "booking-success",
        element: (
          <PrivateRoute>
            <BookingSuccess />
          </PrivateRoute>
        ),
      },
      {
        path: "track",
        element: <Track />,
      },
      {
        path: "account-detail",
        element: (
          <PrivateRoute>
            <AccountDetail />
          </PrivateRoute>
        ),
      },
      {
        path: "view-history",
        element: (
          <PrivateRoute>
            <ViewHistory />
          </PrivateRoute>
        ),
      },
      {
        path: "manage-sender",
        element: (
          <PrivateRoute>
            <ManageSender />
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "/momo",
    element: <Momo />,
  },
  {
    path: "/visa",
    element: <Visa />,
  },
  {
    path: "/vnpay",
    element: <VnPay />,
  },
  {
    path: "/login",
    element: (
      <Protected>
        <Login />
      </Protected>
    ),
  },
  {
    path: "/register",
    element: (
      <Protected>
        <Register />
      </Protected>
    ),
  },
  {
    path: "/forget-password",
    element: <ForgetPassword />,
  },
  {
    path: "/check-code",
    element: <CheckCode />,
  },
  {
    path: "/change-password",
    element: (
      <Protected>
        <ChangePassword />
      </Protected>
    ),
  },
  {
    path: "/reset-password",
    element: (
      <PrivateRoute>
        <ResetPassword />
      </PrivateRoute>
    ),
  },
  {
    path: "/staff",
    element: (
      <PrivateRoute>
        <Staff />
      </PrivateRoute>
    ),
    children: [
      {
        path: "",
        element: <ListOrder />,
      },
      {
        path: "list-order",
        element: <ListOrder />,
      },
      {
        path: "schedule",
        element: <Schedule />,
      },
      {
        path: "feedback",
        element: <Feedback />,
      },
    ],
  },
  {
    path: "/manager",
    element: (
      <PrivateRoute>
        <Manager />
      </PrivateRoute>
    ),
    children: [
      {
        path: "",
        element: <ManageService />,
      },
      {
        path: "manage-service",
        element: <ManageService />,
      },
      {
        path: "manage-web-content",
        element: <ManageWebContent />,
      },
      {
        path: "manage-route-trip",
        element: <ManageRouteTrip />,
      },
    ],
  },
  {
    path: "/admin",
    element: (
      <PrivateRoute>
        <Admin />
      </PrivateRoute>
    ),
    children: [
      {
        path: "",
        element: <Dashboard />,
      },
      {
        path: "manage-account",
        element: <ManageAccount />,
      },
      {
        path: "dashboard",
        element: <Dashboard />,
      },
    ],
  },
  {
    path: "/access-not-allowed",
    element: <LimitedAccess />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

const PageRouter = () => {
  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
        theme="light"
      />
    </>
  );
};

export default PageRouter;
