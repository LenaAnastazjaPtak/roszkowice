import { Link } from "react-router-dom";

function ContentBlockLink({ to, title, children }) {
  return (
    <Link to={to} className="content-block-link" title={title}>
      {children}
    </Link>
  );
}

export default ContentBlockLink;
