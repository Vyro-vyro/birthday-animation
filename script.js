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

gift.addEventListener("click",()=>{

    gift.classList.add("shake");

    setTimeout(()=>{

        gift.classList.remove("shake");

        // Open gift lid
lid.style.transform = "rotate(-40deg) translate(-40px,-20px)";

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

    },600);

});

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
