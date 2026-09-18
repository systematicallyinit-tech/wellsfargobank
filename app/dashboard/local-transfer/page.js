"use client";

import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

import {
  ChevronRight,
  Wallet,
  ArrowLeft,
  Building2,
  MapPin,
  Hash,
  CircleDollarSign,
  CheckCircle2,
  AlertCircle,
  User2,
  Landmark,
  ShieldCheck,
  Info,
} from "lucide-react";

import { useAuth } from "@/app/context/AuthContext";
import { DashboardHeader } from "../components/DashboardHeader";
import { MobileNavigation } from "../components/MobileNavigation";
import { Sidebar } from "../components/Sidebar";
import LoadingScreen from "@/app/loading";
import axios from "axios";

/*
|--------------------------------------------------------------------------
| Theme
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
| Reusable Form Input
|--------------------------------------------------------------------------
*/

function FormField({
  label,
  name,
  type = "text",
  placeholder,
  icon,
  formik,
  required = true,
}) {
  const hasError = formik.touched[name] && formik.errors[name];

  return (
    <div className="w-full">
      <label
        htmlFor={name}
        className="mb-2 block text-[12px] font-bold"
        style={{ color: THEME.text }}
      >
        {label}

        {required && (
          <span className="ml-1" style={{ color: THEME.primary }}>
            *
          </span>
        )}
      </label>

      <div className="relative">
        <span
          className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2"
          style={{
            color: hasError ? "#ef4444" : THEME.muted,
          }}
        >
          {icon}
        </span>

        <input
          id={name}
          name={name}
          type={type}
          placeholder={placeholder}
          value={formik.values[name]}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className={`
            h-[52px]
            w-full
            rounded-xl
            border
            bg-white
            pl-11
            pr-4
            text-[13px]
            text-gray-800
            outline-none
            transition-all
            duration-200
            placeholder:text-gray-400
            ${
              hasError
                ? "border-red-500 ring-2 ring-red-100"
                : "border-gray-200 focus:ring-2"
            }
          `}
          style={
            !hasError
              ? {
                  borderColor: THEME.border,
                  "--tw-ring-color": `${THEME.primary}20`,
                }
              : {}
          }
          onFocus={(e) => {
            if (!hasError) {
              e.currentTarget.style.borderColor = THEME.primary;
              e.currentTarget.style.boxShadow = `0 0 0 3px ${THEME.primary}18`;
            }
          }}
          onBlur={(e) => {
            formik.handleBlur(e);

            if (!hasError) {
              e.currentTarget.style.borderColor = THEME.border;
              e.currentTarget.style.boxShadow = "none";
            }
          }}
        />
      </div>

      {hasError && (
        <p className="mt-1.5 flex items-center gap-1 text-[10px] font-semibold text-red-500">
          <AlertCircle size={12} />
          {formik.errors[name]}
        </p>
      )}
    </div>
  );
}

/*
|--------------------------------------------------------------------------
| Section Header
|--------------------------------------------------------------------------
*/

function SectionHeader({ icon, title, description }) {
  return (
    <div className="mb-5 flex items-start gap-3">
      <div
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl"
        style={{
          backgroundColor: THEME.soft,
          color: THEME.primary,
        }}
      >
        {icon}
      </div>

      <div>
        <h3
          className="text-[14px] font-extrabold"
          style={{ color: THEME.text }}
        >
          {title}
        </h3>

        {description && (
          <p className="mt-1 text-[10px]" style={{ color: THEME.muted }}>
            {description}
          </p>
        )}
      </div>
    </div>
  );
}

/*
|--------------------------------------------------------------------------
| Transfer Form
|--------------------------------------------------------------------------
*/

function LocalTransferForm() {
  const { user } = useAuth();

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const formik = useFormik({
    initialValues: {
      beneficiaryBankName: "",
      beneficiaryAccountNumber: "",
      beneficiaryBankAddress: "",
      amount: "",
      routingNumber: "",
      description: "",
      beneficiaryName: "",
    },

    validationSchema: Yup.object({
      beneficiaryBankName: Yup.string()
        .trim()
        .min(2, "Bank name must be at least 2 characters")
        .required("Beneficiary bank name is required"),

      beneficiaryName: Yup.string()
        .trim()
        .min(2, "Name must be at least 2 characters")
        .required("Beneficiary name is required"),

      beneficiaryAccountNumber: Yup.string()
        .trim()
        .matches(/^[0-9]+$/, "Account number must contain only numbers")
        .min(6, "Account number is too short")
        .required("Beneficiary account number is required"),

      beneficiaryBankAddress: Yup.string()
        .trim()
        .min(5, "Please enter a valid bank address")
        .required("Beneficiary bank address is required"),

      amount: Yup.number()
        .typeError("Amount must be a valid number")
        .positive("Amount must be greater than zero")
        .required("Amount is required"),

      routingNumber: Yup.string()
        .trim()
        .matches(/^[0-9]+$/, "Routing number must contain only numbers")
        .min(6, "Routing number is too short")
        .required("Routing number is required"),

      description: Yup.string()
        .trim()
        .max(250, "Description cannot exceed 250 characters")
        .required("Description is required"),
    }),

    onSubmit: async (values, { setSubmitting, resetForm }) => {
      setLoading(true);
      setIsError(false);
      setErrorMessage("");

      try {
        const res = await axios.post(
          `/api/auth/users/transactions/new/transfer?userId=${user._id}`,
          {
            type: "Transfer",
            description: values.description,
            beneficiary: values.beneficiaryName,
            bank: values.beneficiaryBankName,
            account: values.beneficiaryAccountNumber,
            amount: values.amount,
          },
          {
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
            },
          },
        );

        if (res.status === 201) {
          setIsError(false);
          setLoading(false);
          setSubmitted(true);
        } else {
          setErrorMessage("Unable to process the transfer request.");
          setLoading(false);
          setIsError(true);
        }
      } catch (err) {
        setErrorMessage(
          err?.response?.data?.message ||
            err?.message ||
            "Something went wrong while processing the transfer.",
        );

        setLoading(false);
        setIsError(true);
      }

      setSubmitting(false);

      if (!isError) {
        resetForm();

        setTimeout(() => {
          setSubmitted(false);
        }, 20000);
      }
    },
  });

  return (
    <div className="w-full">
      {loading === true && <LoadingScreen />}

      {/* -------------------------------------------------------------- */}
      {/* PAGE HEADING */}
      {/* -------------------------------------------------------------- */}

      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div
            className="mb-2 flex items-center gap-2 text-[11px] font-semibold"
            style={{ color: THEME.muted }}
          >
            <span>Transfers</span>

            <ChevronRight size={13} />

            <span style={{ color: THEME.primary }}>
              Local Transfer
            </span>
          </div>

          <div className="flex items-center gap-3">
            <div
              className="hidden h-11 w-11 items-center justify-center rounded-xl sm:flex"
              style={{
                backgroundColor: THEME.soft,
                color: THEME.primary,
              }}
            >
              <ArrowLeft size={20} className="rotate-180" />
            </div>

            <div>
              <h1
                className="text-[22px] font-extrabold sm:text-[27px]"
                style={{ color: THEME.text }}
              >
                Local Money Transfer
              </h1>

              <p
                className="mt-1 max-w-[650px] text-[11px] leading-relaxed sm:text-[12px]"
                style={{ color: THEME.muted }}
              >
                Transfer money securely to a beneficiary account using
                the information below.
              </p>
            </div>
          </div>
        </div>

        {/* Back button */}

        <a
          href="/dashboard"
          onClick={() => window.history.back()}
          className="
            flex
            h-10
            w-fit
            items-center
            gap-2
            rounded-full
            border
            bg-white
            px-4
            text-[11px]
            font-bold
            transition-all
            duration-200
            hover:-translate-y-[1px]
          "
          style={{
            borderColor: THEME.border,
            color: THEME.text,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = THEME.soft;
            e.currentTarget.style.borderColor = `${THEME.primary}40`;
            e.currentTarget.style.color = THEME.primary;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "#fff";
            e.currentTarget.style.borderColor = THEME.border;
            e.currentTarget.style.color = THEME.text;
          }}
        >
          <ArrowLeft size={15} />
          Back
        </a>
      </div>

      {/* -------------------------------------------------------------- */}
      {/* SUCCESS NOTIFICATION */}
      {/* -------------------------------------------------------------- */}

      {submitted && (
        <div
          className="
            mb-5
            flex
            items-start
            gap-3
            rounded-2xl
            border
            p-4
          "
          style={{
            borderColor: "#bbf7d0",
            backgroundColor: "#f0fdf4",
            color: "#15803d",
          }}
        >
          <CheckCircle2 size={20} className="mt-0.5 shrink-0" />

          <div>
            <p className="text-[12px] font-extrabold">
              Transfer request submitted
            </p>

            <p className="mt-1 text-[10px]">
              Your transfer information has been submitted successfully.
            </p>
          </div>
        </div>
      )}

      {/* -------------------------------------------------------------- */}
      {/* MAIN CARD */}
      {/* -------------------------------------------------------------- */}

      <div
        className="
          overflow-hidden
          rounded-[24px]
          border
          bg-white
          shadow-[0_12px_40px_rgba(39,35,35,0.06)]
        "
        style={{
          borderColor: THEME.border,
        }}
      >
        {/* ------------------------------------------------------------ */}
        {/* CARD HEADER */}
        {/* ------------------------------------------------------------ */}

        <div
          className="
            relative
            overflow-hidden
            px-5
            py-6
            text-white
            sm:px-8
            sm:py-7
          "
          style={{
            background: `linear-gradient(135deg, ${THEME.dark} 0%, ${THEME.primary} 100%)`,
          }}
        >
          {/* Decorative elements */}

          <div
            className="
              absolute
              -right-16
              -top-24
              h-48
              w-48
              rounded-full
              border
            "
            style={{
              borderColor: `${THEME.gold}45`,
            }}
          />

          <div
            className="
              absolute
              -right-5
              -top-12
              h-32
              w-32
              rounded-full
              border
            "
            style={{
              borderColor: `${THEME.gold}35`,
            }}
          />

          <div className="relative flex items-center gap-4">
            <div
              className="
                flex
                h-12
                w-12
                shrink-0
                items-center
                justify-center
                rounded-2xl
                border
                border-white/20
                bg-white/10
              "
            >
              <Wallet size={22} />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-[15px] font-extrabold">
                  Beneficiary Transfer Details
                </h2>

                <span
                  className="
                    hidden
                    rounded-full
                    px-2
                    py-1
                    text-[8px]
                    font-bold
                    uppercase
                    tracking-wider
                    sm:inline-flex
                  "
                  style={{
                    backgroundColor: `${THEME.gold}25`,
                    color: "#fff",
                  }}
                >
                  Secure
                </span>
              </div>

              <p className="mt-1 text-[10px] text-white/75">
                Enter the recipient's banking information carefully.
              </p>
            </div>
          </div>
        </div>

        {/* ------------------------------------------------------------ */}
        {/* FORM */}
        {/* ------------------------------------------------------------ */}

        <form
          onSubmit={formik.handleSubmit}
          className="p-5 sm:p-8"
        >
          {/* ========================================================== */}
          {/* BENEFICIARY INFORMATION */}
          {/* ========================================================== */}

          <div className="mb-8">
            <SectionHeader
              icon={<Building2 size={17} />}
              title="Beneficiary Information"
              description="Provide the recipient's banking details."
            />

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              {/* Bank Name */}

              <FormField
                label="Beneficiary Bank Name"
                name="beneficiaryBankName"
                placeholder="Enter beneficiary bank name"
                icon={<Landmark size={17} />}
                formik={formik}
              />

              {/* Account Number */}

              <FormField
                label="Beneficiary Account Number"
                name="beneficiaryAccountNumber"
                type="text"
                placeholder="Enter account number"
                icon={<Hash size={17} />}
                formik={formik}
              />

              {/* Beneficiary Name */}

              <FormField
                label="Beneficiary Name"
                name="beneficiaryName"
                placeholder="Enter beneficiary name"
                icon={<User2 size={17} />}
                formik={formik}
              />

              {/* Bank Address */}

              <div className="md:col-span-2">
                <FormField
                  label="Beneficiary Bank Address"
                  name="beneficiaryBankAddress"
                  placeholder="Enter beneficiary bank address"
                  icon={<MapPin size={17} />}
                  formik={formik}
                />
              </div>
            </div>
          </div>

          {/* ========================================================== */}
          {/* DIVIDER */}
          {/* ========================================================== */}

          <div
            className="mb-8 h-px w-full"
            style={{ backgroundColor: THEME.border }}
          />

          {/* ========================================================== */}
          {/* TRANSFER INFORMATION */}
          {/* ========================================================== */}

          <div className="mb-7">
            <SectionHeader
              icon={<CircleDollarSign size={17} />}
              title="Transfer Information"
              description="Specify the amount and purpose of the transfer."
            />

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              {/* Amount */}

              <FormField
                label="Amount"
                name="amount"
                type="number"
                placeholder="0.00"
                icon={<CircleDollarSign size={17} />}
                formik={formik}
              />

              {/* Routing Number */}

              <FormField
                label="Routing Number"
                name="routingNumber"
                placeholder="Enter routing number"
                icon={<Hash size={17} />}
                formik={formik}
              />

              {/* Description */}

              <div className="md:col-span-2">
                <label
                  htmlFor="description"
                  className="mb-2 block text-[12px] font-bold"
                  style={{ color: THEME.text }}
                >
                  Description

                  <span
                    className="ml-1"
                    style={{ color: THEME.primary }}
                  >
                    *
                  </span>
                </label>

                <textarea
                  id="description"
                  name="description"
                  rows={4}
                  maxLength={250}
                  placeholder="Enter transfer description"
                  value={formik.values.description}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`
                    w-full
                    resize-none
                    rounded-xl
                    border
                    bg-white
                    px-4
                    py-3
                    text-[13px]
                    text-gray-800
                    outline-none
                    transition-all
                    placeholder:text-gray-400
                    ${
                      formik.touched.description &&
                      formik.errors.description
                        ? "border-red-500 ring-2 ring-red-100"
                        : "border-gray-200"
                    }
                  `}
                  onFocus={(e) => {
                    if (
                      !(
                        formik.touched.description &&
                        formik.errors.description
                      )
                    ) {
                      e.currentTarget.style.borderColor =
                        THEME.primary;

                      e.currentTarget.style.boxShadow = `0 0 0 3px ${THEME.primary}18`;
                    }
                  }}
                  onBlurCapture={(e) => {
                    if (
                      !(
                        formik.touched.description &&
                        formik.errors.description
                      )
                    ) {
                      e.currentTarget.style.borderColor =
                        THEME.border;

                      e.currentTarget.style.boxShadow = "none";
                    }
                  }}
                />

                <div className="mt-1 flex justify-between">
                  <div>
                    {formik.touched.description &&
                      formik.errors.description && (
                        <p className="flex items-center gap-1 text-[10px] font-semibold text-red-500">
                          <AlertCircle size={12} />
                          {formik.errors.description}
                        </p>
                      )}
                  </div>

                  <span
                    className="text-[9px]"
                    style={{ color: THEME.muted }}
                  >
                    {formik.values.description.length}/250
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* ========================================================== */}
          {/* INFORMATION NOTICE */}
          {/* ========================================================== */}

          {!submitted && (
            <div
              className="
                mb-7
                flex
                items-start
                gap-3
                rounded-2xl
                border
                p-4
              "
              style={{
                borderColor: `${THEME.primary}20`,
                backgroundColor: THEME.soft,
              }}
            >
              <div
                className="
                  flex
                  h-8
                  w-8
                  shrink-0
                  items-center
                  justify-center
                  rounded-full
                "
                style={{
                  backgroundColor: `${THEME.primary}12`,
                  color: THEME.primary,
                }}
              >
                <Info size={16} />
              </div>

              <div>
                <p
                  className="text-[11px] font-extrabold"
                  style={{ color: THEME.text }}
                >
                  Review transfer details
                </p>

                <p
                  className="mt-1 text-[10px] leading-relaxed"
                  style={{ color: THEME.muted }}
                >
                  Please verify the beneficiary bank name, account
                  number and routing number before submitting the
                  transfer. Incorrect information may result in
                  processing delays or failed transfers.
                </p>
              </div>
            </div>
          )}

          {/* ========================================================== */}
          {/* SECURITY FOOTER */}
          {/* ========================================================== */}

          <div
            className="
              mb-6
              flex
              items-center
              gap-2
              border-t
              pt-4
            "
            style={{ borderColor: THEME.border }}
          >
            <ShieldCheck
              size={15}
              style={{ color: THEME.gold }}
            />

            <p
              className="text-[9px]"
              style={{ color: THEME.muted }}
            >
              Your transfer information is protected by Wells Fargo
              security systems.
            </p>
          </div>

          {/* ========================================================== */}
          {/* BUTTONS */}
          {/* ========================================================== */}

          <div
            className="
              flex
              flex-col-reverse
              gap-3
              sm:flex-row
              sm:justify-end
            "
          >
            <button
              type="button"
              onClick={() => formik.resetForm()}
              className="
                h-[48px]
                rounded-full
                border
                bg-white
                px-7
                text-[12px]
                font-extrabold
                transition-all
                duration-200
                hover:bg-gray-50
                sm:min-w-[130px]
              "
              style={{
                borderColor: THEME.border,
                color: THEME.muted,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = `${THEME.primary}45`;
                e.currentTarget.style.color = THEME.primary;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = THEME.border;
                e.currentTarget.style.color = THEME.muted;
              }}
            >
              Clear
            </button>

            <button
              type="submit"
              disabled={formik.isSubmitting}
              className="
                flex
                h-[48px]
                items-center
                justify-center
                gap-2
                rounded-full
                px-7
                text-[12px]
                font-extrabold
                text-white
                shadow-sm
                transition-all
                duration-200
                hover:-translate-y-[1px]
                disabled:cursor-not-allowed
                disabled:opacity-60
                sm:min-w-[190px]
              "
              style={{
                backgroundColor: THEME.primary,
              }}
              onMouseEnter={(e) => {
                if (!formik.isSubmitting) {
                  e.currentTarget.style.backgroundColor =
                    THEME.dark;
                  e.currentTarget.style.boxShadow = `0 8px 20px ${THEME.primary}30`;
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor =
                  THEME.primary;
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              {formik.isSubmitting
                ? "Processing..."
                : "Continue Transfer"}

              {!formik.isSubmitting && (
                <ChevronRight size={16} />
              )}
            </button>
          </div>
        </form>
      </div>

      {/* -------------------------------------------------------------- */}
      {/* ERROR MODAL */}
      {/* -------------------------------------------------------------- */}

      {isError === true && (
        <div
          className="
            fixed
            inset-0
            z-[9999]
            flex
            h-full
            w-full
            items-center
            justify-center
            bg-black/50
            p-5
            backdrop-blur-[2px]
          "
        >
          <div
            className="
              flex
              h-fit
              w-full
              flex-col
              items-center
              space-y-4
              rounded-[22px]
              bg-white
              px-5
              py-6
              shadow-2xl
              duration-300
              md:w-96
            "
          >
            {/* Icon */}

            <div
              className="
                flex
                h-16
                w-16
                items-center
                justify-center
                rounded-full
              "
              style={{
                backgroundColor: THEME.soft,
                color: THEME.primary,
              }}
            >
              <AlertCircle size={32} />
            </div>

            <h1
              className="text-center text-lg font-extrabold"
              style={{ color: THEME.text }}
            >
              Notice!
            </h1>

            <p
              className="px-3 text-center text-xs leading-relaxed"
              style={{ color: THEME.muted }}
            >
              {errorMessage}
            </p>

            <button
              type="button"
              onClick={() => setIsError(false)}
              className="
                w-full
                rounded-xl
                py-3
                text-center
                text-[12px]
                font-extrabold
                text-white
                transition-all
              "
              style={{
                backgroundColor: THEME.primary,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor =
                  THEME.dark;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor =
                  THEME.primary;
              }}
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
| Page
|--------------------------------------------------------------------------
*/

export default function TransferPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <main
      className="
        min-h-screen
        text-gray-900
      "
      style={{
        backgroundColor: THEME.background,
      }}
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

        <Sidebar
          tab={"local"}
          tab2={"transfer"}
          open={sidebarOpen}
          setOpen={setSidebarOpen}
        />

        {/* MAIN CONTENT */}

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
              max-w-[1100px]
              px-4
              py-5
              sm:px-6
              sm:py-7
              lg:px-8
              lg:py-8
            "
          >
            <LocalTransferForm />
          </div>
        </div>
      </div>

      {/* MOBILE NAVIGATION */}

      <MobileNavigation tab={"transfer"} />
    </main>
  );
}