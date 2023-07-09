const DATA = [
    {
      title: "Temperature converter",
      thumbnail: "img/temp converter.png",
      image: "img/temp converter.png",
      captions: ["Minor Project", "FrontEnd", "2023"],
      description:
        "Temperature converter is a platform that convert the degree of temperature to farenhite and celcius.",
      tags: [
        "HTML",
        "CSS",
        "Java script"
        
      ],
      sourceCode: "#",
      liveLink: "#",
    },
    {
      title: "quizz platform",
      thumbnail: "img/quizz platform.png",
      image: "img/quizz platform.png",
      captions: ["Minor project", "Frontend", "2023"],
      description:
        "Quizz platform provides you differnt question of frontend Web development to accelerate your journey towards Web develoment.",
      tags: ["HTML", "CSS", "JAVASCRIPT"],
      sourceCode: "#",
      liveLink: "#",
    },
    {
      title: "Plant E-Commerce",
      thumbnail: "img/plant.png",
      image: "img/plant.png",
      captions: ["Major Project","Frontend", "2023"],
      description:
        "Plant E-Commerce provides differnt type of Indoor plants with good quality in affordble price.  ",
      tags: ["html", "css", "javascript"],
      sourceCode: "#",
      liveLink: "#",
    },
   
  ];
  
  const openMenuBtn = document.getElementById("open-menu");
  const closeMenuBtn = document.getElementById("close-menu");
  const navLinks = document.getElementById("mobile-nav");
  const modalContainer = document.getElementById("modal-container");
  const portfolio = document.getElementById("portfolio");
  const form = document.getElementById("contact-form");
  const appBar = document.querySelector(".app-bar");
  const menu = document.querySelector(".mobile-menu");
  const container = document.querySelector(".container");
  const helperText = document.getElementById("helper-text");
  
  /**
   * Helper function for creating HTML DOM elements
   */
  function createComponent(name, props = {}) {
    const { children = [], ...attributes } = props;
    const element = document.createElement(name);
    Object.keys(attributes).forEach((attribute) => {
      element[attribute] = attributes[attribute];
    });
    children.forEach((child) => element.appendChild(child));
  
    return element;
  }
  
  function Icon(name) {
    const icon = createComponent("img", {
      src: `images/icons/${name}.svg`,
      alt: "",
    });
  
    return icon;
  }
  
  function Captions(data = []) {
    const row = [];
  
    data.forEach((text, index, arr) => {
      const caption = createComponent("span", {
        className: `caption bolder-2 color-n${index === 0 ? "600" : "100"}`,
        textContent: text,
      });
      row.push(caption);
      if (index !== arr.length - 1) {
        row.push(Icon("dot"));
      }
    });
  
    const captions = createComponent("div", {
      className: "captions",
      children: row,
    });
  
    return captions;
  }
  
  function Title(text) {
    const title = createComponent("h2", {
      className: "header-3 color-n800 mb-12",
      textContent: text,
    });
  
    return title;
  }
  
  function Paragraph(text) {
    const paragraph = createComponent("p", {
      className: "body-3 color-n600 mb-12",
      textContent: text,
    });
  
    return paragraph;
  }
  
  function Tags(data = []) {
    const tags = createComponent("ul", {
      className: "tags",
      children: data.map((tag) =>
        createComponent("li", {
          className: "tag",
          children: [
            createComponent("span", {
              className: "small color-b400",
              textContent: tag,
            }),
          ],
        })
      ),
    });
  
    return tags;
  }
  
  function Picture(src, className = "snapshot") {
    const image = createComponent("img", {
      src,
      alt: "Snapshot of project",
      className,
    });
  
    return image;
  }
  
  function Button({ text, icon, type, href }) {
    let button;
    if (type === "link") {
      button = createComponent("a", {
        className: "link-button",
        href,
        innerText: text,
        children: [Icon(icon)],
      });
    } else if (type === "icon-button") {
      button = createComponent("button", {
        type: "button",
        className: "icon-button",
        children: [Icon("cancel")],
      });
    } else {
      button = createComponent("button", {
        type: "button",
        className: "button",
        textContent: text,
      });
    }
  
    return button;
  }
  
  function toggleModal() {
    container.classList.toggle("modal-overlay");
    document.body.classList.toggle("scroll-off");
  }
  
  
  /**
   * Create and return a project card DOM Node,
   * to be inserted into the project section on the main page.
   */
  function createCard(project, invert) {
    const CardImage = Picture(project.thumbnail);
    const CardTitle = Title(project.title);
    const CardText = Paragraph(project.description);
    const ProjectCaptions = Captions(project.captions);
    const ProjectTags = Tags(project.tags);
    const CardButton = Button({ text: "See Project" });
  
    const CardFooter = createComponent("div", {
      className: "action",
      children: [CardButton],
    });
  
    const CardBody = createComponent("div", {
      className: `card-body mt-12 + ${invert ? " swap" : ""}`,
      children: [CardTitle, ProjectCaptions, CardText, ProjectTags, CardFooter],
    });
  
    const Card = createComponent("article", {
      children: [CardImage, CardBody],
      className: "card",
    });
  
    CardButton.addEventListener("click", () => {
      modalContainer.appendChild(createModal(project));
      toggleModal();
    });
  
    return Card;
  }
  
  /**
   * Add projects to HTML portfolio section
   */
  function loadProjects(data = []) {
    data.forEach((project, index) => {
      portfolio.appendChild(createCard(project, index % 2 === 1));
    });
  }
  
  function toggleMenu() {
    menu.classList.toggle("open-menu");
    container.classList.toggle("menu-overlay");
    document.body.classList.toggle("scroll-off");
  }
  
  let scrolling = false;
  function onScroll() {
    scrolling = true;
  }
  
  // Throttle onscroll listener
  setInterval(() => {
    if (scrolling) {
      scrolling = false;
      const scrollY = Math.round(window.scrollY);
      if (scrollY) {
        appBar.classList.add("elevate-header");
      } else {
        appBar.classList.remove("elevate-header");
      }
    }
  }, 300);
  
  function validateForm(event) {
    const email = form.elements.user_email;
    const { value } = email;
    const expected = value.toLowerCase();
    if (value !== expected) {
      email.classList.add("error");
      helperText.innerText = `Email must be in lower case. Example: ${expected}`;
      event.preventDefault();
    } else {
      email.classList.remove("error");
    }
  }
  
  const STORE_KEY = "formData";
  
  /**
   * This function will save the user current input
   * in local storage.
   */
  function persistFormData(event) {
    let currentData = {};
    const storedData = localStorage.getItem(STORE_KEY);
  
    if (storedData) {
      currentData = JSON.parse(storedData);
    }
  
    const { name, value } = event.target;
    currentData[name] = value;
    localStorage.setItem(STORE_KEY, JSON.stringify(currentData));
  }
  
  /**
   * This function will check for saved form data,
   * and populate the page contact form if found.
   */
  function populateForm() {
    const dataString = localStorage.getItem(STORE_KEY);
  
    if (dataString) {
      const storedData = JSON.parse(dataString);
      Object.keys(storedData).forEach((key) => {
        form[key].value = storedData[key];
      });
    }
  }
  
  function resetForm() {
    localStorage.removeItem(STORE_KEY);
    const email = form.elements.user_email;
    email.classList.remove("error");
    helperText.innerText = "";
  }
  
  function onPageLoad() {
    loadProjects(DATA);
    populateForm();
  }
  
  form.addEventListener("reset", resetForm);
  form.user_email.addEventListener("input", persistFormData);
  form.user_name.addEventListener("input", persistFormData);
  form.message.addEventListener("input", persistFormData);
  form.addEventListener("submit", validateForm);
  openMenuBtn.addEventListener("click", toggleMenu);
  closeMenuBtn.addEventListener("click", toggleMenu);
  navLinks.addEventListener("click", toggleMenu);
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("load", onPageLoad);