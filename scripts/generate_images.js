const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

function escapeXml(unsafe) {
  return String(unsafe).replace(/[<>&'"]/g, function (c) {
    switch (c) {
      case "<": return "&lt;";
      case ">": return "&gt;";
      case "&": return "&amp;";
      case "\'": return "&apos;";
      case "\"": return "&quot;";
    }
  });
}

function createBonusCover(bonusNum, title, subtitle, iconEmoji, accentColor, bgColor1, bgColor2) {
  return `
  <svg width="600" height="750" viewBox="0 0 600 750" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="bgGrad_${bonusNum}" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="${bgColor1}" />
        <stop offset="100%" stop-color="${bgColor2}" />
      </linearGradient>
      <linearGradient id="accentGrad_${bonusNum}" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="${accentColor}" />
        <stop offset="100%" stop-color="#FFB347" />
      </linearGradient>
      <linearGradient id="spineGrad_${bonusNum}" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="rgba(0,0,0,0.4)" />
        <stop offset="10%" stop-color="rgba(255,255,255,0.2)" />
        <stop offset="20%" stop-color="transparent" />
      </linearGradient>
      <filter id="shadow_${bonusNum}" x="-10%" y="-10%" width="120%" height="120%">
        <feDropShadow dx="0" dy="15" stdDeviation="20" flood-color="rgba(0,0,0,0.4)"/>
      </filter>
    </defs>

    <rect x="20" y="20" width="560" height="710" rx="28" fill="url(#bgGrad_${bonusNum})" filter="url(#shadow_${bonusNum})" stroke="rgba(255,255,255,0.15)" stroke-width="2"/>
    <rect x="20" y="20" width="50" height="710" rx="28" fill="url(#spineGrad_${bonusNum})" />

    <rect x="70" y="60" width="220" height="44" rx="22" fill="${accentColor}" />
    <text x="180" y="88" fill="#FFFFFF" font-size="20" font-weight="900" text-anchor="middle" font-family="sans-serif" letter-spacing="2">BÔNUS ${bonusNum}</text>

    <circle cx="300" cy="240" r="85" fill="rgba(255,255,255,0.12)" stroke="${accentColor}" stroke-width="4"/>
    <text x="300" y="270" font-size="80" text-anchor="middle" font-family="sans-serif">${iconEmoji}</text>

    <text x="300" y="420" fill="#FFFFFF" font-size="34" font-weight="900" text-anchor="middle" font-family="sans-serif">
      ${escapeXml(title)}
    </text>

    <text x="300" y="480" fill="#F4EFE6" font-size="22" font-weight="600" text-anchor="middle" font-family="sans-serif" opacity="0.9">
      ${escapeXml(subtitle)}
    </text>

    <rect x="150" y="520" width="300" height="4" rx="2" fill="url(#accentGrad_${bonusNum})" />

    <rect x="100" y="580" width="400" height="70" rx="16" fill="rgba(0,0,0,0.25)" stroke="rgba(255,255,255,0.1)" stroke-width="1.5"/>
    <text x="300" y="622" fill="#FFFFFF" font-size="18" font-weight="800" text-anchor="middle" font-family="sans-serif" letter-spacing="1">
      GUIA DIGITAL EXCLUSIVO EM PDF
    </text>
  </svg>
  `;
}

function createHeroMockup() {
  return `
  <svg width="1200" height="675" viewBox="0 0 1200 675" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="mainGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#2D1A12" />
        <stop offset="50%" stop-color="#4A2810" />
        <stop offset="100%" stop-color="#1F110B" />
      </linearGradient>
      <linearGradient id="orangeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#FF8A00" />
        <stop offset="100%" stop-color="#FFA834" />
      </linearGradient>
      <filter id="bundleShadow" x="-10%" y="-10%" width="120%" height="120%">
        <feDropShadow dx="0" dy="20" stdDeviation="25" flood-color="rgba(0,0,0,0.35)"/>
      </filter>
    </defs>

    <g filter="url(#bundleShadow)">
      <!-- Left side bonus stack -->
      <rect x="80" y="140" width="300" height="420" rx="20" fill="#1E3A2F" transform="rotate(-8 230 350)" stroke="#16A34A" stroke-width="3"/>
      <text x="230" y="290" fill="#FFF" font-size="28" font-weight="900" text-anchor="middle" font-family="sans-serif" transform="rotate(-8 230 350)">🎁 5 BÔNUS</text>
      <text x="230" y="340" fill="#A7D8AF" font-size="18" font-weight="700" text-anchor="middle" font-family="sans-serif" transform="rotate(-8 230 350)">INCLUSOS NO PACOTE</text>

      <!-- Right side bonus stack -->
      <rect x="820" y="140" width="300" height="420" rx="20" fill="#3D2012" transform="rotate(8 970 350)" stroke="#D56816" stroke-width="3"/>
      <text x="970" y="290" fill="#FFF" font-size="28" font-weight="900" text-anchor="middle" font-family="sans-serif" transform="rotate(8 970 350)">🪵 PROJETOS</text>
      <text x="970" y="340" fill="#FFC285" font-size="18" font-weight="700" text-anchor="middle" font-family="sans-serif" transform="rotate(8 970 350)">PRONTOS P/ CORTE</text>

      <!-- Center Master Book / Tablet -->
      <rect x="360" y="60" width="480" height="540" rx="28" fill="url(#mainGrad)" stroke="#FF8A00" stroke-width="4"/>
      
      <!-- Top master badge -->
      <rect x="450" y="100" width="300" height="46" rx="23" fill="url(#orangeGrad)" />
      <text x="600" y="130" fill="#FFF" font-size="20" font-weight="900" text-anchor="middle" font-family="sans-serif" letter-spacing="1">PACOTE COMPLETO DIGITAL</text>

      <text x="600" y="240" fill="#FFA834" font-size="70" font-weight="900" text-anchor="middle" font-family="sans-serif">+150</text>
      <text x="600" y="300" fill="#FFFFFF" font-size="34" font-weight="900" text-anchor="middle" font-family="sans-serif">MOLDES EM MADEIRA</text>
      <text x="600" y="345" fill="#E8E1D5" font-size="20" font-weight="600" text-anchor="middle" font-family="sans-serif">Artesanato &amp; Marcenaria Lucrativa</text>

      <line x1="450" y1="380" x2="750" y2="380" stroke="#FF8A00" stroke-width="3" stroke-dasharray="6,6"/>

      <!-- Features Box -->
      <rect x="420" y="410" width="360" height="130" rx="18" fill="rgba(0,0,0,0.4)" stroke="rgba(255,255,255,0.15)" stroke-width="1.5"/>
      <text x="600" y="445" fill="#A7D8AF" font-size="17" font-weight="800" text-anchor="middle" font-family="sans-serif">✅ Medidas Exatas &amp; Desenhos Prontos</text>
      <text x="600" y="480" fill="#FFF" font-size="17" font-weight="800" text-anchor="middle" font-family="sans-serif">✅ Acesso Imediato no Celular e PC</text>
      <text x="600" y="515" fill="#FFA834" font-size="17" font-weight="800" text-anchor="middle" font-family="sans-serif">⭐ + 5 BÔNUS EXCLUSIVOS</text>
    </g>
  </svg>
  `;
}

async function generateAll() {
  const bonuses = [
    {
      file: "public/bonus-1-armario.png",
      svg: createBonusCover("01", "PROJETO ARMÁRIO", "De Banheiro em Madeira", "🛁", "#16A34A", "#143026", "#091712")
    },
    {
      file: "public/bonus-2-casinha.png",
      svg: createBonusCover("02", "CASINHA DE PASSARINHO", "Modelo Lucrativo e Decorativo", "🐦", "#D56816", "#3D1E0B", "#1A0C04")
    },
    {
      file: "public/bonus-3-pallets.png",
      svg: createBonusCover("03", "MÓVEIS EM PALLET", "Projetos Práticos Passo a Passo", "🪵", "#16A34A", "#1C2B22", "#0A140F")
    },
    {
      file: "public/bonus-4-vender.png",
      svg: createBonusCover("04", "COMO VENDER", "Seus Produtos de Marcenaria", "📈", "#D56816", "#3A1A12", "#180B07")
    },
    {
      file: "public/bonus-5-ferramentas.png",
      svg: createBonusCover("05", "FERRAMENTAS ÚTEIS", "Guia Prático da Marcenaria", "🔨", "#16A34A", "#1A2E25", "#0B1611")
    },
    {
      file: "public/568a4eed-35e7-45e4-b4a5-ddcbe29a7eb3-removebg-preview.png",
      svg: createHeroMockup()
    }
  ];

  for (const item of bonuses) {
    const buf = Buffer.from(item.svg);
    await sharp(buf).png({ quality: 95 }).toFile(item.file);
    console.log("Generated successfully:", item.file);
  }
}

generateAll().catch(err => {
  console.error("Fatal:", err);
  process.exit(1);
});
