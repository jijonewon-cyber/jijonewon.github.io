document.addEventListener("DOMContentLoaded", () => {
    // -------------------------------------------------------------
    // UI Elements Selector
    // -------------------------------------------------------------
    // Tab Navigation
    const tabBtns = document.querySelectorAll(".tab-nav .tab-btn");
    const tabContents = document.querySelectorAll(".tab-content");

    // Module 1: Document Converter UI
    const dropzone = document.getElementById("file-dropzone");
    const fileInput = document.getElementById("file-input");
    const queueContainer = document.getElementById("converter-queue-container");
    const queueList = document.getElementById("converter-queue-list");
    const queueCount = document.getElementById("queue-count");
    const btnClearQueue = document.getElementById("btn-clear-queue");
    const btnProcessQueue = document.getElementById("btn-process-queue");
    
    const statusPanel = document.getElementById("status-panel");
    const workspacePanel = document.getElementById("workspace-panel");
    const statusFilename = document.getElementById("status-filename");
    const statusFilesize = document.getElementById("status-filesize");
    const statusProgressbar = document.getElementById("status-progressbar");
    const statusMessage = document.getElementById("status-message");
    const previewDocument = document.getElementById("preview-document");
    
    // Controls for Tab 1
    const btnZoomIn = document.getElementById("btn-zoom-in");
    const btnZoomOut = document.getElementById("btn-zoom-out");
    const zoomIndicator = document.getElementById("zoom-indicator");
    const layoutSelect = document.getElementById("layout-select");
    const btnToggleEdit = document.getElementById("btn-toggle-edit");
    const btnDownloadPdf = document.getElementById("btn-download-pdf");
    const btnDownloadZip = document.getElementById("btn-download-zip");
    const editorToolbar = document.getElementById("editor-toolbar");

    // Module 2: PDF Merge & Split UI
    const pdfDropzone = document.getElementById("pdf-dropzone");
    const pdfFileInput = document.getElementById("pdf-file-input");
    const pdfWorkspace = document.getElementById("pdf-workspace");
    const btnModeMerge = document.getElementById("btn-mode-merge");
    const btnModeSplit = document.getElementById("btn-mode-split");
    const pdfMergeContainer = document.getElementById("pdf-merge-container");
    const pdfSplitContainer = document.getElementById("pdf-split-container");
    const pdfMergeList = document.getElementById("pdf-merge-list");
    const pdfSplitFilename = document.getElementById("pdf-split-filename");
    const pdfSplitPagecount = document.getElementById("pdf-split-pagecount");
    const pdfSplitRangeInput = document.getElementById("pdf-split-range");
    const btnRunMerge = document.getElementById("btn-run-merge");
    const btnRunSplit = document.getElementById("btn-run-split");

    // Module 3: Image to PDF UI
    const imageDropzone = document.getElementById("image-dropzone");
    const imageFileInput = document.getElementById("image-file-input");
    const imageWorkspace = document.getElementById("image-workspace");
    const imagePreviewGrid = document.getElementById("image-preview-grid");
    const imagePdfOrientation = document.getElementById("image-pdf-orientation");
    const imagePdfMargin = document.getElementById("image-pdf-margin");
    const btnRunImagePdf = document.getElementById("btn-run-image-pdf");

    // Sharing Widgets
    const btnShareKakao = document.getElementById("btn-share-kakao");
    const btnShareLink = document.getElementById("btn-share-link");

    // -------------------------------------------------------------
    // State Variables
    // -------------------------------------------------------------
    // Tab 1 state
    let fileQueue = [];
    let processingQueue = false;
    let convertedPdfs = []; // { name, blob }
    let currentFile = null;
    let zoomLevel = 1.0;
    let parsedImages = {}; // binDataIDRef -> DataURL
    let charPrMap = {};    // charPrID -> CSS style object
    let pPrMap = {};       // pPrID -> CSS style object
    let documentTitle = "document";
    let isEditMode = false;

    // Tab 2 state
    let pdfQueue = []; // { id, name, size, buffer, pageCount }
    let pdfToolMode = "merge"; // "merge" or "split"
    let selectedSplitFile = null;

    // Tab 3 state
    let imageQueue = []; // { id, name, dataURL }

    // -------------------------------------------------------------
    // Tab Toggle Handling
    // -------------------------------------------------------------
    tabBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            tabBtns.forEach(b => b.classList.remove("active"));
            tabContents.forEach(content => content.style.display = "none");
            
            btn.classList.add("active");
            const targetTab = btn.getAttribute("data-tab");
            
            if (targetTab === "converter") {
                document.getElementById("tab-converter").style.display = "block";
            } else if (targetTab === "pdf-tools") {
                document.getElementById("tab-pdf-tools").style.display = "block";
            } else if (targetTab === "image-to-pdf") {
                document.getElementById("tab-image-to-pdf").style.display = "block";
            }
        });
    });

    // -------------------------------------------------------------
    // Module 1: Document Converter (Batch Processing & Stepper)
    // -------------------------------------------------------------
    
    // Drag & drop file event bindings
    dropzone.addEventListener("click", () => fileInput.click());
    dropzone.addEventListener("dragover", (e) => {
        e.preventDefault();
        dropzone.classList.add("dragover");
    });
    dropzone.addEventListener("dragleave", () => {
        dropzone.classList.remove("dragover");
    });
    dropzone.addEventListener("drop", (e) => {
        e.preventDefault();
        dropzone.classList.remove("dragover");
        if (e.dataTransfer.files.length > 0) {
            addFilesToQueue(e.dataTransfer.files);
        }
    });
    fileInput.addEventListener("change", (e) => {
        if (e.target.files.length > 0) {
            addFilesToQueue(e.target.files);
        }
    });

    function addFilesToQueue(filesList) {
        for (const file of filesList) {
            const ext = file.name.toLowerCase().substring(file.name.lastIndexOf("."));
            if (ext !== ".hwpx" && ext !== ".docx") {
                alert(`지원하지 않는 파일 형식입니다: ${file.name}\n(.hwpx, .docx 파일만 변환 가능합니다)`);
                continue;
            }
            fileQueue.push({
                id: Date.now() + Math.random(),
                file: file,
                status: "pending" // pending, processing, completed, error
            });
        }
        renderConverterQueue();
    }

    function renderConverterQueue() {
        queueList.innerHTML = "";
        if (fileQueue.length === 0) {
            queueContainer.style.display = "none";
            return;
        }

        queueContainer.style.display = "block";
        queueCount.textContent = fileQueue.length;

        fileQueue.forEach((item, index) => {
            const qItem = document.createElement("div");
            qItem.className = "queue-item";
            
            const info = document.createElement("div");
            info.className = "queue-item-info";
            
            const name = document.createElement("span");
            name.className = "queue-item-name";
            name.textContent = `${index + 1}. ${item.file.name}`;
            
            const size = document.createElement("span");
            size.className = "queue-item-size";
            size.textContent = formatBytes(item.file.size);
            
            info.appendChild(name);
            info.appendChild(size);

            const status = document.createElement("div");
            status.className = "queue-item-status";

            const dot = document.createElement("span");
            dot.className = `status-dot ${item.status}`;
            
            let statusText = "대기 중";
            if (item.status === "processing") statusText = "변환 중";
            if (item.status === "completed") statusText = "완료";
            if (item.status === "error") statusText = "오류";

            const label = document.createElement("span");
            label.textContent = statusText;

            status.appendChild(dot);
            status.appendChild(label);

            // Add delete button (only when not processing)
            if (!processingQueue) {
                const btnDel = document.createElement("button");
                btnDel.className = "pdf-action-btn delete";
                btnDel.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>`;
                btnDel.addEventListener("click", (e) => {
                    e.stopPropagation();
                    fileQueue.splice(index, 1);
                    renderConverterQueue();
                });
                qItem.appendChild(info);
                qItem.appendChild(status);
                qItem.appendChild(btnDel);
            } else {
                qItem.appendChild(info);
                qItem.appendChild(status);
            }

            queueList.appendChild(qItem);
        });
    }

    btnClearQueue.addEventListener("click", () => {
        if (processingQueue) return;
        fileQueue = [];
        convertedPdfs = [];
        renderConverterQueue();
        workspacePanel.style.display = "none";
        statusPanel.style.display = "none";
    });

    btnProcessQueue.addEventListener("click", async () => {
        if (fileQueue.length === 0 || processingQueue) return;
        
        processingQueue = true;
        convertedPdfs = [];
        btnProcessQueue.disabled = true;
        btnClearQueue.disabled = true;
        
        // Show status panel and hide workspace panel
        statusPanel.style.display = "block";
        workspacePanel.style.display = "none";
        btnDownloadZip.style.display = "none";

        for (let i = 0; i < fileQueue.length; i++) {
            const item = fileQueue[i];
            item.status = "processing";
            renderConverterQueue();

            statusFilename.textContent = item.file.name;
            statusFilesize.textContent = formatBytes(item.file.size);
            resetStepper();

            currentFile = item.file;
            documentTitle = item.file.name.substring(0, item.file.name.lastIndexOf(".")) || "document";

            try {
                let success = false;
                if (item.file.name.toLowerCase().endsWith(".hwpx")) {
                    success = await processHwpxCore(item.file, true);
                } else {
                    success = await processDocxCore(item.file, true);
                }

                if (success) {
                    // Render to hidden or capture pdf immediately
                    const isLandscape = layoutSelect.value === "landscape";
                    const opt = {
                        margin: [10, 12, 10, 12],
                        filename: `${documentTitle}.pdf`,
                        image: { type: 'jpeg', quality: 0.98 },
                        html2canvas: { scale: 2.0, useCORS: true, letterRendering: true },
                        jsPDF: { unit: 'mm', format: 'a4', orientation: isLandscape ? 'landscape' : 'portrait' }
                    };
                    
                    const pdfBlob = await html2pdf().from(previewDocument).set(opt).output('blob');
                    convertedPdfs.push({
                        name: `${documentTitle}.pdf`,
                        blob: pdfBlob
                    });

                    item.status = "completed";
                } else {
                    item.status = "error";
                }
            } catch (err) {
                console.error(err);
                item.status = "error";
            }
            renderConverterQueue();
        }

        processingQueue = false;
        btnProcessQueue.disabled = false;
        btnClearQueue.disabled = false;

        // When all conversions completed
        statusPanel.style.display = "none";
        workspacePanel.style.display = "block";
        resetZoom();

        // If batch conversion (multiple files)
        if (convertedPdfs.length > 1) {
            btnDownloadZip.style.display = "inline-flex";
        } else {
            btnDownloadZip.style.display = "none";
        }
    });

    // ZIP Downloader for multiple converted files
    btnDownloadZip.addEventListener("click", async () => {
        if (convertedPdfs.length === 0) return;
        
        btnDownloadZip.disabled = true;
        const btnText = btnDownloadZip.querySelector("span");
        btnText.textContent = "압축 파일 생성 중...";

        try {
            const zip = new JSZip();
            convertedPdfs.forEach(fileItem => {
                zip.file(fileItem.name, fileItem.blob);
            });

            const content = await zip.generateAsync({ type: "blob" });
            const link = document.createElement("a");
            link.href = URL.createObjectURL(content);
            link.download = "converted_pdfs.zip";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (e) {
            alert(`ZIP 압축 중 오류가 발생했습니다: ${e.message}`);
        } finally {
            btnText.textContent = "ZIP 다운로드";
            btnDownloadZip.disabled = false;
        }
    });

    // Color conversion
    function parseOwpmlColor(colorStr) {
        if (!colorStr) return null;
        colorStr = colorStr.trim();
        if (colorStr.startsWith("#")) {
            if (colorStr.length === 9) {
                return `#${colorStr.substring(3, 9)}`;
            }
            return colorStr;
        }
        const num = parseInt(colorStr);
        if (!isNaN(num)) {
            let hex = num.toString(16).toUpperCase();
            while (hex.length < 8) { hex = "0" + hex; }
            return `#${hex.substring(2)}`;
        }
        return colorStr;
    }

    function formatBytes(bytes, decimals = 2) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const dm = decimals < 0 ? 0 : decimals;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
    }

    function resetStepper() {
        for (let i = 1; i <= 4; i++) {
            const stepEl = document.getElementById(`step-${i}`);
            stepEl.className = "step";
        }
        statusProgressbar.style.width = "0%";
    }

    function updateStep(stepNumber, status, msg) {
        const stepEl = document.getElementById(`step-${stepNumber}`);
        if (stepEl) {
            stepEl.className = `step ${status}`;
        }
        const progressPercentage = (stepNumber - (status === 'completed' ? 0 : 0.5)) * 25;
        statusProgressbar.style.width = `${progressPercentage}%`;
        
        if (msg) {
            statusMessage.textContent = msg;
            if (status === 'error') {
                statusMessage.style.color = 'var(--error)';
            } else {
                statusMessage.style.color = 'var(--text-secondary)';
            }
        }
    }

    // Core HWPX Parser
    async function processHwpxCore(file, isBatch = false) {
        try {
            updateStep(1, "active", "로컬 디스크에서 HWPX 파일을 읽어들이는 중입니다...");
            const arrayBuffer = await readFileAsArrayBuffer(file);
            updateStep(1, "completed");

            updateStep(2, "active", "압축(ZIP) 파일 해제 중...");
            const zip = await JSZip.loadAsync(arrayBuffer);
            updateStep(2, "completed");

            updateStep(3, "active", "문서 구조 및 스타일 정보 분석 중...");
            const headerFile = zip.file("Contents/header.xml");
            if (headerFile) {
                const headerText = await headerFile.async("text");
                parseHeaderXml(headerText);
            }
            await extractBinaryImages(zip);
            updateStep(3, "completed");

            updateStep(4, "active", "HTML 문서 구조 변환 및 미리보기 화면 생성 중...");
            const sectionFiles = Object.keys(zip.files)
                .filter(name => /^Contents\/section\d+\.xml$/i.test(name))
                .sort((a, b) => {
                    const numA = parseInt(a.replace(/\D/g, ""));
                    const numB = parseInt(b.replace(/\D/g, ""));
                    return numA - numB;
                });

            if (sectionFiles.length === 0) {
                throw new Error("문서 본문 파일을 찾을 수 없습니다.");
            }

            previewDocument.innerHTML = "";
            for (const sectionPath of sectionFiles) {
                const sectionText = await zip.file(sectionPath).async("text");
                renderSectionXml(sectionText);
            }

            if (previewDocument.textContent.trim() === "" && 
                previewDocument.getElementsByTagName("img").length === 0 && 
                previewDocument.getElementsByTagName("table").length === 0) {
                previewDocument.innerHTML = `<div style="text-align: center; color: #888; padding: 40px 20px; font-family: sans-serif; border: 1px dashed rgba(255, 255, 255, 0.15); border-radius: 8px; margin: 20px 0; background: rgba(255, 255, 255, 0.02);">
                    <p style="font-size: 16px; margin-bottom: 10px; font-weight: bold; color: var(--text-primary);">본문 내용을 렌더링할 수 없습니다.</p>
                </div>`;
            }

            updateStep(4, "completed", "변환 완료!");
            return true;
        } catch (err) {
            updateStep(4, "error", `변환 오류: ${err.message}`);
            return false;
        }
    }

    // Core DOCX Parser
    async function processDocxCore(file, isBatch = false) {
        try {
            updateStep(1, "active", "로컬 디스크에서 DOCX 파일을 읽어들이는 중입니다...");
            const arrayBuffer = await readFileAsArrayBuffer(file);
            updateStep(1, "completed");

            updateStep(2, "active", "Word 파일 구조 분석 및 압축 해제 중...");
            await new Promise(resolve => setTimeout(resolve, 200));
            updateStep(2, "completed");

            updateStep(3, "active", "텍스트 서식 및 이미지 리소스 변환 중...");
            const options = {
                styleMap: [
                    "u => u",
                    "strike => del",
                    "br[type='page'] => hr.page-break"
                ]
            };
            const result = await mammoth.convertToHtml({ arrayBuffer: arrayBuffer }, options);
            const html = result.value;
            updateStep(3, "completed");

            updateStep(4, "active", "HTML 미리보기 화면 생성 중...");
            previewDocument.innerHTML = html;

            if (previewDocument.textContent.trim() === "" && 
                previewDocument.getElementsByTagName("img").length === 0 && 
                previewDocument.getElementsByTagName("table").length === 0) {
                previewDocument.innerHTML = `<div style="text-align: center; color: #888; padding: 40px 20px; font-family: sans-serif; border: 1px dashed rgba(255, 255, 255, 0.15); border-radius: 8px; margin: 20px 0; background: rgba(255, 255, 255, 0.02);">
                    <p style="font-size: 16px; margin-bottom: 10px; font-weight: bold; color: var(--text-primary);">본문 내용을 렌더링할 수 없습니다.</p>
                </div>`;
            }

            updateStep(4, "completed", "변환 완료!");
            return true;
        } catch (err) {
            updateStep(4, "error", `변환 오류: ${err.message}`);
            return false;
        }
    }

    function readFileAsArrayBuffer(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (e) => resolve(e.target.result);
            reader.onerror = () => reject(new Error("파일을 읽을 수 없습니다."));
            reader.readAsArrayBuffer(file);
        });
    }

    function sanitizeXmlText(xmlText) {
        if (!xmlText) return "";
        let sanitized = xmlText
            .replace(/&nbsp;/g, "&#160;")
            .replace(/&middot;/g, "&#183;")
            .replace(/&copy;/g, "&#169;")
            .replace(/&bull;/g, "&#8226;");
        sanitized = sanitized.replace(/[^\x09\x0A\x0D\x20-\uD7FF\uE000-\uFFFD]/gu, "");
        return sanitized;
    }

    function parseHeaderXml(xmlText) {
        charPrMap = {};
        pPrMap = {};
        const parser = new DOMParser();
        const doc = parser.parseFromString(sanitizeXmlText(xmlText), "application/xml");
        const parserError = doc.getElementsByTagName("parsererror")[0];
        if (parserError) return;

        const charPrElements = doc.getElementsByTagNameNS("*", "charPr");
        for (const el of charPrElements) {
            const id = el.getAttribute("id");
            if (!id) continue;
            const height = el.getAttribute("height");
            const textColor = el.getAttribute("textColor");
            const bold = el.getElementsByTagNameNS("*", "bold").length > 0;
            const italic = el.getElementsByTagNameNS("*", "italic").length > 0;
            const underlineEl = el.getElementsByTagNameNS("*", "underline")[0];
            const underline = !!(underlineEl && underlineEl.getAttribute("type") && underlineEl.getAttribute("type").toLowerCase() !== "none");
            const strikeoutEl = el.getElementsByTagNameNS("*", "strikeout")[0];
            const strikeout = !!(strikeoutEl && strikeoutEl.getAttribute("type") && strikeoutEl.getAttribute("type").toLowerCase() !== "none");

            charPrMap[id] = {
                fontSize: height ? (parseInt(height) / 100) + "pt" : null,
                color: parseOwpmlColor(textColor),
                bold,
                italic,
                underline,
                strikeout
            };
        }

        const pPrElements = doc.getElementsByTagNameNS("*", "pPr");
        for (const el of pPrElements) {
            const id = el.getAttribute("id");
            if (!id) continue;
            const alignEl = el.getElementsByTagNameNS("*", "align")[0];
            const align = alignEl ? alignEl.getAttribute("type") : null;
            pPrMap[id] = {
                textAlign: align ? align.toLowerCase() : null
            };
        }
    }

    async function extractBinaryImages(zip) {
        parsedImages = {};
        const binFiles = Object.keys(zip.files).filter(name => name.startsWith("BinData/"));
        for (const path of binFiles) {
            const baseName = path.replace("BinData/", "").split(".")[0].toLowerCase();
            const ext = path.split(".").pop().toLowerCase();
            if (["png", "jpg", "jpeg", "gif", "svg"].includes(ext)) {
                try {
                    const base64Data = await zip.file(path).async("base64");
                    const mimeType = ext === "svg" ? "image/svg+xml" : `image/${ext}`;
                    parsedImages[baseName] = `data:${mimeType};base64,${base64Data}`;
                } catch (e) {
                    console.error(e);
                }
            } else if (["wmf", "emf"].includes(ext)) {
                parsedImages[baseName] = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="200" height="80" viewBox="0 0 200 80"><rect width="198" height="78" x="1" y="1" fill="%23f9f9f9" stroke="%23dddddd" stroke-width="1"/><text x="100" y="45" font-family="sans-serif" font-size="10" fill="%23888888" text-anchor="middle">한글 벡터 그래픽 (WMF/EMF)</text></svg>`;
            }
        }
    }

    function renderSectionXml(xmlText) {
        const parser = new DOMParser();
        const doc = parser.parseFromString(sanitizeXmlText(xmlText), "application/xml");
        const parserError = doc.getElementsByTagName("parsererror")[0];
        if (parserError) throw new Error(`XML 파싱 오류: ${parserError.textContent}`);

        const rootNode = doc.documentElement;
        if (!rootNode) return;

        const fragment = document.createDocumentFragment();
        for (const child of rootNode.childNodes) {
            const el = parseNode(child);
            if (el) fragment.appendChild(el);
        }
        previewDocument.appendChild(fragment);
    }

    function parseNode(node) {
        if (node.nodeType === Node.TEXT_NODE) {
            const txt = node.textContent;
            return txt.trim() === "" ? null : document.createTextNode(txt);
        }
        if (node.nodeType !== Node.ELEMENT_NODE) return null;

        const tagName = node.localName;

        if (tagName === "p") {
            const p = document.createElement("p");
            const pPrIDRef = node.getAttribute("pPrIDRef");
            if (pPrIDRef && pPrMap[pPrIDRef]) {
                const style = pPrMap[pPrIDRef];
                if (style.textAlign) {
                    p.style.textAlign = style.textAlign === "justify" ? "justify" : style.textAlign;
                }
            }
            for (const child of node.childNodes) {
                const el = parseNode(child);
                if (el) p.appendChild(el);
            }
            return p;
        }

        if (tagName === "run") {
            const span = document.createElement("span");
            const charPrIDRef = node.getAttribute("charPrIDRef");
            if (charPrIDRef && charPrMap[charPrIDRef]) {
                const style = charPrMap[charPrIDRef];
                if (style.fontSize) span.style.fontSize = style.fontSize;
                if (style.color) span.style.color = style.color;
                if (style.bold) span.style.fontWeight = "bold";
                if (style.italic) span.style.fontStyle = "italic";
                let textDecor = "";
                if (style.underline) textDecor += "underline ";
                if (style.strikeout) textDecor += "line-through ";
                if (textDecor) span.style.textDecoration = textDecor.trim();
            }
            for (const child of node.childNodes) {
                const el = parseNode(child);
                if (el) span.appendChild(el);
            }
            return span;
        }

        if (tagName === "t") {
            return document.createTextNode(node.textContent);
        }

        if (tagName === "br" || tagName === "lineBreak") {
            return document.createElement("br");
        }

        if (tagName === "tbl") {
            const table = document.createElement("table");
            const tbody = document.createElement("tbody");
            const rows = node.getElementsByTagNameNS("*", "tr");
            for (const row of rows) {
                const tr = document.createElement("tr");
                const cells = row.getElementsByTagNameNS("*", "tc");
                for (const cell of cells) {
                    const td = document.createElement("td");
                    const colSpan = cell.getAttribute("colSpan");
                    const rowSpan = cell.getAttribute("rowSpan");
                    if (colSpan && colSpan !== "1") td.setAttribute("colspan", colSpan);
                    if (rowSpan && rowSpan !== "1") td.setAttribute("rowspan", rowSpan);

                    const fillEl = cell.getElementsByTagNameNS("*", "winBrush")[0];
                    if (fillEl) {
                        const faceColor = fillEl.getAttribute("faceColor");
                        if (faceColor) {
                            td.style.backgroundColor = parseOwpmlColor(faceColor);
                        }
                    }

                    const subList = cell.getElementsByTagNameNS("*", "subList")[0];
                    if (subList) {
                        for (const subChild of subList.childNodes) {
                            const el = parseNode(subChild);
                            if (el) td.appendChild(el);
                        }
                    } else {
                        for (const child of cell.childNodes) {
                            const el = parseNode(child);
                            if (el) td.appendChild(el);
                        }
                    }
                    tr.appendChild(td);
                }
                tbody.appendChild(tr);
            }
            table.appendChild(tbody);
            return table;
        }

        if (tagName === "pic") {
            const img = document.createElement("img");
            let binDataIdRef = null;
            if (node.attributes) {
                for (const attr of node.attributes) {
                    const name = attr.name.toLowerCase();
                    if (name === "bindataidref" || name === "binaryitemidref") {
                        binDataIdRef = attr.value;
                        break;
                    }
                }
            }
            if (!binDataIdRef) {
                const descendants = node.getElementsByTagName("*");
                for (const desc of descendants) {
                    if (desc.attributes) {
                        for (const attr of desc.attributes) {
                            const name = attr.name.toLowerCase();
                            if (name === "bindataidref" || name === "binaryitemidref") {
                                binDataIdRef = attr.value;
                                break;
                            }
                        }
                    }
                    if (binDataIdRef) break;
                }
            }

            if (binDataIdRef) {
                let imgKey = binDataIdRef.toLowerCase();
                let imgDataUrl = parsedImages[imgKey];
                if (!imgDataUrl && /^\d+$/.test(imgKey)) {
                    imgDataUrl = parsedImages[`bindata${imgKey}`];
                }
                if (imgDataUrl) {
                    img.src = imgDataUrl;
                }
            }

            const szNode = node.getElementsByTagNameNS("*", "sz")[0];
            if (szNode) {
                const hwpWidth = parseInt(szNode.getAttribute("width"));
                if (!isNaN(hwpWidth) && hwpWidth > 0) {
                    const widthPx = Math.round(hwpWidth / 75);
                    img.style.width = `${widthPx}px`;
                    img.style.maxWidth = "100%";
                }
            }
            return img;
        }

        let container = null;
        for (const child of node.childNodes) {
            const el = parseNode(child);
            if (el) {
                if (!container) container = document.createDocumentFragment();
                container.appendChild(el);
            }
        }
        return container;
    }

    // -------------------------------------------------------------
    // Live Rich-Text Editor Logic
    // -------------------------------------------------------------
    btnToggleEdit.addEventListener("click", () => {
        isEditMode = !isEditMode;
        btnToggleEdit.classList.toggle("active", isEditMode);
        
        if (isEditMode) {
            previewDocument.contentEditable = "true";
            editorToolbar.style.display = "flex";
            previewDocument.focus();
        } else {
            previewDocument.contentEditable = "false";
            editorToolbar.style.display = "none";
        }
    });

    // Formatting button bindings
    document.querySelectorAll(".editor-btn").forEach(btn => {
        btn.addEventListener("click", (e) => {
            e.preventDefault();
            const cmd = btn.getAttribute("data-command");
            document.execCommand(cmd, false, null);
            previewDocument.focus();
        });
    });

    document.getElementById("editor-font-size").addEventListener("change", (e) => {
        document.execCommand("fontSize", false, e.target.value);
        previewDocument.focus();
    });

    document.getElementById("editor-color-picker").addEventListener("input", (e) => {
        document.execCommand("foreColor", false, e.target.value);
        previewDocument.focus();
    });

    // -------------------------------------------------------------
    // Zoom & Orientation Controls
    // -------------------------------------------------------------
    function updateZoomDisplay() {
        zoomIndicator.textContent = `${Math.round(zoomLevel * 100)}%`;
        const container = document.querySelector(".preview-container");
        container.style.transform = `scale(${zoomLevel})`;
        if (zoomLevel > 1.0) {
            container.style.marginBottom = `${(zoomLevel - 1.0) * previewDocument.offsetHeight}px`;
        } else {
            container.style.marginBottom = "0px";
        }
    }

    function resetZoom() {
        zoomLevel = 1.0;
        updateZoomDisplay();
    }

    btnZoomIn.addEventListener("click", () => {
        if (zoomLevel < 2.0) {
            zoomLevel += 0.1;
            updateZoomDisplay();
        }
    });

    btnZoomOut.addEventListener("click", () => {
        if (zoomLevel > 0.5) {
            zoomLevel -= 0.1;
            updateZoomDisplay();
        }
    });

    layoutSelect.addEventListener("change", (e) => {
        const layout = e.target.value;
        if (layout === "landscape") {
            previewDocument.className = "preview-document landscape";
        } else {
            previewDocument.className = "preview-document portrait";
        }
        resetZoom();
    });

    // Download Single PDF
    btnDownloadPdf.addEventListener("click", async () => {
        if (!currentFile && convertedPdfs.length === 0) return;
        
        const btnText = btnDownloadPdf.querySelector("span");
        const originalText = btnText.textContent;
        btnText.textContent = "PDF 생성 중...";
        btnDownloadPdf.disabled = true;

        try {
            const isLandscape = layoutSelect.value === "landscape";
            const opt = {
                margin: [10, 12, 10, 12],
                filename: `${documentTitle}.pdf`,
                image: { type: 'jpeg', quality: 0.98 },
                html2canvas: { scale: 2.2, useCORS: true, letterRendering: true, scrollX: 0, scrollY: 0 },
                jsPDF: { unit: 'mm', format: 'a4', orientation: isLandscape ? 'landscape' : 'portrait' },
                pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
            };
            await html2pdf().from(previewDocument).set(opt).save();
        } catch (err) {
            alert(`PDF 생성 실패: ${err.message}`);
        } finally {
            btnText.textContent = originalText;
            btnDownloadPdf.disabled = false;
        }
    });

    // -------------------------------------------------------------
    // Module 2: PDF Merge & Split (PDF-Lib Integration)
    // -------------------------------------------------------------
    pdfDropzone.addEventListener("click", () => pdfFileInput.click());
    pdfDropzone.addEventListener("dragover", (e) => {
        e.preventDefault();
        pdfDropzone.classList.add("dragover");
    });
    pdfDropzone.addEventListener("dragleave", () => {
        pdfDropzone.classList.remove("dragover");
    });
    pdfDropzone.addEventListener("drop", (e) => {
        e.preventDefault();
        pdfDropzone.classList.remove("dragover");
        if (e.dataTransfer.files.length > 0) {
            handlePdfFiles(e.dataTransfer.files);
        }
    });
    pdfFileInput.addEventListener("change", (e) => {
        if (e.target.files.length > 0) {
            handlePdfFiles(e.target.files);
        }
    });

    async function handlePdfFiles(files) {
        for (const file of files) {
            if (!file.name.toLowerCase().endsWith(".pdf")) {
                alert(`PDF 파일만 업로드할 수 있습니다: ${file.name}`);
                continue;
            }
            
            try {
                const buffer = await readFileAsArrayBuffer(file);
                const srcPdf = await PDFLib.PDFDocument.load(buffer);
                const pageCount = srcPdf.getPageCount();
                
                pdfQueue.push({
                    id: Date.now() + Math.random(),
                    name: file.name,
                    size: file.size,
                    buffer: buffer,
                    pageCount: pageCount
                });
            } catch (err) {
                alert(`PDF 파일 분석 실패: ${file.name}\n${err.message}`);
            }
        }
        
        pdfWorkspace.style.display = "block";
        renderPdfList();
        
        // Select first file as default for splitting
        if (pdfQueue.length > 0 && !selectedSplitFile) {
            selectFileForSplit(pdfQueue[0]);
        }
    }

    function renderPdfList() {
        pdfMergeList.innerHTML = "";
        pdfQueue.forEach((item, index) => {
            const fItem = document.createElement("div");
            fItem.className = "pdf-file-item";
            
            const label = document.createElement("span");
            label.className = "pdf-file-name";
            label.textContent = `${index + 1}. ${item.name} (${item.pageCount}p)`;
            
            const actions = document.createElement("div");
            actions.className = "pdf-file-actions";

            // Up button
            const btnUp = document.createElement("button");
            btnUp.className = "pdf-action-btn";
            btnUp.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="18 15 12 9 6 15"></polyline></svg>`;
            btnUp.addEventListener("click", () => {
                if (index > 0) {
                    const temp = pdfQueue[index];
                    pdfQueue[index] = pdfQueue[index - 1];
                    pdfQueue[index - 1] = temp;
                    renderPdfList();
                }
            });

            // Down button
            const btnDown = document.createElement("button");
            btnDown.className = "pdf-action-btn";
            btnDown.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"></polyline></svg>`;
            btnDown.addEventListener("click", () => {
                if (index < pdfQueue.length - 1) {
                    const temp = pdfQueue[index];
                    pdfQueue[index] = pdfQueue[index + 1];
                    pdfQueue[index + 1] = temp;
                    renderPdfList();
                }
            });

            // Split Selection Indicator
            const btnSelect = document.createElement("button");
            btnSelect.className = `pdf-action-btn ${selectedSplitFile && selectedSplitFile.id === item.id ? 'active' : ''}`;
            btnSelect.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="9" y1="3" x2="9" y2="21"></line></svg>`;
            btnSelect.title = "분할용 파일로 선택";
            btnSelect.addEventListener("click", () => {
                selectFileForSplit(item);
                renderPdfList();
            });

            // Delete button
            const btnDel = document.createElement("button");
            btnDel.className = "pdf-action-btn delete";
            btnDel.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>`;
            btnDel.addEventListener("click", () => {
                pdfQueue.splice(index, 1);
                if (selectedSplitFile && selectedSplitFile.id === item.id) {
                    selectedSplitFile = pdfQueue.length > 0 ? pdfQueue[0] : null;
                    if (selectedSplitFile) selectFileForSplit(selectedSplitFile);
                }
                if (pdfQueue.length === 0) {
                    pdfWorkspace.style.display = "none";
                } else {
                    renderPdfList();
                }
            });

            actions.appendChild(btnUp);
            actions.appendChild(btnDown);
            actions.appendChild(btnSelect);
            actions.appendChild(btnDel);
            
            fItem.appendChild(label);
            fItem.appendChild(actions);
            pdfMergeList.appendChild(fItem);
        });
    }

    function selectFileForSplit(pdfItem) {
        selectedSplitFile = pdfItem;
        pdfSplitFilename.textContent = pdfItem.name;
        pdfSplitPagecount.textContent = `총 페이지 수: ${pdfItem.pageCount} pages`;
        pdfSplitRangeInput.placeholder = `예: 1-3, 5 (최대 ${pdfItem.pageCount}p)`;
    }

    // Toggle Modes
    btnModeMerge.addEventListener("click", () => {
        pdfToolMode = "merge";
        btnModeMerge.classList.add("active");
        btnModeMerge.classList.remove("btn-secondary");
        btnModeMerge.classList.add("btn-primary");
        
        btnModeSplit.classList.remove("active");
        btnModeSplit.classList.add("btn-secondary");
        btnModeSplit.classList.remove("btn-primary");
        
        pdfMergeContainer.style.display = "block";
        pdfSplitContainer.style.display = "none";
    });

    btnModeSplit.addEventListener("click", () => {
        pdfToolMode = "split";
        btnModeSplit.classList.add("active");
        btnModeSplit.classList.remove("btn-secondary");
        btnModeSplit.classList.add("btn-primary");
        
        btnModeMerge.classList.remove("active");
        btnModeMerge.classList.add("btn-secondary");
        btnModeMerge.classList.remove("btn-primary");
        
        pdfMergeContainer.style.display = "none";
        pdfSplitContainer.style.display = "block";
    });

    // Merge Action
    btnRunMerge.addEventListener("click", async () => {
        if (pdfQueue.length < 2) {
            alert("병합할 PDF 파일을 최소 2개 이상 등록해 주세요.");
            return;
        }
        
        btnRunMerge.disabled = true;
        btnRunMerge.textContent = "PDF 파일 병합 중...";
        
        try {
            const mergedPdf = await PDFLib.PDFDocument.create();
            for (const item of pdfQueue) {
                const srcPdf = await PDFLib.PDFDocument.load(item.buffer);
                const copiedPages = await mergedPdf.copyPages(srcPdf, srcPdf.getPageIndices());
                copiedPages.forEach((page) => mergedPdf.addPage(page));
            }
            
            const mergedPdfBytes = await mergedPdf.save();
            const blob = new Blob([mergedPdfBytes], { type: 'application/pdf' });
            triggerDownload(blob, "merged_document.pdf");
        } catch (err) {
            alert(`병합 오류: ${err.message}`);
        } finally {
            btnRunMerge.disabled = false;
            btnRunMerge.textContent = "PDF 병합하여 다운로드";
        }
    });

    // Split Action
    btnRunSplit.addEventListener("click", async () => {
        if (!selectedSplitFile) {
            alert("분할할 PDF 파일을 선택해 주세요.");
            return;
        }
        
        const rangeText = pdfSplitRangeInput.value.trim();
        if (!rangeText) {
            alert("추출할 페이지 범위를 입력해 주세요. (예: 1-2, 4)");
            return;
        }
        
        const pageIndices = parsePageRange(rangeText, selectedSplitFile.pageCount);
        if (pageIndices.length === 0) {
            alert("올바른 페이지 범위를 지정해 주세요.");
            return;
        }

        btnRunSplit.disabled = true;
        btnRunSplit.textContent = "페이지 분할 추출 중...";

        try {
            const srcPdf = await PDFLib.PDFDocument.load(selectedSplitFile.buffer);
            const splitPdf = await PDFLib.PDFDocument.create();
            
            const copiedPages = await splitPdf.copyPages(srcPdf, pageIndices);
            copiedPages.forEach((page) => splitPdf.addPage(page));
            
            const splitBytes = await splitPdf.save();
            const blob = new Blob([splitBytes], { type: 'application/pdf' });
            triggerDownload(blob, `extracted_${selectedSplitFile.name}`);
        } catch (err) {
            alert(`분할 추출 오류: ${err.message}`);
        } finally {
            btnRunSplit.disabled = false;
            btnRunSplit.textContent = "지정된 페이지 분할 다운로드";
        }
    });

    function parsePageRange(rangeStr, maxPages) {
        const indices = [];
        const parts = rangeStr.replace(/\s+/g, "").split(",");
        
        for (const part of parts) {
            if (part.includes("-")) {
                const limit = part.split("-");
                const start = parseInt(limit[0]);
                const end = parseInt(limit[1]);
                
                if (!isNaN(start) && !isNaN(end) && start > 0 && end >= start && end <= maxPages) {
                    for (let i = start; i <= end; i++) {
                        // pdf-lib index is 0-based
                        indices.push(i - 1); 
                    }
                }
            } else {
                const val = parseInt(part);
                if (!isNaN(val) && val > 0 && val <= maxPages) {
                    indices.push(val - 1);
                }
            }
        }
        // Deduplicate and sort indices
        return [...new Set(indices)].sort((a, b) => a - b);
    }

    function triggerDownload(blob, filename) {
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    // -------------------------------------------------------------
    // Module 3: Image to PDF (PNG / JPG ➔ PDF)
    // -------------------------------------------------------------
    imageDropzone.addEventListener("click", () => imageFileInput.click());
    imageDropzone.addEventListener("dragover", (e) => {
        e.preventDefault();
        imageDropzone.classList.add("dragover");
    });
    imageDropzone.addEventListener("dragleave", () => {
        imageDropzone.classList.remove("dragover");
    });
    imageDropzone.addEventListener("drop", (e) => {
        e.preventDefault();
        imageDropzone.classList.remove("dragover");
        if (e.dataTransfer.files.length > 0) {
            handleImageFiles(e.dataTransfer.files);
        }
    });
    imageFileInput.addEventListener("change", (e) => {
        if (e.target.files.length > 0) {
            handleImageFiles(e.target.files);
        }
    });

    async function handleImageFiles(files) {
        for (const file of files) {
            const ext = file.name.toLowerCase();
            if (!ext.endsWith(".png") && !ext.endsWith(".jpg") && !ext.endsWith(".jpeg")) {
                alert(`이미지 파일만 업로드 가능합니다: ${file.name}`);
                continue;
            }

            try {
                const dataURL = await readFileAsDataURL(file);
                imageQueue.push({
                    id: Date.now() + Math.random(),
                    name: file.name,
                    dataURL: dataURL
                });
            } catch (err) {
                alert(`이미지 로드 실패: ${file.name}`);
            }
        }

        imageWorkspace.style.display = "block";
        renderImageGrid();
    }

    function readFileAsDataURL(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (e) => resolve(e.target.result);
            reader.onerror = () => reject();
            reader.readAsDataURL(file);
        });
    }

    function renderImageGrid() {
        imagePreviewGrid.innerHTML = "";
        
        imageQueue.forEach((item, index) => {
            const card = document.createElement("div");
            card.className = "image-preview-item";
            
            const img = document.createElement("img");
            img.src = item.dataURL;
            img.className = "image-preview-thumbnail";
            
            const actions = document.createElement("div");
            actions.className = "image-preview-actions";
            
            const btnLeft = document.createElement("button");
            btnLeft.className = "img-preview-btn";
            btnLeft.textContent = "◀";
            btnLeft.addEventListener("click", () => {
                if (index > 0) {
                    const temp = imageQueue[index];
                    imageQueue[index] = imageQueue[index - 1];
                    imageQueue[index - 1] = temp;
                    renderImageGrid();
                }
            });

            const btnRight = document.createElement("button");
            btnRight.className = "img-preview-btn";
            btnRight.textContent = "▶";
            btnRight.addEventListener("click", () => {
                if (index < imageQueue.length - 1) {
                    const temp = imageQueue[index];
                    imageQueue[index] = imageQueue[index + 1];
                    imageQueue[index + 1] = temp;
                    renderImageGrid();
                }
            });

            const btnDel = document.createElement("button");
            btnDel.className = "img-preview-btn delete";
            btnDel.textContent = "🗑️";
            btnDel.addEventListener("click", () => {
                imageQueue.splice(index, 1);
                if (imageQueue.length === 0) {
                    imageWorkspace.style.display = "none";
                } else {
                    renderImageGrid();
                }
            });

            actions.appendChild(btnLeft);
            actions.appendChild(btnRight);
            actions.appendChild(btnDel);
            
            card.appendChild(img);
            card.appendChild(actions);
            imagePreviewGrid.appendChild(card);
        });
    }

    // Convert Images to PDF via html2pdf dynamically
    btnRunImagePdf.addEventListener("click", async () => {
        if (imageQueue.length === 0) return;

        btnRunImagePdf.disabled = true;
        btnRunImagePdf.textContent = "이미지를 PDF로 병합하는 중...";

        try {
            const isLandscape = imagePdfOrientation.value === "landscape";
            const marginOption = imagePdfMargin.value;
            
            const marginPx = marginOption === "none" ? 0 : (marginOption === "narrow" ? 20 : 40);
            
            // Build temporary page container
            const container = document.createElement("div");
            container.style.position = "absolute";
            container.style.left = "-9999px";
            container.style.top = "-9999px";
            document.body.appendChild(container);

            imageQueue.forEach((imgItem, idx) => {
                const page = document.createElement("div");
                page.style.width = isLandscape ? "297mm" : "210mm";
                page.style.height = isLandscape ? "210mm" : "297mm";
                page.style.display = "flex";
                page.style.alignItems = "center";
                page.style.justifyContent = "center";
                page.style.padding = `${marginPx}px`;
                page.style.boxSizing = "border-box";
                page.style.backgroundColor = "white";
                
                if (idx < imageQueue.length - 1) {
                    page.style.pageBreakAfter = "always";
                }

                const img = document.createElement("img");
                img.src = imgItem.dataURL;
                img.style.maxWidth = "100%";
                img.style.maxHeight = "100%";
                img.style.objectFit = "contain";
                img.style.display = "block";

                page.appendChild(img);
                container.appendChild(page);
            });

            const opt = {
                margin: 0,
                filename: `images_converted.pdf`,
                image: { type: 'jpeg', quality: 0.98 },
                html2canvas: { scale: 2.0, useCORS: true, letterRendering: true },
                jsPDF: { unit: 'mm', format: 'a4', orientation: isLandscape ? 'landscape' : 'portrait' }
            };

            await html2pdf().from(container).set(opt).save();
            document.body.removeChild(container);
        } catch (e) {
            alert(`이미지 변환 실패: ${e.message}`);
        } finally {
            btnRunImagePdf.disabled = false;
            btnRunImagePdf.textContent = "PDF 파일로 일괄 변환 다운로드";
        }
    });

    // -------------------------------------------------------------
    // Sharing Widget Event Handlers
    // -------------------------------------------------------------
    btnShareKakao.addEventListener("click", () => {
        alert("카카오톡 공유 링크가 생성되었습니다. [확인]을 누르시면 링크가 복사됩니다. 친구나 직장 동료에게 공유해 보세요!");
        copyShareLink();
    });

    btnShareLink.addEventListener("click", () => {
        copyShareLink();
    });

    function copyShareLink() {
        const dummy = document.createElement('input');
        const text = window.location.href;
        document.body.appendChild(dummy);
        dummy.value = text;
        dummy.select();
        
        try {
            document.execCommand('copy');
            alert("링크가 클립보드에 안전하게 복사되었습니다! 카카오톡이나 메시지 창에 붙여넣어 공유하세요.");
        } catch (err) {
            alert("링크 복사에 실패했습니다. 브라우저 주소창의 주소를 직접 복사해 주세요.");
        } finally {
            document.body.removeChild(dummy);
        }
    }
});
