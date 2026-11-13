
/* =========================================
   ATIFA KHAN — CREATIVE PORTFOLIO
   Interactive JavaScript
========================================= */


/* ---------- PORTFOLIO SETTINGS ---------- */

const portfolioSettings = {
    email: "atifakhan588@example.com",
    github: "https://github.com/idcatifa",
    linkedin: "https://www.linkedin.com/in/atifakhan138/"
};


/* ---------- GRAPHIC DESIGN COLLECTION ---------- */

const designs = [
    {
        title: "Burger Design",
        category: "poster",
        image: "burgerdesign2.jpg",
        description: "Creative food advertising poster."
    },
    {
        title: "Fried Chicken",
        category: "poster",
        image: "friedchicken.jpg",
        description: "Food campaign and promotional design."
    },
    {
        title: "Lamborghini",
        category: "branding",
        image: "lambo.jpg",
        description: "Automotive-inspired creative design."
    },
    {
        title: "Menu Design",
        category: "branding",
        image: "MENU1.jpg",
        description: "Restaurant menu layout and branding."
    },
    {
        title: "Neem Calm",
        category: "branding",
        image: "neemcalm.jpg",
        description: "Product branding and visual identity."
    },
    {
        title: "Pizza Design",
        category: "poster",
        image: "pizza.jpg",
        description: "Creative food promotional poster."
    },
    {
        title: "Porsche",
        category: "branding",
        image: "porsche.jpg",
        description: "Automotive visual design."
    },
    {
        title: "Spider-Man",
        category: "poster",
        image: "spiderman.jpg",
        description: "Creative poster composition."
    }
];


/* ---------- PROJECT COLLECTION ---------- */

const projects = [
    {
        name: "MediBot",
        icon: "✳",
        description:
            "An AI-powered medical information chatbot developed using Python, Flask and the Groq API.",
        technologies: ["Python", "Flask", "Groq API", "HTML", "CSS"],
        link: "#"
    },
    {
        name: "Sylhet Lost & Found",
        icon: "⌕",
        description:
            "A university-focused platform that helps students report, discover and claim missing belongings.",
        technologies: ["PHP", "MySQL", "JavaScript", "HTML", "CSS"],
        link: "#"
    },
    {
        name: "GyanAdda",
        icon: "✧",
        description:
            "An Android quiz application designed to make learning interactive and enjoyable.",
        technologies: ["Kotlin", "Android Studio"],
        link: "#"
    },
    {
        name: "Student Academic Portal",
        icon: "▤",
        description:
            "A student portal designed to organize academic information and student-related activities.",
        technologies: ["React", "Express.js", "MySQL"],
        link: "#"
    }
];


/* ---------- HELPER FUNCTION ---------- */

function createElement(tag, className, text) {
    const element = document.createElement(tag);

    if (className) {
        element.className = className;
    }

    if (text !== undefined) {
        element.textContent = text;
    }

    return element;
}


/* ---------- ACCESSIBILITY ---------- */

const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
).matches;


/* ---------- MOBILE NAVIGATION ---------- */

function setupNavigation() {
    const menuToggle = document.getElementById("menuToggle");
    const navLinks = document.getElementById("navLinks");

    if (!menuToggle || !navLinks) return;

    menuToggle.setAttribute("aria-expanded", "false");

    menuToggle.addEventListener("click", () => {
        const isOpen = navLinks.classList.toggle("active");

        menuToggle.setAttribute("aria-expanded", String(isOpen));
        menuToggle.classList.toggle("menu-open", isOpen);
    });

    navLinks.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", () => {
            navLinks.classList.remove("active");
            menuToggle.classList.remove("menu-open");
            menuToggle.setAttribute("aria-expanded", "false");
        });
    });

    document.addEventListener("click", event => {
        if (
            !navLinks.contains(event.target) &&
            !menuToggle.contains(event.target)
        ) {
            navLinks.classList.remove("active");
            menuToggle.classList.remove("menu-open");
            menuToggle.setAttribute("aria-expanded", "false");
        }
    });
}


/* ---------- SCROLL REVEAL ---------- */

let revealObserver;

function setupScrollReveal() {
    if (prefersReducedMotion) {
        document.querySelectorAll(".reveal").forEach(element => {
            element.classList.add("visible");
        });
        return;
    }

    if (!("IntersectionObserver" in window)) {
        document.querySelectorAll(".reveal").forEach(element => {
            element.classList.add("visible");
        });
        return;
    }

    revealObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.12
    });

    observeRevealElements();
}


function observeRevealElements() {
    const elements = document.querySelectorAll(
        ".section-heading, .about-text, .highlight-card, " +
        ".education-card, .skill-card, .design-card, " +
        ".project-card, .contact-content"
    );

    elements.forEach(element => {
        element.classList.add("reveal");

        if (revealObserver && !element.dataset.revealObserved) {
            element.dataset.revealObserved = "true";
            revealObserver.observe(element);
        } else if (!revealObserver && prefersReducedMotion) {
            element.classList.add("visible");
        }
    });
}


/* ---------- DESIGN GALLERY ---------- */

function renderDesigns(filter = "all") {
    const designGrid = document.getElementById("designGrid");

    if (!designGrid) return;

    designGrid.innerHTML = "";

    const filteredDesigns = designs.filter(design => {
        return filter === "all" || design.category === filter;
    });

    filteredDesigns.forEach((design, index) => {
        const card = createElement("article", "design-card reveal");

        const image = createElement("img", "design-image");

        image.src = design.image;
        image.alt = design.title;
        image.loading = "lazy";

        image.onerror = function () {
            this.style.display = "none";

            const error = createElement(
                "p",
                "image-error",
                "Image unavailable. Check the file name."
            );

            card.prepend(error);
        };

        const info = createElement("div", "design-info");

        const title = createElement("h3", "", design.title);

        const description = createElement(
            "p",
            "",
            design.description
        );

        info.append(title, description);
        card.append(image, info);

        card.setAttribute("tabindex", "0");
        card.setAttribute("role", "button");
        card.setAttribute(
            "aria-label",
            `View ${design.title} design`
        );

        card.addEventListener("click", () => {
            openDesignModal(index, filteredDesigns);
        });

        card.addEventListener("keydown", event => {
            if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                openDesignModal(index, filteredDesigns);
            }
        });

        designGrid.appendChild(card);
    });

    observeRevealElements();
}


/* ---------- DESIGN FILTERS ---------- */

function setupDesignFilters() {
    const filterButtons = document.querySelectorAll(".filter-btn");

    filterButtons.forEach(button => {
        button.addEventListener("click", () => {
            filterButtons.forEach(btn => {
                btn.classList.remove("active");
                btn.setAttribute("aria-pressed", "false");
            });

            button.classList.add("active");
            button.setAttribute("aria-pressed", "true");

            const filter = button.dataset.filter || "all";

            renderDesigns(filter);
        });
    });
}


/* ---------- DESIGN IMAGE MODAL ---------- */

let currentDesignIndex = 0;
let currentDesignList = [];

function openDesignModal(index, designList) {
    currentDesignIndex = index;
    currentDesignList = designList;

    let modal = document.getElementById("designModal");

    if (!modal) {
        modal = document.createElement("div");

        modal.id = "designModal";
        modal.className = "design-modal";

        modal.setAttribute("role", "dialog");
        modal.setAttribute("aria-modal", "true");
        modal.setAttribute("aria-label", "Design preview");

        modal.innerHTML = `
            <button class="modal-close" aria-label="Close preview">&times;</button>
            <button class="modal-prev" aria-label="Previous image">&#10094;</button>

            <img id="modalImage" src="" alt="Selected design">

            <button class="modal-next" aria-label="Next image">&#10095;</button>

            <div class="modal-caption">
                <h3 id="modalTitle"></h3>
                <p id="modalDescription"></p>
                <span id="modalCounter"></span>
            </div>
        `;

        document.body.appendChild(modal);

        modal.querySelector(".modal-close").addEventListener(
            "click",
            closeDesignModal
        );

        modal.querySelector(".modal-prev").addEventListener(
            "click",
            previousDesign
        );

        modal.querySelector(".modal-next").addEventListener(
            "click",
            nextDesign
        );

        modal.addEventListener("click", event => {
            if (event.target === modal) {
                closeDesignModal();
            }
        });
    }

    modal.style.display = "flex";
    document.body.style.overflow = "hidden";

    updateDesignModal();

    modal.querySelector(".modal-close").focus();
}


function updateDesignModal() {
    const design = currentDesignList[currentDesignIndex];

    if (!design) return;

    const image = document.getElementById("modalImage");
    const title = document.getElementById("modalTitle");
    const description = document.getElementById("modalDescription");
    const counter = document.getElementById("modalCounter");

    image.src = design.image;
    image.alt = design.title;

    title.textContent = design.title;
    description.textContent = design.description;

    counter.textContent =
        `${currentDesignIndex + 1} / ${currentDesignList.length}`;
}


function closeDesignModal() {
    const modal = document.getElementById("designModal");

    if (!modal) return;

    modal.style.display = "none";
    document.body.style.overflow = "";

    const lastFocused = document.querySelector(".design-card");

    if (lastFocused) lastFocused.focus();
}


function nextDesign() {
    if (!currentDesignList.length) return;

    currentDesignIndex =
        (currentDesignIndex + 1) % currentDesignList.length;

    updateDesignModal();
}


function previousDesign() {
    if (!currentDesignList.length) return;

    currentDesignIndex =
        (currentDesignIndex - 1 + currentDesignList.length) %
        currentDesignList.length;

    updateDesignModal();
}


/* ---------- MODAL KEYBOARD CONTROLS ---------- */

document.addEventListener("keydown", event => {
    const modal = document.getElementById("designModal");

    if (!modal || modal.style.display !== "flex") return;

    if (event.key === "Escape") {
        closeDesignModal();
    }

    if (event.key === "ArrowRight") {
        nextDesign();
    }

    if (event.key === "ArrowLeft") {
        previousDesign();
    }
});


/* ---------- PROJECTS ---------- */

function renderProjects() {
    const projectGrid = document.getElementById("projectGrid");

    if (!projectGrid) return;

    projectGrid.innerHTML = "";

    projects.forEach(project => {
        const card = createElement("article", "project-card reveal");

        const icon = createElement("div", "project-icon", project.icon);

        const title = createElement("h3", "", project.name);

        const description = createElement(
            "p",
            "",
            project.description
        );

        const technologies = createElement(
            "div",
            "project-technologies"
        );

        project.technologies.forEach(technology => {
            const tag = createElement("span", "", technology);
            technologies.appendChild(tag);
        });

        card.append(icon, title, description, technologies);

        if (project.link && project.link !== "#") {
            const link = createElement(
                "a",
                "project-link",
                "View project ↗"
            );

            link.href = project.link;
            link.target = "_blank";
            link.rel = "noopener noreferrer";

            card.appendChild(link);
        }

        projectGrid.appendChild(card);
    });

    observeRevealElements();
}


/* ---------- SOCIAL LINKS AND EMAIL ---------- */

function setupContactLinks() {
    const githubLink = document.getElementById("githubLink");
    const linkedinLink = document.getElementById("linkedinLink");
    const emailLink = document.getElementById("emailLink");

    if (githubLink) {
        githubLink.href = portfolioSettings.github;
        githubLink.target = "_blank";
        githubLink.rel = "noopener noreferrer";
    }

    if (linkedinLink) {
        linkedinLink.href = portfolioSettings.linkedin;
        linkedinLink.target = "_blank";
        linkedinLink.rel = "noopener noreferrer";
    }

    if (emailLink) {
        emailLink.href = `mailto:${portfolioSettings.email}`;
    }
}


/* ---------- CURRENT YEAR ---------- */

function setupCurrentYear() {
    const year = document.getElementById("currentYear");

    if (year) {
        year.textContent = new Date().getFullYear();
    }
}


/* ---------- PARTICLE BACKGROUND ---------- */

function createParticleBackground() {
    if (prefersReducedMotion) return;

    if (document.getElementById("particleCanvas")) return;

    const canvas = document.createElement("canvas");

    canvas.id = "particleCanvas";
    canvas.setAttribute("aria-hidden", "true");

    document.body.prepend(canvas);

    const ctx = canvas.getContext("2d");

    if (!ctx) return;

    let particles = [];
    let width = 0;
    let height = 0;
    let animationFrame;

    function resizeCanvas() {
        width = window.innerWidth;
        height = window.innerHeight;

        const ratio = Math.min(window.devicePixelRatio || 1, 2);

        canvas.width = width * ratio;
        canvas.height = height * ratio;

        ctx.setTransform(ratio, 0, 0, ratio, 0, 0);

        const count = Math.min(
            Math.floor((width * height) / 18000),
            55
        );

        particles = [];

        for (let i = 0; i < count; i++) {
            particles.push({
                x: Math.random() * width,
                y: Math.random() * height,
                size: Math.random() * 2 + 0.7,
                speedX: (Math.random() - 0.5) * 0.25,
                speedY: (Math.random() - 0.5) * 0.25,
                opacity: Math.random() * 0.35 + 0.12
            });
        }
    }

    function animateParticles() {
        ctx.clearRect(0, 0, width, height);

        particles.forEach(particle => {
            particle.x += particle.speedX;
            particle.y += particle.speedY;

            if (particle.x < 0 || particle.x > width) {
                particle.speedX *= -1;
            }

            if (particle.y < 0 || particle.y > height) {
                particle.speedY *= -1;
            }

            ctx.beginPath();

            ctx.arc(
                particle.x,
                particle.y,
                particle.size,
                0,
                Math.PI * 2
            );

            ctx.fillStyle =
                `rgba(225, 160, 195, ${particle.opacity})`;

            ctx.fill();
        });

        animationFrame = requestAnimationFrame(animateParticles);
    }

    resizeCanvas();

    window.addEventListener("resize", resizeCanvas);

    document.addEventListener("visibilitychange", () => {
        if (document.hidden) {
            cancelAnimationFrame(animationFrame);
        } else {
            animateParticles();
        }
    });

    animateParticles();
}


/* ---------- CUSTOM CURSOR GLOW ---------- */

function createCursorGlow() {
    if (
        prefersReducedMotion ||
        window.matchMedia("(pointer: coarse)").matches
    ) {
        return;
    }

    if (document.querySelector(".cursor-glow")) return;

    const glow = createElement("div", "cursor-glow");

    glow.setAttribute("aria-hidden", "true");

    document.body.appendChild(glow);

    window.addEventListener("mousemove", event => {
        glow.style.left = event.clientX + "px";
        glow.style.top = event.clientY + "px";
    });
}


/* ---------- ACTIVE NAVIGATION ---------- */

function setupActiveNavigation() {
    const sections = document.querySelectorAll("main section[id]");
    const links = document.querySelectorAll(".nav-links a");

    if (!("IntersectionObserver" in window)) return;

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;

            links.forEach(link => {
                link.classList.remove("nav-active");

                if (
                    link.getAttribute("href") ===
                    "#" + entry.target.id
                ) {
                    link.classList.add("nav-active");
                }
            });
        });
    }, {
        rootMargin: "-30% 0px -60% 0px"
    });

    sections.forEach(section => observer.observe(section));
}


/* ---------- BUTTON RIPPLE EFFECT ---------- */

function setupButtonRipple() {
    if (prefersReducedMotion) return;

    document.querySelectorAll(".btn").forEach(button => {
        button.addEventListener("click", event => {
            const rect = button.getBoundingClientRect();

            const ripple = createElement("span", "ripple");

            const size = Math.max(rect.width, rect.height);

            ripple.style.width = size + "px";
            ripple.style.height = size + "px";

            ripple.style.left =
                (event.clientX - rect.left - size / 2) + "px";

            ripple.style.top =
                (event.clientY - rect.top - size / 2) + "px";

            button.appendChild(ripple);

            setTimeout(() => ripple.remove(), 650);
        });
    });
}


/* ---------- SMOOTH ANCHOR SCROLLING ---------- */

function setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener("click", event => {
            const targetId = link.getAttribute("href");

            if (!targetId || targetId === "#") return;

            const target = document.querySelector(targetId);

            if (!target) return;

            event.preventDefault();

            target.scrollIntoView({
                behavior: prefersReducedMotion ? "auto" : "smooth",
                block: "start"
            });
        });
    });
}


/* ---------- INITIALIZE PORTFOLIO ---------- */

function initializePortfolio() {
    setupNavigation();

    renderDesigns("all");
    setupDesignFilters();

    renderProjects();

    setupContactLinks();
    setupCurrentYear();

    setupScrollReveal();

    createParticleBackground();
    createCursorGlow();

    setupActiveNavigation();
    setupButtonRipple();
    setupSmoothScrolling();

    console.log("Atifa Khan portfolio initialized successfully ✨");
}


/* ---------- RUN AFTER HTML LOADS ---------- */

if (document.readyState === "loading") {
    document.addEventListener(
        "DOMContentLoaded",
        initializePortfolio
    );
} else {
    initializePortfolio();
}
