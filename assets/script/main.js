/*********************************************************
 * Animation on scroll
 ********************************************************/

/*********************************************************
 * preloader
 ********************************************************/

document.addEventListener('DOMContentLoaded', function () {
    const loader = document.getElementById('loader');
    const content = document.getElementById('mainContent');

    setTimeout(() => {
        loader.classList.add('hidden');
        content.classList.add('loaded');

        
        AOS.init({
            duration: 1100,
            easing: "ease-in-out",
            once: false,
            mirror: true
        });
        
        document.querySelectorAll('[data-bs-toggle="pill"]').forEach(tab => {
            tab.addEventListener('shown.bs.tab', () => {
                AOS.refresh();
            });
        });

        const style = document.createElement('style');
        style.textContent = `
            [data-aos="reverse-fade"] {
                opacity: 1;
                transition-property: opacity, transform;
            }
            
            [data-aos="reverse-fade"].aos-animate {
                opacity: 0;
            }
            
            [data-aos="reverse-slide"] {
                transform: translateX(0);
                opacity: 1;
                transition-property: opacity, transform;
            }
            
            [data-aos="reverse-slide"].aos-animate {
                transform: translateX(-100px);
                opacity: 0;
            }
            
            .reverse-animate {
                opacity: 0;
                transform: translateX(-100px);
            }
            
            @keyframes reverseAnimation {
                from {
                    opacity: 0;
                    transform: translateX(-100px);
                }
                to {
                    opacity: 1;
                    transform: translateX(0);
                }
            }
        `;
        document.head.appendChild(style);

        const elements = document.querySelectorAll('.reverse-animate');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animation = 'reverseAnimation 1s ease-in-out forwards';
                } else {
                    entry.target.style.animation = 'reverseAnimation 1s ease-in-out reverse';
                }
            });
        }, {
            threshold: 0.5
        });

        elements.forEach(element => observer.observe(element));

    }, 3000);
});

/*********************************************************
 JavaScript to handle the scroll event
 ********************************************************/
window.addEventListener('scroll', function () {
    var navbar = document.querySelector('.navbar-custom');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

/*********************************************************
  Product Card
 ********************************************************/
 const productCards = document.querySelectorAll(".product-card");
 const nameInput = document.getElementById("name");

 productCards.forEach(card => {
     card.addEventListener("click", () => {
         nameInput.focus();
     });
 });

/*********************************************************
  Gallery Redirect
 ********************************************************/

  document.querySelectorAll('.home-gallery-item').forEach(item => {
    item.addEventListener('click', () => {
        window.location.href = './gallery.html';
    });
});

const galleryItems = document.getElementsByClassName('home-gallery-item');
for (let i = 0; i < galleryItems.length; i++) {
    galleryItems[i].addEventListener('click', () => {
        window.location.href = './gallery.html';
    });
}


/*********************************************************
  Founder Card Hover Animation script
 ********************************************************/

  document.querySelectorAll('.founder-card').forEach(card => {
    const image = card.querySelector('.founder-image');
    const container = card.querySelector('.founder-image-container');
    const infoBtn = card.querySelector('.founder-info-btn');
  
    // Desktop: Tilt and parallax on mousemove
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      const tiltX = (y / rect.height) * 20;
      const tiltY = -(x / rect.width) * 20;
      const parallaxY = -(y / rect.height) * 10;
      card.style.transform = `translateY(-12px) scale(1.03) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
      image.style.transform = `scale(1.15) translateY(${parallaxY - 8}px)`;
      card.classList.add('tilt');
    });
  
    // Desktop: Reset on mouseleave
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'translateY(0) scale(1)';
      image.style.transform = 'scale(1) translateY(0)';
      card.classList.remove('tilt');
      container.classList.remove('active');
    });
  
    // Mobile/Tablet: Toggle overlay on button click
    if (infoBtn) {
      infoBtn.addEventListener('click', () => {
        const isActive = container.classList.contains('active');
        container.classList.toggle('active');
        infoBtn.setAttribute('aria-expanded', !isActive);
        // Reset card transform to avoid tilt interference
        card.style.transform = 'translateY(0) scale(1)';
        card.classList.remove('tilt');
      });
    }
  });