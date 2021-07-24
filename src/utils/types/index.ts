export interface StateType {
  ids: any[];
  status: "idle" | "loading" | "succeeded" | "failed";
  fetchStatus?: "idle" | "loading" | "succeeded" | "failed";
  createStatus?: "idle" | "loading" | "succeeded" | "failed";
  updateStatus?: "idle" | "loading" | "succeeded" | "failed";
  deleteStatus?: "idle" | "loading" | "succeeded" | "failed";
  entities: any;
}

export interface ActionType {
  type: String;
  payload?: any;
}
