"use client";

import { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Share2,
  Volume2,
  RotateCcw,
  MessageSquare,
} from "lucide-react";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";

export default function ConsumerLoanApplication() {
  // ------------------------------------------------------------
  // FORM STATE
  // ------------------------------------------------------------

  const [tcKimlik, setTcKimlik] = useState("");
  const [phoneCode, setPhoneCode] = useState("");
  const [phone, setPhone] = useState("");
  const [income, setIncome] = useState("");
  const [securityCode, setSecurityCode] = useState("");

  const [term, setTerm] = useState(13);
  const [amount, setAmount] = useState(1000);

  const [accepted, setAccepted] = useState(false);

  // Captcha
  const [captcha, setCaptcha] = useState("FCSNP");

  // Mobile menu
  const [menuOpen, setMenuOpen] = useState(false);

  // ------------------------------------------------------------
  // CAPTCHA GENERATOR
  // ------------------------------------------------------------

  const generateCaptcha = () => {
    const characters = "ABCDEFGHJKLMNPQRSTUVWXYZ";
    let result = "";

    for (let i = 0; i < 5; i++) {
      result += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }

    setCaptcha(result);
  };

  // ------------------------------------------------------------
  // FORM SUBMIT
  // ------------------------------------------------------------

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!accepted) {
      alert(
        "Lütfen kişisel verilerin işlenmesine ilişkin bilgilendirmeyi kabul ediniz."
      );
      return;
    }

    if (securityCode.toUpperCase() !== captcha) {
      alert("Güvenlik kodu hatalı.");
      return;
    }

    alert("Başvurunuz alınmıştır.");
  };

  // ------------------------------------------------------------
  // FORMAT AMOUNT
  // ------------------------------------------------------------

  const formatAmount = (value) => {
    return new Intl.NumberFormat("tr-TR").format(value);
  };

  return (
    <main className="min-h-screen w-full bg-[#d8dadd] text-[#26333a]">

        <Header />

      {/* =========================================================
          PAGE BACKGROUND
      ========================================================== */}

      <div
        className="
          fixed
          inset-0
          -z-10
          bg-cover
          bg-center
          bg-no-repeat
        "
        style={{
          backgroundImage:
            "url('/img/ziraat-background.avif')",
        }}
      />

      {/* Dark/gray transparent overlay exactly like screenshot */}

      <div
        className="
          fixed
          inset-0
          -z-10
          bg-[#5b5d68]/45
        "
      />

      {/* =========================================================
          TOP HEADER
      ========================================================== */}

      <header className="relative z-30 w-full">

        {/* Desktop top navigation */}

        <div
          className="
            hidden
            h-[38px]
            w-full
            items-center
            justify-end
            bg-[#e30613]
            px-6
            md:flex
            lg:px-[65px]
          "
        >

          <div className="flex items-center gap-7">

            <button
              className="
                text-[12px]
                font-bold
                uppercase
                text-white
                transition
                hover:opacity-70
              "
            >
              SECURITY
            </button>

            <button
              className="
                text-[12px]
                font-bold
                uppercase
                text-white
                transition
                hover:opacity-70
              "
            >
              HELP
            </button>

            <button
              className="
                text-[12px]
                font-bold
                uppercase
                text-white
                transition
                hover:opacity-70
              "
            >
              FREQUENTLY ASKED QUESTIONS
            </button>

            <button
              className="
                text-[12px]
                font-bold
                uppercase
                text-white
                transition
                hover:opacity-70
              "
            >
              ENGLISH
            </button>

          </div>

        </div>

        {/* =====================================================
            BANK HEADER
        ====================================================== */}

        <div
          className="
            flex
            min-h-[75px]
            items-center
            justify-between
            bg-white
            px-5
            shadow-sm
            md:px-8
            lg:px-[62px]
          "
        >

          {/* LOGO */}

          <div className="flex items-center gap-3">

            {/* Ziraat style leaf */}

            <div
              className="
                relative
                h-[48px]
                w-[26px]
                overflow-hidden
              "
            >

              <div
                className="
                  absolute
                  left-[9px]
                  top-0
                  h-full
                  w-[4px]
                  bg-[#e30613]
                "
              />

              <div
                className="
                  absolute
                  left-[2px]
                  top-[3px]
                  h-[8px]
                  w-[18px]
                  -rotate-[35deg]
                  bg-[#e30613]
                "
              />

              <div
                className="
                  absolute
                  left-[2px]
                  top-[14px]
                  h-[8px]
                  w-[18px]
                  -rotate-[35deg]
                  bg-[#e30613]
                "
              />

              <div
                className="
                  absolute
                  left-[2px]
                  top-[25px]
                  h-[8px]
                  w-[18px]
                  -rotate-[35deg]
                  bg-[#e30613]
                "
              />

              <div
                className="
                  absolute
                  left-[2px]
                  top-[36px]
                  h-[8px]
                  w-[18px]
                  -rotate-[35deg]
                  bg-[#e30613]
                "
              />

            </div>

            <span
              className="
                text-[25px]
                font-semibold
                tracking-[-1.5px]
                text-[#202027]
                sm:text-[29px]
              "
            >
              Ziraat Bankası
            </span>

          </div>

          {/* CUSTOMER SERVICE */}

          <div className="hidden items-center gap-3 md:flex">

            <div
              className="
                flex
                h-[55px]
                w-[55px]
                items-center
                justify-center
                rounded-full
                border-[4px]
                border-[#4d5960]
                text-center
                text-[10px]
                font-bold
                leading-[11px]
                text-[#4d5960]
              "
            >
              0850
              <br />
              220
              <br />
              00 00
            </div>

            <div>

              <p
                className="
                  text-[11px]
                  font-bold
                  leading-[13px]
                  text-[#4b555a]
                "
              >
                Müşteri İletişim
                <br />
                Merkezi
              </p>

              <p
                className="
                  mt-1
                  text-[8px]
                  text-[#777]
                "
              >
                www.ziraatbank.com.tr
              </p>

            </div>

          </div>

          {/* MOBILE MENU */}

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded
              text-[#222]
              md:hidden
            "
          >
            {menuOpen ? (
              <span className="text-2xl">×</span>
            ) : (
              <span className="text-2xl">☰</span>
            )}
          </button>

        </div>

        {/* MOBILE NAV */}

        {menuOpen && (
          <div
            className="
              border-b
              border-gray-200
              bg-white
              px-5
              py-3
              shadow-lg
              md:hidden
            "
          >

            <button className="block w-full border-b py-3 text-left text-sm font-semibold">
              SECURITY
            </button>

            <button className="block w-full border-b py-3 text-left text-sm font-semibold">
              HELP
            </button>

            <button className="block w-full border-b py-3 text-left text-sm font-semibold">
              FREQUENTLY ASKED QUESTIONS
            </button>

            <button className="block w-full py-3 text-left text-sm font-semibold">
              ENGLISH
            </button>

          </div>
        )}

      </header>

      {/* =========================================================
          MAIN PAGE
      ========================================================== */}

      <section
        className="
          relative
          min-h-[calc(100vh-113px)]
          overflow-hidden
        "
      >

        {/* =======================================================
            BACK BUTTON
        ======================================================== */}

        <button
          className="
            absolute
            left-6
            top-8
            z-20
            hidden
            h-[45px]
            w-[45px]
            items-center
            justify-center
            rounded-full
            border-2
            border-white
            text-white
            transition
            hover:bg-white/10
            sm:flex
            lg:left-[6.5%]
          "
        >
          <ChevronLeft size={28} strokeWidth={1.7} />
        </button>

        {/* =======================================================
            SHARE BUTTON
        ======================================================== */}

        <button
          className="
            absolute
            right-6
            top-8
            z-20
            flex
            h-[45px]
            w-[45px]
            items-center
            justify-center
            rounded-full
            border-2
            border-white
            text-white
            transition
            hover:bg-white/10
            lg:right-[6.5%]
          "
        >
          <Share2 size={21} strokeWidth={1.7} />
        </button>

        {/* =======================================================
            PAGE TITLE
        ======================================================== */}

        <div
          className="
            px-5
            pb-5
            pt-7
            text-center
            sm:pt-8
          "
        >

          <h1
            className="
              text-[30px]
              font-light
              tracking-[-1px]
              text-white
              sm:text-[36px]
              md:text-[39px]
            "
          >
            Tüketici Kredisi Başvurusu
          </h1>

          {/* Breadcrumb */}

          <div
            className="
              mt-2
              flex
              flex-wrap
              items-center
              justify-center
              gap-1
              text-[11px]
              text-white
              sm:text-[12px]
            "
          >

            <a
              href="#"
              className="underline"
            >
              Ana Sayfa
            </a>

            <ChevronRight size={13} />

            <a
              href="#"
              className="underline"
            >
              Bireysel
            </a>

            <ChevronRight size={13} />

            <a
              href="#"
              className="underline"
            >
              Başvurular
            </a>

            <ChevronRight size={13} />

            <a
              href="#"
              className="underline"
            >
              Bireysel Kredi Başvuruları
            </a>

            <ChevronRight size={13} />

            <span className="underline">
              Tüketici Kredisi
            </span>

            <span
              className="
                ml-1
                flex
                h-[19px]
                w-[19px]
                items-center
                justify-center
                rounded-full
                bg-white
                text-[#5a5f64]
              "
            >
              <ChevronDown size={13} />
            </span>

          </div>

        </div>

        {/* =======================================================
            MAIN WHITE CONTAINER
        ======================================================== */}

        <div
          className="
            mx-auto
            mb-8
            w-[calc(100%-24px)]
            max-w-[1170px]
            rounded-[18px]
            bg-white
            p-[10px]
            shadow-xl
            sm:w-[calc(100%-40px)]
            sm:p-[14px]
            md:w-[calc(100%-64px)]
            lg:w-[calc(100%-180px)]
          "
        >

          {/* =====================================================
              FORM BACKGROUND
          ====================================================== */}

          <div
            className="
              rounded-[10px]
              bg-[#e8eef1]
              px-5
              py-8
              sm:px-10
              md:px-16
              lg:px-[272px]
              lg:py-[40px]
            "
          >

            {/* ===================================================
                FORM
            ==================================================== */}

            <form
              onSubmit={handleSubmit}
              className="w-full"
            >

              {/* =================================================
                  INSTRUCTION
              ================================================== */}

              <h2
                className="
                  mb-5
                  text-center
                  text-[17px]
                  font-normal
                  text-[#111]
                  sm:text-[19px]
                "
              >
                Lütfen tüm alanları eksiksiz bir şekilde doldurunuz.
              </h2>

              {/* =================================================
                  TC KIMLIK NO
              ================================================== */}

              <div className="mb-4">

                <label
                  htmlFor="tcKimlik"
                  className="
                    mb-1
                    block
                    text-[13px]
                    text-[#23466b]
                  "
                >
                  T.C. Kimlik No
                </label>

                <input
                  id="tcKimlik"
                  type="text"
                  inputMode="numeric"
                  maxLength={11}
                  value={tcKimlik}
                  onChange={(e) =>
                    setTcKimlik(
                      e.target.value.replace(
                        /\D/g,
                        ""
                      )
                    )
                  }
                  className="
                    h-[41px]
                    w-full
                    rounded-full
                    border-0
                    bg-white
                    px-5
                    text-[14px]
                    outline-none
                    ring-0
                    transition
                    focus:ring-2
                    focus:ring-[#e30613]/20
                  "
                />

              </div>

              {/* =================================================
                  PHONE
              ================================================== */}

              <div className="mb-7">

                <label
                  className="
                    mb-1
                    block
                    text-[13px]
                    text-[#23466b]
                  "
                >
                  Cep Telefonu
                </label>

                <div
                  className="
                    grid
                    grid-cols-1
                    gap-3
                    sm:grid-cols-[174px_1fr]
                  "
                >

                  {/* COUNTRY CODE */}

                  <div className="relative">

                    <select
                      value={phoneCode}
                      onChange={(e) =>
                        setPhoneCode(
                          e.target.value
                        )
                      }
                      className="
                        h-[41px]
                        w-full
                        appearance-none
                        rounded-full
                        border-0
                        bg-white
                        px-5
                        text-[13px]
                        font-semibold
                        outline-none
                      "
                    >

                      <option value="">
                        Seçiniz
                      </option>

                      <option value="0505">
                        0505
                      </option>

                      <option value="0506">
                        0506
                      </option>

                      <option value="0507">
                        0507
                      </option>

                      <option value="0532">
                        0532
                      </option>

                      <option value="0533">
                        0533
                      </option>

                      <option value="0542">
                        0542
                      </option>

                      <option value="0555">
                        0555
                      </option>

                    </select>

                    <ChevronDown
                      size={15}
                      className="
                        pointer-events-none
                        absolute
                        right-5
                        top-1/2
                        -translate-y-1/2
                        text-[#555]
                      "
                    />

                  </div>

                  {/* PHONE NUMBER */}

                  <input
                    type="text"
                    inputMode="numeric"
                    maxLength={7}
                    value={phone}
                    onChange={(e) =>
                      setPhone(
                        e.target.value.replace(
                          /\D/g,
                          ""
                        )
                      )
                    }
                    className="
                      h-[41px]
                      w-full
                      rounded-full
                      border-0
                      bg-white
                      px-5
                      outline-none
                      focus:ring-2
                      focus:ring-[#e30613]/20
                    "
                  />

                </div>

              </div>

              {/* =================================================
                  TERM SLIDER
              ================================================== */}

              <div className="mb-5">

                <label
                  className="
                    mb-2
                    block
                    text-[13px]
                    text-[#23466b]
                  "
                >
                  Vade (13-36)
                </label>

                <div
                  className="
                    grid
                    grid-cols-1
                    gap-3
                    sm:grid-cols-[1fr_174px]
                  "
                >

                  {/* SLIDER */}

                  <div
                    className="
                      flex
                      h-[41px]
                      items-center
                      rounded-full
                      bg-white
                      px-5
                    "
                  >

                    <input
                      type="range"
                      min="13"
                      max="36"
                      step="1"
                      value={term}
                      onChange={(e) =>
                        setTerm(
                          Number(e.target.value)
                        )
                      }
                      className="
                        h-[4px]
                        w-full
                        cursor-pointer
                        appearance-none
                        rounded-full
                        accent-[#e30613]
                      "
                    />

                  </div>

                  {/* VALUE */}

                  <div
                    className="
                      flex
                      h-[41px]
                      items-center
                      justify-end
                      rounded-full
                      bg-white
                      px-5
                      text-[13px]
                      font-bold
                      text-[#111]
                    "
                  >
                    {term} Ay
                  </div>

                </div>

              </div>

              {/* =================================================
                  AMOUNT SLIDER
              ================================================== */}

              <div className="mb-5">

                <label
                  className="
                    mb-2
                    block
                    text-[13px]
                    text-[#23466b]
                  "
                >
                  Tutar (1.000-50.000)
                </label>

                <div
                  className="
                    grid
                    grid-cols-1
                    gap-3
                    sm:grid-cols-[1fr_174px]
                  "
                >

                  {/* SLIDER */}

                  <div
                    className="
                      flex
                      h-[41px]
                      items-center
                      rounded-full
                      bg-white
                      px-5
                    "
                  >

                    <input
                      type="range"
                      min="1000"
                      max="50000"
                      step="1000"
                      value={amount}
                      onChange={(e) =>
                        setAmount(
                          Number(e.target.value)
                        )
                      }
                      className="
                        h-[4px]
                        w-full
                        cursor-pointer
                        appearance-none
                        rounded-full
                        accent-[#e30613]
                      "
                    />

                  </div>

                  {/* AMOUNT */}

                  <div
                    className="
                      flex
                      h-[41px]
                      items-center
                      justify-end
                      rounded-full
                      bg-white
                      px-5
                      text-[13px]
                      font-bold
                      text-[#111]
                    "
                  >
                    {formatAmount(amount)} TL
                  </div>

                </div>

              </div>

              {/* =================================================
                  INCOME
              ================================================== */}

              <div className="mb-5">

                <label
                  htmlFor="income"
                  className="
                    mb-1
                    block
                    text-[13px]
                    text-[#23466b]
                  "
                >
                  Gelir Bilgisi
                </label>

                <div className="relative">

                  <input
                    id="income"
                    type="text"
                    inputMode="decimal"
                    value={income}
                    onChange={(e) =>
                      setIncome(e.target.value)
                    }
                    className="
                      h-[41px]
                      w-full
                      rounded-full
                      border-0
                      bg-white
                      px-5
                      pr-12
                      text-[14px]
                      outline-none
                      focus:ring-2
                      focus:ring-[#e30613]/20
                    "
                  />

                  <span
                    className="
                      absolute
                      right-5
                      top-1/2
                      -translate-y-1/2
                      text-[13px]
                      text-[#23466b]
                    "
                  >
                    TL
                  </span>

                </div>

              </div>

              {/* =================================================
                  PERSONAL DATA CHECKBOX
              ================================================== */}

              <div className="mb-5">

                <label
                  className="
                    flex
                    cursor-pointer
                    items-start
                    gap-2
                  "
                >

                  <input
                    type="checkbox"
                    checked={accepted}
                    onChange={(e) =>
                      setAccepted(
                        e.target.checked
                      )
                    }
                    className="
                      mt-[3px]
                      h-[19px]
                      w-[19px]
                      shrink-0
                      cursor-pointer
                      appearance-none
                      rounded-[2px]
                      border
                      border-[#ccd5da]
                      bg-white
                      checked:border-[#e30613]
                      checked:bg-[#e30613]
                    "
                  />

                  <span
                    className="
                      text-[12px]
                      leading-[1.45]
                      text-[#29445c]
                    "
                  >
                    Kişisel Verilerin Korunması Kanunu
                    uyarınca gerçekleştirilen ilgili{" "}
                    <span
                      className="
                        font-bold
                        text-[#e30613]
                        underline
                      "
                    >
                      "Bilgilendirme"
                    </span>{" "}
                    yi okudum. Kişisel verilerimin
                    Bilgilendirme'de belirtilen
                    kapsamlarda işlenmesini kabul
                    ederim.
                  </span>

                </label>

              </div>

              {/* =================================================
                  SECURITY CODE
              ================================================== */}

              <div className="mb-7">

                <label
                  className="
                    mb-1
                    block
                    text-[13px]
                    text-[#23466b]
                  "
                >
                  Güvenlik Kodu (Sağ alandaki değeri giriniz)
                </label>

                <div
                  className="
                    grid
                    grid-cols-1
                    gap-3
                    sm:grid-cols-[1fr_274px]
                  "
                >

                  {/* USER INPUT */}

                  <input
                    type="text"
                    value={securityCode}
                    onChange={(e) =>
                      setSecurityCode(
                        e.target.value.toUpperCase()
                      )
                    }
                    maxLength={5}
                    className="
                      h-[41px]
                      w-full
                      rounded-full
                      border-0
                      bg-white
                      px-5
                      text-[16px]
                      uppercase
                      outline-none
                      focus:ring-2
                      focus:ring-[#e30613]/20
                    "
                  />

                  {/* CAPTCHA */}

                  <div
                    className="
                      flex
                      h-[41px]
                      items-center
                      justify-between
                      overflow-hidden
                      rounded-full
                      bg-white
                      pl-5
                    "
                  >

                    <span
                      className="
                        select-none
                        font-mono
                        text-[28px]
                        font-bold
                        tracking-[-2px]
                        text-[#151515]
                      "
                      style={{
                        transform:
                          "skewX(-8deg)",
                      }}
                    >
                      {captcha}
                    </span>

                    <div className="flex items-center gap-2 pr-2">

                      {/* REFRESH */}

                      <button
                        type="button"
                        onClick={generateCaptcha}
                        className="
                          flex
                          h-[28px]
                          w-[28px]
                          items-center
                          justify-center
                          rounded-full
                          bg-[#e30613]
                          text-white
                          transition
                          hover:bg-[#bd0010]
                        "
                        title="Yeni güvenlik kodu"
                      >
                        <RotateCcw size={15} />
                      </button>

                      {/* AUDIO */}

                      <button
                        type="button"
                        className="
                          flex
                          h-[28px]
                          w-[28px]
                          items-center
                          justify-center
                          rounded-full
                          bg-[#e30613]
                          text-white
                          transition
                          hover:bg-[#bd0010]
                        "
                        title="Güvenlik kodunu dinle"
                      >
                        <Volume2 size={15} />
                      </button>

                    </div>

                  </div>

                </div>

              </div>

              {/* =================================================
                  SUBMIT
              ================================================== */}

              <div className="flex justify-center">

                <button
                  type="submit"
                  className="
                    h-[41px]
                    w-full
                    rounded-full
                    bg-[#e30613]
                    px-12
                    text-[13px]
                    font-bold
                    uppercase
                    text-white
                    shadow-sm
                    transition
                    duration-200
                    hover:bg-[#c90010]
                    active:scale-[0.99]
                    sm:w-[272px]
                  "
                >
                  GÖNDER
                </button>

              </div>

            </form>

          </div>

        </div>

      </section>

      {/* =========================================================
          MAIN FOOTER 
      ========================================================== */}

        <Footer />

    </main>
  );
}