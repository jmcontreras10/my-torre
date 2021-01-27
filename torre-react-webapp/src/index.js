import React from "react";
import ReactDOM from "react-dom";
import { UserProvider } from "./Modules/User/UserProvider";
import { ScreenProvider } from "./Modules/Screen/ScreenProvider";
import { SocialProvider } from "./Modules/Social/SocialProvider";
import App from "./App";
import "./index.css";
import reportWebVitals from "./reportWebVitals";

ReactDOM.render(
  <React.StrictMode>
    <UserProvider>
      <ScreenProvider>
        <SocialProvider>
          <App />
        </SocialProvider>
      </ScreenProvider>
    </UserProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
