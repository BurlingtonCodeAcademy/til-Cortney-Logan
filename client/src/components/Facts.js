import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

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

  let arrayOfCategories = ["javascript", "json", "html", "css", "frontend", "backend", "fullstack", "databases"];

  // each entry is set up as a link to entry page with title, date, and categories
  return (
    <div id="facts-page-container">
      <div id="search-container">
        <form id="search-form">
          <select id="filter-options" name="category">
            <option value="pick-a-filter">Filter by</option>
            <option value="title">Title</option>
            <option value="categories">Category</option>
          </select>
          <input id="user-input" name="user-input" type="text" />
          <input id="filter-button" type="submit" value="Filter" />
        </form>
      </div>
      <div id="list-of-entries">
        {entries &&
          entries.map((entry, index) => {
            return (
              <Link to={`/facts/${entry._id}`} key={index}>
                <div className="facts-page-entry">
                  <div className="entry-title">
                    <h3>{entry.title}</h3>
                    <h3>{entry.date}</h3>
                  </div>
                  <div className="entry-content">
                    <p>{entry.content}</p>
                  </div>
                  <ul className = "categories-list">
                    {arrayOfCategories.map((category, index) => {
                      if(entry.categories[category])
                      return (
                        <li key={index}>{`#${category}`}</li>
                      );
                    })}
                    {/* <div>{entry.categories.html && <p>#html</p>}</div> */}
                  </ul>
                </div>
              </Link>
            );
          })}
      </div>
    </div>
  );
}

export default Facts;
