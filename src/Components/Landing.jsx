import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "@studio-freight/lenis";

const Landing = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const descriptionRef = useRef(null);
  const buttonsRef = useRef(null);
  const badgeRef = useRef(null);
  const aboutRef = useRef(null);
  const navRef = useRef(null);

  // Navigation items with their section IDs
  const navItems = [
    { name: "Home", id: "home" },
    { name: "About", id: "about" },
    { name: "How to Work", id: "how-to-work" },
    { name: "Features", id: "features" },
    { name: "FAQ", id: "faq" },
  ];

  // Smooth scroll to section
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const lenisInstance = window.lenis;
      if (lenisInstance) {
        lenisInstance.scrollTo(element, { offset: 0, duration: 1.2 });
      } else {
        element.scrollIntoView({ behavior: "smooth" });
      }
      setMobileMenuOpen(false);
    }
  };

  useEffect(() => {
    // Initialize Lenis for smooth scrolling
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    window.lenis = lenis;

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);

    // Hero animations
    const tl = gsap.timeline();
    tl.fromTo(
      badgeRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" },
    )
      .fromTo(
        titleRef.current,
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power3.out" },
        "-=0.3",
      )
      .fromTo(
        subtitleRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
        "-=0.5",
      )
      .fromTo(
        descriptionRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: "power3.out" },
        "-=0.4",
      )
      .fromTo(
        buttonsRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" },
        "-=0.3",
      );

    // About section animation
    gsap.fromTo(
      aboutRef.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        scrollTrigger: {
          trigger: aboutRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
      },
    );

    // Cleanup
    return () => {
      lenis.destroy();
      window.lenis = null;
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 overflow-x-hidden">
      {/* Navigation */}
      <nav
        ref={navRef}
        className="fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-lg border-b border-white/10"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 md:h-20">
            {/* Logo */}
            <div
              className="flex items-center space-x-2 cursor-pointer"
              onClick={() => scrollToSection("home")}
            >
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-4 h-4 text-white"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"
                  />
                </svg>
              </div>
              <img
                src="https://xrpaibot.org/images/XRP.png"
                alt="XRP Logo"
                className="w-8 h-8"
              />
              <span className="text-white font-bold text-xl">XRPAiBot</span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="text-gray-300 hover:text-white transition-colors duration-300 text-sm font-medium cursor-pointer"
                >
                  {item.name}
                </button>
              ))}
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-white focus:outline-none"
              aria-label="Toggle menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {mobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-black/90 backdrop-blur-lg border-b border-white/10">
            <div className="px-4 py-4 space-y-3">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="block w-full text-left text-gray-300 hover:text-white transition-colors duration-300 py-2 text-base font-medium"
                >
                  {item.name}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section
        id="home"
        className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-[#050321] via-[#2b0057] to-[#4a0072] px-6 lg:px-12 pt-20"
      >
        <div className="max-w-7xl mx-auto w-full relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* LEFT CONTENT */}
            <div className="text-center lg:text-left">
              <p
                ref={badgeRef}
                className="text-cyan-400 font-bold uppercase tracking-wider mb-4 md:mb-6 text-sm md:text-base"
              >
                THE FUTURE OF TRADING
              </p>

              <h1
                ref={titleRef}
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-4 md:mb-6"
              >
                <span className="text-white">The best performing</span>
                <br />
                <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                  AI-Powered
                </span>
                <br />
                <span className="text-[#8c8cff]">Ecosystem</span>
              </h1>

              <p
                ref={descriptionRef}
                className="text-gray-300 text-base md:text-lg leading-relaxed max-w-xl mx-auto lg:mx-0 mb-6 md:mb-10"
              >
                XRPAiBot is a decentralized AI-powered ecosystem driven by
                community governance. Join our global digital community and
                transform your economic future through decentralized wealth
                exchange.
              </p>

              <div
                ref={buttonsRef}
                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              >
                <button className="bg-gradient-to-r from-cyan-500 to-blue-600 px-6 md:px-8 py-3 md:py-4 rounded-xl text-white font-semibold hover:scale-105 transition">
                  Connect Wallet ⚡
                </button>
                <button className="border border-purple-500 px-6 md:px-8 py-3 md:py-4 rounded-xl text-white hover:bg-purple-500/10 transition">
                  Explore Features
                </button>
              </div>
            </div>

            {/* RIGHT IMAGE */}
            <div className="relative flex justify-center mt-8 lg:mt-0">
              {/* Top Badge */}
              <div className="absolute top-0 right-5 lg:right-10 rotate-6 bg-[#25205f] border border-cyan-500/30 px-4 lg:px-6 py-2 lg:py-3 rounded-2xl backdrop-blur-md">
                <span className="text-cyan-400 font-semibold text-sm lg:text-base">
                  AI Powered
                </span>
              </div>

              {/* Main Card */}
              <div className="relative bg-gradient-to-b from-[#26185f] to-[#1c1447] rounded-[40px] p-6 lg:p-8 shadow-[0_0_80px_rgba(139,92,246,0.3)]">
                <img
                  src="src/assets/image.png"
                  alt="XRPAiBot"
                  className="w-full max-w-[350px] sm:max-w-[450px] lg:max-w-[550px] object-contain animate-float"
                />
              </div>

              {/* Bottom Badge */}
              <div className="absolute bottom-0 left-5 lg:left-10 -rotate-3 bg-[#25205f] border border-purple-500/30 px-4 lg:px-6 py-2 lg:py-3 rounded-2xl backdrop-blur-md">
                <span className="text-[#b388ff] font-semibold text-sm lg:text-base">
                  24/7 Active
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section - Global Digital Community */}
      <section
        id="about"
        className="relative py-16 md:py-24 overflow-hidden bg-gradient-to-br from-[#18003a] via-[#3a0a6b] to-[#060026]"
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* LEFT IMAGE */}
            <div className="relative order-2 lg:order-1">
              <div className="relative rounded-[30px] overflow-hidden bg-[#24114f] shadow-[0_0_60px_rgba(59,130,246,0.25)]">
                <img
                  src="src/assets/image copy.png"
                  alt="AI Brain"
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>

            {/* RIGHT CONTENT */}
            <div className="order-1 lg:order-2 text-center lg:text-left">
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6 md:mb-8">
                XRP Ai Bot – Global Digital
                <br className="hidden sm:block" />
                Community
              </h2>

              <p className="text-gray-300 text-base md:text-xl leading-relaxed mb-4 md:mb-6">
                XRP Ai Bot is a global digital community driven by xrpaibot.org
                community. Our online crypto decentralized ecosystem provides a
                platform where people are able to exchange wealth.
              </p>

              <p className="text-gray-300 text-base md:text-xl leading-relaxed mb-8 md:mb-10">
                Participation from members is what will help faster grow the
                organization, and encouraging participation among the community
                will help strengthen its reputation and credibility.
              </p>

              {/* Stats Cards */}
              <div className="grid grid-cols-2 gap-3 sm:gap-5">
                <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl sm:rounded-3xl p-4 sm:p-8 text-center hover:bg-white/10 transition">
                  <h3 className="text-3xl sm:text-5xl font-bold text-cyan-400 mb-1 sm:mb-2">
                    100%
                  </h3>
                  <p className="text-gray-300 text-sm sm:text-base font-medium">
                    Decentralized
                  </p>
                </div>
                <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl sm:rounded-3xl p-4 sm:p-8 text-center hover:bg-white/10 transition">
                  <h3 className="text-3xl sm:text-5xl font-bold text-indigo-400 mb-1 sm:mb-2">
                    AI
                  </h3>
                  <p className="text-gray-300 text-sm sm:text-base font-medium">
                    Powered
                  </p>
                </div>
                <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl sm:rounded-3xl p-4 sm:p-8 text-center hover:bg-white/10 transition">
                  <h3 className="text-3xl sm:text-5xl font-bold text-purple-400 mb-1 sm:mb-2">
                    24/7
                  </h3>
                  <p className="text-gray-300 text-sm sm:text-base font-medium">
                    Automated
                  </p>
                </div>
                <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl sm:rounded-3xl p-4 sm:p-8 text-center hover:bg-white/10 transition">
                  <h3 className="text-3xl sm:text-5xl font-bold text-green-400 mb-1 sm:mb-2">
                    Global
                  </h3>
                  <p className="text-gray-300 text-sm sm:text-base font-medium">
                    Community
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How to Work Section */}
      <section
        id="how-to-work"
        className="relative py-16 md:py-24 px-4 sm:px-6 lg:px-8 overflow-hidden"
      >
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#120026] via-[#2b0050] to-[#0b0018]" />

        {/* Glow Effects */}
        <div className="absolute top-40 left-20 w-72 h-72 bg-purple-700/20 blur-[120px] rounded-full" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-600/20 blur-[140px] rounded-full" />

        <div className="relative z-10 max-w-7xl mx-auto text-center">
          {/* Center Image */}
          <div className="flex justify-center mb-12 md:mb-16">
            <img
              src="src/assets/image copy 2.png"
              alt="AI Trading Bot"
              className="w-full max-w-[280px] sm:max-w-md md:max-w-lg object-contain drop-shadow-[0_0_60px_rgba(139,92,246,0.5)]"
            />
          </div>

          {/* Heading */}
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold text-white mb-4 md:mb-6">
            How It Works
          </h2>

          <p className="text-gray-300 max-w-4xl mx-auto text-base md:text-xl leading-relaxed mb-12 md:mb-20 px-4">
            Powered by smart contracts on the blockchain, XRP Ai Bot operates in
            a fully decentralized ecosystem. The system continuously gathers
            real-time trading data, analyzes market opportunities using advanced
            AI, and executes profitable trades automatically.
          </p>

          {/* Steps */}
          <div className="grid md:grid-cols-3 gap-6 md:gap-10">
            {[
              {
                step: "01",
                title: "Connect Wallet",
                desc: "Securely connect your crypto wallet to the XRP Ai Bot platform.",
              },
              {
                step: "02",
                title: "AI Market Analysis",
                desc: "Advanced AI algorithms scan and identify profitable opportunities.",
              },
              {
                step: "03",
                title: "Automated Trading",
                desc: "Trades are executed automatically through decentralized smart contracts.",
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 md:p-8 hover:bg-white/10 transition-all duration-300"
              >
                <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent mb-3 md:mb-4">
                  {item.step}
                </div>
                <h3 className="text-xl md:text-2xl font-semibold text-white mb-2 md:mb-3">
                  {item.title}
                </h3>
                <p className="text-gray-400 text-sm md:text-base leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section
        id="features"
        className="relative py-16 md:py-24 px-6 lg:px-8 overflow-hidden"
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* LEFT CONTENT */}
            <div className="text-center lg:text-left">
              {/* Top Badge */}
              <div className="inline-flex items-center px-4 md:px-5 py-2 mb-6 rounded-full bg-cyan-500/20 border border-cyan-400/30">
                <span className="text-cyan-400 font-semibold text-xs md:text-sm">
                  🚀 Start Registration
                </span>
              </div>

              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-4 md:mb-6">
                Beyond a Crypto
                <br />
                Ecosystem
              </h2>

              <p className="text-gray-300 text-base md:text-xl leading-relaxed mb-4 md:mb-6">
                XRP Ai Bot is more than a crypto ecosystem, it's a vibrant
                global community powered by XRP Ai Bot users that brings people
                together online and supports real-world meetings.
              </p>

              <p className="text-gray-400 text-sm md:text-lg leading-relaxed mb-8 md:mb-10">
                Engagement is the driving force behind our platform. You can
                reach people across the globe with a few clicks and transform
                economic opportunities through decentralized technology.
              </p>

              {/* Features List */}
              <div className="space-y-4 md:space-y-6">
                <div className="flex items-center gap-3 md:gap-4 justify-center lg:justify-start">
                  <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-teal-500 flex items-center justify-center text-white text-sm md:text-base">
                    ✓
                  </div>
                  <span className="text-white text-lg md:text-xl font-medium">
                    Global Digital Community
                  </span>
                </div>
                <div className="flex items-center gap-3 md:gap-4 justify-center lg:justify-start">
                  <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-teal-500 flex items-center justify-center text-white text-sm md:text-base">
                    ✓
                  </div>
                  <span className="text-white text-lg md:text-xl font-medium">
                    Decentralized Wealth Exchange
                  </span>
                </div>
                <div className="flex items-center gap-3 md:gap-4 justify-center lg:justify-start">
                  <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-teal-500 flex items-center justify-center text-white text-sm md:text-base">
                    ✓
                  </div>
                  <span className="text-white text-lg md:text-xl font-medium">
                    Community-Driven Growth
                  </span>
                </div>
              </div>
            </div>

            {/* RIGHT IMAGE */}
            <div className="relative">
              <div className="rounded-[35px] overflow-hidden bg-gradient-to-br from-[#2b175d] to-[#182a60] p-4 md:p-6 shadow-[0_0_80px_rgba(59,130,246,0.2)]">
                <img
                  src="src/assets/image copy 3.png"
                  alt="AI Robot"
                  className="w-full h-auto object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section
        id="faq"
        className="py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-black/30"
      >
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-white text-center mb-8 md:mb-12">
            FAQ
          </h2>
          <div className="space-y-4">
            {[
              {
                q: "What is XRPAiBot?",
                a: "XRPAiBot is a decentralized AI-powered trading ecosystem that leverages machine learning to optimize trading strategies.",
              },
              {
                q: "How do I get started?",
                a: "Simply connect your wallet, deposit funds, and our AI bot will start trading automatically.",
              },
              {
                q: "Is it safe?",
                a: "Yes, all transactions are secured by smart contracts on the blockchain.",
              },
            ].map((faq, idx) => (
              <div
                key={idx}
                className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 overflow-hidden"
              >
                <details className="group">
                  <summary className="flex justify-between items-center cursor-pointer p-4 md:p-6 text-white font-semibold hover:bg-white/5 transition-colors list-none">
                    <span className="text-sm md:text-base">{faq.q}</span>
                    <span className="text-purple-400 group-open:rotate-45 transition-transform duration-300 text-xl md:text-2xl">
                      +
                    </span>
                  </summary>
                  <div className="px-4 md:px-6 pb-4 md:pb-6 text-gray-400 text-sm md:text-base border-t border-white/10 pt-3 md:pt-4">
                    {faq.a}
                  </div>
                </details>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section
        id="cta"
        className="relative py-16 md:py-24 px-6 lg:px-8 overflow-hidden"
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* LEFT CONTENT */}
            <div className="text-center lg:text-left">
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-4 md:mb-6">
                Join the Future of
                <br />
                <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                  Decentralized Trading
                </span>
              </h2>

              <p className="text-gray-300 text-base md:text-xl leading-relaxed max-w-2xl mb-8 md:mb-10">
                Be part of the XRP Ai Bot revolution. Experience the power of
                AI-driven decentralized trading with community governance and
                transparent blockchain technology.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <button className="bg-gradient-to-r from-cyan-500 to-blue-600 px-6 md:px-8 py-3 md:py-4 rounded-xl text-white font-semibold hover:scale-105 transition-all duration-300">
                  Connect Wallet ⚡
                </button>
                <button className="border border-purple-500 px-6 md:px-8 py-3 md:py-4 rounded-xl text-white hover:bg-white/10 transition-all duration-300">
                  Learn More
                </button>
              </div>
            </div>

            {/* RIGHT IMAGE */}
            <div className="relative flex justify-center">
              <div className="relative rounded-[30px] overflow-hidden bg-gradient-to-br from-[#27145d] to-[#182d67] p-4 md:p-6 shadow-[0_0_60px_rgba(59,130,246,0.25)]">
                <img
                  src="src/assets/image copy 4.png"
                  alt="AI Robot"
                  className="w-full max-w-[420px] md:max-w-[520px] object-contain animate-float"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-[#020817] py-10 md:py-14 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8 md:gap-10">
            {/* Logo Section */}
            <div className="sm:col-span-2 md:col-span-1">
              <div className="flex items-center gap-3 mb-4">
                <img
                  src="src/assets/image copy 5.png"
                  alt="XRPAiBot Logo"
                  className="w-10 h-10 md:w-12 md:h-12 object-contain"
                />
                <h3 className="text-2xl md:text-3xl font-bold text-white">
                  XRPAiBot
                </h3>
              </div>
              <p className="text-gray-400 text-sm md:text-base leading-relaxed max-w-sm">
                A decentralized AI-powered ecosystem driven by community
                governance. Join our global digital community and transform your
                economic future.
              </p>
            </div>

            {/* Navigation */}
            <div>
              <h4 className="text-white font-semibold mb-4 text-base md:text-lg">
                Navigation
              </h4>
              <div className="space-y-2 md:space-y-3">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className="block text-gray-400 hover:text-white transition text-sm md:text-base"
                  >
                    {item.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Features */}
            <div>
              <h4 className="text-white font-semibold mb-4 text-base md:text-lg">
                Features
              </h4>
              <div className="space-y-2 md:space-y-3 text-gray-400 text-sm md:text-base">
                <p>AI Trading</p>
                <p>Smart Contracts</p>
                <p>Community Governance</p>
                <p>Wealth Exchange</p>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-white font-semibold mb-4 text-base md:text-lg">
                Quick Links
              </h4>
              <div className="space-y-2 md:space-y-3 text-gray-400 text-sm md:text-base">
                <p>Contact Support</p>
                <p>Get Started</p>
                <p>Help Center</p>
                <p>About Us</p>
              </div>
            </div>
          </div>

          <div className="border-t border-white/10 mt-8 md:mt-10 pt-6 md:pt-6 text-center text-gray-500 text-xs md:text-sm">
            © 2024 XRPAiBot. All rights reserved.
          </div>
        </div>
      </footer>

      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default Landing;
