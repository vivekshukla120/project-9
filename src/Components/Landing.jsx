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
      <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-[#050321] via-[#2b0057] to-[#4a0072] px-6 lg:px-12">
        <div className="max-w-7xl mx-auto w-full relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* LEFT CONTENT */}
            <div className="text-center lg:text-left">
              <p className="text-cyan-400 font-bold uppercase tracking-wider mb-6">
                THE FUTURE OF TRADING
              </p>

              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6">
                <span className="text-white">The best performing</span>

                <br />

                <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                  AI-Powered
                </span>

                <br />

                <span className="text-[#8c8cff]">Ecosystem</span>
              </h1>

              <p className="text-gray-300 text-lg leading-relaxed max-w-xl mb-10">
                XRPAiBot is a decentralized AI-powered ecosystem driven by
                community governance. Join our global digital community and
                transform your economic future through decentralized wealth
                exchange.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <button className="bg-gradient-to-r from-cyan-500 to-blue-600 px-8 py-4 rounded-xl text-white font-semibold hover:scale-105 transition">
                  Connect Wallet ⚡
                </button>

                <button className="border border-purple-500 px-8 py-4 rounded-xl text-white hover:bg-purple-500/10 transition">
                  Explore Features
                </button>
              </div>
            </div>

            {/* RIGHT IMAGE */}
            <div className="relative flex justify-center">
              {/* Top Badge */}
              <div className="absolute top-0 right-10 rotate-6 bg-[#25205f] border border-cyan-500/30 px-6 py-3 rounded-2xl backdrop-blur-md">
                <span className="text-cyan-400 font-semibold">AI Powered</span>
              </div>

              {/* Main Card */}
              <div className="relative bg-gradient-to-b from-[#26185f] to-[#1c1447] rounded-[40px] p-8 shadow-[0_0_80px_rgba(139,92,246,0.3)]">
                <img
                  src="src/assets/image.png"
                  alt="XRPAiBot"
                  className="w-full max-w-[550px] object-contain animate-float"
                />
              </div>

              {/* Bottom Badge */}
              <div className="absolute bottom-0 left-10 -rotate-3 bg-[#25205f] border border-purple-500/30 px-6 py-3 rounded-2xl backdrop-blur-md">
                <span className="text-[#b388ff] font-semibold">
                  24/7 Active
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section - Global Digital Community */}
      {/* <div>
        <img src="https://xrpaibot.org/images/img4.png" />
      </div> */}
      <section className="relative py-24 overflow-hidden bg-gradient-to-br from-[#18003a] via-[#3a0a6b] to-[#060026]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* LEFT IMAGE */}
            <div className="relative">
              <div className="relative rounded-[30px] overflow-hidden bg-[#24114f] shadow-[0_0_60px_rgba(59,130,246,0.25)]">
                <img
                  src="src/assets/image copy.png"
                  alt="AI Brain"
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>

            {/* RIGHT CONTENT */}
            <div>
              <h2 className="text-5xl lg:text-6xl font-bold text-white leading-tight mb-8">
                XRP Ai Bot – Global Digital
                <br />
                Community
              </h2>

              <p className="text-gray-300 text-xl leading-relaxed mb-6">
                XRP Ai Bot is a global digital community driven by xrpaibot.org
                community. Our online crypto decentralized ecosystem provides a
                platform where people are able to exchange wealth.
              </p>

              <p className="text-gray-300 text-xl leading-relaxed mb-10">
                Participation from members is what will help faster grow the
                organization, and encouraging participation among the community
                will help strengthen its reputation and credibility.
              </p>

              {/* Stats Cards */}
              <div className="grid grid-cols-2 gap-5">
                <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8 text-center hover:bg-white/10 transition">
                  <h3 className="text-5xl font-bold text-cyan-400 mb-2">
                    100%
                  </h3>
                  <p className="text-gray-300 font-medium">Decentralized</p>
                </div>

                <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8 text-center hover:bg-white/10 transition">
                  <h3 className="text-5xl font-bold text-indigo-400 mb-2">
                    AI
                  </h3>
                  <p className="text-gray-300 font-medium">Powered</p>
                </div>

                <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8 text-center hover:bg-white/10 transition">
                  <h3 className="text-5xl font-bold text-purple-400 mb-2">
                    24/7
                  </h3>
                  <p className="text-gray-300 font-medium">Automated</p>
                </div>

                <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8 text-center hover:bg-white/10 transition">
                  <h3 className="text-5xl font-bold text-green-400 mb-2">
                    Global
                  </h3>
                  <p className="text-gray-300 font-medium">Community</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How to Work Section */}
      <section
        id="how-to-work"
        className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden"
      >
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#120026] via-[#2b0050] to-[#0b0018]" />

        {/* Glow Effects */}
        <div className="absolute top-40 left-20 w-72 h-72 bg-purple-700/20 blur-[120px] rounded-full" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-600/20 blur-[140px] rounded-full" />

        <div className="relative z-10 max-w-7xl mx-auto text-center">
          {/* Center Image */}
          <div className="flex justify-center mb-16">
            <img
              src="src/assets/image copy 2.png" // apni image path lagao
              alt="AI Trading Bot"
              className="w-full max-w-md md:max-w-lg object-contain drop-shadow-[0_0_60px_rgba(139,92,246,0.5)]"
            />
          </div>

          {/* Heading */}
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
            How It Works
          </h2>

          <p className="text-gray-300 max-w-4xl mx-auto text-lg md:text-xl leading-relaxed mb-20">
            Powered by smart contracts on the blockchain, XRP Ai Bot operates in
            a fully decentralized ecosystem. The system continuously gathers
            real-time trading data, analyzes market opportunities using advanced
            AI, and executes profitable trades automatically.
          </p>

          {/* Steps */}
          <div className="grid md:grid-cols-3 gap-10">
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
                className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all duration-300"
              >
                <div className="text-5xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent mb-4">
                  {item.step}
                </div>

                <h3 className="text-2xl font-semibold text-white mb-3">
                  {item.title}
                </h3>

                <p className="text-gray-400 leading-relaxed">{item.desc}</p>
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
