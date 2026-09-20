// ==============================================
// KREA STYLES & PROMPT BUILDER — App Logic
// ==============================================

// ---- Pre-Trained Styles & LoRA Datasets ----
let STYLES_DATA = [];
let LORA_DATA = [];

/**
 * Loads STYLES_DATA and LORA_DATA from external JSON files.
 */
async function loadDatasets() {
    try {
        const [stylesRes, loraRes] = await Promise.all([
            fetch('./styles-data.json'),
            fetch('./lora-data.json')
        ]);

        if (!stylesRes.ok) {
            throw new Error(`Failed to load styles-data.json (status: ${stylesRes.status})`);
        }
        if (!loraRes.ok) {
            throw new Error(`Failed to load lora-data.json (status: ${loraRes.status})`);
        }

        STYLES_DATA = await stylesRes.json();
        LORA_DATA = await loraRes.json();
        return true;
    } catch (err) {
        console.error('Error fetching datasets:', err);
        const isFileProtocol = window.location.protocol === 'file:';
        if (isFileProtocol) {
            alert('Notice: Browsers restrict fetch() on file:/// URLs due to CORS policies. Please use a local web server (such as VSCode Live Server) to load styles and LoRAs.');
        } else {
            showToast('ERROR LOADING DATASETS');
        }
        return false;
    }
}


// ---- Toast Notification System ----
let toastTimeout = null;
let toastFadeTimeout = null;

function showToast(message) {
    const toast = document.getElementById('toast');
    if (!toast) return;

    if (toastTimeout) clearTimeout(toastTimeout);
    if (toastFadeTimeout) clearTimeout(toastFadeTimeout);

    toast.classList.remove('visible', 'fading');
    toast.textContent = `✓ ${message}`;

    void toast.offsetWidth; // Force reflow
    toast.classList.add('visible');

    toastTimeout = setTimeout(() => {
        toast.classList.add('fading');
        toastFadeTimeout = setTimeout(() => {
            toast.classList.remove('visible', 'fading');
        }, 400);
    }, 1800);
}

// ---- Copy to Clipboard Utility ----
async function copyToClipboard(text) {
    try {
        await navigator.clipboard.writeText(text);
        return true;
    } catch {
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.style.position = 'fixed';
        textarea.style.left = '-9999px';
        document.body.appendChild(textarea);
        textarea.select();
        try {
            document.execCommand('copy');
            document.body.removeChild(textarea);
            return true;
        } catch {
            document.body.removeChild(textarea);
            return false;
        }
    }
}

// Export utilities globally for prompt-builder.js
window.showToast = showToast;
window.copyToClipboard = copyToClipboard;

// ==============================================
// PRE-TRAINED STYLES GALLERY
// ==============================================

let currentExpandedStyle = null;
let currentStyleTheme = 'fantasy';     // 'fantasy' | 'modern' | 'sci-fi'
let currentStyleSubstyle = 'simple';   // 'simple' | 'complex'
let currentStyleCategoryFilter = 'all';
let currentLoraCategoryFilter = 'all';
let currentStyleSearchQuery = '';
let currentLoraSearchQuery = '';

function escapeHtml(str) {
    if (!str) return '';
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
}

function updateSearchBadge(visibleCount, totalCount) {
    const badge = document.getElementById('gallery-search-badge');
    const clearBtn = document.getElementById('gallery-search-clear');
    if (!badge) return;

    const isLoraTab = document.getElementById('tab-loras')?.classList.contains('active');
    const query = isLoraTab ? currentLoraSearchQuery : currentStyleSearchQuery;

    if (query && query.trim()) {
        badge.textContent = `${visibleCount} / ${totalCount} found`;
        badge.classList.add('has-query');
        if (clearBtn) clearBtn.classList.remove('hidden');
    } else {
        badge.textContent = `${totalCount} ${isLoraTab ? 'LoRAs' : 'styles'}`;
        badge.classList.remove('has-query');
        if (clearBtn) clearBtn.classList.add('hidden');
    }
}

const STYLE_THEME_DIR_MAP = {
    'fantasy': 'fantasy',
    'modern': 'present',
    'sci-fi': 'sci-fi'
};

const STYLE_CATEGORIES = [
    'Anime and Manga',
    'Comic and Western Mangas',
    'Design',
    'Painting and Fine Art',
    'Photography',
    'Sketch and Cartoon'
];

const LORA_CATEGORIES = STYLE_CATEGORIES;

// ---- Shared Theme Demonstration Prompts ----
const THEME_DEMO_PROMPTS = {
    'fantasy': {
        'simple': `a female elf wearing a kirtle holding a lantern, wading through still marsh water at night, waist-deep, thick fog hanging heavy just above the moonlit waterline.`,
        'complex': `A low-angle camera shot looking upward, emphasizing the height difference between two characters at night. They stand before a hovel in a tenement yard in a poor quarter of a great medieval city, where all the surrounding dwellings are little more than lean-to shacks. A torch in the foreground casts its warm, flickering light upon them, creating deep shadows and dynamic highlights. 

Character-1: A lean human male, height 1.70m (5'7"), with a weathered but youthful face, angular jaw, full beard, warm light skin, and brown eyes. Long dirty-blond hair gathered in a low bun with loose wavy strands framing his face. He wears leather-and-mail armor with a pauldron and a rust-orange cape. He stands upright, body turned three-quarters toward the camera, hands on his hips. Pose: Standing up, body turned three-quarters toward the camera, hands resting on the hips. Expression: Confusion. One eyebrow is raised high while the other dips downward in an asymmetrical slant. He stares directly into the camera.

Character-2: A massively built half-orc female, height 2.05m (6'7"), with broad shoulders and thick powerful limbs, she is on her 30s. She casually show off her thick legs. Mottled olive-green skin with grayish undertones. A wild, untamed mane of fiery red hair, thick and windblown. Small tusks, bright blue eyes. She wears a courtesan's outfit: a draped fur-trimmed leather wrap baring one shoulder and midriff, cinched with a wide fancy belt, worn over a tight strapless top, gold bracelets, tarnished brass hoop earrings, a chunky imitation-gem necklace with cheap glass stones, and mismatched thin metal bangles. Pose: Standing just behind and to the right side of Character-1. One hand rests on Character-1's shoulder, the other raised with just the index finger extended. She leans against some big barrels behind her. Expression: A playful facial expression. Her head tilts back slightly as her eyes sparkle with light, framed by gentle fan-like creases at the outer corners. Her mouth is open in a wide half-smile. Her eyebrows sit comfortably high on a smooth forehead. She is looking at Character-1.`
    },
    'modern': {
        'simple': `A female secret agent in a suit, crouched down using a technological device to analyze a dimensional fissure opened on the desert ground. a makeshift military camp surrounds the site. High noon.`,
        'complex': `Scene: A dimly lit New York apartment at night, viewed from inside a cozy but worn living room. A large window in the background shows the glow and scattered lights of the city skyline outside, with soft ambient street light bleeding into the room. The space has a slightly rustic, lived-in feel — wooden shelving packed with books lines the left wall, and a low wooden coffee table in the foreground is cluttered with scattered magazines and papers. A worn brown sofa sits in the middle of the room.

Character 1 (standing): A young human woman of Scandinavian descent, with a strong build. She stands near the sofa, looking down at her phone, its blue-white glow reflecting softly on her face and lighting her half-lidded eyes from below. She wears a practical navy-blue rain jacket over a grey hoodie and dark jeans. Her straight, mid-length sandy-blond hair is tucked behind one ear; she wears no accessories. Expression: A pouting facial expression. Her lower lip is pushed distinctly outward, extending past her upper lip in a full, pronounced swell. Her eyebrows are drawn into a soft central furrow.

Character 2 (seated): A young latina woman with small, subtle cat ears and vertical-slit pupils, slim build. She sits on the sofa, gesturing with one hand mid-conversation while holding a lit cigarette between two fingers of the other, a thin trail of smoke rising. She's dressed in cyber-goth fashion: an oversized vinyl coat and a mini-skirt in vinyl, layered silver chains. Her hair is an asymmetrical bob dyed half neon-pink, half black. Expression: An asymmetrical smile facial expression. Her mouth is pulled into an uneven, crooked grin where the left lip corner lifts high toward her cheekbone to reveal upper teeth, while the right corner stays closed and low. Her cheeks rise to different heights, and one eyebrow sits faintly higher than the other.

Lighting & Atmosphere: Warm interior lamp light mixes with cool blue light from the phone screen and the distant glow of the city through the window, creating contrast between warm and cool tones across the room. Nighttime, indoor, intimate and slightly moody atmosphere.

Camera: Close-up wide-angle shot using a fisheye lens, positioned close to the two characters so the curvature of the lens slightly bends the edges of the room — the bookshelves, window, and coffee table bowing outward toward the frame edges. The perspective exaggerates the closeness of the standing and seated figures, making them loom larger and more central in the frame while the background recedes and distorts around them. The framing feels intimate and slightly voyeuristic, as if the viewer is standing right in the room with them.`
    },
    'sci-fi': {
        'simple': `A man with a powerfully built physique in a wide investigative stance as he examines the alien terrain. He wears a weathered future-tech exploration suit, streaked with rain, hood raised against the storm. His posture is alert and deliberate, one hand reaching toward a strange bioluminescent growth, head tilted in focused study. An uninhabited alien forest during a pouring rain.`,
        'complex': `Character-1: Male insectoid alien species, chitinous exoskeleton, tall thin build, height 2.30m (7'7"). No hair, narrow skull. Large, elongated almond-shaped eyes, solid black with no visible whites. Narrow, gaunt facial structure with a subtly ridged brow, a small slit-like nose, and a thin closed mouth-line; no visible ears, faint fold lines running down the cheeks toward the jaw. Skin: mottled pale gray-tan base tone with fine darker striation lines running across the crest and neck, accented by rust-orange veining/markings along the ridges and joints. Wearing worn gray engineering coveralls covered with mission patches, a tool belt loaded with plasma cutters, fusion connectors, and diagnostic probes, forearm-mounted multi-tool rig. Expression: alien, unreadable calm. Position: Holding a diagnostic tablet with projected screens in one hand, typing on it with the other, Sitting on a futuristic floating chair facing left.

Character-2: Human female, Indonesian ethnicity, athletic build, height 1.68m (5'6"). Long untied hair falling loose by the shoulders, with a sidecut shaved on one side. Right arm is cyber-augmented, mechanical and articulated, visible plating and joints contrasting with her natural skin. Wears a tactical sci-fi spacesuit in matte white with orange accent stripes along the seams and shoulders, with reinforced armored plating across the chest and shoulders, with a futuristic ar-15 on her back. Expression: Angry. Mouth open, speaking incisively, the bridge of her nose is heavily scrunched into deep vertical skin folds, and her nostrils are flared wide. Her eyebrows are drawn low and violently inward over narrowed, glaring eyes. Position: She is at the left side of Character-1, she is leaning forward toward Character-1 while looking right. Her both hands are raised at shoulder height, palm up, fingers spread in an exasperated gesture.

Background: Interior of a futuristic spaceship, with spaceships visible afar and out of focus in the background. A wall of glass reveals open space beyond, with part of a nearby planet visible through it. 

Lighting: Warm strong sunlight from a near sun, soft directional lighting from the upper right, subtle rim light on hair, high contrast, soft shadows, bright and vibrant, cinematic lighting.

Camera: Medium two-shot, eye-level, shallow depth of field.`
    }
};

/**
 * Resolves the image path for a style based on theme and substyle selection.
 */
function getStyleImagePath(style) {
    const dir = STYLE_THEME_DIR_MAP[currentStyleTheme] || 'fantasy';
    const substyle = currentStyleSubstyle || 'simple';
    return `img/style/${dir}/${substyle}/${style.name}_00001_.jpg`;
}

/**
 * Updates all Style card images based on current theme/substyle.
 */
function updateStyleImages() {
    STYLES_DATA.forEach((style, index) => {
        const card = document.getElementById(`style-card-${index}`);
        if (!card) return;

        const img = card.querySelector('.style-card-image');
        if (!img) return;

        const newSrc = getStyleImagePath(style);
        img.onerror = function () {
            this.onerror = null;
            this.src = 'img/placeholder.jpg';
        };
        img.src = newSrc;
    });
}


// ==============================================
// PROMPT VARIATIONS & FULLSCREEN LIGHTBOX
// ==============================================

const PROMPT_VARIATIONS = [
    { key: 'fantasy_simple', theme: 'fantasy', substyle: 'simple', label: 'Fantasy Simple', dir: 'fantasy' },
    { key: 'fantasy_complex', theme: 'fantasy', substyle: 'complex', label: 'Fantasy Complex', dir: 'fantasy' },
    { key: 'modern_simple', theme: 'modern', substyle: 'simple', label: 'Modern Simple', dir: 'present' },
    { key: 'modern_complex', theme: 'modern', substyle: 'complex', label: 'Modern Complex', dir: 'present' },
    { key: 'scifi_simple', theme: 'sci-fi', substyle: 'simple', label: 'Sci-Fi Simple', dir: 'sci-fi' },
    { key: 'scifi_complex', theme: 'sci-fi', substyle: 'complex', label: 'Sci-Fi Complex', dir: 'sci-fi' }
];

/**
 * Randomizes the initial prompt variation for both Styles and LoRAs on page load/refresh.
 */
function randomizeInitialVariation() {
    const randomIndex = Math.floor(Math.random() * PROMPT_VARIATIONS.length);
    const randomVar = PROMPT_VARIATIONS[randomIndex];
    if (!randomVar) return;

    currentStyleTheme = randomVar.theme;
    currentStyleSubstyle = randomVar.substyle;
    currentLoraStyle = randomVar.theme;
    currentLoraSubstyle = randomVar.substyle;
}

function getStyleVariationImagePath(style, variation) {
    return `img/style/${variation.dir}/${variation.substyle}/${style.name}_00001_.jpg`;
}

function getLoraVariationImagePath(lora, variation) {
    let cleanName = lora.name;
    if (cleanName.startsWith('@')) {
        cleanName = cleanName.substring(1);
    }
    return `img/lora/${variation.dir}/${variation.substyle}/${cleanName}_00001_.jpg`;
}

let currentLightboxState = {
    isOpen: false,
    title: '',
    type: 'style',
    item: null,
    variationIndex: 0
};

let currentLightboxPromptTab = 'style'; // 'style' | 'scene'

function openLightboxModal({ title, type, item, initialVariationIndex = 0 }) {
    const lightbox = document.getElementById('image-lightbox');
    if (!lightbox) return;

    currentLightboxPromptTab = 'style';
    const promptSection = document.getElementById('lightbox-prompt-section');
    if (promptSection) promptSection.classList.remove('open');

    currentLightboxState = {
        isOpen: true,
        title,
        type,
        item,
        variationIndex: initialVariationIndex
    };

    updateLightboxContent();

    lightbox.classList.remove('hidden');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.classList.add('lightbox-open');
}

function closeLightboxModal() {
    const lightbox = document.getElementById('image-lightbox');
    if (!lightbox) return;

    currentLightboxState.isOpen = false;
    lightbox.classList.add('hidden');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('lightbox-open');
}

function getAvailableLightboxStyles() {
    const query = currentStyleSearchQuery.trim().toLowerCase();
    const visibleStyles = [];

    STYLE_CATEGORIES.forEach(categoryName => {
        let stylesInCategory = STYLES_DATA.filter(s => s.category === categoryName);
        if (stylesInCategory.length === 0) return;

        const isCategoryVisible = currentStyleCategoryFilter === 'all' || currentStyleCategoryFilter === categoryName;
        if (!isCategoryVisible) return;

        if (query) {
            stylesInCategory = stylesInCategory.filter(s =>
                s.name.toLowerCase().includes(query) ||
                s.category.toLowerCase().includes(query) ||
                (s.prompt && s.prompt.toLowerCase().includes(query))
            );
        }
        visibleStyles.push(...stylesInCategory);
    });

    if (visibleStyles.length === 0 || (currentLightboxState.item && !visibleStyles.some(s => s.name === currentLightboxState.item.name))) {
        return STYLES_DATA;
    }
    return visibleStyles;
}

function getAvailableLightboxLoras() {
    const query = currentLoraSearchQuery.trim().toLowerCase();
    const visibleLoras = [];

    LORA_CATEGORIES.forEach(categoryName => {
        let lorasInCategory = LORA_DATA.filter(l => l.category === categoryName);
        if (lorasInCategory.length === 0) return;

        const isCategoryVisible = currentLoraCategoryFilter === 'all' || currentLoraCategoryFilter === categoryName;
        if (!isCategoryVisible) return;

        if (query) {
            lorasInCategory = lorasInCategory.filter(l =>
                l.name.toLowerCase().includes(query) ||
                (l.category && l.category.toLowerCase().includes(query)) ||
                (l.description && l.description.toLowerCase().includes(query)) ||
                (l.triggerWords && l.triggerWords.toLowerCase().includes(query))
            );
        }
        visibleLoras.push(...lorasInCategory);
    });

    if (visibleLoras.length === 0 || (currentLightboxState.item && !visibleLoras.some(l => l.name === currentLightboxState.item.name))) {
        return LORA_DATA;
    }
    return visibleLoras;
}

function stepLightboxVariation(delta) {
    if (!currentLightboxState.isOpen || !currentLightboxState.item) return;
    const total = PROMPT_VARIATIONS.length;
    currentLightboxState.variationIndex = (currentLightboxState.variationIndex + delta + total) % total;
    updateLightboxContent();
}

function stepLightboxStyle(delta) {
    if (!currentLightboxState.isOpen || !currentLightboxState.item) return;

    const isStyle = currentLightboxState.type === 'style';
    const list = isStyle ? getAvailableLightboxStyles() : getAvailableLightboxLoras();
    if (!list || list.length === 0) return;

    let currentIndex = list.findIndex(item => item.name === currentLightboxState.item.name);
    if (currentIndex === -1) {
        currentIndex = 0;
    }

    const nextIndex = (currentIndex + delta + list.length) % list.length;
    const nextItem = list[nextIndex];
    if (!nextItem) return;

    currentLightboxState.item = nextItem;
    currentLightboxState.title = nextItem.name;
    // currentLightboxState.variationIndex is intentionally preserved so the prompt remains the same
    updateLightboxContent();
}

function setLightboxVariation(index) {
    if (!currentLightboxState.isOpen || !currentLightboxState.item) return;
    currentLightboxState.variationIndex = index;
    updateLightboxContent();
}

function updateLightboxContent() {
    const titleElem = document.getElementById('lightbox-title');
    const subtitleElem = document.getElementById('lightbox-subtitle');
    const imgElem = document.getElementById('lightbox-img');
    const indicatorsElem = document.getElementById('lightbox-indicators');
    if (!imgElem) return;

    const { title, type, item, variationIndex } = currentLightboxState;
    const variation = PROMPT_VARIATIONS[variationIndex] || PROMPT_VARIATIONS[0];

    if (titleElem) titleElem.textContent = title;
    if (subtitleElem) subtitleElem.textContent = `${variation.label} Prompt (${variationIndex + 1} of ${PROMPT_VARIATIONS.length})`;

    const imgSrc = type === 'style'
        ? getStyleVariationImagePath(item, variation)
        : getLoraVariationImagePath(item, variation);

    imgElem.onerror = function () {
        this.onerror = null;
        this.src = 'img/placeholder.jpg';
    };
    imgElem.src = imgSrc;
    imgElem.alt = `${title} - ${variation.label}`;

    // Update dynamic tooltips and labels for navigation buttons
    const prevBtn = document.getElementById('lightbox-prev');
    const nextBtn = document.getElementById('lightbox-next');
    const prevStyleBtn = document.getElementById('lightbox-prev-style');
    const nextStyleBtn = document.getElementById('lightbox-next-style');

    const totalVar = PROMPT_VARIATIONS.length;
    const prevVar = PROMPT_VARIATIONS[(variationIndex - 1 + totalVar) % totalVar];
    const nextVar = PROMPT_VARIATIONS[(variationIndex + 1) % totalVar];

    if (prevBtn) {
        prevBtn.title = `Previous Variation: ${prevVar.label} (←)`;
        prevBtn.setAttribute('aria-label', `Previous variation: ${prevVar.label} (Left Arrow)`);
    }
    if (nextBtn) {
        nextBtn.title = `Next Variation: ${nextVar.label} (→)`;
        nextBtn.setAttribute('aria-label', `Next variation: ${nextVar.label} (Right Arrow)`);
    }

    const isStyle = type === 'style';
    const itemLabel = isStyle ? 'Style' : 'LoRA';
    const list = isStyle ? getAvailableLightboxStyles() : getAvailableLightboxLoras();

    if (list && list.length > 0) {
        let curIdx = list.findIndex(i => i.name === item.name);
        if (curIdx === -1) curIdx = 0;
        const prevItem = list[(curIdx - 1 + list.length) % list.length];
        const nextItem = list[(curIdx + 1) % list.length];

        if (prevStyleBtn) {
            prevStyleBtn.title = `Previous ${itemLabel}: ${prevItem.name} (Same Prompt) (↑)`;
            prevStyleBtn.setAttribute('aria-label', `Previous ${itemLabel}: ${prevItem.name}`);
        }
        if (nextStyleBtn) {
            nextStyleBtn.title = `Next ${itemLabel}: ${nextItem.name} (Same Prompt) (↓)`;
            nextStyleBtn.setAttribute('aria-label', `Next ${itemLabel}: ${nextItem.name}`);
        }
    }

    const hintElem = document.getElementById('lightbox-header-hint');
    if (hintElem) {
        hintElem.innerHTML = `
            <div>Variations: <kbd>←</kbd> <kbd>→</kbd></div>
            <div style="margin-top: 4px;">${itemLabel}: <kbd>↑</kbd> <kbd>↓</kbd></div>
        `;
    }

    // Render indicators / variation selection buttons in right sidebar
    if (indicatorsElem) {
        indicatorsElem.innerHTML = '';
        PROMPT_VARIATIONS.forEach((v, idx) => {
            const btn = document.createElement('button');
            btn.type = 'button';
            btn.className = `lightbox-indicator-btn ${idx === variationIndex ? 'active' : ''}`;
            btn.innerHTML = `
                <span>${v.label}</span>
                <span class="lightbox-btn-arrow">${idx === variationIndex ? '●' : '›'}</span>
            `;
            btn.title = `Switch to ${v.label}`;
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                setLightboxVariation(idx);
            });
            indicatorsElem.appendChild(btn);
        });
    }

    // Render style/LoRA prompt and scene prompt in left sidebar
    updateLightboxPromptSection();
}

function updateLightboxPromptSection() {
    const tabStyleBtn = document.getElementById('lb-tab-style');
    const tabSceneBtn = document.getElementById('lb-tab-scene');
    const promptTextElem = document.getElementById('lightbox-prompt-text');
    if (!promptTextElem) return;

    const { type, item, variationIndex } = currentLightboxState;
    if (!item) return;

    const variation = PROMPT_VARIATIONS[variationIndex] || PROMPT_VARIATIONS[0];
    const isStyle = type === 'style';

    if (tabStyleBtn) {
        tabStyleBtn.textContent = isStyle ? 'Style Prompt' : 'LoRA Trigger';
        tabStyleBtn.classList.toggle('active', currentLightboxPromptTab === 'style');
    }
    if (tabSceneBtn) {
        tabSceneBtn.textContent = 'Demo Scene';
        tabSceneBtn.classList.toggle('active', currentLightboxPromptTab === 'scene');
    }

    if (currentLightboxPromptTab === 'style') {
        if (isStyle) {
            promptTextElem.textContent = item.prompt || 'No style prompt available.';
        } else {
            promptTextElem.innerHTML = `
                <div class="lightbox-lora-trigger-box" title="Click to copy trigger words" id="lightbox-lora-trigger-box">
                    <span class="lightbox-lora-trigger-title">TRIGGER WORDS (CLICK TO COPY)</span>
                    <div class="lightbox-lora-trigger-text">${escapeHtml(item.triggerWords || 'None')}</div>
                </div>
                ${item.description ? `<div class="lightbox-lora-desc">${escapeHtml(item.description)}</div>` : ''}
            `;
            const triggerBox = document.getElementById('lightbox-lora-trigger-box');
            if (triggerBox) {
                triggerBox.addEventListener('click', async () => {
                    const success = await copyToClipboard(item.triggerWords || '');
                    if (success) {
                        showToast(`TRIGGER WORDS COPIED: ${item.triggerWords}`);
                    }
                });
            }
        }
    } else {
        const themeObj = THEME_DEMO_PROMPTS[variation.theme];
        const sceneText = (themeObj && themeObj[variation.substyle]) || `No demo scene prompt available for ${variation.label}.`;
        promptTextElem.innerHTML = `
            <div style="color: var(--accent); font-size: 10px; letter-spacing: 1px; font-weight: bold; margin-bottom: 6px;">SCENE: ${escapeHtml(variation.label.toUpperCase())}</div>
            <div>${escapeHtml(sceneText)}</div>
        `;
    }
}

function getActiveLightboxPromptText() {
    const { type, item, variationIndex } = currentLightboxState;
    if (!item) return '';
    const variation = PROMPT_VARIATIONS[variationIndex] || PROMPT_VARIATIONS[0];
    const isStyle = type === 'style';

    if (currentLightboxPromptTab === 'style') {
        return isStyle ? (item.prompt || '') : (item.triggerWords || '');
    } else {
        const themeObj = THEME_DEMO_PROMPTS[variation.theme];
        return (themeObj && themeObj[variation.substyle]) || '';
    }
}

function openStyleFullscreen(index) {
    const style = STYLES_DATA[index];
    if (!style) return;

    // Find current variation index based on current theme & substyle
    const varIdx = PROMPT_VARIATIONS.findIndex(v => v.theme === currentStyleTheme && v.substyle === currentStyleSubstyle);
    openLightboxModal({
        title: style.name,
        type: 'style',
        item: style,
        initialVariationIndex: varIdx !== -1 ? varIdx : 0
    });
}

function openLoraFullscreen(index) {
    const lora = LORA_DATA[index];
    if (!lora) return;

    // Find current variation index based on current lora style & substyle
    const varIdx = PROMPT_VARIATIONS.findIndex(v => v.theme === currentLoraStyle && v.substyle === currentLoraSubstyle);
    openLightboxModal({
        title: lora.name,
        type: 'lora',
        item: lora,
        initialVariationIndex: varIdx !== -1 ? varIdx : 0
    });
}

function createPanelVariationsGallery(item, type) {
    const gallerySection = document.createElement('div');
    gallerySection.className = 'info-panel-gallery-section';

    const header = document.createElement('div');
    header.className = 'info-panel-gallery-header';

    const title = document.createElement('span');
    title.className = 'info-panel-gallery-title';
    title.innerHTML = `
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
            <circle cx="8.5" cy="8.5" r="1.5"></circle>
            <polyline points="21 15 16 10 5 21"></polyline>
        </svg>
        <span>Prompt Variations Gallery</span>
    `;

    const hint = document.createElement('span');
    hint.className = 'info-panel-gallery-hint';
    hint.textContent = 'Click any image to view in fullscreen';

    header.appendChild(title);
    header.appendChild(hint);
    gallerySection.appendChild(header);

    const grid = document.createElement('div');
    grid.className = 'info-panel-gallery-grid';

    PROMPT_VARIATIONS.forEach((variation, vIndex) => {
        const itemWrap = document.createElement('div');
        itemWrap.className = 'info-gallery-item';
        itemWrap.dataset.variationIndex = vIndex;
        itemWrap.title = `${item.name} — ${variation.label} (Click for Fullscreen)`;

        const imgSrc = type === 'style'
            ? getStyleVariationImagePath(item, variation)
            : getLoraVariationImagePath(item, variation);

        const img = document.createElement('img');
        img.className = 'info-gallery-img';
        img.src = imgSrc;
        img.alt = `${item.name} - ${variation.label}`;
        img.loading = 'lazy';
        img.onerror = function () {
            this.onerror = null;
            this.src = 'img/placeholder.jpg';
        };
        itemWrap.appendChild(img);

        const label = document.createElement('span');
        label.className = 'info-gallery-label';
        label.textContent = variation.label;
        itemWrap.appendChild(label);

        const expandIcon = document.createElement('span');
        expandIcon.className = 'info-gallery-expand-icon';
        expandIcon.innerHTML = `
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="15 3 21 3 21 9"></polyline>
                <polyline points="9 21 3 21 3 15"></polyline>
                <line x1="21" y1="3" x2="14" y2="10"></line>
                <line x1="3" y1="21" x2="10" y2="14"></line>
            </svg>
        `;
        itemWrap.appendChild(expandIcon);

        itemWrap.addEventListener('click', (e) => {
            e.stopPropagation();
            openLightboxModal({
                title: item.name,
                type: type,
                item: item,
                initialVariationIndex: vIndex
            });
        });

        grid.appendChild(itemWrap);
    });

    gallerySection.appendChild(grid);
    return gallerySection;
}

function initLightbox() {
    const closeBtn = document.getElementById('lightbox-close');
    const backdrop = document.getElementById('lightbox-backdrop');
    const prevBtn = document.getElementById('lightbox-prev');
    const nextBtn = document.getElementById('lightbox-next');
    const prevStyleBtn = document.getElementById('lightbox-prev-style');
    const nextStyleBtn = document.getElementById('lightbox-next-style');

    if (closeBtn) closeBtn.addEventListener('click', closeLightboxModal);
    if (backdrop) backdrop.addEventListener('click', closeLightboxModal);
    if (prevBtn) prevBtn.addEventListener('click', () => stepLightboxVariation(-1));
    if (nextBtn) nextBtn.addEventListener('click', () => stepLightboxVariation(1));
    if (prevStyleBtn) prevStyleBtn.addEventListener('click', () => stepLightboxStyle(-1));
    if (nextStyleBtn) nextStyleBtn.addEventListener('click', () => stepLightboxStyle(1));

    // Prompt tabs inside lightbox
    const tabStyleBtn = document.getElementById('lb-tab-style');
    const tabSceneBtn = document.getElementById('lb-tab-scene');
    if (tabStyleBtn) {
        tabStyleBtn.addEventListener('click', () => {
            currentLightboxPromptTab = 'style';
            updateLightboxPromptSection();
        });
    }
    if (tabSceneBtn) {
        tabSceneBtn.addEventListener('click', () => {
            currentLightboxPromptTab = 'scene';
            updateLightboxPromptSection();
        });
    }

    // Copy Prompt button
    const copyPromptBtn = document.getElementById('lightbox-copy-prompt-btn');
    const copyPromptText = document.getElementById('lightbox-copy-prompt-text');
    if (copyPromptBtn) {
        copyPromptBtn.addEventListener('click', async () => {
            const text = getActiveLightboxPromptText();
            if (!text) return;
            const success = await copyToClipboard(text);
            if (success) {
                showToast(`COPIED: ${text.substring(0, 45)}${text.length > 45 ? '...' : ''}`);
                if (copyPromptText) copyPromptText.textContent = 'Copied!';
                copyPromptBtn.classList.add('copied');
                setTimeout(() => {
                    if (copyPromptText) copyPromptText.textContent = 'Copy';
                    copyPromptBtn.classList.remove('copied');
                }, 1500);
            }
        });
    }

    // Add to Builder button
    const applyBuilderBtn = document.getElementById('lightbox-apply-builder-btn');
    if (applyBuilderBtn) {
        applyBuilderBtn.addEventListener('click', () => {
            const text = getActiveLightboxPromptText();
            if (!text) return;
            appendStyleToBuilder(text, currentLightboxState.item ? currentLightboxState.item.name : '');
            showToast(`ADDED TO BUILDER: ${currentLightboxState.item ? currentLightboxState.item.name : ''}`);
        });
    }

    // Mobile prompt drawer toggle
    const togglePromptBtn = document.getElementById('lightbox-prompt-toggle-btn');
    const promptSection = document.getElementById('lightbox-prompt-section');
    if (togglePromptBtn && promptSection) {
        togglePromptBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            promptSection.classList.toggle('open');
        });
    }

    window.addEventListener('keydown', (e) => {
        if (!currentLightboxState.isOpen) return;
        if (e.key === 'Escape') {
            closeLightboxModal();
        } else if (e.key === 'ArrowLeft') {
            if (e.shiftKey) {
                stepLightboxStyle(-1);
            } else {
                stepLightboxVariation(-1);
            }
        } else if (e.key === 'ArrowRight') {
            if (e.shiftKey) {
                stepLightboxStyle(1);
            } else {
                stepLightboxVariation(1);
            }
        } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
            e.preventDefault();
            stepLightboxStyle(-1);
        } else if (e.key === 'ArrowDown' || e.key === 'PageDown') {
            e.preventDefault();
            stepLightboxStyle(1);
        }
    });
}

/**
 * Builds the Pre-Trained Styles Gallery grid organized by category.
 */
function buildStylesGallery() {
    const gallery = document.getElementById('gallery');
    if (!gallery) return;

    gallery.innerHTML = '';
    collapseStylePanel(true);

    const query = currentStyleSearchQuery.trim().toLowerCase();
    let totalVisibleStyles = 0;

    STYLE_CATEGORIES.forEach(categoryName => {
        let stylesInCategory = STYLES_DATA.filter(s => s.category === categoryName);
        if (stylesInCategory.length === 0) return;

        const isCategoryVisible = currentStyleCategoryFilter === 'all' || currentStyleCategoryFilter === categoryName;
        if (!isCategoryVisible) return;

        // Filter styles by search query (match style name, category, or style-info-description prompt)
        if (query) {
            stylesInCategory = stylesInCategory.filter(s =>
                s.name.toLowerCase().includes(query) ||
                s.category.toLowerCase().includes(query) ||
                (s.prompt && s.prompt.toLowerCase().includes(query))
            );
        }

        if (stylesInCategory.length === 0) return;
        totalVisibleStyles += stylesInCategory.length;

        // Category Section Header Divider
        const header = document.createElement('div');
        header.className = 'style-category-header';
        header.id = `style-cat-${categoryName.toLowerCase().replace(/[^a-z0-9]/g, '-')}`;
        header.innerHTML = `
            <h3>${categoryName}</h3>
            <span class="style-category-count">${stylesInCategory.length} ${stylesInCategory.length === 1 ? 'STYLE' : 'STYLES'}${query ? ' (FILTERED)' : ''}</span>
        `;
        gallery.appendChild(header);

        stylesInCategory.forEach(style => {
            const index = STYLES_DATA.indexOf(style);
            const card = document.createElement('div');
            card.className = 'style-card';
            card.id = `style-card-${index}`;
            card.dataset.styleIndex = index;
            card.dataset.category = style.category;

            const img = document.createElement('img');
            img.className = 'style-card-image';
            img.src = getStyleImagePath(style);
            img.alt = style.name;
            img.loading = 'lazy';
            img.onerror = function () {
                this.onerror = null;
                this.src = 'img/placeholder.jpg';
            };
            card.appendChild(img);

            // Fullscreen Icon Button (only visible when card is selected)
            const zoomBtn = document.createElement('button');
            zoomBtn.type = 'button';
            zoomBtn.className = 'card-fullscreen-btn';
            zoomBtn.title = 'View image in fullscreen';
            zoomBtn.setAttribute('aria-label', 'View image in fullscreen');
            zoomBtn.innerHTML = `
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="15 3 21 3 21 9"></polyline>
                    <polyline points="9 21 3 21 3 15"></polyline>
                    <line x1="21" y1="3" x2="14" y2="10"></line>
                    <line x1="3" y1="21" x2="10" y2="14"></line>
                </svg>
            `;
            zoomBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                openStyleFullscreen(index);
            });
            card.appendChild(zoomBtn);

            // Compare Button (add to compare drawer)
            const compareBtn = document.createElement('button');
            compareBtn.type = 'button';
            compareBtn.className = 'card-compare-btn';
            compareBtn.title = 'Add to compare';
            compareBtn.setAttribute('aria-label', 'Add to compare');
            compareBtn.dataset.compareType = 'style';
            compareBtn.dataset.compareIndex = index;
            compareBtn.innerHTML = `
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                    <rect x="2" y="3" width="8" height="14" rx="1"></rect>
                    <rect x="14" y="3" width="8" height="14" rx="1"></rect>
                    <line x1="6" y1="21" x2="6" y2="19"></line>
                    <line x1="18" y1="21" x2="18" y2="19"></line>
                </svg>
            `;
            compareBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                handleCompareButtonClick('style', index, style, compareBtn);
            });
            card.appendChild(compareBtn);

            const title = document.createElement('div');
            title.className = 'style-card-title';
            title.textContent = style.name;
            title.title = `${style.name}\n\nPrompt:\n${style.prompt}`;
            card.title = `${style.name}\n\nPrompt:\n${style.prompt}`;
            card.appendChild(title);

            card.addEventListener('click', () => handleStyleCardClick(index));

            gallery.appendChild(card);
        });
    });

    // Update search badge counter
    updateSearchBadge(totalVisibleStyles, STYLES_DATA.length);

    // Empty state if 0 styles match
    if (totalVisibleStyles === 0 && query) {
        const emptyState = document.createElement('div');
        emptyState.className = 'gallery-empty-state';
        emptyState.innerHTML = `
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                <line x1="8" y1="11" x2="14" y2="11"></line>
            </svg>
            <h4>No styles found</h4>
            <p>No styles match "<strong>${escapeHtml(query)}</strong>"${currentStyleCategoryFilter !== 'all' ? ` in ${currentStyleCategoryFilter}` : ''}</p>
            <button type="button" class="btn btn-sm btn-accent" id="btn-clear-empty-search">Clear Search</button>
        `;
        gallery.appendChild(emptyState);

        const clearBtn = emptyState.querySelector('#btn-clear-empty-search');
        if (clearBtn) {
            clearBtn.addEventListener('click', () => {
                const searchInput = document.getElementById('gallery-search-input');
                if (searchInput) {
                    searchInput.value = '';
                }
                currentStyleSearchQuery = '';
                buildStylesGallery();
                searchInput?.focus();
            });
        }
    }

    // Sync compare button states after rebuild
    if (typeof updateAllCompareButtonStates === 'function') {
        updateAllCompareButtonStates();
    }
}

function handleStyleCardClick(index) {
    const gallery = document.getElementById('gallery');
    const style = STYLES_DATA[index];
    const card = document.getElementById(`style-card-${index}`);
    if (!card || !style) return;

    // If clicking the same card that is already expanded, collapse it
    if (currentExpandedStyle === index) {
        collapseStylePanel();
        return;
    }

    // Collapse any existing panel first
    collapseStylePanel(false);

    // Mark selection state
    currentExpandedStyle = index;
    gallery.classList.add('has-selection');

    // Remove previous selection
    gallery.querySelectorAll('.style-card.style-selected').forEach(c => c.classList.remove('style-selected'));
    card.classList.add('style-selected');

    // Copy style prompt to clipboard and apply to prompt builder
    copyToClipboard(style.prompt).then(success => {
        if (success) {
            showToast(`COPIED & APPLIED: ${style.name}`);
        }
    });
    appendStyleToBuilder(style.prompt, style.name);

    // Create the style-info-panel
    const panel = createStyleInfoPanel(style, index);

    // Find the last card in the same row as the clicked card so cards in the row don't shift position
    const allCards = Array.from(gallery.querySelectorAll('.style-card'));
    const clickedCardTop = card.offsetTop;
    const rowCards = allCards.filter(c => Math.abs(c.offsetTop - clickedCardTop) < 10);
    const lastCardInRow = rowCards[rowCards.length - 1] || card;

    // Insert the panel right after the last card in the row
    lastCardInRow.insertAdjacentElement('afterend', panel);

    // Scroll to the panel smoothly
    setTimeout(() => {
        panel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 50);
}

function createStyleInfoPanel(style, index) {
    const panel = document.createElement('div');
    panel.className = 'style-info-panel';
    panel.id = 'style-info-panel-active';

    // Header with title and close button
    const header = document.createElement('div');
    header.className = 'style-info-header';

    const title = document.createElement('span');
    title.className = 'style-info-title';
    title.textContent = style.name;

    const closeBtn = document.createElement('button');
    closeBtn.className = 'style-info-close';
    closeBtn.textContent = '×';
    closeBtn.title = 'Close';
    closeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        collapseStylePanel();
    });

    header.appendChild(title);
    header.appendChild(closeBtn);
    panel.appendChild(header);

    // Description (style prompt)
    const desc = document.createElement('div');
    desc.className = 'style-info-description';
    desc.textContent = style.prompt;
    panel.appendChild(desc);

    // Action button: Copy Prompt
    const actions = document.createElement('div');
    actions.className = 'style-info-actions';

    const copyBtn = document.createElement('button');
    copyBtn.type = 'button';
    copyBtn.className = 'btn btn-accent btn-copy-style-prompt';
    copyBtn.innerHTML = `
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
        </svg>
        <span>Copy Prompt</span>
    `;
    copyBtn.title = 'Copy style prompt to clipboard and apply to builder';
    copyBtn.addEventListener('click', async (e) => {
        e.stopPropagation();
        const success = await copyToClipboard(style.prompt);
        if (success) {
            showToast(`STYLE PROMPT COPIED TO CLIPBOARD!`);
        }
        appendStyleToBuilder(style.prompt, style.name);
    });

    actions.appendChild(copyBtn);
    panel.appendChild(actions);

    // Append Prompt Variations Gallery
    const variationsGallery = createPanelVariationsGallery(style, 'style');
    panel.appendChild(variationsGallery);

    // Prevent clicks inside panel from collapsing it
    panel.addEventListener('click', (e) => e.stopPropagation());

    return panel;
}

function collapseStylePanel(resetSelection = true) {
    const existingPanel = document.getElementById('style-info-panel-active');
    if (existingPanel) {
        existingPanel.remove();
    }

    if (resetSelection) {
        currentExpandedStyle = null;
        const gallery = document.getElementById('gallery');
        if (gallery) {
            gallery.classList.remove('has-selection');
            gallery.querySelectorAll('.style-card.style-selected').forEach(c => c.classList.remove('style-selected'));
        }
    }
}

// ---- Pre-Trained Styles Theme & Prompt Inspector Logic ----
function updateStylesPromptContent() {
    const badge = document.getElementById('styles-prompt-toggle-badge');
    const title = document.getElementById('styles-prompt-drawer-title');
    const textElem = document.getElementById('styles-prompt-text');

    const themeName = currentStyleTheme === 'sci-fi' ? 'Sci-Fi' : currentStyleTheme.charAt(0).toUpperCase() + currentStyleTheme.slice(1);
    const substyleName = currentStyleSubstyle.charAt(0).toUpperCase() + currentStyleSubstyle.slice(1);

    if (badge) badge.innerHTML = `${themeName} &bull; ${substyleName}`;
    if (title) title.textContent = `${themeName} (${substyleName} Prompt)`;
    if (textElem) {
        const themeObj = THEME_DEMO_PROMPTS[currentStyleTheme];
        const promptText = (themeObj && themeObj[currentStyleSubstyle])
            ? themeObj[currentStyleSubstyle]
            : `No demo prompt configured for ${themeName} (${substyleName}).`;
        textElem.textContent = promptText;
    }
}

/**
 * Synchronizes the active prompt variation globally between Pre-Trained Styles and LoRAs,
 * keeping both selector bars, prompt inspector badges/drawers, and card images in sync.
 */
function setGlobalPromptVariation(theme, substyle) {
    if (!theme || !substyle) return;

    currentStyleTheme = theme;
    currentStyleSubstyle = substyle;
    currentLoraStyle = theme;
    currentLoraSubstyle = substyle;

    // Sync Pre-Trained Styles selector buttons
    const stylesSelector = document.getElementById('styles-style-selector');
    if (stylesSelector) {
        stylesSelector.querySelectorAll('.lora-style-btn').forEach(btn => {
            const isMatch = btn.dataset.styleTheme === theme && btn.dataset.styleSubstyle === substyle;
            btn.classList.toggle('active', isMatch);
        });
    }

    // Sync LoRA selector buttons
    const loraSelector = document.getElementById('lora-style-selector');
    if (loraSelector) {
        loraSelector.querySelectorAll('.lora-style-btn').forEach(btn => {
            const isMatch = btn.dataset.loraStyle === theme && btn.dataset.loraSubstyle === substyle;
            btn.classList.toggle('active', isMatch);
        });
    }

    // Update prompt inspector content & badges for both
    if (typeof updateStylesPromptContent === 'function') {
        updateStylesPromptContent();
    }
    if (typeof updateLoraPromptContent === 'function') {
        updateLoraPromptContent();
    }

    // Update images in both galleries
    if (typeof updateStyleImages === 'function') {
        updateStyleImages();
    }
    if (typeof updateLoraImages === 'function') {
        updateLoraImages();
    }

    // Update compare button states
    if (typeof updateAllCompareButtonStates === 'function') {
        updateAllCompareButtonStates();
    }
}

function initStylesThemeSelector() {
    const selector = document.getElementById('styles-style-selector');
    if (!selector) return;

    const buttons = selector.querySelectorAll('.lora-style-btn');
    const promptToggle = document.getElementById('styles-prompt-toggle');
    const promptDrawer = document.getElementById('styles-prompt-drawer');
    const copyPromptBtn = document.getElementById('btn-copy-styles-prompt');

    // Sync active button state with currentStyleTheme & currentStyleSubstyle
    buttons.forEach(btn => {
        const isMatch = btn.dataset.styleTheme === currentStyleTheme && btn.dataset.styleSubstyle === currentStyleSubstyle;
        btn.classList.toggle('active', isMatch);
    });

    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            const theme = btn.dataset.styleTheme;
            const substyle = btn.dataset.styleSubstyle;
            collapseStylePanel(true);
            setGlobalPromptVariation(theme, substyle);
        });
    });

    if (promptToggle && promptDrawer) {
        promptToggle.addEventListener('click', () => {
            const isHidden = promptDrawer.classList.contains('hidden');
            if (isHidden) {
                updateStylesPromptContent();
                promptDrawer.classList.remove('hidden');
                promptToggle.classList.add('expanded');
                promptToggle.setAttribute('aria-expanded', 'true');
            } else {
                promptDrawer.classList.add('hidden');
                promptToggle.classList.remove('expanded');
                promptToggle.setAttribute('aria-expanded', 'false');
            }
        });
    }

    if (copyPromptBtn) {
        copyPromptBtn.addEventListener('click', async (e) => {
            e.stopPropagation();
            const themeObj = THEME_DEMO_PROMPTS[currentStyleTheme];
            const text = (themeObj && themeObj[currentStyleSubstyle]) ? themeObj[currentStyleSubstyle] : '';
            if (text) {
                const success = await copyToClipboard(text);
                if (success) {
                    const themeName = currentStyleTheme === 'sci-fi' ? 'Sci-Fi' : currentStyleTheme.charAt(0).toUpperCase() + currentStyleTheme.slice(1);
                    const substyleName = currentStyleSubstyle.charAt(0).toUpperCase() + currentStyleSubstyle.slice(1);
                    showToast(`COPIED: ${themeName} (${substyleName}) Prompt`);
                }
            }
        });
    }

    updateStylesPromptContent();
}

function initStyleCategoryFilters() {
    const container = document.getElementById('style-category-filters');
    if (!container) return;

    const filterBtns = container.querySelectorAll('.category-filter-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const cat = btn.dataset.category;
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentStyleCategoryFilter = cat;
            buildStylesGallery();
            showToast(`FILTER: ${cat.toUpperCase()}`);
        });
    });
}

// ==============================================
// LoRA GALLERY
// ==============================================

let currentExpandedLora = null;
let currentLoraStyle = 'fantasy';     // 'fantasy' | 'modern' | 'sci-fi'
let currentLoraSubstyle = 'simple';   // 'simple' | 'complex'

const LORA_STYLE_DIR_MAP = {
    'fantasy': 'fantasy',
    'modern': 'present',
    'sci-fi': 'sci-fi'
};

const LORA_THEME_PROMPTS = THEME_DEMO_PROMPTS;

function getLoraImagePath(lora) {
    const dir = LORA_STYLE_DIR_MAP[currentLoraStyle] || 'fantasy';
    const substyle = currentLoraSubstyle || 'simple';

    let cleanName = lora.name;
    if (cleanName.startsWith('@')) {
        cleanName = cleanName.substring(1);
    }

    return `img/lora/${dir}/${substyle}/${cleanName}_00001_.jpg`;
}

function updateLoraImages() {
    LORA_DATA.forEach((lora, index) => {
        const card = document.getElementById(`lora-card-${index}`);
        if (!card) return;

        const img = card.querySelector('.lora-card-image');
        if (!img) return;

        const newSrc = getLoraImagePath(lora);
        img.onerror = function () {
            this.onerror = null;
            this.src = 'img/placeholder.jpg';
        };
        img.src = newSrc;
    });
}

function buildLoraGallery() {
    const loraGallery = document.getElementById('lora-gallery');
    if (!loraGallery) return;

    loraGallery.innerHTML = '';
    collapseLoraPanel(true);

    const query = currentLoraSearchQuery.trim().toLowerCase();
    let totalVisibleLoras = 0;

    LORA_CATEGORIES.forEach(categoryName => {
        let lorasInCategory = LORA_DATA.filter(l => l.category === categoryName);
        if (lorasInCategory.length === 0) return;

        const isCategoryVisible = currentLoraCategoryFilter === 'all' || currentLoraCategoryFilter === categoryName;
        if (!isCategoryVisible) return;

        // Filter LoRAs by search query (match lora name, category, description, or triggerWords)
        if (query) {
            lorasInCategory = lorasInCategory.filter(l =>
                l.name.toLowerCase().includes(query) ||
                (l.category && l.category.toLowerCase().includes(query)) ||
                (l.description && l.description.toLowerCase().includes(query)) ||
                (l.triggerWords && l.triggerWords.toLowerCase().includes(query))
            );
        }

        if (lorasInCategory.length === 0) return;
        totalVisibleLoras += lorasInCategory.length;

        // Category Section Header Divider
        const header = document.createElement('div');
        header.className = 'style-category-header';
        header.id = `lora-cat-${categoryName.toLowerCase().replace(/[^a-z0-9]/g, '-')}`;
        header.innerHTML = `
            <h3>${categoryName}</h3>
            <span class="style-category-count">${lorasInCategory.length} ${lorasInCategory.length === 1 ? 'LORA' : 'LORAS'}${query ? ' (FILTERED)' : ''}</span>
        `;
        loraGallery.appendChild(header);

        lorasInCategory.forEach((lora) => {
            const index = LORA_DATA.indexOf(lora);
            const card = document.createElement('div');
            card.className = 'lora-card';
            card.id = `lora-card-${index}`;
            card.dataset.loraIndex = index;
            card.dataset.category = lora.category;

            const img = document.createElement('img');
            img.className = 'lora-card-image';
            img.src = getLoraImagePath(lora);
            img.alt = lora.name;
            img.loading = 'lazy';
            img.onerror = function () {
                this.onerror = null;
                this.src = 'img/placeholder.jpg';
            };
            card.appendChild(img);

            // Fullscreen Icon Button (only visible when card is selected)
            const zoomBtn = document.createElement('button');
            zoomBtn.type = 'button';
            zoomBtn.className = 'card-fullscreen-btn';
            zoomBtn.title = 'View image in fullscreen';
            zoomBtn.setAttribute('aria-label', 'View image in fullscreen');
            zoomBtn.innerHTML = `
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="15 3 21 3 21 9"></polyline>
                    <polyline points="9 21 3 21 3 15"></polyline>
                    <line x1="21" y1="3" x2="14" y2="10"></line>
                    <line x1="3" y1="21" x2="10" y2="14"></line>
                </svg>
            `;
            zoomBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                openLoraFullscreen(index);
            });
            card.appendChild(zoomBtn);

            // Compare Button (add to compare drawer)
            const compareBtn = document.createElement('button');
            compareBtn.type = 'button';
            compareBtn.className = 'card-compare-btn';
            compareBtn.title = 'Add to compare';
            compareBtn.setAttribute('aria-label', 'Add to compare');
            compareBtn.dataset.compareType = 'lora';
            compareBtn.dataset.compareIndex = index;
            compareBtn.innerHTML = `
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                    <rect x="2" y="3" width="8" height="14" rx="1"></rect>
                    <rect x="14" y="3" width="8" height="14" rx="1"></rect>
                    <line x1="6" y1="21" x2="6" y2="19"></line>
                    <line x1="18" y1="21" x2="18" y2="19"></line>
                </svg>
            `;
            compareBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                handleCompareButtonClick('lora', index, lora, compareBtn);
            });
            card.appendChild(compareBtn);

            const title = document.createElement('div');
            title.className = 'lora-card-title';
            title.textContent = lora.name;
            title.title = `${lora.name}\n\nTrigger Words: ${lora.triggerWords}`;
            card.title = `${lora.name}\n\nTrigger Words: ${lora.triggerWords}`;
            card.appendChild(title);

            card.addEventListener('click', () => handleLoraCardClick(index));

            loraGallery.appendChild(card);
        });
    });

    // Update search badge counter
    updateSearchBadge(totalVisibleLoras, LORA_DATA.length);

    // Empty state if 0 loras match
    if (totalVisibleLoras === 0 && query) {
        const emptyState = document.createElement('div');
        emptyState.className = 'gallery-empty-state';
        emptyState.innerHTML = `
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                <line x1="8" y1="11" x2="14" y2="11"></line>
            </svg>
            <h4>No LoRAs found</h4>
            <p>No LoRAs match "<strong>${escapeHtml(query)}</strong>"${currentLoraCategoryFilter !== 'all' ? ` in ${currentLoraCategoryFilter}` : ''}</p>
            <button type="button" class="btn btn-sm btn-accent" id="btn-clear-lora-empty-search">Clear Search</button>
        `;
        loraGallery.appendChild(emptyState);

        const clearBtn = emptyState.querySelector('#btn-clear-lora-empty-search');
        if (clearBtn) {
            clearBtn.addEventListener('click', () => {
                const searchInput = document.getElementById('gallery-search-input');
                if (searchInput) {
                    searchInput.value = '';
                }
                currentLoraSearchQuery = '';
                buildLoraGallery();
                searchInput?.focus();
            });
        }
    }

    // Sync compare button states after rebuild
    if (typeof updateAllCompareButtonStates === 'function') {
        updateAllCompareButtonStates();
    }
}

function handleLoraCardClick(index) {
    const loraGallery = document.getElementById('lora-gallery');
    const lora = LORA_DATA[index];
    const card = document.getElementById(`lora-card-${index}`);
    if (!card || !lora) return;

    if (currentExpandedLora === index) {
        collapseLoraPanel();
        return;
    }

    collapseLoraPanel(false);

    currentExpandedLora = index;
    loraGallery.classList.add('has-selection');

    loraGallery.querySelectorAll('.lora-card.lora-selected').forEach(c => c.classList.remove('lora-selected'));
    card.classList.add('lora-selected');

    copyToClipboard(lora.triggerWords).then(success => {
        if (success) {
            showToast(`COPIED & APPLIED: ${lora.name}`);
        }
    });
    appendStyleToBuilder(lora.triggerWords, lora.name);

    const panel = createLoraInfoPanel(lora, index);

    const allCards = Array.from(loraGallery.querySelectorAll('.lora-card'));
    const clickedCardTop = card.offsetTop;
    const rowCards = allCards.filter(c => Math.abs(c.offsetTop - clickedCardTop) < 10);
    const lastCardInRow = rowCards[rowCards.length - 1] || card;

    lastCardInRow.insertAdjacentElement('afterend', panel);

    setTimeout(() => {
        panel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 50);
}

function createLoraInfoPanel(lora, index) {
    const panel = document.createElement('div');
    panel.className = 'lora-info-panel';
    panel.id = 'lora-info-panel-active';

    const header = document.createElement('div');
    header.className = 'lora-info-header';

    const title = document.createElement('span');
    title.className = 'lora-info-title';
    title.textContent = lora.name;

    const closeBtn = document.createElement('button');
    closeBtn.className = 'lora-info-close';
    closeBtn.textContent = '×';
    closeBtn.title = 'Close';
    closeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        collapseLoraPanel();
    });

    header.appendChild(title);
    header.appendChild(closeBtn);
    panel.appendChild(header);

    const desc = document.createElement('div');
    desc.className = 'lora-info-description';
    desc.textContent = lora.description;
    panel.appendChild(desc);

    const triggerSection = document.createElement('div');
    triggerSection.className = 'lora-trigger-section';

    const triggerLabel = document.createElement('span');
    triggerLabel.className = 'lora-trigger-label';
    triggerLabel.textContent = 'TRIGGER WORDS';
    triggerSection.appendChild(triggerLabel);

    const triggerWord = document.createElement('span');
    triggerWord.className = 'lora-trigger-word';
    triggerWord.textContent = lora.triggerWords;
    triggerWord.title = 'Click to copy trigger words';
    triggerWord.addEventListener('click', async (e) => {
        e.stopPropagation();
        const success = await copyToClipboard(lora.triggerWords);
        if (success) {
            showToast(`TRIGGER WORDS COPIED: ${lora.triggerWords.substring(0, 40)}${lora.triggerWords.length > 40 ? '...' : ''}`);
        }
        appendStyleToBuilder(lora.triggerWords, lora.name);
    });
    triggerSection.appendChild(triggerWord);
    panel.appendChild(triggerSection);

    if (lora.civitaiLink) {
        const civitaiBtn = document.createElement('a');
        civitaiBtn.className = 'lora-civitai-btn';
        civitaiBtn.href = lora.civitaiLink;
        civitaiBtn.target = '_blank';
        civitaiBtn.rel = 'noopener noreferrer';
        civitaiBtn.textContent = 'View on Civitai';
        civitaiBtn.addEventListener('click', (e) => e.stopPropagation());
        panel.appendChild(civitaiBtn);
    }

    // Append Prompt Variations Gallery
    const variationsGallery = createPanelVariationsGallery(lora, 'lora');
    panel.appendChild(variationsGallery);

    panel.addEventListener('click', (e) => e.stopPropagation());

    return panel;
}

function collapseLoraPanel(resetSelection = true) {
    const existingPanel = document.getElementById('lora-info-panel-active');
    if (existingPanel) {
        existingPanel.remove();
    }

    if (resetSelection) {
        currentExpandedLora = null;
        const loraGallery = document.getElementById('lora-gallery');
        if (loraGallery) {
            loraGallery.classList.remove('has-selection');
            loraGallery.querySelectorAll('.lora-card.lora-selected').forEach(c => c.classList.remove('lora-selected'));
        }
    }
}

function getCurrentLoraPromptText() {
    const themeObj = LORA_THEME_PROMPTS[currentLoraStyle];
    return (themeObj && themeObj[currentLoraSubstyle]) ? themeObj[currentLoraSubstyle] : '';
}

function updateLoraPromptContent() {
    const badge = document.getElementById('lora-prompt-toggle-badge');
    const title = document.getElementById('lora-prompt-drawer-title');
    const textElem = document.getElementById('lora-prompt-text');

    const styleName = currentLoraStyle === 'sci-fi' ? 'Sci-Fi' : currentLoraStyle.charAt(0).toUpperCase() + currentLoraStyle.slice(1);
    const substyleName = currentLoraSubstyle.charAt(0).toUpperCase() + currentLoraSubstyle.slice(1);

    if (badge) badge.innerHTML = `${styleName} &bull; ${substyleName}`;
    if (title) title.textContent = `${styleName} (${substyleName} Prompt)`;
    if (textElem) {
        const themeObj = LORA_THEME_PROMPTS[currentLoraStyle];
        const promptText = (themeObj && themeObj[currentLoraSubstyle])
            ? themeObj[currentLoraSubstyle]
            : `No demo prompt configured for ${styleName} (${substyleName}).`;
        textElem.textContent = promptText;
    }
}

function initLoraStyleSelector() {
    const selector = document.getElementById('lora-style-selector');
    if (!selector) return;

    const buttons = selector.querySelectorAll('.lora-style-btn');
    const promptToggle = document.getElementById('lora-prompt-toggle');
    const promptDrawer = document.getElementById('lora-prompt-drawer');
    const copyPromptBtn = document.getElementById('btn-copy-lora-prompt');

    // Sync active button state with currentLoraStyle & currentLoraSubstyle
    buttons.forEach(btn => {
        const isMatch = btn.dataset.loraStyle === currentLoraStyle && btn.dataset.loraSubstyle === currentLoraSubstyle;
        btn.classList.toggle('active', isMatch);
    });

    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            const style = btn.dataset.loraStyle;
            const substyle = btn.dataset.loraSubstyle;
            collapseLoraPanel(true);
            setGlobalPromptVariation(style, substyle);
        });
    });

    if (promptToggle && promptDrawer) {
        promptToggle.addEventListener('click', () => {
            const isHidden = promptDrawer.classList.contains('hidden');
            if (isHidden) {
                updateLoraPromptContent();
                promptDrawer.classList.remove('hidden');
                promptToggle.classList.add('expanded');
                promptToggle.setAttribute('aria-expanded', 'true');
            } else {
                promptDrawer.classList.add('hidden');
                promptToggle.classList.remove('expanded');
                promptToggle.setAttribute('aria-expanded', 'false');
            }
        });
    }

    if (copyPromptBtn) {
        copyPromptBtn.addEventListener('click', async (e) => {
            e.stopPropagation();
            const text = getCurrentLoraPromptText();
            if (text) {
                const success = await copyToClipboard(text);
                if (success) {
                    const styleName = currentLoraStyle === 'sci-fi' ? 'Sci-Fi' : currentLoraStyle.charAt(0).toUpperCase() + currentLoraStyle.slice(1);
                    const substyleName = currentLoraSubstyle.charAt(0).toUpperCase() + currentLoraSubstyle.slice(1);
                    showToast(`COPIED: ${styleName} (${substyleName}) Prompt`);
                }
            }
        });
    }

    updateLoraPromptContent();
}

function initLoraCategoryFilters() {
    const container = document.getElementById('lora-category-filters');
    if (!container) return;

    const filterBtns = container.querySelectorAll('.category-filter-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const cat = btn.dataset.category;
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentLoraCategoryFilter = cat;
            buildLoraGallery();
            showToast(`FILTER: ${cat.toUpperCase()}`);
        });
    });
}


// ---- Floating Gallery Search Logic ----
function initGallerySearch() {
    const searchInput = document.getElementById('gallery-search-input');
    const searchClear = document.getElementById('gallery-search-clear');
    if (!searchInput) return;

    searchInput.addEventListener('input', () => {
        const query = searchInput.value;
        const isLoraTab = document.getElementById('tab-loras')?.classList.contains('active');

        if (isLoraTab) {
            currentLoraSearchQuery = query;
            buildLoraGallery();
        } else {
            currentStyleSearchQuery = query;
            buildStylesGallery();
        }
    });

    if (searchClear) {
        searchClear.addEventListener('click', () => {
            searchInput.value = '';
            const isLoraTab = document.getElementById('tab-loras')?.classList.contains('active');
            if (isLoraTab) {
                currentLoraSearchQuery = '';
                buildLoraGallery();
            } else {
                currentStyleSearchQuery = '';
                buildStylesGallery();
            }
            searchInput.focus();
        });
    }

    // Global keyboard shortcuts: Ctrl+K, Cmd+K, or '/' to focus search; Esc to clear
    window.addEventListener('keydown', (e) => {
        const isCtrlK = (e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k';
        const isSlash = e.key === '/' && !['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement?.tagName);

        if (isCtrlK || isSlash) {
            e.preventDefault();
            searchInput.focus();
            searchInput.select();
        } else if (e.key === 'Escape' && document.activeElement === searchInput) {
            if (searchInput.value) {
                searchInput.value = '';
                const isLoraTab = document.getElementById('tab-loras')?.classList.contains('active');
                if (isLoraTab) {
                    currentLoraSearchQuery = '';
                    buildLoraGallery();
                } else {
                    currentStyleSearchQuery = '';
                    buildStylesGallery();
                }
            } else {
                searchInput.blur();
            }
        }
    });
}

// ---- Gallery Tab Switching ----
function switchGalleryTab(targetTab) {
    collapseStylePanel(true);
    collapseLoraPanel(true);

    // Keep active prompt selection synchronized between tabs
    setGlobalPromptVariation(currentStyleTheme, currentStyleSubstyle);

    // Synchronize prompt inspector drawer expanded state between tabs
    const stylesPromptToggle = document.getElementById('styles-prompt-toggle');
    const stylesPromptDrawer = document.getElementById('styles-prompt-drawer');
    const loraPromptToggle = document.getElementById('lora-prompt-toggle');
    const loraPromptDrawer = document.getElementById('lora-prompt-drawer');

    if (targetTab === 'styles') {
        const wasExpanded = loraPromptToggle && loraPromptToggle.classList.contains('expanded');
        if (stylesPromptToggle && stylesPromptDrawer) {
            stylesPromptToggle.classList.toggle('expanded', wasExpanded);
            stylesPromptToggle.setAttribute('aria-expanded', wasExpanded ? 'true' : 'false');
            stylesPromptDrawer.classList.toggle('hidden', !wasExpanded);
        }
    } else {
        const wasExpanded = stylesPromptToggle && stylesPromptToggle.classList.contains('expanded');
        if (loraPromptToggle && loraPromptDrawer) {
            loraPromptToggle.classList.toggle('expanded', wasExpanded);
            loraPromptToggle.setAttribute('aria-expanded', wasExpanded ? 'true' : 'false');
            loraPromptDrawer.classList.toggle('hidden', !wasExpanded);
        }
    }

    const mainTabs = document.querySelectorAll('.gallery-tab');
    mainTabs.forEach(t => t.classList.toggle('active', t.dataset.tab === targetTab));

    const stickyTabs = document.querySelectorAll('.sticky-tab-btn');
    stickyTabs.forEach(btn => {
        const isActive = btn.dataset.tab === targetTab;
        btn.classList.toggle('active', isActive);
        btn.setAttribute('aria-selected', isActive ? 'true' : 'false');
    });

    const hint = document.getElementById('gallery-hint');
    const btnRandom = document.getElementById('gnav-random');
    const btnSelected = document.getElementById('gnav-selected');
    const btnClear = document.getElementById('gnav-clear');
    const stylesStyleSelector = document.getElementById('styles-style-selector');
    const styleCategoryFilters = document.getElementById('style-category-filters');
    const loraStyleSelector = document.getElementById('lora-style-selector');
    const loraCategoryFilters = document.getElementById('lora-category-filters');

    document.querySelectorAll('.gallery-panel').forEach(p => p.classList.remove('active'));

    const searchInput = document.getElementById('gallery-search-input');
    const btnSearch = document.getElementById('gnav-search');

    if (targetTab === 'styles') {
        document.getElementById('gallery').classList.add('active');
        if (hint) hint.textContent = 'Click any style to copy prompt & add to prompt';
        if (stylesStyleSelector) stylesStyleSelector.classList.remove('hidden');
        if (styleCategoryFilters) styleCategoryFilters.classList.remove('hidden');
        if (loraStyleSelector) loraStyleSelector.classList.add('hidden');
        if (loraCategoryFilters) loraCategoryFilters.classList.add('hidden');

        if (searchInput) {
            searchInput.placeholder = 'Search styles by name, description... (Ctrl+K)';
            searchInput.value = currentStyleSearchQuery;
        }
        if (btnSearch) {
            btnSearch.setAttribute('data-tooltip', 'Search Styles (Ctrl+K)');
            btnSearch.setAttribute('title', 'Search Styles');
        }
        if (btnRandom) {
            btnRandom.setAttribute('data-tooltip', 'Random Style');
            btnRandom.setAttribute('title', 'Random Style');
        }
        if (btnSelected) {
            btnSelected.setAttribute('data-tooltip', 'Go to Selected Style');
            btnSelected.setAttribute('title', 'Go to Selected Style');
        }
        if (btnClear) {
            btnClear.setAttribute('data-tooltip', 'Clear Style Selection');
            btnClear.setAttribute('title', 'Clear Style Selection');
        }
        buildStylesGallery();
    } else {
        document.getElementById('lora-gallery').classList.add('active');
        if (hint) hint.textContent = 'Click any LoRA to copy trigger words & view details';
        if (stylesStyleSelector) stylesStyleSelector.classList.add('hidden');
        if (styleCategoryFilters) styleCategoryFilters.classList.add('hidden');
        if (loraStyleSelector) loraStyleSelector.classList.remove('hidden');
        if (loraCategoryFilters) loraCategoryFilters.classList.remove('hidden');

        if (searchInput) {
            searchInput.placeholder = 'Search LoRAs, trigger words, description... (Ctrl+K)';
            searchInput.value = currentLoraSearchQuery;
        }
        if (btnSearch) {
            btnSearch.setAttribute('data-tooltip', 'Search LoRAs (Ctrl+K)');
            btnSearch.setAttribute('title', 'Search LoRAs');
        }
        if (btnRandom) {
            btnRandom.setAttribute('data-tooltip', 'Random LoRA');
            btnRandom.setAttribute('title', 'Random LoRA');
        }
        if (btnSelected) {
            btnSelected.setAttribute('data-tooltip', 'Go to Selected LoRA');
            btnSelected.setAttribute('title', 'Go to Selected LoRA');
        }
        if (btnClear) {
            btnClear.setAttribute('data-tooltip', 'Clear LoRA Selection');
            btnClear.setAttribute('title', 'Clear LoRA Selection');
        }
        buildLoraGallery();
    }

    const gallerySection = document.getElementById('gallery-section');
    if (gallerySection && window.scrollY > gallerySection.offsetTop) {
        window.scrollTo({
            top: gallerySection.offsetTop,
            behavior: 'instant'
        });
    }
}

function initGalleryTabs() {
    const tabs = document.querySelectorAll('.gallery-tab');
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            switchGalleryTab(tab.dataset.tab);
        });
    });

    const stickyTabs = document.querySelectorAll('.sticky-tab-btn');
    stickyTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            switchGalleryTab(tab.dataset.tab);
        });
    });
}

function scrollToElementFramed(elem, offset = 70) {
    if (!elem) return;
    const rect = elem.getBoundingClientRect();
    const targetY = window.pageYOffset + rect.top - offset;
    window.scrollTo({
        top: Math.max(0, targetY),
        behavior: 'smooth'
    });
}

// ---- Floating Gallery Navigation Controls ----
function initGalleryNav() {
    const btnSearch = document.getElementById('gnav-search');
    const btnTop = document.getElementById('gnav-top');

    if (btnSearch) {
        btnSearch.addEventListener('click', () => {
            const searchInput = document.getElementById('gallery-search-input');
            if (searchInput) {
                scrollToElementFramed(searchInput, 80);
                searchInput.focus();
                searchInput.select();
                showToast('SEARCH FOCUSED');
            }
        });
    }
    const btnSelected = document.getElementById('gnav-selected');
    const btnRandom = document.getElementById('gnav-random');
    const btnClear = document.getElementById('gnav-clear');
    const btnBottom = document.getElementById('gnav-bottom');

    if (btnTop) {
        btnTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            showToast('SCROLLED TO TOP');
        });
    }

    if (btnBottom) {
        btnBottom.addEventListener('click', () => {
            const activePanel = document.querySelector('.gallery-panel.active');
            if (activePanel && activePanel.lastElementChild) {
                activePanel.lastElementChild.scrollIntoView({ behavior: 'smooth', block: 'end' });
            } else {
                window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'smooth' });
            }
            showToast('SCROLLED TO BOTTOM');
        });
    }

    if (btnSelected) {
        btnSelected.addEventListener('click', () => {
            const isLoraTab = document.getElementById('tab-loras')?.classList.contains('active');

            if (isLoraTab) {
                const selectedCard = document.querySelector('#lora-gallery .lora-card.lora-selected');
                const selectedLora = selectedCard || document.getElementById('lora-info-panel-active');
                if (selectedLora) {
                    scrollToElementFramed(selectedLora, 70);
                    selectedLora.classList.remove('nav-target-pulse');
                    void selectedLora.offsetWidth;
                    selectedLora.classList.add('nav-target-pulse');
                    showToast('LOCATED SELECTED LoRA');
                } else {
                    showToast('NO LoRA SELECTED');
                }
            } else {
                const selectedCard = document.querySelector('#gallery .style-card.style-selected');
                const selectedStyle = selectedCard || document.getElementById('style-info-panel-active');
                if (selectedStyle) {
                    scrollToElementFramed(selectedStyle, 70);
                    selectedStyle.classList.remove('nav-target-pulse');
                    void selectedStyle.offsetWidth;
                    selectedStyle.classList.add('nav-target-pulse');
                    showToast('LOCATED SELECTED STYLE');
                } else {
                    showToast('NO STYLE SELECTED');
                }
            }
        });
    }

    if (btnClear) {
        btnClear.addEventListener('click', () => {
            const isLoraTab = document.getElementById('tab-loras')?.classList.contains('active');

            if (isLoraTab) {
                const hasLoraSelection = currentExpandedLora !== null || document.querySelector('#lora-gallery .lora-card.lora-selected');
                if (hasLoraSelection) {
                    collapseLoraPanel(true);
                    showToast('LoRA SELECTION CLEARED');
                } else {
                    showToast('NO LoRA SELECTION TO CLEAR');
                }
            } else {
                const hasStyleSelection = currentExpandedStyle !== null || document.querySelector('#gallery .style-card.style-selected');
                if (hasStyleSelection) {
                    collapseStylePanel(true);
                    showToast('STYLE SELECTION CLEARED');
                } else {
                    showToast('NO STYLE SELECTION TO CLEAR');
                }
            }
        });
    }

    if (btnRandom) {
        btnRandom.addEventListener('click', () => {
            const isLoraTab = document.getElementById('tab-loras')?.classList.contains('active');

            if (isLoraTab) {
                const visibleCards = Array.from(document.querySelectorAll('#lora-gallery .lora-card'));
                if (visibleCards.length > 0) {
                    const randomCard = visibleCards[Math.floor(Math.random() * visibleCards.length)];
                    const index = parseInt(randomCard.dataset.loraIndex, 10);
                    handleLoraCardClick(index);
                    scrollToElementFramed(randomCard, 70);
                    randomCard.classList.remove('nav-target-pulse');
                    void randomCard.offsetWidth;
                    randomCard.classList.add('nav-target-pulse');
                }
            } else {
                const visibleCards = Array.from(document.querySelectorAll('#gallery .style-card'));
                if (visibleCards.length > 0) {
                    const randomCard = visibleCards[Math.floor(Math.random() * visibleCards.length)];
                    const index = parseInt(randomCard.dataset.styleIndex, 10);
                    handleStyleCardClick(index);
                    scrollToElementFramed(randomCard, 70);
                    randomCard.classList.remove('nav-target-pulse');
                    void randomCard.offsetWidth;
                    randomCard.classList.add('nav-target-pulse');
                }
            }
        });
    }
}

// ==============================================
// PROMPT BUILDER LOGIC
// Managed in dedicated module: prompt-builder.js
// ==============================================

// ==============================================
// IMAGE COMPARE DRAWER & FULLSCREEN COMPARISON
// ==============================================

let compareItems = []; // Array of { id, type, name, imagePath, theme, substyle, variationLabel }
let compareIdCounter = 0;
let isCompareDrawerOpen = false;
let isCompareFullscreenOpen = false;

/**
 * Generates a unique compare item from the current card state.
 */
function createCompareItem(type, index, item) {
    const id = ++compareIdCounter;
    let imagePath, theme, substyle, variationLabel;

    if (type === 'style') {
        imagePath = getStyleImagePath(item);
        theme = currentStyleTheme;
        substyle = currentStyleSubstyle;
        const themeDisplay = theme === 'sci-fi' ? 'Sci-Fi' : theme.charAt(0).toUpperCase() + theme.slice(1);
        variationLabel = `${themeDisplay} • ${substyle.charAt(0).toUpperCase() + substyle.slice(1)}`;
    } else {
        imagePath = getLoraImagePath(item);
        theme = currentLoraStyle;
        substyle = currentLoraSubstyle;
        const themeDisplay = theme === 'sci-fi' ? 'Sci-Fi' : theme.charAt(0).toUpperCase() + theme.slice(1);
        variationLabel = `${themeDisplay} • ${substyle.charAt(0).toUpperCase() + substyle.slice(1)}`;
    }

    return {
        id,
        type,
        index,
        name: item.name,
        imagePath,
        theme,
        substyle,
        variationLabel
    };
}

/**
 * Handles clicking the compare button on a card.
 * Toggles the item in/out of the compare list.
 */
function handleCompareButtonClick(type, index, item, btnElement) {
    // Check if this exact image (same type + index + theme + substyle) is already in compare
    const currentTheme = type === 'style' ? currentStyleTheme : currentLoraStyle;
    const currentSubstyle = type === 'style' ? currentStyleSubstyle : currentLoraSubstyle;

    const existingIndex = compareItems.findIndex(ci =>
        ci.type === type &&
        ci.index === index &&
        ci.theme === currentTheme &&
        ci.substyle === currentSubstyle
    );

    if (existingIndex !== -1) {
        // Remove it
        compareItems.splice(existingIndex, 1);
        btnElement.classList.remove('in-compare');
        btnElement.title = 'Add to compare';
        showToast(`Removed from compare: ${item.name}`);
    } else {
        const wasEmpty = compareItems.length === 0;

        // Add it
        const compareItem = createCompareItem(type, index, item);
        compareItems.push(compareItem);
        btnElement.classList.add('in-compare');
        btnElement.title = 'Remove from compare';
        showToast(`Added to compare: ${item.name}`);
        pulseCompareToggleBtn();

        // Auto-open drawer when transitioning from empty to having items
        if (wasEmpty) {
            openCompareDrawer();
        }
    }

    renderCompareDrawer();
    updateAllCompareButtonStates();
}

/**
 * Scans all visible compare buttons and updates their in-compare state.
 * Called after theme/substyle changes to keep button states accurate.
 */
function updateAllCompareButtonStates() {
    // Update style card compare buttons
    document.querySelectorAll('#gallery .card-compare-btn').forEach(btn => {
        const type = btn.dataset.compareType;
        const index = parseInt(btn.dataset.compareIndex, 10);
        if (type !== 'style' || isNaN(index)) return;

        const isInCompare = compareItems.some(ci =>
            ci.type === 'style' &&
            ci.index === index &&
            ci.theme === currentStyleTheme &&
            ci.substyle === currentStyleSubstyle
        );
        btn.classList.toggle('in-compare', isInCompare);
        btn.title = isInCompare ? 'Remove from compare' : 'Add to compare';
    });

    // Update lora card compare buttons
    document.querySelectorAll('#lora-gallery .card-compare-btn').forEach(btn => {
        const type = btn.dataset.compareType;
        const index = parseInt(btn.dataset.compareIndex, 10);
        if (type !== 'lora' || isNaN(index)) return;

        const isInCompare = compareItems.some(ci =>
            ci.type === 'lora' &&
            ci.index === index &&
            ci.theme === currentLoraStyle &&
            ci.substyle === currentLoraSubstyle
        );
        btn.classList.toggle('in-compare', isInCompare);
        btn.title = isInCompare ? 'Remove from compare' : 'Add to compare';
    });
}

/**
 * Adds the compare toggle button pulse animation.
 */
function pulseCompareToggleBtn() {
    const toggleBtn = document.getElementById('btn-toggle-compare-drawer');
    if (!toggleBtn) return;
    toggleBtn.classList.remove('pulse-anim');
    void toggleBtn.offsetWidth;
    toggleBtn.classList.add('pulse-anim');
}

/**
 * Removes a compare item by its unique ID.
 */
function removeFromCompare(id) {
    const idx = compareItems.findIndex(ci => ci.id === id);
    if (idx !== -1) {
        const removed = compareItems[idx];
        compareItems.splice(idx, 1);
        showToast(`Removed from compare: ${removed.name}`);
        renderCompareDrawer();
        updateAllCompareButtonStates();

        // If fullscreen compare view is open, refresh or close it
        if (isCompareFullscreenOpen) {
            if (compareItems.length === 0) {
                closeCompareFullscreen();
            } else {
                renderCompareFullscreenGrid();
            }
        }
    }
}

/**
 * Clears all compare items.
 */
function clearCompare() {
    if (compareItems.length === 0) return;
    compareItems = [];
    compareIdCounter = 0;
    showToast('Compare cleared');
    renderCompareDrawer();
    updateAllCompareButtonStates();
    if (isCompareFullscreenOpen) {
        closeCompareFullscreen();
    }
}

/**
 * Renders the compare drawer contents: toggle button badge, drawer thumbnails, count.
 */
function renderCompareDrawer() {
    const toggleBtn = document.getElementById('btn-toggle-compare-drawer');
    const badge = document.getElementById('compare-toggle-badge');
    const countElem = document.getElementById('compare-drawer-count');
    const itemsContainer = document.getElementById('compare-drawer-items');
    const compareBtn = document.getElementById('btn-compare-fullscreen');
    const clearBtn = document.getElementById('btn-compare-clear');
    const count = compareItems.length;

    // Update toggle button visibility and badge
    if (toggleBtn) {
        toggleBtn.classList.toggle('has-items', count > 0);
    }
    if (badge) {
        badge.textContent = count;
    }
    if (countElem) {
        countElem.textContent = `${count} image${count !== 1 ? 's' : ''}`;
    }

    // Enable/disable action buttons
    if (compareBtn) {
        compareBtn.disabled = count < 2;
        compareBtn.style.opacity = count < 2 ? '0.4' : '1';
        compareBtn.style.pointerEvents = count < 2 ? 'none' : 'auto';
    }
    if (clearBtn) {
        clearBtn.disabled = count === 0;
        clearBtn.style.opacity = count === 0 ? '0.4' : '1';
        clearBtn.style.pointerEvents = count === 0 ? 'none' : 'auto';
    }

    // Close drawer if no items
    if (count === 0 && isCompareDrawerOpen) {
        closeCompareDrawer();
    }

    // Render thumbnails
    if (!itemsContainer) return;
    itemsContainer.innerHTML = '';

    if (count === 0) {
        const emptyMsg = document.createElement('div');
        emptyMsg.className = 'compare-drawer-empty';
        emptyMsg.textContent = 'Click the compare button on any card to add images here';
        itemsContainer.appendChild(emptyMsg);
        return;
    }

    compareItems.forEach(item => {
        const thumb = document.createElement('div');
        thumb.className = 'compare-thumb';

        const img = document.createElement('img');
        img.className = 'compare-thumb-img';
        img.src = item.imagePath;
        img.alt = item.name;
        img.loading = 'lazy';
        img.onerror = function () {
            this.onerror = null;
            this.src = 'img/placeholder.jpg';
        };
        thumb.appendChild(img);

        const removeBtn = document.createElement('button');
        removeBtn.type = 'button';
        removeBtn.className = 'compare-thumb-remove';
        removeBtn.title = 'Remove from compare';
        removeBtn.setAttribute('aria-label', `Remove ${item.name} from compare`);
        removeBtn.textContent = '×';
        removeBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            removeFromCompare(item.id);
        });
        thumb.appendChild(removeBtn);

        const label = document.createElement('div');
        label.className = 'compare-thumb-label';
        label.textContent = item.name;
        label.title = `${item.name} — ${item.variationLabel}`;

        const typeBadge = document.createElement('span');
        typeBadge.className = 'compare-thumb-type';
        typeBadge.textContent = `${item.type === 'style' ? 'Style' : 'LoRA'} • ${item.variationLabel}`;
        label.appendChild(typeBadge);

        thumb.appendChild(label);
        itemsContainer.appendChild(thumb);
    });
}

/**
 * Opens the compare drawer.
 */
function openCompareDrawer() {
    const drawer = document.getElementById('compare-drawer');
    const toggleBtn = document.getElementById('btn-toggle-compare-drawer');
    if (!drawer) return;
    drawer.classList.add('open');
    if (toggleBtn) {
        toggleBtn.classList.add('drawer-open');
        toggleBtn.setAttribute('aria-expanded', 'true');
    }
    isCompareDrawerOpen = true;
}

/**
 * Closes the compare drawer.
 */
function closeCompareDrawer() {
    const drawer = document.getElementById('compare-drawer');
    const toggleBtn = document.getElementById('btn-toggle-compare-drawer');
    if (!drawer) return;
    drawer.classList.remove('open');
    if (toggleBtn) {
        toggleBtn.classList.remove('drawer-open');
        toggleBtn.setAttribute('aria-expanded', 'false');
    }
    isCompareDrawerOpen = false;
}

/**
 * Toggles the compare drawer open/closed.
 */
function toggleCompareDrawer() {
    if (isCompareDrawerOpen) {
        closeCompareDrawer();
    } else {
        openCompareDrawer();
    }
}

/**
 * Renders the grid cells for the fullscreen comparison view.
 */
function renderCompareFullscreenGrid() {
    const body = document.getElementById('compare-fullscreen-body');
    if (!body) return;

    body.innerHTML = '';
    const count = compareItems.length;
    body.setAttribute('data-count', count);

    const titleElem = document.querySelector('.compare-fullscreen-title');
    if (titleElem) {
        titleElem.textContent = `COMPARE VIEW (${count} ${count === 1 ? 'IMAGE' : 'IMAGES'})`;
    }

    compareItems.forEach(item => {
        const cell = document.createElement('div');
        cell.className = 'compare-fullscreen-cell';

        const img = document.createElement('img');
        img.className = 'compare-fullscreen-img';
        img.src = item.imagePath;
        img.alt = item.name;
        img.onerror = function () {
            this.onerror = null;
            this.src = 'img/placeholder.jpg';
        };
        cell.appendChild(img);

        // Remove button directly on the fullscreen cell
        const removeBtn = document.createElement('button');
        removeBtn.type = 'button';
        removeBtn.className = 'compare-thumb-remove compare-fullscreen-remove';
        removeBtn.title = 'Remove from compare';
        removeBtn.setAttribute('aria-label', `Remove ${item.name} from compare`);
        removeBtn.textContent = '×';
        removeBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            removeFromCompare(item.id);
        });
        cell.appendChild(removeBtn);

        const label = document.createElement('div');
        label.className = 'compare-fullscreen-label';

        const nameSpan = document.createElement('div');
        nameSpan.className = 'compare-fullscreen-name';
        nameSpan.textContent = item.name;
        label.appendChild(nameSpan);

        const metaSpan = document.createElement('div');
        metaSpan.className = 'compare-fullscreen-meta';
        metaSpan.textContent = `${item.type === 'style' ? 'Style' : 'LoRA'} • ${item.variationLabel}`;
        label.appendChild(metaSpan);

        cell.appendChild(label);
        body.appendChild(cell);
    });
}

/**
 * Opens the fullscreen comparison view.
 */
function openCompareFullscreen() {
    if (compareItems.length < 2) return;

    const modal = document.getElementById('compare-fullscreen-modal');
    if (!modal) return;

    renderCompareFullscreenGrid();

    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('compare-fullscreen-open');
    isCompareFullscreenOpen = true;
}

/**
 * Closes the fullscreen comparison view.
 */
function closeCompareFullscreen() {
    const modal = document.getElementById('compare-fullscreen-modal');
    if (!modal) return;

    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('compare-fullscreen-open');
    isCompareFullscreenOpen = false;
}

/**
 * Initializes all compare drawer event listeners.
 */
function initCompareDrawer() {
    const toggleBtn = document.getElementById('btn-toggle-compare-drawer');
    const closeBtn = document.getElementById('btn-compare-drawer-close');
    const clearBtn = document.getElementById('btn-compare-clear');
    const compareBtn = document.getElementById('btn-compare-fullscreen');
    const fullscreenCloseBtn = document.getElementById('btn-compare-fullscreen-close');

    // Toggle drawer
    if (toggleBtn) {
        toggleBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleCompareDrawer();
        });
    }

    // Close drawer
    if (closeBtn) {
        closeBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            closeCompareDrawer();
        });
    }

    // Clear all
    if (clearBtn) {
        clearBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            clearCompare();
        });
    }

    // Open fullscreen compare
    if (compareBtn) {
        compareBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            openCompareFullscreen();
        });
    }

    // Close fullscreen compare
    if (fullscreenCloseBtn) {
        fullscreenCloseBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            closeCompareFullscreen();
        });
    }

    // Horizontal wheel scrolling for fullscreen comparison
    const fullscreenBody = document.getElementById('compare-fullscreen-body');
    if (fullscreenBody) {
        fullscreenBody.addEventListener('wheel', (e) => {
            if (isCompareFullscreenOpen && e.deltaY !== 0 && fullscreenBody.scrollWidth > fullscreenBody.clientWidth) {
                e.preventDefault();
                fullscreenBody.scrollLeft += e.deltaY;
            }
        }, { passive: false });
    }

    // Keyboard navigation: Escape to close, ArrowLeft/Right to scroll compare view
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            if (isCompareFullscreenOpen) {
                e.stopPropagation();
                closeCompareFullscreen();
            } else if (isCompareDrawerOpen) {
                e.stopPropagation();
                closeCompareDrawer();
            }
        } else if (isCompareFullscreenOpen && (e.key === 'ArrowRight' || e.key === 'ArrowLeft')) {
            const body = document.getElementById('compare-fullscreen-body');
            if (body && body.scrollWidth > body.clientWidth) {
                e.preventDefault();
                const scrollAmount = e.key === 'ArrowRight' ? 380 : -380;
                body.scrollBy({ left: scrollAmount, behavior: 'smooth' });
            }
        }
    });

    // Initial render
    renderCompareDrawer();
}

// ---- Init ----
document.addEventListener('DOMContentLoaded', async () => {
    const loaded = await loadDatasets();
    if (!loaded) return;
    randomizeInitialVariation();
    buildStylesGallery();
    buildLoraGallery();
    initGalleryTabs();
    initGallerySearch();
    initGalleryNav();
    initStylesThemeSelector();
    initStyleCategoryFilters();
    initLoraStyleSelector();
    initLoraCategoryFilters();
    initPromptBuilder();
    initBuilderDrawer();
    initLightbox();
    initCompareDrawer();
});