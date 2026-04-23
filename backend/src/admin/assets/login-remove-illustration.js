(() => {
  const apply = () => {
    const path = window.location.pathname;
    if (!path.endsWith("/login") && !path.endsWith("/admin/login")) {
      return;
    }

    const wrapper = document.querySelector(".login__Wrapper");
    if (!wrapper) {
      return;
    }

    const illustrationWrappers = wrapper.querySelectorAll("svg");
    illustrationWrappers.forEach((svg) => {
      const container = svg.closest("div");
      if (container) {
        container.remove();
      }
    });
  };

  const observer = new MutationObserver(apply);
  observer.observe(document.documentElement, { childList: true, subtree: true });
  apply();
})();
