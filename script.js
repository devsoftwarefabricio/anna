// DOM Content Loaded
document.addEventListener("DOMContentLoaded", () => {
  // Initialize all functions
  initScrollAnimations()
  initCounterAnimations()
  initSmoothScroll()
  initParallaxEffect()
  initTypingEffect()
  initClientsCarousel() // Inicializa o carrossel de clientes

  // Add loading animation
  document.body.style.opacity = "0"
  setTimeout(() => {
    document.body.style.transition = "opacity 0.5s ease"
    document.body.style.opacity = "1"
  }, 100)
})

// Scroll Animations
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible")

        // Add staggered animation for service cards
        if (entry.target.classList.contains("service-card")) {
          const delay = Array.from(entry.target.parentNode.children).indexOf(entry.target) * 200
          entry.target.style.transitionDelay = delay + "ms"
        }

        // Removido: staggered animation for client logos, agora gerenciado pelo carrossel
        // if (entry.target.classList.contains('client-logo')) {
        //     const delay = Array.from(entry.target.parentNode.children).indexOf(entry.target) * 100;
        //     entry.target.style.transitionDelay = delay + 'ms';
        // }
      }
    })
  }, observerOptions)

  // Add animation classes and observe elements
  const animatedElements = [
    { selector: ".service-card", class: "fade-in" },
    { selector: ".about-text", class: "slide-in-left" },
    { selector: ".about-visual", class: "slide-in-right" },
    // Removido: '.client-logo' do observer de scroll
    { selector: ".contact-info", class: "slide-in-left" },
    { selector: ".contact-visual", class: "slide-in-right" },
    // Novos elementos para animação de scroll
    { selector: ".image-text-visual", class: "slide-in-right" },
    { selector: ".image-text-info", class: "slide-in-left" },
  ]

  animatedElements.forEach(({ selector, class: className }) => {
    document.querySelectorAll(selector).forEach((el) => {
      el.classList.add(className)
      observer.observe(el)
    })
  })
}

// Counter Animations
function initCounterAnimations() {
  const counters = document.querySelectorAll(".stat-number")
  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const counter = entry.target
          const target = Number.parseInt(counter.getAttribute("data-count"))
          animateCounter(counter, target)
          counterObserver.unobserve(counter)
        }
      })
    },
    { threshold: 0.5 },
  )

  counters.forEach((counter) => {
    counterObserver.observe(counter)
  })
}

function animateCounter(element, target) {
  let current = 0
  const increment = target / 50
  const timer = setInterval(() => {
    current += increment
    if (current >= target) {
      current = target
      clearInterval(timer)
    }
    element.textContent = Math.floor(current)

    // Add % sign for percentage stats
    if (element.getAttribute("data-count") === "98") {
      element.textContent = Math.floor(current) + "%"
    }
  }, 40)
}

// Smooth Scroll for CTA buttons
function initSmoothScroll() {
  const ctaButtons = document.querySelectorAll(".btn-primary, .btn-secondary")

  ctaButtons.forEach((button) => {
    button.addEventListener("click", function (e) {
      e.preventDefault()

      if (this.textContent.includes("Serviços")) {
        document.querySelector(".services").scrollIntoView({
          behavior: "smooth",
          block: "start",
        })
      } else if (this.textContent.includes("Contato") || this.textContent.includes("Conosco")) {
        document.querySelector(".contact").scrollIntoView({
          behavior: "smooth",
          block: "start",
        })
      }
    })
  })
}

// Parallax Effect for Hero Section
function initParallaxEffect() {
  window.addEventListener("scroll", () => {
    const scrolled = window.pageYOffset
    const parallaxElements = document.querySelectorAll(".geometric-shapes .shape")

    parallaxElements.forEach((element, index) => {
      const speed = 0.5 + index * 0.1
      element.style.transform = `translateY(${scrolled * speed}px) rotate(${scrolled * 0.1}deg)`
    })

    // Hero content parallax
    const heroContent = document.querySelector(".hero-content")
    if (heroContent && scrolled < window.innerHeight) {
      heroContent.style.transform = `translateY(${scrolled * 0.3}px)`
    }
  })
}

// Typing Effect for Hero Title
function initTypingEffect() {
  const heroTitle = document.querySelector(".hero-title")
  if (!heroTitle) return

  const text = heroTitle.textContent
  heroTitle.textContent = ""
  heroTitle.style.borderRight = "2px solid white"

  let i = 0
  const typeWriter = () => {
    if (i < text.length) {
      heroTitle.textContent += text.charAt(i)
      i++
      setTimeout(typeWriter, 50)
    } else {
      // Remove cursor after typing is complete
      setTimeout(() => {
        heroTitle.style.borderRight = "none"
      }, 1000)
    }
  }

  // Start typing effect after hero loads
  setTimeout(typeWriter, 1500)
}

// Service Cards Hover Effect
document.querySelectorAll(".service-card").forEach((card) => {
  card.addEventListener("mouseenter", function () {
    this.style.transform = "translateY(-15px) scale(1.02)"
  })

  card.addEventListener("mouseleave", function () {
    this.style.transform = "translateY(0) scale(1)"
  })
})

// Removido: Client Logo Click Effect, agora gerenciado pelo carrossel
// document.querySelectorAll('.client-logo').forEach(logo => {
//     logo.addEventListener('click', function() {
//         this.style.transform = 'scale(0.95)';
//         setTimeout(() => {
//             this.style.transform = 'scale(1)';
//         }, 150);
//     });
// });

// Floating Cards Animation Enhancement
function enhanceFloatingCards() {
  const floatingCards = document.querySelectorAll(".floating-card")

  floatingCards.forEach((card, index) => {
    // Add mouse interaction
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-10px) scale(1.05)"
      this.style.boxShadow = "0 20px 40px rgba(0, 0, 0, 0.2)"
    })

    card.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0) scale(1)"
      this.style.boxShadow = "0 10px 30px rgba(0, 0, 0, 0.1)"
    })

    // Add random floating movement
    setInterval(
      () => {
        const randomX = (Math.random() - 0.5) * 10
        const randomY = (Math.random() - 0.5) * 10

        if (!card.matches(":hover")) {
          card.style.transform += ` translate(${randomX}px, ${randomY}px)`

          setTimeout(() => {
            if (!card.matches(":hover")) {
              card.style.transform = card.style.transform.replace(/ translate$$[^)]*$$/, "")
            }
          }, 2000)
        }
      },
      3000 + index * 1000,
    )
  })
}

// Initialize enhanced floating cards
setTimeout(enhanceFloatingCards, 2000)

// Header scroll effect (if you want to add a sticky header later)
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset

  // Add body class for scroll-based styling
  if (scrolled > 100) {
    document.body.classList.add("scrolled")
  } else {
    document.body.classList.remove("scrolled")
  }
})

// Performance optimization: Throttle scroll events
function throttle(func, limit) {
  let inThrottle
  return function () {
    const args = arguments

    if (!inThrottle) {
      func.apply(this, args)
      inThrottle = true
      setTimeout(() => (inThrottle = false), limit)
    }
  }
}

// Apply throttling to scroll events
const throttledScroll = throttle(() => {
  initParallaxEffect()
}, 16) // ~60fps

window.addEventListener("scroll", throttledScroll)

// Add loading states for better UX
function showLoading(element) {
  element.style.opacity = "0.7"
  element.style.pointerEvents = "none"
}

function hideLoading(element) {
  element.style.opacity = "1"
  element.style.pointerEvents = "auto"
}

// WhatsApp button click tracking
document.querySelector(".whatsapp-btn")?.addEventListener("click", function () {
  // Add analytics tracking here if needed
  console.log("WhatsApp button clicked")

  // Add click animation
  this.style.transform = "scale(0.9)"
  setTimeout(() => {
    this.style.transform = "scale(1.1)"
  }, 100)
  setTimeout(() => {
    this.style.transform = "scale(1)"
  }, 200)
})

// Add intersection observer for contact section email animation
const contactObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const contactItems = entry.target.querySelectorAll(".contact-item")
        contactItems.forEach((item, index) => {
          setTimeout(() => {
            item.style.transform = "translateX(0)"
            item.style.opacity = "1"
          }, index * 200)
        })
      }
    })
  },
  { threshold: 0.3 },
)

// Observe contact section
const contactSection = document.querySelector(".contact-info")
if (contactSection) {
  // Initially hide contact items
  const contactItems = contactSection.querySelectorAll(".contact-item")
  contactItems.forEach((item) => {
    item.style.transform = "translateX(-30px)"
    item.style.opacity = "0"
    item.style.transition = "all 0.6s ease"
  })

  contactObserver.observe(contactSection)
}

// Add dynamic background particles
function createParticles() {
  const hero = document.querySelector(".hero")
  const particleCount = 50

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement("div")
    particle.className = "particle"
    particle.style.cssText = `
          position: absolute;
          width: 2px;
          height: 2px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 50%;
          left: ${Math.random() * 100}%;
          top: ${Math.random() * 100}%;
          animation: float ${3 + Math.random() * 4}s ease-in-out infinite;
          animation-delay: ${Math.random() * 2}s;
      `

    hero.appendChild(particle)
  }
}

// Initialize particles after a delay
setTimeout(createParticles, 1000)

// Add custom cursor effect for service cards
document.querySelectorAll(".service-card, .cta-buttons button").forEach((element) => {
  element.addEventListener("mouseenter", () => {
    document.body.style.cursor = "pointer"
  })

  element.addEventListener("mouseleave", () => {
    document.body.style.cursor = "default"
  })
})

// Error handling for missing elements
window.addEventListener("error", (e) => {
  console.warn("Non-critical error:", e.message)
})

// Add resize handler for responsive animations
window.addEventListener(
  "resize",
  throttle(() => {
    // Recalculate animations on resize
    const isMobile = window.innerWidth <= 768

    if (isMobile) {
      // Disable heavy animations on mobile
      document.querySelectorAll(".shape").forEach((shape) => {
        shape.style.animation = "none"
      })
    } else {
      // Re-enable animations on desktop
      document.querySelectorAll(".shape").forEach((shape) => {
        shape.style.animation = ""
      })
    }
    // Recalculate carousel on resize
    initClientsCarousel()
  }, 250),
)

// Clients Carousel Logic
function initClientsCarousel() {
  const carouselTrack = document.querySelector(".carousel-track")
  const clientLogos = document.querySelectorAll(".client-logo")
  // Removido: prevButton, nextButton
  const paginationContainer = document.querySelector(".carousel-pagination")

  if (!carouselTrack || clientLogos.length === 0 || !paginationContainer) {
    console.warn("Carousel elements not found or no logos to display.")
    return
  }

  let currentIndex = 0
  let itemsPerPage = 3 // Default for desktop
  let autoSlideInterval

  const updateItemsPerPage = () => {
    if (window.innerWidth <= 480) {
      itemsPerPage = 1
    } else if (window.innerWidth <= 768) {
      itemsPerPage = 2
    } else {
      itemsPerPage = 3
    }
    // Ensure currentIndex is valid after resize
    if (currentIndex >= Math.ceil(clientLogos.length / itemsPerPage)) {
      currentIndex = Math.max(0, Math.ceil(clientLogos.length / itemsPerPage) - 1)
    }
    goToSlide(currentIndex)
    createPaginationDots()
  }

  const goToSlide = (index) => {
    const totalSlides = Math.ceil(clientLogos.length / itemsPerPage)
    if (index < 0) {
      currentIndex = totalSlides - 1
    } else if (index >= totalSlides) {
      currentIndex = 0
    } else {
      currentIndex = index
    }

    // Calcula o offset baseado na largura do track e no número de itens por página
    // Multiplica pelo currentIndex para mover para o slide correto
    const offset = currentIndex * (carouselTrack.offsetWidth / itemsPerPage)
    carouselTrack.style.transform = `translateX(-${offset}px)`
    updatePaginationDots()
  }

  const nextSlide = () => {
    goToSlide(currentIndex + 1)
  }

  // Removido: prevSlide

  const createPaginationDots = () => {
    paginationContainer.innerHTML = ""
    const totalSlides = Math.ceil(clientLogos.length / itemsPerPage)
    for (let i = 0; i < totalSlides; i++) {
      const dot = document.createElement("div")
      dot.classList.add("pagination-dot")
      if (i === currentIndex) {
        dot.classList.add("active")
      }
      dot.addEventListener("click", () => {
        stopAutoSlide() // Para o auto-slide ao clicar no dot
        goToSlide(i)
        startAutoSlide() // Reinicia o auto-slide
      })
      paginationContainer.appendChild(dot)
    }
  }

  const updatePaginationDots = () => {
    document.querySelectorAll(".pagination-dot").forEach((dot, index) => {
      if (index === currentIndex) {
        dot.classList.add("active")
      } else {
        dot.classList.remove("active")
      }
    })
  }

  const startAutoSlide = () => {
    clearInterval(autoSlideInterval)
    autoSlideInterval = setInterval(nextSlide, 3000) // Slide a cada 3 segundos
  }

  const stopAutoSlide = () => {
    clearInterval(autoSlideInterval)
  }

  // Removido: Event Listeners para prevButton e nextButton

  // Initial setup
  updateItemsPerPage() // Define itemsPerPage e cria os dots
  goToSlide(0) // Garante que o carrossel comece na primeira posição
  startAutoSlide()

  // Pause auto-slide on hover
  carouselTrack.addEventListener("mouseenter", stopAutoSlide)
  carouselTrack.addEventListener("mouseleave", startAutoSlide)

  // Recalculate on window resize
  window.removeEventListener("resize", throttledScroll) // Remove o listener antigo para evitar duplicação
  window.addEventListener(
    "resize",
    throttle(() => {
      updateItemsPerPage()
      goToSlide(currentIndex) // Reajusta a posição do slide atual
    }, 250),
  )
}
