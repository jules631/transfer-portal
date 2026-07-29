"use client";

import {
  createContext,
  useContext,
  useReducer,
  type Dispatch,
  type ReactNode,
} from "react";
import { SEED_INTERESTS, SEED_LISTINGS } from "./org";
import type { Interest, InterestStatus, Listing, PersonaId } from "./types";

interface State {
  persona: PersonaId;
  listings: Listing[];
  interests: Interest[];
}

type Action =
  | { type: "SWITCH_PERSONA"; persona: PersonaId }
  | { type: "PUBLISH_LISTING"; listingId: string }
  | {
      type: "EXPRESS_INTEREST";
      listingId: string;
      fromManagerId: string;
      roleTitle: string;
      message: string;
    }
  | { type: "RESPOND_INTEREST"; interestId: string; status: InterestStatus }
  | { type: "SET_SWAP_CONSENT"; listingId: string; consent: boolean }
  | { type: "RESET" };

const initialState: State = {
  persona: "maya",
  listings: SEED_LISTINGS,
  interests: SEED_INTERESTS,
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "SWITCH_PERSONA":
      return { ...state, persona: action.persona };
    case "PUBLISH_LISTING":
      return {
        ...state,
        listings: state.listings.map((l) =>
          l.id === action.listingId ? { ...l, status: "active" } : l,
        ),
      };
    case "EXPRESS_INTEREST": {
      const exists = state.interests.some(
        (i) =>
          i.listingId === action.listingId &&
          i.fromManagerId === action.fromManagerId,
      );
      if (exists) return state;
      return {
        ...state,
        interests: [
          ...state.interests,
          {
            id: `i-${state.interests.length + 1}`,
            listingId: action.listingId,
            fromManagerId: action.fromManagerId,
            roleTitle: action.roleTitle,
            message: action.message,
            status: "pending",
          },
        ],
      };
    }
    case "RESPOND_INTEREST":
      return {
        ...state,
        interests: state.interests.map((i) =>
          i.id === action.interestId ? { ...i, status: action.status } : i,
        ),
      };
    case "SET_SWAP_CONSENT":
      return {
        ...state,
        listings: state.listings.map((l) =>
          l.id === action.listingId
            ? { ...l, swapConsent: action.consent }
            : l,
        ),
      };
    case "RESET":
      return initialState;
  }
}

const StoreContext = createContext<{
  state: State;
  dispatch: Dispatch<Action>;
} | null>(null);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <StoreContext.Provider value={{ state, dispatch }}>
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used inside StoreProvider");
  return ctx;
}
