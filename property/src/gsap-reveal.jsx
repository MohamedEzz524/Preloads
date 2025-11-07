import { gsap } from "gsap";
import imagesLoaded from "imagesloaded";
import { useLayoutEffect, useRef } from "react";

import heroImage from "./assets/joachim-lesne-g16w8lkm3E0-unsplash.jpg";

function GsapReveal() {
  const loaderRef = useRef(null);
  const svgRef = useRef(null);
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    const loader = loaderRef.current;
    const svg = svgRef.current;
    const section = sectionRef.current;

    if (!loader || !svg || !section) {
      return;
    }

    gsap.set(loader, { autoAlpha: 1, pointerEvents: "auto" });

    gsap.set(section.querySelectorAll("h1, p"), {
      yPercent: 100,
      opacity: 0,
    });

    const timeline = gsap
      .timeline({ paused: true })
      .to(svg, {
        scale: 0,
        duration: 0.8,
        ease: "power3.inOut",
      })
      .to(
        loader.querySelectorAll(".blinder"),
        {
          scaleY: 0,
          duration: 0.8,
          ease: "power4.inOut",
          stagger: 0.1,
        },
        "-=0.4"
      )
      .to(
        section.querySelectorAll("h1, p"),
        {
          yPercent: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.1,
        },
        "-=0.3"
      )
      .set(loader, { autoAlpha: 0, pointerEvents: "none" });

    const imgTargets = [section, ...document.querySelectorAll("img")];
    const imgLoad = imagesLoaded(imgTargets, { background: true });

    const playTimeline = () => {
      if (!timeline.isActive()) {
        timeline.play();
      }
    };

    if (imgLoad.isComplete) {
      playTimeline();
    }

    imgLoad.on("done", playTimeline);
    imgLoad.on("fail", playTimeline);

    return () => {
      timeline.kill();
      imgLoad.off("done", playTimeline);
      imgLoad.off("fail", playTimeline);
    };
  }, []);
  return (
    <>
      <div className="loader" ref={loaderRef}>
        <div className="blinder-container">
          <div className="blinder"></div>
          <div className="blinder"></div>
          <div className="blinder"></div>
          <div className="blinder"></div>
          <div className="blinder"></div>
        </div>

        <svg
          ref={svgRef}
          viewBox="0 0 86 86"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <filter id="goo">
              <feGaussianBlur
                in="SourceGraphic"
                stdDeviation="10"
                result="blur"
              />
              <feColorMatrix
                in="blur"
                type="matrix"
                values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7"
                result="goo"
              />
              <feBlend in="SourceGraphic" in2="goo" />
            </filter>
          </defs>

          <mask
            id="mask0_1_32"
            style={{ maskType: "alpha" }}
            maskUnits="userSpaceOnUse"
            x="0"
            y="0"
            width="86"
            height="86"
          >
            <circle cx="43" cy="43.1161" r="42.4299" fill="white" />
          </mask>

          <g mask="url(#mask0_1_32)" filter="url(#goo)">
            <circle
              cx="43"
              cy="43.1161"
              r="40.4299"
              stroke="white"
              strokeWidth="4"
            />
            <circle cx="43" cy="-25.3367" r="45.8453" fill="white" />
            <path
              className="drip-loader"
              d="M43.9141 -15.413C43.5625 -16.2057 42.4375 -16.2057 42.0859 -15.413L34.2829 2.17821C33.4045 3.67557 32.9009 5.41937 32.9009 7.28079C32.9009 12.8584 37.4224 17.3799 43 17.3799C48.5776 17.3799 53.0991 12.8584 53.0991 7.28079C53.0991 5.41928 52.5954 3.6754 51.717 2.17799L43.9141 -15.413Z"
              fill="white"
            />
          </g>
        </svg>
      </div>

      <section ref={sectionRef}>
        <div className="mask">
          <h1>So snazzy.</h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Delectus
            distinctio mollitia quidem quis cupiditate recusandae, tenetur modi
            accusantium cum adipisci.
          </p>
        </div>
      </section>

      <img src={heroImage} style={{ display: "none" }} alt="pic" />
    </>
  );
}

export default GsapReveal;
