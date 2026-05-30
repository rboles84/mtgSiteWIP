<!DOCTYPE html>
<html lang="en" class="scroll-smooth">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>The Metaphysical Ecology of Alara: Interactive Codex</title>
    <!-- Tailwind CSS -->
    <script src="https://cdn.tailwindcss.com"></script>
    <script>
        tailwind.config = {
            theme: {
                extend: {
                    colors: {
                        gold: {
                            50: '#fbf8eb',
                            100: '#f4ebb9',
                            200: '#edd87a',
                            300: '#e1bc41',
                            400: '#d5a11c',
                            500: '#c58a12',
                            600: '#a76a0d',
                            700: '#844d0e',
                            800: '#6d3e11',
                            900: '#5c3312',
                        },
                        obsidian: '#0a0a0c',
                        parchment: '#f5efe0'
                    },
                    fontFamily: {
                        serif: ['Cinzel', 'Georgia', 'serif'],
                        sans: ['Inter', 'system-ui', 'sans-serif'],
                    }
                }
            }
        }
    </script>
    <!-- Google Fonts -->
    <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700;900&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <!-- FontAwesome for Icons -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    
    <style>
        :root {
            --mana-primary: #c58a12; /* Golden Default */
            --mana-secondary: #844d0e;
            --mana-glow: rgba(197, 138, 18, 0.25);
            --parchment-bg: #111115;
            --grid-color: rgba(197, 138, 18, 0.05);
        }

        /* Ambient glowing background elements */
        .dynamic-glow {
            box-shadow: 0 0 30px var(--mana-glow);
            transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .dynamic-border {
            border-color: var(--mana-primary);
            transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .dynamic-text {
            color: var(--mana-primary);
            transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .dynamic-bg {
            background-color: var(--mana-primary);
            transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }

        /* Customized Parchment-Style elements */
        .parchment-container {
            background: linear-gradient(135deg, #16161c 0%, #0d0d11 100%);
            border: 1px solid rgba(255, 255, 255, 0.05);
            position: relative;
        }

        .parchment-container::before {
            content: '';
            position: absolute;
            inset: 0;
            border: 1px solid transparent;
            border-image: linear-gradient(to bottom, var(--mana-primary), transparent) 1;
            pointer-events: none;
            opacity: 0.3;
            transition: all 0.6s ease;
        }

        /* Scrollbars */
        ::-webkit-scrollbar {
            width: 8px;
            height: 8px;
        }
        ::-webkit-scrollbar-track {
            background: #0a0a0c;
        }
        ::-webkit-scrollbar-thumb {
            background: var(--mana-primary);
            border-radius: 4px;
        }
        ::-webkit-scrollbar-thumb:hover {
            background: var(--mana-secondary);
        }

        /* Arcane Shimmering effects */
        @keyframes pulseGlow {
            0%, 100% { opacity: 0.2; transform: scale(1); }
            50% { opacity: 0.4; transform: scale(1.05); }
        }
        .arcane-pulse {
            animation: pulseGlow 4s infinite ease-in-out;
        }

        /* Grid Background Pattern */
        .bg-grid-pattern {
            background-size: 40px 40px;
            background-image: linear-gradient(to right, var(--grid-color) 1px, transparent 1px),
                              linear-gradient(to bottom, var(--grid-color) 1px, transparent 1px);
        }

        /* Intersection Observer Classes */
        .reveal-node {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.8s ease, transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .reveal-node.revealed {
            opacity: 1;
            transform: translateY(0);
        }

        /* Custom Cursors */
        .sparkle-particle {
            pointer-events: none;
            position: absolute;
            width: 6px;
            height: 6px;
            border-radius: 50%;
            background: var(--mana-primary);
            box-shadow: 0 0 10px var(--mana-primary);
            animation: fadeOutParticle 0.8s forwards ease-out;
        }
        @keyframes fadeOutParticle {
            0% { transform: scale(1); opacity: 1; }
            100% { transform: scale(0); opacity: 0; }
        }
    </style>
</head>
<body class="bg-obsidian text-slate-300 font-sans relative overflow-x-hidden min-h-screen selection:bg-gold-500 selection:text-black">

    <!-- background canvas for particle maelstrom -->
    <canvas id="maelstrom-canvas" class="fixed inset-0 w-full h-full -z-10 opacity-60 pointer-events-none"></canvas>

    <!-- Header Section -->
    <header class="border-b border-white/5 bg-obsidian/90 backdrop-blur-md sticky top-0 z-50 transition-all duration-300">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col md:flex-row justify-between items-center gap-4">
            <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-lg flex items-center justify-center border dynamic-border dynamic-glow bg-black/40">
                    <svg class="w-6 h-6 dynamic-text" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                    </svg>
                </div>
                <div>
                    <h1 class="font-serif text-xl sm:text-2xl font-bold tracking-wider text-white">THE ALARA SHARDS</h1>
                    <p class="text-[10px] sm:text-xs tracking-widest text-gold-400 font-mono uppercase">Metaphysical Ecology & Lore Dossier</p>
                </div>
            </div>
            
            <!-- Quick Navigation -->
            <nav class="flex flex-wrap justify-center gap-2 sm:gap-4 text-xs font-mono uppercase tracking-wider">
                <a href="#overview" class="px-3 py-1.5 rounded border border-white/5 hover:border-gold-500/30 hover:text-white transition-all bg-white/5">Overview</a>
                <a href="#shard-dossiers" class="px-3 py-1.5 rounded border border-white/5 hover:border-gold-500/30 hover:text-white transition-all bg-white/5">The Shards</a>
                <a href="#conflux-history" class="px-3 py-1.5 rounded border border-white/5 hover:border-gold-500/30 hover:text-white transition-all bg-white/5">The Conflux</a>
                <a href="#alignment-forge" class="px-3 py-1.5 rounded border border-white/5 hover:border-gold-500/30 hover:text-white transition-all bg-white/5">Mana Forge</a>
                <a href="#databases" class="px-3 py-1.5 rounded border border-white/5 hover:border-gold-500/30 hover:text-white transition-all bg-white/5">Databases</a>
            </nav>
        </div>
    </header>

    <!-- Main Hero -->
    <section id="overview" class="relative py-12 md:py-24 overflow-hidden border-b border-white/5 bg-grid-pattern">
        <div class="max-w-5xl mx-auto px-4 text-center relative z-10">
            <span class="text-xs font-mono uppercase tracking-widest text-gold-500 bg-gold-950/40 border border-gold-800/30 px-3 py-1 rounded-full mb-4 inline-block arcane-pulse">Plane-Wide Archives</span>
            <h2 class="font-serif text-4xl sm:text-6xl font-black text-white tracking-tight mb-6 mt-2 leading-none">
                A World Divided <br class="hidden sm:inline" />
                <span class="text-transparent bg-clip-text bg-gradient-to-r from-gold-300 via-gold-500 to-amber-700">and Reborn</span>
            </h2>
            <p class="text-lg text-slate-400 max-w-3xl mx-auto leading-relaxed font-light mb-8">
                The history of the plane of Alara represents one of the most profound studies in metaphysical trauma, ecological adaptation, and forced structural re-integration within the Multiverse. Long before the era of the Mending, Alara existed as a singular, immense plane overflowing with all five colors of mana.
            </p>
            
            <!-- Quick Stats Grid -->
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mb-12">
                <div class="parchment-container p-4 rounded-lg text-left">
                    <span class="text-xs font-mono text-gold-500 block">ERA PRE-SUNDERING</span>
                    <span class="text-xl font-serif text-white font-bold">Unified Alara</span>
                    <span class="text-xs text-slate-500 block mt-1">Full 5-Color Balance</span>
                </div>
                <div class="parchment-container p-4 rounded-lg text-left">
                    <span class="text-xs font-mono text-gold-500 block">THE CATACLYSM</span>
                    <span class="text-xl font-serif text-white font-bold">The Sundering</span>
                    <span class="text-xs text-slate-500 block mt-1">Refracted into 5 Shards</span>
                </div>
                <div class="parchment-container p-4 rounded-lg text-left">
                    <span class="text-xs font-mono text-gold-500 block">METAPHYSICAL LIMITS</span>
                    <span class="text-xl font-serif text-white font-bold">Mana Deficits</span>
                    <span class="text-xs text-slate-500 block mt-1">3 Colors per Shard</span>
                </div>
                <div class="parchment-container p-4 rounded-lg text-left">
                    <span class="text-xs font-mono text-gold-500 block">RECONSTRUCTION</span>
                    <span class="text-xl font-serif text-white font-bold">The Conflux</span>
                    <span class="text-xs text-slate-500 block mt-1">Orbital Realignment</span>
                </div>
            </div>

            <!-- Scroll Indicator -->
            <div class="flex justify-center">
                <a href="#shard-dossiers" class="animate-bounce w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:border-gold-500/40 transition-all bg-black/40">
                    <i class="fa-solid fa-arrow-down text-gold-500"></i>
                </a>
            </div>
        </div>
    </section>

    <!-- Section 1: Interactive Shard Dossiers -->
    <section id="shard-dossiers" class="py-16 border-b border-white/5 bg-black/30">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="text-center mb-12">
                <h3 class="font-serif text-3xl sm:text-4xl font-bold text-white mb-3">Interactive Shard Explorer</h3>
                <p class="text-slate-400 max-w-xl mx-auto text-sm">Select a shard of Alara below to filter the dynamic canvas background theme, generate unique ambient synthetic keys, and study its localized ecology, culture, and power structures.</p>
            </div>

            <!-- Shard Selector Buttons -->
            <div class="flex flex-wrap justify-center gap-3 mb-12">
                <button onclick="selectShard('bant')" id="btn-bant" class="shard-btn px-5 py-3 rounded-lg font-serif tracking-wider text-sm border border-emerald-500/20 bg-emerald-950/20 hover:bg-emerald-950/40 text-emerald-300 transition-all flex items-center gap-2">
                    <span class="w-3 h-3 rounded-full bg-emerald-400 block shadow-[0_0_8px_rgba(52,211,153,0.5)]"></span>
                    GWU BANT
                </button>
                <button onclick="selectShard('esper')" id="btn-esper" class="shard-btn px-5 py-3 rounded-lg font-serif tracking-wider text-sm border border-cyan-500/20 bg-cyan-950/20 hover:bg-cyan-950/40 text-cyan-300 transition-all flex items-center gap-2">
                    <span class="w-3 h-3 rounded-full bg-cyan-400 block shadow-[0_0_8px_rgba(34,211,238,0.5)]"></span>
                    WUB ESPER
                </button>
                <button onclick="selectShard('grixis')" id="btn-grixis" class="shard-btn px-5 py-3 rounded-lg font-serif tracking-wider text-sm border border-purple-500/20 bg-purple-950/20 hover:bg-purple-950/40 text-purple-300 transition-all flex items-center gap-2">
                    <span class="w-3 h-3 rounded-full bg-purple-400 block shadow-[0_0_8px_rgba(192,132,252,0.5)]"></span>
                    UBR GRIXIS
                </button>
                <button onclick="selectShard('jund')" id="btn-jund" class="shard-btn px-5 py-3 rounded-lg font-serif tracking-wider text-sm border border-red-500/20 bg-red-950/20 hover:bg-red-950/40 text-red-300 transition-all flex items-center gap-2">
                    <span class="w-3 h-3 rounded-full bg-red-400 block shadow-[0_0_8px_rgba(248,113,113,0.5)]"></span>
                    BRG JUND
                </button>
                <button onclick="selectShard('naya')" id="btn-naya" class="shard-btn px-5 py-3 rounded-lg font-serif tracking-wider text-sm border border-amber-500/20 bg-amber-950/20 hover:bg-amber-950/40 text-amber-300 transition-all flex items-center gap-2">
                    <span class="w-3 h-3 rounded-full bg-amber-400 block shadow-[0_0_8px_rgba(251,191,36,0.5)]"></span>
                    RGW NAYA
                </button>
            </div>

            <!-- Shards Detail Displays (Only one active at a time, dynamic fade-in) -->
            <div id="shards-container" class="space-y-12">
                
                <!-- BANT DOSSIER -->
                <div id="dossier-bant" class="shard-dossier active-dossier reveal-node parchment-container rounded-xl p-6 sm:p-10 border border-emerald-500/20">
                    <div class="flex flex-col lg:flex-row gap-8">
                        <div class="lg:w-2/3">
                            <div class="flex items-center gap-3 mb-4">
                                <span class="text-xs font-mono bg-emerald-900/40 text-emerald-400 px-3 py-1 rounded-full border border-emerald-700/30 font-semibold uppercase">Exalted Chivalry</span>
                                <span class="text-xs font-mono bg-red-950/40 text-red-400 px-3 py-1 rounded-full border border-red-900/30">Deficit: B, R</span>
                            </div>
                            <h4 class="font-serif text-3xl sm:text-5xl font-black text-white mb-6">BANT <span class="text-emerald-400 text-lg font-mono sm:text-2xl">({G}{W}{U})</span></h4>
                            
                            <!-- Snapshot & Core -->
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                                <div>
                                    <h5 class="text-xs font-mono text-gold-400 uppercase tracking-widest mb-2"><i class="fa-solid fa-compass text-[10px] mr-1.5"></i> Core Identity</h5>
                                    <p class="text-sm leading-relaxed text-slate-300">
                                        Conceptually structured as a "Camelot in the savannah," Bant is primarily aligned with white mana, supported by blue and green. Lacking red (passion, chaos) and black (ambition, selfishness), Bant’s society developed into a highly rigid, bloodless caste system where community, order, and ritualized duty serve as the absolute foundation of existence.
                                    </p>
                                </div>
                                <div>
                                    <h5 class="text-xs font-mono text-gold-400 uppercase tracking-widest mb-2"><i class="fa-solid fa-ban text-[10px] mr-1.5"></i> The Missing Colors</h5>
                                    <p class="text-sm leading-relaxed text-slate-300">
                                        Because black mana does not exist on Bant, there are no spells designed to kill, and blue magic is kept so weak that mind control is entirely unheard of. Warfare was strictly non-lethal and highly ritualized; conflicts were resolved through single combats by champion where participants wore ceremonial armor, and drawing blood was illegal. Prior to the Conflux, weather patterns were so mild that thunder and earthquakes were completely unknown to the populace.
                                    </p>
                                </div>
                            </div>

                            <!-- Detailed subsections using responsive grids -->
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-white/5 text-sm">
                                <div>
                                    <span class="font-mono text-xs text-emerald-400 block mb-1">Geography & Environment</span>
                                    <p class="text-slate-400">A pastoral paradise of rolling hills, high-rising castles, and sunlit, glittering beaches. Major landmarks include the Sun-Dappled Court, Castle Giltspire, and the Cormorant Stele.</p>
                                </div>
                                <div>
                                    <span class="font-mono text-xs text-emerald-400 block mb-1">Ecology & Natural Forces</span>
                                    <p class="text-slate-400">Walled orchards of Fig trees, Olive trees, and massive Thuja trees grow in absolute stability. No wild tectonic shifting or cataclysmic weather occurred pre-Conflux.</p>
                                </div>
                                <div>
                                    <span class="font-mono text-xs text-emerald-400 block mb-1">Society & Caste Hierarchy</span>
                                    <p class="text-slate-400">Strictly divided: the Blessed (nobles interacting with angels), the Sighted (spiritual rhoxes/clerics), the Sigiled (elite knights with magic medallions), the Mortar (the laboring majority), and the Unbeholden (outcasts, concentrated in maritime Jhess).</p>
                                </div>
                                <div>
                                    <span class="font-mono text-xs text-emerald-400 block mb-1">Power Structure & Angels</span>
                                    <p class="text-slate-400">Benevolent, mortal angels rule. Souls of virtuous mortals reform into angelic bodies (*bantuthroi*). High authority sits with the Asura (seven archangels forming the Court of Orderly Contemplation), followed by the Amesha, Mahra, and Celebrants.</p>
                                </div>
                            </div>

                            <!-- Key Figures / Locations / Mechanic -->
                            <div class="mt-8 pt-6 border-t border-white/5 grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
                                <div>
                                    <span class="font-mono text-xs text-gold-400 block uppercase mb-2">Notable Figures</span>
                                    <ul class="space-y-1 text-slate-300">
                                        <li><strong class="text-white">Rafiq of the Many:</strong> Master of sigils, champion of the knighthoods.</li>
                                        <li><strong class="text-white">Mubin:</strong> Fallen rhox knight, subject of tragic cross-shard prosthetic.</li>
                                        <li><strong class="text-white">Jenara:</strong> Asura of War, high angelic commander.</li>
                                    </ul>
                                </div>
                                <div>
                                    <span class="font-mono text-xs text-gold-400 block uppercase mb-2">Mechanical Connection</span>
                                    <p class="text-slate-400">
                                        <span class="text-emerald-400 font-mono">Exalted</span>: Highlights Bant's ritual combat, prioritizing single champions backed by the collective willpower of the community.
                                    </p>
                                </div>
                                <div>
                                    <span class="font-mono text-xs text-gold-400 block uppercase mb-2">Narrative Role</span>
                                    <p class="text-slate-400">
                                        Faced total shock during Malfegor's undead onslaught. Complications arose when Rafiq unsuccessfully used Jund/Esper material to save Mubin, marking early unstable tech integration.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <!-- Sidebar Interactive Widget / Card -->
                        <div class="lg:w-1/3 flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-white/5 pt-6 lg:pt-0 lg:pl-8">
                            <div>
                                <h5 class="font-serif text-lg text-white mb-4">The Sigiled Archive</h5>
                                <div class="bg-black/40 border border-emerald-500/30 rounded p-4 mb-4">
                                    <p class="text-xs font-mono text-emerald-400 uppercase tracking-widest mb-1">Bantian Liturgy</p>
                                    <p class="text-xs italic text-slate-400 leading-relaxed">
                                        "Let every blow be pure, every step measured. For we do not strike in hatred, but in absolute obedience to order and the High Asura."
                                    </p>
                                </div>
                            </div>
                            
                            <!-- Interactive Sound trigger / sigil visualizer -->
                            <div class="bg-emerald-950/20 rounded p-4 border border-emerald-500/10">
                                <span class="text-xs font-mono text-emerald-400 block mb-2"><i class="fa-solid fa-volume-high mr-1"></i> Resonant Frequency Check</span>
                                <button onclick="playAuraSynth(349.23, 'sine')" class="w-full text-center py-2 px-3 bg-emerald-500/20 hover:bg-emerald-500/40 border border-emerald-500/40 text-emerald-300 rounded font-mono text-xs transition-all uppercase tracking-widest">
                                    Synthesize Holy Hum (F4)
                                </button>
                                <span class="text-[10px] text-slate-500 block text-center mt-1">Simulates Bant's structural defensive auras.</span>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- ESPER DOSSIER -->
                <div id="dossier-esper" class="shard-dossier hidden reveal-node parchment-container rounded-xl p-6 sm:p-10 border border-cyan-500/20">
                    <div class="flex flex-col lg:flex-row gap-8">
                        <div class="lg:w-2/3">
                            <div class="flex items-center gap-3 mb-4">
                                <span class="text-xs font-mono bg-cyan-900/40 text-cyan-400 px-3 py-1 rounded-full border border-cyan-700/30 font-semibold uppercase">The Noble Work</span>
                                <span class="text-xs font-mono bg-red-950/40 text-red-400 px-3 py-1 rounded-full border border-red-900/30">Deficit: R, G</span>
                            </div>
                            <h4 class="font-serif text-3xl sm:text-5xl font-black text-white mb-6">ESPER <span class="text-cyan-400 text-lg font-mono sm:text-2xl">({W}{U}{B})</span></h4>
                            
                            <!-- Snapshot & Core -->
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                                <div>
                                    <h5 class="text-xs font-mono text-gold-400 uppercase tracking-widest mb-2"><i class="fa-solid fa-compass text-[10px] mr-1.5"></i> Core Identity</h5>
                                    <p class="text-sm leading-relaxed text-slate-300">
                                        Esper is a clinical, hyper-controlled magocracy where the natural world has been entirely subjugated by human and vedalken mages. Lacking green (organic growth, natural evolution) and red (wild passion, chaos), Esper contains no untamed wilderness. Its landscape is defined by slate-colored islands, fin-like spires, and measured skies.
                                    </p>
                                </div>
                                <div>
                                    <h5 class="text-xs font-mono text-gold-400 uppercase tracking-widest mb-2"><i class="fa-solid fa-ban text-[10px] mr-1.5"></i> The Missing Colors</h5>
                                    <p class="text-sm leading-relaxed text-slate-300">
                                        Without green or red mana, Esper enters a systemic crisis because they cannot locate or naturally cultivate minerals to synthesize new batches of etherium. To maintain their pristine cities, Esper relies on Tidehollow, a dark, flooded subterranean maze where waste-handlers, scullers, and aether-liches process urban runoff.
                                    </p>
                                </div>
                            </div>

                            <!-- Detailed subsections -->
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-white/5 text-sm">
                                <div>
                                    <span class="font-mono text-xs text-cyan-400 block mb-1">Geography & Environment</span>
                                    <p class="text-slate-400">Defined by slate islands, Vectis City, the Glass Dunes, the Sea of Unknowing, the placid Sea of Stars, the pitch-black Inkwell, and twenty-three distinct winds representing cosmic equations.</p>
                                </div>
                                <div>
                                    <span class="font-mono text-xs text-cyan-400 block mb-1">Ecology & Natural Forces</span>
                                    <p class="text-slate-400">No wild flora exists; finely broken-down glass behaves as mineral vegetation. Organic evolution has been halted and systematically replaced with clockwork arrays.</p>
                                </div>
                                <div>
                                    <span class="font-mono text-xs text-cyan-400 block mb-1">Society & The Noble Work</span>
                                    <p class="text-slate-400">Centered around the systematic replacement of organic tissue with *etherium*—an aether-infused metal to expand minds and preserve lives. Seekers of Carmot guard the fraudulent, empty Codex Etherium.</p>
                                </div>
                                <div>
                                    <span class="font-mono text-xs text-cyan-400 block mb-1">Power Factions</span>
                                    <p class="text-slate-400">The Ethersworn (seeking complete integration of all life with etherium) and the Ignoble Flesh (extremists who seek to transition entirely into mechanical *aether-liches*).</p>
                                </div>
                            </div>

                            <!-- Key Figures / Locations / Mechanic -->
                            <div class="mt-8 pt-6 border-t border-white/5 grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
                                <div>
                                    <span class="font-mono text-xs text-gold-400 block uppercase mb-2">Notable Figures</span>
                                    <ul class="space-y-1 text-slate-300">
                                        <li><strong class="text-white">Tezzeret:</strong> Aspiring master artificer who exposed the Seekers of Carmot's fraud.</li>
                                        <li><strong class="text-white">Breya:</strong> Artificer who later unlocked the secret of synthesizing new etherium.</li>
                                    </ul>
                                </div>
                                <div>
                                    <span class="font-mono text-xs text-gold-400 block uppercase mb-2">Mechanical Connection</span>
                                    <p class="text-slate-400">
                                        <span class="text-cyan-400 font-mono">Colored Artifacts</span>: Demonstrates that on Esper, technology and wizardry have become so deeply integrated that the lines between living magic and metal are completely blurred.
                                    </p>
                                </div>
                                <div>
                                    <span class="font-mono text-xs text-gold-400 block uppercase mb-2">Narrative Role</span>
                                    <p class="text-slate-400">
                                        Launched systematic military incursions into Jund and Grixis post-Conflux to strip mineral deposits and secure materials needed to continue the Noble Work.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <!-- Sidebar Interactive Widget / Card -->
                        <div class="lg:w-1/3 flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-white/5 pt-6 lg:pt-0 lg:pl-8">
                            <div>
                                <h5 class="font-serif text-lg text-white mb-4">Ethersworn Calculations</h5>
                                <div class="bg-black/40 border border-cyan-500/30 rounded p-4 mb-4">
                                    <p class="text-xs font-mono text-cyan-400 uppercase tracking-widest mb-1">Ethersworn Creed</p>
                                    <p class="text-xs italic text-slate-400 leading-relaxed">
                                        "Flesh is finite, chaotic, and subject to decay. In silver and gold filigree, we discover structural eternity, symmetrical thoughts, and true preservation."
                                    </p>
                                </div>
                            </div>
                            
                            <!-- Interactive Sound trigger / sigil visualizer -->
                            <div class="bg-cyan-950/20 rounded p-4 border border-cyan-500/10">
                                <span class="text-xs font-mono text-cyan-400 block mb-2"><i class="fa-solid fa-volume-high mr-1"></i> Resonant Frequency Check</span>
                                <button onclick="playAuraSynth(440, 'triangle')" class="w-full text-center py-2 px-3 bg-cyan-500/20 hover:bg-cyan-500/40 border border-cyan-500/40 text-cyan-300 rounded font-mono text-xs transition-all uppercase tracking-widest">
                                    Synthesize Silver Wind (A4)
                                </button>
                                <span class="text-[10px] text-slate-500 block text-center mt-1">Generates clean, rhythmic, and resonant clockwork waves.</span>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- GRIXIS DOSSIER -->
                <div id="dossier-grixis" class="shard-dossier hidden reveal-node parchment-container rounded-xl p-6 sm:p-10 border border-purple-500/20">
                    <div class="flex flex-col lg:flex-row gap-8">
                        <div class="lg:w-2/3">
                            <div class="flex items-center gap-3 mb-4">
                                <span class="text-xs font-mono bg-purple-900/40 text-purple-400 px-3 py-1 rounded-full border border-purple-700/30 font-semibold uppercase">The Economy of Vis</span>
                                <span class="text-xs font-mono bg-red-950/40 text-red-400 px-3 py-1 rounded-full border border-red-900/30">Deficit: W, G</span>
                            </div>
                            <h4 class="font-serif text-3xl sm:text-5xl font-black text-white mb-6">GRIXIS <span class="text-purple-400 text-lg font-mono sm:text-2xl">({U}{B}{R})</span></h4>
                            
                            <!-- Snapshot & Core -->
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                                <div>
                                    <h5 class="text-xs font-mono text-gold-400 uppercase tracking-widest mb-2"><i class="fa-solid fa-compass text-[10px] mr-1.5"></i> Core Identity</h5>
                                    <p class="text-sm leading-relaxed text-slate-300">
                                        Grixis is a hellscape of total ecological and spiritual decay. Cut off from green (regeneration, community) and white (order, protection), Grixis is a closed thermodynamic loop where life is a finite, non-renewable resource. Organic decomposition is slowed to a sluggish crawl.
                                    </p>
                                </div>
                                <div>
                                    <h5 class="text-xs font-mono text-gold-400 uppercase tracking-widest mb-2"><i class="fa-solid fa-ban text-[10px] mr-1.5"></i> The Missing Colors</h5>
                                    <p class="text-sm leading-relaxed text-slate-300">
                                        Without white and green, there are no healing magics or protective wards. Because natural mana is completely entropic and dissipates over time, Grixis’s society operates on the harvest of Vis—the raw, intangible life-force found only within the tissues and memories of living beings.
                                    </p>
                                </div>
                            </div>

                            <!-- Detailed subsections -->
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-white/5 text-sm">
                                <div>
                                    <span class="font-mono text-xs text-purple-400 block mb-1">Geography & Environment</span>
                                    <p class="text-slate-400">A bone-strewn swampy landscape known as the Dregscape, dominated by the massive necropolis of Sedraxis, bone heaps of the vulture-like kathari, and the buzzing hives of the Droning Isles.</p>
                                </div>
                                <div>
                                    <span class="font-mono text-xs text-purple-400 block mb-1">Ecology & Necrotic Decay</span>
                                    <p class="text-slate-400">The only vegetation consists of enormous carrion mushrooms. Life-force does not regenerate; physical existence slowly dissolves unless stabilized by external Vis.</p>
                                </div>
                                <div>
                                    <span class="font-mono text-xs text-purple-400 block mb-1">Society & The Living</span>
                                    <p class="text-slate-400">Living humans (vitals) hide in heavily fortified mountain hermitages like Torchlight. Humanoids drained of life-force are "the Damned"—gaunt, hollow spies controlled directly by demon masters.</p>
                                </div>
                                <div>
                                    <span class="font-mono text-xs text-purple-400 block mb-1">Magic Systems</span>
                                    <p class="text-slate-400">Fleshcrafters build massive bone and muscle constructs; Lethemancers siphon thoughts and memories; Ghostslavers bind wandering spirits; Gale mages control entropic "death gales."</p>
                                </div>
                            </div>

                            <!-- Key Figures / Locations / Mechanic -->
                            <div class="mt-8 pt-6 border-t border-white/5 grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
                                <div>
                                    <span class="font-mono text-xs text-gold-400 block uppercase mb-2">Notable Figures</span>
                                    <ul class="space-y-1 text-slate-300">
                                        <li><strong class="text-white">King Sedris:</strong> Vithian traitor turned immortal lich-king.</li>
                                        <li><strong class="text-white">Kaalia of the Vast:</strong> Survivor of Torchlight seeking vengeance.</li>
                                        <li><strong class="text-white">Sifa Grent:</strong> Predatory planeswalker who harvested Vis across planes.</li>
                                    </ul>
                                </div>
                                <div>
                                    <span class="font-mono text-xs text-gold-400 block uppercase mb-2">Mechanical Connection</span>
                                    <p class="text-slate-400">
                                        <span class="text-purple-400 font-mono">Unearth</span>: Represents Grixis's absolute inability to let anything stay dead. Dead tissue is excavated and reanimated to wage brief, frantic wars for residual Vis.
                                    </p>
                                </div>
                                <div>
                                    <span class="font-mono text-xs text-gold-400 block uppercase mb-2">Narrative Role</span>
                                    <p class="text-slate-400">
                                        Malfegor channeled massive quantities of death mana straight into the emerging seams, initiating a terrifying crusade to overwhelm the peaceful plains of neighboring Bant.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <!-- Sidebar Interactive Widget / Card -->
                        <div class="lg:w-1/3 flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-white/5 pt-6 lg:pt-0 lg:pl-8">
                            <div>
                                <h5 class="font-serif text-lg text-white mb-4">Vithian Traitor-Runes</h5>
                                <div class="bg-black/40 border border-purple-500/30 rounded p-4 mb-4">
                                    <p class="text-xs font-mono text-purple-400 uppercase tracking-widest mb-1">Sedraxis Liturgy</p>
                                    <p class="text-xs italic text-slate-400 leading-relaxed">
                                        "Let the living blood rot, let the old skin tear. Vis is the only water in this dry desert of bones. Pull it from their eyes, steal it from their hearts."
                                    </p>
                                </div>
                            </div>
                            
                            <!-- Interactive Sound trigger / sigil visualizer -->
                            <div class="bg-purple-950/20 rounded p-4 border border-purple-500/10">
                                <span class="text-xs font-mono text-purple-400 block mb-2"><i class="fa-solid fa-volume-high mr-1"></i> Resonant Frequency Check</span>
                                <button onclick="playAuraSynth(220, 'sawtooth')" class="w-full text-center py-2 px-3 bg-purple-500/20 hover:bg-purple-500/40 border border-purple-500/40 text-purple-300 rounded font-mono text-xs transition-all uppercase tracking-widest">
                                    Synthesize Vis Siphon (A3)
                                </button>
                                <span class="text-[10px] text-slate-500 block text-center mt-1">Generates deep, aggressive, and abrasive entropic tones.</span>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- JUND DOSSIER -->
                <div id="dossier-jund" class="shard-dossier hidden reveal-node parchment-container rounded-xl p-6 sm:p-10 border border-red-500/20">
                    <div class="flex flex-col lg:flex-row gap-8">
                        <div class="lg:w-2/3">
                            <div class="flex items-center gap-3 mb-4">
                                <span class="text-xs font-mono bg-red-950/40 text-red-400 px-3 py-1 rounded-full border border-red-700/30 font-semibold uppercase">Crucible of Instinct</span>
                                <span class="text-xs font-mono bg-red-950/40 text-red-400 px-3 py-1 rounded-full border border-red-900/30">Deficit: W, U</span>
                            </div>
                            <h4 class="font-serif text-3xl sm:text-5xl font-black text-white mb-6">JUND <span class="text-red-400 text-lg font-mono sm:text-2xl">({B}{R}{G})</span></h4>
                            
                            <!-- Snapshot & Core -->
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                                <div>
                                    <h5 class="text-xs font-mono text-gold-400 uppercase tracking-widest mb-2"><i class="fa-solid fa-compass text-[10px] mr-1.5"></i> Core Identity</h5>
                                    <p class="text-sm leading-relaxed text-slate-300">
                                        Jund is a wild, sulfuric world of volcanic activity, sharp mountain ledges, and deep, swampy rift valleys. Lacking white (cooperation, law) and blue (reflection, logic), Jund represents absolute freedom and raw physical instinct. Life is a relentless, kinetic struggle.
                                    </p>
                                </div>
                                <div>
                                    <h5 class="text-xs font-mono text-gold-400 uppercase tracking-widest mb-2"><i class="fa-solid fa-ban text-[10px] mr-1.5"></i> The Missing Colors</h5>
                                    <p class="text-sm leading-relaxed text-slate-300">
                                        Without blue or white, there is no system of law, science, or peaceful reconciliation. Society exists in a state of absolute, pure survival. Every organism is simultaneously predator and prey, bound strictly to the food chain where dragons rule the highest heights.
                                    </p>
                                </div>
                            </div>

                            <!-- Detailed subsections -->
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-white/5 text-sm">
                                <div>
                                    <span class="font-mono text-xs text-red-400 block mb-1">Geography & Environment</span>
                                    <p class="text-slate-400">Sulfuric volcanoes and deep rift valleys resembling giant claw marks carved into the earth. The deepest gash is The Rip, plunging nearly two miles down. Active, volcanic areas make up the Cicatrice.</p>
                                </div>
                                <div>
                                    <span class="font-mono text-xs text-red-400 block mb-1">Ecology & Dragon Roosts</span>
                                    <p class="text-slate-400">Fiercely territorial dragons sit at the apex. Ancient dragons perform the "Shriek of Flame," diving into active volcanic calderas to cause mass eruptions that clear out the valleys.</p>
                                </div>
                                <div>
                                    <span class="font-mono text-xs text-red-400 block mb-1">Society & The Tribes</span>
                                    <p class="text-slate-400">Nomadic humans speak local dialects and weave hair braids from fallen foes' tendons (Kresh has twenty-two). Viashino form tight-knit clans called Thrashes in tar swamps like The Seethe. Goblins view themselves as "divine food."</p>
                                </div>
                                <div>
                                    <span class="font-mono text-xs text-red-400 block mb-1">Shamanic Magic</span>
                                    <p class="text-slate-400">Shamans drink the highly toxic "Dreamfire Draught" to enter hallucination trials and strike precarious bargains with wild, destructive fire elementals.</p>
                                </div>
                            </div>

                            <!-- Key Figures / Locations / Mechanic -->
                            <div class="mt-8 pt-6 border-t border-white/5 grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
                                <div>
                                    <span class="font-mono text-xs text-gold-400 block uppercase mb-2">Notable Figures</span>
                                    <ul class="space-y-1 text-slate-300">
                                        <li><strong class="text-white">Kresh the Bloodbraided:</strong> Legendary chieftain boasting twenty-two battle braids.</li>
                                        <li><strong class="text-white">Rakka Mar:</strong> Bolas's shamanistic agent who destabilized the shard's obelisk.</li>
                                    </ul>
                                </div>
                                <div>
                                    <span class="font-mono text-xs text-gold-400 block uppercase mb-2">Mechanical Connection</span>
                                    <p class="text-slate-400">
                                        <span class="text-red-400 font-mono">Devour</span>: Expresses Jund's primal reality—the strong survive by literally consuming the weak to expand their physical strength, size, and power.
                                    </p>
                                </div>
                                <div>
                                    <span class="font-mono text-xs text-gold-400 block uppercase mb-2">Narrative Role</span>
                                    <p class="text-slate-400">
                                        Served as the hunting grounds of the Multiverse post-reunion. Jund warriors expanded their Life Hunts to newly discovered, exotic targets across Naya and Bant.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <!-- Sidebar Interactive Widget / Card -->
                        <div class="lg:w-1/3 flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-white/5 pt-6 lg:pt-0 lg:pl-8">
                            <div>
                                <h5 class="font-serif text-lg text-white mb-4">Tol Antaga Trophies</h5>
                                <div class="bg-black/40 border border-red-500/30 rounded p-4 mb-4">
                                    <p class="text-xs font-mono text-red-400 uppercase tracking-widest mb-1">Bloodbraided Creed</p>
                                    <p class="text-xs italic text-slate-400 leading-relaxed">
                                        "If you run, you are prey. If you stand, you are a hunter. Count your braids, sharpen your volcanic stone, and let the volcano feed your blood."
                                    </p>
                                </div>
                            </div>
                            
                            <!-- Interactive Sound trigger / sigil visualizer -->
                            <div class="bg-red-950/20 rounded p-4 border border-red-500/10">
                                <span class="text-xs font-mono text-red-400 block mb-2"><i class="fa-solid fa-volume-high mr-1"></i> Resonant Frequency Check</span>
                                <button onclick="playAuraSynth(130.81, 'sawtooth')" class="w-full text-center py-2 px-3 bg-red-500/20 hover:bg-red-500/40 border border-red-500/40 text-red-300 rounded font-mono text-xs transition-all uppercase tracking-widest">
                                    Synthesize Dragon Roar (C3)
                                </button>
                                <span class="text-[10px] text-slate-500 block text-center mt-1">Simulates Jund's aggressive, low-frequency geologic vibrations.</span>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- NAYA DOSSIER -->
                <div id="dossier-naya" class="shard-dossier hidden reveal-node parchment-container rounded-xl p-6 sm:p-10 border border-amber-500/20">
                    <div class="flex flex-col lg:flex-row gap-8">
                        <div class="lg:w-2/3">
                            <div class="flex items-center gap-3 mb-4">
                                <span class="text-xs font-mono bg-amber-900/40 text-amber-400 px-3 py-1 rounded-full border border-amber-700/30 font-semibold uppercase">Reverence of the Behemoth</span>
                                <span class="text-xs font-mono bg-red-950/40 text-red-400 px-3 py-1 rounded-full border border-red-900/30">Deficit: U, B</span>
                            </div>
                            <h4 class="font-serif text-3xl sm:text-5xl font-black text-white mb-6">NAYA <span class="text-amber-400 text-lg font-mono sm:text-2xl">({R}{G}{W})</span></h4>
                            
                            <!-- Snapshot & Core -->
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                                <div>
                                    <h5 class="text-xs font-mono text-gold-400 uppercase tracking-widest mb-2"><i class="fa-solid fa-compass text-[10px] mr-1.5"></i> Core Identity</h5>
                                    <p class="text-sm leading-relaxed text-slate-300">
                                        Naya is a tropical jungle paradise defined by an overwhelming abundance of natural resources and a celebrating reverence for life. Lacking blue (scrutiny, intellect) and black (ambition, skepticism), Naya’s cultures have evolved a state of deep, instinctual naivety, organizing their societies around direct sensory awe.
                                    </p>
                                </div>
                                <div>
                                    <h5 class="text-xs font-mono text-gold-400 uppercase tracking-widest mb-2"><i class="fa-solid fa-ban text-[10px] mr-1.5"></i> The Missing Colors</h5>
                                    <p class="text-sm leading-relaxed text-slate-300">
                                        Without blue or black, there is no intellectual deconstruction, cynicism, or individual greed. This innocence makes Naya deeply unified but also highly vulnerable to internal disruption when complex laws are manipulated or when external corrupting elements bypass their simple sensory defenses.
                                    </p>
                                </div>
                            </div>

                            <!-- Detailed subsections -->
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-white/5 text-sm">
                                <div>
                                    <span class="font-mono text-xs text-amber-400 block mb-1">Geography & Canopy Levels</span>
                                    <p class="text-slate-400">Divided vertically: The Canopy (sunlit lianas, home to Cylian elves), the Forest Floor (carnivorous plants, massive logging ants), and high mountains home to the leonin Nacatl. A permanent mist (the Whitecover) settles at night.</p>
                                </div>
                                <div>
                                    <span class="font-mono text-xs text-amber-400 block mb-1">Ecology & Behemoths</span>
                                    <p class="text-slate-400">Worship of giant beasts (gargantuans) is universal. Nomadic *Wanat* trees shift across the soil. Deep below lies the resting place of Progenitus, the five-headed hydra avatar of the Worldsoul.</p>
                                </div>
                                <div>
                                    <span class="font-mono text-xs text-amber-400 block mb-1">Society & The Nacatl</span>
                                    <p class="text-slate-400">The Nacatl once ruled a glorious cloud empire governed by the Coil (121 mathematical laws). Following the revolutionary "Breaking of the Coil" by Marisi, they split into Cloud Nacatl (conservative, high peaks) and Wild Nacatl (primal nomads).</p>
                                </div>
                                <div>
                                    <span class="font-mono text-xs text-amber-400 block mb-1">The Cylian Elves</span>
                                    <p class="text-slate-400">The dominant spiritual force, led by Mayael the Anima. Blinded during the ritual of the "Whitecover Gaze" to connect with the spirit of the ancient savior Cylia, Mayael guides her people along the tracks of the behemoths.</p>
                                </div>
                            </div>

                            <!-- Key Figures / Locations / Mechanic -->
                            <div class="mt-8 pt-6 border-t border-white/5 grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
                                <div>
                                    <span class="font-mono text-xs text-gold-400 block uppercase mb-2">Notable Figures</span>
                                    <ul class="space-y-1 text-slate-300">
                                        <li><strong class="text-white">Ajani Goldmane:</strong> Albino Nacatl outcast, brother of slain king Jazal.</li>
                                        <li><strong class="text-white">Mayael the Anima:</strong> Blind elven shaman guiding Naya's giant-beast tracks.</li>
                                        <li><strong class="text-white">Marisi:</strong> Revolutionary leonin leader who smashed the ancient laws.</li>
                                    </ul>
                                </div>
                                <div>
                                    <span class="font-mono text-xs text-gold-400 block uppercase mb-2">Mechanical Connection</span>
                                    <p class="text-slate-400">
                                        <span class="text-amber-400 font-mono">Power 5 or Greater</span>: Expresses Naya's reverence for overwhelming mass and physical grandeur, where raw size is treated as a direct manifestation of divine presence.
                                    </p>
                                </div>
                                <div>
                                    <span class="font-mono text-xs text-gold-400 block uppercase mb-2">Narrative Role</span>
                                    <p class="text-slate-400">
                                        Nicol Bolas's agents triggered Jazal’s murder, setting off internal civil wars that culminated in the destruction of the ancient towers and the full awakening of Progenitus.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <!-- Sidebar Interactive Widget / Card -->
                        <div class="lg:w-1/3 flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-white/5 pt-6 lg:pt-0 lg:pl-8">
                            <div>
                                <h5 class="font-serif text-lg text-white mb-4">The Sacellum Archives</h5>
                                <div class="bg-black/40 border border-amber-500/30 rounded p-4 mb-4">
                                    <p class="text-xs font-mono text-amber-400 uppercase tracking-widest mb-1">Cylian Prayer</p>
                                    <p class="text-xs italic text-slate-400 leading-relaxed">
                                        "Let our eyes blind themselves to the smallness of individual thoughts, so that we may witness the colossal stride of the Gods who tread upon our trees."
                                    </p>
                                </div>
                            </div>
                            
                            <!-- Interactive Sound trigger / sigil visualizer -->
                            <div class="bg-amber-950/20 rounded p-4 border border-amber-500/10">
                                <span class="text-xs font-mono text-amber-400 block mb-2"><i class="fa-solid fa-volume-high mr-1"></i> Resonant Frequency Check</span>
                                <button onclick="playAuraSynth(196, 'sine')" class="w-full text-center py-2 px-3 bg-amber-500/20 hover:bg-amber-500/40 border border-amber-500/40 text-amber-300 rounded font-mono text-xs transition-all uppercase tracking-widest">
                                    Synthesize Behemoth Step (G3)
                                </button>
                                <span class="text-[10px] text-slate-500 block text-center mt-1">Simulates Naya's massive, resonant seismic vibrations.</span>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </section>

    <!-- Section 2: The Conflux & The Maelstrom -->
    <section id="conflux-history" class="py-16 border-b border-white/5 bg-grid-pattern relative">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
                <div class="reveal-node">
                    <span class="text-xs font-mono text-gold-500 uppercase tracking-widest bg-gold-950/40 border border-gold-800/30 px-3 py-1 rounded-full mb-4 inline-block">Planar Cataclysm</span>
                    <h3 class="font-serif text-3xl sm:text-4xl font-bold text-white mb-6">The Conflux & The Maelstrom</h3>
                    <p class="text-slate-300 leading-relaxed mb-4 text-sm">
                        As the five shards drifted through the Blind Eternities, their planar boundaries began to decay, initiating a natural orbital convergence known as the Conflux. While few mortals understood the impending cataclysm, the ancient dragon planeswalker Nicol Bolas recognized the event as the ultimate opportunity to restore his godlike, pre-Mending powers.
                    </p>
                    <p class="text-slate-300 leading-relaxed mb-6 text-sm">
                        To accelerate the convergence and maximize the energy output, Bolas deployed a network of deeply placed sleeper agents across the five shards. These agents were tasked with fueling cultural xenophobia, initiating territorial wars, and systematically destroying the ancient obelisks that structurally anchored and stabilized each shard's localized mana.
                    </p>
                    
                    <div class="bg-black/50 border border-white/5 rounded-lg p-6 text-xs font-mono text-slate-400">
                        <span class="text-gold-500 font-bold block mb-2 uppercase">The Climax of the Maelstrom:</span>
                        As the obelisks fell, the structural barriers between the shards collapsed entirely. The worlds collided in a chaotic ring, grinding against one another. This violent friction triggered the Conflux War. At the physical center where all five shards overlapped, a colossal, swirling storm of chaotic, five-colored mana formed: the Maelstrom. Consuming the energy of global war, Bolas stepped into the center to ascend, but was halted by Ajani Goldmane, who channeled the remaining mana to summon a perfect, golden shadow avatar of Bolas's own soul to banish him from the plane.
                    </div>
                </div>

                <!-- Interactive Agent Dossier Matrix -->
                <div class="reveal-node parchment-container rounded-xl p-6 border border-gold-500/10">
                    <h4 class="font-serif text-lg text-white mb-4 flex items-center gap-2">
                        <i class="fa-solid fa-user-secret text-gold-500"></i>
                        The Destabilization Network
                    </h4>
                    <p class="text-slate-400 text-xs mb-4">Click an operative folder below to inspect the methods used by Nicol Bolas's agents to destroy the planar stabilization anchors.</p>
                    
                    <div class="space-y-3 font-mono text-xs">
                        <!-- Agent 1 -->
                        <div class="border border-white/5 rounded p-3 bg-black/40 hover:border-gold-500/30 transition-all cursor-pointer" onclick="toggleAgent('gwa')">
                            <div class="flex justify-between items-center">
                                <span class="text-emerald-400">BANT // GWAFA HAZID</span>
                                <span class="text-[10px] text-slate-500">EXPAND <i class="fa-solid fa-chevron-down ml-1"></i></span>
                            </div>
                            <div id="agent-gwa" class="hidden mt-2 pt-2 border-t border-white/5 text-slate-300 space-y-1">
                                <p><strong class="text-white">Method:</strong> Spreading xenophobia, trading illegal goods, destroying Giltspire Castle.</p>
                                <p><strong class="text-white">Objective:</strong> Exposing and dismantling the Obelisk of Bant.</p>
                            </div>
                        </div>

                        <!-- Agent 2 -->
                        <div class="border border-white/5 rounded p-3 bg-black/40 hover:border-gold-500/30 transition-all cursor-pointer" onclick="toggleAgent('sec')">
                            <div class="flex justify-between items-center">
                                <span class="text-cyan-400">ESPER // SEEKERS OF CARMOT</span>
                                <span class="text-[10px] text-slate-500">EXPAND <i class="fa-solid fa-chevron-down ml-1"></i></span>
                            </div>
                            <div id="agent-sec" class="hidden mt-2 pt-2 border-t border-white/5 text-slate-300 space-y-1">
                                <p><strong class="text-white">Method:</strong> Promoting a fraudulent Codex; hoarding and weaponizing dwindling etherium.</p>
                                <p><strong class="text-white">Objective:</strong> Preparing the populace for planar conquest and resource war.</p>
                            </div>
                        </div>

                        <!-- Agent 3 -->
                        <div class="border border-white/5 rounded p-3 bg-black/40 hover:border-gold-500/30 transition-all cursor-pointer" onclick="toggleAgent('mal')">
                            <div class="flex justify-between items-center">
                                <span class="text-purple-400">GRIXIS // MALFEGOR</span>
                                <span class="text-[10px] text-slate-500">EXPAND <i class="fa-solid fa-chevron-down ml-1"></i></span>
                            </div>
                            <div id="agent-mal" class="hidden mt-2 pt-2 border-t border-white/5 text-slate-300 space-y-1">
                                <p><strong class="text-white">Method:</strong> Gathering a colossal undead horde; invading neighboring borders.</p>
                                <p><strong class="text-white">Objective:</strong> Funneling death mana directly into the emerging planar seam.</p>
                            </div>
                        </div>

                        <!-- Agent 4 -->
                        <div class="border border-white/5 rounded p-3 bg-black/40 hover:border-gold-500/30 transition-all cursor-pointer" onclick="toggleAgent('rak')">
                            <div class="flex justify-between items-center">
                                <span class="text-red-400">JUND // RAKKA MAR</span>
                                <span class="text-[10px] text-slate-500">EXPAND <i class="fa-solid fa-chevron-down ml-1"></i></span>
                            </div>
                            <div id="agent-rak" class="hidden mt-2 pt-2 border-t border-white/5 text-slate-300 space-y-1">
                                <p><strong class="text-white">Method:</strong> Misguiding Kresh's Tol Antaga clan; detonating dragon nests.</p>
                                <p><strong class="text-white">Objective:</strong> Powering up the Obelisk of Jund with blood sacrifice.</p>
                            </div>
                        </div>

                        <!-- Agent 5 -->
                        <div class="border border-white/5 rounded p-3 bg-black/40 hover:border-gold-500/30 transition-all cursor-pointer" onclick="toggleAgent('mar')">
                            <div class="flex justify-between items-center">
                                <span class="text-amber-400">NAYA // MARISI & ZALIKI</span>
                                <span class="text-[10px] text-slate-500">EXPAND <i class="fa-solid fa-chevron-down ml-1"></i></span>
                            </div>
                            <div id="agent-mar" class="hidden mt-2 pt-2 border-t border-white/5 text-slate-300 space-y-1">
                                <p><strong class="text-white">Method:</strong> Instigating the murder of Jazal Goldmane; triggering tribal warfare.</p>
                                <p><strong class="text-white">Objective:</strong> Exploding the Tower of Qasal to reveal the Nayan Obelisk.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Section 3: Interactive Mana Forge Quiz (Local Storage Integration) -->
    <section id="alignment-forge" class="py-16 border-b border-white/5 bg-black/50">
        <div class="max-w-4xl mx-auto px-4">
            <div class="parchment-container rounded-2xl p-8 sm:p-12 border border-gold-500/20 text-center relative overflow-hidden">
                <div class="absolute -right-16 -top-16 w-48 h-48 rounded-full bg-gold-500/5 filter blur-2xl pointer-events-none"></div>
                
                <span class="text-xs font-mono text-gold-500 uppercase tracking-widest block mb-2"><i class="fa-solid fa-wand-magic-sparkles mr-1.5"></i> The Trial of the Spark</span>
                <h3 class="font-serif text-3xl sm:text-4xl font-bold text-white mb-6">Discover Your Shard Alignment</h3>
                
                <!-- Welcome / Result Box -->
                <div id="quiz-intro">
                    <p class="text-slate-300 text-sm max-w-xl mx-auto mb-8">
                        The ritual of the Spark will measure your core ideals, methods of problem-solving, and primal instincts to determine which of the five isolated Alara shards aligns with your spiritual signature.
                    </p>
                    <button onclick="startQuiz()" class="px-6 py-3 bg-gold-500 hover:bg-gold-600 border border-gold-400 text-black font-semibold rounded-lg font-mono text-xs transition-all tracking-wider uppercase">
                        Initiate Ritual
                    </button>
                    
                    <!-- Saved Alignment Profile (if any) -->
                    <div id="saved-profile-box" class="hidden mt-8 pt-6 border-t border-white/5 text-xs font-mono text-slate-400">
                        <span class="text-slate-500">SAVED METAPHYSICAL ALIGNMENT:</span>
                        <div class="flex justify-center items-center gap-2 mt-2">
                            <span id="saved-shard-name" class="text-gold-400 font-bold uppercase text-sm"></span>
                            <button onclick="clearSavedAlignment()" class="text-red-400 hover:text-red-300 text-[10px] ml-4 hover:underline">
                                [ RESET ]
                            </button>
                        </div>
                    </div>
                </div>

                <!-- Quiz Steps (Dynamic content) -->
                <div id="quiz-question-box" class="hidden text-left max-w-2xl mx-auto">
                    <div class="flex justify-between items-center text-xs font-mono text-slate-500 mb-6">
                        <span id="quiz-progress">Question 1 of 4</span>
                        <span class="text-gold-500">COGNITIVE ASSESSMENT</span>
                    </div>
                    <h4 id="quiz-question-text" class="font-serif text-lg sm:text-xl text-white mb-6"></h4>
                    
                    <div id="quiz-options" class="space-y-3">
                        <!-- Options populated dynamically -->
                    </div>
                </div>

                <!-- Quiz Results (Dynamic) -->
                <div id="quiz-result-box" class="hidden text-center max-w-xl mx-auto">
                    <div class="w-16 h-16 rounded-full border border-gold-500/30 flex items-center justify-center mx-auto mb-4 dynamic-glow">
                        <i class="fa-solid fa-fire text-gold-500 text-2xl"></i>
                    </div>
                    <span class="text-xs font-mono text-slate-500 uppercase block mb-1">Ritual Complete</span>
                    <h4 class="font-serif text-2xl sm:text-3xl text-white mb-4">Your Soul Aligns with <span id="result-shard-name" class="text-gold-400"></span></h4>
                    <p id="result-shard-desc" class="text-slate-300 text-sm leading-relaxed mb-6"></p>
                    
                    <div class="flex justify-center gap-4">
                        <button onclick="restartQuiz()" class="px-4 py-2 bg-white/5 border border-white/10 hover:border-gold-500/40 text-xs font-mono text-slate-300 rounded hover:text-white transition-all">
                            Retake Trial
                        </button>
                        <button onclick="saveAlignment()" class="px-4 py-2 bg-gold-500 text-black border border-gold-400 text-xs font-mono rounded font-semibold transition-all">
                            Record in Local Codex
                        </button>
                    </div>
                </div>

            </div>
        </div>
    </section>

    <!-- Section 4: Databases (Tables, Chronology, Glossary) -->
    <section id="databases" class="py-16 bg-black/40">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            <div class="flex justify-center gap-4 border-b border-white/5 pb-4 mb-8 font-serif text-sm uppercase tracking-wider overflow-x-auto">
                <button onclick="switchDbTab('matrix')" id="db-btn-matrix" class="db-tab-btn px-4 py-2 border-b-2 border-gold-500 text-white font-semibold whitespace-nowrap">The Shard Matrix</button>
                <button onclick="switchDbTab('timeline')" id="db-btn-timeline" class="db-tab-btn px-4 py-2 text-slate-400 hover:text-white whitespace-nowrap">Chronology of Events</button>
                <button onclick="switchDbTab('glossary')" id="db-btn-glossary" class="db-tab-btn px-4 py-2 text-slate-400 hover:text-white whitespace-nowrap">Glossary</button>
                <button onclick="switchDbTab('synthesis')" id="db-btn-synthesis" class="db-tab-btn px-4 py-2 text-slate-400 hover:text-white whitespace-nowrap">Synthesis & Conflicts</button>
            </div>

            <!-- Tab 1: The Shard Matrix -->
            <div id="db-tab-matrix" class="db-content reveal-node">
                <!-- Geopolitical Table -->
                <div class="overflow-x-auto border border-white/5 rounded-lg mb-8 bg-black/20">
                    <table class="w-full text-left border-collapse text-xs sm:text-sm font-sans">
                        <thead>
                            <tr class="border-b border-white/10 bg-white/5 font-mono text-gold-400 uppercase">
                                <th class="p-4">Shard Name</th>
                                <th class="p-4">Mana Alignment</th>
                                <th class="p-4">Primary Mechanic</th>
                                <th class="p-4">Dominant Creature Species</th>
                                <th class="p-4">Metaphysical Deficit</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-white/5">
                            <tr class="hover:bg-white/5 transition-colors">
                                <td class="p-4 font-serif text-white font-bold">Bant</td>
                                <td class="p-4 font-mono text-emerald-400">Green-White-Blue ({G}{W}{U})</td>
                                <td class="p-4 font-mono">Exalted</td>
                                <td class="p-4">Humans, Angels, Aven, Rhoxes</td>
                                <td class="p-4 text-slate-500">Black, Red ({B}{R})</td>
                            </tr>
                            <tr class="hover:bg-white/5 transition-colors">
                                <td class="p-4 font-serif text-white font-bold">Esper</td>
                                <td class="p-4 font-mono text-cyan-400">White-Blue-Black ({W}{U}{B})</td>
                                <td class="p-4 font-mono">Colored Artifacts / Filigree</td>
                                <td class="p-4">Humans, Sphinxes, Vedalken, Homunculi</td>
                                <td class="p-4 text-slate-500">Red, Green ({R}{G})</td>
                            </tr>
                            <tr class="hover:bg-white/5 transition-colors">
                                <td class="p-4 font-serif text-white font-bold">Grixis</td>
                                <td class="p-4 font-mono text-purple-400">Blue-Black-Red ({U}{B}{R})</td>
                                <td class="p-4 font-mono">Unearth</td>
                                <td class="p-4">Demons, Zombies, Skeletons, Kathari</td>
                                <td class="p-4 text-slate-500">White, Green ({W}{G})</td>
                            </tr>
                            <tr class="hover:bg-white/5 transition-colors">
                                <td class="p-4 font-serif text-white font-bold">Jund</td>
                                <td class="p-4 font-mono text-red-400">Black-Red-Green ({B}{R}{G})</td>
                                <td class="p-4 font-mono">Devour</td>
                                <td class="p-4">Dragons, Viashino, Goblins, Humans</td>
                                <td class="p-4 text-slate-500">White, Blue ({W}{U})</td>
                            </tr>
                            <tr class="hover:bg-white/5 transition-colors">
                                <td class="p-4 font-serif text-white font-bold">Naya</td>
                                <td class="p-4 font-mono text-amber-400">Red-Green-White ({R}{G}{W})</td>
                                <td class="p-4 font-mono">"Power 5 or Greater"</td>
                                <td class="p-4">Humans, Elves, Nacatl, Behemoths</td>
                                <td class="p-4 text-slate-500">Blue, Black ({U}{B})</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <!-- Comparative Analysis Table -->
                <h4 class="font-serif text-lg text-white mb-4">Dialects, Flora, and Geography Comparison</h4>
                <div class="overflow-x-auto border border-white/5 rounded-lg bg-black/20">
                    <table class="w-full text-left border-collapse text-xs sm:text-sm">
                        <thead>
                            <tr class="border-b border-white/10 bg-white/5 font-mono text-gold-400 uppercase">
                                <th class="p-4">Shard</th>
                                <th class="p-4">Local Dialect / Linguistic Term</th>
                                <th class="p-4">Key Native Flora</th>
                                <th class="p-4">Major Geographical Landmarks</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-white/5 text-slate-300">
                            <tr class="hover:bg-white/5 transition-colors">
                                <td class="p-4 font-serif text-white font-bold">Bant</td>
                                <td class="p-4 font-mono italic text-emerald-400">Bantuthroi ("flesh of our volition")</td>
                                <td class="p-4">Walled orchards of Fig trees, Olive trees, and massive Thuja trees</td>
                                <td class="p-4">The Sun-Dappled Court, Castle Giltspire, and the Cormorant Stele</td>
                            </tr>
                            <tr class="hover:bg-white/5 transition-colors">
                                <td class="p-4 font-serif text-white font-bold">Esper</td>
                                <td class="p-4 font-mono italic text-cyan-400">Mystical terminology of the 23 winds</td>
                                <td class="p-4">Finely broken-down glass acting as mineral vegetation</td>
                                <td class="p-4">Tidehollow waste pits, Vectis City, and the Inkwell Sea</td>
                            </tr>
                            <tr class="hover:bg-white/5 transition-colors">
                                <td class="p-4 font-serif text-white font-bold">Grixis</td>
                                <td class="p-4 font-mono italic text-purple-400">Ancient Vithian ("Grixis" meaning "traitor")</td>
                                class="p-4"<td>Enormous carrion mushrooms</td>
                                <td class="p-4">Grixis Dregscape, Sedraxis Necropolis, and the Droning Isles</td>
                            </tr>
                            <tr class="hover:bg-white/5 transition-colors">
                                <td class="p-4 font-serif text-white font-bold">Jund</td>
                                <td class="p-4 font-mono italic text-red-400">Viashino Challik; Goblin plikintok agat</td>
                                <td class="p-4">Supple-wooded Tukatongue tree</td>
                                <td class="p-4">Volcanic cavern of the Worldheart Chalice, The Rip, and The Seethe</td>
                            </tr>
                            <tr class="hover:bg-white/5 transition-colors">
                                <td class="p-4 font-serif text-white font-bold">Naya</td>
                                <td class="p-4 font-mono italic text-amber-400">Nacatl Scratchforms; Vetli ("poison arrows")</td>
                                <td class="p-4">Nomadic Wanat tree and toxic Bloodthorn groves</td>
                                <td class="p-4">The Sacellum temple, Mountain ruins of Antali, and the Binding Wall</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <!-- Tab 2: Chronology of Events -->
            <div id="db-tab-timeline" class="db-content hidden">
                <div class="relative pl-8 border-l border-white/5 space-y-8 max-w-4xl mx-auto font-mono text-xs text-slate-400">
                    
                    <!-- Pre-Sundering -->
                    <div class="relative">
                        <div class="absolute -left-10 top-0 w-4 h-4 rounded-full bg-gold-500 border-4 border-obsidian dynamic-glow"></div>
                        <span class="text-gold-500 font-bold uppercase tracking-widest text-[10px]">ANCIENT PAST // UNIFIED ALARA</span>
                        <p class="text-white font-serif text-sm mt-1">Metaphysical Harmony & Obelisks</p>
                        <p class="mt-2 text-slate-400 leading-relaxed font-sans text-xs sm:text-sm">
                            Alara exists as a massive single plane with five-color mana balance. Obelisks are erected to direct and filter the world soul (Progenitus). An unknown ancient planeswalker plunders the core for raw mana, initiating the Sundering.
                        </p>
                    </div>

                    <!-- The Sundering -->
                    <div class="relative">
                        <div class="absolute -left-10 top-0 w-4 h-4 rounded-full bg-red-500 border-4 border-obsidian"></div>
                        <span class="text-red-500 font-bold uppercase tracking-widest text-[10px]">THE CATACLYSM // THE SUNDERING</span>
                        <p class="text-white font-serif text-sm mt-1">Fracturing of Reality</p>
                        <p class="mt-2 text-slate-400 leading-relaxed font-sans text-xs sm:text-sm">
                            The planar core shatters. Reality refracts along color lines into five isolated shards that drift deep into the Blind Eternities, entirely isolated from two opposing colors of mana.
                        </p>
                    </div>

                    <!-- Isolation Era -->
                    <div class="relative">
                        <div class="absolute -left-10 top-0 w-4 h-4 rounded-full bg-slate-500 border-4 border-obsidian"></div>
                        <span class="text-slate-500 font-bold uppercase tracking-widest text-[10px]">THE DRIFT // SHARD ISOLATION</span>
                        <p class="text-white font-serif text-sm mt-1">Divergent Adaptation</p>
                        <p class="mt-2 text-slate-400 leading-relaxed font-sans text-xs sm:text-sm">
                            Centuries of isolated development. Bant establishes chivalric non-lethal orders; Esper pursues the Noble Work under finite etherium; Grixis decays into a closed thermodynamic cycle driven by Vis; Jund hardens into a volcanic struggle of volcanic predators; Naya worships behemoths and splits Nacatl civilization.
                        </p>
                    </div>

                    <!-- The Conflux -->
                    <div class="relative">
                        <div class="absolute -left-10 top-0 w-4 h-4 rounded-full bg-orange-500 border-4 border-obsidian"></div>
                        <span class="text-orange-500 font-bold uppercase tracking-widest text-[10px]">REALIGNMENT // THE CONFLUX</span>
                        <p class="text-white font-serif text-sm mt-1">Planar Collisions & The Maelstrom</p>
                        <p class="mt-2 text-slate-400 leading-relaxed font-sans text-xs sm:text-sm">
                            The shards converge. Nicol Bolas's network of agents systematically collapses the stabilizing obelisks, maximizing the energy of early territorial wars. The colossal Maelstrom storm forms at the planar overlap. Bolas attempts to ascend but is thwarted by Ajani Goldmane's unique auromancy.
                        </p>
                    </div>

                    <!-- Post-Conflux -->
                    <div class="relative">
                        <div class="absolute -left-10 top-0 w-4 h-4 rounded-full bg-emerald-500 border-4 border-obsidian"></div>
                        <span class="text-emerald-500 font-bold uppercase tracking-widest text-[10px]">POST-CONFLUX // INTEGRATED COEXISTENCE</span>
                        <p class="text-white font-serif text-sm mt-1">Synthesis and Planetary Trauma</p>
                        <p class="mt-2 text-slate-400 leading-relaxed font-sans text-xs sm:text-sm">
                            Reawakening of the unified Worldsoul (Progenitus). Inhabitants form synthetic relationships (Esper mining outposts in Jund, Nayan leonin integrating into Bantian knightly orders, and Kaalia of the Vast pursuing demon-dragon conflicts).
                        </p>
                    </div>

                </div>
            </div>

            <!-- Tab 3: Glossary -->
            <div id="db-tab-glossary" class="db-content hidden">
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-sm">
                    <div class="parchment-container p-4 rounded border border-white/5">
                        <span class="font-mono text-gold-500 block mb-1">Etherium</span>
                        <p class="text-slate-400 text-xs">Aether-infused filigree metal used by Esperites to replace organic tissue, enhancing intellect and structural life span.</p>
                    </div>
                    <div class="parchment-container p-4 rounded border border-white/5">
                        <span class="font-mono text-gold-500 block mb-1">Vis</span>
                        <p class="text-slate-400 text-xs">The raw, non-renewable intangible life-force processed by Grixian necromancers to temporarily stabilize dying magic and escape physical decay.</p>
                    </div>
                    <div class="parchment-container p-4 rounded border border-white/5">
                        <span class="font-mono text-gold-500 block mb-1">Progenitus</span>
                        <p class="text-slate-400 text-xs">The five-headed hydra avatar of Alara's Worldsoul, sleeping under Nayan soil during the Sundering and reawakened fully during the Conflux.</p>
                    </div>
                    <div class="parchment-container p-4 rounded border border-white/5">
                        <span class="font-mono text-gold-500 block mb-1">Bantuthroi</span>
                        <p class="text-slate-400 text-xs">Old-tongue term for "flesh of our volition," designating mortally reborn angels in the Bantian administrative hierarchies.</p>
                    </div>
                    <div class="parchment-container p-4 rounded border border-white/5">
                        <span class="font-mono text-gold-500 block mb-1">Sangrite</span>
                        <p class="text-slate-400 text-xs">An explosive, energy-rich red mineral native to volcanic seams in Jund, vital for cross-shard fuel and synthetic technologies.</p>
                    </div>
                    <div class="parchment-container p-4 rounded border border-white/5">
                        <span class="font-mono text-gold-500 block mb-1">Carmot</span>
                        <p class="text-slate-400 text-xs">The legendary, elusive red mineral resource sought after by Esper's Seekers of Carmot to forge new batches of finite etherium filigree.</p>
                    </div>
                </div>
            </div>

            <!-- Tab 4: Synthesis & Conflicts -->
            <div id="db-tab-synthesis" class="db-content hidden">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm">
                    <div class="parchment-container p-6 rounded-lg border border-gold-500/10">
                        <h4 class="font-serif text-lg text-white mb-4 flex items-center gap-2">
                            <i class="fa-solid fa-code-merge text-gold-500"></i>
                            Key Post-Conflux Synthesized Figures
                        </h4>
                        <div class="space-y-4 text-xs font-mono">
                            <div>
                                <strong class="text-white block">BREYA // Esper & Jund</strong>
                                <p class="text-slate-400 font-sans mt-1">Explored the hazardous volcanic vents of Jund to secure raw sangrite, successfully forging the first stable new etherium filigree in centuries.</p>
                            </div>
                            <div>
                                <strong class="text-white block">ELENI // Naya & Jund</strong>
                                <p class="text-slate-400 font-sans mt-1">A lost Nayan elf stranded in Jund who shed her tribal robes and fully integrated into Jund's nomadic clans, adopting traditional warrior tattoos.</p>
                            </div>
                            <div>
                                <strong class="text-white block">KAALIA OF THE VAST // Grixis & Beyond</strong>
                                <p class="text-slate-400 font-sans mt-1">Born Lia in Torchlight. Wields mystical command over angels, demons, and dragons alike in her crusade to destroy the demon lord Nefarox.</p>
                            </div>
                        </div>
                    </div>

                    <div class="parchment-container p-6 rounded-lg border border-gold-500/10">
                        <h4 class="font-serif text-lg text-white mb-4 flex items-center gap-2">
                            <i class="fa-solid fa-triangle-exclamation text-gold-500"></i>
                            Continuity Conflicts & Uncertainties
                        </h4>
                        <div class="space-y-4 text-xs font-sans text-slate-400 leading-relaxed">
                            <div>
                                <strong class="text-white block font-serif text-sm">The Synthesis of Mubin's Armor</strong>
                                <p class="mt-1">
                                    Accounts differ regarding the exact composition of the prosthetic used by Rafiq to save Mubin. Some secondary summaries omit the direct inclusion of carmot, suggesting the armor failed purely due to mechanical interface shock, while primary accounts emphasize the volatile integration of Jund sangrite and Esper metal.
                                </p>
                            </div>
                            <div>
                                <strong class="text-white block font-serif text-sm">The Sighted and Unbeholden Castes</strong>
                                <p class="mt-1">
                                    Historical records on Bant are occasionally conflicting regarding whether Unbeholden outcasts can officially transition back into the Mortar caste through service. Most guides portray the caste system as absolute, while individual naval records suggest high social fluidity in coastal Jhess.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </section>

    <!-- Footer and Sources Map -->
    <footer class="bg-obsidian border-t border-white/5 py-12 text-xs font-mono text-slate-500">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8 border-b border-white/5 pb-8">
                <div>
                    <h5 class="text-white font-serif uppercase tracking-wider mb-4">Research & Continuity Bibliography</h5>
                    <ol class="space-y-1.5 list-decimal list-inside">
                        <li>A Planeswalker's Guide to Alara — Wizards of the Coast — Tier 1 — Shard ecologies, geography, and social hierarchies.</li>
                        <li>Alara Unbroken (Novel) — Doug Beyer — Tier 1 — Primary narrative, Conflux War, and Nicol Bolas's networks.</li>
                        <li>Shards of Alara Flavor Text Compilation — Official Gatherer — Tier 2 — Mechanical card lore.</li>
                        <li>The Spellbook of Mayael the Anima — DailyMTG archives — Tier 1 — Cylian elven lore and behemoth records.</li>
                        <li>The Codex Etherium — Savor the Flavor — Tier 1 — Esper's philosophical rules and the Seekers of Carmot.</li>
                    </ol>
                </div>
                <div>
                    <h5 class="text-white font-serif uppercase tracking-wider mb-4">Artifact Source Mapping</h5>
                    <ul class="space-y-1">
                        <li><strong>Executive Summary:</strong> [1][2]</li>
                        <li><strong>Bant Dossier:</strong> [1][2][3]</li>
                        <li><strong>Esper Dossier:</strong> [1][3][5]</li>
                        <li><strong>Grixis Dossier:</strong> [1][2][3]</li>
                        <li><strong>Jund Dossier:</strong> [1][2][3]</li>
                        <li><strong>Naya Dossier:</strong> [1][2][4]</li>
                        <li><strong>The Conflux & Post-Reunion:</strong> [1][2][3]</li>
                    </ul>
                </div>
            </div>
            
            <div class="flex flex-col sm:flex-row justify-between items-center gap-4">
                <p>&copy; 2026 Alara Shards Codex. Synthesized by Google Gemini. Crafted for Vorthos Scholars.</p>
                <div class="flex gap-4">
                    <span class="text-[10px] bg-white/5 px-2.5 py-1 rounded border border-white/5 text-gold-500 uppercase font-mono tracking-widest">AETHER-SHUT SYSTEM ACTIVATED</span>
                </div>
            </div>
        </div>
    </footer>

    <!-- Embedded Scripts for Interactive Features -->
    <script>
        // Web Audio API Synthesizer (Arcane Spell Generator)
        let audioCtx;
        function playAuraSynth(freq, type = 'sine') {
            try {
                // Initialize context on demand (browsers block autoplay)
                if (!audioCtx) {
                    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
                }
                
                // Safety guard for closed contexts
                if (audioCtx.state === 'suspended') {
                    audioCtx.resume();
                }

                const osc = audioCtx.createOscillator();
                const gainNode = audioCtx.createGain();

                osc.type = type;
                osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
                
                // Complex frequency modulation to sound "magical"
                osc.frequency.exponentialRampToValueAtTime(freq * 1.5, audioCtx.currentTime + 1.2);

                gainNode.gain.setValueAtTime(0.15, audioCtx.currentTime);
                gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 1.2);

                osc.connect(gainNode);
                gainNode.connect(audioCtx.destination);

                osc.start();
                osc.stop(audioCtx.currentTime + 1.3);
            } catch (err) {
                console.warn("Audio context not supported or initialized: ", err);
            }
        }

        // Shard Selection Theme Engine
        const shardThemes = {
            bant: {
                primary: '#34d399', // Emerald
                secondary: '#065f46',
                glow: 'rgba(52, 211, 153, 0.25)',
                grid: 'rgba(52, 211, 153, 0.05)',
                bg: '#052e16'
            },
            esper: {
                primary: '#22d3ee', // Cyan
                secondary: '#155e75',
                glow: 'rgba(34, 211, 238, 0.25)',
                grid: 'rgba(34, 211, 238, 0.05)',
                bg: '#083344'
            },
            grixis: {
                primary: '#c084fc', // Purple
                secondary: '#6b21a8',
                glow: 'rgba(192, 132, 252, 0.25)',
                grid: 'rgba(192, 132, 252, 0.05)',
                bg: '#3b0764'
            },
            jund: {
                primary: '#f87171', // Red
                secondary: '#991b1b',
                glow: 'rgba(248, 113, 113, 0.25)',
                grid: 'rgba(248, 113, 113, 0.05)',
                bg: '#450a0a'
            },
            naya: {
                primary: '#fbbf24', // Amber
                secondary: '#92400e',
                glow: 'rgba(251, 191, 36, 0.25)',
                grid: 'rgba(251, 191, 36, 0.05)',
                bg: '#451a03'
            }
        };

        let activeThemeColor = '#c58a12'; // Initial gold

        function selectShard(shardKey) {
            const theme = shardThemes[shardKey];
            if (!theme) return;

            // Play specific chord sweep
            const freqs = { bant: 349.23, esper: 440.00, grixis: 220.00, jund: 130.81, naya: 196.00 };
            const synths = { bant: 'sine', esper: 'triangle', grixis: 'sawtooth', jund: 'sawtooth', naya: 'sine' };
            playAuraSynth(freqs[shardKey], synths[shardKey]);

            // Update CSS Custom Properties
            document.documentElement.style.setProperty('--mana-primary', theme.primary);
            document.documentElement.style.setProperty('--mana-secondary', theme.secondary);
            document.documentElement.style.setProperty('--mana-glow', theme.glow);
            document.documentElement.style.setProperty('--grid-color', theme.grid);
            
            activeThemeColor = theme.primary;

            // Update UI Button states
            document.querySelectorAll('.shard-btn').forEach(btn => {
                btn.classList.add('opacity-40');
                btn.classList.remove('ring-2', 'ring-offset-2', 'ring-offset-black', 'border-white');
            });
            const selectedBtn = document.getElementById(`btn-${shardKey}`);
            selectedBtn.classList.remove('opacity-40');
            selectedBtn.classList.add('ring-2', 'ring-offset-2', 'ring-offset-black');

            // Toggle dossier layouts
            document.querySelectorAll('.shard-dossier').forEach(dossier => {
                dossier.classList.add('hidden');
                dossier.classList.remove('active-dossier');
            });
            const selectedDossier = document.getElementById(`dossier-${shardKey}`);
            selectedDossier.classList.remove('hidden');
            selectedDossier.classList.add('active-dossier');
        }

        // Toggle Obelisk Sabotage Agent Files
        function toggleAgent(id) {
            const el = document.getElementById(`agent-${id}`);
            if (el.classList.contains('hidden')) {
                el.classList.remove('hidden');
                playAuraSynth(293.66, 'triangle'); // Spark D chord
            } else {
                el.classList.add('hidden');
            }
        }

        // Database Tab System
        function switchDbTab(tabKey) {
            document.querySelectorAll('.db-tab-btn').forEach(btn => {
                btn.classList.remove('border-b-2', 'border-gold-500', 'text-white');
                btn.classList.add('text-slate-400');
            });
            document.getElementById(`db-btn-${tabKey}`).classList.add('border-b-2', 'border-gold-500', 'text-white');
            document.getElementById(`db-btn-${tabKey}`).classList.remove('text-slate-400');

            document.querySelectorAll('.db-content').forEach(content => {
                content.classList.add('hidden');
            });
            document.getElementById(`db-tab-${tabKey}`).classList.remove('hidden');
            playAuraSynth(440, 'sine');
        }

        // Interactive Spark Quiz Engine
        const quizQuestions = [
            {
                text: "Your homeland is threatened by an external, unpredictable invader. What is your immediate response?",
                options: [
                    { text: "Organize the community under strict non-lethal defense codes, establishing ritual single combats.", shard: "bant" },
                    { text: "Systematically analyze and process the optimal physical defense equations, deploying mechanized units.", shard: "esper" },
                    { text: "Harvest the memories and life forces of local casualties to raise a temporary wall of animated defenses.", shard: "grixis" },
                    { text: "Unleash wild predatory instincts, leading hunters into volatile volcanic terrain to tear the threats apart.", shard: "jund" },
                    { text: "Blind individual sight to connect fully with natural forces, summoning giant, towering forest creatures.", shard: "naya" }
                ]
            },
            {
                text: "Which of these concepts represents your highest pursuit?",
                options: [
                    { text: "Absolute order, community harmony, and perfect chivalric service.", shard: "bant" },
                    { text: "Intellectual logic, physical preservation, and perfect technological symmetry.", shard: "esper" },
                    { text: "Selfish longevity, utilizing Vis to stay stable, escaping systemic dissolution.", shard: "grixis" },
                    { text: "Savage freedom, raw survival of physical prowess, and territorial apex mastery.", shard: "jund" },
                    { text: "Sensory awe, celebration of pristine growth, and primal ecological connection.", shard: "naya" }
                ]
            },
            {
                text: "When facing a critical resource shortage, how do you sustain your people?",
                options: [
                    { text: "Ration agricultural assets and depend on orderly, benevolent guides.", shard: "bant" },
                    { text: "Invade neighboring seams to strip materials and transition parts into metal filigree.", shard: "esper" },
                    { text: "Drain Vis and memories from the non-essential to stabilize necessary spells.", shard: "grixis" },
                    { text: "Trigger violent volcanic eruptions to naturally clear competing elements from the valleys.", shard: "jund" },
                    { text: "Migrate and adapt deep within nomadic vegetation layers, allowing natural abundance to heal the loss.", shard: "naya" }
                ]
            },
            {
                text: "What represents your deepest, most existential fear?",
                options: [
                    { text: "Shattered trust, individual passion, and chaotic unpredictability.", shard: "bant" },
                    { text: "Physical decay, chaotic organic mutations, and unpredictable biology.", shard: "esper" },
                    { text: "Complete energy dispersal, spiritual death, and quiet non-existence.", shard: "grixis" },
                    { text: "Entrapment by rules, legal systems, and intellectual immobilization.", shard: "jund" },
                    { text: "Cynical isolation, deconstruction of life, and the loss of sensory awe.", shard: "naya" }
                ]
            }
        ];

        let currentQuestionIdx = 0;
        let quizAnswers = { bant: 0, esper: 0, grixis: 0, jund: 0, naya: 0 };

        function startQuiz() {
            document.getElementById('quiz-intro').classList.add('hidden');
            document.getElementById('quiz-question-box').classList.remove('hidden');
            currentQuestionIdx = 0;
            quizAnswers = { bant: 0, esper: 0, grixis: 0, jund: 0, naya: 0 };
            showQuestion();
            playAuraSynth(523.25, 'sine'); // C5 Spark
        }

        function showQuestion() {
            const question = quizQuestions[currentQuestionIdx];
            document.getElementById('quiz-progress').innerText = `Question ${currentQuestionIdx + 1} of ${quizQuestions.length}`;
            document.getElementById('quiz-question-text').innerText = question.text;
            
            const optionsDiv = document.getElementById('quiz-options');
            optionsDiv.innerHTML = '';
            
            question.options.forEach((opt, idx) => {
                const btn = document.createElement('button');
                btn.className = "w-full text-left p-4 rounded-lg bg-black/40 border border-white/5 hover:border-gold-500/40 text-xs sm:text-sm text-slate-300 hover:text-white hover:bg-white/5 transition-all font-sans leading-relaxed flex items-center gap-3";
                btn.innerHTML = `<span class="w-5 h-5 rounded-full border border-gold-500/30 flex items-center justify-center font-mono text-[10px] text-gold-500">${String.fromCharCode(65 + idx)}</span> ${opt.text}`;
                btn.onclick = () => selectOption(opt.shard);
                optionsDiv.appendChild(btn);
            });
        }

        function selectOption(shard) {
            quizAnswers[shard]++;
            currentQuestionIdx++;
            playAuraSynth(587.33, 'sine'); // D5 pitch

            if (currentQuestionIdx < quizQuestions.length) {
                showQuestion();
            } else {
                showResults();
            }
        }

        const shardDescriptions = {
            bant: "GWU BANT: You prioritize absolute order, chivalric community cooperation, and ritualistic non-lethal solutions. You seek structure and are guided by high virtues.",
            esper: "WUB ESPER: You value technological perfection, clinical logic, and complete physical preservation. Symmetrical calculations govern your path.",
            grixis: "UBR GRIXIS: You understand the harsh realities of resource limits, managing entropic decay, and preserving your footprint at all costs.",
            jund: "BRG JUND: Primal freedom, raw geologic instinct, and immediate survival drive you. You thrive in chaotic, volcanic, hyper-lethal crucibles.",
            naya: "RGW NAYA: You celebrate natural evolution, immense sensory grandeur, and deep interconnected communion with physical creations."
        };

        let calculatedResultShard = "";

        function showResults() {
            document.getElementById('quiz-question-box').classList.add('hidden');
            document.getElementById('quiz-result-box').classList.remove('hidden');

            let bestShard = "bant";
            let maxVal = -1;
            for (let s in quizAnswers) {
                if (quizAnswers[s] > maxVal) {
                    maxVal = quizAnswers[s];
                    bestShard = s;
                }
            }

            calculatedResultShard = bestShard;
            document.getElementById('result-shard-name').innerText = bestShard.toUpperCase();
            document.getElementById('result-shard-desc').innerText = shardDescriptions[bestShard];
            playAuraSynth(783.99, 'sine'); // G5 High Spark
        }

        function restartQuiz() {
            document.getElementById('quiz-result-box').classList.add('hidden');
            document.getElementById('quiz-intro').classList.remove('hidden');
        }

        function saveAlignment() {
            if (!calculatedResultShard) return;
            localStorage.setItem('alara_shard_alignment', calculatedResultShard);
            alert(`Your alignment to ${calculatedResultShard.toUpperCase()} has been saved inside your browser's local codex.`);
            checkSavedAlignment();
            restartQuiz();
        }

        function checkSavedAlignment() {
            const saved = localStorage.getItem('alara_shard_alignment');
            if (saved) {
                document.getElementById('saved-profile-box').classList.remove('hidden');
                document.getElementById('saved-shard-name').innerText = saved;
                // Auto transition background to saved shard theme!
                selectShard(saved);
            } else {
                document.getElementById('saved-profile-box').classList.add('hidden');
            }
        }

        function clearSavedAlignment() {
            localStorage.removeItem('alara_shard_alignment');
            checkSavedAlignment();
            // Default back to default theme
            document.documentElement.style.setProperty('--mana-primary', '#c58a12');
            document.documentElement.style.setProperty('--mana-secondary', '#844d0e');
            document.documentElement.style.setProperty('--mana-glow', 'rgba(197, 138, 18, 0.25)');
            document.documentElement.style.setProperty('--grid-color', 'rgba(197, 138, 18, 0.05)');
            activeThemeColor = '#c58a12';
        }

        // Intersection Observer Arcane Reveals
        document.addEventListener("DOMContentLoaded", () => {
            checkSavedAlignment();
            
            const nodes = document.querySelectorAll('.reveal-node');
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('revealed');
                    }
                });
            }, { threshold: 0.1 });

            nodes.forEach(node => observer.observe(node));
        });

        // Interactive Spark Custom Cursor trails when clicking anywhere inside the body
        window.addEventListener('click', (e) => {
            for (let i = 0; i < 5; i++) {
                const particle = document.createElement('div');
                particle.className = 'sparkle-particle';
                particle.style.left = `${e.pageX + (Math.random() - 0.5) * 20}px`;
                particle.style.top = `${e.pageY + (Math.random() - 0.5) * 20}px`;
                particle.style.background = activeThemeColor;
                particle.style.boxShadow = `0 0 10px ${activeThemeColor}`;
                document.body.appendChild(particle);
                setTimeout(() => particle.remove(), 800);
            }
        });

        // HARDWARE ACCELERATED PARTICLE MAELSTROM CANVAS BACKGROUND
        const canvas = document.getElementById('maelstrom-canvas');
        const ctx = canvas.getContext('2d');
        let particlesArray = [];

        function resizeCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();

        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 2 + 1;
                this.speedX = (Math.random() - 0.5) * 0.4;
                this.speedY = (Math.random() - 0.5) * 0.4;
                this.color = this.getRandomManaColor();
            }

            getRandomManaColor() {
                const colors = [
                    'rgba(52, 211, 153, 0.3)', // Green
                    'rgba(34, 211, 238, 0.3)', // Cyan
                    'rgba(192, 132, 252, 0.3)', // Purple
                    'rgba(248, 113, 113, 0.3)', // Red
                    'rgba(251, 191, 36, 0.3)'   // Gold
                ];
                return colors[Math.floor(Math.random() * colors.length)];
            }

            update() {
                this.x += this.speedX;
                this.y += this.speedY;

                // Circular Maelstrom flow forces
                const dx = canvas.width / 2 - this.x;
                const dy = canvas.height / 2 - this.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist > 50) {
                    this.speedX += (dy / dist) * 0.005;
                    this.speedY -= (dx / dist) * 0.005;
                }

                // Boundary collision checks
                if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
                if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
            }

            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fillStyle = this.color;
                ctx.fill();
            }
        }

        function initParticles() {
            particlesArray = [];
            for (let i = 0; i < 80; i++) {
                particlesArray.push(new Particle());
            }
        }

        function animateParticles() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particlesArray.forEach(p => {
                p.update();
                p.draw();
            });
            requestAnimationFrame(animateParticles);
        }

        window.onload = function() {
            initParticles();
            animateParticles();
        }
    </script>
</body>
</html>