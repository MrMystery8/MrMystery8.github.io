document.addEventListener('DOMContentLoaded', () => {
    // Particle configuration
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
                color: "#0EA5E9",
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
            detect_on: "window",
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

    let pJSInstance;

    function updateParticles() {
        const newParticleCount = parseInt(particleCountInput.value, 10);
        const newParticleSpeed = parseFloat(particleSpeedInput.value);
        const newParticleSize = parseInt(particleSizeInput.value, 10);
        const newLineThickness = parseFloat(lineThicknessInput.value);
        const newLineDistance = parseInt(lineDistanceInput.value, 10);
        const newParticlesPerClick = parseInt(particlesPerClickInput.value, 10);
        const newLineVisibility = lineVisibilityInput.checked;
        const newParticleColors = particleColorSelect.value.split(',');
        let newLineColor = lineColorSelect.value;

        if (newLineColor === 'theme-default') {
            newLineColor = document.body.classList.contains('light-mode') ? '#0ea5e9' : '#0EA5E9';
        }

        if (pJSInstance) {
            if (typeof pJSInstance.destroy === 'function') {
                pJSInstance.destroy();
            }
            const particlesContainer = document.getElementById('particles-js');
            const oldCanvas = particlesContainer.querySelector('canvas');
            if (oldCanvas) {
                particlesContainer.removeChild(oldCanvas);
            }
        }

        particleConfig.particles.number.value = newParticleCount;
        particleConfig.particles.move.speed = newParticleSpeed;
        particleConfig.particles.size.value = newParticleSize;
        particleConfig.particles.line_linked.width = newLineThickness;
        particleConfig.particles.line_linked.distance = newLineDistance;
        particleConfig.interactivity.modes.push.particles_nb = newParticlesPerClick;
        particleConfig.particles.line_linked.enable = newLineVisibility;
        particleConfig.particles.color.value = newParticleColors;
        particleConfig.particles.line_linked.color = newLineColor;

        pJSInstance = particlesJS('particles-js', particleConfig);

        const canvas = document.getElementById('particles-js').querySelector('canvas');
        if (canvas) {
            canvas.style.pointerEvents = 'none';
        }
    }

    pJSInstance = particlesJS('particles-js', particleConfig);
    const canvas = document.getElementById('particles-js').querySelector('canvas');
    if (canvas) {
        canvas.style.pointerEvents = 'none';
    }

    document.addEventListener('mousemove', (event) => {
        if (window.pJSDom && window.pJSDom[0] && window.pJSDom[0].pJS && window.pJSDom[0].pJS.interactivity) {
            const pJS = window.pJSDom[0].pJS;
            pJS.interactivity.mouse.pos_x = event.clientX;
            pJS.interactivity.mouse.pos_y = event.clientY;
        }
    });

    document.addEventListener('click', (event) => {
        if (window.pJSDom && window.pJSDom[0] && window.pJSDom[0].pJS && window.pJSDom[0].pJS.fn) {
            const pJS = window.pJSDom[0].pJS;
            pJS.fn.modes.pushParticles(pJS.interactivity.modes.push.particles_nb, pJS.interactivity.mouse);
        }
    });

    const themeToggle = document.getElementById('theme-toggle');
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('light-mode');
        themeToggle.innerHTML = document.body.classList.contains('light-mode')
            ? '<i class="fas fa-fw fa-sun"></i>'
            : '<i class="fas fa-fw fa-moon"></i>';
        updateParticles();
    });

    const hamburger = document.querySelector('.hamburger');
    const navUl = document.querySelector('nav ul');
    hamburger.addEventListener('click', () => {
        navUl.classList.toggle('show');
    });

    const accordionHeaders = document.querySelectorAll('.accordion-header');
    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const accordionItem = header.parentElement;
            accordionItem.classList.toggle('open');
            const accordionContent = header.nextElementSibling;
            if (accordionItem.classList.contains('open')) {
                accordionContent.style.maxHeight = accordionContent.scrollHeight + "px";
                accordionContent.style.opacity = 1;
            } else {
                accordionContent.style.maxHeight = null;
                accordionContent.style.opacity = 0;
            }
        });
    });

    // Custom Animation with Intersection Observer
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            } else {
                entry.target.classList.remove('animate-in');
            }
        });
    }, observerOptions);

    document.querySelectorAll('[data-aos]').forEach(element => {
        observer.observe(element);
    });

    const particleSettingsBtn = document.getElementById('particle-settings-btn');
    const particleSettings = document.getElementById('particle-settings');
    particleSettingsBtn.addEventListener('click', () => {
        particleSettings.classList.toggle('show');
    });

    const closeSettingsBtn = document.getElementById('close-particle-settings');
    closeSettingsBtn.addEventListener('click', () => {
        particleSettings.classList.remove('show');
    });

    document.addEventListener('click', (event) => {
        if (!particleSettings.contains(event.target) && event.target !== particleSettingsBtn) {
            particleSettings.classList.remove('show');
        }
    });

    const toggleParticlesBtn = document.getElementById('toggle-particles');
    toggleParticlesBtn.addEventListener('click', () => {
        document.body.classList.toggle('reduce-motion');
        toggleParticlesBtn.innerHTML = document.body.classList.contains('reduce-motion')
            ? '<i class="fas fa-fw fa-universal-access"></i>'
            : '<i class="fas fa-fw fa-universal-access"></i>';
    });

    const particleCountInput = document.getElementById('particle-count');
    const particleSpeedInput = document.getElementById('particle-speed');
    const particleSizeInput = document.getElementById('particle-size');
    const lineThicknessInput = document.getElementById('line-thickness');
    const lineDistanceInput = document.getElementById('line-distance');
    const particlesPerClickInput = document.getElementById('particles-per-click');
    const lineVisibilityInput = document.getElementById('line-visibility');
    const particleColorSelect = document.getElementById('particle-color');
    const attractionPointsSelect = document.getElementById('attraction-points');
    const lineColorSelect = document.getElementById('line-color');
    const applySettingsButton = document.getElementById('apply-particle-settings');

    function updateLabelValue(inputElement, labelElement) {
        labelElement.querySelector('span').textContent = `(${inputElement.value})`;
    }

    particleCountInput.addEventListener('input', () => updateLabelValue(particleCountInput, particleCountInput.parentElement));
    particleSpeedInput.addEventListener('input', () => updateLabelValue(particleSpeedInput, particleSpeedInput.parentElement));
    particleSizeInput.addEventListener('input', () => updateLabelValue(particleSizeInput, particleSizeInput.parentElement));
    lineThicknessInput.addEventListener('input', () => updateLabelValue(lineThicknessInput, lineThicknessInput.parentElement));
    lineDistanceInput.addEventListener('input', () => updateLabelValue(lineDistanceInput, lineDistanceInput.parentElement));
    particlesPerClickInput.addEventListener('input', () => updateLabelValue(particlesPerClickInput, particlesPerClickInput.parentElement));

    applySettingsButton.addEventListener('click', updateParticles);

    document.querySelectorAll('nav ul li a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
            }
            if (navUl.classList.contains('show')) {
                navUl.classList.remove('show');
            }
        });
    });
});