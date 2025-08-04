// DOM Content Loaded
document.addEventListener("DOMContentLoaded", () => {
  // Initialize all functions
  initScrollAnimations()
  initCounterAnimations()
  initSmoothScroll()
  initParallaxEffect()
  initTypingEffect()
  initClientsCarousel() // Inicializa o carrossel de clientes com a nova lógica

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
      }
    })
  }, observerOptions)

  // Add animation classes and observe elements
  const animatedElements = [
    { selector: ".service-card", class: "fade-in" },
    { selector: ".about-text", class: "slide-in-left" },
    { selector: ".about-visual", class: "slide-in-right" },
    { selector: ".contact-info", class: "slide-in-left" },
    { selector: ".contact-visual", class: "slide-in-right" },
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
              card.style.transform = card.style.transform.replace(/ translate\(.+?\)/, "")
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

// Header scroll effect
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset
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
    const context = this
    if (!inThrottle) {
      func.apply(context, args)
      inThrottle = true
      setTimeout(() => (inThrottle = false), limit)
    }
  }
}

// Apply throttling to scroll events
const throttledScroll = throttle(initParallaxEffect, 16) // ~60fps
window.addEventListener("scroll", throttledScroll)

// Loading states
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
  console.log("WhatsApp button clicked")
  this.style.transform = "scale(0.9)"
  setTimeout(() => {
    this.style.transform = "scale(1.1)"
  }, 100)
  setTimeout(() => {
    this.style.transform = "scale(1)"
  }, 200)
})

// Intersection observer for contact section email animation
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

const contactSection = document.querySelector(".contact-info")
if (contactSection) {
  const contactItems = contactSection.querySelectorAll(".contact-item")
  contactItems.forEach((item) => {
    item.style.transform = "translateX(-30px)"
    item.style.opacity = "0"
    item.style.transition = "all 0.6s ease"
  })
  contactObserver.observe(contactSection)
}

// Dynamic background particles
function createParticles() {
  const hero = document.querySelector(".hero")
  if (!hero) return
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
setTimeout(createParticles, 1000)

// Custom cursor effect
document.querySelectorAll(".service-card, .cta-buttons button").forEach((element) => {
  element.addEventListener("mouseenter", () => {
    document.body.style.cursor = "pointer"
  })
  element.addEventListener("mouseleave", () => {
    document.body.style.cursor = "default"
  })
})

// Error handling
window.addEventListener("error", (e) => {
  console.warn("Non-critical error:", e.message)
})

// ===================================================================
// NOVA LÓGICA DO CARROSSEL DE CLIENTES
// ===================================================================
function initClientsCarousel() {
  const carouselContainer = document.querySelector(".carousel-container")
  const carouselTrack = document.querySelector(".carousel-track")
  const clientLogos = document.querySelectorAll(".client-logo")
  const paginationContainer = document.querySelector(".carousel-pagination")

  if (!carouselTrack || clientLogos.length === 0 || !paginationContainer) {
    console.warn("Carousel elements not found or no logos to display.")
    return
  }

  let currentIndex = 0
  let itemsPerPage = 3
  let autoSlideInterval
  let autoSlideDuration = 3000 // Valor padrão para a velocidade do slide

  // Função para parar o slide automático
  const stopAutoSlide = () => {
    clearInterval(autoSlideInterval)
  }

  // Função para (re)iniciar o slide automático
  const startAutoSlide = () => {
    stopAutoSlide() // Limpa qualquer intervalo anterior para evitar múltiplos timers
    autoSlideInterval = setInterval(nextSlide, autoSlideDuration)
  }

  // Função que atualiza as configurações do carrossel com base no tamanho da tela
  const updateCarouselSettings = () => {
    if (window.innerWidth <= 480) {
      itemsPerPage = 1
      autoSlideDuration = 5000 // Mais lento em celulares (5 segundos)
    } else if (window.innerWidth <= 768) {
      itemsPerPage = 2
      autoSlideDuration = 4000 // Velocidade intermediária em tablets (4 segundos)
    } else {
      itemsPerPage = 3
      autoSlideDuration = 3000 // Padrão em desktops (3 segundos)
    }

    // Garante que o índice atual seja válido após o redimensionamento
    const totalSlides = Math.ceil(clientLogos.length / itemsPerPage)
    if (currentIndex >= totalSlides) {
      currentIndex = Math.max(0, totalSlides - 1)
    }

    createPaginationDots() // Recria os pontos de paginação
    goToSlide(currentIndex) // Vai para o slide correto
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

    // Calcula o deslocamento com base na largura do container
    const offset = currentIndex * carouselContainer.offsetWidth
    carouselTrack.style.transform = `translateX(-${offset}px)`
    updatePaginationDots()
  }

  const nextSlide = () => {
    goToSlide(currentIndex + 1)
  }

  const createPaginationDots = () => {
    paginationContainer.innerHTML = ""
    const totalSlides = Math.ceil(clientLogos.length / itemsPerPage)
    if (totalSlides <= 1) return; // Não mostra a paginação se houver apenas uma página

    for (let i = 0; i < totalSlides; i++) {
      const dot = document.createElement("div")
      dot.classList.add("pagination-dot")
      dot.addEventListener("click", () => {
        goToSlide(i)
        startAutoSlide() // Reinicia o timer ao clicar em um ponto
      })
      paginationContainer.appendChild(dot)
    }
    updatePaginationDots()
  }

  const updatePaginationDots = () => {
    const dots = document.querySelectorAll(".pagination-dot")
    dots.forEach((dot, index) => {
      dot.classList.toggle("active", index === currentIndex)
    })
  }

  // Listeners de eventos
  carouselContainer.addEventListener("mouseenter", stopAutoSlide)
  carouselContainer.addEventListener("mouseleave", startAutoSlide)

  // Listener de redimensionamento da janela
  window.addEventListener("resize", throttle(() => {
    stopAutoSlide()
    updateCarouselSettings()
    startAutoSlide() // Reinicia com a nova duração
  }, 250)
  )

  // Configuração inicial
  updateCarouselSettings()
  startAutoSlide()
}