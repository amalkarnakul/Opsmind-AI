import React, { useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faPhone } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import Logo from "../components/Logo";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const footerRef = useRef(null);

  useEffect(() => {
    const sections = footerRef.current.querySelectorAll(".footer-section");

    gsap.fromTo(
      sections,
      { opacity: 0, y: 100 },
      {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: "power2.out",
        stagger: 0.25,
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 80%", // animation starts when 80% of section is visible
          toggleActions: "play none none none",
        },
      },
    );

    gsap.fromTo(
      ".wave-svg",
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1.5,
        ease: "power2.out",
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 90%",
          toggleActions: "play none none none",
        },
      },
    );
  }, []);
    let date = new Date();
  let year = date.getFullYear();


  return (
    <div
      ref={footerRef}
      className="bg-linear-to-br from-indigo-900 via-slate-900 to-purple-900 "
    >
      {/* Wave section */}
      <div className="relative inline-block w-full h-[100px] sm:h-[150px] overflow-hidden wave-svg">
        <svg
          viewBox="0 0 500 150"
          preserveAspectRatio="none"
          className="w-full h-full "
        >
          <path
            d="M0,80 C150,120 350,40 500,90 L500,150 L0,150 Z"
            style={{ stroke: "none", fill: "" }}
          />
        </svg>
      </div>

      {/* Footer content */}
      <footer className="p-3 sm:p-10 text-white flex flex-wrap justify-evenly">
        {/* Column 1 */}
        <div className="footer-section mb-6 max-w-xs text-center sm:text-left">
          <Logo className="w-35 sm:w-40 mb-6 sm:mb-10 mx-auto sm:mx-0" />
          <p className="text-sm sm:text-base leading-relaxed">
            CivicPlus is the platform where your voice drives local change.
            Easily report issues like broken roads and pollution, vote with your
            neighbors to prioritize the most urgent problems, and ensure local
            governments take action based on the real needs of the community.
          </p>
        </div>

        {/* Column 2 */}
        <div className="footer-section mb-6 text-center sm:text-left">
          <h4 className="mb-4 font-semibold text-lg sm:text-xl">GET HELP</h4>
          <ul>
            <li className="mb-2 text-sm sm:text-lg">
              <Link to="/about" className="hover:underline">
                About
              </Link>
            </li>
            <li className="mb-2 text-sm sm:text-lg">
              <button className="hover:underline">Contact Us</button>
            </li>
            <li className="mb-2 text-sm sm:text-lg">
              <Link to="/features" className="hover:underline">
                Features
              </Link>
            </li>
          </ul>
        </div>

        {/* Column 3 */}
        <div className="footer-section mb-6 text-center sm:text-left">
          <h4 className="mb-4 font-semibold text-lg sm:text-xl">RESOURCES</h4>
          <ul>
            <li className="mb-2 text-sm sm:text-lg hover:underline">Home</li>
            <li className="mb-2 text-sm sm:text-lg hover:underline">
              <Link to="/docs" className="hover:underline">
                Docs
              </Link>
            </li>
            <li className="mb-2 text-sm sm:text-lg hover:underline">
              <Link to="/pricing" className="hover:underline">
                Pricing
              </Link>
            </li>
            <li className="mb-2 text-sm sm:text-lg hover:underline">
              <Link to="/worksapce" className="hover:underline">
                Workspace
              </Link>
            </li>
          </ul>
        </div>

        {/* Column 4 */}
        <div className="footer-section mb-6 text-center sm:text-left">
          <h4 className="mb-4 font-semibold text-lg sm:text-xl">CONTACT US</h4>
          <p className="text-sm sm:text-lg mb-2">
            <strong>
              <FontAwesomeIcon icon={faPhone} />
            </strong>{" "}
            +1 (123) 456-7890
          </p>
          {/* <p className="text-sm sm:text-lg mb-2">
            <strong>
              <FontAwesomeIcon icon={faEnvelope} />
            </strong>{" "}
            rahulheer344@gmail.com
          </p> */}

          <p className="text-sm sm:text-lg mb-2">
            <strong>
              <FontAwesomeIcon icon={faEnvelope} />
            </strong>{" "}
            neurodesk-ai@gmail.com
          </p>
        </div>

        {/* Bottom line */}
        <div className="footer-section w-full text-center mt-6 text-sm sm:text-lg">
          <p>COPYRIGHT &copy; ALL RIGHTS RESERVED {year}</p>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
