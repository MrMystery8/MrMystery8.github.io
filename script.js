document.addEventListener('DOMContentLoaded', () => {
    // --- Particle Configuration ---
    const particleConfig = {
        particles: {
            number: { value: 60, density: { enable: true, value_area: 800 } },
            color: { value: ["#0EA5E9", "#1D4ED8", "#6D28D9"] },
            shape: { type: ["circle", "triangle"] },
            opacity: { value: 0.5, random: false, anim: { enable: true, speed: 1, opacity_min: 0.1, sync: false } },
            size: { value: 5, random: true, anim: { enable: false } },
            line_linked: { enable: true, distance: 150, color: "themed", opacity: 0.4, width: 0.8 },
            move: { enable: true, speed: 1.5, direction: "none", random: false, straight: false, out_mode: "out", bounce: false, attract: { enable: false } }
        },
        interactivity: {
            detect_on: "window",
            events: {
                onhover: { enable: true, mode: "grab" },
                onclick: { enable: true, mode: "push" },
                resize: true
            },
            modes: {
                grab: { distance: 140, line_linked: { opacity: 0.7 } },
                push: { particles_nb: 3 }
            }
        },
        retina_detect: true
    };

    let pJSInstance = null;
    const particlesElement = document.getElementById('particles-js');
    let particlesEnabled = true;

    // --- Get DOM Element References ---
    const themeToggle = document.getElementById('theme-toggle');
    const hamburger = document.querySelector('.hamburger');
    const navUl = document.querySelector('nav ul');
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    const typewriterElement = document.getElementById('typewriter');
    const toggleParticlesBtn = document.getElementById('toggle-particles');
    const particlesContainer = document.getElementById('particles-js');
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('nav ul li a');
    const particleSettingsBtn = document.getElementById('particle-settings-btn');
    const particleSettingsPanel = document.getElementById('particle-settings');
    const closeSettingsBtn = document.getElementById('close-particle-settings');
    const applySettingsButton = document.getElementById('apply-particle-settings');
    const particleCountInput = document.getElementById('particle-count');
    const particleSpeedInput = document.getElementById('particle-speed');
    const particleSizeInput = document.getElementById('particle-size');
    const lineThicknessInput = document.getElementById('line-thickness');
    const lineDistanceInput = document.getElementById('line-distance');
    const particlesPerClickInput = document.getElementById('particles-per-click');
    const lineVisibilityInput = document.getElementById('line-visibility');
    const particleColorSelect = document.getElementById('particle-color');
    const lineColorSelect = document.getElementById('line-color');

    // --- Particle Functions ---
    function initParticles() {
        if (particlesElement && particlesEnabled) {
            const isThemed = lineColorSelect && lineColorSelect.value === 'theme-default';
            const isLightMode = document.body.classList.contains('light-mode');
            let currentLineColor;

            if (isThemed) {
                currentLineColor = isLightMode ? "#a1a1a1" : "#3a3a3a";
            } else if (lineColorSelect) {
                currentLineColor = lineColorSelect.value;
            } else {
                 currentLineColor = isLightMode ? "#a1a1a1" : "#3a3a3a";
            }

            const currentConfig = JSON.parse(JSON.stringify(particleConfig));
             if (currentConfig.particles.line_linked) {
                 currentConfig.particles.line_linked.color = currentLineColor;
             }
             if (particleColorSelect && particleColorSelect.value) {
                 currentConfig.particles.color.value = particleColorSelect.value.split(',');
             }

             if (pJSInstance && typeof pJSInstance.destroy === 'function') {
                pJSInstance.destroy();
                pJSInstance = null;
                const oldCanvas = particlesElement.querySelector('canvas');
                if (oldCanvas) oldCanvas.remove();
             }

            pJSInstance = particlesJS('particles-js', currentConfig);
        }
    }

    function destroyParticles() {
        if (pJSInstance && typeof pJSInstance.destroy === 'function') {
            pJSInstance.destroy();
            pJSInstance = null;
            const canvas = particlesElement.querySelector('canvas');
            if (canvas) canvas.remove();
        }
    }

    function updateParticles() {
        if (particleCountInput) particleConfig.particles.number.value = parseInt(particleCountInput.value, 10);
        if (particleSpeedInput) particleConfig.particles.move.speed = parseFloat(particleSpeedInput.value);
        if (particleSizeInput) particleConfig.particles.size.value = parseInt(particleSizeInput.value, 10);
        if (lineThicknessInput) particleConfig.particles.line_linked.width = parseFloat(lineThicknessInput.value);
        if (lineDistanceInput) particleConfig.particles.line_linked.distance = parseInt(lineDistanceInput.value, 10);
        if (particlesPerClickInput) particleConfig.interactivity.modes.push.particles_nb = parseInt(particlesPerClickInput.value, 10);
        if (lineVisibilityInput) particleConfig.particles.line_linked.enable = lineVisibilityInput.checked;

        initParticles();
    }


    // --- Theme Toggling ---
    function setInitialTheme() {
        const prefersDarkInitial = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const savedTheme = localStorage.getItem('theme');

        if (savedTheme === 'light') {
            document.body.classList.add('light-mode');
            if (themeToggle) themeToggle.innerHTML = '<i class="fas fa-fw fa-sun"></i>';
        } else if (savedTheme === 'dark') {
            document.body.classList.remove('light-mode');
            if (themeToggle) themeToggle.innerHTML = '<i class="fas fa-fw fa-moon"></i>';
        } else if (prefersDarkInitial) {
            document.body.classList.remove('light-mode');
            if (themeToggle) themeToggle.innerHTML = '<i class="fas fa-fw fa-moon"></i>';
        } else {
            document.body.classList.add('light-mode');
            if (themeToggle) themeToggle.innerHTML = '<i class="fas fa-fw fa-sun"></i>';
        }
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('light-mode');
            const isNowLight = document.body.classList.contains('light-mode');
            themeToggle.innerHTML = isNowLight ? '<i class="fas fa-fw fa-sun"></i>' : '<i class="fas fa-fw fa-moon"></i>';
            localStorage.setItem('theme', isNowLight ? 'light' : 'dark');
            updateParticles();
        });
    }

    // --- Initial Setup Calls ---
    setInitialTheme();
    initParticles();

    // --- Mobile Navigation ---
    if (hamburger && navUl) {
        hamburger.addEventListener('click', (e) => {
            e.stopPropagation();
            const isExpanded = navUl.classList.toggle('show');
            hamburger.setAttribute('aria-expanded', isExpanded);
            hamburger.innerHTML = isExpanded ? '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
        });
        navUl.addEventListener('click', (e) => {
            if (e.target.tagName === 'A' && navUl.classList.contains('show')) {
                navUl.classList.remove('show');
                hamburger.setAttribute('aria-expanded', 'false');
                hamburger.innerHTML = '<i class="fas fa-bars"></i>';
            }
        });
        document.addEventListener('click', (e) => {
            if (navUl.classList.contains('show') && !navUl.contains(e.target) && e.target !== hamburger && !hamburger.contains(e.target)) {
                navUl.classList.remove('show');
                hamburger.setAttribute('aria-expanded', 'false');
                hamburger.innerHTML = '<i class="fas fa-bars"></i>';
            }
        });
    }

    // --- Accordion ---
    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const accordionItem = header.parentElement;
            const accordionContent = header.nextElementSibling;
            if (!accordionItem || !accordionContent) return;

            const currentlyOpen = accordionItem.classList.contains('open');

            if (!currentlyOpen) {
                accordionItem.classList.add('open');
                accordionContent.style.maxHeight = accordionContent.scrollHeight + 50 + "px";
                accordionContent.style.opacity = 1;
            } else {
                accordionItem.classList.remove('open');
                accordionContent.style.maxHeight = null;
                accordionContent.style.opacity = 0;
            }
        });

        const content = header.nextElementSibling;
        if (content) {
            content.addEventListener('transitionend', (e) => {
                 if (e.propertyName === 'max-height') {
                    if (content.style.maxHeight !== '0px' && content.style.maxHeight !== null && content.parentElement.classList.contains('open')) {
                         content.style.maxHeight = content.scrollHeight + "px";
                    }
                }
            });
        }
    });

    // --- Intersection Observer for Animations & Skill Bars (REINSTATED FROM INITIAL CODE) ---
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1 // Trigger when 10% is visible/hidden
    };

    const animationObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            // Target element for clarity
            const target = entry.target;

            // CASE 1: Element is entering or intersecting the viewport
            if (entry.isIntersecting) {
                // Add the class to trigger the general 'in' animation for the element
                // Check if it has data-aos attribute before adding class
                if (target.hasAttribute('data-aos')) {
                    target.classList.add('aos-animate');
                }

                // --- Specific logic for Skill Bar Animation (Run every time) ---
                 // Check if the target IS the #skills section OR CONTAINS skill circles
                const skillSection = target.id === 'skills' ? target : target.closest('#skills');
                if (skillSection) {
                    const skillCircles = skillSection.querySelectorAll('.circle-chart-circle');
                    skillCircles.forEach(circle => {
                        const percentage = circle.getAttribute('data-percentage');
                        if (percentage) {
                            // ** Trick to ensure animation restarts: **
                            circle.style.transition = 'none'; // 1. Temp remove transition
                            circle.style.strokeDasharray = '0, 100'; // 2. Reset to 0
                            void circle.offsetWidth; // 3. Force reflow
                            circle.style.transition = ''; // 4. Re-enable CSS transition
                            // 5. Set target value slightly delayed
                            setTimeout(() => {
                                circle.style.strokeDasharray = `${percentage}, 100`;
                            }, 10); // Small delay
                        }
                    });
                }
            }
            // CASE 2: Element is leaving the viewport
            else {
                 // Remove the class to trigger the general 'out' animation
                 // Check if it has the class before removing AND has data-aos
                 if (target.hasAttribute('data-aos') && target.classList.contains('aos-animate')) {
                    target.classList.remove('aos-animate');
                 }

                // --- Reset Skill Bars when section scrolls out ---
                 const skillSection = target.id === 'skills' ? target : target.closest('#skills');
                 if (skillSection) {
                    const skillCircles = skillSection.querySelectorAll('.circle-chart-circle');
                    skillCircles.forEach(circle => {
                         // Reset stroke immediately without animation
                         circle.style.transition = 'none';
                         circle.style.strokeDasharray = '0, 100';
                          // Re-enable transition shortly after resetting
                         setTimeout(() => { circle.style.transition = ''; }, 50);
                    });
                }
            }
        });
    }, observerOptions);

    // Observe elements with data-aos attribute AND the #skills section
    document.querySelectorAll('[data-aos], #skills').forEach(element => {
        if (element) { // Ensure element exists
            animationObserver.observe(element);
        }
    });
    // --- END REINSTATED Intersection Observer ---


    // --- Particle Settings Panel Logic ---
    function updateLabelValue(inputElement) {
        if (!inputElement || !inputElement.previousElementSibling) return;
        const label = inputElement.previousElementSibling;
        const span = label.querySelector('span');
        if (span) span.textContent = `(${inputElement.value})`;
    }
    [particleCountInput, particleSpeedInput, particleSizeInput, lineThicknessInput, lineDistanceInput, particlesPerClickInput].forEach(input => {
        if (input) {
            updateLabelValue(input);
            input.addEventListener('input', () => updateLabelValue(input));
        }
    });
    if (particleSettingsBtn) {
        particleSettingsBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            if (particleSettingsPanel) particleSettingsPanel.classList.toggle('show');
        });
    }
    if (closeSettingsBtn && particleSettingsPanel) {
        closeSettingsBtn.addEventListener('click', () => {
            particleSettingsPanel.classList.remove('show');
        });
    }
    if (applySettingsButton) {
        applySettingsButton.addEventListener('click', () => {
            updateParticles();
        });
    }
    document.addEventListener('click', (event) => {
        if (particleSettingsPanel && particleSettingsPanel.classList.contains('show')) {
            if (!particleSettingsPanel.contains(event.target) && !particleSettingsBtn?.contains(event.target)) {
                particleSettingsPanel.classList.remove('show');
            }
        }
    });

    // --- Accessibility: Toggle Particles ---
    if (toggleParticlesBtn && particlesContainer) {
        const updateToggleButton = () => {
            if (particlesEnabled) {
                toggleParticlesBtn.innerHTML = '<i class="fas fa-fw fa-universal-access"></i>';
                toggleParticlesBtn.setAttribute('aria-pressed', 'false');
                toggleParticlesBtn.setAttribute('title', 'Disable Particles (Accessibility)');
            } else {
                toggleParticlesBtn.innerHTML = '<i class="fas fa-fw fa-eye-slash"></i>';
                toggleParticlesBtn.setAttribute('aria-pressed', 'true');
                toggleParticlesBtn.setAttribute('title', 'Enable Particles');
            }
        };

        toggleParticlesBtn.addEventListener('click', () => {
            particlesEnabled = !particlesEnabled;
            if (particlesEnabled) {
                particlesContainer.style.display = '';
                document.body.classList.remove('reduce-motion');
                initParticles();
            } else {
                destroyParticles();
                particlesContainer.style.display = 'none';
                document.body.classList.add('reduce-motion');
            }
            updateToggleButton();
        });
        updateToggleButton();
        if (!particlesEnabled) {
             particlesContainer.style.display = 'none';
             document.body.classList.add('reduce-motion');
        }
    }

    // --- Smooth Scrolling for Nav Links ---
    document.querySelectorAll('nav ul li a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            try {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    const navHeight = document.querySelector('nav')?.offsetHeight || 70;
                    const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navHeight - 15;

                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });

                    if (navUl && navUl.classList.contains('show')) {
                        navUl.classList.remove('show');
                        if(hamburger) {
                            hamburger.setAttribute('aria-expanded', 'false');
                            hamburger.innerHTML = '<i class="fas fa-bars"></i>';
                        }
                    }
                }
            } catch (error) {
                console.error("Error finding element for smooth scroll:", targetId, error);
            }
        });
    });


    // --- Active Nav Link Highlighting on Scroll ---
    function highlightNavLink() {
        let currentSectionId = '';
        const navHeight = document.querySelector('nav')?.offsetHeight || 70;
        const scrollThreshold = window.pageYOffset + navHeight + window.innerHeight * 0.4;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
             if (sectionTop <= scrollThreshold && (sectionTop + sectionHeight) > (window.pageYOffset + navHeight + 50)) {
                  currentSectionId = section.getAttribute('id');
             }
        });

         if (window.pageYOffset < window.innerHeight * 0.5) {
             currentSectionId = 'hero';
         }

         if (window.innerHeight + window.pageYOffset >= document.body.offsetHeight - 20) {
             if (sections.length > 0) {
                 currentSectionId = sections[sections.length - 1].id;
             }
         }

        navLinks.forEach(link => {
            link.classList.remove('active');
            const linkHref = link.getAttribute('href');
            if (linkHref === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
    }
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(highlightNavLink, 50);
    });
    highlightNavLink();


    // --- Typewriter Effect ---
    const phrases = ["AI Specialist", "Web Developer", "Computer Science Student", "Tech Innovator", "Graphic Designer"];
    let phraseIndex = 0, letterIndex = 0, currentPhrase = '', isDeleting = false;

    function typeWriter() {
        if (!typewriterElement) return;

        const phrase = phrases[phraseIndex];
        let typeSpeed = isDeleting ? 60 : 130;

        if (isDeleting) {
            currentPhrase = phrase.substring(0, letterIndex--);
        } else {
            currentPhrase = phrase.substring(0, letterIndex++);
        }

        typewriterElement.textContent = currentPhrase;

        if (!isDeleting && letterIndex > phrase.length) {
            typeSpeed = 2200;
            isDeleting = true;
            letterIndex = phrase.length;
        } else if (isDeleting && letterIndex < 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typeSpeed = 500;
            letterIndex = 0;
        }

        setTimeout(typeWriter, typeSpeed);
    }

    if (typewriterElement) {
        setTimeout(typeWriter, 1200);
    }


     // --- Resize Debouncer ---
     let resizeTimeout;
     window.addEventListener('resize', () => {
         clearTimeout(resizeTimeout);
         resizeTimeout = setTimeout(() => {
             highlightNavLink();
             document.querySelectorAll('.accordion-item.open .accordion-content').forEach(content => {
                 if (content.offsetParent !== null) {
                    content.style.maxHeight = content.scrollHeight + "px";
                 }
             });
         }, 250);
     });

     // --- AOS Initialization (if uncommented in HTML) ---
     // Make sure the AOS library script is included in the HTML first
     // Example: AOS.init({ once: false }); // 'once: false' is CRUCIAL for the add/remove behavior

}); // End DOMContentLoaded