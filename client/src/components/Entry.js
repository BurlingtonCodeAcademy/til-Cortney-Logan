import { useState, useEffect } from "react";
import Modal from "./Modal.js";

function Entry(props) {
  //defines entryData to be held in state after retrieving from database
  const [entryData, setEntryData] = useState(null);
  const [modalVisibility, setModalVisibility] = useState("hidden");

  //stores postID as global variable from match object
  let postID = props.match.params.objectId;

  //pulls data for post upon page load with fetch request
  useEffect(() => {
    if (!entryData) {
      fetch(`/individualpost/${postID}`)
        .then((res) => res.json())
        .then((resultObj) => {
          //sets resulting object in state as entryData
          setEntryData(resultObj);
        });
    }
  });

  //triggers model to show to ask users to confirm delete
  function deleteEntry() {
    setModalVisibility("visible");
  }

  return (
    <div id="entry-page-container">
      {/* post layed out as content of form with the ability to edit */}
      {entryData && (
        <form id="edit-an-entry" method="POST" action={`/editentry/${postID}`}>
          <div>{entryData.date}</div>
          <label>Title:</label>
          <textarea
            id="edit-entry-title"
            name="title"
            defaultValue={entryData.title}
          />
          <label>Content:</label>
          <textarea
            id="edit-entry-content"
            name="content"
            defaultValue={entryData.content}
          />
          <br />
          <input id="edit-button" type="submit" value="Edit" />
        </form>
      )}
      {/* Delete button */}
      <button id="delete-button" onClick={deleteEntry}>
        Delete
      </button>
      <Modal
        modalVisibility={modalVisibility}
        setModalVisibility={setModalVisibility}
        postID={postID}
      />
    </div>
  );
}
export default Entry;
