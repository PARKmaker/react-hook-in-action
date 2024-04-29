import { getWeek } from "../../utils/date-wrangler.ts";
import { NEXT_WEEK, PREV_WEEK, SET_DATE, TODAY } from "./weekReducerActions.ts";

export type TDateAction = {
  type: string;
  payload?: string | number | Date;
};

export type TDateState = {
  date: Date;
  start: Date;
  end: Date;
};

export default function weekReducer(state: TDateState, action: TDateAction) {
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
