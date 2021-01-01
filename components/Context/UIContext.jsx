import React, { useState, useEffect } from 'react';
import { getUserAvatar } from '../../utils/index';

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
        isDesktop: ui.isDesktop
      }}
    >
      {children}
    </UIContext.Provider>
  );
}

export default UIContext;

export { UIProvider };
