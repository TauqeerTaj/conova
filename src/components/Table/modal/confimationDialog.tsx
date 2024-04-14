import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { ConfirmDialog } from "../../../utils/constants/confirmDialog";
import { deleteSelected } from "../../../utils/storage/indexedDB";

export default function ConfimationDialog(props: ConfirmDialog) {
  const deleteHandler = () => {
    deleteSelected(props.item, props.setList);
    props.toggle();
  };
  return (
    <div>
      <Modal isOpen={props.show} toggle={props.toggle}>
        <ModalHeader toggle={props.toggle}>Delete Record</ModalHeader>
        <ModalBody>Are you sure you want to delete?</ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={deleteHandler}>
            Delete
          </Button>{" "}
          <Button color="secondary" onClick={props.toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}
