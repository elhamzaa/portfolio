const config = {
    // Profile Information
    profile: {
        name: "Hamza Hassan",
        role: "AI Engineer",
        bio: "I build responsive, high-performance web applications with a focus on aesthetics and user experience.",
        cvLink: "#", // Add your CV link here (e.g. /resume.pdf)
        avatar: "https://api.dicebear.com/7.x/miniavs/svg?seed=coffee" // Placeholder image
    },

    // Social Links
    socials: [
        { icon: "fa-github", link: "https://github.com", label: "GitHub" },
        { icon: "fa-linkedin", link: "https://linkedin.com", label: "LinkedIn" },
        { icon: "fa-instagram", link: "https://instagram.com", label: "Instagram" },
        { icon: "fa-envelope", link: "mailto:email@example.com", label: "Email" }
    ],

    // Projects
    projects: [
        {
            title: "Coffee Shop App",
            description: "A mobile-first progressive web app for ordering artisan coffee.",
            image: "https://placehold.co/600x400/4B3621/F5F5DC?text=Coffee+App",
            link: "#",
            tags: ["React", "Firebase", "PWA"]
        },
        {
            title: "Portfolio v1",
            description: "My first personal portfolio website focused on minimalism.",
            image: "https://placehold.co/600x400/6F4E37/F5F5DC?text=Portfolio",
            link: "#",
            tags: ["HTML", "CSS", "JS"]
        },
        {
            title: "E-Commerce Dashboard",
            description: "Admin dashboard for managing inventory and sales analytics.",
            image: "https://placehold.co/600x400/2C1810/F5F5DC?text=Dashboard",
            link: "#",
            tags: ["Vue.js", "Node.js", "MongoDB"]
        }
    ],

    // Theme Colors (Optional override)
    theme: {
        primary: "#6F4E37",
        secondary: "#4B3621",
        accent: "#F5F5DC",
        background: "#1a1511"
    }
};
