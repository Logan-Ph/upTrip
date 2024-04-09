import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AuthProvider } from "./context/AuthProvider";
import { GoogleOAuthProvider } from "@react-oauth/google";
import "./index.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "flowbite-datepicker";
import "flowbite";



const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId='253190647879-4t51i19p4igdkvtmu2o3g20dkochpiem.apps.googleusercontent.com'>
      <AuthProvider>
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={true}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          stacked
          pauseOnHover={false}
          theme="light"
        />
        <App />
      </AuthProvider>
    </GoogleOAuthProvider>
  </React.StrictMode>
);
