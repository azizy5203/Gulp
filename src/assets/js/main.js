let heroSwiper;
function initHeroSwiper() {
  heroSwiper = new Swiper(".heroSwiper__swiper", {
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
