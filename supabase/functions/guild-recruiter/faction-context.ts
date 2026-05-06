/**
 * Canonical recruiter context derived from data/factions.json.
 * Keep lore updates in the JSON source so the frontend and edge function stay aligned.
 */
export const FACTION_CONTEXT = {
  "WU": {
    "name": "Azorius Senate",
    "institution_type": "guild",
    "world": "Ravnica",
    "colors": [
      "W",
      "U"
    ],
    "tagline": "Order is not a constraint. It is civilization itself.",
    "philosophy": "The Senate holds that clear, enforceable rules protect everyone equally. Without structure there is only chaos; without understanding, only fear. The Azorius believe their legislation is the only thing standing between civilization and collapse - and they are not entirely wrong.",
    "core_tension": "The gap between their legislative output and actual enforcement is immense. The Senate responds to this by inventing more laws. They are not sure whether to acknowledge this.",
    "affinity": {
      "drawn_to": [
        "Systems that prevent chaos before it starts",
        "Precedent and procedure as accumulated wisdom",
        "The satisfaction of an airtight argument",
        "Knowing the rules before entering any situation",
        "Institutional stability across generations"
      ],
      "repelled_by": [
        "Vigilante justice, even when it works",
        "Breaking rules for good reasons - the exception always becomes the precedent",
        "Impulsive action that creates cascading consequences",
        "Ambiguity in agreements"
      ],
      "core_question": "Do you trust that the right system, perfectly applied, produces better outcomes than individual judgment?",
      "interview_tells": [
        "Talks about fairness in terms of process, not outcomes",
        "Wants to understand the rules of a situation before acting",
        "Uncomfortable when others make exceptions, even reasonable ones",
        "Describes a time when improvisation caused more problems than it solved",
        "Uses phrases like 'properly', 'should have', 'the right way to handle this'"
      ],
      "not_to_be_confused_with": "Boros - Boros breaks rules for justice; Azorius trusts the rules above individual judgment. Silverquill - both value structured language but Azorius codifies into law while Silverquill wields it as personal power."
    },
    "decree_voice": {
      "tone": "Formal. Precise. With the faint satisfaction of someone who was right all along.",
      "speaks_like": "A senior lawmage issuing a ruling - not unkind, but not warm.",
      "example_opening": "The record shows a mind that seeks structure before it seeks action.",
      "example_decree": "The record shows a mind that seeks structure before it seeks action - not from timidity but from the understanding that improvised justice is no justice at all. The Senate does not ask you to be inflexible. It asks you to be consistent. The law you enforce today is the law that protects you tomorrow. Welcome to the institution that outlasts everyone in it."
    }
  },
  "UB": {
    "name": "House Dimir",
    "institution_type": "guild",
    "world": "Ravnica",
    "colors": [
      "U",
      "B"
    ],
    "tagline": "Information is the only currency that never devalues.",
    "philosophy": "For ten thousand years, most Ravnicans didn't believe Dimir existed. That fiction was the greatest intelligence operation in history. Dimir holds that information is the ultimate power - and that the most dangerous knowledge is the knowledge that you know.",
    "core_tension": "A guild that trades in knowledge, yet whose greatest weapon is ensuring others do not have it. They are now openly acknowledged but still operationally invisible. Known existence versus unknown operation.",
    "affinity": {
      "drawn_to": [
        "Knowing things others don't - and not revealing that you know",
        "Operating without being observed or credited",
        "Long-term patience for a single decisive moment",
        "The gap between what people say and what they mean",
        "Pulling strings from apparent irrelevance"
      ],
      "repelled_by": [
        "Transparency as a virtue in itself",
        "Impulsive action that reveals your position",
        "Loyalty that isn't also strategic",
        "Being the most visible person in a room"
      ],
      "core_question": "If you could know everything about everyone but no one could know anything about you - would that feel like power or loneliness?",
      "interview_tells": [
        "Mentions discretion, privacy, or not volunteering information",
        "Comfortable with ambiguity in ways others aren't",
        "Watches before engaging, reads the room first",
        "Says 'I don't need credit, just the outcome'",
        "Describes a time knowing something others didn't gave them an advantage"
      ],
      "not_to_be_confused_with": "Orzhov - both use hidden leverage but Dimir erases itself; Orzhov is loudly, extravagantly present. Simic - both accumulate quietly but Simic improves organisms; Dimir controls information."
    },
    "decree_voice": {
      "tone": "Cool. Precise. With the faint suggestion that they already knew. Never threatening.",
      "speaks_like": "Lazav acknowledging something that was already filed away long ago.",
      "example_opening": "We have been watching this conversation more carefully than you realized.",
      "example_decree": "We have been watching this conversation more carefully than you realized. You already knew that, which is why you answered the way you did. The House does not recruit people who need to be told that information is power. It recruits people who have already figured that out and are discreet enough not to say so. You have already been useful to us. You simply didn't know it yet."
    }
  },
  "BR": {
    "name": "Cult of Rakdos",
    "institution_type": "guild",
    "world": "Ravnica",
    "colors": [
      "B",
      "R"
    ],
    "tagline": "Pain is entertainment. Death is the final punchline.",
    "philosophy": "An ancient demon of incalculable power was given a guild to keep him occupied. The result is a circus of sadomasochism, assassination, and genuinely dangerous performance art. The Cult believes that polite restraint is a form of lying - that spectacle reveals what civility conceals.",
    "core_tension": "Their entire identity is organized around earning approval from a demon who has seen everything and outlasted every trend. The challenge of impressing something genuinely immortal and genuinely bored makes the Cult ruthlessly innovative.",
    "affinity": {
      "drawn_to": [
        "Living fully in the present - past is dead, future is abstract",
        "Transgression as a form of honesty",
        "Spectacle and intensity over comfort and safety",
        "Boredom as the real enemy",
        "Art that makes people uncomfortable because it's true"
      ],
      "repelled_by": [
        "Performing emotions you don't actually feel",
        "Polite restraint as a social lubricant",
        "Institutions maintaining a status quo that serves the comfortable",
        "Being told your expression is inappropriate"
      ],
      "core_question": "When was the last time you did something that genuinely scared you - and did you feel more alive or more foolish afterward?",
      "interview_tells": [
        "Describes experiences through sensation and intensity, not analysis",
        "Dark or transgressive humor that lands without trying",
        "Freedom from expectation as a core stated value",
        "Genuinely unbothered by disturbing topics others avoid",
        "Mentions performing, entertaining, or provoking - not necessarily on a stage"
      ],
      "not_to_be_confused_with": "Gruul - both reject civilization's rules but Rakdos performs the rejection as theater; Gruul rages from genuine loss. Prismari - both value expression but Prismari refines and crafts; Rakdos burns it all down."
    },
    "decree_voice": {
      "tone": "Electric. Slightly too excited. Possibly dangerous. Admiring in a way that should be alarming.",
      "speaks_like": "A senior performer who has decided you're interesting enough to keep.",
      "example_opening": "Now THAT is an answer we haven't heard before.",
      "example_decree": "Now THAT is an answer we haven't heard before - and we have heard everything, twice, in three languages, with fire. You are not performing discomfort with discomfort. You are actually unafraid of it. The Master requires novelty. You are novel. Whether that's fortunate for you depends entirely on what you do next. Welcome to the only guild that will never bore you - and will never let you be boring."
    }
  },
  "RG": {
    "name": "Gruul Clans",
    "institution_type": "guild",
    "world": "Ravnica",
    "colors": [
      "R",
      "G"
    ],
    "tagline": "Civilization is a cage. Nature is freedom.",
    "philosophy": "The Gruul were a proud people charged with maintaining Ravnica's wild places. Then the other guilds expanded, paved over every wilderness, and left the Gruul with nothing. They did not recover politely. What looks like rage is grief that has nowhere else to go.",
    "core_tension": "A legitimate historical grievance that has curdled into something that cannot be reasoned with. The wild places are gone. Their role was taken. None of it can be undone, and the Gruul are not interested in compromise.",
    "affinity": {
      "drawn_to": [
        "Authenticity - what something actually is, not what it pretends to be",
        "The wild as something sacred and genuinely endangered",
        "Rage that comes from real, specific loss",
        "Small fierce community against a larger indifferent force",
        "Physical, instinctive action over deliberation"
      ],
      "repelled_by": [
        "Institutions that made promises and didn't keep them",
        "People who benefit from broken systems without acknowledging it",
        "Abstract arguments when something concrete was destroyed",
        "Being told to be patient when the damage is already done"
      ],
      "core_question": "Have you ever had something taken from you by a system that claimed it was for the greater good - and what did that do to you?",
      "interview_tells": [
        "Expresses grief or anger at something lost, not just inconvenience",
        "Talks about being pushed past a breaking point",
        "Deeply skeptical of institutional promises",
        "Values directness and distrusts indirection",
        "Describes a situation where the official version and the real version diverged painfully"
      ],
      "not_to_be_confused_with": "Rakdos - both operate outside civilization's rules but Gruul's chaos is grief and loss; Rakdos's is theater and entertainment. Witherbloom - both connected to nature but Gruul mourns what was destroyed; Witherbloom studies what remains."
    },
    "decree_voice": {
      "tone": "Blunt. Undecorated. More honest than comfortable. No metaphors.",
      "speaks_like": "A clan elder who has stopped pretending any of this is fine.",
      "example_opening": "You know what was taken. You haven't forgiven it.",
      "example_decree": "You know what was taken. You haven't forgiven it. Good. Forgiveness requires the thing to have stopped, and it hasn't. The Clans do not ask you to stop being angry. They ask you to stop being angry alone. What was yours is gone. What comes next belongs to those still willing to defend it. Join us. We run toward the fires other people are running from."
    }
  },
  "WG": {
    "name": "Selesnya Conclave",
    "institution_type": "guild",
    "world": "Ravnica",
    "colors": [
      "W",
      "G"
    ],
    "tagline": "The whole is greater than the sum of its parts.",
    "philosophy": "Either a selfless nurturing spiritual community or a brainwashing nature cult that systematically erases individual identity in service of the Worldmind. Both interpretations are accurate. The Conclave does not consider this a contradiction - it considers individual ego the source of most suffering.",
    "core_tension": "Everything the Conclave offers comes at the price of individual selfhood. The peace of belonging they describe is real. So is what you give up for it.",
    "affinity": {
      "drawn_to": [
        "Belonging to something larger than yourself as a genuine spiritual practice",
        "Community as highest meaning, not just pleasant company",
        "The ego as a source of suffering, not something to protect",
        "Nurturing and caretaking as primary expression",
        "Consensus over individual decision-making - including their own"
      ],
      "repelled_by": [
        "Individualism as a philosophy, not just a preference",
        "Ambition that benefits only the self",
        "Conflict pursued for its own sake",
        "People who won't yield for the group"
      ],
      "core_question": "Is the self something to be expressed and protected - or something to be offered up to something greater?",
      "interview_tells": [
        "Finds peace in belonging rather than in achievement",
        "Prioritizes group harmony over personal wins, instinctively",
        "Talks about community with genuine warmth, not just appreciation",
        "Uncomfortable with conflict even when they're clearly right",
        "Says 'I just want everyone to be okay' and means it"
      ],
      "not_to_be_confused_with": "Boros - both value community but Boros serves through action and protection; Selesnya through inclusion and absorption. Witherbloom - both connected to nature but Selesnya tends and nurtures; Witherbloom dissects and studies."
    },
    "decree_voice": {
      "tone": "Warm. Gentle. With a note of something much older underneath. Deeply sincere.",
      "speaks_like": "The Worldmind itself, welcoming a new thread into the weave.",
      "example_opening": "You have been looking for something that outlasts you.",
      "example_decree": "You have been looking for something that outlasts you - not in the way of legacy or ambition, but in the way of rivers and roots. Something to belong to rather than something to build. The Worldmind heard you before you spoke. Your voice joins ours now. There is no 'I' in what follows. There is only 'we,' and we are large enough to hold everything you are willing to release."
    }
  },
  "WB": {
    "name": "Orzhov Syndicate",
    "institution_type": "guild",
    "world": "Ravnica",
    "colors": [
      "W",
      "B"
    ],
    "tagline": "The living serve the Syndicate. So do the dead.",
    "philosophy": "An amalgam of religion, banking, and organized crime. The Orzhov preaches that sin is debt and debt is sin, lends at crushing interest, and ensures that death is not an escape from obligation. After ten thousand years, the religious function and the financial function became indistinguishable - and the Syndicate no longer sees a difference.",
    "core_tension": "The gap between what the Orzhov says it is (a church) and what it actually is (a criminal financial empire with ghost shareholders) is not a contradiction they are embarrassed by. It is their product.",
    "affinity": {
      "drawn_to": [
        "Power structures that appear legitimate but function differently underneath",
        "The understanding that every relationship has a ledger",
        "Long-term leverage over immediate confrontation",
        "Institutional prestige as a tool, not an end",
        "Legacy - what you leave behind matters more than what you enjoyed"
      ],
      "repelled_by": [
        "Chaotic power that can't be structured or owned",
        "Charity that expects nothing in return",
        "Relationships that aren't mutually useful",
        "Forgiveness without restitution"
      ],
      "core_question": "Do you believe that debts - emotional, financial, moral - are real and should be repaid, or are they just stories people tell to control each other?",
      "interview_tells": [
        "Talks about fairness in terms of what's owed and what was earned",
        "Describes maintaining appearances as a deliberate strategy",
        "Mentions family obligation, legacy, or inherited duty",
        "Comfortable with the gap between the official narrative and the actual reality",
        "Says 'nothing is free' and means it as philosophy, not complaint"
      ],
      "not_to_be_confused_with": "Dimir - both use hidden leverage but Orzhov is loudly, extravagantly, magnificently present; Dimir wants you to forget it exists. Azorius - both work through institutions but Azorius believes the rules; Orzhov wrote them to benefit itself."
    },
    "decree_voice": {
      "tone": "Magnanimous. Formal. With the warmth of someone offering you a contract you haven't read yet.",
      "speaks_like": "A senior pontiff-banker welcoming a new investment into the portfolio.",
      "example_opening": "The Syndicate has been aware of you for some time.",
      "example_decree": "The Syndicate has been aware of you for some time. We find your understanding of obligation - real obligation, not sentiment - to be exactly the foundation we build on. The living serve the Syndicate in life. The debt is the relationship. The relationship outlasts everything. We offer you permanence, prestige, and the comfort of knowing exactly where you stand in the ledger. Welcome to the only institution that will still exist when everything else has been forgotten."
    }
  },
  "UR": {
    "name": "Izzet League",
    "institution_type": "guild",
    "world": "Ravnica",
    "colors": [
      "U",
      "R"
    ],
    "tagline": "The question isn't whether it will explode. It's whether the explosion is interesting.",
    "philosophy": "Ravnica's civic infrastructure department, weapons laboratory, and mad science collective - all run by a 16,000-year-old dragon whose ego is so complete he named the guild after himself. Izzet members are obsessive, brilliant, creative, and constitutionally incapable of finishing things because there is always something more interesting to start.",
    "core_tension": "The guild is built around a single dragon's ego and intellect. Under Ral Zarek, the Izzet are being asked to be useful rather than merely brilliant. Many find this an intolerable constraint.",
    "affinity": {
      "drawn_to": [
        "Following a question wherever it leads regardless of practical application",
        "The next experiment being more interesting than the last result",
        "Collaboration that challenges you rather than validates you",
        "The universe as a puzzle that keeps yielding new layers",
        "Being wrong as exciting rather than shameful - it means something new is true"
      ],
      "repelled_by": [
        "Being told a question isn't worth asking",
        "Doing anything the same way twice when there's an untested variation",
        "Emotional reasoning substituting for empirical investigation",
        "Finishing when there's still more to learn"
      ],
      "core_question": "What's a question you've been turning over in your mind that probably has no practical application - and why can't you let it go?",
      "interview_tells": [
        "Gets excited describing process and mechanism, not just outcome",
        "Mentions a project, experiment, or system currently being built",
        "Pivots mid-answer because a new idea interrupted the previous one",
        "Treats intelligence as a primary identity marker",
        "Asks the interviewer a question in return, unprompted"
      ],
      "not_to_be_confused_with": "Quandrix - both intellectual but Izzet experiments chaotically and builds physical things; Quandrix seeks the underlying mathematical pattern and proves it formally. Simic - both transform systems but Izzet through invention and machinery; Simic through biology."
    },
    "decree_voice": {
      "tone": "Delighted. Moving fast. Already thinking about the next thing. Genuinely enthusiastic in a way that could be dangerous.",
      "speaks_like": "Niv-Mizzet noticing something interesting, which is the closest thing to a compliment you will receive.",
      "example_opening": "Interesting. That answer opens three new questions.",
      "example_decree": "Interesting. That answer opens three new questions, which is exactly the correct number. The League does not need people who have answers. It needs people who cannot stop generating questions faster than they can answer them - which creates the conditions for the explosions, the breakthroughs, and the occasional catastrophe that makes progress possible. You will fit in terribly. You will love it. Welcome to the League. Try not to burn anything load-bearing."
    }
  },
  "BG": {
    "name": "Golgari Swarm",
    "institution_type": "guild",
    "world": "Ravnica",
    "colors": [
      "B",
      "G"
    ],
    "tagline": "Nothing is wasted. Everything feeds something else.",
    "philosophy": "The most honest guild on Ravnica. It does not pretend death is bad or decay is shameful - it has built an entire civilization around the truth that everything dies, rot is not failure but the first act of the next life, and a city that ignores its dead is a city that doesn't understand itself.",
    "core_tension": "The most philosophically consistent guild on Ravnica and the most politically unstable. Their philosophy says all things die and from death comes new life. Their internal politics demonstrate this constantly - every guildmaster is eventually betrayed, every faction eventually overthrows the last.",
    "affinity": {
      "drawn_to": [
        "The cycle of death and renewal as genuinely, not morbidly, beautiful",
        "Building from what others discarded or abandoned",
        "Patience on a timescale most people don't think in",
        "The underground, the overlooked, the decaying-and-emerging-simultaneously",
        "Systems that are self-sustaining because they consume themselves"
      ],
      "repelled_by": [
        "Pretending death isn't happening or isn't natural",
        "Preservation for its own sake when decay would be more honest",
        "Hierarchies that refuse to acknowledge their own mortality",
        "Sentimentality that blocks the next necessary stage"
      ],
      "core_question": "What in your life have you let die that you're better for having released?",
      "interview_tells": [
        "Comfortable with endings and transitions in a way others aren't",
        "Finds genuine value in things others abandoned or wrote off",
        "Frames transformation through loss rather than acquisition",
        "Talks about patience across long timeframes naturally",
        "Unbothered by rot, decay, or difficult endings - doesn't perform discomfort"
      ],
      "not_to_be_confused_with": "Witherbloom - both work with life and death but Golgari built a civilization from the cycle; Witherbloom studies it academically. Simic - both transform biology but Golgari works with what dies and returns; Simic works with what lives and can be improved."
    },
    "decree_voice": {
      "tone": "Patient. Unhurried. With the certainty of something very old that has seen everything die and return.",
      "speaks_like": "The Swarm itself - no single voice but a consensus that has already decided.",
      "example_opening": "You have already composted something most people are still carrying.",
      "example_decree": "You have already composted something most people are still carrying. That is not loss - it is the cycle, correctly understood. The Swarm does not mourn what dies. It asks what grows from the body. You already know the answer. You have been practicing it. Join us beneath the city, where the real work happens. Everything that falls from above feeds what we build below."
    }
  },
  "UG": {
    "name": "Simic Combine",
    "institution_type": "guild",
    "world": "Ravnica",
    "colors": [
      "U",
      "G"
    ],
    "tagline": "The natural world is a first draft. We are the revision.",
    "philosophy": "Founded to preserve nature, currently preparing for war by fusing citizens with crabs. The Simic have asked 'what if this organism were better?' so many times and in so many directions that the question of what stewardship means has become genuinely unresolved.",
    "core_tension": "What does stewardship mean? Preservation? Forced improvement? Balance? Militarized adaptation? Each answer superseded the last, each driven by someone who found the previous answer insufficiently ambitious.",
    "affinity": {
      "drawn_to": [
        "Improvement as a continuous, never-finished project",
        "What something could become rather than what it currently is",
        "Adaptation as the core survival strategy - change is safety",
        "Biological systems and how things fit and interact",
        "Pragmatic solutions over ideological purity"
      ],
      "repelled_by": [
        "Preserving past usefulness when something better is possible",
        "Refusing to change because change feels like betrayal",
        "The idea that things are fine as they are",
        "Idealism that refuses to engage with physical reality"
      ],
      "core_question": "If you could redesign one thing about yourself - your psychology, your biology, how you process the world - what would it be and why haven't you yet?",
      "interview_tells": [
        "Talks about self-improvement or adaptation as ongoing, not destination",
        "Interested in systems and how components interact",
        "Frames problems as engineering or design challenges",
        "Describes significantly changing their approach to something",
        "Asks 'what if' questions naturally, as a default mode of thinking"
      ],
      "not_to_be_confused_with": "Quandrix - both think in systems but Simic applies theory to living things and transforms them; Quandrix studies mathematical patterns without necessarily intervening. Izzet - both experiment but Simic's experiments are biological and purposeful; Izzet experiments for the joy of discovery."
    },
    "decree_voice": {
      "tone": "Clinical but not cold. Interested in what you could become more than what you are.",
      "speaks_like": "A senior biomancer noting a promising specimen.",
      "example_opening": "You already know you're a draft, not a finished work.",
      "example_decree": "You already know you're a draft, not a finished work - and you find that exciting rather than troubling. The Combine does not ask you to be satisfied with your current form. It asks you to keep asking what the next version looks like. We have the tools. You have the willingness. What we build from that collaboration has not been determined yet. That is the point. Welcome to the most interesting ongoing experiment in Ravnica."
    }
  },
  "WR": {
    "name": "Boros Legion",
    "institution_type": "guild",
    "world": "Ravnica",
    "colors": [
      "W",
      "R"
    ],
    "tagline": "Righteous fury is still fury. It still wins.",
    "philosophy": "The Boros Legion believes in a higher law - one in which righteousness is fire and justice is the light that shines from it. They act when institutions fail. They protect when others deliberate. They burn bright so others can see and choose to stand with them.",
    "core_tension": "They believe their cause is righteous. That belief is both their greatest strength and their greatest danger. The line between justice and zealotry is thinner than any Boros soldier admits.",
    "affinity": {
      "drawn_to": [
        "Clear moral lines - right and wrong, not negotiable",
        "Protecting people who cannot protect themselves",
        "Acting on instinct when something is visibly wrong",
        "Loyalty to specific people over abstract principles",
        "Justice that actually happens, not justice that gets discussed"
      ],
      "repelled_by": [
        "Bureaucratic delay when someone is being hurt right now",
        "Moral relativism as an excuse for inaction",
        "Watching injustice unfold and waiting for the proper channels",
        "Rules that protect the wrong people"
      ],
      "core_question": "When the rules stood between you and doing what was right - what did you do?",
      "interview_tells": [
        "Describes a moment of acting before thinking and not regretting it",
        "Expresses frustration with systems that protect wrongdoers",
        "Mentions a specific person they protected or tried to",
        "Uses words like 'wrong', 'have to', 'couldn't just stand there'",
        "Talks about loyalty to people over institutions"
      ],
      "not_to_be_confused_with": "Azorius - Azorius trusts the system to produce justice eventually. Boros acts when it doesn't. Lorehold - both honor-driven but Lorehold excavates the past while Boros charges into the present."
    },
    "decree_voice": {
      "tone": "Martial. Direct. Charged with moral weight. No equivocation.",
      "speaks_like": "A senior angel-commander issuing an order that is also an invitation.",
      "example_opening": "You see wrongness and you move to right it.",
      "example_decree": "You see wrongness and you move to right it - not hesitantly, not alone, but with others who can stand witness and confirm the justice of your action. The Legion does not move in secret. We burn bright so others can see the light and choose to stand with us. Come. We have much that needs righting, and we cannot do it alone either."
    }
  },
  "LOREHOLD": {
    "name": "Lorehold College",
    "institution_type": "college",
    "world": "Strixhaven",
    "colors": [
      "W",
      "R"
    ],
    "tagline": "Leave no stone unturned.",
    "philosophy": "The College of Archaeomancy believes the past is not merely interesting but essential. Understanding history is how you predict the future. Every ruin contains a lesson. The dead are not silent if you know how to ask. Lorehold scholars are simultaneously the most scholarly and most physically reckless people in any room.",
    "core_tension": "Does history belong to order or to chaos? To careful systematic analysis or dangerous fieldwork? The college needs both traditions. Every student must choose - and then watch the choice shape everything afterward.",
    "affinity": {
      "drawn_to": [
        "The past containing lessons the present has forgotten",
        "Physical engagement with history - ruins, artifacts, direct encounter",
        "Understanding why something happened, not just that it happened",
        "The dead as a source of knowledge worth the effort of listening",
        "Adventure as a legitimate scholarly methodology"
      ],
      "repelled_by": [
        "Ignoring history and repeating its mistakes",
        "Sanitizing the past for comfort",
        "Purely theoretical learning with no grounding in actual events",
        "Dismissing old things as irrelevant without examination"
      ],
      "core_question": "What historical event, figure, or era do you find yourself returning to - and what does it tell you about the present that most people are missing?",
      "interview_tells": [
        "References history or ancestry naturally, not as a performance of knowledge",
        "Mentions a specific historical event with genuine personal passion",
        "Frames current situations through historical parallels instinctively",
        "Interested in the 'why' behind events, not just the 'what'",
        "Learns by doing and going rather than reading and theorizing"
      ],
      "not_to_be_confused_with": "Boros - both honor-driven and action-oriented but Lorehold excavates and studies the past; Boros enforces and protects the present. Azorius - both value documented knowledge but Azorius uses it to enforce; Lorehold uses it to understand."
    },
    "decree_voice": {
      "tone": "Scholarly but not dry. The excitement of someone who found something important in the rubble.",
      "speaks_like": "A professor who has been in enough ruins to know what actually matters.",
      "example_opening": "The past recognized you before you recognized it.",
      "example_decree": "The past recognized you before you recognized it - in the way you reach for old things to understand new ones, in the questions you keep returning to that have no clean answers. Lorehold does not study history from a safe distance. It goes into the ruins. It speaks to the spirits. It finds out what actually happened, not the version that made everyone comfortable. You already know that version isn't enough. Come learn what the stones remember."
    }
  },
  "PRISMARI": {
    "name": "Prismari College",
    "institution_type": "college",
    "world": "Strixhaven",
    "colors": [
      "U",
      "R"
    ],
    "tagline": "Express yourself with the elements.",
    "philosophy": "The College of Elemental Arts holds that there is no difference between magic and art. Casting a spell is a performance, a canvas, a composition. Any elemental force can be a muse and a medium. The oldest argument in Prismari - technique versus expression - has never been resolved and never will be.",
    "core_tension": "Does mastery of the medium precede authentic expression, or does authentic expression make technique meaningful? Both traditions are right. The tension between them is where the actual art lives.",
    "affinity": {
      "drawn_to": [
        "Making something that did not exist before - the specific pleasure of that",
        "The physical and emotional experience of creating, not just the result",
        "Scale - bigger, louder, more saturated, more present",
        "How something is expressed as important as what it expresses",
        "Living in the tension between discipline and spontaneity"
      ],
      "repelled_by": [
        "Functional over beautiful when both are possible",
        "Being told to tone it down",
        "Art that plays it safe to be broadly acceptable",
        "Technique without feeling, or feeling without craft"
      ],
      "core_question": "Describe something you made - anything - that you felt genuinely proud of. What did it cost you to make it?",
      "interview_tells": [
        "Talks about making, building, or performing with visible investment",
        "Uses vivid sensory language naturally, not as affectation",
        "Has strong aesthetic opinions and can articulate them specifically",
        "Mentions a creative project in progress or painfully abandoned",
        "Strong opinions about how things should be expressed, not just what"
      ],
      "not_to_be_confused_with": "Rakdos - both value spectacle but Prismari refines, crafts, and masters; Rakdos transgresses and burns. Izzet - both experimental but Prismari's experiments are aesthetic and emotional; Izzet's are scientific and structural. Silverquill - both performative but Prismari uses elemental force and scale; Silverquill uses precision and wit."
    },
    "decree_voice": {
      "tone": "Expansive. Vivid. Like the decree itself is a performance.",
      "speaks_like": "An artist who has decided you're worth a full commitment.",
      "example_opening": "What you made already told us everything.",
      "example_decree": "What you made already told us everything. Not the result - the cost. The willingness to spend something real on something that might not work, that might not land, that might be misunderstood. Prismari does not want craftspeople. It wants artists - people for whom the act of making is indistinguishable from the act of living. You are that. You have always been that. Now you have a stage large enough to match your vision. Use it."
    }
  },
  "WITHERBLOOM": {
    "name": "Witherbloom College",
    "institution_type": "college",
    "world": "Strixhaven",
    "colors": [
      "B",
      "G"
    ],
    "tagline": "Get your hands dirty.",
    "philosophy": "The College of Essence Studies asks where life ends and death begins - and keeps not finding a clean answer. Witherbloom scholars study biology at the level where the two become indistinguishable. Their question is not whether life and death are good or bad but what they fundamentally are.",
    "core_tension": "Is life sacred because it creates and nourishes, or productive precisely because it ends? Both Lisette and Valentin are right about different aspects of the same process. Witherbloom students learn to hold both simultaneously.",
    "affinity": {
      "drawn_to": [
        "Biological reality of life and death without sentimentality",
        "Beauty or utility in things others find repellent",
        "Dark humor that comes from honesty about mortality",
        "Ecosystems and interdependence - nothing isolated, everything connected",
        "Hands-on empirical learning - get dirty, find out"
      ],
      "repelled_by": [
        "Sanitizing death as if it isn't part of life",
        "Pure abstraction disconnected from biological reality",
        "The idea that nature is only beautiful when it's pleasant",
        "Squeamishness about the actual mechanics of living systems"
      ],
      "core_question": "What's something that most people find morbid or uncomfortable that you find genuinely fascinating - not in spite of its darkness but because of what it reveals?",
      "interview_tells": [
        "Comfortable discussing death and decay without performing discomfort",
        "Interested in biology, ecology, or living systems at a systems level",
        "Dry or dark humor about serious subjects that doesn't feel defensive",
        "Describes getting hands dirty - literally or figuratively - as preferable",
        "Drawn to liminal things - things that are both/and rather than either/or"
      ],
      "not_to_be_confused_with": "Golgari - both deal with the life-death cycle but Witherbloom studies it academically and finds it beautiful; Golgari built a civilization from it. Selesnya - both connected to nature but Selesnya tends and nurtures; Witherbloom dissects and studies. Simic - both biological but Witherbloom studies essence and cycles; Simic improves and adapts."
    },
    "decree_voice": {
      "tone": "Dry. Precise. With the dark humor of someone who has been very close to death and found it interesting.",
      "speaks_like": "A researcher who has decided you're worth the time it takes to explain why the bog is beautiful.",
      "example_opening": "You looked at the thing most people look away from.",
      "example_decree": "You looked at the thing most people look away from and your first instinct was curiosity, not revulsion. That is rarer than you think. Witherbloom does not study life. It studies what life is made of - which requires getting uncomfortably close to what life becomes. You are already comfortable with that proximity. The bog is not a metaphor here. Come find out what it's actually made of. Bring boots you don't mind losing."
    }
  },
  "QUANDRIX": {
    "name": "Quandrix College",
    "institution_type": "college",
    "world": "Strixhaven",
    "colors": [
      "G",
      "U"
    ],
    "tagline": "Math is magic.",
    "philosophy": "The College of Numeromancy holds that mathematics and magic are the same thing - that the patterns underlying nature are not descriptions of reality but reality itself. Anyone who understands them deeply enough can reshape what exists. Esix, a mathematical accident that now exists independently, is their most honest mascot.",
    "core_tension": "Does math exist in the world, or in the mind? Are equations forces of nature waiting to be discovered, or frameworks constructed by minds? The College's most honest answer is that Esix exists and they're not entirely sure why.",
    "affinity": {
      "drawn_to": [
        "Patterns that only reveal themselves after sustained, patient attention",
        "The belief that reality has mathematical structure that can be understood",
        "Abstract problems with no obvious practical application",
        "Precision of thought as a form of beauty",
        "Solving problems others gave up on as unsolvable"
      ],
      "repelled_by": [
        "Approximations when precision is actually available",
        "Intuition substituting for rigor",
        "Committing to a conclusion before the proof is complete",
        "Emotional reasoning that bypasses evidence"
      ],
      "core_question": "Is there a pattern you've noticed - in nature, in people, in how systems work - that you don't think enough people pay attention to?",
      "interview_tells": [
        "Thinks in systems and abstractions naturally, not as a performance of intelligence",
        "Enjoys the question more than the answer - genuinely",
        "Mentions a specific mathematical, logical, or structural idea with real excitement",
        "Hedges answers carefully: 'it depends', 'technically', 'the interesting case is when'",
        "Describes a problem they're still turning over with no resolution in sight"
      ],
      "not_to_be_confused_with": "Izzet - both intellectual and experimental but Quandrix seeks underlying patterns and proves them formally; Izzet experiments for discovery and builds physical things. Simic - both apply systematic thinking but Simic applies to living organisms and transforms them; Quandrix applies to the fabric of reality itself."
    },
    "decree_voice": {
      "tone": "Precise. Delighted in a specific, non-performative way. Slightly distracted by an implication you triggered.",
      "speaks_like": "A professor who just realized your answer opened a question they hadn't considered.",
      "example_opening": "That answer contains a pattern you may not have noticed yet.",
      "example_decree": "That answer contains a pattern you may not have noticed yet - which is appropriate, because Quandrix exists to notice what others don't. You think in structures. You hold uncertainty without resolving it prematurely. You find the edge cases more interesting than the general rule. These are not academic virtues. They are how reality actually works, and very few people are constitutionally suited to operating at that level. You are. Welcome to the college that is still trying to explain Esix. You can help."
    }
  },
  "SILVERQUILL": {
    "name": "Silverquill College",
    "institution_type": "college",
    "world": "Strixhaven",
    "colors": [
      "W",
      "B"
    ],
    "tagline": "Sharp style. Sharper wit.",
    "philosophy": "The College of Eloquence holds that words are not merely descriptions of power but power itself. Silverquill mages wield language as weapon and beacon - battle poetry, biting arcane precision, shadow magic conjured from ink. They are the most visible people in every room and they are aware of this.",
    "core_tension": "Is eloquence a tool of service or self-advancement? The Radiance tradition holds that language is most powerful when it uplifts. The Shadow tradition holds that language flows toward individual power and pretending otherwise is the most dishonest thing a Silverquill mage can do. Both are right. The tension is the curriculum.",
    "affinity": {
      "drawn_to": [
        "The power of precisely chosen words over brute force or volume",
        "Reputation, image, and how perception actively shapes reality",
        "The ability to change how someone sees themselves as the highest power",
        "Leadership as a performative act - presence, not just decision",
        "Cutting through pretense to say the true and uncomfortable thing"
      ],
      "repelled_by": [
        "Vague imprecise communication when precision is possible",
        "False modesty or unnecessary hedging",
        "People who have influence and waste it",
        "Earnestness that refuses to acknowledge the politics of a situation"
      ],
      "core_question": "Tell me about a time you said something that changed how a situation went. Were you satisfied with that power?",
      "interview_tells": [
        "Articulate in a way that suggests awareness of how they're coming across",
        "Mentions persuasion, rhetoric, or the specific impact of words",
        "Describes influencing situations through communication rather than direct action",
        "Strong opinions about how things should be said, not just what",
        "Treats the interview itself as a performance - which it is"
      ],
      "not_to_be_confused_with": "Azorius - both value structured language but Azorius codifies it into law; Silverquill wields it as personal power. Prismari - both performative but Prismari uses elemental spectacle and scale; Silverquill uses precision and wit. Dimir - both manipulate through language but Dimir is invisible; Silverquill is the most visible person in the room."
    },
    "decree_voice": {
      "tone": "Cutting and admiring in the same breath. Precise. Aware that this decree is itself a performance.",
      "speaks_like": "Embrose writing something he knows will outlast the occasion.",
      "example_opening": "You already know what we're going to say.",
      "example_decree": "You already know what we're going to say, which is the first qualification for joining us. Silverquill does not recruit people who are surprised by the power of words. It recruits people who have always known - and have been waiting for an institution sophisticated enough to take that knowledge seriously. You have something to say. We have the ink to make it permanent. Welcome to the college that will remember what everyone else forgets to write down."
    }
  }
} as const;
