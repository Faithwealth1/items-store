import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

const stats = [
  { title: "Total Flagged", value: "1,245", change: "+12% from yesterday", color: "red", icon: "⚑" },
  { title: "Pending Review", value: "342", change: "◷  Avg time: 4hrs", color: "gray", icon: "▣" },
  { title: "Resolved Today", value: "89", change: "+5% completion rate", color: "purple", icon: "✓" },
  { title: "Accuracy Rate", value: "94.2%", change: "●  Based on appeals", color: "orange", icon: "▣" },
];

const items = [
  { id: "#9842-TX", name: "Suspension Light - Toyota", image: "/items/suspension-3.png", status: "Pending" },
  { id: "#8831-AB", name: "Bosch S4 Battery 12V", image: "/items/bosch-battery.png", status: "Flagged" },
  { id: "#7720-CD", name: "Honda Civic Brake Pads (Set)", image: null, status: "New" },
];
const tabs = ["All (560)", "Pending (342)", "Flagged (10)", "New (40)"];

function ProductModeration({ setSidebarOpen }) {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const activeFilter = activeTab.split(" ")[0];
  const visibleItems = useMemo(() => items.filter((item) => {
    const matchesTab = activeFilter === "All" || item.status === activeFilter;
    const query = searchTerm.trim().toLowerCase();
    return matchesTab && (!query || `${item.name} ${item.id}`.toLowerCase().includes(query));
  }), [activeFilter, searchTerm]);
  const totalEntries = activeFilter === "Flagged" ? 10 : activeFilter === "New" ? 40 : 342;
  const shownRange = visibleItems.length ? `1 to ${visibleItems.length}` : "0 to 0";

  return (
    <div className="product-moderation-page flex-1 flex flex-col min-w-0">
      <div className="lg:hidden flex items-center justify-between px-4 py-3 bg-white border-b border-gray-100">
        <button onClick={() => setSidebarOpen(true)} className="p-2 rounded-lg hover:bg-gray-100" aria-label="Open menu">
          <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
        </button>
        <span className="font-semibold text-gray-800">Product Moderation</span><span className="w-8" />
      </div>

      <main className="product-moderation-content flex-1 p-4 sm:p-6 lg:p-8 overflow-auto">
        <header className="moderation-list-heading">
          <h1>Product Moderation</h1>
          <p>Review and manage reported listings to ensure marketplace integrity.</p>
        </header>

        <section className="moderation-stats grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4" aria-label="Moderation summary">
          {stats.map((stat) => <article key={stat.title} className={`moderation-stat-card ${stat.color}`}>
            <div className="moderation-stat-label">{stat.title}<span className="moderation-stat-icon">{stat.icon}</span></div>
            <strong>{stat.value}</strong><small>{stat.change}</small>
          </article>)}
        </section>

        <section className="moderation-table-card" aria-label="Reported listings">
          <div className="moderation-table-toolbar">
            <div className="moderation-list-tabs" role="tablist" aria-label="Listing status">
              {tabs.map((tab) => <button key={tab} type="button" role="tab" aria-selected={activeTab === tab} onClick={() => { setActiveTab(tab); setCurrentPage(1); }} className={activeTab === tab ? "active" : ""}>{tab}</button>)}
            </div>
            <input type="search" aria-label="Filter listing by name" placeholder="Filter listing by name..." value={searchTerm} onChange={(event) => { setSearchTerm(event.target.value); setCurrentPage(1); }} />
          </div>
          <div className="moderation-table-label">Item Details</div>
          <div className="moderation-list-rows">
            {visibleItems.map((item) => <div key={item.id} role="link" tabIndex={0} onClick={() => navigate("/content-moderation/details")} onKeyDown={(event) => { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); navigate("/content-moderation/details"); } }} className="moderation-list-row">
              {item.image ? <img src={item.image} alt="" /> : <div className="moderation-image-placeholder"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M21 19V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2ZM8 8a2 2 0 1 1 0 4 2 2 0 0 1 0-4Zm11 10H5l4-5 2.5 3 3.5-4 4 6Z" /></svg></div>}
              <span><strong>{item.name}</strong><small>ID: {item.id}</small></span>
            </div>)}
            {visibleItems.length === 0 && <p className="moderation-list-empty">No listings match your search or filter.</p>}
          </div>
          <footer className="moderation-table-footer">
            <p>Showing {shownRange} of {totalEntries} entries</p>
            <nav aria-label="Listing pages">
              <button type="button" aria-label="Previous page" disabled={currentPage === 1} onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}>‹</button>
              {[1, 2, 3].map((page) => <button type="button" key={page} aria-current={currentPage === page ? "page" : undefined} className={currentPage === page ? "current" : ""} onClick={() => setCurrentPage(page)}>{page}</button>)}
              <span>…</span><button type="button" aria-label="Next page" onClick={() => setCurrentPage((page) => Math.min(3, page + 1))}>›</button>
            </nav>
          </footer>
        </section>
      </main>
    </div>
  );
}

export default ProductModeration;
