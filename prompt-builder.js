/**
 * KREA STYLES & PROMPT BUILDER — Prompt Builder Module
 * Manages multiple Style inputs (+1, reorder, remove), unified Prompt input,
 * Image Title generator, live preview concatenation, and drawer interactions.
 */

// ==============================================
// PROMPT BUILDER STATE
// ==============================================

let builderState = {
    styles: [
        { id: 'style-1', prompt: '', name: '', type: 'style', weight: 1.0, defaultWeight: 1.0 }
    ],
    prompt: '',
    title: '',
    includeStylesInTitle: true,
    resolution: {
        width: 1000,
        height: 1000,
        mp: '1',
        aspectRatio: '1:1'
    }
};

let styleIdCounter = 1;

// ==============================================
// HELPER UTILITIES
// ==============================================

function escapeHtml(text) {
    if (!text) return '';
    return String(text)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
}

// ==============================================
// MULTI-STYLE BOX MANAGEMENT
// ==============================================

/**
 * Renders all style text boxes into #style-boxes-container
 */
function renderStyleBoxes() {
    const container = document.getElementById('style-boxes-container');
    if (!container) return;

    const total = builderState.styles.length;
    container.classList.toggle('has-multiple-styles', total > 1);
    container.classList.toggle('single-style', total <= 1);

    container.innerHTML = builderState.styles.map((style, index) => {
        const isLatest = index === total - 1;
        const boxNumber = index + 1;
        const hasContent = (style.prompt || '').trim().length > 0;

        return `
            <div class="style-box-item ${isLatest ? 'is-active-target' : ''}" data-style-index="${index}">
                <div class="style-box-header">
                    <div class="style-box-header-left" ${total <= 1 ? 'style="display:none;"' : ''}>
                        <span class="style-box-number">Style ${boxNumber}</span>
                        ${style.name ? `<span class="style-name-badge ${style.type === 'lora' ? 'is-lora' : ''}" title="${style.type === 'lora' ? 'Selected LoRA' : 'Selected style'}: ${escapeHtml(style.name)}">${escapeHtml(style.name)}</span>` : ''}
                        ${isLatest ? `<span class="style-target-badge" title="Card clicks from gallery will populate this box">Active</span>` : ''}
                    </div>
                    <div class="style-box-actions" ${total <= 1 ? 'style="margin-left: auto;"' : ''}>
                        <button type="button" class="btn-style-order btn-move-up" data-index="${index}" title="Move Up" ${index === 0 ? 'disabled' : ''} ${total <= 1 ? 'style="display:none;"' : ''}>▲</button>
                        <button type="button" class="btn-style-order btn-move-down" data-index="${index}" title="Move Down" ${index === total - 1 ? 'disabled' : ''} ${total <= 1 ? 'style="display:none;"' : ''}>▼</button>
                        <button type="button" class="btn-clear-style ${hasContent ? 'has-content' : ''}" data-index="${index}" title="Clear this style">Clear</button>
                        <button type="button" class="btn-remove-style" data-index="${index}" title="Remove this style box" ${total <= 1 ? 'style="display:none;"' : ''}>×</button>
                    </div>
                </div>
                <div class="textarea-resize-wrapper">
                    <textarea class="style-textarea" data-index="${index}" rows="4" placeholder="Style prompt or LoRA trigger words...">${escapeHtml(style.prompt)}</textarea>
                    <div class="textarea-resize-handle"></div>
                </div>
            </div>
        `;
    }).join('');

    // Attach event listeners to textareas
    container.querySelectorAll('.style-textarea').forEach(textarea => {
        textarea.addEventListener('input', (e) => {
            const idx = parseInt(e.target.dataset.index, 10);
            if (builderState.styles[idx]) {
                builderState.styles[idx].prompt = e.target.value;
                updatePromptOutputPreview();
                updateTitleOutput();

                const boxItem = e.target.closest('.style-box-item');
                const clearBtn = boxItem ? boxItem.querySelector('.btn-clear-style') : null;
                if (clearBtn) {
                    clearBtn.classList.toggle('has-content', e.target.value.trim().length > 0);
                }
            }
        });
    });

    // Move Up
    container.querySelectorAll('.btn-move-up').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const idx = parseInt(btn.dataset.index, 10);
            moveStyleBox(idx, -1);
        });
    });

    // Move Down
    container.querySelectorAll('.btn-move-down').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const idx = parseInt(btn.dataset.index, 10);
            moveStyleBox(idx, 1);
        });
    });

    // Clear individual style box
    container.querySelectorAll('.btn-clear-style').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const idx = parseInt(btn.dataset.index, 10);
            if (builderState.styles[idx]) {
                builderState.styles[idx].prompt = '';
                builderState.styles[idx].name = '';
                renderStyleBoxes();
                updatePromptOutputPreview();
                updateTitleOutput();
            }
        });
    });

    // Remove individual style box
    container.querySelectorAll('.btn-remove-style').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const idx = parseInt(btn.dataset.index, 10);
            removeStyleBox(idx);
        });
    });

    // Initialize custom resize handles inside style boxes
    initResizeHandles(container);

    // Sync LoRA weights section with active LoRAs
    updateLoraWeightsSection();
}

/**
 * Add a new blank style box (+1)
 */
function addStyleBox() {
    styleIdCounter++;
    const newStyle = {
        id: `style-${Date.now()}-${styleIdCounter}`,
        prompt: '',
        name: '',
        type: 'style',
        weight: 1.0,
        defaultWeight: 1.0
    };
    builderState.styles.push(newStyle);
    renderStyleBoxes();

    // Focus and scroll to the new textarea
    const container = document.getElementById('style-boxes-container');
    if (container) {
        const textareas = container.querySelectorAll('.style-textarea');
        const lastTextarea = textareas[textareas.length - 1];
        if (lastTextarea) {
            lastTextarea.focus();
            lastTextarea.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
    }

    updatePromptOutputPreview();
    updateTitleOutput();
    if (typeof showToast === 'function') {
        showToast(`STYLE ${builderState.styles.length} ADDED`);
    }
}

/**
 * Remove a style box by index (minimum 1 box remains)
 */
function removeStyleBox(index) {
    if (builderState.styles.length <= 1) return;
    builderState.styles.splice(index, 1);
    renderStyleBoxes();
    updatePromptOutputPreview();
    updateTitleOutput();
    if (typeof showToast === 'function') {
        showToast('STYLE BOX REMOVED');
    }
}

/**
 * Move a style box up (-1) or down (+1) in the order
 */
function moveStyleBox(index, direction) {
    const targetIndex = index + direction;
    if (targetIndex < 0 || targetIndex >= builderState.styles.length) return;

    const temp = builderState.styles[index];
    builderState.styles[index] = builderState.styles[targetIndex];
    builderState.styles[targetIndex] = temp;

    renderStyleBoxes();
    updatePromptOutputPreview();
    updateTitleOutput();
}

/**
 * Append or update style in builder (invoked from gallery cards, LoRA cards, lightbox)
 * Only the latest scene-style text box is edited when clicking on any style or LoRA.
 */
function appendStyleToBuilder(promptText, styleName = '', styleType = 'style') {
    if (builderState.styles.length === 0) {
        builderState.styles.push({ id: `style-${Date.now()}`, prompt: '', name: '', type: styleType, weight: 1.0, defaultWeight: 1.0 });
    }

    const lastIndex = builderState.styles.length - 1;
    builderState.styles[lastIndex].prompt = promptText;
    builderState.styles[lastIndex].name = styleName;
    builderState.styles[lastIndex].type = styleType;

    const isLora = styleType === 'lora' || isLoraEntry(builderState.styles[lastIndex]);
    if (isLora) {
        builderState.styles[lastIndex].type = 'lora';
        const defWeight = getLoraDefaultWeight(styleName);
        builderState.styles[lastIndex].weight = defWeight;
        builderState.styles[lastIndex].defaultWeight = defWeight;
    }

    renderStyleBoxes();
    updatePromptOutputPreview();
    updateTitleOutput();
    updateLoraWeightsSection();

    // Scroll latest box into view on desktop or pulse drawer toggle on mobile
    const container = document.getElementById('style-boxes-container');
    if (container) {
        const textareas = container.querySelectorAll('.style-textarea');
        const lastTextarea = textareas[textareas.length - 1];
        if (lastTextarea && isBuilderDrawerOpen()) {
            lastTextarea.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        } else {
            pulseBuilderToggleBtn();
        }
    }
}

// ==============================================
// TITLE GENERATION & MANAGEMENT
// ==============================================

/**
 * Helper to determine if a style entry is a LoRA or a pre-trained style
 */
function isLoraEntry(styleEntry) {
    if (!styleEntry) return false;
    if (styleEntry.type === 'lora') return true;
    const name = (styleEntry.name || '').trim();
    if (name && window.LORA_DATA && Array.isArray(window.LORA_DATA)) {
        return window.LORA_DATA.some(l => l.name === name);
    }
    return false;
}

/**
 * Formats the title string as:
 * 'Title typed by the user' - 'name of style or lora 1' - 'name of style or lora 2'
 * When there is more than one style or lora on the prompt, appends a suffix:
 * (PRE-TRAINED) if it is a pre-trained style, or (LoRA) if it is a lora.
 */
function getFormattedTitle() {
    const parts = [];
    const userTitle = (builderState.title || '').trim();
    if (userTitle) {
        parts.push(userTitle);
    }

    if (builderState.includeStylesInTitle) {
        const namedStyles = builderState.styles.filter(s => (s.name || '').trim().length > 0);
        const hasMultiple = namedStyles.length > 1;

        namedStyles.forEach(s => {
            const rawName = s.name.trim();
            const isLora = isLoraEntry(s);
            const suffix = hasMultiple ? (isLora ? ' (LoRA)' : ' (PRE-TRAINED)') : '';
            const displayName = rawName + suffix;

            if (!parts.includes(displayName)) {
                parts.push(displayName);
            }
        });
    }

    return parts.join(' - ');
}

/**
 * Updates the #title-formatted-output display with formatted token badges
 */
function updateTitleOutput() {
    const outputElem = document.getElementById('title-formatted-output');
    if (!outputElem) return;

    const title = getFormattedTitle();
    const userTitle = (builderState.title || '').trim();

    const namedStyles = builderState.includeStylesInTitle
        ? builderState.styles.filter(s => (s.name || '').trim().length > 0)
        : [];
    const hasMultiple = namedStyles.length > 1;

    if (!title) {
        outputElem.innerHTML = `<span class="title-placeholder">Type a custom title or select styles above...</span>`;
        return;
    }

    let html = '';
    let hasPreceding = false;

    if (userTitle) {
        html += `<span class="title-token title-token-user" title="Custom title">${escapeHtml(userTitle)}</span>`;
        hasPreceding = true;
    }

    const seenNames = new Set();
    namedStyles.forEach(s => {
        const rawName = s.name.trim();
        const isLora = isLoraEntry(s);
        const suffix = hasMultiple ? (isLora ? ' (LoRA)' : ' (PRE-TRAINED)') : '';
        const fullDisplay = rawName + suffix;

        if (seenNames.has(fullDisplay) || fullDisplay === userTitle) return;
        seenNames.add(fullDisplay);

        if (hasPreceding) {
            html += `<span class="title-token-sep">-</span>`;
        }

        const tokenTypeClass = isLora ? 'title-token-lora' : 'title-token-style';
        const typeLabel = isLora ? 'LoRA' : 'Pre-Trained Style';

        html += `<span class="title-token ${tokenTypeClass}" title="${typeLabel}">${escapeHtml(rawName)}${suffix ? `<span class="title-token-suffix">${escapeHtml(suffix)}</span>` : ''}</span>`;
        hasPreceding = true;
    });

    outputElem.innerHTML = html;
}

/**
 * Copies the formatted title to clipboard
 */
async function handleCopyTitle() {
    const titleText = getFormattedTitle();
    if (!titleText) {
        if (typeof showToast === 'function') showToast('NO TITLE CONTENT TO COPY');
        return;
    }

    let success = false;
    if (typeof copyToClipboard === 'function') {
        success = await copyToClipboard(titleText);
    } else {
        try {
            await navigator.clipboard.writeText(titleText);
            success = true;
        } catch {
            success = false;
        }
    }

    if (success) {
        const displayBox = document.getElementById('title-display-box');
        const badgeSpan = displayBox ? displayBox.querySelector('.title-copy-badge span') : null;
        if (displayBox) displayBox.classList.add('copied');
        if (badgeSpan) badgeSpan.textContent = 'Copied!';
        setTimeout(() => {
            if (displayBox) displayBox.classList.remove('copied');
            if (badgeSpan) badgeSpan.textContent = 'Copy';
        }, 1500);
    }

    if (typeof showToast === 'function') {
        showToast(success ? 'TITLE COPIED TO CLIPBOARD!' : 'COPY FAILED');
    }
}

// ==============================================
// RESOLUTION LOOKUP TABLE & MANAGEMENT
// ==============================================

const RESOLUTION_TABLE = {
    '0.5': {
        '4:3':  { width: 816,  height: 612 },
        '3:4':  { width: 612,  height: 816 },
        '16:9': { width: 943,  height: 530 },
        '9:16': { width: 530,  height: 943 },
        '1:1':  { width: 707,  height: 707 },
        '3:2':  { width: 866,  height: 577 },
        '2:3':  { width: 577,  height: 866 }
    },
    '1': {
        '4:3':  { width: 1155, height: 866 },
        '3:4':  { width: 866,  height: 1155 },
        '16:9': { width: 1333, height: 750 },
        '9:16': { width: 750,  height: 1333 },
        '1:1':  { width: 1000, height: 1000 },
        '3:2':  { width: 1225, height: 816 },
        '2:3':  { width: 816,  height: 1225 }
    },
    '1.5': {
        '4:3':  { width: 1414, height: 1061 },
        '3:4':  { width: 1061, height: 1414 },
        '16:9': { width: 1633, height: 919 },
        '9:16': { width: 919,  height: 1633 },
        '1:1':  { width: 1225, height: 1225 },
        '3:2':  { width: 1500, height: 1000 },
        '2:3':  { width: 1000, height: 1500 }
    },
    '2': {
        '4:3':  { width: 1633, height: 1225 },
        '3:4':  { width: 1225, height: 1633 },
        '16:9': { width: 1886, height: 1061 },
        '9:16': { width: 1061, height: 1886 },
        '1:1':  { width: 1414, height: 1414 },
        '3:2':  { width: 1732, height: 1155 },
        '2:3':  { width: 1155, height: 1732 }
    },
    '3': {
        '4:3':  { width: 2000, height: 1500 },
        '3:4':  { width: 1500, height: 2000 },
        '16:9': { width: 2309, height: 1299 },
        '9:16': { width: 1299, height: 2309 },
        '1:1':  { width: 1732, height: 1732 },
        '3:2':  { width: 2121, height: 1414 },
        '2:3':  { width: 1414, height: 2121 }
    },
    '4': {
        '4:3':  { width: 2309, height: 1732 },
        '3:4':  { width: 1732, height: 2309 },
        '16:9': { width: 2667, height: 1500 },
        '9:16': { width: 1500, height: 2667 },
        '1:1':  { width: 2000, height: 2000 },
        '3:2':  { width: 2449, height: 1633 },
        '2:3':  { width: 1633, height: 2449 }
    },
    '10': {
        '4:3':  { width: 3651, height: 2739 },
        '3:4':  { width: 2739, height: 3651 },
        '16:9': { width: 4216, height: 2372 },
        '9:16': { width: 2372, height: 4216 },
        '1:1':  { width: 3162, height: 3162 },
        '3:2':  { width: 3873, height: 2582 },
        '2:3':  { width: 2582, height: 3873 }
    }
};

/**
 * Updates the resolution summary badge (e.g. "1.00 MP • 1000 × 1000")
 */
function updateResolutionSummary() {
    const badge = document.getElementById('res-summary-badge');
    if (!badge) return;

    const w = parseInt(builderState.resolution.width, 10) || 0;
    const h = parseInt(builderState.resolution.height, 10) || 0;
    const mp = ((w * h) / 1000000).toFixed(2);

    badge.textContent = `${mp} MP • ${w} × ${h}`;
}

/**
 * Apply selected MP and Aspect Ratio from parameters table
 */
function applyResolutionParams(mp, ar) {
    if (!RESOLUTION_TABLE[mp] || !RESOLUTION_TABLE[mp][ar]) return;

    const { width, height } = RESOLUTION_TABLE[mp][ar];
    builderState.resolution.mp = mp;
    builderState.resolution.aspectRatio = ar;
    builderState.resolution.width = width;
    builderState.resolution.height = height;

    const widthInput = document.getElementById('res-width-input');
    const heightInput = document.getElementById('res-height-input');
    if (widthInput) widthInput.value = width;
    if (heightInput) heightInput.value = height;

    updateResolutionChipStates();
    updateResolutionSummary();
}

/**
 * Sync active classes on MP and Aspect Ratio chip buttons
 */
function updateResolutionChipStates() {
    const mpChips = document.querySelectorAll('#res-mp-chips .res-chip');
    mpChips.forEach(chip => {
        chip.classList.toggle('active', chip.dataset.mp === builderState.resolution.mp);
    });

    const arChips = document.querySelectorAll('#res-ar-chips .res-chip');
    arChips.forEach(chip => {
        chip.classList.toggle('active', chip.dataset.ar === builderState.resolution.aspectRatio);
    });
}

/**
 * Handle manual width or height typing by user
 */
function handleManualResolutionInput() {
    const widthInput = document.getElementById('res-width-input');
    const heightInput = document.getElementById('res-height-input');
    if (!widthInput || !heightInput) return;

    const w = parseInt(widthInput.value, 10) || 0;
    const h = parseInt(heightInput.value, 10) || 0;

    builderState.resolution.width = w;
    builderState.resolution.height = h;

    // Check if (w, h) matches any preset in RESOLUTION_TABLE
    let matchedMp = null;
    let matchedAr = null;

    for (const [mpKey, arMap] of Object.entries(RESOLUTION_TABLE)) {
        for (const [arKey, dims] of Object.entries(arMap)) {
            if (dims.width === w && dims.height === h) {
                matchedMp = mpKey;
                matchedAr = arKey;
                break;
            }
        }
        if (matchedMp) break;
    }

    builderState.resolution.mp = matchedMp || '';
    builderState.resolution.aspectRatio = matchedAr || '';

    updateResolutionChipStates();
    updateResolutionSummary();
}

/**
 * Swap Width and Height
 */
function swapResolution() {
    const widthInput = document.getElementById('res-width-input');
    const heightInput = document.getElementById('res-height-input');
    if (!widthInput || !heightInput) return;

    const currentW = parseInt(widthInput.value, 10) || 0;
    const currentH = parseInt(heightInput.value, 10) || 0;

    widthInput.value = currentH;
    heightInput.value = currentW;

    // Invert aspect ratio if it exists in pair
    const AR_INVERSIONS = {
        '16:9': '9:16',
        '9:16': '16:9',
        '4:3': '3:4',
        '3:4': '4:3',
        '3:2': '2:3',
        '2:3': '3:2',
        '1:1': '1:1'
    };

    if (builderState.resolution.aspectRatio && AR_INVERSIONS[builderState.resolution.aspectRatio]) {
        builderState.resolution.aspectRatio = AR_INVERSIONS[builderState.resolution.aspectRatio];
    }

    handleManualResolutionInput();
}

/**
 * Initialize Resolution controls and event listeners
 */
function initResolutionSection() {
    const widthInput = document.getElementById('res-width-input');
    const heightInput = document.getElementById('res-height-input');
    const swapBtn = document.getElementById('btn-swap-resolution');

    if (widthInput) {
        widthInput.addEventListener('input', handleManualResolutionInput);
    }
    if (heightInput) {
        heightInput.addEventListener('input', handleManualResolutionInput);
    }
    if (swapBtn) {
        swapBtn.addEventListener('click', swapResolution);
    }

    // MP chips
    const mpContainer = document.getElementById('res-mp-chips');
    if (mpContainer) {
        mpContainer.addEventListener('click', (e) => {
            const chip = e.target.closest('.res-chip');
            if (!chip) return;
            const mp = chip.dataset.mp;
            const ar = builderState.resolution.aspectRatio || '1:1';
            applyResolutionParams(mp, ar);
        });
    }

    // Aspect Ratio chips
    const arContainer = document.getElementById('res-ar-chips');
    if (arContainer) {
        arContainer.addEventListener('click', (e) => {
            const chip = e.target.closest('.res-chip');
            if (!chip) return;
            const ar = chip.dataset.ar;
            const mp = builderState.resolution.mp || '1';
            applyResolutionParams(mp, ar);
        });
    }

    // Random seed button
    const randomSeedBtn = document.getElementById('btn-random-seed');
    const seedInput = document.getElementById('seed-input');
    if (randomSeedBtn && seedInput) {
        randomSeedBtn.addEventListener('click', () => {
            const randomSeed = Math.floor(Math.random() * 10000000000);
            seedInput.value = randomSeed;
        });
    }

    updateResolutionChipStates();
    updateResolutionSummary();
}

// ==============================================
// LORA WEIGHT SECTION & MANAGEMENT
// ==============================================

/**
 * Returns default weight for a given LoRA name from window.LORA_DATA
 */
function getLoraDefaultWeight(loraName) {
    if (window.LORA_DATA && Array.isArray(window.LORA_DATA)) {
        const found = window.LORA_DATA.find(l => l.name === loraName);
        if (found && typeof found.weight === 'number') {
            return found.weight;
        }
    }
    return 1.0;
}

/**
 * Updates the LoRA Weight card visibility and renders rows for active LoRAs
 */
function updateLoraWeightsSection() {
    const card = document.getElementById('lora-weight-card');
    const container = document.getElementById('lora-weights-container');
    if (!card || !container) return;

    // Filter active styles that are LoRAs with a name or prompt
    const activeLoras = builderState.styles.filter(s => {
        const hasContent = (s.name || s.prompt || '').trim().length > 0;
        return hasContent && isLoraEntry(s);
    });

    if (activeLoras.length === 0) {
        card.style.display = 'none';
        container.innerHTML = '';
        return;
    }

    card.style.display = 'flex';

    // Render rows for each active LoRA
    container.innerHTML = activeLoras.map(style => {
        const defWeight = (typeof style.defaultWeight === 'number') ? style.defaultWeight : getLoraDefaultWeight(style.name);
        const curWeight = (typeof style.weight === 'number') ? style.weight : defWeight;
        style.weight = curWeight;
        style.defaultWeight = defWeight;

        return `
            <div class="lora-weight-row" data-style-id="${style.id}">
                <div class="lora-weight-info">
                    <span class="lora-weight-badge">LoRA</span>
                    <span class="lora-weight-name" title="${escapeHtml(style.name || 'Custom LoRA')}">${escapeHtml(style.name || 'Custom LoRA')}</span>
                </div>
                <div class="lora-weight-controls">
                    <input type="range" class="lora-weight-slider" data-style-id="${style.id}"
                        min="0.1" max="2.0" step="0.05" value="${curWeight}">
                    <input type="number" class="lora-weight-input" data-style-id="${style.id}"
                        min="0.1" max="2.0" step="0.05" value="${curWeight}">
                    <button type="button" class="btn-reset-weight" data-style-id="${style.id}" title="Reset to default (${defWeight})">↺</button>
                </div>
            </div>
        `;
    }).join('');

    // Attach event listeners for each row
    activeLoras.forEach(style => {
        const row = container.querySelector(`.lora-weight-row[data-style-id="${style.id}"]`);
        if (!row) return;

        const slider = row.querySelector('.lora-weight-slider');
        const numInput = row.querySelector('.lora-weight-input');
        const resetBtn = row.querySelector('.btn-reset-weight');

        if (slider && numInput) {
            slider.addEventListener('input', (e) => {
                const val = parseFloat(e.target.value);
                numInput.value = val;
                style.weight = val;
            });

            numInput.addEventListener('input', (e) => {
                let val = parseFloat(e.target.value);
                if (isNaN(val)) return;
                val = Math.max(0.1, Math.min(2.0, val));
                slider.value = val;
                style.weight = val;
            });

            numInput.addEventListener('change', (e) => {
                let val = parseFloat(e.target.value);
                if (isNaN(val)) val = style.defaultWeight || 1.0;
                val = Math.max(0.1, Math.min(2.0, val));
                numInput.value = val;
                slider.value = val;
                style.weight = val;
            });
        }

        if (resetBtn) {
            resetBtn.addEventListener('click', () => {
                const defVal = (typeof style.defaultWeight === 'number') ? style.defaultWeight : getLoraDefaultWeight(style.name);
                style.weight = defVal;
                if (slider) slider.value = defVal;
                if (numInput) numInput.value = defVal;
            });
        }
    });
}

// ==============================================
// PROMPT OUTPUT CONCATENATION
// ==============================================

/**
 * Build final concatenated prompt string
 * Concatenates all active styles followed by the prompt content.
 */
function buildPromptText() {
    let lines = [];

    // Collect all non-empty style prompts in current order
    const activeStyles = builderState.styles
        .map(s => (s.prompt || '').trim())
        .filter(p => p.length > 0);

    if (activeStyles.length > 0) {
        lines.push(activeStyles.join("\n\n"));
        lines.push("");
    }

    // Prompt section
    const prompt = (builderState.prompt || '').trim();
    if (prompt) {
        lines.push(prompt);
    }

    return lines.join("\n").trim();
}

/**
 * Build a comfy_queue formatted string:
 *
 * title |||
 * prompt content
 * ||| WIDTHxHEIGHT
 * ||| seed=N, steps=N
 * ||| lora_ORDER=weight,
 *     lora_ORDER=weight
 */
function buildComfyQueueText() {
    // --- Title ---
    const title = getFormattedTitle().trim();

    // --- Prompt (styles + prompt content, no separator line) ---
    const activeStyles = builderState.styles
        .map(s => (s.prompt || '').trim())
        .filter(p => p.length > 0);
    const promptContent = (builderState.prompt || '').trim();

    const promptParts = [];
    if (activeStyles.length > 0) promptParts.push(activeStyles.join('\n'));
    if (promptContent) promptParts.push(promptContent);
    const fullPrompt = promptParts.join('\n');

    // --- Resolution ---
    const w = parseInt(builderState.resolution.width, 10) || 0;
    const h = parseInt(builderState.resolution.height, 10) || 0;
    const resStr = `${w}x${h}`;

    // --- Seed & Steps ---
    const seedInput  = document.getElementById('seed-input');
    const stepsInput = document.getElementById('steps-input');
    const seed  = (seedInput  && seedInput.value.trim()  !== '') ? parseInt(seedInput.value,  10) : '';
    const steps = (stepsInput && stepsInput.value.trim() !== '') ? parseInt(stepsInput.value, 10) : 8;

    let seedStepsParts = [];
    if (seed !== '') seedStepsParts.push(`seed=${seed}`);
    seedStepsParts.push(`steps=${steps}`);
    const seedStepsStr = seedStepsParts.join(', ');

    // --- LoRAs (only entries typed as lora, with order from LORA_DATA) ---
    const loraEntries = builderState.styles.filter(s => isLoraEntry(s) && (s.name || '').trim());
    let loraLines = '';
    if (loraEntries.length > 0) {
        const loraPairs = loraEntries.map(s => {
            const loraRecord = (window.LORA_DATA && Array.isArray(window.LORA_DATA))
                ? window.LORA_DATA.find(l => l.name === s.name.trim())
                : null;
            const order  = loraRecord ? loraRecord.order : s.name.trim();
            const weight = typeof s.weight === 'number' ? s.weight : 1.0;
            return `lora_${order}=${weight}`;
        });
        // First lora on same line as ||| separator, subsequent indented
        loraLines = '\n||| ' + loraPairs[0];
        for (let i = 1; i < loraPairs.length; i++) {
            loraLines += ',\n    ' + loraPairs[i];
        }
    }

    // --- Assemble ---
    const titleLine  = title ? `${title} |||` : '|||';
    const resLine    = `||| ${resStr}`;
    const paramLine  = `||| ${seedStepsStr}`;

    return `${titleLine}\n${fullPrompt}\n${resLine}\n${paramLine}${loraLines}`.trim();
}


/**
 * Update live preview output and badges
 */
function updatePromptOutputPreview() {
    const previewElem = document.getElementById('prompt-output-preview');
    if (previewElem) {
        const text = buildPromptText();
        previewElem.textContent = text || 'Your generated prompt will appear here in real-time as you fill in details...';
    }

    // Update drawer badge status
    updateDrawerBadge();
}

/**
 * Update Drawer Floating Button Badge & Section Header Builder Badge
 */
function updateDrawerBadge() {
    const badge = document.getElementById('drawer-toggle-badge');
    const headerBadge = document.getElementById('header-builder-badge');
    const text = buildPromptText();
    const hasText = text && text.trim().length > 0;

    [badge, headerBadge].forEach(b => {
        if (!b) return;
        if (hasText) {
            b.classList.remove('hidden');
            b.textContent = 'READY';
        } else {
            b.classList.add('hidden');
        }
    });
}

/**
 * Clear All Fields in Prompt Builder
 */
function clearAllFields() {
    styleIdCounter = 1;
    builderState.styles = [
        { id: 'style-1', prompt: '', name: '' }
    ];
    builderState.prompt = '';
    builderState.title = '';

    const promptElem = document.getElementById('prompt-content');
    if (promptElem) promptElem.value = '';

    const titleInput = document.getElementById('title-user-input');
    if (titleInput) titleInput.value = '';

    renderStyleBoxes();
    updatePromptOutputPreview();
    updateTitleOutput();
    applyResolutionParams('1', '1:1');
    updateClearButtonStates(document);

    if (typeof showToast === 'function') {
        showToast('PROMPT BUILDER CLEARED');
    }
}

// ==============================================
// UTILITIES: CLEAR BUTTONS & RESIZE HANDLES
// ==============================================

/**
 * Bind clear buttons inside a container
 */
function bindClearButtons(container, onClear) {
    const root = container === document ? document : container;
    root.querySelectorAll('.btn-clear-field').forEach(btn => {
        if (btn.dataset.clearBound) return;
        btn.dataset.clearBound = 'true';

        btn.addEventListener('click', () => {
            const targetId = btn.getAttribute('data-clear-target');
            if (targetId && onClear) {
                onClear(targetId);
                btn.classList.remove('has-content');
            }
        });
    });
}

/**
 * Update clear button visibility based on field content
 */
function updateClearButtonStates(container) {
    const root = container === document ? document : container;
    root.querySelectorAll('.btn-clear-field').forEach(btn => {
        const targetId = btn.getAttribute('data-clear-target');
        const elem = document.getElementById(targetId);
        if (elem) {
            btn.classList.toggle('has-content', elem.value.trim().length > 0);
        }
    });
}

/**
 * Custom full-width bottom resize handles for textareas
 */
function initResizeHandles(container) {
    const root = container === document ? document : container;
    root.querySelectorAll('.textarea-resize-handle').forEach(handle => {
        if (handle.dataset.resizeBound) return;
        handle.dataset.resizeBound = 'true';

        const targetId = handle.getAttribute('data-resize-target');
        const textarea = targetId ? document.getElementById(targetId) : handle.closest('.textarea-resize-wrapper')?.querySelector('textarea');
        if (!textarea) return;

        // Disable browser native resize since we provide our own handle
        textarea.style.resize = 'none';

        handle.addEventListener('mousedown', (e) => {
            e.preventDefault();
            const startY = e.clientY;
            const startHeight = textarea.offsetHeight;

            handle.classList.add('active');
            document.body.style.cursor = 'ns-resize';
            document.body.style.userSelect = 'none';

            const onMouseMove = (moveEvt) => {
                const delta = moveEvt.clientY - startY;
                const newHeight = Math.max(40, startHeight + delta);
                textarea.style.height = newHeight + 'px';
            };

            const onMouseUp = () => {
                handle.classList.remove('active');
                document.body.style.cursor = '';
                document.body.style.userSelect = '';
                document.removeEventListener('mousemove', onMouseMove);
                document.removeEventListener('mouseup', onMouseUp);
            };

            document.addEventListener('mousemove', onMouseMove);
            document.addEventListener('mouseup', onMouseUp);
        });
    });
}

// ==============================================
// DRAWER MANAGEMENT
// ==============================================

function isBuilderDrawerOpen() {
    const drawer = document.getElementById('builder-section');
    return drawer ? drawer.classList.contains('drawer-open') : false;
}

function openBuilderDrawer() {
    const drawer = document.getElementById('builder-section');
    const backdrop = document.getElementById('builder-backdrop');
    const toggleBtn = document.getElementById('btn-toggle-builder-drawer');
    const headerBtn = document.getElementById('btn-header-builder-drawer');

    if (drawer) drawer.classList.add('drawer-open');
    if (backdrop) backdrop.classList.add('active');
    if (toggleBtn) toggleBtn.setAttribute('aria-expanded', 'true');
    if (headerBtn) headerBtn.setAttribute('aria-expanded', 'true');
    document.body.classList.add('drawer-open');
}

function closeBuilderDrawer() {
    const drawer = document.getElementById('builder-section');
    const backdrop = document.getElementById('builder-backdrop');
    const toggleBtn = document.getElementById('btn-toggle-builder-drawer');
    const headerBtn = document.getElementById('btn-header-builder-drawer');

    if (drawer) drawer.classList.remove('drawer-open');
    if (backdrop) backdrop.classList.remove('active');
    if (toggleBtn) toggleBtn.setAttribute('aria-expanded', 'false');
    if (headerBtn) headerBtn.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('drawer-open');
}

function toggleBuilderDrawer() {
    if (isBuilderDrawerOpen()) {
        closeBuilderDrawer();
    } else {
        openBuilderDrawer();
    }
}

function pulseBuilderToggleBtn() {
    const toggleBtn = document.getElementById('btn-toggle-builder-drawer');
    const headerBtn = document.getElementById('btn-header-builder-drawer');
    [toggleBtn, headerBtn].forEach(btn => {
        if (!btn) return;
        btn.classList.remove('pulse-anim');
        void btn.offsetWidth; // Trigger reflow to replay CSS animation
        btn.classList.add('pulse-anim');
    });
}

function initBuilderDrawer() {
    const toggleBtn = document.getElementById('btn-toggle-builder-drawer');
    const headerBtn = document.getElementById('btn-header-builder-drawer');
    const closeBtn = document.getElementById('btn-close-builder-drawer');
    const backdrop = document.getElementById('builder-backdrop');

    [toggleBtn, headerBtn].forEach(btn => {
        if (btn) {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                toggleBuilderDrawer();
            });
        }
    });

    if (closeBtn) {
        closeBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            closeBuilderDrawer();
        });
    }

    if (backdrop) {
        backdrop.addEventListener('click', () => {
            closeBuilderDrawer();
        });
    }

    // Close on Escape key
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && isBuilderDrawerOpen()) {
            closeBuilderDrawer();
        }
    });
}

// ==============================================
// INITIALIZE PROMPT BUILDER
// ==============================================

function initPromptBuilder() {
    const promptElem = document.getElementById('prompt-content');
    const titleInput = document.getElementById('title-user-input');
    const addStyleBtn = document.getElementById('btn-add-style');
    const copyTitleBtn = document.getElementById('btn-copy-title');

    // Render initial style boxes
    renderStyleBoxes();

    // +1 Style Box button
    if (addStyleBtn) {
        addStyleBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            addStyleBox();
        });
    }

    // Bind Prompt content input
    if (promptElem) {
        promptElem.addEventListener('input', (e) => {
            builderState.prompt = e.target.value;
            updatePromptOutputPreview();

            const clearBtn = document.querySelector('.btn-clear-field[data-clear-target="prompt-content"]');
            if (clearBtn) {
                clearBtn.classList.toggle('has-content', e.target.value.trim().length > 0);
            }
        });
    }

    // Bind Title input
    if (titleInput) {
        titleInput.addEventListener('input', (e) => {
            builderState.title = e.target.value;
            updateTitleOutput();

            const clearBtn = document.querySelector('.btn-clear-field[data-clear-target="title-user-input"]');
            if (clearBtn) {
                clearBtn.classList.toggle('has-content', e.target.value.trim().length > 0);
            }
        });
    }

    // Bind Include Styles Checkbox
    const includeStylesCb = document.getElementById('cb-include-styles');
    if (includeStylesCb) {
        includeStylesCb.checked = builderState.includeStylesInTitle;
        includeStylesCb.addEventListener('change', (e) => {
            builderState.includeStylesInTitle = e.target.checked;
            updateTitleOutput();
        });
    }

    // Bind Click to copy on the entire formatted title display box
    const displayBox = document.getElementById('title-display-box');
    if (displayBox) {
        displayBox.addEventListener('click', (e) => {
            e.stopPropagation();
            handleCopyTitle();
        });
    }

    // Bind Copy Title button
    if (copyTitleBtn) {
        copyTitleBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            handleCopyTitle();
        });
    }

    // Action buttons
    const clearBtn = document.getElementById('btn-clear-all');
    if (clearBtn) clearBtn.addEventListener('click', clearAllFields);

    const handleCopyPrompt = async () => {
        const promptText = buildPromptText();
        if (!promptText) {
            if (typeof showToast === 'function') showToast('NO PROMPT CONTENT TO COPY');
            return;
        }
        let success = false;
        if (typeof copyToClipboard === 'function') {
            success = await copyToClipboard(promptText);
        } else {
            try {
                await navigator.clipboard.writeText(promptText);
                success = true;
            } catch {
                success = false;
            }
        }

        if (typeof showToast === 'function') {
            showToast(success ? 'COMPLETE PROMPT COPIED TO CLIPBOARD!' : 'COPY FAILED');
        }
    };

    const copyBtn = document.getElementById('btn-copy-prompt');
    if (copyBtn) copyBtn.addEventListener('click', handleCopyPrompt);

    const copyBtnTop = document.getElementById('btn-copy-prompt-top');
    if (copyBtnTop) copyBtnTop.addEventListener('click', handleCopyPrompt);

    // Bind Copy for ComfyQueue buttons
    const handleCopyComfyQueue = async () => {
        const text = buildComfyQueueText();
        if (!text) {
            if (typeof showToast === 'function') showToast('NO PROMPT CONTENT TO COPY');
            return;
        }
        let success = false;
        if (typeof copyToClipboard === 'function') {
            success = await copyToClipboard(text);
        } else {
            try {
                await navigator.clipboard.writeText(text);
                success = true;
            } catch { success = false; }
        }
        if (typeof showToast === 'function') {
            showToast(success ? 'COMFYQUEUE PROMPT COPIED!' : 'COPY FAILED');
        }
    };

    const comfyQueueBtn = document.getElementById('btn-copy-comfy-queue');
    if (comfyQueueBtn) comfyQueueBtn.addEventListener('click', handleCopyComfyQueue);

    const comfyQueueBtnTop = document.getElementById('btn-copy-comfy-queue-top');
    if (comfyQueueBtnTop) comfyQueueBtnTop.addEventListener('click', handleCopyComfyQueue);

    // Bind Clear Buttons
    bindClearButtons(document, (targetId) => {
        const elem = document.getElementById(targetId);
        if (!elem) return;
        elem.value = '';
        if (targetId === 'prompt-content') {
            builderState.prompt = '';
            updatePromptOutputPreview();
        } else if (targetId === 'title-user-input') {
            builderState.title = '';
            updateTitleOutput();
        }
    });

    // Custom bottom resize handles
    initResizeHandles(document);

    // Initialize Resolution section
    initResolutionSection();

    // Initialize LoRA weights section
    updateLoraWeightsSection();

    // Initial update
    updatePromptOutputPreview();
    updateTitleOutput();
    updateClearButtonStates(document);
}

// Attach to window scope for global accessibility
window.builderState = builderState;
window.appendStyleToBuilder = appendStyleToBuilder;
window.addStyleBox = addStyleBox;
window.removeStyleBox = removeStyleBox;
window.moveStyleBox = moveStyleBox;
window.buildPromptText = buildPromptText;
window.getFormattedTitle = getFormattedTitle;
window.handleCopyTitle = handleCopyTitle;
window.updatePromptOutputPreview = updatePromptOutputPreview;
window.updateTitleOutput = updateTitleOutput;
window.updateDrawerBadge = updateDrawerBadge;
window.clearAllFields = clearAllFields;
window.applyResolutionParams = applyResolutionParams;
window.swapResolution = swapResolution;
window.getLoraDefaultWeight = getLoraDefaultWeight;
window.updateLoraWeightsSection = updateLoraWeightsSection;
window.initPromptBuilder = initPromptBuilder;
window.initBuilderDrawer = initBuilderDrawer;
window.openBuilderDrawer = openBuilderDrawer;
window.closeBuilderDrawer = closeBuilderDrawer;
window.toggleBuilderDrawer = toggleBuilderDrawer;
window.pulseBuilderToggleBtn = pulseBuilderToggleBtn;
window.buildComfyQueueText = buildComfyQueueText;
