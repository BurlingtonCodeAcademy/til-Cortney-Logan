import { Link } from "react-router-dom";

function Header(props) {
  return (
    <div>
      <header>
        <Link to={"/"}>
          <h1>TIL</h1>
        </Link>
        <Link to={"/facts"}><h1>All Entries</h1></Link>
      </header>
    </div>
  );
}
export default Header;