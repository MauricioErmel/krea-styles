// ==============================================
// KREA STYLES — App Logic
// ==============================================

// Each image has 6 style cells in a 3x2 grid (left-to-right, top-to-bottom).
// The display name is the short label shown on hover.
// The style key is used to look up the full prompt in STYLE_PROMPTS.

const IMAGE_DATA = [
    {
        file: "01.webp",
        category: "Anime",
        styles: [
            "Anime Style",
            "Ghibli Style",
            "70s Anime",
            "Chibi Anime",
            "My Hero Academia Style",
            "Granblue Fantasy Pin-Up Style"
        ]
    },
    {
        file: "02.webp",
        category: "Anime II",
        styles: [
            "Manga Style",
            "Akira Toriyama Style",
            "Chainsaw Man Style",
            "Classic Shojo Illustration",
            "Shindol Style",
            "One Piece Style"
        ]
    },
    {
        file: "03.webp",
        category: "Cartoon",
        styles: [
            "Cartoon Style",
            "Steven Universe Style",
            "Adventure Time Style",
            "Hanna-Barbera Style",
            "Rubber Hose Cartoon",
            "Disney Ultradetailed Illustration"
        ]
    },
    {
        file: "04.webp",
        category: "Drawing",
        styles: [
            "Drawing",
            "Chinese Ink Drawing",
            "Fashion Sketch",
            "Technical Drawing",
            "Playful Hand-Drawn Illustration",
            "Very Simplistic Doodle"
        ]
    },
    {
        file: "05.webp",
        category: "Photography",
        styles: [
            "Photography",
            "Analog Photography",
            "Black And White Documentary",
            "Brassaï Night Photography",
            "Cinematic Photography",
            "Selfie Photo"
        ]
    },
    {
        file: "06.webp",
        category: "Comics",
        styles: [
            "Comics Style",
            "Alternative Comics Style",
            "Amanda Conner Illustration",
            "Hellboy Style",
            "Bruce Timm Noir",
            "Graphic Novel"
        ]
    },
    {
        file: "07.webp",
        category: "Design",
        styles: [
            "Design",
            "Corporate Memphis",
            "Soviet Propaganda Poster",
            "Graphic Flat-Vector Travel Poster Illustration",
            "Poster Art",
            "Contemporary Commercial Illustration"
        ]
    },
    {
        file: "08.webp",
        category: "Painting",
        styles: [
            "Painting",
            "Van Gogh Style",
            "Cubism",
            "Jackson Pollock Style",
            "Academic Precision Realism",
            "Wet-on-Wet Watercolor Ink Painting"
        ]
    },
    {
        file: "09.webp",
        category: "Digital Painting",
        styles: [
            "Alex Ross Style",
            "Artgerm Style",
            "Boris Vallejo Style",
            "Pin-Up",
            "American Comic Realism",
            "RossDraws Style"
        ]
    },
    {
        file: "10.webp",
        category: "Illustration",
        styles: [
            "Children's Book Drawing",
            "Vintage Children's Book Drawing",
            "Collector Storybook Illustration",
            "Bookplate Illustration",
            "Whimsical Illustration",
            "Beatrix Potter Style"
        ]
    },
    {
        file: "11.webp",
        category: "Character & Sketch",
        styles: [
            "Character Design Illustration",
            "Arcane Animation Still",
            "Caricature",
            "Gris Grimly Style",
            "Tim Burton Style",
            "Loose Crosshatched Character Sketch"
        ]
    },
    {
        file: "12.webp",
        category: "Artistic Styles",
        styles: [
            "Brushwork Emphasis",
            "Ink Pen Drawing",
            "Carne Griffiths Style",
            "Impasto",
            "Crayola Colored-Book Style",
            "Airbrush Fantasy"
        ]
    },
    {
        file: "13.webp",
        category: "Lighting",
        styles: [
            "Natural Lighting Photography",
            "Blue Hour Cinema",
            "Golden Hour Photography",
            "High-Key Lighting Photography",
            "Direct-Flash Photography",
            "Neon Photography"
        ]
    },
    {
        file: "14.webp",
        category: "3D & Render",
        styles: [
            "3D Render",
            "Pixar  Animation",
            "Cinematic Final Fantasy 3D Render",
            "Isometric 3D Graphic",
            "Low Poly",
            "PS1 Graphics"
        ]
    },
    {
        file: "15.webp",
        category: "Toys & Stop Motion",
        styles: [
            "Claymation",
            "Wallace and Gromit Style",
            "Muppets Style",
            "LEGO Minifigure",
            "LEGO Minifigure",
            "Funko Pop Style"
        ]
    },
    {
        file: "16.webp",
        category: "Print & Traditional",
        styles: [
            "Pop Art",
            "Variable-Size Ben-Day Dots Illustration",
            "Contemporary Lithography",
            "Contemporary Ukiyo-E",
            "Woodcut",
            "Etching"
        ]
    },
    {
        file: "17.webp",
        category: "Photo Styles",
        styles: [
            "Photoshoot",
            "Instagram Model Glamour Photography",
            "GQ Photoshoot",
            "Supermodel Photoshoot",
            "Playboy / Maxim-Style Photoshoot",
            "LinkedIn Pro Portrait"
        ]
    },
    {
        file: "18.webp",
        category: "Craft & Material",
        styles: [
            "Paper Cutout",
            "Quilling",
            "Mosaic Art",
            "Stained Glass Flat Art",
            "Marble Sculpture",
            "Mixed Media"
        ]
    },
    {
        file: "19.webp",
        category: "Games & Shading",
        styles: [
            "8-Bit Style",
            "Minecraft Style",
            "Zelda Wind Waker Style",
            "GTA V Polished Cover Art",
            "Toon Shader",
            "Cel Shading"
        ]
    },
    {
        file: "20.webp",
        category: "Cinema",
        styles: [
            "Film Noir",
            "Hitchcockian Photo",
            "Sin City Photography",
            "Stranger Things-Inspired Art",
            "Cyberpunk Photography",
            "Cinematic Tron"
        ]
    }
];

// ---- Style Prompts ----
// These are the full prompt texts from styles-prompts.txt.
// The key is the style name (matching exactly what's in IMAGE_DATA.styles).

const STYLE_PROMPTS = {
    "Anime Style": `A clean, expressive illustration style built on confident, simplified linework defining stylized, appealing proportions, flat-to-cel-based shading applied with straightforward graphic clarity, large expressive eyes carrying the primary emotional weight of the design, a bright, approachable simplicity that favors instant readability over rendering complexity, and a versatile, universally recognizable animated charm rooted in broad contemporary Japanese animation convention. Influenced by: contemporary anime illustration tradition, cel-shaded character-design technique, Japanese animation studio practice, mainstream manga-adaptation method.`,
    "Ghibli Style": `A gentle, hand-painted animation illustration style built on soft watercolor-inspired shading that gives every plane a breathable, tender texture, meticulous naturalistic detail applied with unhurried patience, rounded, expressive proportions carrying quiet emotional sincerity, a hushed, wondrous stillness pervading even the most fantastical scenes, and a nostalgic, wholesome hand-crafted intensity that feels timeless and deeply human. Influenced by: Hayao Miyazaki, Studio Ghibli production technique, traditional cel-animation painting method, naturalist watercolor illustration tradition.`,
    "70s Anime": `vintage Japanese animation aesthetics characterized by bold graphic draftsmanship, angular yet elegant character construction, expressive hand-drawn linework, simplified cel-painted rendering, dramatic visual staging, and a strong sense of romantic adventure. The style favors iconic silhouettes, emotional intensity, mechanical precision, and cinematic composition over contemporary polish, embracing the charm of traditional animation techniques, visible artistic craftsmanship, and classic storytelling sensibilities. Its visual identity balances dynamism, sincerity, and retro-futurist imagination, reminiscent of Leiji Matsumoto and Yoshikazu Yasuhiko, inspired by Space Battleship Yamato and Mobile Suit Gundam.`,
    "Manga Style": `A clean, expressive black-and-white illustration style built on confident, precise linework defining stylized, appealing proportions, restrained tonal shading achieved through screentone patterning or fine cross-hatching rather than continuous gradation, large expressive eyes carrying much of the emotional weight, a dynamic, panel-ready clarity favoring instant visual readability, and a versatile, universally recognizable illustrative charm rooted in mainstream Japanese comic-illustration convention. Influenced by: mainstream manga illustration tradition, screentone-shading technique, Weekly Shōnen Jump publishing convention, Japanese comic-art practice.`,
    "Akira Style": `A meticulously detailed retro-futurist anime illustration style built on dense, precise linework rendering technology and urban decay with obsessive mechanical accuracy, flat cel-shaded color fields laid beneath sharp confident outline, dramatic neon and shadow contrast that carves gritty cyberpunk atmosphere across every surface, kinetic motion conveyed through bold speed-line dynamism, and a gritty, dystopian animation gravitas that feels both hand-crafted and technologically obsessive. Influenced by: Katsuhiro Otomo, 1980s cel-animation technique, cyberpunk anime tradition, retro-futurist manga illustration.`,
    "Akira Toriyama Style": `clean and highly readable linework, appealing character-focused design language, expressive forms, dynamic silhouettes, polished cel-style rendering, balanced stylization, energetic visual storytelling, strong graphic clarity, and a playful yet technically disciplined aesthetic that emphasizes personality and visual impact, reminiscent of Akira Toriyama and Toyotarou, inspired by Dragon Ball and Chrono Trigger.`,
    "Atsushi Ohkubo Style": `bold graphic aesthetics characterized by sharp silhouette design, dynamic linework, stylized anatomy, exaggerated visual rhythm, striking contrast, and highly recognizable shape language, blending manga expressiveness with contemporary illustration sensibilities through energetic compositions, refined ink work, and a distinctive balance between elegance and intensity, reminiscent of Atsushi Ohkubo and Tite Kubo, inspired by Soul Eater and Fire Force.`,
    "Attack on Titan Style": `A gritty, high-tension manga-anime illustration style built on dense, realistic linework rendering musculature and gear with mechanical precision, dramatic dark shading and heavy cross-hatched texture that carves grim, intensity into every surface, dynamic extreme-perspective framing charged with kinetic urgency and scale, desaturated tonal harmony broken by stark high-contrast lighting in moments of violence or dread, and a grim, visceral action-illustration gravitas suffused with existential tension. Influenced by: Hajime Isayama, dark shōnen manga tradition, cel-shaded action-anime technique, gritty military-fantasy illustration.`,
    "Chainsaw Man Style": `A raw, gritty manga-illustration style built on loose, aggressive linework carrying deliberately unpolished, visceral energy, stark high-contrast shading that swallows much of the composition in engulfing shadow, a chaotic, kinetic sense of motion charged with unpredictable, feral intensity, meticulous grotesque body-horror rendering balanced against darkly comedic character design, and a raw, unflinching contemporary shōnen edge that feels equal parts brutal and irreverently funny. Influenced by: Tatsuki Fujimoto, contemporary dark-shōnen manga tradition, raw ink-heavy illustration technique, body-horror action-manga practice.`,
    "Jujutsu Kaisen Style": `A dynamic, high-contrast shōnen-manga illustration style built on confident, angular linework carrying sharp, kinetic action-driven posing, dense, moody shading with dramatic ink-heavy shadow blocking, a stylish, contemporary silhouette design balancing realism with graphic exaggeration, meticulous attention to fluid, high-impact motion within otherwise tightly controlled composition, and a fierce, cinematic shōnen intensity that feels equal parts stylish and visceral. Influenced by: Gege Akutami, MAPPA animation-adaptation tradition, cel-shaded dark-shōnen technique, contemporary action-manga character-design practice.`,
    "My Hero Academia Style": `A bold, dynamic shōnen-manga illustration style built on clean, confident linework carrying energetic, superhero-inspired posing, bright cel-based shading with punchy, graphic contrast reinforcing dramatic action, a hopeful, larger-than-life visual energy balanced against grounded emotional character work, meticulous costume and power-effect detail rendered with crisp graphic clarity, and an earnest, high-energy shōnen intensity that feels equal parts heroic spectacle and heartfelt coming-of-age drama. Influenced by: Kōhei Horikoshi, Studio Bones animation-adaptation tradition, cel-shaded superhero-manga technique, contemporary shōnen character-design practice.`,
    "Berserk Manga Style": `monumental dark fantasy manga aesthetics characterized by obsessive crosshatched detail, rugged textural density, dramatic black-and-white value structure, intricate ornamental craftsmanship, and an overwhelming sense of weight, scale, and historical depth. The style emphasizes brutal realism, weathered material rendering, architectural complexity, and emotionally intense visual storytelling, constructing imagery through countless layers of inked detail and highly disciplined draftsmanship. Rather than stylized simplification, it pursues visual immersion through realism, atmosphere, and relentless craftsmanship, creating artwork that feels ancient, tragic, and profoundly human. The visual language balances violence and beauty, grandeur and decay, with extraordinary attention to texture, structure, and narrative gravitas, reminiscent of Kentaro Miura and Hal Foster, inspired by Berserk and Prince Valiant.`,
    "Bleach Style": `A sleek, high-contrast shōnen-anime illustration style built on confident, angular linework carrying sharp, stylish silhouette design, bold cel-based shading with dramatic, graphic shadow blocking rather than smooth gradation, a moody, atmospheric restraint balanced against dynamic, action-charged posing, meticulous attention to elegant, flowing motion within otherwise crisp, controlled composition, and a stylish, brooding shōnen intensity that feels equal parts fashionable and fiercely kinetic. Influenced by: Tite Kubo, Studio Pierrot animation tradition, cel-shaded shōnen illustration technique, stylish action-anime character-design practice.`,
    "Frieren Style": `A gentle, atmospheric anime-illustration style built on soft, delicate linework carrying a quiet, contemplative restraint, muted cel-based shading with subtle gradation rather than dramatic contrast, a hushed, melancholic stillness pervading even fantastical composition, meticulous attention to naturalistic environmental detail balanced against calm, understated character design, and a serene, wistful anime intensity that feels contemplative, tender, and quietly profound. Influenced by: Kanehito Yamada (original), Studio Madhouse animation-adaptation tradition, atmospheric anime-illustration technique, contemplative fantasy character-design practice.`,
    "Boichi Style": `A meticulously rendered manga-illustration style built on dense, hyper-precise linework that treats anatomy and mechanical detail with equal obsessive accuracy, dramatic high-contrast shading that carves powerful, sculptural form through confident cross-hatched shadow, a technically disciplined realism balancing muscular anatomical grounding with dynamic, kinetic posing, meticulous attention to material and structural logic rewarding close inspection, and a bold, technically virtuosic manga intensity that feels equal parts scientific precision and explosive physicality. Influenced by: Boichi, Dr. Stone manga art tradition, hyper-detailed manga illustration technique, technical-precision character-design practice.`,
    "Cinematic Anime": `premium animation aesthetics characterized by refined linework, sophisticated lighting design, cinematic composition, nuanced atmospheric depth, polished rendering, and emotionally driven visual storytelling, blending the clarity of high-end anime production with filmic realism through controlled detail, expressive staging, and exceptional artistic cohesion, reminiscent of Makoto Shinkai and Yoshiyuki Sadamoto, inspired by Your Name and Evangelion: 3.0+1.0 Thrice Upon a Time.`,
    "Classic Shojo Illustration": `elegant manga-inspired aesthetics characterized by graceful linework, refined visual delicacy, expressive emotional storytelling, sophisticated composition, ornamental detailing, and a strong sense of romantic atmosphere, blending stylized beauty with polished illustration craftsmanship through airy visual rhythms, nuanced rendering, and timeless narrative charm, reminiscent of Riyoko Ikeda and CLAMP, inspired by The Rose of Versailles and Cardcaptor Sakura.`,
    "Euromanga Style": `A hybrid illustration style built on Japanese manga-derived clean linework merged with European bande-dessinée compositional discipline, cel-based shading softened by more naturalistic tonal transition than typical manga convention, anatomically grounded proportions carrying a slightly more realistic weight than mainstream shōnen or shōjo tradition, meticulous, patient rendering of environment and costume detail rewarding close inspection, and a polished, cross-cultural illustration sensibility that bridges Eastern character-design fluency with Western graphic-novel craftsmanship. Influenced by: Franco-Belgian manga-influenced illustration movement, European graphic-novel tradition, hybrid manga-bande-dessinée technique, contemporary Euromanga publishing practice.`,
    "Watercolor Anime Illustration": `A soft, luminous illustration style built on delicate translucent washes blending seamlessly with clean anime-adjacent linework, gentle bleeding and diffusion at the edges lending each plane a tender, organic softness, restrained tonal layering achieved through patient, unhurried wash-building rather than opaque coverage, a hushed, dreamlike stillness carried through soft directional light, and a poetic, wistful character-illustration finish that feels equally hand-painted and anime-refined. Influenced by: traditional watercolor-and-wash technique, contemporary anime-illustration tradition, gentle wash-blending practice, semi-realistic character-art method.`,
    "Granblue Fantasy Pin-Up Style": `A richly detailed JRPG character-illustration style built on crisp painterly linework blended seamlessly into soft airbrushed shading, glossy semi-realistic rendering that gives skin and hair a polished, luminous finish without tipping into full photorealism, confident glamorous pin-up posing framed with clean graphic composition, delicately layered ornamental costume detail rendered with meticulous craftsmanship, and a vibrant, high-production mobile-gacha polish that feels equally at home as key art and collectible card illustration. Influenced by: Minaba Hideo, Cygames character-art direction, JRPG gacha illustration technique, semi-realistic anime rendering.`,
    "Katsuya Terada Style": `A ferociously energetic illustration style built on wild, gestural linework that captures raw movement and muscular dynamism in every stroke, loose ink-driven cross-hatching layered with confident painterly color, chaotic yet controlled compositions bursting with kinetic tension, richly textured surface detail giving textures a visceral, almost sculptural intensity, and a bold, untamed painterly ferocity that feels equally at home in fine art and manga tradition. Influenced by: Katsuya Terada, Japanese gekiga illustration, ink-and-color technique, fantasy creature illustration.`,
    "Manhwa Ultradetailed Art": `A richly polished Korean digital-comic illustration style built on crisp, precise linework merged seamlessly with dense, meticulous rendering across skin, hair, and costume, exhaustive layered shading that builds photographic depth while retaining a clean, semi-realistic anime-adjacent finish, luminous soft-gradient highlights giving every surface a glossy, high-production sheen, obsessive attention to fine ornamental and textural detail rewarding close inspection, and a polished, high-stakes cinematic webtoon intensity built for full-screen serialized impact. Influenced by: Redice Studio digital-coloring technique, Korean manhwa production standard, semi-realistic webtoon rendering practice, high-detail digital-comic illustration tradition.`,
    "Murata Hyperrealism": `A meticulously rendered manga-illustration style built on obsessive anatomical precision that treats musculature and material detail with near-photographic exactness, dramatic high-contrast shading carving powerful, sculptural form through confident cross-hatched shadow, a technically disciplined realism that pushes traditional manga linework toward hyperreal density, dynamic, kinetic posing charged with explosive physical presence, and a bold, virtuosic manga intensity that feels equal parts scientific precision and raw physical spectacle. Influenced by: Yusuke Murata, One-Punch Man manga tradition, hyper-detailed manga illustration technique, technical-precision character-design practice.`,
    "MidJourney Niji-Inspired Digital Illustration": `A vibrant, painterly anime-fusion illustration style defined by luminous soft-gradient shading, glowing rim light and dreamy bloom haloing the figure, richly saturated color palettes that lean pastel-fantasy or neon-vivid by turns, delicate linework blended seamlessly into airbrushed color rather than hard-outlined cel shading, whimsical atmospheric particles or floating light motes drifting through the scene, and a lush, otherworldly polish that feels equally at home as a fantasy book cover or a modern anime key visual. Influenced by: Niji Journey model aesthetics, modern anime key visual art, Makoto Shinkai lighting style, digital gouache illustration.`,
    "Shindol Style": `A polished Korean webtoon illustration style rendered with soft cel-shaded gradients over cleanly inked linework, realistically proportioned yet subtly idealized figures with smooth, luminous skin and delicately blushed cheeks, expressive detailed eyes rendered with glossy multi-layered highlights, soft ambient studio-like lighting that keeps shadows gentle and skin tones warm, and a clean, contemporary digital-comic polish characteristic of modern webtoon romance and drama art. Influenced by: Shindol, Korean webtoon illustration, Manhwa digital coloring technique, romance webtoon art direction.`,
    "Solo Leveling Art": `A high-impact cinematic manhwa illustration style combining hyper-detailed digital rendering with dramatic low-angle, action-movie framing, richly saturated dark color palettes cut through by glowing violet, blue, or crimson, meticulously rendered textures with sharp specular highlighting, dynamic motion lines heightening a sense of raw power, and a sleek, high-production webtoon polish that reads as equal parts video-game key art and blockbuster action illustration. Influenced by: DUBU (Redice Studio), Solo Leveling webtoon art direction, Korean manhwa digital coloring technique, cinematic video-game concept art.`,
    "Pony 2.5D Realism": `A hybrid illustration style built on flat anime-derived linework pushed toward volumetric, near-photographic shading, smooth gradient rendering that gives skin and hair a soft three-dimensional depth while retaining crisp graphic outline at the edges, meticulously blended highlight transitions that bridge cel-shading simplicity with painterly light behavior, confident anatomical grounding that leans semi-realistic without abandoning stylized facial proportion, and a polished, technically ambitious rendering intensity that sits deliberately between flat illustration and full photorealism. Influenced by: checkpoint-trained diffusion-model 2.5D aesthetic, semi-realistic anime rendering tradition, gacha-game character-art technique, hybrid cel-to-painterly shading practice.`,
    "Pony/Illustrious Checkpoint Style": `A vibrant, high-saturation anime-illustration style built on crisp, confidently defined linework paired with smooth cel-to-airbrush hybrid shading, glossy specular highlights concentrated on eyes, lips, and skin for an immediately eye-catching finish, exaggerated yet anatomically coherent proportions calibrated for instant visual appeal, densely rendered hair and costume detail balanced against relatively simplified background treatment, and a polished, community-model illustration intensity optimized for striking, shareable single-character compositions. Influenced by: Danbooru-tagged anime illustration convention, checkpoint-trained diffusion-model aesthetic, gacha/booru community art style, semi-realistic anime rendering practice.`,
    "Yoshitaka Amano Style": `An ethereal, elongated illustration style built on delicate, flowing linework that stretches anatomy into graceful, almost weightless proportion, translucent layered washes that let ink and pigment bleed softly into one another rather than sit as flat color, a dreamlike fragility carried through sparse, deliberate mark-making surrounded by generous negative space, ornamental fine detail concentrated in hair and fabric while the broader form stays airy and unresolved, and a haunting, otherworldly elegance that feels simultaneously fragile and mythic. Influenced by: Yoshitaka Amano, Final Fantasy character-art tradition, ink-wash illustration technique, Vampire Hunter D illustration practice.`,
    "Yoshitaka Amano Fine Art": `ethereal fine art aesthetics characterized by calligraphic linework, graceful visual ambiguity, flowing ornamental forms, delicate painterly textures, and a dreamlike fusion of elegance and abstraction. The style favors suggestion over definition, using elongated proportions, layered decorative motifs, atmospheric negative space, and fluid visual rhythms to create imagery that feels poetic, otherworldly, and timeless. Rather than pursuing realism, it embraces expressive symbolism, visual fragility, and emotional resonance through sophisticated composition and refined artistic intuition. The result evokes the feeling of an illuminated myth, balancing luxury, mystery, and imagination with an unmistakably lyrical sensibility, reminiscent of Yoshitaka Amano and Erté, inspired by Vampire Hunter D and Final Fantasy VI concept artwork.`,
    "Death Note Style": `A dark, meticulously detailed manga-illustration style built on dense, precise linework rendering both anatomy and psychological tension with obsessive control, dramatic high-contrast shading that carves stark, engulfing shadow across brooding, angular composition, a restrained, cerebral intensity conveyed through sharp facial modeling and calculated posing, richly rendered fine detail balanced against vast negative space charged with unspoken menace, and a somber, suspenseful gravitas that feels equal parts psychological thriller and gothic elegance. Influenced by: Takeshi Obata, dark shōnen-manga illustration tradition, high-contrast cel-shaded technique, psychological-thriller manga practice.`,
    "JoJo's Bizarre Adventure Style": `A flamboyant, hyper-stylized manga-illustration style built on exaggerated, statuesque anatomy carrying dramatic fashion-forward posing, bold, high-contrast linework rendering musculature with sculptural, almost architectural precision, saturated graphic patterning integrated directly into confident silhouette design, dynamic, theatrical composition charged with operatic intensity and flair, and a bold, unapologetically stylish shōnen extravagance that feels equal parts high fashion and larger-than-life spectacle. Influenced by: Hirohiko Araki, flamboyant shōnen-manga tradition, sculptural anatomical-illustration technique, theatrical fashion-forward character-design practice.`,
    "One Piece Style": `A bold, expressive shōnen-manga illustration style built on confident, energetic linework carrying exaggerated, rubber-hose-adjacent proportion flexibility, dynamic, kinetic posing charged with over-the-top comedic and dramatic range in equal measure, simplified cel-based shading that prioritizes bold graphic readability over subtle gradation, richly imaginative silhouette design that pushes anatomy and costume into instantly iconic exaggeration, and an adventurous, larger-than-life shōnen energy that balances whimsical humor with genuine emotional weight. Influenced by: Eiichiro Oda, Weekly Shōnen Jump illustration tradition, cel-shaded anime-adaptation technique, adventure-shōnen character-design practice.`,
    "Sailor Moon Style": `A luminous, romantic shōjo-anime illustration style built on delicate, sparkling linework paired with soft cel shading punctuated by dreamy glow and starburst highlight accents, large, deeply detailed eyes carrying the emotional core of every expression, flowing, elongated proportions with a graceful, idealized elegance, decorative sparkle and floral motif woven lightly through hair and costume rendering, and a nostalgic, magical-girl radiance that feels tender, whimsical, and unmistakably 90s-shōjo. Influenced by: Naoko Takeuchi, 90s shōjo-anime tradition, magical-girl cel-animation technique, Toei Animation production practice.`,
    "Chibi Anime": `A super-deformed illustration style built on drastically compressed proportion where the head dominates a tiny, simplified body, minimal, rounded linework carrying maximum cuteness with minimal detail, flat-to-cel-based shading applied with cheerful simplicity, oversized expressive eyes and features exaggerated for instant emotional charm, and an endearing, playful miniature intensity that feels irresistibly cute and effortlessly lighthearted. Influenced by: chibi/super-deformed anime tradition, kawaii character-design technique, gag-manga illustration practice, cute-culture Japanese comic method.`,
    "Anime Key Visual": `A polished, high-production anime-illustration style built on crisp, confident linework merged with meticulously blended cel-to-gradient shading, dramatic promotional-grade lighting establishing bold mood within a single striking composition, richly detailed costume and character rendering balanced against clean, poster-ready silhouette clarity, dynamic yet composed posing calibrated for maximum visual impact at a glance, and a polished, franchise-defining illustration intensity built for instant recognition and promotional impact. Influenced by: contemporary anime-production key-visual tradition, promotional illustration technique, franchise-defining character-art practice, high-production anime-studio rendering method.`,
    "Junji Ito Style": `A meticulously detailed horror-manga illustration style built on dense, obsessive fine linework and cross-hatching that renders skin, hair, and texture with unsettling hyper-precision, ordinary human forms twisted into spiraling, biologically wrong distortions and body horror, stark black-and-white contrast with pools of inky shadow swallowing the edges of the frame, wide unblinking eyes carrying quiet dawning dread, and a slow-building, deeply unsettling atmosphere of cosmic horror seeping into mundane settings. Influenced by: Junji Ito, Tomie and Uzumaki manga art, body-horror illustration, ink cross-hatching technique.`,
    "Anime Illustration": `polished anime-inspired artwork featuring clean linework, expressive design language, refined cel-shading, controlled stylization, appealing visual clarity, carefully structured forms, and high-quality rendering that balances readability with emotional impact, emphasizing professional animation aesthetics and contemporary illustration craftsmanship, reminiscent of Yoshiyuki Sadamoto and Shingo Abe, inspired by Neon Genesis Evangelion and Your Name.`,
    "Ultradetailed Manga Illustration": `exceptionally dense manga aesthetics characterized by obsessive line fidelity, intricate textural rendering, advanced visual layering, meticulous hatch work, precise structural draftsmanship, and an extraordinary concentration of graphical information. The style emphasizes complexity, craftsmanship, and prolonged visual exploration, rewarding close inspection through micro-detail, architectural precision, elaborate costume design, and highly refined material interpretation. Rather than relying on simplified manga shorthand, it pursues visual richness, technical virtuosity, and immersive image construction while preserving strong readability and compositional control. The overall effect feels ambitious, authoritative, and intensely crafted, balancing narrative clarity with astonishing detail density and artistic dedication, reminiscent of Kentaro Miura and Tsutomu Nihei, inspired by Berserk and BLAME!.`,
    "Polished Ultrarealistic Anime Pin-Up": `A high-gloss digital illustration style merging ultrarealistic rendering of skin, hair, and fabric with idealized anime facial structure and expressive large eyes, glassy specular highlights coating lips, skin, and hair strands like fresh lacquer, a confident pin-up pose with exaggerated curves softened by airbrush-smooth shading gradients, vibrant saturated color palettes popping against clean or softly blurred backdrops, and a glossy, collectible-print polish that reads as equal parts anime key visual and glamour illustration. Influenced by: Range Murata, SakimiChan, gacha-game character art, airbrush pin-up illustration.`,
    "Thin Delicate Outline Romantic Anime-Photographic Hybrid": `A tenderly rendered illustration style built on impossibly fine, barely-there contour linework that whispers rather than defines, seamlessly merged with photographically convincing tonal depth and light behavior, a gentle, wistful softness carried through delicate gradient transition rather than any hard graphic edge, meticulous realism in structural modeling coexisting quietly with idealized anime-adjacent proportion, a hushed, sentimental intimacy pervading every composition, and a quietly luminous, emotionally tender finish that feels equally drawn and photographed. Influenced by: Ilya Kuvshinov, semi-realistic anime-illustration technique, photobashing rendering practice, contemporary romantic-portrait illustration method.`,
    "Cel Shading": `A crisp, flat-shaded rendering style built on hard-edged tonal division that separates each plane of light and shadow into distinct, uniform steps rather than smooth gradation, confident bold outline holding every shape with graphic clarity, minimal color banding replacing any continuous blending, a clean, deliberate simplicity that mimics hand-drawn animation logic within a fully dimensional render, and a punchy, graphic-meets-dimensional intensity that feels stylized, crisp, and instantly readable. Influenced by: cel-shading rendering technique, non-photorealistic 3D-rendering practice, anime-adjacent toon-shader method, stylized game-rendering tradition.`,
    "Cartoon Style": `A simplified, graphic illustration style built on confident, evenly weighted outline defining exaggerated, readable proportions, flat color fill with minimal shading complexity, an appealing, elastic sense of form that favors expressive readability over anatomical accuracy, cheerful, uncomplicated composition prioritizing instant visual clarity, and a lighthearted, accessible illustrative charm rooted in broad, universal animation tradition. Influenced by: classic American cel-animation tradition, flat-color character-design technique, squash-and-stretch animation practice, newspaper-syndicate cartoon method.`,
    "Invader Zim Style": `A jagged, angular cartoon-illustration style built on sharply exaggerated, gothic-adjacent proportion with elongated limbs and spiky, unstable silhouette construction, bold, high-contrast shading applied in stark graphic blocks rather than smooth gradation, an unsettling, off-kilter energy carried through asymmetrical, twitchy posing, confident thick outline holding chaotic, exaggerated expression, and a darkly quirky, kinetic cartoon intensity that feels equal parts manic and stylish. Influenced by: Jhonen Vasquez, gothic-adjacent cartoon-design tradition, angular limited-animation technique, early-2000s cult-cartoon practice.`,
    "Nickelodeon Animation Style": `A bold, energetic flat-cartoon illustration style built on thick, confident outline holding exaggerated, rubbery proportions, bright, evenly saturated flat-color fill with minimal shading complexity, a loose, elastic sense of squash-and-stretch built directly into character design, expressive, oversized facial features prioritizing comedic timing over anatomical accuracy, and a irreverent, kid-friendly energy that feels loud, playful, and unmistakably 90s-cartoon in spirit. Influenced by: classic 90s Nickelodeon cel-animation tradition, flat-color character-design technique, squash-and-stretch animation practice, irreverent kids'-cartoon design method.`,
    "Rick and Morty Style": `A loose, deliberately imperfect cartoon illustration style built on wobbly, slightly rubbery linework that embraces visible inconsistency over polished precision, flat, simple fill with minimal rendering complexity, exaggerated elastic proportions carrying manic, unpredictable expressiveness, a scrappy, DIY animation looseness that favors comedic energy over visual refinement, and an irreverent, chaotic indie-animation charm that feels intentionally rough around the edges. Influenced by: Justin Roiland, adult-swim animation tradition, flat cel-shading technique, indie sitcom-cartoon character design.`,
    "Simpsons Style": `A bold, flat cartoon illustration style built on thick confident outline holding simplified exaggerated proportions, bright even flat fill with minimal shading or gradient, an overbite-heavy, wide-eyed character-design language prioritizing instant graphic readability, loose, bouncy proportion distortion for comedic expressiveness, and a cheerful, satirical, unmistakably mass-market animated-sitcom energy. Influenced by: Matt Groening, classic American cel-animation technique, flat-color sitcom cartoon tradition, satirical animated character design.`,
    "South Park Style": `A crude, deliberately flat cutout-illustration style built on rigid, geometric construction that mimics paper-cutout assembly rather than fluid drawing, minimal internal shading applied in flat, uniform blocks with almost no gradation, an intentionally stiff, limited sense of motion and pose that embraces its own construction-paper simplicity, bold, thick outline separating each simplified shape with graphic clarity, and a crude, deadpan comedic charm that feels deliberately unpolished and instantly recognizable. Influenced by: Trey Parker and Matt Stone, construction-paper stop-motion-inspired animation technique, flat cutout-illustration tradition, deadpan cartoon-design practice.`,
    "Steven Universe Style": `A soft, rounded flat-cartoon illustration style built on gentle, simplified geometric shapes carrying warm, approachable proportion, even flat-color fill applied with minimal shading beyond soft contact shadow, a pastel-adjacent restraint in tonal contrast that keeps every composition feeling calm and gentle, expressive, oversized eyes and rounded facial design prioritizing emotional warmth over detail, and a wholesome, tender animated sincerity that feels comforting, gentle, and quietly heartfelt. Influenced by: Rebecca Sugar, Cartoon Network flat-color animation tradition, gentle geometric character-design technique, contemporary emotionally-driven cartoon practice.`,
    "Adventure Time Style": `A playful, flat cartoon illustration style built on bold, simplified outline with minimal internal detail, rubber-hose-adjacent proportions that stretch and simplify anatomy into loose, expressive shapes, even flat cel shading with almost no gradient or rendering complexity, a cheerful, whimsical simplicity that favors charm and readability over realism, and a lighthearted, surreal storybook energy that feels effortlessly hand-drawn. Influenced by: Pendleton Ward, modern American cartoon illustration, flat cel-shading technique, indie animation character design.`,
    "Hanna-Barbera Style": `A bold, economical flat-cartoon illustration style built on confident, simplified outline holding limited, efficient character design, flat, evenly applied color fill with minimal shading complexity, a charmingly stiff, limited-animation-friendly sense of proportion and pose, cheerful, uncomplicated composition favoring instant readability over rendering nuance, and a nostalgic, mid-century Saturday-morning charm that feels effortlessly bright and universally appealing. Influenced by: Hanna-Barbera Productions, mid-century American limited-animation tradition, flat-color cartoon technique, Saturday-morning cartoon design practice.`,
    "Family Guy Style": `A bold, flat cartoon illustration style built on thick, confident outline holding simplified, blocky proportions, bright, evenly applied flat color with minimal shading complexity, an exaggerated, oval-headed character-design language prioritizing instant graphic readability, static, stiff posing typical of limited-animation efficiency, and a satirical, unmistakably mass-market animated-sitcom energy rooted in broad American cartoon convention. Influenced by: Seth MacFarlane, flat-color limited-animation technique, prime-time animated-sitcom tradition, satirical cartoon-design practice.`,
    "Modern Cartoon": `A clean, flat illustration style built on confident, simplified outline holding contemporary, streamlined proportions, bright flat-color fill with minimal shading beyond basic form-defining contact shadow, an appealing, geometrically simplified sense of form balancing charm with graphic efficiency, cheerful, uncomplicated composition favoring instant digital-platform readability, and a versatile, contemporary animated charm rooted in current streaming-era cartoon convention. Influenced by: contemporary streaming-animation tradition, flat-color character-design technique, digital-native cartoon practice, modern indie-animation method.`,
    "Rubber Hose Cartoon": `A bouncy, elastic illustration style built on limbs and forms constructed as smooth, tubular curves entirely free of joints or rigid structure, confident thick, uniform outline holding simplified, exaggerated proportions, flat, minimal shading applied with cheerful graphic simplicity, a springy, perpetually-in-motion sense of pose even in stillness, and a nostalgic, early-animation charm that feels playful, fluid, and unmistakably vintage. Influenced by: 1920s-30s American cel-animation tradition, Fleischer Studios technique, rubber-hose character-design practice, early Disney/Warner Bros animation method.`,
    "Disney Ultradetailed Illustration": `premium feature-animation aesthetics characterized by exceptionally refined draftsmanship, expressive form design, sophisticated visual appeal, advanced material rendering, cinematic staging, and meticulous attention to every surface and design element. The style emphasizes clarity, emotional readability, graceful shape language, polished visual storytelling, and a remarkable balance between realism and stylization, combining the charm of classical animation with the fidelity of contemporary digital illustration. Rather than relying on simplified cartoon conventions, it pursues richness, precision, and production-level craftsmanship through nuanced lighting, intricate textures, elegant composition, and highly controlled rendering. The resulting imagery feels aspirational, immersive, and masterfully produced, with every element contributing to a cohesive sense of wonder, artistry, and visual sophistication, reminiscent of Glen Keane and James Baxter, Inspired by Walt Disney.`,
    "Classic disney Feature Animation": `A warm, hand-painted animation-illustration style built on rounded, appealing character proportions carrying expressive, exaggerated readability, smooth cel-shaded color application with gentle, naturalistic gradation, meticulous attention to fluid, principle-driven motion even within a single still frame, a nostalgic, wholesome sincerity carried through soft, inviting lighting logic, and a timeless, storybook grandeur rooted in decades of golden-age feature-animation craftsmanship. Influenced by: Disney and Walt Disney, golden-age American feature-animation tradition, classical cel-animation painting technique, expressive character-animation principles, mid-century studio illustration practice.`,
    "Cyberpunk: Edgerunners Style": `A frenetic, high-contrast animation illustration style built on jagged, aggressive linework that fractures form into sharp angular fragments during moments of intensity, saturated glow-drenched lighting that bleeds and blooms aggressively around every luminous edge, gritty textural noise layered beneath clean cel-shaded color to keep the surface feeling raw and lived-in, dynamic, chaotic framing charged with kinetic violence and manic energy, and a visceral, dystopian animation intensity that feels equal parts stylish and feral. Influenced by: Studio Trigger animation technique, cyberpunk anime tradition, glow-bloom digital compositing practice, gritty dystopian character-design method.`,
    "Bruce Timm Noir": `stylish noir-inspired illustration aesthetics characterized by confident silhouette design, elegant simplification, clean geometric construction, dramatic shadow composition, strong graphic readability, and cinematic visual storytelling, blending classic animation principles with crime-fiction atmosphere through disciplined linework, refined staging, and timeless visual sophistication, reminiscent of Bruce Timm and Darwyn Cooke, inspired by Batman: The Animated Series and DC: The New Frontier.`,
    "Arcane Animation Still": `A richly painterly animated-illustration style built on visible, confident brushstroke texture layered directly into rendering rather than smoothed away, dramatic chiaroscuro lighting that carves bold graphic shadow across stylized angular form, a fusion of hand-painted textural depth with clean animation-ready linework, moody atmospheric tonal harmony charged with cinematic tension, and a bold, painterly-meets-graphic animation intensity that feels both illustrated and alive. Influenced by: Fortiche Production, League of Legends concept-art tradition, painterly animation technique, cinematic stylized character-design practice.`,
    "Toon Shader": `A crisp, flat-shaded rendering style built on hard-edged tonal division that separates each plane of light and shadow into distinct, uniform steps rather than smooth gradation, confident bold outline holding every shape with graphic clarity, minimal color banding replacing any continuous blending, a clean, deliberate simplicity that mimics hand-drawn cel-animation logic within a fully dimensional render, and a punchy, graphic-meets-dimensional intensity that feels stylized, crisp, and instantly readable. Influenced by: cel-shading rendering technique, non-photorealistic 3D-rendering practice, anime-adjacent toon-shader method, stylized game-rendering tradition.`,
    "Comics Style": `A bold, graphic illustration style built on confident inked linework holding clearly defined, dynamic proportions, flat-to-lightly-shaded color fill applied with straightforward panel-ready clarity, dynamic, energetic posing designed for instant visual impact, a punchy, readable simplicity that favors narrative clarity over painterly nuance, and a versatile, accessible graphic-storytelling charm rooted in broad mainstream comic-illustration convention. Influenced by: mainstream American comic-illustration tradition, inked-and-colored panel technique, dynamic action-comic practice, classic comic-book character-design method.`,
    "Alex Ross Style": `A monumental, painterly superhero-realism style rendered in traditional gouache and oil technique translated into hyperreal digital polish, richly lit subject with photoreal textures grounded in classical painting light logic, epic, reverent compositions that frame subject like religious or historical icon, warm painterly color harmonies bathing every scene in golden, dignified light, and a grand, mythic gravitas that elevates comic-book imagery into fine-art portraiture. Influenced by: Alex Ross, Norman Rockwell, classical gouache painting technique, Kingdom Come comic art direction.`,
    "Alternative Comics Style": `A raw, personal illustration style built on deliberately imperfect, loose linework that resists mainstream polish in favor of authentic idiosyncratic mark-making, minimal or improvised shading applied with a sketchbook-like immediacy, unconventional panel logic and compositional looseness that prioritizes voice over convention, a candid, confessional intimacy carried through visibly handmade imperfection, and an independent, unpolished sincerity that feels personal, experimental, and unmistakably auteur-driven. Influenced by: Robert Crumb, underground comix tradition, indie/alternative comics movement, sketchbook-diary illustration practice.`,
    "Amanda Conner Illustration": `expressive comic illustration defined by lively draftsmanship, fluid linework, dynamic visual rhythm, appealing stylization, confident character-centric design, polished rendering, and strong storytelling clarity, balancing playful energy with professional craftsmanship through highly readable forms and engaging visual expression, reminiscent of Amanda Conner and Bruce Timm, inspired by Harley Quinn and Power Girl.`,
    "American Comic Realism": `highly polished comic-book realism emphasizing convincing anatomy, dramatic visual storytelling, cinematic composition, realistic material rendering, strong volumetric lighting, and detailed environmental integration, combining classical illustration discipline with modern entertainment-art sensibilities to create imagery that feels both grounded and iconic, reminiscent of Bryan Hitch and Alex Ross, inspired by The Ultimates and Kingdom Come.`,
    "Comic Européen Prestige": `sophisticated European graphic storytelling aesthetics characterized by meticulous draftsmanship, refined linework, atmospheric realism, rich visual detail, and mature narrative sensibilities, blending artistic individuality with exceptional craftsmanship through carefully structured composition, nuanced rendering, immersive worldbuilding, and album-quality presentation, reminiscent of François Schuiten and Enki Bilal, inspired by Les Cités Obscures and La Trilogie Nikopol.`,
    "American Pulp Illustration": `bold commercial illustration defined by dramatic storytelling, striking visual impact, confident draftsmanship, dynamic composition, rich painterly rendering, and a heightened sense of adventure and spectacle, combining accessible narrative clarity with highly crafted imagery through vibrant visual energy, polished execution, and iconic genre aesthetics, reminiscent of N.C. Wyeth and Frank McCarthy, inspired by Doc Savage magazine covers and The Shadow pulp illustrations.`,
    "Frank Miller Style": `A stark, high-contrast graphic-novel illustration style built on bold, confident inking with dramatic, oversized spotted blacks that carve the composition into aggressive light-and-dark extremes, minimal internal detail replaced by sheer graphic silhouette, sharp angular linework rendering violent, kinetic composition with brutal economy, a hardboiled, noir-driven starkness charged with pulp menace, and a bold, unflinching graphic-novel intensity that feels stripped-down, aggressive, and unmistakably iconic. Influenced by: Frank Miller, Sin City graphic-novel tradition, high-contrast noir-comic technique, minimalist spotted-black inking practice.`,
    "Crosshatched Graphic Novel": `detailed graphic narrative aesthetics characterized by intricate crosshatching, rich tonal construction, disciplined draftsmanship, atmospheric realism, and handcrafted visual texture, blending traditional ink illustration techniques with mature storytelling through layered line density, strong value structure, refined composition, and immersive narrative depth, reminiscent of Bernie Wrightson and Franklin Booth, inspired by From Hell and The Sandman.`,
    "Graphic Novel": `A refined, narrative-driven comic-illustration style built on confident, deliberate linework calibrated for long-form storytelling clarity, a measured, literary pacing carried through composed, thoughtful framing, tonal shading achieved through cross-hatching, wash, or restrained color rather than flat panel simplicity, a grounded, atmospheric weight even within stylized composition, and a sophisticated, contemplative illustration gravitas that feels considered, mature, and built for sustained visual reading. Influenced by: contemporary graphic-novel illustration tradition, long-form narrative-comic technique, literary comic-illustration practice, mature-audience sequential-art method.`,
    "Franco-Belgian Ultradetailed Comics": `A meticulously rendered bande dessinée illustration style built on dense, obsessively fine linework and layered crosshatching that constructs every texture with architectural patience, richly detailed surface rendering across fabric, skin, and structure that rewards close inspection, a measured, cinematic pacing carried through carefully composed, deliberate framing, subtle atmospheric depth achieved through fine tonal gradation rather than bold contrast, and a sophisticated, painstakingly crafted graphic-novel gravitas. Influenced by: Jean "Mœbius" Giraud, François Schuiten, Franco-Belgian bande dessinée tradition, ligne claire and hatching technique.`,
    "Bande Dessinée (Hergé/Goscinny Tradition)": `A clean, confident ligne-claire illustration style built on uniform, unmodulated contour lines holding clearly bounded, evenly flat-colored shapes, minimal internal shading that lets crisp linework and bold color carry the entire compositional weight, meticulous, precise architectural and environmental detail rendered with the same graphic clarity as the figures themselves, a measured, orderly compositional rhythm favoring readability and charm over painterly nuance, and a timeless, wholesome European adventure-comic sincerity that feels meticulous, warm, and effortlessly classic. Influenced by: Hergé, René Goscinny, ligne-claire illustration technique, Franco-Belgian bande dessinée tradition.`,
    "Frank Cho Style": `A confident, curvaceous comic-illustration style built on smooth, fluid linework that traces form with athletic, idealized grace, clean cel-based shading applied with bold, uncomplicated clarity, a bouncy, dynamic sense of proportion charged with lighthearted charisma, dynamic action-driven posing balanced against playful, appealing character design, and a polished, mainstream comic-illustration vibrancy that feels equal parts adventurous and effortlessly charming. Influenced by: Frank Cho, mainstream American comic-illustration tradition, cel-shaded character-illustration technique, dynamic adventure-comic practice.`,
    "Hellboy Style": `A gritty, high-contrast comic-illustration style built on bold, confident inking with heavy spotted blacks that carve dramatic graphic shadow across every form, chunky, weighty linework rendering musculature and stonework with sculptural bluntness, muted, moody washes applied loosely beneath stark ink structure, a folkloric, pulp-horror gravitas charged with brooding atmosphere, and a bold, hand-inked graphic-novel intensity that feels ancient, weathered, and unmistakably hand-crafted. Influenced by: Mike Mignola, noir-inspired comic-inking technique, folk-horror illustration tradition, spotted-black ink-rendering method.`,
    "Archie Comics Style": `A clean, wholesome cartoon illustration style built on confident, evenly weighted outline defining simplified, appealing proportions, flat, bright color fill with minimal shading beyond basic form-defining shadow, an approachable, mid-century newspaper-strip charm carried through rounded, friendly facial design, cheerful, uncomplicated composition prioritizing instant readability over rendering complexity, and a nostalgic, all-American wholesome energy that feels timeless and effortlessly friendly. Influenced by: Dan DeCarlo, mid-century American comic-strip tradition, flat-color comic-inking technique, newspaper-syndicate cartoon practice.`,
    "Marvel Comics Style": `A bold, dynamic mainstream superhero comic illustration style built on confident heavy inking over energetic, muscular figure work, punchy primary color palettes laid in flat-to-cel-shaded color with sharp graphic contrast, dramatic action-driven poses and foreshortening designed for kinetic panel-to-panel storytelling, crisp halftone-inspired texture and bold speed lines heightening momentum, and an iconic, larger-than-life heroic energy instantly recognizable as classic American superhero art. Influenced by: Jack Kirby, John Romita Jr., Marvel Comics house style, Silver Age comic inking technique.`,
    "Marvel Cover Art": `A striking, poster-worthy superhero illustration style built for maximum newsstand impact, dramatic hero-forward composition with bold dynamic posing thrust toward the viewer, richly rendered digital painting or ink-and-color hybrid technique giving weight and polish beyond interior panel art, saturated high-contrast color palettes anchored by an iconic focal color, dramatic rim lighting and glowing effects framing the central figure against a moody or explosive backdrop, and a bold, hyper-marketable heroic grandeur designed to sell a single unforgettable image. Influenced by: Alex Ross, J. Scott Campbell, Marvel Comics cover art direction, comic-cover painting technique.`,
    "DC Comics Style": `A bold, dynamic mainstream superhero comic-illustration style built on confident heavy inking over powerful, heroic figure work, punchy saturated color-block application with sharp graphic contrast, dramatic action-driven posing and foreshortening designed for kinetic panel-to-panel storytelling, crisp linework balancing classic heroic silhouette with modern rendering polish, and an iconic, larger-than-life heroic gravitas instantly recognizable as classic mainstream American superhero comics. Influenced by: Jim Lee, Neal Adams, DC Comics house style, mainstream superhero-illustration tradition.`,
    "Drawing": `A direct, hand-crafted illustration style built on confident linework capturing form through economical, considered mark-making, restrained tonal shading applied through simple cross-hatching or light shading rather than elaborate rendering, an honest, unembellished clarity that favors observation over stylization, unhurried, deliberate strokes carrying a personal, tactile sensibility, and a timeless, accessible sincerity rooted in foundational drawing tradition. Influenced by: traditional pencil-and-ink drawing tradition, life-drawing practice, classical illustration fundamentals, observational sketching method.`,
    "Caricature": `A playful exaggeration-driven illustration style built on bold distortion of proportion that amplifies distinctive features for comedic and expressive impact, loose, confident linework capturing likeness through economical, energetic mark-making rather than exhaustive detail, light, quick shading applied to suggest form without slowing the gestural energy, an exuberant, larger-than-life comic timing embedded in every exaggerated feature, and a witty, high-energy sketch-illustration charm that celebrates personality over precision. Influenced by: classic caricature-illustration tradition, quick-sketch portraiture technique, satirical editorial illustration, gestural ink-and-wash caricature.`,
    "Charcoal Rendering": `traditional drawing aesthetics characterized by rich tonal gradation, expressive mark-making, tactile surface texture, atmospheric softness, and powerful value-based form construction, emphasizing depth, mood, and craftsmanship through layered shading, subtle edge control, and a handcrafted visual presence that balances realism with artistic interpretation, reminiscent of Käthe Kollwitz and Robert Longo, inspired by The Weavers and Men in the Cities.`,
    "Hyperrealistic Colored-Pen Sketch": `A meticulously rendered drawing style built on dense, layered pen strokes that build tonal depth and material realism entirely through cross-hatching, stippling, and controlled ink-layering rather than blended shading, painstaking precision in capturing texture and light behavior with a fine-tipped, linear medium, an obsessive patience carried through countless overlapping passes to achieve photographic depth, a technically virtuosic tension between the rigidity of the pen medium and the softness of the rendered subject, and an intensely disciplined, prolonged-focus rendering intensity. Influenced by: hyperrealist pen-and-ink illustration technique, fine-liner cross-hatching method, contemporary colored-pen portrait artists, meticulous layered-ink rendering practice.`,
    "Jarek Kubicki Style": `A darkly whimsical illustration style built on confident, sketch-like linework carrying gothic-adjacent playfulness, a muted, atmospheric tonal palette balanced against bold, graphic character silhouettes, a slightly unsettling yet endearing character-design sensibility blending humor with quiet unease, meticulous textural mark-making giving surfaces a hand-drawn, tactile roughness, and a distinctive, contemporary illustration voice that feels equally macabre and playful. Influenced by: Jarek Kubicki, contemporary character-illustration tradition, gothic-whimsical illustration technique, hand-drawn textural rendering practice.`,
    "Playful Hand-Drawn Illustration": `A loose, charming illustration style with visibly hand-inked or hand-painted linework that keeps a warm, imperfect human touch, bouncy exaggerated proportions and expressive gesture-driven poses, bright cheerful color palettes applied in flat or lightly textured washes, whimsical small details and doodle-like embellishments scattered through the composition, and a lighthearted, storybook charm that feels immediate, joyful, and unpolished in the best way. Influenced by: Quentin Blake, children's picture-book illustration, gouache and watercolor sketching, modern editorial doodle art.`,
    "Chinese Ink Drawing": `A meditative, gestural illustration style built on fluid, calligraphic brushwork that captures form through economical, confident strokes rather than exhaustive detail, deliberate negative space treated as an active compositional element carrying as much weight as rendered form, varying ink density achieved through brush pressure and water dilution rather than layered shading, a contemplative, breath-driven rhythm carried through unhurried, deliberate mark-making, and a timeless, philosophical restraint that values suggestion and empty space over exhaustive representation. Influenced by: traditional Chinese shuǐmò (ink-wash) painting tradition, literati brush-painting practice, Xu Beihong ink technique, classical Chinese calligraphy discipline.`,
    "Sketch": `A raw, immediate illustration style built on loose, gestural linework that captures form through confident, economical mark-making rather than exhaustive rendering, visible construction lines and searching strokes left intentionally unresolved, minimal tonal shading achieved through quick cross-hatching or light smudging rather than smooth gradation, an energetic sense of spontaneity and unfinished momentum carried through every line, and a raw, honest immediacy that values gesture and observation over polish. Influenced by: life-drawing sketch tradition, charcoal and graphite illustration technique, quick-study figure drawing, academic atelier sketching method.`,
    "Beatrix Potter Style": `A gentle, meticulously observed watercolor illustration style built on delicate, softly blended washes carrying quiet naturalist precision, fine detailed linework reserved for texture and form rather than bold outline, a hushed pastoral tenderness radiating through soft diffused lighting, restrained old-world charm achieved through understated, unhurried brushwork, and a tender, storybook intimacy that feels both scientifically observant and gently whimsical. Influenced by: Beatrix Potter, English watercolor illustration, naturalist botanical illustration, Golden Age children's book art.`,
    "Children's Book Drawing": `A warm, gentle illustration style built on soft, simplified linework carrying a sincere, approachable charm, delicate flat-to-lightly-shaded color application applied with cheerful, unhurried restraint, rounded, endearing proportions favoring emotional warmth over anatomical precision, generous, uncluttered composition that gives each small detail room to breathe, and a tender, timeless storybook sincerity that feels handmade, comforting, and quietly imaginative. Influenced by: golden-age children's-book illustration tradition, gouache-and-ink storybook technique, gentle character-design practice, whimsical picture-book method.`,
    "Vintage Children's Book Drawing": `A gentle, nostalgic illustration style built on soft, hand-inked linework carrying old-world sincerity and charm, delicate watercolor-adjacent washes applied with unhurried, muted restraint, rounded, endearing proportions favoring warmth and whimsy over anatomical precision, a hushed, timeworn tenderness carried through generous, uncluttered composition, and a wistful, storybook nostalgia that feels handmade, cherished, and quietly magical. Influenced by: mid-century golden-age children's-book illustration tradition, gouache-and-watercolor storybook technique, classic picture-book character-design practice, vintage print-illustration method.`,
    "Gris Grimly Style": `A whimsically macabre illustration style built on gnarled, spindly linework that twists proportion into gothic, storybook exaggeration, scratchy, textured crosshatching layered with unsettling nervous energy, elongated, angular form carrying a darkly comedic fragility, a hushed, eerie theatricality pervading every composition, and a darkly whimsical, gothic-fairytale charm that feels equal parts sinister and playful. Influenced by: Gris Grimly, gothic children's-book illustration tradition, macabre hand-drawn illustration technique, whimsical dark-fantasy character-design practice.`,
    "Tim Burton Style": `A whimsically macabre illustration style built on elongated, spindly proportions and exaggerated angular gauntness, high-contrast graphic shading that carves gothic drama from stark light-and-dark simplicity, swirling, hand-drawn linework carrying a nervous, sketchy energy, wide hollow eyes rendered with melancholic, storybook expressiveness, and a darkly whimsical, gothic-fairytale charm that feels equal parts eerie and endearing. Influenced by: Tim Burton, gothic stop-motion animation design, whimsical macabre illustration, hand-drawn concept-art sketch technique.`,
    "Fashion Sketch": `An elegant, elongated illustration style built on fluid, confident linework stretching proportion into graceful, statuesque exaggeration, minimal, loose shading applied with quick, economical strokes rather than full rendering, a light, airy sense of movement carried through unhurried, gestural mark-making, deliberate emphasis on flowing silhouette and pose over anatomical exactness, and a chic, effortless sketch-illustration elegance that feels immediate, stylish, and quietly sophisticated. Influenced by: fashion-illustration tradition, croquis sketching technique, editorial fashion-sketch practice, elongated figure-drawing method.`,
    "Loose Crosshatched Character Sketch": `A lively, unfinished-feeling character-illustration style built on confident, visibly searching linework left intentionally raw rather than cleaned up, dense parallel crosshatching used sparingly to suggest volume and shadow without committing to full rendering, expressive, exaggerated facial modeling that prioritizes emotional intensity over anatomical polish, a loose, energetic looseness at the edges that keeps the whole piece feeling immediate and process-driven, and a spirited, illustrative rawness that reads as equal parts concept sketch and finished character study. Influenced by: contemporary character-design sketch practice, marker-and-pencil illustration technique, expressive digital-sketch rendering method, gesture-driven character-study tradition.`,
    "Wojak/Meme-Sketch Style": `A crude, minimal-effort illustration style built on loose, deliberately unrefined ballpoint-pen linework that abandons anatomical precision for rapid expressive shorthand, flat, mostly absent shading beyond the barest suggestion of form, a blunt, economical mark-making approach that prioritizes instant emotional legibility over any technical polish, an intentionally amateur roughness that reads as sincere rather than sloppy, and a deadpan, internet-native rawness that turns crudeness itself into the entire expressive language. Influenced by: internet meme-illustration tradition, minimalist ballpoint-sketch technique, imageboard-culture drawing practice, deliberately crude digital-doodle method.`,
    "Ink Pen Drawing": `A precise, linear illustration style built on confident, controlled strokes that construct every form entirely through line rather than blended tone, dense cross-hatching and stippling layered to achieve tonal depth purely through line density, a crisp, deliberate discipline carried through unhurried, considered mark-making, meticulous attention to line-weight variation suggesting weight and dimensionality, and a timeless, meticulous craftsmanship rooted in centuries of traditional pen-and-ink illustration practice. Influenced by: classical pen-and-ink illustration tradition, fine cross-hatching technique, engraving-adjacent linework practice, traditional academic drawing method.`,
    "Etching": `A meticulous printmaking-inspired illustration style built on dense, fine crosshatched linework that constructs every tone and volume purely through line density rather than flat shading, crisp needle-precise detail rendered with old-world engraving discipline, restrained tonal range achieved through layered hatching passes rather than smooth gradients, a quiet, antique gravitas carried through the deliberate, unhurried linework, and a refined, scholarly print-craft polish that feels historical, meticulous, and timeless. Influenced by: classical etching and engraving technique, Albrecht Dürer, printmaking illustration tradition, Gustave Doré linework.`,
    "Technical Drawing": `A precise, disciplined illustration style built on exacting linework constructed with mechanical accuracy and consistent line-weight logic, minimal or entirely absent shading that relies on line alone to convey form and structure, a rigorous, measured clarity that favors exact proportion and dimensional accuracy over expressive interpretation, meticulous attention to structural detail rendered with drafting-level precision, and a clean, methodical exactness rooted in centuries of engineering and scientific illustration discipline. Influenced by: technical/engineering-drawing tradition, drafting-illustration technique, scientific-diagram illustration practice, orthographic-projection drawing method.`,
    "Conté Pastel": `A rich, tactile drawing style built on dense, velvety pigment applied with confident, blendable pressure, a soft, smudgeable quality allowing form to be built through both layered mark-making and controlled blending, a warm, granular texture distinct from smoother chalk or charcoal media, deliberate tonal transition achieved through pressure variation rather than wet blending, and a timeless, painterly-adjacent intensity rooted in classical academic drawing tradition. Influenced by: Conté crayon drawing tradition, classical academic tonal-drawing practice, life-drawing atelier technique, fine-art pastel-and-chalk method.`,
    "Crayola Colored-Book Style": `A cheerful, deliberately simplified illustration style built on bold, uneven waxy strokes that fill flat shapes with visible, layered texture rather than smooth coverage, thick, confident outline holding basic, uncomplicated forms, minimal shading achieved through pressure variation and layered strokes rather than blending, a charming, imperfect childlike sincerity carried through slightly uneven coloring-within-the-lines application, and a nostalgic, playful simplicity that feels handmade, joyful, and unmistakably crafted by hand. Influenced by: children's coloring-book tradition, wax-crayon illustration technique, elementary art-class practice, simplified line-and-fill illustration method.`,
    "Bookplate Illustration": `refined decorative illustration aesthetics characterized by meticulous linework, engraved-inspired detailing, ornamental sophistication, literary craftsmanship, balanced composition, and timeless artisanal quality, blending classical printmaking traditions with elegant visual storytelling through intricate textures, disciplined draftsmanship, and exceptionally polished design sensibilities, reminiscent of Arthur Rackham and Aubrey Beardsley, inspired by Golden Age Bookplates and The Fairy Tales of the Brothers Grimm.`,
    "Collector Storybook Illustration": `premium narrative illustration aesthetics characterized by refined draftsmanship, elegant visual storytelling, intricate decorative detail, polished painterly rendering, and a timeless sense of wonder, blending classic storybook craftsmanship with modern production-quality execution through sophisticated composition, atmospheric depth, and meticulously curated visual richness, reminiscent of Arthur Rackham and Kinuko Y. Craft, inspired by The Fairy Tales of the Brothers Grimm and The Chronicles of Narnia.`,
    "Whimsical Illustration": `A lighthearted, charming illustration style built on soft, bouncy proportion that stretches form into playful, exaggerated shapes, gentle, evenly balanced shading applied with cheerful simplicity rather than dramatic contrast, a storybook sincerity carried through rounded, approachable linework, delicate small details scattered throughout the composition to reward closer looking, and a joyful, effortless charm that feels handmade, tender, and universally endearing. Influenced by: contemporary children's-book illustration tradition, gouache-and-ink whimsical technique, gentle character-design practice, storybook illustration method.`,
    "Doodle": `A loose, casual illustration style built on quick, unplanned linework that meanders with playful spontaneity rather than deliberate structure, minimal to no shading beyond simple scribbled fill, an unselfconscious, low-stakes energy carried through impulsive, exploratory mark-making, small whimsical details scattered organically without formal composition, and a lighthearted, effortless charm that feels immediate, personal, and free of any polish. Influenced by: margin-doodle sketching tradition, casual ballpoint-pen illustration technique, unstructured gesture-drawing practice, personal notebook-sketch method.`,
    "Very Simplistic Doodle": `A radically minimal illustration style built on the barest possible linework needed to suggest form, no shading whatsoever beyond an occasional flat scribble, a childlike, unpracticed economy of gesture that favors instant recognizability over any accuracy, loose, wobbly strokes drawn with no correction or refinement, and a charmingly crude, effortless simplicity that feels spontaneous, playful, and completely unpolished. Influenced by: margin-doodle sketching tradition, casual ballpoint-pen technique, unstructured gesture-drawing practice, minimalist notebook-sketch method.`,
    "Photography": `A naturalistic image-capture style built on realistic light behavior and tonal rendering true to how a camera records a scene, balanced exposure calibrated for believable, accurate representation, honest, unmanipulated framing that favors authentic likeness over stylization, subtle, natural depth-of-field separation distinguishing subject from surroundings, and a straightforward, credible visual clarity rooted in standard photographic convention. Influenced by: standard photographic-capture tradition, professional camera-technique practice, naturalistic exposure method, conventional portrait-photography convention.`,
    "35mm Photography": `A classic film-photography style built on natural grain structure inherent to the smaller film format, a slightly compressed yet intimate depth-of-field character distinct from larger formats, honest, unmanipulated tonal rendering shaped by the chemistry of the film stock itself, unhurried, documentary-adjacent framing suited to spontaneous, handheld capture, and a timeless, tactile authenticity rooted in decades of photographic tradition. Influenced by: 35mm film photography tradition, photojournalism practice, Henri Cartier-Bresson candid-capture method, analog darkroom-development technique.`,
    "Analog Photography": `A tactile, organic photographic style built on natural grain structure that gives every surface a subtle, unpolished texture rather than digital smoothness, gentle imperfections in tonal transition and mild halation around bright highlights that soften harsh contrast, a slightly muted, imperfect dynamic range that feels handled and physical rather than clinically corrected, unhurried natural or available light rendered with honest, unmanipulated character, and a nostalgic, authentic materiality that carries the quiet imperfection of chemistry and light captured on film. Influenced by: 35mm film photography tradition, darkroom development technique, analog photojournalism practice, medium-format film camera aesthetic.`,
    "Black And White Documentary": `timeless documentary photography aesthetics emphasizing strong tonal separation, rich grayscale rendering, authentic visual storytelling, observational realism, natural light behavior, subtle film grain, and emotional immediacy, capturing people and moments with honesty, depth, and human presence through restrained composition and enduring photographic craftsmanship, reminiscent of Sebastião Salgado and Henri Cartier-Bresson, inspired by Workers and The Decisive Moment.`,
    "Cinematic Photography": `A dramatically composed photographic style built on deliberate, film-like framing that favors wide aspect ratios and purposeful negative space, controlled color-grading logic that unifies highlight and shadow into a single cohesive mood, soft, motivated lighting sources that feel narratively justified rather than purely technical, a patient, unhurried compositional stillness charged with implied story beyond the frame, and a polished, narrative-driven visual gravitas rooted in feature-film visual-language tradition. Influenced by: Roger Deakins cinematography tradition, anamorphic-lens visual technique, narrative film-lighting practice, color-grading post-production method.`,
    "Selfie Photo": `A casual, close-range photographic style built on a slightly distorted, wide-angle-adjacent perspective inherent to arm's-length framing, soft, often front-facing diffused illumination that flattens shadow across the face, an intimate, immediate closeness that favors candid spontaneity over composed distance, a natural, unpolished exposure balance shaped by ambient or handheld conditions rather than deliberate setup, and a familiar, personal authenticity that feels casual, present, and unmistakably first-person. Influenced by: contemporary smartphone-photography convention, front-camera portrait technique, candid self-portraiture practice, casual social-media photographic method.`,
    "Brassaï Night Photography": `nocturnal photographic aesthetics characterized by atmospheric illumination, deep tonal richness, urban mystery, reflective surfaces, cinematic shadow play, and evocative documentary realism, capturing the poetry of night through carefully observed light, immersive mood, and timeless visual storytelling while maintaining exceptional compositional discipline and photographic craftsmanship, reminiscent of Brassaï and Robert Doisneau, inspired by Paris de Nuit and French Humanist Photography.`,
    "Natural Lighting Photography": `A soft, organic photographic style built on ambient, unmanipulated illumination shaped entirely by the qualities of available light rather than artificial control, gentle, shifting tonal balance that changes with time and atmosphere, an honest, unforced rendering quality that preserves subtle imperfection and authentic dimensionality, a calm, unhurried stillness carried through patient, observational framing, and a timeless, believable authenticity that feels effortless, grounded, and quietly beautiful. Influenced by: available-light photography tradition, documentary natural-light technique, editorial location-photography practice, observational portrait method.`,
    "Blue Hour Cinema": `cinematic visual aesthetics defined by soft transitional illumination, subtle atmospheric depth, refined tonal gradients, naturalistic mood, and elegant color relationships, creating a sense of quiet emotional intensity and immersive realism through sophisticated lighting design, polished rendering, and carefully balanced visual storytelling, reminiscent of Roger Deakins and Greig Fraser, inspired by Skyfall and Blade Runner 2049.`,
    "Golden Hour Photography": `A softly directional photographic style built on a low, raking angle of natural illumination that stretches long, gentle shadows across the frame, a diffused, glowing quality softened by increased atmospheric scattering at that time of day, a flattering, low-contrast luminosity that wraps gently around form rather than casting harsh definition, an unhurried, fleeting stillness carried through the brief window of ideal light, and a nostalgic, cinematic tenderness that feels naturally soft and effortlessly atmospheric. Influenced by: natural available-light photography tradition, magic-hour cinematography technique, outdoor portrait-lighting practice, documentary golden-hour shooting method.`,
    "High-Key Lighting Photography": `A bright, evenly luminous photographic style built on soft, diffused illumination from multiple balanced sources that minimizes shadow and contrast almost entirely, a clean, airy tonal range concentrated in the upper end of the exposure scale, gentle wraparound light that flatters every plane of the subject without harsh falloff, a crisp, optimistic clarity free of moody depth, and a polished, commercial-grade brightness that reads as open, cheerful, and immaculately controlled. Influenced by: high-key studio photography technique, commercial beauty lighting tradition, fashion catalog photography, softbox lighting method.`,
    "Direct-Flash Photography": `A raw, unflinching photographic style built on a single harsh, on-axis burst of light that flattens form and eliminates subtlety, stark, high-contrast shadow falling immediately and abruptly behind the subject, an unretouched, unglamorous rendering quality that captures every texture with blunt honesty, a candid, confrontational immediacy carried through the flash's split-second harshness, and a gritty, documentary-style rawness that feels unfiltered, direct, and unmistakably real. Influenced by: Bruce Gilden street-photography tradition, direct on-camera-flash technique, raw documentary-photography practice, unretouched candid-capture method.`,
    "Neon Photography": `A vivid, high-contrast photographic style built on intense directional glow radiating from concentrated luminous sources, deep, engulfing shadow surrounding pockets of saturated brilliance, sharp reflective bounce catching and refracting colored light across every plane, an electric, nocturnal energy carried through dramatic tonal extremes, and a moody, atmospheric vibrancy that feels charged, urban, and unmistakably after-dark. Influenced by: neon-noir photography tradition, urban night-photography technique, gel-lighting cinematic practice, contemporary nightlife-photography method.`,
    "Photoshoot": `A polished, professionally composed photography style built on deliberate, controlled lighting calibrated to flatter and define form with confident clarity, considered, purposeful posing framed for maximum visual intention rather than candid spontaneity, a refined, consistent exposure balance that keeps every plane clearly and evenly rendered, a composed, unhurried stillness carried through careful, methodical setup, and a polished, commercial-grade photographic intensity built for deliberate, high-impact visual presentation. Influenced by: professional studio-photography tradition, commercial portrait-lighting technique, editorial photoshoot production practice, controlled-environment photographic method.`,
    "Instagram Model Glamour Photography": `A polished, aspirational glamour-photography style built on soft, evenly diffused lighting that flatters skin with a warm, flawless glow, confident curve-forward posing shot with a slight low angle for a flattering elongated silhouette, glossy heavy retouching that smooths texture while keeping a believable, photographic sheen, gentle golden-hour warmth or clean bright-studio evenness depending on setting, and a polished, algorithm-friendly commercial appeal built for maximum aspirational impact. Influenced by: contemporary Instagram influencer photography, commercial glamour retouching technique, social-media beauty content, golden-hour portrait lighting.`,
    "GQ Photoshoot": `A polished, confident editorial photography style built on crisp, controlled lighting that renders tailored form and texture with sharp, masculine clarity, bold, assured framing calibrated for magazine-cover authority and instant visual presence, a refined, understated retouching finish that emphasizes strength and composure without artificiality, striking directional key light carving confident definition across features and fabric alike, and a commanding, aspirational editorial polish that feels contemporary, assured, and effortlessly stylish. Influenced by: GQ magazine editorial tradition, high-fashion menswear photography technique, luxury glossy-print retouching practice, contemporary lifestyle campaign photography.`,
    "Supermodel Photoshoot": `A polished, high-fashion editorial photography style built on immaculately controlled studio lighting calibrated for maximum sculptural precision and flawless clarity, confident, statuesque posing framed with deliberate, magazine-ready authority, a refined retouching finish that idealizes without erasing distinctive character, dramatic directional key light carving sharp definition across every plane, and a commanding, aspirational editorial polish that feels timeless, glamorous, and unmistakably world-class. Influenced by: high-fashion editorial-photography tradition, luxury studio-lighting technique, professional glamour-retouching practice, haute-couture campaign-photography method.`,
    "Playboy / Maxim-Style Photoshoot": `A glossy, confident glamour-photography style built on flattering studio or golden-hour lighting that sculpts skin with a warm, sun-kissed glow, playful, flirtatious posing that favors curve-forward silhouettes and direct eye contact with the camera, saturated yet naturalistic color grading, tasteful wardrobe styling ranging from lingerie to casual glamour wear, and a confident, aspirational lifestyle-magazine polish that balances sensuality with an approachable, editorial sheen. Influenced by: Playboy magazine photography, Maxim magazine editorial style, glamour studio lighting technique, lifestyle commercial photography.`,
    "LinkedIn Pro Portrait": `A clean, approachable corporate-portrait photography style built on soft, evenly diffused lighting that flatters without dramatic contrast, confident, composed posing that reads as professional yet warm rather than stiff, a polished, subtly retouched finish that preserves natural authenticity over glossy artificiality, gentle, even exposure calibrated for consistent, trustworthy clarity, and a competent, approachable professional polish built for instant credibility at a glance. Influenced by: contemporary corporate-headshot photography, professional business-portrait practice, soft studio-lighting technique, LinkedIn/business-platform portrait convention.`,
    "Film Noir": `A stark, high-contrast photographic and cinematic style built on dramatic slatted-shadow patterns cutting sharply across the frame, a single low, hard-angled light source carving deep, engulfing darkness against isolated highlight, a hardboiled, morally ambiguous tension conveyed entirely through shadow and withheld detail, a deliberate, unhurried stillness charged with suspicion and menace, and a moody, cinematic gravitas rooted in mid-century crime-thriller visual tradition. Influenced by: classic film-noir cinematography tradition, chiaroscuro lighting technique, hardboiled crime-thriller visual practice, high-contrast black-and-white photographic method.`,
    "Hitchcockian Photo": `A meticulously composed suspense-driven photographic style built on deliberate, controlled framing that withholds and reveals information with calculated precision, dramatic, high-contrast lighting that isolates the subject within tense, shadow-heavy surroundings, a voyeuristic, slightly elevated or through-window vantage that implies watching rather than direct confrontation, an unhurried, deliberate stillness charged with mounting psychological tension, and a masterful, cinematic suspense built entirely through composition and restraint rather than overt spectacle. Influenced by: Alfred Hitchcock cinematography tradition, suspense-thriller visual technique, voyeuristic framing practice, classic Hollywood tension-building method.`,
    "Sin City Photography": `A stark, high-contrast black-and-white photographic style with razor-sharp shadow-to-highlight extremes, deep inky blacks pooling around a single dramatically lit subject, one isolated element rendered in bold selective color against the otherwise monochrome frame, and a hardboiled, pulp-noir cinematic tension dripping with danger and seduction. Influenced by: Sin City (Robert Rodriguez/Frank Miller), film noir cinematography, Frank Miller graphic novel art, chiaroscuro photography lighting.`,
    "Stranger Things-Inspired Art": `A moody, atmospheric illustration style built on thick, engulfing haze that swallows peripheral detail while a single dramatic source pierces through with sharp, saturated intensity, a nostalgic, retro-cinematic grain layered over the entire composition, tense, low-angle framing that charges ordinary space with looming unease, a deliberate contrast between soft ambient glow and harsh directional flare, and a suspenseful, synth-scored nostalgia that feels equal parts childhood wonder and creeping dread. Influenced by: 1980s horror-cinema visual tradition, retro VHS film-grain technique, practical-effects horror lighting practice, synth-era genre-film aesthetic.`,
    "Cyberpunk Photography": `A high-contrast, neon-drenched photographic style built on intense directional gel lighting that crosses the frame in sharp, saturated bands, wet-look reflective skin and atmosphere achieved through deliberate humid haze and moisture-catching highlight, dramatic low-angle framing that dwarfs the subject within looming urban density, deep engulfing shadow broken only by isolated glowing accents, and a cold, futuristic tension charged with dystopian nocturnal energy. Influenced by: Blade Runner cinematography tradition, neon-noir photography technique, cyberpunk urban-photography practice, gel-lighting cinematic method.`,
    "Cinematic Tron": `A sleek futuristic style built on glowing circuitry lines tracing form like living light against deep matte darkness, hard geometric paneling with a digitized, vector-precise silhouette, volumetric haze and lens bloom radiating off every glowing seam, dramatic wide-scale composition establishing cinematic grandeur within a single sweeping frame, and a cold, high-tech intensity that reads as being rendered from pure light and code. Influenced by: Tron: Legacy production design, Syd Mead, vector and vaporwave digital-art technique, cinematic concept-art lighting method.`,
    "Design": `A clean, purposeful graphic-illustration style built on confident, simplified shape construction that prioritizes function and clarity over decorative detail, flat or minimally gradated color application applied with intentional restraint, a balanced, structured compositional logic guided by clear visual hierarchy, deliberate, uncluttered spacing that lets each element read instantly, and a versatile, contemporary graphic-design clarity rooted in modern commercial and digital design convention. Influenced by: modern graphic-design tradition, minimalist design practice, contemporary commercial-design technique, digital-design composition method.`,
    "Corporate Memphis": `A flat, rounded illustration style built on simplified, tube-like limbs and gently curved geometric shapes replacing naturalistic anatomy entirely, uniform flat-color fill with minimal to no shading beyond soft contact shadow, a deliberately generic, approachable proportion language designed for broad, inoffensive relatability, clean, uncluttered composition prioritizing instant digital-platform legibility, and a friendly, corporate-tech sincerity that feels streamlined, accessible, and unmistakably contemporary. Influenced by: contemporary flat-illustration movement, tech-industry design-system practice, geometric character-illustration technique, digital-platform brand-illustration method.`,
    "Soviet Propaganda Poster": `A bold, graphic illustration style built on stark, high-contrast flat color fields separated by confident heavy outline, a monumental, low-angle compositional heroism that dramatically elevates the central figure, dynamic diagonal energy conveying collective momentum and forward-driving purpose, simplified, sculptural anatomy rendered with poster-ready graphic clarity over naturalistic nuance, and a bold, rousing propagandistic grandeur built for instant ideological impact at a distance. Influenced by: Constructivist poster-design tradition, Alexander Rodchenko, socialist-realist illustration technique, agitprop graphic-design practice.`,
    "Graphic Flat-Vector Travel Poster Illustration": `A bold, hand-cut illustration style built on faceted, angular shape construction that reduces form into confident planar segments rather than smooth gradation, sharp textural crosshatching and scratchy directional mark-making overlaid across otherwise flat color-block regions, a poster-ready graphic clarity balanced against loose, painterly energy at the edges, dramatic sunlit contrast carving crisp separation between illuminated and shadowed planes, and a stylish, contemporary travel-illustration polish that feels equally editorial and hand-crafted. Influenced by: contemporary vector-travel-poster illustration, faceted geometric-painting technique, mid-century advertising illustration tradition, editorial flat-color rendering practice.`,
    "Poster Art": `A bold, graphic illustration style built on confident, simplified composition designed to communicate instantly at a distance, flat or minimally gradated color application applied with deliberate visual punch, strong compositional hierarchy that guides the eye directly to a single focal statement, meticulous economy of detail favoring immediate readability over exhaustive rendering, and a striking, commercial-grade graphic impact rooted in traditional advertising and print-design practice. Influenced by: mid-century poster-design tradition, commercial advertising-illustration technique, graphic-design composition practice, print-poster illustration method.`,
    "Contemporary Commercial Illustration": `A polished, versatile illustration style built on clean, confident linework balanced with smooth digital shading calibrated for broad commercial appeal, bright, approachable lighting logic that keeps every composition legible and inviting, a deliberate, market-tested clarity favoring instant communication over artistic ambiguity, meticulous attention to appealing, on-trend rendering finish, and a professional, versatile illustrative polish rooted in contemporary advertising and editorial practice. Influenced by: contemporary commercial-illustration tradition, advertising-illustration technique, editorial-illustration practice, digital-brand illustration method.`,
    "Painting": `A richly layered illustration style built on confident brushwork that constructs form through visible, considered strokes rather than flat mechanical fill, blended tonal transition achieved through layered pigment application, a tactile, hand-crafted texture that preserves the character of the medium even within refined rendering, deliberate value and contrast control that gives form convincing dimensional weight, and a timeless, painterly sincerity rooted in foundational fine-art tradition. Influenced by: traditional oil-painting tradition, classical atelier technique, painterly fine-art practice, foundational tonal-rendering method.`,
    "Van Gogh Style": `An intensely expressive painting style built on thick, visible impasto brushstrokes applied with rhythmic, almost vibrating directional energy, dense, swirling mark-making that gives even still forms a sense of restless movement, confident, emotionally charged tonal contrast built through accumulated layered strokes rather than smooth blending, a raw, unrestrained painterly intensity where the physical gesture of the brush becomes inseparable from the emotion depicted, and a passionate, deeply personal painterly urgency rooted in late-19th-century post-impressionist rebellion. Influenced by: Vincent van Gogh, post-impressionist painting tradition, impasto brushwork technique, expressive plein-air painting practice.`,
    "Cubism": `A fragmented, multi-perspective painting style built on form broken into overlapping angular facets viewed from several vantage points simultaneously, a flattened, deconstructed sense of depth that rejects single-viewpoint realism entirely, confident geometric simplification reducing figure and space alike into intersecting planar shards, a rigorous, analytical restructuring that prioritizes conceptual seeing over optical accuracy, and a bold, intellectually radical visual rhythm rooted in early-20th-century avant-garde rebellion. Influenced by: Pablo Picasso, Georges Braque, Analytic Cubism tradition, early-20th-century avant-garde painting movement.`,
    "Jackson Pollock Style": `A raw, gestural painting style built on sweeping, spontaneous drips and flung strokes that prioritize emotional intensity over representational accuracy, bold physical mark-making where the visible energy of the trajectory becomes the subject itself, dense, layered tangles built through accumulated, unrestrained passes across the entire composition, a chaotic yet deliberate compositional freedom that resists any conventional structure, and a raw, cathartic painterly intensity that channels pure emotional immediacy over polished technique. Influenced by: Jackson Pollock, action-painting technique, drip-painting tradition, mid-century American Abstract Expressionist movement.`,
    "Academic Precision Realism": `A meticulously rendered academic-realist illustration style built on immaculate, glass-smooth surface finish achieved through countless thin layered glazes rather than visible brushwork, dramatic architectural lighting that rakes across richly detailed ornamental surface and fabric with near-photographic exactness, a controlled, studio-disciplined precision in every fold, texture, and reflective highlight, a hushed, contemplative grandeur carried through carefully staged compositional balance, and a polished, old-world craftsmanship that treats technical mastery itself as the subject. Influenced by: William-Adolphe Bouguereau, academic realism painting tradition, oil-glazing technique, classical atelier training method.`,
    "Wet-on-Wet Watercolor Ink Painting": `A fluid, unpredictable painting style built on pigment applied directly into an already-saturated wet layer, allowing color and tone to bloom, bleed, and diffuse with organic unpredictability rather than controlled placement, soft, feathered edges replacing any crisp boundary as washes merge and blend spontaneously, a delicate, translucent layering that builds depth through repeated wet passes rather than opaque coverage, an unhurried, meditative looseness carried through the medium's inherent unpredictability, and a poetic, ephemeral fluidity that captures the beauty of controlled chance. Influenced by: traditional wet-on-wet watercolor technique, ink-wash painting tradition, expressive fluid-media practice, spontaneous wash-blending method.`,
    "Artgerm Style": `A polished digital-painting portrait style blending photorealistic rendering with idealized comic-glamour proportions, luminous porcelain skin with soft airbrushed gradients and crisp specular highlights, richly detailed glossy rendering carried strand by strand where fine linework is called for, confident glamorous poses framed with clean painterly composition, and a slick, high-production pin-up polish that bridges Western comic-cover art and digital beauty illustration. Influenced by: Stanley "Artgerm" Lau, comic-book cover illustration, digital pin-up art, airbrush portrait technique.`,
    "Boris Vallejo Style": `A hyper-idealized fantasy painting style built on smooth, airbrushed skin rendering that gives powerfully sculpted anatomy a glossy, almost polished-marble finish, dramatic directional lighting wrapping muscular, statuesque forms in warm heroic glow, meticulously blended tonal transitions that eliminate visible brushwork in favor of glassy precision, confident heroic posing charged with theatrical grandeur, and a bold, glossy, larger-than-life painterly radiance. Influenced by: Boris Vallejo, airbrush fantasy painting technique, heroic fantasy illustration, classical figure painting.`,
    "Pin-Up": `A charming, playful glamour-illustration style built on smooth, confident linework tracing idealized, curve-forward proportion with cheerful vitality, soft, evenly blended shading giving skin a flattering, luminous glow, a flirtatious, lighthearted posing sensibility charged with cheeky confidence, meticulous attention to graceful gesture and inviting expression, and a nostalgic, wholesome glamour charm that feels playful, warm, and effortlessly appealing. Influenced by: Gil Elvgren, Alberto Vargas, classic American pin-up illustration tradition, mid-century airbrush glamour technique.`,
    "RossDraws Style": `An energetic, glowing painterly illustration style built on bold, confident brushwork radiating vibrant internal luminosity, a dynamic push-and-pull between crisp focal rendering and loose, expressive atmospheric edges, gentle bloom and glow accents scattered across the composition for lively visual rhythm, an upbeat, spontaneous energy carried through confident gestural mark-making, and a warm, charismatic painterly polish that feels enthusiastic, immediate, and effortlessly appealing. Influenced by: RossDraws, painterly digital-illustration technique, glow-driven character-illustration practice, contemporary streaming-artist rendering method.`,
    "Brushwork Emphasis": `painterly aesthetics centered on expressive brush handling, visible mark-making, sophisticated texture variation, dynamic surface energy, and handcrafted visual character, prioritizing artistic gesture and material presence over perfectly smooth rendering while maintaining strong structural cohesion, visual depth, and refined craftsmanship throughout the image, reminiscent of John Singer Sargent and Joaquín Sorolla, inspired by Carnation, Lily, Lily, Rose and Walk on the Beach.`,
    "Carne Griffiths Style": `A delicately fluid mixed-media illustration style built on flowing, ink-and-wash linework that bleeds and drips with organic unpredictability, translucent layered washes that let forms dissolve into loose atmospheric bloom at the edges, fine calligraphic detail threading through the figure like living linework, a hushed, ethereal fragility carried through delicate transparency, and a poetic, painterly looseness where control and chance blend into something dreamlike and organic. Influenced by: Carne Griffiths, ink and tea-wash illustration technique, mixed-media fine art, botanical linework technique.`,
    "Impasto": `A richly physical painting style built on thickly applied pigment that stands proud from the working surface, ridges and peaks of dried medium catching real directional light with sculptural dimensionality, confident, decisive strokes carrying visible weight and texture across the entire composition, dramatic tactile depth replacing smooth blending or flat coverage entirely, and a raw, sculptural painterly intensity that celebrates the physical presence of pigment itself. Influenced by: Vincent van Gogh, Lucian Freud, impasto oil-painting technique, expressive thick-pigment method.`,
    "Airbrush Fantasy": `highly polished fantasy illustration featuring exceptionally smooth gradients, refined atmospheric rendering, soft transitions, luminous depth, meticulous surface treatment, commercial illustration sensibilities, elegant visual flow, and a perfected painterly finish that emphasizes clarity and visual appeal, reminiscent of Boris Vallejo and Chris Achilleos, inspired by Heavy Metal Magazine and classic fantasy paperback cover art.`,
    "3D Render": `A dimensionally precise digital-illustration style built on smooth, volumetric modeling that reads as fully three-dimensional through simulated geometry and light rather than drawn line, meticulously calculated illumination with soft ambient occlusion settling naturally into every contour, polished specular response giving forms convincing physical depth and weight, confident sculptural construction replacing traditional linework entirely, and a technically precise, computer-generated intensity built on simulated physical light behavior. Influenced by: real-time 3D-rendering technique, CGI modeling practice, physically based rendering (PBR) method, contemporary animated-render pipeline.`,
    "Pixar  Animation": `A richly rendered 3D-illustration style built on soft, warm subsurface-scattered lighting that gives skin a believable inner glow, meticulously smooth volumetric modeling balancing appealing, rounded proportion with convincing dimensional weight, gentle, cinematic three-point lighting establishing wholesome, inviting mood within every frame, confident ambient occlusion and soft shadow settling naturally into every contour, and a polished, heartwarming studio-grade animation intensity built for broad, emotionally resonant appeal. Influenced by: Pixar, contemporary 3D-animation rendering technique, subsurface-scattering character-design practice, cinematic three-point lighting method, mainstream feature-animation studio pipeline.`,
    "Cinematic Final Fantasy 3D Render": `A richly cinematic 3D-illustration style built on meticulously detailed volumetric modeling rendered with near-photographic dimensional conviction, dramatic film-grade lighting establishing epic, emotionally charged mood within every frame, soft subsurface-scattered rendering giving skin a convincing, luminous depth, confident ambient occlusion and reflective response settling naturally into every contour, and a polished, blockbuster-grade rendering intensity built for sweeping, story-driven visual spectacle. Influenced by: Square Enix cinematic-rendering direction, real-time 3D-animation technique, subsurface-scattering character-design practice, cinematic three-point lighting method.`,
    "Isometric 3D Graphic": `A compact, dimensionally clever illustration style built on a fixed isometric projection that renders three-dimensional form without true perspective convergence, clean, confidently simplified geometry reduced to its most essential recognizable shapes, flat-to-subtly-gradated shading applied consistently across matching angular faces to reinforce dimensional clarity, a tidy, modular compositional logic designed for small-scale, instantly legible readability, and a polished, contemporary UI-adjacent graphic precision built for consistent iconographic systems. Influenced by: isometric game-art tradition, modern UI/UX iconography practice, flat-design illustration technique, procedural icon-set design method.`,
    "Low Poly": `A geometrically reductive illustration style built on flat-shaded polygonal facets that construct form through angular simplification rather than smooth curvature, crisp hard-edged transitions between adjoining segments standing in for gradual shading, a deliberate faceted minimalism that abstracts detail into confident geometric approximation, a clean, mathematically precise rhythm carried through the visible triangulated structure, and a stylized, modern-craft elegance that celebrates simplified form as its own aesthetic statement. Influenced by: low-poly 3D-modeling technique, geometric abstraction tradition, procedural digital-art practice, minimalist polygonal design method.`,
    "PS1 Graphics": `A low-poly, texture-warped 3D-illustration style built on blocky, vertex-snapped geometry that jitters slightly with characteristic early-3D imprecision, low-resolution textures stretched and distorted across simplified polygonal surfaces, harsh, unfiltered pixelated edges replacing any smooth anti-aliasing, a flat, limited lighting model with minimal gradation or dynamic shadow, and a nostalgic, technically constrained charm rooted in early console-era 3D rendering limitation. Influenced by: mid-1990s PlayStation 3D-rendering technique, early polygonal-game aesthetic, retro survival-horror visual tradition, low-fidelity vertex-jitter rendering method.`,
    "Claymation": `A charmingly tactile stop-motion illustration style built on soft, rounded forms carrying visible handcrafted imperfection, gentle fingerprint-like dents and subtle irregularity standing in for smooth digital finish, warm, even lighting that gives every contour a cozy, dimensional roundness, a slightly rigid, hand-manipulated quality to posing that carries endearing physical charm, and a nostalgic, cheerfully handmade warmth rooted in decades of stop-motion animation craft. Influenced by: Aardman Animations, stop-motion claymation technique, handcrafted figure-animation practice, British character-animation tradition.`,
    "Wallace and Gromit Style": `A charmingly tactile stop-motion illustration style built on soft, rounded forms carrying visible handcrafted imperfection, gentle fingerprint-like dents and subtle irregularity standing in for smooth digital finish, warm, even lighting that gives every contour a cozy, dimensional roundness, exaggerated expressive proportions carrying subtle asymmetry and warm British whimsy, a hand-built, slightly wobbly charm that celebrates its own physical process, and a nostalgic, cheerfully eccentric handmade warmth. Influenced by: Aardman Animations, Nick Park, stop-motion claymation technique, British character-animation tradition.`,
    "Muppets Style": `A charming, handcrafted puppet-illustration style built on soft, felted texture standing in for skin and fur alike, exaggerated, rounded proportions with oversized expressive features driving comedic readability, gentle, even stage-adjacent lighting that keeps the whole scene warmly lit and theatrical, a slightly rigid, hand-operated quality to posing that carries endearing physical charm, and a wholesome, joyfully theatrical warmth rooted in decades of beloved puppet-variety tradition. Influenced by: Jim Henson, Muppet Workshop puppet-fabrication tradition, television-variety-show staging practice, hand-puppet character-design method.`,
    "LEGO Minifigure": `A blocky, modular figure style built on cylindrical joint construction and simplified, interlocking geometric limbs standing in for naturalistic anatomy, a glossy, uniformly smooth plastic-like finish applied consistently across every segment, a distinctive rounded cylindrical head with minimal, printed-style facial simplification, confident, clean separation between individually distinguishable component pieces, and a cheerful, systematized toy-design precision rooted in decades of modular construction-set tradition. Influenced by: LEGO Group product-design tradition, modular construction-toy aesthetic, plastic-injection product-visualization practice, procedural toy-figure rendering method.`,
    "Funko Pop Style": `A stylized, toy-figure illustration style built on an oversized, dominant head-to-body proportion ratio replacing naturalistic anatomy entirely, a glossy, uniformly smooth vinyl-like finish applied across every plane with no visible textural variation, minimal facial detail reduced to simplified dot-eyes and near-featureless expression, a rigid, static posing logic that mimics fixed collectible-figure stance, and a charmingly reductive, mass-collectible commercial polish that feels instantly recognizable and endearingly toy-like. Influenced by: Funko Pop! product-design tradition, vinyl-collectible figure aesthetic, stylized toy-proportion design practice, mass-market collectible-merchandise rendering method.`,
    "Pop Art": `A bold, graphic illustration style built on flat, punchy color fields separated by crisp confident outline, mechanically repeated dot or halftone patterning standing in for naturalistic shading, a deliberately mass-produced, commercial-print aesthetic replacing painterly nuance with graphic clarity, exaggerated expressive framing that borrows from advertising and comic-panel drama, and a bold, ironic, instantly recognizable commercial-culture punch. Influenced by: Roy Lichtenstein, Andy Warhol, Ben-Day dot printing technique, mid-century advertising illustration.`,
    "Variable-Size Ben-Day Dots Illustration": `A bold pop-art printing style built on dot patterning that varies deliberately in scale across the composition, larger dots concentrated where tone deepens and smaller dots thinning out toward lighter passages, constructing gradation entirely through dot-size modulation rather than blended shading, crisp confident outline holding each region with graphic precision, a mechanical, offset-print authenticity carried through deliberate registration texture, and a bold, retro commercial-print energy that feels instantly graphic and unmistakably mid-century. Influenced by: Roy Lichtenstein, variable Ben-Day dot printing technique, silver-age comic printing process, pop-art illustration tradition.`,
    "Contemporary Lithography": `A refined printmaking-inspired illustration style built on flat, confidently limited color layers reminiscent of hand-pulled stone-plate printing, subtle grain and texture mimicking the imperfect registration of traditional lithographic process, clean bold linework holding each color plane with graphic precision, restrained tonal shading achieved through crosshatched or stippled print texture rather than smooth gradients, and a nostalgic yet contemporary print-craft polish that feels tactile, considered, and editorial. Influenced by: Toulouse-Lautrec, modern lithographic-printmaking technique, screenprint illustration practice, editorial print-design method.`,
    "Contemporary Ukiyo-E": `A contemporary reinterpretation of traditional woodblock-print illustration built on flat, confidently bounded shape divisions layered with a cleaner, more graphic digital precision, fluid calligraphic linework retaining the rhythmic economy of the original medium while shedding its period-specific motifs, restrained tonal layering achieved through overlapping flat planes rather than gradation, a poised, contemplative stillness carried through balanced asymmetrical composition, and a refined print-craft elegance updated with a crisp, present-day graphic sensibility. Influenced by: Katsushika Hokusai, contemporary woodblock-inspired digital illustration, modern Japanese graphic design, Edo-period print technique reimagined.`,
    "Woodcut": `A bold, high-contrast printmaking style built on confident, gouged linework that constructs form through carved negative space rather than drawn detail, stark black-and-white division with minimal transitional tone, rough, deliberate edge-texture inherent to the carving process, a rhythmic, hand-pressed graphic clarity favoring bold shape over subtle nuance, and a rustic, timeworn print-craft gravitas rooted in centuries of relief-printing tradition. Influenced by: Albrecht Dürer, Käthe Kollwitz, woodblock relief-printing technique, expressionist print tradition.`,
    "Paper Cutout": `A layered, tactile illustration style built on flat, distinctly bounded shapes stacked with slight offset to suggest physical depth, crisp, clean-edged silhouette construction replacing any drawn linework, subtle drop-shadow separation between overlapping layers giving the composition a handcrafted dimensionality, a confident, graphic simplicity that favors bold shape over rendered detail, and a charming, tangible craft-quality that feels playful, dimensional, and unmistakably paper-built. Influenced by: paper-cutout collage tradition, stop-motion cutout-animation technique, layered-paper illustration practice, handcrafted collage-art method.`,
    "Quilling": `A delicately dimensional illustration style built on tightly coiled and shaped strips assembled into intricate, raised compositions, confident looping and scrolling forms constructing pattern through repeated coiled units rather than drawn line, a rhythmic, handcrafted precision carried through the deliberate arrangement of each individual coil, subtle raised depth and shadow where coiled edges catch light against the recessed ground, and a delicate, meticulous craft intensity rooted in centuries of paper-coiling tradition. Influenced by: traditional paper-quilling craft, filigree decorative-art technique, handcrafted coil-assembly practice, ornamental paper-art method.`,
    "Mosaic Art": `A tessellated illustration style built on countless discrete fragments assembled into a unified composition, each individual piece holding a single flat tone while collectively constructing gradual tonal transition through density and arrangement, confident geometric or organic fragment shapes fitted with deliberate, patient precision, a rhythmic, granular texture replacing any smooth or blended rendering entirely, and a timeless, meticulous craft intensity rooted in centuries of tessellated decorative tradition. Influenced by: Byzantine mosaic tradition, tessellation-based decorative technique, Antoni Gaudí trencadís practice, classical tile-assembly craft method.`,
    "Stained Glass Flat Art": `decorative graphic aesthetics characterized by bold enclosed shapes, segmented composition, strong contour structures, ornamental patterning, and luminous mosaic-inspired design principles. The style builds imagery through interconnected flat regions separated by deliberate leading-like divisions, emphasizing symbolic clarity, visual rhythm, and harmonious decorative balance rather than volumetric realism. Rather than relying on shading or painterly texture, it communicates form through shape relationships, stylized silhouettes, and carefully arranged visual geometry, creating imagery that feels iconic, radiant, and timeless. The resulting aesthetic blends medieval craftsmanship, sacred decorative traditions, and modern graphic simplification into richly symbolic compositions with striking visual presence, reminiscent of Louis Comfort Tiffany and Alphonse Mucha, inspired by Chartres Cathedral stained glass and Tiffany Studios glass panels.`,
    "Marble Sculpture": `A dimensionally commanding sculptural form built on convincing volumetric mass shaped through confident tonal modeling rather than linear description, dramatic raking light that reveals every carved contour and recessed hollow with sculptural clarity, a translucent depth beneath the outermost extent that softens and catches illumination with quiet luminosity, a monumental stillness carried through deliberate, unhurried mass and proportion, and a timeless, classical gravitas that treats carved form itself as the entire subject. Influenced by: Michelangelo, Antonio Canova, classical figurative-sculpture tradition, academic tonal-modeling technique.`,
    "Mixed Media": `A layered, tactile illustration style built on the deliberate collision of disparate techniques — loose ink linework, painterly washes, and collaged textural fragments — coexisting within a single composition, unpredictable textural bleed and torn-edge layering that keeps the whole feeling handmade and accumulated rather than uniform, confident compositional looseness that embraces visible process over polished finish, a rich tactile depth built through overlapping transparency and material contrast, and an expressive, collage-driven intensity that feels spontaneous, layered, and richly textured. Influenced by: mixed-media collage art, Carne Griffiths, ink-and-collage illustration technique, contemporary fine-art assemblage.`,
    "8-Bit Style": `A blocky, pixel-constrained illustration style built on hard, discrete square units standing in for all line and shading, an extremely limited tonal palette-logic forcing every gradient into stepped, visible bands, deliberate geometric simplification that reduces anatomy to its most essential recognizable silhouette, a rigid, grid-locked precision replacing any curved or organic mark-making, and a nostalgic, technically constrained charm that celebrates the aesthetic discipline of early digital-display limitation. Influenced by: early video-game sprite-art tradition, Nintendo Entertainment System graphics technique, pixel-art illustration practice, retro arcade visual-design method.`,
    "Minecraft Style": `A blocky, voxel-constrained illustration style built on hard-edged cubic geometry standing in for all organic and structural form, a deliberately low-resolution texture logic that reduces surface detail to flat, pixelated approximation, rigid right-angle construction replacing curved or naturalistic silhouette entirely, a charmingly crude, procedurally consistent simplicity carried through uniform block-unit scale, and a nostalgic, technically constrained charm rooted in early sandbox-game visual limitation. Influenced by: voxel-based game-design tradition, Markus Persson procedural-generation practice, low-poly/blocky 3D-rendering technique, sandbox-game visual-design method.`,
    "Zelda Wind Waker Style": `A vibrant, toon-shaded illustration style built on crisp, hard-edged cel shading with minimal tonal gradation, confident, thick outline holding clean, geometric silhouette design, warm painterly sky and terrain rendered with soft matte-painted texture, expressive, rounded character proportions carrying whimsical charm, and a bright, adventurous storybook vibrancy that feels playful, timeless, and quietly heroic. Influenced by: Nintendo character-art direction, cel-shaded toon-rendering technique, painterly matte-background practice, whimsical adventure-game illustration method.`,
    "GTA V Polished Cover Art": `A bold, stylized illustration style built on crisp airbrushed rendering with confident graphic outline separating the subject into clean, poster-ready silhouette, saturated high-contrast lighting that punches the subject forward against a dynamic collage-style arrangement, exaggerated attitude-driven posing charged with kinetic swagger, meticulous costume and prop detail rendered with commercial illustration polish, and a slick, larger-than-life pop-culture cover intensity built for instant, iconic recognition. Influenced by: Stephen Bliss, Rockstar Games box-art tradition, contemporary commercial illustration practice, pop-culture collage cover-design method.`,
    "Character Design Illustration": `design-focused illustration aesthetics characterized by strong silhouette language, appealing form construction, clear visual hierarchy, expressive anatomy, refined shape design, and highly readable visual identity, emphasizing memorable presence and cohesive artistic intent through disciplined draftsmanship, polished rendering, and a balance between stylization and realism, reminiscent of Mike Mignola and Craig Mullins, inspired by Arcane and The Art of Overwatch.`,
    "Hyper Synthwave": `A vividly nostalgic digital-aesthetic style built on intense neon glow radiating in sharp, saturated bands, a retro-futuristic grid-logic sense of depth, dramatic backlit silhouette contrast separating form from an electric, pulsing ambiance, dense atmospheric haze scattering luminous color throughout the composition, and a hypnotic, electric nostalgia suspended between 1980s retro-futurism and glowing digital fantasy. Influenced by: synthwave digital-art movement, 1980s retro-futurist visual tradition, neon-grid aesthetic technique, glow-bloom digital-rendering practice.`,
    "Borderlands": `A crisp, flat-shaded rendering style built on hard-edged tonal division that separates each plane of light and shadow into distinct, uniform steps rather than smooth gradation, confident bold outline holding every shape with graphic clarity, minimal color banding replacing any continuous blending, a clean, deliberate simplicity that mimics hand-drawn cel-animation logic within a fully dimensional render, and a punchy, graphic-meets-dimensional intensity that feels stylized, crisp, and instantly readable. Influenced by: cel-shading rendering technique, non-photorealistic 3D-rendering practice, anime-adjacent toon-shader method, stylized game-rendering tradition.`
};

// ---- Short label for display (derived from style name) ----
function getShortLabel(styleName) {
    // Map specific style names to their shorter image labels
    const labelMap = {
        "Anime Style": "ANIME",
        "Ghibli Style": "GHIBLI",
        "70s Anime": "70S ANIME",
        "Chibi Anime": "CHIBI",
        "My Hero Academia Style": "MY HERO ACADEMIA",
        "Granblue Fantasy Pin-Up Style": "GRANBLUE FANTASY",
        "Manga Style": "MANGA",
        "Akira Toriyama Style": "AKIRA TORIYAMA",
        "Chainsaw Man Style": "CHAINSAW MAN",
        "Classic Shojo Illustration": "ROMANCE MANGA",
        "Shindol Style": "SHINDOL",
        "One Piece Style": "ONE PIECE",
        "Cartoon Style": "CARTOON",
        "Steven Universe Style": "STEVEN UNIVERSE",
        "Adventure Time Style": "ADVENTURE TIME",
        "Hanna-Barbera Style": "HANNA BARBERA",
        "Rubber Hose Cartoon": "RUBBER HOSE CARTOON",
        "Disney Ultradetailed Illustration": "DISNEY ULTRADETAILED",
        "Drawing": "DRAWING",
        "Chinese Ink Drawing": "CHINESE INK",
        "Fashion Sketch": "FASHION SKETCH",
        "Technical Drawing": "TECHNICAL DRAWING",
        "Playful Hand-Drawn Illustration": "HAND DRAWN (PLAYFUL)",
        "Very Simplistic Doodle": "SIMPLISTIC DOODLE",
        "Photography": "PHOTOGRAPHY",
        "Analog Photography": "ANALOG PHOTOGRAPHY",
        "Black And White Documentary": "B&W DOCUMENTARY",
        "Brassaï Night Photography": "BRASSAI",
        "Cinematic Photography": "CINEMATIC PHOTOGRAPHY",
        "Selfie Photo": "SELFIE",
        "Comics Style": "COMICS",
        "Alternative Comics Style": "ALTERNATIVE COMICS",
        "Amanda Conner Illustration": "AMANDA CONNER",
        "Hellboy Style": "HELLBOY",
        "Bruce Timm Noir": "BRUCE TIMM",
        "Graphic Novel": "GRAPHIC NOVEL",
        "Design": "DESIGN",
        "Corporate Memphis": "CORPORATE MEMPHIS",
        "Soviet Propaganda Poster": "PROPAGANDA",
        "Graphic Flat-Vector Travel Poster Illustration": "TRAVEL POSTER",
        "Poster Art": "POSTER ART",
        "Contemporary Commercial Illustration": "CONTEMPORARY COMMERCIAL",
        "Painting": "PAINTING",
        "Van Gogh Style": "VAN GOGH",
        "Cubism": "CUBISM",
        "Jackson Pollock Style": "POLLOCK",
        "Academic Precision Realism": "ACADEMIC PRECISION",
        "Wet-on-Wet Watercolor Ink Painting": "WET ON WET",
        "Alex Ross Style": "ALEX ROSS",
        "Artgerm Style": "ARTGERM",
        "Boris Vallejo Style": "BORIS VALLEJO",
        "Pin-Up": "PINUP",
        "American Comic Realism": "AMERICAN COMIC REALISM",
        "RossDraws Style": "ROSSDRAWS",
        "Children's Book Drawing": "CHILDREN BOOK",
        "Vintage Children's Book Drawing": "VINTAGE CHILDREN BOOK",
        "Collector Storybook Illustration": "COLLECTOR STORYBOOK",
        "Bookplate Illustration": "BOOKPLATE",
        "Whimsical Illustration": "WHIMSICAL",
        "Beatrix Potter Style": "BEATRIX POTTER",
        "Character Design Illustration": "CHARACTER DESIGN",
        "Arcane Animation Still": "ARCANE",
        "Caricature": "CARICATURE",
        "Gris Grimly Style": "GRIS GRIMLY",
        "Tim Burton Style": "TIM BURTON",
        "Loose Crosshatched Character Sketch": "CHARACTER SKETCH",
        "Brushwork Emphasis": "BRUSHWORK",
        "Ink Pen Drawing": "INK PEN",
        "Carne Griffiths Style": "CARNE GRIFFITHS",
        "Impasto": "IMPASTO",
        "Crayola Colored-Book Style": "CRAYOLA",
        "Airbrush Fantasy": "AIRBRUSH",
        "Natural Lighting Photography": "NATURAL LIGHTING",
        "Blue Hour Cinema": "BLUE HOUR",
        "Golden Hour Photography": "GOLDEN HOUR",
        "High-Key Lighting Photography": "HIGH-KEY",
        "Direct-Flash Photography": "DIRECT FLASH PHOTO",
        "Neon Photography": "NEON",
        "3D Render": "3D",
        "Pixar  Animation": "PIXAR",
        "Cinematic Final Fantasy 3D Render": "FINAL FANTASY",
        "Isometric 3D Graphic": "ISOMETRIC 3D",
        "Low Poly": "LOW POLY",
        "PS1 Graphics": "PS1",
        "Claymation": "CLAYMATION",
        "Wallace and Gromit Style": "WALLACE & GROMIT",
        "Muppets Style": "MUPPETS",
        "LEGO Minifigure": "LEGO",
        "Funko Pop Style": "FUNKO POP",
        "Pop Art": "POP ART",
        "Variable-Size Ben-Day Dots Illustration": "BENDAY DOTS",
        "Contemporary Lithography": "LITHOGRAPHY",
        "Contemporary Ukiyo-E": "UKIYO-E",
        "Woodcut": "WOODCUT",
        "Etching": "ETCHING",
        "Photoshoot": "PHOTOSHOOT",
        "Instagram Model Glamour Photography": "INSTAGRAM",
        "GQ Photoshoot": "GQ",
        "Supermodel Photoshoot": "SUPERMODEL",
        "Playboy / Maxim-Style Photoshoot": "PLAYBOY",
        "LinkedIn Pro Portrait": "LINKEDIN",
        "Paper Cutout": "PAPER CUTOUT",
        "Quilling": "QUILLING",
        "Mosaic Art": "MOSAIC",
        "Stained Glass Flat Art": "STAINED GLASS",
        "Marble Sculpture": "MARBLE",
        "Mixed Media": "MIXED MEDIA",
        "8-Bit Style": "8-BITS",
        "Minecraft Style": "MINECRAFT",
        "Zelda Wind Waker Style": "ZELDA WIND WAKER",
        "GTA V Polished Cover Art": "GTA V",
        "Toon Shader": "BORDERLANDS",
        "Cel Shading": "CEL SHADING",
        "Film Noir": "FILM NOIR",
        "Hitchcockian Photo": "HITCHCOCKIAN",
        "Sin City Photography": "SIN CITY",
        "Stranger Things-Inspired Art": "STRANGER THINGS",
        "Cyberpunk Photography": "CYBERPUNK PHOTO",
        "Cinematic Tron": "CINEMATIC TRON"
    };
    return labelMap[styleName] || styleName.toUpperCase();
}


// ---- Toast Logic ----
let toastTimeout = null;
let toastFadeTimeout = null;

function showToast(message) {
    const toast = document.getElementById('toast');

    // Clear any existing timeouts
    if (toastTimeout) clearTimeout(toastTimeout);
    if (toastFadeTimeout) clearTimeout(toastFadeTimeout);

    // Reset state
    toast.classList.remove('visible', 'fading');
    toast.textContent = `✓ ${message}`;

    // Force reflow before adding class
    void toast.offsetWidth;

    toast.classList.add('visible');

    // Start fading after 1.8s
    toastTimeout = setTimeout(() => {
        toast.classList.add('fading');
        toastFadeTimeout = setTimeout(() => {
            toast.classList.remove('visible', 'fading');
        }, 400);
    }, 1800);
}


// ---- Copy to Clipboard ----
async function copyToClipboard(text) {
    try {
        await navigator.clipboard.writeText(text);
        return true;
    } catch {
        // Fallback for older browsers
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
// LoRA DATA & GALLERY
// ==============================================

const LORA_DATA = [
    {
        name: "@motocross saito Style",
        file: "@motocross saito Style.webp",
        triggerWords: "@motocross saito, pixel art",
        description: `Trigger words: @motocross saito, pixel art

Civitai link:
https://civitai.red/models/2782223/motocross-saito-style?modelVersionId=3133600`,
        civitaiLink: "https://civitai.red/models/2782223/motocross-saito-style?modelVersionId=3133600"
    },
    {
        name: "Dan Mora Chavez Style",
        file: "Dan Mora Chavez Style.webp",
        triggerWords: "In the style of Dan Mora Chavez",
        description: `Recommended Prompt
Include the trigger naturally at the beginning of your prompt, for example:

In the style of Dan Mora Chavez. A heroic knight standing atop ancient castle ruins at sunrise, flowing cape, intricate armor, cinematic backlighting, dynamic perspective, vibrant colors, crisp linework, highly detailed digital comic illustration.

or

In the style of Dan Mora Chavez. A futuristic superhero soaring above a neon-lit city skyline, dramatic foreshortening, expressive face, bold inks, dynamic action pose, cinematic lighting, polished digital painting.

Style Characteristics
Clean, confident comic-book linework
Dynamic anatomy and expressive poses
Cinematic composition and perspective
Bold lighting with dramatic contrast
Vibrant, saturated color palettes
Detailed costumes, armor, and character designs
Heroic fantasy and superhero aesthetics
Crisp silhouettes and readable forms
Polished digital painting over strong inks
Action-focused visual storytelling

This LoRA excels at fantasy, superheroes, science fiction, original characters, creatures, and action scenes, while also producing striking portraits and highly stylized illustrations with a polished modern comic-book finish.`,
        civitaiLink: "https://civitai.red/models/2793943/dan-mora-chavez-style?modelVersionId=3148918"
    },
    {
        name: "Dark Fantasy Dariusz Kieliszek style",
        file: "Dark Fantasy Dariusz Kieliszek style.webp",
        triggerWords: "Dark fantasy illustrations based on Dariusz Kieliszek fantastic art.",
        description: `Trigger words: Dark fantasy illustrations based on Dariusz Kieliszek fantastic art.`,
        civitaiLink: "https://civitai.red/models/2537062/dark-fantasy-dariusz-kieliszek-style?modelVersionId=3125351"
    },
    {
        name: "Dark Fantasy KREA 2, SDXL",
        file: "Dark Fantasy KREA 2, SDXL.webp",
        triggerWords: "Dark Fantasy Art Style",
        description: `Additional Element Tags:
Muted Colors
Grainy / Grainy Texture
Painterly Texture
Hellish
Doom
Gloomy
Eerie Atmosphere
Haunting Details
Gothic
Macabre
Eldritch
Otherworldly

Example Prompt:
Dark Fantasy Art Style, a painting/drawing/illustration of (your prompt), eerie atmosphere, grainy, painterly texture`,
        civitaiLink: "https://civitai.red/models/1223108/dark-fantasy-or-krea-2-sdxl?modelVersionId=3162242"
    },
    {
        name: "Expressive Euro Cartoon",
        file: "Expressive Euro Cartoon.webp",
        triggerWords: "like comic, 2d, flat color",
        description: `Strength: 1.0 - 1.5.

A bit tricky on Krea2 because of prompt adherence or god knows what:

- If you try to use words that creates realism, you will absolutely need 1.5 strength
- If you try to use known celebrity fanart words with specific styling like Disney Princesses then you will need 1.2+ strength.
- If above two is False then 1.0 is enough in most cases.`,
        civitaiLink: "https://civitai.red/models/2694211/expressive-euro-cartoon?modelVersionId=3133709"
    },
    {
        name: "Frank Cho Comic Book Style",
        file: "Frank Cho Comic Book Style.webp",
        triggerWords: "No trigger words needed.",
        description: `A comic book style LoRA inspired by the artwork of Frank Cho. Best results are usually achieved at strengths between 0.75 and 1.0. No trigger word is required.`,
        civitaiLink: "http://civitai.red/models/2788873/frank-cho-comic-book-style?modelVersionId=3142592"
    },
    {
        name: "IdontknowhowtonamethisArtStyle",
        file: "IdontknowhowtonamethisArtStyle.webp",
        triggerWords: "An angular, 3d art style, with brush stroke color texture",
        description: `Trigger words: An angular, 3d art style, with brush stroke color texture`,
        civitaiLink: "https://civitai.com/models/2781650/idontknowhowtonamethisartstyle"
    },
    {
        name: "Jeff Easley Style - Krea 2",
        file: "Jeff Easley Style - Krea 2.webp",
        triggerWords: "vintage fantasy oil painting in the style of Jeff Easley",
        description: `It perfectly replicates the legendary oil-painting aesthetic famous for Dungeons & Dragons (AD&D) rulebook covers, fierce dragons, gritty heroes, and atmospheric sword-and-sorcery illustrations.

🚀 What's New in V2?
Massive Dataset: 107 high-quality curated images.

⚙️ Training Details & Dataset Info:
Dataset Size: 107 Images (fully captioned and tagged)
Training Resolution: 512 x 512 pixels
Total Training Steps: 3,585 Steps
Total Epochs: 67 Epochs (Batch Size 2 in OneTrainer)

🔧 Recommended Generation Settings:
LoRA Weight: 0.5 - 0.7
Sweetspot: 0.6 (All showcase/example images were generated exactly at 0.6 weight for the perfect balance of style and flexibility!)
CFG Scale: 3.5 - 5.5 (Keep it lower for that authentic, analog hand-painted texture)

📝 Prompting Tips:
To get the absolute best out of this V2, mix the trigger phrase with classic dark fantasy keywords:
oil on canvas, cinematic chiaroscuro, heavy shadows, dramatic lighting, detailed armor, dynamic combat stance, retro fantasy book cover illustration.`,
        civitaiLink: "https://civitai.red/models/2765523/jeff-easley-style-krea-2?modelVersionId=3118577"
    },
    {
        name: "Katsuya Terada style",
        file: "Katsuya Terada style.webp",
        triggerWords: "katsuyak2style, Dynamic, highly detailed pen-and-ink linework with expressive brush strokes, intricate cross-hatching, fluid anatomy, cinematic composition, bold perspective, organic textures, and a fusion of manga-inspired energy with painterly fantasy realism; dramatic lighting, rich visual storytelling, and meticulous handcrafted detail.",
        description: `Trigger words: katsuyak2style, Dynamic, highly detailed pen-and-ink linework with expressive brush strokes, intricate cross-hatching, fluid anatomy, cinematic composition, bold perspective, organic textures, and a fusion of manga-inspired energy with painterly fantasy realism; dramatic lighting, rich visual storytelling, and meticulous handcrafted detail.`,
        civitaiLink: "https://civitai.red/models/2752263/katsuya-terada-style?modelVersionId=3096446"
    },
    {
        name: "Krea 2 Moebius/Jean Giraud LoRA",
        file: "Krea 2 MoebiusJean Giraud LoRA.webp",
        triggerWords: "illustration",
        description: `Trigger words: illustration`,
        civitaiLink: "https://civitai.red/models/2762376/krea-2-moebiusjean-giraud-lora?modelVersionId=3108904"
    },
    {
        name: "Manga style (Naoki Urasawa)",
        file: "Manga style (Naoki Urasawa).webp",
        triggerWords: "No trigger words needed",
        description: `KREA 2
Showcase images:

Turbo model: 10 steps / CFG 1 & Euler simple
944x1408
x2 Hires (10 steps, 0.35 with 4x_NMKD_Siax)
Lora strength 1.3

IDEOGRAM 4
Json caption style with:
art_style: Naoki Urasawa style
medium: manga
aesthetics: black_and_white`,
        civitaiLink: "https://civitai.red/models/690155/manga-style-naoki-urasawa?modelVersionId=3087718"
    },
    {
        name: "Midjourney thick painting style",
        file: "Midjourney\u539A\u6D82\u98CE\u683C  Midjourney thick painting style.webp",
        triggerWords: "MTP_style",
        description: `This is a LoRA model leaning toward impasto oil painting style.

Krea2:
Recommended LoRA weight: 0.95
Recommended sampling steps: 8\u201310
Recommended CFG scale: 1.1
Recommended samplers: er_sde, Euler A`,
        civitaiLink: "https://civitai.red/models/2785232/midjourney-or-midjourney-thick-painting-style?modelVersionId=3138012"
    },
    {
        name: "ogipote\u837Bpote style",
        file: "ogipote\u837Bpote style.webp",
        triggerWords: "Ogipote style",
        description: `Trigger words: Ogipote style`,
        civitaiLink: "https://civitai.red/models/2529695/ogipotepote-style?modelVersionId=3094753"
    },
    {
        name: "Pall Wash - A Versatile Dark Fantasy Anime Style",
        file: "Pall Wash - A Versatile Dark Fantasy Anime Style.webp",
        triggerWords: "pallwash",
        description: `A versatile anime style LoRA with serious range. Confident linework, dramatic lighting, and color that swings from richly saturated to moody and muted depending on what you ask for. (Occult, ritual, and horror-adjacent imagery is where it's most confident and least effort, but it holds up just as well outside that lane: clean portraits, landscapes, dynamic action, multi-character scenes and NSFW).

Trigger must come before quality tags (masterpiece, best quality, etc.), not after. I find that using LESS quality tags = better result. Usually I stick with masterpiece, absurdres and that's it.

Heads up: left to its own devices on a sparse prompt, Pall Wash leans surreal and uncanny. Skulls, glowing eyes, unsettling accents show up even when you didn't ask. Want something cleaner? Be specific in your positive prompt and add a few exclusionary negatives (skull, flames, horror, undead). If you want the weird, it's as easy as hitting run.

Suggested Settings:
DPM++ 2M Karras, or Euler A / Beta 57/Karras (or experiment! It's a matter of preference)
CFG 6\u20136.5, (if using DaSiWa Checkpoints, lower this to 5.0)`,
        civitaiLink: "https://civitai.red/models/2719146/pall-wash-a-versatile-dark-fantasy-anime-style-illanimakrea-2?modelVersionId=3118088"
    },
    {
        name: "Path of Exile 2 style",
        file: "Path of Exile 2 style.webp",
        triggerWords: "poe2k2style",
        description: `Trigger words: poe2k2style`,
        civitaiLink: "https://civitai.red/models/2208918/path-of-exile-2-style?modelVersionId=3099687"
    },
    {
        name: "Rusted Horizons",
        file: "Rusted Horizons.webp",
        triggerWords: "horiz4k",
        description: `Rusted Horizons
Use the version of this LoRA made specifically for your chosen model. LoRA files are not always interchangeable between different model architectures.

What It Does
Rusted Horizons creates a painterly, lived-in science-fiction aesthetic filled with worn spacecraft, dusty settlements, industrial environments, and characters who feel like they are part of a working world rather than posing for a polished promotional image.

The style emphasizes visible brushwork, weathered materials, practical clothing, aged machinery, and cinematic environmental storytelling. Its palette leans toward muted greys, blues, and earthy tones, often contrasted with yellow, amber, or orange accents.

Recommended Prompt Starter
For the best results, try placing this near the beginning of your prompt:
Cinematic narrative concept illustration, painterly semi-realistic editorial art, graphic novel style, visible brushwork,`,
        civitaiLink: "https://civitai.red/models/2344157/rusted-horizons?modelVersionId=3089427"
    },
    {
        name: "YFG Simon St\u00E5lenhag - Things from the Flood",
        file: "YFG Simon St\u00E5lenhag Things from the Flood Flux  Krea.webp",
        triggerWords: "YFG-SimonFlood style",
        description: `Style
Inspired by the visual language of Simon St\u00E5lenhag\u2019s Things from the Flood, this LoRA brings a moody, melancholic, near-future Scandinavian atmosphere to your generations. Expect muted skies, quiet roads, abandoned machinery, eerie suburban or rural environments, and a strong sense of isolation. It works especially well for landscapes, post-apocalyptic scenes, strange technology in everyday settings, and unsettling narrative imagery.

Trigger
Use YFG-SimonFlood style to reinforce the intended style.
The trigger is not strictly required, but it can help strengthen the effect depending on the prompt.

Strength
Tested across a wide range:
0.40 \u2013 0.75 is the recommended range for most prompts
0.65 is a very solid starting point
Good results are possible up to 1.10 with the right prompt
Above that becomes less reliable
Even very low strengths around 0.10 can still leave a visible stylistic influence

Key Characteristics
Moody environmental tone \u2013 overcast skies, wet roads, winter fields, abandoned lots, and quiet urban edges.
Near-future melancholy \u2013 strange machines, eerie structures, and advanced technology placed in otherwise ordinary landscapes.
Cold muted palette \u2013 grays, blue-greens, pale winter light, dirty snow, and subdued industrial colors.
Isolation & unease \u2013 deserted scenes, lone figures, abandoned vehicles, and a quiet apocalyptic feeling.
Dark horror potential \u2013 can also lean into disturbing themes, blood, bloody ooze, and unsettling surreal imagery when prompted.

Prompt Ideas
\u201CA snow-covered suburban road with an abandoned machine in the distance, YFG-SimonFlood style.\u201D
\u201CA lonely figure standing in an overgrown field beside a giant rusted robot, overcast sky, muted winter light.\u201D
\u201CA dystopian urban alley with eerie industrial structures and strange glowing architecture, melancholy Scandinavian atmosphere.\u201D

Tips & Tricks
Works very well with landscapes and infrastructure.
Keep the mood subdued \u2013 terms like overcast, misty, rainy, snow-covered, abandoned, bleak, muted, and desolate help a lot.
Use technology sparingly but meaningfully.
Don\u2019t over-prompt \u2013 a grounded scene description plus the trigger word is often enough.
Best starting point: Try 0.65 strength first, then adjust up or down depending on how dominant you want the atmosphere to be.`,
        civitaiLink: "https://civitai.red/models/1026535/yfg-simon-stalenhag-things-from-the-flood-flux-or-krea?modelVersionId=3139340"
    },
    {
        name: "YOSHITAKA AMANO - Final Fantasy Style",
        file: "YOSHITAKA AMANO - Final Fantasy Style.webp",
        triggerWords: "a watercolor illustration in the style of yoshitaka amano",
        description: `Krea 2 Release 06/27/2026

Suggested strength: 0.8-1.2

Been having fun with Krea 2, it works quite well and knows a lot of characters. If using multiple LoRas, lower strength to .8.

Trigger words: Suggested tags: a watercolor illustration in the style of yoshitaka amano`,
        civitaiLink: "https://civitai.red/models/588789/yoshitaka-amano-final-fantasy-style-for-anima-pony-il-krea-2?modelVersionId=3076044"
    },
    {
        name: "Z3ZZ4 Krea 2",
        file: "Z3ZZ4 Krea 2.webp",
        triggerWords: "No trigger words needed",
        description: `BASE Model: Krea 2 Raw
Recommend using the 5000 version, with the 2000 version as a backup.

Training on ModelsSope

Trigger words: No trigger words needed`,
        civitaiLink: "https://civitai.red/models/2771337/z3zz4-krea-2?modelVersionId=3120222"
    }
];


// ---- Build LoRA Gallery ----
let currentExpandedLora = null;

function buildLoraGallery() {
    const loraGallery = document.getElementById('lora-gallery');

    LORA_DATA.forEach((lora, index) => {
        const card = document.createElement('div');
        card.className = 'lora-card';
        card.id = `lora-card-${index}`;
        card.dataset.loraIndex = index;

        const img = document.createElement('img');
        img.className = 'lora-card-image';
        img.src = `img/loras/${lora.file}`;
        img.alt = lora.name;
        img.loading = 'lazy';
        card.appendChild(img);

        const title = document.createElement('div');
        title.className = 'lora-card-title';
        title.textContent = lora.name;
        title.title = lora.name;
        card.appendChild(title);

        card.addEventListener('click', () => handleLoraCardClick(index));

        loraGallery.appendChild(card);
    });
}

function handleLoraCardClick(index) {
    const loraGallery = document.getElementById('lora-gallery');
    const lora = LORA_DATA[index];
    const card = document.getElementById(`lora-card-${index}`);

    // If clicking the same card that's already expanded, collapse it
    if (currentExpandedLora === index) {
        collapseLoraPanel();
        return;
    }

    // Collapse any existing panel first
    collapseLoraPanel(false);

    // Mark selection state
    currentExpandedLora = index;
    loraGallery.classList.add('has-selection');

    // Remove previous selection
    loraGallery.querySelectorAll('.lora-card.lora-selected').forEach(c => c.classList.remove('lora-selected'));
    card.classList.add('lora-selected');

    // Copy trigger words to clipboard and replace style
    copyToClipboard(lora.triggerWords).then(success => {
        if (success) {
            showToast(`COPIED & APPLIED: ${lora.name}`);
        }
    });
    appendStyleToBuilder(lora.triggerWords);

    // Create the info panel
    const panel = createLoraInfoPanel(lora, index);

    // Find the last card in the same row as the clicked card so no cards in the row shift position
    const allCards = Array.from(loraGallery.querySelectorAll('.lora-card'));
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

function createLoraInfoPanel(lora, index) {
    const panel = document.createElement('div');
    panel.className = 'lora-info-panel';
    panel.id = 'lora-info-panel-active';

    // Header with title and close button
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

    // Description
    const desc = document.createElement('div');
    desc.className = 'lora-info-description';
    desc.textContent = lora.description;
    panel.appendChild(desc);

    // Trigger words section
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

    // Civitai button
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

    // Prevent clicks inside the panel from collapsing it
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
        loraGallery.classList.remove('has-selection');
        loraGallery.querySelectorAll('.lora-card.lora-selected').forEach(c => c.classList.remove('lora-selected'));
    }
}

// ---- Gallery Tab Switching ----
function initGalleryTabs() {
    const tabs = document.querySelectorAll('.gallery-tab');
    const hint = document.getElementById('gallery-hint');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Collapse any open LoRA panel when switching tabs
            collapseLoraPanel(true);

            // Update active tab
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            // Switch panels
            const targetTab = tab.dataset.tab;
            document.querySelectorAll('.gallery-panel').forEach(p => p.classList.remove('active'));

            if (targetTab === 'styles') {
                document.getElementById('gallery').classList.add('active');
                hint.textContent = 'Click any style tag to copy & add to prompt';
            } else {
                document.getElementById('lora-gallery').classList.add('active');
                hint.textContent = 'Click any LoRA to copy trigger words & view details';
            }
        });
    });
}


// ---- Build Gallery ----

function buildGallery() {
    const gallery = document.getElementById('gallery');

    IMAGE_DATA.forEach((imgData, imgIndex) => {
        const card = document.createElement('div');
        card.className = 'image-card';
        card.id = `card-${imgIndex + 1}`;

        // Card header
        const header = document.createElement('div');
        header.className = 'card-header';
        header.innerHTML = `<span>&gt;</span> ${String(imgIndex + 1).padStart(2, '0')} — ${imgData.category}`;
        card.appendChild(header);

        // Image container
        const container = document.createElement('div');
        container.className = 'image-container';

        const img = document.createElement('img');
        img.src = `img/${imgData.file}`;
        img.alt = `${imgData.category} styles`;
        img.loading = 'lazy';
        container.appendChild(img);

        // Click grid overlay
        const grid = document.createElement('div');
        grid.className = 'click-grid';

        imgData.styles.forEach((styleName, cellIndex) => {
            const cell = document.createElement('div');
            cell.className = 'click-cell';
            cell.title = getShortLabel(styleName);

            cell.addEventListener('click', async () => {
                const isAlreadySelected = cell.classList.contains('selected');

                // Clear all selections
                document.querySelectorAll('.click-cell.selected').forEach(c => c.classList.remove('selected'));
                document.querySelectorAll('.image-card.has-selected-cell').forEach(c => c.classList.remove('has-selected-cell'));
                const galleryEl = document.getElementById('gallery');

                if (isAlreadySelected) {
                    // Clicking the same cell again: deselect everything
                    galleryEl.classList.remove('has-selection');
                    return;
                }

                // Mark new selection
                cell.classList.add('selected');
                card.classList.add('has-selected-cell');
                galleryEl.classList.add('has-selection');

                const prompt = STYLE_PROMPTS[styleName];
                if (prompt) {
                    const success = await copyToClipboard(prompt);
                    if (success) {
                        showToast(`COPIED & ADDED: ${getShortLabel(styleName)}`);
                    } else {
                        showToast('COPY FAILED');
                    }
                    appendStyleToBuilder(prompt);
                } else {
                    showToast('PROMPT NOT FOUND');
                }
            });

            grid.appendChild(cell);
        });

        container.appendChild(grid);
        card.appendChild(container);
        gallery.appendChild(card);
    });
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

    // Scroll smoothly to style section
    styleElem.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
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

// ---- Init ----
document.addEventListener('DOMContentLoaded', () => {
    buildGallery();
    buildLoraGallery();
    initGalleryTabs();
    initPromptBuilder();
});
