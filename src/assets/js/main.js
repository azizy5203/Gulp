let heroSwiper;
function initHeroSwiper() {
  heroSwiper = new Swiper(".hero-swiper__swiper", {
    slidesPerView: 1,
    loop: true,
    speed: 1500,
    // parallax: true,
    effect: "fade",
    fadeEffect: { crossFade: true },
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
  });
}

let clientsSwiper;
function initClientsSwiper() {
  clientsSwiper = new Swiper(".clients-swiper__swiper", {
    loop: true,
    slidesPerView: "auto",
    spaceBetween: 0,
    centeredSlides: true,
    speed: 6500,
    autoplay: {
      delay: 1,
      disableOnInteraction: false,
    },
    allowTouchMove: false,
    disableOnInteraction: true,
  });
}

let tabsSwiper;
function initTabsSwiper() {
  tabsSwiper = new Swiper(".tabs-swiper__swiper", {
    loop: true,
    slidesPerView: 1,
    effect: "fade",
    fadeEffect: { crossFade: true },
    parallax: true,
    autoplay: false,
    spaceBetween: 0,
    autoHeight: true,
    speed: 800,
    simulateTouch: false,
    pagination: {
      el: ".tabs-swiper__pagination",
      // type: "bullets",
      clickable: true,
      renderBullet: function (index, className) {
        return `<span class="${className}">Page no.${index + 1}</span>`;
      },
    },
    // navigation: {
    //   nextEl: ".tabs-swiper__pagination-next",
    //   prevEl: ".tabs-swiper__pagination-prev",
    // },
  });
}

// const sections = document.querySelectorAll("section");
// const navLinks = document.querySelectorAll("nav a");

// // Set up the IntersectionObserver
// const observer = new IntersectionObserver(
//   (entries, observer) => {
//     entries.forEach((entry) => {
//       const id = entry.target.id;
//       const navLink = document.querySelector(`nav a[href="#${id}"]`);
//       if (entry.isIntersecting) {
//         navLink?.classList.add("header__nav-link--active");
//       } else {
//         navLink?.classList.remove("header__nav-link--active");
//       }
//     });
//   },
//   { threshold: 0.5 }
// ); // 50% of the section should be in view

// // Observe each section
// sections.forEach((section) => observer.observe(section));
