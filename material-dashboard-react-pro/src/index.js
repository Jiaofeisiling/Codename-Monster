/**
=========================================================
* Material Dashboard 2 PRO React - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-pro-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Ability } from "@casl/ability";
import App from "App";

// Material Dashboard 2 PRO React Context Provider
import { MaterialUIControllerProvider, AuthContextProvider } from "context";
import { AbilityContext } from "Can";

const container = document.getElementById("root");
const root = createRoot(container);
const ability = new Ability();

root.render(
  <AbilityContext.Provider value={ability}>
    <BrowserRouter>
      <AuthContextProvider>
        <MaterialUIControllerProvider>
          <App ability={ability} />
        </MaterialUIControllerProvider>
      </AuthContextProvider>
    </BrowserRouter>
  </AbilityContext.Provider>
);
