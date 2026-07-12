// D:\Sai Nilesh\Clinic_project\script.js
document.addEventListener("DOMContentLoaded", () => {

  // 1. Initialize Lucide Icons
  try {
    if (typeof lucide !== 'undefined') {
      lucide.createIcons();
    }
  } catch (err) { console.error('Lucide init failed:', err); }

  // 2. Set Current Year in Footer
  try {
    const yearEl = document.getElementById("year");
    if (yearEl) yearEl.textContent = new Date().getFullYear();
  } catch (err) { console.error('Year set failed:', err); }

  // ==========================================
  // EmailJS Setup
  // ==========================================
  // 1. Sign in at https://dashboard.emailjs.com
  // 2. Email Services -> your connected Gmail service -> copy its "Service ID"
  //    (looks like "service_xxxxxxx") and paste it below as EMAILJS_SERVICE_ID.
  // 3. Account -> General -> "Public Key" -> paste below as EMAILJS_PUBLIC_KEY.
  // 4. Template ID is already set from your Contact Us template.
  const EMAILJS_PUBLIC_KEY  = "Qyy6FItcAzcqaIRyh";      // <-- from EmailJS Account > API Keys
  const EMAILJS_SERVICE_ID  = "service_74bb6i4";       // <-- from EmailJS Email Services (Gmail: arpitadentalimplants@gmail.com)
  const EMAILJS_TEMPLATE_ID = "template_ximvl4a";      // Contact Us template

  try {
    if (typeof emailjs !== 'undefined') {
      emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });
    }
  } catch (err) { console.error('EmailJS init failed:', err); }

  // ==========================================
  // Interactive Hero Background Tracking
  // ==========================================
  try {
    const heroSection = document.getElementById('home');
    if (heroSection) {
      heroSection.addEventListener('mousemove', (e) => {
        const rect = heroSection.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        heroSection.style.setProperty('--mouse-x', `${x}%`);
        heroSection.style.setProperty('--mouse-y', `${y}%`);
      });

      heroSection.addEventListener('mouseleave', () => {
        heroSection.style.setProperty('--mouse-x', '50%');
        heroSection.style.setProperty('--mouse-y', '50%');
      });

      // touch support so mobile isn't stuck at the default
      heroSection.addEventListener('touchmove', (e) => {
        if (!e.touches || !e.touches[0]) return;
        const rect = heroSection.getBoundingClientRect();
        const x = ((e.touches[0].clientX - rect.left) / rect.width) * 100;
        const y = ((e.touches[0].clientY - rect.top) / rect.height) * 100;
        heroSection.style.setProperty('--mouse-x', `${x}%`);
        heroSection.style.setProperty('--mouse-y', `${y}%`);
      }, { passive: true });
    }
  } catch (err) { console.error('Hero background tracking failed:', err); }

  // 3. Navbar Scroll Effect & Mobile Menu Logic
  try {
    const navbar = document.getElementById('navbar');
    const navTitle = document.getElementById('nav-brand-title');
    const navSubtitle = document.getElementById('nav-brand-subtitle');
    const desktopLinks = document.getElementById('desktop-links');
    const mobileBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-link');
    const topBar = document.getElementById('top-bar');

    if (navbar && navTitle && navSubtitle && mobileBtn) {
      window.addEventListener('scroll', () => {
        if (window.scrollY > 20) {
          navbar.classList.replace('bg-transparent', 'bg-white');
          navbar.classList.add('shadow-lg');
          navTitle.classList.replace('text-white', 'text-blue-900');
          navSubtitle.classList.replace('text-blue-200', 'text-blue-600');
          mobileBtn.classList.replace('text-white', 'text-blue-700');
          if (desktopLinks) {
            Array.from(desktopLinks.children).forEach(link => {
              link.classList.replace('text-white/90', 'text-gray-700');
              link.classList.replace('hover:text-white', 'hover:text-blue-700');
            });
          }
          // Collapse the top utility bar out of view once scrolled, and
          // pull the navbar up to sit flush at the top of the page.
          if (topBar) topBar.style.transform = 'translateY(-100%)';
          navbar.style.top = '0px';
        } else {
          navbar.classList.replace('bg-white', 'bg-transparent');
          navbar.classList.remove('shadow-lg');
          navTitle.classList.replace('text-blue-900', 'text-white');
          navSubtitle.classList.replace('text-blue-600', 'text-blue-200');
          mobileBtn.classList.replace('text-blue-700', 'text-white');
          if (desktopLinks) {
            Array.from(desktopLinks.children).forEach(link => {
              link.classList.replace('text-gray-700', 'text-white/90');
              link.classList.replace('hover:text-blue-700', 'hover:text-white');
            });
          }
          if (topBar) topBar.style.transform = 'translateY(0)';
          navbar.style.top = '';
        }
      });
    }

    if (topBar) topBar.style.transition = 'transform 0.3s ease';
    if (navbar) navbar.style.transition = 'top 0.3s ease, background-color 0.3s ease';

    if (mobileBtn && mobileMenu) {
      mobileBtn.addEventListener('click', () => mobileMenu.classList.toggle('hidden'));
    }
    if (mobileLinks && mobileMenu) {
      mobileLinks.forEach(link => link.addEventListener('click', () => mobileMenu.classList.add('hidden')));
    }
  } catch (err) { console.error('Navbar logic failed:', err); }

  // 4. Appointment Form Submission via EmailJS
  try {
    const form = document.getElementById('appointment-form');
    const formSuccess = document.getElementById('form-success');
    const formError = document.getElementById('form-error');
    const submitBtn = document.getElementById('appointment-submit-btn');

    if (form && formSuccess) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        if (formError) { formError.classList.add('hidden'); formError.textContent = ''; }

        if (typeof emailjs === 'undefined') {
          console.error('EmailJS SDK not loaded.');
          if (formError) {
            formError.textContent = 'Sorry, something went wrong sending your request. Please call us directly.';
            formError.classList.remove('hidden');
          }
          return;
        }

        if (submitBtn) {
          submitBtn.disabled = true;
          submitBtn.textContent = 'Sending...';
        }

        emailjs.sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, form)
          .then(() => {
            form.classList.add('hidden');
            formSuccess.classList.remove('hidden');
            formSuccess.classList.add('flex');
            setTimeout(() => {
              form.reset();
              formSuccess.classList.add('hidden');
              formSuccess.classList.remove('flex');
              form.classList.remove('hidden');
              if (submitBtn) {
                submitBtn.disabled = false;
                submitBtn.textContent = 'Confirm Appointment →';
              }
            }, 5000);
          })
          .catch((error) => {
            console.error('EmailJS send failed:', error);
            if (formError) {
              formError.textContent = 'Sorry, we couldn\'t send your request. Please call us at 078925 81667.';
              formError.classList.remove('hidden');
            }
            if (submitBtn) {
              submitBtn.disabled = false;
              submitBtn.textContent = 'Confirm Appointment →';
            }
          });
      });
    }
  } catch (err) { console.error('Form logic failed:', err); }

  // 5. Intersection Observer for Scroll Animations
  let observer;
  try {
    observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: "0px 0px -50px 0px" });

    document.querySelectorAll('.scroll-reveal').forEach(el => observer.observe(el));
  } catch (err) { console.error('Scroll reveal observer failed:', err); }

  // 6. Inject ALL 15 Services Data
  try {
    const services = [
      { title: 'Root Canal Treatment', subtitle: 'Single-Visit Painless RCT', desc: 'Our advanced single-visit root canal therapy eliminates infection and saves your natural tooth — completely painless with modern anaesthesia and rotary endodontics.', icon: '🦷', badge: 'Most Popular', img: 'images/root-canal.jpg', keywords: ['Painless', 'Same Day', 'Tooth Saving'] },
      { title: 'Dental Implants', subtitle: 'Permanent Tooth Replacement', desc: 'Replace missing teeth with titanium implants that look, feel, and function like natural teeth. Patients travel from across Karnataka for our expert implant solutions.', icon: '⚙️', badge: 'Advanced', img: 'https://glowdent.ba/wp-content/uploads/2026/01/ugradnja_implanta_banjaluka.webp', keywords: ['Permanent', 'Natural Feel', 'Titanium'] },
      { title: 'Clear Aligners', subtitle: 'Invisible Orthodontics', desc: 'Straighten your teeth discreetly with custom-fitted clear aligners. No metal, no discomfort — just a confident smile at every stage of treatment.', icon: '✨', badge: 'Trending', img: 'https://images.pexels.com/photos/28407748/pexels-photo-28407748.jpeg', keywords: ['Invisible', 'Removable', 'Comfortable'] },
      { title: 'Teeth Fixing', subtitle: 'Crowns, Bridges & Veneers', desc: 'Restore broken, chipped, or damaged teeth with precision crowns, bridges, and veneers crafted for a perfect fit and natural appearance.', icon: '🔧', badge: '', img: 'https://commons.wikimedia.org/wiki/Special:FilePath/Full_porcelain_crown.jpg', keywords: ['Crowns', 'Bridges', 'Veneers'] },
      { title: 'Smile Design', subtitle: 'Complete Smile Makeover', desc: 'Transform your smile with a personalized makeover combining whitening, veneers, contouring, and alignment — designed to complement your unique facial features.', icon: '😁', badge: 'Premium', img: 'images/smile-design.jpg', keywords: ['Makeover', 'Aesthetic', 'Personalized'] },
      { title: 'Braces', subtitle: 'Metal & Ceramic Orthodontics', desc: 'Correct misaligned teeth and bite issues with traditional metal or discreet ceramic braces. Our experienced orthodontist ensures precise, lasting results.', icon: '🔩', badge: '', img: 'https://symphonydentalcare.in/wp-content/uploads/2026/01/Metal-Ceramic-Braces-Bandra-1024x683.webp', keywords: ['Metal', 'Ceramic', 'Precise'] },
      { title: 'Teeth Whitening', subtitle: 'Professional Bleaching', desc: 'Achieve a dazzling, movie-star smile with professional-grade teeth whitening that removes years of stains safely and effectively in just one session.', icon: '⭐', badge: 'Quick', img: 'https://prdentalkerala.com/wp-content/uploads/2024/02/teeth-whitening.jpg', keywords: ['Bright', 'Safe', 'Instant Results'] },
      { title: 'Pediatric Dentistry', subtitle: 'Gentle Care for Children', desc: 'Specialized dental care for children in a warm, friendly environment. We make every visit fun and anxiety-free, building healthy habits from an early age.', icon: '👶', badge: 'Kid Friendly', img: 'https://www.isppd.org.in/images/For_patinets_slider2.jpg', keywords: ['Children', 'Gentle', 'Preventive'] },
      { title: 'Laser Dentistry', subtitle: 'Precision Laser Treatments', desc: 'Advanced laser technology for gum treatments, cavity detection, and soft tissue procedures — faster healing, minimal discomfort, and superior precision.', icon: '🔬', badge: 'Hi-Tech', img: 'https://commons.wikimedia.org/wiki/Special:FilePath/LightScalpel_Dental_CO2_Laser.jpg', keywords: ['Laser', 'Precise', 'Fast Healing'] },
      { title: 'Tooth Extraction', subtitle: 'Painless & Safe Removal', desc: 'Simple and surgical tooth extractions performed with utmost care and precision. Our painless technique ensures a comfortable experience and quick recovery.', icon: '🩺', badge: '', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGLWCGzNjpCktN-i3zaxvvN4OG04JLIwhe7cmfWFYkq_kYQOufByNarlp8&s=10', keywords: ['Painless', 'Safe', 'Quick Recovery'] },
      { title: 'Gum Treatment', subtitle: 'Periodontal Care', desc: 'Comprehensive treatment for gum disease, bleeding gums, and periodontitis. We restore gum health with deep cleaning, scaling, root planing, and laser therapy.', icon: '🌿', badge: '', img: 'https://www.estrellamountaindentistry.com/wp-content/uploads/2026/05/What-Is-Gum-Disease-1024x572.jpg', keywords: ['Scaling', 'Deep Clean', 'Gum Health'] },
      { title: 'Full Mouth Rehabilitation', subtitle: 'Complete Oral Restoration', desc: 'Comprehensive full-mouth reconstruction for patients with multiple dental issues — combining implants, crowns, bridges, and cosmetic treatments for a complete transformation.', icon: '🏆', badge: 'Comprehensive', img: 'https://www.smilestudiodental.in/wp-content/uploads/2020/08/Full-Mouth-Rehablitation-1024x768.jpg', keywords: ['Full Mouth', 'Restoration', 'Transform'] },
      { title: 'Dentures', subtitle: 'Complete & Partial Dentures', desc: 'Custom-crafted complete and partial dentures that restore your smile and chewing function. Natural-looking, comfortable, and precisely fitted for everyday confidence.', icon: '😊', badge: '', img: 'https://newwayorthodontic.com/wp-content/uploads/2023/12/Complete-denture.jpg', keywords: ['Complete', 'Partial', 'Custom Fit'] },
      { title: 'Teeth Sensitivity Treatment', subtitle: 'Relief from Sharp Pain', desc: 'Targeted treatment for sensitive teeth caused by enamel erosion, exposed roots, or worn fillings. Get lasting relief and enjoy hot and cold foods without discomfort.', icon: '❄️', badge: '', img: 'https://smilevizagdental.com/wp-content/uploads/2025/11/Sensitivity-Treatment-smile-vizag-dental.jpg', keywords: ['Sensitivity', 'Relief', 'Enamel Care'] },
      { title: 'Dental X-Ray & Diagnosis', subtitle: 'Advanced Digital Imaging', desc: 'State-of-the-art digital X-rays and OPG scans for accurate, low-radiation diagnosis. Early detection of hidden problems ensures timely and effective treatment.', icon: '📷', badge: 'Digital', img: 'https://images.stockcake.com/public/2/a/4/2a4d9f98-f9c5-474c-95ca-353511d62dc6_large/dental-x-ray-image-stockcake.jpg', keywords: ['Digital X-Ray', 'OPG', 'Accurate'] }
    ];

    const servicesGrid = document.getElementById('services-grid5');
    if (servicesGrid) {
      servicesGrid.innerHTML = '';
      services.forEach((service, index) => {
        let keywordsHtml = service.keywords.map(kw => `<span class="bg-blue-50 text-blue-700 text-xs px-2 py-0.5 rounded-full border border-blue-100">${kw}</span>`).join('');
        let badgeHtml = service.badge ? `<span class="absolute top-3 right-3 bg-amber-400 text-amber-900 text-xs font-bold px-2.5 py-1 rounded-full z-10">${service.badge}</span>` : '';

        servicesGrid.innerHTML += `
            <div class="scroll-reveal card-hover bg-white rounded-2xl border border-gray-100 shadow-md overflow-hidden group" style="transition-delay: ${(index % 4) * 0.1}s">
            <div class="relative h-44 overflow-hidden">
                <img src="${service.img}" alt="${service.title}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 relative z-0" loading="lazy" onerror="this.closest('.relative').classList.add('img-fallback')" />
                <div class="absolute inset-0 bg-gradient-to-t from-blue-950/70 to-transparent z-0"></div>
                ${badgeHtml}
            </div>
            <div class="p-5">
                <h3 class="font-bold text-blue-900 text-lg mb-0.5">${service.title}</h3>
                <p class="text-blue-600 text-xs font-semibold mb-2">${service.subtitle}</p>
                <p class="text-gray-500 text-sm leading-relaxed mb-3">${service.desc}</p>
                <div class="flex flex-wrap gap-1.5">
                ${keywordsHtml}
                </div>
            </div>
            </div>
        `;
      });

      // CTA Card
      servicesGrid.innerHTML += `
            <div class="scroll-reveal bg-gradient-to-br from-blue-700 to-blue-900 rounded-2xl p-6 flex flex-col justify-between text-white shadow-xl" style="transition-delay: 0.2s">
                <div>
                <p class="text-blue-300 text-sm font-semibold mb-2">Not sure which treatment?</p>
                <h3 class="font-serif text-2xl font-bold mb-3">Get a Free Consultation</h3>
                <p class="text-blue-100 text-sm leading-relaxed">
                    Our experienced dental specialists will evaluate your needs and recommend the best treatment plan from our 15+ services.
                </p>
                </div>
                <a href="#home" class="mt-6 bg-white text-blue-800 font-bold py-3 rounded-xl text-center hover:bg-blue-50 transition-colors block pulse-btn">
                Book Free Consult →
                </a>
            </div>
        `;

      if (observer) {
        document.querySelectorAll('#services-grid5 .scroll-reveal').forEach(el => observer.observe(el));
      }
      if (typeof lucide !== 'undefined') lucide.createIcons();
    }
  } catch (err) { console.error('Services injection failed:', err); }

  // 7. Inject ALL 6 Why Us Data
  try {
    const reasons = [
      { icon: 'cpu', title: 'State-of-the-Art Technology', desc: 'We invest in the latest dental technology — digital X-rays, rotary endodontics, laser dentistry, and CAD/CAM systems — ensuring precise, comfortable, and efficient treatments.', color: 'bg-blue-50 text-blue-600' },
      { icon: 'user-check', title: 'Experienced Specialists', desc: 'Our highly qualified dental team — led by Dr. Sachin and Dr. Soumya — brings years of specialized expertise in implants, orthodontics, cosmetic dentistry, and endodontics.', color: 'bg-indigo-50 text-indigo-600' },
      { icon: 'shield-check', title: 'Patient-First Approach', desc: 'Every treatment plan is tailored to your unique needs. We prioritize your comfort, explain each step clearly, and ensure you feel confident and cared for throughout.', color: 'bg-green-50 text-green-600' },
      { icon: 'clock', title: 'Flexible Timings', desc: 'Open daily from 10 AM–9 PM, we accommodate your busy schedule. No more missing work for dental appointments — we work around your life.', color: 'bg-purple-50 text-purple-600' },
      { icon: 'dollar-sign', title: 'Transparent & Affordable Pricing', desc: 'Quality dental care shouldn\'t break the bank. We offer competitive, transparent pricing with no hidden costs — and flexible payment options for comprehensive treatments.', color: 'bg-amber-50 text-amber-600' },
      { icon: 'award', title: '4.9★ Trusted by 140+ Patients', desc: 'With 140+ five-star Google reviews and patients travelling from across Karnataka, Arpita Dental has earned Bidar\'s highest trust rating in dental care.', color: 'bg-rose-50 text-rose-600' }
    ];

    const whyUsGrid = document.getElementById('why-us-grid');
    if (whyUsGrid) {
      whyUsGrid.innerHTML = '';
      reasons.forEach((reason, index) => {
        whyUsGrid.innerHTML += `
            <div class="scroll-reveal bg-white/10 backdrop-blur-sm border border-white/15 rounded-2xl p-6 hover:bg-white/15 transition-all duration-300 group" style="transition-delay: ${(index % 3) * 0.1}s">
            <div class="w-12 h-12 rounded-xl ${reason.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <i data-lucide="${reason.icon}"></i>
            </div>
            <h3 class="font-bold text-white text-lg mb-2">${reason.title}</h3>
            <p class="text-blue-200 text-sm leading-relaxed">${reason.desc}</p>
            </div>
        `;
      });

      if (observer) {
        document.querySelectorAll('#why-us-grid .scroll-reveal').forEach(el => observer.observe(el));
      }
      if (typeof lucide !== 'undefined') lucide.createIcons();
    }
  } catch (err) { console.error('Why-Us injection failed:', err); }

  // 8. Testimonials Slider Logic
  try {
    const testimonials = [
      { name: 'Rajesh Kumar', location: 'Bidar, Karnataka', treatment: 'Root Canal Treatment', text: 'I was terrified of root canals but Dr. Sachin made the entire experience completely painless. Two months later and I have zero discomfort. The single-visit RCT was a game-changer. Highly recommend Arpita Dental to anyone in Bidar!', initials: 'RK', color: 'bg-blue-500' },
      { name: 'Priya Sharma', location: 'Bidar, Karnataka', treatment: 'Clear Aligners', text: 'Dr. Soumya is absolutely brilliant! My clear aligner treatment has been going so smoothly. She explains every step and the results are already visible. The clinic is modern, clean, and the staff is so friendly. Best dental clinic in Bidar!', initials: 'PS', color: 'bg-purple-500' },
      { name: 'Mohammed Farooq', location: 'Zaheerabad → Bidar', treatment: 'Dental Implants', text: 'My mother travelled all the way from Zaheerabad specifically for implant treatment at Arpita Dental — and it was absolutely worth it. Dr. Sachin is an expert implantologist. The procedure was painless and the results are perfect. Thank you!', initials: 'MF', color: 'bg-indigo-500' },
      { name: 'Sunita Patil', location: 'Bidar, Karnataka', treatment: 'Braces', text: 'Got braces for my teenage daughter and the experience has been excellent throughout. Dr. Soumya is very patient, explains everything clearly, and the results are amazing. Reasonable pricing and flexible appointment times make it very convenient.', initials: 'SP', color: 'bg-rose-500' },
      { name: 'Anil Reddy', location: 'Bidar, Karnataka', treatment: 'Smile Design', text: 'I always felt self-conscious about my smile. After a full smile design treatment at Arpita Dental, I can\'t stop smiling! The team is professional, uses the latest technology, and the pricing is very fair. Truly the best dental experience I\'ve had.', initials: 'AR', color: 'bg-amber-500' }
    ];

    let currentTestimonial = 0;
    let isAutoPlaying = true;

    const testContainer = document.getElementById('testimonial-content');
    const testDots = document.getElementById('test-dots');

    function renderTestimonial() {
      if (!testContainer) return;
      const t = testimonials[currentTestimonial];

      testContainer.classList.remove('opacity-100');
      testContainer.classList.add('opacity-0');

      setTimeout(() => {
        testContainer.innerHTML = `
            <div class="flex gap-1 mb-5 text-amber-500">
              <i data-lucide="star" class="w-5 h-5 fill-current border-none"></i>
              <i data-lucide="star" class="w-5 h-5 fill-current border-none"></i>
              <i data-lucide="star" class="w-5 h-5 fill-current border-none"></i>
              <i data-lucide="star" class="w-5 h-5 fill-current border-none"></i>
              <i data-lucide="star" class="w-5 h-5 fill-current border-none"></i>
            </div>
            <p class="text-gray-700 text-lg leading-relaxed mb-8 font-light">"${t.text}"</p>
            <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div class="flex items-center gap-4">
                <div class="w-12 h-12 ${t.color} rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">${t.initials}</div>
                <div>
                  <p class="font-bold text-blue-950">${t.name}</p>
                  <p class="text-gray-400 text-sm">${t.location}</p>
                </div>
              </div>
              <span class="bg-blue-50 text-blue-700 text-sm px-3 py-1.5 rounded-full border border-blue-200 font-medium">${t.treatment}</span>
            </div>
        `;

        if (typeof lucide !== 'undefined') lucide.createIcons();
        updateDots();

        testContainer.classList.remove('opacity-0');
        testContainer.classList.add('opacity-100');
        testContainer.style.transition = 'opacity 0.3s ease-in-out';
      }, 300);
    }

    function updateDots() {
      if (!testDots) return;
      testDots.innerHTML = '';
      testimonials.forEach((_, i) => {
        const activeClass = i === currentTestimonial ? 'w-8 bg-blue-600' : 'w-2.5 bg-blue-200 hover:bg-blue-400';
        testDots.innerHTML += `<button onclick="setSlide(${i})" class="h-2.5 rounded-full transition-all duration-300 ${activeClass}"></button>`;
      });
    }

    setInterval(() => {
      if (isAutoPlaying && testContainer) {
        currentTestimonial = (currentTestimonial + 1) % testimonials.length;
        renderTestimonial();
      }
    }, 4500);

    window.setSlide = (index) => {
      isAutoPlaying = false;
      currentTestimonial = index;
      renderTestimonial();
    };

    const prevBtn = document.getElementById('test-prev');
    const nextBtn = document.getElementById('test-next');

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        isAutoPlaying = false;
        currentTestimonial = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
        renderTestimonial();
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        isAutoPlaying = false;
        currentTestimonial = (currentTestimonial + 1) % testimonials.length;
        renderTestimonial();
      });
    }

    if (testContainer) renderTestimonial();
  } catch (err) { console.error('Testimonials logic failed:', err); }

});
