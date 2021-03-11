import { useState, useEffect } from "react";
import { Link } from "react-router-dom"

function Facts(props) {
  //declares state to hold entries once retrieved from database
  const [entries, setEntries] = useState();

  //pulls entries from database upon load
  useEffect(() => {
    //guard clause to check if entries is already populated
    if (!entries) {
      fetch("/allposts")
        .then((res) => res.json())
        //sets resulting array in state as entries
        .then((entryInfo) => {
          let resultsArray = [];
          entryInfo.forEach((post) => {
            resultsArray.push(post);
          });
          setEntries(resultsArray);
        });
    }
  });

  console.log("entries is", entries);

  return (
    <div id="facts-page-container">
      <div id="list-of-entries">
        {entries &&
          entries.map((entry, index) => {
            return (
              <Link to={`/facts/${entry._id}`}><div class="facts-page-entry" key={index}>
                <h5>{entry.title}</h5>
                <h6>{entry.date}</h6>
                <p>{entry.content}</p>
              </div></Link>
            );
          })}
      </div>
    </div>
  );
}

export default Facts;
