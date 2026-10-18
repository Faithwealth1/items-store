import { useState } from "react";

const roles = [
  { name: "Super Admin", icon: "shield", description: "Full system access and configuration.", users: 3 },
  { name: "Support Manager", icon: "support", description: "Ticket resolution and user support.", users: 12 },
  { name: "Finance Lead", icon: "finance", description: "Escrow management and payouts.", users: 5 },
  { name: "Content Mod", icon: "moderation", description: "Listing approval and flag resolution.", users: 8 },
];
const groups = [
  { title: "User Management", icon: "users", items: ["View Users", "Edit Users", "Delete Users", "Verify Sellers"] },
  { title: "Financials & Escrow", icon: "bank", items: ["View Financials", "Approve Payouts", "Resolve Disputes"] },
  { title: "Inventory & Moderation", icon: "box", items: ["Approve Listings", "Flag Items", "Remove Content"] },
  { title: "System Settings", icon: "settings", items: ["Manage Roles", "API Access", "Platform Logs"] },
];

function MatrixIcon({ name }) {
  const paths = {
    users: <><path d="M16 20v-1.5a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4V20" /><circle cx="9.5" cy="7" r="3.5" /><path d="M17 11a3.5 3.5 0 0 0 0-7m4 16v-1.5a4 4 0 0 0-3-3.9" /></>,
    bank: <><path d="m3 9 9-6 9 6M4 10h16M5 19h14M3 21h18M7 10v8m5-8v8m5-8v8" /></>,
    box: <><path d="M4 7h16v14H4zM4 7l2-4h12l2 4M8 11h8m-8 4h8" /></>,
    settings: <><path d="M12 8.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7Z" /><path d="m19.4 15 .1.1 1.2.9-1.2 2.1-1.4-.6a8 8 0 0 1-1.5.9l-.2 1.5h-2.4l-.3-1.5a8 8 0 0 1-1.6-.6l-1.3.7-1.5-2 1.1-1.1a7 7 0 0 1-.1-1.8l-1.2-.9 1.2-2.1 1.4.6a8 8 0 0 1 1.5-.9l.2-1.5h2.4l.3 1.5a8 8 0 0 1 1.6.6l1.3-.7 1.5 2-1.1 1.1c.2.6.2 1.2 0 1.8Z" /></>,
  };
  return <svg className="h-[14px] w-[14px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name]}</svg>;
}

function PermissionCenter({ setSidebarOpen }) {
  const [selected, setSelected] = useState("Super Admin");
  const [roleList, setRoleList] = useState(roles);
  const [enabled, setEnabled] = useState(() => Object.fromEntries(groups.flatMap(({ items }) => items.map((item) => [item, true]))));
  const [saved, setSaved] = useState(false);
  const [enforced, setEnforced] = useState(false);
  const [otherSessions, setOtherSessions] = useState(true);

  const exportAuditLog = () => {
    const rows = [["Role", "Permission", "Access"], ...groups.flatMap((group) => group.items.map((item) => [selected, item, enabled[item] ? "Allowed" : "Restricted"]))];
    const csv = rows.map((row) => row.map((cell) => `"${String(cell).replaceAll('"', '""')}"`).join(",")).join("\n");
    const url = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8" }));
    const link = document.createElement("a"); link.href = url; link.download = "permission-audit-log.csv"; link.click();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
  };

  const createRole = () => {
    const name = `Custom Role${roleList.length > roles.length ? ` ${roleList.length - roles.length + 1}` : ""}`;
    setRoleList((current) => [...current, { name, icon: "shield", description: "Custom access and permissions.", users: 0 }]);
    setSelected(name);
  };

  return <div className="flex min-w-0 flex-1 flex-col">
    <div className="lg:hidden flex items-center justify-between px-4 py-3 bg-white border-b border-gray-100">
      <button onClick={() => setSidebarOpen(true)} aria-label="Open navigation" className="p-2 rounded-lg hover:bg-gray-100"><svg className="h-6 w-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" /></svg></button>
      <b>Permissions &amp; Roles</b><span className="w-8" />
    </div>
    <main className="flex-1 overflow-auto px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
      <div className="mx-auto max-w-[960px]">
        <header className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div><h1 className="text-[32px] font-semibold leading-9 text-[#211f2b]">Permissions &amp; Roles</h1><p className="mt-2 text-sm text-gray-500">Manage administrative access levels and security groups.</p></div>
          <div className="flex flex-wrap gap-3">
            <button onClick={exportAuditLog} className="inline-flex h-[46px] items-center gap-2 rounded-lg border border-[#8c8798] px-4 text-sm font-medium text-gray-800 hover:bg-white"><span>⇩</span> Export Audit Log</button>
            <button onClick={createRole} className="inline-flex h-[46px] items-center gap-2 rounded-lg bg-[#3900e8] px-4 text-sm font-medium text-white hover:bg-[#3000c7]"><span className="text-lg">+</span> Create New Role</button>
          </div>
        </header>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-[repeat(4,minmax(0,1fr))_1.3fr]">
          {roleList.map((item) => <button key={item.name} onClick={() => { setSelected(item.name); setSaved(false); }} className={`relative min-h-[223px] overflow-hidden rounded-xl border bg-white p-4 text-left ${selected === item.name ? "border-2 border-[#3500d8]" : "border-[#d0c9df] hover:border-[#8f7bc8]"}`}>
            {selected === item.name && <>
              <span aria-hidden="true" className="absolute right-0 top-0 h-12 w-12 bg-[#d9ceff] [clip-path:polygon(0_0,100%_0,100%_100%)]" />
              <span className="absolute right-4 top-4 z-10 rounded-[5px] bg-[#3900d5] px-2 py-[5px] text-[10px] font-semibold leading-4 text-white">Active Edit</span>
            </>}
            <span className={`mb-4 grid h-10 w-10 place-items-center rounded-lg ${selected === item.name ? "bg-[#3900e8] text-white" : "bg-[#ece8f5] text-[#555263]"}`}><RoleGlyph name={item.icon} /></span>
            <strong className="block text-[15px] leading-6 text-[#242230]">{item.name}</strong><span className="mt-1 block min-h-10 text-xs leading-4 text-gray-500">{item.description}</span>
            <span className="mt-3 block border-t border-[#d0c9df] pt-3 text-xs font-medium text-gray-600">♧ {item.users} Users</span>
          </button>)}

          <section className="rounded-xl border border-[#d0c9df] bg-white p-5 shadow-sm">
            <h2 className="text-[15px] font-semibold text-[#242230]">🛡 Security Health</h2>
            <div className="mt-4 flex items-end justify-between text-xs text-gray-500"><span>2FA Enforcement</span><strong className="text-[27px] leading-7 text-[#22202d]">{enforced ? "100%" : "92%"}</strong></div>
            <div className="mt-2 h-2 overflow-hidden rounded-full bg-[#eee9f6]"><div className="h-full rounded-full bg-[#b94700]" style={{ width: enforced ? "100%" : "92%" }} /></div>
            <p className="mt-2 min-h-8 text-[11px] leading-4 text-gray-500">{enforced ? "Two-factor authentication is enforced for all accounts." : "2 accounts missing 2FA configuration."}</p>
            <button onClick={() => setEnforced((value) => !value)} className="mt-2 h-10 w-full rounded-lg border border-[#d0c9df] text-sm font-medium text-gray-800 hover:bg-[#f8f6fc]">{enforced ? "Policy Enforced" : "Enforce Policy"}</button>
          </section>
        </div>

        <div className="mt-7 grid grid-cols-1 items-start gap-8 xl:grid-cols-[minmax(0,1fr)_216px]">
          <section className="overflow-hidden rounded-xl border border-[#d0c9df] bg-white shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#d0c9df] bg-[#fcfaff] px-5 py-5"><div><h2 className="text-[15px] font-semibold text-[#242230]">☷ Permission Matrix: {selected}</h2><p className="mt-1 text-xs text-gray-500">Toggle specific access rights for this role.</p></div><button onClick={() => setSaved(true)} className="px-1 py-2 text-sm font-medium text-[#3900d8]">{saved ? "Saved" : "Save Changes"}</button></div>
            {groups.map((group) => <div key={group.title}>
              <div className="flex h-[53px] items-center gap-2 border-b border-[#d0c9df] px-4 text-sm font-medium text-[#292735]"><span className="text-gray-600"><MatrixIcon name={group.icon} /></span>{group.title}</div>
              <div className="grid min-h-[52px] grid-cols-1 gap-y-3 border-b border-[#d0c9df] px-4 py-3 sm:grid-cols-2 xl:grid-cols-4">
                {group.items.map((name) => <div key={name} className="flex items-center gap-3 text-[11px] text-[#34323f]"><button type="button" role="checkbox" aria-checked={Boolean(enabled[name])} aria-label={name} onClick={() => { setEnabled((current) => ({ ...current, [name]: !current[name] })); setSaved(false); }} className={`grid h-[22px] w-[22px] shrink-0 place-items-center rounded-[5px] border ${enabled[name] ? "border-[#3000c8] bg-[#3000c8] text-white" : "border-[#c9c4d8] bg-white"}`}>{enabled[name] && <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="m5 12 4 4L19 6" /></svg>}</button>{name}</div>)}
              </div>
            </div>)}
            {saved && <p role="status" className="px-5 py-2 text-xs text-green-700">Changes saved successfully.</p>}
          </section>

          <section className="rounded-xl border border-[#d0c9df] bg-white p-5 shadow-sm">
            <h2 className="text-[15px] font-semibold text-[#242230]">▣ Active Sessions</h2>
            <div className="mt-4 flex gap-3 border-b border-[#d0c9df] pb-3"><span className="grid h-8 w-8 shrink-0 place-items-center rounded border border-[#d0c9df] bg-[#f6f2fc] text-gray-500">▱</span><div><p className="text-[13px] font-medium leading-5 text-gray-800">Admin Web Portal</p><p className="text-[10px] leading-4 text-gray-500">192.168.1.45 • Lagos, NG</p><p className="mt-1 text-[10px] text-orange-700">Current Session</p></div></div>
            {otherSessions && <div className="mt-4 flex gap-3 border-b border-[#d0c9df] pb-3"><span className="grid h-8 w-8 shrink-0 place-items-center rounded border border-[#d0c9df] bg-[#f6f2fc] text-gray-500">▯</span><div><p className="text-[13px] font-medium leading-5 text-gray-800">Mobile App (iOS)</p><p className="text-[10px] leading-4 text-gray-500">10.0.0.12 • Abuja, NG</p><p className="mt-1 text-[10px] text-gray-500">Active 2 hrs ago</p></div></div>}
            {otherSessions ? <button onClick={() => setOtherSessions(false)} className="mt-4 text-[13px] font-medium text-red-600 hover:text-red-800">⇥ &nbsp;Terminate All Others</button> : <p className="mt-4 text-xs text-gray-500">Only the current session is active.</p>}
          </section>
        </div>
      </div>
    </main>
  </div>;
}

function RoleGlyph({ name }) {
  const path = name === "support" ? "M4 13v-2a8 8 0 0 1 16 0v2m-16 0h3v6H5a2 2 0 0 1-2-2v-2a2 2 0 0 1 1-2Zm16 0h-3v6h2a2 2 0 0 0 2-2v-2a2 2 0 0 0-1-2Z" : name === "finance" ? "M3 7h18v13H3zM3 7l3-3h15v3M6 11h5v5H6zM14 12h4" : name === "moderation" ? "M12 3a8 8 0 1 0 0 16 8 8 0 0 0 0-16Zm-2 6 4 4m0-4-4 4" : "M12 2 20 5v6c0 5-3.5 8.5-8 11-4.5-2.5-8-6-8-11V5l8-3Z";
  return <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={path} /></svg>;
}

export default PermissionCenter;
