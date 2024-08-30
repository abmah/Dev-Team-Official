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

gsap.set('.card img.swipeimage', { yPercent: -50, xPercent: -50 });

let activeImage;
gsap.utils.toArray(".card").forEach((el) => {
  let image = el.querySelector('img.swipeimage'),
    setX, setY,
    align = e => {
      setX(e.clientX);
      setY(e.clientY);
    },
    startFollow = () => document.addEventListener("mousemove", align),
    stopFollow = () => document.removeEventListener("mousemove", align),
    fade = gsap.to(image, { autoAlpha: 1, ease: "none", paused: true, onReverseComplete: stopFollow });

  el.addEventListener('mouseenter', (e) => {
    fade.play();
    startFollow();
    if (activeImage) { // if there's an actively-animating one, we should match its position here
      gsap.set(image, { x: gsap.getProperty(activeImage, "x"), y: gsap.getProperty(activeImage, "y") });
    }
    activeImage = image;
    setX = gsap.quickTo(image, "x", { duration: 0.6, ease: "power3" }),
      setY = gsap.quickTo(image, "y", { duration: 0.6, ease: "power3" })
    align(e);
  });

  el.addEventListener('mouseleave', () => fade.reverse());

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
