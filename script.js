const effects = document.getElementById("effects");

/* ===== Luxury Particles ===== */

for (let i = 0; i < 120; i++) {

    const particle = document.createElement("div");

    particle.className = "particle";

    particle.style.left = Math.random() * 100 + "vw";
    particle.style.top = Math.random() * 100 + "vh";

    const size = Math.random() * 4 + 2;

    particle.style.width = size + "px";
    particle.style.height = size + "px";

    particle.style.animationDuration = (2 + Math.random() * 4) + "s";
    particle.style.animationDelay = Math.random() * 5 + "s";

    effects.appendChild(particle);
}

/* ===== Cursor Glow ===== */

const glow = document.querySelector(".cursor-glow");

if(glow){

document.addEventListener("mousemove",(e)=>{

    glow.style.left=e.clientX+"px";
    glow.style.top=e.clientY+"px";

});

}

/* ===== Open Reveal Screen ===== */

const button=document.getElementById("openBtn");
const reveal=document.getElementById("revealScreen");

button.addEventListener("click",()=>{

    reveal.classList.add("show");

});

/* ===== Gift Animation ===== */

const gift=document.querySelector(".gift-box");
const lid=document.querySelector(".gift-lid");

const burst = document.querySelector(".energy-burst");

const flash = document.querySelector(".flash");

const cards = document.querySelectorAll(".photo-stack .photo");
const sparkContainer = document.querySelector(".spark-container");

const giftWrap = document.querySelector(".gift-wrap");
const cinemaBg = document.querySelector(".cinema-bg");
const dustField = document.querySelector(".dust-field");

/* ===== Soft floating dust particles ===== */

if (dustField) {

    for (let i = 0; i < 40; i++) {

        const dust = document.createElement("span");

        dust.className = "dust";

        const size = Math.random() * 3 + 1.5;

        dust.style.width = size + "px";
        dust.style.height = size + "px";
        dust.style.left = Math.random() * 100 + "%";
        dust.style.top = Math.random() * 100 + "%";

        dust.style.animationDuration = (8 + Math.random() * 10) + "s";
        dust.style.animationDelay = Math.random() * 12 + "s";

        dustField.appendChild(dust);

    }

}

/* ===== Slow cinematic parallax (background vs gift) ===== */

if (giftWrap && cinemaBg) {

// Hovering the gift also scales it slightly.
    const scaleOnHover = () =>
        (giftWrap.matches(":hover") ? " scale(1.04)" : "");

    document.addEventListener("mousemove", (e) => {

        const cx = (e.clientX / window.innerWidth - 0.5);
        const cy = (e.clientY / window.innerHeight - 0.5);

        // Background drifts opposite to the gift: subtle parallax
        cinemaBg.style.transform =
            "translate(" + (cx * -18) + "px," + (cy * -12) + "px)";

        giftWrap.classList.add("parallax");
        giftWrap.style.transform =
            "translate(" + (cx * 10) + "px," + (cy * 6) + "px)" + scaleOnHover();

    });

    document.addEventListener("mouseleave", () => {

        cinemaBg.style.transform = "translate(0,0)";
        giftWrap.style.transform = "";

    });

}

gift.addEventListener("click",()=>{

    gift.classList.add("shake");

    setTimeout(()=>{

        gift.classList.remove("shake");

        // Open gift lid — heavier, weightier, more realistic motion
        lid.classList.add("open");

// Pink Energy Burst
burst.classList.add("show");

setTimeout(() => {

    burst.classList.remove("show");

}, 900);

createSparkBurst();

// White flash
setTimeout(() => {

    flash.classList.add("show");

    setTimeout(() => {
        flash.classList.remove("show");
    }, 800);

}, 600);

// Show photos
        setTimeout(()=>{

            document.querySelector(".gift-scene").style.display="none";

            cards.forEach((card,index)=>{

                setTimeout(()=>{

                    card.classList.add("show");

                },index*400);

            });

        },1300);

        // After all photos settle (~4300ms) + 2s wait, show the message
        setTimeout(()=>{

            showTypewriterMessage();

        },6300);

    },720);

});

/* =========================================================
   TYPEWRITER MESSAGE
========================================================= */

const messageOverlay = document.querySelector(".message-overlay");
const line1 = document.getElementById("line1");
const line2 = document.getElementById("line2");

const TEXT_LINE_1 = "Every picture holds a beautiful memory...";
const TEXT_LINE_2 = "And today is all about celebrating you.";

function typeText(element, text, speed, callback) {

    let index = 0;

    element.textContent = "";
    element.classList.add("typing", "active");

    const timer = setInterval(() => {

        element.textContent += text.charAt(index);
        index++;

        if (index >= text.length) {

            clearInterval(timer);
            element.classList.remove("active");

            if (callback) callback();

        }

    }, speed);

}

function showTypewriterMessage() {

    // Show dim + pink glow overlay
    messageOverlay.classList.add("show");

    // Type line 1
    typeText(line1, TEXT_LINE_1, 45, () => {

        // Pause 1 second, then type line 2
        setTimeout(() => {

            typeText(line2, TEXT_LINE_2, 45, () => {

// Keep visible ~3 seconds, then fade out
                setTimeout(() => {

                    messageOverlay.classList.remove("show");

                    // Reset lines for potential re-trigger
                    setTimeout(() => {

                        line1.textContent = "";
                        line2.textContent = "";
                        line1.classList.remove("typing");
                        line2.classList.remove("typing");

                    }, 900);

                    // Open the storybook once the message has faded out
                    setTimeout(() => {

                        openStorybook();

                    }, 900);

                }, 3000);

            });

        }, 1000);

    });

}

function createSparkBurst(){

    for(let i=0;i<90;i++){

        const spark=document.createElement("div");

        spark.className="spark";

        const angle=Math.random()*360;

        const distance=250+Math.random()*350;

        spark.style.left="50%";
        spark.style.top="50%";

        spark.style.transition="1s ease-out";

        sparkContainer.appendChild(spark);

        requestAnimationFrame(()=>{

            spark.style.opacity="1";

            spark.style.transform=
            `translate(
                ${Math.cos(angle*Math.PI/180)*distance}px,
                ${Math.sin(angle*Math.PI/180)*distance}px
            ) scale(0)`;

        });

setTimeout(()=>{

            spark.style.opacity="0";

        },400);

        setTimeout(()=>{

            spark.remove();

        },1000);

    }

}

/* =========================================================
   PREMIUM BIRTHDAY STORYBOOK
========================================================= */

/* The photos available for the storybook are sourced from the
   existing photo-stack images. The book creates exactly ONE page
   per detected photo, so adding more photos automatically adds
   more pages — no hardcoded page count, no duplicates. */

const storybook = document.querySelector(".storybook");
const book = document.querySelector(".book");
const bookCover = document.querySelector(".book-cover");
const flipLeaf = document.querySelector(".flip-leaf");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const pageIndicator = document.getElementById("pageIndicator");

/* LEFT page: photo */
const pageImg = document.querySelector(".page-left .page-img");

/* RIGHT page: message */
const pageWish = document.querySelector(".page-right .page-wish");

/* Turning leaf */
const flipImg = document.querySelector(".flip-leaf .flip-img");
const flipWish = document.querySelector(".flip-leaf .flip-back .flip-wish");

/* Universal birthday wishes — suitable for any friend. */

const WISH_LINES = [
    "Wishing you an amazing day filled with joy and laughter! 🎉",
    "Happy Birthday! May this year bring you every happiness. 🌟",
    "Enjoy your special day to the fullest birthday buddy! 🎂",
    "Sending you the warmest wishes on your special day! 💫",
    "Happy Birthday! Here's to a year of great adventures. 🎈",
    "May your day be as wonderful as you are! ✨",
    "Wishing you good health, success and lasting smiles! 🍀",
    "Happy Birthday! So glad to celebrate with you today. 🎊",
    "May all your dreams come true this year! 🌠",
    "Cheers to you and to an incredible year ahead! 🥳"
];

/* Auto-detect the available photos from the reveal photo stack.
   Each unique image path becomes one scrapbook page. */

const photoImages = document.querySelectorAll(".photo-stack .photo");

const STORY_PAGES = Array.from(photoImages).map((img, index) => ({
    img: img.getAttribute("src"),
    wish: WISH_LINES[index % WISH_LINES.length]
}));

let currentPage = 0;
let isFlipping = false;

/* Open the storybook and reveal the closed cover */

function openStorybook() {

    storybook.classList.add("show");

}

/* Clicking the cover opens the book */

bookCover.addEventListener("click", () => {

    book.classList.add("opened");

    renderPage(currentPage);

});

/* Render the two-page spread (photo left, message right).
   The index is clamped so it can never go below 0 or above
   the last page. */

function renderPage(pageIndex) {

    const lastPage = STORY_PAGES.length - 1;

    currentPage = Math.max(0, Math.min(pageIndex, lastPage));

    const page = STORY_PAGES[currentPage];

    if (!page) return;

    pageImg.src = page.img;
    pageWish.textContent = page.wish;

    pageIndicator.textContent =
        "Page " + (currentPage + 1) + " of " + STORY_PAGES.length;

    prevBtn.disabled = currentPage === 0;
    nextBtn.disabled = currentPage === lastPage;

}

/* Page flip animation: next */

function goNext() {

    if (isFlipping || currentPage >= STORY_PAGES.length - 1) return;

    isFlipping = true;

    const next = STORY_PAGES[currentPage + 1];

    // Front face shows the current right page being flipped away
    flipImg.src = pageImg.src;
    flipWish.textContent = pageWish.textContent;

    // Show the flipping leaf, then after the flip reveal the next page
    flipLeaf.classList.add("flipping");

    setTimeout(() => {

        try {

            renderPage(currentPage + 1);

        } finally {

            // Hide the leaf and release the lock, even on error.
            flipLeaf.classList.remove("flipping");

            isFlipping = false;

        }

    }, 850);

}

/* Page flip animation: previous */

function goPrev() {

    if (isFlipping || currentPage <= 0) return;

    isFlipping = true;

    const prev = STORY_PAGES[currentPage - 1];

    // Front face shows the current right page being flipped back
    flipImg.src = pageImg.src;
    flipWish.textContent = pageWish.textContent;

    flipLeaf.classList.add("flipping");

    setTimeout(() => {

        try {

            renderPage(currentPage - 1);

        } finally {

            // Hide the leaf and release the lock, even on error.
            flipLeaf.classList.remove("flipping");

            isFlipping = false;

        }

    }, 850);

}

nextBtn.addEventListener("click", goNext);
prevBtn.addEventListener("click", goPrev);
