import { useEffect, useState } from "react";

const SCROLL_THRESHOLD = 50;

function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY >= SCROLL_THRESHOLD);
    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <button
      type="button"
      id="back-to-top"
      className={`back-to-top${visible ? " back-to-top-visible" : ""}`}
      onClick={scrollToTop}
      aria-label="Przewiń do góry"
      aria-hidden={!visible}
    >
      <i className="fa fa-angle-up" aria-hidden="true" />
    </button>
  );
}

export default BackToTop;
