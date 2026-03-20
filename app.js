/* ============================================
   Apple Silicon Comparison — App Logic v2
   With GPU Metal, Cinebench R23, TFLOPS,
   Tier Chart, Tab Navigation
   ============================================ */

// ============================================================
// CHIP DATA — Precise benchmark averages from Geekbench Browser,
// Cinebench R23, Apple official specs, NotebookCheck, Wikipedia
// ============================================================
const chipData = [
    // === M1 Family ===
    {
        name: "M1", gen: "M1", tier: "Base", year: 2020,
        cpuCores: 8, cpuP: 4, cpuE: 4, cpuConfig: "4P + 4E",
        gpuCores: 8, gpuTFLOPS: 2.6,
        neuralTOPS: 11, memBandwidth: 68.25, maxMemory: 16,
        processNm: 5, transistorsB: 16,
        gb6Single: 2347, gb6Multi: 8342, gb6Metal: 30948,
        cb23Single: 1498, cb23Multi: 7508,
        devices_en: "MacBook Air/Pro, Mac mini, iMac, iPad Pro/Air",
        devices_cn: "MacBook Air/Pro, Mac mini, iMac, iPad Pro/Air"
    },
    {
        name: "M1 Pro", gen: "M1", tier: "Pro", year: 2021,
        cpuCores: 10, cpuP: 8, cpuE: 2, cpuConfig: "8P + 2E",
        gpuCores: 16, gpuTFLOPS: 5.3,
        neuralTOPS: 11, memBandwidth: 200, maxMemory: 32,
        processNm: 5, transistorsB: 33.7,
        gb6Single: 2384, gb6Multi: 12318, gb6Metal: 65436,
        cb23Single: 1530, cb23Multi: 12390,
        devices_en: "MacBook Pro 14\"/16\"",
        devices_cn: "MacBook Pro 14\"/16\""
    },
    {
        name: "M1 Max", gen: "M1", tier: "Max", year: 2021,
        cpuCores: 10, cpuP: 8, cpuE: 2, cpuConfig: "8P + 2E",
        gpuCores: 32, gpuTFLOPS: 10.4,
        neuralTOPS: 11, memBandwidth: 400, maxMemory: 64,
        processNm: 5, transistorsB: 57,
        gb6Single: 2382, gb6Multi: 12404, gb6Metal: 68870,
        cb23Single: 1540, cb23Multi: 12450,
        devices_en: "MacBook Pro 14\"/16\", Mac Studio",
        devices_cn: "MacBook Pro 14\"/16\", Mac Studio"
    },
    {
        name: "M1 Ultra", gen: "M1", tier: "Ultra", year: 2022,
        cpuCores: 20, cpuP: 16, cpuE: 4, cpuConfig: "16P + 4E",
        gpuCores: 64, gpuTFLOPS: 21.0,
        neuralTOPS: 22, memBandwidth: 800, maxMemory: 128,
        processNm: 5, transistorsB: 114,
        gb6Single: 2374, gb6Multi: 18238, gb6Metal: 102156,
        cb23Single: 1536, cb23Multi: 24024,
        devices_en: "Mac Studio, Mac Pro",
        devices_cn: "Mac Studio, Mac Pro"
    },

    // === M2 Family ===
    {
        name: "M2", gen: "M2", tier: "Base", year: 2022,
        cpuCores: 8, cpuP: 4, cpuE: 4, cpuConfig: "4P + 4E",
        gpuCores: 10, gpuTFLOPS: 3.6,
        neuralTOPS: 15.8, memBandwidth: 100, maxMemory: 24,
        processNm: 5, transistorsB: 20,
        gb6Single: 2565, gb6Multi: 9637, gb6Metal: 40066,
        cb23Single: 1592, cb23Multi: 8558,
        devices_en: "MacBook Air, MacBook Pro 13\", Mac mini, iPad Pro",
        devices_cn: "MacBook Air, MacBook Pro 13\", Mac mini, iPad Pro"
    },
    {
        name: "M2 Pro", gen: "M2", tier: "Pro", year: 2023,
        cpuCores: 12, cpuP: 8, cpuE: 4, cpuConfig: "8P + 4E",
        gpuCores: 19, gpuTFLOPS: 6.8,
        neuralTOPS: 15.8, memBandwidth: 200, maxMemory: 32,
        processNm: 5, transistorsB: 40,
        gb6Single: 2654, gb6Multi: 14521, gb6Metal: 52691,
        cb23Single: 1672, cb23Multi: 14420,
        devices_en: "MacBook Pro 14\"/16\", Mac mini, Mac Studio",
        devices_cn: "MacBook Pro 14\"/16\", Mac mini, Mac Studio"
    },
    {
        name: "M2 Max", gen: "M2", tier: "Max", year: 2023,
        cpuCores: 12, cpuP: 8, cpuE: 4, cpuConfig: "8P + 4E",
        gpuCores: 38, gpuTFLOPS: 13.6,
        neuralTOPS: 15.8, memBandwidth: 400, maxMemory: 96,
        processNm: 5, transistorsB: 67,
        gb6Single: 2748, gb6Multi: 14835, gb6Metal: 86805,
        cb23Single: 1695, cb23Multi: 14780,
        devices_en: "MacBook Pro 14\"/16\", Mac Studio",
        devices_cn: "MacBook Pro 14\"/16\", Mac Studio"
    },
    {
        name: "M2 Ultra", gen: "M2", tier: "Ultra", year: 2023,
        cpuCores: 24, cpuP: 16, cpuE: 8, cpuConfig: "16P + 8E",
        gpuCores: 76, gpuTFLOPS: 27.2,
        neuralTOPS: 31.6, memBandwidth: 800, maxMemory: 192,
        processNm: 5, transistorsB: 134,
        gb6Single: 2768, gb6Multi: 21100, gb6Metal: 222582,
        cb23Single: 1700, cb23Multi: 28790,
        devices_en: "Mac Studio, Mac Pro",
        devices_cn: "Mac Studio, Mac Pro"
    },

    // === M3 Family ===
    {
        name: "M3", gen: "M3", tier: "Base", year: 2023,
        cpuCores: 8, cpuP: 4, cpuE: 4, cpuConfig: "4P + 4E",
        gpuCores: 10, gpuTFLOPS: 4.1,
        neuralTOPS: 18, memBandwidth: 100, maxMemory: 24,
        processNm: 3, transistorsB: 25,
        gb6Single: 3125, gb6Multi: 12081, gb6Metal: 45597,
        cb23Single: 1893, cb23Multi: 9557,
        devices_en: "MacBook Air, MacBook Pro 14\", iMac",
        devices_cn: "MacBook Air, MacBook Pro 14\", iMac"
    },
    {
        name: "M3 Pro", gen: "M3", tier: "Pro", year: 2023,
        cpuCores: 12, cpuP: 6, cpuE: 6, cpuConfig: "6P + 6E",
        gpuCores: 18, gpuTFLOPS: 7.4,
        neuralTOPS: 18, memBandwidth: 150, maxMemory: 36,
        processNm: 3, transistorsB: 37,
        gb6Single: 3053, gb6Multi: 14531, gb6Metal: 78681,
        cb23Single: 1880, cb23Multi: 14350,
        devices_en: "MacBook Pro 14\"/16\"",
        devices_cn: "MacBook Pro 14\"/16\""
    },
    {
        name: "M3 Max", gen: "M3", tier: "Max", year: 2023,
        cpuCores: 16, cpuP: 12, cpuE: 4, cpuConfig: "12P + 4E",
        gpuCores: 40, gpuTFLOPS: 16.4,
        neuralTOPS: 18, memBandwidth: 400, maxMemory: 128,
        processNm: 3, transistorsB: 92,
        gb6Single: 3099, gb6Multi: 21045, gb6Metal: 154860,
        cb23Single: 1885, cb23Multi: 21100,
        devices_en: "MacBook Pro 14\"/16\"",
        devices_cn: "MacBook Pro 14\"/16\""
    },
    {
        name: "M3 Ultra", gen: "M3", tier: "Ultra", year: 2025,
        cpuCores: 32, cpuP: 24, cpuE: 8, cpuConfig: "24P + 8E",
        gpuCores: 80, gpuTFLOPS: 32.8,
        neuralTOPS: 36, memBandwidth: 819, maxMemory: 256,
        processNm: 3, transistorsB: 184,
        gb6Single: 3098, gb6Multi: 27726, gb6Metal: 259668,
        cb23Single: 1890, cb23Multi: 39200,
        devices_en: "Mac Studio, Mac Pro",
        devices_cn: "Mac Studio, Mac Pro"
    },

    // === M4 Family ===
    {
        name: "M4", gen: "M4", tier: "Base", year: 2024,
        cpuCores: 10, cpuP: 4, cpuE: 6, cpuConfig: "4P + 6E",
        gpuCores: 10, gpuTFLOPS: 4.6,
        neuralTOPS: 38, memBandwidth: 120, maxMemory: 32,
        processNm: 3, transistorsB: 28,
        gb6Single: 3765, gb6Multi: 14889, gb6Metal: 54846,
        cb23Single: 2162, cb23Multi: 12070,
        devices_en: "MacBook Pro 14\", iMac, Mac mini, iPad Pro",
        devices_cn: "MacBook Pro 14\", iMac, Mac mini, iPad Pro"
    },
    {
        name: "M4 Pro", gen: "M4", tier: "Pro", year: 2024,
        cpuCores: 14, cpuP: 10, cpuE: 4, cpuConfig: "10P + 4E",
        gpuCores: 20, gpuTFLOPS: 9.2,
        neuralTOPS: 38, memBandwidth: 273, maxMemory: 64,
        processNm: 3, transistorsB: null,
        gb6Single: 3802, gb6Multi: 22400, gb6Metal: 110556,
        cb23Single: 2382, cb23Multi: 18904,
        devices_en: "MacBook Pro 14\"/16\", Mac mini",
        devices_cn: "MacBook Pro 14\"/16\", Mac mini"
    },
    {
        name: "M4 Max", gen: "M4", tier: "Max", year: 2024,
        cpuCores: 16, cpuP: 12, cpuE: 4, cpuConfig: "12P + 4E",
        gpuCores: 40, gpuTFLOPS: 18.4,
        neuralTOPS: 38, memBandwidth: 546, maxMemory: 128,
        processNm: 3, transistorsB: null,
        gb6Single: 4060, gb6Multi: 26675, gb6Metal: 190329,
        cb23Single: 2400, cb23Multi: 24800,
        devices_en: "MacBook Pro 14\"/16\"",
        devices_cn: "MacBook Pro 14\"/16\""
    },

    // === M5 Family ===
    {
        name: "M5", gen: "M5", tier: "Base", year: 2025,
        cpuCores: 10, cpuP: 4, cpuE: 6, cpuConfig: "4P + 6E",
        gpuCores: 10, gpuTFLOPS: 6.6,
        neuralTOPS: null, memBandwidth: 153, maxMemory: 32,
        processNm: 3, transistorsB: null,
        gb6Single: 4228, gb6Multi: 17460, gb6Metal: 76278,
        cb23Single: 2459, cb23Multi: 15893,
        devices_en: "MacBook Pro 14\", MacBook Air, iPad Pro, Vision Pro",
        devices_cn: "MacBook Pro 14\", MacBook Air, iPad Pro, Vision Pro"
    },
    {
        name: "M5 Pro", gen: "M5", tier: "Pro", year: 2026,
        cpuCores: 18, cpuP: 6, cpuE: 12, cpuConfig: "6P + 12E",
        gpuCores: 20, gpuTFLOPS: null,
        neuralTOPS: null, memBandwidth: 307, maxMemory: 64,
        processNm: 3, transistorsB: null,
        gb6Single: 4242, gb6Multi: 28111, gb6Metal: null,
        cb23Single: null, cb23Multi: null,
        devices_en: "MacBook Pro 14\"/16\"",
        devices_cn: "MacBook Pro 14\"/16\""
    },
    {
        name: "M5 Max", gen: "M5", tier: "Max", year: 2026,
        cpuCores: 18, cpuP: 6, cpuE: 12, cpuConfig: "6P + 12E",
        gpuCores: 40, gpuTFLOPS: null,
        neuralTOPS: null, memBandwidth: 614, maxMemory: 128,
        processNm: 3, transistorsB: null,
        gb6Single: 4268, gb6Multi: 29233, gb6Metal: 232718,
        cb23Single: null, cb23Multi: null,
        devices_en: "MacBook Pro 16\"",
        devices_cn: "MacBook Pro 16\""
    }
];

// ---- COLUMN DEFINITIONS ----
const columns = [
    { key: "name",          en: "Chip",             cn: "芯片",            sortable: false, type: "chip" },
    { key: "year",          en: "Year",             cn: "年份",            sortable: true,  type: "number" },
    { key: "processNm",    en: "nm",               cn: "制程",            sortable: true,  type: "number" },
    { key: "cpuCores",     en: "CPU",              cn: "CPU核心",         sortable: true,  type: "number" },
    { key: "cpuConfig",    en: "Config",           cn: "配置",            sortable: false, type: "text" },
    { key: "gpuCores",     en: "GPU",              cn: "GPU核心",         sortable: true,  type: "number" },
    { key: "gpuTFLOPS",    en: "TFLOPS",           cn: "TFLOPS",          sortable: true,  type: "decimal" },
    { key: "neuralTOPS",   en: "NE TOPS",          cn: "NE TOPS",         sortable: true,  type: "number" },
    { key: "memBandwidth", en: "BW GB/s",          cn: "带宽GB/s",        sortable: true,  type: "decimal" },
    { key: "maxMemory",    en: "MaxRAM",           cn: "最大内存",        sortable: true,  type: "number" },
    { key: "transistorsB", en: "Trans(B)",         cn: "晶体管(B)",       sortable: true,  type: "decimal" },
    { key: "gb6Single",    en: "GB6-S",            cn: "GB6单核",         sortable: true,  type: "number" },
    { key: "gb6Multi",     en: "GB6-M",            cn: "GB6多核",         sortable: true,  type: "bar", maxKey: "gb6Multi" },
    { key: "gb6Metal",     en: "Metal",            cn: "Metal分",         sortable: true,  type: "bar", maxKey: "gb6Metal" },
    { key: "cb23Single",   en: "CB-S",             cn: "CB单核",          sortable: true,  type: "number" },
    { key: "cb23Multi",    en: "CB-M",             cn: "CB多核",          sortable: true,  type: "bar", maxKey: "cb23Multi" },
];

// ---- STATE ----
let currentLang = "en";
let activeGenFilter = "all";
let activeTierFilter = "all";
let sortKey = null;
let sortDir = "desc";
let charts = {};

const genColors = {
    M1: { bg: "rgba(255,159,10,0.7)",  border: "#ff9f0a" },
    M2: { bg: "rgba(48,209,88,0.7)",   border: "#30d158" },
    M3: { bg: "rgba(100,210,255,0.7)", border: "#64d2ff" },
    M4: { bg: "rgba(191,90,242,0.7)",  border: "#bf5af2" },
    M5: { bg: "rgba(255,55,95,0.7)",   border: "#ff375f" }
};

// ---- INIT ----
document.addEventListener("DOMContentLoaded", () => {
    renderTable();
    renderTierList();
    renderCharts();
    renderGuide();
    renderGlossary();
    setupFilters();
    setupSort();
    setupLangToggle();
    setupTabs();
    setupTierMetric();
});

// ---- FILTERING ----
function getFilteredData() {
    return chipData.filter(chip => {
        const genMatch = activeGenFilter === "all" || chip.gen === activeGenFilter;
        const tierMatch = activeTierFilter === "all" || chip.tier === activeTierFilter;
        return genMatch && tierMatch;
    });
}

function getSortedData() {
    let data = getFilteredData();
    if (sortKey) {
        data.sort((a, b) => {
            let aVal = a[sortKey], bVal = b[sortKey];
            if (aVal == null) aVal = -Infinity;
            if (bVal == null) bVal = -Infinity;
            return sortDir === "asc" ? aVal - bVal : bVal - aVal;
        });
    }
    return data;
}

// ---- TAB NAVIGATION ----
function setupTabs() {
    document.querySelectorAll(".tab-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            document.querySelectorAll(".tab-btn").forEach(b => b.classList.remove("active"));
            document.querySelectorAll(".tab-content").forEach(c => c.classList.remove("active"));
            btn.classList.add("active");
            document.getElementById(`tab-${btn.dataset.tab}`).classList.add("active");
            // Re-render charts when switching to charts tab (fixes canvas sizing)
            if (btn.dataset.tab === "charts") {
                setTimeout(() => renderCharts(), 50);
            }
        });
    });
}

// ---- TABLE RENDERING ----
function renderTable() {
    const headerRow = document.getElementById("tableHeader");
    const tbody = document.getElementById("tableBody");

    headerRow.innerHTML = "";
    columns.forEach(col => {
        const th = document.createElement("th");
        th.textContent = currentLang === "en" ? col.en : col.cn;
        if (col.sortable) {
            th.dataset.key = col.key;
            const arrow = document.createElement("span");
            arrow.className = "sort-arrow";
            arrow.textContent = sortKey === col.key ? (sortDir === "asc" ? "▲" : "▼") : "⇅";
            th.appendChild(arrow);
            if (sortKey === col.key) th.classList.add(sortDir === "asc" ? "sorted-asc" : "sorted-desc");
        }
        headerRow.appendChild(th);
    });

    const data = getSortedData();
    const maxValues = {};
    ["gb6Multi", "gb6Metal", "cb23Multi"].forEach(key => {
        maxValues[key] = Math.max(...chipData.map(c => c[key] || 0));
    });

    tbody.innerHTML = "";
    data.forEach((chip, index) => {
        const tr = document.createElement("tr");
        tr.className = `highlight-${chip.gen.toLowerCase()}`;

        columns.forEach(col => {
            const td = document.createElement("td");
            const val = chip[col.key];

            if (col.type === "chip") {
                const badgeClass = `badge-${chip.tier.toLowerCase()}`;
                td.innerHTML = `<div class="chip-name">
                    <span>${chip.name}</span>
                    <span class="chip-badge ${badgeClass}">${chip.tier}</span>
                </div>`;
            } else if (col.type === "bar") {
                if (val != null) {
                    const pct = (val / maxValues[col.maxKey]) * 100;
                    td.innerHTML = `<div class="bar-cell">
                        <span>${val.toLocaleString()}</span>
                        <div class="bar-fill" style="width: ${Math.max(pct * 0.5, 2)}px;"></div>
                    </div>`;
                } else {
                    td.textContent = "—"; td.style.color = "var(--text-muted)";
                }
            } else if (col.type === "decimal") {
                if (val != null) td.textContent = val % 1 === 0 ? val.toLocaleString() : val.toFixed(1);
                else { td.textContent = "—"; td.style.color = "var(--text-muted)"; }
            } else if (col.type === "number") {
                if (val != null) td.textContent = col.key === "year" ? val : val.toLocaleString();
                else { td.textContent = "—"; td.style.color = "var(--text-muted)"; }
            } else {
                td.textContent = val ?? "—";
            }
            tr.appendChild(td);
        });
        tbody.appendChild(tr);
    });
}

// ---- TIER LIST / 天梯图 ----
function renderTierList() {
    const container = document.getElementById("tierListContainer");
    const metric = document.getElementById("tierMetric").value;

    const data = getFilteredData()
        .filter(c => c[metric] != null)
        .sort((a, b) => b[metric] - a[metric]);

    if (data.length === 0) {
        container.innerHTML = `<p style="color:var(--text-muted);text-align:center;padding:40px;">
            ${currentLang === "en" ? "No data available for this metric with current filters." : "当前筛选条件下无该指标数据。"}
        </p>`;
        return;
    }

    const maxVal = data[0][metric];

    // Determine unit label
    const metricLabels = {
        gb6Multi: "", gb6Single: "", gb6Metal: "",
        cb23Multi: "", cb23Single: "",
        gpuTFLOPS: " TFLOPS", memBandwidth: " GB/s",
        cpuCores: " cores", gpuCores: " cores"
    };
    const unit = metricLabels[metric] || "";

    container.innerHTML = "";
    data.forEach((chip, i) => {
        const pct = (chip[metric] / maxVal) * 100;
        const rankClass = i === 0 ? "tier-rank-1" : i === 1 ? "tier-rank-2" : i === 2 ? "tier-rank-3" : "tier-rank-other";
        const barClass = `tier-${chip.gen.toLowerCase()}`;

        const row = document.createElement("div");
        row.className = "tier-row";
        row.style.animationDelay = `${i * 0.04}s`;

        const valStr = typeof chip[metric] === "number" && chip[metric] % 1 !== 0
            ? chip[metric].toFixed(1) : chip[metric].toLocaleString();

        row.innerHTML = `
            <div class="tier-rank ${rankClass}">${i + 1}</div>
            <div class="tier-bar-wrap">
                <div class="tier-bar ${barClass}" style="width: ${Math.max(pct, 8)}%;">
                    <span class="tier-chip-name">${chip.name}</span>
                    <span class="tier-chip-badge">${chip.tier}</span>
                    <span class="tier-value">${valStr}${unit}</span>
                </div>
            </div>
        `;
        container.appendChild(row);
    });
}

// ---- CHART RENDERING ----
function renderCharts() {
    const data = getFilteredData();
    const chartConfig = [
        { id: "geekbenchChart", key: "gb6Multi" },
        { id: "metalChart",     key: "gb6Metal" },
        { id: "cinebenchChart", key: "cb23Multi" },
        { id: "tflopsChart",    key: "gpuTFLOPS" },
        { id: "memBwChart",     key: "memBandwidth" },
        { id: "neuralChart",    key: "neuralTOPS" },
    ];

    const labels = data.map(c => c.name);
    const bgColors = data.map(c => genColors[c.gen].bg);
    const borderColors = data.map(c => genColors[c.gen].border);

    chartConfig.forEach(cfg => {
        const canvas = document.getElementById(cfg.id);
        if (!canvas) return;
        if (charts[cfg.id]) charts[cfg.id].destroy();

        const ctx = canvas.getContext("2d");
        const values = data.map(c => c[cfg.key]);

        charts[cfg.id] = new Chart(ctx, {
            type: "bar",
            data: {
                labels,
                datasets: [{
                    data: values,
                    backgroundColor: bgColors,
                    borderColor: borderColors,
                    borderWidth: 1.5, borderRadius: 4, borderSkipped: false,
                }]
            },
            options: {
                responsive: true, maintainAspectRatio: true,
                animation: { duration: 800, easing: "easeOutQuart" },
                plugins: {
                    legend: { display: false },
                    tooltip: {
                        backgroundColor: "rgba(22,22,30,0.95)",
                        titleColor: "#f5f5f7", bodyColor: "#a1a1a6",
                        borderColor: "rgba(255,255,255,0.1)", borderWidth: 1,
                        cornerRadius: 8, padding: 12,
                        titleFont: { family: "'Inter', sans-serif", weight: 600 },
                        bodyFont: { family: "'Inter', sans-serif" },
                        callbacks: {
                            label: ctx => {
                                const v = ctx.parsed.y;
                                return v != null ? v.toLocaleString() : "N/A";
                            }
                        }
                    }
                },
                scales: {
                    x: {
                        grid: { color: "rgba(255,255,255,0.04)" },
                        ticks: { color: "#6e6e73", font: { family: "'Inter'", size: 10 }, maxRotation: 45, minRotation: 45 }
                    },
                    y: {
                        grid: { color: "rgba(255,255,255,0.04)" },
                        ticks: { color: "#6e6e73", font: { family: "'Inter'", size: 11 }, callback: v => v.toLocaleString() },
                        beginAtZero: true
                    }
                }
            }
        });
    });
}

// ---- FILTERS ----
function setupFilters() {
    document.getElementById("genFilters").addEventListener("click", e => {
        const btn = e.target.closest(".filter-chip");
        if (!btn) return;
        document.querySelectorAll("#genFilters .filter-chip").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        activeGenFilter = btn.dataset.filter;
        refresh();
    });

    document.getElementById("tierFilters").addEventListener("click", e => {
        const btn = e.target.closest(".filter-chip");
        if (!btn) return;
        document.querySelectorAll("#tierFilters .filter-chip").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        activeTierFilter = btn.dataset.filter;
        refresh();
    });
}

function refresh() {
    renderTable();
    renderTierList();
    renderCharts();
    // Also refresh extra tabs
    if (typeof renderPower === "function") renderPower();
    if (typeof renderDevices === "function") renderDevices();
    if (typeof renderRealWorld === "function") renderRealWorld();
    if (typeof renderThermal === "function") renderThermal();
    if (typeof renderPricePerf === "function") renderPricePerf();
}

// ---- SORT ----
function setupSort() {
    document.getElementById("tableHeader").addEventListener("click", e => {
        const th = e.target.closest("th[data-key]");
        if (!th) return;
        const key = th.dataset.key;
        if (sortKey === key) sortDir = sortDir === "asc" ? "desc" : "asc";
        else { sortKey = key; sortDir = "desc"; }
        renderTable();
    });
}

// ---- TIER METRIC SELECTOR ----
function setupTierMetric() {
    document.getElementById("tierMetric").addEventListener("change", () => renderTierList());
}

// ---- LANGUAGE TOGGLE ----
function setupLangToggle() {
    document.getElementById("langToggle").addEventListener("click", () => {
        currentLang = currentLang === "en" ? "cn" : "en";
        document.querySelector("#langToggle .lang-label").textContent = currentLang === "en" ? "中文" : "English";

        document.querySelectorAll("[data-en][data-cn]").forEach(el => {
            if (el.tagName === "OPTION") {
                el.textContent = currentLang === "en" ? el.dataset.en : el.dataset.cn;
            } else {
                el.textContent = currentLang === "en" ? el.dataset.en : el.dataset.cn;
            }
        });

        renderTable();
        renderTierList();
        renderGuide();
        renderGlossary();
        // Refresh extra tabs when language changes
        if (typeof renderPower === "function") renderPower();
        if (typeof renderDevices === "function") renderDevices();
        if (typeof renderRealWorld === "function") renderRealWorld();
        if (typeof renderThermal === "function") renderThermal();
        if (typeof renderPricePerf === "function") renderPricePerf();
        if (typeof initVS === "function") initVS();
    });
}

// ============================================================
// BUYING GUIDE DATA
// ============================================================
const guideScenarios = [
    {
        id: "daily", icon: "💻",
        title_en: "Daily Office & Web", title_cn: "日常办公 & 上网",
        desc_en: "Email, web browsing, Word/Excel, video calls, light multitasking",
        desc_cn: "邮件、网页浏览、Word/Excel、视频会议、轻度多任务",
        tier_en: "Base chips", tier_cn: "基础款芯片",
        metrics: { gb6Single: 80, gb6Multi: 30, gb6Metal: 10, memBandwidth: 15, neuralTOPS: 20 },
        recommend: [
            { chips: ["M4", "M5", "M3"], level: "perfect", note_en: "Instant response, all-day battery", note_cn: "秒级响应，全天续航" },
            { chips: ["M2", "M1"], level: "good", note_en: "Still very capable for daily tasks", note_cn: "日常使用依然流畅" }
        ]
    },
    {
        id: "student", icon: "🎓",
        title_en: "Student & Light Creation", title_cn: "学生 & 轻创作",
        desc_en: "Coding (Xcode/VS Code), note-taking, light photo editing, presentations",
        desc_cn: "编程（Xcode/VS Code）、笔记、轻度修图、做PPT",
        tier_en: "Base / Pro chips", tier_cn: "基础 / Pro 款",
        metrics: { gb6Single: 70, gb6Multi: 50, gb6Metal: 25, memBandwidth: 30, neuralTOPS: 25 },
        recommend: [
            { chips: ["M4", "M5", "M4 Pro"], level: "perfect", note_en: "Xcode compiles fly, 16GB is enough", note_cn: "Xcode 编译飞快，16GB足够" },
            { chips: ["M3", "M3 Pro", "M2"], level: "good", note_en: "Very smooth for most student workflows", note_cn: "绝大多数学生场景都很流畅" }
        ]
    },
    {
        id: "photo", icon: "📸",
        title_en: "Photography & Design", title_cn: "摄影 & 平面设计",
        desc_en: "Photoshop, Lightroom, Illustrator, Figma, large PSD/RAW files",
        desc_cn: "Photoshop、Lightroom、Illustrator、Figma、大PSD/RAW文件",
        tier_en: "Pro chips (32GB+)", tier_cn: "Pro 款（32GB+）",
        metrics: { gb6Single: 75, gb6Multi: 60, gb6Metal: 40, memBandwidth: 60, neuralTOPS: 30 },
        recommend: [
            { chips: ["M4 Pro", "M5 Pro"], level: "perfect", note_en: "Fast exports, smooth large canvas", note_cn: "导出飞快，大画布丝滑" },
            { chips: ["M3 Pro", "M2 Pro", "M4"], level: "good", note_en: "Handles most photo workflows well", note_cn: "完全能应对主流修图工作" }
        ]
    },
    {
        id: "video", icon: "🎬",
        title_en: "Video Editing", title_cn: "视频剪辑",
        desc_en: "Final Cut Pro, DaVinci Resolve, Premiere Pro, 4K/6K timeline",
        desc_cn: "Final Cut Pro、DaVinci Resolve、Premiere Pro、4K/6K 时间线",
        tier_en: "Pro / Max chips", tier_cn: "Pro / Max 款",
        metrics: { gb6Single: 50, gb6Multi: 75, gb6Metal: 70, memBandwidth: 75, neuralTOPS: 30 },
        recommend: [
            { chips: ["M4 Max", "M5 Max", "M4 Pro"], level: "perfect", note_en: "Real-time 4K, fast 8K export", note_cn: "4K 实时预览，8K快速导出" },
            { chips: ["M3 Max", "M3 Pro", "M5 Pro"], level: "good", note_en: "Smooth 4K editing, decent exports", note_cn: "4K 流畅剪辑，导出速度不错" },
            { chips: ["M2 Max", "M2 Pro"], level: "ok", note_en: "Workable but slower on complex timelines", note_cn: "能用但复杂时间线会慢" }
        ]
    },
    {
        id: "3d", icon: "🧊",
        title_en: "3D & Motion Design", title_cn: "3D & 动效设计",
        desc_en: "Blender, Cinema 4D, After Effects, Maya, complex 3D rendering",
        desc_cn: "Blender、Cinema 4D、After Effects、Maya、复杂3D渲染",
        tier_en: "Max / Ultra chips", tier_cn: "Max / Ultra 款",
        metrics: { gb6Single: 40, gb6Multi: 80, gb6Metal: 85, memBandwidth: 80, neuralTOPS: 20 },
        recommend: [
            { chips: ["M3 Ultra", "M5 Max", "M4 Max"], level: "perfect", note_en: "Professional-grade rendering power", note_cn: "专业级渲染性能" },
            { chips: ["M3 Max", "M2 Ultra"], level: "good", note_en: "Solid for most 3D workflows", note_cn: "大多数3D工作流够用" }
        ]
    },
    {
        id: "gaming", icon: "🎮",
        title_en: "Gaming", title_cn: "游戏",
        desc_en: "AAA games, Apple Arcade, Genshin Impact, Resident Evil, ray tracing",
        desc_cn: "3A 大作、Apple Arcade、原神、生化危机、光线追踪",
        tier_en: "Pro / Max chips", tier_cn: "Pro / Max 款",
        metrics: { gb6Single: 60, gb6Multi: 40, gb6Metal: 90, memBandwidth: 65, neuralTOPS: 10 },
        recommend: [
            { chips: ["M5 Max", "M4 Max", "M3 Max"], level: "perfect", note_en: "High FPS at max settings, ray tracing", note_cn: "最高画质高帧率，支持光追" },
            { chips: ["M5", "M4 Pro", "M4"], level: "good", note_en: "Good gaming experience at medium-high", note_cn: "中高画质流畅游戏体验" },
            { chips: ["M3", "M3 Pro"], level: "ok", note_en: "Playable with some compromises", note_cn: "能玩但需要降低画质" }
        ]
    },
    {
        id: "ai", icon: "🤖",
        title_en: "AI & Machine Learning", title_cn: "AI & 机器学习",
        desc_en: "Stable Diffusion, LLM inference, CoreML, model training, Apple Intelligence",
        desc_cn: "Stable Diffusion、大模型推理、CoreML 训练、Apple Intelligence",
        tier_en: "Max / Ultra chips (64GB+)", tier_cn: "Max / Ultra 款（64GB+）",
        metrics: { gb6Single: 30, gb6Multi: 60, gb6Metal: 60, memBandwidth: 90, neuralTOPS: 90 },
        recommend: [
            { chips: ["M3 Ultra", "M2 Ultra", "M5 Max"], level: "perfect", note_en: "Run 70B models, fast SD generation", note_cn: "跑 70B 大模型，SD 出图快" },
            { chips: ["M4 Max", "M3 Max", "M4 Pro"], level: "good", note_en: "Run 7B-30B models, decent SD speed", note_cn: "跑 7B-30B 模型，SD 速度不错" },
            { chips: ["M4", "M5"], level: "ok", note_en: "Small models only, basic AI tasks", note_cn: "仅限小模型，基础 AI 任务" }
        ]
    },
    {
        id: "vfx", icon: "🎥",
        title_en: "Film & VFX Post-Production", title_cn: "影视 & 特效后期",
        desc_en: "Nuke, DaVinci Resolve Studio, large-scale compositing, 8K+",
        desc_cn: "Nuke、DaVinci Resolve Studio、大型合成、8K+ 后期",
        tier_en: "Ultra chips (128GB+)", tier_cn: "Ultra 款（128GB+）",
        metrics: { gb6Single: 40, gb6Multi: 95, gb6Metal: 95, memBandwidth: 95, neuralTOPS: 40 },
        recommend: [
            { chips: ["M3 Ultra", "M2 Ultra"], level: "perfect", note_en: "Studio-grade, handles any workload", note_cn: "影棚级，任何工作流都能扛" },
            { chips: ["M5 Max", "M4 Max"], level: "good", note_en: "Great for most post-production tasks", note_cn: "绝大部分后期任务够用" }
        ]
    }
];

// Glossary data
const glossaryData = [
    {
        metric_en: "Geekbench 6 Single-Core", metric_cn: "Geekbench 6 单核",
        desc_en: "How fast a single app opens and responds. Affects everyday snappiness — launching apps, loading web pages, typing lag.",
        desc_cn: "单个应用打开和响应的速度。影响日常操作流畅度 — 启动应用、加载网页、输入延迟。"
    },
    {
        metric_en: "Geekbench 6 Multi-Core", metric_cn: "Geekbench 6 多核",
        desc_en: "How well the chip handles many tasks at once. Matters for video export, code compilation, running VMs + apps simultaneously.",
        desc_cn: "芯片同时处理多任务的能力。影响视频导出、代码编译、同时跑虚拟机和多个应用。"
    },
    {
        metric_en: "GPU Metal Score", metric_cn: "GPU Metal 分数",
        desc_en: "Graphics rendering power. Directly impacts gaming FPS, video effects previews, 3D viewport smoothness, and UI animations.",
        desc_cn: "图形渲染性能。直接影响游戏帧率、视频特效预览、3D 视口流畅度和 UI 动画效果。"
    },
    {
        metric_en: "GPU TFLOPS", metric_cn: "GPU 浮点算力",
        desc_en: "Theoretical peak compute power of the GPU. Key for AI image generation (Stable Diffusion), ML training, and compute-heavy shaders.",
        desc_cn: "GPU 理论峰值计算能力。影响 AI 出图（Stable Diffusion）、机器学习训练、计算密集型着色器。"
    },
    {
        metric_en: "Cinebench R23 Single", metric_cn: "Cinebench R23 单核",
        desc_en: "CPU-intensive single-thread tasks. Photoshop filter processing, Excel complex formulas, single-threaded app performance.",
        desc_cn: "CPU 密集型单线程任务。Photoshop 滤镜处理、Excel 复杂公式计算、单线程应用性能。"
    },
    {
        metric_en: "Cinebench R23 Multi", metric_cn: "Cinebench R23 多核",
        desc_en: "Professional multi-threaded rendering. Final Cut Pro exports, Blender renders, large codebase compilation speed.",
        desc_cn: "专业多线程渲染能力。Final Cut Pro 导出、Blender 渲染、大型代码库编译速度。"
    },
    {
        metric_en: "Neural Engine (TOPS)", metric_cn: "神经引擎 (TOPS)",
        desc_en: "On-device AI acceleration. Powers Siri, Live Text, photo search, real-time captions, Apple Intelligence features.",
        desc_cn: "端侧 AI 加速。驱动 Siri、实况文本、照片智能搜索、实时字幕翻译、Apple Intelligence。"
    },
    {
        metric_en: "Memory Bandwidth (GB/s)", metric_cn: "内存带宽 (GB/s)",
        desc_en: "How fast data flows between CPU/GPU and memory. Critical for editing 4K+ video timelines, large Photoshop files, and AI model loading.",
        desc_cn: "CPU/GPU 和内存之间的数据传输速度。影响 4K+ 视频时间线编辑、大型 PSD 文件操作、AI 模型加载。"
    },
    {
        metric_en: "Max Unified Memory", metric_cn: "最大统一内存",
        desc_en: "How much you can have open at once. 16GB handles basic tasks; 32GB for pro work; 64GB+ for VMs, large AI models, and complex projects.",
        desc_cn: "能同时打开多少东西。16GB 够基础使用；32GB 适合专业工作；64GB+ 跑虚拟机、大AI模型、复杂项目。"
    }
];

// ---- GUIDE RENDERING ----
function renderGuide() {
    const grid = document.getElementById("guideGrid");
    if (!grid) return;
    grid.innerHTML = "";

    guideScenarios.forEach((s, i) => {
        const card = document.createElement("div");
        card.className = "guide-card";
        card.dataset.scenarioId = s.id;
        card.style.animationDelay = `${i * 0.05}s`;

        const title = currentLang === "en" ? s.title_en : s.title_cn;
        const desc = currentLang === "en" ? s.desc_en : s.desc_cn;
        const tier = currentLang === "en" ? s.tier_en : s.tier_cn;

        card.innerHTML = `
            <span class="guide-icon">${s.icon}</span>
            <div class="guide-card-title">${title}</div>
            <div class="guide-card-desc">${desc}</div>
            <span class="guide-tier-tag">${currentLang === "en" ? "Recommended: " : "推荐："}${tier}</span>
        `;

        card.addEventListener("click", () => {
            document.querySelectorAll(".guide-card").forEach(c => c.classList.remove("active"));
            card.classList.add("active");
            showGuideDetail(s);
        });

        grid.appendChild(card);
    });
}

function showGuideDetail(scenario) {
    const detail = document.getElementById("guideDetail");
    const title = currentLang === "en" ? scenario.title_en : scenario.title_cn;

    // Build metric importance bars
    const metricNames = {
        gb6Single:    { en: "Single-Core",   cn: "单核性能" },
        gb6Multi:     { en: "Multi-Core",    cn: "多核性能" },
        gb6Metal:     { en: "GPU Graphics",  cn: "GPU 图形" },
        memBandwidth: { en: "Memory BW",     cn: "内存带宽" },
        neuralTOPS:   { en: "Neural Engine", cn: "神经引擎" }
    };

    let metricsHTML = "";
    for (const [key, importance] of Object.entries(scenario.metrics)) {
        const name = currentLang === "en" ? metricNames[key].en : metricNames[key].cn;
        const label = importance >= 80 ? (currentLang === "en" ? "Critical" : "关键")
            : importance >= 50 ? (currentLang === "en" ? "Important" : "重要")
            : (currentLang === "en" ? "Low" : "次要");
        metricsHTML += `
            <div class="guide-metric-item">
                <span class="metric-name">${name}</span>
                <div class="metric-bar">
                    <div class="metric-bar-fill" style="width: ${importance}%;"></div>
                </div>
                <span class="metric-label">${label}</span>
            </div>
        `;
    }

    // Build chip recommendations
    let chipsHTML = "";
    scenario.recommend.forEach(rec => {
        const note = currentLang === "en" ? rec.note_en : rec.note_cn;
        rec.chips.forEach(chip => {
            chipsHTML += `<span class="guide-chip-tag ${rec.level}" title="${note}">${chip}</span>`;
        });
    });

    // Legend labels
    const legendPerfect = currentLang === "en" ? "✅ Perfect" : "✅ 最佳";
    const legendGood = currentLang === "en" ? "🔵 Good" : "🔵 推荐";
    const legendOk = currentLang === "en" ? "⚪ Workable" : "⚪ 够用";

    detail.innerHTML = `
        <h4>${scenario.icon} ${title}</h4>
        <div class="guide-detail-grid">
            <div class="guide-detail-left">
                <h5>${currentLang === "en" ? "Key Metrics Importance" : "关键指标重要程度"}</h5>
                ${metricsHTML}
            </div>
            <div class="guide-detail-right">
                <h5>${currentLang === "en" ? "Recommended Chips" : "推荐芯片"}</h5>
                <div class="guide-chip-list">${chipsHTML}</div>
                <div style="margin-top:12px;font-size:11px;color:var(--text-muted);">
                    ${legendPerfect} &nbsp; ${legendGood} &nbsp; ${legendOk}
                </div>
                <div style="margin-top:16px;font-size:12px;color:var(--text-secondary);line-height:1.6;">
                    ${scenario.recommend.map(r => {
                        const note = currentLang === "en" ? r.note_en : r.note_cn;
                        const emoji = r.level === "perfect" ? "✅" : r.level === "good" ? "🔵" : "⚪";
                        return `${emoji} <strong>${r.chips.join(", ")}</strong> — ${note}`;
                    }).join("<br>")}
                </div>
            </div>
        </div>
    `;

    detail.classList.add("open");
}

// ---- GLOSSARY RENDERING ----
function renderGlossary() {
    const grid = document.getElementById("glossaryGrid");
    if (!grid) return;
    grid.innerHTML = "";

    glossaryData.forEach(item => {
        const div = document.createElement("div");
        div.className = "glossary-item";
        div.innerHTML = `
            <div class="glossary-metric">${currentLang === "en" ? item.metric_en : item.metric_cn}</div>
            <div class="glossary-desc">${currentLang === "en" ? item.desc_en : item.desc_cn}</div>
        `;
        grid.appendChild(div);
    });
}

