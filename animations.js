import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';


// header animation
let elements = document.querySelectorAll('.rolling-text')

elements.forEach((element) => {
  let innerText = element.innerText
  element.innerHTML = ""

  let textContainer = document.createElement('div')
  textContainer.classList.add('block')

  for (let letter of innerText) {
    let span = document.createElement('span')
    span.innerText = letter.trim() === '' ? '\xa0' : letter
    span.classList.add('letter')
    textContainer.appendChild(span)
  }

  element.appendChild(textContainer)
  element.appendChild(textContainer.cloneNode(true))

  elements.forEach((element) => {
    element.addEventListener('mouseover', () => {
      element.classList.remove('play')
    })
  })
})

// end of header animation

gsap.registerPlugin(ScrollTrigger);

// Split text into spans
document.querySelectorAll('.fade-in-text').forEach(paragraph => {
  let htmlString = '';
  let pArray = paragraph.textContent.split(' ');
  for (let i = 0; i < pArray.length; i++) {
    htmlString += `<span class="fade">${pArray[i]} </span>`;
  }
  paragraph.innerHTML = htmlString;
});

// GSAP animation for each span
gsap.utils.toArray('.fade').forEach(span => {
  gsap.fromTo(span,
    { opacity: 0.1 },
    {
      opacity: 1,
      scrollTrigger: {
        trigger: span,
        start: "bottom 90%",
        end: "top 30%",
        scrub: true
      }
    }
  );
});

gsap.set(".above-the-fold-text", { y: 100, autoAlpha: 0 });


gsap.to(".above-the-fold-text", {
  duration: 1.5,
  y: 0,
  autoAlpha: 1,
  ease: "power2.out",
  stagger: 0.1,
  delay: 0.1
});





gsap.fromTo('.scroll-more-text',
  { opacity: 1 },
  {
    opacity: 0,
    duration: 0.5,
    scrollTrigger: {
      trigger: '.scroll-container',
      start: 'top top',
      end: 'top+=100 top',
      scrub: true,
    }
  }
);




// gsap.to('.our-team-text', {
//   scrollTrigger: {
//     trigger: '.our-team-text',
//     start: 'top top',
//     end: '+=1200',
//     scrub: 1,
//     // markers: true,
//     pin: true
//   },
// })
// Create a media query-based GSAP animation setup
// Create a media query-based GSAP animation setup
gsap.matchMedia().add("(min-width: 900px)", () => {

  // This block will only run when the screen width is 900px or larger
  let activeImage = null;

  // Set up the image positioning for all cards
  gsap.set('.card img.swipeimage', { yPercent: -50, xPercent: -50 });

  // Initialize the animation logic for each card
  gsap.utils.toArray(".card").forEach((el) => {
    let image = el.querySelector('img.swipeimage');

    // Create the fade-in tween
    const fade = gsap.to(image, { autoAlpha: 1, ease: "none", paused: true, onReverseComplete: () => gsap.set(image, { autoAlpha: 0 }) });

    // Define quickTo for smooth x and y movement
    let setX = gsap.quickTo(image, "x", { duration: 0.6, ease: "power3.out" });
    let setY = gsap.quickTo(image, "y", { duration: 0.6, ease: "power3.out" });

    // Mouseenter animation: start fading in and following the mouse
    el.addEventListener('mouseenter', (e) => {
      fade.play();
      if (activeImage) {
        gsap.set(image, { x: gsap.getProperty(activeImage, "x"), y: gsap.getProperty(activeImage, "y") });
      }
      activeImage = image;

      // Immediately set the position based on mouse position and start easing
      setX(e.clientX);
      setY(e.clientY);

      // Update the image's position on mouse move
      document.addEventListener('mousemove', (moveEvent) => {
        setX(moveEvent.clientX);
        setY(moveEvent.clientY);
      });
    });

    // Mouseleave animation: fade out the image
    el.addEventListener('mouseleave', () => {
      fade.reverse();  // Reverse the fade animation
      document.removeEventListener('mousemove', null);  // Stop following the mouse
    });
  });

  // Cleanup logic that will automatically run when the media query no longer matches
  return () => {
    // Stop all animations and remove event listeners if needed
    gsap.utils.toArray(".card").forEach((el) => {
      let image = el.querySelector('img.swipeimage');
      gsap.killTweensOf(image);  // Kill any ongoing tweens
    });
  };
});


// header button
let btn = document.getElementById("container");
const nav = document.querySelector(".nav-container");

btn.addEventListener("click", onMenuToggle);

function onMenuToggle() {
  console.log('ibrahim');
  const icon = document.getElementById("icon");
  const checkbox = document.getElementById("checkbox");

  // Toggle the checkbox state
  checkbox.checked = !checkbox.checked;

  // Update the icon and navigation based on the new checkbox state
  if (checkbox.checked) {
    icon.className = "icon-close";
    nav.classList.add("shown");
  } else {
    icon.className = "icon-menu";
    nav.classList.remove("shown");
  }
}
