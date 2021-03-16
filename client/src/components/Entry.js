import { useState, useEffect } from "react";
import Modal from "./Modal.js";
import moment from "moment";

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
          <div id="edit-entry-title">
            Original Submission: <b>{moment(entryData.date).format()}</b>
          </div>
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

          {/* categories populate based on the existing value (true/false) for that entry */}
          <label>
            Categories:<span> select all relevant categories</span>
            <div id="categories">
              <div>
                <div className="checkbox-option">
                  <input
                    type="checkbox"
                    id="javascript"
                    name="javascript"
                    defaultChecked={entryData.categories.javascript}
                  />
                  <label className="category-labels">JavaScript</label>
                </div>
                <div className="checkbox-option">
                  <input
                    type="checkbox"
                    id="json"
                    name="json"
                    defaultChecked={entryData.categories.json}
                  />
                  <label className="category-labels">JSON</label>
                </div>
              </div>
              <div>
                <div className="checkbox-option">
                  <input
                    type="checkbox"
                    id="html"
                    name="html"
                    defaultChecked={entryData.categories.html}
                  />
                  <label className="category-labels">HTML</label>
                </div>
                <div className="checkbox-option">
                  <input
                    type="checkbox"
                    id="css"
                    name="css"
                    defaultChecked={entryData.categories.css}
                  />
                  <label className="category-labels">CSS</label>
                </div>
              </div>
              <div>
                <div className="checkbox-option">
                  <input
                    type="checkbox"
                    id="frontend"
                    name="frontend"
                    defaultChecked={entryData.categories.frontend}
                  />
                  <label className="category-labels">Front End</label>
                </div>
                <div className="checkbox-option">
                  <input
                    type="checkbox"
                    id="backend"
                    name="backend"
                    defaultChecked={entryData.categories.backend}
                  />
                  <label className="category-labels">Back End</label>
                </div>
              </div>
              <div>
                <div className="checkbox-option">
                  <input
                    type="checkbox"
                    id="fullstack"
                    name="fullstack"
                    defaultChecked={entryData.categories.fullstack}
                  />
                  <label className="category-labels">Full Stack</label>
                </div>
                <div className="checkbox-option">
                  <input
                    type="checkbox"
                    id="databases"
                    name="databases"
                    defaultChecked={entryData.categories.databases}
                  />
                  <label className="category-labels">Databases</label>
                </div>
              </div>
            </div>
          </label>

          <input id="edit-button" type="submit" value="Edit" />
        </form>
      )}
      {/* Delete button */}
      <button id="delete-button" onClick={deleteEntry}>
        Delete
      </button>
      {/* Modal - initially hidden but is triggered by delete button */}
      <Modal
        modalVisibility={modalVisibility}
        setModalVisibility={setModalVisibility}
        postID={postID}
      />
    </div>
  );
}
export default Entry;
