
    const CATEGORY_META = [
      { name: "VIP", factor: "2", color: "#26a641", textColor: "#f7fff9" },
      { name: "PVIP", factor: "1.5", color: "#3498d8", textColor: "#f7fbff" },
      { name: "Core", factor: "1.01", color: "#38d66b", textColor: "#06120a" },
      { name: "Unclass", factor: "1", color: "#a84bb4", textColor: "#fff7ff" },
      { name: "New★", factor: "1", color: "#8a8f99", textColor: "#ffffff" },
      { name: "OpPolicy", factor: "1", color: "#36cfc1", textColor: "#061513" },
      { name: "SpainClos", factor: "0.99", color: "#e6503e", textColor: "#fff8f7" },
      { name: "Review", factor: "0.5", color: "#cce83a", textColor: "#101500" },
      { name: "PPTR", factor: "1", color: "#111827", textColor: "#ffffff" },
      { name: "Wise", factor: "0.1", color: "#e8b930", textColor: "#171000" },
      { name: "BonusAbuse", factor: "0.49", color: "#7d2f31", textColor: "#ffffff" },
      { name: "Arbs", factor: "0.01", color: "#d83a41", textColor: "#ffffff" },
      { name: "Palps", factor: "0.01", color: "#d83a41", textColor: "#ffffff" },
      { name: "Exchange", factor: "0.01", color: "#d83a41", textColor: "#ffffff" },
      { name: "Latency", factor: "0.01", color: "#d83a41", textColor: "#ffffff" },
      { name: "Integrity", factor: "0.01", color: "#d83a41", textColor: "#ffffff" },
      { name: "Sharp", factor: "0.01", color: "#d83a41", textColor: "#ffffff" }
    ];

    const BET_FACTORS = Object.fromEntries(CATEGORY_META.map((item) => [item.name, item.factor]));
    const CATEGORY_BY_NAME = Object.fromEntries(CATEGORY_META.map((item) => [item.name, item]));
    let selectedCategory = "Core";

    const HEADERS = [
      "playerId",
      "brandId",
      "playerAlias",
      "inPlayBetDelay",
      "disableCO",
      "riskCategory",
      "betFactor",
      "playerNote",
      "playerNotePriority",
      "Resolved",
      "disableBoost"
    ];

    const MAX_PLAYERS_PER_FILE = 98;
    const MAX_BETNOTES_PER_FILE = 998;
    const BETNOTE_HEADERS = ["betId", "brand", "betNotePriority", "betNoteText"];

    const BRANDS = [
      "daznbetes",
      "quinnbet",
      "daznbet",
      "daznbetde",
      "borawin",
      "betbox",
      "ntigaming",
      "mistycasino",
      "ganobet",
      "casitoros",
      "madridbet",
      "casinoplata",
      "granpampa",
      "betmasr",
      "goldpot",
      "casitap",
      "reysur",
      "epikbahis",
      "casinospino",
      "yedibahis"
    ];

    const els = {
      categorySearch: document.getElementById("categorySearch"),
      categorySearchBtn: document.getElementById("categorySearchBtn"),
      categoryResults: document.getElementById("categoryResults"),
      categorySwatch: document.getElementById("categorySwatch"),
      factorBox: document.getElementById("factorBox"),
      accounts: document.getElementById("accounts"),
      brandId: document.getElementById("brandId"),
      brandResults: document.getElementById("brandResults"),
      playerNote: document.getElementById("playerNote"),
      playerNoteError: document.getElementById("playerNoteError"),
      inPlayBetDelay: document.getElementById("inPlayBetDelay"),
      disableCO: document.getElementById("disableCO"),
      betFactor: document.getElementById("betFactor"),
      playersCount: document.getElementById("playersCount"),
      filesCount: document.getElementById("filesCount"),
      outputType: document.getElementById("outputType"),
      statusIcon: document.getElementById("statusIcon"),
      statusTitle: document.getElementById("statusTitle"),
      statusText: document.getElementById("statusText"),
      disableCOPill: document.getElementById("disableCOPill"),
      brandPill: document.getElementById("brandPill"),
      notePill: document.getElementById("notePill"),
      delayPill: document.getElementById("delayPill"),
      preview: document.getElementById("preview"),
      previewTitle: document.getElementById("previewTitle"),
      generateBtn: document.getElementById("generateBtn"),
      generateIcon: document.getElementById("generateIcon"),
      generateLabel: document.getElementById("generateLabel"),
      copyBtn: document.getElementById("copyBtn"),
      copyLabel: document.getElementById("copyLabel"),
      resetBtn: document.getElementById("resetBtn"),
      toast: document.getElementById("toast"),
      generatorTab: document.getElementById("generatorTab"),
      cutterTab: document.getElementById("cutterTab"),
      betnotesTab: document.getElementById("betnotesTab"),
      generatorPanel: document.getElementById("generatorPanel"),
      cutterPanel: document.getElementById("cutterPanel"),
      betnotesPanel: document.getElementById("betnotesPanel"),
      cutterFile: document.getElementById("cutterFile"),
      fileDrop: document.getElementById("fileDrop"),
      cutterFileName: document.getElementById("cutterFileName"),
      cutterError: document.getElementById("cutterError"),
      cutFileBtn: document.getElementById("cutFileBtn"),
      clearCutterBtn: document.getElementById("clearCutterBtn"),
      cutterRowsCount: document.getElementById("cutterRowsCount"),
      cutterFilesCount: document.getElementById("cutterFilesCount"),
      cutterStatusIcon: document.getElementById("cutterStatusIcon"),
      cutterStatusTitle: document.getElementById("cutterStatusTitle"),
      cutterStatusText: document.getElementById("cutterStatusText"),
      cutterPreview: document.getElementById("cutterPreview"),
      betnotesFile: document.getElementById("betnotesFile"),
      betnotesDrop: document.getElementById("betnotesDrop"),
      betnotesFileName: document.getElementById("betnotesFileName"),
      betnotesError: document.getElementById("betnotesError"),
      formatBetnotesBtn: document.getElementById("formatBetnotesBtn"),
      clearBetnotesBtn: document.getElementById("clearBetnotesBtn"),
      betnotesRowsCount: document.getElementById("betnotesRowsCount"),
      betnotesFilesCount: document.getElementById("betnotesFilesCount"),
      betnotesStatusIcon: document.getElementById("betnotesStatusIcon"),
      betnotesStatusTitle: document.getElementById("betnotesStatusTitle"),
      betnotesStatusText: document.getElementById("betnotesStatusText"),
      betnotesPreview: document.getElementById("betnotesPreview")
    };

    function splitAccounts(raw) {
      return raw
        .split(/[\n,;\t ]+/)
        .map((item) => item.trim())
        .filter(Boolean);
    }

    function chunkArray(items, size) {
      const chunks = [];
      for (let i = 0; i < items.length; i += size) {
        chunks.push(items.slice(i, i + size));
      }
      return chunks;
    }

    function escapeCsv(value) {
      const stringValue = value == null ? "" : String(value);
      if (/[,"\n\r]/.test(stringValue)) return `"${stringValue.replace(/"/g, '""')}"`;
      return stringValue;
    }

    function getSettings() {
      return {
        category: selectedCategory,
        betFactor: els.betFactor.value.trim() || BET_FACTORS[selectedCategory],
        disableCO: els.disableCO.checked,
        brandId: els.brandId.value.trim(),
        playerNote: els.playerNote.value.trim(),
        inPlayBetDelay: els.inPlayBetDelay.value.trim()
      };
    }

    function buildRows(accounts, settings) {
      return accounts.map((playerId) => ({
        playerId,
        brandId: settings.brandId || "",
        playerAlias: "",
        inPlayBetDelay: settings.inPlayBetDelay || "",
        disableCO: settings.disableCO ? "TRUE" : "",
        riskCategory: settings.category,
        betFactor: settings.betFactor,
        playerNote: settings.playerNote || "",
        playerNotePriority: "",
        Resolved: "",
        disableBoost: ""
      }));
    }

    function buildCsv(accounts, settings, includeBom = true) {
      const rows = buildRows(accounts, settings);
      const lines = rows.map((row) => HEADERS.map((header) => escapeCsv(row[header])).join(","));
      return `${includeBom ? "\uFEFF" : ""}${HEADERS.join(",")}\r\n${lines.join("\r\n")}${lines.length ? "\r\n" : ""}`;
    }

    function makeFilename(category, index, total) {
      const safeCategory = category.toLowerCase().replace(/[^a-z0-9]+/g, "-");
      if (total > 1) {
        return `bulk-upload-${safeCategory}-${String(index + 1).padStart(2, "0")}-of-${String(total).padStart(2, "0")}.csv`;
      }
      return `bulk-upload-${safeCategory}.csv`;
    }

    function downloadBlob(blob, filename) {
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      link.remove();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
    }

    function crc32(bytes) {
      let table = crc32.table;
      if (!table) {
        table = new Uint32Array(256);
        for (let i = 0; i < 256; i++) {
          let c = i;
          for (let k = 0; k < 8; k++) c = (c & 1) ? (0xedb88320 ^ (c >>> 1)) : (c >>> 1);
          table[i] = c >>> 0;
        }
        crc32.table = table;
      }
      let crc = 0xffffffff;
      for (let i = 0; i < bytes.length; i++) crc = table[(crc ^ bytes[i]) & 0xff] ^ (crc >>> 8);
      return (crc ^ 0xffffffff) >>> 0;
    }

    function dosDateTime(date = new Date()) {
      const dosTime = (date.getHours() << 11) | (date.getMinutes() << 5) | Math.floor(date.getSeconds() / 2);
      const dosDate = ((date.getFullYear() - 1980) << 9) | ((date.getMonth() + 1) << 5) | date.getDate();
      return { dosTime, dosDate };
    }

    function u16(value) {
      return new Uint8Array([value & 255, (value >>> 8) & 255]);
    }

    function u32(value) {
      return new Uint8Array([value & 255, (value >>> 8) & 255, (value >>> 16) & 255, (value >>> 24) & 255]);
    }

    function concatArrays(arrays) {
      const total = arrays.reduce((sum, arr) => sum + arr.length, 0);
      const out = new Uint8Array(total);
      let offset = 0;
      for (const arr of arrays) {
        out.set(arr, offset);
        offset += arr.length;
      }
      return out;
    }

    function createZip(files) {
      const encoder = new TextEncoder();
      const localParts = [];
      const centralParts = [];
      let offset = 0;
      const { dosTime, dosDate } = dosDateTime();

      files.forEach((file) => {
        const nameBytes = encoder.encode(file.name);
        const dataBytes = encoder.encode(file.content);
        const crc = crc32(dataBytes);
        const localHeader = concatArrays([
          u32(0x04034b50), u16(20), u16(0), u16(0), u16(dosTime), u16(dosDate),
          u32(crc), u32(dataBytes.length), u32(dataBytes.length), u16(nameBytes.length), u16(0), nameBytes
        ]);
        localParts.push(localHeader, dataBytes);

        const centralHeader = concatArrays([
          u32(0x02014b50), u16(20), u16(20), u16(0), u16(0), u16(dosTime), u16(dosDate),
          u32(crc), u32(dataBytes.length), u32(dataBytes.length), u16(nameBytes.length), u16(0), u16(0),
          u16(0), u16(0), u32(0), u32(offset), nameBytes
        ]);
        centralParts.push(centralHeader);
        offset += localHeader.length + dataBytes.length;
      });

      const centralDirectory = concatArrays(centralParts);
      const localFiles = concatArrays(localParts);
      const end = concatArrays([
        u32(0x06054b50), u16(0), u16(0), u16(files.length), u16(files.length),
        u32(centralDirectory.length), u32(localFiles.length), u16(0)
      ]);

      return new Blob([localFiles, centralDirectory, end], { type: "application/zip" });
    }

    function currentState() {
      const accounts = splitAccounts(els.accounts.value);
      const settings = getSettings();
      const chunks = chunkArray(accounts, MAX_PLAYERS_PER_FILE);
      return { accounts, settings, chunks };
    }

    function updateUi() {
      const { accounts, settings, chunks } = currentState();
      const hasAccounts = accounts.length > 0;
      const noteIsValid = settings.playerNote.length >= 5;
      const isZip = accounts.length > MAX_PLAYERS_PER_FILE;
      const filesCount = hasAccounts ? chunks.length : 0;

      els.playersCount.textContent = accounts.length;
      els.filesCount.textContent = filesCount;
      els.outputType.textContent = hasAccounts ? (isZip ? "ZIP" : "CSV") : "—";
      els.statusIcon.textContent = isZip ? "!" : "✓";
      els.statusTitle.textContent = `${settings.category} upload / betFactor ${settings.betFactor}`;
      els.statusText.textContent = !hasAccounts
        ? "Paste player IDs to start. Player note is mandatory and must be at least 5 symbols."
        : !noteIsValid
          ? "Player note is mandatory. Add at least 5 symbols before generating the file."
        : isZip
          ? `More than 98 players detected. Download will be a ZIP with ${chunks.length} CSV files, max 98 players in each.`
          : "Ready to generate one CSV file. Maximum per single file is 98 players.";
      els.disableCOPill.textContent = settings.disableCO ? "YES / TRUE" : "NO / empty";
      els.brandPill.textContent = settings.brandId || "empty";
      els.notePill.textContent = settings.playerNote || "empty";
      els.delayPill.textContent = settings.inPlayBetDelay || "empty";
      els.playerNote.classList.toggle("invalid", hasAccounts && !noteIsValid);
      els.playerNoteError.classList.toggle("show", hasAccounts && !noteIsValid);
      els.generateBtn.disabled = !hasAccounts || !noteIsValid;
      els.copyBtn.disabled = !hasAccounts || !noteIsValid;
      els.generateIcon.textContent = isZip ? "▣" : "↓";
      els.generateLabel.textContent = `Generate ${hasAccounts && isZip ? "ZIP" : "CSV"}`;
      els.previewTitle.textContent = `CSV preview${accounts.length > 8 ? " (first 8 rows)" : ""}`;
      els.preview.textContent = hasAccounts ? buildCsv(accounts.slice(0, 8), settings, false) : "Paste player IDs to see a preview.";
    }

    function handleDownload() {
      const { accounts, settings, chunks } = currentState();
      if (!accounts.length) return;

      if (accounts.length <= MAX_PLAYERS_PER_FILE) {
        const csv = buildCsv(accounts, settings, true);
        downloadBlob(new Blob([csv], { type: "text/csv;charset=utf-8" }), makeFilename(settings.category, 0, 1));
        return;
      }

      const files = chunks.map((chunk, index) => ({
        name: makeFilename(settings.category, index, chunks.length),
        content: buildCsv(chunk, settings, true)
      }));
      const zipBlob = createZip(files);
      const safeCategory = settings.category.toLowerCase().replace(/[^a-z0-9]+/g, "-");
      downloadBlob(zipBlob, `bulk-upload-${safeCategory}-${accounts.length}-players.zip`);
    }

    async function handleCopy() {
      const { accounts, settings } = currentState();
      if (!accounts.length) return;
      const csv = buildCsv(accounts.slice(0, MAX_PLAYERS_PER_FILE), settings, false);
      await navigator.clipboard.writeText(csv);
      els.copyLabel.textContent = "Copied";
      els.toast.classList.add("show");
      setTimeout(() => {
        els.copyLabel.textContent = "Copy first CSV text";
        els.toast.classList.remove("show");
      }, 1400);
    }

    function resetForm() {
      selectedCategory = "Core";
      els.categorySearch.value = "Core";
      els.betFactor.value = BET_FACTORS.Core;
      applyCategoryStyle();
      els.accounts.value = "";
      els.brandId.value = "";
      hideBrandResults();
      els.playerNote.value = "";
      els.inPlayBetDelay.value = "";
      els.disableCO.checked = false;
      updateUi();
    }

    function matchingBrands() {
      const query = els.brandId.value.trim().toLowerCase();
      if (!query) return BRANDS;
      return BRANDS.filter((brand) => brand.toLowerCase().includes(query));
    }

    function renderBrandResults() {
      const matches = matchingBrands();
      const selectedBrand = els.brandId.value.trim().toLowerCase();
      els.brandResults.innerHTML = "";

      if (!matches.length) {
        const empty = document.createElement("div");
        empty.className = "brand-empty";
        empty.textContent = "No match. Press Enter or click away to use this as a custom brand.";
        els.brandResults.appendChild(empty);
      } else {
        matches.forEach((brand) => {
          const button = document.createElement("button");
          button.type = "button";
          button.className = "brand-option" + (brand.toLowerCase() === selectedBrand ? " selected" : "");
          button.textContent = brand;
          button.addEventListener("mousedown", (event) => {
            event.preventDefault();
            els.brandId.value = brand;
            hideBrandResults();
            updateUi();
          });
          els.brandResults.appendChild(button);
        });
      }

      els.brandResults.classList.add("show");
    }

    function hideBrandResults() {
      els.brandResults.classList.remove("show");
    }

    els.brandId.addEventListener("focus", renderBrandResults);
    els.brandId.addEventListener("input", () => {
      renderBrandResults();
      updateUi();
    });
    els.brandId.addEventListener("keydown", (event) => {
      if (event.key === "Escape") hideBrandResults();
      if (event.key === "Enter") {
        event.preventDefault();
        const first = els.brandResults.querySelector(".brand-option");
        if (first) els.brandId.value = first.textContent;
        hideBrandResults();
        updateUi();
      }
    });
    els.brandId.addEventListener("blur", () => setTimeout(hideBrandResults, 120));

    function applyCategoryStyle() {
      const meta = CATEGORY_BY_NAME[selectedCategory] || CATEGORY_BY_NAME.Core;
      document.documentElement.style.setProperty("--category-color", meta.color);
      document.documentElement.style.setProperty("--factor-text-color", meta.textColor);
      els.categorySwatch.style.background = meta.color;
    }

    function matchingCategories(forceAll = false) {
      const query = els.categorySearch.value.trim().toLowerCase();
      if (forceAll || !query) return CATEGORY_META;
      return CATEGORY_META.filter((item) => item.name.toLowerCase().includes(query));
    }

    function chooseCategory(name) {
      const meta = CATEGORY_BY_NAME[name] || CATEGORY_BY_NAME.Core;
      selectedCategory = meta.name;
      els.categorySearch.value = meta.name;
      els.betFactor.value = meta.factor;
      applyCategoryStyle();
      hideCategoryResults();
      updateUi();
    }

    function renderCategoryResults(forceAll = false) {
      const matches = matchingCategories(forceAll);
      els.categoryResults.innerHTML = "";

      if (!matches.length) {
        const empty = document.createElement("div");
        empty.className = "brand-empty";
        empty.textContent = "No matching category.";
        els.categoryResults.appendChild(empty);
      } else {
        matches.forEach((item) => {
          const button = document.createElement("button");
          button.type = "button";
          button.className = "category-option" + (item.name === selectedCategory ? " selected" : "");
          button.style.setProperty("--option-color", item.color);
          button.innerHTML = `<span class="category-left"><span class="mini-swatch"></span><span>${item.name}</span></span><span class="category-factor">BF ${item.factor}</span>`;
          button.addEventListener("mousedown", (event) => {
            event.preventDefault();
            chooseCategory(item.name);
          });
          els.categoryResults.appendChild(button);
        });
      }

      els.categoryResults.classList.add("show");
    }

    function hideCategoryResults() {
      els.categoryResults.classList.remove("show");
    }

    els.categorySearch.addEventListener("focus", () => {
      els.categorySearch.select();
      renderCategoryResults(true);
    });
    els.categorySearch.addEventListener("click", () => {
      renderCategoryResults(true);
    });
    els.categorySearch.addEventListener("input", () => {
      renderCategoryResults(false);
    });
    els.categorySearch.addEventListener("keydown", (event) => {
      if (event.key === "Escape") hideCategoryResults();
      if (event.key === "Enter") {
        event.preventDefault();
        const first = matchingCategories(false)[0];
        if (first) chooseCategory(first.name);
      }
    });
    els.categorySearch.addEventListener("blur", () => {
      setTimeout(() => {
        const exact = CATEGORY_META.find((item) => item.name.toLowerCase() === els.categorySearch.value.trim().toLowerCase());
        if (exact) chooseCategory(exact.name);
        else els.categorySearch.value = selectedCategory;
        hideCategoryResults();
        updateUi();
      }, 120);
    });
    els.categorySearchBtn.addEventListener("click", () => {
      els.categorySearch.focus();
      if (els.categoryResults.classList.contains("show")) hideCategoryResults();
      else renderCategoryResults(true);
    });


    let cutterState = {
      fileName: "",
      header: "",
      rows: []
    };

    function setActiveTool(tool) {
      const showCutter = tool === "cutter";
      const showBetnotes = tool === "betnotes";
      els.generatorTab.classList.toggle("active", !showCutter && !showBetnotes);
      els.cutterTab.classList.toggle("active", showCutter);
      els.betnotesTab.classList.toggle("active", showBetnotes);
      els.generatorPanel.classList.toggle("hidden", showCutter || showBetnotes);
      els.cutterPanel.classList.toggle("hidden", !showCutter);
      els.betnotesPanel.classList.toggle("hidden", !showBetnotes);
    }

    function showCutterError(message) {
      els.cutterError.textContent = message || "";
      els.cutterError.classList.toggle("show", Boolean(message));
    }

    function splitCsvRecordsRaw(text) {
      const cleaned = String(text || "").replace(/^﻿/, "");
      const records = [];
      let current = "";
      let inQuotes = false;

      for (let i = 0; i < cleaned.length; i++) {
        const char = cleaned[i];
        const next = cleaned[i + 1];

        if (char === '"') {
          current += char;
          if (inQuotes && next === '"') {
            current += next;
            i++;
          } else {
            inQuotes = !inQuotes;
          }
          continue;
        }

        if (!inQuotes && (char === "\n" || char === "\r")) {
          if (char === "\r" && next === "\n") i++;
          if (current.trim() !== "") records.push(current);
          current = "";
          continue;
        }

        current += char;
      }

      if (current.trim() !== "") records.push(current);
      return records;
    }

    function baseName(fileName) {
      return (fileName || "split-file").replace(/\.[^.]+$/, "").replace(/[^a-zA-Z0-9_-]+/g, "-").replace(/^-+|-+$/g, "") || "split-file";
    }

    function updateCutterUi() {
      const rows = cutterState.rows || [];
      const fileCount = rows.length ? Math.ceil(rows.length / MAX_PLAYERS_PER_FILE) : 0;
      els.cutterRowsCount.textContent = rows.length;
      els.cutterFilesCount.textContent = fileCount;
      els.cutFileBtn.disabled = rows.length === 0;
      els.cutterFileName.textContent = cutterState.fileName || "No file selected";
      els.cutterStatusIcon.textContent = rows.length > MAX_PLAYERS_PER_FILE ? "!" : "✓";
      els.cutterStatusTitle.textContent = rows.length ? `${rows.length} data rows / ${fileCount} output file${fileCount === 1 ? "" : "s"}` : "Waiting for CSV";
      els.cutterStatusText.textContent = rows.length
        ? `Every split file will include the original header row. Maximum ${MAX_PLAYERS_PER_FILE} data rows per CSV.`
        : "Upload a prepared CSV and I will split it into files with the same header row.";
      els.cutterPreview.textContent = rows.length
        ? [cutterState.header, ...rows.slice(0, 8)].join("\r\n") + (rows.length > 8 ? "\r\n..." : "")
        : "Upload a CSV file to see the header and first rows.";
    }

    function clearCutter() {
      cutterState = { fileName: "", header: "", rows: [] };
      els.cutterFile.value = "";
      showCutterError("");
      updateCutterUi();
    }

    function loadCutterFile(file) {
      if (!file) return;
      if (!file.name.toLowerCase().endsWith(".csv")) {
        clearCutter();
        showCutterError("Please upload a CSV file.");
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        try {
          const records = splitCsvRecordsRaw(reader.result);
          if (records.length < 2) {
            clearCutter();
            showCutterError("This CSV needs one header row and at least one data row.");
            return;
          }
          cutterState = {
            fileName: file.name,
            header: records[0],
            rows: records.slice(1).filter((row) => row.trim() !== "")
          };
          showCutterError("");
          updateCutterUi();
        } catch (error) {
          clearCutter();
          showCutterError("Could not read this CSV. Please check the file and try again.");
        }
      };
      reader.onerror = () => {
        clearCutter();
        showCutterError("Could not read this CSV. Please check the file and try again.");
      };
      reader.readAsText(file, "utf-8");
    }

    function makeCutterCsv(rows) {
      return `﻿${cutterState.header}\r\n${rows.join("\r\n")}\r\n`;
    }

    function handleCutFile() {
      if (!cutterState.rows.length) return;
      const chunks = chunkArray(cutterState.rows, MAX_PLAYERS_PER_FILE);
      const name = baseName(cutterState.fileName);

      if (chunks.length === 1) {
        downloadBlob(new Blob([makeCutterCsv(chunks[0])], { type: "text/csv;charset=utf-8" }), `${name}-part-01-of-01.csv`);
        return;
      }

      const files = chunks.map((chunk, index) => ({
        name: `${name}-part-${String(index + 1).padStart(2, "0")}-of-${String(chunks.length).padStart(2, "0")}.csv`,
        content: makeCutterCsv(chunk)
      }));
      downloadBlob(createZip(files), `${name}-split-${chunks.length}-files.zip`);
    }



    let betnotesState = {
      fileName: "",
      rows: []
    };

    function showBetnotesError(message) {
      els.betnotesError.textContent = message || "";
      els.betnotesError.classList.toggle("show", Boolean(message));
    }

    function parseCsvToArrays(text) {
      const cleaned = String(text || "").replace(/^﻿/, "");
      const rows = [];
      let row = [];
      let current = "";
      let inQuotes = false;

      for (let i = 0; i < cleaned.length; i++) {
        const char = cleaned[i];
        const next = cleaned[i + 1];

        if (char === '"') {
          if (inQuotes && next === '"') {
            current += '"';
            i++;
          } else {
            inQuotes = !inQuotes;
          }
          continue;
        }

        if (!inQuotes && char === ',') {
          row.push(current);
          current = "";
          continue;
        }

        if (!inQuotes && (char === "\n" || char === "\r")) {
          if (char === "\r" && next === "\n") i++;
          row.push(current);
          if (row.some((cell) => String(cell).trim() !== "")) rows.push(row);
          row = [];
          current = "";
          continue;
        }

        current += char;
      }

      row.push(current);
      if (row.some((cell) => String(cell).trim() !== "")) rows.push(row);
      return rows;
    }

    function normalizeHeader(value) {
      return String(value || "")
        .replace(/^﻿/, "")
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "");
    }

    function findHeaderIndex(rows) {
      const required = ["betid", "brand", "betnotepriority", "betnote"];
      return rows.findIndex((row) => {
        const normalized = row.map(normalizeHeader);
        return required.every((name) => normalized.includes(name));
      });
    }

    function extractBetnoteRows(rows) {
      const headerIndex = findHeaderIndex(rows);
      if (headerIndex === -1) {
        throw new Error("Could not find required columns: Bet ID, Brand, Bet Note Priority, Bet Note.");
      }

      const headers = rows[headerIndex].map(normalizeHeader);
      const index = {
        betId: headers.indexOf("betid"),
        brand: headers.indexOf("brand"),
        betNotePriority: headers.indexOf("betnotepriority"),
        betNoteText: headers.indexOf("betnote")
      };

      return rows.slice(headerIndex + 1)
        .map((row) => ({
          betId: String(row[index.betId] ?? "").trim(),
          brand: String(row[index.brand] ?? "").trim(),
          betNotePriority: String(row[index.betNotePriority] ?? "").trim(),
          betNoteText: String(row[index.betNoteText] ?? "").trim()
        }))
        .filter((row) => row.betId !== "");
    }

    function buildBetnotesCsv(rows, includeBom = true) {
      const lines = rows.map((row) => BETNOTE_HEADERS.map((header) => escapeCsv(row[header])).join(","));
      return `${includeBom ? "﻿" : ""}${BETNOTE_HEADERS.join(",")}\r\n${lines.join("\r\n")}${lines.length ? "\r\n" : ""}`;
    }

    function updateBetnotesUi() {
      const rows = betnotesState.rows || [];
      const fileCount = rows.length ? Math.ceil(rows.length / MAX_BETNOTES_PER_FILE) : 0;
      els.betnotesRowsCount.textContent = rows.length;
      els.betnotesFilesCount.textContent = fileCount;
      els.formatBetnotesBtn.disabled = rows.length === 0;
      els.betnotesFileName.textContent = betnotesState.fileName || "No file selected";
      els.betnotesStatusIcon.textContent = rows.length > MAX_BETNOTES_PER_FILE ? "!" : "✓";
      els.betnotesStatusTitle.textContent = rows.length ? `${rows.length} betIds / ${fileCount} output file${fileCount === 1 ? "" : "s"}` : "Waiting for report";
      els.betnotesStatusText.textContent = rows.length
        ? `Formatted output will use fixed columns and max ${MAX_BETNOTES_PER_FILE} betIds per CSV.`
        : "Upload the automated bet noting report and I will format it into betId, brand, betNotePriority, betNoteText.";
      els.betnotesPreview.textContent = rows.length
        ? buildBetnotesCsv(rows.slice(0, 8), false) + (rows.length > 8 ? "..." : "")
        : "Upload XLSX/CSV to see the formatted output preview.";
    }

    function clearBetnotes() {
      betnotesState = { fileName: "", rows: [] };
      els.betnotesFile.value = "";
      showBetnotesError("");
      updateBetnotesUi();
    }

    function loadBetnotesFile(file) {
      if (!file) return;
      const lowerName = file.name.toLowerCase();
      const isSpreadsheet = lowerName.endsWith(".xlsx") || lowerName.endsWith(".xls");
      const isCsv = lowerName.endsWith(".csv");
      if (!isSpreadsheet && !isCsv) {
        clearBetnotes();
        showBetnotesError("Please upload XLSX, XLS, or CSV file.");
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        try {
          let rows;
          if (isCsv) {
            rows = parseCsvToArrays(reader.result);
          } else {
            if (!window.XLSX) throw new Error("XLSX parser is still loading. Please refresh the page and try again.");
            const workbook = XLSX.read(reader.result, { type: "array" });
            const firstSheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[firstSheetName];
            rows = XLSX.utils.sheet_to_json(worksheet, { header: 1, raw: false, defval: "" });
          }

          const formattedRows = extractBetnoteRows(rows);
          if (!formattedRows.length) {
            clearBetnotes();
            showBetnotesError("Required columns were found, but there are no rows with Bet ID.");
            return;
          }

          betnotesState = { fileName: file.name, rows: formattedRows };
          showBetnotesError("");
          updateBetnotesUi();
        } catch (error) {
          clearBetnotes();
          showBetnotesError(error.message || "Could not read this file. Please check the template and try again.");
        }
      };
      reader.onerror = () => {
        clearBetnotes();
        showBetnotesError("Could not read this file. Please check it and try again.");
      };

      if (isCsv) reader.readAsText(file, "utf-8");
      else reader.readAsArrayBuffer(file);
    }

    function handleFormatBetnotes() {
      const rows = betnotesState.rows || [];
      if (!rows.length) return;
      const chunks = chunkArray(rows, MAX_BETNOTES_PER_FILE);
      const name = baseName(betnotesState.fileName || "auto-betnotes");

      if (chunks.length === 1) {
        downloadBlob(new Blob([buildBetnotesCsv(chunks[0], true)], { type: "text/csv;charset=utf-8" }), `${name}-betnotes-01-of-01.csv`);
        return;
      }

      const files = chunks.map((chunk, index) => ({
        name: `${name}-betnotes-${String(index + 1).padStart(2, "0")}-of-${String(chunks.length).padStart(2, "0")}.csv`,
        content: buildBetnotesCsv(chunk, true)
      }));
      downloadBlob(createZip(files), `${name}-betnotes-${chunks.length}-files.zip`);
    }

    els.generatorTab.addEventListener("click", () => setActiveTool("generator"));
    els.cutterTab.addEventListener("click", () => setActiveTool("cutter"));
    els.betnotesTab.addEventListener("click", () => setActiveTool("betnotes"));
    els.cutterFile.addEventListener("change", () => loadCutterFile(els.cutterFile.files[0]));
    els.cutFileBtn.addEventListener("click", handleCutFile);
    els.clearCutterBtn.addEventListener("click", clearCutter);
    els.betnotesFile.addEventListener("change", () => loadBetnotesFile(els.betnotesFile.files[0]));
    els.formatBetnotesBtn.addEventListener("click", handleFormatBetnotes);
    els.clearBetnotesBtn.addEventListener("click", clearBetnotes);
    ["dragenter", "dragover"].forEach((eventName) => {
      els.fileDrop.addEventListener(eventName, (event) => {
        event.preventDefault();
        els.fileDrop.classList.add("dragover");
      });
    });
    ["dragleave", "drop"].forEach((eventName) => {
      els.fileDrop.addEventListener(eventName, (event) => {
        event.preventDefault();
        els.fileDrop.classList.remove("dragover");
      });
    });
    els.fileDrop.addEventListener("drop", (event) => loadCutterFile(event.dataTransfer.files[0]));
    ["dragenter", "dragover"].forEach((eventName) => {
      els.betnotesDrop.addEventListener(eventName, (event) => {
        event.preventDefault();
        els.betnotesDrop.classList.add("dragover");
      });
    });
    ["dragleave", "drop"].forEach((eventName) => {
      els.betnotesDrop.addEventListener(eventName, (event) => {
        event.preventDefault();
        els.betnotesDrop.classList.remove("dragover");
      });
    });
    els.betnotesDrop.addEventListener("drop", (event) => loadBetnotesFile(event.dataTransfer.files[0]));

    [els.accounts, els.playerNote, els.inPlayBetDelay, els.disableCO, els.betFactor].forEach((el) => {
      el.addEventListener("input", updateUi);
      el.addEventListener("change", updateUi);
    });
    els.generateBtn.addEventListener("click", handleDownload);
    els.copyBtn.addEventListener("click", handleCopy);
    els.resetBtn.addEventListener("click", resetForm);

    applyCategoryStyle();
    updateUi();
    updateCutterUi();
    updateBetnotesUi();
  