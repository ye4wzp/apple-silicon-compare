/* ============================================
   Apple Silicon — Advanced Features
   Efficiency, Timeline, Upgrade Calculator,
   Cross-Platform, AI Inference
   ============================================ */

// ---- CROSS-PLATFORM REFERENCE DATA ----
const crossPlatformChips = [
    { name: "Intel i5-1240P",   brand: "Intel",  year: 2022, gb6S: 1805, gb6M:  8893, tdp: 28, type: "Laptop" },
    { name: "Intel i7-13700H",  brand: "Intel",  year: 2023, gb6S: 2572, gb6M: 13388, tdp: 45, type: "Laptop" },
    { name: "Intel i9-13900H",  brand: "Intel",  year: 2023, gb6S: 2680, gb6M: 14512, tdp: 45, type: "Laptop" },
    { name: "Intel i9-14900HX", brand: "Intel",  year: 2024, gb6S: 2738, gb6M: 16710, tdp: 55, type: "Laptop" },
    { name: "Intel Ultra 9 285HX",brand:"Intel", year: 2024, gb6S: 2865, gb6M: 18230, tdp: 65, type: "Laptop" },
    { name: "AMD R7 7840HS",    brand: "AMD",    year: 2023, gb6S: 2315, gb6M: 11480, tdp: 35, type: "Laptop" },
    { name: "AMD R9 7945HX",    brand: "AMD",    year: 2023, gb6S: 2575, gb6M: 16024, tdp: 55, type: "Laptop" },
    { name: "AMD R9 8945HS",    brand: "AMD",    year: 2024, gb6S: 2610, gb6M: 12950, tdp: 35, type: "Laptop" },
    { name: "Snapdragon X Elite", brand:"Qualcomm",year:2024, gb6S: 2524, gb6M: 13668, tdp: 23, type: "Laptop" },
    { name: "Intel i9-14900K",  brand: "Intel",  year: 2024, gb6S: 2975, gb6M: 20340, tdp: 125, type: "Desktop" },
    { name: "AMD R9 7950X",     brand: "AMD",    year: 2022, gb6S: 2800, gb6M: 19920, tdp: 170, type: "Desktop" }
];

// ---- AI INFERENCE DATA (llama.cpp tokens/sec) ----
const aiInferenceData = [
    { chip: "M1",          llama7b: 8.5,   llama13b: 4.2,  llama70b: null, sdGen: 28,  whisper: 1.2 },
    { chip: "M1 Pro",      llama7b: 12.8,  llama13b: 7.1,  llama70b: null, sdGen: 18,  whisper: 1.8 },
    { chip: "M1 Max",      llama7b: 18.5,  llama13b: 10.2, llama70b: 2.1,  sdGen: 11,  whisper: 2.5 },
    { chip: "M1 Ultra",    llama7b: 30.2,  llama13b: 17.8, llama70b: 4.5,  sdGen: 6,   whisper: 4.2 },
    { chip: "M2",          llama7b: 12.1,  llama13b: 6.5,  llama70b: null, sdGen: 22,  whisper: 1.6 },
    { chip: "M2 Pro",      llama7b: 17.2,  llama13b: 9.8,  llama70b: null, sdGen: 14,  whisper: 2.4 },
    { chip: "M2 Max",      llama7b: 24.5,  llama13b: 14.2, llama70b: 3.5,  sdGen: 8,   whisper: 3.2 },
    { chip: "M2 Ultra",    llama7b: 42.0,  llama13b: 24.5, llama70b: 7.2,  sdGen: 4.5, whisper: 5.8 },
    { chip: "M3",          llama7b: 14.8,  llama13b: 8.1,  llama70b: null, sdGen: 19,  whisper: 2.0 },
    { chip: "M3 Pro",      llama7b: 20.5,  llama13b: 12.4, llama70b: null, sdGen: 12,  whisper: 2.8 },
    { chip: "M3 Max",      llama7b: 32.0,  llama13b: 18.5, llama70b: 5.2,  sdGen: 6.5, whisper: 4.0 },
    { chip: "M4",          llama7b: 18.2,  llama13b: 10.5, llama70b: null, sdGen: 15,  whisper: 2.6 },
    { chip: "M4 Pro",      llama7b: 26.8,  llama13b: 15.2, llama70b: 2.8,  sdGen: 9,   whisper: 3.5 },
    { chip: "M4 Max",      llama7b: 42.5,  llama13b: 25.0, llama70b: 7.8,  sdGen: 4,   whisper: 5.5 },
    { chip: "M5",          llama7b: 22.0,  llama13b: 12.8, llama70b: null, sdGen: 12,  whisper: 3.2 },
    { chip: "M5 Pro",      llama7b: 32.0,  llama13b: 18.5, llama70b: 4.2,  sdGen: 7,   whisper: 4.5 },
    { chip: "M5 Max",      llama7b: 48.0,  llama13b: 28.5, llama70b: 9.5,  sdGen: 3.5, whisper: 6.2 }
];

// ============================================================
// 1. EFFICIENCY (Perf/Watt)
// ============================================================
function renderEfficiency() {
    const container = document.getElementById("efficiencyContent");
    if (!container || typeof chipData === "undefined" || typeof extendedData === "undefined") return;
    const label = currentLang === "en";

    // Build efficiency data
    const effData = chipData.map(c => {
        const ext = extendedData[c.name];
        const tdp = ext ? (ext.tdpTotal || ext.tdp) : null;
        if (!tdp || !c.gb6Multi) return null;
        return {
            name: c.name, gen: c.gen, tier: c.tier,
            gb6Multi: c.gb6Multi, tdp: tdp,
            perfPerWatt: Math.round(c.gb6Multi / tdp),
            gb6SinglePerWatt: c.gb6Single ? Math.round(c.gb6Single / tdp * 10) / 10 : 0
        };
    }).filter(Boolean).sort((a, b) => b.perfPerWatt - a.perfPerWatt);

    if (effData.length === 0) { container.innerHTML = ""; return; }
    const maxEff = effData[0].perfPerWatt;

    let html = `<div class="antutu-chart-card">
        <h4>🏆 ${label ? "GB6 Multi-Core Points per Watt" : "GB6 多核分数 / 每瓦"}</h4>
        <p style="font-size:12px;color:var(--text-muted);margin-bottom:16px">${label ? "Higher = more efficient. Apple Silicon base chips dominate." : "越高 = 越省电。Apple Silicon 基础款芯片占据主导。"}</p>
        <div class="rw-bars">`;

    effData.forEach((c, i) => {
        const pct = (c.perfPerWatt / maxEff) * 100;
        const gen = c.gen.toLowerCase();
        const medal = i < 3 ? ["🥇","🥈","🥉"][i] : `#${i+1}`;
        const effLabel = `${c.perfPerWatt} pts/W`;

        html += `<div class="rw-bar-row" style="margin-bottom:5px">
            <span class="rw-chip-name" style="min-width:100px">
                <span style="font-size:10px">${medal}</span> ${c.name}
            </span>
            <div class="rw-bar-track">
                <div class="rw-bar-fill tier-${gen}" style="width:${Math.max(pct,5)}%"></div>
            </div>
            <span class="rw-time" style="min-width:80px;text-align:right;font-weight:600;color:var(--accent-blue)">
                ${effLabel}
            </span>
        </div>`;
    });

    html += `</div></div>`;

    // TDP comparison bar chart
    html += `<div class="antutu-chart-card" style="margin-top:20px">
        <h4>🔋 ${label ? "TDP Power Draw Comparison" : "TDP 功耗对比"}</h4>
        <p style="font-size:12px;color:var(--text-muted);margin-bottom:16px">${label ? "Lower TDP = longer battery life. All chips compared." : "TDP 越低 = 续航越长。"}</p>
        <div class="rw-bars">`;

    const tdpSorted = effData.slice().sort((a, b) => a.tdp - b.tdp);
    const maxTdp = Math.max(...tdpSorted.map(c => c.tdp));
    tdpSorted.forEach(c => {
        const pct = (c.tdp / maxTdp) * 100;
        const gen = c.gen.toLowerCase();
        const color = c.tdp <= 15 ? "var(--accent-green)" : c.tdp <= 30 ? "var(--accent-blue)" : c.tdp <= 60 ? "var(--accent-orange)" : "var(--accent-pink)";
        html += `<div class="rw-bar-row" style="margin-bottom:4px">
            <span class="rw-chip-name" style="min-width:100px">${c.name}</span>
            <div class="rw-bar-track">
                <div class="rw-bar-fill" style="width:${Math.max(pct,3)}%;background:${color}"></div>
            </div>
            <span class="rw-time" style="min-width:50px;text-align:right">${c.tdp}W</span>
        </div>`;
    });
    html += `</div></div>`;

    container.innerHTML = html;
}

// ============================================================
// 2. EVOLUTION TIMELINE
// ============================================================
function renderTimeline() {
    const container = document.getElementById("timelineContent");
    if (!container || typeof chipData === "undefined") return;
    const label = currentLang === "en";

    // Group base chips by year for trajectory
    const baseChips = chipData.filter(c => c.tier === "Base").sort((a, b) => a.year - b.year);
    const years = [...new Set(chipData.map(c => c.year))].sort();
    const genColors = { M1: "#ff9f0a", M2: "#30d158", M3: "#64d2ff", M4: "#bf5af2", M5: "#ff375f" };

    // Timeline visualization
    let html = `<div class="antutu-chart-card">
        <h4>📈 ${label ? "Performance Growth (Base chips, GB6 Multi)" : "性能增长（基础款，GB6 多核）"}</h4>
        <div style="position:relative;padding:24px 0">
            <div style="position:absolute;left:50%;top:0;bottom:0;width:2px;background:var(--border-glass)"></div>`;

    baseChips.forEach((chip, i) => {
        const isLeft = i % 2 === 0;
        const prevChip = i > 0 ? baseChips[i-1] : null;
        const gain = prevChip ? Math.round((chip.gb6Multi / prevChip.gb6Multi - 1) * 100) : 0;
        const color = genColors[chip.gen] || "#2997ff";

        html += `<div style="display:flex;justify-content:${isLeft ? "flex-end" : "flex-start"};
            margin-bottom:24px;position:relative;padding-${isLeft ? "right" : "left"}:calc(50% + 24px)">
            <div class="antutu-chart-card" style="max-width:340px;margin:0;padding:16px;border-left:3px solid ${color}">
                <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px">
                    <span style="font-weight:700;color:var(--text-primary)">${chip.name}</span>
                    <span style="font-size:12px;color:var(--text-muted)">${chip.year}</span>
                </div>
                <div style="display:grid;grid-template-columns:1fr 1fr;gap:4px;font-size:12px">
                    <div><span style="color:var(--text-muted)">GB6-M:</span> <strong>${chip.gb6Multi?.toLocaleString() || "—"}</strong></div>
                    <div><span style="color:var(--text-muted)">GB6-S:</span> <strong>${chip.gb6Single?.toLocaleString() || "—"}</strong></div>
                    <div><span style="color:var(--text-muted)">CPU:</span> <strong>${chip.cpuCores} (${chip.cpuConfig})</strong></div>
                    <div><span style="color:var(--text-muted)">nm:</span> <strong>${chip.processNm || "—"}</strong></div>
                </div>
                ${gain > 0 ? `<div style="margin-top:8px;padding:4px 8px;background:rgba(48,209,88,0.1);border-radius:4px;font-size:12px;color:var(--accent-green)">
                    ↑ ${gain}% ${label ? "faster than" : "相比"} ${prevChip.name}</div>` : ""}
            </div>
            <div style="position:absolute;left:calc(50% - 8px);top:16px;width:16px;height:16px;
                border-radius:50%;background:${color};border:3px solid var(--bg-primary)"></div>
        </div>`;
    });

    html += `</div></div>`;

    // Overall progress table
    html += `<div class="antutu-chart-card" style="margin-top:20px">
        <h4>📊 ${label ? "Year-over-Year Gains (All tiers)" : "逐年提升幅度（全级别）"}</h4>
        <div style="overflow-x:auto"><table class="aseries-table" style="margin-top:12px"><thead><tr>
            <th>${label ? "Generation" : "代际"}</th>
            <th>${label ? "Year" : "年份"}</th>
            <th>GB6-S ${label ? "Gain" : "提升"}</th>
            <th>GB6-M ${label ? "Gain" : "提升"}</th>
            <th>${label ? "Process" : "制程"}</th>
        </tr></thead><tbody>`;

    const gens = ["M1", "M2", "M3", "M4", "M5"];
    gens.forEach((gen, i) => {
        const base = chipData.find(c => c.gen === gen && c.tier === "Base");
        const prevBase = i > 0 ? chipData.find(c => c.gen === gens[i-1] && c.tier === "Base") : null;
        if (!base) return;
        const sGain = prevBase && prevBase.gb6Single ? `+${Math.round((base.gb6Single/prevBase.gb6Single-1)*100)}%` : "—";
        const mGain = prevBase && prevBase.gb6Multi ? `+${Math.round((base.gb6Multi/prevBase.gb6Multi-1)*100)}%` : "—";
        const color = genColors[gen];
        html += `<tr><td style="color:${color};font-weight:700">${gen}</td>
            <td>${base.year}</td>
            <td style="color:var(--accent-green)">${sGain}</td>
            <td style="color:var(--accent-green)">${mGain}</td>
            <td>${base.processNm || "—"}nm</td></tr>`;
    });
    html += `</tbody></table></div></div>`;

    container.innerHTML = html;
}

// ============================================================
// 3. UPGRADE CALCULATOR
// ============================================================
function initUpgradeCalc() {
    const fromSel = document.getElementById("upgradeFrom");
    const toSel = document.getElementById("upgradeTo");
    if (!fromSel || !toSel || typeof chipData === "undefined") return;

    // Populate selects
    const opts = chipData.map(c => `<option value="${c.name}">${c.name}</option>`).join("");
    fromSel.innerHTML = opts;
    toSel.innerHTML = opts;

    // Set defaults (M1 → M4)
    fromSel.value = "M1";
    toSel.value = "M4";

    fromSel.addEventListener("change", renderUpgrade);
    toSel.addEventListener("change", renderUpgrade);
    renderUpgrade();
}

function renderUpgrade() {
    const container = document.getElementById("upgradeResult");
    const fromSel = document.getElementById("upgradeFrom");
    const toSel = document.getElementById("upgradeTo");
    if (!container || !fromSel || !toSel) return;

    const from = chipData.find(c => c.name === fromSel.value);
    const to = chipData.find(c => c.name === toSel.value);
    if (!from || !to) return;
    const label = currentLang === "en";

    const metrics = [
        { key: "gb6Single", en: "Single-Core", cn: "单核性能", icon: "🔢" },
        { key: "gb6Multi",  en: "Multi-Core",  cn: "多核性能", icon: "🧮" },
        { key: "gb6Metal",  en: "GPU Metal",    cn: "GPU Metal", icon: "🎮" },
        { key: "cb23Multi", en: "Cinebench R23",cn: "Cinebench R23", icon: "🎬" },
        { key: "gpuTFLOPS", en: "GPU TFLOPS",   cn: "GPU 算力", icon: "⚡" },
        { key: "memBandwidth",en: "Mem Bandwidth",cn: "内存带宽", icon: "💾" }
    ];

    let html = `<div class="antutu-chart-card" style="margin-top:20px">
        <div style="display:flex;justify-content:center;gap:20px;align-items:center;margin-bottom:20px">
            <div style="text-align:center">
                <div style="font-size:20px;font-weight:800;color:var(--text-muted)">${from.name}</div>
                <div style="font-size:11px;color:var(--text-muted)">${from.year} · ${from.tier}</div>
            </div>
            <span style="font-size:28px">→</span>
            <div style="text-align:center">
                <div style="font-size:20px;font-weight:800;color:var(--accent-blue)">${to.name}</div>
                <div style="font-size:11px;color:var(--text-muted)">${to.year} · ${to.tier}</div>
            </div>
        </div>
        <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:12px">`;

    metrics.forEach(m => {
        const fromVal = from[m.key];
        const toVal = to[m.key];
        if (!fromVal || !toVal) return;
        const pct = Math.round((toVal / fromVal - 1) * 100);
        const isUp = pct > 0;
        const color = isUp ? "var(--accent-green)" : pct < 0 ? "var(--accent-pink)" : "var(--text-muted)";
        const arrow = isUp ? "↑" : pct < 0 ? "↓" : "→";

        html += `<div style="background:var(--bg-glass);border-radius:var(--radius-sm);padding:14px;border:1px solid var(--border-glass)">
            <div style="font-size:12px;color:var(--text-muted);margin-bottom:6px">${m.icon} ${label ? m.en : m.cn}</div>
            <div style="font-size:24px;font-weight:800;color:${color}">${arrow} ${Math.abs(pct)}%</div>
            <div style="font-size:11px;color:var(--text-muted);margin-top:4px">
                ${typeof fromVal === "number" ? fromVal.toLocaleString() : fromVal} → ${typeof toVal === "number" ? toVal.toLocaleString() : toVal}
            </div>
        </div>`;
    });

    html += `</div>`;

    // Time savings estimate
    const multiGain = (from.gb6Multi && to.gb6Multi) ? (to.gb6Multi / from.gb6Multi) : 1;
    const timeSaved = Math.round((1 - 1/multiGain) * 100);
    html += `<div style="margin-top:20px;padding:16px;background:rgba(48,209,88,0.08);border-radius:var(--radius-sm);border:1px solid rgba(48,209,88,0.15);text-align:center">
        <div style="font-size:14px;color:var(--text-secondary);margin-bottom:4px">${label ? "Estimated Time Savings" : "预计节省时间"}</div>
        <div style="font-size:28px;font-weight:800;color:var(--accent-green)">${timeSaved > 0 ? timeSaved : 0}%</div>
        <div style="font-size:12px;color:var(--text-muted)">${label
            ? `A ${multiGain.toFixed(1)}× multi-core task finishes in ${Math.round(100/multiGain)}% of the time`
            : `${multiGain.toFixed(1)}× 多核任务在 ${Math.round(100/multiGain)}% 时间内完成`}</div>
    </div>`;

    html += `</div>`;
    container.innerHTML = html;
}

// ============================================================
// 4. CROSS-PLATFORM COMPARISON
// ============================================================
function renderCrossPlatform() {
    const container = document.getElementById("crossplatformContent");
    if (!container || typeof chipData === "undefined") return;
    const label = currentLang === "en";

    // Combine Apple + competitors
    const appleChips = chipData.filter(c => c.tier === "Base" || c.tier === "Pro").map(c => ({
        name: c.name, brand: "Apple", gb6S: c.gb6Single, gb6M: c.gb6Multi,
        tdp: extendedData[c.name]?.tdp || 0, year: c.year, type: "Laptop"
    }));
    const all = [...appleChips, ...crossPlatformChips].sort((a, b) => b.gb6M - a.gb6M);
    const maxM = all[0].gb6M;

    // Multi-core ranking
    let html = `<div class="antutu-chart-card">
        <h4>🏁 ${label ? "Multi-Core Performance Ranking" : "多核性能排名"}</h4>
        <p style="font-size:12px;color:var(--text-muted);margin-bottom:16px">${label ? "Geekbench 6 Multi-Core — Apple vs Intel vs AMD vs Qualcomm" : "Geekbench 6 多核 — Apple vs Intel vs AMD vs Qualcomm"}</p>
        <div class="rw-bars">`;

    const brandColors = { Apple: "#2997ff", Intel: "#0071C5", AMD: "#ED1C24", Qualcomm: "#3253DC" };
    all.forEach((c, i) => {
        const pct = (c.gb6M / maxM) * 100;
        const color = brandColors[c.brand] || "#888";
        const medal = i < 3 ? ["🥇","🥈","🥉"][i] : ``;
        html += `<div class="rw-bar-row" style="margin-bottom:4px">
            <span class="rw-chip-name" style="min-width:130px;font-size:12px">
                ${medal} ${c.name}
            </span>
            <div class="rw-bar-track">
                <div class="rw-bar-fill" style="width:${Math.max(pct,3)}%;background:${color}"></div>
            </div>
            <span class="rw-time" style="min-width:60px;text-align:right;font-size:12px">${c.gb6M.toLocaleString()}</span>
        </div>`;
    });
    html += `</div></div>`;

    // Efficiency comparison (perf/watt)
    const withTdp = all.filter(c => c.tdp > 0).map(c => ({
        ...c, effM: Math.round(c.gb6M / c.tdp)
    })).sort((a, b) => b.effM - a.effM);
    const maxEff = withTdp[0]?.effM || 1;

    html += `<div class="antutu-chart-card" style="margin-top:20px">
        <h4>⚡ ${label ? "Performance per Watt (Efficiency)" : "每瓦性能（能效比）"}</h4>
        <p style="font-size:12px;color:var(--text-muted);margin-bottom:16px">${label ? "GB6 Multi / TDP — Apple Silicon vs competition" : "GB6 多核 / TDP — Apple Silicon vs 竞品"}</p>
        <div class="rw-bars">`;

    withTdp.forEach((c, i) => {
        const pct = (c.effM / maxEff) * 100;
        const color = brandColors[c.brand];
        const medal = i < 3 ? ["🥇","🥈","🥉"][i] : ``;
        html += `<div class="rw-bar-row" style="margin-bottom:4px">
            <span class="rw-chip-name" style="min-width:130px;font-size:12px">${medal} ${c.name}</span>
            <div class="rw-bar-track">
                <div class="rw-bar-fill" style="width:${Math.max(pct,3)}%;background:${color}"></div>
            </div>
            <span class="rw-time" style="min-width:70px;text-align:right;font-size:12px">${c.effM} pts/W</span>
        </div>`;
    });
    html += `</div></div>`;

    // Legend
    html += `<div style="display:flex;gap:16px;justify-content:center;margin-top:16px;flex-wrap:wrap">`;
    Object.entries(brandColors).forEach(([brand, color]) => {
        html += `<div style="display:flex;align-items:center;gap:5px;font-size:12px;color:var(--text-secondary)">
            <div style="width:12px;height:12px;border-radius:2px;background:${color}"></div>${brand}
        </div>`;
    });
    html += `</div>`;

    container.innerHTML = html;
}

// ============================================================
// 5. AI INFERENCE PERFORMANCE
// ============================================================
function renderAIPerformance() {
    const container = document.getElementById("aiContent");
    if (!container) return;
    const label = currentLang === "en";

    // Llama 7B tokens/sec ranking
    const sorted7b = aiInferenceData.slice().sort((a, b) => b.llama7b - a.llama7b);
    const max7b = sorted7b[0].llama7b;

    let html = `<div class="antutu-chart-card">
        <h4>🦙 ${label ? "Llama 2 7B — Tokens/sec" : "Llama 2 7B — Tokens/秒"}</h4>
        <p style="font-size:12px;color:var(--text-muted);margin-bottom:16px">${label ? "Local LLM inference speed (llama.cpp, Q4_K_M quantization)" : "本地大模型推理速度（llama.cpp, Q4_K_M 量化）"}</p>
        <div class="rw-bars">`;

    sorted7b.forEach((c, i) => {
        const pct = (c.llama7b / max7b) * 100;
        const chipInfo = chipData?.find(ch => ch.name === c.chip);
        const gen = chipInfo ? chipInfo.gen.toLowerCase() : "m1";
        const medal = i < 3 ? ["🥇","🥈","🥉"][i] : `#${i+1}`;
        html += `<div class="rw-bar-row" style="margin-bottom:5px">
            <span class="rw-chip-name" style="min-width:90px"><span style="font-size:10px">${medal}</span> ${c.chip}</span>
            <div class="rw-bar-track"><div class="rw-bar-fill tier-${gen}" style="width:${Math.max(pct,5)}%"></div></div>
            <span class="rw-time" style="min-width:70px;text-align:right;font-weight:600;color:var(--accent-blue)">${c.llama7b} t/s</span>
        </div>`;
    });
    html += `</div></div>`;

    // Llama 70B (only chips with enough RAM)
    const has70b = aiInferenceData.filter(c => c.llama70b).sort((a, b) => b.llama70b - a.llama70b);
    if (has70b.length > 0) {
        const max70b = has70b[0].llama70b;
        html += `<div class="antutu-chart-card" style="margin-top:20px">
            <h4>🦙 ${label ? "Llama 2 70B — Tokens/sec" : "Llama 2 70B — Tokens/秒"}</h4>
            <p style="font-size:12px;color:var(--text-muted);margin-bottom:16px">${label ? "Requires ≥64GB unified memory. Only Max/Ultra/Pro chips can run this." : "需要 ≥64GB 统一内存。仅 Max/Ultra/部分 Pro 可运行。"}</p>
            <div class="rw-bars">`;

        has70b.forEach((c, i) => {
            const pct = (c.llama70b / max70b) * 100;
            const chipInfo = chipData?.find(ch => ch.name === c.chip);
            const gen = chipInfo ? chipInfo.gen.toLowerCase() : "m1";
            html += `<div class="rw-bar-row" style="margin-bottom:5px">
                <span class="rw-chip-name" style="min-width:90px">${c.chip}</span>
                <div class="rw-bar-track"><div class="rw-bar-fill tier-${gen}" style="width:${Math.max(pct,5)}%"></div></div>
                <span class="rw-time" style="min-width:70px;text-align:right;font-weight:600;color:var(--accent-purple)">${c.llama70b} t/s</span>
            </div>`;
        });
        html += `</div></div>`;
    }

    // Stable Diffusion (lower is better)
    const sortedSD = aiInferenceData.slice().sort((a, b) => a.sdGen - b.sdGen);
    html += `<div class="antutu-chart-card" style="margin-top:20px">
        <h4>🎨 ${label ? "Stable Diffusion — Seconds per Image" : "Stable Diffusion — 每张图耗时"}</h4>
        <p style="font-size:12px;color:var(--text-muted);margin-bottom:16px">${label ? "512×512, 50 steps. Lower is better." : "512×512, 50 步。越低越好。"}</p>
        <div class="rw-bars">`;

    const maxSD = Math.max(...sortedSD.map(c => c.sdGen));
    sortedSD.forEach((c, i) => {
        const pct = (c.sdGen / maxSD) * 100;
        const chipInfo = chipData?.find(ch => ch.name === c.chip);
        const gen = chipInfo ? chipInfo.gen.toLowerCase() : "m1";
        const medal = i < 3 ? ["🥇","🥈","🥉"][i] : ``;
        html += `<div class="rw-bar-row" style="margin-bottom:5px">
            <span class="rw-chip-name" style="min-width:90px">${medal} ${c.chip}</span>
            <div class="rw-bar-track"><div class="rw-bar-fill tier-${gen}" style="width:${Math.max(pct,5)}%"></div></div>
            <span class="rw-time" style="min-width:50px;text-align:right">${c.sdGen}s</span>
        </div>`;
    });
    html += `</div></div>`;

    container.innerHTML = html;
}

// ============================================================
// INIT ALL ADVANCED FEATURES
// ============================================================
function initAdvancedFeatures() {
    renderEfficiency();
    renderTimeline();
    initUpgradeCalc();
    renderCrossPlatform();
    renderAIPerformance();
}

document.addEventListener("DOMContentLoaded", () => {
    setTimeout(initAdvancedFeatures, 200);
});
