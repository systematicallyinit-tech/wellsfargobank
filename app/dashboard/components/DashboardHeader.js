"use client";

import {
  Bell,
  ChevronDown,
  Menu,
  Search,
  User,
  X,
} from "lucide-react";
import Image from "next/image";
import { useAuth } from "@/app/context/AuthContext";

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

export const DashboardHeader = ({
  sidebarOpen,
  setSidebarOpen,
}) => {
  const { user } = useAuth();

  return (
    <header className="sticky top-0 z-40 h-[72px] border-b border-gray-200/80 bg-white/95 backdrop-blur-xl">
      <div className="mx-auto flex h-full max-w-[1500px] items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* =========================
            LEFT SIDE
        ========================== */}
        <div className="flex items-center gap-3">
          {/* Mobile Menu */}
          <button
            type="button"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-label={sidebarOpen ? "Close menu" : "Open menu"}
            className="
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-xl
              border
              border-gray-200
              bg-gray-50
              text-gray-700
              transition-all
              duration-200
              hover:bg-gray-100
              hover:text-[#8B0000]
              active:scale-95
              lg:hidden
            "
          >
            {sidebarOpen ? (
              <X size={21} strokeWidth={2} />
            ) : (
              <Menu size={21} strokeWidth={2} />
            )}
          </button>

          {/* =========================
              WELLS FARGO LOGO
          ========================== */}
          <a
            href="/dashboard"
            className="
              group
              flex
              items-center
              gap-3
              outline-none
            "
          >
            <WellsFargoLogo />
          </a>
        </div>

        {/* =========================
            DESKTOP SEARCH
        ========================== */}
        <div
          className="
            hidden
            h-11
            w-[320px]
            items-center
            rounded-xl
            border
            border-gray-200
            bg-gray-50
            px-3
            transition-all
            duration-200
            focus-within:border-gray-300
            focus-within:bg-white
            focus-within:shadow-sm
            lg:flex
          "
        >
          <Search
            size={18}
            strokeWidth={1.8}
            className="shrink-0 text-gray-400"
          />

          <input
            type="text"
            placeholder="Search"
            className="
              h-full
              w-full
              border-0
              bg-transparent
              px-3
              text-sm
              text-gray-800
              outline-none
              placeholder:text-gray-400
            "
          />

          <span
            className="
              hidden
              rounded-md
              border
              border-gray-200
              bg-white
              px-2
              py-1
              text-[10px]
              font-medium
              text-gray-400
              xl:block
            "
          >
            /
          </span>
        </div>

        {/* =========================
            RIGHT SIDE
        ========================== */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Mobile Notification */}
          <button
            type="button"
            aria-label="Notifications"
            className="
              relative
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-xl
              text-gray-600
              transition-all
              duration-200
              hover:bg-gray-100
              hover:text-gray-900
              active:scale-95
              sm:flex
            "
          >
            <Bell size={19} strokeWidth={1.9} />

            <span
              className="
                absolute
                right-[9px]
                top-[8px]
                h-2
                w-2
                rounded-full
                border-2
                border-white
                bg-[#C41230]
              "
            />
          </button>

          {/* Mobile Profile */}
          <a
            href="/dashboard/settings"
            aria-label="Profile settings"
            className="
              relative
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-xl
              text-gray-600
              transition-all
              duration-200
              hover:bg-gray-100
              hover:text-gray-900
              active:scale-95
              sm:hidden
            "
          >
            <User size={19} strokeWidth={1.9} />
          </a>

          {/* =========================
              DESKTOP USER MENU
          ========================== */}
          <button
            type="button"
            className="
              hidden
              items-center
              gap-2.5
              rounded-xl
              border
              border-transparent
              px-2
              py-1.5
              transition-all
              duration-200
              hover:border-gray-200
              hover:bg-gray-50
              sm:flex
            "
          >
            {/* Avatar */}
            <span
              className="
                flex
                h-9
                w-9
                shrink-0
                items-center
                justify-center
                rounded-full
                bg-gradient-to-br
                from-[#C41230]
                to-[#8B0000]
                text-white
                shadow-sm
              "
            >
              <User size={17} strokeWidth={2} />
            </span>

            {/* User Information */}
            <span className="flex max-w-[150px] flex-col items-start">
              <span className="truncate text-sm font-semibold text-gray-900">
                {user?.fullname || "User"}
              </span>

              <span className="text-[10px] font-medium uppercase tracking-wide text-gray-400">
                Personal Banking
              </span>
            </span>

            <ChevronDown
              size={16}
              strokeWidth={1.8}
              className="ml-1 text-gray-400"
            />
          </button>
        </div>
      </div>
    </header>
  );
};

