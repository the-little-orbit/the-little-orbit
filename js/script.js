/* =========================================================
   THE LITTLE ORBIT
   Interactive Experience
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       ELEMENTS
       ===================================================== */

    const body = document.body;

    const header =
        document.querySelector(".site-header");

    const menuToggle =
        document.querySelector(".menu-toggle");

    const mobileMenu =
        document.querySelector(".mobile-menu");

    const mobileLinks =
        document.querySelectorAll(".mobile-menu a");

    const navLinks =
        document.querySelectorAll(
            '.desktop-nav a[href^="#"], .mobile-menu a[href^="#"]'
        );

    const hero =
        document.querySelector(".hero");

    const processList =
        document.querySelector(".process-list");

    const processItems =
        document.querySelectorAll(".process-item");

    const serviceItems =
        document.querySelectorAll(".service-item");

    const magneticElements =
        document.querySelectorAll(".magnetic");

    const year =
        document.querySelector("[data-current-year]");


    /* =====================================================
       REDUCED MOTION
       ===================================================== */

    const reducedMotion =
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;


    /* =====================================================
       HEADER SCROLL EFFECT
       ===================================================== */

    const updateHeader = () => {

        if (!header) return;

        if (window.scrollY > 40) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }

    };

    updateHeader();

    window.addEventListener(
        "scroll",
        updateHeader,
        { passive: true }
    );


    /* =====================================================
       MOBILE MENU
       ===================================================== */

    const openMenu = () => {

        if (!menuToggle || !mobileMenu) return;

        menuToggle.classList.add("active");
        mobileMenu.classList.add("active");

        body.classList.add("menu-open");

        menuToggle.setAttribute(
            "aria-expanded",
            "true"
        );

        menuToggle.setAttribute(
            "aria-label",
            "Close navigation"
        );

    };


    const closeMenu = () => {

        if (!menuToggle || !mobileMenu) return;

        menuToggle.classList.remove("active");
        mobileMenu.classList.remove("active");

        body.classList.remove("menu-open");

        menuToggle.setAttribute(
            "aria-expanded",
            "false"
        );

        menuToggle.setAttribute(
            "aria-label",
            "Open navigation"
        );

    };


    if (menuToggle) {

        menuToggle.addEventListener(
            "click",
            () => {

                const isOpen =
                    menuToggle.classList.contains("active");

                if (isOpen) {
                    closeMenu();
                } else {
                    openMenu();
                }

            }
        );

    }


    mobileLinks.forEach((link) => {

        link.addEventListener(
            "click",
            closeMenu
        );

    });


    document.addEventListener(
        "keydown",
        (event) => {

            if (event.key === "Escape") {
                closeMenu();
            }

        }
    );


    window.addEventListener(
        "resize",
        () => {

            if (window.innerWidth > 850) {
                closeMenu();
            }

        }
    );


    /* =====================================================
       SMOOTH ANCHOR SCROLLING
       ===================================================== */

    navLinks.forEach((link) => {

        link.addEventListener(
            "click",
            (event) => {

                const targetId =
                    link.getAttribute("href");

                if (
                    !targetId ||
                    targetId === "#"
                ) {
                    return;
                }

                const target =
                    document.querySelector(targetId);

                if (!target) return;

                event.preventDefault();

                const headerHeight =
                    header
                        ? header.offsetHeight
                        : 0;

                const targetPosition =
                    target.getBoundingClientRect().top +
                    window.scrollY -
                    headerHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior:
                        reducedMotion
                            ? "auto"
                            : "smooth"
                });

                closeMenu();

            }
        );

    });


    /* =====================================================
       SCROLL REVEALS
       ===================================================== */

    const revealElements =
        document.querySelectorAll(
            ".intro-label, " +
            ".intro-content, " +
            ".intro-statement, " +
            ".section-top, " +
            ".service-item, " +
            ".process-heading, " +
            ".process-item, " +
            ".contact-content, " +
            ".footer-top"
        );


    if (reducedMotion) {

        revealElements.forEach(
            (element) => {
                element.classList.add(
                    "is-visible"
                );
            }
        );

    } else {

        revealElements.forEach(
            (element, index) => {

                element.classList.add(
                    "reveal"
                );

                element.style.transitionDelay =
                    `${(index % 4) * 70}ms`;

            }
        );


        const revealObserver =
            new IntersectionObserver(
                (entries, observer) => {

                    entries.forEach(
                        (entry) => {

                            if (
                                !entry.isIntersecting
                            ) {
                                return;
                            }

                            entry.target.classList.add(
                                "is-visible"
                            );

                            observer.unobserve(
                                entry.target
                            );

                        }
                    );

                },
                {
                    threshold: 0.12,
                    rootMargin:
                        "0px 0px -50px 0px"
                }
            );


        revealElements.forEach(
            (element) => {
                revealObserver.observe(
                    element
                );
            }
        );

    }

/* =====================================================
   HERO ORBIT — INDEPENDENT DOT MOTION
   ===================================================== */

const heroOrbit =
    document.querySelector(".hero-logo-orbit");

const heroDots =
    document.querySelectorAll(".hero-logo-dot");


if (
    heroOrbit &&
    heroDots.length &&
    !reducedMotion &&
    window.matchMedia("(pointer: fine)").matches
) {

    const dots = [
        {
            element: heroDots[0],
            angle: -0.65,
            speed: 0.00032,
            radiusX: 0.41,
            radiusY: 0.36
        },

        {
            element: heroDots[1],
            angle: 2.35,
            speed: -0.00023,
            radiusX: 0.44,
            radiusY: 0.40
        },

        {
            element: heroDots[2],
            angle: 0.15,
            speed: 0.00042,
            radiusX: 0.48,
            radiusY: 0.43
        }
    ];


    let mouseX = null;
    let mouseY = null;


    /* ---------------------------------------------
       TRACK MOUSE INSIDE HERO ORBIT
       --------------------------------------------- */

    heroOrbit.addEventListener(
        "pointermove",
        (event) => {

            const rect =
                heroOrbit.getBoundingClientRect();

            mouseX =
                event.clientX -
                rect.left -
                rect.width / 2;

            mouseY =
                event.clientY -
                rect.top -
                rect.height / 2;

        }
    );


    heroOrbit.addEventListener(
        "pointerleave",
        () => {

            mouseX = null;
            mouseY = null;

        }
    );


    /* ---------------------------------------------
       ANIMATION
       --------------------------------------------- */

    const animateDots = (time) => {

        const width =
            heroOrbit.clientWidth;

        const height =
            heroOrbit.clientHeight;


        dots.forEach((dot) => {

            dot.angle += dot.speed * 16;


            const radiusX =
                width * dot.radiusX;

            const radiusY =
                height * dot.radiusY;


            let x =
                Math.cos(dot.angle) *
                radiusX;

            let y =
                Math.sin(dot.angle) *
                radiusY;


            /* -----------------------------------------
               CURSOR REACTION
               ----------------------------------------- */

            let proximity = 0;


            if (
                mouseX !== null &&
                mouseY !== null
            ) {

                const distance =
                    Math.hypot(
                        mouseX - x,
                        mouseY - y
                    );


                const reactionRadius = 150;


                if (
                    distance < reactionRadius
                ) {

                    proximity =
                        1 -
                        distance /
                        reactionRadius;


                    const force =
                        proximity *
                        proximity *
                        28;


                    const dx =
                        x - mouseX;

                    const dy =
                        y - mouseY;


                    const length =
                        Math.max(
                            Math.hypot(dx, dy),
                            1
                        );


                    x +=
                        (dx / length) *
                        force;

                    y +=
                        (dy / length) *
                        force;

                }

            }


            /* -----------------------------------------
               APPLY POSITION
               ----------------------------------------- */

            dot.element.style.left = "50%";
            dot.element.style.top = "50%";

            dot.element.style.right = "auto";
            dot.element.style.bottom = "auto";


            dot.element.style.transform =
                `translate(
                    calc(-50% + ${x}px),
                    calc(-50% + ${y}px)
                )
                scale(${1 + proximity * 0.65})`;


            /* -----------------------------------------
               CURSOR GLOW
               ----------------------------------------- */

            if (proximity > 0) {

                dot.element.style.filter =
                    `drop-shadow(
                        0 0 ${6 + proximity * 12}px
                        rgba(184, 138, 59, ${0.25 + proximity * 0.55})
                    )`;

            } else {

                dot.element.style.filter =
                    "none";

            }

        });


        requestAnimationFrame(
            animateDots
        );

    };


    requestAnimationFrame(
        animateDots
    );

}

    /* =====================================================
       SERVICE HOVER — ACTIVE STATE
       ===================================================== */

    serviceItems.forEach(
        (item) => {

            item.addEventListener(
                "mouseenter",
                () => {

                    serviceItems.forEach(
                        (otherItem) => {

                            otherItem.classList.remove(
                                "service-active"
                            );

                        }
                    );

                    item.classList.add(
                        "service-active"
                    );

                }
            );


            item.addEventListener(
                "mouseleave",
                () => {

                    item.classList.remove(
                        "service-active"
                    );

                }
            );

        }
    );


    /* =====================================================
       PROCESS PROGRESS
       ===================================================== */

    if (processList && !reducedMotion) {

        const processObserver =
            new IntersectionObserver(
                (entries) => {

                    entries.forEach(
                        (entry) => {

                            if (
                                entry.isIntersecting
                            ) {

                                processList.classList.add(
                                    "is-active"
                                );

                            }

                        }
                    );

                },
                {
                    threshold: 0.2
                }
            );


        processObserver.observe(
            processList
        );

    }


    /* =====================================================
       PROCESS ITEM FOCUS
       ===================================================== */

    if (!reducedMotion) {

        const processObserver =
            new IntersectionObserver(
                (entries) => {

                    entries.forEach(
                        (entry) => {

                            if (
                                entry.isIntersecting
                            ) {

                                entry.target.style.opacity =
                                    "1";

                            }

                        }
                    );

                },
                {
                    threshold: 0.5
                }
            );


        processItems.forEach(
            (item) => {

                processObserver.observe(
                    item
                );

            }
        );

    }


    /* =====================================================
       MAGNETIC BUTTONS
       ===================================================== */

    if (
        !reducedMotion &&
        window.matchMedia("(pointer: fine)").matches
    ) {

        magneticElements.forEach(
            (element) => {

                element.addEventListener(
                    "pointermove",
                    (event) => {

                        const rect =
                            element.getBoundingClientRect();

                        const x =
                            event.clientX -
                            rect.left -
                            rect.width / 2;

                        const y =
                            event.clientY -
                            rect.top -
                            rect.height / 2;

                        element.style.transform =
                            `translate(
                                ${x * 0.08}px,
                                ${y * 0.08}px
                            )`;

                    }
                );


                element.addEventListener(
                    "pointerleave",
                    () => {

                        element.style.transform =
                            "";

                    }
                );

            }
        );

    }


    /* =====================================================
       ACTIVE NAVIGATION
       ===================================================== */

    const sections =
        document.querySelectorAll(
            "main section[id]"
        );


    if (sections.length) {

        const sectionObserver =
            new IntersectionObserver(
                (entries) => {

                    entries.forEach(
                        (entry) => {

                            if (
                                !entry.isIntersecting
                            ) {
                                return;
                            }

                            const id =
                                entry.target.getAttribute(
                                    "id"
                                );


                            navLinks.forEach(
                                (link) => {

                                    link.classList.toggle(
                                        "active",
                                        link.getAttribute(
                                            "href"
                                        ) === `#${id}`
                                    );

                                }
                            );

                        }
                    );

                },
                {
                    rootMargin:
                        "-40% 0px -50% 0px"
                }
            );


        sections.forEach(
            (section) => {

                sectionObserver.observe(
                    section
                );

            }
        );

    }


    /* =====================================================
       CURRENT YEAR
       ===================================================== */

    if (year) {

        year.textContent =
            new Date().getFullYear();

    }


    /* =====================================================
       PARALLAX CONTACT ORBIT
       ===================================================== */

    const contactOrbit =
        document.querySelector(
            ".contact-orbit"
        );


    if (
        contactOrbit &&
        !reducedMotion &&
        window.matchMedia("(pointer: fine)").matches
    ) {

        window.addEventListener(
            "scroll",
            () => {

                const rect =
                    contactOrbit
                        .parentElement
                        .getBoundingClientRect();

                const viewportHeight =
                    window.innerHeight;

                if (
                    rect.bottom < 0 ||
                    rect.top > viewportHeight
                ) {
                    return;
                }

                const progress =
                    (viewportHeight - rect.top) /
                    (viewportHeight + rect.height);

                const movement =
                    (progress - 0.5) * 80;

                contactOrbit.style.transform =
                    `translateY(
                        calc(-50% + ${movement}px)
                    )`;

            },
            {
                passive: true
            }
        );

    }

});

/* =====================================================
   GLASS NAVIGATION
   ===================================================== */

const glassNav = document.querySelector(".glass-nav");
const navLinks = document.querySelectorAll(".glass-nav a");

function updateGlassNav(id) {

    if (!glassNav) return;

    glassNav.classList.remove(
        "glider-services",
        "glider-process",
        "glider-about"
    );

    glassNav.classList.add(`glider-${id}`);

    navLinks.forEach(link => {
        link.classList.remove("active");
    });

    const activeLink = document.querySelector(
        `.glass-nav a[href="#${id}"]`
    );

    if (activeLink) {
        activeLink.classList.add("active");
    }
}


/* Click */

navLinks.forEach(link => {

    link.addEventListener("click", () => {

        const id = link
            .getAttribute("href")
            .replace("#", "");

        updateGlassNav(id);

    });

});


/* Scroll detection */

const sections = document.querySelectorAll(
    "#services, #process, #about"
);

const navObserver = new IntersectionObserver(
    entries => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {
                updateGlassNav(entry.target.id);
            }

        });

    },
    {
        rootMargin: "-35% 0px -55% 0px"
    }
);


sections.forEach(section => {
    navObserver.observe(section);
});


/* Default */

updateGlassNav("services");


/* =====================================================
   CLIENT ORBIT — DYNAMIC HOVER
   ===================================================== */

const clientOrbit =
    document.querySelector(".client-orbit");

const clientOrbitItems =
    document.querySelectorAll(".client-orbit-item");

const clientOrbitTitle =
    document.querySelector("#client-orbit-title");

const clientOrbitDescription =
    document.querySelector("#client-orbit-description");


if (
    clientOrbit &&
    clientOrbitItems.length &&
    clientOrbitTitle &&
    clientOrbitDescription
) {

    clientOrbitItems.forEach((item) => {

        item.addEventListener("mouseenter", () => {

            clientOrbitItems.forEach((otherItem) => {
                otherItem.classList.remove("active");
            });

            item.classList.add("active");

            clientOrbitTitle.textContent =
                item.dataset.title;

            clientOrbitDescription.textContent =
                item.dataset.description;

        });


        item.addEventListener("mouseleave", () => {

            item.classList.remove("active");

            clientOrbitTitle.textContent =
                "YOUR BUSINESS";

            clientOrbitDescription.textContent =
                "Find your place in the digital orbit.";

        });

    });

}


/* =====================================================
   SERVICE CURSOR SPOTLIGHT
   ===================================================== */

const serviceItems =
    document.querySelectorAll(".service-item");

serviceItems.forEach((item) => {

    item.addEventListener("pointermove", (event) => {

        const rect = item.getBoundingClientRect();

        const x =
            ((event.clientX - rect.left) / rect.width) * 100;

        const y =
            ((event.clientY - rect.top) / rect.height) * 100;

        item.style.setProperty(
            "--mouse-x",
            `${x}%`
        );

        item.style.setProperty(
            "--mouse-y",
            `${y}%`
        );

    });

});
