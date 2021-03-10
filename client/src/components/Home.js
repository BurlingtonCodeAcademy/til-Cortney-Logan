function Home(props) {
  return (
    <div id="home-page-container">
      <h1>This is the home page</h1>
      <form id="add-an-entry-form" method="POST" action={"/test"}>
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
