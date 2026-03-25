/* ============================================
   Apple Silicon — Pick 2 Comparator & Best For
   ============================================ */

// ============================================================
// 1. PICK 2 — Side-by-Side Comparator
// ============================================================
function initPick2() {
    const left = document.getElementById("pick2Left");
    const right = document.getElementById("pick2Right");
    if (!left || !right || typeof chipData === "undefined") return;

    const opts = chipData.map(c => `<option value="${c.name}">${c.name}</option>`).join("");
    left.innerHTML = opts;
    right.innerHTML = opts;

    // Default: M3 vs M4
    left.value = "M3";
    right.value = "M4";

    left.addEventListener("change", renderPick2);
    right.addEventListener("change", renderPick2);
    renderPick2();
}

function renderPick2() {
    const container = document.getElementById("pick2Content");
    const leftSel = document.getElementById("pick2Left");
    const rightSel = document.getElementById("pick2Right");
    if (!container || !leftSel || !rightSel) return;

    const a = chipData.find(c => c.name === leftSel.value);
    const b = chipData.find(c => c.name === rightSel.value);
    if (!a || !b) return;
    const en = typeof currentLang === "undefined" || currentLang === "en";

    const extA = typeof extendedData !== "undefined" ? extendedData[a.name] : null;
    const extB = typeof extendedData !== "undefined" ? extendedData[b.name] : null;

    // Comparison metrics
    const metrics = [
        { key: "gb6Single",    en: "Geekbench 6 Single",  cn: "GB6 单核",     icon: "🔢", unit: "", higher: true },
        { key: "gb6Multi",     en: "Geekbench 6 Multi",   cn: "GB6 多核",     icon: "🧮", unit: "", higher: true },
        { key: "gb6Metal",     en: "GPU Metal Score",      cn: "GPU Metal",    icon: "🎮", unit: "", higher: true },
        { key: "cb23Multi",    en: "Cinebench R23 Multi",  cn: "CB23 多核",    icon: "🎬", unit: "", higher: true },
        { key: "cpuCores",     en: "CPU Cores",            cn: "CPU 核心数",   icon: "⚙️", unit: "", higher: true },
        { key: "gpuCores",     en: "GPU Cores",            cn: "GPU 核心数",   icon: "🖥️", unit: "", higher: true },
        { key: "neuralTOPS",   en: "Neural Engine (TOPS)", cn: "神经引擎 TOPS", icon: "🧠", unit: " TOPS", higher: true },
        { key: "gpuTFLOPS",    en: "GPU TFLOPS",           cn: "GPU TFLOPS",   icon: "⚡", unit: " TF", higher: true },
        { key: "memBandwidth", en: "Memory Bandwidth",     cn: "内存带宽",     icon: "💾", unit: " GB/s", higher: true },
        { key: "processNm",    en: "Process Node",         cn: "制程工艺",     icon: "🔬", unit: "nm", higher: false },
    ];

    // TDP from extended data
    const tdpA = extA ? extA.tdpTotal : null;
    const tdpB = extB ? extB.tdpTotal : null;

    const genColors = { M1: "#ff9f0a", M2: "#30d158", M3: "#64d2ff", M4: "#bf5af2", M5: "#ff375f" };
    const colorA = genColors[a.gen] || "#2997ff";
    const colorB = genColors[b.gen] || "#2997ff";

    // Score counting
    let winsA = 0, winsB = 0, ties = 0;

    let rows = "";
    metrics.forEach(m => {
        const valA = a[m.key];
        const valB = b[m.key];
        if (!valA && !valB) return;

        const numA = parseFloat(valA) || 0;
        const numB = parseFloat(valB) || 0;
        let winner = 0; // 0=tie, 1=A, 2=B
        if (numA > 0 && numB > 0) {
            if (m.higher) winner = numA > numB ? 1 : numB > numA ? 2 : 0;
            else winner = numA < numB ? 1 : numB < numA ? 2 : 0;
        }

        if (winner === 1) winsA++;
        else if (winner === 2) winsB++;
        else ties++;

        const pctA = (numA && numB) ? Math.round((numA / Math.max(numA, numB)) * 100) : 50;
        const pctB = (numA && numB) ? Math.round((numB / Math.max(numA, numB)) * 100) : 50;
        const diff = (numA && numB) ? Math.round(Math.abs(numA / numB - 1) * 100) : 0;

        rows += `<div class="pick2-row">
            <div class="pick2-val pick2-left ${winner===1?"pick2-win":""}">
                <span class="pick2-score">${valA || "—"}</span>
                <div class="pick2-bar-wrap"><div class="pick2-bar" style="width:${pctA}%;background:${colorA}"></div></div>
            </div>
            <div class="pick2-metric">
                <span class="pick2-icon">${m.icon}</span>
                <span>${en ? m.en : m.cn}</span>
                ${diff > 0 && numA && numB ? `<span class="pick2-diff">${diff}%</span>` : ""}
            </div>
            <div class="pick2-val pick2-right ${winner===2?"pick2-win":""}">
                <div class="pick2-bar-wrap"><div class="pick2-bar" style="width:${pctB}%;background:${colorB}"></div></div>
                <span class="pick2-score">${valB || "—"}</span>
            </div>
        </div>`;
    });

    // TDP row
    if (tdpA && tdpB) {
        const winner = tdpA < tdpB ? 1 : tdpB < tdpA ? 2 : 0;
        if (winner === 1) winsA++;
        else if (winner === 2) winsB++;
        const diff = Math.round(Math.abs(tdpA / tdpB - 1) * 100);
        rows += `<div class="pick2-row">
            <div class="pick2-val pick2-left ${winner===1?"pick2-win":""}"><span class="pick2-score">${tdpA}W</span><div class="pick2-bar-wrap"><div class="pick2-bar" style="width:${Math.round(Math.min(tdpA,tdpB)/Math.max(tdpA,tdpB)*100)}%;background:${colorA}"></div></div></div>
            <div class="pick2-metric"><span class="pick2-icon">🔋</span><span>${en ? "TDP (lower=better)" : "TDP (越低越好)"}</span>${diff > 0 ? `<span class="pick2-diff">${diff}%</span>` : ""}</div>
            <div class="pick2-val pick2-right ${winner===2?"pick2-win":""}"><div class="pick2-bar-wrap"><div class="pick2-bar" style="width:${Math.round(Math.min(tdpA,tdpB)/Math.max(tdpA,tdpB)*100)}%;background:${colorB}"></div></div><span class="pick2-score">${tdpB}W</span></div>
        </div>`;
    }

    // Verdict
    const verdictText = winsA > winsB
        ? (en ? `${a.name} wins ${winsA} to ${winsB}` : `${a.name} 胜出 ${winsA}:${winsB}`)
        : winsB > winsA
        ? (en ? `${b.name} wins ${winsB} to ${winsA}` : `${b.name} 胜出 ${winsB}:${winsA}`)
        : (en ? `It's a tie ${winsA}:${winsB}` : `平局 ${winsA}:${winsB}`);
    const verdictColor = winsA > winsB ? colorA : winsB > winsA ? colorB : "var(--text-secondary)";

    let html = `<div class="pick2-card">
        <div class="pick2-header">
            <div class="pick2-chip-info">
                <div style="font-size:22px;font-weight:800;color:${colorA}">${a.name}</div>
                <div style="font-size:11px;color:var(--text-muted)">${a.year} · ${a.tier} · ${a.processNm || ""}nm</div>
            </div>
            <div class="pick2-verdict" style="color:${verdictColor}">
                <div style="font-size:13px;color:var(--text-muted)">${en ? "Verdict" : "结论"}</div>
                <div style="font-size:16px;font-weight:700">${verdictText}</div>
            </div>
            <div class="pick2-chip-info" style="text-align:right">
                <div style="font-size:22px;font-weight:800;color:${colorB}">${b.name}</div>
                <div style="font-size:11px;color:var(--text-muted)">${b.year} · ${b.tier} · ${b.processNm || ""}nm</div>
            </div>
        </div>
        ${rows}
    </div>`;

    container.innerHTML = html;
}

// ============================================================
// 2. BEST FOR — Auto-generated Pros/Cons + Recommendations
// ============================================================
const useCases = [
    {
        id: "student", icon: "📚", en: "Best for Students", cn: "最适合学生",
        descEn: "Light coding, web browsing, notes, budget-friendly", descCn: "轻度编程、浏览、笔记、预算友好",
        criteria: c => {
            const ext = typeof extendedData !== "undefined" ? extendedData[c.name] : null;
            const tdp = ext ? ext.tdpTotal : 999;
            return (c.gb6Single || 0) * 0.5 + (c.gb6Multi || 0) * 0.2 - tdp * 20;
        }
    },
    {
        id: "developer", icon: "💻", en: "Best for Developers", cn: "最适合开发者",
        descEn: "Xcode builds, Docker, VMs, multi-core compilation", descCn: "Xcode 编译、Docker、虚拟机、多核编译",
        criteria: c => (c.gb6Multi || 0) * 0.6 + (c.gb6Single || 0) * 0.3 + (c.memBandwidth || 0) * 10
    },
    {
        id: "video", icon: "🎬", en: "Best for Video Editing", cn: "最适合视频剪辑",
        descEn: "Final Cut Pro, DaVinci Resolve, ProRes, 4K/8K timeline", descCn: "Final Cut Pro、DaVinci Resolve、ProRes、4K/8K 剪辑",
        criteria: c => (c.gb6Metal || 0) * 0.4 + (c.cb23Multi || 0) * 0.3 + (c.memBandwidth || 0) * 15
    },
    {
        id: "3d", icon: "🖼️", en: "Best for 3D / Rendering", cn: "最适合 3D / 渲染",
        descEn: "Blender, Cinema 4D, Maya — GPU + CPU intensive", descCn: "Blender、Cinema 4D、Maya — GPU + CPU 密集型",
        criteria: c => (c.gpuTFLOPS || 0) * 500 + (c.cb23Multi || 0) * 0.3 + (c.gpuCores || 0) * 50
    },
    {
        id: "ai", icon: "🤖", en: "Best for AI / ML", cn: "最适合 AI / 机器学习",
        descEn: "Local LLM inference, model training, Core ML", descCn: "本地大模型推理、模型训练、Core ML",
        criteria: c => (c.neuralTOPS || 0) * 200 + (c.memBandwidth || 0) * 30 + (c.gb6Multi || 0) * 0.1
    },
    {
        id: "portable", icon: "✈️", en: "Best for Portability", cn: "最适合便携",
        descEn: "Long battery life, lightweight, fanless preferred", descCn: "长续航、轻便、最好无风扇",
        criteria: c => {
            const ext = typeof extendedData !== "undefined" ? extendedData[c.name] : null;
            const tdp = ext ? ext.tdpTotal : 999;
            return (c.gb6Single || 0) * 0.4 - tdp * 50 + (c.tier === "Base" ? 5000 : 0);
        }
    }
];

function generateProsCons(chip) {
    const en = typeof currentLang === "undefined" || currentLang === "en";
    const ext = typeof extendedData !== "undefined" ? extendedData[chip.name] : null;
    const tdp = ext ? ext.tdpTotal : null;
    const pros = [];
    const cons = [];

    // Analyze vs averages
    const allSingle = chipData.map(c => c.gb6Single).filter(Boolean);
    const allMulti = chipData.map(c => c.gb6Multi).filter(Boolean);
    const avgSingle = allSingle.reduce((a, b) => a + b, 0) / allSingle.length;
    const avgMulti = allMulti.reduce((a, b) => a + b, 0) / allMulti.length;

    // Single-core
    if (chip.gb6Single > avgSingle * 1.15) pros.push(en ? "Excellent single-core speed" : "出色的单核速度");
    else if (chip.gb6Single < avgSingle * 0.85) cons.push(en ? "Below-average single-core" : "单核低于平均水平");

    // Multi-core
    if (chip.gb6Multi > avgMulti * 1.3) pros.push(en ? "Outstanding multi-core performance" : "卓越的多核性能");
    else if (chip.gb6Multi < avgMulti * 0.7) cons.push(en ? "Limited multi-core power" : "多核性能有限");

    // GPU
    if (chip.gpuTFLOPS && chip.gpuTFLOPS > 10) pros.push(en ? "Powerful GPU for creative work" : "强大的 GPU 适合创意工作");
    else if (chip.gpuCores && chip.gpuCores <= 8) cons.push(en ? "Basic GPU (not for heavy 3D)" : "基础 GPU（不适合重度 3D）");

    // Neural Engine
    if (chip.neuralTOPS && chip.neuralTOPS >= 38) pros.push(en ? "38+ TOPS — great for Apple Intelligence" : "38+ TOPS — 适合 Apple Intelligence");
    else if (chip.neuralTOPS && chip.neuralTOPS <= 15) cons.push(en ? "Older Neural Engine (<16 TOPS)" : "旧版神经引擎（<16 TOPS）");

    // TDP / Efficiency
    if (tdp && tdp <= 24) pros.push(en ? "Low power — fanless MacBook Air" : "低功耗 — 支持无风扇 Air");
    if (tdp && tdp >= 100) cons.push(en ? "High power draw (120W+)" : "高功耗（120W+）");

    // Memory bandwidth
    if (chip.memBandwidth && chip.memBandwidth >= 400) pros.push(en ? "Extreme memory bandwidth (400+ GB/s)" : "极高内存带宽（400+ GB/s）");
    else if (chip.memBandwidth && chip.memBandwidth < 100) cons.push(en ? "Limited memory bandwidth" : "内存带宽有限");

    // Process node
    if (chip.processNm && chip.processNm <= 3) pros.push(en ? `Latest ${chip.processNm}nm process` : `最新 ${chip.processNm}nm 制程`);
    if (chip.processNm && chip.processNm >= 5 && chip.gen !== "M1") cons.push(en ? "Older 5nm process" : "较旧的 5nm 制程");

    // Generation
    if (chip.gen === "M5") pros.push(en ? "Latest generation (2025)" : "最新一代（2025）");
    if (chip.gen === "M1") cons.push(en ? "Oldest Apple Silicon generation" : "最早一代 Apple Silicon");

    // Tier-specific
    if (chip.tier === "Ultra") pros.push(en ? "Workstation-class chip" : "工作站级芯片");
    if (chip.tier === "Base") pros.push(en ? "Best value in its generation" : "同代性价比最高");

    return { pros: pros.slice(0, 5), cons: cons.slice(0, 4) };
}

function renderBestFor() {
    const container = document.getElementById("bestforContent");
    if (!container || typeof chipData === "undefined") return;
    const en = typeof currentLang === "undefined" || currentLang === "en";

    // Best For cards
    let html = `<div class="bestfor-grid">`;
    useCases.forEach(uc => {
        const ranked = chipData.slice()
            .map(c => ({ ...c, score: uc.criteria(c) }))
            .sort((a, b) => b.score - a.score);
        const top3 = ranked.slice(0, 3);
        const genColors = { M1: "#ff9f0a", M2: "#30d158", M3: "#64d2ff", M4: "#bf5af2", M5: "#ff375f" };

        html += `<div class="bestfor-card">
            <div class="bestfor-header">
                <span style="font-size:24px">${uc.icon}</span>
                <div>
                    <div style="font-weight:700;font-size:15px">${en ? uc.en : uc.cn}</div>
                    <div style="font-size:11px;color:var(--text-muted)">${en ? uc.descEn : uc.descCn}</div>
                </div>
            </div>
            <div class="bestfor-ranking">`;
        top3.forEach((c, i) => {
            const medal = ["🥇","🥈","🥉"][i];
            const color = genColors[c.gen] || "#2997ff";
            html += `<div class="bestfor-rank-item">
                <span>${medal}</span>
                <span style="color:${color};font-weight:600">${c.name}</span>
                <span style="font-size:11px;color:var(--text-muted)">${c.tier}</span>
            </div>`;
        });
        html += `</div></div>`;
    });
    html += `</div>`;

    // Pros/Cons for each chip (grouped by generation)
    html += `<h4 style="text-align:center;margin:32px 0 16px;color:var(--text-primary)">${en ? "📋 Auto-Generated Pros & Cons" : "📋 自动生成优缺点"}</h4>`;
    html += `<div class="proscons-grid">`;

    const gens = ["M5", "M4", "M3", "M2", "M1"];
    gens.forEach(gen => {
        const chips = chipData.filter(c => c.gen === gen);
        if (chips.length === 0) return;
        const genColors = { M1: "#ff9f0a", M2: "#30d158", M3: "#64d2ff", M4: "#bf5af2", M5: "#ff375f" };
        const color = genColors[gen];

        chips.forEach(chip => {
            const { pros, cons } = generateProsCons(chip);
            html += `<div class="proscons-card" style="border-top:3px solid ${color}">
                <div style="font-weight:700;font-size:16px;color:${color};margin-bottom:10px">${chip.name}</div>
                <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">
                    <div>
                        <div style="font-size:12px;font-weight:600;color:var(--accent-green);margin-bottom:6px">✅ ${en ? "Pros" : "优点"}</div>
                        ${pros.map(p => `<div style="font-size:12px;color:var(--text-secondary);margin-bottom:3px">• ${p}</div>`).join("")}
                    </div>
                    <div>
                        <div style="font-size:12px;font-weight:600;color:var(--accent-pink);margin-bottom:6px">❌ ${en ? "Cons" : "缺点"}</div>
                        ${cons.map(c => `<div style="font-size:12px;color:var(--text-secondary);margin-bottom:3px">• ${c}</div>`).join("")}
                    </div>
                </div>
            </div>`;
        });
    });
    html += `</div>`;

    container.innerHTML = html;
}

// ============================================================
// 3. OG IMAGE GENERATOR (creates og-image.png for social sharing)
// ============================================================
function generateOGImage() {
    const canvas = document.createElement("canvas");
    canvas.width = 1200;
    canvas.height = 630;
    const ctx = canvas.getContext("2d");

    // Polyfill roundRect for Safari < 16
    if (!ctx.roundRect) {
        ctx.roundRect = function(x, y, w, h, r) {
            if (typeof r === "number") r = [r, r, r, r];
            this.beginPath();
            this.moveTo(x + r[0], y);
            this.arcTo(x + w, y, x + w, y + h, r[1]);
            this.arcTo(x + w, y + h, x, y + h, r[2]);
            this.arcTo(x, y + h, x, y, r[3]);
            this.arcTo(x, y, x + w, y, r[0]);
            this.closePath();
        };
    }

    // Dark gradient background
    const grad = ctx.createLinearGradient(0, 0, 1200, 630);
    grad.addColorStop(0, "#0a0a1a");
    grad.addColorStop(0.5, "#0d1117");
    grad.addColorStop(1, "#0a0a1a");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 1200, 630);

    // Accent glow
    const glow = ctx.createRadialGradient(300, 200, 0, 300, 200, 400);
    glow.addColorStop(0, "rgba(41,151,255,0.12)");
    glow.addColorStop(1, "transparent");
    ctx.fillStyle = glow;
    ctx.fillRect(0, 0, 1200, 630);

    // Title
    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 48px Inter, system-ui, sans-serif";
    ctx.fillText("Apple Silicon", 60, 100);
    ctx.fillStyle = "#2997ff";
    ctx.fillText("Comparison", 60, 160);

    // Subtitle
    ctx.fillStyle = "#6e6e73";
    ctx.font = "20px Inter, system-ui";
    ctx.fillText("M1 → M5 • A12 → A18 Pro • 20+ Interactive Analysis Tools", 60, 210);

    // Chip gen labels
    const gens = [
        { name: "M1", color: "#ff9f0a", y: 300 },
        { name: "M2", color: "#30d158", y: 360 },
        { name: "M3", color: "#64d2ff", y: 420 },
        { name: "M4", color: "#bf5af2", y: 480 },
        { name: "M5", color: "#ff375f", y: 540 }
    ];
    gens.forEach(g => {
        ctx.fillStyle = g.color + "33";
        ctx.beginPath();
        ctx.roundRect(60, g.y - 25, 200, 40, 8);
        ctx.fill();
        ctx.fillStyle = g.color;
        ctx.font = "bold 22px Inter, system-ui";
        ctx.fillText(g.name, 80, g.y + 2);

        const chip = chipData?.find(c => c.name === g.name);
        if (chip) {
            ctx.fillStyle = "#ffffff";
            ctx.font = "16px Inter, system-ui";
            ctx.fillText(`GB6-M: ${chip.gb6Multi?.toLocaleString() || "—"}`, 150, g.y + 2);
        }
    });

    // Features list on right
    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 20px Inter, system-ui";
    ctx.fillText("Features", 700, 300);
    const features = ["⚡ Efficiency Ranking", "🔬 Die Map Architecture", "🎯 Performance Simulator",
                       "🌍 Cross-Platform Intel/AMD", "🤖 AI Inference Benchmarks", "🤝 Side-by-Side Compare"];
    features.forEach((f, i) => {
        ctx.fillStyle = "#8e8e93";
        ctx.font = "16px Inter, system-ui";
        ctx.fillText(f, 700, 340 + i * 32);
    });

    // Footer
    ctx.fillStyle = "#3a3a3c";
    ctx.fillRect(0, 600, 1200, 1);
    ctx.fillStyle = "#6e6e73";
    ctx.font = "14px Inter, system-ui";
    ctx.fillText("apple-silicon-compare • v2.2 • 2026", 60, 620);

    return canvas;
}

// ============================================================
// INIT
// ============================================================
function initCompareFeatures() {
    initPick2();
    renderBestFor();
}

document.addEventListener("DOMContentLoaded", () => {
    setTimeout(initCompareFeatures, 300);
});
