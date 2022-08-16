import React, { useContext, useEffect, useReducer, useState } from "react";

import { setLocalStorage, getLocalStorage } from "utils/index";

const initialState = {
  topographyData: [],
};

const MapStateContext = React.createContext();

function MapProvider({ children }) {
  function mapReducer(state, { type, payload }) {
    console.log("type, payload ", type, payload);
    switch (type) {
      case "setTopographyData": {
        return {
          ...state,

          ...{
            topographyData: state.topographyData?.concat(payload),
          },
        };
      }
      default: {
        throw new Error(`Unhandled action type: ${type}`);
      }
    }
  }

  const [mapData] = useState(() => getLocalStorage("map", initialState));

  const [state, dispatch] = useReducer(mapReducer, mapData);

  useEffect(() => {
    setLocalStorage("map", state);
  }, [state]);

  const value = { state, dispatch };

  return (
    <MapStateContext.Provider value={value}>
      {children}
    </MapStateContext.Provider>
  );
}

function mapState() {
  const context = useContext(MapStateContext);
  if (context === undefined) {
    throw new Error("mapState must be used within a MapProvider");
  }
  return context;
}

export { MapProvider, mapState };
