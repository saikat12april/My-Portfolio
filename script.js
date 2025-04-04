// script.js

const typed = new Typed(".text", {
    strings: ["Robotics Engineer", "Graphic Designer", "Photo Editor"],
    typeSpeed: 100,
    backSpeed: 100,
    backDelay: 1000,
    loop: true,
});

setTimeout(() => {
    const progressData = {
        python: "90%",
        c: "70%",
        c11: "60%",
        html: "70%",
        css: "50%",
    };

    function setProgressBarWidth(skill, percentage) {
        const progressBar = document.querySelector(`.progress-line.${skill} span`);
        if (progressBar) {
            progressBar.style.width = percentage;
            progressBar.setAttribute("data-value", percentage);
        }
    }

    Object.keys(progressData).forEach((skill) => {
        setProgressBarWidth(skill, progressData[skill]);
    });
}, 500);

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth' });
            setTimeout(() => {
                triggerAnimations(targetId);
            }, 100);
        }
    });
});

function triggerAnimations(targetId) {
    const targetSection = document.getElementById(targetId);
    if (targetSection) {
        const animatedElements = targetSection.querySelectorAll('.animated');
        animatedElements.forEach(element => {
            element.style.animation = getAnimationName(element);
            element.style.animationDelay = element.dataset.animationDelay;
            element.style.opacity = 1;
        });
    }
}

function getAnimationName(element) {
    if (element.tagName === "H3" && element.parentElement.classList.contains('home-content')) {
        if (element === document.querySelector(".home-content h3:nth-of-type(2)")) {
            return 'slideTop .8s ease forwards';
        }
        return 'slideBottom .5s ease forwards';
    } else if (element.tagName === "H1" && element.parentElement.classList.contains('home-content')) {
        return 'slideRight .8s ease forwards';
    } else if (element.tagName === "P" && element.parentElement.classList.contains('home-content')) {
        return 'slideLeft .8s ease forwards';
    } else if (element.tagName === "A" && element.parentElement.classList.contains('home-sci')) {
        return 'slideLeft .8s ease forwards';
    } else if (element.classList.contains('btn-box') && element.parentElement.classList.contains('home-content')) {
        return 'slideTop .8s ease forwards';
    } else if (element.tagName === "IMG" && element.parentElement.classList.contains('about-img')) {
        return 'slideTop .8s ease forwards';
    } else if (element.tagName === "H2" && element.parentElement.classList.contains('about-text')) {
        return 'slideRight .8s ease forwards';
    } else if (element.tagName === "H4" && element.parentElement.classList.contains('about-text')) {
        return 'slideLeft .8s ease forwards';
    } else if (element.tagName === "P" && element.parentElement.classList.contains('about-text')) {
        return 'slideBottom .8s ease forwards';
    } else if (element.classList.contains('btn-box') && element.parentElement.classList.contains('about-text')) {
        return 'slideBottom .8s ease forwards';
    } else if (element.classList.contains('sub-title') || element.classList.contains('heading1')) {
        return 'slideBottom .8s ease forwards';
    } else if (element.classList.contains('bar') && element.parentElement.classList.contains('Technical-bars')) {
        return 'slideLeft .8s ease forwards';
    } else if (element.classList.contains('radial-bar') && element.parentElement.classList.contains('radial-bars')) {
        return 'slideRight .8s ease forwards';
    } else if (element.classList.contains('project-card')) {
        return 'slideTop .8s ease forwards';
    } else if (element.classList.contains('contact-form')) {
        return 'slideTop .8s ease forwards';
    } else if (element.tagName === "H2" && element.parentElement.classList.contains('contact-text')) {
        return 'slideRight .8s ease forwards';
    } else if (element.tagName === "H4" && element.parentElement.classList.contains('contact-text')) {
        return 'slideLeft .8s ease forwards';
    } else if (element.tagName === "P" && element.parentElement.classList.contains('contact-text')) {
        return 'slideBottom .8s ease forwards';
    }
    return "";
}

const sections = document.querySelectorAll('section');
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            triggerAnimations(entry.target.id);
        }
    });
}, { threshold: 0.1 });
sections.forEach(section => {
    observer.observe(section);
});

const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navbar = document.querySelector('.navbar');
mobileMenuToggle.addEventListener('click', () => {
    navbar.classList.toggle('active');
});

let formSubmitting = false;
document.getElementById('contactForm').addEventListener('submit', function (event) {
    event.preventDefault();
    if (formSubmitting) return;
    const form = event.target;
    const formData = new FormData(form);
    if (!formData.get('name') || !formData.get('email') || !formData.get('message')) {
        showPopup('errorPopup', 'Please fill in all required fields.');
        return;
    }
    formSubmitting = true;
    fetch(form.action, {
        method: 'POST',
        body: formData,
    })
        .then(response => {
            formSubmitting = false;
            if (response.ok) {
                showPopup('successPopup', 'Thank you!');
                form.reset();
            } else {
                showPopup('errorPopup', 'Try again.');
            }
        })
        .catch(() => {
            formSubmitting = false;
            showPopup('errorPopup', 'Try again.');
        });
});

function showPopup(popupId, message) {
    const popup = document.getElementById(popupId);
    popup.querySelector('p').textContent = message;
    popup.classList.add('active');
    setTimeout(() => {
        popup.classList.remove('active');
    }, 2000);
}

document.querySelectorAll('.navbar a').forEach(link => {
    link.addEventListener('click', () => {
        if (navbar.classList.contains('active')) {
            navbar.classList.remove('active');
        }
    });
});

// Visitor Logging Code — Google Sheet + IP Info
window.addEventListener('load', () => {
    const sheetURL = "https://script.google.com/macros/s/AKfycbxq-1Fs28cL9ZUSRrobSUpCp-Pjn0wJBlXuhCsvu2314cBmQIESZO9b4HRJbBcu5tA5/exec";

    fetch('https://ipapi.co/json/')
        .then(res => res.json())
        .then(ipData => {
            const time = new Date().toLocaleString();
            const ip = ipData.ip || "N/A";
            const city = ipData.city || "N/A";
            const country = ipData.country_name || "N/A";
            const isp = ipData.org || "N/A";
            const userAgent = navigator.userAgent;
            const screenRes = `${screen.width}x${screen.height}`;
            const referrer = document.referrer || "Direct";

            const payload = new URLSearchParams();
            payload.append("Time", time);
            payload.append("IP", ip);
            payload.append("City", city);
            payload.append("Country", country);
            payload.append("ISP", isp);
            payload.append("UserAgent", userAgent);
            payload.append("ScreenRes", screenRes);
            payload.append("Referrer", referrer);

            fetch(sheetURL, {
                method: "POST",
                body: payload
            })
                .then(res => console.log("✅ Visitor logged"))
                .catch(err => console.error("❌ Error sending to Sheet", err));
        })
        .catch(err => console.error("❌ Error fetching IP info", err));
});
