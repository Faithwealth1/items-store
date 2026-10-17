import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SupportCenter({ setSidebarOpen }) {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("All Tickets");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterOpen, setFilterOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState("All statuses");

  const stats = [
    {
      title: "Total Tickets",
      value: "1,248",
      change: "+12% from last week",
      changeColor: "text-orange-500",
      iconBg: "bg-indigo-100",
      iconColor: "text-indigo-600",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
        </svg>
      ),
    },
    {
      title: "Avg Response Time",
      value: "1.4h",
      change: "-0.3h from last week",
      changeColor: "text-green-600",
      iconBg: "bg-orange-100",
      iconColor: "text-orange-500",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      title: "Flagged / Urgent",
      value: "24",
      change: "Requires immediate attention",
      changeColor: "text-red-500",
      iconBg: "bg-red-100",
      iconColor: "text-red-500",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" />
        </svg>
      ),
    },
  ];

  const tickets = [
    {
      id: "#TKT-8901",
      subject: "Payment failed but deducted from bank",
      user: "user123@email.com",
      status: "OPEN",
      statusColor: "bg-pink-100 text-pink-700",
      priority: "High",
      priorityColor: "text-red-500",
      priorityIcon: "↑",
      lastUpdate: "10 mins ago",
    },
    {
      id: "#TKT-8895",
      subject: "Seller not responding to inquiry",
      user: "buyer_mike@domain.com",
      status: "PENDING",
      statusColor: "bg-orange-100 text-orange-700",
      priority: "Medium",
      priorityColor: "text-orange-500",
      priorityIcon: "↑",
      lastUpdate: "2 hours ago",
    },
    {
      id: "#TKT-8842",
      subject: "How to update shipping address?",
      user: "sarah.j@email.com",
      status: "RESOLVED",
      statusColor: "bg-gray-100 text-gray-700",
      priority: "Low",
      priorityColor: "text-gray-500",
      priorityIcon: "↓",
      lastUpdate: "Yesterday",
    },
  ];

  const tabs = ["All Tickets", "Open", "Pending", "Resolved"];
  const visibleTickets = tickets.filter((ticket) => {
    const matchesTab =
      activeTab === "All Tickets" ||
      ticket.status.toLowerCase() === activeTab.toLowerCase();
    const matchesStatus =
      statusFilter === "All statuses" ||
      ticket.status.toLowerCase() === statusFilter.toLowerCase();
    const query = searchTerm.trim().toLowerCase();
    const matchesSearch =
      !query ||
      [ticket.id, ticket.subject, ticket.user].some((value) =>
        value.toLowerCase().includes(query),
      );

    return matchesTab && matchesStatus && matchesSearch;
  });

  return (
    <div className="support-center-page flex-1 flex flex-col min-w-0">
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
        <span className="font-semibold text-gray-800">Support Center</span>
        <div className="w-8" />
      </div>

      <main className="support-center-main flex-1 p-4 sm:p-6 lg:p-8 overflow-auto">
        {/* Header */}
        <div className="support-center-heading mb-6">
          <h1 className="text-2xl font-semibold text-gray-900">Support Center</h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage and resolve customer inquiries.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="support-center-stats grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {stats.map((stat) => (
            <div
              key={stat.title}
              className="support-center-stat bg-white rounded-xl border border-gray-100 p-5 shadow-sm"
            >
              <div className="flex items-start justify-between mb-3">
                <p className="text-sm text-gray-500">{stat.title}</p>
                <div className={`w-9 h-9 rounded-full ${stat.iconBg} ${stat.iconColor} flex items-center justify-center`}>
                  {stat.icon}
                </div>
              </div>
              <p className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</p>
              <p className={`text-xs ${stat.changeColor}`}>{stat.change}</p>
            </div>
          ))}
        </div>

        {/* Search + Tabs + Filter */}
        <div className="support-center-table bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="support-center-toolbar p-4 flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-gray-100">
            {/* Search */}
            <div className="support-center-search relative flex-1 max-w-md">
              <svg
                className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Search ticket ID, subject, or user..."
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                className="w-full pl-10 pr-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* Tabs + Filter */}
            <div className="support-center-controls flex flex-wrap items-center gap-2">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`support-center-tab px-4 py-1.5 rounded-full text-sm font-medium transition-colors
                    ${
                      activeTab === tab
                        ? "bg-white border-2 border-indigo-500 text-indigo-700"
                        : "bg-gray-50 text-gray-600 hover:bg-gray-100"
                    }`}
                >
                  {tab}
                </button>
              ))}
              <div className="relative">
                <button
                  type="button"
                  aria-expanded={filterOpen}
                  onClick={() => setFilterOpen((open) => !open)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 text-sm border rounded-lg hover:bg-gray-50 ${
                    statusFilter === "All statuses"
                      ? "border-gray-200 text-gray-700"
                      : "border-indigo-500 text-indigo-700"
                  }`}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                  </svg>
                  Filter
                </button>
                {filterOpen && (
                  <div className="absolute right-0 top-full z-10 mt-2 grid w-52 gap-3 rounded-lg border border-gray-200 bg-white p-4 shadow-lg">
                    <label htmlFor="support-status-filter" className="text-xs font-semibold text-gray-600">
                      Ticket status
                    </label>
                    <select
                      id="support-status-filter"
                      value={statusFilter}
                      onChange={(event) => setStatusFilter(event.target.value)}
                      className="w-full rounded-md border border-gray-200 bg-white px-2 py-2 text-sm text-gray-700"
                    >
                      <option>All statuses</option>
                      <option>Open</option>
                      <option>Pending</option>
                      <option>Resolved</option>
                    </select>
                    <button
                      type="button"
                      onClick={() => {
                        setStatusFilter("All statuses");
                        setFilterOpen(false);
                      }}
                      className="justify-self-start text-xs font-medium text-indigo-700 hover:text-indigo-900"
                    >
                      Clear filter
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="support-center-table-scroll overflow-x-auto">
            <table className="support-center-ticket-table w-full text-sm">
              <thead>
                <tr className="bg-[#f3f0ff] text-left text-gray-600">
                  <th className="px-4 py-3 font-medium">Ticket ID</th>
                  <th className="px-4 py-3 font-medium">Subject / User</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                  <th className="px-4 py-3 font-medium">Priority</th>
                  <th className="px-4 py-3 font-medium">Last Update</th>
                  <th className="px-4 py-3 font-medium">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {visibleTickets.map((ticket) => (
                  <tr
                    key={ticket.id}
                    onClick={() => navigate(`/support/${ticket.id.replace("#", "")}`)}
                    className="hover:bg-gray-50 cursor-pointer"
                  >
                    <td className={`support-ticket-id px-4 py-4 font-medium ${ticket.id === "#TKT-8901" || ticket.id === "#TKT-8895" ? "text-[#3000b9]" : "text-indigo-600"}`}>
                      {ticket.id === "#TKT-8901" || ticket.id === "#TKT-8895" ? <>{ticket.id.slice(0, 6)}<br />{ticket.id.slice(6)}</> : ticket.id}
                    </td>
                    <td className="px-4 py-4">
                      <p className="font-medium text-gray-900">{ticket.subject}</p>
                      <p className="text-xs text-gray-500 mt-0.5">{ticket.user}</p>
                    </td>
                    <td className="px-4 py-4">
                      <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium ${ticket.statusColor}`}>
                        {ticket.status}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <span className={`flex items-center gap-1 text-sm font-medium ${ticket.priorityColor}`}>
                        <span>{ticket.priorityIcon}</span>
                        {ticket.priority}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-gray-600">{ticket.lastUpdate}</td>
                    <td className="px-4 py-4">
                      <button className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))}
                {visibleTickets.length === 0 && (
                  <tr>
                    <td colSpan="6" className="px-4 py-8 text-center text-sm text-gray-500">
                      No tickets match your search or filters.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="support-center-footer flex flex-col sm:flex-row items-center justify-between gap-3 px-4 py-3 border-t border-gray-100 text-sm text-gray-600">
            <p>Showing {visibleTickets.length ? `1-${visibleTickets.length}` : "0"} of 1,248</p>
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

export default SupportCenter;
