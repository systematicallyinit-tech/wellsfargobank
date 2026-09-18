"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowUpRight,
  ChevronDown,
  CreditCard,
  FileText,
  Home,
  Landmark,
  LogOut,
  PlaneTakeoff,
  Settings,
  X,
  Menu,
} from "lucide-react";
import Image from "next/image";

// Home page color palette
const COLORS = {
  burgundy: "#B31B34",
  darkBurgundy: "#8F1428",
  gold: "#C9A227",
  lightBurgundy: "#F7EDEF",
  text: "#333333",
  muted: "#666666",
  border: "#EAEAEA",
};

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

export const Sidebar = ({ open, setOpen, tab, tab2 }) => {
  const router = useRouter();
  const [isTransfer, setIsTransfer] = useState(false);

  const toggleMenu = () => {
    setIsTransfer((prev) => !prev);
  };

  const handleLogout = async () => {
    try {
      const response = await fetch("/api/auth/logout", {
        method: "POST",
      });

      const data = await response.json();

      if (data.success) {
        router.push("/login");
        router.refresh();
      }
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  // Reusable navigation item styles
  const navItem = (active = false) => `
    group flex w-full items-center gap-3
    rounded-lg px-3 py-3
    text-left text-sm font-semibold
    transition-all duration-200
    ${
      active
        ? "bg-[#B31B34] text-white shadow-sm"
        : "text-[#333333] hover:bg-[#F7EDEF] hover:text-[#B31B34]"
    }
  `;

  const subNavItem = (active = false) => `
    group flex w-full items-center gap-3
    rounded-md px-3 py-2.5
    text-left text-sm font-medium
    transition-all duration-200
    ${
      active
        ? "bg-white text-[#B31B34] shadow-sm"
        : "text-[#666666] hover:bg-white hover:text-[#B31B34]"
    }
  `;

  return (
    <>
      {/* Mobile overlay */}
      {open && (
        <button
          type="button"
          aria-label="Close menu"
          onClick={() => setOpen(false)}
          className="
            fixed inset-0 z-40
            bg-[#241017]/50 backdrop-blur-[2px]
            lg:hidden
          "
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed left-0 top-0 z-50
          h-screen w-[270px]
          border-r border-[#EAEAEA]
          bg-white
          shadow-xl
          transition-transform duration-300

          lg:sticky
          lg:top-[64px]
          lg:z-30
          lg:h-[calc(100vh-64px)]
          lg:shadow-none
          lg:translate-x-0

          ${open ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <div className="flex h-full flex-col">
          {/* Mobile header */}
          <div
            className="
              flex h-[72px] items-center
              justify-between border-b border-[#EAEAEA]
              px-5 lg:hidden
            "
          >
            <Link
              href="/dashboard"
              onClick={() => setOpen(false)}
              className="flex items-center"
            >
              <WellsFargoLogo />
            </Link>

            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close sidebar"
              className="
                rounded-lg p-2
                text-[#666666]
                transition hover:bg-[#F7EDEF]
                hover:text-[#B31B34]
              "
            >
              <X size={21} />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto px-4 py-6">
            {/* Section heading */}
            <div className="mb-4 flex items-center gap-2 px-3">
              <div className="h-4 w-[3px] rounded-full bg-[#C9A227]" />

              <p
                className="
                text-[11px] font-bold uppercase
                tracking-[0.16em] text-[#777777]
              "
              >
                Main menu
              </p>
            </div>

            <div className="space-y-1">
              {/* Dashboard */}
              <Link
                href="/dashboard"
                onClick={() => setOpen(false)}
                className={navItem(tab === "home")}
              >
                <Home size={19} strokeWidth={1.8} />
                <span>Dashboard</span>
              </Link>

              {/* Cards */}
              <Link
                href="/dashboard/cards"
                onClick={() => setOpen(false)}
                className={navItem(tab === "cards")}
              >
                <CreditCard size={19} strokeWidth={1.8} />
                <span>Cards</span>
              </Link>

              {/* Transfer */}
              <button
                type="button"
                onClick={toggleMenu}
                className={`
                  ${navItem(tab2 === "transfer")}
                  justify-between
                `}
              >
                <span className="flex items-center gap-3">
                  <ArrowUpRight size={19} strokeWidth={1.8} />
                  <span>Transfer</span>
                </span>

                <ChevronDown
                  size={17}
                  className={`
                    transition-transform duration-200
                    ${isTransfer ? "rotate-180" : ""}
                  `}
                />
              </button>

              {/* Transfer submenu */}
              <div
                className={`
                  grid transition-all duration-200
                  ${
                    isTransfer
                      ? "grid-rows-[1fr] opacity-100"
                      : "grid-rows-[0fr] opacity-0"
                  }
                `}
              >
                <div className="min-h-0 overflow-hidden">
                  <div
                    className="
                    ml-3 mt-1 space-y-1
                    rounded-lg bg-[#F7EDEF]
                    p-2
                  "
                  >
                    {/* Local transfer */}
                    <Link
                      href="/dashboard/local-transfer"
                      onClick={() => setOpen(false)}
                      className={subNavItem(tab === "local")}
                    >
                      <Landmark size={17} strokeWidth={1.8} />
                      <span>Local Transfer</span>
                    </Link>

                    {/* International transfer */}
                    <Link
                      href="/dashboard/international-transfer"
                      onClick={() => setOpen(false)}
                      className={subNavItem(tab === "international")}
                    >
                      <PlaneTakeoff size={17} strokeWidth={1.8} />
                      <span>International Transfer</span>
                    </Link>
                  </div>
                </div>
              </div>

              {/* Transactions */}
              <Link
                href="/dashboard/transactions-hist"
                onClick={() => setOpen(false)}
                className={navItem(tab === "transactions")}
              >
                <FileText size={19} strokeWidth={1.8} />
                <span>Transactions</span>
              </Link>

              {/* Settings */}
              <Link
                href="/dashboard/settings"
                onClick={() => setOpen(false)}
                className={navItem(tab === "settings")}
              >
                <Settings size={19} strokeWidth={1.8} />
                <span>Settings</span>
              </Link>
            </div>
          </nav>

          {/* Bottom section */}
          <div
            className="
            border-t border-[#EAEAEA]
            bg-[#FCFCFC] p-4
          "
          >
            {/* Gold accent */}
            <div className="mb-3 h-[2px] w-10 rounded-full bg-[#C9A227]" />

            {/* Logout */}
            <button
              type="button"
              onClick={handleLogout}
              className="
                group flex w-full items-center gap-3
                rounded-lg px-3 py-3
                text-sm font-semibold text-[#666666]
                transition-all duration-200
                hover:bg-[#F7EDEF]
                hover:text-[#B31B34]
              "
            >
              <LogOut
                size={19}
                strokeWidth={1.8}
                className="transition-transform group-hover:-translate-x-0.5"
              />

              <span>Sign out</span>
            </button>

            {/* Version */}
            <div
              className="
              mt-3 flex items-center justify-between
              px-3 text-[11px] text-[#999999]
            "
            >
              <span>Version</span>
              <span className="font-semibold text-[#B31B34]">v1.19.0</span>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};
