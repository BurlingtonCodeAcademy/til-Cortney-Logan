import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import moment from "moment"

function Facts(props) {
  //declares state to hold entries once retrieved from database
  const [entries, setEntries] = useState();

  //access query from url, removing ? from front of query
  let query = window.location.search.slice(1);

  //sanitize query and assign appropriate values to category and user-input
  let queryArray = query.split("=");
  let category = queryArray[0];
  let input = queryArray[1];

  //pulls entries from database upon load
  useEffect(() => {
    //guard clause to check if entries is already populated
    if (!entries) {
      //if there are query params in the url the results should be filtered, fetch filtered posts
      if (category && input) {
        fetch(`/filterPosts/${category}/${input}`)
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
      //if there are no query params in the url there is no filtering, fetch all posts
      else {
        fetch("/allposts")
          .then((res) => res.json())
          .then((entryInfo) => {
            let resultsArray = [];
            entryInfo.forEach((post) => {
              resultsArray.push(post);
            });
            setEntries(resultsArray);
          });
      }
    }
  });

  //initiates array of categories to be used in category display
  let arrayOfCategories = [
    "javascript",
    "json",
    "html",
    "css",
    "frontend",
    "backend",
    "fullstack",
    "databases",
  ];

  // each entry is set up as a link to entry page with title, date, and categories
  return (
    <div id="facts-page-container">
      {/* filter with user input options */}
      <div id="search-container">
        <form id="search-form" method="POST" action="search">
          <select id="filter-options" name="category">
            <option value="pick-a-filter">Filter by</option>
            <option value="title">Title</option>
            <option value="content">Content</option>
            <option value="categories">Category</option>
          </select>
          <input id="user-input" name="input" type="text" />
          <input id="filter-button" type="submit" value="Filter" />
        </form>

        {/* if results are filtered button shows offering option to remove filters */}
        {query && <Link to={"/facts"}><button onClick ="window.location.reload()"  id="remove-all-filters">Remove All Filters</button></Link>}
      </div>

      {/* displays list of all posts and attributes */}
      <div id="list-of-entries">
        {entries &&
          entries.map((entry, index) => {
            return (
              <Link to={`/facts/${entry._id}`} key={index}>
                <div className="facts-page-entry">
                  <div className="entry-title">
                    <h3>{entry.title}</h3>
                    <h3>{moment(entry.date).format()}</h3>
                  </div>
                  <div className="entry-content">
                    <p>{entry.content}</p>
                  </div>

                  {/* each category is mapped to a li if true in the post record */}
                  <ul className="categories-list">
                    {arrayOfCategories.map((category, index) => {
                      if (entry.categories[category])
                        return <li key={index}>{`#${category}`}</li>;
                    })}
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
