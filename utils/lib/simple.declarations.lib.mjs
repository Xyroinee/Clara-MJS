import configs from "../../Setting/settings.mjs";
const { jidDecode } = (await import("baileys")).default;
import Jimp from "jimp";
import fs from "node:fs";

const simpleDeclarations = async (chat) => {
  try {
    /*
     * Regex mention match
     * @param {String} query
     * @returns
     * By Bolaxd
     */
    chat.ments = async (query) => {
      return new Promise((r, j) =>
        r(query.match("@") ? [...query.matchAll(/@([0-9]{5,16}|0)/g)].map((v) => v[1] + configs.idwa) : [])
      );
    };
    /*
     * Create jid at id
     * @param {String} chatId
     * @returns chatId
     * By Bolaxd
     */
    chat.createJid = (chatId) => {
      if (!chatId) return chatId;
      if (/:\d+@/gi.test(chatId)) {
        let decode = jidDecode(chatId) || {};
        return (decode.user && decode.server && decode.user + "@" + decode.server) || chatId;
      } else return chatId;
    };
    /*
     * Send Kontak maybe
     * @param {String} chatId
     * @param {String} teks
     * @param {Array} arr
     * @param {String} quoted
     * @param {Object} opts
     * @returns
     * By Bolaxd
     */
    chat.sendkon = async (chatId, teks, arr = [...[0, 1, 2]], quoted = "", opts = {}) => {
      var push = [];
      for (let i of arr)
        push.push({
          displayName: "",
          vcard:
            "BEGIN:VCARD\n" +
            "VERSION:3.0\n" +
            "FN:" +
            i[0] +
            "\n" +
            "ORG:" +
            i[2] +
            ";\n" +
            "TEL;type=CELL;type=VOICE;waid=" +
            i[1] +
            ":" +
            i[1] +
            "\n" +
            "END:VCARD"
        });
      return new Promise((r, j) =>
        r(chat.sendMessage(chatId, { contacts: { displayName: teks, contacts: push }, ...opts }, { quoted }))
      );
    };
    /*
     * Send Button teks
     * @param {String} chatId
     * @param {String} teks
     * @param {String} foot
     * @param {Array} but
     * @param {String} quoted
     * @param {Object} opts
     * @returns
     * By Bolaxd
     */
    chat.sendlist = async (chatId, teks, foot, but = [...[(dis = ""), (id = ""), (des = "")]], quoted = "") => {
      let coi = [];
      for (let u of but) coi.push({ title: u[0], rowId: u[1], description: u[2] });
      return new Promise((r, j) =>
        r(
          chat.sendMessage(
            chatId,
            {
              text: teks,
              footer: foot,
              title: null,
              buttonText: "Click Here",
              sections: [{ title: "Ballbot", rows: coi }]
            },
            { quoted }
          )
        )
      );
    };
    /*
     * Send Button teks
     * @param chatId
     * @param {String} text
     * @param {String} footer
     * @param {Array} but
     * @param {String} men
     * @param {Object} opts
     * @returns
     * By Bolaxd
     */
    chat.butteks = async (chatId, text, footer, but = [...[dis, id]], quoted = "", opts = {}) => {
      let button = [];
      for (let i of but) button.push({ buttonId: i[1], buttonText: { displayText: i[0] }, type: 1 });
      return new Promise((r, j) =>
        r(chat.sendMessage(chatId, { text: text, footer, buttons: button, headerType: 2, ...opts }, { quoted }))
      );
    };
    /*
     * Send Teks biasaa
     * @param {String} chatId
     * @param {String} text
     * @param {String} quoted
     * @param {Object} opts
     * @returns
     * By Bolaxd
     */
    chat.sendteks = async (chatId, text, quoted = "", opts = {}) => {
      return new Promise((r, j) => r(chat.sendMessage(chatId, { text, ...opts }, { quoted })));
    };

    // SEND MEDIA FROM  URL

    /*
     * Send Button Video
     * @param {String} chatId
     * @param {String} vid
     * @param {String} text
     * @param {String} footer
     * @param {Array} but
     * @param {String} men
     * @param {Object} opts
     * @returns
     * By Bolaxd
     */
    chat.butvid = async (chatId, vid, text, footer, but = [...[dis, id]], quoted = "", opts = {}) => {
      let button = [];
      for (let i of but) button.push({ buttonId: i[1], buttonText: { displayText: i[0] }, type: 1 });
      return new Promise(() =>
        chat.sendMessage(
          chatId,
          { video: { url: vid }, caption: text, footer, buttons: button, headerType: 5, ...opts },
          { quoted }
        )
      );
    };
    /*
     * Send Button Image
     * @param {String} chatId
     * @param {String} img
     * @param {String} text
     * @param {String} footer
     * @param {Array} but
     * @param {String} men
     * @param {Object} opts
     * @returns
     * By Bolaxd
     */
    chat.butimg = async (chatId, img, text, footer, but = [...[dis, id]], quoted = "", opts = {}) => {
      let button = [];
      for (let i of but) button.push({ buttonId: i[1], buttonText: { displayText: i[0] }, type: 1 });
      return new Promise(() =>
        chat.sendMessage(
          chatId,
          { image: { url: img }, caption: text, footer, buttons: button, headerType: 4, ...opts },
          { quoted }
        )
      );
    };
    /*
     * Send Image
     * @param {String} chatId
     * @param {String} text
     * @param {Buffer} image
     * @returns
     * By Bolaxd
     */
    chat.sendimg = async (chatId, img, teks = "", quoted = "", opts = {}) => {
      return new Promise(() => chat.sendMessage(chatId, { image: { url: img }, caption: teks }, { quoted }, opts));
    };
    /*
     * Send Video
     * @param {String} chatId
     * @param {String} text
     * @param {Buffer} vid
     * @returns
     * By Bolaxd
     */
    chat.sendvid = async (chatId, vid, teks = "", quoted = "", opts = {}) => {
      return new Promise(() => chat.sendMessage(chatId, { video: { url: vid }, caption: teks }, { quoted }, opts));
    };
    /*
     * Send Audio
     * @param {String} chatId
     * @param {String} text
     * @param {Buffer} aud
     * @returns
     * By Bolaxd
     */
    chat.sendaud = async (chatId, aud, quoted = "", opts = {}) => {
      return new Promise(() =>
        chat.sendMessage(chatId, { audio: { url: aud }, mimetype: "audio/mp4" }, { quoted }, opts)
      );
    };
    /*
     * Send Document
     * @param {String} chatId
     * @param {String} text
     * @param {Buffer} doc
     * @returns
     * By Bolaxd
     */
    chat.senddoc = async (chatId, doc, name = "", mime = "", quoted = "", opts = {}) => {
      return new Promise(() =>
        chat.sendMessage(chatId, { document: { url: doc }, mimetype: mime, fileName: name }, { quoted }, opts)
      );
    };

    /*
     * Send Video use buffer
     * @param {String} chatId
     * @param {String} text
     * @param {Buffer} path
     * @returns
     * By Bolaxd
     */
    chat.sendvidbuf = async (chatId, path, teks = "", quoted = "", opts = {}) => {
      return new Promise(() => chat.sendMessage(chatId, { video: path, caption: teks }, { quoted }, opts));
    };
    /*
     * Send Image use buffer
     * @param {String} chatId
     * @param {String} text
     * @param {Buffer} path
     * @returns
     * By Bolaxd
     */
    chat.sendimgbuf = async (chatId, buff, teks = "", quoted = "", opts = {}) => {
      return new Promise(() => chat.sendMessage(chatId, { image: buff, caption: teks }, { quoted }, opts));
    };
    /*
     * Send Audio from local
     * @param {String} chatId
     * @param {String} text
     * @param {Buffer} aud
     * @returns
     * By Bolaxd
     */
    chat.sendaudlok = async (chatId, path, teks = "", quoted = "", opts = {}) => {
      return new Promise(async () =>
        chat.sendMessage(chatId, { audio: await fs.readFileSync(path) }, { quoted }, opts)
      );
    };
    /*
     * Send Document from local
     * @param {String} chatId
     * @param {String} text
     * @param {Buffer} doc
     * @returns
     * By Bolaxd
     */
    chat.senddoclok = async (chatId, path, name = "", mime = "", quoted = "", opts = {}) => {
      return new Promise(async () =>
        chat.sendMessage(
          chatId,
          { document: await fs.readFileSync(path), mimetype: mime, fileName: name },
          { quoted },
          opts
        )
      );
    };
    // hot restart // using pm2 for guide it
    chat.restart = async (m) => {
      if (/pm2/i.test(process.env._)) eval("process.exit()");
      else
        return new Promise(() => chat.sendteks(m.chat, "silahkan gunakan PM2 untuk menggunakan auto restart App", m));
    };
    /*
     * Send Stiker from local
     * @param {String} chatId
     * @param {Object} opts
     * @param {Buffer} path
     * @returns
     * By Bolaxd
     */
    chat.sendstik = async (chatId, path, quoted = "", opts = {}) => {
      return new Promise(() => chat.sendMessage(chatId, { sticker: path, ...opts }, { quoted }));
    };
    /*
     * Regenerate resize from Jimp
     * @param {Buffer} buff
     * @returns
     * By Bochiel team
     */
    chat.resize = async (buff) => {
      const jimp = await Jimp.read(buff);
      const crop = jimp.crop(0, 0, await jimp.getWidth(), await jimp.getHeight());
      return {
        img: await crop.scaleToFit(720, 720).getBufferAsync(Jimp.MIME_JPEG),
        preview: await crop.scaleToFit(720, 720).getBufferAsync(Jimp.MIME_JPEG)
      };
    };
    /**
     * create Profile
     * @param {String} chatId
     * @param {Buffer} img
     * @returns
     */
    chat.createprofile = async (chatId, buff) => {
      const { img } = await chat.resize(buff);
      return chat.query({
        tag: "iq",
        attrs: { to: chatId, type: "set", xmlns: "w:profile:picture" },
        content: [{ tag: "picture", attrs: { type: "image" }, content: img }]
      });
    };
    /**
     * Write file using fs
     * @param {String} path path located json file
     * @param {Object} db database in save file
     * @returns
     * Created by Bolaxd
     */
    chat.writejson = (path, db) => fs.writeFileSync(path, JSON.stringify(db, null, 2));
    /**
     * Read file using fs and callback
     * @param {String} path path to located file JSON
     * @param {callback} cb callback form function
     * @returns
     * Created by Bolaxd
     */
    chat.readjson = (path) => JSON.parse(fs.readFileSync(path, "utf-8"));
    return chat;
  } catch (e) {
    console.log(e);
  }
};

export default simpleDeclarations;
