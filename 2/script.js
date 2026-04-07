document.addEventListener('DOMContentLoaded', () => {
    
    // --- Splash Screen & Hero Animation ---
    const splashScreen = document.getElementById('splashScreen');
    const heroWords = document.querySelectorAll('.hero-word');
    
    setTimeout(() => {
        if(splashScreen) {
            splashScreen.style.opacity = '0';
            splashScreen.style.visibility = 'hidden';
        }
        
        setTimeout(() => {
            heroWords.forEach((word, index) => {
                setTimeout(() => {
                    word.style.transition = 'all 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
                    word.style.opacity = '1';
                    word.style.transform = 'translateY(0)';
                }, index * 150);
            });
        }, 800);
        
    }, 2800);

    // --- Custom Cursor ---
    const cursorDot = document.getElementById('cursorDot');
    const cursorRing = document.getElementById('cursorRing');
    
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = window.innerWidth / 2;
    let ringY = window.innerHeight / 2;
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    
    if (!isTouchDevice && cursorDot && cursorRing) {
        window.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            cursorDot.style.left = `${mouseX}px`;
            cursorDot.style.top = `${mouseY}px`;
        });

        const renderCursor = () => {
            ringX += (mouseX - ringX) * 0.15;
            ringY += (mouseY - ringY) * 0.15;
            cursorRing.style.left = `${ringX}px`;
            cursorRing.style.top = `${ringY}px`;
            requestAnimationFrame(renderCursor);
        };
        requestAnimationFrame(renderCursor);

        // Standard interactives
        const interactiveElements = document.querySelectorAll('a, button, .service-card, .btn, .portfolio-card, .team-card');
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursorDot.classList.add('hover');
                cursorRing.classList.add('hover');
            });
            el.addEventListener('mouseleave', () => {
                cursorDot.classList.remove('hover');
                cursorRing.classList.remove('hover');
            });
        });
        
        // Inputs behavior (hide custom cursor to let system text cursor show)
        const formInputs = document.querySelectorAll('input, select, textarea');
        formInputs.forEach(input => {
            input.addEventListener('mouseenter', () => {
                cursorDot.style.opacity = '0';
                cursorRing.style.opacity = '0';
            });
            input.addEventListener('mouseleave', () => {
                cursorDot.style.opacity = '1';
                cursorRing.style.opacity = '1';
            });
        });

        // --- Weightless Text Hover Effect ---
        const textSelectors = 'h1, h2, h3, h4, p, span, li, a, label, .hero-sub, .section-label, .card-title, .card-desc, .dd-title, .dd-desc, .port-title, .port-desc, .step-title, .step-desc, .team-name, .team-role, .team-bio, .faq-question span, .testimonial-quote, .cta-heading, .cta-sub, .footer-tagline, .stat-label';
        const textElements = document.querySelectorAll(textSelectors);

        textElements.forEach(el => {
            // Skip elements inside buttons/links that already have hover styles
            if (el.closest('.btn, .nav-cta-btn, .drawer-cta, .package-btn')) return;
            // Skip form elements
            if (el.closest('input, select, textarea, .form-group label')) return;

            el.classList.add('zenith-text-hoverable');

            el.addEventListener('mouseenter', () => {
                el.classList.add('zenith-text-float');
                cursorRing.classList.add('text-hover');
            });

            el.addEventListener('mouseleave', () => {
                el.classList.remove('zenith-text-float');
                cursorRing.classList.remove('text-hover');
            });
        });
    }

    // --- Navbar Scroll & Mobile Menu ---
    const navbar = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const mobileDrawer = document.getElementById('mobileDrawer');
    const drawerOverlay = document.getElementById('drawerOverlay');
    const drawerLinks = document.querySelectorAll('.drawer-links a, .drawer-cta');

    window.addEventListener('scroll', () => {
        if(navbar) {
            navbar.classList.toggle('scrolled', window.scrollY > 50);
        }
    });

    const toggleMenu = () => {
        if(!mobileDrawer || !hamburger) return;
        mobileDrawer.classList.toggle('open');
        const spans = hamburger.querySelectorAll('span');
        if(mobileDrawer.classList.contains('open')) {
            spans[0].style.transform = 'translateY(8px) rotate(45deg)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'translateY(-8px) rotate(-45deg)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    };

    if(hamburger) hamburger.addEventListener('click', toggleMenu);
    if(drawerOverlay) drawerOverlay.addEventListener('click', toggleMenu);
    drawerLinks.forEach(link => link.addEventListener('click', toggleMenu));

    // --- Intersection Observers ---
    
    // Services Cards Observers
    const serviceCards = document.querySelectorAll('.service-card');
    const serviceObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => entry.target.classList.add('visible'), index * 150);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    serviceCards.forEach(card => serviceObserver.observe(card));

    // Deep Dive Services Slide-in
    const ddElements = document.querySelectorAll('.slide-in-left, .slide-in-right, .dd-separator');
    const ddObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if(entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.15 });
    ddElements.forEach(el => ddObserver.observe(el));

    // Timeline steps & line fill
    const timelineSteps = document.querySelectorAll('.timeline-step');
    const timelineLine = document.getElementById('timelineLine');
    const timelineObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.5, rootMargin: '-10% 0px' });
    timelineSteps.forEach(step => timelineObserver.observe(step));
    
    window.addEventListener('scroll', () => {
        if(!timelineLine) return;
        // Fix: Use timelineLine dimensions directly instead of parent container to avoid padding issues
        const lineRect = timelineLine.getBoundingClientRect();
        const startDraw = window.innerHeight * 0.8; 
        
        if(lineRect.top < startDraw && lineRect.bottom > 0) {
            let progress = (startDraw - lineRect.top) / lineRect.height * 100;
            progress = Math.min(100, Math.max(0, progress));
            
            let styleEl = document.getElementById('timeline-style');
            if(!styleEl) {
                styleEl = document.createElement('style');
                styleEl.id = 'timeline-style';
                document.head.appendChild(styleEl);
            }
            styleEl.innerHTML = `.timeline-line::after { height: ${progress}%; }`;
        }
    });

    // Stats Counter
    const statItems = document.querySelectorAll('.stat-item');
    const statsObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const item = entry.target;
                const valueEl = item.querySelector('.stat-number');
                // Fix: Pull target value reliably from the stat-number's dataset
                const targetValue = parseInt(valueEl.getAttribute('data-value') || 0);
                animateValue(valueEl, 0, targetValue, 2000);
                setTimeout(() => item.classList.add('finished'), 2000);
                observer.unobserve(item);
            }
        });
    }, { threshold: 0.5 });
    statItems.forEach(item => statsObserver.observe(item));

    function animateValue(obj, start, end, duration) {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const easeProgress = 1 - Math.pow(1 - progress, 3); // cubic ease out
            obj.innerHTML = Math.floor(easeProgress * (end - start) + start);
            if (progress < 1) {
                window.requestAnimationFrame(step);
            } else {
                obj.innerHTML = end;
            }
        };
        window.requestAnimationFrame(step);
    }

    // --- Infinite Scroll Clones ---
    function setupInfiniteScroll(trackId) {
        const track = document.getElementById(trackId);
        if(!track) return;
        const children = Array.from(track.children);
        children.forEach(child => {
            const clone = child.cloneNode(true);
            clone.setAttribute('aria-hidden', 'true'); // Accessibility
            track.appendChild(clone);
        });
    }
    
    // Fix: Duplicate the items dynamically to make the scroll seamless
    setupInfiniteScroll('testimonialTrack');
    setupInfiniteScroll('techTrack');

    // --- FAQ Accordion ---
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        
        question.addEventListener('click', () => {
            const isOpen = item.classList.contains('active');
            
            // Close all first
            faqItems.forEach(otherItem => {
                otherItem.classList.remove('active');
                otherItem.querySelector('.faq-answer').style.height = '0px';
            });
            
            // Toggle clicked
            if (!isOpen) {
                item.classList.add('active');
                answer.style.height = answer.scrollHeight + 'px';
            }
        });
    });

    // Handle recalculating height on resize for active accordion
    window.addEventListener('resize', () => {
        faqItems.forEach(item => {
            if(item.classList.contains('active')) {
                const answer = item.querySelector('.faq-answer');
                answer.style.height = 'auto'; // Temp free flow
                const h = answer.scrollHeight; // Measure
                answer.style.height = h + 'px'; // Re-apply
            }
        });
    });

    // --- Button Ripple Effect ---
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            let x = e.clientX - e.target.getBoundingClientRect().left;
            let y = e.clientY - e.target.getBoundingClientRect().top;
            
            let ripples = document.createElement('span');
            ripples.style.left = x + 'px';
            ripples.style.top = y + 'px';
            ripples.style.position = 'absolute';
            ripples.style.background = 'rgba(255,255,255,0.3)';
            ripples.style.width = '10px';
            ripples.style.height = '10px';
            ripples.style.borderRadius = '50%';
            ripples.style.transform = 'translate(-50%, -50%)';
            ripples.style.pointerEvents = 'none';
            ripples.style.animation = 'ripple 0.6s linear';
            
            this.appendChild(ripples);
            setTimeout(() => ripples.remove(), 600);
        });
    });

    // --- Contact Form Submission Simulation ---
    const contactForm = document.getElementById('contactForm');
    if(contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const submitBtn = document.getElementById('submitBtn');
            const span = submitBtn.querySelector('span');
            const originalText = span.innerText;
            
            span.innerText = 'Transmitting...';
            
            setTimeout(() => {
                span.innerText = 'Request Sent!';
                submitBtn.style.background = '#00F5FF';
                submitBtn.style.color = '#000';
                
                setTimeout(() => {
                    span.innerText = originalText;
                    submitBtn.style.background = '';
                    submitBtn.style.color = '';
                    contactForm.reset();
                }, 4000);
            }, 1000);
        });
    }

    // --- Background Canvases ---
    
    // 1. Particle Canvas (Hero)
    const pCanvas = document.getElementById('particleCanvas');
    if (pCanvas) {
        const ctx = pCanvas.getContext('2d');
        let particles = [];
        let numParticles = 80;
        
        const resizePCanvas = () => {
            pCanvas.width = window.innerWidth;
            pCanvas.height = window.innerHeight;
            numParticles = window.innerWidth < 768 ? 40 : 80;
        };
        resizePCanvas();
        window.addEventListener('resize', resizePCanvas);

        class Particle {
            constructor() {
                this.x = Math.random() * pCanvas.width;
                this.y = Math.random() * pCanvas.height;
                this.vx = (Math.random() - 0.5) * 0.5;
                this.vy = (Math.random() - 0.5) * 0.5;
                this.radius = Math.random() * 2 + 0.5;
            }
            update() {
                this.x += this.vx;
                this.y += this.vy;
                if (this.x < 0 || this.x > pCanvas.width) this.vx *= -1;
                if (this.y < 0 || this.y > pCanvas.height) this.vy *= -1;
                
                if(!isTouchDevice) {
                    const dx = mouseX - this.x;
                    const dy = mouseY - this.y;
                    const dist = Math.sqrt(dx*dx + dy*dy);
                    if(dist < 150) {
                        this.x -= dx * 0.01;
                        this.y -= dy * 0.01;
                    }
                }
            }
            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                ctx.fillStyle = 'rgba(0, 245, 255, 0.4)';
                ctx.fill();
            }
        }

        const initParticles = () => {
            particles = [];
            for (let i = 0; i < numParticles; i++) particles.push(new Particle());
        };

        const animateParticles = () => {
            ctx.clearRect(0, 0, pCanvas.width, pCanvas.height);
            for (let i = 0; i < particles.length; i++) {
                particles[i].update();
                particles[i].draw();
                for (let j = i; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < 120) {
                        ctx.beginPath();
                        ctx.strokeStyle = `rgba(0, 245, 255, ${0.1 - dist/1200})`;
                        ctx.lineWidth = 0.5;
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.stroke();
                    }
                }
            }
            requestAnimationFrame(animateParticles);
        };
        initParticles();
        animateParticles();
    }
    
    // 2. CTA Mesh Canvas
    const meshCanvas = document.getElementById('meshCanvas');
    if (meshCanvas) {
        const mCtx = meshCanvas.getContext('2d');
        let time = 0;
        
        const resizeMesh = () => {
            meshCanvas.width = window.innerWidth;
            meshCanvas.height = meshCanvas.parentElement.offsetHeight;
        };
        resizeMesh();
        window.addEventListener('resize', resizeMesh);

        const animateMesh = () => {
            time += 0.005;
            mCtx.clearRect(0, 0, meshCanvas.width, meshCanvas.height);
            
            const gradient = mCtx.createLinearGradient(
                Math.sin(time) * 500 + meshCanvas.width/2, 0,
                Math.cos(time) * 500 + meshCanvas.width/2, meshCanvas.height
            );
            gradient.addColorStop(0, 'rgba(123, 47, 255, 0.1)');
            gradient.addColorStop(0.5, 'rgba(0, 245, 255, 0.05)');
            gradient.addColorStop(1, 'rgba(10, 10, 15, 0)');
            
            mCtx.fillStyle = gradient;
            mCtx.fillRect(0, 0, meshCanvas.width, meshCanvas.height);
            
            const drawBlob = (x, y, r, color) => {
                mCtx.beginPath();
                const grad = mCtx.createRadialGradient(x, y, 0, x, y, r);
                grad.addColorStop(0, color);
                grad.addColorStop(1, 'rgba(0,0,0,0)');
                mCtx.fillStyle = grad;
                mCtx.arc(x, y, r, 0, Math.PI * 2);
                mCtx.fill();
            };
            
            const w = meshCanvas.width;
            const h = meshCanvas.height;
            drawBlob(w * 0.2 + Math.sin(time*2)*100, h * 0.3 + Math.cos(time*1.5)*100, 300, 'rgba(123, 47, 255, 0.15)');
            drawBlob(w * 0.8 + Math.cos(time*1.2)*150, h * 0.6 + Math.sin(time*1.8)*150, 400, 'rgba(0, 245, 255, 0.1)');
            
            requestAnimationFrame(animateMesh);
        };
        animateMesh();
    }
});
