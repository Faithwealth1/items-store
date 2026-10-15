import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Escrow.css";

function Escrow({ setSidebarOpen }) {
  const [activeTab, setActiveTab] = useState("All Funds");
  const navigate = useNavigate();

  const stats = [
    {
      title: "Total Escrow Balance",
      value: "$1,245,600.00",
      subtitle: "+5.2% from last week",
      subtitleColor: "text-green-600",
      iconBg: "bg-indigo-100",
      iconColor: "text-indigo-600",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
        </svg>
      ),
    },
    {
      title: "Pending Payouts",
      value: "$342,100.50",
      subtitle: "Across 142 orders",
      subtitleColor: "text-gray-500",
      iconBg: "bg-purple-100",
      iconColor: "text-purple-600",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      title: "Funds in Dispute",
      value: "$89,450.00",
      subtitle: "Requires immediate attention (12 cases)",
      subtitleColor: "text-red-500",
      iconBg: "bg-red-100",
      iconColor: "text-red-500",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      ),
    },
  ];

  const funds = [
    {
      id: "#ORD-9921",
      buyerInitials: "JD",
      buyerName: "John Doe",
      buyerBg: "bg-indigo-100 text-indigo-700",
      sellerInitials: "TC",
      sellerName: "Tech Corp",
      sellerBg: "bg-gray-100 text-gray-700",
      amount: "$4,500.00",
      status: "Held",
      statusColor: "bg-gray-200 text-gray-700",
      date: "Oct 24, 2023",
      action: "Review",
      actionColor: "border border-indigo-500 text-indigo-600 hover:bg-indigo-50",
    },
    {
      id: "#ORD-9918",
      buyerInitials: "AS",
      buyerName: "Alice Smith",
      buyerBg: "bg-pink-100 text-pink-700",
      sellerInitials: "GM",
      sellerName: "Global Merch",
      sellerBg: "bg-gray-100 text-gray-700",
      amount: "$12,450.00",
      status: "Disputed",
      statusColor: "bg-red-100 text-red-700",
      date: "Oct 23, 2023",
      action: "Resolve",
      actionColor: "bg-red-600 text-white hover:bg-red-700",
    },
    {
      id: "#ORD-9910",
      buyerInitials: "EL",
      buyerName: "Emma Lee",
      buyerBg: "bg-purple-100 text-purple-700",
      sellerInitials: "SS",
      sellerName: "Super Store",
      sellerBg: "bg-gray-100 text-gray-700",
      amount: "$2,100.00",
      status: "Released",
      statusColor: "escrow-status-released",
      date: "Oct 20, 2023",
      action: "Details",
      actionColor: "border border-gray-300 text-gray-700 hover:bg-gray-50",
    },
  ];

  const tabs = ["All Funds", "Held", "Disputed"];

  return (
    <div className="flex-1 flex flex-col min-w-0">
      {/* Mobile top bar */}
      <div className="lg:hidden flex items-center justify-between px-4 py-3 bg-white border-b border-gray-100">
        <button
          onClick={() => setSidebarOpen(true)}
          className="p-2 rounded-lg hover:bg-gray-100"
        >
          <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <span className="font-semibold text-gray-800">Escrow Management</span>
        <div className="w-8" />
      </div>

      <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-gray-900">Escrow Management</h1>
          <p className="text-sm text-gray-500 mt-1">
            Monitor and manage funds securely held during transactions.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {stats.map((stat) => (
            <div
              key={stat.title}
              className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm"
            >
              <div className="flex items-start justify-between mb-3">
                <p className="text-sm text-gray-500">{stat.title}</p>
                <div className={`w-9 h-9 rounded-full ${stat.iconBg} ${stat.iconColor} flex items-center justify-center`}>
                  {stat.icon}
                </div>
              </div>
              <p className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</p>
              <p className={`text-xs ${stat.subtitleColor}`}>{stat.subtitle}</p>
            </div>
          ))}
        </div>

        {/* Tabs + Buttons */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
          <div className="flex gap-2">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-colors
                  ${
                    activeTab === tab
                      ? "escrow-active-tab text-white"
                      : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"
                  }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="flex gap-2">
            <button className="flex items-center gap-1.5 px-3 py-1.5 text-sm border border-gray-200 rounded-lg hover:bg-gray-50 text-gray-700 bg-white">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
              </svg>
              Filter
            </button>
            <button className="flex items-center gap-1.5 px-3 py-1.5 text-sm border border-gray-200 rounded-lg hover:bg-gray-50 text-gray-700 bg-white">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Export
            </button>
          </div>
        </div>

        {/* Table Card */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 text-left text-gray-600">
                  <th className="px-4 py-3 w-10">
                    <input type="checkbox" className="rounded border-gray-300" />
                  </th>
                  <th className="px-4 py-3 font-medium">Order ID</th>
                  <th className="px-4 py-3 font-medium">Buyer</th>
                  <th className="px-4 py-3 font-medium">Seller</th>
                  <th className="px-4 py-3 font-medium">Amount</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                  <th className="px-4 py-3 font-medium">Date Created</th>
                  <th className="px-4 py-3 font-medium">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {funds.map((fund) => {
                  const isFirstOrder = fund.id === "#ORD-9921";
                  const openDetails = () => navigate("/escrow/ESC-8924-XT");

                  return (
                    <tr
                      key={fund.id}
                      onClick={isFirstOrder ? openDetails : undefined}
                      onKeyDown={isFirstOrder ? (event) => {
                        if (event.key === "Enter" || event.key === " ") {
                          event.preventDefault();
                          openDetails();
                        }
                      } : undefined}
                      tabIndex={isFirstOrder ? 0 : undefined}
                      aria-label={isFirstOrder ? `View escrow details for ${fund.id}` : undefined}
                      className={`hover:bg-gray-50 ${isFirstOrder ? "cursor-pointer focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500" : ""}`}
                    >
                      <td className="px-4 py-3" onClick={(event) => event.stopPropagation()}>
                        <input type="checkbox" className="rounded border-gray-300" />
                      </td>
                      <td className="px-4 py-3 font-medium escrow-order-id">{fund.id}</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <div className={`w-7 h-7 rounded-md ${fund.buyerBg} flex items-center justify-center text-xs font-medium`}>
                            {fund.buyerInitials}
                          </div>
                          <span className="text-gray-800">{fund.buyerName}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <div className={`w-7 h-7 rounded-md ${fund.sellerBg} flex items-center justify-center text-xs font-medium`}>
                            {fund.sellerInitials}
                          </div>
                          <span className="text-gray-800">{fund.sellerName}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 font-medium text-gray-900">{fund.amount}</td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium ${fund.statusColor}`}>
                          {fund.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-gray-600">{fund.date}</td>
                      <td className="px-4 py-3">
                        <button
                          onClick={(event) => {
                            event.stopPropagation();
                            if (isFirstOrder) openDetails();
                          }}
                          className={`px-3 py-1.5 rounded-lg text-sm font-medium ${fund.actionColor}`}
                        >
                          {fund.action}
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-4 py-3 border-t border-gray-100 text-sm text-gray-600">
            <p>Showing 1 to 5 of 1,204 entries</p>
            <div className="flex items-center gap-1">
              <button className="px-2.5 py-1 rounded hover:bg-gray-100 text-gray-500">‹</button>
              <button className="px-2.5 py-1 rounded hover:bg-gray-100 text-gray-500">›</button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Escrow;
