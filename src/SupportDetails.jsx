import { useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function SupportDetails({ setSidebarOpen }) {
  const navigate = useNavigate();
  const { id } = useParams();
  const [message, setMessage] = useState("");
  const [internalNote, setInternalNote] = useState(false);
  const [ticketClosed, setTicketClosed] = useState(false);
  const [draftSaved, setDraftSaved] = useState(false);
  const [attachment, setAttachment] = useState("");
  const [notice, setNotice] = useState("");
  const [replies, setReplies] = useState([]);
  const messageInput = useRef(null);
  const fileInput = useRef(null);
  const applyFormat = (prefix, suffix = prefix) => {
    const input = messageInput.current;
    if (!input) return;
    const start = input.selectionStart;
    const end = input.selectionEnd;
    const selected = message.slice(start, end) || "text";
    const updated = `${message.slice(0, start)}${prefix}${selected}${suffix}${message.slice(end)}`;
    setMessage(updated);
    requestAnimationFrame(() => {
      input.focus();
      input.setSelectionRange(start + prefix.length, start + prefix.length + selected.length);
    });
  };
  const sendReply = () => {
    if (!message.trim() && !attachment) { setNotice("Write a message or attach a file before sending."); return; }
    setReplies((current) => [...current, { text: message.trim(), internal: internalNote, attachment }]);
    setMessage(""); setAttachment(""); setInternalNote(false); setDraftSaved(false);
    setNotice(internalNote ? "Internal note added." : "Reply sent.");
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
        <span className="font-semibold text-gray-800">Support Details</span>
        <div className="w-8" />
      </div>

      <main className="support-details-main flex-1 p-4 sm:p-6 lg:p-8 overflow-auto">
        {/* Breadcrumb + Actions */}
        <div className="support-details-header flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
              <button onClick={() => navigate("/support")} className="hover:text-indigo-600">
                Support
              </button>
              <span>›</span>
              <span className="text-gray-800 font-medium">Ticket #{id}</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-semibold text-gray-900">
              Payment verification failed for Order #ORD-291
            </h1>
          </div>

          <div className="flex gap-2">
            <button onClick={() => window.print()} className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-sm text-gray-700 hover:bg-gray-50">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
              </svg>
              Print
            </button>
            <button onClick={() => { setTicketClosed((closed) => !closed); setNotice(ticketClosed ? "Ticket reopened." : "Ticket closed."); }} className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-lg">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
              {ticketClosed ? "Reopen Ticket" : "Close Ticket"}
            </button>
          </div>
        </div>

        <div className="support-details-grid grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* ========== LEFT / MAIN COLUMN ========== */}
          <div className="xl:col-span-2 space-y-6">
            {/* Conversation */}
            <div className="support-conversation bg-white rounded-xl border border-gray-100 p-5 shadow-sm space-y-6">
              {/* User Message */}
              <div className="flex gap-3">
                <img className="support-avatar" src="/items/david-profile.png" alt="David Ojo" />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium text-gray-900">David Ojo</span>
                    <span className="text-xs text-gray-500">Today, 10:24 AM</span>
                  </div>
                  <div className="support-customer-message bg-gray-50 rounded-2xl rounded-tl-none px-4 py-3 text-sm text-gray-700">
                    Hello, I've been trying to complete the payment for my recent order (ORD-291), but it keeps failing at the verification stage. My bank says the transaction is going through on their end, but the app shows "Verification Pending" and then times out. Can you look into this?
                  </div>
                </div>
              </div>

              {/* System Note */}
              <div className="flex justify-center">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-gray-100 rounded-full text-xs text-gray-600">
                  <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                  System: Escalated to Level 2 Support - Payment Gateway Issue
                </div>
              </div>

              {/* Admin Reply */}
              <div className="flex gap-3 justify-end">
                <div className="flex-1 max-w-xl">
                  <div className="flex items-center justify-end gap-2 mb-1">
                    <span className="text-xs text-gray-500">Today, 11:05 AM</span>
                    <span className="font-medium text-gray-900">Sarah (Admin)</span>
                  </div>
                  <div className="support-admin-message bg-indigo-600 text-white rounded-2xl rounded-tr-none px-4 py-3 text-sm">
                    Hi David, I apologize for the inconvenience. I'm looking into the logs right now. It appears there might be a sync issue with our payment processor for your specific transaction block. Let me manually verify the payment status on our backend.
                  </div>
                </div>
                <img className="support-avatar" src="/items/sarah-admin.png" alt="Sarah, administrator" />
              </div>
              {replies.map((reply, index) => <div key={index} className={`support-new-reply ${reply.internal ? "support-note" : ""}`}><img className="support-avatar" src="/items/sarah-admin.png" alt="Sarah, administrator" /><div><div className="support-reply-heading">Sarah (Admin) <span>Just now{reply.internal ? " · Internal note" : ""}</span></div><div className="support-admin-message">{reply.text}{reply.attachment && <p className="support-attachment">Attached: {reply.attachment}</p>}</div></div></div>)}
            </div>

            {/* Reply Box */}
            <div className="support-composer bg-white rounded-xl border border-gray-100 p-4 shadow-sm">
              {/* Toolbar */}
              <div className="support-toolbar flex items-center gap-1 border-b border-gray-100 pb-3 mb-3">
                <button type="button" title="Bold" aria-label="Bold" onClick={() => applyFormat("**")} className="p-1.5 rounded hover:bg-gray-100 text-gray-600 font-bold text-sm">B</button>
                <button type="button" title="Italic" aria-label="Italic" onClick={() => applyFormat("_", "_")} className="p-1.5 rounded hover:bg-gray-100 text-gray-600 italic text-sm">I</button>
                <button type="button" title="Attach file" aria-label="Attach file" onClick={() => fileInput.current?.click()} className="p-1.5 rounded hover:bg-gray-100 text-gray-600">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21.44 11.05l-9.19 9.19a6 6 0 01-8.49-8.49l9.19-9.19a4 4 0 015.66 5.65l-9.2 9.2a2 2 0 01-2.83-2.83l8.49-8.48" />
                  </svg>
                </button>
                <button type="button" title="Add image" aria-label="Add image" onClick={() => fileInput.current?.click()} className="p-1.5 rounded hover:bg-gray-100 text-gray-600">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </button>
              </div>
              <input ref={fileInput} type="file" className="support-file-input" accept="image/*,.pdf,.txt,.doc,.docx" onChange={(event) => { const file = event.target.files?.[0]; if (file) setAttachment(file.name); }} />

              <textarea
                ref={messageInput}
                rows={4}
                value={message}
                onChange={(event) => { setMessage(event.target.value); setDraftSaved(false); }}
                placeholder="Type your message here..."
                className="support-message-input w-full text-sm border-0 focus:outline-none resize-none placeholder-gray-400"
              />
              {attachment && <div className="support-attachment-chip">{attachment}<button type="button" aria-label="Remove attachment" onClick={() => { setAttachment(""); if (fileInput.current) fileInput.current.value = ""; }}>×</button></div>}

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mt-3 pt-3 border-t border-gray-100">
                <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
                  <input type="checkbox" checked={internalNote} onChange={(event) => setInternalNote(event.target.checked)} className="rounded border-gray-300" />
                  Mark as Internal Note
                </label>

                <div className="flex gap-2">
                  <button type="button" onClick={() => { setDraftSaved(true); setNotice("Draft saved on this device."); }} className="px-4 py-2 border border-gray-200 rounded-lg text-sm text-gray-700 hover:bg-gray-50">
                    {draftSaved ? "Draft Saved" : "Save Draft"}
                  </button>
                  <button type="button" onClick={sendReply} className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg">
                    Send
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M2.01 21 23 12 2.01 3 2 10l15 2-15 2z" />
                    </svg>
                  </button>
                </div>
              </div>
              {notice && <div className="support-notice" role="status">{notice}<button type="button" aria-label="Dismiss notification" onClick={() => setNotice("")}>×</button></div>}
            </div>
          </div>

          {/* ========== RIGHT SIDEBAR ========== */}
          <div className="space-y-6">
            {/* Ticket Details */}
            <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm">
              <h2 className="font-semibold text-gray-900 mb-4">Ticket Details</h2>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Ticket ID</span>
                  <span className="font-medium text-gray-900">#TK-8492</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-500">Status</span>
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${ticketClosed ? "bg-gray-100 text-gray-700" : "bg-orange-100 text-orange-700"}`}>
                    {ticketClosed ? "Closed" : "Open"}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-500">Priority</span>
                  <span className="flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-pink-100 text-pink-700">
                    High
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M3 6a3 3 0 013-3h10a1 1 0 01.8 1.6L14.25 8l2.55 3.4A1 1 0 0116 13H6a1 1 0 00-1 1v3a1 1 0 11-2 0V6z" clipRule="evenodd" />
                    </svg>
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Created</span>
                  <span className="font-medium text-gray-900">Oct 24, 2023 10:24 AM</span>
                </div>
              </div>
            </div>

            {/* User Profile */}
            <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm">
              <h2 className="font-semibold text-gray-900 mb-4">User Profile</h2>

              <div className="flex items-center gap-3 mb-4">
                <img className="support-profile-avatar" src="/items/david-profile.png" alt="David Ojo" />
                <div>
                  <p className="font-medium text-gray-900">David Ojo</p>
                  <p className="text-sm text-gray-500">david.ojo@example.com</p>
                </div>
              </div>

              <div className="space-y-2 text-sm mb-4">
                <div className="flex justify-between">
                  <span className="text-gray-500">Total Orders</span>
                  <span className="font-medium text-gray-900">14</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Member Since</span>
                  <span className="font-medium text-gray-900">Jan 2022</span>
                </div>
              </div>

              <button className="w-full py-2 border border-gray-200 rounded-lg text-sm text-indigo-600 hover:bg-indigo-50 font-medium">
                View Full Profile
              </button>
            </div>

            {/* Internal Actions */}
            <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm">
              <h2 className="font-semibold text-gray-900 mb-4">Internal Actions</h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-500 mb-1.5">Assign To</label>
                  <select className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500">
                    <option>Sarah (Current)</option>
                    <option>John Doe</option>
                    <option>Alice Smith</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm text-gray-500 mb-1.5">Change Status</label>
                  <select className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500">
                    <option>Open</option>
                    <option>Pending</option>
                    <option>Resolved</option>
                    <option>Closed</option>
                  </select>
                </div>

                <button onClick={() => { setInternalNote(true); messageInput.current?.focus(); }} className="w-full py-2.5 bg-indigo-50 text-indigo-700 rounded-lg text-sm font-medium hover:bg-indigo-100 flex items-center justify-center gap-2">
                  Add Internal Note
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 5v14m7-7H5" /></svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default SupportDetails;
