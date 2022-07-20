# Utility functions and methods
These are just some generic util functions and trinkets to help with app development.

&nbsp;

## Parse int safely
Use this in combination with `isNaN()` to parse user-provided numbers without crashes.
```javascript
const parseIntSafe = (a) => {
  try {
    return parseInt(a);
  } catch(err) {
    return NaN;
  }
}
```

## Seconds and milliseconds to HH:MM:SS
```javascript
function nollify(n) {
  return `${n < 10 ? `0${n}` : n}`;
}

function secondsToHHMMSS(s) {
  return [
    nollify(((s - s % 3600) / 3600) % 60),
    nollify(((s - s % 60) / 60) % 60),
    nollify(s % 60)
  ].join(':');
}

function millisToHHMMSS(s) {
  return secondsToHHMMSS(Math.floor(s/1000));
}
```

&nbsp;

## Common regex patterns

### Matching fancy Unicode fonts
These are commonly used by spambots
```javascript
const MATH_LETTER_MATCH = /[\u{1D400}-\u{1D7FF}]/gu;
```

### Matching emojis
```javascript
const EMOJI_MATCH = /\p{Emoji}/gu;
```

### Matching an email address (simple)
```javascript
const EMAIL_MATCH = /([a-zA-Z0-9+._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/gmi;
```

### Matching (most) Cyrillic letters (Russian)
```javascript
const CYRILLIC_MATCH = /[АаБбВвГгДдЕеЁёЖжЗзИиЙйКкЛлМмНнОоПпРрСсТтУуФфХхЦцЧчШшЩщЪъЫыЬьЭэЮюЯя]/gumi;
```

### Matching an URL
```javascript
const URL_MATCH = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gmi;
```

&nbsp;

## Fancy Unicode fonts
Use `getFont(fontId, text)` to display any text in one of the fancy fonts, for example `getFont('calligraphy', 'Tip Menu')`.
```javascript
const FONTS = {
  calligraphy: `𝔄 𝔅 ℭ 𝔇 𝔈 𝔉 𝔊 ℌ ℑ 𝔍 𝔎 𝔏 𝔐 𝔑 𝔒 𝔓 𝔔 ℜ 𝔖 𝔗 𝔘 𝔙 𝔚 𝔛 𝔜 ℨ 𝔞 𝔟 𝔠 𝔡 𝔢 𝔣 𝔤 𝔥 𝔦 𝔧 𝔨 𝔩 𝔪 𝔫 𝔬 𝔭 𝔮 𝔯 𝔰 𝔱 𝔲 𝔳 𝔴 𝔵 𝔶 𝔷 0 1 2 3 4 5 6 7 8 9`,
  calligraphy_bold: `𝕬 𝕭 𝕮 𝕯 𝕰 𝕱 𝕲 𝕳 𝕴 𝕵 𝕶 𝕷 𝕸 𝕹 𝕺 𝕻 𝕼 𝕽 𝕾 𝕿 𝖀 𝖁 𝖂 𝖃 𝖄 𝖅 𝖆 𝖇 𝖈 𝖉 𝖊 𝖋 𝖌 𝖍 𝖎 𝖏 𝖐 𝖑 𝖒 𝖓 𝖔 𝖕 𝖖 𝖗 𝖘 𝖙 𝖚 𝖛 𝖜 𝖝 𝖞 𝖟 0 1 2 3 4 5 6 7 8 9`,
  script: `𝓐 𝓑 𝓒 𝓓 𝓔 𝓕 𝓖 𝓗 𝓘 𝓙 𝓚 𝓛 𝓜 𝓝 𝓞 𝓟 𝓠 𝓡 𝓢 𝓣 𝓤 𝓥 𝓦 𝓧 𝓨 𝓩 𝓪 𝓫 𝓬 𝓭 𝓮 𝓯 𝓰 𝓱 𝓲 𝓳 𝓴 𝓵 𝓶 𝓷 𝓸 𝓹 𝓺 𝓻 𝓼 𝓽 𝓾 𝓿 𝔀 𝔁 𝔂 𝔃 0 1 2 3 4 5 6 7 8 9`,
  script_bold: `𝒜 𝐵 𝒞 𝒟 𝐸 𝐹 𝒢 𝐻 𝐼 𝒥 𝒦 𝐿 𝑀 𝒩 𝒪 𝒫 𝒬 𝑅 𝒮 𝒯 𝒰 𝒱 𝒲 𝒳 𝒴 𝒵 𝒶 𝒷 𝒸 𝒹 𝑒 𝒻 𝑔 𝒽 𝒾 𝒿 𝓀 𝓁 𝓂 𝓃 𝑜 𝓅 𝓆 𝓇 𝓈 𝓉 𝓊 𝓋 𝓌 𝓍 𝓎 𝓏 𝟢 𝟣 𝟤 𝟥 𝟦 𝟧 𝟨 𝟩 𝟪 𝟫`,
  double: `𝔸 𝔹 ℂ 𝔻 𝔼 𝔽 𝔾 ℍ 𝕀 𝕁 𝕂 𝕃 𝕄 ℕ 𝕆 ℙ ℚ ℝ 𝕊 𝕋 𝕌 𝕍 𝕎 𝕏 𝕐 ℤ 𝕒 𝕓 𝕔 𝕕 𝕖 𝕗 𝕘 𝕙 𝕚 𝕛 𝕜 𝕝 𝕞 𝕟 𝕠 𝕡 𝕢 𝕣 𝕤 𝕥 𝕦 𝕧 𝕨 𝕩 𝕪 𝕫 𝟘 𝟙 𝟚 𝟛 𝟜 𝟝 𝟞 𝟟 𝟠 𝟡`,
  wide: `Ａ Ｂ Ｃ Ｄ Ｅ Ｆ Ｇ Ｈ Ｉ Ｊ Ｋ Ｌ Ｍ Ｎ Ｏ Ｐ Ｑ Ｒ Ｓ Ｔ Ｕ Ｖ Ｗ Ｘ Ｙ Ｚ ａ ｂ ｃ ｄ ｅ ｆ ｇ ｈ ｉ ｊ ｋ ｌ ｍ ｎ ｏ ｐ ｑ ｒ ｓ ｔ ｕ ｖ ｗ ｘ ｙ ｚ ０ １ ２ ３ ４ ５ ６ ７ ８ ９`,
  weird: `ꪖ ᥇ ᥴ ᦔ ꫀ ᠻ ᧁ ꫝ ꠸ ꠹ ᛕ ꪶ ꪑ ꪀ ꪮ ρ ꪇ ᥅ ᦓ ꪻ ꪊ ꪜ ᭙ ᥊ ꪗ ƺ ꪖ ᥇ ᥴ ᦔ ꫀ ᠻ ᧁ ꫝ ꠸ ꠹ ᛕ ꪶ ꪑ ꪀ ꪮ ρ ꪇ ᥅ ᦓ ꪻ ꪊ ꪜ ᭙ ᥊ ꪗ ƺ ᦲ ᧒ ᒿ ᗱ ᔰ Ƽ ᦆ ᒣ Ზ ၦ`,
  small: `ᴀ ʙ ᴄ ᴅ ᴇ ꜰ ɢ ʜ ɪ ᴊ ᴋ ʟ ᴍ ɴ ᴏ ᴘ Q ʀ ꜱ ᴛ ᴜ ᴠ ᴡ x ʏ ᴢ ᴀ ʙ ᴄ ᴅ ᴇ ꜰ ɢ ʜ ɪ ᴊ ᴋ ʟ ᴍ ɴ ᴏ ᴘ Q ʀ ꜱ ᴛ ᴜ ᴠ ᴡ x ʏ ᴢ 0 1 2 3 4 5 6 7 8 9`,
  block: `🄰 🄱 🄲 🄳 🄴 🄵 🄶 🄷 🄸 🄹 🄺 🄻 🄼 🄽 🄾 🄿 🅀 🅁 🅂 🅃 🅄 🅅 🅆 🅇 🅈 🅉 🄰 🄱 🄲 🄳 🄴 🄵 🄶 🄷 🄸 🄹 🄺 🄻 🄼 🄽 🄾 🄿 🅀 🅁 🅂 🅃 🅄 🅅 🅆 🅇 🅈 🅉 0 1 2 3 4 5 6 7 8 9`,
  block_black: `🅰 🅱 🅲 🅳 🅴 🅵 🅶 🅷 🅸 🅹 🅺 🅻 🅼 🅽 🅾 🅿 🆀 🆁 🆂 🆃 🆄 🆅 🆆 🆇 🆈 🆉 🅰 🅱 🅲 🅳 🅴 🅵 🅶 🅷 🅸 🅹 🅺 🅻 🅼 🅽 🅾 🅿 🆀 🆁 🆂 🆃 🆄 🆅 🆆 🆇 🆈 🆉 0 1 2 3 4 5 6 7 8 9`,
  circle: `Ⓐ Ⓑ Ⓒ Ⓓ Ⓔ Ⓕ Ⓖ Ⓗ Ⓘ Ⓙ Ⓚ Ⓛ Ⓜ Ⓝ Ⓞ Ⓟ Ⓠ Ⓡ Ⓢ Ⓣ Ⓤ Ⓥ Ⓦ Ⓧ Ⓨ Ⓩ ⓐ ⓑ ⓒ ⓓ ⓔ ⓕ ⓖ ⓗ ⓘ ⓙ ⓚ ⓛ ⓜ ⓝ ⓞ ⓟ ⓠ ⓡ ⓢ ⓣ ⓤ ⓥ ⓦ ⓧ ⓨ ⓩ ⓪ ① ② ③ ④ ⑤ ⑥ ⑦ ⑧ ⑨`,
  serif: `A B C D E F G H I J K L M N O P Q R S T U V W X Y Z α Ⴆ ƈ ԃ ҽ ϝ ɠ ԋ ι ʝ ƙ ʅ ɱ ɳ σ ρ ϙ ɾ ʂ ƚ υ ʋ ɯ x ყ ȥ 0 1 2 3 4 5 6 7 8 9`,
  serif_bold: `𝐀 𝐁 𝐂 𝐃 𝐄 𝐅 𝐆 𝐇 𝐈 𝐉 𝐊 𝐋 𝐌 𝐍 𝐎 𝐏 𝐐 𝐑 𝐒 𝐓 𝐔 𝐕 𝐖 𝐗 𝐘 𝐙 𝐚 𝐛 𝐜 𝐝 𝐞 𝐟 𝐠 𝐡 𝐢 𝐣 𝐤 𝐥 𝐦 𝐧 𝐨 𝐩 𝐪 𝐫 𝐬 𝐭 𝐮 𝐯 𝐰 𝐱 𝐲 𝐳 𝟎 𝟏 𝟐 𝟑 𝟒 𝟓 𝟔 𝟕 𝟖 𝟗`,
  sans: `𝗔 𝗕 𝗖 𝗗 𝗘 𝗙 𝗚 𝗛 𝗜 𝗝 𝗞 𝗟 𝗠 𝗡 𝗢 𝗣 𝗤 𝗥 𝗦 𝗧 𝗨 𝗩 𝗪 𝗫 𝗬 𝗭 𝗮 𝗯 𝗰 𝗱 𝗲 𝗳 𝗴 𝗵 𝗶 𝗷 𝗸 𝗹 𝗺 𝗻 𝗼 𝗽 𝗾 𝗿 𝘀 𝘁 𝘂 𝘃 𝘄 𝘅 𝘆 𝘇 𝟬 𝟭 𝟮 𝟯 𝟰 𝟱 𝟲 𝟳 𝟴 𝟵`,
  sans_italic: `𝘈 𝘉 𝘊 𝘋 𝘌 𝘍 𝘎 𝘏 𝘐 𝘑 𝘒 𝘓 𝘔 𝘕 𝘖 𝘗 𝘘 𝘙 𝘚 𝘛 𝘜 𝘝 𝘞 𝘟 𝘠 𝘡 𝘢 𝘣 𝘤 𝘥 𝘦 𝘧 𝘨 𝘩 𝘪 𝘫 𝘬 𝘭 𝘮 𝘯 𝘰 𝘱 𝘲 𝘳 𝘴 𝘵 𝘶 𝘷 𝘸 𝘹 𝘺 𝘻 0 1 2 3 4 5 6 7 8 9`,
  sans_italic_bold: `𝘼 𝘽 𝘾 𝘿 𝙀 𝙁 𝙂 𝙃 𝙄 𝙅 𝙆 𝙇 𝙈 𝙉 𝙊 𝙋 𝙌 𝙍 𝙎 𝙏 𝙐 𝙑 𝙒 𝙓 𝙔 𝙕 𝙖 𝙗 𝙘 𝙙 𝙚 𝙛 𝙜 𝙝 𝙞 𝙟 𝙠 𝙡 𝙢 𝙣 𝙤 𝙥 𝙦 𝙧 𝙨 𝙩 𝙪 𝙫 𝙬 𝙭 𝙮 𝙯 0 1 2 3 4 5 6 7 8 9`,
  monospace: `𝙰 𝙱 𝙲 𝙳 𝙴 𝙵 𝙶 𝙷 𝙸 𝙹 𝙺 𝙻 𝙼 𝙽 𝙾 𝙿 𝚀 𝚁 𝚂 𝚃 𝚄 𝚅 𝚆 𝚇 𝚈 𝚉 𝚊 𝚋 𝚌 𝚍 𝚎 𝚏 𝚐 𝚑 𝚒 𝚓 𝚔 𝚕 𝚖 𝚗 𝚘 𝚙 𝚚 𝚛 𝚜 𝚝 𝚞 𝚟 𝚠 𝚡 𝚢 𝚣 𝟶 𝟷 𝟸 𝟹 𝟺 𝟻 𝟼 𝟽 𝟾 𝟿`,
  block2: `【A】 【B】 【C】 【D】 【E】 【F】 【G】 【H】 【I】 【J】 【K】 【L】 【M】 【N】 【O】 【P】 【Q】 【R】 【S】 【T】 【U】 【V】 【W】 【X】 【Y】 【Z】 【a】 【b】 【c】 【d】 【e】 【f】 【g】 【h】 【i】 【j】 【k】 【l】 【m】 【n】 【o】 【p】 【q】 【r】 【s】 【t】 【u】 【v】 【w】 【x】 【y】 【z】 【0】 【1】 【2】 【3】 【4】 【5】 【6】 【7】 【8】 【9】`,
  block3: `『A』 『B』 『C』 『D』 『E』 『F』 『G』 『H』 『I』 『J』 『K』 『L』 『M』 『N』 『O』 『P』 『Q』 『R』 『S』 『T』 『U』 『V』 『W』 『X』 『Y』 『Z』 『a』 『b』 『c』 『d』 『e』 『f』 『g』 『h』 『i』 『j』 『k』 『l』 『m』 『n』 『o』 『p』 『q』 『r』 『s』 『t』 『u』 『v』 『w』 『x』 『y』 『z』 『0』 『1』 『2』 『3』 『4』 『5』 『6』 『7』 『8』 『9』`,
  sun: `A҉ ҉B҉ ҉C҉ ҉D҉ ҉E҉ ҉F҉ ҉G҉ ҉H҉ ҉I҉ ҉J҉ ҉K҉ ҉L҉ ҉M҉ ҉N҉ ҉O҉ ҉P҉ ҉Q҉ ҉R҉ ҉S҉ ҉T҉ ҉U҉ ҉V҉ ҉W҉ ҉X҉ ҉Y҉ ҉Z҉ ҉a҉ ҉b҉ ҉c҉ ҉d҉ ҉e҉ ҉f҉ ҉g҉ ҉h҉ ҉i҉ ҉j҉ ҉k҉ ҉l҉ ҉m҉ ҉n҉ ҉o҉ ҉p҉ ҉q҉ ҉r҉ ҉s҉ ҉t҉ ҉u҉ ҉v҉ ҉w҉ ҉x҉ ҉y҉ ҉z҉ ҉0҉ ҉1҉ ҉2҉ ҉3҉ ҉4҉ ҉5҉ ҉6҉ ҉7҉ ҉8҉ ҉9҉`,
  strikethrough: `A̶ ̶B̶ ̶C̶ ̶D̶ ̶E̶ ̶F̶ ̶G̶ ̶H̶ ̶I̶ ̶J̶ ̶K̶ ̶L̶ ̶M̶ ̶N̶ ̶O̶ ̶P̶ ̶Q̶ ̶R̶ ̶S̶ ̶T̶ ̶U̶ ̶V̶ ̶W̶ ̶X̶ ̶Y̶ ̶Z̶ ̶a̶ ̶b̶ ̶c̶ ̶d̶ ̶e̶ ̶f̶ ̶g̶ ̶h̶ ̶i̶ ̶j̶ ̶k̶ ̶l̶ ̶m̶ ̶n̶ ̶o̶ ̶p̶ ̶q̶ ̶r̶ ̶s̶ ̶t̶ ̶u̶ ̶v̶ ̶w̶ ̶x̶ ̶y̶ ̶z̶ ̶0̶ ̶1̶ ̶2̶ ̶3̶ ̶4̶ ̶5̶ ̶6̶ ̶7̶ ̶8̶ ̶9̶`,
  underline: `A̲ ̲B̲ ̲C̲ ̲D̲ ̲E̲ ̲F̲ ̲G̲ ̲H̲ ̲I̲ ̲J̲ ̲K̲ ̲L̲ ̲M̲ ̲N̲ ̲O̲ ̲P̲ ̲Q̲ ̲R̲ ̲S̲ ̲T̲ ̲U̲ ̲V̲ ̲W̲ ̲X̲ ̲Y̲ ̲Z̲ ̲a̲ ̲b̲ ̲c̲ ̲d̲ ̲e̲ ̲f̲ ̲g̲ ̲h̲ ̲i̲ ̲j̲ ̲k̲ ̲l̲ ̲m̲ ̲n̲ ̲o̲ ̲p̲ ̲q̲ ̲r̲ ̲s̲ ̲t̲ ̲u̲ ̲v̲ ̲w̲ ̲x̲ ̲y̲ ̲z̲ ̲0̲ ̲1̲ ̲2̲ ̲3̲ ̲4̲ ̲5̲ ̲6̲ ̲7̲ ̲8̲ ̲9̲`
};

function getFont(fontId, text) {
  const lookup = `A B C D E F G H I J K L M N O P Q R S T U V W X Y Z a b c d e f g h i j k l m n o p q r s t u v w x y z 0 1 2 3 4 5 6 7 8 9`.split(' ');
  return [...text].map(c => FONTS[fontId].split(' ')[lookup.indexOf(c)] || c).join('');
}
```