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

const gallery = document.querySelector(".photo-gallery");
const photo = document.querySelector(".photo");

gift.addEventListener("click",()=>{

    // Open lid
    lid.style.transform = "rotate(-40deg) translate(-40px,-20px)";

    // Wait for lid animation
    setTimeout(()=>{

        document.querySelector(".gift-scene").style.display="none";

        gallery.style.display = "flex";
        gallery.style.background = "rgba(255,0,0,0.2)";

        setTimeout(()=>{

            photo.classList.add("show");

        },200);

    },1200);

});