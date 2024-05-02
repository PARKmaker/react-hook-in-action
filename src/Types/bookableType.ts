export type TBookable = {
  id: number;
  group: string;
  title: string;
  notes: string;
  sessions: number[];
  days: number[];
};

export type TState = {
  group: string;
  bookableIndex: number;
  hasDetails: boolean;
  bookables: TBookable[];
  isLoading: boolean;
  error: boolean | Error;
};

export type TAction = {
  type: string;
  payload?: number | string | TBookable[] | boolean;
};
