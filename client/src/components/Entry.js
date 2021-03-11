import { useState, useEffect } from "react";

function Entry(props) {
  const [entryData, setEntryData] = useState(null);

  let postID = props.match.params.objectId;

  useEffect(() => {
    if (!entryData) {
      fetch(`/individualpost/${postID}`)
        .then((res) => res.json())
        .then((resultObj) => {
          setEntryData(resultObj);
        });
    }
  });

  return (
    <div id="entry-page-container">
      {entryData && (
        <div>
          <h2>{entryData.title}</h2>
          <h4>{entryData.date}</h4>
          <p>{entryData.content}</p>
        </div>
      )}
    </div>
  );
}
export default Entry;
