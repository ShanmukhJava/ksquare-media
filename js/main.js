// Main JavaScript File

document.addEventListener("DOMContentLoaded", function () {
  // Initialize AOS (Animate On Scroll) library
  AOS.init({
    duration: 800,
    easing: "ease",
    once: true,
    offset: 100,
  });

  // Mobile Navigation Toggle
  const hamburger = document.querySelector(".hamburger");
  const navLinks = document.querySelector(".nav-links");

  if (hamburger) {
    hamburger.addEventListener("click", () => {
      hamburger.classList.toggle("active");
      navLinks.classList.toggle("active");
    });
  }

  // Close mobile menu when clicking on a nav link
  const navItems = document.querySelectorAll(".nav-links li a");
  navItems.forEach((item) => {
    item.addEventListener("click", () => {
      if (hamburger.classList.contains("active")) {
        hamburger.classList.remove("active");
        navLinks.classList.remove("active");
      }
    });
  });

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      if (targetId === "#") return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 70,
          behavior: "smooth",
        });
      }
    });
  });

  // Scroll to Top Button Functionality
  const scrollToTopButton = document.querySelector(".scroll-to-top");

  if (scrollToTopButton) {
    // Show/hide button based on scroll position
    window.addEventListener("scroll", () => {
      if (window.pageYOffset > 300) {
        scrollToTopButton.classList.add("visible");
      } else {
        scrollToTopButton.classList.remove("visible");
      }
    });

    // Scroll to top when button is clicked
    scrollToTopButton.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  }

  // Testimonial Slider Functionality
  const testimonialDots = document.querySelectorAll(".testimonial-dots .dot");
  if (testimonialDots.length > 0) {
    // Sample testimonial data (in a real application, this would come from a database or API)
    const testimonials = [
      {
        content:
          "KSquare Media transformed our online presence completely. Their team's expertise in digital marketing helped us increase our customers rate and brand visibility significantly.",
        author: " Veda Vyas Yoga Studio ",
        position: "Founder, Tadepalli",
        image: "images/vedavyas.jpg",
      },
      {
        content:
          "Working with KSquare Media was a game-changer for our business. Their innovative strategies and attention to detail helped us establish a strong brand identity in a competitive market.",
        author: "Apple schools",
        position: "Marketing Director, Apple Schools",
        image: "images/applelogo.jpg",
      },
      //   {
      //     content:
      //       "The team at KSquare Media understands the local market dynamics perfectly. Their SEO and content strategies helped us rank #1 for our key service areas in Andhra Pradesh.",
      //     author: "Venkat Reddy",
      //     position: "Founder, Local Services Co.",
      //     image: "https://randomuser.me/api/portraits/men/67.jpg",
      //   },
    ];

    const testimonialContent = document.querySelector(".testimonial-content p");
    const authorName = document.querySelector(".author-info h4");
    const authorPosition = document.querySelector(".author-info p");
    const authorImage = document.querySelector(".testimonial-author img");
    // Show the first testimonial on initial load
    if (testimonialContent)
      testimonialContent.textContent = testimonials[0].content;
    if (authorName) authorName.textContent = testimonials[0].author;
    if (authorPosition) authorPosition.textContent = testimonials[0].position;
    if (authorImage) authorImage.src = testimonials[0].image;

    // Add click event to dots
    testimonialDots.forEach((dot, index) => {
      dot.addEventListener("click", () => {
        // Update active dot
        testimonialDots.forEach((d) => d.classList.remove("active"));
        dot.classList.add("active");

        // Update testimonial content with animation
        const testimonialItem = document.querySelector(".testimonial-item");
        testimonialItem.style.opacity = "0";
        testimonialItem.style.transform = "translateX(20px)";

        setTimeout(() => {
          // Update content
          if (testimonialContent)
            testimonialContent.textContent = testimonials[index].content;
          if (authorName) authorName.textContent = testimonials[index].author;
          if (authorPosition)
            authorPosition.textContent = testimonials[index].position;
          if (authorImage) authorImage.src = testimonials[index].image;

          // Animate back in
          testimonialItem.style.opacity = "1";
          testimonialItem.style.transform = "translateX(0)";
        }, 300);
      });
    });

    // Auto-rotate testimonials every 5 seconds
    let currentTestimonial = 0;
    const autoRotate = setInterval(() => {
      currentTestimonial = (currentTestimonial + 1) % testimonials.length;
      testimonialDots[currentTestimonial].click();
    }, 5000);

    // Stop rotation when user interacts with dots
    testimonialDots.forEach((dot) => {
      dot.addEventListener("click", () => {
        clearInterval(autoRotate);
      });
    });
  }

  // Form submission handling
  const appointmentForm = document.getElementById("appointmentForm");
  if (appointmentForm) {
    appointmentForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Get form data
      const formData = new FormData(this);
      const formDataObj = {};
      formData.forEach((value, key) => {
        formDataObj[key] = value;
      });

      // Here you would typically send the data to a server
      // For now, we'll just show a success message
      console.log("Form Data:", formDataObj);

      // Show success message
      const successMessage = document.createElement("div");
      successMessage.className = "success-message";
      successMessage.innerHTML = `
                <div class="success-icon">
                    <i class="fas fa-check-circle"></i>
                </div>
                <h3>Appointment Booked Successfully!</h3>
                <p>Thank you for booking an appointment with us. We will contact you shortly to confirm your appointment.</p>
            `;

      // Replace form with success message
      appointmentForm.innerHTML = "";
      appointmentForm.appendChild(successMessage);

      // Apply animation
      successMessage.style.animation = "fadeIn 0.5s ease-in-out";
    });
  }

  // Testimonial Slider (if needed for more testimonials)
  // This is a placeholder for a more complex slider implementation
  const testimonialCards = document.querySelectorAll(".testimonial-card");
  let currentTestimonial = 0;

  function showTestimonial(index) {
    testimonialCards.forEach((card, i) => {
      if (i === index) {
        card.style.display = "block";
        card.style.animation = "fadeIn 0.5s ease-in-out";
      } else {
        card.style.display = "none";
      }
    });
  }

  // Only initialize slider if there are more than 3 testimonials and screen is small
  if (testimonialCards.length > 3 && window.innerWidth < 768) {
    // Hide all testimonials except the first one
    testimonialCards.forEach((card, index) => {
      if (index !== 0) {
        card.style.display = "none";
      }
    });

    // Create navigation buttons
    const sliderNav = document.createElement("div");
    sliderNav.className = "slider-nav";
    sliderNav.innerHTML = `
            <button class="prev-btn"><i class="fas fa-chevron-left"></i></button>
            <button class="next-btn"><i class="fas fa-chevron-right"></i></button>
        `;

    const testimonialSlider = document.querySelector(".testimonial-slider");
    if (testimonialSlider) {
      testimonialSlider.appendChild(sliderNav);

      // Add event listeners to buttons
      const prevBtn = document.querySelector(".prev-btn");
      const nextBtn = document.querySelector(".next-btn");

      prevBtn.addEventListener("click", () => {
        currentTestimonial =
          (currentTestimonial - 1 + testimonialCards.length) %
          testimonialCards.length;
        showTestimonial(currentTestimonial);
      });

      nextBtn.addEventListener("click", () => {
        currentTestimonial = (currentTestimonial + 1) % testimonialCards.length;
        showTestimonial(currentTestimonial);
      });
    }
  }

  // Scroll to top button
  const scrollTopBtn = document.createElement("button");
  scrollTopBtn.className = "scroll-top-btn";
  scrollTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
  document.body.appendChild(scrollTopBtn);

  // Show/hide scroll to top button based on scroll position
  window.addEventListener("scroll", () => {
    if (window.pageYOffset > 300) {
      scrollTopBtn.classList.add("show");
    } else {
      scrollTopBtn.classList.remove("show");
    }
  });

  // Scroll to top when button is clicked
  scrollTopBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  // Add scroll reveal animation to elements
  const revealElements = document.querySelectorAll(".reveal");

  function checkReveal() {
    const windowHeight = window.innerHeight;
    const revealPoint = 150;

    revealElements.forEach((element) => {
      const elementTop = element.getBoundingClientRect().top;

      if (elementTop < windowHeight - revealPoint) {
        element.classList.add("active");
      }
    });
  }

  // Initial check
  checkReveal();

  // Check on scroll
  window.addEventListener("scroll", checkReveal);

  // Add staggered animation to list items
  const staggerItems = document.querySelectorAll(".stagger-item");

  function checkStagger() {
    const windowHeight = window.innerHeight;
    const revealPoint = 150;

    staggerItems.forEach((item) => {
      const itemTop = item.getBoundingClientRect().top;

      if (itemTop < windowHeight - revealPoint) {
        item.classList.add("active");
      }
    });
  }

  // Initial check
  checkStagger();

  // Check on scroll
  window.addEventListener("scroll", checkStagger);

  // Add CSS class for styling the scroll to top button
  const style = document.createElement("style");
  style.textContent = `
        .scroll-top-btn {
            position: fixed;
            bottom: 30px;
            right: 30px;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background: linear-gradient(135deg, #4a00e0, #8e2de2);
            color: #fff;
            border: none;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.2rem;
            box-shadow: 0 4px 15px rgba(138, 45, 226, 0.3);
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
            z-index: 999;
        }
        
        .scroll-top-btn.show {
            opacity: 1;
            visibility: visible;
        }
        
        .scroll-top-btn:hover {
            transform: translateY(-5px);
            box-shadow: 0 8px 20px rgba(138, 45, 226, 0.4);
        }
        
        .success-message {
            text-align: center;
            padding: 30px;
        }
        
        .success-icon {
            font-size: 4rem;
            color: #4CAF50;
            margin-bottom: 20px;
        }
        
        .success-message h3 {
            font-size: 1.5rem;
            margin-bottom: 15px;
            color: #333;
        }
        
        .success-message p {
            color: #666;
        }
        
        .slider-nav {
            display: flex;
            justify-content: center;
            margin-top: 20px;
        }
        
        .slider-nav button {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            background: linear-gradient(135deg, #4a00e0, #8e2de2);
            color: #fff;
            border: none;
            cursor: pointer;
            margin: 0 5px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1rem;
            box-shadow: 0 4px 15px rgba(138, 45, 226, 0.3);
            transition: all 0.3s ease;
        }
        
        .slider-nav button:hover {
            transform: translateY(-3px);
            box-shadow: 0 8px 20px rgba(138, 45, 226, 0.4);
        }
    `;
  document.head.appendChild(style);
});
