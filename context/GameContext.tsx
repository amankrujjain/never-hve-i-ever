import React, { createContext, useContext, useReducer } from "react";

type GameState = {
  customQuestions: string[];
};

type GameActions = {
  setCustomQuestions: (questions: string[]) => void;
  clearCustomQuestions: () => void;
};

const initialState: GameState = {
  customQuestions: [],
};

type Action =
  | { type: "SET_CUSTOM_QUESTIONS"; payload: string[] }
  | { type: "CLEAR_CUSTOM_QUESTIONS" };

function gameReducer(state: GameState, action: Action): GameState {
  switch (action.type) {
    case "SET_CUSTOM_QUESTIONS":
      return { ...state, customQuestions: action.payload };
    case "CLEAR_CUSTOM_QUESTIONS":
      return { ...state, customQuestions: [] };
    default:
      return state;
  }
}

const GameContext = createContext<
  { state: GameState; actions: GameActions } | undefined
>(undefined);

export function GameProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  const actions: GameActions = {
    setCustomQuestions: (questions) =>
      dispatch({ type: "SET_CUSTOM_QUESTIONS", payload: questions }),
    clearCustomQuestions: () =>
      dispatch({ type: "CLEAR_CUSTOM_QUESTIONS" }),
  };

  return (
    <GameContext.Provider value={{ state, actions }}>
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error("useGame must be used within GameProvider");
  }
  return context;
}
