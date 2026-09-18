"use client";

import { useState } from "react";

import {
  ChevronRight,
  CreditCard,
  Eye,
  EyeOff,
  FileText,
  Landmark,
  MoreHorizontal,
  PiggyBank,
  Plus,
  ShieldCheck,
  Smartphone,
  User,
  Wallet,
  X,
} from "lucide-react";

import { useAuth } from "@/app/context/AuthContext";
import { IoInformationCircleOutline } from "react-icons/io5";

import { DashboardHeader } from "./components/DashboardHeader";
import { MobileNavigation } from "./components/MobileNavigation";
import { Sidebar } from "./components/Sidebar";

/*
|--------------------------------------------------------------------------
| Wells Fargo Inspired UI Palette
|--------------------------------------------------------------------------
|
| Primary Burgundy  : #B31B34
| Dark Burgundy     : #8F1428
| Deep Burgundy     : #4B1825
| Gold              : #D8B44C
| Background        : #F6F6F6
| Light Burgundy    : #F7EDEF
| Text              : #333333
| Muted             : #666666
|
|--------------------------------------------------------------------------
*/

/*
|--------------------------------------------------------------------------
| Demo data
|--------------------------------------------------------------------------
*/

const shortcuts = [
  {
    title: "Transfer",
    icon: <Wallet size={20} />,
  },
  {
    title: "Payments",
    icon: <FileText size={20} />,
  },
  {
    title: "Cards",
    icon: <CreditCard size={20} />,
  },
  {
    title: "Accounts",
    icon: <PiggyBank size={20} />,
  },
];

const quickActions = [
  {
    title: "Transfer",
    icon: <Wallet size={22} />,
  },
  {
    title: "Pay Bill",
    icon: <FileText size={22} />,
  },
  {
    title: "Cards",
    icon: <CreditCard size={22} />,
  },
  {
    title: "Top Up",
    icon: <Plus size={22} />,
  },
];

/*
|--------------------------------------------------------------------------
| Welcome section
|--------------------------------------------------------------------------
*/

function WelcomeCard() {
  const { user } = useAuth();

  return (
    <section
      className="
        relative
        overflow-hidden
        rounded-[24px]
        bg-[#4B1825]
        px-5
        py-6
        text-white
        shadow-lg
        shadow-[#4B1825]/10
        sm:px-7
        sm:py-7
      "
    >
      {/* Burgundy / Gold decorative background */}

      <div
        className="
          pointer-events-none
          absolute
          -right-20
          -top-24
          h-[250px]
          w-[250px]
          rounded-full
          border-[42px]
          border-[#B31B34]/30
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          -bottom-20
          right-24
          h-[150px]
          w-[150px]
          rounded-full
          border-[25px]
          border-[#D8B44C]/10
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          right-8
          top-8
          h-2
          w-2
          rounded-full
          bg-[#D8B44C]
          shadow-[0_0_20px_#D8B44C]
        "
      />

      <div
        className="
          relative
          z-10
          flex
          items-center
          justify-between
          gap-5
        "
      >
        <div>
          <div className="mb-2 flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-[#D8B44C]" />

            <p
              className="
                text-[10px]
                font-bold
                uppercase
                tracking-[0.18em]
                text-white/65
              "
            >
              Personal Banking
            </p>
          </div>

          <p
            className="
              mb-1
              text-[11px]
              font-semibold
              text-white/70
            "
          >
            Welcome back
          </p>

          <h1
            className="
              text-[21px]
              font-extrabold
              tracking-tight
              sm:text-[27px]
            "
          >
            Hello, {user?.fullname || "Customer"}
          </h1>

          <p
            className="
              mt-2
              max-w-[480px]
              text-[12px]
              leading-relaxed
              text-white/70
              sm:text-[13px]
            "
          >
            Here is an overview of your accounts, cards and recent activity.
          </p>
        </div>

        <div
          className="
            hidden
            h-[74px]
            w-[74px]
            shrink-0
            items-center
            justify-center
            rounded-full
            border
            border-white/10
            bg-white/10
            shadow-inner
            sm:flex
          "
        >
          <User size={32} strokeWidth={1.8} className="text-[#D8B44C]" />
        </div>
      </div>

      {/* Gold bottom accent */}

      <div
        className="
          absolute
          bottom-0
          left-0
          h-[3px]
          w-full
          bg-[#D8B44C]
        "
      />
    </section>
  );
}

/*
|--------------------------------------------------------------------------
| Account summary
|--------------------------------------------------------------------------
*/

function AccountSummary({ visible, setVisible }) {
  const { user } = useAuth();

  const balance = Number(user?.balance || 0);

  return (
    <section
      className="
        relative
        overflow-hidden
        rounded-[20px]
        border
        border-gray-200
        bg-white
        p-5
        shadow-sm
        sm:p-6
      "
    >
      {/* Small burgundy accent */}

      <div
        className="
          absolute
          right-0
          top-0
          h-full
          w-1
          bg-[#B31B34]
        "
      />

      <div className="flex items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <div
              className="
                flex
                h-8
                w-8
                items-center
                justify-center
                rounded-lg
                bg-[#F7EDEF]
                text-[#B31B34]
              "
            >
              <Wallet size={16} />
            </div>

            <p
              className="
                text-[10px]
                font-bold
                uppercase
                tracking-[0.12em]
                text-[#666666]
              "
            >
              Total balance
            </p>
          </div>

          <div
            className="
              mt-3
              flex
              items-center
              gap-2
            "
          >
            <strong
              className="
                text-[25px]
                font-extrabold
                tracking-tight
                text-[#333333]
                sm:text-[29px]
              "
            >
              {visible ? `${balance.toLocaleString()}.00 USD` : "••••••••"}
            </strong>

            <button
              type="button"
              onClick={() => setVisible(!visible)}
              aria-label={visible ? "Hide balance" : "Show balance"}
              className="
                flex
                h-8
                w-8
                items-center
                justify-center
                rounded-full
                text-[#666666]
                transition
                hover:bg-[#F7EDEF]
                hover:text-[#B31B34]
              "
            >
              {visible ? <EyeOff size={17} /> : <Eye size={17} />}
            </button>
          </div>

          <p className="mt-1 text-[10px] text-gray-400">
            Available across your accounts
          </p>
        </div>

        <button
          type="button"
          className="
            flex
            h-9
            w-9
            shrink-0
            items-center
            justify-center
            rounded-full
            bg-[#F6F6F6]
            text-[#666666]
            transition
            hover:bg-[#F7EDEF]
            hover:text-[#B31B34]
          "
        >
          <MoreHorizontal size={19} />
        </button>
      </div>
    </section>
  );
}

/*
|--------------------------------------------------------------------------
| Account card
|--------------------------------------------------------------------------
*/

function AccountCard({ account }) {
  return (
    <article
      className="
        group
        relative
        min-w-[275px]
        overflow-hidden
        rounded-[21px]
        bg-[#4B1825]
        p-5
        text-white
        shadow-lg
        shadow-[#4B1825]/10
        transition
        duration-300
        hover:-translate-y-1
        hover:shadow-xl
        sm:min-w-0
      "
    >
      {/* Decorative circle */}

      <div
        className="
          pointer-events-none
          absolute
          -right-12
          -top-12
          h-32
          w-32
          rounded-full
          border-[18px]
          border-white/5
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          bottom-0
          right-0
          h-1
          w-full
          bg-[#D8B44C]
          opacity-80
        "
      />

      <div
        className="
          relative
          z-10
          flex
          items-start
          justify-between
        "
      >
        <div>
          <p
            className="
              text-[10px]
              font-semibold
              uppercase
              tracking-[0.12em]
              text-white/50
            "
          >
            {account.type}
          </p>

          <h3 className="mt-1 text-[15px] font-bold">{account.title}</h3>
        </div>

        <div
          className="
            flex
            h-9
            w-9
            items-center
            justify-center
            rounded-xl
            bg-white/10
          "
        >
          <Landmark size={19} className="text-[#D8B44C]" />
        </div>
      </div>

      <p
        className="
          relative
          z-10
          mt-7
          text-[11px]
          tracking-[0.18em]
          text-white/45
        "
      >
        {account.number}
      </p>

      <div className="relative z-10 mt-3">
        <p
          className="
            text-[9px]
            font-medium
            uppercase
            tracking-wider
            text-white/45
          "
        >
          Available balance
        </p>

        <strong className="mt-0.5 block text-[21px] font-extrabold">
          {Number(account.balance || 0).toLocaleString()} {account.currency}
        </strong>
      </div>

      <a
        href="/dashboard/cards"
        className="
          relative
          z-10
          mt-5
          flex
          w-fit
          items-center
          gap-1
          rounded-full
          bg-white/10
          px-3
          py-1.5
          text-[10px]
          font-bold
          transition
          hover:bg-white/20
        "
      >
        View account
        <ChevronRight size={13} />
      </a>
    </article>
  );
}

/*
|--------------------------------------------------------------------------
| Notice Modal
|--------------------------------------------------------------------------
*/

function NoticeModal({ onClose }) {
  return (
    <div
      className="
        fixed
        inset-0
        z-[9999]
        flex
        items-center
        justify-center
        bg-[#241217]/65
        p-5
        backdrop-blur-sm
      "
    >
      <div
        className="
          relative
          w-full
          max-w-[390px]
          overflow-hidden
          rounded-[24px]
          border
          border-gray-200
          bg-white
          shadow-2xl
        "
      >
        {/* Header */}

        <div
          className="
            relative
            overflow-hidden
            bg-[#4B1825]
            px-6
            py-6
            text-center
          "
        >
          <div
            className="
              absolute
              -right-10
              -top-10
              h-28
              w-28
              rounded-full
              border-[18px]
              border-white/5
            "
          />

          <button
            type="button"
            onClick={onClose}
            className="
              absolute
              right-4
              top-4
              flex
              h-8
              w-8
              items-center
              justify-center
              rounded-full
              bg-white/10
              text-white/70
              transition
              hover:bg-white/20
              hover:text-white
            "
          >
            <X size={16} />
          </button>

          <div
            className="
              relative
              mx-auto
              flex
              h-14
              w-14
              items-center
              justify-center
              rounded-full
              bg-white
              shadow-lg
            "
          >
            <IoInformationCircleOutline
              className="
                h-9
                w-9
                text-[#B31B34]
              "
            />
          </div>

          <h2 className="relative mt-4 text-lg font-extrabold text-white">
            Notice!
          </h2>
        </div>

        {/* Content */}

        <div className="px-6 py-6">
          <p
            className="
              text-center
              text-[12px]
              leading-6
              text-[#666666]
            "
          >
            This feature is not yet available for this account. Ziraat Bank
            operating team will notify you as soon as it becomes functional.
            Thank you.
          </p>

          <button
            type="button"
            onClick={onClose}
            className="
              mt-6
              w-full
              rounded-xl
              bg-[#B31B34]
              py-3
              text-sm
              font-bold
              text-white
              shadow-md
              shadow-[#B31B34]/20
              transition
              hover:bg-[#8F1428]
              active:scale-[0.98]
            "
          >
            OK
          </button>
        </div>

        {/* Gold accent */}

        <div className="h-1 w-full bg-[#D8B44C]" />
      </div>
    </div>
  );
}

/*
|--------------------------------------------------------------------------
| Quick actions
|--------------------------------------------------------------------------
*/

function QuickActions() {
  const [isToggled, setIsToggled] = useState(false);

  return (
    <section>
      <div
        className="
          mb-3
          flex
          items-center
          justify-between
        "
      >
        <div>
          <p
            className="
              text-[9px]
              font-bold
              uppercase
              tracking-[0.14em]
              text-[#B31B34]
            "
          >
            Banking tools
          </p>

          <h2 className="mt-0.5 text-[16px] font-extrabold text-[#333333]">
            Quick actions
          </h2>
        </div>

        <button
          type="button"
          className="
            text-[11px]
            font-bold
            text-[#B31B34]
            transition
            hover:text-[#8F1428]
          "
        >
          View all
        </button>
      </div>

      <div
        className="
          grid
          grid-cols-4
          gap-2
          sm:gap-3
        "
      >
        {quickActions.map((action) => (
          <button
            key={action.title}
            type="button"
            onClick={() => setIsToggled(true)}
            className="
              group
              flex
              min-h-[82px]
              flex-col
              items-center
              justify-center
              gap-2
              rounded-[17px]
              border
              border-gray-200
              bg-white
              px-2
              text-center
              text-[#333333]
              shadow-sm
              transition
              duration-200
              hover:-translate-y-0.5
              hover:border-[#B31B34]/30
              hover:shadow-md
            "
          >
            <span
              className="
                flex
                h-10
                w-10
                items-center
                justify-center
                rounded-full
                bg-[#F7EDEF]
                text-[#B31B34]
                transition
                group-hover:bg-[#B31B34]
                group-hover:text-white
              "
            >
              {action.icon}
            </span>

            <span className="text-[10px] font-bold">{action.title}</span>
          </button>
        ))}
      </div>

      {isToggled && <NoticeModal onClose={() => setIsToggled(false)} />}
    </section>
  );
}

/*
|--------------------------------------------------------------------------
| Shortcuts
|--------------------------------------------------------------------------
*/

function Shortcuts() {
  const [isToggled, setIsToggled] = useState(false);

  return (
    <section>
      <div className="mb-3">
        <p
          className="
            text-[9px]
            font-bold
            uppercase
            tracking-[0.14em]
            text-[#B31B34]
          "
        >
          Personalized
        </p>

        <h2 className="mt-0.5 text-[16px] font-extrabold text-[#333333]">
          My shortcuts
        </h2>
      </div>

      <div
        className="
          grid
          grid-cols-2
          gap-3
          sm:grid-cols-4
        "
      >
        {shortcuts.map((shortcut) => (
          <button
            type="button"
            onClick={() => setIsToggled(true)}
            key={shortcut.title}
            className="
              group
              flex
              flex-col
              items-center
              justify-center
              gap-2
              rounded-[17px]
              border
              border-gray-200
              bg-white
              px-2
              py-5
              text-[#666666]
              shadow-sm
              transition
              duration-200
              hover:-translate-y-0.5
              hover:border-[#B31B34]/20
              hover:shadow-md
            "
          >
            <span
              className="
                flex
                h-10
                w-10
                items-center
                justify-center
                rounded-full
                bg-[#F7EDEF]
                text-[#B31B34]
                transition
                group-hover:bg-[#B31B34]
                group-hover:text-white
              "
            >
              {shortcut.icon}
            </span>

            <span
              className="
                text-[10px]
                font-bold
                text-[#333333]
              "
            >
              {shortcut.title}
            </span>
          </button>
        ))}
      </div>

      {isToggled && <NoticeModal onClose={() => setIsToggled(false)} />}
    </section>
  );
}

/*
|--------------------------------------------------------------------------
| Security card
|--------------------------------------------------------------------------
*/

function SecurityCard() {
  return (
    <section
      className="
        relative
        overflow-hidden
        rounded-[21px]
        bg-[#4B1825]
        p-5
        text-white
        shadow-lg
        shadow-[#4B1825]/10
      "
    >
      <div
        className="
          absolute
          -right-12
          -top-12
          h-32
          w-32
          rounded-full
          border-[20px]
          border-[#B31B34]/30
        "
      />

      <div className="relative z-10 flex items-start gap-3">
        <div
          className="
            flex
            h-10
            w-10
            shrink-0
            items-center
            justify-center
            rounded-xl
            bg-white/10
          "
        >
          <ShieldCheck size={20} className="text-[#D8B44C]" />
        </div>

        <div>
          <p
            className="
              text-[9px]
              font-bold
              uppercase
              tracking-[0.15em]
              text-[#D8B44C]
            "
          >
            Security
          </p>

          <h3 className="mt-1 text-[14px] font-extrabold">Stay secure</h3>

          <p
            className="
              mt-1
              text-[11px]
              leading-relaxed
              text-white/65
            "
          >
            Keep your account information private and always use the official
            application or website when accessing your account.
          </p>
        </div>
      </div>

      <a
        href="/faq"
        className="
          relative
          z-10
          mt-5
          flex
          w-fit
          items-center
          gap-1
          rounded-full
          bg-white/10
          px-3
          py-2
          text-[10px]
          font-bold
          transition
          hover:bg-white/20
        "
      >
        Security center
        <ChevronRight size={14} />
      </a>

      <div className="absolute bottom-0 left-0 h-1 w-full bg-[#D8B44C]" />
    </section>
  );
}

/*
|--------------------------------------------------------------------------
| Recent transactions
|--------------------------------------------------------------------------
*/

function RecentTransactions() {
  const transactions = [
    {
      title: "Card payment",
      description: "Demo Store",
      amount: "-120.00 USD",
      date: "Today",
    },
    {
      title: "Account transfer",
      description: "Savings",
      amount: "+500.00 USD",
      date: "Yesterday",
    },
    {
      title: "Bill payment",
      description: "Utilities",
      amount: "-85.00 USD",
      date: "Yesterday",
    },
  ];

  return (
    <section
      className="
        rounded-[20px]
        border
        border-gray-200
        bg-white
        p-4
        shadow-sm
        sm:p-5
      "
    >
      <div
        className="
          mb-4
          flex
          items-center
          justify-between
        "
      >
        <div>
          <p
            className="
              text-[9px]
              font-bold
              uppercase
              tracking-[0.14em]
              text-[#B31B34]
            "
          >
            Activity
          </p>

          <h2 className="mt-0.5 text-[16px] font-extrabold text-[#333333]">
            Recent transactions
          </h2>
        </div>

        <a
          href="/dashboard/transactions-hist"
          className="
            text-[11px]
            font-bold
            text-[#B31B34]
            hover:text-[#8F1428]
          "
        >
          View all
        </a>
      </div>

      <div className="divide-y divide-gray-100">
        {transactions.map((transaction, index) => (
          <div
            key={index}
            className="
              flex
              items-center
              justify-between
              gap-3
              py-3
            "
          >
            <div className="flex min-w-0 items-center gap-3">
              <div
                className="
                  flex
                  h-10
                  w-10
                  shrink-0
                  items-center
                  justify-center
                  rounded-xl
                  bg-[#F7EDEF]
                  text-[#B31B34]
                "
              >
                <CreditCard size={17} />
              </div>

              <div className="min-w-0">
                <p className="truncate text-[12px] font-bold text-[#333333]">
                  {transaction.title}
                </p>

                <p className="mt-0.5 truncate text-[10px] text-gray-400">
                  {transaction.description}
                </p>
              </div>
            </div>

            <div className="shrink-0 text-right">
              <p
                className={`
                  text-[12px]
                  font-extrabold
                  ${
                    transaction.amount.startsWith("+")
                      ? "text-green-600"
                      : "text-[#333333]"
                  }
                `}
              >
                {transaction.amount}
              </p>

              <p className="mt-0.5 text-[9px] text-gray-400">
                {transaction.date}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/*
|--------------------------------------------------------------------------
| Main dashboard
|--------------------------------------------------------------------------
*/

export default function DashboardPage() {
  const { user } = useAuth();

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [balanceVisible, setBalanceVisible] = useState(true);

  const accounts = [
    {
      id: 1,
      title: "Savings Account",
      number: `**** ${user?.accountNumber?.slice(-4) || "0000"}`,
      balance: user?.balance || 0,
      currency: "USD",
      type: "Savings",
    },
    {
      id: 2,
      title: "Current Account",
      number: "**** XXXX",
      balance: 0,
      currency: "USD",
      type: "Current",
    },
  ];

  return (
    <main
      className="
        min-h-screen
        bg-[#F6F6F6]
        text-[#333333]
      "
    >
      {/* Dashboard Header */}

      <DashboardHeader
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      <div
        className="
          mx-auto
          flex
          w-full
          max-w-[1500px]
        "
      >
        {/* Sidebar */}

        <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} tab={"home"} />

        {/* Content */}

        <div
          className="
            min-w-0
            flex-1
            pb-[85px]
            lg:pb-8
          "
        >
          <div
            className="
              mx-auto
              w-full
              max-w-[1200px]
              px-4
              py-4
              sm:px-6
              sm:py-6
              lg:px-8
              lg:py-8
            "
          >
            {/* Welcome */}

            <div className="mb-4 sm:mb-6">
              <WelcomeCard />
            </div>

            {/* Balance */}

            <div className="mb-4 sm:mb-6">
              <AccountSummary
                visible={balanceVisible}
                setVisible={setBalanceVisible}
              />
            </div>

            {/* Accounts */}

            <section className="mb-6 sm:mb-8">
              <div
                className="
                  mb-3
                  flex
                  items-end
                  justify-between
                "
              >
                <div>
                  <p
                    className="
                      text-[9px]
                      font-bold
                      uppercase
                      tracking-[0.14em]
                      text-[#B31B34]
                    "
                  >
                    Portfolio
                  </p>

                  <h2 className="mt-0.5 text-[16px] font-extrabold">
                    My accounts
                  </h2>
                </div>

                <a
                  href="/dashboard/cards"
                  className="
                    flex
                    items-center
                    gap-1
                    text-[11px]
                    font-bold
                    text-[#B31B34]
                    hover:text-[#8F1428]
                  "
                >
                  All accounts
                  <ChevronRight size={13} />
                </a>
              </div>

              <div
                className="
                  flex
                  gap-3
                  overflow-x-auto
                  pb-1
                  sm:grid
                  sm:grid-cols-2
                  sm:overflow-visible
                "
              >
                {accounts.map((account) => (
                  <AccountCard key={account.id} account={account} />
                ))}
              </div>
            </section>

            {/* Quick Actions */}

            <div className="mb-6 sm:mb-8">
              <QuickActions />
            </div>

            {/* Main desktop grid */}

            <div
              className="
                grid
                grid-cols-1
                gap-5
                lg:grid-cols-[minmax(0,1fr)_330px]
              "
            >
              {/* Left */}

              <div className="space-y-5">
                <Shortcuts />

                <RecentTransactions />
              </div>

              {/* Right */}

              <div className="space-y-5">
                <SecurityCard />

                {/* Mobile banking */}

                <div
                  className="
                    hidden
                    overflow-hidden
                    rounded-[21px]
                    border
                    border-gray-200
                    bg-white
                    p-5
                    shadow-sm
                    lg:block
                  "
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="
                        flex
                        h-11
                        w-11
                        shrink-0
                        items-center
                        justify-center
                        rounded-xl
                        bg-[#F7EDEF]
                        text-[#B31B34]
                      "
                    >
                      <Smartphone size={20} />
                    </div>

                    <div>
                      <p
                        className="
                          text-[9px]
                          font-bold
                          uppercase
                          tracking-[0.13em]
                          text-[#B31B34]
                        "
                      >
                        Digital banking
                      </p>

                      <h3 className="mt-0.5 text-[14px] font-extrabold">
                        Mobile banking
                      </h3>

                      <p
                        className="
                          mt-1
                          text-[10px]
                          leading-relaxed
                          text-gray-400
                        "
                      >
                        Manage your accounts wherever you are.
                      </p>
                    </div>
                  </div>

                  <a
                    href="/"
                    className="
                      mt-5
                      block
                      w-full
                      rounded-xl
                      bg-[#B31B34]
                      py-3
                      text-center
                      text-[11px]
                      font-bold
                      text-white
                      shadow-md
                      shadow-[#B31B34]/10
                      transition
                      hover:bg-[#8F1428]
                    "
                  >
                    Learn more
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Existing mobile navigation */}

      <MobileNavigation />
    </main>
  );
}
