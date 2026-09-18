"use client";

import { useEffect, useState } from "react";
import {
  AlertCircle,
  ArrowDownLeft,
  ArrowUpRight,
  CalendarDays,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Building2,
  Download,
  Eye,
  FileText,
  Filter,
  RefreshCw,
  Search,
  X,
} from "lucide-react";

import { useAuth } from "@/app/context/AuthContext";
import { DashboardHeader } from "../components/DashboardHeader";
import { Sidebar } from "../components/Sidebar";
import { MobileNavigation } from "../components/MobileNavigation";
import axios from "axios";
import LoadingScreen from "@/app/loading";

/*
|--------------------------------------------------------------------------
| COLOR PALETTE
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
| Status Badge
|--------------------------------------------------------------------------
*/

function StatusBadge({ status }) {
  const styles = {
    Successful:
      "bg-emerald-50 text-emerald-700 border-emerald-200",
    Pending:
      "bg-amber-50 text-amber-700 border-amber-200",
    Failed:
      "bg-red-50 text-[#B31B34] border-red-200",
  };

  const dots = {
    Successful: "bg-emerald-500",
    Pending: "bg-amber-500",
    Failed: "bg-[#B31B34]",
  };

  return (
    <span
      className={`
        inline-flex items-center
        rounded-full border
        px-2.5 py-1
        text-[9px] font-extrabold
        whitespace-nowrap
        ${styles[status] || "bg-gray-50 text-gray-600 border-gray-200"}
      `}
    >
      <span
        className={`
          mr-1.5 h-1.5 w-1.5
          rounded-full
          ${dots[status] || "bg-gray-400"}
        `}
      />

      {status}
    </span>
  );
}

/*
|--------------------------------------------------------------------------
| Transaction Type Icon
|--------------------------------------------------------------------------
*/

function TransactionIcon({ direction, type }) {
  let iconStyle =
    "bg-[#F7EDEF] text-[#B31B34]";

  if (direction === "in") {
    iconStyle = "bg-emerald-50 text-emerald-600";
  } else if (type === "Payment") {
    iconStyle = "bg-[#FBF5E6] text-[#9A7A16]";
  }

  return (
    <div
      className={`
        flex h-10 w-10 shrink-0
        items-center justify-center
        rounded-xl
        ${iconStyle}
      `}
    >
      {direction === "in" ? (
        <ArrowDownLeft size={17} />
      ) : (
        <ArrowUpRight size={17} />
      )}
    </div>
  );
}

/*
|--------------------------------------------------------------------------
| Transaction Details Modal
|--------------------------------------------------------------------------
*/

function TransactionModal({ transaction, close }) {
  if (!transaction) {
    return null;
  }

  return (
    <div
      className="
        fixed inset-0 z-[100]
        flex items-center justify-center
        bg-[#4B1825]/60
        backdrop-blur-sm
        p-4
      "
    >
      <div
        className="
          w-full max-w-[520px]
          overflow-hidden
          rounded-[24px]
          border border-white/20
          bg-white
          shadow-2xl
        "
      >
        {/* Modal Header */}

        <div
          className="
            flex items-center justify-between
            border-b border-gray-100
            bg-[#4B1825]
            px-5 py-5
          "
        >
          <div className="min-w-0 pr-4">
            <div className="mb-1 flex items-center gap-2">
              <div className="h-1.5 w-1.5 rounded-full bg-[#D8B44C]" />

              <p
                className="
                  text-[9px] font-bold
                  uppercase tracking-[0.16em]
                  text-white/60
                "
              >
                Transaction details
              </p>
            </div>

            <h3
              className="
                truncate
                text-[16px]
                font-extrabold
                text-white
              "
            >
              {transaction.description}
            </h3>
          </div>

          <button
            onClick={close}
            type="button"
            className="
              flex h-9 w-9 shrink-0
              items-center justify-center
              rounded-full
              bg-white/10
              text-white
              transition
              hover:bg-white/20
            "
          >
            <X size={18} />
          </button>
        </div>

        {/* Amount */}

        <div className="p-5">
          <div
            className="
              mb-6 overflow-hidden
              rounded-2xl
              border border-[#E9D8DC]
              bg-[#F7EDEF]
            "
          >
            <div className="h-1 bg-[#D8B44C]" />

            <div
              className="
                flex items-center
                justify-between
                gap-4
                p-4
              "
            >
              <div className="flex min-w-0 items-center gap-3">
                <TransactionIcon
                  direction={transaction.direction}
                  type={transaction.type}
                />

                <div className="min-w-0">
                  <p
                    className="
                      text-[9px]
                      font-bold
                      uppercase
                      tracking-wide
                      text-gray-400
                    "
                  >
                    Amount
                  </p>

                  <p
                    className="
                      mt-1
                      text-[20px]
                      font-black
                      tracking-tight
                      text-[#4B1825]
                    "
                  >
                    $
                    {Number(transaction.amount || 0).toLocaleString()}
                  </p>
                </div>
              </div>

              <StatusBadge status={transaction.status} />
            </div>
          </div>

          {/* Details */}

          <div className="space-y-1">
            <DetailRow
              label="Transaction ID"
              value={transaction.id}
            />

            <DetailRow
              label="Date"
              value={`${transaction.date} • ${transaction.time}`}
            />

            <DetailRow
              label="Sender Details"
              value={`${transaction.senderFullname} | ${transaction.senderAccountNumber}`}
            />

            <DetailRow
              label="Recipient Name"
              value={transaction.beneficiary}
            />

            <DetailRow
              label="Recipient Bank"
              value={transaction.bank}
            />

            <DetailRow
              label="Recipient Account No."
              value={transaction.account}
            />

            <DetailRow
              label="Currency"
              value={transaction.currency}
            />
          </div>
        </div>

        {/* Footer */}

        <div
          className="
            border-t border-gray-100
            bg-[#F6F6F6]
            px-5 py-4
          "
        >
          <button
            onClick={close}
            type="button"
            className="
              h-11 w-full
              rounded-xl
              bg-[#B31B34]
              text-[10px]
              font-extrabold
              uppercase
              tracking-wide
              text-white
              shadow-sm
              transition
              hover:bg-[#8F1428]
            "
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

/*
|--------------------------------------------------------------------------
| Detail Row
|--------------------------------------------------------------------------
*/

function DetailRow({ label, value }) {
  return (
    <div
      className="
        flex items-start
        justify-between
        gap-5
        border-b border-gray-100
        py-3
        last:border-0
      "
    >
      <span
        className="
          shrink-0
          text-[9px]
          font-bold
          uppercase
          tracking-wide
          text-gray-400
        "
      >
        {label}
      </span>

      <span
        className="
          max-w-[65%]
          text-right
          break-words
          text-[10px]
          font-bold
          leading-relaxed
          text-[#333333]
        "
      >
        {value || "—"}
      </span>
    </div>
  );
}

/*
|--------------------------------------------------------------------------
| Mobile Transaction Card
|--------------------------------------------------------------------------
*/

function MobileTransactionCard({ transaction, onView }) {
  return (
    <div
      className="
        overflow-hidden
        rounded-[20px]
        border border-gray-200
        bg-white
        shadow-sm
        transition
        hover:border-[#D9B6BE]
      "
    >
      <div className="h-1 bg-[#B31B34]" />

      <div className="p-4">
        {/* Top */}

        <div
          className="
            flex items-start
            justify-between
            gap-3
          "
        >
          <div className="flex min-w-0 gap-3">
            <TransactionIcon
              direction={transaction.direction}
              type={transaction.type}
            />

            <div className="min-w-0">
              <p
                className="
                  truncate
                  text-[12px]
                  font-extrabold
                  text-[#333333]
                "
              >
                {transaction.description}
              </p>

              <p
                className="
                  mt-1 truncate
                  text-[10px]
                  text-gray-400
                "
              >
                {transaction.beneficiary}
              </p>
            </div>
          </div>

          <StatusBadge status={transaction.status} />
        </div>

        {/* Middle */}

        <div
          className="
            mt-4 grid grid-cols-2
            gap-3
            border-t border-gray-100
            pt-4
          "
        >
          <div>
            <div className="mb-1 flex items-center gap-1.5">
              <CalendarDays
                size={11}
                className="text-[#B31B34]"
              />

              <p
                className="
                  text-[8px]
                  font-extrabold
                  uppercase
                  tracking-wide
                  text-gray-400
                "
              >
                Date
              </p>
            </div>

            <p
              className="
                text-[10px]
                font-bold
                text-[#333333]
              "
            >
              {transaction.date}
            </p>
          </div>

          <div>
            <div className="mb-1 flex items-center gap-1.5">
              <Building2
                size={11}
                className="text-[#B31B34]"
              />

              <p
                className="
                  text-[8px]
                  font-extrabold
                  uppercase
                  tracking-wide
                  text-gray-400
                "
              >
                Bank
              </p>
            </div>

            <p
              className="
                truncate
                text-[10px]
                font-bold
                text-[#333333]
              "
            >
              {transaction.bank}
            </p>
          </div>
        </div>

        {/* Bottom */}

        <div
          className="
            mt-4 flex items-center
            justify-between
            border-t border-gray-100
            pt-4
          "
        >
          <div>
            <p
              className="
                text-[8px]
                font-extrabold
                uppercase
                tracking-wide
                text-gray-400
              "
            >
              Amount
            </p>

            <p
              className={`
                mt-1
                text-[15px]
                font-black
                tracking-tight

                ${
                  transaction.direction === "in"
                    ? "text-emerald-600"
                    : "text-[#4B1825]"
                }
              `}
            >
              {transaction.direction === "in" ? "+" : "-"}$
              {Number(transaction.amount || 0).toLocaleString()}
            </p>
          </div>

          <button
            onClick={() => onView(transaction)}
            type="button"
            className="
              flex h-9
              items-center gap-1.5
              rounded-xl
              border border-[#E4D2D6]
              bg-[#F7EDEF]
              px-3
              text-[9px]
              font-extrabold
              text-[#B31B34]
              transition
              hover:bg-[#EFDDE1]
            "
          >
            <Eye size={14} />
            Details
          </button>
        </div>
      </div>
    </div>
  );
}

/*
|--------------------------------------------------------------------------
| Transaction History
|--------------------------------------------------------------------------
*/

function TransactionHistory() {
  // Fetched transactions
  const [loading, setLoading] = useState(false);

  const { user } = useAuth();

  const [errorMessage, setErrorMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [transactions, setTransactions] = useState([]);

  /*
  |--------------------------------------------------------------------------
  | Fetch Transactions
  |--------------------------------------------------------------------------
  */

  useEffect(() => {
    if (!user?._id) return;

    const fetchData = async () => {
      try {
        setLoading(true);

        const res = await axios.get(
          `/api/auth/users/transactions/tran?queryUserId=${user._id}`
        );

        setTransactions(res.data.transactions || []);
        setIsError(false);
        setLoading(false);
      } catch (err) {
        console.error(err);

        setErrorMessage("Failed to load transactions");
        setIsError(true);
        setLoading(false);
      }
    };

    fetchData();
  }, [user]);

  /*
  |--------------------------------------------------------------------------
  | Filters
  |--------------------------------------------------------------------------
  */

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [typeFilter, setTypeFilter] = useState("All");

  const [selectedTransaction, setSelectedTransaction] =
    useState(null);

  /*
  |--------------------------------------------------------------------------
  | Pagination
  |--------------------------------------------------------------------------
  */

  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 7;

  /*
  |--------------------------------------------------------------------------
  | Filtering
  |--------------------------------------------------------------------------
  */

  const filteredTransactions = transactions.filter(
    (transaction) => {
      const search = searchTerm.toLowerCase();

      const matchesSearch =
        (transaction.description || "")
          .toLowerCase()
          .includes(search) ||
        (transaction.beneficiary || "")
          .toLowerCase()
          .includes(search) ||
        (transaction.bank || "")
          .toLowerCase()
          .includes(search) ||
        (transaction.id || "")
          .toLowerCase()
          .includes(search);

      const matchesStatus =
        statusFilter === "All" ||
        transaction.status === statusFilter;

      const matchesType =
        typeFilter === "All" ||
        transaction.type === typeFilter;

      return matchesSearch && matchesStatus && matchesType;
    }
  );

  /*
  |--------------------------------------------------------------------------
  | Pagination
  |--------------------------------------------------------------------------
  */

  const totalPages = Math.ceil(
    filteredTransactions.length / itemsPerPage
  );

  const safeCurrentPage = Math.min(
    currentPage,
    Math.max(totalPages, 1)
  );

  const startIndex =
    (safeCurrentPage - 1) * itemsPerPage;

  const displayedTransactions =
    filteredTransactions.slice(
      startIndex,
      startIndex + itemsPerPage
    );

  /*
  |--------------------------------------------------------------------------
  | Summary
  |--------------------------------------------------------------------------
  */

  const successful = transactions.filter(
    (item) => item.status === "Successful"
  ).length;

  const pending = transactions.filter(
    (item) => item.status === "Pending"
  ).length;

  const failed = transactions.filter(
    (item) => item.status === "Failed"
  ).length;

  /*
  |--------------------------------------------------------------------------
  | Reset
  |--------------------------------------------------------------------------
  */

  const resetFilters = () => {
    setSearchTerm("");
    setStatusFilter("All");
    setTypeFilter("All");
    setCurrentPage(1);
  };

  /*
  |--------------------------------------------------------------------------
  | UI
  |--------------------------------------------------------------------------
  */

  return (
    <div className="w-full">
      {loading === true && <LoadingScreen />}

      {/* Error */}

      {isError && (
        <div
          className="
            mb-5 flex items-center
            gap-3 rounded-2xl
            border border-red-200
            bg-red-50
            px-4 py-3
          "
        >
          <AlertCircle
            size={17}
            className="shrink-0 text-[#B31B34]"
          />

          <div>
            <p
              className="
                text-[10px]
                font-extrabold
                text-[#8F1428]
              "
            >
              Unable to load transactions
            </p>

            <p
              className="
                mt-0.5 text-[9px]
                text-red-600
              "
            >
              {errorMessage}
            </p>
          </div>
        </div>
      )}

      {/* Page Heading */}

      <div
        className="
          mb-6
          flex flex-col
          gap-5
          lg:flex-row
          lg:items-end
          lg:justify-between
        "
      >
        <div>
          <div
            className="
              mb-2 flex items-center
              gap-2
              text-[9px]
              font-bold
              uppercase
              tracking-[0.12em]
              text-gray-400
            "
          >
            <span>Payments</span>

            <ChevronRight size={12} />

            <span className="text-[#B31B34]">
              Transaction History
            </span>
          </div>

          <h1
            className="
              text-[25px]
              font-black
              tracking-tight
              text-[#4B1825]
              sm:text-[29px]
            "
          >
            Transaction History
          </h1>

          <p
            className="
              mt-1.5
              max-w-[600px]
              text-[10px]
              leading-relaxed
              text-gray-500
              sm:text-[11px]
            "
          >
            View and manage your recent bank transactions.
          </p>
        </div>

        <button
          type="button"
          className="
            group
            flex h-11 w-fit
            items-center gap-2
            rounded-xl
            bg-[#B31B34]
            px-4
            text-[9px]
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
          <Download
            size={15}
            className="transition group-hover:-translate-y-0.5"
          />

          Export Transactions
        </button>
      </div>

      {/* Summary Cards */}

      <div
        className="
          mb-6 grid
          grid-cols-1
          gap-3
          sm:grid-cols-3
        "
      >
        {/* Successful */}

        <div
          className="
            relative overflow-hidden
            rounded-[20px]
            border border-gray-200
            bg-white
            p-4
            shadow-sm
          "
        >
          <div className="absolute right-0 top-0 h-16 w-16 rounded-bl-full bg-emerald-50" />

          <div className="relative flex items-center gap-3">
            <div
              className="
                flex h-11 w-11
                items-center justify-center
                rounded-xl
                bg-emerald-50
                text-emerald-600
              "
            >
              <ArrowDownLeft size={19} />
            </div>

            <div>
              <p
                className="
                  text-[9px]
                  font-bold
                  uppercase
                  tracking-wide
                  text-gray-400
                "
              >
                Successful
              </p>

              <p
                className="
                  mt-1
                  text-[21px]
                  font-black
                  text-[#333333]
                "
              >
                {successful}
              </p>
            </div>
          </div>
        </div>

        {/* Pending */}

        <div
          className="
            relative overflow-hidden
            rounded-[20px]
            border border-gray-200
            bg-white
            p-4
            shadow-sm
          "
        >
          <div className="absolute right-0 top-0 h-16 w-16 rounded-bl-full bg-[#FBF5E6]" />

          <div className="relative flex items-center gap-3">
            <div
              className="
                flex h-11 w-11
                items-center justify-center
                rounded-xl
                bg-[#FBF5E6]
                text-[#9A7A16]
              "
            >
              <RefreshCw size={19} />
            </div>

            <div>
              <p
                className="
                  text-[9px]
                  font-bold
                  uppercase
                  tracking-wide
                  text-gray-400
                "
              >
                Pending
              </p>

              <p
                className="
                  mt-1
                  text-[21px]
                  font-black
                  text-[#333333]
                "
              >
                {pending}
              </p>
            </div>
          </div>
        </div>

        {/* Failed */}

        <div
          className="
            relative overflow-hidden
            rounded-[20px]
            border border-gray-200
            bg-white
            p-4
            shadow-sm
          "
        >
          <div className="absolute right-0 top-0 h-16 w-16 rounded-bl-full bg-[#F7EDEF]" />

          <div className="relative flex items-center gap-3">
            <div
              className="
                flex h-11 w-11
                items-center justify-center
                rounded-xl
                bg-[#F7EDEF]
                text-[#B31B34]
              "
            >
              <AlertCircle size={19} />
            </div>

            <div>
              <p
                className="
                  text-[9px]
                  font-bold
                  uppercase
                  tracking-wide
                  text-gray-400
                "
              >
                Failed
              </p>

              <p
                className="
                  mt-1
                  text-[21px]
                  font-black
                  text-[#333333]
                "
              >
                {failed}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Transaction Card */}

      <div
        className="
          overflow-hidden
          rounded-[24px]
          border border-gray-200
          bg-white
          shadow-sm
        "
      >
        {/* Header */}

        <div
          className="
            border-b border-gray-100
            px-5 py-5
            sm:px-6
          "
        >
          <div
            className="
              flex flex-col
              gap-4
              lg:flex-row
              lg:items-center
              lg:justify-between
            "
          >
            <div>
              <div className="flex items-center gap-2">
                <div
                  className="
                    flex h-7 w-7
                    items-center justify-center
                    rounded-lg
                    bg-[#F7EDEF]
                    text-[#B31B34]
                  "
                >
                  <FileText size={14} />
                </div>

                <h2
                  className="
                    text-[14px]
                    font-black
                    text-[#4B1825]
                  "
                >
                  Recent Transactions
                </h2>
              </div>

              <p
                className="
                  mt-2
                  text-[9px]
                  text-gray-400
                "
              >
                Showing {filteredTransactions.length}{" "}
                transactions
              </p>
            </div>

            <button
              type="button"
              onClick={resetFilters}
              className="
                flex h-9 w-fit
                items-center gap-1.5
                rounded-xl
                border border-[#E4D2D6]
                bg-[#F7EDEF]
                px-3
                text-[9px]
                font-extrabold
                text-[#B31B34]
                transition
                hover:bg-[#EFDDE1]
              "
            >
              <RefreshCw size={13} />

              Reset
            </button>
          </div>

          {/* Filters */}

          <div
            className="
              mt-5 grid
              grid-cols-1
              gap-3
              sm:grid-cols-2
              lg:grid-cols-4
            "
          >
            {/* Search */}

            <div
              className="
                relative
                sm:col-span-2
                lg:col-span-2
              "
            >
              <Search
                size={15}
                className="
                  absolute left-3
                  top-1/2
                  -translate-y-1/2
                  text-gray-400
                "
              />

              <input
                type="text"
                value={searchTerm}
                onChange={(event) => {
                  setSearchTerm(event.target.value);
                  setCurrentPage(1);
                }}
                placeholder="Search transaction, beneficiary or bank"
                className="
                  h-11 w-full
                  rounded-xl
                  border border-gray-200
                  bg-[#F6F6F6]
                  pl-9 pr-3
                  text-[10px]
                  font-medium
                  text-[#333333]
                  outline-none
                  placeholder:text-gray-400
                  transition
                  focus:border-[#B31B34]
                  focus:bg-white
                  focus:ring-2
                  focus:ring-[#B31B34]/10
                "
              />
            </div>

            {/* Status */}

            <div className="relative">
              <Filter
                size={14}
                className="
                  pointer-events-none
                  absolute left-3
                  top-1/2
                  -translate-y-1/2
                  text-[#B31B34]
                "
              />

              <select
                value={statusFilter}
                onChange={(event) => {
                  setStatusFilter(event.target.value);
                  setCurrentPage(1);
                }}
                className="
                  h-11 w-full
                  appearance-none
                  rounded-xl
                  border border-gray-200
                  bg-[#F6F6F6]
                  pl-9 pr-8
                  text-[10px]
                  font-bold
                  text-[#333333]
                  outline-none
                  transition
                  focus:border-[#B31B34]
                  focus:bg-white
                  focus:ring-2
                  focus:ring-[#B31B34]/10
                "
              >
                <option value="All">All Statuses</option>
                <option value="Successful">Successful</option>
                <option value="Pending">Pending</option>
                <option value="Failed">Failed</option>
              </select>

              <ChevronDown
                size={14}
                className="
                  pointer-events-none
                  absolute right-3
                  top-1/2
                  -translate-y-1/2
                  text-gray-400
                "
              />
            </div>

            {/* Type */}

            <div className="relative">
              <FileText
                size={14}
                className="
                  pointer-events-none
                  absolute left-3
                  top-1/2
                  -translate-y-1/2
                  text-[#B31B34]
                "
              />

              <select
                value={typeFilter}
                onChange={(event) => {
                  setTypeFilter(event.target.value);
                  setCurrentPage(1);
                }}
                className="
                  h-11 w-full
                  appearance-none
                  rounded-xl
                  border border-gray-200
                  bg-[#F6F6F6]
                  pl-9 pr-8
                  text-[10px]
                  font-bold
                  text-[#333333]
                  outline-none
                  transition
                  focus:border-[#B31B34]
                  focus:bg-white
                  focus:ring-2
                  focus:ring-[#B31B34]/10
                "
              >
                <option value="All">All Types</option>
                <option value="Transfer">Transfer</option>
                <option value="Deposit">Deposit</option>
                <option value="Payment">Payment</option>
              </select>

              <ChevronDown
                size={14}
                className="
                  pointer-events-none
                  absolute right-3
                  top-1/2
                  -translate-y-1/2
                  text-gray-400
                "
              />
            </div>
          </div>
        </div>

        {/* ==================================================
            DESKTOP / TABLET TABLE
        ================================================== */}

        <div
          className="
            hidden
            overflow-x-auto
            md:block
          "
        >
          <table className="w-full min-w-[900px]">
            <thead>
              <tr
                className="
                  border-b border-gray-100
                  bg-[#F6F6F6]
                "
              >
                <th className="px-5 py-3 text-left text-[8px] font-black uppercase tracking-[0.12em] text-gray-400">
                  Transaction
                </th>

                <th className="px-4 py-3 text-left text-[8px] font-black uppercase tracking-[0.12em] text-gray-400">
                  Beneficiary
                </th>

                <th className="px-4 py-3 text-left text-[8px] font-black uppercase tracking-[0.12em] text-gray-400">
                  Bank
                </th>

                <th className="px-4 py-3 text-left text-[8px] font-black uppercase tracking-[0.12em] text-gray-400">
                  Date
                </th>

                <th className="px-4 py-3 text-right text-[8px] font-black uppercase tracking-[0.12em] text-gray-400">
                  Amount
                </th>

                <th className="px-4 py-3 text-center text-[8px] font-black uppercase tracking-[0.12em] text-gray-400">
                  Status
                </th>

                <th className="px-5 py-3 text-right text-[8px] font-black uppercase tracking-[0.12em] text-gray-400">
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              {displayedTransactions.map((transaction) => (
                <tr
                  key={transaction.id}
                  className="
                    border-b border-gray-100
                    transition
                    hover:bg-[#F7EDEF]/40
                  "
                >
                  {/* Transaction */}

                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <TransactionIcon
                        direction={transaction.direction}
                        type={transaction.type}
                      />

                      <div className="min-w-0">
                        <p
                          className="
                            max-w-[190px]
                            truncate
                            text-[10px]
                            font-extrabold
                            text-[#333333]
                          "
                        >
                          {transaction.description}
                        </p>

                        <p
                          className="
                            mt-1
                            text-[8px]
                            text-gray-400
                          "
                        >
                          {transaction.id}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Beneficiary */}

                  <td className="px-4 py-4">
                    <p
                      className="
                        text-[10px]
                        font-bold
                        text-[#333333]
                      "
                    >
                      {transaction.beneficiary}
                    </p>

                    <p
                      className="
                        mt-1
                        text-[8px]
                        text-gray-400
                      "
                    >
                      {transaction.account}
                    </p>
                  </td>

                  {/* Bank */}

                  <td className="px-4 py-4">
                    <div className="flex items-center gap-2">
                      <div
                        className="
                          flex h-7 w-7
                          items-center justify-center
                          rounded-lg
                          bg-[#F7EDEF]
                          text-[#B31B34]
                        "
                      >
                        <Building2 size={13} />
                      </div>

                      <span
                        className="
                          max-w-[130px]
                          truncate
                          text-[9px]
                          font-bold
                          text-[#333333]
                        "
                      >
                        {transaction.bank}
                      </span>
                    </div>
                  </td>

                  {/* Date */}

                  <td className="px-4 py-4">
                    <p
                      className="
                        text-[9px]
                        font-bold
                        text-[#333333]
                      "
                    >
                      {transaction.date}
                    </p>

                    <p
                      className="
                        mt-1
                        text-[8px]
                        text-gray-400
                      "
                    >
                      {transaction.time}
                    </p>
                  </td>

                  {/* Amount */}

                  <td className="px-4 py-4 text-right">
                    <p
                      className={`
                        text-[11px]
                        font-black

                        ${
                          transaction.direction === "in"
                            ? "text-emerald-600"
                            : "text-[#4B1825]"
                        }
                      `}
                    >
                      {transaction.direction === "in"
                        ? "+"
                        : "-"}
                      $
                      {Number(
                        transaction.amount || 0
                      ).toLocaleString()}
                    </p>

                    <p
                      className="
                        mt-1
                        text-[8px]
                        font-semibold
                        text-gray-400
                      "
                    >
                      {transaction.currency}
                    </p>
                  </td>

                  {/* Status */}

                  <td className="px-4 py-4 text-center">
                    <StatusBadge
                      status={transaction.status}
                    />
                  </td>

                  {/* Action */}

                  <td className="px-5 py-4 text-right">
                    <button
                      type="button"
                      onClick={() =>
                        setSelectedTransaction(
                          transaction
                        )
                      }
                      className="
                        inline-flex
                        h-8 w-8
                        items-center
                        justify-center
                        rounded-xl
                        border border-[#E4D2D6]
                        bg-[#F7EDEF]
                        text-[#B31B34]
                        transition
                        hover:bg-[#B31B34]
                        hover:text-white
                      "
                      title="View transaction"
                    >
                      <Eye size={14} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Empty State */}

          {displayedTransactions.length === 0 && (
            <div
              className="
                flex min-h-[250px]
                flex-col items-center
                justify-center
                px-5 text-center
              "
            >
              <div
                className="
                  mb-4 flex h-14 w-14
                  items-center justify-center
                  rounded-2xl
                  bg-[#F7EDEF]
                  text-[#B31B34]
                "
              >
                <FileText size={22} />
              </div>

              <p
                className="
                  text-[12px]
                  font-black
                  text-[#333333]
                "
              >
                No transactions found
              </p>

              <p
                className="
                  mt-1
                  text-[9px]
                  text-gray-400
                "
              >
                Try changing your search or filters.
              </p>
            </div>
          )}
        </div>

        {/* ==================================================
            MOBILE CARDS
        ================================================== */}

        <div
          className="
            space-y-3
            bg-[#F6F6F6]
            p-4
            md:hidden
          "
        >
          {displayedTransactions.map((transaction) => (
            <MobileTransactionCard
              key={transaction.id}
              transaction={transaction}
              onView={setSelectedTransaction}
            />
          ))}

          {displayedTransactions.length === 0 && (
            <div
              className="
                flex min-h-[220px]
                flex-col items-center
                justify-center
                text-center
              "
            >
              <div
                className="
                  mb-3 flex h-12 w-12
                  items-center justify-center
                  rounded-2xl
                  bg-[#F7EDEF]
                  text-[#B31B34]
                "
              >
                <FileText size={21} />
              </div>

              <p
                className="
                  text-[12px]
                  font-black
                  text-[#333333]
                "
              >
                No transactions found
              </p>

              <p
                className="
                  mt-1
                  text-[9px]
                  text-gray-400
                "
              >
                Try changing your filters.
              </p>
            </div>
          )}
        </div>

        {/* Pagination */}

        <div
          className="
            flex flex-col
            gap-3
            border-t border-gray-100
            bg-white
            px-4 py-4
            sm:flex-row
            sm:items-center
            sm:justify-between
            sm:px-5
          "
        >
          <p
            className="
              text-center
              text-[9px]
              font-medium
              text-gray-400
              sm:text-left
            "
          >
            Showing{" "}
            {filteredTransactions.length === 0
              ? 0
              : startIndex + 1}{" "}
            -{" "}
            {Math.min(
              startIndex + itemsPerPage,
              filteredTransactions.length
            )}{" "}
            of {filteredTransactions.length}
          </p>

          <div
            className="
              flex items-center
              justify-center
              gap-1
            "
          >
            <button
              type="button"
              disabled={safeCurrentPage <= 1}
              onClick={() =>
                setCurrentPage(
                  safeCurrentPage - 1
                )
              }
              className="
                flex h-8 w-8
                items-center
                justify-center
                rounded-lg
                border border-gray-200
                bg-white
                text-gray-500
                transition
                disabled:cursor-not-allowed
                disabled:opacity-40
                hover:border-[#D9B6BE]
                hover:bg-[#F7EDEF]
                hover:text-[#B31B34]
              "
            >
              <ChevronLeft size={14} />
            </button>

            {Array.from(
              {
                length: Math.max(
                  totalPages,
                  1
                ),
              },
              (_, index) => index + 1
            ).map((page) => (
              <button
                key={page}
                type="button"
                onClick={() =>
                  setCurrentPage(page)
                }
                className={`
                  flex h-8 w-8
                  items-center
                  justify-center
                  rounded-lg
                  text-[9px]
                  font-black
                  transition

                  ${
                    page === safeCurrentPage
                      ? "bg-[#B31B34] text-white shadow-sm"
                      : "border border-gray-200 bg-white text-gray-500 hover:border-[#D9B6BE] hover:bg-[#F7EDEF] hover:text-[#B31B34]"
                  }
                `}
              >
                {page}
              </button>
            ))}

            <button
              type="button"
              disabled={
                safeCurrentPage >=
                Math.max(totalPages, 1)
              }
              onClick={() =>
                setCurrentPage(
                  safeCurrentPage + 1
                )
              }
              className="
                flex h-8 w-8
                items-center
                justify-center
                rounded-lg
                border border-gray-200
                bg-white
                text-gray-500
                transition
                disabled:cursor-not-allowed
                disabled:opacity-40
                hover:border-[#D9B6BE]
                hover:bg-[#F7EDEF]
                hover:text-[#B31B34]
              "
            >
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* Transaction Details */}

      <TransactionModal
        transaction={selectedTransaction}
        close={() =>
          setSelectedTransaction(null)
        }
      />
    </div>
  );
}

/*
|--------------------------------------------------------------------------
| Page
|--------------------------------------------------------------------------
*/

export default function TransactionHistoryPage() {
  const [sidebarOpen, setSidebarOpen] =
    useState(false);

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
          mx-auto flex w-full
          max-w-[1500px]
        "
      >
        {/* Sidebar */}

        <Sidebar
          tab={"transactions"}
          open={sidebarOpen}
          setOpen={setSidebarOpen}
        />

        {/* Main Content */}

        <div
          className="
            min-w-0 flex-1
            pb-[85px]
            lg:pb-8
          "
        >
          <div
            className="
              mx-auto w-full
              max-w-[1250px]
              px-4 py-5
              sm:px-6 sm:py-7
              lg:px-8 lg:py-8
            "
          >
            <TransactionHistory />
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}

      <MobileNavigation tab={"transactions"} />
    </main>
  );
}