import { useState, useEffect } from "react";

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
      <h1>This is the facts page - for all entries</h1>
      <div id="list-of-entries">
        {entries &&
          entries.map((entry, index) => {
            return (
              <div key={index}>
                <h5>{entry.title}</h5>
                <h6>{entry.date}</h6>
                <p>{entry.content}</p>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default Facts;
