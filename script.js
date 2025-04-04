document.addEventListener('DOMContentLoaded', () => {
    // --- Particle Configuration ---
    const particleConfig = { /* ... (Keep particleConfig the same) ... */
        particles: { number: { value: 60, density: { enable: true, value_area: 800 } }, color: { value: ["#0EA5E9", "#1D4ED8", "#6D28D9"] }, shape: { type: ["circle", "triangle"] }, opacity: { value: 0.5, random: false, anim: { enable: true, speed: 1, opacity_min: 0.1, sync: false } }, size: { value: 5, random: true, anim: { enable: false } }, line_linked: { enable: true, distance: 150, color: "themed", opacity: 0.4, width: 0.8 }, move: { enable: true, speed: 1.5, direction: "none", random: false, straight: false, out_mode: "out", bounce: false, attract: { enable: false } } }, interactivity: { detect_on: "window", events: { onhover: { enable: true, mode: "grab" }, onclick: { enable: true, mode: "push" }, resize: true }, modes: { grab: { distance: 140, line_linked: { opacity: 0.7 } }, push: { particles_nb: 3 } } }, retina_detect: true
    };
    let pJSInstance = null;
    const particlesElement = document.getElementById('particles-js');
    let particlesEnabled = true;

    // --- Get DOM Element References ---
    const themeToggle = document.getElementById('theme-toggle');
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    const typewriterElement = document.getElementById('typewriter');
    const toggleParticlesBtn = document.getElementById('toggle-particles');
    const particlesContainer = document.getElementById('particles-js');
    const sections = document.querySelectorAll('section[id]');
    const particleSettingsBtn = document.getElementById('particle-settings-btn');
    const particleSettingsPanel = document.getElementById('particle-settings');
    const closeSettingsBtn = document.getElementById('close-particle-settings');
    const applySettingsButton = document.getElementById('apply-particle-settings');
    const body = document.body;
    const desktopNavLinks = document.querySelectorAll('nav ul.desktop-nav li a');
    const mobileFabMenu = document.getElementById('mobile-fab-menu');
    const fabToggle = document.getElementById('fab-toggle');
    const fabMenuItems = document.getElementById('fab-menu-items');
    const fabLinks = document.querySelectorAll('#fab-menu-items a');
    const allNavLinks = document.querySelectorAll('nav ul.desktop-nav li a, #fab-menu-items a');
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
    // (Keep initParticles, destroyParticles, updateParticles functions same as previous version)
    function initParticles() { if (particlesElement && particlesEnabled && typeof particlesJS !== 'undefined') { const isThemedLine = lineColorSelect?.value === 'theme-default'; const isLightMode = body.classList.contains('light-mode'); let currentLineColor; if (isThemedLine) { currentLineColor = isLightMode ? "#a1a1a1" : "#3a3a3a"; } else if (lineColorSelect?.value) { currentLineColor = lineColorSelect.value; } else { currentLineColor = isLightMode ? "#a1a1a1" : "#3a3a3a"; } const currentConfig = JSON.parse(JSON.stringify(particleConfig)); if (particleCountInput) currentConfig.particles.number.value = parseInt(particleCountInput.value, 10); if (particleSpeedInput) currentConfig.particles.move.speed = parseFloat(particleSpeedInput.value); if (particleSizeInput) currentConfig.particles.size.value = parseInt(particleSizeInput.value, 10); if (lineThicknessInput && currentConfig.particles.line_linked) currentConfig.particles.line_linked.width = parseFloat(lineThicknessInput.value); if (lineDistanceInput && currentConfig.particles.line_linked) currentConfig.particles.line_linked.distance = parseInt(lineDistanceInput.value, 10); if (particlesPerClickInput) currentConfig.interactivity.modes.push.particles_nb = parseInt(particlesPerClickInput.value, 10); if (lineVisibilityInput && currentConfig.particles.line_linked) currentConfig.particles.line_linked.enable = lineVisibilityInput.checked; if (particleColorSelect?.value) currentConfig.particles.color.value = particleColorSelect.value.split(','); if (currentConfig.particles.line_linked) currentConfig.particles.line_linked.color = currentLineColor; if (pJSInstance && typeof pJSInstance.destroy === 'function') { pJSInstance.destroy(); pJSInstance = null; const oldCanvas = particlesElement.querySelector('canvas'); if (oldCanvas) oldCanvas.remove(); } if (window.pJSDom) { window.pJSDom = []; } setTimeout(() => { if (particlesEnabled && particlesElement) { particlesJS('particles-js', currentConfig); if (window.pJSDom && window.pJSDom.length > 0) { pJSInstance = window.pJSDom[0].pJS; } } }, 50); } else if (!particlesEnabled && pJSInstance) { destroyParticles(); } }
    function destroyParticles() { if (pJSInstance && typeof pJSInstance.destroy === 'function') { pJSInstance.destroy(); pJSInstance = null; const canvas = particlesElement?.querySelector('canvas'); if (canvas) canvas.remove(); } if (window.pJSDom) { window.pJSDom = []; } }
    function updateParticles() { initParticles(); }

    // --- Theme Toggling ---
    // (Keep setInitialTheme and themeToggle listener same as previous version)
    function setInitialTheme() { const savedTheme = localStorage.getItem('theme'); const prefersDarkInitial = window.matchMedia('(prefers-color-scheme: dark)').matches; if (savedTheme === 'light') { body.classList.add('light-mode'); if (themeToggle) themeToggle.innerHTML = '<i class="fas fa-fw fa-sun"></i>'; } else if (savedTheme === 'dark') { body.classList.remove('light-mode'); if (themeToggle) themeToggle.innerHTML = '<i class="fas fa-fw fa-moon"></i>'; } else { if (prefersDarkInitial) { body.classList.remove('light-mode'); if (themeToggle) themeToggle.innerHTML = '<i class="fas fa-fw fa-moon"></i>'; } else { body.classList.add('light-mode'); if (themeToggle) themeToggle.innerHTML = '<i class="fas fa-fw fa-sun"></i>'; } } updateParticles(); }
    if (themeToggle) { themeToggle.addEventListener('click', () => { body.classList.toggle('light-mode'); const isNowLight = body.classList.contains('light-mode'); themeToggle.innerHTML = isNowLight ? '<i class="fas fa-fw fa-sun"></i>' : '<i class="fas fa-fw fa-moon"></i>'; localStorage.setItem('theme', isNowLight ? 'light' : 'dark'); updateParticles(); }); }

    // --- Initial Setup Calls ---
    setInitialTheme();

    // --- Mobile FAB Menu Logic ---
    // (Keep FAB menu logic same as previous version)
    function closeFabMenu() { if (mobileFabMenu?.classList.contains('active')) { mobileFabMenu.classList.remove('active'); fabToggle?.setAttribute('aria-expanded', 'false'); } }
    if (fabToggle && mobileFabMenu && fabMenuItems) { fabToggle.addEventListener('click', (e) => { e.stopPropagation(); const isActive = mobileFabMenu.classList.toggle('active'); fabToggle.setAttribute('aria-expanded', isActive); }); document.addEventListener('click', (e) => { if (mobileFabMenu.classList.contains('active') && !mobileFabMenu.contains(e.target)) { closeFabMenu(); } }); document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && mobileFabMenu.classList.contains('active')) { closeFabMenu(); } }); }

    // --- Accordion ---
    // (Keep accordion logic same as previous version)
    accordionHeaders.forEach(header => { header.addEventListener('click', () => { const accordionItem = header.closest('.accordion-item'); const accordionContent = header.nextElementSibling; if (!accordionItem || !accordionContent || !accordionContent.classList.contains('accordion-content')) { console.warn('Accordion structure issue near:', header); return; } const currentlyOpen = accordionItem.classList.contains('open'); if (!currentlyOpen) { accordionItem.classList.add('open'); accordionContent.style.maxHeight = accordionContent.scrollHeight + 40 + "px"; accordionContent.style.paddingTop = '20px'; accordionContent.style.paddingBottom = '20px'; accordionContent.style.opacity = 1; } else { accordionItem.classList.remove('open'); accordionContent.style.maxHeight = null; accordionContent.style.paddingTop = '0'; accordionContent.style.paddingBottom = '0'; accordionContent.style.opacity = 0; } }); });

    // =======================================================================
    // --- Intersection Observer for Animations & Skill Bars (Original Logic) ---
    // This observer handles both general fade/slide animations based on 'data-aos'
    // attribute AND the specific skill bar circle animations.
    // It manually adds/removes the 'aos-animate' class.
    // =======================================================================
    const observerOptions = {
        root: null, // viewport
        rootMargin: '0px',
        threshold: 0.1 // Trigger when 10% is visible/hidden
    };

    const animationObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            const target = entry.target;
            const hasAosAttribute = target.hasAttribute('data-aos');

            if (entry.isIntersecting) {
                // --- Handle General Animations (Add Class) ---
                if (hasAosAttribute) {
                    target.classList.add('aos-animate'); // Add class to trigger animation
                }

                // --- Handle Skill Bar Animation (Animate In) ---
                const skillSection = target.id === 'skills' ? target : target.closest('#skills');
                if (skillSection) {
                     requestAnimationFrame(() => {
                        skillSection.querySelectorAll('.circle-chart-circle').forEach(circle => {
                            const percentage = circle.getAttribute('data-percentage');
                            if (percentage) {
                                // Force restart animation trick
                                circle.style.transition = 'none';
                                circle.style.strokeDasharray = '0, 100';
                                void circle.offsetWidth; // Force reflow
                                circle.style.transition = ''; // Re-enable CSS transition
                                circle.style.strokeDasharray = `${percentage}, 100`;
                            }
                        });
                     });
                }
            } else { // Element is leaving the viewport
                // --- Handle General Animations (Remove Class - Original Logic) ---
                 if (hasAosAttribute && target.classList.contains('aos-animate')) {
                    target.classList.remove('aos-animate'); // Remove class to reset/animate out
                 }

                // --- Reset Skill Bars (Animate Out/Reset) ---
                 const skillSection = target.id === 'skills' ? target : target.closest('#skills');
                 if (skillSection) {
                      requestAnimationFrame(() => {
                        skillSection.querySelectorAll('.circle-chart-circle').forEach(circle => {
                             circle.style.transition = 'none'; // Disable transition for reset
                             circle.style.strokeDasharray = '0, 100';
                             setTimeout(() => { circle.style.transition = ''; }, 50); // Re-enable later
                        });
                      });
                 }
            }
        });
    }, observerOptions);

    // Observe elements with 'data-aos' attribute AND the #skills section itself
    document.querySelectorAll('[data-aos], section#skills').forEach(element => {
        if (element) {
            animationObserver.observe(element);
        }
    });
    // --- END Intersection Observer ---

    // --- Particle Settings Panel Logic ---
    // (Keep particle settings panel logic same as previous version)
    function updateLabelValue(inputElement) { const label = inputElement?.previousElementSibling; const span = label?.querySelector('span'); if (span && inputElement) { span.textContent = `(${inputElement.value})`; } }
    [particleCountInput, particleSpeedInput, particleSizeInput, lineThicknessInput, lineDistanceInput, particlesPerClickInput].forEach(input => { if (input) { updateLabelValue(input); input.addEventListener('input', () => updateLabelValue(input)); } });
    if (particleSettingsBtn && particleSettingsPanel) { particleSettingsBtn.addEventListener('click', (e) => { e.stopPropagation(); particleSettingsPanel.classList.toggle('show'); }); }
    if (closeSettingsBtn && particleSettingsPanel) { closeSettingsBtn.addEventListener('click', () => { particleSettingsPanel.classList.remove('show'); }); }
    if (applySettingsButton) { applySettingsButton.addEventListener('click', () => { updateParticles(); }); }
    document.addEventListener('click', (event) => { if (particleSettingsPanel?.classList.contains('show')) { if (!particleSettingsPanel.contains(event.target) && !particleSettingsBtn?.contains(event.target)) { particleSettingsPanel.classList.remove('show'); } } });


    // --- Accessibility: Toggle Particles ---
    // (Keep particle toggle logic same as previous version)
    if (toggleParticlesBtn && particlesContainer) { const updateToggleButton = () => { if (particlesEnabled) { toggleParticlesBtn.innerHTML = '<i class="fas fa-fw fa-universal-access"></i>'; toggleParticlesBtn.setAttribute('aria-pressed', 'false'); toggleParticlesBtn.setAttribute('title', 'Disable Particles (Accessibility)'); } else { toggleParticlesBtn.innerHTML = '<i class="fas fa-fw fa-eye-slash"></i>'; toggleParticlesBtn.setAttribute('aria-pressed', 'true'); toggleParticlesBtn.setAttribute('title', 'Enable Particles'); } }; updateToggleButton(); if (!particlesEnabled) { particlesContainer.style.display = 'none'; body.classList.add('reduce-motion'); destroyParticles(); } toggleParticlesBtn.addEventListener('click', () => { particlesEnabled = !particlesEnabled; if (particlesEnabled) { particlesContainer.style.display = ''; body.classList.remove('reduce-motion'); initParticles(); } else { destroyParticles(); particlesContainer.style.display = 'none'; body.classList.add('reduce-motion'); } updateToggleButton(); }); }


    // --- Smooth Scrolling for Nav Links (Desktop and Mobile FAB) ---
    // (Keep smooth scroll logic same as previous version - uses allNavLinks)
    allNavLinks.forEach(anchor => { anchor.addEventListener('click', function (e) { const href = this.getAttribute('href'); if (href && href.startsWith('#')) { e.preventDefault(); try { const targetElement = document.querySelector(href); if (targetElement) { const navElement = document.querySelector('nav'); const navHeight = navElement ? navElement.offsetHeight : 70; const buffer = 20; const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navHeight - buffer; window.scrollTo({ top: targetPosition, behavior: 'smooth' }); closeFabMenu(); } } catch (error) { console.error("Error finding element for smooth scroll:", href, error); } } }); });


    // --- Active Nav Link Highlighting on Scroll ---
    // (Keep highlightNavLink logic same as previous version - uses allNavLinks)
    let scrollTimeout;
    function highlightNavLink() { let currentSectionId = ''; const navElement = document.querySelector('nav'); const navHeight = navElement ? navElement.offsetHeight : 70; const scrollThreshold = window.pageYOffset + navHeight + 50; sections.forEach(section => { const sectionTop = section.offsetTop; const sectionHeight = section.offsetHeight; if (scrollThreshold >= sectionTop && scrollThreshold < (sectionTop + sectionHeight)) { currentSectionId = section.getAttribute('id'); } }); if (window.pageYOffset < window.innerHeight * 0.4 && sections.length > 0 && sections[0].id === 'hero') { currentSectionId = 'hero'; } else if (window.innerHeight + window.pageYOffset >= document.body.offsetHeight - 40 && sections.length > 0) { currentSectionId = sections[sections.length - 1].id; } allNavLinks.forEach(link => { link.classList.remove('active'); const linkHref = link.getAttribute('href'); if (linkHref === `#${currentSectionId}`) { link.classList.add('active'); } }); }
    window.addEventListener('scroll', () => { clearTimeout(scrollTimeout); scrollTimeout = setTimeout(highlightNavLink, 50); });
    highlightNavLink();


    // --- Typewriter Effect ---
    // (Keep typewriter logic same as previous version)
    const phrases = ["AI Specialist", "Web Developer", "Computer Science Student", "Tech Innovator", "Graphic Designer"]; let phraseIndex = 0; let letterIndex = 0; let currentPhrase = ''; let isDeleting = false; let typeTimeout;
    function typeWriter() { if (!typewriterElement) return; clearTimeout(typeTimeout); const phrase = phrases[phraseIndex]; let typeSpeed = isDeleting ? 60 : 130; if (isDeleting) { currentPhrase = phrase.substring(0, letterIndex--); } else { currentPhrase = phrase.substring(0, letterIndex++); } typewriterElement.textContent = currentPhrase; if (currentPhrase === '') { typewriterElement.innerHTML = ' '; } if (!isDeleting && letterIndex > phrase.length) { typeSpeed = 2200; isDeleting = true; letterIndex = phrase.length; } else if (isDeleting && letterIndex < 0) { isDeleting = false; phraseIndex = (phraseIndex + 1) % phrases.length; typeSpeed = 500; letterIndex = 0; } typeTimeout = setTimeout(typeWriter, typeSpeed); }
    if (typewriterElement) { setTimeout(typeWriter, 1200); }


     // --- Resize Debouncer ---
     // (Keep resize logic same as previous version)
     let resizeTimeout;
     window.addEventListener('resize', () => { clearTimeout(resizeTimeout); resizeTimeout = setTimeout(() => { highlightNavLink(); document.querySelectorAll('.accordion-item.open .accordion-content').forEach(content => { if (content.offsetParent !== null) { content.style.maxHeight = content.scrollHeight + 40 + "px"; } }); if (window.innerWidth > 768) { closeFabMenu(); } }, 250); });

     // Note: AOS library is NOT initialized via JS here.
     // The Intersection Observer 'animationObserver' handles elements with 'data-aos'.

}); // End DOMContentLoaded wrapper