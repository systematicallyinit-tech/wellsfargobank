"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  ArrowRight,
  ShieldCheck,
  HelpCircle,
  MapPin,
  Globe,
  ChevronRight,
  Smartphone,
  CheckCircle2,
  AlertCircle,
  Loader2,
} from "lucide-react";

const COLORS = {
  burgundy: "#B31B34",
  darkBurgundy: "#8F1428",
  deepBurgundy: "#4B1825",
  gold: "#D8B44C",
  background: "#F6F6F6",
  lightRed: "#F7EDEF",
  text: "#333333",
  muted: "#666666",
};

export default function LoginPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));

    if (error) {
      setError("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    if (!form.email.trim()) {
      setError("Please enter your email address.");
      return;
    }

    if (!form.password) {
      setError("Please enter your password.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: form.email.trim(),
          password: form.password,
        }),
      });

      let data = {};

      const contentType =
        response.headers.get("content-type") || "";

      if (contentType.includes("application/json")) {
        data = await response.json();
      } else {
        const text = await response.text();

        data = {
          message: text,
        };
      }

      if (response.ok) {
        router.push("/dashboard");
        return;
      }

      const serverMessage =
        data?.message ||
        data?.error ||
        data?.errors?.[0]?.message ||
        "Unable to sign in. Please check your email and password.";

      setError(serverMessage);
    } catch (err) {
      console.error("Login error:", err);

      setError(
        "Unable to connect to the server. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#F6F6F6] text-[#333333]">
      {/* =====================================================
          TOP UTILITY BAR
      ===================================================== */}

      <div className="hidden border-b border-gray-200 bg-white lg:block">
        <div className="mx-auto flex h-[38px] max-w-[1440px] items-center justify-between px-6">
          <div className="flex items-center gap-6 text-[12px] text-gray-600">
            <Link
              href="#"
              className="transition hover:text-[#B31B34]"
            >
              ATMs/Locations
            </Link>

            <Link
              href="#"
              className="flex items-center gap-1 transition hover:text-[#B31B34]"
            >
              <HelpCircle size={13} />
              Help
            </Link>

            <Link
              href="#"
              className="flex items-center gap-1 transition hover:text-[#B31B34]"
            >
              <Globe size={13} />
              Español
            </Link>
          </div>

          <span className="text-[12px] font-semibold text-[#B31B34]">
            Sign On
          </span>
        </div>
      </div>

      {/* =====================================================
          HEADER
      ===================================================== */}

      <header className="border-b border-gray-200 bg-white">
        <div className="mx-auto flex h-[78px] max-w-[1440px] items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center">
            <WellsFargoLogo />
          </Link>

          <div className="hidden items-center gap-7 text-[13px] font-semibold text-gray-700 md:flex">
            <Link
              href="/"
              className="transition hover:text-[#B31B34]"
            >
              Personal
            </Link>

            <Link
              href="#"
              className="transition hover:text-[#B31B34]"
            >
              Checking
            </Link>

            <Link
              href="#"
              className="transition hover:text-[#B31B34]"
            >
              Credit Cards
            </Link>

            <Link
              href="#"
              className="transition hover:text-[#B31B34]"
            >
              Loans
            </Link>

            <Link
              href="#"
              className="transition hover:text-[#B31B34]"
            >
              Investing
            </Link>
          </div>

          <Link
            href="/"
            className="text-sm font-bold text-[#B31B34] hover:underline"
          >
            Back to home
          </Link>
        </div>
      </header>

      {/* =====================================================
          MAIN LOGIN AREA
      ===================================================== */}

      <section className="relative overflow-hidden">
        {/* Decorative background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -left-40 -top-40 h-[500px] w-[500px] rounded-full bg-[#B31B34]/5" />

          <div className="absolute -right-48 top-[20%] h-[600px] w-[600px] rounded-full border-[90px] border-[#D8B44C]/10" />

          <div className="absolute bottom-[-200px] left-[30%] h-[500px] w-[500px] rounded-full bg-[#4B1825]/5" />
        </div>

        <div className="relative mx-auto grid min-h-[calc(100vh-116px)] max-w-[1250px] items-center gap-12 px-4 py-12 sm:px-6 lg:grid-cols-[1fr_480px] lg:px-8 lg:py-20">
          {/* =================================================
              LEFT SIDE
          ================================================= */}

          <div className="hidden lg:block">
            <div className="max-w-xl">
              <div className="mb-5 inline-flex items-center gap-2 bg-[#F7EDEF] px-4 py-2 text-xs font-bold uppercase tracking-[0.15em] text-[#B31B34]">
                <LockKeyhole size={15} />
                Secure Online Banking
              </div>

              <h1 className="text-5xl font-extrabold leading-[1.05] text-[#333333] xl:text-6xl">
                Welcome back.
                <br />
                <span className="text-[#B31B34]">
                  Sign on securely.
                </span>
              </h1>

              <p className="mt-7 max-w-lg text-lg leading-8 text-[#666666]">
                Access your accounts securely and manage your
                banking wherever you are.
              </p>

              <div className="mt-10 space-y-5">
                <SecurityFeature
                  icon={ShieldCheck}
                  title="Secure sign in"
                  text="Your login information is transmitted securely."
                />

                <SecurityFeature
                  icon={Smartphone}
                  title="Bank anywhere"
                  text="Access your account from desktop, tablet, or mobile."
                />

                <SecurityFeature
                  icon={CheckCircle2}
                  title="Easy account access"
                  text="View your balances and manage your banking in one place."
                />
              </div>
            </div>
          </div>

          {/* =================================================
              LOGIN CARD
          ================================================= */}

          <div className="w-full">
            <div className="overflow-hidden border border-gray-200 bg-white shadow-[0_20px_70px_rgba(75,24,37,0.12)]">
              {/* Card Header */}

              <div className="bg-[#4B1825] px-6 py-7 text-white sm:px-8">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10">
                    <LockKeyhole
                      size={23}
                      className="text-[#D8B44C]"
                    />
                  </div>

                  <div>
                    <h2 className="text-2xl font-bold">
                      Sign on
                    </h2>

                    <p className="mt-1 text-sm text-white/70">
                      Access your account
                    </p>
                  </div>
                </div>
              </div>

              {/* Form */}

              <div className="p-6 sm:p-8">
                <form
                  onSubmit={handleSubmit}
                  className="space-y-5"
                >
                  {/* Error */}

                  {error && (
                    <div
                      role="alert"
                      className="flex items-start gap-3 border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
                    >
                      <AlertCircle
                        size={19}
                        className="mt-0.5 shrink-0"
                      />

                      <span>{error}</span>
                    </div>
                  )}

                  {/* Email */}

                  <div>
                    <label
                      htmlFor="email"
                      className="mb-2 block text-sm font-semibold text-[#333333]"
                    >
                      Email address
                    </label>

                    <div className="relative">
                      <Mail
                        size={19}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                      />

                      <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="Enter your email"
                        disabled={loading}
                        className="h-14 w-full border border-gray-300 bg-white pl-12 pr-4 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-[#B31B34] focus:ring-2 focus:ring-[#B31B34]/10 disabled:cursor-not-allowed disabled:bg-gray-100"
                      />
                    </div>
                  </div>

                  {/* Password */}

                  <div>
                    <label
                      htmlFor="password"
                      className="mb-2 block text-sm font-semibold text-[#333333]"
                    >
                      Password
                    </label>

                    <div className="relative">
                      <LockKeyhole
                        size={19}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                      />

                      <input
                        id="password"
                        name="password"
                        type={
                          showPassword
                            ? "text"
                            : "password"
                        }
                        autoComplete="current-password"
                        value={form.password}
                        onChange={handleChange}
                        placeholder="Enter your password"
                        disabled={loading}
                        className="h-14 w-full border border-gray-300 bg-white pl-12 pr-12 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-[#B31B34] focus:ring-2 focus:ring-[#B31B34]/10 disabled:cursor-not-allowed disabled:bg-gray-100"
                      />

                      <button
                        type="button"
                        onClick={() =>
                          setShowPassword(!showPassword)
                        }
                        disabled={loading}
                        aria-label={
                          showPassword
                            ? "Hide password"
                            : "Show password"
                        }
                        className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center text-gray-500 transition hover:text-[#B31B34]"
                      >
                        {showPassword ? (
                          <EyeOff size={19} />
                        ) : (
                          <Eye size={19} />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Remember */}

                  <div className="flex items-center justify-between gap-4">
                    <label className="flex cursor-pointer items-center gap-2">
                      <input
                        type="checkbox"
                        checked={rememberMe}
                        onChange={(e) =>
                          setRememberMe(e.target.checked)
                        }
                        disabled={loading}
                        className="h-4 w-4 accent-[#B31B34]"
                      />

                      <span className="text-sm text-gray-600">
                        Remember me
                      </span>
                    </label>

                    <Link
                      href="/forgot-password"
                      className="text-sm font-semibold text-[#B31B34] hover:underline"
                    >
                      Forgot password?
                    </Link>
                  </div>

                  {/* Submit */}

                  <button
                    type="submit"
                    disabled={loading}
                    className="group flex h-14 w-full items-center justify-center gap-3 bg-[#B31B34] text-sm font-bold uppercase tracking-wide text-white transition hover:bg-[#8F1428] disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {loading ? (
                      <>
                        <Loader2
                          size={20}
                          className="animate-spin"
                        />
                        Signing in...
                      </>
                    ) : (
                      <>
                        Sign on
                        <ArrowRight
                          size={18}
                          className="transition group-hover:translate-x-1"
                        />
                      </>
                    )}
                  </button>
                </form>

                {/* Enroll */}

                <div className="mt-7 border-t border-gray-200 pt-6">
                  <div className="text-center">
                    <p className="text-sm text-gray-600">
                      Don't have an account?
                    </p>

                    <Link
                      href="/login"
                      className="mt-2 inline-flex items-center gap-2 text-sm font-bold text-[#B31B34] hover:underline"
                    >
                      Open an account
                      <ChevronRight size={16} />
                    </Link>
                  </div>
                </div>

                {/* Security Notice */}

                <div className="mt-7 flex items-start gap-3 border-t border-gray-100 pt-6">
                  <ShieldCheck
                    size={19}
                    className="mt-0.5 shrink-0 text-[#B31B34]"
                  />

                  <p className="text-[11px] leading-5 text-gray-500">
                    For your security, never share your password
                    with anyone. Make sure you are signing in
                    through your own banking application.
                  </p>
                </div>
              </div>
            </div>

            {/* Mobile security message */}

            <div className="mt-5 flex items-center justify-center gap-2 text-xs text-gray-500 lg:hidden">
              <ShieldCheck
                size={15}
                className="text-[#B31B34]"
              />
              Secure online banking
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          HELP STRIP
      ===================================================== */}

      <section className="border-t border-gray-200 bg-white">
        <div className="mx-auto grid max-w-[1250px] sm:grid-cols-3">
          <HelpItem
            icon={MapPin}
            title="Find a location"
            text="Find ATMs and branches"
          />

          <HelpItem
            icon={HelpCircle}
            title="Need help?"
            text="Customer service and FAQs"
          />

          <HelpItem
            icon={Smartphone}
            title="Mobile banking"
            text="Bank from your mobile device"
          />
        </div>
      </section>

      {/* =====================================================
          FOOTER
      ===================================================== */}

      <footer className="bg-[#242424] text-white">
        <div className="mx-auto max-w-[1250px] px-6 py-10 sm:px-8">
          <div className="flex flex-col gap-7 md:flex-row md:items-center md:justify-between">
            <WellsFargoLogo />

            <div className="flex flex-wrap gap-x-6 gap-y-3 text-xs text-gray-400">
              <Link
                href="#"
                className="hover:text-white"
              >
                Privacy
              </Link>

              <Link
                href="#"
                className="hover:text-white"
              >
                Security
              </Link>

              <Link
                href="#"
                className="hover:text-white"
              >
                Accessibility
              </Link>

              <Link
                href="#"
                className="hover:text-white"
              >
                Terms
              </Link>

              <Link
                href="#"
                className="hover:text-white"
              >
                Contact us
              </Link>
            </div>
          </div>

          <div className="my-7 h-px bg-white/10" />

          <div className="flex flex-col gap-3 text-[11px] leading-5 text-gray-500 md:flex-row md:items-center md:justify-between">
            <span>
              Secure online banking
            </span>

            <span>
              © 2026 Your Banking Application
            </span>
          </div>
        </div>
      </footer>
    </main>
  );
}

/* =========================================================
   SECURITY FEATURE
========================================================= */

function SecurityFeature({
  icon: Icon,
  title,
  text,
}) {
  return (
    <div className="flex gap-4">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#F7EDEF] text-[#B31B34]">
        <Icon size={21} />
      </div>

      <div>
        <h3 className="font-bold text-[#333333]">
          {title}
        </h3>

        <p className="mt-1 text-sm leading-6 text-gray-500">
          {text}
        </p>
      </div>
    </div>
  );
}

/* =========================================================
   HELP ITEM
========================================================= */

function HelpItem({
  icon: Icon,
  title,
  text,
}) {
  return (
    <Link
      href="#"
      className="group flex items-center gap-4 border-b border-gray-200 px-5 py-6 transition hover:bg-[#F7EDEF] sm:border-b-0 sm:border-r last:border-r-0"
    >
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#F7EDEF] text-[#B31B34] transition group-hover:bg-[#B31B34] group-hover:text-white">
        <Icon size={21} />
      </div>

      <div>
        <div className="font-semibold text-[#333333]">
          {title}
        </div>

        <div className="mt-1 text-xs text-gray-500">
          {text}
        </div>
      </div>

      <ChevronRight
        size={17}
        className="ml-auto text-gray-400 transition group-hover:translate-x-1 group-hover:text-[#B31B34]"
      />
    </Link>
  );
}

/* =========================================================
   LOGO
========================================================= */

function WellsFargoLogo() {
  return (
    <div className="flex items-center gap-3">
      <div className="relative flex h-11 w-[50px] items-center justify-center overflow-hidden bg-[#B31B34]">
        <div className="absolute bottom-0 left-1/2 h-[29px] w-[34px] -translate-x-1/2 rounded-t-[20px] border-[4px] border-[#D8B44C] border-b-0" />

        <div className="absolute left-1/2 top-[8px] h-[3px] w-[28px] -translate-x-1/2 bg-[#D8B44C]" />

        <div className="absolute left-1/2 top-[14px] h-[3px] w-[21px] -translate-x-1/2 bg-[#D8B44C]" />
      </div>

      <div className="leading-none">
        <div className="text-[18px] font-extrabold tracking-tight text-[#B31B34] sm:text-[20px]">
          WELLS FARGO
        </div>

        <div className="mt-1 text-[7px] font-semibold tracking-[0.16em] text-gray-500">
          BANKING & FINANCIAL SERVICES
        </div>
      </div>
    </div>
  );
}