import { useMemo, useState } from "react";

const reports = [
  { title: "Suspension - Toyota", seller: "Spare Part Zone PH", date: "Dec 20", reason: "Counterfeit claim", count: 3, flagged: true },
  { title: "Brake Pads - Honda", seller: "Lagos Auto Hub", date: "Dec 19", reason: "Misleading Info", count: 1, flagged: false },
];

function ModerationDetails({ setSidebarOpen }) {
  const [activeTab, setActiveTab] = useState("All");
  const [search, setSearch] = useState("");
  const [selectedReport, setSelectedReport] = useState(0);
  const [selectedImage, setSelectedImage] = useState("");
  const [action, setAction] = useState("");
  const [dialog, setDialog] = useState("");
  const [message, setMessage] = useState("");
  const [listingStatus, setListingStatus] = useState("Under review");

  const visibleReports = useMemo(() => reports.filter((report) => {
    const query = search.trim().toLowerCase();
    const matchesQuery = !query || `${report.title} ${report.seller} ${report.reason}`.toLowerCase().includes(query);
    return matchesQuery && (activeTab !== "Flagged" || report.flagged) && (activeTab !== "Active" || !report.flagged);
  }), [search, activeTab]);
  const report = reports[selectedReport];
  const showAction = (text) => { setAction(text); setDialog(""); };
  const gallery = ["/items/suspension-main.png", "/items/suspension-4.png", "", ""];

  return (
    <div className="moderation-page flex-1 flex flex-col min-w-0">
      <div className="lg:hidden flex items-center justify-between px-4 py-3 bg-white border-b border-gray-100">
        <button onClick={() => setSidebarOpen(true)} className="p-2 rounded-lg hover:bg-gray-100" aria-label="Open menu">
          <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
        </button>
        <span className="font-semibold text-gray-800">Moderation Details</span><span className="w-8" />
      </div>

      <main className="moderation-layout flex-1 min-h-0">
        <aside className="moderation-inbox">
          <input aria-label="Search reports" type="search" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search Name, Email..." className="moderation-search" />
          <div className="moderation-tabs" role="tablist" aria-label="Report status">
            {["All", "Active", "Flagged"].map((tab) => <button key={tab} type="button" role="tab" aria-selected={activeTab === tab} onClick={() => setActiveTab(tab)} className={activeTab === tab ? "active" : ""}>{tab} ({tab === "All" ? "560" : tab === "Active" ? "560" : "10"})</button>)}
          </div>
          <div className="moderation-report-list">
            {visibleReports.map((item) => {
              const index = reports.indexOf(item);
              return <button key={item.title} type="button" onClick={() => { setSelectedReport(index); setAction(""); }} className={`moderation-report ${selectedReport === index ? "selected" : ""}`}>
                <span className="moderation-report-title"><strong>{item.title}</strong><small>{item.date}</small></span>
                <span className="moderation-report-seller">{item.seller}</span>
                <span className="moderation-report-meta"><span className="moderation-reason"><span aria-hidden="true">{item.title.startsWith("Brake") ? "⚑" : "▲"}</span>{item.reason}</span><span className="report-count">{item.count} {item.count === 1 ? "Report" : "Reports"}</span></span>
              </button>;
            })}
            {visibleReports.length === 0 && <p className="moderation-empty">No reports match this search.</p>}
          </div>
        </aside>

        <section className="moderation-detail">
          <header className="moderation-card moderation-header-card">
            <div className="moderation-heading-copy">
              <h1>{report.title}</h1>
              <div className="moderation-subline"><span><b aria-hidden="true">▤</b>{report.seller}</span><i>•</i><span><b aria-hidden="true">▢</b>{report.date}</span><i>•</i><span className="moderation-report-count">{report.count} Reports</span></div>
            </div>
            <span className="moderation-alert">{report.title.startsWith("Brake") ? "Misleading information" : "Counterfeit product claim"}<b aria-hidden="true">▲</b></span>
          </header>

          <section className="moderation-card listing-content-card">
            <h2><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 5a2 2 0 0 1 2-2h11v2H6v13H4V5Zm4 2h12a2 2 0 0 1 2 2v11H8a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2Zm2 11h8l-2.5-3.2-2 2.4-1.5-1.8L10 18Zm2-6.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z" /></svg>Listing Content</h2>
            <div className="moderation-gallery">{gallery.map((src, index) => src ? <button key={src} type="button" className="moderation-image-button" onClick={() => setSelectedImage(src)} aria-label={`View listing photo ${index + 1}`}><img src={src} alt={index === 0 ? "Toyota suspension assembly" : "Suspension assembly close-up"} /></button> : <div key={index} className="moderation-no-image"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M21 19V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2ZM8 8a2 2 0 1 1 0 4 2 2 0 0 1 0-4Zm11 10H5l4-5 2.5 3 3.5-4 4 6Z" /></svg><span>No Image</span></div>)}</div>
          </section>

          <section className="moderation-card moderation-summary">
            <div className="moderation-description">
              <h2><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 2h9l6 6v13a1 1 0 0 1-1 1H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2Zm8 1.5V9h5.5M8 13h8v-1.5H8V13Zm0 4h8v-1.5H8V17Z" /></svg>Description</h2>
              <p>Brand new genuine Toyota suspension for 2018-2022 models. High durability and comfort. Imported directly with packaging intact.</p>
            </div>
            <aside className="moderation-price-card"><span>Listed Price</span><strong>₦ 145,000</strong><hr /><span>Reported By</span><div className="moderation-reporter"><span>TF</span><p>Tunde Fashola<small>Level 2</small></p></div></aside>
          </section>

          <section className="moderation-card violation-card">
            <div className="violation-heading"><h2><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3a9 9 0 1 1-8.5 12h2.2A7 7 0 1 0 6 8L9 11H2V4l2.5 2.5A9 9 0 0 1 12 3Zm-1 4h2v5l3 2-1 1.7-4-2.7V7Z" /></svg>Seller Violation History</h2><button type="button" onClick={() => showAction("Seller profile opened.")}>View Full Profile</button></div>
            <div className="violation-table"><strong>Date</strong><span>Oct 12, 2023</span><span>Aug 05, 2023</span></div>
          </section>

          <div className="moderation-actions">
            <button type="button" onClick={() => { setDialog("Message Buyer"); setMessage(""); }}><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 4h16v13H8l-4 3V4Zm3 4v2h10V8H7Zm0 4v2h7v-2H7Z" /></svg>Message Buyer</button>
            <button type="button" onClick={() => { setDialog("Message Seller"); setMessage(""); }}><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 4h18v3l-2 2v10H5V9L3 7V4Zm2 2 1 2h12l1-2H5Zm2 5v6h2v-6H7Zm4 0v6h2v-6h-2Zm4 0v6h2v-6h-2Z" /></svg>Message Seller</button>
            <button type="button" className="remove-listing" onClick={() => setDialog("Remove Listing")}>Remove Listing</button>
            <button type="button" className="approve-listing" onClick={() => { setListingStatus("Approved"); showAction("Listing cleared and approved."); }}>Clear &amp; Approve</button>
          </div>
          {listingStatus === "Approved" && <span className="moderation-status">Approved</span>}
          {action && <div role="status" className="moderation-toast">{action}<button type="button" aria-label="Dismiss message" onClick={() => setAction("")}>×</button></div>}
        </section>
      </main>

      {dialog && <div className="moderation-modal-backdrop" onClick={() => setDialog("")} role="presentation"><section className="moderation-modal" role="dialog" aria-modal="true" onClick={(event) => event.stopPropagation()}><button className="modal-close" type="button" aria-label="Close" onClick={() => setDialog("")}>×</button><h2>{dialog}</h2>{dialog.startsWith("Message") ? <><p>Send a message about “{report.title}”.</p><textarea value={message} onChange={(event) => setMessage(event.target.value)} placeholder="Write your message..." /><button className="modal-primary" type="button" onClick={() => message.trim() ? showAction(`${dialog} sent.`) : setAction("Write a message before sending.")}>Send Message</button></> : <><p>Remove “{report.title}” from the marketplace?</p><div className="modal-buttons"><button type="button" onClick={() => setDialog("")}>Cancel</button><button className="modal-danger" type="button" onClick={() => { setListingStatus("Removed"); showAction("Listing removed."); }}>Remove Listing</button></div></>}</section></div>}
      {selectedImage && <div className="moderation-image-backdrop" role="presentation" onClick={() => setSelectedImage("")}><button type="button" aria-label="Close image preview" onClick={() => setSelectedImage("")}>×</button><img src={selectedImage} alt="Listing photo preview" /></div>}
    </div>
  );
}

export default ModerationDetails;
