import { createContextualCan } from "@casl/react";
import React from "react";

export const AbilityContext = React.createContext();
export const Can = createContextualCan(AbilityContext.Consumer);
