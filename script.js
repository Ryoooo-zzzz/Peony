/*
  PEONY LOVE LETTER
  ---------------------------------------------------------
  96 outer/middle/inner petals = draggable
  14 inner bud petals = final bloom
  14 memory photos = revealed after final bloom

  IMPORTANT:
  The manually positioned inner bud uses the original
  491 / 500 positioning and is NOT changed.
*/

const MEMORIES = [
  {
    image: "assets/memories/memory-01.jpg",
    title: "First Picture",
    text: "This is one of the first pics that you sent me, yung time na nag dadalawang isip ako kung susugal ba ko, magpapadala ba ko sa feelings ko, or should I just hold myself kasi feeling ko hindi pa ko ready to be with someone again. then voila ginawan mo ng paraan HAHAHAHAHAH."
  },
  {
    image: "assets/memories/memory-02.jpg",
    title: "The First PhotoBooth",
    text: "Eto yung time na narealize ko na ganito pala kasaya to, like having someone na kasama sa mga ganitong bagay, like before naiingit lang ako then boom I get to experience this too."
  },
  {
    image: "assets/memories/memory-03.jpg",
    title: "Bahay nyo",
    text: "Super kabado ako nung time na to since it was my first time to go to your house. I was so nervous and I was so shy. It was my first time na kasama kita alone super kabado on how I will act around."
  },
  {
    image: "assets/memories/memory-04.jpeg",
    title: "First Date",
    text: "Sobrang kabado ako nung time na to HAHAHAHAH. Hindi ko alam ano gagawin to calm myself because I was with you. I was so stunned sa ganda mo and it was my first date out with someone."
  },
  {
    image: "assets/memories/memory-05.jpg",
    title: "Our First Console Date",
    text: "Tuwang tuwa ako nung nag laro tayo neto the happiness inside me is unexplainable. Imagine dinayo mo pa talaga ako kahit na umuulan."
  },
  {
    image: "assets/memories/memory-06.jpg",
    title: "Our 2nd Photobooth",
    text: "Nung time na to I am already comfortable with you and I am happy na nakilala kita. I am happy that a beautiful girl like you is mine. I am happy that I am the one who makes you happy. I am happy that I am the one who makes you smile."
  },
  {
    image: "assets/memories/memory-07.jpg",
    title: "Our 2nd Photobooth",
    text: "Well this time eto naman yung time na comfortable enough na ko to goof around you, because before I was thinking na baka sabihan mo ko na isip bata or sabihan mo ko na -ano bang trip yan, pero hindi eh nasasabayan mo ko sa lahat eh HAHAHAHAHAHAHAHAHA."
  },
  {
    image: "assets/memories/memory-08.jpeg",
    title: "First Date",
    text: "I believe this was the time na kakakita lang natin and I get to hold your hand. Sobrang kilig na kilig ako neto para akong sasabog HAHAHHAHAAH parang biglang lumabas yung sweetness sakin."
  },
  {
    image: "assets/memories/memory-09.jpeg",
    title: "PhotoBooth",
    text: "Ayon nainlove si kuya mo wala na naka padlock kana sa bio ko, nasa panaginip na kita, naka favorite ka na sa contacts, naka pin na sa social media, ikaw na ang reason bat nag mamadali ako umuwi."
  },
  {
    image: "assets/memories/memory-10.jpg",
    title: "PhotoBooth",
    text: "Look oh super saya natin HAHAHAHAHAHA kinikilig ako ng sobra nyan ikaw ba naman titigan ng naka smile eh kahit makunat to lalambot sa ngiti mo eh, -insert ~Para kang bahaghari sa liwanag iyong nadali."
  },
  {
    image: "assets/memories/memory-11.jpg",
    title: "My baby",
    text: "My Eingel, my love, my baby. I love you <3"
  },
  {
    image: "assets/memories/memory-12.jpg",
    title: "PhotoBooth",
    text: "Seeeeeee super saya natin HAHAHAAHAHAA apaka sweet natin together. Lets grind till the day comes na nasa iisang bahay nalang tayo at lahat ay napupundar na natin para sa isa't isa."
  },
  {
    image: "assets/memories/memory-13.jpg",
    title: "PhotoBooth",
    text: "Ang ganda mo rito ako mukhang ewan HAHAHAHAHAHAHA but I was happy that you enjoyed our date, kahit saglit lang sobrang saya natin nagkaron tayo ng chance to grocery together, cook together, eat together, and clean together na para bang live in HAHAHAHAAHHAHA."
  },
  {
    image: "assets/memories/memory-14.jpg",
    title: "Latest Date",
    text: "Wala na naka lock ka na sakin kasama ka na sa pag lipad ng eroplano ikaw na ang peace of mind ko habang ako ang peacete ng buhay mo HAHAHHAHHAHAH I love you yesterday,today, and tommorow. Mahal na mahal kita Ein."
  }
];

const TOTAL_PETALS = 96;
const SPECIAL_PETALS = 14;

const intro = document.getElementById("intro");
const experience = document.getElementById("experience");
const enterBtn = document.getElementById("enterBtn");
const music = document.getElementById("music");
const flower = document.getElementById("flower");
const hint = document.getElementById("hint");
const counter = document.getElementById("petalCounter");

const memoryOverlay = document.getElementById("memoryOverlay");
const memoryImage = document.getElementById("memoryImage");
const memoryNumber = document.getElementById("memoryNumber");
const memoryTitle = document.getElementById("memoryTitle");
const memoryText = document.getElementById("memoryText");
const closeMemory = document.getElementById("closeMemory");

const finalOverlay = document.getElementById("finalOverlay");
const restartBtn = document.getElementById("restartBtn");
const breezeLayer = document.getElementById("breezeLayer");

const NS = "http://www.w3.org/2000/svg";

let discovered = 0;
let specialIndex = 0;
let breezeTimer = null;
let breezeStep = 0;
let finalBloomStarted = false;


/* =========================================================
   BASIC HELPERS
   ========================================================= */

function svgEl(name, attrs = {}) {
  const el = document.createElementNS(NS, name);

  for (const [key, value] of Object.entries(attrs)) {
    el.setAttribute(key, value);
  }

  return el;
}

function rand(min, max) {
  return min + Math.random() * (max - min);
}

function makeGradient(defs, id, stops) {
  const g = svgEl("linearGradient", {
    id,
    x1: "0%",
    y1: "0%",
    x2: "100%",
    y2: "100%"
  });

  stops.forEach(([offset, color]) => {
    g.appendChild(
      svgEl("stop", {
        offset: `${offset}%`,
        "stop-color": color
      })
    );
  });

  defs.appendChild(g);
}

function petalPath(width, length) {
  const asym = rand(-0.10, 0.10) * width;

  return [
    "M 0 0",
    `C ${-width * 0.72} ${length * 0.12}, ${-width * 0.98} ${length * 0.54}, ${asym - width * 0.22} ${length * 0.86}`,
    `C ${asym - width * 0.05} ${length * 1.03}, ${asym + width * 0.20} ${length * 1.02}, ${asym + width * 0.30} ${length * 0.82}`,
    `C ${width * 0.95} ${length * 0.52}, ${width * 0.72} ${length * 0.10}, 0 0 Z`
  ].join(" ");
}


/* =========================================================
   CREATE NORMAL PETAL
   ========================================================= */

function createPetal(svg, index, layer, angle, special, memoryIndex) {

  const layerInfo = {
    outer: {
      radius: 222,
      lengthMin: 245,
      lengthMax: 315,
      widthMin: 118,
      widthMax: 168,
      scale: 1
    },

    middle: {
      radius: 166,
      lengthMin: 205,
      lengthMax: 265,
      widthMin: 98,
      widthMax: 145,
      scale: 0.91
    },

    inner: {
      radius: 106,
      lengthMin: 150,
      lengthMax: 210,
      widthMin: 80,
      widthMax: 122,
      scale: 0.82
    }
  }[layer];

  const center = 500;

  const radius =
    layerInfo.radius +
    rand(-12, 12);

  const x =
    center +
    Math.cos(angle * Math.PI / 180) *
    radius;

  const y =
    center +
    Math.sin(angle * Math.PI / 180) *
    radius;

  const rotation =
    angle +
    rand(-7, 7);


  /*
    POSITION GROUP
    -------------------------
    This never moves during plucking.
  */

  const positionGroup = svgEl("g", {
    class: "petal-position",

    transform:
      `translate(${x} ${y}) ` +
      `rotate(${rotation}) ` +
      `scale(${layerInfo.scale})`,

    "data-special": special ? "true" : "false",
    "data-memory-index": memoryIndex,
    "data-angle": angle
  });


  /*
    INNER ANIMATED GROUP
    -------------------------
    Only this group moves.
  */

  const animatedGroup = svgEl("g", {
    class: "petal-animated"
  });

  animatedGroup.style.setProperty(
    "--petal-life-duration",
    `${4.5 + Math.random() * 4.5}s`
  );

  animatedGroup.style.setProperty(
    "--petal-life-delay",
    `${-(Math.random() * 7)}s`
  );

  animatedGroup.style.setProperty(
    "--petal-sway",
    `${1.2 + Math.random() * 2.2}deg`
  );


  const width =
    rand(
      layerInfo.widthMin,
      layerInfo.widthMax
    );

  const length =
    rand(
      layerInfo.lengthMin,
      layerInfo.lengthMax
    );


  const path = svgEl("path", {
    d: petalPath(width, length),

    class: "petal-shape",

    fill:
      `url(#${
        layer === "outer"
          ? "pinkOuter"
          : layer === "middle"
            ? "pinkMiddle"
            : "pinkInner"
      })`,

    opacity:
      rand(0.90, 0.99)
  });


  const vein = svgEl("path", {
    d:
      `M 0 8 ` +
      `C ${rand(-8, 8)} ${length * .28}, ` +
      `${rand(-12, 12)} ${length * .58}, ` +
      `${rand(-6, 6)} ${length * .88}`,

    class: "petal-vein",

    opacity:
      rand(.08, .17)
  });


  animatedGroup.appendChild(path);
  animatedGroup.appendChild(vein);

  positionGroup.appendChild(animatedGroup);

  svg.appendChild(positionGroup);


  /* HOVER */

  positionGroup.addEventListener(
    "mouseenter",
    () => {

      if (
        !positionGroup.classList.contains("plucked")
      ) {
        positionGroup.classList.add("hovered");
      }

    }
  );


  positionGroup.addEventListener(
    "mouseleave",
    () => {
      positionGroup.classList.remove("hovered");
    }
  );


  /* =======================================================
     DRAGGING
     ======================================================= */

  let isDragging = false;

  let startX = 0;
  let startY = 0;

  let currentX = 0;
  let currentY = 0;


  animatedGroup.style.cursor = "grab";


  animatedGroup.addEventListener(
    "pointerdown",
    (e) => {

      if (
        positionGroup.classList.contains("plucked")
      ) {
        return;
      }

      isDragging = true;

      startX = e.clientX;
      startY = e.clientY;

      currentX = 0;
      currentY = 0;

      animatedGroup.setPointerCapture(
        e.pointerId
      );

      animatedGroup.style.cursor =
        "grabbing";

      positionGroup.classList.add(
        "dragging"
      );

    }
  );


  animatedGroup.addEventListener(
    "pointermove",
    (e) => {

      if (!isDragging) {
        return;
      }

      currentX =
        e.clientX - startX;

      currentY =
        e.clientY - startY;


      const distance =
        Math.sqrt(
          currentX * currentX +
          currentY * currentY
        );


      const rotation =
        currentX * 0.08;


      animatedGroup.style.transform =
        `translate(${currentX}px, ${currentY}px)
         rotate(${rotation}deg)
         scale(${1 + Math.min(distance / 500, 0.8)})`;


      /*
        DRAG FAR ENOUGH
        = PETAL GETS PLUCKED
      */

      if (distance > 120) {

        isDragging = false;

        try {
          animatedGroup.releasePointerCapture(
            e.pointerId
          );
        } catch (error) {}

        animatedGroup.style.cursor =
          "default";

        pluckPetal(
          positionGroup,
          animatedGroup,
          special,
          memoryIndex,
          currentX,
          currentY
        );

      }

    }
  );


  animatedGroup.addEventListener(
    "pointerup",
    (e) => {

      if (!isDragging) {
        return;
      }

      isDragging = false;

      try {
        animatedGroup.releasePointerCapture(
          e.pointerId
        );
      } catch (error) {}

      animatedGroup.style.cursor =
        "grab";


      /*
        DIDN'T DRAG FAR ENOUGH
        = RETURN TO ORIGINAL POSITION
      */

      const currentTransform =
        animatedGroup.style.transform ||
        "translate(0,0)";


      animatedGroup.animate(
        [
          {
            transform:
              currentTransform
          },

          {
            transform:
              "translate(0, 0) rotate(0deg) scale(1)"
          }
        ],
        {
          duration: 350,
          easing:
            "cubic-bezier(.2,.8,.2,1)"
        }
      ).onfinish = () => {

        animatedGroup.style.transform =
          "";

      };

    }
  );
}


/* =========================================================
   FLOWER CENTER
   ========================================================= */

function createCenter(svg) {

  /*
    DO NOT CHANGE THIS POSITION.
    Your manually adjusted center is preserved.
  */

  const centerGroup = svgEl(
    "g",
    {
      class:
        "flower-center-realistic"
    }
  );


  centerGroup.appendChild(
    svgEl("ellipse", {
      cx: 425,
      cy: 500,
      rx: 75,
      ry: 62,
      fill: "url(#centerPink)",
      opacity: ".98"
    })
  );


  centerGroup.appendChild(
    svgEl("ellipse", {
      cx: 425,
      cy: 500,
      rx: 40,
      ry: 35,
      fill: "#c96a3b",
      opacity: ".96"
    })
  );


  /*
    STAMENS
  */

  for (let i = 0; i < 64; i++) {

    const angle =
      (i / 64) *
      Math.PI *
      2 +
      rand(-0.03, 0.03);


    const r1 =
      rand(25, 34);

    const r2 =
      r1 +
      rand(29, 49);


    const x1 =
      425 +
      Math.cos(angle) *
      r1;

    const y1 =
      500 +
      Math.sin(angle) *
      r1;


    const x2 =
      425 +
      Math.cos(angle) *
      r2;

    const y2 =
      500 +
      Math.sin(angle) *
      r2;


    centerGroup.appendChild(
      svgEl("line", {
        x1,
        y1,
        x2,
        y2,
        class: "stamen"
      })
    );


    centerGroup.appendChild(
      svgEl("circle", {
        cx: x2,
        cy: y2,
        r: rand(2.2, 3.7),
        class: "anther"
      })
    );

  }


  /*
    POLLEN
  */

  for (let i = 0; i < 18; i++) {

    const angle =
      (i / 18) *
      Math.PI *
      2;

    const r =
      rand(7, 25);


    centerGroup.appendChild(
      svgEl("circle", {
        cx:
          425 +
          Math.cos(angle) *
          r,

        cy:
          500 +
          Math.sin(angle) *
          r,

        r:
          rand(1.3, 2.3),

        fill: "#efaa43",

        opacity: ".9"
      })
    );

  }


  svg.appendChild(centerGroup);
}


/* =========================================================
   BUILD FLOWER
   ========================================================= */

function buildFlower() {

  flower.innerHTML = "";

  specialIndex = 0;

  finalBloomStarted = false;


  const svg = svgEl(
    "svg",
    {
      viewBox: "0 0 1000 1000",
      class: "peony-svg",
      "aria-label":
        "A fully bloomed pink peony"
    }
  );


  const defs =
    svgEl("defs");


  makeGradient(
    defs,
    "pinkOuter",
    [
      [0, "#fff3f7"],
      [48, "#ef9ab5"],
      [100, "#c65073"]
    ]
  );


  makeGradient(
    defs,
    "pinkMiddle",
    [
      [0, "#ffe8f0"],
      [48, "#eb88a8"],
      [100, "#b83f68"]
    ]
  );


  makeGradient(
    defs,
    "pinkInner",
    [
      [0, "#ffe0eb"],
      [48, "#df7598"],
      [100, "#a9365b"]
    ]
  );


  makeGradient(
    defs,
    "centerPink",
    [
      [0, "#f8c1d1"],
      [55, "#df7593"],
      [100, "#a93d5e"]
    ]
  );


  svg.appendChild(defs);


  /*
    96 NORMAL PETALS
  */

  const layerDefs = [
    ["outer", 32],
    ["middle", 34],
    ["inner", 30]
  ];


  const specialAngles = [
    146, 160, 174, 188,
    202, 216, 230,

    14, 28, 42, 56,
    70, 84, 98
  ];


  let index = 0;


  for (
    const [layer, count]
    of layerDefs
  ) {

    for (
      let i = 0;
      i < count;
      i++
    ) {

      let angle =
        (i / count) *
        360 -
        90;

      let special =
        false;

      let memoryIndex =
        -1;


      if (layer === "outer") {

        const specialOuterIndices =
          new Set([
            1, 3, 5, 7,
            9, 11, 13,
            18, 20, 22,
            24, 26, 28,
            30
          ]);


        if (
          specialOuterIndices
            .has(i)
        ) {

          special = true;

          memoryIndex =
            specialIndex++;

        }

      }


      createPetal(
        svg,
        index,
        layer,
        angle,
        special,
        memoryIndex
      );

      index++;

    }

  }


  /* =======================================================
     YOUR MANUALLY POSITIONED INNER BUD
     ======================================================= */

  for (let i = 0; i < 14; i++) {

    const angle =
      (i / 14) *
      360;

    const rad =
      angle *
      Math.PI /
      180;


    /*
      IMPORTANT:
      THESE VALUES ARE YOUR MANUAL POSITION.
      DO NOT CHANGE THEM.
    */

    const radius = 102;

    const x =
      491 +
      Math.cos(rad) *
      radius;

    const y =
      500 +
      Math.sin(rad) *
      radius;


    const group =
      svgEl(
        "g",
        {
          class:
            "inner-cup-petal",

          "data-memory-index":
            i,

          "data-angle":
            angle
        }
      );


    /*
      THIS IS THE ORIGINAL
      POSITIONING YOU CREATED.
    */

    const originalTransform =
      `translate(${x} ${y}) ` +
      `rotate(${angle + 90}) ` +
      `translate(-43 0) ` +
      `scale(.48)`;


    group.setAttribute(
      "transform",
      originalTransform
    );


    group.dataset.originalTransform =
      originalTransform;


    group.appendChild(
      svgEl("path", {
        d:
          petalPath(
            86,
            150
          ),

        class:
          "petal-shape",

        fill:
          "url(#pinkInner)",

        opacity:
          ".96"
      })
    );


    svg.appendChild(group);

  }


  /*
    CENTER GOES LAST
  */

  createCenter(svg);


  flower.appendChild(svg);
}


/* =========================================================
   PLUCK PETAL
   ========================================================= */

function pluckPetal(
  positionGroup,
  animatedGroup,
  isSpecial,
  memoryIndex,
  dragX = 0,
  dragY = 0
) {

  if (
    positionGroup.classList
      .contains("plucked")
  ) {
    return;
  }


  positionGroup.classList.add(
    "plucked"
  );

  positionGroup.classList.remove(
    "hovered"
  );


  discovered++;

  updateCounter();


  const angle =
    Math.atan2(
      dragY,
      dragX
    ) *
    180 /
    Math.PI;


  const animation =
    animatedGroup.animate(
      [
        {
          transform:
            `translate(${dragX}px, ${dragY}px)
             rotate(${angle}deg)
             scale(1.2)`,

          opacity: 1
        },

        {
          transform:
            `translate(${dragX * 1.25}px, ${dragY * 1.25}px)
             rotate(${angle + 12}deg)
             scale(1.55)`,

          opacity: .95
        },

        {
          transform:
            `translate(${dragX * 1.7}px, ${dragY * 1.7}px)
             rotate(${angle + 25}deg)
             scale(2.1)`,

          opacity: 0
        }
      ],
      {
        duration:
          isSpecial
            ? 800
            : 650,

        easing:
          "cubic-bezier(.16,.78,.18,1)",

        fill:
          "forwards"
      }
    );


  animation.finished.then(
    () => {

      positionGroup.remove();


      /*
        ALL 96 NORMAL PETALS GONE
      */

      if (
        discovered ===
        TOTAL_PETALS
      ) {

        bloomBud();

      }

    }
  );


  /*
    SPECIAL MEMORY PETAL
  */

  if (isSpecial) {

    setTimeout(
      () => {
        showMemory(
          memoryIndex
        );
      },
      500
    );

  }

}


/* =========================================================
   FINAL BUD BLOOM
   ========================================================= */

function bloomBud() {

  if (finalBloomStarted) {
    return;
  }

  finalBloomStarted = true;


  setTimeout(() => {

    flower.classList.add(
      "bud-blooming"
    );


    const innerPetals =
      flower.querySelectorAll(
        ".inner-cup-petal"
      );


    /*
      FIRST:
      Animate all 14 inner petals outward.
    */

    innerPetals.forEach(
      (petal, index) => {

        const angle =
          (index / 14) *
          Math.PI *
          2;


        /*
          The petals open outward
          from their existing position.
        */

        const outwardX =
          Math.cos(angle) *
          80;

        const outwardY =
          Math.sin(angle) *
          80;


        const originalTransform =
          petal.dataset
            .originalTransform;


        petal.animate(
          [
            {
              transform:
                originalTransform,

              opacity: 1
            },

            {
              transform:
                originalTransform +
                ` translate(${outwardX * .35}px, ${outwardY * .35}px)
                  scale(1.25)`,

              opacity: 1
            },

            {
              transform:
                originalTransform +
                ` translate(${outwardX}px, ${outwardY}px)
                  scale(1.55)`,

              opacity: 1
            }
          ],
          {
            duration: 1800,
            delay: index * 45,
            easing:
              "cubic-bezier(.16,.82,.18,1)",
            fill: "forwards"
          }
        );

      }
    );


    /*
      THEN:
      Reveal the 14 photos.
    */

    setTimeout(() => {

      showAllBloomMemories();

    }, 1150);


  }, 400);

}


/* =========================================================
   SHOW ALL 14 FINAL MEMORIES
   ========================================================= */

function showAllBloomMemories() {

  /*
    Prevent duplicates.
  */

  flower
    .querySelectorAll(
      ".bloom-memory"
    )
    .forEach(
      el => el.remove()
    );


  MEMORIES.forEach(
    (memory, index) => {

      createBloomMemory(
        memory,
        index
      );

    }
  );

}


/* =========================================================
   CREATE FINAL MEMORY PHOTO
   ========================================================= */

function createBloomMemory(
  memory,
  index
) {

  const photo =
    document.createElement(
      "div"
    );


  photo.className =
    "bloom-memory";


  photo.dataset.index =
    index;


  const img =
    document.createElement(
      "img"
    );


  img.src =
    memory.image;

  img.alt =
    memory.title;


  const number =
    document.createElement(
      "div"
    );


  number.className =
    "bloom-memory-number";


  number.textContent =
    index + 1;


  photo.appendChild(img);
  photo.appendChild(number);


  flower.appendChild(photo);


  /*
    14 photos distributed
    evenly around the flower.
  */

  const angle =
    (index / 14) *
    Math.PI *
    2 -
    Math.PI / 2;


  /*
    Distance from center.
    Adjust this ONLY if you ever
    want the photos closer/farther.
  */

  const distance =
    window.innerWidth <= 600
      ? 150
      : 265;


  const x =
    Math.cos(angle) *
    distance;


  const y =
    Math.sin(angle) *
    distance;


  photo.style.setProperty(
    "--photo-x",
    `${x}px`
  );

  photo.style.setProperty(
    "--photo-y",
    `${y}px`
  );


  /*
    Small stagger so the photos
    bloom one after another.
  */

  setTimeout(() => {

    photo.classList.add(
      "show"
    );

  }, index * 100);

}


/* =========================================================
   COUNTER
   ========================================================= */

function updateCounter() {

  counter.textContent =
    `${discovered} ${
      discovered === 1
        ? "petal"
        : "petals"
    } discovered`;


  if (discovered > 0) {
    hint.style.opacity =
      "0";
  }

}


/* =========================================================
   NORMAL MEMORY OVERLAY
   ========================================================= */

function showMemory(index) {

  const memory =
    MEMORIES[index];


  if (!memory) {
    return;
  }


  memoryImage.src =
    memory.image;

  memoryImage.alt =
    memory.title;


  memoryNumber.textContent =
    `Memory ${
      index + 1
    } of ${
      MEMORIES.length
    }`;


  memoryTitle.textContent =
    memory.title;


  memoryText.textContent =
    memory.text;


  memoryOverlay.classList.remove(
    "hidden"
  );

}


/* =========================================================
   CLOSE MEMORY
   ========================================================= */

closeMemory.addEventListener(
  "click",
  () => {

    memoryOverlay.classList.add(
      "hidden"
    );

  }
);


memoryOverlay.addEventListener(
  "click",
  (event) => {

    if (
      event.target ===
      memoryOverlay
    ) {

      memoryOverlay.classList.add(
        "hidden"
      );

    }

  }
);


/* =========================================================
   FINAL OVERLAY
   ========================================================= */

function showFinal() {

  finalOverlay.classList.remove(
    "hidden"
  );

}


/* =========================================================
   RESTART
   ========================================================= */

restartBtn.addEventListener(
  "click",
  () => {

    finalOverlay.classList.add(
      "hidden"
    );

    memoryOverlay.classList.add(
      "hidden"
    );


    discovered = 0;

    finalBloomStarted = false;


    buildFlower();

    updateCounter();


    hint.style.opacity =
      ".55";

  }
);


/* =========================================================
   ENTER EXPERIENCE
   ========================================================= */

enterBtn.addEventListener(
  "click",
  async () => {

    intro.classList.add(
      "hidden"
    );

    experience.classList.remove(
      "hidden"
    );


    try {

      await music.play();

    } catch (error) {

      console.log(
        "Music could not autoplay. Check assets/music/our-song.mp3."
      );

    }


    scheduleBreeze();

  }
);


/* =========================================================
   BREEZE
   ========================================================= */

function scheduleBreeze() {

  const timings = [
    5000,
    10000,
    20000,
    40000
  ];


  const delay =
    timings[
      breezeStep %
      timings.length
    ];


  breezeTimer =
    setTimeout(
      () => {

        makeBreeze();

        breezeStep++;

        scheduleBreeze();

      },
      delay
    );

}


/* =========================================================
   MAKE BREEZE
   ========================================================= */

function makeBreeze() {

  flower.classList.add(
    "breezing"
  );


  setTimeout(
    () => {

      flower.classList.remove(
        "breezing"
      );

    },
    2400
  );


  for (
    let i = 0;
    i < 4;
    i++
  ) {

    const loosePetal =
      document.createElement(
        "div"
      );


    loosePetal.className =
      "breeze-petal";


    loosePetal.style.top =
      `${34 + Math.random() * 34}%`;


    loosePetal.style.animationDelay =
      `${Math.random() * .45}s`;


    breezeLayer.appendChild(
      loosePetal
    );


    requestAnimationFrame(
      () => {

        loosePetal.classList.add(
          "fly"
        );

      }
    );


    setTimeout(
      () => {

        loosePetal.remove();

      },
      3400
    );

  }

}


/* =========================================================
   INITIAL BUILD
   ========================================================= */

buildFlower();

updateCounter();