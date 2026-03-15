function ContentBlockLink({ href, title, children }) {
  return (
    <a href={href} className="content-block-link" title={title}>
      {children}
    </a>
  );
}

export default ContentBlockLink;
