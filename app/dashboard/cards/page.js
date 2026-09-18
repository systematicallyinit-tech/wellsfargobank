"use client";

import { useState } from "react";

import {
  ArrowDownLeft,
  ArrowUpRight,
  Building2,
  Check,
  ChevronRight,
  CircleDollarSign,
  Copy,
  CreditCard,
  Eye,
  EyeOff,
  Lock,
  MoreHorizontal,
  Plus,
  RotateCcw,
  ShieldCheck,
  Snowflake,
  Unlock,
} from "lucide-react";

import { useRouter } from "next/navigation";
import { useAuth } from "@/app/context/AuthContext";

import { DashboardHeader } from "../components/DashboardHeader";
import { Sidebar } from "../components/Sidebar";
import { MobileNavigation } from "../components/MobileNavigation";

import { IoInformationCircleOutline } from "react-icons/io5";

/*
|--------------------------------------------------------------------------
| WELLS FARGO THEME
|--------------------------------------------------------------------------
*/

const THEME = {
  primary: "#B31B34",
  dark: "#8F1428",
  gold: "#C9A227",
  soft: "#F7EDEF",
  background: "#F6F6F4",
  border: "#E7E3E1",
  text: "#272323",
  muted: "#777171",
};

/*
|--------------------------------------------------------------------------
| CARD DATA
|--------------------------------------------------------------------------
*/

const defaultCards = [
  {
    id: 1,
    type: "Visa",
    cardName: "Wells Fargo Platinum",
    cardHolder: "GERALD LUIS",
    number: "4829 1047 6821 4593",
    expiry: "09/29",
    cvv: "421",
    balance: "€12,450.80",
    available: "€10,250.80",
    currency: "EUR",
    status: "Active",
    cardColor: "red",
  },
];

/*
|--------------------------------------------------------------------------
| SIMPLE ICON
|--------------------------------------------------------------------------
*/

function ShoppingBagIcon() {
  return <CreditCard size={17} />;
}

/*
|--------------------------------------------------------------------------
| BANK CARD
|--------------------------------------------------------------------------
*/

function BankCard({
  card,
  showNumber,
  onToggleNumber,
  onFreeze,
  onCopy,
  copied,
}) {
  const [isToggled, setIsToggled] = useState(false);
  const { user } = useAuth();

  const maskedNumber = `•••• •••• •••• ${card.number.slice(-4)}`;

  const cardGradient =
    card.cardColor === "dark"
      ? "from-[#3A2529] via-[#25181B] to-[#120C0E]"
      : card.cardColor === "blue"
        ? "from-[#59313A] via-[#401F27] to-[#241116]"
        : "from-[#B31B34] via-[#9A172D] to-[#6F1021]";

  return (
    <div className="w-full">

      {/* CARD */}
      <div
        className={`
          relative aspect-[1.586/1] w-full overflow-hidden
          rounded-[24px] bg-gradient-to-br ${cardGradient}
          p-5 text-white shadow-[0_18px_40px_rgba(143,20,40,0.18)]
          sm:p-6
        `}
      >

        {/* Decorative circles */}
        <div className="
          absolute -right-14 -top-14 h-44 w-44
          rounded-full border-[26px] border-[#C9A227]/10
        " />

        <div className="
          absolute -bottom-20 -left-14 h-48 w-48
          rounded-full border-[26px] border-white/5
        " />

        <div className="
          absolute right-5 top-1/2 h-16 w-16
          -translate-y-1/2 rounded-full
          border border-[#C9A227]/20
        " />

        {/* TOP */}
        <div className="
          relative z-10 flex items-start justify-between
        ">
          <div>
            <p className="
              text-[9px] font-medium tracking-[0.18em]
              text-white/60
            ">
              DEBIT CARD
            </p>

            <p className="
              mt-1 text-[13px] font-extrabold
              sm:text-[15px]
            ">
              {card.cardName}
            </p>
          </div>

          <div className="
            flex items-center gap-1
            text-right
          ">
            <span className="
              text-[17px] font-black italic
            ">
              {card.type}
            </span>
          </div>
        </div>

        {/* CHIP */}
        <div className="
          relative z-10 mt-[7%]
          h-[28px] w-[40px]
          rounded-[6px]
          border border-[#E8D38A]/60
          bg-gradient-to-br
          from-[#FFF3B0]
          via-[#D7B94C]
          to-[#9B7A17]
          shadow-sm
          sm:h-[33px] sm:w-[47px]
        ">
          <div className="
            absolute left-1/2 top-1/2
            h-px w-full
            -translate-y-1/2
            bg-[#806314]/50
          " />

          <div className="
            absolute left-1/2 top-0
            h-full w-px
            bg-[#806314]/50
          " />
        </div>

        {/* CARD NUMBER */}
        <div className="
          relative z-10 mt-[6%]
          text-[14px] font-semibold
          tracking-[2px]
          sm:text-[18px] sm:tracking-[3px]
        ">
          {showNumber ? card.number : maskedNumber}
        </div>

        {/* CARD DETAILS */}
        <div className="
          relative z-10 mt-[4%]
          flex items-end justify-between
        ">
          <div>
            <p className="
              text-[6px] uppercase
              tracking-wider text-white/50
              sm:text-[7px]
            ">
              Card Holder
            </p>

            <p className="
              mt-1 text-[8px] font-bold
              tracking-wider sm:text-[10px]
            ">
              {card.cardHolder}
            </p>
          </div>

          <div>
            <p className="
              text-[6px] uppercase
              tracking-wider text-white/50
              sm:text-[7px]
            ">
              Valid Thru
            </p>

            <p className="
              mt-1 text-[8px] font-bold
              sm:text-[10px]
            ">
              {card.expiry}
            </p>
          </div>

          <div className="
            flex h-8 w-8 items-center justify-center
            rounded-full border border-[#C9A227]/40
            bg-[#C9A227]/10
            sm:h-9 sm:w-9
          ">
            <CircleDollarSign
              size={17}
              className="text-[#E6D17A]"
            />
          </div>
        </div>
      </div>

      {/* CARD CONTROLS */}
      <div className="
        mt-3 flex items-center justify-between
      ">
        <button
          type="button"
          onClick={() => onToggleNumber(card.id)}
          className="
            flex items-center gap-1.5
            text-[9px] font-bold text-gray-500
            transition hover:text-[#B31B34]
          "
        >
          {showNumber ? <EyeOff size={14} /> : <Eye size={14} />}
          {showNumber ? "Hide number" : "Show number"}
        </button>

        <button
          type="button"
          onClick={() => onCopy(card.number)}
          className="
            flex items-center gap-1.5
            text-[9px] font-bold text-gray-500
            transition hover:text-[#B31B34]
          "
        >
          {copied ? <Check size={14} /> : <Copy size={14} />}
          {copied ? "Copied" : "Copy number"}
        </button>
      </div>

      {/* BALANCE */}
      <div className="
        mt-4 rounded-2xl
        border border-[#E7E3E1]
        bg-white p-4
        shadow-[0_5px_20px_rgba(0,0,0,0.025)]
      ">
        <div className="
          flex items-center justify-between
        ">
          <div>
            <p className="
              text-[9px] font-semibold
              text-gray-400
            ">
              Available balance
            </p>

            <p className="
              mt-1 text-[17px]
              font-extrabold text-gray-900
            ">
              ${user?.balance?.toLocaleString() || "0"}.00
            </p>
          </div>

          <div className="text-right">
            <p className="
              text-[9px] font-semibold
              text-gray-400
            ">
              Total balance
            </p>

            <p className="
              mt-1 text-[12px]
              font-bold text-gray-700
            ">
              ${user?.balance?.toLocaleString() || "0"}.00
            </p>
          </div>
        </div>
      </div>

      {/* ACTIONS */}
      <div className="
        mt-3 grid grid-cols-3 gap-2
      ">
        <button
          type="button"
          onClick={() => onFreeze(card.id)}
          className="
            flex h-9 items-center justify-center
            gap-1 rounded-xl
            border border-[#E7E3E1]
            bg-white text-[9px]
            font-bold text-gray-600
            transition hover:border-[#B31B34]
            hover:bg-[#F7EDEF]
            hover:text-[#B31B34]
          "
        >
          {card.status === "Frozen" ? (
            <>
              <Unlock size={13} />
              Unfreeze
            </>
          ) : (
            <>
              <Snowflake size={13} />
              Freeze
            </>
          )}
        </button>

        <button
          type="button"
          onClick={() => setIsToggled(true)}
          className="
            flex h-9 items-center justify-center
            gap-1 rounded-xl
            border border-[#E7E3E1]
            bg-white text-[9px]
            font-bold text-gray-600
            transition hover:border-[#B31B34]
            hover:bg-[#F7EDEF]
            hover:text-[#B31B34]
          "
        >
          <RotateCcw size={13} />
          Replace
        </button>

        <button
          type="button"
          onClick={() => setIsToggled(true)}
          className="
            flex h-9 items-center justify-center
            gap-1 rounded-xl
            border border-[#E7E3E1]
            bg-white text-[9px]
            font-bold text-gray-600
            transition hover:border-[#B31B34]
            hover:bg-[#F7EDEF]
            hover:text-[#B31B34]
          "
        >
          <MoreHorizontal size={14} />
          More
        </button>
      </div>

      {/* NOTICE MODAL */}
      {isToggled && (
        <div className="
          fixed inset-0 z-[100]
          flex items-center justify-center
          bg-[#241017]/60 p-6
          backdrop-blur-sm
        ">
          <div className="
            w-full max-w-md
            rounded-3xl border
            border-[#E7E3E1]
            bg-white p-6
            shadow-2xl
          ">
            <div className="
              mx-auto flex h-16 w-16
              items-center justify-center
              rounded-full bg-[#F7EDEF]
            ">
              <IoInformationCircleOutline
                className="h-10 w-10 text-[#B31B34]"
              />
            </div>

            <h1 className="
              mt-4 text-center
              text-lg font-bold text-[#272323]
            ">
              Notice!
            </h1>

            <p className="
              mt-3 text-center
              text-xs leading-6 text-gray-500
            ">
              This feature is not yet available for this
              account. Wells Fargo operating team will
              notify you as soon as it becomes functional.
              Thank you.
            </p>

            <button
              type="button"
              onClick={() => setIsToggled(false)}
              className="
                mt-5 w-full rounded-xl
                bg-[#B31B34] py-3
                text-sm font-bold text-white
                transition
                hover:bg-[#8F1428]
              "
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

/*
|--------------------------------------------------------------------------
| CARD ACTION
|--------------------------------------------------------------------------
*/

function CardAction({ icon, title, description }) {
  return (
    <button
      type="button"
      className="
        group flex w-full items-center
        gap-3 rounded-xl p-2.5
        text-left transition
        hover:bg-[#F7EDEF]
      "
    >
      <span className="
        flex h-9 w-9 shrink-0
        items-center justify-center
        rounded-xl bg-[#F7EDEF]
        text-[#B31B34]
        transition
        group-hover:bg-[#B31B34]
        group-hover:text-white
      ">
        {icon}
      </span>

      <span className="min-w-0">
        <span className="
          block text-[10px]
          font-extrabold text-gray-700
          group-hover:text-[#B31B34]
        ">
          {title}
        </span>

        <span className="
          mt-0.5 block truncate
          text-[8px] text-gray-400
        ">
          {description}
        </span>
      </span>

      <ChevronRight
        size={14}
        className="
          ml-auto shrink-0
          text-gray-300
          group-hover:text-[#C9A227]
        "
      />
    </button>
  );
}

/*
|--------------------------------------------------------------------------
| CARDS CONTENT
|--------------------------------------------------------------------------
*/

function CardsContent() {
  const { user } = useAuth();

  const cards = [
    {
      id: 1,
      type: "Visa",
      cardName: "Wells Fargo Platinum",
      cardHolder: user?.fullname || "CARD HOLDER",
      number: "4829 1047 6821 4593",
      expiry: "09/29",
      cvv: "421",
      balance: "€12,450.80",
      available: "€10,250.80",
      currency: "EUR",
      status: "Active",
      cardColor: "red",
    },
  ];

  const [isToggled, setIsToggled] = useState(false);
  const [showNumbers, setShowNumbers] = useState({});
  const [copied, setCopied] = useState(null);
  const [cardList, setCardList] = useState(cards);

  /*
  |--------------------------------------------------------------------------
  | SHOW / HIDE CARD NUMBER
  |--------------------------------------------------------------------------
  */

  const toggleNumber = (id) => {
    setShowNumbers((previous) => ({
      ...previous,
      [id]: !previous[id],
    }));
  };

  /*
  |--------------------------------------------------------------------------
  | COPY CARD NUMBER
  |--------------------------------------------------------------------------
  */

  const copyCardNumber = async (number) => {
    try {
      await navigator.clipboard.writeText(number);

      setCopied(number);

      setTimeout(() => {
        setCopied(null);
      }, 1800);
    } catch (error) {
      console.error("Unable to copy card number:", error);
    }
  };

  /*
  |--------------------------------------------------------------------------
  | FREEZE / UNFREEZE
  |--------------------------------------------------------------------------
  */

  const toggleFreeze = (id) => {
    setCardList((previous) =>
      previous.map((card) =>
        card.id === id
          ? {
              ...card,
              status:
                card.status === "Frozen"
                  ? "Active"
                  : "Frozen",
            }
          : card
      )
    );
  };

  return (
    <div className="w-full">

      {/* PAGE HEADER */}
      <div className="
        mb-7 flex flex-col gap-4
        sm:flex-row sm:items-end
        sm:justify-between
      ">
        <div>
          <div className="
            mb-2 flex items-center gap-2
            text-[10px] font-semibold
            text-gray-400
          ">
            <span>Dashboard</span>
            <ChevronRight size={13} />
            <span className="text-[#B31B34]">
              My Cards
            </span>
          </div>

          <h1 className="
            text-[24px] font-extrabold
            tracking-tight text-[#272323]
            sm:text-[28px]
          ">
            My Bank Cards
          </h1>

          <p className="
            mt-1 text-[11px]
            leading-relaxed text-gray-500
            sm:text-[12px]
          ">
            Manage your debit and ATM cards, view balances
            and control card security.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsToggled(true)}
          className="
            flex h-10 w-fit items-center
            gap-2 rounded-full
            bg-[#B31B34] px-5
            text-[10px] font-extrabold
            text-white shadow-sm
            transition
            hover:bg-[#8F1428]
          "
        >
          <Plus size={15} />
          Add New Card
        </button>
      </div>

      {/* SUMMARY */}
      <div className="
        mb-7 grid grid-cols-1 gap-3
        sm:grid-cols-2 xl:grid-cols-4
      ">

        {/* TOTAL */}
        <SummaryCard
          icon={<CreditCard size={19} />}
          iconClass="bg-[#F7EDEF] text-[#B31B34]"
          title="Total cards"
          value={cardList.length}
        />

        {/* ACTIVE */}
        <SummaryCard
          icon={<ShieldCheck size={19} />}
          iconClass="bg-[#F7EDEF] text-[#B31B34]"
          title="Active cards"
          value={
            cardList.filter(
              (card) => card.status === "Active"
            ).length
          }
        />

        {/* BALANCE */}
        <SummaryCard
          icon={<CircleDollarSign size={19} />}
          iconClass="bg-[#FBF7E8] text-[#A08017]"
          title="Card balance"
          value={`${
            user?.balance?.toLocaleString() || "0"
          }.00`}
        />

        {/* SECURITY */}
        <SummaryCard
          icon={<Lock size={18} />}
          iconClass="bg-[#F7EDEF] text-[#B31B34]"
          title="Security"
          value="Protected"
          valueClass="text-[#B31B34]"
        />
      </div>

      {/* CARDS + RIGHT SIDEBAR */}
      <div className="
        grid grid-cols-1 gap-6
        xl:grid-cols-[minmax(0,1fr)_330px]
      ">

        {/* ATM CARDS */}
        <section>
          <div className="
            mb-4 flex items-center
            justify-between
          ">
            <div>
              <h2 className="
                text-[14px] font-extrabold
                text-gray-800
              ">
                Your ATM Cards
              </h2>

              <p className="
                mt-1 text-[10px]
                text-gray-400
              ">
                Select a card to manage its settings.
              </p>
            </div>

            <button
              type="button"
              className="
                hidden items-center gap-1
                text-[9px] font-bold
                text-[#B31B34]
                sm:flex
              "
            >
              View all
              <ChevronRight size={13} />
            </button>
          </div>

          <div className="
            grid grid-cols-1 gap-5
            md:grid-cols-2
          ">
            {cardList.map((card) => (
              <BankCard
                key={card.id}
                card={card}
                showNumber={!!showNumbers[card.id]}
                onToggleNumber={toggleNumber}
                onFreeze={toggleFreeze}
                onCopy={copyCardNumber}
                copied={copied === card.number}
              />
            ))}

            {/* ADD CARD */}
            <button
              type="button"
              onClick={() => setIsToggled(true)}
              className="
                group flex aspect-[1.586/1]
                w-full flex-col items-center
                justify-center rounded-[24px]
                border-2 border-dashed
                border-[#D8D2D0]
                bg-white text-gray-400
                transition
                hover:border-[#B31B34]
                hover:bg-[#F7EDEF]/40
              "
            >
              <span className="
                flex h-12 w-12
                items-center justify-center
                rounded-full
                bg-[#F7EDEF]
                text-[#B31B34]
                transition
                group-hover:bg-[#B31B34]
                group-hover:text-white
              ">
                <Plus size={21} />
              </span>

              <span className="
                mt-3 text-[11px]
                font-extrabold text-gray-600
                group-hover:text-[#B31B34]
              ">
                Add another ATM card
              </span>

              <span className="
                mt-1 text-[9px] text-gray-400
              ">
                Request a new bank card
              </span>
            </button>
          </div>
        </section>

        {/* RIGHT SIDEBAR */}
        <aside>

          {/* CARD SERVICES */}
          <div className="
            rounded-[22px]
            border border-[#E7E3E1]
            bg-white p-5
            shadow-[0_5px_20px_rgba(0,0,0,0.025)]
          ">
            <div className="flex items-start gap-3">
              <div className="
                flex h-9 w-9
                items-center justify-center
                rounded-xl
                bg-[#F7EDEF]
                text-[#B31B34]
              ">
                <CreditCard size={17} />
              </div>

              <div>
                <h3 className="
                  text-[13px] font-extrabold
                  text-gray-800
                ">
                  Card Services
                </h3>

                <p className="
                  mt-1 text-[9px]
                  text-gray-400
                ">
                  Manage your ATM cards
                </p>
              </div>
            </div>

            <div className="mt-4 space-y-2">
              <CardAction
                icon={<Snowflake size={17} />}
                title="Freeze Card"
                description="Temporarily block a card"
              />

              <CardAction
                icon={<RotateCcw size={17} />}
                title="Replace Card"
                description="Request a replacement"
              />

              <CardAction
                icon={<Lock size={17} />}
                title="Change PIN"
                description="Update your card PIN"
              />

              <CardAction
                icon={<ShieldCheck size={17} />}
                title="Card Security"
                description="Review security settings"
              />
            </div>
          </div>

          {/* ATM FINDER */}
          <div className="
            relative mt-5 overflow-hidden
            rounded-[22px]
            bg-gradient-to-br
            from-[#B31B34] to-[#8F1428]
            p-5 text-white
          ">
            {/* Gold decorative element */}
            <div className="
              absolute -right-10 -top-10
              h-28 w-28 rounded-full
              border-[15px]
              border-[#C9A227]/15
            " />

            <div className="
              relative z-10
              flex h-10 w-10
              items-center justify-center
              rounded-xl
              bg-white/10
              border border-[#C9A227]/30
            ">
              <Building2 size={20} />
            </div>

            <h3 className="
              relative z-10 mt-4
              text-[14px] font-extrabold
            ">
              Find an ATM
            </h3>

            <p className="
              relative z-10 mt-1
              text-[9px] leading-relaxed
              text-white/70
            ">
              Find the nearest ATM or branch
              and get directions.
            </p>

            <a
              href="/"
              className="
                relative z-10 mt-4
                flex h-9 w-full
                items-center justify-center
                gap-2 rounded-full
                bg-white
                text-[9px] font-extrabold
                text-[#B31B34]
                transition
                hover:bg-[#FBF7E8]
                hover:text-[#8F1428]
              "
            >
              Find an ATM
              <ChevronRight size={14} />
            </a>
          </div>
        </aside>
      </div>

      {/* ADD CARD NOTICE */}
      {isToggled && (
        <div className="
          fixed inset-0 z-[100]
          flex items-center justify-center
          bg-[#241017]/60 p-6
          backdrop-blur-sm
        ">
          <div className="
            w-full max-w-md
            rounded-3xl
            border border-[#E7E3E1]
            bg-white p-6 shadow-2xl
          ">
            <div className="
              mx-auto flex h-16 w-16
              items-center justify-center
              rounded-full bg-[#F7EDEF]
            ">
              <IoInformationCircleOutline
                className="h-10 w-10 text-[#B31B34]"
              />
            </div>

            <h1 className="
              mt-4 text-center
              text-lg font-bold text-[#272323]
            ">
              Notice!
            </h1>

            <p className="
              mt-3 text-center
              text-xs leading-6 text-gray-500
            ">
              This feature is not yet available for this
              account. Wells Fargo operating team will
              notify you as soon as it becomes functional.
              Thank you.
            </p>

            <button
              type="button"
              onClick={() => setIsToggled(false)}
              className="
                mt-5 w-full rounded-xl
                bg-[#B31B34] py-3
                text-sm font-bold text-white
                transition
                hover:bg-[#8F1428]
              "
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

/*
|--------------------------------------------------------------------------
| SUMMARY CARD
|--------------------------------------------------------------------------
*/

function SummaryCard({
  icon,
  iconClass,
  title,
  value,
  valueClass = "text-gray-900",
}) {
  return (
    <div className="
      rounded-2xl
      border border-[#E7E3E1]
      bg-white p-4
      shadow-[0_5px_20px_rgba(0,0,0,0.02)]
      transition
      hover:-translate-y-0.5
      hover:shadow-md
    ">
      <div className="
        flex items-center gap-3
      ">
        <div className={`
          flex h-10 w-10
          items-center justify-center
          rounded-xl ${iconClass}
        `}>
          {icon}
        </div>

        <div>
          <p className="
            text-[9px]
            font-semibold text-gray-400
          ">
            {title}
          </p>

          <p className={`
            mt-1 text-[18px]
            font-extrabold ${valueClass}
          `}>
            {value}
          </p>
        </div>
      </div>
    </div>
  );
}

/*
|--------------------------------------------------------------------------
| PAGE
|--------------------------------------------------------------------------
*/

export default function CardsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <main className="
      min-h-screen
      bg-[#F6F6F4]
      text-gray-900
    ">

      {/* HEADER */}
      <DashboardHeader
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      <div className="
        mx-auto flex w-full
        max-w-[1500px]
      ">

        {/* SIDEBAR */}
        <Sidebar
          tab="cards"
          open={sidebarOpen}
          setOpen={setSidebarOpen}
        />

        {/* MAIN CONTENT */}
        <div className="
          min-w-0 flex-1
          pb-[85px] lg:pb-8
        ">
          <div className="
            mx-auto w-full
            max-w-[1250px]
            px-4 py-5
            sm:px-6 sm:py-7
            lg:px-8 lg:py-8
          ">
            <CardsContent />
          </div>
        </div>
      </div>

      {/* MOBILE NAVIGATION */}
      <MobileNavigation tab="cards" />
    </main>
  );
}