import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  ArrowLeftRight,
  Check,
  Copy,
  ExternalLink,
  Menu,
  Rocket,
  Users,
  Wallet,
  X as XIcon,
  Zap,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { SiTelegram, SiX } from "react-icons/si";

const CONTRACT_ADDRESS = "0xA0F48CB0CDe07D336CEC707f6F1e18a6FfcFB0D6";
const DEXSCREENER_URL = `https://dexscreener.com/ethereum/${CONTRACT_ADDRESS}?embed=1`;
const DEXSCREENER_LINK = `https://dexscreener.com/ethereum/${CONTRACT_ADDRESS}`;
const UNISWAP_URL = "https://app.uniswap.org";
const UNISWAP_SWAP_URL = `https://app.uniswap.org/swap?inputCurrency=ETH&outputCurrency=${CONTRACT_ADDRESS}&chain=mainnet`;
const TELEGRAM_URL = "https://t.me/firstxeth";
const X_URL = "https://x.com/firstxeth";

const TICKER_HEIGHT = 32;

const navLinks = [
  { label: "About", href: "#about" },
  { label: "How to Buy", href: "#how-to-buy" },
  { label: "Swap", href: "#swap" },
  { label: "Tokenomics", href: "#tokenomics" },
  { label: "Memes", href: "#memes" },
  { label: "Chart", href: "#chart" },
  { label: "FAQ", href: "#faq" },
];

const howToBuySteps = [
  {
    icon: <Wallet className="w-8 h-8" />,
    step: "01",
    title: "Wallet",
    description:
      "Install MetaMask or your preferred Ethereum wallet to get started.",
  },
  {
    icon: <Zap className="w-8 h-8" />,
    step: "02",
    title: "Fund",
    description:
      "Buy ETH from any exchange and send it to your wallet address.",
  },
  {
    icon: <ArrowLeftRight className="w-8 h-8" />,
    step: "03",
    title: "Swap",
    description:
      "Head to Uniswap, paste the $X contract address and swap your ETH.",
  },
  {
    icon: <Users className="w-8 h-8" />,
    step: "04",
    title: "Hold",
    description:
      "Become part of the X Army. Ride the platform pump to the moon.",
  },
];

const tokenomics = [
  { label: "Supply", value: "1,000,000,000", sub: "Total $X tokens" },
  { label: "Tax", value: "0%", sub: "Buy & sell tax" },
  { label: "Liquidity", value: "Locked 🔒", sub: "Permanently secured" },
  { label: "Chain", value: "Ethereum", sub: "ETH network" },
];

const memes = [
  {
    src: "/assets/generated/meme-rocket.dim_300x300.jpg",
    alt: "X to the Moon",
  },
  { src: "/assets/generated/meme-elon.dim_300x300.jpg", alt: "Elon X" },
  { src: "/assets/generated/meme-pepe.dim_300x300.jpg", alt: "Pepe X Army" },
];

const memeCubes = Array.from({ length: 24 }, (_, i) => ({
  ...memes[i % 3],
  cubeId: `cube-${i}`,
}));

const faqItems = [
  {
    id: "what-is-x",
    q: "What is $X?",
    a: "$X is a memecoin built on Ethereum, inspired by Elon Musk's iconic Twitter-to-X rebrand. Pure meme energy, zero taxes.",
  },
  {
    id: "where-to-buy",
    q: "Where can I buy $X?",
    a: "You can buy $X on Uniswap. Simply swap ETH for $X using our contract address. Use the Swap section on this page for direct access.",
  },
  {
    id: "is-safe",
    q: "Is $X safe to buy?",
    a: "Liquidity is permanently locked and the contract has 0% buy/sell tax. Always DYOR — $X is a memecoin, not an investment.",
  },
  {
    id: "contract-address",
    q: "What is the contract address?",
    a: "0xA0F48CB0CDe07D336CEC707f6F1e18a6FfcFB0D6 on the Ethereum network.",
  },
  {
    id: "total-supply",
    q: "What is the total supply?",
    a: "1,000,000,000 $X tokens. Fixed supply, no minting.",
  },
  {
    id: "which-chain",
    q: "What chain is $X on?",
    a: "Ethereum mainnet (ETH).",
  },
  {
    id: "taxes",
    q: "Does $X have any taxes?",
    a: "No. 0% buy tax and 0% sell tax. What you swap is what you get.",
  },
];

const tickerItems = [
  {
    id: "price",
    label: "$X / ETH",
    value: "0.000042",
    change: "+5.2%",
    up: true,
  },
  { id: "mcap", label: "MARKET CAP", value: "$4.2M", change: null, up: null },
  { id: "volume", label: "24H VOLUME", value: "$820K", change: null, up: null },
  { id: "holders", label: "HOLDERS", value: "3,200", change: null, up: null },
  { id: "tx1", label: "TX: BUY", value: "0.15 ETH", change: null, up: true },
  { id: "tx2", label: "TX: BUY", value: "0.42 ETH", change: null, up: true },
  {
    id: "change24h",
    label: "24H CHANGE",
    value: "+12.4%",
    change: null,
    up: true,
  },
  {
    id: "ath",
    label: "ALL TIME HIGH",
    value: "$0.0000892",
    change: null,
    up: null,
  },
  { id: "liq", label: "LIQUIDITY", value: "LOCKED 🔒", change: null, up: null },
  { id: "tax", label: "TAX", value: "0%", change: null, up: true },
];

export default function App() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const copyCA = () => {
    navigator.clipboard.writeText(CONTRACT_ADDRESS);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen star-bg font-body">
      {/* ===== LIVE PRICE TICKER ===== */}
      <div
        className="fixed top-0 left-0 right-0 z-50 overflow-hidden"
        style={{
          height: `${TICKER_HEIGHT}px`,
          background: "oklch(0.05 0 0)",
          borderBottom: "1px solid oklch(0.2 0 0)",
        }}
      >
        <div className="ticker-scroll h-full flex items-center">
          {[...tickerItems, ...tickerItems].map((item, idx) => (
            <span
              key={`${item.id}-${idx}`}
              className="font-orbitron text-[10px] tracking-wider flex items-center gap-1.5 px-4 flex-shrink-0"
            >
              <span className="text-muted-foreground">{item.label}:</span>
              <span className="text-white font-bold">{item.value}</span>
              {item.change && (
                <span
                  style={{
                    color: item.up
                      ? "oklch(0.75 0.18 145)"
                      : "oklch(0.65 0.22 25)",
                  }}
                >
                  {item.change}
                </span>
              )}
              {item.up === true && !item.change && (
                <span style={{ color: "oklch(0.75 0.18 145)" }}>▲</span>
              )}
              <span className="text-muted-foreground opacity-40 ml-2">·</span>
            </span>
          ))}
        </div>
      </div>

      {/* ===== STICKY NAV ===== */}
      <header
        className={`fixed left-0 right-0 z-40 transition-all duration-300 ${
          scrolled ? "glass-nav" : "bg-transparent"
        }`}
        style={{ top: `${TICKER_HEIGHT}px` }}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <a
            href="#hero"
            className="flex items-center gap-2 group"
            data-ocid="nav.link"
          >
            <span
              className="font-orbitron font-black text-2xl text-white"
              style={{ letterSpacing: "0.05em" }}
            >
              X
            </span>
          </a>

          {/* Desktop Nav */}
          <ul className="hidden md:flex items-center gap-5">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="font-orbitron text-xs tracking-widest text-muted-foreground hover:text-white transition-colors duration-200"
                  data-ocid="nav.link"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="hidden md:flex items-center gap-3">
            <a
              href={UNISWAP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-cyan px-5 py-2 rounded-full text-xs"
              data-ocid="nav.primary_button"
            >
              BUY $X
            </a>
          </div>

          <button
            type="button"
            className="md:hidden text-foreground p-2"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
            data-ocid="nav.toggle"
          >
            {mobileOpen ? (
              <XIcon className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </nav>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden glass-nav border-t border-border px-4 pb-6"
            >
              <ul className="flex flex-col gap-1 pt-3">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="font-orbitron text-sm tracking-widest text-muted-foreground hover:text-white transition-colors block py-3 border-b border-border/40"
                      onClick={() => setMobileOpen(false)}
                      data-ocid="nav.link"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
                <li className="pt-3">
                  <a
                    href={UNISWAP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-cyan inline-block px-5 py-3 rounded-full text-xs"
                    data-ocid="nav.primary_button"
                  >
                    BUY $X
                  </a>
                </li>
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* ===== HERO ===== */}
      <section
        id="hero"
        className="min-h-[65vh] flex flex-col items-center justify-center text-center px-4 sm:px-6 lg:px-8 relative overflow-hidden"
        style={{
          paddingTop: `${TICKER_HEIGHT + 64 + 32}px`,
          paddingBottom: "3rem",
        }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-8 animate-float"
        >
          <img
            src="/assets/uploads/img_3950-019d269d-ceed-7069-8867-b6a8d29af4e9-1.jpeg"
            alt="X Token Logo"
            className="w-28 h-28 md:w-40 md:h-40 object-contain rounded-2xl"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full max-w-md sm:max-w-none"
        >
          <a
            href={DEXSCREENER_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-cyan px-8 py-3 rounded-full text-sm flex items-center gap-2 w-full sm:w-auto justify-center"
            data-ocid="hero.primary_button"
          >
            <ExternalLink className="w-4 h-4" />
            VIEW CHART
          </a>
          <a
            href={UNISWAP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline px-8 py-3 rounded-full text-sm flex items-center gap-2 w-full sm:w-auto justify-center"
            data-ocid="hero.secondary_button"
          >
            <ArrowLeftRight className="w-4 h-4" />
            BUY ON UNISWAP
          </a>
          <a
            href={TELEGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-purple-outline px-8 py-3 rounded-full text-sm flex items-center gap-2 w-full sm:w-auto justify-center"
            data-ocid="hero.secondary_button"
          >
            <SiTelegram className="w-4 h-4" />
            JOIN TG
          </a>
        </motion.div>
      </section>

      {/* ===== NARRATIVE / ABOUT ===== */}
      <section id="about" className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="font-orbitron font-bold text-3xl md:text-4xl text-center tracking-widest mb-12 gradient-text">
              NARRATIVE
            </h2>
            <div className="neon-card p-8 md:p-12 flex flex-col md:flex-row gap-8 items-start">
              <div
                className="flex-shrink-0 flex items-center justify-center w-16 h-16 rounded-full"
                style={{
                  background: "oklch(0.15 0 0)",
                  border: "1px solid oklch(0.3 0 0)",
                }}
              >
                <Rocket className="w-8 h-8 text-white" />
              </div>
              <div className="font-body space-y-4 text-foreground">
                <p className="text-lg leading-relaxed">
                  <span className="font-orbitron font-bold text-white">
                    X memecoin
                  </span>{" "}
                  cashes in on Elon Musk's legendary Twitter-to-X rebrand.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  No deep lore. No fake promises. Just pure viral energy tied to
                  the most powerful brand shift in internet history.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  From SpaceX to Tesla to X — Musk has always pushed the letter
                  that moves markets.
                </p>
                <p className="text-lg font-semibold text-white">
                  Now it's your turn. Ride the platform pump. 🚀
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===== HOW TO BUY ===== */}
      <section id="how-to-buy" className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-orbitron font-bold text-3xl md:text-4xl text-center tracking-widest mb-12 gradient-text"
          >
            HOW TO BUY
          </motion.h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {howToBuySteps.map((step, i) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="neon-card p-6 flex flex-col gap-4"
                data-ocid={`how-to-buy.item.${i + 1}`}
              >
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center"
                  style={{
                    background: "oklch(0.15 0 0)",
                    border: "1px solid oklch(0.3 0 0)",
                  }}
                >
                  <span className="text-white">{step.icon}</span>
                </div>
                <div>
                  <span className="font-orbitron text-xs tracking-widest text-muted-foreground">
                    STEP {step.step}
                  </span>
                  <h3 className="font-orbitron font-bold text-xl mt-1 text-white">
                    {step.title}
                  </h3>
                </div>
                <p className="font-body text-sm text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="mt-10 text-center"
          >
            <a
              href={UNISWAP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-cyan inline-flex items-center gap-2 px-10 py-4 rounded-full text-sm"
              data-ocid="how-to-buy.primary_button"
            >
              <ArrowLeftRight className="w-4 h-4" />
              BUY $X ON UNISWAP
            </a>
          </motion.div>
        </div>
      </section>

      {/* ===== UNISWAP SWAP ===== */}
      <section id="swap" className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-orbitron font-bold text-3xl md:text-4xl text-center tracking-widest mb-12 gradient-text"
          >
            SWAP $X
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="neon-card p-4 md:p-6"
            data-ocid="swap.card"
          >
            <iframe
              src={UNISWAP_SWAP_URL}
              height="660"
              width="100%"
              style={{
                border: "0",
                maxWidth: "480px",
                display: "block",
                margin: "0 auto",
                borderRadius: "1rem",
              }}
              title="Uniswap Swap"
            />
            <p className="font-body text-sm text-muted-foreground text-center mt-4">
              Connect your wallet and swap ETH for $X directly.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ===== TOKENOMICS ===== */}
      <section id="tokenomics" className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-orbitron font-bold text-3xl md:text-4xl text-center tracking-widest mb-12 gradient-text"
          >
            TOKENOMICS
          </motion.h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {tokenomics.map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="neon-card p-4 md:p-6 text-center flex flex-col gap-2"
                data-ocid={`tokenomics.item.${i + 1}`}
              >
                <span className="font-orbitron text-xs tracking-widest text-muted-foreground">
                  {item.label}
                </span>
                <span className="font-orbitron font-black text-lg md:text-2xl break-words text-white">
                  {item.value}
                </span>
                <span className="font-body text-xs text-muted-foreground">
                  {item.sub}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== LIVE CHART ===== */}
      <section id="chart" className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-orbitron font-bold text-3xl md:text-4xl text-center tracking-widest mb-12 gradient-text"
          >
            LIVE CHART
          </motion.h2>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="neon-card overflow-hidden"
            style={{ padding: 1 }}
          >
            <iframe
              src={DEXSCREENER_URL}
              width="100%"
              className="h-[400px] md:h-[600px]"
              title="X Token DexScreener Chart"
              style={{
                border: "none",
                borderRadius: "0.9rem",
                display: "block",
              }}
              loading="lazy"
            />
          </motion.div>
        </div>
      </section>

      {/* ===== MEME GALLERY — small cubes ===== */}
      <section id="memes" className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-orbitron font-bold text-3xl md:text-4xl text-center tracking-widest mb-12 gradient-text"
          >
            MEMES
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-1.5"
          >
            {memeCubes.map((meme, i) => (
              <div
                key={meme.cubeId}
                className="aspect-square rounded-md overflow-hidden cursor-pointer group"
                data-ocid={`memes.item.${i + 1}`}
              >
                <img
                  src={meme.src}
                  alt={meme.alt}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <section id="faq" className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-orbitron font-bold text-3xl md:text-4xl text-center tracking-widest mb-12 gradient-text"
          >
            FAQ
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="neon-card p-4"
            data-ocid="faq.panel"
          >
            <Accordion type="single" collapsible className="w-full">
              {faqItems.map((item) => (
                <AccordionItem key={item.id} value={item.id}>
                  <AccordionTrigger className="font-orbitron text-xs sm:text-sm tracking-wider text-white hover:no-underline px-4">
                    {item.q}
                  </AccordionTrigger>
                  <AccordionContent className="font-body text-sm text-muted-foreground leading-relaxed px-4">
                    {item.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="py-16 px-4 sm:px-6 lg:px-8 border-t border-border">
        <div className="max-w-4xl mx-auto flex flex-col items-center gap-6 text-center">
          <img
            src="/assets/uploads/img_3950-019d269d-ceed-7069-8867-b6a8d29af4e9-1.jpeg"
            alt="X Logo"
            className="w-12 h-12 object-contain rounded-lg"
          />
          <div className="flex items-center gap-3 flex-wrap justify-center w-full">
            <span className="font-orbitron text-xs tracking-widest text-muted-foreground">
              CA:
            </span>
            <code
              className="font-body text-xs px-3 py-2 rounded-lg break-all"
              style={{
                background: "oklch(0.1 0 0)",
                color: "oklch(0.9 0 0)",
                border: "1px solid oklch(0.25 0 0)",
                maxWidth: "100%",
              }}
            >
              {CONTRACT_ADDRESS}
            </code>
            <button
              type="button"
              onClick={copyCA}
              className="p-2 rounded-lg transition-all hover:scale-110 flex-shrink-0"
              style={{ color: copied ? "white" : "oklch(0.55 0 0)" }}
              title="Copy contract address"
              data-ocid="footer.button"
            >
              {copied ? (
                <Check className="w-4 h-4" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
            </button>
          </div>
          <div className="flex items-center gap-6">
            <a
              href={X_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 font-orbitron text-xs tracking-widest text-muted-foreground hover:text-white transition-colors duration-200"
              data-ocid="footer.link"
            >
              <SiX className="w-4 h-4" />X / Twitter
            </a>
            <a
              href={TELEGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 font-orbitron text-xs tracking-widest text-muted-foreground hover:text-white transition-colors duration-200"
              data-ocid="footer.link"
            >
              <SiTelegram className="w-4 h-4" />
              Telegram
            </a>
          </div>
          <p className="font-body text-xs text-muted-foreground">
            © {new Date().getFullYear()}. Built with ❤️ using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-white transition-colors"
            >
              caffeine.ai
            </a>
          </p>
          <p className="font-body text-xs text-muted-foreground max-w-lg opacity-60">
            $X is a memecoin with no intrinsic value or financial return
            expectation. This is not financial advice. DYOR.
          </p>
        </div>
      </footer>
    </div>
  );
}
