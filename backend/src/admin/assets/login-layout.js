(() => {
  const LOGIN_PATH_SUFFIX = "/admin/login";

  const applyLayout = () => {
    if (!window.location.pathname.endsWith(LOGIN_PATH_SUFFIX)) {
      return;
    }

    const wrapper = document.querySelector(".login__Wrapper");
    if (!wrapper) {
      return;
    }

    const loginCard = wrapper.firstElementChild;
    if (!loginCard || loginCard.children.length < 2) {
      return;
    }

    const leftPanel = loginCard.children[0];
    const formPanel = loginCard.children[1];
    if (!leftPanel || !formPanel) {
      return;
    }

    loginCard.style.display = "flex";
    leftPanel.style.order = "0";
    formPanel.style.order = "1";
    leftPanel.style.backgroundColor = "var(--color-accent-alt, #c19a6b)";
    leftPanel.style.color = "var(--colors-white, #ffffff)";
    formPanel.style.backgroundColor = "var(--colors-white, #ffffff)";

    const logoInForm = formPanel.querySelector("h5 img");
    if (logoInForm) {
      logoInForm.style.maxWidth = "140px";
      logoInForm.style.width = "100%";
      logoInForm.style.height = "auto";
      logoInForm.style.display = "block";
      logoInForm.style.margin = "0 auto";
    }

    const headingWithLogo = formPanel.querySelector("h5");
    if (headingWithLogo) {
      headingWithLogo.style.textAlign = "center";
      headingWithLogo.style.marginBottom = "20px";
    }

    const illustrations = leftPanel.querySelectorAll("svg");
    illustrations.forEach((svg) => {
      const root = svg.closest("div");
      if (root) {
        root.remove();
      }
    });

    formPanel.style.display = "flex";
    formPanel.style.flexDirection = "column";
    formPanel.style.justifyContent = "center";

    let formContent = formPanel.querySelector("[data-login-form-content='true']");
    if (!formContent) {
      formContent = document.createElement("div");
      formContent.setAttribute("data-login-form-content", "true");
      formContent.style.width = "100%";
      formContent.style.maxWidth = "380px";
      formContent.style.margin = "0 auto";
      while (formPanel.firstChild) {
        formContent.appendChild(formPanel.firstChild);
      }
      formPanel.appendChild(formContent);
    }

    const submitButton = formPanel.querySelector("button");
    if (submitButton) {
      submitButton.style.width = "100%";
    }
  };

  const observer = new MutationObserver(() => applyLayout());
  observer.observe(document.documentElement, { childList: true, subtree: true });
  applyLayout();
})();
