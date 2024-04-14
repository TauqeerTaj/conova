import { formData } from "../constants/formData";
import { Payload } from "../constants/reducerPayload";

export const upvotesReducer = (
  state: formData,
  action: { type: string; payload: Payload }
) => {
  switch (action.type) {
    case "change":
      return { ...state, [action.payload.name]: action.payload.value };
    case "reset":
      return { ...state, title: "", upvotes: null, date: "" };
    default:
      return state;
  }
};
