import { useState } from "react";

function Modal(props) {
  //if users cancels delete closes modal and doesn't delete post
  function cancel() {
    props.setModalVisibility("hidden");
  }

  //if users confirms delete sends get request to server to delete post
  function confirm() {
    props.setModalVisibility("hidden");
    fetch(`/deleteentry/${props.postID}`);
  }

  return (
    <div style={{ visibility: props.modalVisibility }} id="modal-container">
      <div>
        <h1>Are you sure you want to delete this post?</h1>
        <div id="button-container">
          <button onClick={confirm}>Confirm</button>
          <button onClick={cancel}>Cancel</button>
        </div>
      </div>
    </div>
  );
}
export default Modal;
