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
        { id: 'style-1', prompt: '', name: '' }
    ],
    prompt: '',
    title: '',
    includeStylesInTitle: true
};

let styleIdCounter = 1;

const RANDOM_PROMPT_PRESETS = [
    "A female elf wearing an intricate embroidered kirtle, holding an ancient brass lantern with floating blue wisp, wading through still marsh water at night under dense moonlit fog.",
    "A cyberpunk bounty hunter in a weathered high-collar duster jacket, standing atop a rain-soaked neon-lit skyscraper terrace, overlooking a sprawling megacity skyline at midnight.",
    "A battle-hardened knight with scarred plate armor resting by a roaring campfire in a ruined gothic cathedral courtyard, dusk sky with aurora borealis streaks.",
    "An eccentric alchemist in a cluttered laboratory filled with glowing potions, brass astrolabes, and floating crystal shards, inspecting a glowing mystical scroll.",
    "A cosmic explorer in a white-and-gold EVA exploration suit discovering a giant bioluminescent alien flora cavern on a twilight exoplanet with dual moons.",
    "A samurai in dark lacquered armor meditating beneath falling crimson autumn maple leaves in a misty bamboo grove, early dawn light filtering through trees."
];

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
                        ${style.name ? `<span class="style-name-badge" title="Selected style: ${escapeHtml(style.name)}">${escapeHtml(style.name)}</span>` : ''}
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
}

/**
 * Add a new blank style box (+1)
 */
function addStyleBox() {
    styleIdCounter++;
    const newStyle = {
        id: `style-${Date.now()}-${styleIdCounter}`,
        prompt: '',
        name: ''
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
function appendStyleToBuilder(promptText, styleName = '') {
    if (builderState.styles.length === 0) {
        builderState.styles.push({ id: `style-${Date.now()}`, prompt: '', name: '' });
    }

    const lastIndex = builderState.styles.length - 1;
    builderState.styles[lastIndex].prompt = promptText;
    builderState.styles[lastIndex].name = styleName;

    renderStyleBoxes();
    updatePromptOutputPreview();
    updateTitleOutput();

    // Scroll latest box into view on desktop or pulse drawer toggle on mobile
    const container = document.getElementById('style-boxes-container');
    if (container) {
        const textareas = container.querySelectorAll('.style-textarea');
        const lastTextarea = textareas[textareas.length - 1];
        if (lastTextarea && window.innerWidth > 1100) {
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
 * Formats the title string as:
 * 'Title typed by the user' - 'name of style or lora 1' - 'name of style or lora 2'
 */
function getFormattedTitle() {
    const parts = [];
    const userTitle = (builderState.title || '').trim();
    if (userTitle) {
        parts.push(userTitle);
    }

    if (builderState.includeStylesInTitle) {
        // Collect all unique non-empty style/lora names in order
        builderState.styles.forEach(s => {
            const name = (s.name || '').trim();
            if (name && !parts.includes(name)) {
                parts.push(name);
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
    const styleNames = [];
    if (builderState.includeStylesInTitle) {
        builderState.styles.forEach(s => {
            const name = (s.name || '').trim();
            if (name && !styleNames.includes(name) && name !== userTitle) {
                styleNames.push(name);
            }
        });
    }

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

    styleNames.forEach(name => {
        if (hasPreceding) {
            html += `<span class="title-token-sep">-</span>`;
        }
        html += `<span class="title-token title-token-style" title="Style / LoRA">${escapeHtml(name)}</span>`;
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
    updateClearButtonStates(document);

    if (typeof showToast === 'function') {
        showToast('PROMPT BUILDER CLEARED');
    }
}

/**
 * Generate a random style and demonstration prompt
 */
function generateRandomPrompt() {
    let randPrompt = '';
    let randName = '';
    if (window.stylesData && window.stylesData.length > 0) {
        const randItem = window.stylesData[Math.floor(Math.random() * window.stylesData.length)];
        randPrompt = randItem.prompt || '';
        randName = randItem.name || '';
    }

    const chosenPreset = RANDOM_PROMPT_PRESETS[Math.floor(Math.random() * RANDOM_PROMPT_PRESETS.length)];

    styleIdCounter = 1;
    builderState.styles = [
        { id: 'style-1', prompt: randPrompt, name: randName }
    ];
    builderState.prompt = chosenPreset;

    const promptElem = document.getElementById('prompt-content');
    if (promptElem) promptElem.value = chosenPreset;

    renderStyleBoxes();
    updatePromptOutputPreview();
    updateTitleOutput();
    updateClearButtonStates(document);

    if (typeof showToast === 'function') {
        showToast('RANDOM PROMPT GENERATED');
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

    const randomBtn = document.getElementById('btn-random-prompt');
    if (randomBtn) randomBtn.addEventListener('click', generateRandomPrompt);

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
window.generateRandomPrompt = generateRandomPrompt;
window.initPromptBuilder = initPromptBuilder;
window.initBuilderDrawer = initBuilderDrawer;
window.openBuilderDrawer = openBuilderDrawer;
window.closeBuilderDrawer = closeBuilderDrawer;
window.toggleBuilderDrawer = toggleBuilderDrawer;
window.pulseBuilderToggleBtn = pulseBuilderToggleBtn;
