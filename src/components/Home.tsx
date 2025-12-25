import React, { useState, useEffect } from "react";
import { color, motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import "./Home.css";

const githubLogo = "/github.png";
const linkedinLogo = "/linkedin.png";
const gmailLogo = "/gmail.png";
const instagramLogo = "/insta.png";
const facebookLogo = "/facebook.png";
const leetcodeLogo = "/leetcode.png";
const whatsappLogo = "/whatsapp.png";

interface HeroProps {
  theme: "light" | "dark"; // pass theme from global state
}

export function Home({ theme }: HeroProps) {
  const roles = [
    "AI Enthusiast",
    "Machine Learning Engineer",
    "Deep Learning Practitioner",
    "Computer Vision Researcher",
    "Developer",
  ];

  const connectLinks = [
    { img: linkedinLogo, link: "https://www.linkedin.com/in/p-saikrishna-patro-2003psp/" },
    { img: gmailLogo, link: "mailto:bantypatro2003@gmail.com" },
    { img: whatsappLogo, link: "https://wa.me/+917205865058" },
    { img: instagramLogo, link: "https://www.instagram.com/bantypatro2003/" },
    { img: facebookLogo, link: "https://www.facebook.com/banty.patro.79" },
  ];

  const workLinks = [
    { img: githubLogo, link: "https://github.com/PSaikrishnaPatro" },
    { img: leetcodeLogo, link: "https://leetcode.com/u/psaikrishnapatro03/" },
  ];

  const [typedRoles, setTypedRoles] = useState("");
  const rolesText = "Artificial Intelligence Engineer | Frontend Developer | Tech Explorer";

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setTypedRoles(rolesText.slice(0, i + 1));
      i++;
      if (i === rolesText.length) clearInterval(interval);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2, when: "beforeChildren" } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 80 } },
  };


  return (
    <section id="home" className="hero">
      <div
        className="hero-bg"
        style={{
          backgroundImage: `url(${theme === "light" ? "/j.jpg" : "/Hero.jpg"})`,
        }}
      />

      <motion.div className="hero-content" Variants={containerVariants} initial="hidden" animate="visible">
        <motion.h1 className="hero-name" Variants={itemVariants}>
          Hi! I’m <br />
          <span className="gradient-text hero-name-line">P Saikrishna Patro</span>
          <motion.div className="hero-line" Variants={itemVariants} />
        </motion.h1>

        <motion.p className="hero-intro typing-effect" Variants={itemVariants}>
          {typedRoles}
        </motion.p>

        <motion.p className="hero-intro" Variants={itemVariants}>
          Creating AI-powered solutions. 
          Building modern web experiences. 
          Solving real-world problems with technology.
        </motion.p>

        <motion.div className="hero-roles" Variants={itemVariants}>
          {roles.map((r, i) => (
            <motion.div key={i} className="role-tag" Variants={itemVariants}>
              {r}
            </motion.div>
          ))}
        </motion.div>

        <motion.div className="hero-info" Variants={itemVariants}>
          {[
            { label: "📍 Location", value: "Berhampur, Odisha, India" },
            { label: "💼 Expertise", value: "AI/ML, Problem Solving" },
            { label: "📞 Contact", value: "bantypatro2003@gmail.com" },
          ].map((info, i) => (
            <motion.div key={i} className="info-card" whileHover={{ scale: 1.05, y: -3 }} Variants={itemVariants}>
              <h4>{info.label}</h4>
              <p>{info.value}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div className="hero-socials" Variants={itemVariants}>
          <div className="social-group">
            <h5>Connect with me</h5>
            <div className="social-icons">
              {connectLinks.map((s, i) => (
                <motion.a
                  key={i}
                  href={s.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.2, rotate: 3 }}
                  Variants={itemVariants}
                >
                  <img src={s.img} className="social-icon" alt="" />
                </motion.a>
              ))}
            </div>
          </div>

          <div className="social-group">
            <h5>See what I'm doing</h5>
            <div className="social-icons">
              {workLinks.map((s, i) => (
                <motion.a
                  key={i}
                  href={s.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.2, rotate: 3 }}
                  Variants={itemVariants}
                >
                  <img src={s.img} className="social-icon" alt="" />
                </motion.a>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div
          className="hero-arrow"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          Variants={itemVariants}
        >
          <ArrowDown size={28} />
        </motion.div>
      </motion.div>
    </section>
  );
}

