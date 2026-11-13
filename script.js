
/* =========================================
   ATIFA KHAN - PERSONAL PORTFOLIO
   Complete JavaScript
========================================= */


/* ---------- PORTFOLIO SETTINGS ---------- */

const portfolioSettings = {
    email: "YOUR_EMAIL@example.com",
    github: "https://github.com/idcatifa",
    linkedin: "https://www.linkedin.com/in/atifakhan138/"
};


/* ---------- GRAPHIC DESIGN COLLECTION ---------- */

const designs = [
    {
        title: "Burger Design",
        category: "poster",
        image: "burgerdesign2.jpg"
    },
    {
        title: "Fried Chicken",
        category: "poster",
        image: "friedchicken.jpg"
    },
    {
        title: "Lamborghini",
        category: "branding",
        image: "lambo.jpg"
    },
    {
        title: "Menu Design",
        category: "branding",
        image: "MENU1.jpg"
    },
    {
        title: "Neem Calm",
        category: "branding",
        image: "neemcalm.jpg"
    },
    {
        title: "Pizza Design",
        category: "poster",
        image: "pizza.jpg"
    },
    {
        title: "Porsche",
        category: "branding",
        image: "porsche.jpg"
    },
    {
        title: "Spider-Man",
        category: "poster",
        image: "spiderman.jpg"
    }
];


/* ---------- PROJECT COLLECTION ---------- */

const projects = [
    {
        name: "MediBot",
        icon: "✚",
        description:
            "An AI-powered medical information chatbot developed using Python, Flask and the Groq API.",
        technologies: ["Python", "Flask", "Groq API", "HTML", "CSS"],
        link: "#"
    },
    {
        name: "Sylhet Lost & Found",
        icon: "⌕",
        description:
            "A university-focused lost and found platform that helps students report, discover and claim missing belongings.",
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
            "A student portal project designed to organize academic information and student-related activities.",
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


/* ---------- MOBILE NAVIGATION ---------- */

function setupNavigation() {
    const menuToggle = document.getElementById("menuToggle");
    const navLinks = document.getElementById("navLinks");

    if (!menuToggle || !navLinks) return;

    menuToggle.addEventListener("click", () => {
        navLinks.classList.toggle("active");
    });

    navLinks.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", () => {
            navLinks.classList.remove("active");
        });
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
            this.alt = "Image not found: " + design.image;
            this.style.display = "none";

            const error = createElement(
                "p",
                "image-error",
                "Image not found. Check the file name and folder."
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

        info.appendChild(title);
        info.appendChild(description);

        card.appendChild(image);
        card.appendChild(info);

        card.addEventListener("click", () => {
            openDesignModal(index, filteredDesigns);
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
            });

            button.classList.add("active");

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

        modal.innerHTML = `
            <button class="modal-close" aria-label="Close">&times;</button>
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

        modal.querySelector(".modal-close").addEventListener("click", closeDesignModal);

        modal.querySelector(".modal-prev").addEventListener("click", previousDesign);

        modal.querySelector(".modal-next").addEventListener("click", nextDesign);

        modal.addEventListener("click", event => {
            if (event.target === modal) {
                closeDesignModal();
            }
        });
    }

    modal.style.display = "flex";

    document.body.style.overflow = "hidden";

    updateDesignModal();
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

    if (modal) {
        modal.style.display = "none";
    }

    document.body.style.overflow = "";
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

        card.appendChild(icon);
        card.appendChild(title);
        card.appendChild(description);
        card.appendChild(technologies);

        if (project.link && project.link !== "#") {
            const link = createElement("a", "project-link", "View project ↗");

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
    }

    if (linkedinLink) {
        linkedinLink.href = portfolioSettings.linkedin;
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


/* ---------- SCROLL REVEAL ---------- */

let revealObserver;

function setupScrollReveal() {
    if (!("IntersectionObserver" in window)) {
        document.querySelectorAll(".reveal").forEach(element => {
            element.classList.add("visible");
        });

        return;
    }

    if (!revealObserver) {
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
    }

    observeRevealElements();
}


function observeRevealElements() {
    if (!revealObserver) return;

    document.querySelectorAll(
        ".section-heading, .about-text, .highlight-card, .education-card, .skill-card, .design-card, .project-card, .contact-content"
    ).forEach(element => {

        if (element.dataset.revealObserved === "true") return;

        element.classList.add("reveal");
        element.dataset.revealObserved = "true";

        revealObserver.observe(element);
    });
}


/* ---------- PARTICLE BACKGROUND ---------- */

function createParticleBackground() {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        return;
    }

    const canvas = document.createElement("canvas");

    canvas.id = "particleCanvas";

    document.body.prepend(canvas);

    const ctx = canvas.getContext("2d");

    if (!ctx) return;

    let particles = [];
    let width = 0;
    let height = 0;

    function resizeCanvas() {
        width = window.innerWidth;
        height = window.innerHeight;

        const ratio = Math.min(window.devicePixelRatio || 1, 2);

        canvas.width = width * ratio;
        canvas.height = height * ratio;

        ctx.setTransform(ratio, 0, 0, ratio, 0, 0);

        const count = Math.min(
            Math.floor((width * height) / 14000),
            75
        );

        particles = [];

        for (let i = 0; i < count; i++) {
            particles.push({
                x: Math.random() * width,
                y: Math.random() * height,
                size: Math.random() * 1.5 + 0.5,
                speedX: (Math.random() - 0.5) * 0.35,
                speedY: (Math.random() - 0.5) * 0.35,
                opacity: Math.random() * 0.45 + 0.1
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
                `rgba(165, 140, 255, ${particle.opacity})`;

            ctx.fill();
        });

        requestAnimationFrame(animateParticles);
    }

    resizeCanvas();

    window.addEventListener("resize", resizeCanvas);

    animateParticles();
}


/* ---------- CUSTOM CURSOR GLOW ---------- */

function createCursorGlow() {
    if (
        window.matchMedia("(pointer: coarse)").matches ||
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
        return;
    }

    const glow = createElement("div", "cursor-glow");

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

            setTimeout(() => {
                ripple.remove();
            }, 650);

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

    console.log("Atifa Khan portfolio initialized successfully.");
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
