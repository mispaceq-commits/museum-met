/* The Writer's Collective — Met Edition.
 *
 * Builds a 3D auto-rotating "swirl" carousel of paintings around the central
 * THE MET pillar mark. Geometry is derived from the painting count so the
 * orbit always closes into a perfect ring:
 *
 *     orbit_radius = (slide_width / 2) / tan(pi / N)
 *
 * Each slide gets a CSS custom property `--i` (its index) and the styles
 * compute its rotation as `i * (360deg / N)` and translateZ(orbit_r). The
 * surrounding `.carousel` element runs the `swirl` keyframes continuously.
 */
(function () {
  "use strict";

  const PAINTINGS = [
    {
      url: "https://res.cloudinary.com/dnickckih/image/upload/q_auto/f_auto/v1777286618/1920px-Church_Heart_of_the_Andes_u8pwke.jpg",
      title: "Heart of the Andes",
      author: "Frederic Edwin Church, 1859",
    },
    {
      url: "https://res.cloudinary.com/dnickckih/image/upload/q_auto/f_auto/v1777286617/Winslow_Homer_-_Snap_the_Whip__Butler_Institute_of_American_Art_m6ijsc.jpg",
      title: "Snap the Whip",
      author: "Winslow Homer, 1872",
    },
    {
      url: "https://res.cloudinary.com/dnickckih/image/upload/q_auto/f_auto/v1777286617/David_-_The_Death_of_Socrates_bzxupw.jpg",
      title: "The Death of Socrates",
      author: "Jacques-Louis David, 1787",
    },
    {
      url: "https://res.cloudinary.com/dnickckih/image/upload/q_auto/f_auto/v1777286617/main-image_ra6pm1.jpg",
      title: "From the Archive",
      author: "Anonymous master, c. 19th c.",
    },
    {
      url: "https://res.cloudinary.com/dnickckih/image/upload/q_auto/f_auto/v1777286616/2c0abcdcfe50c2ec3e128dd3c3119a70b0d84ad9_riysjc.jpg",
      title: "A Quiet Study",
      author: "School of the Romantics",
    },
    {
      url: "https://res.cloudinary.com/dnickckih/image/upload/q_auto/f_auto/v1777286616/9facac56e05d8e64bcb9b404b0bcc30421bfea15-1920x1080_iacvju.jpg",
      title: "Halls of Memory",
      author: "Folio impression",
    },
    {
      url: "https://res.cloudinary.com/dnickckih/image/upload/q_auto/f_auto/v1777286616/Georges_Seurat_066_ivtkfp.jpg",
      title: "A Sunday on La Grande Jatte",
      author: "Georges Seurat, 1884",
    },
    {
      url: "https://res.cloudinary.com/dnickckih/image/upload/q_auto/f_auto/v1777286616/Rosa_Bonheur__The_Horse_Fair__1852_55_ierbuz.jpg",
      title: "The Horse Fair",
      author: "Rosa Bonheur, 1852–55",
    },
    {
      url: "https://res.cloudinary.com/dnickckih/image/upload/q_auto/f_auto/v1777286616/DP140973_rpd3ag.jpg",
      title: "From the Met Archive",
      author: "Met collection",
    },
    {
      url: "https://res.cloudinary.com/dnickckih/image/upload/q_auto/f_auto/v1777286616/n-4240-00-000069-xl-hd_pkzcej.jpg",
      title: "Salon of Letters",
      author: "Late 19th c. genre study",
    },
    {
      url: "https://res.cloudinary.com/dnickckih/image/upload/q_auto/f_auto/v1777286615/e1b0e8a1b50c70aa7480dbb3ae066ba23f88f09c-2320x1305_kuomux.jpg",
      title: "An Author's Window",
      author: "From the writer's archive",
    },
    {
      url: "https://res.cloudinary.com/dnickckih/image/upload/q_auto/f_auto/v1777286615/Cole_Thomas_The_Oxbow__The_Connecticut_River_near_Northampton_1836_sfdqhc.jpg",
      title: "The Oxbow",
      author: "Thomas Cole, 1836",
    },
    {
      url: "https://res.cloudinary.com/dnickckih/image/upload/q_auto/f_auto/v1777286615/main-image-_1__eqj8ql.jpg",
      title: "Pages, Bound",
      author: "First-edition spines",
    },
    {
      url: "https://res.cloudinary.com/dnickckih/image/upload/q_auto/f_auto/v1777286615/two-cut-sunflowers_rziot3.jpg",
      title: "Two Cut Sunflowers",
      author: "Vincent van Gogh, 1887",
    },
  ];

  const wrapper = document.querySelector(".carousel_wrapper");
  const carousel = document.getElementById("carousel");
  if (!wrapper || !carousel) return;

  // Wipe any noscript fallback content before injecting the real slides.
  carousel.textContent = "";

  const N = PAINTINGS.length;

  // Read slide width from CSS so the geometry stays in sync with the design.
  const styles = getComputedStyle(wrapper);
  const slideW = parseFloat(styles.getPropertyValue("--slide-w")) || 360;

  // Orbit radius so the ring closes perfectly with N equal-width slides.
  const orbitR = (slideW / 2) / Math.tan(Math.PI / N);
  wrapper.style.setProperty("--slide-count", String(N));
  wrapper.style.setProperty("--orbit-r", `${orbitR.toFixed(2)}px`);

  PAINTINGS.forEach((p, i) => {
    const slide = document.createElement("div");
    slide.className = "slide";
    slide.style.setProperty("--i", String(i));
    slide.innerHTML = `
      <div class="slide__frame">
        <img class="slide__img" src="${p.url}" alt="${p.title}" loading="lazy" draggable="false" />
      </div>
      <figcaption class="slide__caption">
        <span class="slide__title">${p.title}</span>
        <span class="slide__author">${p.author}</span>
      </figcaption>
    `;
    carousel.appendChild(slide);
  });
})();
