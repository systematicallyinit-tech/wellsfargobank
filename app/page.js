"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Menu,
  X,
  ChevronDown,
  ChevronRight,
  Search,
  MapPin,
  HelpCircle,
  Globe,
  Eye,
  EyeOff,
  LockKeyhole,
  CreditCard,
  Home,
  Car,
  Wallet,
  PiggyBank,
  BarChart3,
  ShieldCheck,
  Smartphone,
  ArrowRight,
  Phone,
  MessageCircle,
  CalendarDays,
  LocateFixed,
  DollarSign,
  BriefcaseBusiness,
  GraduationCap,
  Users,
  Building2,
  ExternalLink,
} from "lucide-react";

const burgundy = "#B31B34";
const darkBurgundy = "#8F1428";
const gold = "#C9A227";

const personalMenus = [
  {
    title: "Checking",
    items: [
      "View all checking accounts",
      "Compare checking accounts",
      "Clear Access Banking",
      "Prime Checking",
      "Everyday Checking",
      "Premier Checking",
      "Student / teen banking",
    ],
  },
  {
    title: "Savings & CDs",
    items: [
      "View all savings accounts",
      "Check all rates",
      "Way2Save Savings",
      "Platinum Savings",
      "Wells Fargo CDs",
      "Kids Savings",
    ],
  },
  {
    title: "Credit Cards",
    items: [
      "View all credit cards",
      "See if you're prequalified",
      "Cash back credit cards",
      "Rewards credit cards",
      "0% intro APR credit cards",
      "Travel credit cards",
      "Balance transfer credit cards",
    ],
  },
  {
    title: "Home Loans",
    items: [
      "Buy a home",
      "Refinance your mortgage",
      "Check mortgage rates",
      "First-time homebuyers",
      "Shop for homes",
      "Low down payment options",
    ],
  },
  {
    title: "Personal Loans",
    items: [
      "Personal loans",
      "Home improvement loans",
      "Finance a large expense",
      "Debt consolidation",
      "How to apply",
      "How to make a payment",
    ],
  },
  {
    title: "Auto Loans",
    items: [
      "Explore auto loans",
      "Current auto loan customers",
      "Vehicle financing",
      "Make an auto loan payment",
      "Auto loan FAQs",
    ],
  },
  {
    title: "Investing",
    items: [
      "Investing overview",
      "Retirement",
      "Financial planning",
      "Investment guidance",
    ],
  },
  {
    title: "Premier",
    items: [
      "Premier services overview",
      "Premier Checking",
      "Premier benefits",
      "Relationship banking",
    ],
  },
  {
    title: "Education & Tools",
    items: [
      "Financial education",
      "Credit education",
      "Calculators",
      "Digital tools",
      "Financial Goals",
    ],
  },
];

const heroSlides = [
  {
    title: "$325 checking bonus on us",
    text: "New customers can open an eligible checking account with qualifying direct deposits.",
    button: "Get started",
    bg: "bg-[#5C1726]",
    pattern: "bonus",
  },
  {
    title: "Checking that fits perfectly",
    text: "Explore the benefits and find a checking account that suits your lifestyle.",
    button: "Find your fit",
    bg: "bg-[#762235]",
    pattern: "checking",
  },
  {
    title: "Find mortgage happiness",
    text: "Explore home financing options with down payment options designed to help you move forward.",
    button: "Learn more",
    bg: "bg-[#49242D]",
    pattern: "home",
  },
];

const productCards = [
  {
    title: "New customer? Say hello to a $125 bonus",
    text: "Open a Clear Access Banking account and complete the offer requirements.",
    button: "See offer details",
    icon: Wallet,
  },
  {
    title: "Find a credit card",
    text: "Low intro rate, cash back, rewards and more.",
    button: "Learn more",
    icon: CreditCard,
  },
  {
    title: "Earn rewards",
    text: "Explore rewards and benefits designed around your everyday spending.",
    button: "Learn more",
    icon: BarChart3,
  },
];

const guidanceCards = [
  {
    title: "Your dreams, your plan",
    text: "Start crafting the foundation for the future you see yourself in.",
    button: "Get started",
    icon: PiggyBank,
  },
  {
    title: "Borrowing built around you",
    text: "Discover borrowing designed for every step of your journey.",
    button: "Explore borrowing",
    icon: DollarSign,
  },
  {
    title: "Stay up to date on security",
    text: "Get the latest tips to help keep your accounts and information safe.",
    button: "Get security tips",
    icon: ShieldCheck,
  },
];

export default function HomePage() {
  const [mobileMenu, setMobileMenu] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);
  const [slide, setSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setSlide((current) => (current + 1) % heroSlides.length);
    }, 7000);

    return () => clearInterval(timer);
  }, []);

  return (
    <main className="min-h-screen bg-white text-[#333]">
      <TopUtilityBar />

      <MainHeader
        mobileMenu={mobileMenu}
        setMobileMenu={setMobileMenu}
        activeMenu={activeMenu}
        setActiveMenu={setActiveMenu}
      />

      {mobileMenu && (
        <MobileNavigation setMobileMenu={setMobileMenu} />
      )}

      <HeroSection
        slide={slide}
        setSlide={setSlide}
      />

      <ProductNavigation />

      <ProductHighlights />

      <InterestRates />

      <FinancialGuidance />

      <FargoSection />

      <CommunitySection />

      <HelpSection />

      <Footer />
    </main>
  );
}

/* =========================================================
   TOP UTILITY BAR
========================================================= */

function TopUtilityBar() {
  return (
    <div className="hidden bg-[#f5f5f5] text-[12px] text-[#444] lg:block">
      <div className="mx-auto flex h-[38px] max-w-[1440px] items-center justify-between px-6">
        <div className="flex items-center gap-6">
          <Link href="/login" className="hover:text-[#B31B34]">
            ATMs/Locations
          </Link>

          <Link
            href="/login"
            className="flex items-center gap-1 hover:text-[#B31B34]"
          >
            <HelpCircle size={13} />
            Help
          </Link>

          <Link
            href="/login"
            className="flex items-center gap-1 hover:text-[#B31B34]"
          >
            <Globe size={13} />
            Español
          </Link>
        </div>

        <Link
          href="/login"
          className="font-semibold text-[#B31B34] hover:underline"
        >
          Sign On
        </Link>
      </div>
    </div>
  );
}

/* =========================================================
   MAIN HEADER
========================================================= */

function MainHeader({
  mobileMenu,
  setMobileMenu,
  activeMenu,
  setActiveMenu,
}) {
  return (
    <header className="relative z-50 border-b border-gray-200 bg-white">
      <div className="mx-auto flex min-h-[78px] max-w-[1440px] items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center">
          <WellsFargoLogo />
        </Link>

        <nav className="hidden items-center lg:flex">
          {personalMenus.slice(0, 9).map((menu) => {
            const open = activeMenu === menu.title;

            return (
              <button
                key={menu.title}
                onClick={() =>
                  setActiveMenu(open ? null : menu.title)
                }
                className={`flex items-center gap-1 px-3 py-8 text-[13px] font-semibold transition ${
                  open
                    ? "text-[#B31B34]"
                    : "text-[#333] hover:text-[#B31B34]"
                }`}
              >
                {menu.title}
                <ChevronDown
                  size={14}
                  className={`transition-transform ${
                    open ? "rotate-180" : ""
                  }`}
                />
              </button>
            );
          })}
        </nav>

        <div className="hidden items-center gap-1 lg:flex">
          <button className="flex h-10 w-10 items-center justify-center text-[#555] hover:bg-gray-100 hover:text-[#B31B34]">
            <Search size={20} />
          </button>

          <Link
            href="/login"
            className="ml-2 bg-[#B31B34] px-5 py-3 text-[12px] font-bold text-white transition hover:bg-[#8F1428]"
          >
            SIGN ON
          </Link>
        </div>

        <button
          onClick={() => setMobileMenu(!mobileMenu)}
          className="flex h-11 w-11 items-center justify-center bg-[#B31B34] text-white lg:hidden"
          aria-label="Open menu"
        >
          {mobileMenu ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {activeMenu && (
        <DesktopMegaMenu
          menu={personalMenus.find(
            (item) => item.title === activeMenu
          )}
        />
      )}
    </header>
  );
}

function WellsFargoLogo() {
  return (
    <div className="flex items-center gap-3">
      <div className="relative flex h-12 w-[54px] items-center justify-center overflow-hidden bg-[#B31B34]">
        <div className="absolute bottom-0 left-1/2 h-[32px] w-[38px] -translate-x-1/2 rounded-t-[22px] border-[4px] border-[#d8b44c] border-b-0" />
        <div className="absolute left-1/2 top-[9px] h-[4px] w-[31px] -translate-x-1/2 bg-[#d8b44c]" />
        <div className="absolute left-1/2 top-[16px] h-[3px] w-[23px] -translate-x-1/2 bg-[#d8b44c]" />
      </div>

      <div className="leading-none">
        <div className="text-[18px] font-extrabold tracking-tight text-[#B31B34] sm:text-[21px]">
          WELLS FARGO
        </div>

        <div className="mt-1 text-[8px] font-semibold tracking-[0.16em] text-gray-500">
          BANKING & FINANCIAL SERVICES
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   DESKTOP MEGA MENU
========================================================= */

function DesktopMegaMenu({ menu }) {
  if (!menu) return null;

  return (
    <div className="absolute left-0 right-0 top-full border-t border-gray-200 bg-white shadow-2xl">
      <div className="mx-auto grid max-w-[1440px] grid-cols-[280px_1fr] px-8 py-8">
        <div className="border-r border-gray-200 pr-8">
          <div className="text-xs font-bold uppercase tracking-wider text-[#B31B34]">
            Personal
          </div>

          <h3 className="mt-3 text-2xl font-bold text-[#222]">
            {menu.title}
          </h3>

          <p className="mt-4 text-sm leading-6 text-gray-500">
            Explore our {menu.title.toLowerCase()} products,
            services, tools, and resources.
          </p>

          <Link
            href="/login"
            className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-[#B31B34]"
          >
            View all {menu.title.toLowerCase()}
            <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-3 gap-x-10 gap-y-1 pl-10">
          {menu.items.map((item) => (
            <Link
              href="/login"
              key={item}
              className="group flex items-center justify-between border-b border-gray-100 py-4 text-sm text-gray-700 hover:text-[#B31B34]"
            >
              {item}
              <ChevronRight
                size={15}
                className="opacity-0 transition group-hover:translate-x-1 group-hover:opacity-100"
              />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   MOBILE NAV
========================================================= */

function MobileNavigation({ setMobileMenu }) {
  const [open, setOpen] = useState(null);

  return (
    <div className="relative z-40 max-h-[calc(100vh-78px)] overflow-y-auto border-b border-gray-200 bg-white shadow-xl lg:hidden">
      <div className="p-4">
        <div className="grid grid-cols-2 gap-2">
          <Link
            href="/login"
            onClick={() => setMobileMenu(false)}
            className="bg-[#B31B34] px-4 py-3 text-center text-sm font-bold text-white"
          >
            Sign On
          </Link>

          <Link
            href="/login"
            className="border border-[#B31B34] px-4 py-3 text-center text-sm font-bold text-[#B31B34]"
          >
            Locations
          </Link>
        </div>

        <div className="mt-5 border-t border-gray-200">
          {personalMenus.map((menu) => {
            const expanded = open === menu.title;

            return (
              <div key={menu.title} className="border-b border-gray-200">
                <button
                  onClick={() =>
                    setOpen(expanded ? null : menu.title)
                  }
                  className="flex w-full items-center justify-between py-5 text-left font-semibold"
                >
                  {menu.title}

                  <ChevronDown
                    size={18}
                    className={`text-[#B31B34] transition-transform ${
                      expanded ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {expanded && (
                  <div className="pb-4">
                    {menu.items.map((item) => (
                      <Link
                        href="/login"
                        key={item}
                        onClick={() => setMobileMenu(false)}
                        className="flex items-center justify-between px-3 py-3 text-sm text-gray-600"
                      >
                        {item}
                        <ChevronRight size={15} />
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-2 gap-2 pt-5">
          <Link
            href="/login"
            className="border border-gray-200 px-3 py-3 text-center text-sm"
          >
            Help
          </Link>

          <Link
            href="/login"
            className="border border-gray-200 px-3 py-3 text-center text-sm"
          >
            Español
          </Link>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   HERO
========================================================= */

function HeroSection({ slide, setSlide }) {
  const item = heroSlides[slide];

  return (
    <section className="relative overflow-hidden bg-[#4c1724]">
      <div className="relative min-h-[500px] lg:min-h-[570px]">
        {heroSlides.map((hero, index) => (
          <div
            key={hero.title}
            className={`absolute inset-0 transition-opacity duration-700 ${
              index === slide
                ? "z-10 opacity-100"
                : "pointer-events-none opacity-0"
            }`}
          >
            <HeroArtwork type={hero.pattern} />

            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />

            <div className="relative z-20 mx-auto flex min-h-[500px] max-w-[1440px] items-center px-6 py-20 sm:px-10 lg:min-h-[570px] lg:px-16">
              <div className="max-w-[620px] text-white">
                <div className="mb-5 h-[3px] w-16 bg-[#d8b44c]" />

                <h1 className="text-4xl font-extrabold leading-[1.05] sm:text-5xl lg:text-[62px]">
                  {hero.title}
                </h1>

                <p className="mt-6 max-w-xl text-base leading-7 text-white/90 sm:text-lg">
                  {hero.text}
                </p>

                <Link
                  href="/login"
                  className="mt-8 inline-flex items-center gap-3 bg-white px-6 py-3.5 text-sm font-bold text-[#B31B34] transition hover:bg-[#d8b44c] hover:text-white"
                >
                  {hero.button}
                  <ArrowRight size={17} />
                </Link>
              </div>
            </div>
          </div>
        ))}

        <button
          onClick={() =>
            setSlide(
              (slide - 1 + heroSlides.length) %
                heroSlides.length
            )
          }
          className="absolute left-4 top-1/2 z-30 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-black/20 text-white backdrop-blur-sm hover:bg-[#B31B34] sm:flex"
        >
          <ChevronRight
            size={24}
            className="rotate-180"
          />
        </button>

        <button
          onClick={() =>
            setSlide((slide + 1) % heroSlides.length)
          }
          className="absolute right-4 top-1/2 z-30 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-black/20 text-white backdrop-blur-sm hover:bg-[#B31B34] sm:flex"
        >
          <ChevronRight size={24} />
        </button>

        <div className="absolute bottom-7 left-1/2 z-30 flex -translate-x-1/2 gap-2">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setSlide(index)}
              className={`h-2 rounded-full transition-all ${
                index === slide
                  ? "w-9 bg-[#d8b44c]"
                  : "w-2 bg-white/60"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   HERO ARTWORK
========================================================= */

function HeroArtwork({ type }) {
  return (
    <div className="absolute inset-0 overflow-hidden bg-[#5d1a2a]">
      <div className="absolute right-[-100px] top-[-160px] h-[520px] w-[520px] rounded-full border-[100px] border-white/[0.04]" />

      <div className="absolute bottom-[-180px] left-[40%] h-[500px] w-[500px] rounded-full bg-[#B31B34]/50 blur-3xl" />

      {type === "bonus" && (
        <>
          <div className="absolute right-[8%] top-[18%] hidden h-[290px] w-[360px] rotate-[-7deg] rounded-xl bg-white/[0.08] shadow-2xl backdrop-blur-sm lg:block" />

          <div className="absolute right-[14%] top-[25%] hidden h-[245px] w-[310px] rotate-[-7deg] rounded-lg border border-white/20 bg-white/10 p-5 lg:block">
            <div className="text-xs text-white/60">
              CHECKING
            </div>

            <div className="mt-5 h-4 w-36 bg-white/20" />
            <div className="mt-3 h-3 w-52 bg-white/10" />

            <div className="mt-12 flex gap-3">
              <div className="h-14 flex-1 bg-[#B31B34]" />
              <div className="h-14 flex-1 bg-[#d8b44c]" />
            </div>
          </div>

          <div className="absolute bottom-[14%] right-[19%] hidden rounded-full bg-[#d8b44c] p-8 text-[#5d1a2a] shadow-2xl lg:block">
            <DollarSign size={45} />
          </div>
        </>
      )}

      {type === "checking" && (
        <>
          <div className="absolute right-[13%] top-[15%] hidden h-[360px] w-[270px] rotate-[7deg] rounded-[28px] border-[8px] border-white/70 bg-[#f6f1e9] p-3 shadow-2xl lg:block">
            <div className="h-full rounded-[20px] bg-white">
              <div className="bg-[#B31B34] px-5 py-5 text-sm font-bold text-white">
                Checking
              </div>

              <div className="space-y-4 p-5">
                <div className="h-12 rounded-lg bg-gray-100" />
                <div className="h-12 rounded-lg bg-gray-100" />
                <div className="h-12 rounded-lg bg-gray-100" />

                <div className="mt-5 h-28 rounded-lg bg-[#f4e9eb]" />
              </div>
            </div>
          </div>
        </>
      )}

      {type === "home" && (
        <>
          <div className="absolute right-[5%] bottom-0 hidden h-[410px] w-[590px] lg:block">
            <div className="absolute bottom-0 left-1/2 h-[310px] w-[450px] -translate-x-1/2 skew-x-[-8deg] bg-[#d8b44c]/80" />

            <div className="absolute bottom-0 left-[20%] h-[280px] w-[420px] bg-[#8c263a]">
              <div className="absolute left-[50%] top-[35px] h-[120px] w-[130px] -translate-x-1/2 bg-[#d7c9b7]" />

              <div className="absolute bottom-0 left-[35px] h-[120px] w-[95px] bg-[#5d1a2a]" />

              <div className="absolute bottom-0 right-[35px] h-[150px] w-[110px] bg-[#5d1a2a]" />
            </div>
          </div>
        </>
      )}
    </div>
  );
}

/* =========================================================
   PRODUCT NAVIGATION
========================================================= */

function ProductNavigation() {
  const links = [
    ["Checking", Wallet],
    ["Savings & CDs", PiggyBank],
    ["Credit Cards", CreditCard],
    ["Home Loans", Home],
    ["Personal Loans", DollarSign],
    ["Auto Loans", Car],
    ["Investing", BarChart3],
    ["Premier", BriefcaseBusiness],
    ["Education & Tools", GraduationCap],
  ];

  return (
    <section className="border-b border-gray-200 bg-white">
      <div className="mx-auto grid max-w-[1440px] grid-cols-2 md:grid-cols-3 lg:grid-cols-9">
        {links.map(([title, Icon]) => (
          <Link
            href="/login"
            key={title}
            className="group flex min-h-[105px] flex-col items-center justify-center gap-3 border-b border-gray-100 px-2 py-5 text-center transition hover:bg-[#faf5f6] lg:border-b-0 lg:border-r"
          >
            <Icon
              size={25}
              strokeWidth={1.7}
              className="text-[#B31B34] transition group-hover:scale-110"
            />

            <span className="text-[12px] font-semibold leading-4 text-gray-700 group-hover:text-[#B31B34]">
              {title}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}

/* =========================================================
   PRODUCT HIGHLIGHTS
========================================================= */

function ProductHighlights() {
  return (
    <section className="bg-white px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
      <div className="mx-auto max-w-[1250px]">
        <div className="grid gap-5 md:grid-cols-3">
          {productCards.map((card) => {
            const Icon = card.icon;

            return (
              <Link
                href="/login"
                key={card.title}
                className="group relative min-h-[320px] overflow-hidden border border-gray-200 bg-white p-7 transition duration-300 hover:-translate-y-1 hover:border-[#B31B34] hover:shadow-xl"
              >
                <div className="absolute right-[-45px] top-[-45px] h-[160px] w-[160px] rounded-full bg-[#f7edef]" />

                <div className="relative">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#f7edef] text-[#B31B34]">
                    <Icon size={24} />
                  </div>

                  <h3 className="mt-8 max-w-sm text-2xl font-bold leading-tight text-[#292929]">
                    {card.title}
                  </h3>

                  <p className="mt-4 max-w-sm text-sm leading-6 text-gray-600">
                    {card.text}
                  </p>

                  <div className="mt-7 inline-flex items-center gap-2 text-sm font-bold text-[#B31B34]">
                    {card.button}
                    <ArrowRight
                      size={16}
                      className="transition group-hover:translate-x-1"
                    />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   INTEREST RATES
========================================================= */

function InterestRates() {
  const rates = [
    ["Savings", "APY", "See rates"],
    ["CDs", "Rates", "Check rates"],
    ["Mortgage", "Rate & APR", "Get a quote"],
  ];

  return (
    <section className="bg-[#f6f6f6] px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
      <div className="mx-auto max-w-[1250px]">
        <div className="grid gap-10 lg:grid-cols-[.8fr_1.2fr]">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#B31B34]">
              Rates & pricing
            </p>

            <h2 className="mt-3 text-3xl font-extrabold text-[#222] sm:text-4xl">
              Interest rates today
            </h2>

            <p className="mt-4 max-w-md text-sm leading-7 text-gray-600">
              Explore current rates and find the products that
              fit your financial goals.
            </p>

            <Link
              href="/login"
              className="mt-7 inline-flex items-center gap-2 bg-[#B31B34] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#8F1428]"
            >
              Check rates
              <ArrowRight size={16} />
            </Link>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            {rates.map(([name, label, button]) => (
              <div
                key={name}
                className="border border-gray-200 bg-white p-6"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#f7edef] text-[#B31B34]">
                  {name === "Savings" ? (
                    <PiggyBank size={21} />
                  ) : name === "CDs" ? (
                    <BarChart3 size={21} />
                  ) : (
                    <Home size={21} />
                  )}
                </div>

                <h3 className="mt-5 text-lg font-bold">
                  {name}
                </h3>

                <div className="mt-3 text-xs text-gray-500">
                  {label}
                </div>

                <div className="mt-5 text-sm font-bold text-[#B31B34]">
                  {button}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   FINANCIAL GUIDANCE
========================================================= */

function FinancialGuidance() {
  return (
    <section className="bg-white px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      <div className="mx-auto max-w-[1250px]">
        <div className="mb-10 text-center">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#B31B34]">
            Financial guidance and support
          </p>

          <h2 className="mt-3 text-3xl font-extrabold text-[#222] sm:text-4xl">
            Tools and guidance for your financial journey
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-gray-600">
            Get tools, tips, and information to help you save,
            borrow, protect, and plan for the future.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {guidanceCards.map((card) => {
            const Icon = card.icon;

            return (
              <Link
                href="/login"
                key={card.title}
                className="group border border-gray-200 bg-white p-7 transition hover:border-[#B31B34] hover:shadow-lg"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#f7edef] text-[#B31B34]">
                  <Icon size={27} />
                </div>

                <h3 className="mt-7 text-xl font-bold">
                  {card.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-gray-600">
                  {card.text}
                </p>

                <div className="mt-6 flex items-center gap-2 text-sm font-bold text-[#B31B34]">
                  {card.button}
                  <ArrowRight
                    size={16}
                    className="transition group-hover:translate-x-1"
                  />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   FARGO
========================================================= */

function FargoSection() {
  return (
    <section className="overflow-hidden bg-[#4b1825]">
      <div className="mx-auto grid max-w-[1440px] lg:grid-cols-2">
        <div className="relative flex min-h-[390px] items-center overflow-hidden px-6 py-16 text-white sm:px-12 lg:px-16">
          <div className="absolute right-[-100px] top-[-100px] h-[350px] w-[350px] rounded-full border-[55px] border-white/5" />

          <div className="relative max-w-xl">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#d8b44c] text-[#4b1825]">
              <MessageCircle size={28} />
            </div>

            <h2 className="mt-7 text-3xl font-extrabold sm:text-4xl">
              Need help? Ask Fargo<sup>®</sup>
            </h2>

            <p className="mt-5 text-sm leading-7 text-white/85 sm:text-base">
              Fargo gives you valuable insights like a summary
              of your spending by category, retailer, and across
              accounts. Find it in the Wells Fargo Mobile
              app.
            </p>

            <Link
              href="/login"
              className="mt-7 inline-flex items-center gap-2 border border-white px-6 py-3 text-sm font-bold transition hover:bg-white hover:text-[#4b1825]"
            >
              Learn more
              <ArrowRight size={17} />
            </Link>
          </div>
        </div>

        <div className="relative flex min-h-[390px] items-center justify-center overflow-hidden bg-[#eee7df]">
          <div className="absolute h-[380px] w-[380px] rounded-full bg-[#d8b44c]/20" />

          <div className="relative h-[300px] w-[165px] rotate-[5deg] rounded-[30px] border-[8px] border-[#272727] bg-[#171717] p-2 shadow-2xl">
            <div className="h-full overflow-hidden rounded-[22px] bg-white">
              <div className="bg-[#B31B34] px-4 py-5 text-xs font-bold text-white">
                Fargo
              </div>

              <div className="p-4">
                <div className="text-[9px] text-gray-400">
                  Spending overview
                </div>

                <div className="mt-3 flex items-end gap-1">
                  {[35, 60, 48, 75, 55, 90, 65].map(
                    (height, index) => (
                      <div
                        key={index}
                        className="flex-1 bg-[#B31B34]"
                        style={{ height }}
                      />
                    )
                  )}
                </div>

                <div className="mt-5 space-y-2">
                  <div className="h-7 rounded bg-gray-100" />
                  <div className="h-7 rounded bg-gray-100" />
                  <div className="h-7 rounded bg-gray-100" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   COMMUNITY
========================================================= */

function CommunitySection() {
  return (
    <section className="bg-white px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      <div className="mx-auto max-w-[1250px]">
        <div className="mb-12">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#B31B34]">
            Serving our customers and communities
          </p>

          <h2 className="mt-3 max-w-3xl text-3xl font-extrabold leading-tight text-[#222] sm:text-5xl">
            It's earned relationship by relationship.
          </h2>

          <p className="mt-5 max-w-3xl text-base leading-7 text-gray-600">
            It doesn't happen with one transaction, in one day
            on the job, or in one quarter. It's earned
            relationship by relationship.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="relative overflow-hidden bg-[#f3eeee] p-8 sm:p-10">
            <div className="absolute right-[-60px] top-[-60px] h-[210px] w-[210px] rounded-full border-[35px] border-[#B31B34]/10" />

            <Users
              size={40}
              className="relative text-[#B31B34]"
            />

            <h3 className="relative mt-7 text-2xl font-bold">
              Who we are
            </h3>

            <p className="relative mt-4 max-w-xl text-sm leading-7 text-gray-600">
              Wells Fargo helps strengthen communities through
              inclusion, economic empowerment, and
              sustainability.
            </p>

            <Link
              href="/login"
              className="relative mt-6 inline-flex items-center gap-2 text-sm font-bold text-[#B31B34]"
            >
              About Wells Fargo
              <ArrowRight size={16} />
            </Link>
          </div>

          <div className="relative overflow-hidden bg-[#eee8df] p-8 sm:p-10">
            <div className="absolute right-[-60px] bottom-[-70px] h-[220px] w-[220px] rounded-full bg-[#d8b44c]/20" />

            <Building2
              size={40}
              className="relative text-[#B31B34]"
            />

            <h3 className="relative mt-7 text-2xl font-bold">
              Why we're committed to communities
            </h3>

            <p className="relative mt-4 max-w-xl text-sm leading-7 text-gray-600">
              We're committed to helping customers and
              neighborhoods across the country thrive.
            </p>

            <Link
              href="/login"
              className="relative mt-6 inline-flex items-center gap-2 text-sm font-bold text-[#B31B34]"
            >
              Wells Fargo Stories
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   HELP
========================================================= */

function HelpSection() {
  return (
    <section className="border-t border-gray-200 bg-[#f7f7f7] px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1250px]">
        <h2 className="text-2xl font-bold text-[#222]">
          How can we help?
        </h2>

        <div className="mt-7 grid gap-3 sm:grid-cols-3">
          <Link
            href="/login"
            className="flex items-center gap-4 border border-gray-200 bg-white px-5 py-5 transition hover:border-[#B31B34]"
          >
            <MapPin
              size={22}
              className="text-[#B31B34]"
            />

            <div>
              <div className="font-semibold">
                Find a location
              </div>

              <div className="mt-1 text-xs text-gray-500">
                Find ATMs and branches
              </div>
            </div>

            <ChevronRight
              size={17}
              className="ml-auto"
            />
          </Link>

          <Link
            href="/login"
            className="flex items-center gap-4 border border-gray-200 bg-white px-5 py-5 transition hover:border-[#B31B34]"
          >
            <CalendarDays
              size={22}
              className="text-[#B31B34]"
            />

            <div>
              <div className="font-semibold">
                Make an appointment
              </div>

              <div className="mt-1 text-xs text-gray-500">
                Schedule time with a banker
              </div>
            </div>

            <ChevronRight
              size={17}
              className="ml-auto"
            />
          </Link>

          <Link
            href="/login"
            className="flex items-center gap-4 border border-gray-200 bg-white px-5 py-5 transition hover:border-[#B31B34]"
          >
            <HelpCircle
              size={22}
              className="text-[#B31B34]"
            />

            <div>
              <div className="font-semibold">
                Quick help
              </div>

              <div className="mt-1 text-xs text-gray-500">
                Customer service and FAQs
              </div>
            </div>

            <ChevronRight
              size={17}
              className="ml-auto"
            />
          </Link>
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   FOOTER
========================================================= */

function Footer() {
  const columns = [
    {
      title: "Personal",
      links: [
        "Checking",
        "Savings & CDs",
        "Credit Cards",
        "Home Loans",
        "Personal Loans",
        "Auto Loans",
        "Investing",
        "Premier",
      ],
    },
    {
      title: "Banking Services",
      links: [
        "Routing and account numbers",
        "Overdraft services",
        "Security and fraud",
        "Global remittance",
        "Make an appointment",
        "Foreign exchange",
        "Transfer and pay",
      ],
    },
    {
      title: "Digital Banking",
      links: [
        "Wells Fargo Online",
        "Wells Fargo Mobile app",
        "Transfer and pay",
        "Report fraud",
        "Digital wallets",
        "Financial Goals",
      ],
    },
    {
      title: "Education & Tools",
      links: [
        "Credit education",
        "Mortgage calculators",
        "Debt consolidation calculator",
        "Financial planning",
        "Learning center",
        "FAQs",
      ],
    },
  ];

  return (
    <footer className="bg-[#242424] text-white">
      <div className="mx-auto max-w-[1440px] px-6 py-14 sm:px-8 lg:px-10">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {columns.map((column) => (
            <div key={column.title}>
              <h3 className="border-b border-white/10 pb-4 text-sm font-bold uppercase tracking-wider">
                {column.title}
              </h3>

              <div className="mt-5 space-y-3">
                {column.links.map((link) => (
                  <Link
                    href="/login"
                    key={link}
                    className="block text-sm text-gray-400 transition hover:text-white"
                  >
                    {link}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="my-12 h-px bg-white/10" />

        <div className="grid gap-10 lg:grid-cols-[1fr_auto]">
          <div>
            <WellsFargoLogo />

            <div className="mt-6 max-w-2xl text-xs leading-6 text-gray-500">
              Wells Fargo Bank, N.A. Member FDIC. Equal Housing
              Lender.
            </div>

            <div className="mt-5 flex flex-wrap gap-4 text-xs text-gray-400">
              <Link href="/login" className="hover:text-white">
                Privacy, Cookies, and Legal
              </Link>

              <Link href="/login" className="hover:text-white">
                Security
              </Link>

              <Link href="/login" className="hover:text-white">
                Accessibility
              </Link>

              <Link href="/login" className="hover:text-white">
                Sitemap
              </Link>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            {["f", "X", "in", "▶"].map((social) => (
              <Link
                href="/login"
                key={social}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-sm font-bold text-gray-400 transition hover:border-[#d8b44c] hover:text-[#d8b44c]"
              >
                {social}
              </Link>
            ))}
          </div>
        </div>

        <div className="my-8 h-px bg-white/10" />

        <div className="flex flex-col gap-4 text-[11px] leading-5 text-gray-500 md:flex-row md:items-center md:justify-between">
          <div>
            Investment and Insurance Products are not insured by
            the FDIC or any federal government agency and are
            subject to investment risks.
          </div>

          <div className="shrink-0">
            © 1999 - 2026 Wells Fargo. NMLSR ID 399801
          </div>
        </div>
      </div>
    </footer>
  );
}