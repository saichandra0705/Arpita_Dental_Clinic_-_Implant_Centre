document.addEventListener("DOMContentLoaded", () => {
    // 1. Initialize Lucide Icons
    lucide.createIcons();
  
    // 2. Set Current Year in Footer
    document.getElementById("year").textContent = new Date().getFullYear();
  
    // 3. Navbar Scroll Effect & Mobile Menu Logic
    const navbar = document.getElementById('navbar');
    const navTitle = document.getElementById('nav-brand-title');
    const navSubtitle = document.getElementById('nav-brand-subtitle');
    const desktopLinks = document.getElementById('desktop-links');
    const mobileBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-link');
  
    window.addEventListener('scroll', () => {
      if (window.scrollY > 20) {
        navbar.classList.replace('bg-transparent', 'bg-white');
        navbar.classList.add('shadow-lg');
        navTitle.classList.replace('text-white', 'text-teal-800');
        navSubtitle.classList.replace('text-teal-200', 'text-teal-600');
        mobileBtn.classList.replace('text-white', 'text-teal-700');
        Array.from(desktopLinks.children).forEach(link => {
          link.classList.replace('text-white/90', 'text-gray-700');
          link.classList.replace('hover:text-white', 'hover:text-teal-700');
        });
      } else {
        navbar.classList.replace('bg-white', 'bg-transparent');
        navbar.classList.remove('shadow-lg');
        navTitle.classList.replace('text-teal-800', 'text-white');
        navSubtitle.classList.replace('text-teal-600', 'text-teal-200');
        mobileBtn.classList.replace('text-teal-700', 'text-white');
        Array.from(desktopLinks.children).forEach(link => {
          link.classList.replace('text-gray-700', 'text-white/90');
          link.classList.replace('hover:text-teal-700', 'hover:text-white');
        });
      }
    });
  
    mobileBtn.addEventListener('click', () => mobileMenu.classList.toggle('hidden'));
    mobileLinks.forEach(link => link.addEventListener('click', () => mobileMenu.classList.add('hidden')));
  
    // 4. Form Submission Simulation
    const form = document.getElementById('appointment-form');
    const formSuccess = document.getElementById('form-success');
  
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      form.classList.add('hidden');
      formSuccess.classList.remove('hidden');
      formSuccess.classList.add('flex');
      setTimeout(() => {
        form.reset();
        formSuccess.classList.add('hidden');
        formSuccess.classList.remove('flex');
        form.classList.remove('hidden');
      }, 4000);
    });
  
    // 5. Intersection Observer for Scroll Animations
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target); 
        }
      });
    }, { threshold: 0.1 });
    
    document.querySelectorAll('.scroll-reveal').forEach(el => observer.observe(el));
  
    // 6. Inject ALL 15 Services Data
    const services = [
      { title: 'Root Canal Treatment', subtitle: 'Single-Visit Painless RCT', desc: 'Our advanced single-visit root canal therapy eliminates infection and saves your natural tooth — completely painless with modern anaesthesia and rotary endodontics.', icon: '🦷', badge: 'Most Popular', img: 'images/root-canal.jpg', keywords: ['Painless', 'Same Day', 'Tooth Saving'] },
      { title: 'Dental Implants', subtitle: 'Permanent Tooth Replacement', desc: 'Replace missing teeth with titanium implants that look, feel, and function like natural teeth. Patients travel from across Karnataka for our expert implant solutions.', icon: '⚙️', badge: 'Advanced', img: 'images/dental-implants.jpg', keywords: ['Permanent', 'Natural Feel', 'Titanium'] },
      { title: 'Clear Aligners', subtitle: 'Invisible Orthodontics', desc: 'Straighten your teeth discreetly with custom-fitted clear aligners. No metal, no discomfort — just a confident smile at every stage of treatment.', icon: '✨', badge: 'Trending', img: 'images/braces.jpg', keywords: ['Invisible', 'Removable', 'Comfortable'] },
      { title: 'Teeth Fixing', subtitle: 'Crowns, Bridges & Veneers', desc: 'Restore broken, chipped, or damaged teeth with precision crowns, bridges, and veneers crafted for a perfect fit and natural appearance.', icon: '🔧', badge: '', img: 'images/smile.jpg', keywords: ['Crowns', 'Bridges', 'Veneers'] },
      { title: 'Smile Design', subtitle: 'Complete Smile Makeover', desc: 'Transform your smile with a personalized makeover combining whitening, veneers, contouring, and alignment — designed to complement your unique facial features.', icon: '😁', badge: 'Premium', img: 'images/smile-design.jpg', keywords: ['Makeover', 'Aesthetic', 'Personalized'] },
      { title: 'Braces', subtitle: 'Metal & Ceramic Orthodontics', desc: 'Correct misaligned teeth and bite issues with traditional metal or discreet ceramic braces. Our experienced orthodontist ensures precise, lasting results.', icon: '🔩', badge: '', img: 'images/braces.jpg', keywords: ['Metal', 'Ceramic', 'Precise'] },
      { title: 'Teeth Whitening', subtitle: 'Professional Bleaching', desc: 'Achieve a dazzling, movie-star smile with professional-grade teeth whitening that removes years of stains safely and effectively in just one session.', icon: '⭐', badge: 'Quick', img: 'images/smile-design.jpg', keywords: ['Bright', 'Safe', 'Instant Results'] },
      { title: 'Pediatric Dentistry', subtitle: 'Gentle Care for Children', desc: 'Specialized dental care for children in a warm, friendly environment. We make every visit fun and anxiety-free, building healthy habits from an early age.', icon: '👶', badge: 'Kid Friendly', img: 'images/root-canal.jpg', keywords: ['Children', 'Gentle', 'Preventive'] },
      { title: 'Laser Dentistry', subtitle: 'Precision Laser Treatments', desc: 'Advanced laser technology for gum treatments, cavity detection, and soft tissue procedures — faster healing, minimal discomfort, and superior precision.', icon: '🔬', badge: 'Hi-Tech', img: 'images/dental-implants.jpg', keywords: ['Laser', 'Precise', 'Fast Healing'] },
      { title: 'Tooth Extraction', subtitle: 'Painless & Safe Removal', desc: 'Simple and surgical tooth extractions performed with utmost care and precision. Our painless technique ensures a comfortable experience and quick recovery.', icon: '🩺', badge: '', img: 'images/root-canal.jpg', keywords: ['Painless', 'Safe', 'Quick Recovery'] },
      { title: 'Gum Treatment', subtitle: 'Periodontal Care', desc: 'Comprehensive treatment for gum disease, bleeding gums, and periodontitis. We restore gum health with deep cleaning, scaling, root planing, and laser therapy.', icon: '🌿', badge: '', img: 'images/smile.jpg', keywords: ['Scaling', 'Deep Clean', 'Gum Health'] },
      { title: 'Full Mouth Rehabilitation', subtitle: 'Complete Oral Restoration', desc: 'Comprehensive full-mouth reconstruction for patients with multiple dental issues — combining implants, crowns, bridges, and cosmetic treatments for a complete transformation.', icon: '🏆', badge: 'Comprehensive', img: 'images/smile-design.jpg', keywords: ['Full Mouth', 'Restoration', 'Transform'] },
      { title: 'Dentures', subtitle: 'Complete & Partial Dentures', desc: 'Custom-crafted complete and partial dentures that restore your smile and chewing function. Natural-looking, comfortable, and precisely fitted for everyday confidence.', icon: '😊', badge: '', img: 'images/smile.jpg', keywords: ['Complete', 'Partial', 'Custom Fit'] },
      { title: 'Teeth Sensitivity Treatment', subtitle: 'Relief from Sharp Pain', desc: 'Targeted treatment for sensitive teeth caused by enamel erosion, exposed roots, or worn fillings. Get lasting relief and enjoy hot and cold foods without discomfort.', icon: '❄️', badge: '', img: 'images/root-canal.jpg', keywords: ['Sensitivity', 'Relief', 'Enamel Care'] },
      { title: 'Dental X-Ray & Diagnosis', subtitle: 'Advanced Digital Imaging', desc: 'State-of-the-art digital X-rays and OPG scans for accurate, low-radiation diagnosis. Early detection of hidden problems ensures timely and effective treatment.', icon: '📷', badge: 'Digital', img: 'images/dental-implants.jpg', keywords: ['Digital X-Ray', 'OPG', 'Accurate'] }
    ];
  
    const servicesGrid = document.getElementById('services-grid');
    services.forEach((service, index) => {
      // Create keywords HTML
      let keywordsHtml = service.keywords.map(kw => `<span class="bg-teal-50 text-teal-700 text-xs px-2 py-0.5 rounded-full border border-teal-100">${kw}</span>`).join('');
      // Create badge HTML if it exists
      let badgeHtml = service.badge ? `<span class="absolute top-3 right-3 bg-amber-400 text-amber-900 text-xs font-bold px-2.5 py-1 rounded-full z-10">${service.badge}</span>` : '';
      
      servicesGrid.innerHTML += `
        <div class="scroll-reveal card-hover bg-white rounded-2xl border border-gray-100 shadow-md overflow-hidden group" style="transition-delay: ${(index % 4) * 0.1}s">
          <div class="relative h-44 overflow-hidden">
            <img src="${service.img}" alt="${service.title}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 relative z-0" />
            <div class="absolute inset-0 bg-gradient-to-t from-teal-950/70 to-transparent z-0"></div>
            ${badgeHtml}
            <div class="absolute bottom-3 left-3 text-2xl z-10">${service.icon}</div>
          </div>
          <div class="p-5">
            <h3 class="font-bold text-teal-900 text-lg mb-0.5">${service.title}</h3>
            <p class="text-teal-600 text-xs font-semibold mb-2">${service.subtitle}</p>
            <p class="text-gray-500 text-sm leading-relaxed mb-3">${service.desc}</p>
            <div class="flex flex-wrap gap-1.5">
              ${keywordsHtml}
            </div>
          </div>
        </div>
      `;
    });

    // Add the CTA Card to the end of the services grid
    servicesGrid.innerHTML += `
        <div class="scroll-reveal bg-gradient-to-br from-teal-700 to-teal-900 rounded-2xl p-6 flex flex-col justify-between text-white shadow-xl" style="transition-delay: 0.2s">
            <div>
              <p class="text-teal-300 text-sm font-semibold mb-2">Not sure which treatment?</p>
              <h3 class="font-serif text-2xl font-bold mb-3">Get a Free Consultation</h3>
              <p class="text-teal-100 text-sm leading-relaxed">
                Our experienced dental specialists will evaluate your needs and recommend the best treatment plan from our 15+ services.
              </p>
            </div>
            <a href="#home" class="mt-6 bg-white text-teal-800 font-bold py-3 rounded-xl text-center hover:bg-teal-50 transition-colors block">
              Book Free Consult →
            </a>
          </div>
    `;
  
    // 7. Inject ALL 6 Why Us Data
    const reasons = [
      { icon: 'cpu', title: 'State-of-the-Art Technology', desc: 'We invest in the latest dental technology — digital X-rays, rotary endodontics, laser dentistry, and CAD/CAM systems — ensuring precise, comfortable, and efficient treatments.', color: 'bg-blue-50 text-blue-600' },
      { icon: 'user-check', title: 'Experienced Specialists', desc: 'Our highly qualified dental team — led by Dr. Sachin and Dr. Soumya — brings years of specialized expertise in implants, orthodontics, cosmetic dentistry, and endodontics.', color: 'bg-teal-50 text-teal-600' },
      { icon: 'shield-check', title: 'Patient-First Approach', desc: 'Every treatment plan is tailored to your unique needs. We prioritize your comfort, explain each step clearly, and ensure you feel confident and cared for throughout.', color: 'bg-green-50 text-green-600' },
      { icon: 'clock', title: 'Flexible Timings', desc: 'Open daily from 10 AM–12 PM and 6 PM–9 PM, we accommodate your busy schedule. No more missing work for dental appointments — we work around your life.', color: 'bg-purple-50 text-purple-600' },
      { icon: 'dollar-sign', title: 'Transparent & Affordable Pricing', desc: 'Quality dental care shouldn\'t break the bank. We offer competitive, transparent pricing with no hidden costs — and flexible payment options for comprehensive treatments.', color: 'bg-amber-50 text-amber-600' },
      { icon: 'award', title: '4.9★ Trusted by 116+ Patients', desc: 'With 116+ five-star Google reviews and patients travelling from across Karnataka, Arpita Dental has earned Bidar\'s highest trust rating in dental care.', color: 'bg-rose-50 text-rose-600' }
    ];
  
    const whyUsGrid = document.getElementById('why-us-grid');
    reasons.forEach((reason, index) => {
      whyUsGrid.innerHTML += `
        <div class="scroll-reveal bg-white/10 backdrop-blur-sm border border-white/15 rounded-2xl p-6 hover:bg-white/15 transition-all duration-300 group" style="transition-delay: ${(index % 3) * 0.1}s">
          <div class="w-12 h-12 rounded-xl ${reason.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <i data-lucide="${reason.icon}"></i>
          </div>
          <h3 class="font-bold text-white text-lg mb-2">${reason.title}</h3>
          <p class="text-teal-200 text-sm leading-relaxed">${reason.desc}</p>
        </div>
      `;
    });
    
    // 8. Testimonials Slider Logic (Safe DOM Update Method)
    
    // We pre-define these classes so Tailwind CDN knows to compile them
    const colorClasses = ['bg-teal-500', 'bg-purple-500', 'bg-blue-500', 'bg-rose-500', 'bg-amber-500'];

    const testimonials = [
      { name: 'Rajesh Kumar', location: 'Bidar, Karnataka', treatment: 'Root Canal Treatment', text: 'I was terrified of root canals but Dr. Sachin made the entire experience completely painless. Two months later and I have zero discomfort. The single-visit RCT was a game-changer. Highly recommend Arpita Dental to anyone in Bidar!', initials: 'RK', color: 'bg-teal-500' },
      { name: 'Priya Sharma', location: 'Bidar, Karnataka', treatment: 'Clear Aligners', text: 'Dr. Soumya is absolutely brilliant! My clear aligner treatment has been going so smoothly. She explains every step and the results are already visible. The clinic is modern, clean, and the staff is so friendly. Best dental clinic in Bidar!', initials: 'PS', color: 'bg-purple-500' },
      { name: 'Mohammed Farooq', location: 'Zaheerabad → Bidar', treatment: 'Dental Implants', text: 'My mother travelled all the way from Zaheerabad specifically for implant treatment at Arpita Dental — and it was absolutely worth it. Dr. Sachin is an expert implantologist. The procedure was painless and the results are perfect. Thank you!', initials: 'MF', color: 'bg-blue-500' },
      { name: 'Sunita Patil', location: 'Bidar, Karnataka', treatment: 'Braces', text: 'Got braces for my teenage daughter and the experience has been excellent throughout. Dr. Soumya is very patient, explains everything clearly, and the results are amazing. Reasonable pricing and flexible appointment times make it very convenient.', initials: 'SP', color: 'bg-rose-500' },
      { name: 'Anil Reddy', location: 'Bidar, Karnataka', treatment: 'Smile Design', text: 'I always felt self-conscious about my smile. After a full smile design treatment at Arpita Dental, I can\'t stop smiling! The team is professional, uses the latest technology, and the pricing is very fair. Truly the best dental experience I\'ve had.', initials: 'AR', color: 'bg-amber-500' }
    ];
    
    let currentTestimonial = 0;
    let isAutoPlaying = true;

    // DOM Elements
    const testContainer = document.getElementById('testimonial-container');
    const testText = document.getElementById('test-text');
    const testInitials = document.getElementById('test-initials');
    const testName = document.getElementById('test-name');
    const testLocation = document.getElementById('test-location');
    const testTreatment = document.getElementById('test-treatment');
    const testDots = document.getElementById('test-dots');
  
    function renderTestimonial() {
      if (!testContainer) return;

      const t = testimonials[currentTestimonial];

      // Fade out
      testContainer.classList.remove('opacity-100');
      testContainer.classList.add('opacity-0');

      setTimeout(() => {
        // Update text content (leaves SVG icons perfectly intact)
        testText.textContent = `"${t.text}"`;
        testInitials.textContent = t.initials;
        
        // Remove old colors, add new color
        colorClasses.forEach(c => testInitials.classList.remove(c));
        testInitials.classList.add(t.color);

        testName.textContent = t.name;
        testLocation.textContent = t.location;
        testTreatment.textContent = t.treatment;

        updateDots();

        // Fade in
        testContainer.classList.remove('opacity-0');
        testContainer.classList.add('opacity-100');
      }, 150); // Matches the duration-300 transition roughly
    }
  
    function updateDots() {
      if (!testDots) return;
      testDots.innerHTML = '';
      testimonials.forEach((_, i) => {
        const activeClass = i === currentTestimonial ? 'w-8 bg-teal-600' : 'w-2.5 bg-teal-200 hover:bg-teal-400';
        testDots.innerHTML += `<button onclick="setSlide(${i})" class="h-2.5 rounded-full transition-all duration-300 ${activeClass}"></button>`;
      });
    }

    // Auto-advance
    setInterval(() => {
        if (isAutoPlaying) {
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
    
    // Initial Render
    renderTestimonial();
    });