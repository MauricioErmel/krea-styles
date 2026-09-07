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
            appendStyleToBuilder(text);
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
    appendStyleToBuilder(style.prompt);

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
        appendStyleToBuilder(style.prompt);
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
    appendStyleToBuilder(lora.triggerWords);

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
        appendStyleToBuilder(lora.triggerWords);
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
// PROMPT BUILDER LOGIC & STATE ENGINE
// ==============================================

const CHARACTER_FIELD_DEFS = {
    // Body Group
    age: {
        group: "Body",
        label: "Perceived age",
        placeholder: "e.g. A 20 years old",
        tags: ["20 years old", "30s", "teenager", "elderly", "child", "middle-aged", "early 20s", "mid-40s", "young adult", "ageless / ancient", "octogenarian", "toddler", "centenarian", "immortal appearance", "distinguished 50s", "pre-teen", "late 30s"]
    },
    gender: {
        group: "Body",
        label: "Perceived gender",
        placeholder: "e.g. male",
        tags: ["male", "female", "androgynous", "non-binary"]
    },
    species: {
        group: "Body",
        label: "Species",
        placeholder: "e.g. human",
        tags: ["human", "elf", "demon", "cyborg", "orc", "dwarf", "vampire", "cat-person", "dragonkin", "angel / celestial", "android", "mermaid / siren", "tiefling", "werewolf / lycan", "fae / fairy", "goblin", "centaur", "elemental entity", "extraterrestrial alien", "satyr", "dragonborn", "gnome", "halfling", "aasimar", "genasi", "tabaxi / cat-folk", "goliath", "lizardfolk", "kenku / bird-person", "warforged"]
    },
    skinTone: {
        group: "Body",
        label: "Skin tone and details",
        placeholder: "e.g. light-blue skin tone, hand tattoos...",
        tags: ["light-blue skin tone", "fair skin", "tanned skin", "dark obsidian skin", "pale porcelain skin", "hand tattoos", "freckles", "scarred skin", "olive complexion", "golden bronze skin", "deep espresso skin", "bioluminescent skin", "emerald green skin", "tribal facial tattoos", "scars across bridge of nose", "vitiligo skin pattern", "metallic chrome skin", "weathered sun-kissed skin", "ashen grey skin", "rosy cheeks"]
    },
    physique: {
        group: "Body",
        label: "Physique",
        placeholder: "e.g. skinny body type",
        tags: ["skinny body type", "athletic", "muscular", "slender", "curvy", "tall and lean", "stocky & burly", "petite frame", "heroic muscular build", "voluptuous", "gaunt & emaciated", "towering giant build", "toned swimmer physique", "broad-shouldered", "wirily agile", "heavyweight powerlifter", "soft & rounded"]
    },
    otherBody: {
        group: "Body",
        label: "Other body features",
        placeholder: "e.g. nails black and long (witch-like)",
        tags: ["witch-like long nails", "scars on back", "glowing veins", "feathered wings", "robotic arm", "demon horns", "prehensile tail", "cybernetic eye implant", "scaly dragon skin patches", "glowing energy runes", "four-armed (multiple limbs)", "shadowy aura", "crystal growths", "pointed claws", "mechanical spine cyberware", "translucent skin", "bat-like leathery wings", "glowing magical tattoos on arms", "branched wooden antlers", "subtle gills on neck", "glowing chest core reactor", "floating orb companion nearby", "translucent ethereal hands", "chitinous armor plates on shoulders", "flaming aura radiating off shoulders", "smoke trails drifting from skin", "metallic chrome joints", "scars forming ancient rune pattern", "split snake-like tongue", "spiked spinal ridge", "bioluminescent luminescent skin spots", "retractable wrist blades", "shadowy tentacle tendrils on back", "halo of floating light", "sharp vampiric fangs visible", "feathered wings folded on back"]
    },

    // Head Group
    hair: {
        group: "Head",
        label: "Hair",
        placeholder: "e.g. Long black wavy hair",
        tags: ["long black wavy hair", "short messy blonde hair", "silver pixie cut", "bald", "braided dreadlocks", "neon blue mohawk", "fiery red bob cut", "afro puff hairstyle", "waist-length white hair", "cyberpunk undercut", "slicked-back dark hair", "curly shoulder-length hair", "pastel pink twin tails", "top knot samurai bun", "braided crown updo", "wild voluminous mane", "buzz cut", "shoulder-length auburn waves", "platinum blonde side-swept hair", "cornrow braids into high ponytail", "shaggy wolf cut", "glowing holographic fiber-optic hair", "emerald green curly afro", "slicked pompadour", "half-up half-down top knot", "long raven-black straight hair with blunt bangs", "messy bedhead hair", "ashen grey dreadlocks with beads", "curled Victorian ringlets", "crimson red pixie cut with side shaved", "golden blonde twin braids", "neon violet anime spiky hair", "chestnut brown curtain bangs", "frosted tips short hair", "long flowing ethereal silver hair", "braided Viking hair with shaved sides", "two-tone split dye black & pink hair"]
    },
    faceShape: {
        group: "Head",
        label: "Face shape",
        placeholder: "e.g. long face, No tattoos on face",
        tags: ["long face", "sharp jawline", "round face", "oval face", "high cheekbones", "square jawline", "heart-shaped face", "chiseled facial structure", "soft rounded chin", "diamond face shape", "hollow sunken cheeks", "broad forehead", "delicate refined features", "rugged weathered visage", "prominent jawbone", "youthful soft contours", "triangle-shaped face", "inverted triangle face", "strong angular chin", "subtle dimpled cheeks", "soft doll-like facial features"]
    },
    eyes: {
        group: "Head",
        label: "Eyes",
        placeholder: "e.g. black eyes",
        tags: ["black eyes", "piercing blue", "glowing yellow-green", "heterochromia", "cat eyes", "deep emerald green", "warm honey amber", "glowing red cyborg optic", "amethyst purple eyes", "smoldering dark brown", "milky blind white eyes", "starry cosmic pupils", "expressive hazel eyes", "heavy-lidded sleepy eyes", "glowing cyan iris", "slanted feline gaze", "glowing golden eyes", "smoky eye makeup with winged eyeliner", "reptilian slit pupils", "crystal clear ice blue eyes", "monolid eyes", "almond-shaped dark eyes", "glowing white glowing eyes", "fiery orange iris", "patch over one eye", "deep sunken dark-circled eyes"]
    },
    nose: {
        group: "Head",
        label: "Nose",
        placeholder: "e.g. hooked nose",
        tags: ["hooked nose", "button nose", "straight nose", "pierced nose", "aquiline hawk nose", "upturned nose", "crooked broken nose", "broad flat nose", "slender narrow bridge", "septum ring piercing", "small delicate nose", "prominent Roman nose", "snub nose", "double pierced nostril", "freckled nose bridge", "greek straight nose", "small button nose with band-aid", "cybernetic metallic nose ridge", "nixie piercing nostril stud", "wide flared nostrils", "soft rounded nose tip", "high bridged narrow nose", "small scarred nose bridge", "animalistic snout-like nose", "delicate upturned nose tip"]
    },
    ears: {
        group: "Head",
        label: "Ears",
        placeholder: "e.g. Small, pointy and bifurcated",
        tags: ["small, pointy and bifurcated", "elf pointed ears", "cat ears", "pierced lobes", "long drooping elf ears", "industrial piercing ears", "fin-like aquatic ears", "furry fox ears", "multiple cuff earrings", "round human ears", "pointed goblin ears", "tapered fae ears", "gauge stretched earlobes", "feather earring adorned", "subtle pointed tips", "bunny rabbit ears", "large wolf ears", "horn-like pointed ears", "translucent glowing elf tips", "cybernetic audio receiver ears", "draped chain earring piercing", "pointed bat-like ears", "long floppy animal ears", "tufted lynx ear tips", "small hidden earlobes under hair"]
    },
    mouth: {
        group: "Head",
        label: "Mouth",
        placeholder: "e.g. sly confident smirk",
        tags: ["sly confident smirk", "fanged grin", "full lips", "stern expression", "pouted red lipstick", "thin tight-lipped scowl", "warm gentle smile", "lip ring piercing", "playful tongue out", "snarl revealing sharp teeth", "subtle neutral pout", "bitten lower lip", "stitched mouth appearance", "beaming radiant smile", "cynical half-smile", "glowing lip gloss", "dark gothic black lipstick", "open mouth gasping", "snake-like fangs peaking out", "charming dimpled smile", "metallic lip cuff piercing", "scratched scarred lips", "wide mischievous grin", "subtle pouty lips", "smoking a cigarette between lips"]
    },
    headAccessories: {
        group: "Head",
        label: "Head accessories",
        placeholder: "e.g. crown of short gnarled twigs",
        tags: ["grecian laurel wreath crown", "horned helmet", "glowing halo", "bandana", "steampunk goggles", "golden ornate tiara", "wide-brimmed witch hat", "cybernetic visor", "flower crown", "samurai kabuto helmet", "headphones around neck", "jeweled headband", "tactical balaclava", "feathered headdress", "pointy wizard hat", "spiked gothic crown", "ornate golden monocle", "aviator sunglasses", "glowing neon halo VR headset", "pirate tricorn hat", "beaded tribal hair comb", "lace veil over face", "studded leather eyepatch", "bamboo conical rice hat", "knitted beanie", "forward-facing baseball cap", "feathered beret", "spiked oni demon mask pushed to side", "crystal forehead circlet", "gas mask with glowing canisters", "regal velvet crown", "cyberpunk holographic cat-ear headset", "high-tech tactical night-vision goggles", "straw sun hat with ribbon", "feathered masquerade eye mask", "horned ram skull helmet"]
    },

    // Clothing
    clothing: {
        group: "Clothing",
        label: "Clothing",
        placeholder: "e.g. wearing a fitted leather doublet-style jacket...",
        tags: ["fitted leather doublet jacket", "cyberpunk trench coat", "gothic velvet dress", "plate armor", "casual hoodie & jeans", "flowing silk robes", "tactical military vest & cargo pants", "tailored Victorian suit", "kimono with floral embroidery", "sci-fi exosuit armor", "bohemian oversized sweater", "steampunk corset & bustier", "royal ornate golden armor", "denim jacket & graphic tee", "high-tech bodysuit", "wasteland scavenger rags", "chic evening gown", "traditional knight surcoat", "nudity", "topless", "full nudity", "burlap tunic & leather belt", "glowing cybernetic latex jumpsuit", "distressed leather biker jacket & jeans", "medieval chainmail armor shirt", "minimalist linen toga", "elegant silk evening tuxedo", "bohemian embroidered tunic & harem pants", "futuristic space captain uniform", "pirate captain coat with gold trimmings", "heavy winter parka with fur trim", "vintage 1920s flapper dress", "scraggy ragged poncho & bandages", "royal velvet cape with fur collar", "gothic lace corset & layered skirt", "tactical urban stealth ninja garb", "traditional Japanese yukata", "high-waisted cargo pants & crop top", "monk habit cloth robes", "post-apocalyptic leather armor with shoulder spikes", "athletic sports bra & leggings", "vintage 70s denim overalls", "sci-fi pilot flight suit", "formal ballroom gown with long train", "steampunk waist-coat & pocket watch", "high-collar leather duster coat", "tropical Hawaiian floral shirt & shorts", "samurai lamellar armor with chestplate", "cyberpunk neon lit bomber jacket", "cozy knit cardigan & scarf", "gladiator leather harness & kilt", "court jester motley costume", "transparent rain coat over streetwear", "traditional Hanfu flowing dress", "rugged hunter fur cloak", "school uniform blazer & pleated skirt", "heavy mechanical mech suit pilot harness", "minimalist silk slip dress"]
    },

    // Gesture/Pose
    gesturePose: {
        group: "Gesture/Pose/face expression",
        label: "Gesture / Pose / Face expression",
        placeholder: "e.g. Character looking to camera, holding a playing card...",
        tags: ["looking to camera", "seated at table", "holding a playing card", "hands in pockets", "casting a spell", "direct eye contact", "arms crossed over chest", "leaning against a wall", "drawing a sword from sheath", "mid-air dynamic battle pose", "waving hand towards viewer", "sitting cross-legged", "glancing over shoulder", "holding out a glowing orb", "kneeling in reverence", "walking forward confidently", "hand resting under chin", "dramatic spellcasting stance", "sly mischievous smirk", "broad cheerful smile", "intense stern glare", "whispering into someone's ear", "pointing finger forward", "adjusting glasses with one finger", "holding a steaming cup of coffee", "reading an ancient dusty tome", "saluting formally", "crying tears of joy", "screaming in battle fury", "thoughtful chin stroke", "resting head on hand tiredly", "shrugging shoulders nonchalantly", "winking playfully at camera", "arms raised in victory celebration", "crouched low in stealth stance", "aiming a bow and arrow", "holding a glowing neon katana", "adjusting collar / tie", "running forward towards camera", "floating weightlessly in zero gravity", "sleeping peacefully tilted back", "biting lower lip nervously", "pouting dramatically", "holding a staff up to light", "finger placed over lips (shh gesture)", "hand outstretched offering help", "leaning forward over desk", "arms outstretched wide welcomingly", "holding a pistol pointed sideways", "tossing a coin in the air", "meditating peacefully in mid-air", "shielding face from bright light", "holding a wine glass by the stem", "hugging knees tightly while seated", "beckoning with one finger come here", "resting hands on hips confidently", "glaring downwards condescendingly", "looking up at sky in awe"]
    }
};

const SCENE_FIELD_TAGS = {
    'scene-positioning': ["side by side facing each other", "standing behind one another", "back to back in center frame", "one in left foreground, others in right background", "one seated with others standing beside", "symmetrical balanced layout", "center character in focus, companions in background", "facing each other with intense eye contact", "one on the ground looking up at others", "one seated at desk, others standing near doorway", "dramatic embrace in center focus", "one in foreground action, others watching from distance", "diagonal depth arrangement across frame", "one on upper balcony, others in courtyard below", "trio formation: center leader flanked by companions", "one kneeling before another seated figure", "staggered depth positioning", "circular gathering around center focus", "staggered line facing camera", "one standing centrally, others leaning on left and right", "group portrait formation with varying heights", "one in sharp foreground focus, others blurred in background", "flanking formation on both sides", "walking side by side towards camera", "one resting head on another's shoulder", "spread out across wide landscape view", "locked in intense dueling combat stance", "sitting around campfire in circle", "one standing guard while others rest", "clustered together looking at map or hologram", "one in center leading the charge, companions behind", "whispering secretively in close huddle", "facing away towards distant horizon"],
    'scene-other-details': ["small demonic imp over shoulder", "floating magic runes", "dust motes in sunbeam", "sparkling embers", "ghostly transparent silhouette", "floating glowing holographic UI windows", "swirling falling cherry blossom petals", "heavy falling rain drops & water splashes", "flock of crows flying in background", "crackling arc lightning bolts", "floating crystal shards", "dense volumetric fog and ground mist", "glowing neon signs reflecting in puddles", "floating mechanical drone observer", "swirling autumn leaves", "dramatic shadows cast on wall", "glowing fireflies floating in night air", "shattered floating mirror fragments", "drifting snowflakes during blizzard", "swirling colorful smoke trails", "floating glowing ancient tarot cards", "glowing energy tendrils", "falling golden autumn maple leaves", "steaming heat haze rising", "floating magic orb of light", "drifting floating feather motes", "floating cybernetic HUD glitch artifacts", "soft glowing candlelight flickering", "subtle light bokeh circles in background", "floating bioluminescent jellyfish in air", "splatters of glowing neon paint", "floating clockwork gears and cogs", "rising bubbles under water", "dramatic lens flare from sun beam", "shimmering aurora borealis streaks", "shadowy tentacles emerging from dark"],
    'scene-background': ["busy atmospheric tavern", "futuristic neon city street", "enchanted bioluminescent forest", "cozy dimly lit library", "dramatic mountain peak", "ancient stone cathedral with stained glass windows", "cyberpunk underground bar with holo-displays", "sun-drenched tropical beach with turquoise water", "ruined gothic castle under full moon", "spaceship bridge with view of star nebula", "steampunk clockwork workshop filled with gears", "mystical underwater coral reef palace", "post-apocalyptic overgrown city ruins", "vibrant Japanese night market alleyway", "desert dunes under starry night sky", "grand royal palace throne room", "misty bamboo forest at dawn", "abandoned industrial warehouse with broken skylights", "floating island sanctuary above clouds", "cyberpunk rooftop overlooking megacity skyscraper skyline", "cozy coffee shop with rain-streaked window", "ancient Egyptian pyramid tomb interior", "sunlit meadow filled with colorful wildflowers", "steampunk airship deck soaring through sky", "gothic cemetery under stormy thunderstorm", "volcanic landscape with rivers of glowing lava", "futuristic sterile white laboratory", "snowy mountain chalet with warm fireplace", "vibrant carnival with glowing Ferris wheel", "overgrown ancient temple overgrown with ivy", "alien planet landscape with dual moons", "dimly lit alchemist potions shop", "sun-dappled autumn park path", "neon-lit Arcade with retro gaming cabinets", "majestic waterfall dropping into deep lagoon", "cozy bedroom bathed in soft sunset lighting"],
    'scene-camera': ["shot from wrist up", "close-up portrait", "wide cinematic shot", "low angle dramatic view", "over-the-shoulder shot", "bird's-eye high angle view", "extreme macro close-up on eyes", "dramatic worm's-eye camera perspective", "dutch angle tilted composition", "full-body portrait shot", "cinematic 35mm shallow depth-of-field", "fisheye lens ultra-wide view", "medium waist-up shot", "first-person point-of-view perspective", "telephoto lens compressed background shot", "panoramic wide landscape framing", "drone aerial tracking shot", "medium close-up portrait", "cowboy shot (knee-up framing)", "cinematic anamorphic 2.39:1 aspect ratio view", "motion blur action tracking shot", "extreme wide shot establishing environment", "tilted dynamic camera angle", "profile side view shot", "ground-level camera perspective", "soft focus dreamlike lens", "split-diopter dual focus shot", "high-speed capture freezing motion", "overhead 90-degree flat lay camera angle", "silhouette backlit camera angle", "underwater camera perspective looking up", "tracking shot following movement", "shallow depth-of-field with heavy background bokeh", "wide-angle environmental portrait", "low-angle hero shot", "cinematic 50mm natural eye-level framing"],
    'scene-style': ["angular 3d art style with brush stroke texture", "ghibli anime style", "photorealistic 8k", "vintage 70s comic style", "dark fantasy ink drawing", "oil painting style", "vibrant vaporwave synthwave aesthetic", "watercolor paint on textured paper", "cyberpunk neon noir illustration", "surrealist Salvador Dali style", "art nouveau decorative linework", "retro 80s anime visual", "charcoal pencil sketch", "gothic dark fantasy illustration", "cel-shaded 3D render", "vivid pop art style with halftone dots", "flat vector graphic minimalist art"]
};

let builderState = {
    characters: [
        createEmptyCharacter(1)
    ],
    activeCharId: null,
    scene: {
        positioning: '',
        otherDetails: '',
        background: '',
        camera: '',
        style: ''
    }
};

// Set initial active character ID
builderState.activeCharId = builderState.characters[0].id;

function createEmptyCharacter(indexNumber) {
    return {
        id: `char-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
        name: `Character ${indexNumber}`,
        age: '',
        gender: '',
        species: '',
        skinTone: '',
        physique: '',
        otherBody: '',
        hair: '',
        faceShape: '',
        eyes: '',
        nose: '',
        ears: '',
        mouth: '',
        headAccessories: '',
        clothing: '',
        gesturePose: ''
    };
}

// Append or update style in builder
function appendStyleToBuilder(promptText) {
    const styleElem = document.getElementById('scene-style');
    if (!styleElem) return;

    styleElem.value = promptText;
    builderState.scene.style = promptText;
    updatePromptOutputPreview();

    // Update clear button visibility for style field
    const clearBtn = document.querySelector('.btn-clear-field[data-clear-target="scene-style"]');
    if (clearBtn) {
        clearBtn.classList.toggle('has-content', promptText.trim().length > 0);
    }

    // On desktop, scroll smoothly to style section
    if (window.innerWidth > 1100) {
        styleElem.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    } else {
        // On narrow screens (drawer mode), pulse the drawer toggle button to notify user
        pulseBuilderToggleBtn();
    }
}

// Detect traits set on one character but missing on another
function detectTraitConflicts() {
    const conflicts = {}; // charId -> { fieldKey: { label, specifiedBy } }
    let totalConflicts = 0;

    if (builderState.characters.length > 1) {
        const fieldKeys = Object.keys(CHARACTER_FIELD_DEFS);

        fieldKeys.forEach(key => {
            const def = CHARACTER_FIELD_DEFS[key];
            const setChars = builderState.characters.filter(c => c[key] && c[key].trim().length > 0);
            const missingChars = builderState.characters.filter(c => !c[key] || c[key].trim().length === 0);

            if (setChars.length > 0 && missingChars.length > 0) {
                const specifiedNames = setChars.map(c => c.name).join(', ');

                missingChars.forEach(char => {
                    if (!conflicts[char.id]) conflicts[char.id] = {};
                    conflicts[char.id][key] = {
                        label: def.label,
                        specifiedBy: specifiedNames
                    };
                    totalConflicts++;
                });
            }
        });
    }

    return { conflicts, totalConflicts };
}

// Build final concatenated prompt string matching prompt-example.txt
function buildPromptText() {
    let lines = [];

    // 1. Style section
    if (builderState.scene.style && builderState.scene.style.trim()) {
        lines.push("Style:");
        lines.push(builderState.scene.style.trim());
        lines.push("");
    }

    const multiChar = builderState.characters.length > 1;

    // 2. Character sections
    builderState.characters.forEach((char, index) => {
        let charLines = [];

        if (multiChar) {
            charLines.push(`--- ${char.name.toUpperCase()} ---`);
        }

        // Body category
        let bodyItems = [];
        if (char.age && char.age.trim()) bodyItems.push(`-Perceived age:\n${char.age.trim()}`);
        if (char.species && char.species.trim()) bodyItems.push(`-Species:\n${char.species.trim()}`);
        if (char.gender && char.gender.trim()) bodyItems.push(`-Perceived gender:\n${char.gender.trim()}`);
        if (char.skinTone && char.skinTone.trim()) bodyItems.push(`-Skin tone and details:\n${char.skinTone.trim()}`);
        if (char.physique && char.physique.trim()) bodyItems.push(`-Physical:\n${char.physique.trim()}`);
        if (char.otherBody && char.otherBody.trim()) bodyItems.push(`-Other body features:\n${char.otherBody.trim()}`);

        if (bodyItems.length > 0) {
            charLines.push("Body:");
            charLines.push(bodyItems.join("\n\n"));
            charLines.push("");
        }

        // Head category
        let headItems = [];
        if (char.hair && char.hair.trim()) headItems.push(`-Hair:\n${char.hair.trim()}`);
        if (char.faceShape && char.faceShape.trim()) headItems.push(`-Face shape:\n${char.faceShape.trim()}`);
        if (char.eyes && char.eyes.trim()) headItems.push(`-Eyes:\n${char.eyes.trim()}`);
        if (char.nose && char.nose.trim()) headItems.push(`-Nose:\n${char.nose.trim()}`);
        if (char.ears && char.ears.trim()) headItems.push(`-Ears:\n${char.ears.trim()}`);
        if (char.mouth && char.mouth.trim()) headItems.push(`-Mouth:\n${char.mouth.trim()}`);
        if (char.headAccessories && char.headAccessories.trim()) headItems.push(`-Head accessories:\n${char.headAccessories.trim()}`);

        if (headItems.length > 0) {
            charLines.push("Head:");
            charLines.push(headItems.join("\n\n"));
            charLines.push("");
        }

        // Clothing
        if (char.clothing && char.clothing.trim()) {
            charLines.push("Clothing:");
            charLines.push(char.clothing.trim());
            charLines.push("");
        }

        // Gesture/Pose/face expression
        if (char.gesturePose && char.gesturePose.trim()) {
            charLines.push("Gesture/Pose/face expression:");
            charLines.push(char.gesturePose.trim());
            charLines.push("");
        }

        if (charLines.length > (multiChar ? 1 : 0)) {
            lines.push(charLines.join("\n"));
        }
    });

    // 3. Characters' positioning (only when 2+ characters)
    if (multiChar && builderState.scene.positioning && builderState.scene.positioning.trim()) {
        lines.push("Characters' positioning:");
        lines.push(builderState.scene.positioning.trim());
        lines.push("");
    }

    // 4. Other details on the scene
    if (builderState.scene.otherDetails && builderState.scene.otherDetails.trim()) {
        lines.push("Other details on the scene:");
        lines.push(builderState.scene.otherDetails.trim());
        lines.push("");
    }

    // 4. Background
    if (builderState.scene.background && builderState.scene.background.trim()) {
        lines.push("Background:");
        lines.push(builderState.scene.background.trim());
        lines.push("");
    }

    // 5. Camera
    if (builderState.scene.camera && builderState.scene.camera.trim()) {
        lines.push("Camera:");
        lines.push(builderState.scene.camera.trim());
        lines.push("");
    }

    return lines.join("\n").trim();
}

// Render Character Tabs
function renderCharacterTabs() {
    const container = document.getElementById('character-tabs');
    if (!container) return;

    const { conflicts } = detectTraitConflicts();

    container.innerHTML = '';

    builderState.characters.forEach((char, index) => {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = `char-tab ${char.id === builderState.activeCharId ? 'active' : ''}`;

        // Add warning badge to tab if conflicts exist for this character
        if (conflicts[char.id] && Object.keys(conflicts[char.id]).length > 0) {
            btn.classList.add('has-warning');
            btn.title = `${Object.keys(conflicts[char.id]).length} unspecified traits compared to other characters`;
        }

        const nameSpan = document.createElement('span');
        nameSpan.textContent = char.name;
        btn.appendChild(nameSpan);

        if (builderState.characters.length > 1) {
            const removeBtn = document.createElement('span');
            removeBtn.className = 'btn-remove-char';
            removeBtn.textContent = '×';
            removeBtn.title = 'Remove character';
            removeBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                removeCharacter(char.id);
            });
            btn.appendChild(removeBtn);
        }

        btn.addEventListener('click', () => {
            builderState.activeCharId = char.id;
            renderCharacterTabs();
            renderCharacterForm();
        });

        container.appendChild(btn);
    });
}

// Add Character
function addCharacter() {
    const newNum = builderState.characters.length + 1;
    const newChar = createEmptyCharacter(newNum);
    builderState.characters.push(newChar);
    builderState.activeCharId = newChar.id;
    renderCharacterTabs();
    renderCharacterForm();
    updatePromptOutputPreview();
    showToast(`ADDED: ${newChar.name}`);
}

// Remove Character
function removeCharacter(charId) {
    if (builderState.characters.length <= 1) return;

    builderState.characters = builderState.characters.filter(c => c.id !== charId);
    if (builderState.activeCharId === charId) {
        builderState.activeCharId = builderState.characters[0].id;
    }
    renderCharacterTabs();
    renderCharacterForm();
    updatePromptOutputPreview();
    showToast('CHARACTER REMOVED');
}

// Render Active Character Form
function renderCharacterForm() {
    const container = document.getElementById('character-form-container');
    if (!container) return;

    const activeChar = builderState.characters.find(c => c.id === builderState.activeCharId);
    if (!activeChar) return;

    const { conflicts } = detectTraitConflicts();
    const activeConflicts = conflicts[activeChar.id] || {};

    let html = `
        <div class="card-section-title">
            <div class="char-name-row">
                <input
                    type="text"
                    id="char-name-input"
                    class="char-name-input"
                    value="${activeChar.name}"
                    placeholder="Character name"
                    maxlength="40"
                >
            </div>
            <div class="char-header-actions">
                <button type="button" id="btn-save-char" class="btn btn-sm btn-accent" title="Save character as JSON">Save</button>
                <label class="btn btn-sm btn-secondary" id="btn-load-char-label" title="Load character from JSON" style="cursor:pointer;">
                    Load
                    <input type="file" id="btn-load-char-input" accept=".json" style="display:none;">
                </label>
                <span class="tag-badge">Char ${builderState.characters.indexOf(activeChar) + 1}/${builderState.characters.length}</span>
            </div>
        </div>
    `;


    // Group fields by category
    const groups = {
        "Body": ["age", "gender", "species", "skinTone", "physique", "otherBody"],
        "Head": ["hair", "faceShape", "eyes", "nose", "ears", "mouth", "headAccessories"],
        "Clothing": ["clothing"],
        "Gesture / Pose / Expression": ["gesturePose"]
    };

    Object.keys(groups).forEach(groupName => {
        html += `<h4 class="field-group-title">--- ${groupName.toUpperCase()} ---</h4>`;

        groups[groupName].forEach(fieldKey => {
            const def = CHARACTER_FIELD_DEFS[fieldKey];
            const val = activeChar[fieldKey] || '';
            const conflict = activeConflicts[fieldKey];
            const rowCount = (fieldKey === 'clothing' || fieldKey === 'gesturePose') ? 4
                : (fieldKey === 'skinTone' || fieldKey === 'headAccessories') ? 2
                    : 1;

            html += `
                <div class="form-group" data-key="${fieldKey}">
                    <label for="field-${fieldKey}">
                        <span>${def.label}</span>
                        <button type="button" class="btn-clear-field" data-clear-target="field-${fieldKey}" title="Clear this field">Clear</button>
                    </label>
                    <div class="textarea-resize-wrapper">
                        <textarea id="field-${fieldKey}" rows="${rowCount}" placeholder="${def.placeholder}" class="${conflict ? 'has-warning-field' : ''}">${val}</textarea>
                        <div class="textarea-resize-handle" data-resize-target="field-${fieldKey}"></div>
                    </div>

                    ${conflict ? `
                        <div class="trait-warning-badge">
                            <span>Specified in ${conflict.specifiedBy}, but missing here!</span>
                            <button type="button" class="btn-quick-fix" data-fix-key="${fieldKey}" data-fix-specified="${conflict.specifiedBy}">Mark Unspecified</button>
                        </div>
                    ` : ''}

                    <div class="tags-container">
                        ${def.tags.map(tag => `<span class="tag-chip" data-field-key="${fieldKey}">${tag}</span>`).join('')}
                    </div>
                </div>
            `;
        });
    });

    container.innerHTML = html;

    // Attach listeners to input fields
    Object.keys(CHARACTER_FIELD_DEFS).forEach(fieldKey => {
        const elem = document.getElementById(`field-${fieldKey}`);
        if (elem) {
            elem.addEventListener('input', (e) => {
                activeChar[fieldKey] = e.target.value;
                updatePromptOutputPreview();

                // Inline badge visibility: hide when field has content, show when empty
                const formGroup = elem.closest('.form-group');
                const badge = formGroup ? formGroup.querySelector('.trait-warning-badge') : null;
                if (badge) {
                    if (e.target.value.trim().length > 0) {
                        badge.style.display = 'none';
                        elem.classList.remove('has-warning-field');
                    } else {
                        badge.style.display = '';
                        elem.classList.add('has-warning-field');
                    }
                }

                // Update clear button visibility
                const clearBtn = formGroup ? formGroup.querySelector('.btn-clear-field') : null;
                if (clearBtn) {
                    clearBtn.classList.toggle('has-content', e.target.value.trim().length > 0);
                }
            });
        }
    });

    // Attach tag chip click listeners
    container.querySelectorAll('.tag-chip').forEach(chip => {
        chip.addEventListener('click', () => {
            const fieldKey = chip.getAttribute('data-field-key');
            const elem = document.getElementById(`field-${fieldKey}`);
            if (elem && activeChar) {
                let current = activeChar[fieldKey] ? activeChar[fieldKey].trim() : '';
                const tagVal = chip.textContent.trim();
                if (!current) {
                    current = tagVal;
                } else if (!current.toLowerCase().includes(tagVal.toLowerCase())) {
                    current += `, ${tagVal}`;
                }
                elem.value = current;
                activeChar[fieldKey] = current;
                updatePromptOutputPreview();

                // Update clear button visibility
                const formGroup = elem.closest('.form-group');
                const clearBtn = formGroup ? formGroup.querySelector('.btn-clear-field') : null;
                if (clearBtn) {
                    clearBtn.classList.toggle('has-content', current.trim().length > 0);
                }
            }
        });
    });

    // Attach quick fix buttons for missing trait warnings
    container.querySelectorAll('.btn-quick-fix').forEach(btn => {
        btn.addEventListener('click', () => {
            const fieldKey = btn.getAttribute('data-fix-key');
            const specifiedBy = btn.getAttribute('data-fix-specified');
            const elem = document.getElementById(`field-${fieldKey}`);

            const defaultValue = `[Unspecified ${CHARACTER_FIELD_DEFS[fieldKey].label.toLowerCase()} - generic/neutral, distinct from ${specifiedBy}]`;
            if (elem && activeChar) {
                elem.value = defaultValue;
                activeChar[fieldKey] = defaultValue;
                updatePromptOutputPreview();
            }
        });
    });

    // ---- Rename character ----
    const nameInput = document.getElementById('char-name-input');
    if (nameInput) {
        nameInput.addEventListener('input', (e) => {
            activeChar.name = e.target.value || 'Character';
            renderCharacterTabs();
        });
    }

    // ---- Save character button ----
    const saveBtn = document.getElementById('btn-save-char');
    if (saveBtn) {
        saveBtn.addEventListener('click', () => saveCharacterAsJSON(activeChar));
    }

    // ---- Load character file input ----
    const loadInput = document.getElementById('btn-load-char-input');
    if (loadInput) {
        loadInput.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) loadCharacterFromJSON(file);
            e.target.value = ''; // reset so same file can be picked again
        });
    }

    // ---- Clear field buttons for character fields ----
    bindClearButtons(container, (targetId) => {
        const fieldKey = targetId.replace('field-', '');
        const elem = document.getElementById(targetId);
        if (elem && activeChar && CHARACTER_FIELD_DEFS[fieldKey]) {
            elem.value = '';
            activeChar[fieldKey] = '';
            updatePromptOutputPreview();
        }
    });

    // ---- Update clear button visibility states ----
    updateClearButtonStates(container);

    // ---- Init custom resize handles inside form ----
    initResizeHandles(container);
}

// ---- Save Character as JSON Download ----
function saveCharacterAsJSON(char) {
    const exportData = { ...char };
    delete exportData.id; // id is runtime-only; regenerate on load
    const json = JSON.stringify(exportData, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${(char.name || 'character').replace(/\s+/g, '_')}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast(`SAVED: ${char.name}`);
}

// ---- Load Character from JSON File ----
function loadCharacterFromJSON(file) {
    const reader = new FileReader();
    reader.onload = (e) => {
        try {
            const data = JSON.parse(e.target.result);
            const knownKeys = Object.keys(CHARACTER_FIELD_DEFS);
            const newChar = {
                id: `char-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
                name: data.name || file.name.replace(/\.json$/i, '') || 'Loaded Character',
                age: '', gender: '', species: '', skinTone: '', physique: '', otherBody: '',
                hair: '', faceShape: '', eyes: '', nose: '', ears: '', mouth: '',
                headAccessories: '', clothing: '', gesturePose: ''
            };
            // Copy over only recognised character fields
            knownKeys.forEach(key => {
                if (typeof data[key] === 'string') newChar[key] = data[key];
            });
            builderState.characters.push(newChar);
            builderState.activeCharId = newChar.id;
            renderCharacterTabs();
            renderCharacterForm();
            updatePromptOutputPreview();
            showToast(`LOADED: ${newChar.name}`);
        } catch (err) {
            showToast('INVALID JSON FILE');
        }
    };
    reader.readAsText(file);
}

// ---- Save Scene & Environment as JSON Download ----
function saveSceneAsJSON() {
    const exportData = { ...builderState.scene };
    const json = JSON.stringify(exportData, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'scene_environment.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast('SCENE & ENVIRONMENT SAVED');
}

// ---- Load Scene & Environment from JSON File ----
function loadSceneFromJSON(file) {
    const reader = new FileReader();
    reader.onload = (e) => {
        try {
            const data = JSON.parse(e.target.result);
            const knownKeys = ['positioning', 'otherDetails', 'background', 'camera', 'style'];
            const elemMap = {
                positioning: 'scene-positioning',
                otherDetails: 'scene-other-details',
                background: 'scene-background',
                camera: 'scene-camera',
                style: 'scene-style'
            };

            knownKeys.forEach(key => {
                if (typeof data[key] === 'string') {
                    builderState.scene[key] = data[key];
                    const elem = document.getElementById(elemMap[key]);
                    if (elem) elem.value = data[key];
                }
            });

            updatePromptOutputPreview();
            updateClearButtonStates(document);
            showToast('SCENE & ENVIRONMENT LOADED');
        } catch (err) {
            showToast('INVALID JSON FILE');
        }
    };
    reader.readAsText(file);
}

// Bind Scene Inputs & Balloon Tags
function bindSceneInputs() {
    ['scene-positioning', 'scene-other-details', 'scene-background', 'scene-camera', 'scene-style'].forEach(elemId => {
        const elem = document.getElementById(elemId);
        if (!elem) return;

        const propKey = elemId === 'scene-positioning' ? 'positioning' :
            elemId === 'scene-other-details' ? 'otherDetails' :
                elemId === 'scene-background' ? 'background' :
                    elemId === 'scene-camera' ? 'camera' : 'style';

        elem.addEventListener('input', (e) => {
            builderState.scene[propKey] = e.target.value;
            updatePromptOutputPreview();

            // Update clear button visibility
            const clearBtn = document.querySelector(`.btn-clear-field[data-clear-target="${elemId}"]`);
            if (clearBtn) {
                clearBtn.classList.toggle('has-content', e.target.value.trim().length > 0);
            }
        });

        // Render balloon tags
        const tagsContainer = document.querySelector(`.tags-container[data-field="${elemId}"]`);
        if (tagsContainer && SCENE_FIELD_TAGS[elemId]) {
            tagsContainer.innerHTML = SCENE_FIELD_TAGS[elemId].map(tag => `<span class="tag-chip">${tag}</span>`).join('');

            tagsContainer.querySelectorAll('.tag-chip').forEach(chip => {
                chip.addEventListener('click', () => {
                    let current = elem.value.trim();
                    const tagVal = chip.textContent.trim();
                    if (!current) {
                        current = tagVal;
                    } else if (!current.toLowerCase().includes(tagVal.toLowerCase())) {
                        current += (elemId === 'scene-camera' || elemId === 'scene-style' || elemId === 'scene-positioning') ? `, ${tagVal}` : `\n${tagVal}`;
                    }
                    elem.value = current;
                    builderState.scene[propKey] = current;
                    updatePromptOutputPreview();

                    // Update clear button visibility
                    const clearBtn = document.querySelector(`.btn-clear-field[data-clear-target="${elemId}"]`);
                    if (clearBtn) {
                        clearBtn.classList.toggle('has-content', current.trim().length > 0);
                    }
                });
            });
        }
    });
}

// Update Live Output Preview & Trait Conflict Summary
function updatePromptOutputPreview() {
    const previewElem = document.getElementById('prompt-output-preview');
    if (previewElem) {
        const text = buildPromptText();
        previewElem.textContent = text || 'Your generated prompt will appear here in real-time as you fill in details...';
    }

    // Update conflict summary bar
    const summaryBar = document.getElementById('trait-conflict-summary');
    const summaryText = document.getElementById('conflict-summary-text');
    const { totalConflicts } = detectTraitConflicts();

    if (totalConflicts > 0) {
        if (summaryBar) summaryBar.classList.remove('hidden');
        if (summaryText) {
            summaryText.textContent = `Trait conflict warning: ${totalConflicts} character field(s) set on some characters but missing on others! Click tabs to review and resolve.`;
        }
    } else {
        if (summaryBar) summaryBar.classList.add('hidden');
    }

    // Show / hide Characters' Positioning field based on character count
    const posGroup = document.getElementById('scene-positioning-group');
    if (posGroup) {
        if (builderState.characters.length > 1) {
            posGroup.classList.remove('hidden');
        } else {
            posGroup.classList.add('hidden');
        }
    }

    // Refresh active character form if needed to update warning badges dynamically
    const activeChar = builderState.characters.find(c => c.id === builderState.activeCharId);
    if (activeChar) {
        renderCharacterTabs();
    }

    // Update drawer badge status for mobile/tablet toggle
    updateDrawerBadge();
}

// Update Drawer Floating Button Badge & Section Header Builder Badge
function updateDrawerBadge() {
    const badge = document.getElementById('drawer-toggle-badge');
    const headerBadge = document.getElementById('header-builder-badge');
    const text = buildPromptText();
    const hasText = text && text.trim().length > 0;
    const charCount = builderState.characters.length;
    const badgeText = charCount > 1 ? `${charCount} CHARS` : 'READY';

    [badge, headerBadge].forEach(b => {
        if (!b) return;
        if (hasText) {
            b.classList.remove('hidden');
            b.textContent = badgeText;
        } else {
            b.classList.add('hidden');
        }
    });
}

// Clear All Fields
function clearAllFields() {
    builderState.characters = [createEmptyCharacter(1)];
    builderState.activeCharId = builderState.characters[0].id;
    builderState.scene = {
        positioning: '',
        otherDetails: '',
        background: '',
        camera: '',
        style: ''
    };

    ['scene-positioning', 'scene-other-details', 'scene-background', 'scene-camera', 'scene-style'].forEach(id => {
        const elem = document.getElementById(id);
        if (elem) elem.value = '';
    });

    renderCharacterTabs();
    renderCharacterForm();
    updatePromptOutputPreview();
    updateClearButtonStates(document);
    showToast('PROMPT BUILDER CLEARED');
}

// Generate Random Prompt with Random Tags
function generateRandomPrompt() {
    // 70% chance for 1 char, 20% chance for 2 chars, 10% chance for 3 chars
    const randCharRoll = Math.random();
    const numChars = randCharRoll < 0.70 ? 1 : randCharRoll < 0.90 ? 2 : 3;
    const newCharacters = [];

    for (let i = 1; i <= numChars; i++) {
        const char = createEmptyCharacter(i);
        Object.keys(CHARACTER_FIELD_DEFS).forEach(fieldKey => {
            const def = CHARACTER_FIELD_DEFS[fieldKey];
            if (def.tags && def.tags.length > 0) {
                const randomIndex = Math.floor(Math.random() * def.tags.length);
                char[fieldKey] = def.tags[randomIndex];
            } else {
                char[fieldKey] = '';
            }
        });
        newCharacters.push(char);
    }

    builderState.characters = newCharacters;
    builderState.activeCharId = newCharacters[0].id;

    // Randomize scene fields
    const scenePropMap = {
        'scene-positioning': 'positioning',
        'scene-other-details': 'otherDetails',
        'scene-background': 'background',
        'scene-camera': 'camera',
        'scene-style': 'style'
    };

    const sceneFillChances = {
        'scene-positioning': numChars > 1 ? 0.7 : 0,
        'scene-other-details': 0.45,
        'scene-background': 0.65,
        'scene-camera': 0.60,
        'scene-style': 0.75
    };

    Object.keys(SCENE_FIELD_TAGS).forEach(elemId => {
        const propKey = scenePropMap[elemId];
        const chance = sceneFillChances[elemId] !== undefined ? sceneFillChances[elemId] : 0.5;
        const tags = SCENE_FIELD_TAGS[elemId];
        const elem = document.getElementById(elemId);

        if (Math.random() < chance && tags && tags.length > 0) {
            const chosenTag = tags[Math.floor(Math.random() * tags.length)];
            builderState.scene[propKey] = chosenTag;
            if (elem) elem.value = chosenTag;
        } else {
            builderState.scene[propKey] = '';
            if (elem) elem.value = '';
        }
    });

    renderCharacterTabs();
    renderCharacterForm();
    updatePromptOutputPreview();
    updateClearButtonStates(document);

    showToast('RANDOM PROMPT GENERATED');
}

// ---- Utility: Bind clear buttons inside a container ----
function bindClearButtons(container, onClear) {
    const root = container === document ? document : container;
    root.querySelectorAll('.btn-clear-field').forEach(btn => {
        // Avoid double-binding
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

// ---- Utility: Update clear button visibility based on field content ----
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

// ---- Utility: Custom full-width bottom resize handles for textareas ----
function initResizeHandles(container) {
    const root = container === document ? document : container;
    root.querySelectorAll('.textarea-resize-handle').forEach(handle => {
        // Avoid double-binding
        if (handle.dataset.resizeBound) return;
        handle.dataset.resizeBound = 'true';

        const targetId = handle.getAttribute('data-resize-target');
        const textarea = document.getElementById(targetId);
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

// Initialize Builder
function initPromptBuilder() {
    renderCharacterTabs();
    renderCharacterForm();
    bindSceneInputs();

    // Button event handlers
    const addBtn = document.getElementById('btn-add-character');
    if (addBtn) addBtn.addEventListener('click', addCharacter);

    const clearBtn = document.getElementById('btn-clear-all');
    if (clearBtn) clearBtn.addEventListener('click', clearAllFields);

    const randomBtn = document.getElementById('btn-random-prompt');
    if (randomBtn) randomBtn.addEventListener('click', generateRandomPrompt);

    const handleCopyPrompt = async () => {
        const promptText = buildPromptText();
        if (!promptText) {
            showToast('NO PROMPT CONTENT TO COPY');
            return;
        }
        const success = await copyToClipboard(promptText);
        if (success) {
            showToast('COMPLETE PROMPT COPIED TO CLIPBOARD!');
        } else {
            showToast('COPY FAILED');
        }
    };

    const copyBtn = document.getElementById('btn-copy-prompt');
    if (copyBtn) copyBtn.addEventListener('click', handleCopyPrompt);

    const copyBtnTop = document.getElementById('btn-copy-prompt-top');
    if (copyBtnTop) copyBtnTop.addEventListener('click', handleCopyPrompt);

    // Scene save/load button handlers
    const saveSceneBtn = document.getElementById('btn-save-scene');
    if (saveSceneBtn) saveSceneBtn.addEventListener('click', saveSceneAsJSON);

    const loadSceneInput = document.getElementById('btn-load-scene-input');
    if (loadSceneInput) {
        loadSceneInput.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) loadSceneFromJSON(file);
            e.target.value = ''; // reset so same file can be picked again
        });
    }

    updatePromptOutputPreview();

    // ---- Bind scene clear buttons ----
    bindClearButtons(document, (targetId) => {
        const elem = document.getElementById(targetId);
        if (!elem) return;
        elem.value = '';
        const propKey = targetId === 'scene-positioning' ? 'positioning' :
            targetId === 'scene-other-details' ? 'otherDetails' :
                targetId === 'scene-background' ? 'background' :
                    targetId === 'scene-camera' ? 'camera' : 'style';
        if (builderState.scene.hasOwnProperty(propKey)) {
            builderState.scene[propKey] = '';
        }
        updatePromptOutputPreview();
    });

    // ---- Track content state for scene clear buttons ----
    ['scene-positioning', 'scene-other-details', 'scene-background', 'scene-camera', 'scene-style'].forEach(id => {
        const elem = document.getElementById(id);
        if (!elem) return;
        elem.addEventListener('input', () => {
            const btn = document.querySelector(`.btn-clear-field[data-clear-target="${id}"]`);
            if (btn) {
                btn.classList.toggle('has-content', elem.value.trim().length > 0);
            }
        });
    });

    // ---- Init custom resize handles on scene fields ----
    initResizeHandles(document);
}

// ---- Drawer Management for Prompt Builder ----
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

