import { Link, useLocation } from "react-router-dom";

  // TODO: Add necessary code to display the navigation bar and link between the pages

  export default function Navigation() {
    const currentPage = useLocation().pathname;
  
    return (
      <ul className="nav nav-tabs">
        <li className="nav-item">
          <Link
            to="/"
            // This is a conditional (ternary) operator that checks to see if the current page is "Home"
            // If it is, we set the current page to 'nav-link-active', otherwise we set it to 'nav-link'
            className={currentPage === '/' ? 'nav-link active' : 'nav-link'}
          >
            Home
          </Link>
        </li>
        <li className="nav-item">
          <Link
            to="/savedcandidates"
            // Check to see if the currentPage is `About`, and if so we use the active link class from bootstrap. Otherwise, we set it to a normal nav-link
            className={currentPage === '/savedcandidates' ? 'nav-link active' : 'nav-link'}
          >
            Potential Candidates
          </Link>
        </li>
      </ul>
    );
  }
