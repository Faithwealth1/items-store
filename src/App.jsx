import { useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, Link, useLocation, useNavigate } from "react-router-dom";
import Escrow from "./Escrow.jsx";
import EscrowDetails from "./EscrowDetails.jsx";
import SupportCenter from "./SupportCenter";
import SupportDetails from "./SupportDetails";
import ProductModeration from "./ProductModeration";
import ModerationDetails from "./ModerationDetails";

// ====================== SIDEBAR (shared) ======================
function Sidebar({ sidebarOpen, setSidebarOpen }) {
  const { pathname } = useLocation();

  const menuItems = [
    { name: "Overview", icon: "▦", path: "/" },
    { name: "Buyers Management", icon: "♙", path: "/" },
    { name: "Orders", icon: "▣", path: "/" },
    { name: "Disputes", icon: "⚖", path: "/" },
    { name: "Items Store", icon: "▣", path: "/", active: true },
    { name: "Escrow", icon: "▣", path: "/escrow" },
    { name: "Financial", icon: "▤", path: "/" },
    { name: "Seller Approval", icon: "◇", path: "/" },
    { name: "Sellers Management", icon: "♧", path: "/" },
    { name: "Support", icon: "🎧", path: "/support" },
    { name: "Content Moderation", icon: "📝", path: "/content-moderation" },
    { name: "Analytics", icon: "▥", path: "/" },
    { name: "Notification", icon: "♧", path: "/" },
    { name: "Permissions", icon: "⬟", path: "/" },
  ];

  return (
    <>
      {sidebarOpen && <button className="mobile-overlay" aria-label="Close menu" onClick={() => setSidebarOpen(false)} />}

      <aside className={`sidebar ${sidebarOpen ? "sidebar-open" : ""}`}>
        <div className="brand"><div className="brand-mark">AP</div><div><strong>Marketplace Admin</strong><span>System Control Panel</span></div></div>

        <nav className="side-nav">
          {menuItems.map((item) => {
            const isActive =
              (pathname === item.path ||
                (item.path !== "/" && pathname.startsWith(`${item.path}/`))) &&
              (item.path !== "/" || item.active);

            return (
              <Link
                key={item.name}
                to={item.path}
                className={`nav-item ${isActive ? "nav-active" : ""}`}
              >
                <span className="nav-icon">{item.icon}</span>
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
}

// ====================== ITEMS LIST PAGE ======================
function ItemsList({ setSidebarOpen }) {
  const [activeTab, setActiveTab] = useState("All Items");
  const [filterOpen, setFilterOpen] = useState(false);
  const [conditionFilter, setConditionFilter] = useState("All conditions");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedItemIds, setSelectedItemIds] = useState([]);
  const navigate = useNavigate();

  const items = [
    {
      id: "#ITM-8492",
      name: "Premium Wireless Mechanical Keyboard",
      image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 48 48'%3E%3Crect width='48' height='48' rx='5' fill='%23e9e4d9'/%3E%3Crect x='5' y='13' width='38' height='23' rx='3' fill='%233c3b40'/%3E%3Cpath d='M8 18h32M8 23h32M8 28h32M13 32h22' stroke='%23d8d6d3' stroke-width='2'/%3E%3C/svg%3E",
      seller: "Tunze Stores",
      sellerColor: "bg-orange-500",
      sellerInitial: "T",
      price: "\u20a670,000.00",
      stock: "10 Left",
      stockColor: "bg-gray-200 text-gray-700",
      condition: "New",
      status: "Needs Review",
      flagged: false,
    },
    {
      id: "#ITM-8493",
      name: "Genuine Leather Designer Tote Bag",
      image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 48 48'%3E%3Crect width='48' height='48' rx='5' fill='%23f2ece5'/%3E%3Cpath d='M12 18h24l-2 23H14z' fill='%23995b31'/%3E%3Cpath d='M18 19v-5a6 6 0 0112 0v5' fill='none' stroke='%236c4028' stroke-width='2.5'/%3E%3C/svg%3E",
      seller: "Luxe Boutique",
      sellerColor: "bg-blue-600",
      sellerInitial: "L",
      price: "\u20a6145,500.00",
      stock: "2 Left",
      stockColor: "bg-pink-200 text-pink-800",
      condition: "New",
      status: "Needs Review",
      flagged: false,
    },
    {
      id: "#ITM-8494",
      name: "Suspicious Listing (Flagged)",
      image: null,
      seller: "Unknown Seller 99",
      sellerColor: "bg-gray-400",
      sellerInitial: "U",
      price: "\u20a65,000.00",
      stock: "50+",
      stockColor: "bg-gray-200 text-gray-700",
      condition: "Used",
      status: "Flagged",
      flagged: true,
    },
    {
      id: "#ITM-8495",
      name: "Series 8 Smartwatch 45mm",
      image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 48 48'%3E%3Crect width='48' height='48' rx='5' fill='%23e7edf0'/%3E%3Cpath d='M19 4h10v9H19zM19 35h10v9H19z' fill='%233b4147'/%3E%3Crect x='12' y='11' width='24' height='27' rx='7' fill='%232b3137'/%3E%3Crect x='16' y='15' width='16' height='19' rx='4' fill='%2394a5a8'/%3E%3C/svg%3E",
      seller: "Gadget Hub Ltd",
      sellerColor: "bg-purple-600",
      sellerInitial: "G",
      price: "\u20a6210,000.00",
      stock: "34 Left",
      stockColor: "bg-gray-200 text-gray-700",
      condition: "Refurbished",
      status: "Resolved",
      flagged: false,
    },
  ];

  const tabs = ["All Items", "Needs Review", "Resolved", "Flagged"];
  const visibleItems = items.filter((item) =>
    (activeTab === "All Items" || item.status === activeTab) &&
    (conditionFilter === "All conditions" || item.condition === conditionFilter)
  );
  const exportItems = () => {
    const csvCell = (value) => `"${String(value).replaceAll('"', '""')}"`;
    const csv = [
      ["Item ID", "Item", "Seller", "Price", "Stock", "Condition", "Status"],
      ...visibleItems.map((item) => [item.id, item.name, item.seller, item.price, item.stock, item.condition, item.status]),
    ].map((row) => row.map(csvCell).join(",")).join("\r\n");
    const url = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8" }));
    const link = document.createElement("a");
    link.href = url;
    link.download = "items.csv";
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="main-area">
      {/* Mobile top bar */}
      <div className="lg:hidden flex items-center justify-between px-4 py-3 bg-white border-b border-gray-100">
        <button onClick={() => setSidebarOpen(true)} className="p-2 rounded-lg hover:bg-gray-100">
          <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <span className="font-semibold text-gray-800">Items List</span>
        <div className="w-8" />
      </div>

      <main className="page-content">
        <div className="page-header">
          <div><h1>Items List</h1><p>Manage and moderate marketplace listings.</p></div>
          <div className="tabs">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => { setActiveTab(tab); setCurrentPage(1); }}
              className={`tab ${activeTab === tab ? "tab-active" : ""}`}
            >
              {tab}
            </button>
          ))}
          </div>
        </div>

        <div className="table-card">
          <div className="table-toolbar">
            <p><strong>2,451</strong> items found</p>
            <div className="toolbar-actions">
              <div className="items-filter-wrap">
                <button className={`outline-button ${conditionFilter !== "All conditions" ? "filter-applied" : ""}`} aria-expanded={filterOpen} onClick={() => setFilterOpen((open) => !open)}><span className="filter-glyph">☰</span>Filter</button>
                {filterOpen && <div className="items-filter-menu"><label htmlFor="item-condition-filter">Condition</label><select id="item-condition-filter" value={conditionFilter} onChange={(event) => setConditionFilter(event.target.value)}><option>All conditions</option><option>New</option><option>Used</option><option>Refurbished</option></select><button onClick={() => { setConditionFilter("All conditions"); setFilterOpen(false); }}>Clear filter</button></div>}
              </div>
              <button className="outline-button" onClick={exportItems}><span className="download-glyph">⇩</span>Export</button>
            </div>
          </div>

          <div className="table-scroll">
            <table>
              <thead>
                <tr className="bg-[#f3f0ff] text-left text-gray-600">
                  <th className="check-cell">
                    <input type="checkbox" aria-label="Select all visible items" checked={visibleItems.length > 0 && visibleItems.every((item) => selectedItemIds.includes(item.id))} onChange={(event) => setSelectedItemIds(event.target.checked ? [...new Set([...selectedItemIds, ...visibleItems.map((item) => item.id)])] : selectedItemIds.filter((id) => !visibleItems.some((item) => item.id === id)))} />
                  </th>
                  <th>Item Details</th><th>Seller</th><th>Price</th><th>Stock</th><th>Condition</th><th>Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {visibleItems.map((item) => (
                  <tr
                    key={item.id}
                    onClick={() => navigate(`/item/${item.id.replace("#", "")}`)}
                    className={item.flagged ? "flagged-row cursor-pointer" : "cursor-pointer"}
                  >
                    <td className="check-cell" onClick={(e) => e.stopPropagation()}>
                      <input type="checkbox" aria-label={`Select ${item.name}`} checked={selectedItemIds.includes(item.id)} onChange={(event) => setSelectedItemIds(event.target.checked ? [...selectedItemIds, item.id] : selectedItemIds.filter((id) => id !== item.id))} />
                    </td>
                    <td>
                      <div className="item-info">
                        {item.image ? (
                          <img
                            src={item.image}
                            alt=""
                            className={`product-thumb thumb-${item.id.slice(1)}`}
                          />
                        ) : (
                          <div className={`product-thumb thumb-${item.id.slice(1)}`}>
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                          </div>
                        )}
                        <div className="item-copy">
                          <p className="item-name">
                            {item.name}
                          </p>
                          <small>ID: {item.id}</small>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="seller-info">
                        <div className={`seller-avatar ${item.sellerColor}`}>
                          {item.sellerInitial}
                        </div>
                        <span>{item.seller}</span>
                      </div>
                    </td>
                    <td className="price-cell">
                      {item.price}
                    </td>
                    <td>
                      <span className={`stock-pill ${item.stock === "2 Left" ? "stock-low" : ""}`}>
                        {item.stock}
                      </span>
                    </td>
                    <td>
                      <span className="condition-pill">
                        {item.condition}
                      </span>
                    </td>
                    <td className="px-4 py-3"></td>
                  </tr>
                ))}
                {visibleItems.length === 0 && <tr><td className="empty-state" colSpan="7">No items match these filters.</td></tr>}
              </tbody>
            </table>
          </div>

          <div className="table-footer">
            <p>Showing {(currentPage - 1) * 20 + 1} to {currentPage * 20} of 2,451 entries</p>
            <div className="pagination">
              <button disabled={currentPage === 1} aria-label="Previous page" onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}>‹</button>
              {[1, 2, 3].map((page) => <button key={page} className={currentPage === page ? "current-page" : ""} aria-current={currentPage === page ? "page" : undefined} onClick={() => setCurrentPage(page)}>{page}</button>)}
              <span>...</span><button className={currentPage === 123 ? "current-page" : ""} onClick={() => setCurrentPage(123)}>123</button>
              <button aria-label="Next page" onClick={() => setCurrentPage((page) => Math.min(123, page + 1))}>›</button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

// ====================== ITEM DETAILS PAGE ======================
function ItemDetails({ setSidebarOpen }) {
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(null);
  const [listingStatus, setListingStatus] = useState("Pending Review");
  const [editRequested, setEditRequested] = useState(false);
  const [actionMessage, setActionMessage] = useState("");
  const [confirmRemove, setConfirmRemove] = useState(false);

  // Exact data from the screenshot
  const product = {
    title: "Toyota Corolla 2016 Suspension",
    status: "Pending Review",
    price: "$145.00",
    currency: "USD",
    platformFee: "-$11.60",
    estimatedShipping: "$24.50",
    sellerNet: "$133.40",
    shippingMethods: ["FedEx Ground", "UPS Standard"],
    mainImage: "/items/suspension-main.png",
    thumbnails: [
      "/items/suspension-1.png",
      "/items/suspension-2.png",
      "/items/suspension-3.png",
      "/items/suspension-4.png",
    ],
  };

  return (
    <div className="flex-1 flex flex-col min-w-0">
      {/* Mobile top bar */}
      <div className="lg:hidden flex items-center justify-between px-4 py-3 bg-white border-b border-gray-100">
        <button onClick={() => setSidebarOpen(true)} className="p-2 rounded-lg hover:bg-gray-100">
          <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <span className="font-semibold text-gray-800">Listing Details</span>
        <div className="w-8" />
      </div>

      <main className="details-content">
        {/* Breadcrumb */}
        <div className="details-breadcrumb">
          <button onClick={() => navigate("/")}>
            Items Store
          </button>
          <span className="breadcrumb-chevron">›</span>
          <span className="breadcrumb-current">{product.title}</span>
        </div>

        {/* Header */}
        <div className="details-header">
          <div className="details-title-group">
            <h1>Listing Details</h1>
            <span className="details-status">
              <span className="status-dot"></span>
              {listingStatus}
            </span>
          </div>

          <div className="details-actions">
            <button className="detail-button remove-button" onClick={() => setConfirmRemove(true)}>
              Remove
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
            <button className="detail-button edit-button" onClick={() => { setEditRequested(true); setActionMessage("Edit request sent to the seller."); }}>
              {editRequested ? "Edit Requested" : "Request Edit"}
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </button>
            <button className="detail-button approve-button" onClick={() => { setListingStatus("Approved"); setActionMessage("Listing approved."); }}>
              {listingStatus === "Approved" ? "Listing Approved" : "Approve Listing"}
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Main Content Card */}
        <div className="details-card">
          <h2>Product Media</h2>

          <div className="details-product-layout">
            {/* Left - Main Image + Thumbnails */}
            <div className="details-gallery">
              <div className="details-main-image">
                <img
                  src={selectedImage || product.mainImage}
                  alt={product.title}
                  className="main-product-photo"
                />
              </div>

              {/* Thumbnails */}
              <div className="details-thumbnails">
                {product.thumbnails.map((thumb, index) => (
                  <button
                    type="button"
                    key={index}
                    className={`details-thumbnail ${(selectedImage ? selectedImage === thumb : index === 0) ? "thumbnail-active" : ""}`}
                    aria-label={`Show product photo ${index + 1}`}
                    aria-pressed={selectedImage === thumb || (!selectedImage && index === 0)}
                    onClick={() => { setSelectedImage(thumb); setActionMessage(""); }}
                  >
                    <img src={thumb} alt="" />
                  </button>
                ))}
              </div>
            </div>

            {/* Right - Pricing & Logistics */}
            <div className="pricing-card">
                <h3>Pricing & Logistics</h3>

                <div className="detail-price-wrap">
                  <div className="detail-price">
                    <span>{product.price}</span>
                    <span>{product.currency}</span>
                  </div>
                </div>

                <div className="pricing-lines">
                  <div>
                    <span>Platform Fee (8%)</span>
                    <span>{product.platformFee}</span>
                  </div>
                  <div>
                    <span>Estimated Shipping</span>
                    <span>{product.estimatedShipping}</span>
                  </div>
                </div>

                <div className="seller-net">
                  <div>
                    <span>Seller Net</span>
                    <span>{product.sellerNet}</span>
                  </div>
                </div>

                <div>
                  <p className="shipping-label">Shipping Methods Allowed</p>
                  <div className="shipping-methods">
                    {product.shippingMethods.map((method) => (
                      <span
                        key={method}
                        className="shipping-method"
                      >
                        {method}
                      </span>
                    ))}
                  </div>
                </div>
            </div>
          </div>
        </div>
        {actionMessage && <div className="details-action-message" role="status">{actionMessage}<button aria-label="Dismiss message" onClick={() => setActionMessage("")}>×</button></div>}
        {confirmRemove && (
          <div className="remove-dialog-backdrop" role="presentation" onClick={() => setConfirmRemove(false)}>
            <section className="remove-dialog" role="dialog" aria-modal="true" aria-labelledby="remove-dialog-title" onClick={(event) => event.stopPropagation()}>
              <h2 id="remove-dialog-title">Remove this listing?</h2>
              <p>This listing will be marked as removed.</p>
              <div>
                <button className="cancel-remove" onClick={() => setConfirmRemove(false)}>Cancel</button>
                <button className="confirm-remove" onClick={() => { setListingStatus("Removed"); setConfirmRemove(false); setActionMessage("Listing removed."); }}>Remove listing</button>
              </div>
            </section>
          </div>
        )}
      </main>
    </div>
  );
}

// ====================== MAIN APP ======================
function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <BrowserRouter>
      <div className="app-shell">
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <Routes>
          <Route
            path="/"
            element={<ItemsList sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />}
          />
          <Route
            path="/item/:id"
            element={<ItemDetails sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />}
          />
          <Route
            path="/escrow"
            element={<Escrow setSidebarOpen={setSidebarOpen} />}
          />
          <Route
            path="/escrow/:id"
            element={<EscrowDetails setSidebarOpen={setSidebarOpen} />}
          />
          <Route
             path="/support"
             element={<SupportCenter setSidebarOpen={setSidebarOpen} />}
          />
          <Route
              path="/support/:id"
             element={<SupportDetails setSidebarOpen={setSidebarOpen} />}
          />
          <Route
            path="/content-moderation"
            element={<ProductModeration setSidebarOpen={setSidebarOpen} />}
          />
          <Route
            path="/content-moderation/details"
            element={<ModerationDetails setSidebarOpen={setSidebarOpen} />}
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
