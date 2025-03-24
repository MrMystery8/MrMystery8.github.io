document.addEventListener('DOMContentLoaded', () => {
    // Particle configuration (Default values as requested)
    const particleConfig = {
        particles: {
            number: {
                value: 60,
                density: {
                    enable: true,
                    value_area: 800
                }
            },
            color: {
                value: ["#0EA5E9", "#1D4ED8", "#6D28D9"]
            },
            shape: {
                type: ["circle", "triangle"]
            },
            opacity: {
                value: 0.5,
                random: false,
                anim: {
                    enable: true,
                    speed: 1,
                    opacity_min: 0.1,
                    sync: false
                }
            },
            size: {
                value: 5,
                random: true,
                anim: {
                    enable: false,
                    speed: 40,
                    size_min: 0.1,
                    sync: false
                }
            },
            line_linked: {
                enable: true,
                distance: 150,
                color: "#0EA5E9", // Default dark mode line color - will be overridden in light mode
                opacity: 0.4,
                width: 0.8
            },
            move: {
                enable: true,
                speed: 1.5,
                direction: "none",
                random: false,
                straight: false,
                out_mode: "out",
                bounce: false,
                attract: {
                    enable: false,
                    rotateX: 600,
                    rotateY: 1200
                }
            }
        },
        interactivity: {
            detect_on: "window", // Detect mouse events on the entire window
            events: {
                onhover: {
                    enable: true,
                    mode: "grab"
                },
                onclick: {
                    enable: true,
                    mode: "push"
                },
                resize: true
            },
            modes: {
                grab: {
                    distance: 200,
                    line_linked: {
                        opacity: 0.5
                    }
                },
                push: {
                    particles_nb: 4
                }
            }
        },
        retina_detect: true
    };

    let pJSInstance; // Variable to hold the particlesJS instance

    function updateParticles() {
        // 1. Get Updated Values:
        const newParticleCount = parseInt(particleCountInput.value, 10);
        const newParticleSpeed = parseFloat(particleSpeedInput.value);
        const newParticleSize = parseInt(particleSizeInput.value, 10);
        const newLineThickness = parseFloat(lineThicknessInput.value);
        const newLineDistance = parseInt(lineDistanceInput.value, 10);
        const newParticlesPerClick = parseInt(particlesPerClickInput.value, 10);
        const newLineVisibility = lineVisibilityInput.checked;
        const newParticleColors = particleColorSelect.value.split(',');
        let newLineColor = lineColorSelect.value; // Get selected line color

        if (newLineColor === 'theme-default') {
            newLineColor = document.body.classList.contains('light-mode') ? '#0ea5e9' : '#0EA5E9'; // Black for light, default for dark
        }


        // 2. Destroy the existing instance (if it exists):
        if (pJSInstance) {
            if (pJSInstance && typeof pJSInstance.destroy === 'function') {
                pJSInstance.destroy();
            }

            //Manually remove canvas
            const particlesContainer = document.getElementById('particles-js');
            const oldCanvas = particlesContainer.querySelector('canvas');
            if (oldCanvas) {
                particlesContainer.removeChild(oldCanvas);
            }
        }

        // 3. Update the configuration object:
        particleConfig.particles.number.value = newParticleCount;
        particleConfig.particles.move.speed = newParticleSpeed;
        particleConfig.particles.size.value = newParticleSize;
        particleConfig.particles.line_linked.width = newLineThickness;
        particleConfig.particles.line_linked.distance = newLineDistance;
        particleConfig.interactivity.modes.push.particles_nb = newParticlesPerClick;
        particleConfig.particles.line_linked.enable = newLineVisibility;
        particleConfig.particles.color.value = newParticleColors;
        particleConfig.particles.line_linked.color = newLineColor; // Set line color dynamically

        // 4. Create a new instance with the updated configuration:
        pJSInstance = particlesJS('particles-js', particleConfig);


        // 5. Reapply Pointer Events Fix
        const canvas = document.getElementById('particles-js').querySelector('canvas');
        if (canvas) {
            canvas.style.pointerEvents = 'none';
        }

    }


    // Initialize ParticlesJS and store the instance
    pJSInstance = particlesJS('particles-js', particleConfig);


    // Ensure canvas doesn't block mouse events
    const canvas = document.getElementById('particles-js').querySelector('canvas');
    if (canvas) {
        canvas.style.pointerEvents = 'none';
    }

    // Update mouse position globally on mousemove
    document.addEventListener('mousemove', (event) => {
        if (window.pJSDom && window.pJSDom[0] && window.pJSDom[0].pJS && window.pJSDom[0].pJS.interactivity) {
            const pJS = window.pJSDom[0].pJS;
            pJS.interactivity.mouse.pos_x = event.clientX;
            pJS.interactivity.mouse.pos_y = event.clientY;
        }
    });

    // Trigger particle push on click
    document.addEventListener('click', (event) => {
        if (window.pJSDom && window.pJSDom[0] && window.pJSDom[0].pJS && window.pJSDom[0].pJS.fn) {
            const pJS = window.pJSDom[0].pJS;
            pJS.fn.modes.pushParticles(pJS.interactivity.modes.push.particles_nb, pJS.interactivity.mouse);
        }
    });

    // Theme toggle functionality
    const themeToggle = document.getElementById('theme-toggle');
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('light-mode');
        themeToggle.innerHTML = document.body.classList.contains('light-mode')
            ? '<i class="fas fa-fw fa-sun"></i>'
            : '<i class="fas fa-fw fa-moon"></i>';
        updateParticles(); // Update particles when theme changes, especially for 'theme-default' line color
    });

    // Hamburger menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navUl = document.querySelector('nav ul');
    hamburger.addEventListener('click', () => {
        navUl.classList.toggle('show');
    });

    // Accordion functionality
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const accordionItem = header.parentElement;
            accordionItem.classList.toggle('open');
        });
    });

    // Initialize AOS -  Removed 'once: true' here!
    AOS.init({
        duration: 1000
    });

    // Particle Settings Button Functionality
    const particleSettingsBtn = document.getElementById('particle-settings-btn');
    const particleSettings = document.getElementById('particle-settings');
    particleSettingsBtn.addEventListener('click', () => {
        particleSettings.classList.toggle('show');
    });

    // Particle Toggle Button Functionality
    const toggleParticlesBtn = document.getElementById('toggle-particles');
    toggleParticlesBtn.addEventListener('click', () => {
        document.body.classList.toggle('reduce-motion');
        toggleParticlesBtn.innerHTML = document.body.classList.contains('reduce-motion')
            ? '<i class="fas fa-fw fa-universal-access"></i>' // Icon when particles are off (or reduced motion is on)
            : '<i class="fas fa-fw fa-universal-access"></i>'; // Icon when particles are on (or reduced motion is off)
    });


    // Particle Settings Elements
    const particleCountInput = document.getElementById('particle-count');
    const particleSpeedInput = document.getElementById('particle-speed');
    const particleSizeInput = document.getElementById('particle-size');
    const lineThicknessInput = document.getElementById('line-thickness');
    const lineDistanceInput = document.getElementById('line-distance'); // Line Distance Slider
    const particlesPerClickInput = document.getElementById('particles-per-click'); // Particles per click Slider
    const lineVisibilityInput = document.getElementById('line-visibility');
    const particleColorSelect = document.getElementById('particle-color');
    const attractionPointsSelect = document.getElementById('attraction-points');
    const lineColorSelect = document.getElementById('line-color');
    const applySettingsButton = document.getElementById('apply-particle-settings'); // Get Apply button reference

    // Function to update label value dynamically
    function updateLabelValue(inputElement, labelElement) {
        labelElement.querySelector('span').textContent = `(${inputElement.value})`;
    }

    // Event listeners for sliders to update labels dynamically
    particleCountInput.addEventListener('input', () => updateLabelValue(particleCountInput, particleCountInput.parentElement));
    particleSpeedInput.addEventListener('input', () => updateLabelValue(particleSpeedInput, particleSpeedInput.parentElement));
    particleSizeInput.addEventListener('input', () => updateLabelValue(particleSizeInput, particleSizeInput.parentElement));
    lineThicknessInput.addEventListener('input', () => updateLabelValue(lineThicknessInput, lineThicknessInput.parentElement));
    lineDistanceInput.addEventListener('input', () => updateLabelValue(lineDistanceInput, lineDistanceInput.parentElement)); // Line Distance
    particlesPerClickInput.addEventListener('input', () => updateLabelValue(particlesPerClickInput, particlesPerClickInput.parentElement)); // Particles per click


    // Event listener for Apply Settings button
    applySettingsButton.addEventListener('click', updateParticles);

    // Smooth scrolling for navigation links
    document.querySelectorAll('nav ul li a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1); // Get section ID without '#'
            const targetSection = document.getElementById(targetId);

            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth' // Enable smooth scrolling
                });
            }

            // Close hamburger menu after navigation on smaller screens
            if (navUl.classList.contains('show')) {
                navUl.classList.remove('show');
            }
        });
    });
});