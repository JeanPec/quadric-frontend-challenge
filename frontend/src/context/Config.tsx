import React, { createContext, ReactNode } from "react";

interface ConfigType {
  isMobile: boolean;
}

export const ConfigContext = createContext<ConfigType | null>(null);

/*
    Config:
        - Context used to share if the app is in mobile
        - TO DO share other properties like theme black / white
 */

export const ConfigProvider = ({
  children,
}: {
  children?: ReactNode | undefined;
}) => {
  const isMobile =
    navigator.userAgent.indexOf("Mobi") > -1 ||
    Math.min(window.innerWidth, window.innerHeight) < 768;
  return (
    <ConfigContext.Provider value={{ isMobile }}>
      {children}
    </ConfigContext.Provider>
  );
};

export const useConfig = () => {
  const context = React.useContext(ConfigContext);

  if (!context) {
    throw new Error("useConfig must be used within ConfigProvider");
  }

  return context;
};
