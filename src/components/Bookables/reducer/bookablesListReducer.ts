import { TAction, TBookable, TState } from "../../../Types/bookableType.ts";
import {
  FETCH_BOOKABLES_ERROR,
  FETCH_BOOKABLES_REQUEST,
  FETCH_BOOKABLES_SUCCESS,
  NEXT_BOOKABLE,
  SET_BOOKABLE,
  SET_GROUP,
} from "./bookablesListReducerActions.ts";

export default function bookablesListReducer(
  state: TState,
  action: TAction,
): TState {
  switch (action.type) {
    case SET_GROUP:
      return {
        ...state,
        group: action.payload as string,
        bookableIndex: 0,
      };
    case SET_BOOKABLE:
      return {
        ...state,
        bookableIndex: action.payload as number,
      };
    //
    // case TOGGLE_HAS_DETAILS:
    //   return {
    //     ...state,
    //     hasDetails: !state.hasDetails,
    //   };

    case NEXT_BOOKABLE: {
      const count = state.bookables.filter(
        (b) => b.group === state.group,
      ).length;

      return {
        ...state,
        bookableIndex: (state.bookableIndex + 1) % count,
      };
    }

    case FETCH_BOOKABLES_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: false,
        bookables: [],
      };

    case FETCH_BOOKABLES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        bookables: action.payload as TBookable[],
      };

    case FETCH_BOOKABLES_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload as boolean,
      };

    default: {
      return state;
    }
  }
}
