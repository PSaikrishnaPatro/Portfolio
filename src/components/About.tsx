import React, { JSX, useEffect, useRef, useState } from "react";
import { Code, Timer, Cpu, Trophy } from "lucide-react";
import "./About.css";

export function About(): JSX.Element {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [titleVisible, setTitleVisible] = useState(false);
  const [infoVisible, setInfoVisible] = useState(false);
  const [extraVisible, setExtraVisible] = useState(false);
  const [hobbiesVisible, setHobbiesVisible] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  const extraRef = useRef<HTMLDivElement>(null);
  const whoamiTitleRef = useRef<HTMLHeadingElement>(null);
  const whoamiTriggered = useRef(false);

  const NAVBAR_HEIGHT = 80;
  const IMAGE_STOP_OFFSET = 60;
  const isMobile = window.innerWidth <= 768;

  /* ================= TITLE REVEAL ================= */
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setTitleVisible(true),
      { threshold: 0.5 }
    );

    const intro = document.querySelector(".about-intro-screen");
    if (intro) observer.observe(intro);

    return () => observer.disconnect();
  }, []);

  /* ================= IMAGE SCROLL (DESKTOP ONLY) ================= */
  useEffect(() => {
    if (isMobile) return;

    let ticking = false;

    const handleScroll = () => {
      if (!containerRef.current || ticking) return;

      ticking = true;
      requestAnimationFrame(() => {
        const el = containerRef.current;
        if (!el) {
          ticking = false;
          return;
        }

        const rect = el.getBoundingClientRect();
        const scrolled = Math.max(
          0,
          NAVBAR_HEIGHT + IMAGE_STOP_OFFSET - rect.top
        );
        const progress = Math.min(
          scrolled / (window.innerHeight * 0.25),
          1
        );

        setScrollProgress(progress);
        ticking = false;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [isMobile]);

  /* ================= WHO AM I REVEAL ================= */
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !whoamiTriggered.current) {
          whoamiTriggered.current = true;

          setTimeout(() => {
            setInfoVisible(true);
            setTimeout(() => {
              whoamiTitleRef.current?.classList.add("type");
            }, 200);
          }, 600);
        }
      },
      { threshold: isMobile ? 0.3 : 0.7 }
    );

    if (infoRef.current) observer.observe(infoRef.current);
    return () => observer.disconnect();
  }, [isMobile]);

  /* ================= EXTRA SECTION ================= */
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setExtraVisible(true),
      { threshold: isMobile ? 0.2 : 0.3 }
    );

    if (extraRef.current) observer.observe(extraRef.current);
    return () => observer.disconnect();
  }, [isMobile]);

  /* ================= HOBBIES ================= */
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setHobbiesVisible(true),
      { threshold: isMobile ? 0.2 : 0.3 }
    );

    const el = document.querySelector(".about-hobbies");
    if (el) observer.observe(el);

    return () => observer.disconnect();
  }, [isMobile]);

  /* ================= COUNTERS ================= */
  const counters = [
    { icon: Code, label: "Projects Completed", value: 5 },
    { icon: Timer, label: "Years Experience in AI", value: 2 },
    { icon: Cpu, label: "Technologies Mastered", value: 7 },
    { icon: Trophy, label: "LeetCode Solved", value: 200 },
  ];

  const [countValues, setCountValues] = useState(
    counters.map(() => 0)
  );

  useEffect(() => {
    if (!extraVisible) return;

    const intervals: number[] = [];

    counters.forEach((counter, index) => {
      let start = 0;
      const interval = window.setInterval(() => {
        start++;
        setCountValues((prev) => {
          const updated = [...prev];
          updated[index] = start;
          return updated;
        });

        if (start === counter.value) clearInterval(interval);
      }, 1500 / counter.value);

      intervals.push(interval);
    });

    return () => intervals.forEach(clearInterval);
  }, [extraVisible]);

  /* ================= IMAGE + TEXT HELPERS ================= */
  const getImageWidth = () => {
    if (isMobile) return 100;
    return scrollProgress < 0.2
      ? 100
      : scrollProgress < 0.6
      ? 100 - ((scrollProgress - 0.2) / 0.4) * 50
      : 50;
  };

  const getImageTransform = () => {
    if (isMobile) return "translateY(0)";
    return scrollProgress < 0.2
      ? `translateY(${100 - (scrollProgress / 0.2) * 100 + NAVBAR_HEIGHT}px)`
      : `translateY(${NAVBAR_HEIGHT}px)`;
  };

  const getTextOpacity = () => {
    if (isMobile) return 1;
    return scrollProgress < 0.4
      ? 0
      : scrollProgress < 0.6
      ? (scrollProgress - 0.4) / 0.2
      : 1;
  };

  return (
    <section id="about" className="about-wrapper">
      {/* INTRO */}
      <div className={`about-intro-screen ${titleVisible ? "show-title" : ""}`}>
        <h1>
          About <span className="grad">me?</span>
        </h1>
      </div>

      {/* MAIN SCROLL */}
      <div ref={containerRef} className="about-scroll">
        <div className="about-sticky">
          {/* IMAGE */}
          <div
            className="about-image"
            style={{
              width: `${getImageWidth()}%`,
              transform: `translateX(-50%) ${getImageTransform()}`,
            }}
          >
            <img src="/long.jpg" alt="Profile" />
          </div>

          {/* INFO */}
          <div
            ref={infoRef}
            className={`about-info ${infoVisible ? "info-show" : ""}`}
            style={{
              opacity: infoVisible ? getTextOpacity() : 0,
              width:
                isMobile || getImageWidth() <= 60 ? "100%" : "0%",
            }}
          >
            <div className="info-inner">
              <h2 ref={whoamiTitleRef} className="whoami-title">
                <span>Who am I?</span>
              </h2>

              <p>
                I’m P Saikrishna Patro, a tech-driven learner passionate
                about building real-world solutions.
              </p>

              <p>
                I enjoy exploring AI, machine learning, and innovative
                software development.
              </p>

              <p>
                4th-year B.Tech CSE student with hands-on ML & DL
                experience. Skilled in Python, PyTorch, TensorFlow,
                and data preprocessing.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* COUNTERS */}
      <div
        ref={extraRef}
        className={`about-extra ${extraVisible ? "extra-show" : ""}`}
      >
        <div className="about-counters">
          {counters.map((c, i) => {
            const Icon = c.icon;
            return (
              <div key={i} className="counter-box">
                <Icon size={42} className="counter-icon" />
                <h3>{countValues[i]}+</h3>
                <p>{c.label}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* HOBBIES */}
      <div
        className={`about-hobbies ${
          hobbiesVisible ? "hobbies-show" : "hobbies-hidden"
        }`}
      >
        <h2>Hobbies</h2>
        <div className="hobby-grid">
          <div className="hobby">🎧 Listening to Music</div>
          <div className="hobby">📷 Photography</div>
          <div className="hobby">🎮 Gaming</div>
          <div className="hobby">🏀 Sports & Fitness</div>
        </div>
      </div>
    </section>
  );
}
