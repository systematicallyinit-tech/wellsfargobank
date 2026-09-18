import { Loader2 } from "lucide-react";

export default function LoadingScreen() {
  return (
    <div className="fixed inset-0 z-[9999] flex min-h-screen items-center justify-center bg-[#F6F6F6]/95 backdrop-blur-sm">
      {/* Loading Card */}
      <div className="mx-4 w-full max-w-sm overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-2xl">
        
        {/* Burgundy Header */}
        <div className="relative overflow-hidden bg-[#4B1825] px-6 py-7 text-center">
          {/* Decorative circles */}
          <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-[#B31B34]/30" />
          <div className="absolute -bottom-12 -left-8 h-28 w-28 rounded-full bg-[#D8B44C]/10" />

          {/* Logo */}
          <div className="relative mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-white shadow-md">
            <div className="relative h-7 w-7">
              <div className="absolute left-1/2 top-0 h-7 w-[3px] -translate-x-1/2 rotate-45 rounded-full bg-[#B31B34]" />
              <div className="absolute left-1/2 top-0 h-7 w-[3px] -translate-x-1/2 -rotate-45 rounded-full bg-[#B31B34]" />
              <div className="absolute left-1/2 top-1/2 h-[3px] w-7 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#D8B44C]" />
            </div>
          </div>

          <h1 className="relative text-lg font-bold tracking-wide text-white">
            Secure Banking
          </h1>

          <p className="relative mt-1 text-sm text-white/70">
            Please wait while we load your account
          </p>
        </div>

        {/* Loading Content */}
        <div className="px-6 py-8 text-center">
          {/* Spinner */}
          <div className="relative mx-auto mb-6 flex h-16 w-16 items-center justify-center">
            <div className="absolute inset-0 rounded-full border-4 border-[#F7EDEF]" />

            <Loader2
              className="h-10 w-10 animate-spin text-[#B31B34]"
              strokeWidth={2.5}
            />

            {/* Gold center dot */}
            <div className="absolute h-2.5 w-2.5 rounded-full bg-[#D8B44C]" />
          </div>

          <h2 className="text-base font-semibold text-[#333333]">
            Loading...
          </h2>

          <p className="mt-2 text-sm leading-6 text-[#666666]">
            Please wait while we securely prepare your banking experience.
          </p>

          {/* Progress Indicator */}
          <div className="mt-7 h-1.5 w-full overflow-hidden rounded-full bg-[#F7EDEF]">
            <div className="h-full w-1/2 animate-pulse rounded-full bg-[#B31B34]" />
          </div>

          {/* Security Message */}
          <div className="mt-6 flex items-center justify-center gap-2 text-xs text-[#666666]">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#F7EDEF]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="h-3 w-3 text-[#B31B34]"
              >
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />
                <path d="m9 12 2 2 4-4" />
              </svg>
            </span>

            <span>Your connection is secure</span>
          </div>
        </div>

        {/* Gold Bottom Accent */}
        <div className="h-1 w-full bg-[#D8B44C]" />
      </div>
    </div>
  );
}