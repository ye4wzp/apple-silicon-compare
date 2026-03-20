/* ============================================
   Apple Silicon — Extra Features (v3)
   VS Compare, Power/Battery, Devices,
   Real-World Tasks, Thermal
   ============================================ */

// ============================================================
// EXTENDED DATA — Power, Battery, Devices, Thermal, Real Tasks
// ============================================================
const extendedData = {
    // TDP (watts), battery life (hours video playback), cooling, devices
    "M1": {
        tdpCPU: 10, tdpGPU: 8, tdpTotal: 20, tdpAirSustained: 10,
        batteryAirVideo: 18, batteryAirWeb: 15, batteryProVideo: 20, batteryProWeb: 17,
        coolingAir: "fanless", coolingPro: "fan",
        throttleAirPct: 20, throttleProPct: 0,
        thermal_en: "Fanless in Air: throttles ~20% after 10min heavy load. Pro with fan: no throttling.",
        thermal_cn: "Air 无风扇：重负载10分钟后降频约20%。Pro 有风扇：不降频。",
        devices_list: [
            { name_en: "MacBook Air 13\"", name_cn: "MacBook Air 13\"", year: 2020, priceUSD: 999 },
            { name_en: "MacBook Pro 13\"", name_cn: "MacBook Pro 13\"", year: 2020, priceUSD: 1299 },
            { name_en: "Mac mini", name_cn: "Mac mini", year: 2020, priceUSD: 699 },
            { name_en: "iMac 24\"", name_cn: "iMac 24\"", year: 2021, priceUSD: 1299 },
            { name_en: "iPad Pro 11\"/12.9\"", name_cn: "iPad Pro 11\"/12.9\"", year: 2021, priceUSD: 799 },
            { name_en: "iPad Air", name_cn: "iPad Air", year: 2022, priceUSD: 599 }
        ]
    },
    "M1 Pro": {
        tdpCPU: 30, tdpGPU: 20, tdpTotal: 40, tdpAirSustained: null,
        batteryAirVideo: null, batteryAirWeb: null, batteryProVideo: 21, batteryProWeb: 17,
        coolingAir: null, coolingPro: "fan",
        throttleAirPct: null, throttleProPct: 0,
        thermal_en: "Only in MacBook Pro with active cooling. No throttling under normal workloads.",
        thermal_cn: "仅搭载于 MacBook Pro（有风扇）。正常工作负载下不降频。",
        devices_list: [
            { name_en: "MacBook Pro 14\"", name_cn: "MacBook Pro 14\"", year: 2021, priceUSD: 1999 },
            { name_en: "MacBook Pro 16\"", name_cn: "MacBook Pro 16\"", year: 2021, priceUSD: 2499 }
        ]
    },
    "M1 Max": {
        tdpCPU: 30, tdpGPU: 40, tdpTotal: 60, tdpAirSustained: null,
        batteryAirVideo: null, batteryAirWeb: null, batteryProVideo: 21, batteryProWeb: 14,
        coolingAir: null, coolingPro: "fan",
        throttleAirPct: null, throttleProPct: 0,
        thermal_en: "Actively cooled. Sustained heavy loads handled without throttling.",
        thermal_cn: "主动散热。长时间重负载无降频。",
        devices_list: [
            { name_en: "MacBook Pro 14\"/16\"", name_cn: "MacBook Pro 14\"/16\"", year: 2021, priceUSD: 2499 },
            { name_en: "Mac Studio", name_cn: "Mac Studio", year: 2022, priceUSD: 1999 }
        ]
    },
    "M1 Ultra": {
        tdpCPU: 60, tdpGPU: 80, tdpTotal: 120, tdpAirSustained: null,
        batteryAirVideo: null, batteryAirWeb: null, batteryProVideo: null, batteryProWeb: null,
        coolingAir: null, coolingPro: "fan+heatsink",
        throttleAirPct: null, throttleProPct: 0,
        thermal_en: "Desktop-class cooling in Mac Studio/Pro. No throttling.",
        thermal_cn: "Mac Studio/Pro 桌面级散热。无降频。",
        devices_list: [
            { name_en: "Mac Studio", name_cn: "Mac Studio", year: 2022, priceUSD: 3999 },
            { name_en: "Mac Pro", name_cn: "Mac Pro", year: 2023, priceUSD: 6999 }
        ]
    },
    "M2": {
        tdpCPU: 12, tdpGPU: 8, tdpTotal: 22, tdpAirSustained: 12,
        batteryAirVideo: 18, batteryAirWeb: 15, batteryProVideo: 20, batteryProWeb: 17,
        coolingAir: "fanless", coolingPro: "fan",
        throttleAirPct: 25, throttleProPct: 0,
        thermal_en: "Air: throttles ~25% (worse than M1 Air due to higher heat). Pro: no throttling.",
        thermal_cn: "Air：降频约25%（比M1 Air更热）。Pro：不降频。",
        devices_list: [
            { name_en: "MacBook Air 13\"", name_cn: "MacBook Air 13\"", year: 2022, priceUSD: 1099 },
            { name_en: "MacBook Air 15\"", name_cn: "MacBook Air 15\"", year: 2023, priceUSD: 1299 },
            { name_en: "MacBook Pro 13\"", name_cn: "MacBook Pro 13\"", year: 2022, priceUSD: 1299 },
            { name_en: "Mac mini", name_cn: "Mac mini", year: 2023, priceUSD: 599 },
            { name_en: "iPad Pro 11\"/12.9\"", name_cn: "iPad Pro 11\"/12.9\"", year: 2022, priceUSD: 799 }
        ]
    },
    "M2 Pro": {
        tdpCPU: 30, tdpGPU: 22, tdpTotal: 45, tdpAirSustained: null,
        batteryAirVideo: null, batteryAirWeb: null, batteryProVideo: 22, batteryProWeb: 18,
        coolingAir: null, coolingPro: "fan",
        throttleAirPct: null, throttleProPct: 0,
        thermal_en: "Active cooling only. Sustained loads handled well.",
        thermal_cn: "仅主动散热。持续负载表现良好。",
        devices_list: [
            { name_en: "MacBook Pro 14\"/16\"", name_cn: "MacBook Pro 14\"/16\"", year: 2023, priceUSD: 1999 },
            { name_en: "Mac mini", name_cn: "Mac mini", year: 2023, priceUSD: 1299 },
            { name_en: "Mac Studio", name_cn: "Mac Studio", year: 2023, priceUSD: 1999 }
        ]
    },
    "M2 Max": {
        tdpCPU: 30, tdpGPU: 45, tdpTotal: 65, tdpAirSustained: null,
        batteryAirVideo: null, batteryAirWeb: null, batteryProVideo: 22, batteryProWeb: 15,
        coolingAir: null, coolingPro: "fan",
        throttleAirPct: null, throttleProPct: 0,
        thermal_en: "Active cooling. High sustained GPU performance.",
        thermal_cn: "主动散热。GPU 持续性能出色。",
        devices_list: [
            { name_en: "MacBook Pro 14\"/16\"", name_cn: "MacBook Pro 14\"/16\"", year: 2023, priceUSD: 2499 },
            { name_en: "Mac Studio", name_cn: "Mac Studio", year: 2023, priceUSD: 1999 }
        ]
    },
    "M2 Ultra": {
        tdpCPU: 60, tdpGPU: 85, tdpTotal: 130, tdpAirSustained: null,
        batteryAirVideo: null, batteryAirWeb: null, batteryProVideo: null, batteryProWeb: null,
        coolingAir: null, coolingPro: "fan+heatsink",
        throttleAirPct: null, throttleProPct: 0,
        thermal_en: "Desktop-class. No throttling under any workload.",
        thermal_cn: "桌面级散热。任何工作负载下均不降频。",
        devices_list: [
            { name_en: "Mac Studio", name_cn: "Mac Studio", year: 2023, priceUSD: 3999 },
            { name_en: "Mac Pro", name_cn: "Mac Pro", year: 2023, priceUSD: 6999 }
        ]
    },
    "M3": {
        tdpCPU: 11, tdpGPU: 9, tdpTotal: 22, tdpAirSustained: 12,
        batteryAirVideo: 18, batteryAirWeb: 15, batteryProVideo: 22, batteryProWeb: 17,
        coolingAir: "fanless", coolingPro: "fan",
        throttleAirPct: 18, throttleProPct: 0,
        thermal_en: "3nm improves efficiency. Air: ~18% throttle. Pro: full sustained performance.",
        thermal_cn: "3nm 提升能效。Air：降频约18%。Pro：完全持续性能。",
        devices_list: [
            { name_en: "MacBook Air 13\"/15\"", name_cn: "MacBook Air 13\"/15\"", year: 2024, priceUSD: 1099 },
            { name_en: "MacBook Pro 14\"", name_cn: "MacBook Pro 14\"", year: 2023, priceUSD: 1599 },
            { name_en: "iMac 24\"", name_cn: "iMac 24\"", year: 2023, priceUSD: 1299 }
        ]
    },
    "M3 Pro": {
        tdpCPU: 32, tdpGPU: 24, tdpTotal: 50, tdpAirSustained: null,
        batteryAirVideo: null, batteryAirWeb: null, batteryProVideo: 22, batteryProWeb: 18,
        coolingAir: null, coolingPro: "fan",
        throttleAirPct: null, throttleProPct: 0,
        thermal_en: "Active cooling. 14\" slightly warmer than 16\" under load.",
        thermal_cn: "主动散热。14\"比16\"在负载下稍暖。",
        devices_list: [
            { name_en: "MacBook Pro 14\"/16\"", name_cn: "MacBook Pro 14\"/16\"", year: 2023, priceUSD: 1999 }
        ]
    },
    "M3 Max": {
        tdpCPU: 32, tdpGPU: 50, tdpTotal: 70, tdpAirSustained: null,
        batteryAirVideo: null, batteryAirWeb: null, batteryProVideo: 22, batteryProWeb: 15,
        coolingAir: null, coolingPro: "fan",
        throttleAirPct: null, throttleProPct: 0,
        thermal_en: "16\" form factor manages heat well. 14\" may throttle slightly under extreme GPU load.",
        thermal_cn: "16\"散热良好。14\"在极端GPU负载下可能轻微降频。",
        devices_list: [
            { name_en: "MacBook Pro 14\"/16\"", name_cn: "MacBook Pro 14\"/16\"", year: 2023, priceUSD: 3199 }
        ]
    },
    "M3 Ultra": {
        tdpCPU: 64, tdpGPU: 100, tdpTotal: 140, tdpAirSustained: null,
        batteryAirVideo: null, batteryAirWeb: null, batteryProVideo: null, batteryProWeb: null,
        coolingAir: null, coolingPro: "fan+heatsink",
        throttleAirPct: null, throttleProPct: 0,
        thermal_en: "Massive desktop cooling. Zero throttling.",
        thermal_cn: "大型桌面散热系统。零降频。",
        devices_list: [
            { name_en: "Mac Studio", name_cn: "Mac Studio", year: 2025, priceUSD: 3999 },
            { name_en: "Mac Pro", name_cn: "Mac Pro", year: 2025, priceUSD: 6999 }
        ]
    },
    "M4": {
        tdpCPU: 13, tdpGPU: 9, tdpTotal: 24, tdpAirSustained: 14,
        batteryAirVideo: 18, batteryAirWeb: 15, batteryProVideo: 24, batteryProWeb: 16,
        coolingAir: "fanless", coolingPro: "fan",
        throttleAirPct: 15, throttleProPct: 0,
        thermal_en: "2nd-gen 3nm. Air: ~15% throttle (improved over M3). Pro: excellent sustained.",
        thermal_cn: "二代3nm。Air：降频约15%（优于M3）。Pro：持续性能优秀。",
        devices_list: [
            { name_en: "MacBook Air 13\"/15\"", name_cn: "MacBook Air 13\"/15\"", year: 2025, priceUSD: 1099 },
            { name_en: "MacBook Pro 14\"", name_cn: "MacBook Pro 14\"", year: 2024, priceUSD: 1599 },
            { name_en: "iMac 24\"", name_cn: "iMac 24\"", year: 2024, priceUSD: 1299 },
            { name_en: "Mac mini", name_cn: "Mac mini", year: 2024, priceUSD: 599 },
            { name_en: "iPad Pro 11\"/13\"", name_cn: "iPad Pro 11\"/13\"", year: 2024, priceUSD: 999 }
        ]
    },
    "M4 Pro": {
        tdpCPU: 35, tdpGPU: 25, tdpTotal: 55, tdpAirSustained: null,
        batteryAirVideo: null, batteryAirWeb: null, batteryProVideo: 24, batteryProWeb: 16,
        coolingAir: null, coolingPro: "fan",
        throttleAirPct: null, throttleProPct: 0,
        thermal_en: "Active cooling. Maintains peak performance under sustained loads.",
        thermal_cn: "主动散热。持续负载下保持峰值性能。",
        devices_list: [
            { name_en: "MacBook Pro 14\"/16\"", name_cn: "MacBook Pro 14\"/16\"", year: 2024, priceUSD: 1999 },
            { name_en: "Mac mini", name_cn: "Mac mini", year: 2024, priceUSD: 1399 }
        ]
    },
    "M4 Max": {
        tdpCPU: 35, tdpGPU: 55, tdpTotal: 75, tdpAirSustained: null,
        batteryAirVideo: null, batteryAirWeb: null, batteryProVideo: 24, batteryProWeb: 15,
        coolingAir: null, coolingPro: "fan",
        throttleAirPct: null, throttleProPct: 2,
        thermal_en: "14\": may throttle 2% under extreme GPU load. 16\": virtually no throttling.",
        thermal_cn: "14\"：极端GPU负载下可能降频2%。16\"：几乎不降频。",
        devices_list: [
            { name_en: "MacBook Pro 14\"/16\"", name_cn: "MacBook Pro 14\"/16\"", year: 2024, priceUSD: 3199 }
        ]
    },
    "M5": {
        tdpCPU: 15, tdpGPU: 9, tdpTotal: 26, tdpAirSustained: 16,
        batteryAirVideo: 18, batteryAirWeb: 15, batteryProVideo: 24, batteryProWeb: 16,
        coolingAir: "fanless", coolingPro: "fan",
        throttleAirPct: 12, throttleProPct: 0,
        thermal_en: "Higher clocks draw slightly more power. Air: ~12% throttle. Pro: no throttling.",
        thermal_cn: "更高主频功耗略增。Air：降频约12%。Pro：不降频。",
        devices_list: [
            { name_en: "MacBook Pro 14\"", name_cn: "MacBook Pro 14\"", year: 2025, priceUSD: 1599 },
            { name_en: "MacBook Air 13\"/15\"", name_cn: "MacBook Air 13\"/15\"", year: 2025, priceUSD: 1199 },
            { name_en: "iPad Pro", name_cn: "iPad Pro", year: 2025, priceUSD: 1099 }
        ]
    },
    "M5 Pro": {
        tdpCPU: 40, tdpGPU: 28, tdpTotal: 60, tdpAirSustained: null,
        batteryAirVideo: null, batteryAirWeb: null, batteryProVideo: 24, batteryProWeb: 16,
        coolingAir: null, coolingPro: "fan",
        throttleAirPct: null, throttleProPct: 0,
        thermal_en: "Active cooling. 14\" ~45W sustained, 16\" ~55W sustained.",
        thermal_cn: "主动散热。14\"持续约45W，16\"持续约55W。",
        devices_list: [
            { name_en: "MacBook Pro 14\"/16\"", name_cn: "MacBook Pro 14\"/16\"", year: 2026, priceUSD: 1999 }
        ]
    },
    "M5 Max": {
        tdpCPU: 40, tdpGPU: 75, tdpTotal: 90, tdpAirSustained: null,
        batteryAirVideo: null, batteryAirWeb: null, batteryProVideo: 24, batteryProWeb: 14,
        coolingAir: null, coolingPro: "fan",
        throttleAirPct: null, throttleProPct: 3,
        thermal_en: "14\": throttles ~3% (64W limit). 16\": full 90W sustained.",
        thermal_cn: "14\"：降频约3%（限制64W）。16\"：90W全功率持续运行。",
        devices_list: [
            { name_en: "MacBook Pro 16\"", name_cn: "MacBook Pro 16\"", year: 2026, priceUSD: 3499 }
        ]
    }
};

// Real-world task completion times (seconds)
const realWorldTasks = [
    {
        task_en: "Export 10min 4K ProRes video (Final Cut Pro)",
        task_cn: "导出10分钟4K ProRes视频 (Final Cut Pro)",
        icon: "🎬",
        data: {
            "M1": 180, "M1 Pro": 95, "M1 Max": 85, "M1 Ultra": 55,
            "M2": 155, "M2 Pro": 80, "M2 Max": 70, "M2 Ultra": 45,
            "M3": 125, "M3 Pro": 65, "M3 Max": 50, "M3 Ultra": 32,
            "M4": 105, "M4 Pro": 52, "M4 Max": 38,
            "M5": 88, "M5 Pro": 42, "M5 Max": 30
        }
    },
    {
        task_en: "Stable Diffusion SDXL 1024×1024 (1 image)",
        task_cn: "Stable Diffusion SDXL 1024×1024 (1张图)",
        icon: "🎨",
        data: {
            "M1": null, "M1 Pro": 120, "M1 Max": 65, "M1 Ultra": 35,
            "M2": 90, "M2 Pro": 55, "M2 Max": 32, "M2 Ultra": 18,
            "M3": 60, "M3 Pro": 38, "M3 Max": 22, "M3 Ultra": 12,
            "M4": 45, "M4 Pro": 25, "M4 Max": 15,
            "M5": 30, "M5 Pro": 7.3, "M5 Max": 5
        }
    },
    {
        task_en: "Blender BMW scene render (Cycles)",
        task_cn: "Blender BMW场景渲染 (Cycles)",
        icon: "🧊",
        data: {
            "M1": 420, "M1 Pro": 210, "M1 Max": 120, "M1 Ultra": 65,
            "M2": 350, "M2 Pro": 175, "M2 Max": 95, "M2 Ultra": 50,
            "M3": 240, "M3 Pro": 130, "M3 Max": 55, "M3 Ultra": 28,
            "M4": 180, "M4 Pro": 85, "M4 Max": 42,
            "M5": 105, "M5 Pro": 40, "M5 Max": 4
        }
    },
    {
        task_en: "Xcode build large Swift project",
        task_cn: "Xcode 编译大型 Swift 项目",
        icon: "💻",
        data: {
            "M1": 180, "M1 Pro": 120, "M1 Max": 115, "M1 Ultra": 75,
            "M2": 155, "M2 Pro": 100, "M2 Max": 95, "M2 Ultra": 62,
            "M3": 120, "M3 Pro": 78, "M3 Max": 65, "M3 Ultra": 42,
            "M4": 95, "M4 Pro": 55, "M4 Max": 48,
            "M5": 80, "M5 Pro": 40, "M5 Max": 35
        }
    },
    {
        task_en: "Lightroom export 100 RAW photos",
        task_cn: "Lightroom 导出100张RAW照片",
        icon: "📸",
        data: {
            "M1": 150, "M1 Pro": 95, "M1 Max": 88, "M1 Ultra": 50,
            "M2": 125, "M2 Pro": 78, "M2 Max": 72, "M2 Ultra": 40,
            "M3": 98, "M3 Pro": 60, "M3 Max": 48, "M3 Ultra": 28,
            "M4": 75, "M4 Pro": 42, "M4 Max": 35,
            "M5": 60, "M5 Pro": 32, "M5 Max": 25
        }
    }
];

// ---- VS COMPARE (Radar Chart) ----
function initVS() {
    const selA = document.getElementById("vsChipA");
    const selB = document.getElementById("vsChipB");
    if (!selA) return;

    chipData.forEach((c, i) => {
        selA.innerHTML += `<option value="${i}" ${i === chipData.length - 1 ? 'selected' : ''}>${c.name}</option>`;
        selB.innerHTML += `<option value="${i}" ${i === chipData.length - 4 ? 'selected' : ''}>${c.name}</option>`;
    });

    const renderVS = () => {
        const a = chipData[selA.value], b = chipData[selB.value];
        renderRadar(a, b);
        renderVSDetail(a, b);
    };
    selA.addEventListener("change", renderVS);
    selB.addEventListener("change", renderVS);
    renderVS();
}

let radarChartInstance = null;
function renderRadar(a, b) {
    const canvas = document.getElementById("radarChart");
    if (!canvas) return;
    if (radarChartInstance) radarChartInstance.destroy();

    const dims = [
        { key: "gb6Single", label: currentLang === "en" ? "Single-Core" : "单核" },
        { key: "gb6Multi", label: currentLang === "en" ? "Multi-Core" : "多核" },
        { key: "gb6Metal", label: "GPU Metal" },
        { key: "memBandwidth", label: currentLang === "en" ? "Mem BW" : "内存带宽" },
        { key: "gpuCores", label: currentLang === "en" ? "GPU Cores" : "GPU核心" },
        { key: "cpuCores", label: currentLang === "en" ? "CPU Cores" : "CPU核心" }
    ];

    const maxVals = dims.map(d => Math.max(...chipData.map(c => c[d.key] || 0)));
    const normalize = (chip) => dims.map((d, i) => ((chip[d.key] || 0) / maxVals[i]) * 100);

    radarChartInstance = new Chart(canvas.getContext("2d"), {
        type: "radar",
        data: {
            labels: dims.map(d => d.label),
            datasets: [
                {
                    label: a.name, data: normalize(a),
                    backgroundColor: "rgba(41,151,255,0.2)", borderColor: "#2997ff",
                    borderWidth: 2, pointBackgroundColor: "#2997ff"
                },
                {
                    label: b.name, data: normalize(b),
                    backgroundColor: "rgba(255,55,95,0.2)", borderColor: "#ff375f",
                    borderWidth: 2, pointBackgroundColor: "#ff375f"
                }
            ]
        },
        options: {
            responsive: true, maintainAspectRatio: true,
            plugins: {
                legend: { labels: { color: "#a1a1a6", font: { family: "'Inter'", size: 13, weight: 600 } } }
            },
            scales: {
                r: {
                    grid: { color: "rgba(255,255,255,0.06)" },
                    angleLines: { color: "rgba(255,255,255,0.06)" },
                    pointLabels: { color: "#a1a1a6", font: { family: "'Inter'", size: 11 } },
                    ticks: { display: false }, suggestedMin: 0, suggestedMax: 100
                }
            }
        }
    });
}

function renderVSDetail(a, b) {
    const container = document.getElementById("vsDetailTable");
    if (!container) return;
    const keys = ["gb6Single", "gb6Multi", "gb6Metal", "cb23Multi", "gpuTFLOPS", "memBandwidth", "cpuCores", "gpuCores", "maxMemory", "processNm"];
    const labels = {
        gb6Single: ["GB6 Single", "GB6 单核"], gb6Multi: ["GB6 Multi", "GB6 多核"],
        gb6Metal: ["Metal", "Metal"], cb23Multi: ["CB23 Multi", "CB23 多核"],
        gpuTFLOPS: ["TFLOPS", "TFLOPS"], memBandwidth: ["BW GB/s", "带宽 GB/s"],
        cpuCores: ["CPU Cores", "CPU核心"], gpuCores: ["GPU Cores", "GPU核心"],
        maxMemory: ["Max RAM", "最大内存"], processNm: ["Process", "制程"]
    };

    let html = `<table class="vs-table"><thead><tr>
        <th>${currentLang === "en" ? "Metric" : "指标"}</th>
        <th style="color:#2997ff">${a.name}</th>
        <th style="color:#ff375f">${b.name}</th>
        <th>${currentLang === "en" ? "Diff" : "差异"}</th>
    </tr></thead><tbody>`;

    keys.forEach(k => {
        const va = a[k], vb = b[k];
        const label = currentLang === "en" ? labels[k][0] : labels[k][1];
        const fmtA = va != null ? (typeof va === "number" && va % 1 !== 0 ? va.toFixed(1) : va.toLocaleString()) : "—";
        const fmtB = vb != null ? (typeof vb === "number" && vb % 1 !== 0 ? vb.toFixed(1) : vb.toLocaleString()) : "—";
        let diff = "";
        if (va != null && vb != null && va !== 0) {
            const pct = ((vb - va) / va * 100).toFixed(0);
            const sign = pct > 0 ? "+" : "";
            const color = k === "processNm" ? (pct <= 0 ? "#30d158" : "#ff375f") : (pct >= 0 ? "#30d158" : "#ff375f");
            diff = `<span style="color:${color};font-weight:600">${sign}${pct}%</span>`;
        }
        html += `<tr><td>${label}</td><td>${fmtA}</td><td>${fmtB}</td><td>${diff}</td></tr>`;
    });
    html += "</tbody></table>";
    container.innerHTML = html;
}

// ---- POWER & BATTERY ----
function renderPower() {
    const container = document.getElementById("powerContent");
    if (!container) return;
    let html = `<div class="info-grid-section">`;
    chipData.forEach(chip => {
        const ext = extendedData[chip.name];
        if (!ext) return;
        const label = currentLang === "en";
        html += `<div class="info-card-sm gen-border-${chip.gen.toLowerCase()}">
            <h5>${chip.name} <span class="chip-badge badge-${chip.tier.toLowerCase()}">${chip.tier}</span></h5>
            <div class="info-row"><span>⚡ ${label ? "TDP (CPU/GPU/Total)" : "功耗 (CPU/GPU/总)"}</span><span>${ext.tdpCPU}W / ${ext.tdpGPU}W / ${ext.tdpTotal}W</span></div>
            ${ext.batteryAirVideo ? `<div class="info-row"><span>🔋 ${label ? "Air Battery (Video/Web)" : "Air 续航 (视频/网页)"}</span><span>${ext.batteryAirVideo}h / ${ext.batteryAirWeb}h</span></div>` : ""}
            ${ext.batteryProVideo ? `<div class="info-row"><span>🔋 ${label ? "Pro Battery (Video/Web)" : "Pro 续航 (视频/网页)"}</span><span>${ext.batteryProVideo}h / ${ext.batteryProWeb}h</span></div>` : ""}
            ${ext.tdpAirSustained ? `<div class="info-row"><span>📉 ${label ? "Air Sustained" : "Air 持续功耗"}</span><span>${ext.tdpAirSustained}W</span></div>` : ""}
        </div>`;
    });
    html += "</div>";
    container.innerHTML = html;
}

// ---- DEVICES ----
function renderDevices() {
    const container = document.getElementById("devicesContent");
    if (!container) return;
    const label = currentLang === "en";
    let html = `<div class="info-grid-section">`;
    chipData.forEach(chip => {
        const ext = extendedData[chip.name];
        if (!ext) return;
        html += `<div class="info-card-sm gen-border-${chip.gen.toLowerCase()}">
            <h5>${chip.name}</h5>
            <div class="device-list">
            ${ext.devices_list.map(d => `
                <div class="device-item">
                    <span class="device-name">${label ? d.name_en : d.name_cn}</span>
                    <span class="device-meta">${d.year} · $${d.priceUSD.toLocaleString()}+</span>
                </div>
            `).join("")}
            </div>
        </div>`;
    });
    html += "</div>";
    container.innerHTML = html;
}

// ---- REAL WORLD TASKS ----
function renderRealWorld() {
    const container = document.getElementById("realworldContent");
    if (!container) return;
    const label = currentLang === "en";
    let html = "";

    realWorldTasks.forEach(task => {
        const pairs = Object.entries(task.data)
            .filter(([, v]) => v != null)
            .sort((a, b) => a[1] - b[1]);
        const maxTime = pairs[pairs.length - 1]?.[1] || 1;

        html += `<div class="rw-task-card">
            <h5>${task.icon} ${label ? task.task_en : task.task_cn}</h5>
            <div class="rw-bars">`;
        pairs.forEach(([name, time]) => {
            const chip = chipData.find(c => c.name === name);
            const gen = chip ? chip.gen.toLowerCase() : "m1";
            const pct = (time / maxTime) * 100;
            const timeStr = time >= 60 ? `${Math.floor(time / 60)}m ${(time % 60).toFixed(0)}s` : `${time}s`;
            html += `
                <div class="rw-bar-row">
                    <span class="rw-chip-name">${name}</span>
                    <div class="rw-bar-track">
                        <div class="rw-bar-fill tier-${gen}" style="width:${Math.max(pct, 3)}%"></div>
                    </div>
                    <span class="rw-time">${timeStr}</span>
                </div>`;
        });
        html += "</div></div>";
    });
    container.innerHTML = html;
}

// ---- THERMAL ----
function renderThermal() {
    const container = document.getElementById("thermalContent");
    if (!container) return;
    const label = currentLang === "en";
    let html = `<div class="info-grid-section">`;

    chipData.forEach(chip => {
        const ext = extendedData[chip.name];
        if (!ext) return;
        const cooling = ext.coolingAir
            ? `${label ? "Air" : "Air"}: ${ext.coolingAir} / ${label ? "Pro" : "Pro"}: ${ext.coolingPro}`
            : `${ext.coolingPro}`;
        const throttle = ext.throttleAirPct != null
            ? `Air: -${ext.throttleAirPct}% | Pro: -${ext.throttleProPct}%`
            : `${label ? "Throttle" : "降频"}: -${ext.throttleProPct}%`;

        html += `<div class="info-card-sm gen-border-${chip.gen.toLowerCase()}">
            <h5>${chip.name} <span class="chip-badge badge-${chip.tier.toLowerCase()}">${chip.tier}</span></h5>
            <div class="info-row"><span>🌡️ ${label ? "Cooling" : "散热"}</span><span>${cooling}</span></div>
            <div class="info-row"><span>📉 ${label ? "Throttle" : "降频"}</span><span>${throttle}</span></div>
            <div class="thermal-note">${label ? ext.thermal_en : ext.thermal_cn}</div>
        </div>`;
    });
    html += "</div>";
    container.innerHTML = html;
}

// ---- PRICE PERFORMANCE ----
let priceData = null;

// Fallback inline data for file:// protocol (CORS blocks fetch)
const FALLBACK_PRICES = {
    updated: "2026-03-17",
    currency: "CNY",
    data_window_days: 30,
    chips: {
        "M1":       { median_cny: 2800,  sample_count: 0, source: "estimate", typical_config: "8GB/256GB" },
        "M1 Pro":   { median_cny: 5500,  sample_count: 0, source: "estimate", typical_config: "16GB/512GB" },
        "M1 Max":   { median_cny: 7800,  sample_count: 0, source: "estimate", typical_config: "32GB/1TB" },
        "M1 Ultra": { median_cny: 15000, sample_count: 0, source: "estimate", typical_config: "64GB/1TB" },
        "M2":       { median_cny: 4200,  sample_count: 0, source: "estimate", typical_config: "8GB/256GB" },
        "M2 Pro":   { median_cny: 7200,  sample_count: 0, source: "estimate", typical_config: "16GB/512GB" },
        "M2 Max":   { median_cny: 9800,  sample_count: 0, source: "estimate", typical_config: "32GB/1TB" },
        "M2 Ultra": { median_cny: 18000, sample_count: 0, source: "estimate", typical_config: "64GB/1TB" },
        "M3":       { median_cny: 5800,  sample_count: 0, source: "estimate", typical_config: "8GB/256GB" },
        "M3 Pro":   { median_cny: 9500,  sample_count: 0, source: "estimate", typical_config: "18GB/512GB" },
        "M3 Max":   { median_cny: 14500, sample_count: 0, source: "estimate", typical_config: "36GB/1TB" },
        "M3 Ultra": { median_cny: 25000, sample_count: 0, source: "estimate", typical_config: "64GB/1TB" },
        "M4":       { median_cny: 7500,  sample_count: 0, source: "estimate", typical_config: "16GB/256GB" },
        "M4 Pro":   { median_cny: 12000, sample_count: 0, source: "estimate", typical_config: "24GB/512GB" },
        "M4 Max":   { median_cny: 18000, sample_count: 0, source: "estimate", typical_config: "36GB/1TB" },
        "M5":       { median_cny: 10500, sample_count: 0, source: "estimate", typical_config: "16GB/256GB" },
        "M5 Pro":   { median_cny: 16000, sample_count: 0, source: "estimate", typical_config: "24GB/512GB" },
        "M5 Max":   { median_cny: 25000, sample_count: 0, source: "estimate", typical_config: "36GB/1TB" }
    }
};

async function loadPrices() {
    try {
        const resp = await fetch("prices.json");
        if (resp.ok) priceData = await resp.json();
    } catch (e) {
        console.log("prices.json fetch failed (CORS on file://), using fallback data");
    }
    if (!priceData) priceData = FALLBACK_PRICES;
}

function renderPricePerf() {
    const container = document.getElementById("priceperfContent");
    if (!container || !priceData) {
        if (container) container.innerHTML = `<div class="info-card-sm" style="text-align:center;padding:40px">
            <p style="color:var(--text-muted)">${currentLang === "en"
                ? "💰 Price data not available yet. Deploy ai-goofish-monitor to collect real second-hand prices."
                : "💰 价格数据暂未导入。部署 ai-goofish-monitor 收集真实二手价格后可用。"}</p></div>`;
        return;
    }

    const label = currentLang === "en";
    const isPlaceholder = Object.values(priceData.chips).every(v => v.source === "placeholder" || v.source === "estimate");

    // Build value list: price per GB6 multi-core point
    const valueList = [];
    chipData.forEach(chip => {
        const pd = priceData.chips[chip.name];
        if (!pd || !pd.median_cny || !chip.gb6Multi) return;
        const costPer1kPts = (pd.median_cny / chip.gb6Multi * 1000);
        valueList.push({
            name: chip.name,
            gen: chip.gen.toLowerCase(),
            tier: chip.tier,
            price: pd.median_cny,
            gb6Multi: chip.gb6Multi,
            gb6Metal: chip.gb6Metal || 0,
            costPer1kPts: costPer1kPts,
            config: pd.typical_config || "",
            sampleCount: pd.sample_count || 0
        });
    });

    valueList.sort((a, b) => a.costPer1kPts - b.costPer1kPts); // lower = better value

    const worstValue = valueList[valueList.length - 1]?.costPer1kPts || 1;

    let html = `<div style="margin-bottom:20px">
        <h4 style="color:var(--text-primary);font-size:18px;font-weight:700;margin-bottom:8px">
            ${label ? "💰 Price-Performance Ranking (Lower = Better Value)" : "💰 性价比排行（越低越划算）"}
        </h4>
        <p style="color:var(--text-muted);font-size:12px;margin-bottom:4px">
            ${label ? "Metric: ¥ per 1,000 Geekbench 6 Multi-Core points" : "指标：每1000分 Geekbench 6 多核分数花费（元）"}
        </p>
        ${isPlaceholder ? `<p style="color:#ff9f0a;font-size:11px">⚠️ ${label
            ? "Using estimated placeholder prices. Deploy ai-goofish-monitor for real second-hand market data."
            : "当前使用估算价格。部署闲鱼监控后将自动替换为真实二手市场数据。"}</p>` : ""}
        <p style="color:var(--text-muted);font-size:11px">
            ${label ? `Data: ${priceData.updated} · Source: ${Object.values(priceData.chips)[0]?.source || "N/A"}`
                    : `数据时间: ${priceData.updated} · 来源: ${Object.values(priceData.chips)[0]?.source || "N/A"}`}
        </p>
    </div>`;

    html += `<div class="rw-task-card"><div class="rw-bars">`;
    valueList.forEach((v, i) => {
        const pct = (v.costPer1kPts / worstValue) * 100;
        const medal = i === 0 ? "🥇" : i === 1 ? "🥈" : i === 2 ? "🥉" : `#${i + 1}`;
        html += `
            <div class="rw-bar-row" style="margin-bottom:4px">
                <span class="rw-chip-name" style="min-width:95px">
                    <span style="font-size:10px;margin-right:2px">${medal}</span> ${v.name}
                </span>
                <div class="rw-bar-track">
                    <div class="rw-bar-fill tier-${v.gen}" style="width:${Math.max(pct, 5)}%"></div>
                </div>
                <span class="rw-time" style="min-width:120px;text-align:right">
                    ¥${v.costPer1kPts.toFixed(1)}/k
                    <span style="color:var(--text-muted);font-size:10px;margin-left:4px">¥${v.price.toLocaleString()}</span>
                </span>
            </div>`;
    });
    html += `</div></div>`;

    // Summary table
    html += `<table class="vs-table" style="margin-top:20px"><thead><tr>
        <th>#</th>
        <th>${label ? "Chip" : "芯片"}</th>
        <th>${label ? "Used Price" : "二手价"}</th>
        <th>${label ? "Config" : "配置"}</th>
        <th>GB6 Multi</th>
        <th>GPU Metal</th>
        <th>${label ? "¥/1k pts" : "元/千分"}</th>
        <th>${label ? "Value" : "性价比"}</th>
    </tr></thead><tbody>`;

    valueList.forEach((v, i) => {
        const stars = v.costPer1kPts < 0.5 ? "⭐⭐⭐" : v.costPer1kPts < 0.8 ? "⭐⭐" : v.costPer1kPts < 1.2 ? "⭐" : "";
        const medal = i === 0 ? "🥇" : i === 1 ? "🥈" : i === 2 ? "🥉" : `${i + 1}`;
        html += `<tr>
            <td>${medal}</td>
            <td style="font-weight:600">${v.name}</td>
            <td>¥${v.price.toLocaleString()}</td>
            <td style="font-size:11px;color:var(--text-muted)">${v.config}</td>
            <td>${v.gb6Multi.toLocaleString()}</td>
            <td>${v.gb6Metal.toLocaleString()}</td>
            <td style="font-weight:600;color:${v.costPer1kPts < 0.5 ? '#30d158' : v.costPer1kPts < 1 ? '#2997ff' : '#ff9f0a'}">¥${v.costPer1kPts.toFixed(2)}</td>
            <td>${stars}</td>
        </tr>`;
    });
    html += "</tbody></table>";

    container.innerHTML = html;
}

// ---- INIT EXTRA FEATURES ----
function initExtraFeatures() {
    initVS();
    renderPower();
    renderDevices();
    renderRealWorld();
    renderThermal();
    loadPrices().then(() => renderPricePerf());
}

// Hook into main init
document.addEventListener("DOMContentLoaded", () => {
    setTimeout(initExtraFeatures, 100);
});
