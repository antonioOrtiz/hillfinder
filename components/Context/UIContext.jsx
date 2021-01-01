import React, { useState, useEffect } from 'react';
import { getUserAvatar } from '../../utils/index';

var initialState = {
  isMobile: false,
  isDesktop: false
};

var UIContext = React.createContext();

function UIProvider({ children }) {
  const [ui, setUI] = useState(initialState);

  useEffect(() => {
    console.log('ui.isMobile ', ui.isMobile);
    console.log('ui.isDesktop ', ui.isDesktop);
  }, [ui.isMobile, ui.isDesktop]);

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
