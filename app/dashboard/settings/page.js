"use client";

import { useState } from "react";
import {
  Bell,
  Camera,
  Check,
  ChevronDown,
  ChevronRight,
  FileText,
  KeyRound,
  Pencil,
  Mail,
  Phone,
  Save,
  ShieldCheck,
  User,
  Building2,
  X,
} from "lucide-react";

import { useAuth } from "@/app/context/AuthContext";
import { DashboardHeader } from "../components/DashboardHeader";
import { Sidebar } from "../components/Sidebar";
import { MobileNavigation } from "../components/MobileNavigation";

import { IoInformationCircleOutline } from "react-icons/io5";

/*
|--------------------------------------------------------------------------
| WELLS FARGO-INSPIRED COLOR PALETTE
|--------------------------------------------------------------------------
*/

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

/*
|--------------------------------------------------------------------------
| AVATAR
|--------------------------------------------------------------------------
*/

let avatar;

/*
|--------------------------------------------------------------------------
| PROFILE HEADER
|--------------------------------------------------------------------------
*/

function ProfileHeader() {
  const [photo, setPhoto] = useState(null);
  const { user } = useAuth();

  const handlePhotoChange = (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    const imageUrl = URL.createObjectURL(file);

    avatar = imageUrl || "avatar.png";

    setPhoto(imageUrl);
  };

  return (
    <div
      className="
        overflow-hidden
        rounded-[24px]
        border
        border-gray-200
        bg-white
        shadow-sm
      "
    >
      {/* COVER */}

      <div
        className="
          relative
          h-[120px]
          overflow-hidden
          bg-[#4B1825]
          sm:h-[155px]
        "
      >
        {/* Decorative shapes */}

        <div
          className="
            absolute
            -right-12
            -top-20
            h-[230px]
            w-[230px]
            rounded-full
            border-[35px]
            border-[#B31B34]/40
          "
        />

        <div
          className="
            absolute
            right-[18%]
            -bottom-20
            h-[170px]
            w-[170px]
            rounded-full
            border-[25px]
            border-[#D8B44C]/20
          "
        />

        <div
          className="
            absolute
            left-[35%]
            -top-24
            h-[180px]
            w-[180px]
            rounded-full
            bg-[#B31B34]/20
            blur-2xl
          "
        />

        {/* Gold accent */}

        <div
          className="
            absolute
            bottom-0
            left-0
            h-1
            w-full
            bg-[#D8B44C]
          "
        />

        <div
          className="
            absolute
            left-5
            top-5
            sm:left-7
            sm:top-7
          "
        >
          <p
            className="
              text-[8px]
              font-extrabold
              uppercase
              tracking-[0.2em]
              text-white/50
            "
          >
            Secure Banking
          </p>

          <p
            className="
              mt-1
              text-[10px]
              font-bold
              text-white/80
            "
          >
            Your profile
          </p>
        </div>
      </div>

      {/* PROFILE AREA */}

      <div
        className="
          relative
          px-5
          pb-6
          sm:px-7
          sm:pb-7
        "
      >
        {/* AVATAR */}

        <div
          className="
            absolute
            -top-[52px]
            left-5
            sm:left-7
          "
        >
          <div
            className="
              relative
              flex
              h-[96px]
              w-[96px]
              items-center
              justify-center
              overflow-hidden
              rounded-full
              border-4
              border-white
              bg-[#F7EDEF]
              shadow-lg
              sm:h-[108px]
              sm:w-[108px]
            "
          >
            {photo ? (
              <img
                src={photo}
                alt="Profile"
                className="
                  h-full
                  w-full
                  object-cover
                "
              />
            ) : (
              <User size={45} className="text-[#B31B34]" />
            )}

            {/* Gold ring */}

            <div
              className="
                pointer-events-none
                absolute
                inset-0
                rounded-full
                border
                border-[#D8B44C]/50
              "
            />
          </div>

          {/* PHOTO BUTTON */}

          <label
            className="
              absolute
              bottom-0
              right-0
              flex
              h-8
              w-8
              cursor-pointer
              items-center
              justify-center
              rounded-full
              border-2
              border-white
              bg-[#B31B34]
              text-white
              shadow-md
              transition
              hover:bg-[#8F1428]
            "
          >
            <Camera size={14} />

            <input
              type="file"
              accept="image/*"
              onChange={handlePhotoChange}
              className="hidden"
            />
          </label>
        </div>

        {/* NAME */}

        <div
          className="
            pt-[62px]
            sm:pt-[68px]
          "
        >
          <div
            className="
              flex
              flex-col
              gap-4
              sm:flex-row
              sm:items-end
              sm:justify-between
            "
          >
            <div>
              <div className="flex items-center gap-2">
                <h1
                  className="
                    text-[21px]
                    font-black
                    tracking-tight
                    text-[#4B1825]
                    sm:text-[23px]
                  "
                >
                  {user?.fullname || "Customer"}
                </h1>

                <span
                  className="
                    rounded-full
                    bg-[#FBF5E6]
                    px-2
                    py-1
                    text-[7px]
                    font-black
                    uppercase
                    tracking-wide
                    text-[#8A6B12]
                  "
                >
                  Premium
                </span>
              </div>

              <p
                className="
                  mt-1
                  text-[9px]
                  text-gray-400
                "
              >
                Premium Banking Customer
              </p>
            </div>

            <span
              className="
                flex
                w-fit
                items-center
                gap-1.5
                rounded-full
                border
                border-emerald-100
                bg-emerald-50
                px-3
                py-1.5
                text-[9px]
                font-bold
                text-emerald-600
              "
            >
              <Check size={12} />
              Account Verified
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

/*
|--------------------------------------------------------------------------
| INPUT
|--------------------------------------------------------------------------
*/

function ProfileInput({
  label,
  value,
  onChange,
  icon,
  type = "text",
  disabled = false,
}) {
  return (
    <div>
      <label
        className="
          mb-1.5
          block
          text-[9px]
          font-extrabold
          uppercase
          tracking-wide
          text-gray-500
        "
      >
        {label}
      </label>

      <div className="relative">
        <span
          className="
            pointer-events-none
            absolute
            left-3
            top-1/2
            -translate-y-1/2
            text-[#B31B34]
          "
        >
          {icon}
        </span>

        <input
          type={type}
          value={value || ""}
          onChange={onChange}
          disabled={disabled}
          className={`
            h-[44px]
            w-full
            rounded-xl
            border
            border-gray-200
            bg-white
            pl-10
            pr-3
            text-[11px]
            font-semibold
            text-[#333333]
            outline-none
            transition

            ${
              disabled
                ? "cursor-not-allowed bg-gray-50 text-gray-400"
                : "focus:border-[#B31B34] focus:ring-2 focus:ring-[#B31B34]/10"
            }
          `}
        />
      </div>
    </div>
  );
}

/*
|--------------------------------------------------------------------------
| PERSONAL INFORMATION
|--------------------------------------------------------------------------
*/

function PersonalInformation() {
  const { user } = useAuth();

  user.img = avatar;

  const [form, setForm] = useState(user);

  const [saved, setSaved] = useState(false);

  const updateField = (field, value) => {
    setForm((previous) => ({
      ...previous,
      [field]: value,
    }));

    setSaved(false);
  };

  const saveChanges = async () => {
    try {
      await fetch("/api/auth/users/profile", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      setSaved(true);

      setTimeout(() => {
        setSaved(false);
      }, 2500);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section
      className="
        overflow-hidden
        rounded-[24px]
        border
        border-gray-200
        bg-white
        shadow-sm
      "
    >
      {/* Section accent */}

      <div className="h-1 bg-[#B31B34]" />

      <div className="p-5 sm:p-7">
        {/* TITLE */}

        <div
          className="
            mb-6
            flex
            items-start
            justify-between
          "
        >
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
                <User size={15} />
              </div>

              <h2
                className="
                  text-[14px]
                  font-black
                  text-[#4B1825]
                "
              >
                Personal Information
              </h2>
            </div>

            <p
              className="
                mt-2
                text-[9px]
                leading-relaxed
                text-gray-400
              "
            >
              Update your personal and contact information.
            </p>
          </div>

          <div
            className="
              flex
              h-8
              w-8
              items-center
              justify-center
              rounded-lg
              bg-gray-50
              text-gray-400
            "
          >
            <Pencil size={14} />
          </div>
        </div>

        {/* FORM */}

        <div
          className="
            grid
            grid-cols-1
            gap-4
            sm:grid-cols-2
          "
        >
          <ProfileInput
            label="Full Name"
            value={form.fullname}
            onChange={(event) => updateField("fullname", event.target.value)}
            icon={<User size={15} />}
          />

          <ProfileInput
            label="Email Address"
            value={form.email}
            onChange={(event) => updateField("email", event.target.value)}
            icon={<Mail size={15} />}
            type="email"
          />

          <ProfileInput
            label="Phone Number"
            value={form.phone}
            onChange={(event) => updateField("phone", event.target.value)}
            icon={<Phone size={15} />}
          />
        </div>

        {/* SAVE */}

        <div
          className="
            mt-6
            flex
            flex-col-reverse
            gap-3
            border-t
            border-gray-100
            pt-5
            sm:flex-row
            sm:items-center
            sm:justify-end
          "
        >
          {saved && (
            <span
              className="
                flex
                items-center
                justify-center
                gap-1.5
                text-[9px]
                font-bold
                text-emerald-600
                sm:justify-start
              "
            >
              <Check size={13} />
              Changes saved successfully
            </span>
          )}

          <button
            type="button"
            onClick={saveChanges}
            className="
              flex
              h-10
              items-center
              justify-center
              gap-2
              rounded-xl
              bg-[#B31B34]
              px-5
              text-[10px]
              font-extrabold
              uppercase
              tracking-wide
              text-white
              shadow-sm
              transition
              hover:bg-[#8F1428]
              hover:shadow-md
            "
          >
            <Save size={14} />
            Save Changes
          </button>
        </div>
      </div>
    </section>
  );
}

/*
|--------------------------------------------------------------------------
| SECURITY SETTINGS
|--------------------------------------------------------------------------
*/

function SecuritySettings() {
  const [isToggled, setIsToggled] = useState(false);

  const [twoFactor, setTwoFactor] = useState(true);

  const [loginAlerts, setLoginAlerts] = useState(true);

  return (
    <section
      className="
        overflow-hidden
        rounded-[24px]
        border
        border-gray-200
        bg-white
        shadow-sm
      "
    >
      {/* Accent */}

      <div className="h-1 bg-[#D8B44C]" />

      <div className="p-5 sm:p-7">
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
              <ShieldCheck size={16} />
            </div>

            <h2
              className="
                text-[14px]
                font-black
                text-[#4B1825]
              "
            >
              Security Settings
            </h2>
          </div>

          <p
            className="
              mt-2
              text-[9px]
              leading-relaxed
              text-gray-400
            "
          >
            Protect your bank account and manage login security.
          </p>
        </div>

        <div className="mt-5 space-y-3">
          {/* PASSWORD */}

          <button
            type="button"
            onClick={() => setIsToggled(true)}
            className="
              flex
              w-full
              items-center
              gap-3
              rounded-2xl
              border
              border-gray-100
              bg-gray-50/50
              p-3
              text-left
              transition
              hover:border-[#E4D2D6]
              hover:bg-[#F7EDEF]
            "
          >
            <span
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
              <KeyRound size={18} />
            </span>

            <span className="min-w-0">
              <span
                className="
                  block
                  text-[10px]
                  font-extrabold
                  text-[#333333]
                "
              >
                Change Password
              </span>

              <span
                className="
                  mt-1
                  block
                  text-[8px]
                  text-gray-400
                "
              >
                Update your account password
              </span>
            </span>

            <ChevronRight
              size={15}
              className="
                ml-auto
                shrink-0
                text-gray-300
              "
            />
          </button>

          {/* 2FA */}

          <SecurityToggle
            icon={<ShieldCheck size={18} />}
            title="Two-Factor Authentication"
            description="Add an extra layer of security"
            enabled={twoFactor}
            onChange={() => setTwoFactor(!twoFactor)}
          />

          {/* LOGIN ALERT */}

          <SecurityToggle
            icon={<Bell size={18} />}
            title="Login Alerts"
            description="Receive alerts for new logins"
            enabled={loginAlerts}
            onChange={() => setLoginAlerts(!loginAlerts)}
          />
        </div>
      </div>

      {/* NOTICE MODAL */}

      {isToggled === true && (
        <div
          className="
            fixed
            inset-0
            z-[100]
            flex
            items-center
            justify-center
            bg-[#4B1825]/60
            p-4
            backdrop-blur-sm
          "
        >
          <div
            className="
              w-full
              max-w-[390px]
              overflow-hidden
              rounded-[24px]
              border
              border-white/20
              bg-white
              shadow-2xl
            "
          >
            {/* Modal top */}

            <div
              className="
                h-1
                w-full
                bg-[#D8B44C]
              "
            />

            <div className="p-6">
              {/* Icon */}

              <div className="flex justify-center">
                <div
                  className="
                    flex
                    h-[72px]
                    w-[72px]
                    items-center
                    justify-center
                    rounded-full
                    bg-[#F7EDEF]
                    text-[#B31B34]
                  "
                >
                  <IoInformationCircleOutline className="h-12 w-12" />
                </div>
              </div>

              {/* Title */}

              <h1
                className="
                  mt-5
                  text-center
                  text-[17px]
                  font-black
                  text-[#4B1825]
                "
              >
                Notice!
              </h1>

              {/* Description */}

              <p
                className="
                  mt-3
                  text-center
                  text-[10px]
                  leading-relaxed
                  text-gray-500
                "
              >
                This feature is not yet available for this account. Ziraat Bank
                operating team will notify you as soon as it becomes functional.
                Thank you.
              </p>

              {/* Button */}

              <button
                type="button"
                onClick={() => setIsToggled(false)}
                className="
                  mt-6
                  h-11
                  w-full
                  rounded-xl
                  bg-[#B31B34]
                  text-[10px]
                  font-extrabold
                  uppercase
                  tracking-wide
                  text-white
                  transition
                  hover:bg-[#8F1428]
                "
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

/*
|--------------------------------------------------------------------------
| SECURITY TOGGLE
|--------------------------------------------------------------------------
*/

function SecurityToggle({ icon, title, description, enabled, onChange }) {
  return (
    <div
      className="
        flex
        items-center
        gap-3
        rounded-2xl
        border
        border-gray-100
        bg-gray-50/50
        p-3
      "
    >
      <span
        className="
          flex
          h-10
          w-10
          shrink-0
          items-center
          justify-center
          rounded-xl
          bg-gray-100
          text-[#4B1825]
        "
      >
        {icon}
      </span>

      <div className="min-w-0">
        <p
          className="
            text-[10px]
            font-extrabold
            text-[#333333]
          "
        >
          {title}
        </p>

        <p
          className="
            mt-1
            text-[8px]
            text-gray-400
          "
        >
          {description}
        </p>
      </div>

      <button
        type="button"
        onClick={onChange}
        className={`
          relative
          ml-auto
          h-6
          w-11
          shrink-0
          rounded-full
          transition

          ${enabled ? "bg-[#B31B34]" : "bg-gray-300"}
        `}
      >
        <span
          className={`
            absolute
            top-1
            h-4
            w-4
            rounded-full
            bg-white
            shadow-sm
            transition

            ${enabled ? "left-6" : "left-1"}
          `}
        />
      </button>
    </div>
  );
}

/*
|--------------------------------------------------------------------------
| BANK ACCOUNT INFORMATION
|--------------------------------------------------------------------------
*/

function BankAccountInformation() {
  const { user } = useAuth();

  return (
    <section
      className="
        overflow-hidden
        rounded-[24px]
        border
        border-gray-200
        bg-white
        shadow-sm
      "
    >
      <div className="h-1 bg-[#B31B34]" />

      <div className="p-5 sm:p-7">
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
              <Building2 size={15} />
            </div>

            <h2
              className="
                text-[14px]
                font-black
                text-[#4B1825]
              "
            >
              Bank Account Information
            </h2>
          </div>

          <p
            className="
              mt-2
              text-[9px]
              text-gray-400
            "
          >
            Your banking identification information.
          </p>
        </div>

        <div className="mt-5 space-y-3">
          <InfoRow label="Customer ID" value="CUS-98451273" />

          <InfoRow label="Account Number" value={user?.accountNumber} />

          <InfoRow label="Account Type" value="Premium Savings Account" />

          <InfoRow label="Account Status" value="Active" active />
        </div>

        {/* Security Notice */}

        <div
          className="
            mt-5
            flex
            items-start
            gap-3
            rounded-2xl
            border
            border-[#E7E0C9]
            bg-[#FBF8EC]
            p-3
          "
        >
          <ShieldCheck
            size={17}
            className="
              mt-0.5
              shrink-0
              text-[#9A7A16]
            "
          />

          <p
            className="
              text-[8px]
              leading-relaxed
              text-[#806A1B]
            "
          >
            Your account information is protected and should never be shared
            with anyone.
          </p>
        </div>
      </div>
    </section>
  );
}

/*
|--------------------------------------------------------------------------
| INFORMATION ROW
|--------------------------------------------------------------------------
*/

function InfoRow({ label, value, active = false }) {
  return (
    <div
      className="
        flex
        items-center
        justify-between
        gap-4
        rounded-xl
        border
        border-gray-100
        bg-[#F6F6F6]
        px-3
        py-3
      "
    >
      <span
        className="
          text-[9px]
          font-semibold
          text-gray-400
        "
      >
        {label}
      </span>

      <span
        className={`
          max-w-[60%]
          truncate
          text-right
          text-[9px]
          font-bold

          ${active ? "text-emerald-600" : "text-[#333333]"}
        `}
      >
        {value || "—"}
      </span>
    </div>
  );
}

/*
|--------------------------------------------------------------------------
| PREFERENCES
|--------------------------------------------------------------------------
*/

function Preferences() {
  const [language, setLanguage] = useState("English");

  const [currency, setCurrency] = useState("EUR");

  return (
    <section
      className="
        overflow-hidden
        rounded-[24px]
        border
        border-gray-200
        bg-white
        shadow-sm
      "
    >
      <div className="h-1 bg-[#D8B44C]" />

      <div className="p-5 sm:p-7">
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
            <FileText size={15} />
          </div>

          <h2
            className="
              text-[14px]
              font-black
              text-[#4B1825]
            "
          >
            Preferences
          </h2>
        </div>

        <p
          className="
            mt-2
            text-[9px]
            text-gray-400
          "
        >
          Customize your banking experience.
        </p>

        <div
          className="
            mt-5
            grid
            grid-cols-1
            gap-4
            sm:grid-cols-2
          "
        >
          {/* LANGUAGE */}

          <div>
            <label
              className="
                mb-1.5
                block
                text-[9px]
                font-extrabold
                uppercase
                tracking-wide
                text-gray-500
              "
            >
              Preferred Language
            </label>

            <div className="relative">
              <select
                value={language}
                onChange={(event) => setLanguage(event.target.value)}
                className="
                  h-[44px]
                  w-full
                  appearance-none
                  rounded-xl
                  border
                  border-gray-200
                  bg-white
                  px-3
                  pr-10
                  text-[10px]
                  font-semibold
                  text-[#333333]
                  outline-none
                  transition
                  focus:border-[#B31B34]
                  focus:ring-2
                  focus:ring-[#B31B34]/10
                "
              >
                <option>English</option>
                <option>French</option>
                <option>German</option>
                <option>Turkish</option>
                <option>Spanish</option>
              </select>

              <ChevronDown
                size={15}
                className="
                  pointer-events-none
                  absolute
                  right-3
                  top-1/2
                  -translate-y-1/2
                  text-gray-400
                "
              />
            </div>
          </div>

          {/* CURRENCY */}

          <div>
            <label
              className="
                mb-1.5
                block
                text-[9px]
                font-extrabold
                uppercase
                tracking-wide
                text-gray-500
              "
            >
              Default Currency
            </label>

            <div className="relative">
              <select
                value={currency}
                onChange={(event) => setCurrency(event.target.value)}
                className="
                  h-[44px]
                  w-full
                  appearance-none
                  rounded-xl
                  border
                  border-gray-200
                  bg-white
                  px-3
                  pr-10
                  text-[10px]
                  font-semibold
                  text-[#333333]
                  outline-none
                  transition
                  focus:border-[#B31B34]
                  focus:ring-2
                  focus:ring-[#B31B34]/10
                "
              >
                <option>EUR</option>
                <option>USD</option>
                <option>GBP</option>
                <option>GHS</option>
              </select>

              <ChevronDown
                size={15}
                className="
                  pointer-events-none
                  absolute
                  right-3
                  top-1/2
                  -translate-y-1/2
                  text-gray-400
                "
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/*
|--------------------------------------------------------------------------
| PROFILE CONTENT
|--------------------------------------------------------------------------
*/

function ProfileSettingsContent() {
  return (
    <div className="w-full">
      {/* BREADCRUMB */}

      <div
        className="
          mb-4
          flex
          items-center
          gap-2
          text-[9px]
          font-semibold
          text-gray-400
        "
      >
        <span>Dashboard</span>

        <ChevronRight size={12} />

        <span className="text-[#B31B34]">Profile Settings</span>
      </div>

      {/* PAGE TITLE */}

      <div className="mb-6">
        <div className="flex items-center gap-2">
          <div
            className="
              flex
              h-9
              w-9
              items-center
              justify-center
              rounded-xl
              bg-[#F7EDEF]
              text-[#B31B34]
            "
          >
            <User size={17} />
          </div>

          <h1
            className="
              text-[23px]
              font-black
              tracking-tight
              text-[#4B1825]
              sm:text-[27px]
            "
          >
            Profile Settings
          </h1>
        </div>

        <p
          className="
            mt-2
            max-w-[650px]
            text-[10px]
            leading-relaxed
            text-gray-500
            sm:text-[11px]
          "
        >
          Manage your personal information, banking details, security and
          account preferences.
        </p>
      </div>

      {/* PROFILE HEADER */}

      <ProfileHeader />

      {/* MAIN SETTINGS GRID */}

      <div
        className="
          mt-6
          grid
          grid-cols-1
          gap-6
          xl:grid-cols-[minmax(0,1fr)_350px]
        "
      >
        {/* LEFT */}

        <div className="space-y-6">
          <PersonalInformation />

          {/* Preferences kept available as part
              of the original settings structure */}

          <Preferences />
        </div>

        {/* RIGHT */}

        <div className="space-y-6">
          <SecuritySettings />

          <BankAccountInformation />
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

export default function ProfileSettingsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <main
      className="
        min-h-screen
        bg-[#F6F6F6]
        text-[#333333]
      "
    >
      {/* HEADER */}

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
        {/* SIDEBAR */}

        <Sidebar tab={"settings"} open={sidebarOpen} setOpen={setSidebarOpen} />

        {/* MAIN */}

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
              max-w-[1250px]
              px-4
              py-5
              sm:px-6
              sm:py-7
              lg:px-8
              lg:py-8
            "
          >
            <ProfileSettingsContent />
          </div>
        </div>
      </div>

      {/* MOBILE BOTTOM NAVIGATION */}

      <MobileNavigation tab={"settings"} />
    </main>
  );
}
