import { Link, useLocation } from "react-router-dom";

  export default function Navigation() {
    const currentPage = useLocation().pathname;
  
    return (
      <ul className="nav nav-tabs">
        <li className="nav-item">
          <Link
            to="/"

            className={currentPage === '/' ? 'nav-link active' : 'nav-link'}
          >
            Home
          </Link>
        </li>
        <li className="nav-item">
          <Link
            to="/savedcandidates"

            className={currentPage === '/savedcandidates' ? 'nav-link active' : 'nav-link'}
          >
            Potential Candidates
          </Link>
        </li>
      </ul>
    );
  }
