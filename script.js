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
                currentLineColor = isLightMode ? "#0EA5E9" : "#0EA5E9"; // Theme default colors
            } else if (lineColorSelect) {
                currentLineColor = lineColorSelect.value; // Specific color selected
            } else {
                 currentLineColor = isLightMode ? "#0EA5E9" : "#0EA5E9"; // Fallback
            }

            // Use a temporary config copy to avoid modifying the main 'particleConfig' object directly here
            const currentConfig = JSON.parse(JSON.stringify(particleConfig));
            currentConfig.particles.line_linked.color = currentLineColor;

            // Ensure previous instance is destroyed before creating a new one
             if (pJSInstance && typeof pJSInstance.destroy === 'function') {
                pJSInstance.destroy();
                pJSInstance = null; // Reset the instance variable
                 // Manually remove the old canvas if it wasn't removed by destroy()
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
        // 1. Update the main 'particleConfig' object from the input values
        if (particleCountInput) particleConfig.particles.number.value = parseInt(particleCountInput.value, 10);
        if (particleSpeedInput) particleConfig.particles.move.speed = parseFloat(particleSpeedInput.value);
        if (particleSizeInput) particleConfig.particles.size.value = parseInt(particleSizeInput.value, 10);
        if (lineThicknessInput) particleConfig.particles.line_linked.width = parseFloat(lineThicknessInput.value);
        if (lineDistanceInput) particleConfig.particles.line_linked.distance = parseInt(lineDistanceInput.value, 10);
        if (particlesPerClickInput) particleConfig.interactivity.modes.push.particles_nb = parseInt(particlesPerClickInput.value, 10);
        if (lineVisibilityInput) particleConfig.particles.line_linked.enable = lineVisibilityInput.checked;
        if (particleColorSelect) particleConfig.particles.color.value = particleColorSelect.value.split(',');
        // Note: line_linked.color is now handled dynamically within initParticles based on theme/selection

        // 2. Re-initialize particles using the updated config (implicitly used by initParticles)
        initParticles();
    }


    // --- Theme Toggling ---
    function setInitialTheme() {
        const prefersDarkInitial = window.matchMedia('(prefers-color-scheme: dark)').matches;
        if (prefersDarkInitial) {
            document.body.classList.remove('light-mode');
            if (themeToggle) themeToggle.innerHTML = '<i class="fas fa-fw fa-moon"></i>';
        } else {
            document.body.classList.add('light-mode');
             if (themeToggle) themeToggle.innerHTML = '<i class="fas fa-fw fa-sun"></i>';
        }
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            // 1. Toggle the class on the body
            document.body.classList.toggle('light-mode');

            // 2. Check the new state AFTER toggling
            const isNowLight = document.body.classList.contains('light-mode');

            // 3. Update the button icon based on the new state
            themeToggle.innerHTML = isNowLight
                ? '<i class="fas fa-fw fa-sun"></i>'
                : '<i class="fas fa-fw fa-moon"></i>';

            // 4. Update particles only if the line color is set to 'theme-default'
            if (lineColorSelect && lineColorSelect.value === 'theme-default') {
                // console.log('Theme changed, updating particles for theme color'); // For debugging
                updateParticles(); // This will call initParticles which reads the new theme state
            }
        });
    }

    // --- Initial Setup Calls ---
    setInitialTheme(); // Set theme based on OS preference first
    initParticles(); // Then initialize particles (which will read the initial theme)

    // --- Mobile Navigation ---
    if (hamburger && navUl) {
        hamburger.addEventListener('click', (e) => {
            e.stopPropagation();
            navUl.classList.toggle('show');
            hamburger.setAttribute('aria-expanded', navUl.classList.contains('show'));
        });
        navUl.addEventListener('click', (e) => {
            if (e.target.tagName === 'A' && navUl.classList.contains('show')) {
                navUl.classList.remove('show');
                hamburger.setAttribute('aria-expanded', 'false');
            }
        });
        document.addEventListener('click', (e) => {
            if (navUl.classList.contains('show') && !navUl.contains(e.target) && e.target !== hamburger && !hamburger.contains(e.target)) {
                navUl.classList.remove('show');
                hamburger.setAttribute('aria-expanded', 'false');
            }
        });
    }

    // --- Accordion ---
    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const accordionItem = header.parentElement;
            const accordionContent = header.nextElementSibling;
            if (!accordionItem || !accordionContent) return; // Safety check

            const currentlyOpen = accordionItem.classList.contains('open');

            if (!currentlyOpen) {
                accordionItem.classList.add('open');
                accordionContent.style.maxHeight = accordionContent.scrollHeight + "px";
                accordionContent.style.opacity = 1;
            } else {
                accordionItem.classList.remove('open');
                accordionContent.style.maxHeight = null; // Collapse
                accordionContent.style.opacity = 0;
            }
        });
    });

    // --- Intersection Observer for Animations & Skill Bars (REVISED FOR REPLAY) ---
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1 // Trigger when 10% is visible/hidden
    };

    // REMOVED: let skillsAnimated = false; // No longer needed

    const animationObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            // Target element for clarity
            const target = entry.target;

            // CASE 1: Element is entering or intersecting the viewport
            if (entry.isIntersecting) {
                // Add the class to trigger the general 'in' animation for the element
                target.classList.add('aos-animate');

                // --- Specific logic for Skill Bar Animation (Run every time) ---
                if (target.id === 'skills') {
                    const skillCircles = target.querySelectorAll('.circle-chart-circle');
                    skillCircles.forEach(circle => {
                        const percentage = circle.getAttribute('data-percentage');
                        if (percentage) {
                            // ** Trick to ensure animation restarts: **
                            // 1. Temporarily remove transition for reset
                            circle.style.transition = 'none';
                            // 2. Reset to initial state (0)
                            circle.style.strokeDasharray = '0, 100';
                            // 3. Force browser reflow to apply the reset immediately
                            void circle.offsetWidth; // Reading offsetWidth forces reflow
                            // 4. Re-enable transition defined in CSS
                            circle.style.transition = ''; // Reverts to CSS rule
                            // 5. Set the target value - transition will now animate
                             // Use a minimal setTimeout to ensure the transition is re-enabled before setting target
                            setTimeout(() => {
                                circle.style.strokeDasharray = `${percentage}, 100`;
                            }, 10); // Small delay (10ms) should be sufficient
                        }
                    });
                }
            }
            // CASE 2: Element is leaving the viewport
            else {
                 // Remove the class to trigger the general 'out' animation
                 // Check if it has the class before removing
                 if (target.classList.contains('aos-animate')) {
                    target.classList.remove('aos-animate');
                 }

                // --- Reset Skill Bars when section scrolls out ---
                if (target.id === 'skills') {
                    const skillCircles = target.querySelectorAll('.circle-chart-circle');
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
    // --- END REVISED Intersection Observer ---


    // --- Particle Settings Panel Logic ---
    function updateLabelValue(inputElement) {
        if (!inputElement || !inputElement.previousElementSibling) return;
        const label = inputElement.previousElementSibling;
        const span = label.querySelector('span');
        if (span) span.textContent = `(${inputElement.value})`;
    }
    [particleCountInput, particleSpeedInput, particleSizeInput, lineThicknessInput, lineDistanceInput, particlesPerClickInput].forEach(input => {
        if (input) {
            input.addEventListener('input', () => updateLabelValue(input));
            updateLabelValue(input); // Initialize
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
            // Optional: Close panel after applying
            // if (particleSettingsPanel) particleSettingsPanel.classList.remove('show');
        });
    }
    document.addEventListener('click', (event) => {
        if (particleSettingsPanel && particleSettingsPanel.classList.contains('show')) {
            if (!particleSettingsPanel.contains(event.target) && event.target !== particleSettingsBtn && !particleSettingsBtn?.contains(event.target)) {
                particleSettingsPanel.classList.remove('show');
            }
        }
    });

    // --- Accessibility: Toggle Particles ---
    if (toggleParticlesBtn && particlesContainer) {
        toggleParticlesBtn.addEventListener('click', () => {
            particlesEnabled = !particlesEnabled;
            if (particlesEnabled) {
                particlesContainer.style.display = '';
                document.body.classList.remove('reduce-motion');
                initParticles(); // Re-initialize if enabled
                toggleParticlesBtn.innerHTML = '<i class="fas fa-fw fa-universal-access"></i>';
                toggleParticlesBtn.setAttribute('aria-pressed', 'false');
                toggleParticlesBtn.setAttribute('title', 'Disable Particles (Accessibility)');
            } else {
                destroyParticles(); // Destroy if disabled
                particlesContainer.style.display = 'none';
                document.body.classList.add('reduce-motion');
                toggleParticlesBtn.innerHTML = '<i class="fas fa-fw fa-eye-slash"></i>';
                toggleParticlesBtn.setAttribute('aria-pressed', 'true');
                toggleParticlesBtn.setAttribute('title', 'Enable Particles');
            }
        });
        // Set initial state based on particlesEnabled
        toggleParticlesBtn.innerHTML = particlesEnabled ? '<i class="fas fa-fw fa-universal-access"></i>' : '<i class="fas fa-fw fa-eye-slash"></i>';
        toggleParticlesBtn.setAttribute('aria-pressed', !particlesEnabled);
        toggleParticlesBtn.setAttribute('title', particlesEnabled ? 'Disable Particles (Accessibility)' : 'Enable Particles');
        if(!particlesEnabled) particlesContainer.style.display = 'none'; // Ensure hidden if default is off
    }

    // --- Smooth Scrolling for Nav Links ---
    document.querySelectorAll('nav ul li a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const navHeight = document.querySelector('nav')?.offsetHeight || 60;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navHeight - 10;
                window.scrollTo({ top: targetPosition, behavior: 'smooth' });
            }
            if (navUl && navUl.classList.contains('show')) {
                navUl.classList.remove('show');
                 if(hamburger) hamburger.setAttribute('aria-expanded', 'false');
            }
        });
    });

    // --- Active Nav Link Highlighting on Scroll ---
    function highlightNavLink() {
        let currentSectionId = 'hero'; // Default to hero
        const navHeight = document.querySelector('nav')?.offsetHeight || 60;
        // Adjust offset to trigger slightly earlier when scrolling down
        const scrollPosition = window.pageYOffset + navHeight + 100; // Fine-tune offset as needed

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            // Check if the scroll position is at or below the section's top
            if (scrollPosition >= sectionTop) {
                 currentSectionId = section.getAttribute('id'); // Tentatively set ID
            }
        });

         // Ensure last section is active if scrolled fully to the bottom
         if (window.innerHeight + window.pageYOffset >= document.body.offsetHeight - 5) { // Small tolerance
             if (sections.length > 0) {
                 currentSectionId = sections[sections.length - 1].id;
             }
         }

        navLinks.forEach(link => {
            const linkHref = link.getAttribute('href');
            if (linkHref === `#${currentSectionId}`) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }
    window.addEventListener('scroll', highlightNavLink);
    highlightNavLink(); // Initial call


    // --- Typewriter Effect ---
    const phrases = ["AI Enthusiast", "Web Developer", "Computer Science Student", "Innovator"];
    let phraseIndex = 0, letterIndex = 0, currentPhrase = '', isDeleting = false;
    function typeWriter() {
        if (!typewriterElement) return;
        const phrase = phrases[phraseIndex];
        if (isDeleting) {
            // Deleting
            currentPhrase = phrase.substring(0, letterIndex--);
        } else {
            // Typing
            currentPhrase = phrase.substring(0, letterIndex++);
        }
        typewriterElement.textContent = currentPhrase;

        let typeSpeed = isDeleting ? 50 : 120; // Adjust speeds as needed

        if (!isDeleting && letterIndex > phrase.length) { // Finished typing
            typeSpeed = 2000; // Pause at end
            isDeleting = true;
            letterIndex = phrase.length; // Correct index before starting deletion
        } else if (isDeleting && letterIndex < 0) { // Finished deleting
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length; // Move to next phrase
            typeSpeed = 500; // Pause before typing next
            letterIndex = 0; // Reset index
        }
        setTimeout(typeWriter, typeSpeed);
    }
    if (typewriterElement) setTimeout(typeWriter, 1000);


     // --- Resize Debouncer ---
     let resizeTimeout;
     window.addEventListener('resize', () => {
         clearTimeout(resizeTimeout);
         resizeTimeout = setTimeout(() => {
             highlightNavLink(); // Re-check nav link positions after resize
             // Recalculate open accordion heights if needed
             document.querySelectorAll('.accordion-item.open .accordion-content').forEach(content => {
                 if (content.offsetParent !== null) { // Check if visible
                    content.style.maxHeight = content.scrollHeight + "px";
                 }
             });
         }, 250);
     });

}); // End DOMContentLoaded