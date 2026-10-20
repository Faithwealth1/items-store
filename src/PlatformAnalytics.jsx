import { useState } from "react";

function PlatformAnalytics({ setSidebarOpen }) {
  const [period, setPeriod] = useState("30 Days");
  const exportReport = () => {
    const rows = [["Platform Analytics Report", period], ["Metric", "Value", "Status"], ["Average order completion rate", "94.2%", "Needs Attention"], ["Dispute ratio", "1.8%", "Healthy"], ["Total volume (GMV)", "$2.4M", "+14.5% vs last period"], ["Active buyers", "142.8k", "+5.2% vs last period"], ["Active sellers", "12.4k", "+8.1% vs last period"], ["Platform revenue", "$345k", "+18.2% vs last period"]];
    const csv = rows.map((row) => row.map((cell) => `"${cell.replaceAll('"', '""')}"`).join(",")).join("\n");
    const url = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8" }));
    const link = document.createElement("a");
    link.href = url;
    link.download = "platform-analytics-report.csv";
    link.click();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
  };

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
        <span className="font-semibold text-gray-800">Platform Analytics</span>
        <div className="w-8" />
      </div>

      <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-auto">
        <div className="max-w-272.5 mx-auto">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Platform Analytics</h1>
            <p className="text-sm text-gray-500 mt-1">
              Comprehensive view of marketplace performance and health metrics.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <div className="relative inline-flex h-10 items-center">
              <select
                value={period}
                onChange={(event) => setPeriod(event.target.value)}
                aria-label="Select analytics date range"
                className="h-full appearance-none px-4 pr-10 border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50 bg-white"
              >
                <option>1 Day</option>
                <option>7 Days</option>
                <option>30 Days</option>
                <option>90 Days</option>
              </select>
              <span aria-hidden="true" className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
                <svg className="h-4 w-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </span>
            </div>
            <button onClick={exportReport} className="flex w-25.5 shrink-0 items-center justify-center gap-2 px-3 py-2 bg-[#2d00b8] hover:bg-[#240095] active:bg-[#1d0078] text-white text-sm font-medium rounded-lg transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-700">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Export Report
            </button>
          </div>
        </div>

        {/* Top Metrics Row */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 mb-6">
          {/* Platform Health Card */}
          <div className="lg:col-span-3 bg-white rounded-xl border border-[#d4cde4] p-5 shadow-sm">
            <h2 className="font-semibold text-gray-900 mb-1">Platform Health</h2>
            <p className="text-xs text-gray-500 mb-5">Key operational metrics and SLAs</p>

            {/* Completion Rate */}
            <div className="mb-5">
              <div className="flex justify-between items-center mb-1.5">
                <span className="text-sm text-gray-600">Avg. Order Completion Rate</span>
                <span className="text-sm font-semibold text-[#2d00b8]">94.2%</span>
              </div>
              <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-[#2d00b8] rounded-full" style={{ width: "94.2%" }}></div>
              </div>
              <div className="flex justify-between text-xs text-gray-500 mt-1.5">
                <span>Target: 95.0%</span>
                <span className="text-gray-700 font-medium">Status: Needs Attention</span>
              </div>
            </div>

            {/* Dispute Ratio */}
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <span className="text-sm text-gray-600">Dispute Ratio</span>
                <span className="text-sm font-semibold text-[#e00000]">1.8%</span>
              </div>
              <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-[#e00000] rounded-full" style={{ width: "1.8%", minWidth: "3px" }}></div>
              </div>
              <div className="flex justify-between text-xs text-gray-500 mt-1.5">
                <span>Target: &lt; 2.0%</span>
                <span className="text-gray-700 font-medium">Status: Healthy</span>
              </div>
            </div>
          </div>

          {/* Metric Cards */}
          <div className="lg:col-span-9 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
            {/* Total Volume */}
            <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Total Volume (GMV)</p>
                <div className="w-8 h-8 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 19V5m0 14h18M7 16v-4m4 4V9m4 7V6m4 10V3M4 11l6-5 4 2 6-6" />
                  </svg>
                </div>
              </div>
              <p className="text-2xl font-bold text-gray-900 mb-1">$2.4M</p>
              <p className="text-xs text-green-600 font-medium">+14.5% vs last period</p>
            </div>

            {/* Active Buyers */}
            <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Active Buyers</p>
                <div className="w-8 h-8 rounded-full bg-purple-50 flex items-center justify-center text-purple-600">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2m7-10a4 4 0 100-8 4 4 0 000 8zm13 10v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
                  </svg>
                </div>
              </div>
              <p className="text-2xl font-bold text-gray-900 mb-1">142.8k</p>
              <p className="text-xs text-green-600 font-medium">+5.2% vs last period</p>
            </div>

            {/* Active Sellers */}
            <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Active Sellers</p>
                <div className="w-8 h-8 rounded-full bg-orange-50 flex items-center justify-center text-orange-500">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7l1.5-4h15L21 7M4 7v13h16V7M3 7h18M8 7v4m4-4v4m4-4v4M9 20v-6h6v6" />
                  </svg>
                </div>
              </div>
              <p className="text-2xl font-bold text-gray-900 mb-1">12.4k</p>
              <p className="text-xs text-green-600 font-medium">+8.1% vs last period</p>
            </div>

            {/* Platform Revenue - Highlighted */}
            <div className="bg-[#f3f1fb] rounded-xl border border-indigo-600 p-5 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <p className="text-xs font-semibold text-[#2d00b8] uppercase tracking-wide">Platform Revenue</p>
                <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-[#2d00b8]">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M5 10V7l7-4 7 4v3M5 20v-7m4 7v-7m6 7v-7m4 7v-7M3 20h18" />
                  </svg>
                </div>
              </div>
              <p className="text-2xl font-bold text-[#2d00b8] mb-1">$345k</p>
              <p className="text-xs text-[#2d00b8] font-medium">&#8593; +18.2% vs last period</p>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* User Growth Chart */}
          <div className="lg:col-span-3 bg-white rounded-xl border border-gray-100 p-5 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
              <div>
                <h2 className="font-semibold text-gray-900">User Growth (Buyer vs Seller)</h2>
                <p className="text-xs text-gray-500 mt-0.5">
                  Monthly registration trends showing recent spikes
                </p>
              </div>
              <div className="flex items-center gap-4 text-xs">
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-indigo-600"></span>
                  Buyers
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-orange-400"></span>
                  Sellers
                </span>
              </div>
            </div>

            {/* Simple Chart Placeholder */}
            <div className="relative h-100 border border-[#ded6ef] bg-[#f6f2fd] rounded-lg overflow-hidden">
              {/* Y-axis labels */}
              <div className="absolute left-0 top-0 bottom-8 w-10 flex flex-col justify-between text-xs text-gray-400 py-2">
                <span>100k</span>
                <span>75k</span>
                <span>50k</span>
                <span>25k</span>
                <span>0</span>
              </div>

              {/* Chart area */}
              <div className="ml-12 h-full relative">
                {/* Decorative diamond shape like in the image */}
                <div
                  aria-hidden="true"
                  className="absolute inset-x-0 top-0 bottom-8"
                  style={{
                    clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
                    backgroundColor: "#ffffff",
                    opacity: 0.78,
                  }}
                />

              </div>

              {/* X-axis labels */}
              <div className="absolute bottom-0 left-16 right-8 flex items-center justify-between text-[8px] leading-none text-gray-400 sm:left-20 sm:text-xs">
                <span>Jan</span>
                <span>Feb</span>
                <span>Mar</span>
                <span>Apr</span>
                <span>May</span>
                <span>Jun</span>
                <span>Jul</span>
                <span>Aug</span>
                <span>Sep</span>
                <span>Oct</span>
                <span>Nov</span>
                <span>Dec</span>
              </div>
            </div>
          </div>

          {/* Category Performance */}
          <div className="lg:col-span-2 bg-white rounded-xl border border-gray-100 p-5 shadow-sm">
            <h2 className="font-semibold text-gray-900 mb-1">Category Performance</h2>
            <p className="text-xs text-gray-500 mb-5">Top selling segments by volume</p>

            <div className="space-y-5">
              {/* Engines */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                      </svg>
                    </div>
                    <span className="text-sm font-medium text-gray-800">Engines</span>
                  </div>
                  <span className="text-sm font-semibold text-gray-900">$845,000</span>
                </div>
                <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-[#2d00b8] rounded-full" style={{ width: "85%" }}></div>
                </div>
              </div>

              {/* Suspensions */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-purple-50 flex items-center justify-center text-purple-600">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <span className="text-sm font-medium text-gray-800">Suspensions</span>
                  </div>
                  <span className="text-sm font-semibold text-gray-900">$620,000</span>
                </div>
                <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-[#4b2eb8] rounded-full" style={{ width: "62.5%" }}></div>
                </div>
              </div>

              {/* Brakes */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center text-gray-600">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    </div>
                    <span className="text-sm font-medium text-gray-800">Brakes</span>
                  </div>
                  <span className="text-sm font-semibold text-gray-900">$410,000</span>
                </div>
                <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-[#8066d3] rounded-full" style={{ width: "40%" }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>
      </main>
    </div>
  );
}

export default PlatformAnalytics;
