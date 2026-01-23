document.addEventListener('DOMContentLoaded', () => {
    loadContent();
    setupNavigation();
    initMatrixEffect(); // Start Matrix Effect

    // Refresh AOS after content load
    setTimeout(() => {
        AOS.init({
            once: true,
            offset: 50,
            duration: 800,
        });
        AOS.refresh();
    }, 500);
});

function setupNavigation() {
    const sections = document.querySelectorAll('header, section, footer');
    const navLinks = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        let current = '';

        // Check availability of scroll to bottom
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 10) {
            current = 'contact';
        } else {
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                if (scrollY >= (sectionTop - sectionHeight / 3)) {
                    current = section.getAttribute('id');
                }
            });
        }

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });
}



function loadContent() {
    // Load Profile
    if (config.profile) {
        document.getElementById('profile-name').textContent = config.profile.name;
        document.getElementById('profile-role').textContent = config.profile.role;
        document.getElementById('profile-bio').textContent = config.profile.bio;
        document.getElementById('profile-img').src = config.profile.avatar;

        const cvBtn = document.getElementById('btn-cv');
        if (config.profile.cvLink) {
            cvBtn.href = config.profile.cvLink;
        } else {
            cvBtn.style.display = 'none';
        }

        // About Text
        if (config.profile.about && document.getElementById('about-text')) {
            document.getElementById('about-text').textContent = config.profile.about;
        }
    }

    // Load Socials (Header & Footer)
    if (config.socials) {
        const createSocialLink = (social) => {
            const a = document.createElement('a');
            a.href = social.link;
            a.className = 'social-link';
            a.target = "_blank";
            a.setAttribute('aria-label', social.label);

            const i = document.createElement('i');
            i.className = `fa-brands ${social.icon}`;
            // Handle envelope specially since it's solid usually
            if (social.icon.includes('envelope')) {
                i.className = `fa-solid ${social.icon}`;
            }

            a.appendChild(i);
            return a;
        };

        const footerSocials = document.getElementById('footer-socials');

        config.socials.forEach(social => {
            footerSocials.appendChild(createSocialLink(social));
        });
    }

    // Load Skills
    if (config.skills && document.getElementById('skills-container')) {
        const skillsContainer = document.getElementById('skills-container');
        config.skills.forEach((skill, index) => {
            const skillTag = document.createElement('span');
            skillTag.className = 'skill-tag';
            skillTag.textContent = skill;
            skillTag.setAttribute('data-aos', 'zoom-in');
            skillTag.setAttribute('data-aos-delay', index * 50);
            skillsContainer.appendChild(skillTag);
        });
    }

    // Load Experience
    if (config.experience && document.getElementById('experience-container')) {
        const expContainer = document.getElementById('experience-container');
        config.experience.forEach((exp, index) => {
            const card = document.createElement('div');
            card.className = 'experience-card';
            card.setAttribute('data-aos', 'fade-up');
            card.setAttribute('data-aos-delay', index * 100);

            card.innerHTML = `
                <span class="exp-date">${exp.period}</span>
                <h3 class="exp-role">${exp.role}</h3>
                <div class="exp-company">${exp.company}</div>
                <p class="exp-desc">${exp.description}</p>
            `;

            expContainer.appendChild(card);
        });
    }

    // Load Projects
    if (config.projects) {
        const projectsGrid = document.getElementById('projects-grid');

        config.projects.forEach((project, index) => {
            const card = document.createElement('div');
            card.className = 'project-card';
            card.setAttribute('data-aos', 'fade-up');
            card.setAttribute('data-aos-delay', index * 100);

            // Tags HTML
            const tagsHtml = project.tags.map(tag => `<span class="tag">${tag}</span>`).join('');

            card.innerHTML = `
                <img src="${project.image}" alt="${project.title}" class="project-img">
                <div class="project-info">
                    <h3 class="project-title">${project.title}</h3>
                    <p class="project-desc">${project.description}</p>
                    <div class="tags">
                        ${tagsHtml}
                    </div>
                    <a href="${project.link}" class="project-link">View Project <i class="fa-solid fa-arrow-right"></i></a>
                </div>
            `;

            projectsGrid.appendChild(card);
        });
    }

    // Apply custom theme override if present
    if (config.theme) {
        const root = document.documentElement;
        if (config.theme.primary) root.style.setProperty('--primary', config.theme.primary);
        if (config.theme.secondary) root.style.setProperty('--secondary', config.theme.secondary);
        if (config.theme.accent) root.style.setProperty('--accent', config.theme.accent);
        if (config.theme.background) root.style.setProperty('--background', config.theme.background);
    }
}

function initMatrixEffect() {
    const canvas = document.getElementById('binary-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width, height;

    const resize = () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', resize);
    resize();

    const fontSize = 14;
    const columns = Math.floor(width / fontSize);
    const drops = new Array(columns).fill(1); // Y position of drops

    // Characters to use (Binary + Hex + Techy stuff)
    const chars = "0101010101ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    function draw() {
        // Transparent black background to create trail effect
        // Use theme background color but with very low opacity
        ctx.fillStyle = 'rgba(26, 21, 17, 0.05)';
        ctx.fillRect(0, 0, width, height);

        ctx.fillStyle = '#6F4E37'; // Text Color (Primary Theme Color)
        ctx.font = `${fontSize}px monospace`;

        for (let i = 0; i < drops.length; i++) {
            const text = chars.charAt(Math.floor(Math.random() * chars.length));
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);

            // Reset drop to top randomly after it has crossed screen
            // or randomly to create variation
            if (drops[i] * fontSize > height && Math.random() > 0.975) {
                drops[i] = 0;
            }

            drops[i]++;
        }
        requestAnimationFrame(draw);
    }

    draw();
}
