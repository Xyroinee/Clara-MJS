import { imgToStiker, vidToStiker } from "../../utils/lib/convert.media.lib.mjs";

const handle = {
  main: async (m, { q, d, conn, quoted, bot, db }) => {
    if (!m.isGc) return;
    let i = db.grup.findIndex((v) => v[0] == m.chat);
    let n = db.set.findIndex((v) => v[0] == bot);
    if (db.grup[i][1].autostik) {
      if (m.mtype === "imageMessage") {
        let dl = await imgToStiker(await m.download(), {
          name: db.set[n][1].pack,
          author: db.set[n][1].auth
        });
        conn.sendstik(m.chat, dl, d.f1("Auto Stiker Group!!!", ""));
      }
      if (m.mtype === "videoMessage") {
        if ((quoted.msg || quoted).seconds >= 9) return;
        let dl = await vidToStiker(await m.download(), {
          name: db.set[n][1].pack,
          author: db.set[n][1].auth
        });
        conn.sendstik(m.chat, dl, d.f1("Auto Stiker Group!!!", ""));
      }
    }
  }
};

export default handle;
