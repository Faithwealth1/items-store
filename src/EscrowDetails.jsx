import { useState } from "react";
import { useNavigate } from "react-router-dom";

function EscrowDetails({ setSidebarOpen }) {
  const navigate = useNavigate();
  const [status, setStatus] = useState("Awaiting Release");
  const [adminNotes, setAdminNotes] = useState("");
  const [actionMessage, setActionMessage] = useState("");

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
        <span className="font-semibold text-gray-800">Escrow Details</span>
        <div className="w-8" />
      </div>

      <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-auto">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
          <button onClick={() => navigate("/escrow")} className="hover:text-indigo-600">
            Escrow
          </button>
          <span>›</span>
          <span className="transaction-reference">Transaction #ESC-8924-XT</span>
        </div>

        {/* Title + Status */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 mb-6">
          <h1 className="text-2xl font-semibold text-gray-900">Escrow Details</h1>
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-sm font-medium awaiting-release-badge">
              <span className="w-2 h-2 rounded-full bg-orange-500"></span>
              {status}
            </span>
            <span className="text-sm text-gray-500">Created: Oct 24, 2023</span>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* ========== LEFT COLUMN ========== */}
          <div className="xl:col-span-2 space-y-6">
            {/* Transaction Parties */}
            <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm">
              <h2 className="font-semibold text-gray-900 mb-4">Transaction Parties</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Buyer */}
                <div className="flex items-start gap-3">
                  <img className="party-avatar" src="/items/buyer-avatar.png" alt="Alex Mercer" />
                  <div>
                    <p className="text-xs text-gray-500 mb-0.5">Buyer</p>
                    <p className="font-medium text-gray-900">Alex Mercer</p>
                    <p className="text-sm text-gray-500">alex.m@example.com</p>
                    <div className="flex items-center gap-1 mt-1 text-xs verified-label">
                      <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      ID Verified
                    </div>
                  </div>
                </div>

                {/* Seller */}
                <div className="flex items-start gap-3">
                  <img className="party-avatar" src="/items/seller-avatar.png" alt="Tech Haven Ltd." />
                  <div>
                    <p className="text-xs text-gray-500 mb-0.5">Seller</p>
                    <p className="font-medium text-gray-900">Tech Haven Ltd.</p>
                    <p className="text-sm text-gray-500">sales@techhaven.co</p>
                    <div className="vendor-rating">
                      <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path d="M10 1.8l2.45 4.96 5.47.8-3.96 3.86.94 5.45L10 14.3l-4.9 2.57.94-5.45L2.08 7.56l5.47-.8L10 1.8z" />
                      </svg>
                      <span>4.9 Vendor Rating</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Item & Financials */}
            <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm">
              <h2 className="font-semibold text-gray-900 mb-4">Item & Financials</h2>
              <div className="flex flex-col sm:flex-row gap-4">
                <img
                  src="https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=200&h=150&fit=crop"
                  alt="MacBook Pro"
                  className="w-32 h-24 object-cover rounded-lg bg-gray-100"
                />
                <div className="flex-1">
                  <p className="font-medium text-gray-900">MacBook Pro 16" - M2 Max</p>
                  <p className="text-sm text-gray-500 mb-3">Order #ORD-5521 • Qty: 1</p>

                  <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Item Total</span>
                      <span className="font-medium text-gray-900">$3,499.00</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Escrow Fee (1.5%)</span>
                      <span className="font-medium text-gray-900">$52.48</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Shipping</span>
                      <span className="font-medium text-gray-900">$25.00</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Total Held in Escrow</span>
                      <span className="font-bold text-indigo-700">$3,576.48</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Audit Trail */}
            <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-semibold text-gray-900">Audit Trail</h2>
                <button className="flex items-center gap-1.5 text-sm text-indigo-600 hover:text-indigo-700" onClick={() => setActionMessage("Audit logs are ready to export.")}>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  Export Logs
                </button>
              </div>

              <div className="audit-events">
                {/* Pending */}
                <div className="audit-entry">
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <p className="font-medium text-gray-400">Funds Released</p>
                      <span className="text-xs text-gray-400">Pending</span>
                    </div>
                    <p className="text-sm text-gray-400">Awaiting admin or buyer confirmation.</p>
                  </div>
                </div>

                {/* Delivery Confirmed */}
                <div className="audit-entry">
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <p className="font-medium text-gray-900">Delivery Confirmed</p>
                      <span className="text-xs text-gray-500">Oct 28, 2023 - 14:32 PST</span>
                    </div>
                    <p className="text-sm text-gray-500">Courier reported successful delivery to buyer address.</p>
                  </div>
                </div>

                {/* Item Shipped */}
                <div className="audit-entry">
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <p className="font-medium text-gray-900">Item Shipped</p>
                      <span className="text-xs text-gray-500">Oct 26, 2023 - 09:15 PST</span>
                    </div>
                    <p className="text-sm text-gray-500">Tracking ID: #TRK-99281723 added by seller.</p>
                  </div>
                </div>

                {/* Funds Secured */}
                <div className="audit-entry">
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <p className="font-medium text-gray-900">Funds Secured in Escrow</p>
                      <span className="text-xs text-gray-500">Oct 24, 2023 - 11:45 PST</span>
                    </div>
                    <p className="text-sm text-gray-500">Payment of $3,576.48 verified and locked in escrow vault.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ========== RIGHT COLUMN ========== */}
          <div className="space-y-6">
            {/* Admin Decision */}
            <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h2 className="font-semibold text-gray-900">Admin Decision</h2>
              </div>

              <p className="text-sm text-gray-600 mb-5">
                Delivery has been confirmed. The buyer has not raised a dispute within the 48-hour inspection window. You may proceed with releasing the funds to the seller.
              </p>

              <button className="release-funds-button" onClick={() => { setStatus("Released"); setActionMessage("Funds released to the seller."); }}>
                {status === "Released" ? "Funds Released" : "Release Funds"}
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </button>

              <button className="hold-dispute-button" onClick={() => {
                if (!adminNotes.trim()) {
                  setActionMessage("Enter admin notes before placing a hold.");
                  return;
                }
                setStatus("Held for Dispute");
                setActionMessage("Funds held for dispute.");
              }}>
                Hold for Dispute
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </button>

              <div>
                <p className="text-sm font-medium text-gray-700 mb-1.5">Admin Notes (Required for Hold)</p>
                <textarea
                  rows={3}
                  placeholder="Enter justification for manual intervention..."
                  className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                  value={adminNotes}
                  onChange={(event) => setAdminNotes(event.target.value)}
                />
              </div>
            </div>

            {/* Security Checks */}
            <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h2 className="font-semibold text-gray-900">Security Checks</h2>
              </div>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Fraud Risk Score</span>
                  <span className="risk-score">
                    Low (12/100)
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Buyer KYC Status</span>
                  <span className="verified-status">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 20 20">
                      <path d="M4 10l4 4 8-8" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    Verified
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Seller KYC Status</span>
                  <span className="verified-status">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 20 20">
                      <path d="M4 10l4 4 8-8" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    Verified
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        {actionMessage && <div className="escrow-action-message" role="status">{actionMessage}<button aria-label="Dismiss message" onClick={() => setActionMessage("")}>×</button></div>}
      </main>
    </div>
  );
}

export default EscrowDetails;
