import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { ConfirmDialog } from "../../../utils/constants/confirmDialog";

export default function ViewRecordModal(props: ConfirmDialog) {
  return (
    <div>
      <Modal isOpen={props.show} toggle={props.toggle}>
        <ModalHeader toggle={props.toggle}>View Record</ModalHeader>
        <ModalBody>
          <div className="mb-2">
            <h6 className="mb-0">Title:</h6> <span>{props?.item?.title}</span>
          </div>
          <div className="mb-2">
            <h6 className="mb-0">Upvotes:</h6>{" "}
            <span>{props?.item?.upvotes}</span>
          </div>
          <div>
            <h6 className="mb-0">Date:</h6> <span>{props?.item?.date}</span>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={props.toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}
