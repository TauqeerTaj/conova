import { formData } from "./formData";

export interface ConfirmDialog {
  show?: boolean;
  view?: boolean;
  toggle: () => void;
  setList: (data: formData[]) => void;
  item: formData;
}
