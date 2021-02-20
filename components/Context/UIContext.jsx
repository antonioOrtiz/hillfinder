import React, { useState } from 'react';

var initialState = {
  isMobile: false,
  isDesktop: false
};

var UIContext = React.createContext();

function UIProvider({ children }) {
  const [ui, setUI] = useState(initialState);

  return (
    <UIContext.Provider
      value={{
        isMobile: ui.isMobile,
        isDesktop: ui.isDesktop,
        setIsMobile: bool => setUI({ ...ui, isMobile: bool }),
        setIsDesktop: bool => setUI({ ...ui, isDesktop: bool })
      }}
    >
      {children}
    </UIContext.Provider>
  );
}

export default UIContext;

export { UIProvider };
