// ==============================================
// KREA STYLES & PROMPT BUILDER — App Logic
// ==============================================

// ---- Pre-Trained Styles Dataset (197 styles organized by category) ----
const STYLES_DATA = [
    {
        "name": "8-Bit",
        "imageFile": "8-Bit_00001_.jpg",
        "prompt": "A blocky, pixel-constrained illustration style built on hard, discrete square units standing in for all line and shading, an extremely limited tonal palette-logic forcing every gradient into stepped, visible bands, deliberate geometric simplification that reduces anatomy to its most essential recognizable silhouette, a rigid, grid-locked precision replacing any curved or organic mark-making, and a nostalgic, technically constrained charm that celebrates the aesthetic discipline of early digital-display limitation. Influenced by: early video-game sprite-art tradition, Nintendo Entertainment System graphics technique, pixel-art illustration practice, retro arcade visual-design method.",
        "category": "Design"
    },
    {
        "name": "Art Deco Gold Highlights",
        "imageFile": "Art Deco Gold Highlights_00001_.jpg",
        "prompt": "An elegant geometric-illustration style built on crisp, confidently bounded shape divisions arranged with rhythmic, symmetrical precision, sharp radiant linework tracing sunburst and stepped-motif patterning with meticulous graphic discipline, a luminous, reflective sheen concentrated along every decorative edge and contour, a poised, glamorous formality carried through balanced, deliberate composition, and a chic, opulent sophistication that feels streamlined, luxurious, and unmistakably interwar in spirit. Influenced by: Tamara de Lempicka, Art Deco decorative-design tradition, geometric ornamental-illustration technique.",
        "category": "Design"
    },
    {
        "name": "Ashley Wood Illustration",
        "imageFile": "Ashley Wood Illustration_00001_.jpg",
        "prompt": "expressive mixed-media aesthetics combining energetic brushwork, sketch-like spontaneity, painterly abstraction, layered textures, and graphic novel sensibilities, blending raw artistic gesture with sophisticated visual design through atmospheric rendering, controlled chaos, and a distinctly handcrafted appearance that prioritizes mood, emotion, and visual impact over strict realism, reminiscent of Ashley Wood and Bill Sienkiewicz, inspired by World War Robot and Metal Gear Solid concept artwork.",
        "category": "Design"
    },
    {
        "name": "Bauhaus",
        "imageFile": "Bauhaus_00001_.jpg",
        "prompt": "A functionalist geometric illustration style built on stark, primary geometric forms — circles, squares, triangles — arranged with rigorous compositional logic, flat, uniform color regions applied with deliberate, unornamented restraint, a rational, grid-driven structure replacing any decorative or naturalistic impulse, confident economy of form where every element serves clear structural purpose, and a disciplined, timeless modernist clarity rooted in functionalist design philosophy. Influenced by: Wassily Kandinsky, Bauhaus design-movement tradition, functionalist geometric-design technique, modernist constructivist practice.",
        "category": "Design"
    },
    {
        "name": "Bill Sienkiewicz Expressionism",
        "imageFile": "Bill Sienkiewicz Expressionism_00001_.jpg",
        "prompt": "highly experimental illustration aesthetics combining expressive brushwork, mixed-media textures, abstract visual fragmentation, painterly distortion, emotional intensity, and unconventional storytelling techniques, blending fine art sensibilities with graphic narrative through bold mark-making, layered surfaces, and a fearless approach to visual interpretation, reminiscent of Bill Sienkiewicz and Ralph Steadman, inspired by Elektra: Assassin and Stray Toasters.",
        "category": "Design"
    },
    {
        "name": "Blacklight",
        "imageFile": "Blacklight_00001_.jpg",
        "prompt": "A luminous glow-reactive illustration style built on stark contrast between an inert, absorbed base surface and intensely radiant fluorescing accents, an otherworldly internal luminosity that appears to emit rather than reflect, sharp separation between glowing and non-glowing regions with almost no transitional gradation, a surreal, electric intensity charged with nightclub-adjacent energy, and a hypnotic, ultraviolet-reactive vibrancy that feels alive in the dark. Influenced by: blacklight poster art tradition, fluorescent pigment illustration technique, psychedelic 1960s-70s poster design, UV-reactive body-art photography.",
        "category": "Design"
    },
    {
        "name": "Cinematic Final Fantasy 3D Render",
        "imageFile": "Cinematic Final Fantasy 3D Render_00001_.jpg",
        "prompt": "A richly cinematic 3D-illustration style built on meticulously detailed volumetric modeling rendered with near-photographic dimensional conviction, dramatic film-grade lighting establishing epic, emotionally charged mood within every frame, soft subsurface-scattered rendering giving skin a convincing, luminous depth, confident ambient occlusion and reflective response settling naturally into every contour, and a polished, blockbuster-grade rendering intensity built for sweeping, story-driven visual spectacle. Influenced by: Square Enix cinematic-rendering direction, real-time 3D-animation technique, subsurface-scattering character-design practice, cinematic three-point lighting method.",
        "category": "Design"
    },
    {
        "name": "Claymation",
        "imageFile": "Claymation_00001_.jpg",
        "prompt": "A charmingly tactile stop-motion illustration style built on soft, rounded forms carrying visible handcrafted imperfection, gentle fingerprint-like dents and subtle irregularity standing in for smooth digital finish, warm, even lighting that gives every contour a cozy, dimensional roundness, a slightly rigid, hand-manipulated quality to posing that carries endearing physical charm, and a nostalgic, cheerfully handmade warmth rooted in decades of stop-motion animation craft. Influenced by: Aardman Animations, stop-motion claymation technique, handcrafted figure-animation practice, British character-animation tradition.",
        "category": "Design"
    },
    {
        "name": "Collage",
        "imageFile": "Collage_00001_.jpg",
        "prompt": "A layered, tactile illustration style built on the deliberate assembly of disparate fragments arranged into a single unified composition, torn or cleanly cut edges coexisting to create unpredictable, overlapping juxtaposition, a confident compositional looseness that embraces visible seams and assembly rather than hiding them, mixed tonal registers colliding across each fragment for expressive, unexpected contrast, and a raw, handcrafted intensity that treats the act of piecing together itself as the compositional statement. Influenced by: Hannah Höch, Kurt Schwitters, collage-art tradition, mixed-media assemblage practice.",
        "category": "Design"
    },
    {
        "name": "Corporate Memphis",
        "imageFile": "Corporate Memphis_00001_.jpg",
        "prompt": "A flat, rounded illustration style built on simplified, tube-like limbs and gently curved geometric shapes replacing naturalistic anatomy entirely, uniform flat-color fill with minimal to no shading beyond soft contact shadow, a deliberately generic, approachable proportion language designed for broad, inoffensive relatability, clean, uncluttered composition prioritizing instant digital-platform legibility, and a friendly, corporate-tech sincerity that feels streamlined, accessible, and unmistakably contemporary. Influenced by: contemporary flat-illustration movement, tech-industry design-system practice, geometric character-illustration technique, digital-platform brand-illustration method.",
        "category": "Design"
    },
    {
        "name": "Design",
        "imageFile": "Design_00001_.jpg",
        "prompt": "A clean, purposeful graphic-illustration style built on confident, simplified shape construction that prioritizes function and clarity over decorative detail, flat or minimally gradated color application applied with intentional restraint, a balanced, structured compositional logic guided by clear visual hierarchy, deliberate, uncluttered spacing that lets each element read instantly, and a versatile, contemporary graphic-design clarity rooted in modern commercial and digital design convention. Influenced by: modern graphic-design tradition, minimalist design practice, contemporary commercial-design technique, digital-design composition method.",
        "category": "Design"
    },
    {
        "name": "Flat Illustration",
        "imageFile": "Flat Illustration_00001_.jpg",
        "prompt": "A clean, graphic illustration style built on evenly bounded shapes filled with uniform color rather than blended tone, minimal to no shading beyond deliberate, flat contact shadow, confident, simplified linework that reduces form to its most essential silhouette, a crisp, uncluttered compositional clarity favoring instant legibility over dimensional depth, and a contemporary, streamlined graphic sensibility that feels bold, tidy, and effortlessly modern. Influenced by: contemporary flat-design illustration tradition, vector-based graphic technique, minimalist digital-illustration practice, modern editorial flat-color method.",
        "category": "Design"
    },
    {
        "name": "Funko Pop",
        "imageFile": "Funko Pop_00001_.jpg",
        "prompt": "A stylized, toy-figure illustration style built on an oversized, dominant head-to-body proportion ratio replacing naturalistic anatomy entirely, a glossy, uniformly smooth vinyl-like finish applied across every plane with no visible textural variation, minimal facial detail reduced to simplified dot-eyes and near-featureless expression, a rigid, static posing logic that mimics fixed collectible-figure stance, and a charmingly reductive, mass-collectible commercial polish that feels instantly recognizable and endearingly toy-like. Influenced by: Funko Pop! product-design tradition, vinyl-collectible figure aesthetic, stylized toy-proportion design practice, mass-market collectible-merchandise rendering method.",
        "category": "Design"
    },
    {
        "name": "Gradients",
        "imageFile": "Gradients_00001_.jpg",
        "prompt": "A smooth, continuous-tone illustration style built on gradual color transition replacing any hard-edged shading or flat fill, seamless blending across every plane that eliminates visible mark-making entirely, a soft, technically controlled precision governing exactly how one tone dissolves into the next, minimal linework that lets the transition itself define form and depth, and a polished, contemporary digital sleekness that feels smooth, atmospheric, and effortlessly refined.",
        "category": "Design"
    },
    {
        "name": "Graphic Flat-Vector Travel Poster Illustration",
        "imageFile": "Graphic Flat-Vector Travel Poster Illustration_00001_.jpg",
        "prompt": "A bold, hand-cut illustration style built on faceted, angular shape construction that reduces form into confident planar segments rather than smooth gradation, sharp textural crosshatching and scratchy directional mark-making overlaid across otherwise flat color-block regions, a poster-ready graphic clarity balanced against loose, painterly energy at the edges, dramatic sunlit contrast carving crisp separation between illuminated and shadowed planes, and a stylish, contemporary travel-illustration polish that feels equally editorial and hand-crafted. Influenced by: contemporary vector-travel-poster illustration, faceted geometric-painting technique, mid-century advertising illustration tradition, editorial flat-color rendering practice.",
        "category": "Design"
    },
    {
        "name": "Hyper-Stylized Illustration",
        "imageFile": "Hyper-Stylized Illustration_00001_.jpg",
        "prompt": "A boldly exaggerated illustration style built on confident distortion of proportion that pushes form far beyond naturalistic reference, sharp, graphic linework holding dramatically simplified or elongated silhouette with total confidence, flat-to-gradient shading applied with deliberate, controlled boldness rather than subtlety, an assertive, larger-than-life visual rhythm carried through exaggerated posing and composition, and a striking, unapologetically stylized intensity that treats distortion itself as the core creative statement. Influenced by: contemporary stylized character-design tradition, exaggerated-proportion illustration technique, bold graphic-design-adjacent rendering practice, confident stylization-driven concept-art method.",
        "category": "Design"
    },
    {
        "name": "Isometric 3D Graphic",
        "imageFile": "Isometric 3D Graphic_00001_.jpg",
        "prompt": "A compact, dimensionally clever illustration style built on a fixed isometric projection that renders three-dimensional form without true perspective convergence, clean, confidently simplified geometry reduced to its most essential recognizable shapes, flat-to-subtly-gradated shading applied consistently across matching angular faces to reinforce dimensional clarity, a tidy, modular compositional logic designed for small-scale, instantly legible readability, and a polished, contemporary UI-adjacent graphic precision built for consistent iconographic systems. Influenced by: isometric game-art tradition, modern UI/UX iconography practice, flat-design illustration technique, procedural icon-set design method.",
        "category": "Design"
    },
    {
        "name": "LEGO Minifigure",
        "imageFile": "LEGO Minifigure_00001_.jpg",
        "prompt": "A blocky, modular figure style built on cylindrical joint construction and simplified, interlocking geometric limbs standing in for naturalistic anatomy, a glossy, uniformly smooth plastic-like finish applied consistently across every segment, a distinctive rounded cylindrical head with minimal, printed-style facial simplification, confident, clean separation between individually distinguishable component pieces, and a cheerful, systematized toy-design precision rooted in decades of modular construction-set tradition. Influenced by: LEGO Group product-design tradition, modular construction-toy aesthetic, plastic-injection product-visualization practice, procedural toy-figure rendering method.",
        "category": "Design"
    },
    {
        "name": "Low Poly",
        "imageFile": "Low Poly_00001_.jpg",
        "prompt": "A geometrically reductive illustration style built on flat-shaded polygonal facets that construct form through angular simplification rather than smooth curvature, crisp hard-edged transitions between adjoining segments standing in for gradual shading, a deliberate faceted minimalism that abstracts detail into confident geometric approximation, a clean, mathematically precise rhythm carried through the visible triangulated structure, and a stylized, modern-craft elegance that celebrates simplified form as its own aesthetic statement. Influenced by: low-poly 3D-modeling technique, geometric abstraction tradition, procedural digital-art practice, minimalist polygonal design method.",
        "category": "Design"
    },
    {
        "name": "Marble Sculpture",
        "imageFile": "Marble Sculpture_00001_.jpg",
        "prompt": "A dimensionally commanding sculptural form built on convincing volumetric mass shaped through confident tonal modeling rather than linear description, dramatic raking light that reveals every carved contour and recessed hollow with sculptural clarity, a translucent depth beneath the outermost extent that softens and catches illumination with quiet luminosity, a monumental stillness carried through deliberate, unhurried mass and proportion, and a timeless, classical gravitas that treats carved form itself as the entire subject. Influenced by: Michelangelo, Antonio Canova, classical figurative-sculpture tradition, academic tonal-modeling technique.",
        "category": "Design"
    },
    {
        "name": "Minecraft",
        "imageFile": "Minecraft_00001_.jpg",
        "prompt": "A blocky, voxel-constrained illustration style built on hard-edged cubic geometry standing in for all organic and structural form, a deliberately low-resolution texture logic that reduces surface detail to flat, pixelated approximation, rigid right-angle construction replacing curved or naturalistic silhouette entirely, a charmingly crude, procedurally consistent simplicity carried through uniform block-unit scale, and a nostalgic, technically constrained charm rooted in early sandbox-game visual limitation. Influenced by: voxel-based game-design tradition, Markus Persson procedural-generation practice, low-poly/blocky 3D-rendering technique, sandbox-game visual-design method.",
        "category": "Design"
    },
    {
        "name": "Minimalism",
        "imageFile": "Minimalism_00001_.jpg",
        "prompt": "A pared-back illustration style built on radical simplification of form into its most essential shapes, sparse, uncluttered composition that treats empty space as an active compositional element, minimal to no shading beyond deliberate, restrained contrast, confident economy of mark-making that resists any decorative excess, and a quiet, contemplative clarity that finds impact through restraint rather than density. Influenced by: minimalist art-movement tradition, contemporary reductive-illustration technique, geometric-abstraction practice, modernist economy-of-form method.",
        "category": "Design"
    },
    {
        "name": "Movie Digital art",
        "imageFile": "Movie Digital art_00001_.jpg",
        "prompt": "A bold, high-octane action-movie poster illustration style built on dramatic low-angle framing that conveys raw power and momentum, intensely saturated directional lighting carving sharp, aggressive contrast across confident, larger-than-life composition, dynamic diagonal energy suggesting explosive forward motion even in stillness, meticulous photoreal rendering blended with graphic poster-ready boldness, and a bold, adrenaline-charged blockbuster intensity built for instant, high-impact visual spectacle. Influenced by: contemporary action-movie poster-illustration tradition, cinematic key-art rendering technique, high-octane blockbuster marketing practice, dynamic photoreal-composite illustration method.",
        "category": "Design"
    },
    {
        "name": "Muppets",
        "imageFile": "Muppets_00001_.jpg",
        "prompt": "A charming, handcrafted puppet-illustration style built on soft, felted texture standing in for skin and fur alike, exaggerated, rounded proportions with oversized expressive features driving comedic readability, gentle, even stage-adjacent lighting that keeps the whole scene warmly lit and theatrical, a slightly rigid, hand-operated quality to posing that carries endearing physical charm, and a wholesome, joyfully theatrical warmth rooted in decades of beloved puppet-variety tradition. Influenced by: Jim Henson, Muppet Workshop puppet-fabrication tradition, television-variety-show staging practice, hand-puppet character-design method.",
        "category": "Design"
    },
    {
        "name": "Paper Cutout",
        "imageFile": "Paper Cutout_00001_.jpg",
        "prompt": "A layered, tactile illustration style built on flat, distinctly bounded shapes stacked with slight offset to suggest physical depth, crisp, clean-edged silhouette construction replacing any drawn linework, subtle drop-shadow separation between overlapping layers giving the composition a handcrafted dimensionality, a confident, graphic simplicity that favors bold shape over rendered detail, and a charming, tangible craft-quality that feels playful, dimensional, and unmistakably paper-built. Influenced by: paper-cutout collage tradition, stop-motion cutout-animation technique, layered-paper illustration practice, handcrafted collage-art method.",
        "category": "Design"
    },
    {
        "name": "Pop Art",
        "imageFile": "Pop Art_00001_.jpg",
        "prompt": "A bold, graphic illustration style built on flat, punchy color fields separated by crisp confident outline, mechanically repeated dot or halftone patterning standing in for naturalistic shading, a deliberately mass-produced, commercial-print aesthetic replacing painterly nuance with graphic clarity, exaggerated expressive framing that borrows from advertising and comic-panel drama, and a bold, ironic, instantly recognizable commercial-culture punch. Influenced by: Roy Lichtenstein, Andy Warhol, Ben-Day dot printing technique, mid-century advertising illustration.",
        "category": "Design"
    },
    {
        "name": "Poster Art",
        "imageFile": "Poster Art_00001_.jpg",
        "prompt": "A bold, graphic illustration style built on confident, simplified composition designed to communicate instantly at a distance, flat or minimally gradated color application applied with deliberate visual punch, strong compositional hierarchy that guides the eye directly to a single focal statement, meticulous economy of detail favoring immediate readability over exhaustive rendering, and a striking, commercial-grade graphic impact rooted in traditional advertising and print-design practice. Influenced by: mid-century poster-design tradition, commercial advertising-illustration technique, graphic-design composition practice, print-poster illustration method.",
        "category": "Design"
    },
    {
        "name": "PS1 Graphics",
        "imageFile": "PS1 Graphics_00001_.jpg",
        "prompt": "A low-poly, texture-warped 3D-illustration style built on blocky, vertex-snapped geometry that jitters slightly with characteristic early-3D imprecision, low-resolution textures stretched and distorted across simplified polygonal surfaces, harsh, unfiltered pixelated edges replacing any smooth anti-aliasing, a flat, limited lighting model with minimal gradation or dynamic shadow, and a nostalgic, technically constrained charm rooted in early console-era 3D rendering limitation. Influenced by: mid-1990s PlayStation 3D-rendering technique, early polygonal-game aesthetic, retro survival-horror visual tradition, low-fidelity vertex-jitter rendering method.",
        "category": "Design"
    },
    {
        "name": "Soviet Propaganda Poster",
        "imageFile": "Soviet Propaganda Poster_00001_.jpg",
        "prompt": "A bold, graphic illustration style built on stark, high-contrast flat color fields separated by confident heavy outline, a monumental, low-angle compositional heroism that dramatically elevates the central figure, dynamic diagonal energy conveying collective momentum and forward-driving purpose, simplified, sculptural anatomy rendered with poster-ready graphic clarity over naturalistic nuance, and a bold, rousing propagandistic grandeur built for instant ideological impact at a distance. Influenced by: Constructivist poster-design tradition, Alexander Rodchenko, socialist-realist illustration technique, agitprop graphic-design practice.",
        "category": "Design"
    },
    {
        "name": "Stained Glass Flat Art",
        "imageFile": "Stained Glass Flat Art_00001_.jpg",
        "prompt": "decorative graphic aesthetics characterized by bold enclosed shapes, segmented composition, strong contour structures, ornamental patterning, and luminous mosaic-inspired design principles. The style builds imagery through interconnected flat regions separated by deliberate leading-like divisions, emphasizing symbolic clarity, visual rhythm, and harmonious decorative balance rather than volumetric realism. Rather than relying on shading or painterly texture, it communicates form through shape relationships, stylized silhouettes, and carefully arranged visual geometry, creating imagery that feels iconic, radiant, and timeless. The resulting aesthetic blends medieval craftsmanship, sacred decorative traditions, and modern graphic simplification into richly symbolic compositions with striking visual presence, reminiscent of Louis Comfort Tiffany and Alphonse Mucha, inspired by Chartres Cathedral stained glass and Tiffany Studios glass panels.",
        "category": "Design"
    },
    {
        "name": "Toon Shader",
        "imageFile": "Toon Shader_00001_.jpg",
        "prompt": "A crisp, flat-shaded rendering style built on hard-edged tonal division that separates each plane of light and shadow into distinct, uniform steps rather than smooth gradation, confident bold outline holding every shape with graphic clarity, minimal color banding replacing any continuous blending, a clean, deliberate simplicity that mimics hand-drawn cel-animation logic within a fully dimensional render, and a punchy, graphic-meets-dimensional intensity that feels stylized, crisp, and instantly readable. Influenced by: cel-shading rendering technique, non-photorealistic 3D-rendering practice, anime-adjacent toon-shader method, stylized game-rendering tradition.",
        "category": "Design"
    },
    {
        "name": "Variable-Size Ben-Day Dots Illustration",
        "imageFile": "Variable-Size Ben-Day Dots Illustration_00001_.jpg",
        "prompt": "A bold pop-art printing style built on dot patterning that varies deliberately in scale across the composition, larger dots concentrated where tone deepens and smaller dots thinning out toward lighter passages, constructing gradation entirely through dot-size modulation rather than blended shading, crisp confident outline holding each region with graphic precision, a mechanical, offset-print authenticity carried through deliberate registration texture, and a bold, retro commercial-print energy that feels instantly graphic and unmistakably mid-century. Influenced by: Roy Lichtenstein, variable Ben-Day dot printing technique, silver-age comic printing process, pop-art illustration tradition.",
        "category": "Design"
    },
    {
        "name": "Vector Art",
        "imageFile": "Vector Art_00001_.jpg",
        "prompt": "A crisp, scalable illustration style built on clean, mathematically precise linework and evenly bounded color regions, smooth gradient or flat-fill logic replacing any textural or painterly noise entirely, confident geometric simplification of form favoring graphic clarity over naturalistic nuance, razor-sharp edges that hold their precision at any size, and a polished, contemporary graphic-design sleekness rooted in digital illustration practice. Influenced by: contemporary vector-illustration tradition, Adobe Illustrator technique, flat-design graphic practice, digital scalable-artwork method.",
        "category": "Design"
    },
    {
        "name": "Wallace and Gromit",
        "imageFile": "Wallace and Gromit_00001_.jpg",
        "prompt": "A charmingly tactile stop-motion illustration style built on soft, rounded forms carrying visible handcrafted imperfection, gentle fingerprint-like dents and subtle irregularity standing in for smooth digital finish, warm, even lighting that gives every contour a cozy, dimensional roundness, exaggerated expressive proportions carrying subtle asymmetry and warm British whimsy, a hand-built, slightly wobbly charm that celebrates its own physical process, and a nostalgic, cheerfully eccentric handmade warmth. Influenced by: Aardman Animations, Nick Park, stop-motion claymation technique, British character-animation tradition.",
        "category": "Design"
    },
    {
        "name": "X-Ray",
        "imageFile": "X-Ray_00001_.jpg",
        "prompt": "A translucent anatomical rendering style built on layered internal visibility beneath an otherwise solid exterior, soft luminous glow radiating from within rather than reflecting off the outer plane, precise structural linework revealing underlying form with clinical exactness, a stark, high-contrast tonal separation between dense and translucent areas, and an eerie, revelatory clarity that treats the body as both solid and see-through simultaneously. Influenced by: medical radiography technique, scientific illustration tradition, digital x-ray rendering effects, anatomical cross-section illustration.",
        "category": "Design"
    },
    {
        "name": "Adi Granov",
        "imageFile": "Adi Granov_00001_.jpg",
        "prompt": "A sleek, hyper-glossy painted comic-illustration style built on immaculately smooth gradient rendering that eliminates visible brushwork in favor of glassy precision, dramatic directional lighting carving crisp, confident highlight across every contour, meticulously controlled reflective sheen giving every form a polished, high-production finish, a restrained, technically disciplined realism balancing painterly depth with graphic clarity, and a sleek, cinematic comic-cover intensity built for instantly recognizable high-gloss impact. Influenced by: Adi Granov, painted comic-cover illustration tradition, hyper-glossy digital-rendering technique, cinematic character-illustration practice.",
        "category": "Comic and Western Mangas"
    },
    {
        "name": "Alex Ross",
        "imageFile": "Alex Ross_00001_.jpg",
        "prompt": "A monumental, painterly superhero-realism style rendered in traditional gouache and oil technique translated into hyperreal digital polish, richly lit subject with photoreal textures grounded in classical painting light logic, epic, reverent compositions that frame subject like religious or historical icon, warm painterly color harmonies bathing every scene in golden, dignified light, and a grand, mythic gravitas that elevates comic-book imagery into fine-art portraiture. Influenced by: Alex Ross, Norman Rockwell, classical gouache painting technique, Kingdom Come comic art direction.",
        "category": "Comic and Western Mangas"
    },
    {
        "name": "Alternative Comics",
        "imageFile": "Alternative Comics_00001_.jpg",
        "prompt": "A raw, personal illustration style built on deliberately imperfect, loose linework that resists mainstream polish in favor of authentic idiosyncratic mark-making, minimal or improvised shading applied with a sketchbook-like immediacy, unconventional panel logic and compositional looseness that prioritizes voice over convention, a candid, confessional intimacy carried through visibly handmade imperfection, and an independent, unpolished sincerity that feels personal, experimental, and unmistakably auteur-driven. Influenced by: Robert Crumb, underground comix tradition, indie/alternative comics movement, sketchbook-diary illustration practice.",
        "category": "Comic and Western Mangas"
    },
    {
        "name": "American Comic Realism",
        "imageFile": "American Comic Realism_00001_.jpg",
        "prompt": "highly polished comic-book realism emphasizing convincing anatomy, dramatic visual storytelling, cinematic composition, realistic material rendering, strong volumetric lighting, and detailed environmental integration, combining classical illustration discipline with modern entertainment-art sensibilities to create imagery that feels both grounded and iconic, reminiscent of Bryan Hitch and Alex Ross, inspired by The Ultimates and Kingdom Come.",
        "category": "Comic and Western Mangas"
    },
    {
        "name": "American Pulp Illustration",
        "imageFile": "American Pulp Illustration_00001_.jpg",
        "prompt": "bold commercial illustration defined by dramatic storytelling, striking visual impact, confident draftsmanship, dynamic composition, rich painterly rendering, and a heightened sense of adventure and spectacle, combining accessible narrative clarity with highly crafted imagery through vibrant visual energy, polished execution, and iconic genre aesthetics, reminiscent of N.C. Wyeth and Frank McCarthy, inspired by Doc Savage magazine covers and The Shadow pulp illustrations.",
        "category": "Comic and Western Mangas"
    },
    {
        "name": "Bengal Illustration",
        "imageFile": "Bengal Illustration_00001_.jpg",
        "prompt": "vibrant contemporary comic and illustration aesthetics characterized by fluid linework, dynamic visual energy, expressive anatomy, clean graphic readability, sophisticated shape language, and highly polished rendering, balancing stylization and realism through elegant design choices, refined draftsmanship, and cinematic storytelling sensibilities, reminiscent of Bengal and Olivier Vatine, inspired by Naja and Meka.",
        "category": "Comic and Western Mangas"
    },
    {
        "name": "Bold Contour",
        "imageFile": "Bold Contour_00001_.jpg",
        "prompt": "graphic illustration aesthetics defined by strong outline emphasis, confident shape definition, clear visual hierarchy, impactful silhouette design, and highly readable forms, prioritizing visual clarity, structural strength, and compositional presence through disciplined line control, simplified volume construction, and deliberate graphic contrast, reminiscent of Mike Mignola and Frank Miller, inspired by Hellboy and Sin City.",
        "category": "Comic and Western Mangas"
    },
    {
        "name": "Bruce Timm Noir",
        "imageFile": "Bruce Timm Noir_00001_.jpg",
        "prompt": "stylish noir-inspired illustration aesthetics characterized by confident silhouette design, elegant simplification, clean geometric construction, dramatic shadow composition, strong graphic readability, and cinematic visual storytelling, blending classic animation principles with crime-fiction atmosphere through disciplined linework, refined staging, and timeless visual sophistication, reminiscent of Bruce Timm and Darwyn Cooke, inspired by Batman: The Animated Series and DC: The New Frontier.",
        "category": "Comic and Western Mangas"
    },
    {
        "name": "Character Design Illustration",
        "imageFile": "Character Design Illustration_00001_.jpg",
        "prompt": "design-focused illustration aesthetics characterized by strong silhouette language, appealing form construction, clear visual hierarchy, expressive anatomy, refined shape design, and highly readable visual identity, emphasizing memorable presence and cohesive artistic intent through disciplined draftsmanship, polished rendering, and a balance between stylization and realism, reminiscent of Mike Mignola and Craig Mullins, inspired by Arcane and The Art of Overwatch.",
        "category": "Comic and Western Mangas"
    },
    {
        "name": "Comic Européen Prestige",
        "imageFile": "Comic Européen Prestige_00001_.jpg",
        "prompt": "sophisticated European graphic storytelling aesthetics characterized by meticulous draftsmanship, refined linework, atmospheric realism, rich visual detail, and mature narrative sensibilities, blending artistic individuality with exceptional craftsmanship through carefully structured composition, nuanced rendering, immersive worldbuilding, and album-quality presentation, reminiscent of François Schuiten and Enki Bilal, inspired by Les Cités Obscures and La Trilogie Nikopol.",
        "category": "Comic and Western Mangas"
    },
    {
        "name": "Comics",
        "imageFile": "Comics_00001_.jpg",
        "prompt": "A bold, graphic illustration style built on confident inked linework holding clearly defined, dynamic proportions, flat-to-lightly-shaded color fill applied with straightforward panel-ready clarity, dynamic, energetic posing designed for instant visual impact, a punchy, readable simplicity that favors narrative clarity over painterly nuance, and a versatile, accessible graphic-storytelling charm rooted in broad mainstream comic-illustration convention. Influenced by: mainstream American comic-illustration tradition, inked-and-colored panel technique, dynamic action-comic practice, classic comic-book character-design method.",
        "category": "Comic and Western Mangas"
    },
    {
        "name": "Crosshatched Graphic Novel",
        "imageFile": "Crosshatched Graphic Novel_00001_.jpg",
        "prompt": "detailed graphic narrative aesthetics characterized by intricate crosshatching, rich tonal construction, disciplined draftsmanship, atmospheric realism, and handcrafted visual texture, blending traditional ink illustration techniques with mature storytelling through layered line density, strong value structure, refined composition, and immersive narrative depth, reminiscent of Bernie Wrightson and Franklin Booth, inspired by From Hell and The Sandman.",
        "category": "Comic and Western Mangas"
    },
    {
        "name": "DC Comics",
        "imageFile": "DC Comics_00001_.jpg",
        "prompt": "A bold, dynamic mainstream superhero comic-illustration style built on confident heavy inking over powerful, heroic figure work, punchy saturated color-block application with sharp graphic contrast, dramatic action-driven posing and foreshortening designed for kinetic panel-to-panel storytelling, crisp linework balancing classic heroic silhouette with modern rendering polish, and an iconic, larger-than-life heroic gravitas instantly recognizable as classic mainstream American superhero comics. Influenced by: Jim Lee, Neal Adams, DC Comics house style, mainstream superhero-illustration tradition.",
        "category": "Comic and Western Mangas"
    },
    {
        "name": "Enki Bilal-Inspired Comic and Digital Painting",
        "imageFile": "Enki Bilal-Inspired Comic and Digital Painting_00001_.jpg",
        "prompt": "A moody, dystopian illustration style built on desaturated, atmospheric color grading applied through layered painterly glazing over confident linework, richly weathered surface texture giving skin and structure a worn, melancholic gravity, muted directional lighting casting a cold, cinematic pall across every composition, a hushed, brooding stillness charged with quiet political and existential unease, and a meticulous, painterly European bande dessinée gravitas that feels both futuristic and haunted by history. Influenced by: Enki Bilal, French bande dessinée illustration, dystopian science-fiction comic art, painterly graphic-novel technique.",
        "category": "Comic and Western Mangas"
    },
    {
        "name": "Frank Cho",
        "imageFile": "Frank Cho_00001_.jpg",
        "prompt": "A confident, curvaceous comic-illustration style built on smooth, fluid linework that traces form with athletic, idealized grace, clean cel-based shading applied with bold, uncomplicated clarity, a bouncy, dynamic sense of proportion charged with lighthearted charisma, dynamic action-driven posing balanced against playful, appealing character design, and a polished, mainstream comic-illustration vibrancy that feels equal parts adventurous and effortlessly charming. Influenced byy: Frank Cho, mainstream American comic-illustration tradition, cel-shaded character-illustration technique, dynamic adventure-comic practice.",
        "category": "Comic and Western Mangas"
    },
    {
        "name": "Frank Miller",
        "imageFile": "Frank Miller_00001_.jpg",
        "prompt": "A stark, high-contrast graphic-novel illustration style built on bold, confident inking with dramatic, oversized spotted blacks that carve the composition into aggressive light-and-dark extremes, minimal internal detail replaced by sheer graphic silhouette, sharp angular linework rendering violent, kinetic composition with brutal economy, a hardboiled, noir-driven starkness charged with pulp menace, and a bold, unflinching graphic-novel intensity that feels stripped-down, aggressive, and unmistakably iconic. Influenced by: Frank Miller, Sin City graphic-novel tradition, high-contrast noir-comic technique, minimalist spotted-black inking practice.",
        "category": "Comic and Western Mangas"
    },
    {
        "name": "Hellboy",
        "imageFile": "Hellboy_00001_.jpg",
        "prompt": "A gritty, high-contrast comic-illustration style built on bold, confident inking with heavy spotted blacks that carve dramatic graphic shadow across every form, chunky, weighty linework rendering musculature and stonework with sculptural bluntness, muted, moody washes applied loosely beneath stark ink structure, a folkloric, pulp-horror gravitas charged with brooding atmosphere, and a bold, hand-inked graphic-novel intensity that feels ancient, weathered, and unmistakably hand-crafted. Influenced by: Mike Mignola, noir-inspired comic-inking technique, folk-horror illustration tradition, spotted-black ink-rendering method.",
        "category": "Comic and Western Mangas"
    },
    {
        "name": "Marvel Cover Art",
        "imageFile": "Marvel Cover Art_00001_.jpg",
        "prompt": "A striking, poster-worthy superhero illustration style built for maximum newsstand impact, dramatic hero-forward composition with bold dynamic posing thrust toward the viewer, richly rendered digital painting or ink-and-color hybrid technique giving weight and polish beyond interior panel art, saturated high-contrast color palettes anchored by an iconic focal color, dramatic rim lighting and glowing effects framing the central figure against a moody or explosive backdrop, and a bold, hyper-marketable heroic grandeur designed to sell a single unforgettable image. Influenced by: Alex Ross, J. Scott Campbell, Marvel Comics cover art direction, comic-cover painting technique.",
        "category": "Comic and Western Mangas"
    },
    {
        "name": "Milo Manara",
        "imageFile": "Milo Manara_00001_.jpg",
        "prompt": "An elegant, sensuous comic-illustration style built on fluid, confident linework that traces the female form with graceful anatomical precision, delicate fine crosshatching used sparingly to suggest shadow and volume rather than heavy rendering, warm sun-bleached Mediterranean color palettes applied in soft watercolor-like washes, playful, flirtatious poses charged with lighthearted erotic tension, and a refined, painterly European comic-book sensuality that feels classic yet unmistakably illustrated. Influenced by: Milo Manara, Italian fumetti comic art, Mediterranean watercolor illustration, erotic graphic-novel linework.",
        "category": "Comic and Western Mangas"
    },
    {
        "name": "Moebius-Inspired Illustration",
        "imageFile": "Moebius-Inspired Illustration_00001_.jpg",
        "prompt": "A meticulously linear illustration style built on impossibly clean, confident linework that defines every form with fluid precision rather than heavy shading, expansive contemplative compositions that give equal weight to vast open space and intricate surface detail, delicate stippling and fine cross-hatching used sparingly to suggest volume and atmosphere, a serene, otherworldly stillness pervading even the most fantastical scenes, and a meditative, dreamlike clarity where technical mastery and imaginative wonder feel perfectly balanced. Influenced by: Jean \"Mœbius\" Giraud, French bande dessinée illustration, ligne claire technique, science-fantasy comic art.,",
        "category": "Comic and Western Mangas"
    },
    {
        "name": "Psychological Thriller Pulp Digital Painting",
        "imageFile": "Psychological Thriller Pulp Digital Painting_00001_.jpg",
        "prompt": "A moody, high-contrast digital painting style built on pulp-novel cover sensibilities, with dramatic chiaroscuro lighting slicing across the face and figure, saturated noir color grading in deep colors, painterly brushwork that keeps edges slightly loose and expressive rather than photoreal, unsettling tilted or claustrophobic composition hinting at hidden threat or obsession, and a tense, voyeuristic atmosphere charged with paranoia and simmering danger. Influenced by: vintage pulp paperback cover art, Drew Struzan, film-noir movie posters, Gregory Manchess-style narrative illustration.",
        "category": "Comic and Western Mangas"
    },
    {
        "name": "Ryan Benjamin",
        "imageFile": "Ryan Benjamin_00001_.jpg",
        "prompt": "A dynamic, high-detail comic illustration style combining gritty painterly digital rendering with powerful, dramatically foreshortened action poses, richly textured musculature and costume detail rendered with sharp directional lighting and deep contrast shadow, moody desaturated backgrounds punctuated by bold accent lighting, confident heavy inking blended into painted color for a weighty, tactile finish, and an intense, larger-than-life comic-book gravitas built for splash-page impact. Influenced by: Ryan Benjamin, comic art, digital comic painting technique, modern cover illustration.",
        "category": "Comic and Western Mangas"
    },
    {
        "name": "Sakimichan",
        "imageFile": "Sakimichan_00001_.jpg",
        "prompt": "An ultra-polished fan-art illustration style blending photorealistic skin rendering and soft airbrushed shading with idealized anime facial proportions and large luminous eyes, richly saturated skin tones warmed by dramatic rim lighting and soft glowing highlights, meticulously rendered hair with individually defined glossy strands, sensual curve-forward poses. Softened by smooth gradient blending rather than hard cel lines. Influenced by: Sakimichan digital painting airbrush technique.",
        "category": "Comic and Western Mangas"
    },
    {
        "name": "Vintage Comics",
        "imageFile": "Vintage Comics_00001_.jpg",
        "prompt": "A bold, graphic illustration style built on confident inked linework holding clearly defined, dynamic proportions, coarse halftone-dot patterning standing in for smooth shading, a slightly imperfect, offset-print texture giving the whole composition a worn, mass-produced charm, dynamic, energetic posing designed for instant visual impact within a small panel, and a nostalgic, unmistakably golden-age graphic-storytelling sincerity that feels handcrafted, punchy, and timeworn. Influenced by: Golden Age American comic-illustration tradition, halftone offset-printing technique, mid-century pulp-comic practice, classic newsstand comic-book method.",
        "category": "Comic and Western Mangas"
    },
    {
        "name": "Zenescope Illustration",
        "imageFile": "Zenescope Illustration_00001_.jpg",
        "prompt": "polished fantasy-comic aesthetics characterized by premium character-focused rendering, elegant anatomy, contemporary fantasy glamour, cinematic presentation. The style emphasizes visual impact, clarity and a seamless balance between realism and stylization through sophisticated lighting, luxurious material treatment, dynamic composition, and meticulously rendered textures. It prioritizes beauty, readability, and high-end commercial appeal. The visual language merges modern comic-book aesthetics with fantasy art sensibilities, reminiscent of J. Scott Campbell and Elias Chatzoudis, inspired by Grimm Fairy Tales and Wonderland.",
        "category": "Comic and Western Mangas"
    },
    {
        "name": "Boulet Graphic Illustration",
        "imageFile": "Boulet Graphic Illustration_00001_.jpg",
        "prompt": "contemporary graphic storytelling aesthetics characterized by expressive linework, fluid visual rhythm, intelligent simplification, dynamic composition, and a balance between humor, atmosphere, and observational detail, blending sketchbook spontaneity with polished narrative craftsmanship through confident draftsmanship, readable forms, and highly engaging visual communication, reminiscent of Boulet and Lewis Trondheim, inspired by Notes and Donjon.",
        "category": "Sketch and Cartoon"
    },
    {
        "name": "Caricature",
        "imageFile": "Caricature_00001_.jpg",
        "prompt": "A playful exaggeration-driven illustration style built on bold distortion of proportion that amplifies distinctive features for comedic and expressive impact, loose, confident linework capturing likeness through economical, energetic mark-making rather than exhaustive detail, light, quick shading applied to suggest form without slowing the gestural energy, an exuberant, larger-than-life comic timing embedded in every exaggerated feature, and a witty, high-energy sketch-illustration charm that celebrates personality over precision. Influenced by: classic caricature-illustration tradition, quick-sketch portraiture technique, satirical editorial illustration, gestural ink-and-wash caricature.",
        "category": "Sketch and Cartoon"
    },
    {
        "name": "Children's Book Drawing",
        "imageFile": "Children's Book Drawing_00001_.jpg",
        "prompt": "A warm, gentle illustration style built on soft, simplified linework carrying a sincere, approachable charm, delicate flat-to-lightly-shaded color application applied with cheerful, unhurried restraint, rounded, endearing proportions favoring emotional warmth over anatomical precision, generous, uncluttered composition that gives each small detail room to breathe, and a tender, timeless storybook sincerity that feels handmade, comforting, and quietly imaginative. Influenced by: golden-age children's-book illustration tradition, gouache-and-ink storybook technique, gentle character-design practice, whimsical picture-book method.",
        "category": "Sketch and Cartoon"
    },
    {
        "name": "Chinese Ink Drawing",
        "imageFile": "Chinese Ink Drawing_00001_.jpg",
        "prompt": "A meditative, gestural illustration style built on fluid, calligraphic brushwork that captures form through economical, confident strokes rather than exhaustive detail, deliberate negative space treated as an active compositional element carrying as much weight as rendered form, varying ink density achieved through brush pressure and water dilution rather than layered shading, a contemplative, breath-driven rhythm carried through unhurried, deliberate mark-making, and a timeless, philosophical restraint that values suggestion and empty space over exhaustive representation. Influenced by: traditional Chinese shuǐmò (ink-wash) painting tradition, literati brush-painting practice, Xu Beihong ink technique, classical Chinese calligraphy discipline.",
        "category": "Sketch and Cartoon"
    },
    {
        "name": "Classic disney Feature Animation",
        "imageFile": "Classic disney Feature Animation_00001_.jpg",
        "prompt": "A warm, hand-painted animation-illustration style built on rounded, appealing character proportions carrying expressive, exaggerated readability, smooth cel-shaded color application with gentle, naturalistic gradation, meticulous attention to fluid, principle-driven motion even within a single still frame, a nostalgic, wholesome sincerity carried through soft, inviting lighting logic, and a timeless, storybook grandeur rooted in decades of golden-age feature-animation craftsmanship. Influenced by: Disney and Walt Disney, golden-age American feature-animation tradition, classical cel-animation painting technique, expressive character-animation principles, mid-century studio illustration practice.",
        "category": "Sketch and Cartoon"
    },
    {
        "name": "Clean Line Art",
        "imageFile": "Clean Line Art_00001_.jpg",
        "prompt": "refined line-focused aesthetics characterized by crisp contours, exceptional visual clarity, disciplined draftsmanship, controlled line weight, and highly readable form construction, emphasizing precision, elegance, and structural coherence through polished execution, simplified visual noise, and a timeless graphic sensibility that balances sophistication with effortless readability, reminiscent of Hergé and Yves Chaland, inspired by Tintin and Blake et Mortimer.",
        "category": "Sketch and Cartoon"
    },
    {
        "name": "Contemporary Commercial Illustration",
        "imageFile": "Contemporary Commercial Illustration_00001_.jpg",
        "prompt": "A polished, versatile illustration style built on clean, confident linework balanced with smooth digital shading calibrated for broad commercial appeal, bright, approachable lighting logic that keeps every composition legible and inviting, a deliberate, market-tested clarity favoring instant communication over artistic ambiguity, meticulous attention to appealing, on-trend rendering finish, and a professional, versatile illustrative polish rooted in contemporary advertising and editorial practice. Influenced by: contemporary commercial-illustration tradition, advertising-illustration technique, editorial-illustration practice, digital-brand illustration method.",
        "category": "Sketch and Cartoon"
    },
    {
        "name": "Contemporary Lithography",
        "imageFile": "Contemporary Lithography_00001_.jpg",
        "prompt": "A refined printmaking-inspired illustration style built on flat, confidently limited color layers reminiscent of hand-pulled stone-plate printing, subtle grain and texture mimicking the imperfect registration of traditional lithographic process, clean bold linework holding each color plane with graphic precision, restrained tonal shading achieved through crosshatched or stippled print texture rather than smooth gradients, and a nostalgic yet contemporary print-craft polish that feels tactile, considered, and editorial. Influenced by: Toulouse-Lautrec, modern lithographic-printmaking technique, screenprint illustration practice, editorial print-design method.",
        "category": "Sketch and Cartoon"
    },
    {
        "name": "Crayola Colored-Book",
        "imageFile": "Crayola Colored-Book_00001_.jpg",
        "prompt": "A cheerful, deliberately simplified illustration style built on bold, uneven waxy strokes that fill flat shapes with visible, layered texture rather than smooth coverage, thick, confident outline holding basic, uncomplicated forms, minimal shading achieved through pressure variation and layered strokes rather than blending, a charming, imperfect childlike sincerity carried through slightly uneven coloring-within-the-lines application, and a nostalgic, playful simplicity that feels handmade, joyful, and unmistakably crafted by hand. Influenced by: children's coloring-book tradition, wax-crayon illustration technique, elementary art-class practice, simplified line-and-fill illustration method.",
        "category": "Sketch and Cartoon"
    },
    {
        "name": "Disney Ultradetailed Illustration",
        "imageFile": "Disney Ultradetailed Illustration_00001_.jpg",
        "prompt": "premium feature-animation aesthetics characterized by exceptionally refined draftsmanship, expressive form design, sophisticated visual appeal, advanced material rendering, cinematic staging, and meticulous attention to every surface and design element. The style emphasizes clarity, emotional readability, graceful shape language, polished visual storytelling, and a remarkable balance between realism and stylization, combining the charm of classical animation with the fidelity of contemporary digital illustration. Rather than relying on simplified cartoon conventions, it pursues richness, precision, and production-level craftsmanship through nuanced lighting, intricate textures, elegant composition, and highly controlled rendering. The resulting imagery feels aspirational, immersive, and masterfully produced, with every element contributing to a cohesive sense of wonder, artistry, and visual sophistication, reminiscent of Glen Keane and James Baxter, Inspired by Walt Disney.",
        "category": "Sketch and Cartoon"
    },
    {
        "name": "Doodle",
        "imageFile": "Doodle_00001_.jpg",
        "prompt": "A loose, casual illustration style built on quick, unplanned linework that meanders with playful spontaneity rather than deliberate structure, minimal to no shading beyond simple scribbled fill, an unselfconscious, low-stakes energy carried through impulsive, exploratory mark-making, small whimsical details scattered organically without formal composition, and a lighthearted, effortless charm that feels immediate, personal, and free of any polish. Influenced by: margin-doodle sketching tradition, casual ballpoint-pen illustration technique, unstructured gesture-drawing practice, personal notebook-sketch method.",
        "category": "Sketch and Cartoon"
    },
    {
        "name": "Editorial Illustration",
        "imageFile": "Editorial Illustration_00001_.jpg",
        "prompt": "A conceptually driven illustration style built on confident, considered composition designed to communicate a single idea with immediate clarity, restrained shading and color logic that supports rather than overwhelms the central concept, meticulous attention to symbolic or metaphorical visual shorthand, a polished, deadline-tested economy of mark-making that favors clever communication over exhaustive rendering, and a sharp, intelligent illustrative wit rooted in contemporary magazine and publication practice. Influenced by: contemporary editorial-illustration tradition, conceptual magazine-illustration technique, symbolic visual-metaphor practice, publication-illustration method.",
        "category": "Sketch and Cartoon"
    },
    {
        "name": "Expressive Character Illustration",
        "imageFile": "Expressive Character Illustration_00001_.jpg",
        "prompt": "A vividly emotive illustration style built on confident, deliberate linework calibrated to amplify feeling over anatomical precision, exaggerated facial and postural modeling that pushes emotional readability to the forefront of every composition, loose, energetic shading applied to reinforce mood rather than achieve full rendering, a spirited, immediate mark-making quality that keeps the piece feeling alive and reactive, and a spontaneous, character-driven intensity that treats emotional truth as the primary compositional goal. Influenced by: contemporary character-design illustration practice, expressive digital-sketch technique, gesture-driven concept-art tradition, animation-adjacent character-study method.",
        "category": "Sketch and Cartoon"
    },
    {
        "name": "Fashion Sketch",
        "imageFile": "Fashion Sketch_00001_.jpg",
        "prompt": "An elegant, elongated illustration style built on fluid, confident linework stretching proportion into graceful, statuesque exaggeration, minimal, loose shading applied with quick, economical strokes rather than full rendering, a light, airy sense of movement carried through unhurried, gestural mark-making, deliberate emphasis on flowing silhouette and pose over anatomical exactness, and a chic, effortless sketch-illustration elegance that feels immediate, stylish, and quietly sophisticated. Influenced by: fashion-illustration tradition, croquis sketching technique, editorial fashion-sketch practice, elongated figure-drawing method.",
        "category": "Sketch and Cartoon"
    },
    {
        "name": "Gris Grimly",
        "imageFile": "Gris Grimly_00001_.jpg",
        "prompt": "A whimsically macabre illustration style built on gnarled, spindly linework that twists proportion into gothic, storybook exaggeration, scratchy, textured crosshatching layered with unsettling nervous energy, elongated, angular form carrying a darkly comedic fragility, a hushed, eerie theatricality pervading every composition, and a darkly whimsical, gothic-fairytale charm that feels equal parts sinister and playful. Influenced by: Gris Grimly, gothic children's-book illustration tradition, macabre hand-drawn illustration technique, whimsical dark-fantasy character-design practice.",
        "category": "Sketch and Cartoon"
    },
    {
        "name": "Hanna-Barbera",
        "imageFile": "Hanna-Barbera_00001_.jpg",
        "prompt": "A bold, economical flat-cartoon illustration style built on confident, simplified outline holding limited, efficient character design, flat, evenly applied color fill with minimal shading complexity, a charmingly stiff, limited-animation-friendly sense of proportion and pose, cheerful, uncomplicated composition favoring instant readability over rendering nuance, and a nostalgic, mid-century Saturday-morning charm that feels effortlessly bright and universally appealing. Influenced by: Hanna-Barbera Productions, mid-century American limited-animation tradition, flat-color cartoon technique, Saturday-morning cartoon design practice.",
        "category": "Sketch and Cartoon"
    },
    {
        "name": "Hyper-Stylized Digital Painting",
        "imageFile": "Hyper-Stylized Digital Painting_00001_.jpg",
        "prompt": "A boldly exaggerated painterly illustration style built on confident distortion of proportion pushed far beyond naturalistic reference, rich, layered brushwork rendering dramatically simplified or elongated form with total painterly conviction, saturated tonal contrast applied with deliberate, controlled boldness rather than restraint, an assertive, larger-than-life visual rhythm carried through exaggerated posing and dynamic composition, and a striking, unapologetically stylized painterly intensity that treats distortion itself as the core creative statement. Influenced by: contemporary stylized digital-painting tradition, exaggerated-proportion character-illustration technique, bold painterly concept-art practice, confident stylization-driven rendering method.",
        "category": "Sketch and Cartoon"
    },
    {
        "name": "Invader Zim",
        "imageFile": "Invader Zim_00001_.jpg",
        "prompt": "A jagged, angular cartoon-illustration style built on sharply exaggerated, gothic-adjacent proportion with elongated limbs and spiky, unstable silhouette construction, bold, high-contrast shading applied in stark graphic blocks rather than smooth gradation, an unsettling, off-kilter energy carried through asymmetrical, twitchy posing, confident thick outline holding chaotic, exaggerated expression, and a darkly quirky, kinetic cartoon intensity that feels equal parts manic and stylish. Influenced by: Jhonen Vasquez, gothic-adjacent cartoon-design tradition, angular limited-animation technique, early-2000s cult-cartoon practice.",
        "category": "Sketch and Cartoon"
    },
    {
        "name": "Jarek Kubicki",
        "imageFile": "Jarek Kubicki_00001_.jpg",
        "prompt": "A darkly whimsical illustration style built on confident, sketch-like linework carrying gothic-adjacent playfulness, a muted, atmospheric tonal palette balanced against bold, graphic character silhouettes, a slightly unsettling yet endearing character-design sensibility blending humor with quiet unease, meticulous textural mark-making giving surfaces a hand-drawn, tactile roughness, and a distinctive, contemporary illustration voice that feels equally macabre and playful. Influenced by: Jarek Kubicki, contemporary character-illustration tradition, gothic-whimsical illustration technique, hand-drawn textural rendering practice.",
        "category": "Sketch and Cartoon"
    },
    {
        "name": "Loose Crosshatched Character Sketch",
        "imageFile": "Loose Crosshatched Character Sketch_00001_.jpg",
        "prompt": "A lively, unfinished-feeling character-illustration style built on confident, visibly searching linework left intentionally raw rather than cleaned up, dense parallel crosshatching used sparingly to suggest volume and shadow without committing to full rendering, expressive, exaggerated facial modeling that prioritizes emotional intensity over anatomical polish, a loose, energetic looseness at the edges that keeps the whole piece feeling immediate and process-driven, and a spirited, illustrative rawness that reads as equal parts concept sketch and finished character study. Influenced by: contemporary character-design sketch practice, marker-and-pencil illustration technique, expressive digital-sketch rendering method, gesture-driven character-study tradition.",
        "category": "Sketch and Cartoon"
    },
    {
        "name": "Minimalist Line Art",
        "imageFile": "Minimalist Line Art_00001_.jpg",
        "prompt": "A pared-down illustration style built on a single confident, continuous line tracing form with extreme economy, near-total absence of shading or fill beyond the line itself, deliberate restraint that suggests rather than fully describes structure, meticulous control over line weight as the sole carrier of expression and rhythm, and a quiet, contemplative elegance that treats empty space as equally important as the mark itself. Influenced by: Pablo Picasso's single-line drawings, contemporary minimalist illustration tradition, continuous-line drawing technique, modern editorial line-art practice.",
        "category": "Sketch and Cartoon"
    },
    {
        "name": "Modern Cartoon",
        "imageFile": "Modern Cartoon_00001_.jpg",
        "prompt": "A clean, flat illustration style built on confident, simplified outline holding contemporary, streamlined proportions, bright flat-color fill with minimal shading beyond basic form-defining contact shadow, an appealing, geometrically simplified sense of form balancing charm with graphic efficiency, cheerful, uncomplicated composition favoring instant digital-platform readability, and a versatile, contemporary animated charm rooted in current streaming-era cartoon convention. Influenced by: contemporary streaming-animation tradition, flat-color character-design technique, digital-native cartoon practice, modern indie-animation method.",
        "category": "Sketch and Cartoon"
    },
    {
        "name": "Nickelodeon Animation",
        "imageFile": "Nickelodeon Animation_00001_.jpg",
        "prompt": "A bold, energetic flat-cartoon illustration style built on thick, confident outline holding exaggerated, rubbery proportions, bright, evenly saturated flat-color fill with minimal shading complexity, a loose, elastic sense of squash-and-stretch built directly into character design, expressive, oversized facial features prioritizing comedic timing over anatomical accuracy, and a irreverent, kid-friendly energy that feels loud, playful, and unmistakably 90s-cartoon in spirit. Influenced by: classic 90s Nickelodeon cel-animation tradition, flat-color character-design technique, squash-and-stretch animation practice, irreverent kids'-cartoon design method.",
        "category": "Sketch and Cartoon"
    },
    {
        "name": "Pixar  Animation",
        "imageFile": "Pixar  Animation_00001_.jpg",
        "prompt": "A richly rendered 3D-illustration style built on soft, warm subsurface-scattered lighting that gives skin a believable inner glow, meticulously smooth volumetric modeling balancing appealing, rounded proportion with convincing dimensional weight, gentle, cinematic three-point lighting establishing wholesome, inviting mood within every frame, confident ambient occlusion and soft shadow settling naturally into every contour, and a polished, heartwarming studio-grade animation intensity built for broad, emotionally resonant appeal. Influenced by: Pixar, contemporary 3D-animation rendering technique, subsurface-scattering character-design practice, cinematic three-point lighting method, mainstream feature-animation studio pipeline.",
        "category": "Sketch and Cartoon"
    },
    {
        "name": "Playful Hand-Drawn Illustration",
        "imageFile": "Playful Hand-Drawn Illustration_00001_.jpg",
        "prompt": "A loose, charming illustration style with visibly hand-inked or hand-painted linework that keeps a warm, imperfect human touch, bouncy exaggerated proportions and expressive gesture-driven poses, bright cheerful color palettes applied in flat or lightly textured washes, whimsical small details and doodle-like embellishments scattered through the composition, and a lighthearted, storybook charm that feels immediate, joyful, and unpolished in the best way. Influenced by: Quentin Blake, children's picture-book illustration, gouache and watercolor sketching, modern editorial doodle art.",
        "category": "Sketch and Cartoon"
    },
    {
        "name": "Rick and Morty",
        "imageFile": "Rick and Morty_00001_.jpg",
        "prompt": "A loose, deliberately imperfect cartoon illustration style built on wobbly, slightly rubbery linework that embraces visible inconsistency over polished precision, flat, simple fill with minimal rendering complexity, exaggerated elastic proportions carrying manic, unpredictable expressiveness, a scrappy, DIY animation looseness that favors comedic energy over visual refinement, and an irreverent, chaotic indie-animation charm that feels intentionally rough around the edges. Influenced by: Justin Roiland, adult-swim animation tradition, flat cel-shading technique, indie sitcom-cartoon character design.",
        "category": "Sketch and Cartoon"
    },
    {
        "name": "RossDraws",
        "imageFile": "RossDraws_00001_.jpg",
        "prompt": "An energetic, glowing painterly illustration style built on bold, confident brushwork radiating vibrant internal luminosity, a dynamic push-and-pull between crisp focal rendering and loose, expressive atmospheric edges, gentle bloom and glow accents scattered across the composition for lively visual rhythm, an upbeat, spontaneous energy carried through confident gestural mark-making, and a warm, charismatic painterly polish that feels enthusiastic, immediate, and effortlessly appealing. Influenced by: RossDraws, painterly digital-illustration technique, glow-driven character-illustration practice, contemporary streaming-artist rendering method.",
        "category": "Sketch and Cartoon"
    },
    {
        "name": "Rubber Hose Cartoon",
        "imageFile": "Rubber Hose Cartoon_00001_.jpg",
        "prompt": "A bouncy, elastic illustration style built on limbs and forms constructed as smooth, tubular curves entirely free of joints or rigid structure, confident thick, uniform outline holding simplified, exaggerated proportions, flat, minimal shading applied with cheerful graphic simplicity, a springy, perpetually-in-motion sense of pose even in stillness, and a nostalgic, early-animation charm that feels playful, fluid, and unmistakably vintage. Influenced by: 1920s-30s American cel-animation tradition, Fleischer Studios technique, rubber-hose character-design practice, early Disney/Warner Bros animation method.",
        "category": "Sketch and Cartoon"
    },
    {
        "name": "Simpsons",
        "imageFile": "Simpsons_00001_.jpg",
        "prompt": "A bold, flat cartoon illustration style built on thick confident outline holding simplified exaggerated proportions, bright even flat fill with minimal shading or gradient, an overbite-heavy, wide-eyed character-design language prioritizing instant graphic readability, loose, bouncy proportion distortion for comedic expressiveness, and a cheerful, satirical, unmistakably mass-market animated-sitcom energy. Influenced by: Matt Groening, classic American cel-animation technique, flat-color sitcom cartoon tradition, satirical animated character design.",
        "category": "Sketch and Cartoon"
    },
    {
        "name": "Sketch",
        "imageFile": "Sketch_00001_.jpg",
        "prompt": "A raw, immediate illustration style built on loose, gestural linework that captures form through confident, economical mark-making rather than exhaustive rendering, visible construction lines and searching strokes left intentionally unresolved, minimal tonal shading achieved through quick cross-hatching or light smudging rather than smooth gradation, an energetic sense of spontaneity and unfinished momentum carried through every line, and a raw, honest immediacy that values gesture and observation over polish. Influenced by: life-drawing sketch tradition, charcoal and graphite illustration technique, quick-study figure drawing, academic atelier sketching method.",
        "category": "Sketch and Cartoon"
    },
    {
        "name": "Steven Universe",
        "imageFile": "Steven Universe_00001_.jpg",
        "prompt": "A soft, rounded flat-cartoon illustration style built on gentle, simplified geometric shapes carrying warm, approachable proportion, even flat-color fill applied with minimal shading beyond soft contact shadow, a pastel-adjacent restraint in tonal contrast that keeps every composition feeling calm and gentle, expressive, oversized eyes and rounded facial design prioritizing emotional warmth over detail, and a wholesome, tender animated sincerity that feels comforting, gentle, and quietly heartfelt. Influenced by: Rebecca Sugar, Cartoon Network flat-color animation tradition, gentle geometric character-design technique, contemporary emotionally-driven cartoon practice.",
        "category": "Sketch and Cartoon"
    },
    {
        "name": "Tim Burton",
        "imageFile": "Tim Burton_00001_.jpg",
        "prompt": "A whimsically macabre illustration style built on elongated, spindly proportions and exaggerated angular gauntness, high-contrast graphic shading that carves gothic drama from stark light-and-dark simplicity, swirling, hand-drawn linework carrying a nervous, sketchy energy, wide hollow eyes rendered with melancholic, storybook expressiveness, and a darkly whimsical, gothic-fairytale charm that feels equal parts eerie and endearing. Influenced by: Tim Burton, gothic stop-motion animation design, whimsical macabre illustration, hand-drawn concept-art sketch technique.",
        "category": "Sketch and Cartoon"
    },
    {
        "name": "Very Simplistic Doodle",
        "imageFile": "Very Simplistic Doodle_00001_.jpg",
        "prompt": "A radically minimal illustration style built on the barest possible linework needed to suggest form, no shading whatsoever beyond an occasional flat scribble, a childlike, unpracticed economy of gesture that favors instant recognizability over any accuracy, loose, wobbly strokes drawn with no correction or refinement, and a charmingly crude, effortless simplicity that feels spontaneous, playful, and completely unpolished. Influenced by: margin-doodle sketching tradition, casual ballpoint-pen technique, unstructured gesture-drawing practice, minimalist notebook-sketch method.",
        "category": "Sketch and Cartoon"
    },
    {
        "name": "Vintage Children's Book Drawing",
        "imageFile": "Vintage Children's Book Drawing_00001_.jpg",
        "prompt": "A gentle, nostalgic illustration style built on soft, hand-inked linework carrying old-world sincerity and charm, delicate watercolor-adjacent washes applied with unhurried, muted restraint, rounded, endearing proportions favoring warmth and whimsy over anatomical precision, a hushed, timeworn tenderness carried through generous, uncluttered composition, and a wistful, storybook nostalgia that feels handmade, cherished, and quietly magical. Influenced by: mid-century golden-age children's-book illustration tradition, gouache-and-watercolor storybook technique, classic picture-book character-design practice, vintage print-illustration method.",
        "category": "Sketch and Cartoon"
    },
    {
        "name": "Whimsical Illustration",
        "imageFile": "Whimsical Illustration_00001_.jpg",
        "prompt": "A lighthearted, charming illustration style built on soft, bouncy proportion that stretches form into playful, exaggerated shapes, gentle, evenly balanced shading applied with cheerful simplicity rather than dramatic contrast, a storybook sincerity carried through rounded, approachable linework, delicate small details scattered throughout the composition to reward closer looking, and a joyful, effortless charm that feels handmade, tender, and universally endearing. Influenced by: contemporary children's-book illustration tradition, gouache-and-ink whimsical technique, gentle character-design practice, storybook illustration method.",
        "category": "Sketch and Cartoon"
    },
    {
        "name": "Zelda Wind Waker",
        "imageFile": "Zelda Wind Waker_00001_.jpg",
        "prompt": "A vibrant, toon-shaded illustration style built on crisp, hard-edged cel shading with minimal tonal gradation, confident, thick outline holding clean, geometric silhouette design, warm painterly sky and terrain rendered with soft matte-painted texture, expressive, rounded character proportions carrying whimsical charm, and a bright, adventurous storybook vibrancy that feels playful, timeless, and quietly heroic.Influenced by: Nintendo character-art direction, cel-shaded toon-rendering technique, painterly matte-background practice, whimsical adventure-game illustration method.",
        "category": "Sketch and Cartoon"
    },
    {
        "name": "70s Anime",
        "imageFile": "70s Anime_00001_.jpg",
        "prompt": "vintage Japanese animation aesthetics characterized by bold graphic draftsmanship, angular yet elegant character construction, expressive hand-drawn linework, simplified cel-painted rendering, dramatic visual staging, and a strong sense of romantic adventure. The style favors iconic silhouettes, emotional intensity, mechanical precision, and cinematic composition over contemporary polish, embracing the charm of traditional animation techniques, visible artistic craftsmanship, and classic storytelling sensibilities. Its visual identity balances dynamism, sincerity, and retro-futurist imagination, reminiscent of Leiji Matsumoto and Yoshikazu Yasuhiko, inspired by Space Battleship Yamato and Mobile Suit Gundam.",
        "category": "Anime and Manga"
    },
    {
        "name": "Akira Style",
        "imageFile": "Akira Style_00001_.jpg",
        "prompt": "A meticulously detailed retro-futurist anime illustration style built on dense, precise linework rendering technology and urban decay with obsessive mechanical accuracy, flat cel-shaded color fields laid beneath sharp confident outline, dramatic neon and shadow contrast that carves gritty cyberpunk atmosphere across every surface, kinetic motion conveyed through bold speed-line dynamism, and a gritty, dystopian animation gravitas that feels both hand-crafted and technologically obsessive. Influenced by: Katsuhiro Otomo, 1980s cel-animation technique, cyberpunk anime tradition, retro-futurist manga illustration.",
        "category": "Anime and Manga"
    },
    {
        "name": "Akira Toriyama",
        "imageFile": "Akira Toriyama_00001_.jpg",
        "prompt": "clean and highly readable linework, appealing character-focused design language, expressive forms, dynamic silhouettes, polished cel-style rendering, balanced stylization, energetic visual storytelling, strong graphic clarity, and a playful yet technically disciplined aesthetic that emphasizes personality and visual impact, reminiscent of Akira Toriyama and Toyotarou, inspired by Dragon Ball and Chrono Trigger.",
        "category": "Anime and Manga"
    },
    {
        "name": "Anime Illustration",
        "imageFile": "Anime Illustration_00001_.jpg",
        "prompt": "polished anime-inspired artwork featuring clean linework, expressive design language, refined cel-shading, controlled stylization, appealing visual clarity, carefully structured forms, and high-quality rendering that balances readability with emotional impact, emphasizing professional animation aesthetics and contemporary illustration craftsmanship, reminiscent of Yoshiyuki Sadamoto and Shingo Abe, inspired by Neon Genesis Evangelion and Your Name.",
        "category": "Anime and Manga"
    },
    {
        "name": "Anime Key Visual",
        "imageFile": "Anime Key Visual_00001_.jpg",
        "prompt": "A polished, high-production anime-illustration style built on crisp, confident linework merged with meticulously blended cel-to-gradient shading, dramatic promotional-grade lighting establishing bold mood within a single striking composition, richly detailed costume and character rendering balanced against clean, poster-ready silhouette clarity, dynamic yet composed posing calibrated for maximum visual impact at a glance, and a polished, franchise-defining illustration intensity built for instant recognition and promotional impact. Influenced by: contemporary anime-production key-visual tradition, promotional illustration technique, franchise-defining character-art practice, high-production anime-studio rendering method.",
        "category": "Anime and Manga"
    },
    {
        "name": "Anime Style",
        "imageFile": "Anime Style_00001_.jpg",
        "prompt": "A clean, expressive illustration style built on confident, simplified linework defining stylized, appealing proportions, flat-to-cel-based shading applied with straightforward graphic clarity, large expressive eyes carrying the primary emotional weight of the design, a bright, approachable simplicity that favors instant readability over rendering complexity, and a versatile, universally recognizable animated charm rooted in broad contemporary Japanese animation convention. Influenced by: contemporary anime illustration tradition, cel-shaded character-design technique, Japanese animation studio practice, mainstream manga-adaptation method.",
        "category": "Anime and Manga"
    },
    {
        "name": "Arcane Animation Still",
        "imageFile": "Arcane Animation Still_00001_.jpg",
        "prompt": "A richly painterly animated-illustration style built on visible, confident brushstroke texture layered directly into rendering rather than smoothed away, dramatic chiaroscuro lighting that carves bold graphic shadow across stylized angular form, a fusion of hand-painted textural depth with clean animation-ready linework, moody atmospheric tonal harmony charged with cinematic tension, and a bold, painterly-meets-graphic animation intensity that feels both illustrated and alive. Influenced by: Fortiche Production, League of Legends concept-art tradition, painterly animation technique, cinematic stylized character-design practice.",
        "category": "Anime and Manga"
    },
    {
        "name": "Atsushi Ohkubo",
        "imageFile": "Atsushi Ohkubo_00001_.jpg",
        "prompt": "bold graphic aesthetics characterized by sharp silhouette design, dynamic linework, stylized anatomy, exaggerated visual rhythm, striking contrast, and highly recognizable shape language, blending manga expressiveness with contemporary illustration sensibilities through energetic compositions, refined ink work, and a distinctive balance between elegance and intensity, reminiscent of Atsushi Ohkubo and Tite Kubo, inspired by Soul Eater and Fire Force.",
        "category": "Anime and Manga"
    },
    {
        "name": "Attack on Titan",
        "imageFile": "Attack on Titan_00001_.jpg",
        "prompt": "A gritty, high-tension manga-anime illustration style built on dense, realistic linework rendering musculature and gear with mechanical precision, dramatic dark shading and heavy cross-hatched texture that carves grim, intensity into every surface, dynamic extreme-perspective framing charged with kinetic urgency and scale, desaturated tonal harmony broken by stark high-contrast lighting in moments of violence or dread, and a grim, visceral action-illustration gravitas suffused with existential tension. Influenced by: Hajime Isayama, dark shōnen manga tradition, cel-shaded action-anime technique, gritty military-fantasy illustration.",
        "category": "Anime and Manga"
    },
    {
        "name": "Berserk Manga",
        "imageFile": "Berserk Manga_00001_.jpg",
        "prompt": "monumental dark fantasy manga aesthetics characterized by obsessive crosshatched detail, rugged textural density, dramatic black-and-white value structure, intricate ornamental craftsmanship, and an overwhelming sense of weight, scale, and historical depth. The style emphasizes brutal realism, weathered material rendering, architectural complexity, and emotionally intense visual storytelling, constructing imagery through countless layers of inked detail and highly disciplined draftsmanship. Rather than stylized simplification, it pursues visual immersion through realism, atmosphere, and relentless craftsmanship, creating artwork that feels ancient, tragic, and profoundly human. The visual language balances violence and beauty, grandeur and decay, with extraordinary attention to texture, structure, and narrative gravitas, reminiscent of Kentaro Miura and Hal Foster, inspired by Berserk and Prince Valiant.",
        "category": "Anime and Manga"
    },
    {
        "name": "Boichi",
        "imageFile": "Boichi_00001_.jpg",
        "prompt": "A meticulously rendered manga-illustration style built on dense, hyper-precise linework that treats anatomy and mechanical detail with equal obsessive accuracy, dramatic high-contrast shading that carves powerful, sculptural form through confident cross-hatched shadow, a technically disciplined realism balancing muscular anatomical grounding with dynamic, kinetic posing, meticulous attention to material and structural logic rewarding close inspection, and a bold, technically virtuosic manga intensity that feels equal parts scientific precision and explosive physicality. Influenced by: Boichi, Dr. Stone manga art tradition, hyper-detailed manga illustration technique, technical-precision character-design practice.",
        "category": "Anime and Manga"
    },
    {
        "name": "Castlevania Concept Art",
        "imageFile": "Castlevania Concept Art_00001_.jpg",
        "prompt": "A dark gothic fantasy concept-art style rendered with painterly digital linework and moody, desaturated color palettes, gothic vibes rendered in dramatic vertical perspective, richly textured surfaces, atmospheric fog and shadow pooling around sharply lit focal points, romantic horror atmosphere blending anime-influenced character design with Western dark-fantasy illustration. Influenced by: Castlevania (Netflix/Powerhouse Animation), Ayami Kojima, gothic horror illustration, dark fantasy concept art.",
        "category": "Anime and Manga"
    },
    {
        "name": "Chainsaw Man",
        "imageFile": "Chainsaw Man_00001_.jpg",
        "prompt": "A raw, gritty manga-illustration style built on loose, aggressive linework carrying deliberately unpolished, visceral energy, stark high-contrast shading that swallows much of the composition in engulfing shadow , a chaotic, kinetic sense of motion charged with unpredictable, feral intensity, meticulous grotesque body-horror rendering balanced against darkly comedic character design, and a raw, unflinching contemporary shōnen edge that feels equal parts brutal and irreverently funny. Influenced by: Tatsuki Fujimoto, contemporary dark-shōnen manga tradition, raw ink-heavy illustration technique, body-horror action-manga practice.",
        "category": "Anime and Manga"
    },
    {
        "name": "Chibi Anime",
        "imageFile": "Chibi Anime_00001_.jpg",
        "prompt": "A super-deformed illustration style built on drastically compressed proportion where the head dominates a tiny, simplified body, minimal, rounded linework carrying maximum cuteness with minimal detail, flat-to-cel-based shading applied with cheerful simplicity, oversized expressive eyes and features exaggerated for instant emotional charm, and an endearing, playful miniature intensity that feels irresistibly cute and effortlessly lighthearted. Influenced by: chibi/super-deformed anime tradition, kawaii character-design technique, gag-manga illustration practice, cute-culture Japanese comic method.",
        "category": "Anime and Manga"
    },
    {
        "name": "Cinematic Anime",
        "imageFile": "Cinematic Anime_00001_.jpg",
        "prompt": "premium animation aesthetics characterized by refined linework, sophisticated lighting design, cinematic composition, nuanced atmospheric depth, polished rendering, and emotionally driven visual storytelling, blending the clarity of high-end anime production with filmic realism through controlled detail, expressive staging, and exceptional artistic cohesion, reminiscent of Makoto Shinkai and Yoshiyuki Sadamoto, inspired by Your Name and Evangelion: 3.0+1.0 Thrice Upon a Time.",
        "category": "Anime and Manga"
    },
    {
        "name": "Cyberpunk",
        "imageFile": "Cyberpunk_00001_.jpg",
        "prompt": "Edgerunners: A frenetic, high-contrast animation illustration style built on jagged, aggressive linework that fractures form into sharp angular fragments during moments of intensity, saturated glow-drenched lighting that bleeds and blooms aggressively around every luminous edge, gritty textural noise layered beneath clean cel-shaded color to keep the surface feeling raw and lived-in, dynamic, chaotic framing charged with kinetic violence and manic energy, and a visceral, dystopian animation intensity that feels equal parts stylish and feral. Influenced by: Studio Trigger animation technique, cyberpunk anime tradition, glow-bloom digital compositing practice, gritty dystopian character-design method.",
        "category": "Anime and Manga"
    },
    {
        "name": "Death Note",
        "imageFile": "Death Note_00001_.jpg",
        "prompt": "A dark, meticulously detailed manga-illustration style built on dense, precise linework rendering both anatomy and psychological tension with obsessive control, dramatic high-contrast shading that carves stark, engulfing shadow across brooding, angular composition, a restrained, cerebral intensity conveyed through sharp facial modeling and calculated posing, richly rendered fine detail balanced against vast negative space charged with unspoken menace, and a somber, suspenseful gravitas that feels equal parts psychological thriller and gothic elegance. Influenced by: Takeshi Obata, dark shōnen-manga illustration tradition, high-contrast cel-shaded technique, psychological-thriller manga practice.",
        "category": "Anime and Manga"
    },
    {
        "name": "Euromanga Style",
        "imageFile": "Euromanga Style_00001_.jpg",
        "prompt": "A hybrid illustration style built on Japanese manga-derived clean linework merged with European bande-dessinée compositional discipline, cel-based shading softened by more naturalistic tonal transition than typical manga convention, anatomically grounded proportions carrying a slightly more realistic weight than mainstream shōnen or shōjo tradition, meticulous, patient rendering of environment and costume detail rewarding close inspection, and a polished, cross-cultural illustration sensibility that bridges Eastern character-design fluency with Western graphic-novel craftsmanship. Influenced by: Franco-Belgian manga-influenced illustration movement, European graphic-novel tradition, hybrid manga-bande-dessinée technique, contemporary Euromanga publishing practice.",
        "category": "Anime and Manga"
    },
    {
        "name": "Frieren",
        "imageFile": "Frieren_00001_.jpg",
        "prompt": "A gentle, atmospheric anime-illustration style built on soft, delicate linework carrying a quiet, contemplative restraint, muted cel-based shading with subtle gradation rather than dramatic contrast, a hushed, melancholic stillness pervading even fantastical composition, meticulous attention to naturalistic environmental detail balanced against calm, understated character design, and a serene, wistful anime intensity that feels contemplative, tender, and quietly profound. Influenced by: Kanehito Yamada (original), Studio Madhouse animation-adaptation tradition, atmospheric anime-illustration technique, contemplative fantasy character-design practice.",
        "category": "Anime and Manga"
    },
    {
        "name": "Ghibli Style",
        "imageFile": "Ghibli Style_00001_.jpg",
        "prompt": "A gentle, hand-painted animation illustration style built on soft watercolor-inspired shading that gives every plane a breathable, tender texture, meticulous naturalistic detail applied with unhurried patience, rounded, expressive proportions carrying quiet emotional sincerity, a hushed, wondrous stillness pervading even the most fantastical scenes, and a nostalgic, wholesome hand-crafted intensity that feels timeless and deeply human. Influenced by: Hayao Miyazaki, Studio Ghibli production technique, traditional cel-animation painting method, naturalist watercolor illustration tradition.",
        "category": "Anime and Manga"
    },
    {
        "name": "Granblue Fantasy Pin-Up",
        "imageFile": "Granblue Fantasy Pin-Up_00001_.jpg",
        "prompt": "A richly detailed JRPG character-illustration style built on crisp painterly linework blended seamlessly into soft airbrushed shading, glossy semi-realistic rendering that gives skin and hair a polished, luminous finish without tipping into full photorealism, confident glamorous pin-up posing framed with clean graphic composition, delicately layered ornamental costume detail rendered with meticulous craftsmanship, and a vibrant, high-production mobile-gacha polish that feels equally at home as key art and collectible card illustration. Influenced by: Minaba Hideo, Cygames character-art direction, JRPG gacha illustration technique, semi-realistic anime rendering.",
        "category": "Anime and Manga"
    },
    {
        "name": "JoJo's Bizarre Adventure",
        "imageFile": "JoJo's Bizarre Adventure_00001_.jpg",
        "prompt": "A flamboyant, hyper-stylized manga-illustration style built on exaggerated, statuesque anatomy carrying dramatic fashion-forward posing, bold, high-contrast linework rendering musculature with sculptural, almost architectural precision, saturated graphic patterning integrated directly into confident silhouette design, dynamic, theatrical composition charged with operatic intensity and flair, and a bold, unapologetically stylish shōnen extravagance that feels equal parts high fashion and larger-than-life spectacle. Influenced by: Hirohiko Araki, flamboyant shōnen-manga tradition, sculptural anatomical-illustration technique, theatrical fashion-forward character-design practice.",
        "category": "Anime and Manga"
    },
    {
        "name": "Jujutsu Kaisen",
        "imageFile": "Jujutsu Kaisen_00001_.jpg",
        "prompt": "A dynamic, high-contrast shōnen-manga illustration style built on confident, angular linework carrying sharp, kinetic action-driven posing, dense, moody shading with dramatic ink-heavy shadow blocking, a stylish, contemporary silhouette design balancing realism with graphic exaggeration, meticulous attention to fluid, high-impact motion within otherwise tightly controlled composition, and a fierce, cinematic shōnen intensity that feels equal parts stylish and visceral. Influenced by: Gege Akutami, MAPPA animation-adaptation tradition, cel-shaded dark-shōnen technique, contemporary action-manga character-design practice.",
        "category": "Anime and Manga"
    },
    {
        "name": "Junji Ito",
        "imageFile": "Junji Ito_00001_.jpg",
        "prompt": "A meticulously detailed horror-manga illustration style built on dense, obsessive fine linework and cross-hatching that renders skin, hair, and texture with unsettling hyper-precision, ordinary human forms twisted into spiraling, biologically wrong distortions and body horror, stark black-and-white contrast with pools of inky shadow swallowing the edges of the frame, wide unblinking eyes carrying quiet dawning dread, and a slow-building, deeply unsettling atmosphere of cosmic horror seeping into mundane settings. Influenced by: Junji Ito, Tomie and Uzumaki manga art, body-horror illustration, ink cross-hatching technique.",
        "category": "Anime and Manga"
    },
    {
        "name": "Katsuya Terada",
        "imageFile": "Katsuya Terada_00001_.jpg",
        "prompt": "A ferociously energetic illustration style built on wild, gestural linework that captures raw movement and muscular dynamism in every stroke, loose ink-driven cross-hatching layered with confident painterly color, chaotic yet controlled compositions bursting with kinetic tension, richly textured surface detail giving textures a visceral, almost sculptural intensity, and a bold, untamed painterly ferocity that feels equally at home in fine art and manga tradition. Influenced by: Katsuya Terada, Japanese gekiga illustration, ink-and-color technique, fantasy creature illustration.",
        "category": "Anime and Manga"
    },
    {
        "name": "Manga Style",
        "imageFile": "Manga Style_00001_.jpg",
        "prompt": "A clean, expressive black-and-white illustration style built on confident, precise linework defining stylized, appealing proportions, restrained tonal shading achieved through screentone patterning or fine cross-hatching rather than continuous gradation, large expressive eyes carrying much of the emotional weight, a dynamic, panel-ready clarity favoring instant visual readability, and a versatile, universally recognizable illustrative charm rooted in mainstream Japanese comic-illustration convention. Influenced by: mainstream manga illustration tradition, screentone-shading technique, Weekly Shōnen Jump publishing convention, Japanese comic-art practice.",
        "category": "Anime and Manga"
    },
    {
        "name": "Manhwa Ultradetailed Art",
        "imageFile": "Manhwa Ultradetailed Art_00001_.jpg",
        "prompt": "A richly polished Korean digital-comic illustration style built on crisp, precise linework merged seamlessly with dense, meticulous rendering across skin, hair, and costume, exhaustive layered shading that builds photographic depth while retaining a clean, semi-realistic anime-adjacent finish, luminous soft-gradient highlights giving every surface a glossy, high-production sheen, obsessive attention to fine ornamental and textural detail rewarding close inspection, and a polished, high-stakes cinematic webtoon intensity built for full-screen serialized impact. Influenced by: Redice Studio digital-coloring technique, Korean manhwa production standard, semi-realistic webtoon rendering practice, high-detail digital-comic illustration tradition.",
        "category": "Anime and Manga"
    },
    {
        "name": "MidJourney Niji-Inspired Digital Illustration",
        "imageFile": "MidJourney Niji-Inspired Digital Illustration_00001_.jpg",
        "prompt": "A vibrant, painterly anime-fusion illustration style defined by luminous soft-gradient shading, glowing rim light and dreamy bloom haloing the figure, richly saturated color palettes that lean pastel-fantasy or neon-vivid by turns, delicate linework blended seamlessly into airbrushed color rather than hard-outlined cel shading, whimsical atmospheric particles or floating light motes drifting through the scene, and a lush, otherworldly polish that feels equally at home as a fantasy book cover or a modern anime key visual. Influenced by: Niji Journey model aesthetics, modern anime key visual art, Makoto Shinkai lighting style, digital gouache illustration.",
        "category": "Anime and Manga"
    },
    {
        "name": "Murata Hyperrealism",
        "imageFile": "Murata Hyperrealism_00001_.jpg",
        "prompt": "A meticulously rendered manga-illustration style built on obsessive anatomical precision that treats musculature and material detail with near-photographic exactness, dramatic high-contrast shading carving powerful, sculptural form through confident cross-hatched shadow, a technically disciplined realism that pushes traditional manga linework toward hyperreal density, dynamic, kinetic posing charged with explosive physical presence, and a bold, virtuosic manga intensity that feels equal parts scientific precision and raw physical spectacle. Influenced by: Yusuke Murata, One-Punch Man manga tradition, hyper-detailed manga illustration technique, technical-precision character-design practice.",
        "category": "Anime and Manga"
    },
    {
        "name": "One Piece",
        "imageFile": "One Piece_00001_.jpg",
        "prompt": "A bold, expressive shōnen-manga illustration style built on confident, energetic linework carrying exaggerated, rubber-hose-adjacent proportion flexibility, dynamic, kinetic posing charged with over-the-top comedic and dramatic range in equal measure, simplified cel-based shading that prioritizes bold graphic readability over subtle gradation, richly imaginative silhouette design that pushes anatomy and costume into instantly iconic exaggeration, and an adventurous, larger-than-life shōnen energy that balances whimsical humor with genuine emotional weight. Influenced by: Eiichiro Oda, Weekly Shōnen Jump illustration tradition, cel-shaded anime-adaptation technique, adventure-shōnen character-design practice.",
        "category": "Anime and Manga"
    },
    {
        "name": "Shindol",
        "imageFile": "Shindol_00001_.jpg",
        "prompt": "A polished Korean webtoon illustration style rendered with soft cel-shaded gradients over cleanly inked linework, realistically proportioned yet subtly idealized figures with smooth, luminous skin and delicately blushed cheeks, expressive detailed eyes rendered with glossy multi-layered highlights, soft ambient studio-like lighting that keeps shadows gentle and skin tones warm, and a clean, contemporary digital-comic polish characteristic of modern webtoon romance and drama art. Influenced by: Shindol, Korean webtoon illustration, Manhwa digital coloring technique, romance webtoon art direction.",
        "category": "Anime and Manga"
    },
    {
        "name": "Ultradetailed Manga Illustration",
        "imageFile": "Ultradetailed Manga Illustration_00001_.jpg",
        "prompt": "exceptionally dense manga aesthetics characterized by obsessive line fidelity, intricate textural rendering, advanced visual layering, meticulous hatch work, precise structural draftsmanship, and an extraordinary concentration of graphical information. The style emphasizes complexity, craftsmanship, and prolonged visual exploration, rewarding close inspection through micro-detail, architectural precision, elaborate costume design, and highly refined material interpretation. Rather than relying on simplified manga shorthand, it pursues visual richness, technical virtuosity, and immersive image construction while preserving strong readability and compositional control. The overall effect feels ambitious, authoritative, and intensely crafted, balancing narrative clarity with astonishing detail density and artistic dedication, reminiscent of Kentaro Miura and Tsutomu Nihei, inspired by Berserk and BLAME!.",
        "category": "Anime and Manga"
    },
    {
        "name": "Watercolor Anime Illustration",
        "imageFile": "Watercolor Anime Illustration_00001_.jpg",
        "prompt": "A soft, luminous illustration style built on delicate translucent washes blending seamlessly with clean anime-adjacent linework, gentle bleeding and diffusion at the edges lending each plane a tender, organic softness, restrained tonal layering achieved through patient, unhurried wash-building rather than opaque coverage, a hushed, dreamlike stillness carried through soft directional light, and a poetic, wistful character-illustration finish that feels equally hand-painted and anime-refined. Influenced by: traditional watercolor-and-wash technique, contemporary anime-illustration tradition, gentle wash-blending practice, semi-realistic character-art method.",
        "category": "Anime and Manga"
    },
    {
        "name": "Yoshitaka Amano",
        "imageFile": "Yoshitaka Amano_00001_.jpg",
        "prompt": "An ethereal, elongated illustration style built on delicate, flowing linework that stretches anatomy into graceful, almost weightless proportion, translucent layered washes that let ink and pigment bleed softly into one another rather than sit as flat color, a dreamlike fragility carried through sparse, deliberate mark-making surrounded by generous negative space, ornamental fine detail concentrated in hair and fabric while the broader form stays airy and unresolved, and a haunting, otherworldly elegance that feels simultaneously fragile and mythic. Influenced by: Yoshitaka Amano, Final Fantasy character-art tradition, ink-wash illustration technique, Vampire Hunter D illustration practice.",
        "category": "Anime and Manga"
    },
    {
        "name": "Absolute Painterly",
        "imageFile": "Absolute Painterly_00001_.jpg",
        "prompt": "A richly tactile digital painting style built entirely on visible, confident brushwork rather than smooth blending, thick impasto-like strokes carrying real physical weight and direction across every surface, loose expressive edges that dissolve fine detail in favor of gestural energy, dramatic value contrast doing the heavy lifting instead of line, and a raw, emotive, unmistakably hand-painted intensity that celebrates the mark of the brush over polished precision. Influenced by: traditional oil painting technique, John Singer Sargent, impasto brushwork, classical atelier painting method.",
        "category": "Painting and Fine Art"
    },
    {
        "name": "Abstract Expressionism",
        "imageFile": "Abstract Expressionism_00001_.jpg",
        "prompt": "A raw, gestural painting style built on sweeping, spontaneous brushwork that prioritizes emotional intensity over representational accuracy, bold physical mark-making where the visible energy of the stroke becomes the subject itself, dramatic tonal contrast and dense layered texture built through accumulated, unrestrained applications of paint, a chaotic yet deliberate compositional freedom that resists conventional structure, and a raw, cathartic painterly intensity that channels pure emotional immediacy over polished technique. Influenced by: Jackson Pollock, Willem de Kooning, action painting technique, mid-century American painting movement.",
        "category": "Painting and Fine Art"
    },
    {
        "name": "Academic Precision Realism",
        "imageFile": "Academic Precision Realism_00001_.jpg",
        "prompt": "A meticulously rendered academic-realist illustration style built on immaculate, glass-smooth surface finish achieved through countless thin layered glazes rather than visible brushwork, dramatic architectural lighting that rakes across richly detailed ornamental surface and fabric with near-photographic exactness, a controlled, studio-disciplined precision in every fold, texture, and reflective highlight, a hushed, contemplative grandeur carried through carefully staged compositional balance, and a polished, old-world craftsmanship that treats technical mastery itself as the subject. Influenced by: William-Adolphe Bouguereau, academic realism painting tradition, oil-glazing technique, classical atelier training method.",
        "category": "Painting and Fine Art"
    },
    {
        "name": "Acrylic Dreamscape",
        "imageFile": "Acrylic Dreamscape_00001_.jpg",
        "prompt": "expressive painterly rendering with layered acrylic textures, blended edges, atmospheric transitions, rich surface variation, handcrafted brushwork, contemporary fine art sensibilities, dreamlike visual rhythm, softly abstracted realism, tactile material presence, luminous depth, gallery-quality execution, reminiscent of Gerhard Richter and Jeremy Mann, inspired by Abstract Painting and Contemporary Fine Art Exhibitions.",
        "category": "Painting and Fine Art"
    },
    {
        "name": "Airbrush Fantasy",
        "imageFile": "Airbrush Fantasy_00001_.jpg",
        "prompt": "highly polished fantasy illustration featuring exceptionally smooth gradients, refined atmospheric rendering, soft transitions, luminous depth, meticulous surface treatment, commercial illustration sensibilities, elegant visual flow, and a perfected painterly finish that emphasizes clarity and visual appeal, reminiscent of Boris Vallejo and Chris Achilleos, inspired by Heavy Metal Magazine and classic fantasy paperback cover art.",
        "category": "Painting and Fine Art"
    },
    {
        "name": "Alphonse Mucha Masterwork",
        "imageFile": "Alphonse Mucha Masterwork_00001_.jpg",
        "prompt": "elegant decorative illustration characterized by flowing organic linework, intricate ornamental detailing, harmonious visual rhythms, refined craftsmanship, graceful contours, and highly polished surface treatment, blending fine art sophistication with graphic clarity and a strong sense of decorative unity, reminiscent of Alphonse Mucha and Gustav Klimt, inspired by Job Cigarettes Poster and The Slav Epic.",
        "category": "Painting and Fine Art"
    },
    {
        "name": "Anato Finnstark",
        "imageFile": "Anato Finnstark_00001_.jpg",
        "prompt": "An epic, luminous fantasy-portrait style built on sweeping atmospheric glow that radiates outward from a central focal point, richly layered painterly brushwork dissolving into soft luminous haze at the periphery, dramatic scale conveyed through radiant backlight that illuminates simultaneously, meticulous attention to soft motion caught within the glow, and a breathtaking, cinematic grandeur that feels both intimate and monumentally epic. Influenced by: Anato Finnstark, painterly fantasy-illustration technique, luminous atmospheric concept-art practice, cinematic key-art lighting method.",
        "category": "Painting and Fine Art"
    },
    {
        "name": "Artgerm",
        "imageFile": "Artgerm_00001_.jpg",
        "prompt": "A polished digital-painting portrait style blending photorealistic rendering with idealized comic-glamour proportions, luminous porcelain skin with soft airbrushed gradients and crisp specular highlights, richly detailed glossy rendering carried strand by strand where fine linework is called for, confident glamorous poses framed with clean painterly composition, and a slick, high-production pin-up polish that bridges Western comic-cover art and digital beauty illustration. Influenced by: Stanley \"Artgerm\" Lau, comic-book cover illustration, digital pin-up art, airbrush portrait technique.",
        "category": "Painting and Fine Art"
    },
    {
        "name": "Beatrix Potter",
        "imageFile": "Beatrix Potter_00001_.jpg",
        "prompt": "A gentle, meticulously observed watercolor illustration style built on delicate, softly blended washes carrying quiet naturalist precision, fine detailed linework reserved for texture and form rather than bold outline, a hushed pastoral tenderness radiating through soft diffused lighting, restrained old-world charm achieved through understated, unhurried brushwork, and a tender, storybook intimacy that feels both scientifically observant and gently whimsical. Influenced by: Beatrix Potter, English watercolor illustration, naturalist botanical illustration, Golden Age children's book art.",
        "category": "Painting and Fine Art"
    },
    {
        "name": "Bernie Wrightson Gothic",
        "imageFile": "Bernie Wrightson Gothic_00001_.jpg",
        "prompt": "richly detailed gothic illustration characterized by intricate linework, masterful texture rendering, atmospheric darkness, organic complexity, dramatic chiaroscuro, and exceptional craftsmanship, blending classical draftsmanship with horror-infused visual storytelling through meticulous detail, immersive mood, and a strong sense of haunting romanticism, reminiscent of Bernie Wrightson and Gustave Doré, inspired by Frankenstein and Swamp Thing.",
        "category": "Painting and Fine Art"
    },
    {
        "name": "Bookplate Illustration",
        "imageFile": "Bookplate Illustration_00001_.jpg",
        "prompt": "refined decorative illustration aesthetics characterized by meticulous linework, engraved-inspired detailing, ornamental sophistication, literary craftsmanship, balanced composition, and timeless artisanal quality, blending classical printmaking traditions with elegant visual storytelling through intricate textures, disciplined draftsmanship, and exceptionally polished design sensibilities, reminiscent of Arthur Rackham and Aubrey Beardsley, inspired by Golden Age Bookplates and The Fairy Tales of the Brothers Grimm.",
        "category": "Painting and Fine Art"
    },
    {
        "name": "Boris Vallejo",
        "imageFile": "Boris Vallejo_00001_.jpg",
        "prompt": "A hyper-idealized fantasy painting style built on smooth, airbrushed skin rendering, dramatic directional lighting wrapping muscular, statuesque forms in warm heroic glow, meticulously blended tonal transitions that eliminate visible brushwork in favor of glassy precision, confident heroic posing charged with theatrical grandeur, and a bold, glossy, larger-than-life painterly radiance. Influenced by: Boris Vallejo, airbrush fantasy painting technique, heroic fantasy illustration, classical figure painting.",
        "category": "Painting and Fine Art"
    },
    {
        "name": "Brushwork Emphasis",
        "imageFile": "Brushwork Emphasis_00001_.jpg",
        "prompt": "painterly aesthetics centered on expressive brush handling, visible mark-making, sophisticated texture variation, dynamic surface energy, and handcrafted visual character, prioritizing artistic gesture and material presence over perfectly smooth rendering while maintaining strong structural cohesion, visual depth, and refined craftsmanship throughout the image, reminiscent of John Singer Sargent and Joaquín Sorolla, inspired by Carnation, Lily, Lily, Rose and Walk on the Beach.",
        "category": "Painting and Fine Art"
    },
    {
        "name": "Casey Baugh",
        "imageFile": "Casey Baugh_00001_.jpg",
        "prompt": "A richly painterly portrait style built on bold, confident brushwork that constructs form through visible, decisive strokes rather than smooth blending, dramatic tonal contrast carving powerful dimensionality across every plane, a loose, expressive looseness at the edges contrasted against tightly resolved focal areas, an emotionally charged, contemplative stillness carried through restrained, moody atmosphere, and a technically masterful, contemporary painterly gravitas that feels both classically grounded and boldly modern. Influenced by: Casey Baugh, contemporary painterly-portrait tradition, alla prima oil-painting technique, classical-contemporary portrait practice.",
        "category": "Painting and Fine Art"
    },
    {
        "name": "Charcoal Rendering",
        "imageFile": "Charcoal Rendering_00001_.jpg",
        "prompt": "traditional drawing aesthetics characterized by rich tonal gradation, expressive mark-making, tactile surface texture, atmospheric softness, and powerful value-based form construction, emphasizing depth, mood, and craftsmanship through layered shading, subtle edge control, and a handcrafted visual presence that balances realism with artistic interpretation, reminiscent of Käthe Kollwitz and Robert Longo, inspired by The Weavers and Men in the Cities.",
        "category": "Painting and Fine Art"
    },
    {
        "name": "Charlie Bowater",
        "imageFile": "Charlie Bowater_00001_.jpg",
        "prompt": "A richly painterly digital illustration style built on soft, glowing directional lighting that sculpts form with confident value control, delicately rendered skin and hair carrying a luminous, almost photographic softness within an otherwise painterly composition, fine decorative detail in costume and ornamentation rendered with meticulous restraint, a hushed, cinematic stillness charged with quiet emotional weight, and a polished, atmospheric fantasy-illustration intensity that balances realism with painterly warmth. Influenced by: Charlie Bowater, digital fantasy portraiture, painterly concept-art technique, cinematic character illustration.",
        "category": "Painting and Fine Art"
    },
    {
        "name": "Chiaroscuro",
        "imageFile": "Chiaroscuro_00001_.jpg",
        "prompt": "A dramatically balanced painting style built on strong contrast between illuminated and shadowed passages that sculpts form with three-dimensional conviction, a single dominant light source establishing clear hierarchy between what is revealed and what recedes into darkness, meticulous, gradual tonal transition bridging highlight and shadow rather than abrupt separation, a controlled, deliberate modeling that gives every plane convincing volumetric weight, and a masterful, timeless painterly gravitas rooted in centuries of classical oil-painting tradition. Influenced by: Caravaggio, Rembrandt van Rijn, Baroque tonal-painting technique, classical chiaroscuro method.",
        "category": "Painting and Fine Art"
    },
    {
        "name": "Collector Storybook Illustration",
        "imageFile": "Collector Storybook Illustration_00001_.jpg",
        "prompt": "premium narrative illustration aesthetics characterized by refined draftsmanship, elegant visual storytelling, intricate decorative detail, polished painterly rendering, and a timeless sense of wonder, blending classic storybook craftsmanship with modern production-quality execution through sophisticated composition, atmospheric depth, and meticulously curated visual richness, reminiscent of Arthur Rackham and Kinuko Y. Craft, inspired by The Fairy Tales of the Brothers Grimm and The Chronicles of Narnia.",
        "category": "Painting and Fine Art"
    },
    {
        "name": "Commercial Illustration",
        "imageFile": "Commercial Illustration_00001_.jpg",
        "prompt": "polished professional illustration aesthetics characterized by exceptional visual clarity, refined draftsmanship, sophisticated rendering, strong communication value, and broad audience appeal, emphasizing readability, craftsmanship, and conceptual effectiveness through balanced composition, controlled detail hierarchy, premium surface treatment, and production-ready execution, reminiscent of J.C. Leyendecker and Norman Rockwell, inspired by The Saturday Evening Post and American Illustrators Gallery exhibitions.",
        "category": "Painting and Fine Art"
    },
    {
        "name": "Conté Pastel",
        "imageFile": "Conté Pastel_00001_.jpg",
        "prompt": "A rich, tactile drawing style built on dense, velvety pigment applied with confident, blendable pressure, a soft, smudgeable quality allowing form to be built through both layered mark-making and controlled blending, a warm, granular texture distinct from smoother chalk or charcoal media, deliberate tonal transition achieved through pressure variation rather than wet blending, and a timeless, painterly-adjacent intensity rooted in classical academic drawing tradition. Influenced by: Conté crayon drawing tradition, classical academic tonal-drawing practice, life-drawing atelier technique, fine-art pastel-and-chalk method.",
        "category": "Painting and Fine Art"
    },
    {
        "name": "Contemporary Fantasy Art",
        "imageFile": "Contemporary Fantasy Art_00001_.jpg",
        "prompt": "modern fantasy aesthetics characterized by sophisticated visual design, refined painterly rendering, cinematic atmosphere, immersive worldbuilding, and a balance between realism and stylization, emphasizing artistic originality, premium craftsmanship, and contemporary entertainment-art sensibilities through controlled detail, elegant lighting, and highly polished execution, reminiscent of Marc Simonetti and Ruan Jia, inspired by The Witcher Concept Art and Magic: The Gathering Modern Masters.",
        "category": "Painting and Fine Art"
    },
    {
        "name": "Contemporary Oil Painting",
        "imageFile": "Contemporary Oil Painting_00001_.jpg",
        "prompt": "A richly layered painting style built on confident, visible brushwork that constructs form through deliberate, physically present strokes, meticulous blended tonal transition achieved through wet-on-wet and glazing technique in equal measure, a tactile, hand-crafted depth that preserves brush character even within refined passages, deliberate value and contrast control giving every form convincing dimensional weight, and a timeless yet unmistakably current painterly sincerity that bridges classical technique with a contemporary rendering sensibility. Influenced by: contemporary figurative-oil-painting tradition, classical atelier technique, alla prima painting practice, modern gallery-oil-painting method.",
        "category": "Painting and Fine Art"
    },
    {
        "name": "Contemporary Ukiyo-E",
        "imageFile": "Contemporary Ukiyo-E_00001_.jpg",
        "prompt": "A contemporary reinterpretation of traditional woodblock-print illustration built on flat, confidently bounded shape divisions layered with a cleaner, more graphic digital precision, fluid calligraphic linework retaining the rhythmic economy of the original medium while shedding its period-specific motifs, restrained tonal layering achieved through overlapping flat planes rather than gradation, a poised, contemplative stillness carried through balanced asymmetrical composition, and a refined print-craft elegance updated with a crisp, present-day graphic sensibility. Influenced by: Katsushika Hokusai, contemporary woodblock-inspired digital illustration, modern Japanese graphic design, Edo-period print technique reimagined.",
        "category": "Painting and Fine Art"
    },
    {
        "name": "Cover Art",
        "imageFile": "Cover Art_00001_.jpg",
        "prompt": "highly polished illustration aesthetics designed for immediate visual impact, characterized by strong focal hierarchy, compelling composition, refined rendering, premium surface treatment, and memorable storytelling cues, blending commercial appeal with artistic sophistication through meticulous craftsmanship, dramatic presentation, and collector-quality execution, reminiscent of Drew Struzan and Frank Frazetta, inspired by Star Wars theatrical posters and Conan the Barbarian paperback covers.",
        "category": "Painting and Fine Art"
    },
    {
        "name": "Dark Fantasy Illustration",
        "imageFile": "Dark Fantasy Illustration_00001_.jpg",
        "prompt": "A brooding, atmospheric fantasy painting style built on deep tenebrist shadow that swallows the edges of every composition, a single dramatic source of light carving form out of near-total darkness, richly textured painterly surfaces giving textures a weathered, visceral weight, an oppressive, foreboding stillness charged with looming threat, and a heavy, mythic gravitas that feels both epic and quietly menacing. Influenced by: dark fantasy concept-art tradition, Zdzisław Beksiński, tenebrist oil painting technique, gothic fantasy illustration.,",
        "category": "Painting and Fine Art"
    },
    {
        "name": "Etching",
        "imageFile": "Etching_00001_.jpg",
        "prompt": "A meticulous printmaking-inspired illustration style built on dense, fine crosshatched linework that constructs every tone and volume purely through line density rather than flat shading, crisp needle-precise detail rendered with old-world engraving discipline, restrained tonal range achieved through layered hatching passes rather than smooth gradients, a quiet, antique gravitas carried through the deliberate, unhurried linework, and a refined, scholarly print-craft polish that feels historical, meticulous, and timeless. Influenced by: classical etching and engraving technique, Albrecht Dürer, printmaking illustration tradition, Gustave Doré linework.",
        "category": "Painting and Fine Art"
    },
    {
        "name": "Giallo Poster Art",
        "imageFile": "Giallo Poster Art_00001_.jpg",
        "prompt": "A stylized, high-tension illustration style built on stark, high-contrast graphic composition anchored by a dramatic central figure isolated against bold negative space, illustrative airbrushed rendering charged with lurid, theatrical menace, sharp, angular shadow shapes suggesting concealed threat just beyond the frame, a deliberate tension between glamorous surface polish and gruesome implication lurking beneath, and a stylish, pulpy suspense-cinema intensity built for maximum lurid impact on a theater marquee. Influenced by: Italian giallo film-poster tradition, airbrush illustration technique, pulp-thriller poster design, 1970s European genre-cinema graphic practice.",
        "category": "Painting and Fine Art"
    },
    {
        "name": "Grindhouse Poster Illustration",
        "imageFile": "Grindhouse Poster Illustration_00001_.jpg",
        "prompt": "A lurid, exploitation-cinema illustration style built on bold, high-saturation graphic composition anchored by a dramatic, central figure, painterly airbrushed rendering charged with sensationalist, over-the-top intensity, sharp, angular shadow shapes suggesting danger and spectacle in equal measure, a deliberate tension between garish showmanship and gritty pulp menace, and a brash, unapologetically sleazy theatrical energy built for maximum newsstand shock value. Influenced by: 1970s grindhouse film-poster tradition, exploitation-cinema illustration technique, pulp-thriller poster design, airbrush cinematic-poster practice.",
        "category": "Painting and Fine Art"
    },
    {
        "name": "Ink Pen Drawing",
        "imageFile": "Ink Pen Drawing_00001_.jpg",
        "prompt": "A precise, linear illustration style built on confident, controlled strokes that construct every form entirely through line rather than blended tone, dense cross-hatching and stippling layered to achieve tonal depth purely through line density, a crisp, deliberate discipline carried through unhurried, considered mark-making, meticulous attention to line-weight variation suggesting weight and dimensionality, and a timeless, meticulous craftsmanship rooted in centuries of traditional pen-and-ink illustration practice. Influenced by: classical pen-and-ink illustration tradition, fine cross-hatching technique, engraving-adjacent linework practice, traditional academic drawing method.",
        "category": "Painting and Fine Art"
    },
    {
        "name": "James Jean",
        "imageFile": "James Jean_00001_.jpg",
        "prompt": "A richly symbolic, dreamlike illustration style built on flowing, intricate linework that weaves organic pattern seamlessly through composition, delicate translucent washes blending soft color transition with sharply rendered focal detail, a hushed, contemplative surrealism where imagery seems to grow and dissolve into itself, meticulous ornamental density balanced against generous atmospheric space, and a poetic, otherworldly elegance that feels both meticulously crafted and effortlessly dreamlike. Influenced by: James Jean, contemporary illustrative surrealism, ink-and-wash painting technique, gallery-adjacent narrative-illustration practice.",
        "category": "Painting and Fine Art"
    },
    {
        "name": "Kay Nielsen",
        "imageFile": "Kay Nielsen_00001_.jpg",
        "prompt": "An elegant, ornamental fairy-tale illustration style built on sinuous, decorative linework that flows with calligraphic grace, flat decorative patterning applied with meticulous restraint rather than painterly shading, elongated, stylized delicacy, a hushed, dreamlike stillness pervading every composition, and a refined, storybook elegance that feels simultaneously ancient and timeless in its decorative precision. Influenced by: Kay Nielsen, Golden Age children's book illustration, Art Nouveau decorative technique, Scandinavian fairy-tale illustration.",
        "category": "Painting and Fine Art"
    },
    {
        "name": "Kekai Kotaki",
        "imageFile": "Kekai Kotaki_00001_.jpg",
        "prompt": "A richly atmospheric fantasy concept-art style built on loose, confident brushwork that favors mood and light over crisp detail, dramatic soft-edged lighting that dissolves forms into glowing haze at the peripheries, richly layered painterly texture giving textures a lived-in, tactile weight, sweeping atmospheric depth that lets grand scale breathe through soft value transitions, and an evocative, immersive painterly intensity built for epic fantasy world-building. Influenced by: Kekai Kotaki, Guild Wars 2 concept art, painterly fantasy illustration, atmospheric concept-art technique.,",
        "category": "Painting and Fine Art"
    },
    {
        "name": "Loish Ultrarealism",
        "imageFile": "Loish Ultrarealism_00001_.jpg",
        "prompt": "A luminous, painterly digital illustration style blending soft ultrarealistic rendering with expressive, loosely gestural brushwork at the edges, richly glowing skin built through translucent layered glazing rather than flat shading, delicate visible brushstrokes preserved even within highly refined facial detail, a dreamy, romantic softness radiating from confident directional lighting, and a warm, emotionally intimate polish that balances technical realism with unmistakably hand-painted feeling. Influenced by: Loish (Lois van Baarle), digital gouache painting, painterly portrait illustration, semi-realistic character art.",
        "category": "Painting and Fine Art"
    },
    {
        "name": "Monet",
        "imageFile": "Monet_00001_.jpg",
        "prompt": "A luminous, atmospheric painting style built on loose, broken brushstrokes that dissolve precise form in favor of captured light and momentary sensation, delicate layered dabs of pigment that blend optically at a distance rather than through physical mixing, a soft, hazy compositional atmosphere that prioritizes fleeting impression over structural clarity, an unhurried, contemplative rhythm carried through repeated, patient mark-making, and a tranquil, light-drenched painterly sincerity rooted in plein-air impressionist observation. Influenced by: Claude Monet, French impressionist painting tradition, plein-air painting technique, broken-color brushwork practice.",
        "category": "Painting and Fine Art"
    },
    {
        "name": "Pin-Up",
        "imageFile": "Pin-Up_00001_.jpg",
        "prompt": "A charming, playful glamour-illustration style built on smooth, confident linework tracing idealized, curve-forward proportion with cheerful vitality, soft, evenly blended shading giving skin a flattering, luminous glow, a flirtatious, lighthearted posing sensibility charged with cheeky confidence, meticulous attention to graceful gesture and inviting expression, and a nostalgic, wholesome glamour charm that feels playful, warm, and effortlessly appealing. Influenced by: Gil Elvgren, Alberto Vargas, classic American pin-up illustration tradition, mid-century airbrush glamour technique.",
        "category": "Painting and Fine Art"
    },
    {
        "name": "Rembrandt Painting",
        "imageFile": "Rembrandt Painting_00001_.jpg",
        "prompt": "A masterfully controlled classical painting style built on single-source directional light carving a small, dignified highlight against an otherwise deeply shadowed composition, rich, warm chiaroscuro tonal harmony bathing every plane in umber and near-black depth, thick, confident impasto brushwork in the illuminated passages contrasted against thinly glazed shadow, a quiet, contemplative gravitas carried through restrained, dignified composition, and an old-master intensity rooted in centuries of masterful oil-painting tradition. Influenced by: Rembrandt van Rijn, Dutch Golden Age painting tradition, chiaroscuro oil-painting technique, classical impasto-and-glazing method.",
        "category": "Painting and Fine Art"
    },
    {
        "name": "Robin Eley",
        "imageFile": "Robin Eley_00001_.jpg",
        "prompt": "A photorealistic figurative painting style defined by translucent elments, rendered with uncanny material precision, cool, clinical studio lighting that reveals every fold, wrinkle, and light-refraction in the material textures, skin rendered with hyperreal softness, neutral backgrounds that keep full focus on the interplay between body and translucency, and a quiet, conceptual tension between concealment and exposure rendered with immaculate painterly control. Influenced by: Robin Eley, hyperrealist oil painting, contemporary figurative fine art, photorealism technique.,",
        "category": "Painting and Fine Art"
    },
    {
        "name": "Saul Steinbeck Art",
        "imageFile": "Saul Steinbeck Art_00001_.jpg",
        "prompt": "A refined, gently satirical illustration style built on confident, economical linework capturing wit and observation with restrained precision, muted, sophisticated tonal application applied with understated elegance rather than bold contrast, a quiet, literary charm carried through clever, observational composition, meticulous attention to subtle visual storytelling over exhaustive detail, and a timeless, urbane sophistication that feels intelligent, witty, and effortlessly refined. Influenced by: Saul Steinbeck (Saul Steinberg), contemporary New Yorker illustration tradition, gouache-and-ink editorial technique, sophisticated satirical-illustration practice.",
        "category": "Painting and Fine Art"
    },
    {
        "name": "Tenebrism",
        "imageFile": "Tenebrism_00001_.jpg",
        "prompt": "A dramatically shadowed painting style built on an extreme, exaggerated contrast between deep, engulfing darkness and a single sharp pool of illumination, form emerging abruptly from near-total shadow rather than through gradual tonal transition, meticulous, controlled brushwork concentrated entirely within the illuminated passages while shadow remains deliberately unresolved, a theatrical, almost violent immediacy carried through the stark light-dark confrontation, and a haunting, intensely focused gravitas rooted in the most extreme tradition of chiaroscuro painting. Influenced by: Caravaggio, tenebrist painting tradition, Baroque chiaroscuro technique, dramatic single-source oil-painting method.",
        "category": "Painting and Fine Art"
    },
    {
        "name": "Thick Brushstrokes Painting",
        "imageFile": "Thick Brushstrokes Painting_00001_.jpg",
        "prompt": "A richly physical painting style built on visible, confident strokes carrying real textural weight and directional energy across the entire composition, dense, impasto-like pigment application replacing any smooth or blended transition, dramatic value contrast doing the heavy lifting instead of fine linework, loose, expressive edges that dissolve detail in favor of gestural conviction, and a raw, emotive intensity that celebrates the physical mark of the brush over polished precision. Influenced by: John Singer Sargent, Vincent van Gogh, impasto brushwork technique, alla prima oil-painting method.",
        "category": "Painting and Fine Art"
    },
    {
        "name": "Ultrarealism",
        "imageFile": "Ultrarealism_00001_.jpg",
        "prompt": "A meticulously rendered painting style built on hyper-precise attention to minute detail that surpasses ordinary photographic fidelity, dramatic, controlled lighting establishing an almost tangible dimensionality throughout the composition, obsessive layering that builds convincing depth, translucency, and subtle tonal variation, a disciplined, painstaking rendering approach that treats absolute technical mastery as the primary goal, and an uncanny, almost hyper-vivid intensity that pushes representational accuracy beyond what unaided vision typically perceives. Influenced by: hyperrealist and ultrarealist oil-painting tradition, contemporary photorealism technique, meticulous layered-glazing practice, technically obsessive figurative-painting method.",
        "category": "Painting and Fine Art"
    },
    {
        "name": "Van Gogh",
        "imageFile": "Van Gogh_00001_.jpg",
        "prompt": "An intensely expressive painting style built on thick, visible impasto brushstrokes applied with rhythmic, almost vibrating directional energy, dense, swirling mark-making that gives even still forms a sense of restless movement, confident, emotionally charged tonal contrast built through accumulated layered strokes rather than smooth blending, a raw, unrestrained painterly intensity where the physical gesture of the brush becomes inseparable from the emotion depicted, and a passionate, deeply personal painterly urgency rooted in late-19th-century post-impressionist rebellion. Influenced by: Vincent van Gogh, post-impressionist painting tradition, impasto brushwork technique, expressive plein-air painting practice.",
        "category": "Painting and Fine Art"
    },
    {
        "name": "Victo Ngai",
        "imageFile": "Victo Ngai_00001_.jpg",
        "prompt": "A luminous, decorative illustration style built on richly patterned ornamental linework woven seamlessly through flowing, dreamlike composition, soft glowing color transitions blending seamlessly across intricate layered detail, a hushed, whimsical stillness carried through generous negative space balanced against dense focal ornamentation, meticulous narrative symbolism embedded within every decorative flourish, and a poetic, storybook elegance that feels both meticulously crafted and effortlessly enchanting. Influenced by: Victo Ngai, contemporary editorial-illustration tradition, decorative gouache-painting technique, narrative symbolic-illustration practice.",
        "category": "Painting and Fine Art"
    },
    {
        "name": "Watercolor Painting",
        "imageFile": "Watercolor Painting_00001_.jpg",
        "prompt": "A fluid, translucent painting style built on delicate layered washes that build depth through repeated transparent passes rather than opaque coverage, soft, feathered edges where pigment bleeds and diffuses with organic unpredictability, a luminous quality achieved by letting light pass through thin pigment layers, an unhurried, patient looseness carried through the medium's inherent fluidity, and a poetic, gentle sincerity that captures spontaneity within controlled technical discipline. Influenced by: traditional watercolor-painting tradition, wet-on-wet washing technique, plein-air watercolor practice, classical wash-and-glaze method.",
        "category": "Painting and Fine Art"
    },
    {
        "name": "Adobe Lightroom Masterpiece",
        "imageFile": "Adobe Lightroom Masterpiece_00001_.jpg",
        "prompt": "A meticulously graded photographic finishing style built on precise tonal curve control that balances highlight roll-off and shadow depth with editorial exactness, subtle clarity and texture enhancement that sharpens fine detail without tipping into artificiality, carefully calibrated dynamic range that preserves nuance across the full tonal spectrum, refined selective dodging and burning that guides the eye with quiet confidence, and a polished, professional-grade finishing intensity that elevates a raw capture into a considered, gallery-ready photographic statement. Influenced by: professional photo-retouching workflow, Adobe Lightroom color-grading technique, editorial photography post-production, fine-art print finishing.",
        "category": "Photography"
    },
    {
        "name": "Analog Photography",
        "imageFile": "Analog Photography_00001_.jpg",
        "prompt": "A tactile, organic photographic style built on natural grain structure that gives every surface a subtle, unpolished texture rather than digital smoothness, gentle imperfections in tonal transition and mild halation around bright highlights that soften harsh contrast, a slightly muted, imperfect dynamic range that feels handled and physical rather than clinically corrected, unhurried natural or available light rendered with honest, unmanipulated character, and a nostalgic, authentic materiality that carries the quiet imperfection of chemistry and light captured on film. Influenced by: 35mm film photography tradition, darkroom development technique, analog photojournalism practice, medium-format film camera aesthetic.",
        "category": "Photography"
    },
    {
        "name": "Backlit Portraiture",
        "imageFile": "Backlit Portraiture_00001_.jpg",
        "prompt": "luminous photographic aesthetics defined by strong backlighting, radiant edge illumination, subtle translucency effects, atmospheric depth, graceful tonal transitions, and a heightened sense of visual separation, creating elegant and emotionally evocative imagery through carefully controlled exposure, naturalistic light diffusion, and refined portrait craftsmanship, reminiscent of Peter Lindbergh and Paolo Roversi, inspired by Vogue editorials and In the Mood for Love.",
        "category": "Photography"
    },
    {
        "name": "Black And White Documentary",
        "imageFile": "Black And White Documentary_00001_.jpg",
        "prompt": "timeless documentary photography aesthetics emphasizing strong tonal separation, rich grayscale rendering, authentic visual storytelling, observational realism, natural light behavior, subtle film grain, and emotional immediacy, capturing people and moments with honesty, depth, and human presence through restrained composition and enduring photographic craftsmanship, reminiscent of Sebastião Salgado and Henri Cartier-Bresson, inspired by Workers and The Decisive Moment.",
        "category": "Photography"
    },
    {
        "name": "Bleach Bypass Photography",
        "imageFile": "Bleach Bypass Photography_00001_.jpg",
        "prompt": "cinematic photographic aesthetics characterized by desaturated tonal richness, elevated contrast, metallic surface response, dense shadow structure, preserved highlight detail, and a gritty yet highly controlled visual atmosphere, creating imagery with dramatic emotional weight and production-grade realism through sophisticated tonal compression and refined filmic rendering, reminiscent of Roger Deakins and Janusz Kamiński, inspired by Saving Private Ryan and Minority Report.",
        "category": "Photography"
    },
    {
        "name": "Brassaï Night Photography",
        "imageFile": "Brassaï Night Photography_00001_.jpg",
        "prompt": "nocturnal photographic aesthetics characterized by atmospheric illumination, deep tonal richness, urban mystery, reflective surfaces, cinematic shadow play, and evocative documentary realism, capturing the poetry of night through carefully observed light, immersive mood, and timeless visual storytelling while maintaining exceptional compositional discipline and photographic craftsmanship, reminiscent of Brassaï and Robert Doisneau, inspired by Paris de Nuit and French Humanist Photography.",
        "category": "Photography"
    },
    {
        "name": "Cinematic Photography",
        "imageFile": "Cinematic Photography_00001_.jpg",
        "prompt": "A dramatically composed photographic style built on deliberate, film-like framing that favors wide aspect ratios and purposeful negative space, controlled color-grading logic that unifies highlight and shadow into a single cohesive mood, soft, motivated lighting sources that feel narratively justified rather than purely technical, a patient, unhurried compositional stillness charged with implied story beyond the frame, and a polished, narrative-driven visual gravitas rooted in feature-film visual-language tradition. Influenced by: Roger Deakins cinematography tradition, anamorphic-lens visual technique, narrative film-lighting practice, color-grading post-production method.",
        "category": "Photography"
    },
    {
        "name": "Cross Process Photography",
        "imageFile": "Cross Process Photography_00001_.jpg",
        "prompt": "experimental photographic aesthetics characterized by unconventional tonal relationships, heightened contrast, distinctive film-derived color shifts, graphic visual impact, and an unpredictable analog character, blending technical imperfection with artistic intent through expressive processing artifacts, atmospheric depth, and a bold editorial sensibility, reminiscent of Nick Knight and Sølve Sundsbø, inspired by Dazed & Confused editorials and i-D Magazine photography.",
        "category": "Photography"
    },
    {
        "name": "Cyberpunk Photography",
        "imageFile": "Cyberpunk Photography_00001_.jpg",
        "prompt": "A high-contrast, neon-drenched photographic style built on intense directional gel lighting that crosses the frame in sharp, saturated bands, wet-look reflective skin and atmosphere achieved through deliberate humid haze and moisture-catching highlight, dramatic low-angle framing that dwarfs the subject within looming urban density, deep engulfing shadow broken only by isolated glowing accents, and a cold, futuristic tension charged with dystopian nocturnal energy. Influenced by: Blade Runner cinematography tradition, neon-noir photography technique, cyberpunk urban-photography practice, gel-lighting cinematic method.",
        "category": "Photography"
    },
    {
        "name": "Dutch Angle Photography",
        "imageFile": "Dutch Angle Photography_00001_.jpg",
        "prompt": "dynamic photographic aesthetics characterized by intentional camera tilt, visual tension, dramatic perspective, heightened energy, and cinematic composition, using unconventional framing to create psychological intensity and narrative momentum through controlled imbalance, atmospheric depth, refined lighting, and striking visual storytelling, reminiscent of Orson Welles and Gregg Toland, inspired by The Third Man and Citizen Kane.",
        "category": "Photography"
    },
    {
        "name": "Film Noir",
        "imageFile": "Film Noir_00001_.jpg",
        "prompt": "A shadow-drenched visual language built on dramatic chiaroscuro lighting and stark high-contrast monochrome cinematography, where hard-edged pools of illumination carve space from surrounding darkness, a morally ambiguous tonal palette framed through dutch angles and disorienting compositions, persistent atmospheric haze diffusing harsh light sources, gritty urban spatial dynamics defined by reflective wet surfaces and sharp architectural silhouettes, and a haunting, claustrophobic mood where visual tension emerges through the interplay of extreme light and absolute darkness. Influenced by: classic Hollywood noir cinematography, German Expressionist lighting techniques, hardboiled visual aesthetic, 1940s-50s monochrome film stock, chiaroscuro painting tradition, urban night photography.",
        "category": "Photography"
    },
    {
        "name": "Fish-Eye Photography",
        "imageFile": "Fish-Eye Photography_00001_.jpg",
        "prompt": "A dramatically distorted photographic technique built on an ultra-wide spherical field of view that curves straight lines into pronounced convex bowing, an exaggerated sense of depth that pushes the center forward while compressing the periphery into curved recession, a heightened, immersive perspective that feels expansive and slightly disorienting, meticulous edge-to-edge sharpness typical of the lens's extreme depth of field, and a playful, surreal spatial distortion that transforms ordinary framing into something vividly exaggerated. Influenced by: fisheye-lens photographic tradition, ultra-wide-angle technique, skateboard and action-sports photography practice, experimental distortion-lens method.",
        "category": "Photography"
    },
    {
        "name": "Hitchcockian Photo",
        "imageFile": "Hitchcockian Photo_00001_.jpg",
        "prompt": "A meticulously composed suspense-driven photographic style built on deliberate, controlled framing that withholds and reveals information with calculated precision, dramatic, high-contrast lighting that isolates the subject within tense, shadow-heavy surroundings, a voyeuristic, slightly elevated or through-window vantage that implies watching rather than direct confrontation, an unhurried, deliberate stillness charged with mounting psychological tension, and a masterful, cinematic suspense built entirely through composition and restraint rather than overt spectacle. Influenced by: Alfred Hitchcock cinematography tradition, suspense-thriller visual technique, voyeuristic framing practice, classic Hollywood tension-building method.",
        "category": "Photography"
    },
    {
        "name": "Instagram Model Glamour Photography",
        "imageFile": "Instagram Model Glamour Photography_00001_.jpg",
        "prompt": "A polished, aspirational glamour-photography style built on soft, evenly diffused lighting that flatters skin with a warm, flawless glow, confident curve-forward posing shot with a slight low angle for a flattering elongated silhouette, glossy heavy retouching that smooths texture while keeping a believable, photographic sheen, gentle golden-hour warmth or clean bright-studio evenness depending on setting, and a polished, algorithm-friendly commercial appeal built for maximum aspirational impact. Influenced by: contemporary Instagram influencer photography, commercial glamour retouching technique, social-media beauty content, golden-hour portrait lighting.inspired by Demi Rose photoshoot, Amouranth Stream, Emily Ratajkowski glamour photo,",
        "category": "Photography"
    },
    {
        "name": "Low-Key Photography",
        "imageFile": "Low-Key Photography_00001_.jpg",
        "prompt": "A moody, dramatically shadowed photographic style built on a single dominant light source that carves the subject out of near-total darkness, a narrow, concentrated tonal range weighted heavily toward deep shadow with only selective highlight breaking through, sharp falloff that lets form dissolve quickly into blackness at the edges, a hushed, introspective intensity carried through restrained, deliberate exposure, and a polished, cinematic gravitas that feels intimate, mysterious, and controlled. Influenced by: low-key studio photography technique, film-noir lighting tradition, chiaroscuro photographic method, dramatic portrait lighting practice.",
        "category": "Photography"
    },
    {
        "name": "Motion Blur Photography",
        "imageFile": "Motion Blur Photography_00001_.jpg",
        "prompt": "A dynamic, energy-charged photographic style built on deliberate exposure duration that lets movement smear and streak across the frame, sharp, frozen focal elements contrasted against surrounding blurred trails of motion, a kinetic, directional smearing that visually encodes speed and momentum into the still image, unpredictable, organic streaking that varies with the pace and path of movement, and a visceral, immersive sense of velocity that makes stillness itself feel alive with implied motion. Influenced by: long-exposure motion-photography technique, panning-shot photographic practice, kinetic sports-photography method, experimental shutter-speed technique.",
        "category": "Photography"
    },
    {
        "name": "Neon Photography",
        "imageFile": "Neon Photography_00001_.jpg",
        "prompt": "A vivid, high-contrast photographic style built on intense directional glow radiating from concentrated luminous sources, deep, engulfing shadow surrounding pockets of saturated brilliance, sharp reflective bounce catching and refracting colored light across every plane, an electric, nocturnal energy carried through dramatic tonal extremes, and a moody, atmospheric vibrancy that feels charged, urban, and unmistakably after-dark. Influenced by: neon-noir photography tradition, urban night-photography technique, gel-lighting cinematic practice, contemporary nightlife-photography method.",
        "category": "Photography"
    },
    {
        "name": "Night Photography",
        "imageFile": "Night Photography_00001_.jpg",
        "prompt": "A moody, low-light photographic style built on deep, engulfing darkness broken only by isolated pockets of available illumination, long, patient exposure logic that gathers scarce light into soft, glowing pools, a hushed, quiet stillness carried through the extended time required to capture the scene, subtle grain and reduced dynamic range typical of low-light capture rather than artificial correction, and a contemplative, nocturnal atmosphere that feels intimate, mysterious, and quietly suspended in time. Influenced by: available-light night-photography tradition, long-exposure technique, urban nocturne photographic practice, low-light documentary method.",
        "category": "Photography"
    },
    {
        "name": "Rembrandt-Inspired Photography",
        "imageFile": "Rembrandt-Inspired Photography_00001_.jpg",
        "prompt": "A masterfully lit classical portrait-photography style built on single-source \"Rembrandt lighting\" that carves a small triangular highlight beneath one eye against an otherwise shadowed face emphasizing beauty, deep warm chiaroscuro tones bathing the frame in umber, gold, and near-black, richly textured skin and fabric rendered with painterly tonal depth rather than flat exposure, minimal dark backgrounds that isolate the subject in contemplative stillness, and a quiet gravitas translated into modern photographic technique. Influenced by: Rembrandt van Rijn, chiaroscuro lighting technique, classical portrait painting, fine-art studio photography.,",
        "category": "Photography"
    },
    {
        "name": "Sin City Photography",
        "imageFile": "Sin City Photography_00001_.jpg",
        "prompt": "A stark, high-contrast black-and-white photographic style with razor-sharp shadow-to-highlight extremes, deep inky blacks pooling around a single dramatically lit subject, one isolated element rendered in bold selective color against the otherwise monochrome frame, and a hardboiled, pulp-noir cinematic tension dripping with danger and seduction. Influenced by: Sin City (Robert Rodriguez/Frank Miller), film noir cinematography, Frank Miller graphic novel art, chiaroscuro photography lighting.",
        "category": "Photography"
    },
    {
        "name": "Sitcom Still",
        "imageFile": "Sitcom Still_00001_.jpg",
        "prompt": "A bright, evenly lit multi-camera photographic style built on flat, shadow-minimizing illumination that keeps every plane clearly and consistently visible, a clean, high-key exposure logic prioritizing legibility over dramatic mood, static, proscenium-adjacent framing that favors clarity and coverage over cinematic composition, an unhurried, staged stillness carried through deliberate, evenly balanced lighting setups, and a familiar, comfortably lit television-studio polish rooted in decades of broadcast-comedy production tradition. Influenced by: multi-camera sitcom lighting tradition, television-studio production practice, broadcast three-point lighting technique, classic American TV-comedy visual convention.",
        "category": "Photography"
    },
    {
        "name": "Stranger Things-Inspired Art",
        "imageFile": "Stranger Things-Inspired Art_00001_.jpg",
        "prompt": "A moody, atmospheric illustration style built on thick, engulfing haze that swallows peripheral detail while a single dramatic source pierces through with sharp, saturated intensity, a nostalgic, retro-cinematic grain layered over the entire composition, tense, low-angle framing that charges ordinary space with looming unease, a deliberate contrast between soft ambient glow and harsh directional flare, and a suspenseful, synth-scored nostalgia that feels equal parts childhood wonder and creeping dread. Influenced by: 1980s horror-cinema visual tradition, retro VHS film-grain technique, practical-effects horror lighting practice, synth-era genre-film aesthetic.",
        "category": "Photography"
    },
    {
        "name": "Surveillance Camera Photo",
        "imageFile": "Surveillance Camera Photo_00001_.jpg",
        "prompt": "A detached, utilitarian photographic style built on flat, unflattering illumination typical of fixed automated capture rather than deliberate lighting design, a grainy, low-resolution degradation inherent to compressed continuous recording, a wide, slightly distorted angle characteristic of fixed elevated positioning, a clinical, indifferent framing that feels observed rather than composed, and a cold, detached authenticity that carries an unmistakably impersonal, institutional quality. Influenced by: closed-circuit surveillance-camera technique, low-resolution CCTV footage aesthetic, fixed-angle security-camera practice, found-footage documentary method.",
        "category": "Photography"
    }
];

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
    'Design',
    'Comic and Western Mangas',
    'Sketch and Cartoon',
    'Anime and Manga',
    'Painting and Fine Art',
    'Photography'
];

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
    let filteredLoras = LORA_DATA;
    if (query) {
        filteredLoras = LORA_DATA.filter(l =>
            l.name.toLowerCase().includes(query) ||
            (l.prompt && l.prompt.toLowerCase().includes(query)) ||
            (l.trigger && l.trigger.toLowerCase().includes(query))
        );
    }
    if (filteredLoras.length === 0 || (currentLightboxState.item && !filteredLoras.some(l => l.name === currentLightboxState.item.name))) {
        return LORA_DATA;
    }
    return filteredLoras;
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
    const currentTheme = currentLoraStyle === 'default' ? 'fantasy' : currentLoraStyle;
    const varIdx = PROMPT_VARIATIONS.findIndex(v => v.theme === currentTheme && v.substyle === currentLoraSubstyle);
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

function initStylesThemeSelector() {
    const selector = document.getElementById('styles-style-selector');
    if (!selector) return;

    const primaryBtns = selector.querySelectorAll('.lora-style-btn');
    const substyleBtns = selector.querySelectorAll('.lora-substyle-btn');
    const promptToggle = document.getElementById('styles-prompt-toggle');
    const promptDrawer = document.getElementById('styles-prompt-drawer');
    const copyPromptBtn = document.getElementById('btn-copy-styles-prompt');

    primaryBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const theme = btn.dataset.styleTheme;
            primaryBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            currentStyleTheme = theme;
            updateStylesPromptContent();
            collapseStylePanel(true);
            updateStyleImages();
        });
    });

    substyleBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const substyle = btn.dataset.styleSubstyle;
            substyleBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            currentStyleSubstyle = substyle;
            updateStylesPromptContent();
            collapseStylePanel(true);
            updateStyleImages();
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
// LoRA DATA & GALLERY
// ==============================================

const LORA_DATA = [
    {
        name: "004 - Midnight Gouache",
        file: "004 - Midnight Gouache.jpg",
        triggerWords: "n0vuschr0ma style, gouache painting.",
        description: `A gouache painting style with a dominant midnight blue color palette with pink accents. It often adds botanical patterns to backgrounds and surfaces. Tends toward minimalism if an entire scene isn't requested. Subjects tend to be cute and cartoony. The trigger is n0vuschr0ma style, and you can add "gouache painting" to enhance the painterly effect.`,
        civitaiLink: "https://civitai.red/models/2798635/004-midnight-gouache?modelVersionId=3154735"
    },
    {
        name: "164 - Oil Pastels",
        file: "164 - Oil Pastels.jpg",
        triggerWords: "n0vuschr0ma style, oil pastels illustration.",
        description: `This is a version of oil pastels that looks quite different from Krea 2's default. This one uses thicker strokes, more waxy looking blending, grain that shows the background paper, has less fine detail, and more vibrant colors. I get the most consistent results using both the trigger "n0vuschr0ma style" and "oil pastels illustration". It could also be used for crayon illustrations.

This particular version does more of a stylized cute cartoonish look for characters.`,
        civitaiLink: "https://civitai.red/models/2831588/164-oil-pastels?modelVersionId=3195213"
    },
    {
        name: "301 - World of Plush",
        file: "301 - World of Plush.jpg",
        triggerWords: "n0vuschr0ma style",
        description: `This LoRA gives almost everything in the scene a soft plush texture. The exceptions are typically liquids like water, smooth surfaces like glass or screens, and sometimes grass or tiles.

Only the trigger "n0vuschr0ma style" is required. You don't need to ask for plush in your prompt. Omitting it makes it easier to do landscapes or interiors if you don't want animals or people in them. In experiments, entire scenes with other fabric materials like knitted yarn or felt were possible by turning down the weight.`,
        civitaiLink: "https://civitai.red/models/2836493/301-world-of-plush"
    },
    {
        name: "60s Psychedelic Movie",
        file: "60s Psychedelic Movie.jpg",
        triggerWords: "ArsMovieStill, movie still from a 60s psychedelic movie",
        description: `This LoRA tries to take you into a 60s psychedelic movie.

V2 Update: The training dataset has been expanded by 300%, significantly increasing its scope. This update enhances the range of scenes and characters, offering greater flexibility.`,
        civitaiLink: "https://civitai.red/models/878199/60s-psychedelic-movie?modelVersionId=3129133"
    },
    {
        name: "1041uuu TOYOI Yuuta Style",
        file: "1041uuu TOYOI Yuuta Style.jpg",
        triggerWords: "@1041uuu, pixel art",
        description: `This is the initial release of the LoRA trained by @1041uuu (TOYOI Yuuta) pixel artworks.

Pixel perfection is NOT guaranteed. This LoRA is incompatible with the Pixelate x4 VAE. For best results, generate at 512x512 or higher using base-v01 with 30 steps / 5 CFG and EulerER_SDE / Simple.

Recommended Weight: 1.0
Optional Positive Prompts: jaggy lines, dithering, no lineart, limited palette
Optional Negative Prompts: jpeg artifacts, isometric, letterboxed, pillarboxed, dated`,
        civitaiLink: "https://civitai.red/models/2689816/1041uuu-toyoi-yuuta-style?modelVersionId=3104005"
    },
    {
        name: "acyantree - Artist Style",
        file: "acyantree - Artist Style.jpg",
        triggerWords: "@acyantree",
        description: `Trigger words: @acyantree`,
        civitaiLink: "https://civitai.red/models/2834724/acyantree-artist-style?modelVersionId=3199096"
    },
    {
        name: "ADILSON FARIAS style",
        file: "ADILSON FARIAS style.jpg",
        triggerWords: "ADILSON FARIAS style watercolor illustration,",
        description: `adilson farias style watercolor illustration, cartoon style, a whimsical grumpy scene`,
        civitaiLink: "https://civitai.red/models/2838491/adilson-farias-style?modelVersionId=3203851"
    },
    {
        name: "Akira Style",
        file: "Akira Style.jpg",
        triggerWords: "Retro Anime Style.",
        description: `Akira Style Lora for Krea 2.

Recommended Strength: 0.7

Example Prompt: "retro anime style image of runaway girl in a torn school jacket with a tense posture inside a crowded neon street market beneath massive concrete overpasses, with hot neon red, dirty concrete gray, and electric blue accents, with the background kept secondary to the subject."

Tip: You don't need more style tags than "retro anime style"`,
        civitaiLink: "https://civitai.red/models/2740599/retro-anime-akira-style?modelVersionId=3082075"
    },
    {
        name: "Alexander Mokhov",
        file: "Alexander Mokhov.jpg",
        triggerWords: "AM0khov Style",
        description: `Weights: 0.5 - 1.0 - Lower the weight if you use other LoRAs with it.`,
        civitaiLink: "https://civitai.red/models/2849314/alexander-mokhov-artist-style-or-krea-2"
    },
    {
        name: "Alexandre Benois \u2014 Mir Iskusstva",
        file: "Alexandre Benois \u2014 Mir Iskusstva.jpg",
        triggerWords: "No trigger words.",
        description: `LoRA trained on the complete artistic legacy of Alexandre Benois (1870\u20131960): paintings, watercolours, gouache, pastels, theatre sketches and book illustrations. The model captures his elegant World of Art (Mir Iskusstva) manner \u2014 the nostalgic Versailles and 18th-century Petersburg scenes, the Ballets Russes costume designs, the Pushkin illustrations, and the refined graphic line over translucent washes.

The Manner: 18th-century court of Louis XIV and Louis XV, Versailles, Watteau, the French Rococo rendered with archaeological precision and deep melancholy. Petersburg panoramas, theatrical vision, translucent layering, pastel palette, nostalgia as method, stylised historicism, graphic precision, masked balls and masquerades, book illustration.

Recommended LoRA weight: 0.85\u20131.0`,
        civitaiLink: "https://civitai.red/models/2850302/alexandre-benois-mir-iskusstva-or-paintings-and-graphics-or-lora-krea2-turbo"
    },
    {
        name: "Alphonse Mucha",
        file: "Alphonse Mucha.jpg",
        triggerWords: "@alphonse mucha, year 1896, art nouveau",
        description: `This LoRA was trained on all 171 Alphonse Mucha artworks registered on WikiArt. The dataset includes not only Mucha's famous Art Nouveau decorative style, but also other types of works such as self-portraits, sculptures, and oil paintings.

The recognizable "Art Nouveau decorative elements" tend to appear quite strongly, and those decorations are often generated in circular or ring-like patterns.`,
        civitaiLink: "https://civitai.red/models/2816430/alphonse-mucha"
    },
    {
        name: "Arcane Style",
        file: "Arcane Style.jpg",
        triggerWords: "arcanekreastyle",
        description: `Arcane Style \u2014 League of Legends LoRA
Cinematic visuals inspired by the world of Arcane. Hand-painted textures and detailed brushwork. Dark, atmospheric cities with rich environments. Dramatic lighting and vibrant color contrasts. Expressive characters with realistic facial features. Dynamic action scenes and powerful compositions. Stylized 3D animation with a painterly finish. Steampunk, magic, and industrial aesthetics.`,
        civitaiLink: "https://civitai.red/models/2815410/arcane-style?modelVersionId=3175347"
    },
    {
        name: "Art illustration Chizhikov (\u0427\u0438\u0436\u0438\u043A\u043E\u0432)",
        file: "Art illustration Chizhikov (\u0427\u0438\u0436\u0438\u043A\u043E\u0432).jpg",
        triggerWords: "vintage children book illustration, watercolor, ink, gouache, warm colors, paper texture, expressive.",
        description: `This LoRA captures the unique, warm, and incredibly nostalgic style of vintage children's book illustrations by the legendary Soviet artist Viktor Chizhikov. Perfect for generating images in the style of classic Soviet fairy tales, storybook characters, vintage greeting cards, and cozy, heartwarming illustrations.

The style is characterized by soft watercolor and gouache textures, expressive ink linework, warm pastel tones, and that special "cozy" atmosphere.

Prompting Tips: Add keywords like vintage children book illustration, watercolor, ink, gouache, warm colors, paper texture, expressive.`,
        civitaiLink: "https://civitai.red/models/2770208/art-illustration-chizhikov-chizhikov-krea-2?modelVersionId=3151012"
    },
    {
        name: "atmospheric photography",
        file: "atmospheric photography.jpg",
        triggerWords: "No trigger words.",
        description: `It is good at creating an emotional photography style through dramatic light and shadow layers and intense color collisions.`,
        civitaiLink: "https://civitai.red/models/2775666/atmospheric-photography?modelVersionId=3125499"
    },
    {
        name: "Baichuan Baichuan Style",
        file: "Baichuan Baichuan Style.jpg",
        triggerWords: "@baichuan_baichuan",
        description: `Based on baichuan_baichuan's style.

Suggested strength: 0.8-1.00 when used alone.`,
        civitaiLink: "https://civitai.red/models/2633330/baichuan-baichuan-style-animakrea2?modelVersionId=3223144"
    },
    {
        name: "Berni Wrightson Illustrations from Frankenstain style",
        file: "Berni Wrightson Illustrations from Frankenstain style.jpg",
        triggerWords: "bwrightson, highly detailed black and white ink engraving, masterful dense cross-hatching with varied directional lines, intricate parallel and cross-hatch textures, extreme chiaroscuro with deep blacks and dramatic highlights, heavy expressive linework, raw engraved texture.",
        description: `This must be my favorite lora I have trained in a while, it produces beautiful detailed pen and ink illustrations. You can go with black & white, dataset was Berni's Wrightson illustrations for Frankenstein book which are B&W or describe the colors its awesome either way. As usually lower strength of character lora for the style to take over.`,
        civitaiLink: "https://civitai.red/models/2524467/berni-wrightson-illustrations-from-frankenstain-style"
    },
    {
        name: "Bruce Timm - Naughty and Nice The Good Girl Art of Bruce Timm",
        file: "Bruce Timm - Naughty and Nice The Good Girl Art of Bruce Timm.jpg",
        triggerWords: "brucetimm_style, illustration of",
        description: `Trained on Krea2.
Best result with weight between: 0.8-1`,
        civitaiLink: "https://civitai.red/models/2843849/bruce-timm-naughty-and-nice-the-good-girl-art-of-bruce-timm-style-krea2-lora?modelVersionId=3210638"
    },
    {
        name: "Cartoon style of Rapunzel's Tangled Adventure",
        file: "Cartoon style of Rapunzel's Tangled Adventure.jpg",
        triggerWords: "No trigger words needed.",
        description: `This model is intended to imitate the animated art style of the series Rapunzel's Tangled Adventure.`,
        civitaiLink: "https://civitai.red/models/828762/cartoon-style-of-rapunzels-tangled-adventure?modelVersionId=3217911"
    },
    {
        name: "Chenbo (Bo Chen)",
        file: "Chenbo (Bo Chen).jpg",
        triggerWords: "@chenbo",
        description: `Trigger words: @chenbo`,
        civitaiLink: "https://civitai.red/models/2743871/chenbo-bo-chen-artist-style?modelVersionId=3138651"
    },
    {
        name: "Cinematic Dark Lighting",
        file: "Cinematic Dark Lighting.jpg",
        triggerWords: "A dimly lit scene featuring",
        description: `LoRA designed to create cinematic dark lighting effect while maintaining subject clarity. It helps eliminate flat lighting and adds a more moody, storytelling feel to images.

Krea2 Triggers: A dimly lit scene featuring a or A dimly lit photograph featuring a
Weight: 0.6-0.8`,
        civitaiLink: "https://civitai.red/models/2477155/cinematic-dark-lighting?modelVersionId=3167935"
    },
    {
        name: "Cinematic Shot",
        file: "Cinematic Shot.jpg",
        triggerWords: "cinematic, cinematic still image.",
        description: `Trigger words: cinematic, cinematic still image.`,
        civitaiLink: "https://civitai.red/models/432586/cinematic-shot?modelVersionId=3085969"
    },
    {
        name: "Clyde Caldwell Style",
        file: "Clyde Caldwell Style.jpg",
        triggerWords: "oilpainting by clyde caldwell.",
        description: `Bring back the unmistakable vibe of 80s and 90s high-fantasy art! This LoRA is trained on the iconic artistic style of Clyde Caldwell, legendary for his classic cover artworks for Dungeons & Dragons (D&D), Dragonlance, and Ravenloft.`,
        civitaiLink: "https://civitai.red/models/2751976/clyde-caldwell-style-krea-2?modelVersionId=3096079"
    },
    {
        name: "cocokana artstyle",
        file: "cocokana artstyle.jpg",
        triggerWords: "cocokana Digital anime-style",
        description: `Krea 2:
Checkpoint: krea2_turbo_int8_convrot
Cfg: 1
Steps: 8`,
        civitaiLink: "https://civitai.red/models/2499881/cocokana-artstyle?modelVersionId=3210873"
    },
    {
        name: "Concept Art like Yoshitaka Amano",
        file: "Concept Art like Yoshitaka Amano.jpg",
        triggerWords: "Concept art",
        description: `A LoRA to emulate the style of Yoshitaka Amano in creating the artwork for various classic Final Fantasy videogames.

Write concept art, and maybe watercolor-style or something like that, to be sure.`,
        civitaiLink: "https://civitai.red/models/2830669/concept-art-like-yoshitaka-amano?modelVersionId=3196755"
    },
    {
        name: "Crazy Character Design Rubber Hose Animation",
        file: "Crazy Character Design Rubber Hose Animation.jpg",
        triggerWords: "No trigger word needed.",
        description: `Vintage cartoons and rubber hose animation from the 1930s mixed with modern pop surrealism and lowbrow art. Character Design: Anthropomorphic objects (telephones, food, elements), exaggerated and flexible body proportions, expressive eyes, grotesque yet charismatic facial features, dynamic and absurd poses. Technique and Textures: Thick ink outlines, cel shading, glossy highlights, film grain texture, aged paper effect, chromatic aberration, and retro printing. Color palette: Either bright, saturated neon colors with high contrast or muted vintage tones (dusty greens, ochers, faded reds). Mood: Energetic, chaotic, humorous, surreal, and slightly spooky.`,
        civitaiLink: "https://civitai.red/models/2815349/crazy-character-design-rubber-hose-animation?modelVersionId=3175267"
    },
    {
        name: "D&D Painterly (Clean)",
        file: "D&D Painterly (Clean).jpg",
        triggerWords: "D&D Painterly.",
        description: `This LoRA captures the rich, atmospheric aesthetic of tabletop RPG character art with painterly brushwork and cinematic lighting. Detailed armor and gear rendered in warm colors, candlelit taverns, and misty forest clearings. Invoking the classic "character sheet illustration" quality where every portrait tells a story.

The dataset of "D&D Painterly" has been additionally processed and captioned with different VL.`,
        civitaiLink: "https://civitai.red/models/2140417/dandd-painterly-clean"
    },
    {
        name: "Dan Mora Chavez Style",
        file: "Dan Mora Chavez Style.jpg",
        triggerWords: "In the style of Dan Mora Chavez",
        description: `Recommended Prompt
Include the trigger naturally at the beginning of your prompt, for example:

In the style of Dan Mora Chavez. A heroic knight standing atop ancient castle ruins at sunrise, flowing cape, intricate armor, cinematic backlighting, dynamic perspective, vibrant colors, crisp linework, highly detailed digital comic illustration.

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
        name: "Disney Animation Style",
        file: "Disney Animation Style.jpg",
        triggerWords: "disney_animation_style,",
        description: `Trigger words: disney_animation_style,`,
        civitaiLink: "https://civitai.red/models/2840506/disney-animation-style"
    },
    {
        name: "dndstyle \u2014 D&D fantasy illustration [Krea 2]",
        file: "dndstyle \u2014 D&D fantasy illustration [Krea 2].jpg",
        triggerWords: "dndstyle",
        description: `Classic tabletop-rulebook fantasy illustration style for Krea 2. Dramatic character-first compositions, painted armor and scale texture, torchlit dungeons, golden-hour battlefields \u2014 the look of a modern D&D sourcebook plate. Style only: no characters baked in, so your subjects stay yours.

USAGE \u2014 Trigger: dndstyle (put it at the start of your prompt). Strength 1.0 default; forgiving from 0.5 (light fantasy grade) to 2.0 (full homage). Prompt in natural language (Qwen3-VL encoder), not tag soup.

PAIRS WELL WITH \u2014 brushcelstyle, a painterly semi-3D LoRA: chain both LoraLoaderModelOnly nodes and use both triggers: dndstyle 1.0 + brushcelstyle 0.7 for illustration-first, 0.7 / 1.0 for painterly-first, 0.8 / 0.8 balanced.`,
        civitaiLink: "https://civitai.red/models/2749607/dndstyle-dandd-fantasy-illustration-krea-2?modelVersionId=3093121"
    },
    {
        name: "Engraving Cross Hatching Style",
        file: "Engraving Cross Hatching Style.jpg",
        triggerWords: "@cr00shatch, A highly detailed engraving-style portrait.",
        description: `This LoRA excels at mixing monochrome with a single striking color. Use selective coloring: monochromatic sepia tones or monochrome foreground with vivid color pops (e.g., vivid cyan beam of light, vivid pink melted ice cream, vivid red flames).

Mood & Composition: allegorical narrative, intense and ominous, quiet tension drives dramatic, theatrical, and highly expressive poses. visceral suffering / macabre: Good for darker, gothic, or dark fantasy concepts.`,
        civitaiLink: "https://civitai.red/models/2627909/engraving-cross-hatching-style-or-krea-2-anima?modelVersionId=3180812"
    },
    {
        name: "Expressive Euro Cartoon",
        file: "Expressive Euro Cartoon.jpg",
        triggerWords: "like comic, 2d, flat color",
        description: `Strength: 1.0 - 1.5.

A bit tricky on Krea2 because of prompt adherence or god knows what:

- If you try to use words that creates realism, you will absolutely need 1.5 strength
- If you try to use known celebrity fanart words with specific styling like Disney Princesses then you will need 1.2+ strength.
- If above two is False then 1.0 is enough in most cases.`,
        civitaiLink: "https://civitai.red/models/2694211/expressive-euro-cartoon?modelVersionId=3133709"
    },
    {
        name: "Fantasy Impressions",
        file: "Fantasy Impressions.jpg",
        triggerWords: "velnari",
        description: `"Fantasy Impressions" is a LoRA that combines the subtleties of artistic illustration, vivid fantasy motifs and unique painting styles. Ideal for creating stunning female portraits, unusual creatures, as well as fantastic scenes with exquisite detail.

This LORA can be used with or without trigger words to enhance the effect. To use WITHOUT TRIGGERS, increase the LORA weight to 1 or slightly higher. But for best results, use trigger words.`,
        civitaiLink: "https://civitai.red/models/1096987/fantasy-impressions?modelVersionId=3161907"
    },
    {
        name: "Flat Illustration",
        file: "Flat Illustration.jpg",
        triggerWords: "An illustration of",
        description: `A quick Krea 2 LoRA trained on a handful of images in a flat anime/flat illustration style. No trigger word necessary. Prefacing generations with "An illustration of..." works well. 1.0 strength, and seems to pair well with both other SFW and NSFW LoRAs.`,
        civitaiLink: "https://civitai.red/models/2744176/krea-2-flat-illustrationanime-style?modelVersionId=3086495"
    },
    {
        name: "Fleischer Studio Style",
        file: "Fleischer Studio Style.jpg",
        triggerWords: "Fleischer Style.",
        description: `This LoRA is designed to recreate the unmistakable charm of vintage Fleischer-inspired animation, bringing the lively energy of 1930s theatrical cartoons into your generations.

The style features bold black outlines, exaggerated expressions, rubber-hose movement, rounded character designs, and richly painted storybook backgrounds. Expect expressive characters with large eyes, dramatic gestures, elastic poses, oversized gloves, and simplified shapes. Colors are vivid yet slightly aged.

The goal is to capture the spirit of early theatrical cartoons: whimsical, energetic, theatrical, and occasionally a little eerie. Works especially well for fairy tales, fantasy adventures, anthropomorphic animals, comedic villains, musical scenes, and reimagined classic stories.`,
        civitaiLink: "https://civitai.red/models/2817646/fleischer-studio-style?modelVersionId=3178066"
    },
    {
        name: "Francisco Goya \u2014 Paintings & Etchings",
        file: "Francisco Goya \u2014 Paintings & Etchings.jpg",
        triggerWords: "No trigger word needed.",
        description: `Trigger words: No trigger word needed.`,
        civitaiLink: "https://civitai.red/models/2849706/francisco-goya-paintings-and-etchings-or-zhivopis-i-grafika?modelVersionId=3217866"
    },
    {
        name: "Frank Cho Comic Book Style",
        file: "Frank Cho Comic Book Style.jpg",
        triggerWords: "No trigger words needed.",
        description: `A comic book style LoRA inspired by the artwork of Frank Cho. Best results are usually achieved at strengths between 0.75 and 1.0. No trigger word is required.`,
        civitaiLink: "http://civitai.red/models/2788873/frank-cho-comic-book-style?modelVersionId=3142592"
    },
    {
        name: "Frank Frazetta style",
        file: "Frank Frazetta style.jpg",
        triggerWords: "painting, FrankFrazetta.",
        description: `Trigger words: painting, FrankFrazetta.`,
        civitaiLink: "https://civitai.red/models/2734696/frank-frazetta-style?modelVersionId=3074818"
    },
    {
        name: "Frank Frazetta Style Oil Painting",
        file: "Frank Frazetta Style Oil Painting.jpg",
        triggerWords: "frazetta style dark fantasy oil painting",
        description: `Trained to match the style of oil paintings by the legendary Frank Frazetta.

Krea 2 - Good Starting Prompt: Frazetta style dark fantasy oil painting.
.9 is great but anything after .5 usually has good results.`,
        civitaiLink: "https://civitai.red/models/657789/frank-frazetta-style-oil-painting-krea2-flux?modelVersionId=3096520"
    },
    {
        name: "Friendly Sketch",
        file: "Friendly Sketch.jpg",
        triggerWords: "an illustration of",
        description: `Apply a friendly, warm style to your Krea 2 illustrations.

No trigger word needed. 1.0 strength, but try 0.8 to 1.3 for cool variations. Mixes well with character LoRAs or second style LoRAs. Using happiness, laughing, smiling etc. gets the best results \u2014 it's built to be friendly!

If you run into trouble, try raising the strength in 0.1 increments, add words like "an illustration of..." to the start of your prompt, and remove any leftover camera hardware words.`,
        civitaiLink: "https://civitai.red/models/2756662/friendly-sketch-krea2"
    },
    {
        name: "Ghibli style (Kiki's Delivery Service)",
        file: "Ghibli style (Kiki's Delivery Service).jpg",
        triggerWords: "ghibli style",
        description: `KREA 2
Turbo model, Euler / simple / 8 steps / CFG 1
768x1152, Lora strength of 1.3`,
        civitaiLink: "https://civitai.red/models/523485/ghibli-style-kikis-delivery-service?modelVersionId=3084641"
    },
    {
        name: "Greg Capullo Style",
        file: "Greg Capullo Style.jpg",
        triggerWords: "A color illustration by Greg Capullo. The illustration uses outlines and black shadows and light source. It has been digitally inked and colored.",
        description: `It is possible to generate sketch style with this lora:
"A pencil illustration by Greg Capullo.", Color illustration by Greg Capullo.`,
        civitaiLink: "https://civitai.red/models/2259942/greg-capullo-style?modelVersionId=3184522"
    },
    {
        name: "Hollow Void",
        file: "Hollow Void.jpg",
        triggerWords: "No trigger word needed.",
        description: `A fantastical style inspired by hollowvoidly on Tumblr.

When prompting use words like: surreal, dark, fog, armor, wizard, Gothic-style, halftone, castle, eerie atmosphere etc.

To keep the finer details and noise, recommend using 4x-AnimeSharp or 4x-UltraSharpV2 when doing a second pass or upscale. Avoid latent, nearest, lanczos etc.`,
        civitaiLink: "https://civitai.red/models/2851092/hollow-void?modelVersionId=3219631"
    },
    {
        name: "IdontknowhowtonamethisArtStyle",
        file: "IdontknowhowtonamethisArtStyle.jpg",
        triggerWords: "An angular, 3d art style, with brush stroke color texture",
        description: `Trigger words: An angular, 3d art style, with brush stroke color texture`,
        civitaiLink: "https://civitai.com/models/2781650/idontknowhowtonamethisartstyle"
    },
    {
        name: "Ink Caricature Style of the End Credits of Tangled",
        file: "Ink Caricature Style of the End Credits of Tangled.jpg",
        triggerWords: "No trigger words needed.",
        description: `This LoRA is trained to produce a stylized ink on paper illustrated style.`,
        civitaiLink: "https://civitai.red/models/2841027/ink-caricature-style-of-the-end-credits-of-tangled-krea-2?modelVersionId=3207085"
    },
    {
        name: "Jeff Easley Style - Krea 2",
        file: "Jeff Easley Style - Krea 2.jpg",
        triggerWords: "vintage fantasy oil painting in the style of Jeff Easley",
        description: `It perfectly replicates the legendary oil-painting aesthetic famous for Dungeons & Dragons (AD&D) rulebook covers, fierce dragons, gritty heroes, and atmospheric sword-and-sorcery illustrations.

Recommended Generation Settings:
LoRA Weight: 0.5 - 0.7 (Sweetspot: 0.6)
CFG Scale: 3.5 - 5.5 (Keep it lower for authentic analog hand-painted texture)

Prompting Tips: Mix the trigger phrase with classic dark fantasy keywords:
oil on canvas, cinematic chiaroscuro, heavy shadows, dramatic lighting, detailed armor, dynamic combat stance, retro fantasy book cover illustration.`,
        civitaiLink: "https://civitai.red/models/2765523/jeff-easley-style-krea-2?modelVersionId=3118577"
    },
    {
        name: "Junji Ito Style",
        file: "Junji Ito Style.jpg",
        triggerWords: "jnj style, a black and white drawing.",
        description: `Trigger: "jnj style", "a black and white drawing" or a "colored image".
You can add "heavy cross-hatching" and "screentones" if you prefer.
Sampler/scheduler: er_sde/beta`,
        civitaiLink: "https://civitai.red/models/2781757/junji-ito-style-krea"
    },
    {
        name: "Katsuya Terada style",
        file: "Katsuya Terada style.jpg",
        triggerWords: "katsuyak2style, Dynamic, highly detailed pen-and-ink linework with expressive brush strokes, intricate cross-hatching, fluid anatomy, cinematic composition, bold perspective, organic textures, and a fusion of manga-inspired energy with painterly fantasy realism; dramatic lighting, rich visual storytelling, and meticulous handcrafted detail.",
        description: `Trigger words: katsuyak2style, Dynamic, highly detailed pen-and-ink linework with expressive brush strokes, intricate cross-hatching, fluid anatomy, cinematic composition, bold perspective, organic textures, and a fusion of manga-inspired energy with painterly fantasy realism; dramatic lighting, rich visual storytelling, and meticulous handcrafted detail.`,
        civitaiLink: "https://civitai.red/models/2752263/katsuya-terada-style?modelVersionId=3096446"
    },
    {
        name: "Khyleri - Khyle",
        file: "Khyleri - Khyle.jpg",
        triggerWords: "khyleri_style, illustration of",
        description: `Trained on Krea2.
Best result with weight between: 0.8-1.3`,
        civitaiLink: "https://civitai.red/models/2849403/khyleri-khyle-style-krea2-lora?modelVersionId=3217511"
    },
    {
        name: "KreaZhangXi",
        file: "KreaZhangXi.jpg",
        triggerWords: "Bradhamel art style.",
        description: `Trigger words: Bradhamel art style.`,
        civitaiLink: "https://civitai.red/models/2773746/kreazhangxi?modelVersionId=3123196"
    },
    {
        name: "KyuYong Eom Artist Style",
        file: "KyuYong Eom Artist Style.jpg",
        triggerWords: "KyuY0ng3om Style",
        description: `Weights: 0.5 - 1.0 - Lower the weight if you use other LoRAs with it.`,
        civitaiLink: "https://civitai.red/models/2836652/kyuyong-eom-artist-style-or-krea-2?modelVersionId=3201598"
    },
    {
        name: "Low Poly Pixel Art",
        file: "Low Poly Pixel Art.jpg",
        triggerWords: "a digital low poly pixel art,",
        description: `A type of 3d low poly pixel art.`,
        civitaiLink: "https://civitai.red/models/2851202/low-poly-pixel-art-krea2-style?modelVersionId=3219757"
    },
    {
        name: "Luis Royo (Secrets) dark fantasy style",
        file: "Luis Royo (Secrets) dark fantasy style.jpg",
        triggerWords: "A dark sensual fantasy digital painting in the distinctive style of lroyo, detailed dramatic moody atmosphere with intricate textures and lighting, gothic fantasy elements.",
        description: `Trained on Luis Royo "Secrets" artbook illustrations, strengths: 0.8 - 1.2`,
        civitaiLink: "https://civitai.red/models/2505872/luis-royo-secrets-dark-fantasy-style"
    },
    {
        name: "Manga style (Berserk)",
        file: "Manga style (Berserk).jpg",
        triggerWords: "manga style.",
        description: `Krea 2
Turbo model: 8 steps / CFG 1 & Euler simple
768x1152, x2 Hires (10 steps, 0.35 with 4x_NMKD_Siax)
Lora strength 1.2

Can also do characters: Guts, Casca, Griffith.`,
        civitaiLink: "https://civitai.red/models/743448/manga-style-berserk"
    },
    {
        name: "Manga style (Naoki Urasawa)",
        file: "Manga style (Naoki Urasawa).jpg",
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
        name: "MidJourney chiaroscuro style",
        file: "MidJourney chiaroscuro style.jpg",
        triggerWords: "no trigger word",
        description: `KREA:
Strength: I prefer 1.5
Use Euler / Beta

Example: a low-angle medium shot, painting, from the waist up of`,
        civitaiLink: "https://civitai.red/models/2764520/midjourney-chiaroscuro-style?modelVersionId=3111501"
    },
    {
        name: "Midjourney thick painting style",
        file: "Midjourney\u539A\u6D82\u98CE\u683C  Midjourney thick painting style.jpg",
        triggerWords: "MTP_style, impasto oil painting style.",
        description: `This is a LoRA model leaning toward impasto oil painting style.

Krea2:
Recommended LoRA weight: 0.95
Recommended sampling steps: 8\u201310
Recommended CFG scale: 1.1
Recommended samplers: er_sde, Euler A`,
        civitaiLink: "https://civitai.red/models/2785232/midjourney-or-midjourney-thick-painting-style?modelVersionId=3138012"
    },
    {
        name: "Mike Mignola Style",
        file: "Mike Mignola Style.jpg",
        triggerWords: "MignolaStyle",
        description: `Use the trigger MignolaStyle at the start, don't describe the style.`,
        civitaiLink: "https://civitai.red/models/2841548/mike-mignola-style"
    },
    {
        name: "Modern Fantasy Paint Art",
        file: "Modern Fantasy Paint Art.jpg",
        triggerWords: "No trigger words.",
        description: `Attempt to make a fantasy-oriented style mimicking an atmosphere of TTRPG book art and video game concept and cover art.`,
        civitaiLink: "https://civitai.red/models/2029643/modern-fantasy-paint-art?modelVersionId=3207579"
    },
    {
        name: "Moral Superiority - A Vintage Claymation Inspired Style",
        file: "Moral Superiority - A Vintage Claymation Inspired Style.jpg",
        triggerWords: "m0ralsuperiority",
        description: `Moral Superiority is a style LoRA inspired by vintage public broadcasting and late-night adult television, encapsulating both with smoother textures and HD clarity.

CFG - 1 (if not using turbo adjust)
STEPS - 8 (if not using turbo adjust)

Recommended Resources:
TrashAI's Total Chaos Randomizer WF
DaSiWa Cute Disaster Turbo UC Krea 2 Model`,
        civitaiLink: "https://civitai.red/models/2855630/moral-superiority-a-vintage-claymation-inspired-style-krea2?modelVersionId=3225150"
    },
    {
        name: "motocross saito Style",
        file: "motocross saito Style.jpg",
        triggerWords: "@motocross saito, pixel art",
        description: `Trigger words: @motocross saito, pixel art`,
        civitaiLink: "https://civitai.red/models/2782223/motocross-saito-style?modelVersionId=3133600"
    },
    {
        name: "murata range artstyle",
        file: "murata range artstyle.jpg",
        triggerWords: "murata range digital anime-style illustration",
        description: `Krea 2:
Checkpoint: krea2_turbo_int8_convrot
Cfg: 1
Steps: 8`,
        civitaiLink: "https://civitai.red/models/2838564/murata-range-artstyle?modelVersionId=3203938"
    },

    {
        name: "ogipote\u837Bpote style",
        file: "ogipote\u837Bpote style.jpg",
        triggerWords: "Ogipote style",
        description: `Trigger words: Ogipote style`,
        civitaiLink: "https://civitai.red/models/2529695/ogipotepote-style?modelVersionId=3094753"
    },
    {
        name: "Oil on Canvas - Salvador Dali",
        file: "Oil on Canvas - Salvador Dali.jpg",
        triggerWords: "A surrealist dreamlike painting in the distinctive style of sdali, detailed realistic surreal elements with symbolic dreamlike composition, soft ethereal lighting with dramatic contrasts, intricate textures",
        description: `Trained on around 40 images of Dali paintings. Euler/bong_tangent or beta57 recommended, strength: 0.8-1.2`,
        civitaiLink: "https://civitai.red/models/2655245/oil-on-canvas-salvador-dali"
    },
    {
        name: "oil paint semi-realistic anime style",
        file: "oil paint semi-realistic anime style.jpg",
        triggerWords: "oilpaint_anime semi-realistic",
        description: `Semi-realistic anime style oil painting.`,
        civitaiLink: "https://civitai.red/models/2832835/oil-paint-semi-realistic-anime-style?modelVersionId=3196795"
    },
    {
        name: "Oil Painting - Thomas Gainsborough",
        file: "Oil Painting - Thomas Gainsborough.jpg",
        triggerWords: "Thomas Gainsborough style, late 18th century English painting, oil on canvas.",
        description: `Model trained on around 40 images of Thomas Gainsborough paintings. Results are pleasant but need good description to get real authentic feel of the artist. Play with the strength, probably 0.8-1.2 is the way.`,
        civitaiLink: "https://civitai.red/models/2650650/oil-painting-thomas-gainsborough"
    },
    {
        name: "Pall Wash - A Versatile Dark Fantasy Anime Style",
        file: "Pall Wash - A Versatile Dark Fantasy Anime Style.jpg",
        triggerWords: "pallwash",
        description: `A versatile anime style LoRA with serious range. Confident linework, dramatic lighting, and color that swings from richly saturated to moody and muted depending on what you ask for.

Trigger must come before quality tags (masterpiece, best quality, etc.), not after. Using LESS quality tags = better result.

Heads up: left to its own devices on a sparse prompt, Pall Wash leans surreal and uncanny. Skulls, glowing eyes, unsettling accents show up even when you didn't ask.

Suggested Settings:
DPM++ 2M Karras, or Euler A / Beta 57/Karras
CFG 6\u20136.5, (if using DaSiWa Checkpoints, lower this to 5.0)`,
        civitaiLink: "https://civitai.red/models/2719146/pall-wash-a-versatile-dark-fantasy-anime-style-illanimakrea-2?modelVersionId=3118088"
    },
    {
        name: "Paper flat",
        file: "Paper flat.jpg",
        triggerWords: "chibikrea2style",
        description: `Clean compositions that look like modern vector illustration.

Put the trigger at the start of your prompt, then describe the scene as usual.
Add chibi to push chibi proportions, or omit it for a more standard anime look.
Strength guide: 0.8 \u2014 softer stylization, 1.0 \u2014 full artist flavor.`,
        civitaiLink: "https://civitai.red/models/2851727/stylepaper-flat-anima-krea2?modelVersionId=3220419"
    },
    {
        name: "Path of Exile 2 style",
        file: "Path of Exile 2 style.jpg",
        triggerWords: "poe2k2style",
        description: `Trigger words: poe2k2style`,
        civitaiLink: "https://civitai.red/models/2208918/path-of-exile-2-style?modelVersionId=3099687"
    },
    {
        name: "Retro anime style",
        file: "Retro anime style.jpg",
        triggerWords: "retro anime style.",
        description: `Krea 2
For this one, a really small dataset (7 images) was used so it's overtrained, but it is really closer to the style intended.

Turbo model, 768x1152, Euler / simple / 10 steps / CFG 1`,
        civitaiLink: "https://civitai.red/models/2594665/retro-anime-style?modelVersionId=3118780"
    },
    {
        name: "Retro Ghibli style (Porco Rosso)",
        file: "Retro Ghibli style (Porco Rosso).jpg",
        triggerWords: "ghibli style",
        description: `Turbo model, 768x1152
x1.5 Hires (10 steps, 0.2-0.35 with 4x_foolhardy_Remacri)
Euler / simple / 10 steps / CFG 1
Lora strength 1`,
        civitaiLink: "https://civitai.red/models/1153088/retro-ghibli-style-porco-rosso?modelVersionId=3127101"
    },
    {
        name: "Retro Vintage Comics Style",
        file: "Retro Vintage Comics Style.jpg",
        triggerWords: "No trigger words.",
        description: `This LoRA is trained to reproduce a vintage illustrated comic style, with a focus on detailed line art and minimalist colors.`,
        civitaiLink: "https://civitai.red/models/2802947/retro-vintage-comics-style-krea-2?modelVersionId=3160068"
    },
    {
        name: "Rusted Horizons",
        file: "Rusted Horizons.jpg",
        triggerWords: "horiz4k",
        description: `Rusted Horizons creates a painterly, lived-in science-fiction aesthetic filled with worn spacecraft, dusty settlements, industrial environments, and characters who feel like they are part of a working world.

The style emphasizes visible brushwork, weathered materials, practical clothing, aged machinery, and cinematic environmental storytelling. Its palette leans toward muted greys, blues, and earthy tones, often contrasted with yellow, amber, or orange accents.

Recommended Prompt Starter: Cinematic narrative concept illustration, painterly semi-realistic editorial art, graphic novel style, visible brushwork,`,
        civitaiLink: "https://civitai.red/models/2344157/rusted-horizons?modelVersionId=3089427"
    },
    {
        name: "Satoshi Urushihara style",
        file: "Satoshi Urushihara style.jpg",
        triggerWords: "No trigger words.",
        description: `For that late 80's early 90's anime aesthetic. Trained on Satoshi Urushihara artwork and OVA stills.`,
        civitaiLink: "https://civitai.red/models/7227/satoshi-urushihara-style?modelVersionId=3080191"
    },
    {
        name: "SC\u00C4V\u00CBNG\u00CBR\u00D8",
        file: "SC\u00C4V\u00CBNG\u00CBR\u00D8.jpg",
        triggerWords: "modular armor, hard surface armor, geometric armor plates, panel-based design, industrial armor, mechanical joints, exposed connectors, circular nodes, segmented armor, techwear armor, integrated armor systems,",
        description: `This is a style/concept trained on a large dataset of images of armor and creatures in a soft cyberpunk and post-apocalyptic style.

Krea 2:
Checkpoint: krea2_turbo_int8_convrot
Cfg: 1
Steps: 8`,
        civitaiLink: "https://civitai.red/models/2359209/scavengero-or-styleconcept?modelVersionId=3216411"
    },
    {
        name: "Serpieri Style",
        file: "Serpieri Style.jpg",
        triggerWords: "No trigger words.",
        description: `This LoRA produces a style similar to that of Italian comic book artist Paolo Eleuteri Serpieri. He is best known for his work on the Druuna erotic science fiction series.`,
        civitaiLink: "https://civitai.red/models/651123/serpieri-style?modelVersionId=3181981"
    },
    {
        name: "shitty watercolor style",
        file: "shitty watercolor style.jpg",
        triggerWords: "Watercolor.",
        description: `Krea2
Turbo model, 768x1152
Euler / simple / 10 steps / CFG 1
Lora strength of 1`,
        civitaiLink: "https://civitai.red/models/1030872/shitty-watercolor-style?modelVersionId=3112712"
    },
    {
        name: "Simon Bisley style Anima 1.0",
        file: "Simon Bisley style Anima 1.0.jpg",
        triggerWords: "painting in Simon Bisley style",
        description: `Retrained properly, this is the proper 1.0 version of Simon Bisley style lora. It creates beautiful vivid colorful illustration, especially views are very pretty.

Images are generated with euler+bong + refined with z-image turbo 8 steps on 0.3 no upscale.`,
        civitaiLink: "https://civitai.red/models/2628760/simon-bisley-style-anima-10?modelVersionId=3139812"
    },
    {
        name: "Storybook Folk Art",
        file: "Storybook Folk Art.jpg",
        triggerWords: "whimsical storybook illustration.",
        description: `This model creates whimsical, storybook-inspired folk art with flowing, dreamlike details. Except for Krea 2, the style is easily distracted, so if you want to stay true to it, use the following trigger: "Whimsical, storybook-inspired folk art with flowing, dreamlike details."

Krea 2 Strength: 1.0`,
        civitaiLink: "https://civitai.red/models/1321740/storybook-folk-art?modelVersionId=3199069"
    },
    {
        name: "SXZ Cole Eastburn Style",
        file: "SXZ Cole Eastburn Style.jpg",
        triggerWords: "@colehole style",
        description: `Trigger words: @colehole style`,
        civitaiLink: "https://civitai.red/models/2853562/sxz-cole-eastburn-style-krea2"
    },
    {
        name: "SXZ CrystalBeastie Style",
        file: "SXZ CrystalBeastie Style.jpg",
        triggerWords: "@crystalbeastie",
        description: `Trigger words: @crystalbeastie`,
        civitaiLink: "https://civitai.red/models/2853857/sxz-crystalbeastie-style-krea2?modelVersionId=3223045"
    },
    {
        name: "SXZ Dark Fantasy Style",
        file: "SXZ Dark Fantasy Style.jpg",
        triggerWords: "@drkfnts, film grain",
        description: `Trigger words: @drkfnts, film grain`,
        civitaiLink: "https://civitai.red/models/2845979/sxz-dark-fantasy-style-krea2?modelVersionId=3213270"
    },
    {
        name: "SXZ GTA 6 Style",
        file: "SXZ GTA 6 Style.jpg",
        triggerWords: "@gta6, illustration",
        description: `Trigger words: @gta6, illustration`,
        civitaiLink: "https://civitai.red/models/2851144/sxz-gta-6-style-krea2?modelVersionId=3219690"
    },
    {
        name: "SXZ Will Murai Blizzcon KeyArt Style",
        file: "SXZ Will Murai Blizzcon KeyArt Style.jpg",
        triggerWords: "@willmurai",
        description: `Trigger words: @willmurai`,
        civitaiLink: "https://civitai.red/models/2846061/sxz-will-murai-blizzcon-keyart-style-krea2?modelVersionId=3213378"
    },
    {
        name: "SXZ Xutunzi Style",
        file: "SXZ Xutunzi Style.jpg",
        triggerWords: "@xutzzz, stylized",
        description: `Trigger words: @xutzzz, stylized`,
        civitaiLink: "https://civitai.red/models/2853442/sxz-xutunzi-style-krea2?modelVersionId=3222535"
    },
    {
        name: "The Legend of Zelda Breath of the Wild",
        file: "The Legend of Zelda Breath of the Wild.jpg",
        triggerWords: "botw_style, illustration of",
        description: `Trained on Krea2.
Best result with weight between: 0.8-1

Starting prompts: botw_style, illustration of
Optional prompts: backdrop framed by painterly brushstrokes, cel-shaded anime style. cel-shaded 3D anime art style.`,
        civitaiLink: "https://civitai.red/models/2844663/the-legend-of-zelda-breath-of-the-wild-artwork-painting-style-krea2-lora?modelVersionId=3211633"
    },
    {
        name: "TheDig Adventure - Background Art Style",
        file: "TheDig Adventure - Background Art Style.jpg",
        triggerWords: "This is a digital illustration depicting a",
        description: `A digital-painting style LoRA trained on surreal, otherworldly landscapes \u2014 alien terrain, glowing planets, jagged rock formations and eerie caves rendered in dramatic gradient lighting and rich, saturated color palettes. Best used for atmospheric sci-fi/fantasy scenes with a strong sense of isolation and mystery. The input Images are from the 1995 LucasArts Adventure Game The Dig.`,
        civitaiLink: "https://civitai.red/models/2840095/thedig-adventure-background-art-style?modelVersionId=3205842"
    },
    {
        name: "Tiago Hoisel",
        file: "Tiago Hoisel.jpg",
        triggerWords: "No trigger word needed.",
        description: `Trigger words: No trigger word needed.`,
        civitaiLink: "https://civitai.red/models/2809971/tiago-hoisel?modelVersionId=3168777"
    },
    {
        name: "Tony Sart",
        file: "Tony Sart.jpg",
        triggerWords: "No trigger word needed.",
        description: `Tony Sart ("Tony's Art - art from Sart" project). Russian book illustrator, game designer and concept artist. One of his styles involves imitating the classic illustrations of Ivan Bilibin, featuring their characteristic colors, outlines, and borders. He employs this style in humorous and cultural projects.`,
        civitaiLink: "https://civitai.red/models/2840915/tony-sart?modelVersionId=3206933"
    },
    {
        name: "VALEJO",
        file: "VALEJO.jpg",
        triggerWords: "No trigger words.",
        description: `Trigger words: No trigger words.`,
        civitaiLink: "https://civitai.red/models/1579164/valejo?modelVersionId=3110064"
    },

    {
        name: "YOSHITAKA AMANO - Final Fantasy Style",
        file: "YOSHITAKA AMANO - Final Fantasy Style.jpg",
        triggerWords: "a watercolor illustration in the style of yoshitaka amano",
        description: `Krea 2 Release 06/27/2026

Suggested strength: 0.8-1.2

Been having fun with Krea 2, it works quite well and knows a lot of characters. If using multiple LoRas, lower strength to .8.

Trigger words: Suggested tags: a watercolor illustration in the style of yoshitaka amano`,
        civitaiLink: "https://civitai.red/models/588789/yoshitaka-amano-final-fantasy-style-for-anima-pony-il-krea-2?modelVersionId=3076044"
    },
    {
        name: "Yujin Hare Style",
        file: "Yujin Hare Style.jpg",
        triggerWords: "@YujinHare, Yujin Hare style",
        description: `Based on Yujin Hare's style. A thick paint semi-realistic style.

Suggested strength: 0.8-1.00 when used alone.`,
        civitaiLink: "https://civitai.red/models/2648375/yujin-hare-style-animakrea2?modelVersionId=3202246"
    },
    {
        name: "Zeon (zzeeonn)",
        file: "Zeon (zzeeonn).jpg",
        triggerWords: "zeon_style, illustration of. Clean sharp line art, flat colors with glossy leather highlights, cell shading, minimalist fashion anime illustration, full body shot isolated on a pure white background.",
        description: `Trained on Krea2.
Best result with weight between: 0.8-1.3`,
        civitaiLink: "https://civitai.red/models/2853125/zeon-zzeeonn-style-krea2-lora?modelVersionId=3222121"
    }
];


// ---- Build LoRA Gallery ----

// ---- Build LoRA Gallery ----
let currentExpandedLora = null;
let currentLoraStyle = 'default';     // 'default' | 'fantasy' | 'modern' | 'sci-fi'
let currentLoraSubstyle = 'simple';   // 'simple' | 'complex'

const LORA_STYLE_DIR_MAP = {
    'default': 'default',
    'fantasy': 'fantasy',
    'modern': 'present',
    'sci-fi': 'sci-fi'
};

const LORA_THEME_PROMPTS = THEME_DEMO_PROMPTS;

function getLoraImagePath(lora) {
    if (currentLoraStyle === 'default') {
        return `img/lora/default/${lora.file}`;
    }

    const dir = LORA_STYLE_DIR_MAP[currentLoraStyle];
    const substyle = currentLoraSubstyle;

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
    let filteredLoras = LORA_DATA;
    if (query) {
        filteredLoras = LORA_DATA.filter(l =>
            l.name.toLowerCase().includes(query) ||
            (l.description && l.description.toLowerCase().includes(query)) ||
            (l.triggerWords && l.triggerWords.toLowerCase().includes(query))
        );
    }

    updateSearchBadge(filteredLoras.length, LORA_DATA.length);

    if (filteredLoras.length === 0 && query) {
        const emptyState = document.createElement('div');
        emptyState.className = 'gallery-empty-state';
        emptyState.innerHTML = `
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                <line x1="8" y1="11" x2="14" y2="11"></line>
            </svg>
            <h4>No LoRAs found</h4>
            <p>No LoRAs match "<strong>${escapeHtml(query)}</strong>"</p>
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
        return;
    }

    filteredLoras.forEach((lora) => {
        const index = LORA_DATA.indexOf(lora);
        const card = document.createElement('div');
        card.className = 'lora-card';
        card.id = `lora-card-${index}`;
        card.dataset.loraIndex = index;

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

        const title = document.createElement('div');
        title.className = 'lora-card-title';
        title.textContent = lora.name;
        title.title = `${lora.name}\n\nTrigger Words: ${lora.triggerWords}`;
        card.title = `${lora.name}\n\nTrigger Words: ${lora.triggerWords}`;
        card.appendChild(title);

        card.addEventListener('click', () => handleLoraCardClick(index));

        loraGallery.appendChild(card);
    });
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

    const primaryBtns = selector.querySelectorAll('.lora-style-btn');
    const secondaryRow = document.getElementById('lora-style-secondary');
    const substyleBtns = selector.querySelectorAll('.lora-substyle-btn');
    const promptToggle = document.getElementById('lora-prompt-toggle');
    const promptDrawer = document.getElementById('lora-prompt-drawer');
    const copyPromptBtn = document.getElementById('btn-copy-lora-prompt');

    primaryBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const style = btn.dataset.loraStyle;
            primaryBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            currentLoraStyle = style;

            if (style === 'default') {
                secondaryRow.classList.add('hidden');
            } else {
                secondaryRow.classList.remove('hidden');
                secondaryRow.style.animation = 'none';
                void secondaryRow.offsetWidth;
                secondaryRow.style.animation = '';
            }

            updateLoraPromptContent();
            collapseLoraPanel(true);
            updateLoraImages();
        });
    });

    substyleBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const substyle = btn.dataset.loraSubstyle;
            substyleBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            currentLoraSubstyle = substyle;
            updateLoraPromptContent();
            collapseLoraPanel(true);
            updateLoraImages();
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
function initGalleryTabs() {
    const tabs = document.querySelectorAll('.gallery-tab');
    const hint = document.getElementById('gallery-hint');
    const btnRandom = document.getElementById('gnav-random');
    const btnSelected = document.getElementById('gnav-selected');
    const btnClear = document.getElementById('gnav-clear');
    const stylesStyleSelector = document.getElementById('styles-style-selector');
    const styleCategoryFilters = document.getElementById('style-category-filters');
    const loraStyleSelector = document.getElementById('lora-style-selector');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            collapseStylePanel(true);
            collapseLoraPanel(true);

            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            const targetTab = tab.dataset.tab;
            document.querySelectorAll('.gallery-panel').forEach(p => p.classList.remove('active'));

            const searchInput = document.getElementById('gallery-search-input');
            const btnSearch = document.getElementById('gnav-search');

            if (targetTab === 'styles') {
                document.getElementById('gallery').classList.add('active');
                hint.textContent = 'Click any style to copy prompt & add to prompt';
                if (stylesStyleSelector) stylesStyleSelector.classList.remove('hidden');
                if (styleCategoryFilters) styleCategoryFilters.classList.remove('hidden');
                if (loraStyleSelector) loraStyleSelector.classList.add('hidden');

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
                hint.textContent = 'Click any LoRA to copy trigger words & view details';
                if (stylesStyleSelector) stylesStyleSelector.classList.add('hidden');
                if (styleCategoryFilters) styleCategoryFilters.classList.add('hidden');
                if (loraStyleSelector) loraStyleSelector.classList.remove('hidden');

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
                if (typeof LORA_DATA !== 'undefined' && LORA_DATA.length > 0) {
                    const randomIndex = Math.floor(Math.random() * LORA_DATA.length);
                    handleLoraCardClick(randomIndex);
                    const selectedCard = document.getElementById(`lora-card-${randomIndex}`);
                    if (selectedCard) {
                        scrollToElementFramed(selectedCard, 70);
                        selectedCard.classList.remove('nav-target-pulse');
                        void selectedCard.offsetWidth;
                        selectedCard.classList.add('nav-target-pulse');
                    }
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

// ---- Init ----
document.addEventListener('DOMContentLoaded', () => {
    buildStylesGallery();
    buildLoraGallery();
    initGalleryTabs();
    initGallerySearch();
    initGalleryNav();
    initStylesThemeSelector();
    initStyleCategoryFilters();
    initLoraStyleSelector();
    initPromptBuilder();
    initBuilderDrawer();
    initLightbox();
});

