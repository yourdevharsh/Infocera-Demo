document.addEventListener("DOMContentLoaded", () => {  
  // --- Mobile Menu Toggle ---
  const mobileMenuBtn = document.getElementById("mobileMenuBtn");
  const mobileMenu = document.getElementById("mobileMenu");
  let isMenuOpen = false;

  mobileMenuBtn.addEventListener("click", () => {
    isMenuOpen = !isMenuOpen;
    if (isMenuOpen) {
      mobileMenu.classList.remove("opacity-0", "pointer-events-none", "translate-y-[-20px]");
      mobileMenu.classList.add("opacity-100", "translate-y-0");
      // Change icon to 'X'
      mobileMenuBtn.innerHTML = `<svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"></path></svg>`;
    } else {
      mobileMenu.classList.add("opacity-0", "pointer-events-none", "translate-y-[-20px]");
      mobileMenu.classList.remove("opacity-100", "translate-y-0");
      // Change icon back to hamburger
      mobileMenuBtn.innerHTML = `<svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16m-7 6h7"></path></svg>`;
    }
  });

  // --- Scroll Animations (Intersection Observer) ---
  const animateElements = document.querySelectorAll('.animate-on-scroll');
  
  // Set initial state via JS so users without JS see content perfectly normally
  animateElements.forEach(el => {
    el.classList.add('opacity-0', 'translate-y-12', 'transition-all', 'duration-1000', 'ease-out');
  });

  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Add a slight delay for better feel on entry
        setTimeout(() => {
          entry.target.classList.remove('opacity-0', 'translate-y-12');
          entry.target.classList.add('opacity-100', 'translate-y-0');
        }, 50);
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  animateElements.forEach(el => observer.observe(el));

  // --- Carousel Logic ---
  const track = document.getElementById("carouselTrack");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
  const indicator = document.getElementById("pageIndicator");
  
  if (track && prevBtn && nextBtn && indicator) {
    const totalCards = track.children.length;
    let currentPage = 1;

    function getCardsPerPage() {
      if (window.innerWidth >= 1024) return 3; // Desktop
      if (window.innerWidth >= 768) return 2; // Tablet
      return 1; // Mobile
    }

    function updateCarousel() {
      const cardsPerPage = getCardsPerPage();
      const totalPages = Math.ceil(totalCards / cardsPerPage);

      if (currentPage > totalPages) currentPage = totalPages;

      const translateX = -(currentPage - 1) * 100;
      track.style.transform = `translateX(${translateX}%)`;

      indicator.textContent = `${currentPage} / ${totalPages}`;
      prevBtn.disabled = currentPage === 1;
      nextBtn.disabled = currentPage === totalPages;
    }

    prevBtn.addEventListener("click", () => {
      if (currentPage > 1) {
        currentPage--;
        updateCarousel();
      }
    });

    nextBtn.addEventListener("click", () => {
      const totalPages = Math.ceil(totalCards / getCardsPerPage());
      if (currentPage < totalPages) {
        currentPage++;
        updateCarousel();
      }
    });

    window.addEventListener("resize", updateCarousel);
    updateCarousel();
  }

  // --- Footer Date ---
  const dateSpan = document.getElementById("todayDate");
  if (dateSpan) {
    dateSpan.textContent = new Date().getFullYear();
  }
});