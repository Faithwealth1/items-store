import { useState } from "react";

function NotificationCenter({ setSidebarOpen }) {
  const [activeTab, setActiveTab] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [resolvedIds, setResolvedIds] = useState([]);
  const [dismissedIds, setDismissedIds] = useState([]);

  const notifications = [
    {
      id: 1,
      title: "Overdue Escrow Payment: Order #ANM-8921",
      description:
        "Funds for transaction #ANM-8921 have been held in escrow for over 7 days without buyer confirmation. Immediate review required.",
      tags: [
        { label: "Escrow", color: "bg-gray-100 text-gray-700" },
        { label: "High Priority", color: "bg-pink-100 text-pink-700" },
      ],
      time: "10 mins ago",
      iconBg: "bg-[#ffd9d6]",
      iconColor: "text-[#a90000]",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
            clipRule="evenodd"
          />
        </svg>
      ),
      hasReview: true,
    },
    {
      id: 2,
      title: "Pending Seller Approval: TechHub N...",
      description:
        "New merchant registration requires manual verification of CAC documents and business address.",
      tags: [{ label: "Seller Onboarding", color: "bg-gray-100 text-gray-700" }],
      time: "2 hours ago",
      iconBg: "bg-[#ffddd0]",
      iconColor: "text-[#4a1d0c]",
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2.8 21 6v6.1c0 5.1-3.5 8.6-9 10.9-5.5-2.3-9-5.8-9-10.9V6l9-3.2Z" />
          <path d="m8 12 2.5 2.5 5.5-5.5" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
      hasReview: true,
    },
    {
      id: 3,
      title: "System Maintenance Scheduled",
      description:
        "Database optimization will occur this Sunday at 02:00 AM WAT. Expect 15 minutes of downtime.",
      tags: [{ label: "System", color: "bg-gray-100 text-gray-700" }],
      time: "Yesterday, 14:30",
      iconBg: "bg-[#e8e4f1]",
      iconColor: "text-[#4b4856]",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
            clipRule="evenodd"
          />
        </svg>
      ),
      hasReview: false,
    },
    {
      id: 4,
      title: "Dispute Escalated: Item Not As Describ...",
      description:
        "Buyer 'Chidioke O.' has escalated dispute #DSP-402 against seller 'Gadget Pro'. Mediation required.",
      tags: [{ label: "Disputes", color: "bg-gray-100 text-gray-700" }],
      time: "Yesterday, 09:15",
      iconBg: "bg-[#ffd9d6]",
      iconColor: "text-[#4b211d]",
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path
            d="M2.5 5.5 8 7l4-1.2L20 4l1.5 1.8-3.8 1.1 3 8.4a5 5 0 0 1-8.8 0l3-8.2-2.9.9v10.2h4v2H8v-2h3V8.6l-2.5.8 2.8 7.9a5 5 0 0 1-8.8 0l3-8.4-2.3-.7z"
          />
        </svg>
      ),
      hasReview: true,
    },
  ];

  const tabs = ["All", "Review", "Resolved"];

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
        <span className="font-semibold text-gray-800">Notification Center</span>
        <div className="w-8" />
      </div>

      <main className="flex-1 p-4 sm:p-6 lg:px-12 lg:pt-6 lg:pb-8 overflow-auto">
        {/* Header */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-4">
          <div>
            <h1 className="text-[32px] leading-9 font-semibold text-gray-900">Notification Center</h1>
            <p className="text-[13px] leading-4 text-gray-600">
              Manage system alerts, pending approvals, and critical events.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            {/* Search */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search notifications..."
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                className="w-full sm:w-64 h-12 px-4 text-sm border border-[#d6cfe3] rounded-lg placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#2d00b8]"
              />
            </div>

            {/* Tabs */}
            <div className="flex gap-1 bg-[#f5f1fc] border border-[#d6cfe3] p-1 rounded-lg">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`min-w-[52px] h-9 px-4 rounded-md text-sm font-medium transition-colors
                    ${
                      activeTab === tab
                        ? "bg-white text-[#2d00b8] border border-[#2d00b8]"
                        : "text-gray-700 hover:text-gray-900"
                    }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Notifications List */}
        <div className="space-y-3">
          {notifications
            .filter((item) => !dismissedIds.includes(item.id))
            .filter((item) => activeTab === "All" || (activeTab === "Review" ? !resolvedIds.includes(item.id) : resolvedIds.includes(item.id)))
            .filter((item) => `${item.title} ${item.description} ${item.tags.map((tag) => tag.label).join(" ")}`.toLowerCase().includes(searchQuery.toLowerCase()))
            .map((item) => (
            <div
              key={item.id}
              className={`bg-white rounded-xl border ${item.id === 1 ? "border-[#fecaca]" : "border-[#d6cfe3]"} px-4 py-4 shadow-none`}
            >
              <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                {/* Icon + Content */}
                <div className="flex gap-4 flex-1">
                  {/* Icon */}
                  <div
                    className={`w-12 h-12 rounded-full ${item.iconBg} ${item.iconColor} flex items-center justify-center shrink-0`}
                  >
                    {item.icon}
                  </div>

                  {/* Text */}
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-1">
                      <h3 className="text-[15px] leading-5 font-semibold text-gray-900">{item.title}</h3>
                      <span className={`text-[11px] whitespace-nowrap ${item.id === 1 ? "text-red-600" : "text-gray-600"}`}>{item.time}</span>
                    </div>

                    <p className="text-sm text-gray-600 mb-2">{item.description}</p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2">
                      {item.tags.map((tag) => (
                        <span
                          key={tag.label}
                          className={`px-2 py-1 rounded text-[11px] leading-4 font-medium ${tag.label === "High Priority" ? "bg-[#ffd7d5] text-red-700" : "bg-[#e4e0eb] text-[#5b5763]"}`}
                        >
                          {tag.label}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-row lg:flex-col gap-2 shrink-0">
                  {item.hasReview && (
                    <button onClick={() => setResolvedIds((ids) => ids.includes(item.id) ? ids : [...ids, item.id])} disabled={resolvedIds.includes(item.id)} className="w-[87px] h-9 bg-[#2700a8] hover:bg-[#20008c] active:bg-[#19006f] disabled:bg-[#6d55c6] text-white text-sm font-medium rounded-lg whitespace-nowrap transition-colors">
                      {resolvedIds.includes(item.id) ? "Reviewed" : "Review"}
                    </button>
                  )}
                  <button onClick={() => setDismissedIds((ids) => [...ids, item.id])} className="w-[87px] h-9 border border-[#d6cfe3] text-gray-800 text-sm font-medium rounded-lg hover:bg-gray-50 whitespace-nowrap">
                    Dismiss
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default NotificationCenter;
