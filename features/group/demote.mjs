const handle = {
  say: ["demote", "dm"],
  category: "#group",
  describe: "Menurunkan Jabatan Admin Group",
  master: async (m, { q, conn, isBotAdmin, isAdmin, repl }) => {
    if (!isAdmin && !m.isOwn) return repl(q.admin);
    if (!isBotAdmin) return repl(q.botadmin);
    let user = m.rtarget ?? m.mentionedJid[0] ?? m.quoted?.sender ?? m.query.replace(/[^0-9]/g, "") + "@s.whatsapp.net";
    conn
      .groupParticipantsUpdate(m.chat, [user], "demote")
      .then((v) => repl(q.sukses))
      .catch((v) => repl(q.gagal));
  }
};

export default handle;
