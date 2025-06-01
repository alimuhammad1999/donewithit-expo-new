import { NavigationContainerRef } from "@react-navigation/native";
import React from "react";
import { RootStackParamList } from "./routes";

export const navigationRef = React.createRef<NavigationContainerRef<RootStackParamList>>();

const navigate = (name: string, params?: any) => {
    navigationRef.current?.navigate(name, params)
    if (!navigationRef.current)
        console.log("navigationRef is null")
}

export default { navigate }