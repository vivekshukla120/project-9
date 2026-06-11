import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "@studio-freight/lenis";

const Landing = () => {
  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const descriptionRef = useRef(null);
  const buttonsRef = useRef(null);
  const badgeRef = useRef(null);
  const aboutRef = useRef(null);

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
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-lg border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center space-x-2">
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
              <span className="text-white font-bold text-xl">XRPAiBot</span>
            </div>

            {/* Desktop Navigation */}
            <div></div>
            <div className="hidden md:flex items-center space-x-8">
              {["Home", "About", "How to Work", "Features", "FAQ"].map(
                (item) => (
                  <a
                    key={item}
                    href={`#${item.toLowerCase().replace(/\s/g, "-")}`}
                    className="text-gray-300 hover:text-white transition-colors duration-300 text-sm font-medium"
                  >
                    {item}
                  </a>
                ),
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 min-h-screen flex items-center"
      >
        {/* Animated Background Elements */}
        <div className="absolute inset-0 ove                                                                                                 rflow-hidden">
          <div className="absolute top-20 left-10 w-72 h-72 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-72 h-72 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-1000"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center">
            {/* Badge */}
            <div
              ref={badgeRef}
              className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-8 border border-white/20"
            >
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-white text-sm font-medium">
                24/7 Active
              </span>
            </div>

            {/* Main Title - THE FUTURE OF TRADING */}
            <h1
              ref={titleRef}
              className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4"
            >
              THE FUTURE OF TRADING
            </h1>

            {/* Subtitle - The best performing */}
            <h2
              ref={subtitleRef}
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-8"
            >
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                The best performing
              </span>
            </h2>

            {/* Description */}
            <p
              ref={descriptionRef}
              className="text-base sm:text-lg text-gray-300 max-w-3xl mx-auto mb-10 leading-relaxed"
            >
              XRPAiBot is a decentralized AI-powered ecosystem driven by
              community governance. Join our global digital community and
              transform your economic future through decentralized wealth
              exchange.
            </p>

            {/* Buttons */}
            <div
              ref={buttonsRef}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <button className="group bg-gradient-to-r from-blue-500 to-purple-600 px-8 py-3 rounded-full text-white font-semibold hover:shadow-2xl hover:shadow-purple-500/30 transition-all duration-300 transform hover:scale-105">
                Connect Wallet
              </button>
              <button className="border-2 border-white/30 bg-white/5 backdrop-blur-sm px-8 py-3 rounded-full text-white font-semibold hover:bg-white/10 transition-all duration-300 transform hover:scale-105">
                Explore Features
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* About Section - Global Digital Community */}
      <div>
        <img src="https://xrpaibot.org/images/img4.png" />
      </div>
      <section ref={aboutRef} id="about" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-gradient-to-r from-purple-900/30 to-blue-900/30 rounded-3xl p-8 md:p-12 border border-white/10 backdrop-blur-sm">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white text-center mb-6">
              XRP Ai Bot – Global Digital Community
            </h2>
            <p className="text-gray-300 text-lg text-center max-w-4xl mx-auto">
              XRPAiBot is a global digital community driven by xrpaibot.org
              community.
            </p>

            <div className="grid md:grid-cols-3 gap-6 mt-12">
              <div className="bg-white/5 rounded-xl p-6 text-center hover:bg-white/10 transition-all duration-300">
                <div className="text-4xl mb-3">🌍</div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  Global Reach
                </h3>
                <p className="text-gray-400">Connected community worldwide</p>
              </div>
              <div className="bg-white/5 rounded-xl p-6 text-center hover:bg-white/10 transition-all duration-300">
                <div className="text-4xl mb-3">🤖</div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  AI Powered
                </h3>
                <p className="text-gray-400">Intelligent trading solutions</p>
              </div>
              <div className="bg-white/5 rounded-xl p-6 text-center hover:bg-white/10 transition-all duration-300">
                <div className="text-4xl mb-3">🏛️</div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  Decentralized
                </h3>
                <p className="text-gray-400">Community governance</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How to Work Section */}
      <section
        id="how-to-work"
        className="py-20 px-4 sm:px-6 lg:px-8 bg-black/30"
      >
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-white text-center mb-12">
            How It Works
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "1",
                title: "Connect Wallet",
                desc: "Connect your crypto wallet to get started",
              },
              {
                step: "2",
                title: "AI Analysis",
                desc: "Our AI analyzes market conditions",
              },
              {
                step: "3",
                title: "Start Trading",
                desc: "Execute trades with AI assistance",
              },
            ].map((item, idx) => (
              <div key={idx} className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-2xl font-bold text-white mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-white text-center mb-12">
            Features
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: "⚡",
                title: "24/7 Trading",
                desc: "Automated trading round the clock",
              },
              {
                icon: "🔒",
                title: "Secure",
                desc: "Blockchain secured transactions",
              },
              {
                icon: "📊",
                title: "Analytics",
                desc: "Real-time market insights",
              },
              { icon: "🎯", title: "Smart AI", desc: "Advanced ML algorithms" },
            ].map((feature, idx) => (
              <div
                key={idx}
                className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-purple-500/50 transition-all duration-300"
              >
                <div className="text-3xl mb-3">{feature.icon}</div>
                <h3 className="text-lg font-semibold text-white mb-1">
                  {feature.title}
                </h3>
                <p className="text-gray-400 text-sm">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 px-4 sm:px-6 lg:px-8 bg-black/30">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-white text-center mb-12">
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
                  <summary className="flex justify-between items-center cursor-pointer p-6 text-white font-semibold hover:bg-white/5 transition-colors list-none">
                    {faq.q}
                    <span className="text-purple-400 group-open:rotate-45 transition-transform duration-300 text-2xl">
                      +
                    </span>
                  </summary>
                  <div className="px-6 pb-6 text-gray-400 border-t border-white/10 pt-4">
                    {faq.a}
                  </div>
                </details>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 sm:px-6 lg:px-8 border-t border-white/10">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex justify-center space-x-6 mb-6 flex-wrap gap-4">
            {["Home", "About", "How to Work", "Features", "FAQ"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase().replace(/\s/g, "-")}`}
                className="text-gray-400 hover:text-white transition-colors duration-300 text-sm"
              >
                {item}
              </a>
            ))}
          </div>
          <p className="text-gray-500 text-sm">
            © 2024 XRPAiBot. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
