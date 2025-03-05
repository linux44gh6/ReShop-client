import ContextProvider from "@/Context/userContext";
import React from "react";

const Provider = ({ children }: { children: React.ReactNode }) => {
    return (
        <ContextProvider>
            {children}
        </ContextProvider>
    );
};

export default Provider;