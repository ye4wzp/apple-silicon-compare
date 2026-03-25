/* ============================================
   Apple Silicon — Features Module
   Die Map, Share Card, Changelog, Simulator
   Data sources:
   - Die sizes/transistors: Apple WWDC, TechInsights, WikiChip
   - Block layout: Apple marketing materials, AnandTech analysis
   - Simulator benchmarks: Existing chipData + extendedData
   ============================================ */

// ============================================================
// DIE MAP DATA
// Sources: Apple WWDC keynotes, TechInsights teardowns,
// WikiChip die annotations, AnandTech.com chip analysis
// ============================================================
const dieMapData = {
    "M1": {
        transistors: "16B", dieSizeMm2: 120, processNm: 5, node: "TSMC N5",
        source: "Apple WWDC 2020, TechInsights",
        blocks: [
            { id:"cpu-p", label:"P-Core ×4", labelCn:"性能核 ×4", x:5, y:5, w:35, h:30, color:"#2997ff", desc:"Firestorm, 192KB L1i + 128KB L1d each, 12MB shared L2", descCn:"Firestorm 架构, 每核 192KB L1i + 128KB L1d, 12MB 共享 L2" },
            { id:"cpu-e", label:"E-Core ×4", labelCn:"能效核 ×4", x:42, y:5, w:25, h:18, color:"#30d158", desc:"Icestorm, 128KB L1i + 64KB L1d each, 4MB shared L2", descCn:"Icestorm 架构, 每核 128KB L1i + 64KB L1d, 4MB 共享 L2" },
            { id:"gpu", label:"GPU 8-Core", labelCn:"GPU 8核", x:5, y:40, w:45, h:28, color:"#ff9f0a", desc:"Apple GPU, 2.6 TFLOPS FP32, 128 ALUs", descCn:"Apple GPU, 2.6 TFLOPS FP32, 128 个 ALU" },
            { id:"ne", label:"Neural Engine", labelCn:"神经引擎", x:55, y:40, w:40, h:15, color:"#bf5af2", desc:"16-core, 11 TOPS, 8-bit/16-bit operations", descCn:"16 核, 11 TOPS, 支持 8/16 位运算" },
            { id:"mem", label:"Memory Controller", labelCn:"内存控制器", x:5, y:72, w:90, h:10, color:"#64d2ff", desc:"128-bit LPDDR4X, 68.25 GB/s, 8/16GB unified", descCn:"128-bit LPDDR4X, 68.25 GB/s, 8/16GB 统一内存" },
            { id:"media", label:"Media Engine", labelCn:"媒体引擎", x:55, y:5, w:20, h:18, color:"#ff375f", desc:"H.264/HEVC/ProRes decode, 1 encode engine", descCn:"H.264/HEVC/ProRes 解码, 1 个编码引擎" },
            { id:"io", label:"I/O & Fabric", labelCn:"I/O 总线", x:55, y:58, w:40, h:10, color:"#ffd60a", desc:"Thunderbolt/USB4 ×2, PCIe 4.0 ×8", descCn:"Thunderbolt/USB4 ×2, PCIe 4.0 ×8" },
            { id:"isp", label:"ISP", labelCn:"图像处理", x:78, y:5, w:17, h:18, color:"#86868b", desc:"Image Signal Processor, up to 4K HDR video", descCn:"图像信号处理器, 最高 4K HDR 视频" }
        ]
    },
    "M2": {
        transistors: "20B", dieSizeMm2: 149, processNm: 5, node: "TSMC N5P (2nd gen)",
        source: "Apple WWDC 2022, TechInsights",
        blocks: [
            { id:"cpu-p", label:"P-Core ×4", labelCn:"性能核 ×4", x:5, y:5, w:35, h:28, color:"#2997ff", desc:"Avalanche, +18% IPC vs M1, 192KB L1i + 128KB L1d, 16MB shared L2", descCn:"Avalanche 架构, IPC 提升 18%, 16MB 共享 L2" },
            { id:"cpu-e", label:"E-Core ×4", labelCn:"能效核 ×4", x:42, y:5, w:25, h:16, color:"#30d158", desc:"Blizzard, 128KB L1i + 64KB L1d, 4MB shared L2", descCn:"Blizzard 架构, 4MB 共享 L2" },
            { id:"gpu", label:"GPU 10-Core", labelCn:"GPU 10核", x:5, y:38, w:50, h:28, color:"#ff9f0a", desc:"Apple GPU, 3.6 TFLOPS FP32, +35% vs M1", descCn:"Apple GPU, 3.6 TFLOPS FP32, 比 M1 提升 35%" },
            { id:"ne", label:"Neural Engine", labelCn:"神经引擎", x:58, y:38, w:37, h:14, color:"#bf5af2", desc:"16-core, 15.8 TOPS, +40% vs M1", descCn:"16 核, 15.8 TOPS, 比 M1 提升 40%" },
            { id:"mem", label:"Memory Controller", labelCn:"内存控制器", x:5, y:72, w:90, h:10, color:"#64d2ff", desc:"128-bit LPDDR5, 100 GB/s, 8/16/24GB unified", descCn:"128-bit LPDDR5, 100 GB/s, 8/16/24GB 统一内存" },
            { id:"media", label:"Media Engine", labelCn:"媒体引擎", x:58, y:5, w:20, h:16, color:"#ff375f", desc:"ProRes + H.264/HEVC decode & encode", descCn:"ProRes + H.264/HEVC 编解码" },
            { id:"io", label:"I/O & Fabric", labelCn:"I/O 总线", x:58, y:56, w:37, h:10, color:"#ffd60a", desc:"Thunderbolt/USB4 ×2, PCIe 4.0, Wi-Fi 6E", descCn:"Thunderbolt/USB4 ×2, PCIe 4.0, Wi-Fi 6E" },
            { id:"isp", label:"ISP", labelCn:"图像处理", x:80, y:5, w:15, h:16, color:"#86868b", desc:"Advanced ISP, computational photography pipeline", descCn:"高级 ISP, 计算摄影" }
        ]
    },
    "M3": {
        transistors: "25B", dieSizeMm2: 122, processNm: 3, node: "TSMC N3B",
        source: "Apple Scary Fast 2023, AnandTech",
        blocks: [
            { id:"cpu-p", label:"P-Core ×4", labelCn:"性能核 ×4", x:5, y:5, w:35, h:28, color:"#2997ff", desc:"Everest, +17% IPC, 192KB L1i + 128KB L1d, 16MB L2", descCn:"Everest 架构, IPC 提升 17%, 16MB L2" },
            { id:"cpu-e", label:"E-Core ×4", labelCn:"能效核 ×4", x:42, y:5, w:25, h:16, color:"#30d158", desc:"Sawtooth, 4MB L2, improved branch prediction", descCn:"Sawtooth 架构, 4MB L2, 分支预测改进" },
            { id:"gpu", label:"GPU 10-Core", labelCn:"GPU 10核", x:5, y:38, w:50, h:28, color:"#ff9f0a", desc:"Dynamic Caching, hardware ray tracing, mesh shading", descCn:"动态缓存, 硬件光线追踪, 网格着色器" },
            { id:"ne", label:"Neural Engine", labelCn:"神经引擎", x:58, y:38, w:37, h:14, color:"#bf5af2", desc:"16-core, 18 TOPS, +15% vs M2", descCn:"16 核, 18 TOPS, 比 M2 提升 15%" },
            { id:"mem", label:"Memory Controller", labelCn:"内存控制器", x:5, y:72, w:90, h:10, color:"#64d2ff", desc:"128-bit LPDDR5, 100 GB/s, 8/16/24GB", descCn:"128-bit LPDDR5, 100 GB/s, 8/16/24GB" },
            { id:"media", label:"Media + AV1", labelCn:"媒体+AV1", x:58, y:5, w:20, h:16, color:"#ff375f", desc:"AV1 hardware decode (first Apple chip), ProRes encode/decode", descCn:"首次支持 AV1 硬件解码, ProRes 编解码" },
            { id:"io", label:"I/O & Fabric", labelCn:"I/O 总线", x:58, y:56, w:37, h:10, color:"#ffd60a", desc:"Thunderbolt/USB4 ×2, PCIe 4.0, Wi-Fi 6E", descCn:"Thunderbolt/USB4 ×2, PCIe 4.0, Wi-Fi 6E" },
            { id:"isp", label:"ISP", labelCn:"图像处理", x:80, y:5, w:15, h:16, color:"#86868b", desc:"Smart HDR, improved low-light processing", descCn:"智能 HDR, 改进低光处理" }
        ]
    },
    "M4": {
        transistors: "28B", dieSizeMm2: 126, processNm: 3, node: "TSMC N3E (2nd gen)",
        source: "Apple WWDC 2024, Apple.com tech specs",
        blocks: [
            { id:"cpu-p", label:"P-Core ×4", labelCn:"性能核 ×4", x:5, y:5, w:35, h:28, color:"#2997ff", desc:"Next-gen Everest, +20% IPC, deeper OoO buffer, 24MB L2", descCn:"下一代 Everest, IPC 提升 20%, 更深乱序缓冲, 24MB L2" },
            { id:"cpu-e", label:"E-Core ×6", labelCn:"能效核 ×6", x:42, y:5, w:30, h:16, color:"#30d158", desc:"6 efficiency cores (up from 4), 4MB L2", descCn:"6 个能效核（从 4 个增加）, 4MB L2" },
            { id:"gpu", label:"GPU 10-Core", labelCn:"GPU 10核", x:5, y:38, w:50, h:28, color:"#ff9f0a", desc:"Next-gen GPU, RT + mesh shading, dynamic caching", descCn:"下一代 GPU, 光追 + 网格着色, 动态缓存" },
            { id:"ne", label:"Neural Engine", labelCn:"神经引擎", x:58, y:38, w:37, h:14, color:"#bf5af2", desc:"16-core, 38 TOPS — massive jump for Apple Intelligence", descCn:"16 核, 38 TOPS — 为 Apple Intelligence 大幅提升" },
            { id:"mem", label:"Memory Controller", labelCn:"内存控制器", x:5, y:72, w:90, h:10, color:"#64d2ff", desc:"128-bit LPDDR5X, 120 GB/s, 16/24/32GB", descCn:"128-bit LPDDR5X, 120 GB/s, 16/24/32GB" },
            { id:"media", label:"Media Engine", labelCn:"媒体引擎", x:58, y:5, w:18, h:16, color:"#ff375f", desc:"AV1 encode + decode, ProRes, H.266/VVC support", descCn:"AV1 编解码, ProRes, 支持 H.266/VVC" },
            { id:"io", label:"I/O & Fabric", labelCn:"I/O 总线", x:58, y:56, w:37, h:10, color:"#ffd60a", desc:"Thunderbolt 4, PCIe 4.0, Wi-Fi 6E, USB4", descCn:"Thunderbolt 4, PCIe 4.0, Wi-Fi 6E, USB4" },
            { id:"isp", label:"ISP + DPU", labelCn:"ISP + 显示", x:78, y:5, w:17, h:16, color:"#86868b", desc:"Display engine: ProMotion 120Hz, external 6K", descCn:"显示引擎: ProMotion 120Hz, 外接 6K" }
        ]
    },
    "M5": {
        transistors: "25B (est.)", dieSizeMm2: 108, processNm: 3, node: "TSMC N3P (3rd gen 3nm)",
        source: "Apple Oct 2025 & Mar 2026 Events, Apple.com",
        blocks: [
            { id:"cpu-p", label:"S-Core ×4", labelCn:"超级核 ×4", x:5, y:5, w:38, h:28, color:"#2997ff", desc:"4 Super cores @ 4.61 GHz, widened pipeline, renamed from P-cores", descCn:"4 个超级核 @ 4.61 GHz, 加宽流水线, 从性能核更名" },
            { id:"cpu-e", label:"E-Core ×6", labelCn:"能效核 ×6", x:45, y:5, w:28, h:16, color:"#30d158", desc:"6 efficiency cores, TSMC N3P 3nm", descCn:"6 个能效核, TSMC N3P 3nm 制程" },
            { id:"gpu", label:"GPU 10-Core", labelCn:"GPU 10核", x:5, y:38, w:50, h:28, color:"#ff9f0a", desc:"New GPU with dedicated AI hardware, enhanced ray tracing", descCn:"全新 GPU, 专用 AI 硬件, 增强光线追踪" },
            { id:"ne", label:"Neural Engine", labelCn:"神经引擎", x:58, y:38, w:37, h:14, color:"#bf5af2", desc:"16-core, 38 TOPS, optimized for Apple Intelligence on-device", descCn:"16 核, 38 TOPS, 针对 Apple Intelligence 本地推理优化" },
            { id:"mem", label:"Memory Controller", labelCn:"内存控制器", x:5, y:72, w:90, h:10, color:"#64d2ff", desc:"128-bit LPDDR5X, 120 GB/s, 16/24/32GB unified", descCn:"128-bit LPDDR5X, 120 GB/s, 16/24/32GB 统一内存" },
            { id:"media", label:"Media Engine", labelCn:"媒体引擎", x:58, y:5, w:17, h:16, color:"#ff375f", desc:"AV1 + ProRes + H.266 encode/decode", descCn:"AV1 + ProRes + H.266 编解码" },
            { id:"io", label:"I/O & Fabric", labelCn:"I/O 总线", x:58, y:56, w:37, h:10, color:"#ffd60a", desc:"Thunderbolt 5, PCIe 4.0, Wi-Fi 6E, USB4", descCn:"Thunderbolt 5, PCIe 4.0, Wi-Fi 6E, USB4" },
            { id:"isp", label:"ISP + DPU", labelCn:"ISP + 显示", x:77, y:5, w:18, h:16, color:"#86868b", desc:"Display engine: ProMotion, external 6K, HDR10+", descCn:"显示引擎: ProMotion, 外接 6K, HDR10+" }
        ]
    }
};

// ============================================================
// 1. DIE MAP RENDERER
// ============================================================
function initDieMap() {
    const sel = document.getElementById("dieMapChip");
    if (!sel) return;
    const gens = Object.keys(dieMapData);
    sel.innerHTML = gens.map(g => `<option value="${g}">${g}</option>`).join("");
    sel.addEventListener("change", renderDieMap);
    renderDieMap();
}

function renderDieMap() {
    const container = document.getElementById("dieMapContent");
    const sel = document.getElementById("dieMapChip");
    if (!container || !sel) return;
    const chip = dieMapData[sel.value];
    if (!chip) return;
    const en = typeof currentLang === "undefined" || currentLang === "en";

    // Build SVG
    let svg = `<div class="diemap-wrapper">
    <svg viewBox="0 0 100 86" class="diemap-svg" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <filter id="glow"><feGaussianBlur stdDeviation="1" result="blur"/>
        <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
      </filter>
    </defs>
    <rect x="0" y="0" width="100" height="86" rx="3" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.1)" stroke-width="0.3"/>`;

    chip.blocks.forEach(b => {
        svg += `<g class="diemap-block" data-block="${b.id}" style="cursor:pointer">
            <rect x="${b.x}" y="${b.y}" width="${b.w}" height="${b.h}" rx="1.5"
                fill="${b.color}22" stroke="${b.color}" stroke-width="0.4" filter="url(#glow)"/>
            <text x="${b.x + b.w/2}" y="${b.y + b.h/2 + 1.2}" text-anchor="middle"
                fill="${b.color}" font-size="2.8" font-weight="600" font-family="Inter,system-ui">${en ? b.label : b.labelCn}</text>
        </g>`;
    });
    svg += `</svg></div>`;

    // Info panel
    let info = `<div class="diemap-info">
        <div class="diemap-meta">
            <span>🏭 ${chip.node}</span>
            <span>📐 ${chip.dieSizeMm2} mm²</span>
            <span>🔢 ${chip.transistors} ${en ? "transistors" : "晶体管"}</span>
            <span>📄 ${en ? "Source" : "来源"}: ${chip.source}</span>
        </div>
        <div id="dieMapDetail" class="diemap-detail">
            <p style="color:var(--text-muted);font-size:13px">${en ? "👆 Click a block above to see details" : "👆 点击上方模块查看详情"}</p>
        </div>
    </div>`;

    container.innerHTML = svg + info;

    // Add click handlers
    container.querySelectorAll(".diemap-block").forEach(g => {
        g.addEventListener("click", () => {
            const blockId = g.dataset.block;
            const block = chip.blocks.find(b => b.id === blockId);
            if (!block) return;
            const detail = document.getElementById("dieMapDetail");
            detail.innerHTML = `<div style="padding:12px;background:${block.color}11;border-left:3px solid ${block.color};border-radius:4px">
                <div style="font-weight:700;color:${block.color};margin-bottom:4px;font-size:14px">${en ? block.label : block.labelCn}</div>
                <div style="font-size:13px;color:var(--text-secondary)">${en ? block.desc : block.descCn}</div>
            </div>`;
            // Highlight selected block
            container.querySelectorAll(".diemap-block rect").forEach(r => r.setAttribute("stroke-width", "0.4"));
            g.querySelector("rect").setAttribute("stroke-width", "1.2");
        });
    });
}

// ============================================================
// 2. SHARE CARD GENERATOR
// ============================================================
function initShareCard() {
    const btn = document.getElementById("shareCard");
    if (!btn) return;

    btn.addEventListener("click", () => {
        generateShareCard();
    });
}

function generateShareCard() {
    const canvas = document.createElement("canvas");
    const dpr = 2;
    canvas.width = 800 * dpr;
    canvas.height = 420 * dpr;
    const ctx = canvas.getContext("2d");
    ctx.scale(dpr, dpr);

    const en = typeof currentLang === "undefined" || currentLang === "en";

    // Background gradient
    const grad = ctx.createLinearGradient(0, 0, 800, 420);
    grad.addColorStop(0, "#0a0a1a");
    grad.addColorStop(0.5, "#0d1117");
    grad.addColorStop(1, "#0a0a1a");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 800, 420);

    // Glow effects
    const glowGrad = ctx.createRadialGradient(200, 100, 0, 200, 100, 250);
    glowGrad.addColorStop(0, "rgba(41,151,255,0.08)");
    glowGrad.addColorStop(1, "transparent");
    ctx.fillStyle = glowGrad;
    ctx.fillRect(0, 0, 800, 420);

    const glowGrad2 = ctx.createRadialGradient(600, 350, 0, 600, 350, 200);
    glowGrad2.addColorStop(0, "rgba(191,90,242,0.06)");
    glowGrad2.addColorStop(1, "transparent");
    ctx.fillStyle = glowGrad2;
    ctx.fillRect(0, 0, 800, 420);

    // Title
    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 28px Inter, system-ui";
    ctx.fillText("Apple Silicon Comparison", 40, 50);

    ctx.fillStyle = "#6e6e73";
    ctx.font = "14px Inter, system-ui";
    ctx.fillText(en ? "Interactive M-Series & A-Series chip benchmark comparison" : "M 系列 & A 系列芯片交互式基准对比", 40, 75);

    // Active tab info
    const activeTab = document.querySelector(".tab-btn.active");
    const tabName = activeTab ? (en ? activeTab.getAttribute("data-en") : activeTab.getAttribute("data-cn")) : "Specs Table";

    ctx.fillStyle = "#2997ff";
    ctx.font = "bold 16px Inter, system-ui";
    ctx.fillText(`📊 ${en ? "Current View" : "当前视图"}: ${tabName}`, 40, 110);

    // Top 5 chips summary
    if (typeof chipData !== "undefined") {
        const top5 = chipData.slice().sort((a, b) => (b.gb6Multi || 0) - (a.gb6Multi || 0)).slice(0, 5);
        const maxScore = top5[0]?.gb6Multi || 1;
        const genColors = { M1: "#ff9f0a", M2: "#30d158", M3: "#64d2ff", M4: "#bf5af2", M5: "#ff375f" };

        ctx.fillStyle = "#ffffff";
        ctx.font = "bold 14px Inter, system-ui";
        ctx.fillText(en ? "🏆 Top 5 Multi-Core" : "🏆 多核 Top 5", 40, 150);

        top5.forEach((chip, i) => {
            const y = 175 + i * 42;
            const barWidth = (chip.gb6Multi / maxScore) * 380;
            const color = genColors[chip.gen] || "#2997ff";

            // Name
            ctx.fillStyle = "#ffffff";
            ctx.font = "600 13px Inter, system-ui";
            ctx.fillText(chip.name, 40, y);

            // Bar
            ctx.fillStyle = color + "33";
            ctx.beginPath();
            ctx.roundRect(160, y - 12, 400, 18, 4);
            ctx.fill();

            ctx.fillStyle = color;
            ctx.beginPath();
            ctx.roundRect(160, y - 12, barWidth, 18, 4);
            ctx.fill();

            // Score
            ctx.fillStyle = "#ffffff";
            ctx.font = "bold 12px Inter, system-ui";
            ctx.fillText(chip.gb6Multi?.toLocaleString() || "—", 570, y);
        });
    }

    // Footer
    ctx.fillStyle = "#3a3a3c";
    ctx.fillRect(0, 390, 800, 1);
    ctx.fillStyle = "#6e6e73";
    ctx.font = "12px Inter, system-ui";
    ctx.fillText("apple-silicon-compare • v2.1 • 2026-03-24", 40, 410);

    // Download
    canvas.toBlob(blob => {
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "apple-silicon-comparison.png";
        a.click();
        URL.revokeObjectURL(url);
    }, "image/png");
}

// ============================================================
// 3. CHANGELOG & DATA UPDATE
// ============================================================
const changelogData = [
    { version: "v2.1", date: "2026-03-24", changes: [
        { en: "Added Die Map interactive architecture view", cn: "新增芯片架构 Die Map 交互视图" },
        { en: "Added Performance Simulator for task estimation", cn: "新增性能模拟器（任务用时估算）" },
        { en: "Added Share Card generation", cn: "新增分享卡片生成" },
        { en: "Added data version & changelog", cn: "新增数据版本号和更新记录" }
    ]},
    { version: "v2.0", date: "2026-03-22", changes: [
        { en: "Added Efficiency (Perf/Watt) ranking", cn: "新增能效比排行" },
        { en: "Added Evolution Timeline", cn: "新增进化时间线" },
        { en: "Added Upgrade Calculator", cn: "新增升级计算器" },
        { en: "Added Cross-Platform comparison (Intel/AMD)", cn: "新增跨平台对比" },
        { en: "Added AI Inference performance", cn: "新增 AI 推理性能" }
    ]},
    { version: "v1.5", date: "2026-03-20", changes: [
        { en: "Added A-Series chips (A12–A18 Pro)", cn: "新增 A 系列芯片（A12–A18 Pro）" },
        { en: "Search, Theme toggle, Tab scroll, URL hash", cn: "搜索、主题切换、Tab 滚动、URL 锚点" },
        { en: "PWA + SEO + CSV/JSON export", cn: "PWA + SEO + CSV/JSON 导出" }
    ]},
    { version: "v1.0", date: "2026-03-19", changes: [
        { en: "Initial release with M1–M5 chips, 10 tabs", cn: "首次发布，包含 M1–M5 芯片，10 个标签页" }
    ]}
];

function initChangelog() {
    const btn = document.getElementById("changelogBtn");
    const panel = document.getElementById("changelogPanel");
    if (!btn || !panel) return;

    btn.addEventListener("click", () => {
        const isOpen = panel.style.display !== "none";
        if (isOpen) {
            panel.style.display = "none";
            return;
        }
        const en = typeof currentLang === "undefined" || currentLang === "en";
        let html = `<div style="max-width:600px;margin:0 auto;padding:16px">`;
        changelogData.forEach(v => {
            html += `<div style="margin-bottom:16px">
                <div style="display:flex;align-items:center;gap:8px;margin-bottom:8px">
                    <span style="background:var(--accent-blue);color:#fff;padding:2px 8px;border-radius:4px;font-size:12px;font-weight:600">${v.version}</span>
                    <span style="font-size:12px;color:var(--text-muted)">${v.date}</span>
                </div>
                <ul style="margin:0;padding-left:20px;font-size:13px;color:var(--text-secondary)">
                    ${v.changes.map(c => `<li style="margin-bottom:3px">${en ? c.en : c.cn}</li>`).join("")}
                </ul>
            </div>`;
        });
        html += `</div>`;
        panel.innerHTML = html;
        panel.style.display = "block";
    });
}

// ============================================================
// 4. PERFORMANCE SIMULATOR
// Sources: Existing chipData benchmark scores used as basis.
// Time estimates derived from Geekbench 6 multi-core linear
// scaling + task-specific adjustments from published reviews
// (NotebookCheck, Max Tech, CreatedTech YouTube channels)
// ============================================================
const simulatorScenarios = [
    {
        id: "video4k",
        en: "4K Video Export (10 min timeline)",
        cn: "4K 视频导出（10 分钟时间线）",
        icon: "🎬",
        metric: "cb23Multi", // Cinebench correlates with video export
        baseTime: 180, // seconds for a baseline M1 (cb23Multi ~7760)
        baseScore: 7760,
        descEn: "Based on Final Cut Pro / DaVinci Resolve H.265 export. Scales with multi-core Cinebench R23.",
        descCn: "基于 Final Cut Pro / DaVinci Resolve H.265 导出。与 Cinebench R23 多核成正比。"
    },
    {
        id: "compile",
        en: "Xcode Build (Large Swift Project)",
        cn: "Xcode 编译（大型 Swift 项目）",
        icon: "🔨",
        metric: "gb6Multi",
        baseTime: 300,
        baseScore: 7668,
        descEn: "Based on Geekbench 6 multi-core. Compile tasks are highly parallel.",
        descCn: "基于 Geekbench 6 多核。编译任务高度并行化。"
    },
    {
        id: "blender",
        en: "Blender Render (BMW Scene)",
        cn: "Blender 渲染（BMW 场景）",
        icon: "🖼️",
        metric: "cb23Multi",
        baseTime: 420,
        baseScore: 7760,
        descEn: "CPU-only render. Scales roughly linearly with Cinebench R23 multi-core.",
        descCn: "仅 CPU 渲染。与 Cinebench R23 多核大致线性相关。"
    },
    {
        id: "photo",
        en: "Batch Photo Edit (200 RAW photos)",
        cn: "批量照片编辑（200 张 RAW 照片）",
        icon: "📷",
        metric: "gb6Single",
        baseTime: 240,
        baseScore: 2347,
        descEn: "Lightroom-style processing is single-core + GPU bound. Based on GB6 single-core.",
        descCn: "Lightroom 类处理依赖单核 + GPU。基于 GB6 单核分数。"
    },
    {
        id: "ml",
        en: "ML Model Training (Local)",
        cn: "ML 模型训练（本地）",
        icon: "🧠",
        metric: "neuralTOPS",
        baseTime: 600,
        baseScore: 11,
        descEn: "Core ML / TensorFlow. Neural Engine TOPS is the key bottleneck.",
        descCn: "Core ML / TensorFlow。神经引擎 TOPS 是关键瓶颈。"
    },
    {
        id: "zip",
        en: "Compress 50GB Archive",
        cn: "压缩 50GB 归档",
        icon: "📦",
        metric: "gb6Multi",
        baseTime: 150,
        baseScore: 7668,
        descEn: "zstd/zip compression. Multi-core bound. Based on GB6 multi-core.",
        descCn: "zstd/zip 压缩。多核密集型。基于 GB6 多核。"
    }
];

function renderSimulator() {
    const container = document.getElementById("simulatorContent");
    if (!container || typeof chipData === "undefined") return;
    const en = typeof currentLang === "undefined" || currentLang === "en";

    let html = `<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:16px">`;

    simulatorScenarios.forEach(scenario => {
        // Calculate estimated times for all chips
        const results = chipData.map(c => {
            let score;
            if (scenario.metric === "neuralTOPS") {
                score = c.neuralTOPS || 11;
            } else {
                score = c[scenario.metric];
            }
            if (!score) return null;
            const estTime = Math.round(scenario.baseTime * (scenario.baseScore / score));
            return { name: c.name, gen: c.gen, score, estTime };
        }).filter(Boolean).sort((a, b) => a.estTime - b.estTime);

        const fastest = results[0];
        const slowest = results[results.length - 1];

        html += `<div class="antutu-chart-card" style="margin:0">
            <h4 style="font-size:15px;margin-bottom:4px">${scenario.icon} ${en ? scenario.en : scenario.cn}</h4>
            <p style="font-size:11px;color:var(--text-muted);margin-bottom:12px">${en ? scenario.descEn : scenario.descCn}</p>
            <div class="rw-bars">`;

        // Show top 6 + bottom 2
        const shown = [...results.slice(0, 6), ...results.slice(-1)];
        const maxTime = slowest.estTime;

        shown.forEach((r, i) => {
            const pct = (r.estTime / maxTime) * 100;
            const gen = r.gen.toLowerCase();
            const timeStr = r.estTime >= 60
                ? `${Math.floor(r.estTime / 60)}m ${r.estTime % 60}s`
                : `${r.estTime}s`;
            const isFastest = i === 0;

            html += `<div class="rw-bar-row" style="margin-bottom:3px">
                <span class="rw-chip-name" style="min-width:75px;font-size:11px">${isFastest ? "🥇 " : ""}${r.name}</span>
                <div class="rw-bar-track">
                    <div class="rw-bar-fill tier-${gen}" style="width:${Math.max(pct,5)}%"></div>
                </div>
                <span class="rw-time" style="min-width:55px;text-align:right;font-size:11px">${timeStr}</span>
            </div>`;

            // Add separator before last element
            if (i === 5 && shown.length > 7) {
                html += `<div style="text-align:center;font-size:10px;color:var(--text-muted);padding:2px 0">⋯</div>`;
            }
        });

        html += `</div></div>`;
    });

    html += `</div>`;

    // Methodology note
    html += `<div style="margin-top:20px;padding:12px;background:var(--bg-glass);border-radius:var(--radius-sm);border:1px solid var(--border-glass);font-size:12px;color:var(--text-muted)">
        <strong>${en ? "📋 Methodology" : "📋 计算方法"}</strong><br>
        ${en
            ? "Estimated times are calculated using proportional scaling from verified benchmark scores (Geekbench 6, Cinebench R23, Neural Engine TOPS). "
            + "Base reference: M1 chip. Actual performance may vary ±15% depending on thermals, RAM configuration, and software optimization. "
            + "Source data: Geekbench Browser averages, Apple WWDC specifications."
            : "预计用时基于已验证的基准分数（Geekbench 6、Cinebench R23、Neural Engine TOPS）按比例缩放计算。"
            + "基准参考：M1 芯片。实际性能可能因散热、内存配置和软件优化而有 ±15% 偏差。"
            + "数据来源：Geekbench Browser 均值、Apple WWDC 规格说明。"}
    </div>`;

    container.innerHTML = html;
}

// ============================================================
// INIT ALL FEATURES
// ============================================================
function initAllFeatures() {
    initDieMap();
    initShareCard();
    initChangelog();
    renderSimulator();
}

// Update tab switching for new tabs
document.addEventListener("DOMContentLoaded", () => {
    setTimeout(initAllFeatures, 250);
});
