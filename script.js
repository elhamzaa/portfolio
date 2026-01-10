document.addEventListener('DOMContentLoaded', () => {
    // Initialize AOS
    AOS.init({
        once: true,
        offset: 50,
        duration: 800,
    });

    loadContent();
    setupNavigation();
});

function setupNavigation() {
    const sections = document.querySelectorAll('header, section, footer');
    const navLinks = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute('id');
            }
        });

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

        const headerSocials = document.getElementById('social-links-container');
        const footerSocials = document.getElementById('footer-socials');

        config.socials.forEach(social => {
            headerSocials.appendChild(createSocialLink(social));
            footerSocials.appendChild(createSocialLink(social)); // Clone for footer
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
