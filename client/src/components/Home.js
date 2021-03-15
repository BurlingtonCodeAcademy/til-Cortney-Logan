function Home(props) {
  return (
    <div id="home-page-container">
      <h1>What did you learn today? Create a new entry here:</h1>
      {/* new entry form allows users to input title, content, and categories for a new TIL entry */}
      <form id="add-an-entry-form" method="POST" action={"/addentry"}>
        <label>Title:</label>
        <textarea id="entry-title" name="title"></textarea>
        <label>Content:</label>
        <textarea id="entry-content" name="content"></textarea>

        {/* each category is a check box - as many categories as wanted can be selected */}
        <label>
          Categories:<span> select all relevant categories</span>
          <div id="categories">
            <div>
              <div className="checkbox-option">
                <input type="checkbox" id="javascript" name="javascript" />
                <label className="category-labels">JavaScript</label>
              </div>
              <div className="checkbox-option">
                <input type="checkbox" id="json" name="json" />
                <label className="category-labels">JSON</label>
              </div>
            </div>
            <div>
              <div className="checkbox-option">
                <input type="checkbox" id="html" name="html" />
                <label className="category-labels">HTML</label>
              </div>
              <div className="checkbox-option">
                <input type="checkbox" id="css" name="css" />
                <label className="category-labels">CSS</label>
              </div>
            </div>
            <div>
              <div className="checkbox-option">
                <input type="checkbox" id="frontend" name="frontend" />
                <label className="category-labels">Front End</label>
              </div>
              <div className="checkbox-option">
                <input type="checkbox" id="backend" name="backend" />
                <label className="category-labels">Back End</label>
              </div>
            </div>
            <div>
              <div className="checkbox-option">
                <input type="checkbox" id="fullstack" name="fullstack" />
                <label className="category-labels">Full Stack</label>
              </div>
              <div className="checkbox-option">
                <input type="checkbox" id="databases" name="databases" />
                <label className="category-labels">Databases</label>
              </div>
            </div>
          </div>
        </label>
        <input id="submit-button" type="submit"></input>
      </form>
    </div>
  );
}
export default Home;
