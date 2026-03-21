/* ============================================
   Apple Silicon — UI Enhancements
   Search, Theme, Tab Scroll, URL Hash,
   Mobile Cards, Data Export
   ============================================ */

// ---- URL HASH TAB MEMORY ----
function initHashNav() {
    // Read hash on load
    const hash = window.location.hash.replace("#", "");
    if (hash) {
        const tabBtn = document.querySelector(`.tab-btn[data-tab="${hash}"]`);
        if (tabBtn) tabBtn.click();
    }

    // Update hash when tab changes
    document.querySelectorAll(".tab-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            history.replaceState(null, "", `#${btn.dataset.tab}`);
        });
    });

    // Listen for hash changes (back/forward)
    window.addEventListener("hashchange", () => {
        const hash = window.location.hash.replace("#", "");
        const tabBtn = document.querySelector(`.tab-btn[data-tab="${hash}"]`);
        if (tabBtn && !tabBtn.classList.contains("active")) {
            tabBtn.click();
        }
    });
}

// ---- THEME TOGGLE ----
function initThemeToggle() {
    const btn = document.getElementById("themeToggle");
    if (!btn) return;

    // Load saved theme
    const saved = localStorage.getItem("theme");
    if (saved === "light") {
        document.documentElement.setAttribute("data-theme", "light");
        btn.textContent = "🌙";
    }

    btn.addEventListener("click", () => {
        const isLight = document.documentElement.getAttribute("data-theme") === "light";
        if (isLight) {
            document.documentElement.removeAttribute("data-theme");
            btn.textContent = "☀️";
            localStorage.setItem("theme", "dark");
        } else {
            document.documentElement.setAttribute("data-theme", "light");
            btn.textContent = "🌙";
            localStorage.setItem("theme", "light");
        }
        // Update theme-color meta
        const meta = document.querySelector('meta[name="theme-color"]');
        if (meta) meta.content = isLight ? "#0a0a0f" : "#f5f5f7";
    });
}

// ---- TAB SCROLL INDICATORS ----
function initTabScroll() {
    const nav = document.getElementById("tabNavInner");
    const leftArrow = document.getElementById("tabScrollLeft");
    const rightArrow = document.getElementById("tabScrollRight");
    const fadeLeft = document.querySelector(".tab-fade-left");
    const fadeRight = document.querySelector(".tab-fade-right");
    if (!nav || !leftArrow || !rightArrow) return;

    function updateArrows() {
        const { scrollLeft, scrollWidth, clientWidth } = nav;
        const canScrollLeft = scrollLeft > 5;
        const canScrollRight = scrollLeft < scrollWidth - clientWidth - 5;

        leftArrow.classList.toggle("visible", canScrollLeft);
        rightArrow.classList.toggle("visible", canScrollRight);
        if (fadeLeft) fadeLeft.classList.toggle("visible", canScrollLeft);
        if (fadeRight) fadeRight.classList.toggle("visible", canScrollRight);
    }

    leftArrow.addEventListener("click", () => {
        nav.scrollBy({ left: -200, behavior: "smooth" });
    });
    rightArrow.addEventListener("click", () => {
        nav.scrollBy({ left: 200, behavior: "smooth" });
    });

    nav.addEventListener("scroll", updateArrows);
    window.addEventListener("resize", updateArrows);
    // Initial check
    setTimeout(updateArrows, 200);
}

// ---- CHIP SEARCH ----
function initSearch() {
    const toggle = document.getElementById("searchToggle");
    const wrapper = document.getElementById("searchWrapper");
    const input = document.getElementById("chipSearch");
    if (!toggle || !input || !wrapper) return;

    let resultsList = null;

    toggle.addEventListener("click", () => {
        wrapper.classList.toggle("open");
        if (wrapper.classList.contains("open")) {
            input.focus();
        } else {
            input.value = "";
            hideResults();
        }
    });

    // Build search index
    function getAllChips() {
        const chips = [];
        // M-series from chipData (app.js global)
        if (typeof chipData !== "undefined") {
            chipData.forEach(c => {
                chips.push({
                    name: c.name, type: "M-Series", gen: c.gen, tier: c.tier,
                    tab: "table", gb6Multi: c.gb6Multi, gb6Single: c.gb6Single
                });
            });
        }
        // A-series from aSeriesData (app-extra.js global)
        if (typeof aSeriesData !== "undefined") {
            aSeriesData.forEach(c => {
                chips.push({
                    name: c.name, type: "A-Series", gen: c.gen, tier: c.variant,
                    tab: "aseries", antutu: c.antutu, gb6Multi: c.gb6Multi
                });
            });
        }
        return chips;
    }

    function showResults(results) {
        if (!resultsList) {
            resultsList = document.createElement("ul");
            resultsList.className = "search-results";
            wrapper.appendChild(resultsList);
        }
        resultsList.innerHTML = "";
        if (results.length === 0) {
            const li = document.createElement("li");
            li.innerHTML = `<span style="color:var(--text-muted)">${currentLang === "en" ? "No results" : "无结果"}</span>`;
            resultsList.appendChild(li);
        } else {
            results.forEach(r => {
                const li = document.createElement("li");
                const score = r.type === "A-Series"
                    ? `AnTuTu: ${(r.antutu || 0).toLocaleString()}`
                    : `GB6-M: ${(r.gb6Multi || 0).toLocaleString()}`;
                li.innerHTML = `
                    <div class="result-name">${r.name}</div>
                    <div class="result-meta">${r.type} · ${r.gen} · ${score}</div>
                `;
                li.addEventListener("click", () => {
                    // Switch to the correct tab
                    const tabBtn = document.querySelector(`.tab-btn[data-tab="${r.tab}"]`);
                    if (tabBtn) tabBtn.click();
                    input.value = "";
                    hideResults();
                    wrapper.classList.remove("open");
                });
                resultsList.appendChild(li);
            });
        }
        resultsList.classList.add("open");
    }

    function hideResults() {
        if (resultsList) resultsList.classList.remove("open");
    }

    input.addEventListener("input", () => {
        const q = input.value.toLowerCase().trim();
        if (q.length < 1) { hideResults(); return; }
        const all = getAllChips();
        const results = all.filter(c =>
            c.name.toLowerCase().includes(q) ||
            c.gen.toLowerCase().includes(q) ||
            c.type.toLowerCase().includes(q)
        ).slice(0, 8);
        showResults(results);
    });

    input.addEventListener("blur", () => {
        setTimeout(hideResults, 200); // delay so click on result registers
    });

    // Close on Escape
    input.addEventListener("keydown", e => {
        if (e.key === "Escape") {
            input.value = "";
            hideResults();
            wrapper.classList.remove("open");
        }
    });

    // Update placeholder on language change
    const observer = new MutationObserver(() => {
        input.placeholder = currentLang === "en" ? "Search chip..." : "搜索芯片...";
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["lang"] });
}

// ---- MOBILE CARD LAYOUT ----
function isMobile() {
    return window.innerWidth <= 768;
}

function renderMobileCards() {
    if (!isMobile()) return;
    // Only render for Specs Table tab
    const tableSection = document.getElementById("tab-table");
    if (!tableSection) return;

    const data = typeof getFilteredData === "function" ? getFilteredData() : (typeof chipData !== "undefined" ? chipData : []);
    const label = typeof currentLang !== "undefined" ? currentLang === "en" : true;

    let html = '<div class="chip-card-grid">';
    data.forEach(chip => {
        const genClass = `gen-${chip.gen.toLowerCase()}`;
        const badgeClass = `badge-${chip.tier.toLowerCase()}`;
        html += `
        <div class="chip-card-mobile ${genClass}">
            <div class="card-header">
                <div class="card-name">
                    ${chip.name}
                    <span class="chip-badge ${badgeClass}">${chip.tier}</span>
                </div>
                <span style="font-size:11px;color:var(--text-muted)">${chip.year}</span>
            </div>
            <div class="card-stats">
                <div class="card-stat">
                    <span class="card-stat-label">CPU</span>
                    <span class="card-stat-value">${chip.cpuCores} (${chip.cpuConfig})</span>
                </div>
                <div class="card-stat">
                    <span class="card-stat-label">GPU</span>
                    <span class="card-stat-value">${chip.gpuCores} ${label ? "cores" : "核"}</span>
                </div>
                <div class="card-stat">
                    <span class="card-stat-label">GB6-S</span>
                    <span class="card-stat-value">${chip.gb6Single ? chip.gb6Single.toLocaleString() : "—"}</span>
                </div>
                <div class="card-stat">
                    <span class="card-stat-label">GB6-M</span>
                    <span class="card-stat-value">${chip.gb6Multi ? chip.gb6Multi.toLocaleString() : "—"}</span>
                </div>
                <div class="card-stat">
                    <span class="card-stat-label">${label ? "Mem BW" : "内存带宽"}</span>
                    <span class="card-stat-value">${chip.memBandwidth || "—"} GB/s</span>
                </div>
                <div class="card-stat">
                    <span class="card-stat-label">${label ? "Max RAM" : "最大内存"}</span>
                    <span class="card-stat-value">${chip.maxMemory || "—"} GB</span>
                </div>
            </div>
        </div>`;
    });
    html += '</div>';

    // Check if mobile cards container exists
    let mobileContainer = tableSection.querySelector(".chip-card-grid");
    const tableContainer = tableSection.querySelector(".table-container");

    if (mobileContainer) {
        mobileContainer.outerHTML = html;
    } else {
        tableContainer.insertAdjacentHTML("afterend", html);
    }

    // Hide table, show cards
    if (tableContainer) tableContainer.style.display = "none";
    const cardGrid = tableSection.querySelector(".chip-card-grid");
    if (cardGrid) cardGrid.style.display = "";
}

function resetToTableLayout() {
    const tableSection = document.getElementById("tab-table");
    if (!tableSection) return;
    const tableContainer = tableSection.querySelector(".table-container");
    const cardGrid = tableSection.querySelector(".chip-card-grid");
    if (tableContainer) tableContainer.style.display = "";
    if (cardGrid) cardGrid.style.display = "none";
}

function handleResponsiveTable() {
    if (isMobile()) {
        renderMobileCards();
    } else {
        resetToTableLayout();
    }
}

// ---- DATA EXPORT ----
function exportCSV(dataArray, filename) {
    if (!dataArray || dataArray.length === 0) return;
    const keys = Object.keys(dataArray[0]);
    const csvRows = [keys.join(",")];
    dataArray.forEach(item => {
        const values = keys.map(k => {
            const val = item[k];
            if (typeof val === "string" && val.includes(",")) return `"${val}"`;
            return val ?? "";
        });
        csvRows.push(values.join(","));
    });
    const blob = new Blob([csvRows.join("\n")], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.click();
    URL.revokeObjectURL(link.href);
}

function initExport() {
    // Add export buttons to filter section
    const filtersSection = document.querySelector(".filters-section");
    if (!filtersSection) return;

    const exportGroup = document.createElement("div");
    exportGroup.className = "filter-group";
    exportGroup.style.marginLeft = "auto";

    const label = typeof currentLang !== "undefined" && currentLang === "cn" ? "导出" : "Export";
    exportGroup.innerHTML = `
        <label>${label}</label>
        <div style="display:flex;gap:6px">
            <button class="export-btn" id="exportCSV" data-en="📄 CSV" data-cn="📄 CSV">📄 CSV</button>
            <button class="export-btn" id="exportJSON" data-en="{ } JSON" data-cn="{ } JSON">{ } JSON</button>
        </div>
    `;
    filtersSection.appendChild(exportGroup);

    document.getElementById("exportCSV")?.addEventListener("click", () => {
        const data = typeof getFilteredData === "function" ? getFilteredData() : chipData;
        exportCSV(data, "apple_silicon_data.csv");
    });

    document.getElementById("exportJSON")?.addEventListener("click", () => {
        const data = typeof getFilteredData === "function" ? getFilteredData() : chipData;
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "apple_silicon_data.json";
        link.click();
        URL.revokeObjectURL(link.href);
    });
}

// ---- CHIP ICONS (SVG) ----
function getChipIcon(gen) {
    const colors = {
        M1: "#ff9f0a", M2: "#30d158", M3: "#64d2ff", M4: "#bf5af2", M5: "#ff375f",
        A12: "#ff9f0a", A13: "#ff6b35", A14: "#30d158", A15: "#64d2ff",
        A16: "#bf5af2", A17: "#ff375f", A18: "#ffd60a"
    };
    const color = colors[gen] || "#2997ff";
    return `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="20" height="20" rx="4" fill="${color}" fill-opacity="0.15"/>
        <rect x="4" y="4" width="12" height="12" rx="2" fill="${color}" fill-opacity="0.3"/>
        <rect x="6" y="6" width="8" height="8" rx="1" fill="${color}"/>
        <line x1="2" y1="7" x2="4" y2="7" stroke="${color}" stroke-width="1" stroke-opacity="0.5"/>
        <line x1="2" y1="10" x2="4" y2="10" stroke="${color}" stroke-width="1" stroke-opacity="0.5"/>
        <line x1="2" y1="13" x2="4" y2="13" stroke="${color}" stroke-width="1" stroke-opacity="0.5"/>
        <line x1="16" y1="7" x2="18" y2="7" stroke="${color}" stroke-width="1" stroke-opacity="0.5"/>
        <line x1="16" y1="10" x2="18" y2="10" stroke="${color}" stroke-width="1" stroke-opacity="0.5"/>
        <line x1="16" y1="13" x2="18" y2="13" stroke="${color}" stroke-width="1" stroke-opacity="0.5"/>
        <line x1="7" y1="2" x2="7" y2="4" stroke="${color}" stroke-width="1" stroke-opacity="0.5"/>
        <line x1="10" y1="2" x2="10" y2="4" stroke="${color}" stroke-width="1" stroke-opacity="0.5"/>
        <line x1="13" y1="2" x2="13" y2="4" stroke="${color}" stroke-width="1" stroke-opacity="0.5"/>
        <line x1="7" y1="16" x2="7" y2="18" stroke="${color}" stroke-width="1" stroke-opacity="0.5"/>
        <line x1="10" y1="16" x2="10" y2="18" stroke="${color}" stroke-width="1" stroke-opacity="0.5"/>
        <line x1="13" y1="16" x2="13" y2="18" stroke="${color}" stroke-width="1" stroke-opacity="0.5"/>
    </svg>`;
}

// ---- INIT ALL UI ENHANCEMENTS ----
function initUIEnhancements() {
    initThemeToggle();
    initTabScroll();
    initSearch();
    initHashNav();
    initExport();

    // Responsive handler
    window.addEventListener("resize", handleResponsiveTable);
    handleResponsiveTable();
}

document.addEventListener("DOMContentLoaded", () => {
    setTimeout(initUIEnhancements, 150);
});
