import { Link } from "react-router-dom";

function Header(props) {
  //header with links to home and all entries
  return (
    <div>
      <header>
        <Link to={"/"}>
          <h1>Today I Learned</h1>
        </Link>
        <nav>
          <Link to={"/"}>
            <h2>Home</h2>
          </Link>
          <Link to={"/facts"}>
            <h2>All Entries</h2>
          </Link>
        </nav>
      </header>
    </div>
  );
}
export default Header;
