import { getWeek } from "../../utils/date-wrangler.ts";
import { NEXT_WEEK, PREV_WEEK, SET_DATE, TODAY } from "./weekReducerActions.ts";

type TAction = {
  type: string;
  payload?: string | number | Date;
};

type TState = {
  date: Date;
};

export default function weekReducer(state: TState, action: TAction) {
  switch (action.type) {
    case NEXT_WEEK:
      return getWeek(state.date, 7);
    case PREV_WEEK:
      return getWeek(state.date, -7);
    case TODAY:
      return getWeek(new Date());
    case SET_DATE:
      return getWeek(new Date(action.payload as string | number | Date));
    default:
      throw new Error(`Unknown action type: ${action.type}`);
  }
}
