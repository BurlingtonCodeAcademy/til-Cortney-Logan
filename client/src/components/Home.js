function Home(props) {

  return (
    <div id="home-page-container">
      {/* new entry form allows users to input title, content, and categories for a new TIL entry */}
      <form id="add-an-entry-form" method="POST" action={"/addentry"}>
        <label>Title:</label>
        <br />
        <textarea id="entry-title" name="title"></textarea>
        <br />
        <label>Content:</label>
        <br />
        <textarea id="entry-content" name="content"></textarea>
        <br />
        <label>Categories:</label>
        <br />
        <textarea id="entry-categories" name="categories"></textarea>
        <br />
        <input id="submit-button" type="submit"></input>
      </form>
    </div>
  );
}
export default Home;
