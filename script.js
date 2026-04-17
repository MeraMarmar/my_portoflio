document.addEventListener('DOMContentLoaded', () => {

    let tsparticlesContainer = null;

    tsParticles.load("tsparticles", {
        fpsLimit: 60,
        particles: {
            number: { value: 60, density: { enable: true, value_area: 800 } },
            color: { value: "#00ffd5" },
            links: {
                enable: true,
                color: "#00ffd5",
                distance: 150,
                opacity: 0.2,
                width: 1
            },
            move: { enable: true, speed: 1, direction: "none", random: false, straight: false, outModes: "out" },
            size: { value: 2, random: true },
            opacity: { value: 0.3 }
        },
        interactivity: {
            events: {
                onHover: { enable: true, mode: "grab" },
                onClick: { enable: true, mode: "push" }
            },
            modes: {
                grab: { distance: 140, links: { opacity: 0.5 } },
                push: { quantity: 4 }
            }
        },
        detectRetina: true
    }).then(container => {
        tsparticlesContainer = container;
        if (localStorage.getItem('theme') === 'light') {
            updateParticlesColor('#0284c7');
        }
    });

    /* =========================================
       2. Scroll Progress Indicator & Navbar
       ========================================= */
    const scrollProgress = document.getElementById('scroll-progress');
    const navbar = document.querySelector('.navbar');

    window.addEventListener('scroll', () => {
        // Progress bar
        const totalHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const progress = (window.scrollY / totalHeight) * 100;
        scrollProgress.style.width = `${progress}%`;

        // Navbar blur effect
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    /* =========================================
       3. Intersection Observer (Framer Style Staggers)
       ========================================= */
    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -50px 0px',
        threshold: 0.1
    };

    const animateObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // If it's a staggered container, stagger the children
                if (entry.target.classList.contains('skills-grid') || entry.target.classList.contains('projects-list')) {
                    const children = entry.target.querySelectorAll('.fade-in-stagger');
                    children.forEach((child, index) => {
                        setTimeout(() => {
                            child.classList.add('visible');
                        }, index * 150); // 150ms stagger
                    });
                }
                
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in, .fade-in-stagger').forEach(el => animateObserver.observe(el));

    /* =========================================
       4. Animated Counters
       ========================================= */
    const counterObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = +counter.getAttribute('data-target');
                const duration = 2000;
                const increment = target / (duration / 16); // 60fps

                let current = 0;
                const updateCounter = () => {
                    current += increment;
                    if (current < target) {
                        counter.innerText = Math.ceil(current);
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.innerText = target;
                    }
                };
                updateCounter();
                observer.unobserve(counter);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.counter').forEach(c => counterObserver.observe(c));

    /* =========================================
       5. Project Modal Viewer
       ========================================= */
    const modal = document.getElementById('project-modal');
    const modalClose = document.getElementById('modal-close-btn');
    const modalTitle = document.getElementById('modal-title');
    const modalDesc = document.getElementById('modal-desc');
    const modalTags = document.getElementById('modal-tags');
    const modalLink = document.getElementById('modal-link');

    document.querySelectorAll('.project-row').forEach(row => {
        const btn = row.querySelector('.open-modal-btn');
        if(btn) {
            btn.addEventListener('click', () => {
                const title = row.getAttribute('data-title');
                const desc = row.getAttribute('data-desc');
                const tags = row.getAttribute('data-tags').split(',');
                const link = row.getAttribute('data-link');

                modalTitle.innerText = title;
                modalDesc.innerText = desc;
                modalLink.href = link;
                
                modalTags.innerHTML = '';
                tags.forEach(tag => {
                    const span = document.createElement('span');
                    span.innerText = tag.trim();
                    modalTags.appendChild(span);
                });

                modal.classList.add('active');
            });
        }
    });

    modalClose.addEventListener('click', () => {
        modal.classList.remove('active');
    });

    // Close on click outside
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
        }
    });

    /* =========================================
       6. Multilingual EN/AR Toggle
       ========================================= */
    const translations = {
        en: {
            nav_about: "About",
            nav_skills: "Skills",
            nav_projects: "Projects",
            nav_experience: "Experience",
            hero_greeting: "STAFF MACHINE LEARNING ENGINEER & AI EDUCATOR",
            hero_hi: "Hello, I'm",
            hero_summary: "I architect scalable AI systems and empower the next generation of data professionals. Specialized in transforming complex data into robust, production-ready machine learning solutions that drive business value.",
            btn_projects: "View Projects",
            btn_hire: "Hire Me",
            about_title: "About Me",
            about_p1: "As a <strong class='text-glow'>Staff Machine Learning Engineer</strong>, I architect and deploy scalable, end-to-end ML systems that drive measurable impact. From robust data pipelines to model serving, I specialize in transforming complex datasets into production-ready AI solutions that solve critical business challenges.",
            about_p2: "My technical foundation encompasses advanced deep learning architectures (ANNs, CNNs) and sophisticated approaches to real-world edge cases, such as extreme class imbalance and distributed model optimization. I actively work with modern ML ecosystems including Python, Scikit-learn, TensorFlow, and production pipelines.",
            about_p3: "Beyond engineering, I am a dedicated <strong class='text-glow'>AI Educator</strong>. I lead high-impact training initiatives, mentoring the next generation of engineers in core machine learning concepts, system design, and industry best practices. I prioritize writing clean, reproducible code and building sustainable ML workflows.",
            about_location: "Cairo, Egypt",
            stat_students: "Students Mentored",
            stat_projects: "Enterprise Projects",
            stat_accuracy: "Pipeline Efficiency",
            skills_title: "Technical Skills",
            skills_cat_lang: "Languages",
            skills_cat_ml: "Machine & Deep Learning",
            skills_cat_frameworks: "Frameworks",
            skills_cat_ops: "MLOps & Tools",
            projects_title: "Featured Architecture",
            proj1_desc: "A scalable classification system handling extreme data imbalance (~4-5%) for pharmacovigilance reporting.",
            proj2_desc: "Predictive IoT model for optimizing hydration schedules using continuous environmental telemetry streams.",
            btn_view_details: "View Architecture",
            experience_title: "Experience & Leadership",
            exp1_role: "Machine Learning Engineer Trainee",
            exp1_company: "MCIT - Digilians Digital Pioneers",
            exp1_b1: "Designed and built end-to-end ML pipelines.",
            exp1_b2: "Developed deep learning models (ANN, CNN).",
            exp1_b3: "Improved performance using advanced CV tuning.",
            exp2_role: "AI Trainer & ML Instructor",
            exp2_company: "International School - Egypt",
            exp2_b1: "Delivered hands-on sessions using TensorFlow & Keras.",
            exp2_b2: "Mentored 30+ students on core AI patterns.",
            exp2_b3: "Simplified complex math into interactive demos.",
            ach_title: "Achievements",
            ach_card1_title: "Machine Learning Projects",
            ach_card1_desc: "Successfully built and deployed multiple ML projects including classification, regression, and real-world prediction systems.",
            ach_card2_title: "AI Instructor Experience",
            ach_card2_desc: "Trained 30+ students on Machine Learning and Deep Learning concepts with hands-on projects and practical demos.",
            ach_card3_title: "End-to-End ML Pipelines",
            ach_card3_desc: "Developed complete pipelines from data preprocessing to model evaluation and optimization using industry tools.",
            srv_title: "Offered Services",
            srv_card1_title: "Machine Learning Solutions",
            srv_card1_desc: "Building end-to-end ML models for classification, regression, and prediction problems with optimized performance and real-world deployment readiness.",
            srv_card2_title: "Deep Learning Development",
            srv_card2_desc: "Designing and training neural networks (ANN, CNN) for image processing, prediction, and intelligent automation systems.",
            srv_card3_title: "Data Analysis & Visualization",
            srv_card3_desc: "Turning raw data into actionable insights using EDA, statistical analysis, and professional visualizations with Python tools.",
            srv_card4_title: "AI Training & Mentorship",
            srv_card4_desc: "Teaching Machine Learning & AI concepts with hands-on projects, simplifying complex topics for students and beginners.",
            cta_title: "Let's Build Something Great Together",
            cta_desc: "Looking to elevate your AI capabilities or need expert ML consulting? Let's discuss how we can drive impact for your organization.",
            modal_view_code: "View Notebook / Code",
            chat_header: "Amira.AI",
            chat_status: "Simulated Assistant",
            chat_placeholder: "Ask about my skills, projects, or experience...",
            bot_welcome: "Hello! I'm Amira.AI. I can answer questions about Amira's experience, skills, and projects. What would you like to know?",
            bot_skills: "Amira specializes in Python, Scikit-learn, TensorFlow, and building robust end-to-end ML pipelines. She is also experienced in deep learning (ANN, CNN) and handling imbalanced datasets.",
            bot_projects: "Amira has built several complex systems! Some featured architectures include the Adverse Drug Reaction (ADR) Reporting system and a Predictive IoT model for smart agriculture.",
            bot_exp: "Amira has worked as a Machine Learning Engineer Trainee at MCIT (Digilians) and as an AI Trainer/Instructor, mentoring over 30 students in core AI patterns.",
            bot_contact: "You can reach Amira at amirafarhan34@gmail.com, or check out her LinkedIn via the 'Hire Me' section!",
            bot_default: "I'm not exactly sure about that, but you can always email Amira at amirafarhan34@gmail.com to ask directly!"
        },
        ar: {
            nav_about: "من أنا",
            nav_skills: "المهارات",
            nav_projects: "المشاريع",
            nav_experience: "الخبرات",
            hero_greeting: "مهندس تعليم آلة أول ومدرب ذكاء اصطناعي",
            hero_hi: "مرحباً، أنا",
            hero_summary: "أقوم بتصميم أنظمة ذكاء اصطناعي قابلة للتوسع وأعمل على تمكين الجيل القادم من محترفي البيانات. متخصص في تحويل البيانات المعقدة إلى حلول ذكاء اصطناعي قوية وجاهزة للإنتاج لتعزيز قيمة الأعمال.",
            btn_projects: "عرض المشاريع",
            btn_hire: "وظفني",
            about_title: "من أنا",
            about_p1: "بصفتي <strong class='text-glow'>مهندس تعليم آلة أول</strong>، أقوم ببناء وتصميم أنظمة تعلم آلة شاملة قابلة للتطوير تُحدث تأثيراً قابلاً للقياس. أتخصص في تحويل مجموعات البيانات المعقدة إلى حلول ذكاء اصطناعي مستقرة وجاهزة للإنتاج لحل التحديات الحرجة.",
            about_p2: "تشمل خبرتي المعمارية المتقدمة للتعلم العميق (ANNs, CNNs) ومقاربات متطورة للتعامل مع الحالات الواقعية الاستثنائية، مثل عدم توازن البيانات الكبير. أعمل بنشاط مع بيئات تعلم الآلة الحديثة بما فيها Python و Scikit-learn و TensorFlow.",
            about_p3: "إلى جانب الهندسة، أنا <strong class='text-glow'>مدرب ذكاء اصطناعي</strong> متخصص. أقود مبادرات تدريبية عالية التأثير لتوجيه الجيل القادم من المهندسين، مع التركيز على كتابة أكواد نظيفة وبناء مسارات عمل مستدامة.",
            about_location: "القاهرة، مصر",
            stat_students: "طالب تم تدريبه",
            stat_projects: "مشاريع مؤسسية",
            stat_accuracy: "كفاءة النظام",
            skills_title: "المهارات التقنية",
            skills_cat_lang: "لغات البرمجة",
            skills_cat_ml: "التعلم الآلي والعميق",
            skills_cat_frameworks: "أطر العمل",
            skills_cat_ops: "الأدوات والتشغيل",
            projects_title: "المشاريع المميزة",
            proj1_desc: "نظام تصنيف قابل للتطوير يتعامل مع البيانات غير المتوازنة بشدة (~4-5%) لتقارير التيقظ الدوائي.",
            proj2_desc: "نموذج تنبؤي لإنترنت الأشياء لتحسين جداول الري باستخدام تدفقات البيانات البيئية المستمرة.",
            btn_view_details: "عرض التفاصيل",
            experience_title: "الخبرات والقيادة",
            exp1_role: "متدرب هندسة تعلم الآلة",
            exp1_company: "وزارة الاتصالات - رواد مصر الرقمية",
            exp1_b1: "تصميم وبناء مسارات عمل كاملة لتعليم الآلة.",
            exp1_b2: "تطوير نماذج التعلم العميق (ANN, CNN).",
            exp1_b3: "تحسين الأداء باستخدام تقنيات متقدمة للتحقق المتقاطع.",
            exp2_role: "مدرب ذكاء اصطناعي وتعلم آلة",
            exp2_company: "المدرسة الدولية - مصر",
            exp2_b1: "تقديم جلسات عملية باستخدام TensorFlow و Keras.",
            exp2_b2: "توجيه أكثر من 30 طالباً في مفاهيم الذكاء الاصطناعي الأساسية.",
            exp2_b3: "تبسيط الرياضيات المعقدة إلى عروض تفاعلية.",
            ach_title: "الإنجازات",
            ach_card1_title: "مشاريع تعلم الآلة",
            ach_card1_desc: "بناء وتطوير العديد من مشاريع الذكاء الاصطناعي بنجاح بما فيها أنظمة التصنيف والتوقع المستندة على بيانات واقعية.",
            ach_card2_title: "خبرات التدريب للذكاء الاصطناعي",
            ach_card2_desc: "تدريب أكثر من ٣٠ طالباً على مفاهيم تعلم الآلة والتعلم العميق مع مشاريع وتطبيقات عملية مباشرة.",
            ach_card3_title: "هندسة النظم الشاملة",
            ach_card3_desc: "تطوير مسارات عمل كاملة تبدأ من معالجة البيانات الأولية وصولاً إلى تقييم ودراسة النماذج بأدوات القطاع المعتمدة.",
            srv_title: "الخدمات المقدمة",
            srv_card1_title: "حلول تعلم الآلة",
            srv_card1_desc: "بناء نماذج شاملة لتصنيف وتحليل وتوقع البيانات بأداء عالي وجاهزية تامة ومطابقة لبيئات الإنتاج العملية.",
            srv_card2_title: "تطوير التعلم العميق",
            srv_card2_desc: "تصميم وتدريب الشبكات العصبية لمعالجة الصور والتنبؤات وغيرها من أنظمة الأتمتة الذكية.",
            srv_card3_title: "تحليل وتصوير البيانات",
            srv_card3_desc: "اكتشاف الأنماط والرؤى القيّمة للبيانات وتصويرها باستخدام تقنيات وإحصائيات لغة بايثون الاحترافية.",
            srv_card4_title: "توجيه وتدريب الذكاء الاصطناعي",
            srv_card4_desc: "تعليم مفاهيم التكنولوجيا بمشاريع تطبيقية، مع تبسيط المواضيع الصعبة للطلاب ورواد الأعمال المبتدئين.",
            cta_title: "لنصنع شيئاً رائعاً معاً",
            cta_desc: "هل تتطلع إلى الارتقاء بقدرات الذكاء الاصطناعي لديك أو تحتاج إلى استشارات خبير؟ دعنا نناقش كيف يمكننا تحقيق تأثير حقيقي لمؤسستك.",
            modal_view_code: "عرض الكود / المشروع",
            chat_header: "أميرة.AI",
            chat_status: "مساعد تفاعلي",
            chat_placeholder: "اسأل عن مهاراتي، مشاريعي...",
            bot_welcome: "مرحباً! أنا أميرة.AI. يمكنني الإجابة على الأسئلة حول خبرات أميرة ومهاراتها ومشاريعها. ماذا تود أن تعرف؟",
            bot_skills: "تتخصص أميرة في Python و Scikit-learn و TensorFlow وبناء مسارات عمل قوية لتعلم الآلة. ولديها خبرة في التعلم العميق والتعامل مع البيانات غير المتوازنة.",
            bot_projects: "قامت أميرة ببناء عدة أنظمة! من أهمها نظام تقارير التيقظ الدوائي (ADR) ونموذج التنبؤ بالري التلقائي وإنترنت الأشياء.",
            bot_exp: "عملت أميرة كمهندسة تعلم آلة تحت التدريب في وزارة الاتصالات ومدربة ذكاء اصطناعي حيث دربت أكثر من 30 طالباً.",
            bot_contact: "يمكنك التواصل مع أميرة عبر البريد amirafarhan34@gmail.com!",
            bot_default: "لست متأكداً من ذلك، ولكن يمكنك دائماً مراسلة أميرة مباشرة عبر amirafarhan34@gmail.com!"
        }
    };

    let currentLang = 'en';
    const langToggleBtn = document.getElementById('lang-toggle');
    const langText = document.getElementById('lang-text');

    langToggleBtn.addEventListener('click', () => {
        currentLang = currentLang === 'en' ? 'ar' : 'en';
        document.documentElement.setAttribute('dir', currentLang === 'ar' ? 'rtl' : 'ltr');
        document.documentElement.setAttribute('lang', currentLang);
        langText.innerText = currentLang === 'en' ? 'AR' : 'EN';
        
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if(translations[currentLang][key]) {
                el.innerHTML = translations[currentLang][key]; // Using innerHTML to preserve strong/b tags
            }
        });
        
        const chatInput = document.getElementById('chatbot-text');
        if (chatInput) {
            chatInput.placeholder = translations[currentLang].chat_placeholder;
        }
    });

    /* =========================================
       7. Theme Toggle (Dark/Light Mode)
       ========================================= */
    const themeToggleBtn = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    let isLightMode = localStorage.getItem('theme') === 'light';

    const updateThemeUI = () => {
        if (isLightMode) {
            document.documentElement.setAttribute('data-theme', 'light');
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
            updateParticlesColor('#0284c7');
        } else {
            document.documentElement.removeAttribute('data-theme');
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
            updateParticlesColor('#00ffd5');
        }
    };

    themeToggleBtn.addEventListener('click', () => {
        isLightMode = !isLightMode;
        localStorage.setItem('theme', isLightMode ? 'light' : 'dark');
        updateThemeUI();
    });

    const updateParticlesColor = (color) => {
        if (tsparticlesContainer) {
            tsparticlesContainer.options.particles.color.value = color;
            tsparticlesContainer.options.particles.links.color = color;
            tsparticlesContainer.refresh();
        }
    };

    // Initialize Theme
    updateThemeUI();

    /* =========================================
       8. AI Chatbot Logic
       ========================================= */
    const chatFab = document.getElementById('chatbot-fab');
    const chatWindow = document.getElementById('chatbot-window');
    const chatClose = document.getElementById('chatbot-close');
    const chatMessages = document.getElementById('chatbot-messages');
    const chatInput = document.getElementById('chatbot-text');
    const chatSendBtn = document.getElementById('chatbot-send');

    let hasOpenedChat = false;

    const addMessage = (text, sender) => {
        const msgDiv = document.createElement('div');
        msgDiv.classList.add('chat-msg', sender === 'user' ? 'chat-user' : 'chat-bot');
        msgDiv.innerText = text;
        chatMessages.appendChild(msgDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    };

    const processUtterance = (text) => {
        const lower = text.toLowerCase();
        let replyKey = 'bot_default';
        
        if (lower.includes('skill') || lower.includes('Python') || lower.includes('مهارات') || lower.includes('تقني')) {
            replyKey = 'bot_skills';
        } else if (lower.includes('project') || lower.includes('portfolio') || lower.includes('مشاريع') || lower.includes('مشروع')) {
            replyKey = 'bot_projects';
        } else if (lower.includes('experience') || lower.includes('work') || lower.includes('job') || lower.includes('خبرة') || lower.includes('عمل')) {
            replyKey = 'bot_exp';
        } else if (lower.includes('contact') || lower.includes('email') || lower.includes('hire') || lower.includes('تواصل') || lower.includes('وظفني') || lower.includes('ايميل')) {
            replyKey = 'bot_contact';
        }

        setTimeout(() => {
            const typingDiv = document.createElement('div');
            typingDiv.classList.add('chat-msg', 'chat-bot');
            typingDiv.innerText = '...';
            chatMessages.appendChild(typingDiv);
            chatMessages.scrollTop = chatMessages.scrollHeight;

            setTimeout(() => {
                chatMessages.removeChild(typingDiv);
                addMessage(translations[currentLang][replyKey], 'bot');
            }, 800);
        }, 300);
    };

    const handleSend = () => {
        const text = chatInput.value.trim();
        if (text) {
            addMessage(text, 'user');
            chatInput.value = '';
            processUtterance(text);
        }
    };

    chatSendBtn.addEventListener('click', handleSend);
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleSend();
    });

    chatFab.addEventListener('click', () => {
        chatWindow.classList.add('active');
        if (!hasOpenedChat) {
            addMessage(translations[currentLang].bot_welcome, 'bot');
            hasOpenedChat = true;
        }
    });

    chatClose.addEventListener('click', () => {
        chatWindow.classList.remove('active');
    });

    // Smooth scroll for nav
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if(href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    window.scrollTo({
                        top: target.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

});
