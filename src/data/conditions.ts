import type { Condition } from "../types";

export const CONDITIONS: Condition[] = [
  {
    id: "hypoxia",
    name: "Hypoxia",
    aliases: [
      "cyanosis",
      "low oxygen",
      "blue lips",
      "hypoxia on",
      "central cyanosis",
    ],
    category: "systemic",
    summary:
      "Low oxygen showing as dusky, grey, or blue color — most reliable at the lips, tongue, and nail beds. On darker skin the face may look ashen rather than blue.",
    urgency: "emergency",
    schoolNurseNotes: [
      "Treat as an emergency until a clinician says otherwise. Support breathing and activate EMS.",
      "Cold fingers alone can look bluish. Central change of lips and tongue is more concerning.",
      "Never rely on the question “did they turn blue?” for children with dark skin.",
    ],
    redFlags: [
      "Dusky, grey, or blue lips or tongue",
      "Trouble breathing, collapse, or altered alertness",
      "Known asthma, choking, or cardiac history with a color change",
    ],
    presentations: {
      light: {
        appearance:
          "Lips and sometimes the area around the mouth look distinctly blue-purple against pale skin. Nail beds lose their usual pink.",
        lookFor: [
          "Blue or purple lips and perioral skin",
          "Blue-grey nail beds",
          "Work of breathing",
        ],
        easyToMiss:
          "Cold weather or lipstick can confuse a quick glance. Check the tongue.",
      },
      medium: {
        appearance:
          "Lips look dusky, grey-purple, or muddy rather than obviously blue. Under-eye darkness may accompany the color change.",
        lookFor: [
          "Dusky mucous membranes",
          "Grey-purple nail beds",
          "Compare with the child’s usual lip color",
        ],
        easyToMiss:
          "Waiting for a textbook blue appearance wastes time. Mucous membranes beat cheek color.",
      },
      dark: {
        appearance:
          "Skin may look ashen or grey. Blue is unreliable. Best windows are inner lips, tongue, nail beds, palms, and soles.",
        lookFor: [
          "Grey or pale-purple inner lips and tongue",
          "Ashen face compared with baseline",
          "Dull or grey nail beds",
        ],
        easyToMiss:
          "Asking only about “turning blue” fails many Black and brown children. Look inside the mouth.",
      },
    },
  },
  {
    id: "dark-circles",
    name: "Dark circles",
    aliases: [
      "periorbital dark circles",
      "allergic shiners",
      "under eye circles",
      "tired eyes",
    ],
    category: "rash",
    summary:
      "Periorbital darkening from congestion, fatigue, eczema, or family trait. On dark skin the circles can look purple-black; on light skin they often look reddish-purple.",
    urgency: "routine",
    schoolNurseNotes: [
      "Common with allergic rhinitis (“allergic shiners”), poor sleep, or illness.",
      "New, one-sided darkening with swelling or bruising is not “circles” — think injury.",
      "Ask about hay fever, asthma, and overnight cough or snoring.",
    ],
    redFlags: [
      "One-sided darkening with swelling after trauma (possible bruise or orbital injury)",
      "Dark circles plus severe headache, vomiting, or visual change",
      "Sudden new swelling around both eyes",
    ],
    presentations: {
      light: {
        appearance:
          "Reddish-purple to brown-grey shadows under both lower lids, high contrast on fair skin.",
        lookFor: [
          "Symmetric under-eye duskiness",
          "Nasal crease or allergic salute if allergies",
          "No tenderness unless there was injury",
        ],
        easyToMiss: "Can be mistaken for a pair of small bruises.",
      },
      medium: {
        appearance:
          "Deeper brown or purplish half-moons under both eyes, often with a slightly sunken look.",
        lookFor: [
          "Symmetric brown-purple crescents",
          "History of congestion or fatigue",
          "Compare with a school photo if unsure it is new",
        ],
        easyToMiss: "Blends with natural under-eye pigment. Ask whether it is new.",
      },
      dark: {
        appearance:
          "Deep purple-black or grey-black crescents under the eyes. Contrast can be striking or, in some children, only a little deeper than baseline pigment.",
        lookFor: [
          "Symmetric darkening, not a tender bruise",
          "Associated allergic signs",
          "No swelling of the lid itself",
        ],
        easyToMiss:
          "Staff may call any under-eye darkness “normal.” Check for tenderness and whether it is one-sided.",
      },
    },
  },
  {
    id: "eczema",
    name: "Eczema",
    aliases: ["atopic dermatitis", "atopic eczema", "dry rash", "flexural rash"],
    category: "rash",
    summary:
      "A chronic itchy rash. On darker skin it is often grey, purple, or ashy rather than bright red, so flares are under-counted.",
    urgency: "routine",
    schoolNurseNotes: [
      "Fragrance-free cream after handwashing beats watery lotion.",
      "Scratching at school usually means itch is poorly controlled, not that the child is “picking.”",
      "Dark leftover patches can linger for months after the itch settles.",
    ],
    redFlags: [
      "Yellow crust, pus, or sudden weeping (impetigo on top of eczema)",
      "Fever with rapidly spreading redness or pain",
      "Face, eye, or whole-body swelling",
    ],
    presentations: {
      light: {
        appearance:
          "Bright red, dry, scaly patches with white flake, often on cheeks in younger children and in elbow or knee creases later.",
        lookFor: ["Pink-red plaques with scale", "Excoriations", "Weeping in a flare"],
        easyToMiss: "Mild disease looks like ordinary dry skin until the child cannot stop scratching.",
      },
      medium: {
        appearance:
          "Dusky pink to brown-red patches with a rough, crusty surface. Redness has a brown undertone.",
        lookFor: [
          "Brown-pink plaques rather than fire-engine red",
          "Bumpy follicular texture",
          "Ashy scale",
        ],
        easyToMiss: "Redness is muted. Compare the patch with nearby skin and ask about night itch.",
      },
      dark: {
        appearance:
          "Dark reddish-brown or purplish raised plaques. Bright redness is often absent. Cheeks may look thickened and bumpy.",
        lookFor: [
          "Violet-brown plaques",
          "Lichenified, bumpy texture",
          "Post-inflammatory dark marks",
        ],
        easyToMiss:
          "Training on white skin looks for redness and misses the diagnosis. Touch for roughness and ask about itch.",
      },
    },
  },
  {
    id: "bruise",
    name: "Bruise",
    aliases: ["contusion", "bruising", "black eye", "periorbital bruise"],
    category: "injury",
    summary:
      "Blood under the skin after impact. On dark skin a bruise may look deep purple-brown or only slightly darker than nearby skin.",
    urgency: "prompt",
    schoolNurseNotes: [
      "Document location, size, color, tenderness, and the child’s explanation in their own words.",
      "Shin and forearm bruises are common in play. Patterned marks, ears, neck, torso, or buttocks deserve a second look.",
      "Under-recognition on dark skin is a documented safety gap. Recheck in good light and compare both sides.",
    ],
    redFlags: [
      "Patterned injury (handprint, loop, object edge)",
      "Protected sites: ears, neck, abdomen, back, buttocks, genitals",
      "Bruising in a child who is not independently mobile",
    ],
    presentations: {
      light: {
        appearance:
          "Deep purple-red under the eye or at the impact site, high contrast on fair skin, edges a little blurred.",
        lookFor: ["Non-blanching discoloration", "Tenderness", "Color change over days"],
        easyToMiss: "A very fresh bruise can look like ordinary redness at first.",
      },
      medium: {
        appearance:
          "Violet to deep blue patch, often under the eye, with visible small vessels. Less “neon” than on fair skin.",
        lookFor: [
          "A darker or more violaceous island than nearby skin",
          "Tenderness even if color is modest",
          "Compare with the opposite side",
        ],
        easyToMiss: "A brown-purple bruise can be taken for a birthmark if you do not compare sides.",
      },
      dark: {
        appearance:
          "Localized deep purple-brown saturation, sometimes with subtle swelling. Classic blue-green fade may never be obvious.",
        lookFor: [
          "A darker island of color",
          "Warmth and pain out of proportion to what you see",
          "Shine or tightness of overlying skin",
        ],
        easyToMiss:
          "Looking only for “blue” will miss many bruises. Palpate, compare, and use side lighting.",
      },
    },
  },
  {
    id: "hematoma",
    name: "Large bruise or hematoma",
    aliases: ["hematoma", "big bruise", "thigh bruise", "shin hematoma", "goose egg"],
    category: "injury",
    summary:
      "A larger collection of blood, often on a shin or thigh after sports. Color mix and swelling are easier to feel than to name on dark skin.",
    urgency: "prompt",
    schoolNurseNotes: [
      "Rest, ice as tolerated, elevation. Recheck if swelling grows or the child cannot bear weight.",
      "A hematoma can look almost black on dark skin and still be a bruise, not infection — unless it is hot, spreading, and the child is febrile.",
      "Follow concussion protocol separately if the head was involved.",
    ],
    redFlags: [
      "Rapidly expanding swelling",
      "Numbness, cool limb, or color change of toes/fingers",
      "Unable to walk or use the limb",
    ],
    presentations: {
      light: {
        appearance:
          "Large oval with a dark purple-indigo center and a wide red-orange ring on the thigh or shin.",
        lookFor: ["Swelling", "Tender firmness", "Clothing-edge borders after sport"],
        easyToMiss: "Early on it can look like a hard red bump before the purple center appears.",
      },
      medium: {
        appearance:
          "Mottled deep purple, dark blue, and yellowish-brown over a large thigh or limb area.",
        lookFor: ["Irregular color map", "Raised center", "Pain with walking"],
        easyToMiss: "Yellow-brown healing color is mistaken for a stain or birthmark.",
      },
      dark: {
        appearance:
          "Circular deep purple-maroon patch, often on the shin, slightly raised. Surrounding skin may look only a little darker.",
        lookFor: ["Raised hematoma", "Pain", "Compare circumference with the other limb"],
        easyToMiss: "Without a bright red halo it is documented as “nothing showing.” Palpate.",
      },
    },
  },
  {
    id: "impetigo",
    name: "Impetigo",
    aliases: ["school sores", "honey crust", "bacterial infection", "staph rash"],
    category: "infection",
    summary:
      "A contagious bacterial infection, often around the mouth. Honey crust is classic; on dark skin the halo may be grey-brown rather than red.",
    urgency: "prompt",
    schoolNurseNotes: [
      "Cover lesions. Follow local exclusion rules (often 24 hours of antibiotics or until dry).",
      "Often sits on top of eczema or a scraped area.",
      "Do not share towels, sports gear, or lip products.",
    ],
    redFlags: [
      "Spreading tightness, fever, or an unwell child (possible cellulitis)",
      "Painful rapidly expanding blistering",
      "Many lesions in an infant",
    ],
    presentations: {
      light: {
        appearance:
          "Honey-yellow crusts on a red base at the corner of the mouth, often with irritation down the chin.",
        lookFor: ["Stuck-on golden crusts", "Satellite sores", "A red rim"],
        easyToMiss: "Early impetigo looks like a cold sore or chapped skin.",
      },
      medium: {
        appearance:
          "Amber to honey crusts at the lip border and chin, with raw red sores and small papules.",
        lookFor: ["Brown-gold crusts", "A duskier halo", "New spots nearby"],
        easyToMiss: "Dark crust is called a scab from a fall. Impetigo keeps seeding new sores.",
      },
      dark: {
        appearance:
          "Honey-brown crust cluster at the mouth corner. Surrounding skin may not look red.",
        lookFor: ["Moist or stuck crusts", "Satellite lesions", "Perioral clusters"],
        easyToMiss: "Without a red ring, staff call it a scab. Look for honey-to-brown crust and new sores.",
      },
    },
  },
  {
    id: "athletes-foot",
    name: "Athlete’s foot",
    aliases: ["tinea pedis", "fungal foot", "foot fungus", "toe web infection"],
    category: "infection",
    summary:
      "Fungal infection of the toe webs. On dark skin the scale often looks ashy grey-white rather than red.",
    urgency: "routine",
    schoolNurseNotes: [
      "Keep feet dry. Change socks after PE. Do not share shoes or towels.",
      "Topical antifungal per protocol or family clinician. Recalcitrant cases need a clinician.",
      "Check for spreading to the nails or groin.",
    ],
    redFlags: [
      "Spreading redness, fever, or red streaking (bacterial superinfection)",
      "Cracks that are deep, bleeding, or extremely painful to walk on",
    ],
    presentations: {
      light: {
        appearance:
          "Red, dry, scaly skin between the big toe and second toe, fading onto the top of the foot.",
        lookFor: ["Web-space scale", "Itch or burn", "Clear toenails early on"],
        easyToMiss: "Looks like dry skin until the web space is inspected.",
      },
      medium: {
        appearance:
          "Raw red, moist, peeling skin between toes with thick white scale and crust.",
        lookFor: ["Macerated web spaces", "White flaky collars", "Itch"],
        easyToMiss: "Peeling is blamed on the pool. Check between every toe.",
      },
      dark: {
        appearance:
          "Grey-white ashy scale packed into every toe web. Redness may be faint; the white macerated skin is the giveaway.",
        lookFor: ["Ashy interdigital scale", "Thickened peeling", "Itch"],
        easyToMiss: "Ashy feet are called dry skin. Look specifically in the web spaces.",
      },
    },
  },
  {
    id: "ringworm",
    name: "Ringworm",
    aliases: ["tinea corporis", "tinea", "fungal ring", "circle rash"],
    category: "infection",
    summary:
      "A fungal ring on the body. On dark skin the ring may be pale or grey and scaly rather than red.",
    urgency: "prompt",
    schoolNurseNotes: [
      "Body ringworm is usually a topical antifungal. Scalp ringworm needs oral medicine from a clinician.",
      "Do not share hats, combs, or helmets. Pets can be a source.",
      "A very itchy crease rash may be eczema instead of tinea.",
    ],
    redFlags: [
      "Painful boggy swelling of the scalp (kerion)",
      "Spreading hair loss with crust",
    ],
    presentations: {
      light: {
        appearance:
          "Classic raised red scaly ring with a clearer pink center on the arm.",
        lookFor: ["Annular leading scale", "Central clearing", "Slow outward growth"],
        easyToMiss: "Early tinea is a round dry patch before the ring forms.",
      },
      medium: {
        appearance:
          "Circular reddish-pink scaly border on the forearm, center lighter than the edge.",
        lookFor: ["Raised scaly rim", "Brown-pink rather than scarlet", "Scale that catches a nail"],
        easyToMiss: "Looks like a dry-skin circle or a fading bruise.",
      },
      dark: {
        appearance:
          "Pale, pinkish-tan or hypopigmented raised ring on darker skin. Center is lighter than surrounding skin.",
        lookFor: ["Ashy or pale annular scale", "Textured bumpy border", "Itch"],
        easyToMiss: "No redness does not rule out tinea. Look for the ring and the scale.",
      },
    },
  },
  {
    id: "cellulitis",
    name: "Cellulitis",
    aliases: ["spreading skin infection", "erysipelas", "infected bite"],
    category: "infection",
    summary:
      "Spreading bacterial infection of the skin. Redness is the least reliable sign on dark skin. Pain, heat, swelling, and shine matter more.",
    urgency: "urgent",
    schoolNurseNotes: [
      "Outline the area with a pen and write the time. Expansion is a finding even if color is subtle.",
      "A “spider bite” story is often early cellulitis or abscess.",
      "Urgent evaluation if expanding, febrile, or near a joint or the eye.",
    ],
    redFlags: [
      "Fever or an unwell child",
      "Red streaking toward the heart",
      "Periorbital swelling",
      "Pain out of proportion",
    ],
    presentations: {
      light: {
        appearance:
          "Hot, tender, expanding bright red plaque, often on a limb, with a few pinpoint darker spots.",
        lookFor: ["Warmth and swelling", "Indistinct red borders", "Fever"],
        easyToMiss: "Early cellulitis looks like a bruise or a bite.",
      },
      medium: {
        appearance:
          "Elongated deep red to purplish-red shiny plaque on the lower leg, taut from swelling.",
        lookFor: ["Glossy taut skin", "Heat", "Compare limb size"],
        easyToMiss: "Without fire-engine red it is written up as a bruise. Feel temperature.",
      },
      dark: {
        appearance:
          "Diffuse duskier, reddish-brown field with swelling. Edges blend into surrounding skin. Texture is taut.",
        lookFor: ["Unilateral heat and firmness", "Shine", "Expanding outlined border"],
        easyToMiss: "Visual redness fails. Palpation and the child’s pain report lead.",
      },
    },
  },
  {
    id: "poison-ivy",
    name: "Poison ivy",
    aliases: [
      "allergic contact dermatitis",
      "rhus",
      "plant rash",
      "poison oak",
      "poison sumac",
    ],
    category: "allergic",
    summary:
      "Allergic contact dermatitis in streaks where the plant brushed the skin. On dark skin, look for blisters and texture more than bright red.",
    urgency: "prompt",
    schoolNurseNotes: [
      "Wash skin and clothes. Avoid spreading sap from under nails.",
      "Cool compress and oral antihistamine per protocol for itch. Refer if face, genitals, or widespread blistering.",
      "Not contagious person-to-person once oil is washed off.",
    ],
    redFlags: [
      "Swelling of the face or genitals",
      "Trouble breathing (rare severe allergy)",
      "Extensive blistering or signs of infection",
    ],
    presentations: {
      light: {
        appearance:
          "Bright red raised streaks and patches with many small fluid-filled blisters in a linear pattern.",
        lookFor: ["Linear streaks", "Vesicles", "Intense itch"],
        easyToMiss: "Early on it looks like a vague red smudge.",
      },
      medium: {
        appearance:
          "Bright red bumpy streaks from forearm to knuckles, very textured and irritated.",
        lookFor: ["Streaky distribution", "Raised plaques", "Itch after outdoor play"],
        easyToMiss: "Streaks are called scratches until blisters appear.",
      },
      dark: {
        appearance:
          "Clusters of small raised, glistening blisters. Bright redness is modest; the vesicles carry the diagnosis.",
        lookFor: ["Vesicles in a streak or patch", "Itch", "History of woods or weeds"],
        easyToMiss: "Without redness it is called “bumps.” Ask about plants and look for linear pattern.",
      },
    },
  },
  {
    id: "heat-rash",
    name: "Heat rash",
    aliases: ["miliaria", "prickly heat", "sweat rash"],
    category: "rash",
    summary:
      "Blocked sweat ducts making tiny bumps, often on the face after heat or layers. On dark skin there may be almost no redness — just a pebbled, glistening field of bumps.",
    urgency: "routine",
    schoolNurseNotes: [
      "Cool the child, reduce layers, offer fluids. Usually settles when heat stops.",
      "Do not slather with heavy ointment, which can worsen blockage.",
      "Distinguish from measles (the child is usually much more unwell with measles).",
    ],
    redFlags: [
      "Fever and a child who looks very unwell (not typical of simple heat rash)",
      "Heat stroke signs: confusion, no sweating, collapse",
    ],
    presentations: {
      light: {
        appearance:
          "Dense pinpoint pink-red papules on a flushed cheek.",
        lookFor: ["Tiny uniform bumps", "Heat exposure", "Itch or prickling"],
        easyToMiss: "Looks like blushing until you look close.",
      },
      medium: {
        appearance:
          "Cluster of tiny raised reddish dots over the cheekbone with underlying flush.",
        lookFor: ["Malar pebbling", "Warm environment", "No vesicles of chickenpox"],
        easyToMiss: "Called “a little acne” on the cheek.",
      },
      dark: {
        appearance:
          "Tiny skin-colored or slightly lighter glistening beads across the cheek. Little to no redness.",
        lookFor: ["Pebbled texture", "Translucent papules", "Heat history"],
        easyToMiss: "Without redness it is missed entirely. Side light shows the bumps.",
      },
    },
  },
  {
    id: "insect-bite",
    name: "Insect bite",
    aliases: ["mosquito bite", "bug bite", "welt", "sting"],
    category: "allergic",
    summary:
      "A raised papule, sometimes with a tiny central punctum. On dark skin the bump may be skin-colored with only a faint halo.",
    urgency: "routine",
    schoolNurseNotes: [
      "Cool compress. Antihistamine per protocol for itch.",
      "A single “bite” that becomes hot, expanding, and painful may be cellulitis.",
      "A line of bites under a waistband suggests bed bugs, not one mosquito.",
    ],
    redFlags: [
      "Known sting allergy with systemic symptoms",
      "Expanding warmth and fever",
      "Bite near the eye closing the lid",
    ],
    presentations: {
      light: {
        appearance:
          "Circular red swollen welt with a darker pinpoint in the center.",
        lookFor: ["Punctum", "Itch", "Exposed-skin location"],
        easyToMiss: "Heat bumps and bites look alike until a punctum is found.",
      },
      medium: {
        appearance:
          "Raised skin-colored bump with a diffuse pink-brown flush around it.",
        lookFor: ["Central papule", "Circular halo", "Itch"],
        easyToMiss: "Halo is subtler; the raised bump is the clue.",
      },
      dark: {
        appearance:
          "Single reddish-brown raised circle with a tiny pale center. Halo may be faint.",
        lookFor: ["Punctum", "Itch", "Pattern if there are several"],
        easyToMiss: "Without a pink wheal it is called a rash or a bruise.",
      },
    },
  },
  {
    id: "hfmd",
    name: "Hand, foot, and mouth",
    aliases: [
      "hand foot mouth",
      "hfmd",
      "coxsackie",
      "enterovirus rash",
    ],
    category: "infection",
    summary:
      "Viral illness with spots on palms, soles, and often the mouth. On dark skin the spots are brown-purple rather than bright red.",
    urgency: "prompt",
    schoolNurseNotes: [
      "Follow local exclusion if the child is unwell or drooling with mouth sores. Policies vary.",
      "Hydration matters more than the rash. Mouth sores make drinking painful.",
      "Not related to animal foot-and-mouth disease.",
    ],
    redFlags: [
      "Dehydration, no urine, or inability to drink",
      "Stiff neck, severe headache, or unusual drowsiness",
      "A very young infant who looks unwell",
    ],
    presentations: {
      light: {
        appearance:
          "Small red spots and blisters on palms and soles, often with spots around the mouth.",
        lookFor: ["Palmar and plantar vesicles", "Mouth sores", "Fever or sore throat"],
        easyToMiss: "Mild cases have only a few palmar dots.",
      },
      medium: {
        appearance:
          "Scattered reddish raised bumps and tiny blisters on the palm and sole without much background redness.",
        lookFor: ["1–3 mm papulovesicles", "Heel and arch spots", "Mouth pain"],
        easyToMiss: "Called insect bites until the mouth is checked.",
      },
      dark: {
        appearance:
          "Numerous small dark brown-purple raised spots and blisters on palms and soles.",
        lookFor: ["Hyperpigmented vesicles", "Dense clusters on the arch", "Oral lesions"],
        easyToMiss: "No red halo. Look at palms and soles on purpose.",
      },
    },
  },
  {
    id: "molluscum",
    name: "Molluscum contagiosum",
    aliases: ["molluscum", "water warts", "umbilicated bumps"],
    category: "infection",
    summary:
      "Viral dome-shaped bumps with a tiny central dimple. Color is often skin-toned on every complexion.",
    urgency: "routine",
    schoolNurseNotes: [
      "Usually a wait-and-see. Avoid sharing towels. Cover with clothing for sports if policy asks.",
      "Do not pick — that spreads them and can infect.",
      "Not a reason for panic; they can last months.",
    ],
    redFlags: [
      "Red, hot, spreading area around a lesion (secondary infection)",
      "Lesions on the eyelid affecting vision",
      "Very widespread disease in a child who is otherwise unwell",
    ],
    presentations: {
      light: {
        appearance:
          "Pearly pink-white domes with a central dimple, scattered on the skin.",
        lookFor: ["Umbilication", "Flesh-colored papules", "Clusters"],
        easyToMiss: "Early lesions look like closed whiteheads.",
      },
      medium: {
        appearance:
          "Scattered papules slightly lighter pink than surrounding tan skin, dimple obvious on larger ones.",
        lookFor: ["Central umbilication", "Smooth dome, not rough like a wart", "Few to many lesions"],
        easyToMiss: "Taken for acne or insect bites.",
      },
      dark: {
        appearance:
          "Flesh-colored or slightly lighter domes on dark brown skin. Dimple is the giveaway.",
        lookFor: ["Umbilicated papules", "Smooth surface", "Elbow or trunk clusters"],
        easyToMiss: "Skin-colored bumps blend in. Look for the dimple.",
      },
    },
  },
  {
    id: "warts",
    name: "Viral warts",
    aliases: ["verruca", "common wart", "papilloma", "cauliflower wart"],
    category: "infection",
    summary:
      "HPV papules with a rough cauliflower surface. On dark skin they often look grey-tan and slightly lighter than nearby skin.",
    urgency: "routine",
    schoolNurseNotes: [
      "Not an emergency. Cover for gymnastics or wrestling if required by policy.",
      "Do not share nail files. Picking spreads them on the same child.",
      "School exclusion is generally not needed.",
    ],
    redFlags: [
      "Painful plantar warts that change gait",
      "Sudden explosion of warts in an immunocompromised child",
    ],
    presentations: {
      light: {
        appearance:
          "Flesh-colored to tan rough papules on the knuckles and fingers.",
        lookFor: ["Cauliflower texture", "Black dots (thrombosed capillaries)", "Hands and knees"],
        easyToMiss: "A single small wart looks like a callus.",
      },
      medium: {
        appearance:
          "Raised light-tan rough clusters near the knuckles, some fused.",
        lookFor: ["Granular surface", "Grouped papules", "Fingers and dorsum of hand"],
        easyToMiss: "Called “dry skin bumps” until the texture is felt.",
      },
      dark: {
        appearance:
          "Greyish-brown rough papules, slightly lighter than surrounding dark skin, often in a central cluster.",
        lookFor: ["Rough irregular texture", "Lighter than baseline skin", "Knuckle clusters"],
        easyToMiss: "Without pink color they are ignored. Feel the roughness.",
      },
    },
  },
  {
    id: "scabies",
    name: "Scabies",
    aliases: ["mites", "itch mite", "burrows", "sarcoptes"],
    category: "infection",
    summary:
      "Mite burrows and intensely itchy papules, classically on wrists and between fingers. On dark skin, pale linear burrows can be clearer than redness.",
    urgency: "prompt",
    schoolNurseNotes: [
      "Household treatment is required, not just the child. Follow public-health guidance.",
      "Itch can last days after successful treatment.",
      "Check other family members quietly and privately.",
    ],
    redFlags: [
      "Secondary bacterial infection of picked skin",
      "A very young infant with widespread disease",
    ],
    presentations: {
      light: {
        appearance:
          "Red papules and nodules on the hand and wrist with wavy reddish-brown burrow lines.",
        lookFor: ["Burrows in finger webs and wrists", "Night itch", "Other household itch"],
        easyToMiss: "Early scabies looks like eczema or bites.",
      },
      medium: {
        appearance:
          "Small reddish papules on the forearm and hand with thin scaly linear burrows, often pointed out on exam.",
        lookFor: ["Wrist and finger-web burrows", "Clustered papules", "Itch"],
        easyToMiss: "Called insect bites until burrows are found.",
      },
      dark: {
        appearance:
          "Thin pale wavy tracks across the thigh or knee with small bumps that are not very red.",
        lookFor: ["Hypopigmented linear burrows", "Intense itch", "Web spaces of hands"],
        easyToMiss: "No redness does not mean no scabies. Hunt for burrows.",
      },
    },
  },
  {
    id: "measles",
    name: "Measles",
    aliases: ["rubeola", "morbilliform rash", "first disease"],
    category: "infection",
    summary:
      "A febrile viral illness with a spreading maculopapular rash. On dark skin the rash is brown-red and can look like “just darker skin” unless you look closely.",
    urgency: "urgent",
    schoolNurseNotes: [
      "Airborne precautions. This is a public-health event. Isolate and call the health department per protocol.",
      "Look for cough, runny nose, red eyes, and Koplik spots if you can see the mouth.",
      "Vaccination history matters but does not fully exclude measles.",
    ],
    redFlags: [
      "Trouble breathing, stiff neck, or unusual drowsiness",
      "Any suspected measles — do not wait in a crowded office",
    ],
    presentations: {
      light: {
        appearance:
          "Dense small reddish-pink raised spots over face, neck, and chest, starting at the hairline and spreading down.",
        lookFor: ["Hairline origin", "Fever and cough", "Red eyes"],
        easyToMiss: "Early measles looks like a bad cold until the rash blooms.",
      },
      medium: {
        appearance:
          "Darker reddish-purple blotches on the face and arm that run together, more confluent on the forearm.",
        lookFor: ["Brown-red maculopapules", "Spreading pattern", "Ill appearance"],
        easyToMiss: "Blotches are called eczema or heat rash. The child is usually much sicker with measles.",
      },
      dark: {
        appearance:
          "Widespread small reddish-brown raised spots that merge on cheeks and forehead. May look like a change in texture more than a “red rash.”",
        lookFor: ["Tiny papules in good light", "Fever, cough, conjunctivitis", "Spreading from face downward"],
        easyToMiss: "Redness is muted. Feel for papules and look at the whole child, not one patch.",
      },
    },
  },
  {
    id: "vitiligo",
    name: "Vitiligo",
    aliases: ["depigmentation", "white patches", "loss of pigment"],
    category: "rash",
    summary:
      "Loss of pigment in well-defined patches. Contrast is strongest on dark skin and easiest to miss on very fair skin.",
    urgency: "routine",
    schoolNurseNotes: [
      "Not contagious. Not an emergency. Protect depigmented skin from sunburn.",
      "New rapidly spreading patches deserve a clinician visit, but school exclusion is not needed.",
      "Watch for teasing. This is a visible difference, not an infection.",
    ],
    redFlags: [
      "Sudden white patches plus other autoimmune symptoms — refer, not EMS",
      "Sunburn of depigmented patches",
    ],
    presentations: {
      light: {
        appearance:
          "Irregular chalk-white patches on face, neck, and shoulders. Borders are visible against peach-pink skin.",
        lookFor: ["Sharp depigmented islands", "Symmetric face and hands common", "No scale"],
        easyToMiss: "On very fair children the patches look like “just pale.”",
      },
      medium: {
        appearance:
          "Milk-white patches across face, neck, and arms against tawny skin. Contrast is obvious.",
        lookFor: ["Geographic white patches", "Hair in the patch may turn white", "Stable or slowly spreading"],
        easyToMiss: "A new small patch is called a scar.",
      },
      dark: {
        appearance:
          "Stark pale patches on deep brown skin — forehead, around eyes, nose, lips, and chest. Highest contrast of the three tones.",
        lookFor: ["Complete pigment loss in islands", "Scalloped borders", "No pain or itch typically"],
        easyToMiss: "Almost never missed on dark skin; the error is calling it infection or fungus.",
      },
    },
  },
  {
    id: "fifth-disease",
    name: "Fifth disease",
    aliases: [
      "slapped cheek",
      "erythema infectiosum",
      "parvovirus",
      "slapped cheek rash",
    ],
    category: "infection",
    summary:
      "Parvovirus B19 with a slapped-cheek look. On dark skin the cheeks look dusky red or purple rather than bright pink.",
    urgency: "prompt",
    schoolNurseNotes: [
      "Often no longer contagious once the cheek rash appears. Follow local policy.",
      "Alert pregnant staff via occupational health — they need their own advice.",
      "A lacy body rash may follow the cheeks.",
    ],
    redFlags: [
      "A child with sickle cell disease or immunosuppression (parvovirus can drop blood counts)",
      "Pregnant close contacts — occupational health, not the nurse diagnosing pregnancy risk alone",
    ],
    presentations: {
      light: {
        appearance:
          "Intense pink-red mottled rash on both cheeks, rest of the face relatively clear.",
        lookFor: ["Slapped-cheek pattern", "Warm cheeks", "Otherwise relatively well child"],
        easyToMiss: "Looks like windburn or embarrassment.",
      },
      medium: {
        appearance:
          "Vivid pink rash on the malar area with high contrast against tawny skin.",
        lookFor: ["Bilateral cheeks", "No honey crust (not impetigo)", "Possible lacy arm rash"],
        easyToMiss: "Called sunburn after outdoor play.",
      },
      dark: {
        appearance:
          "Dusky red to purplish patches on both cheeks. Less “neon,” still clearly a slapped-cheek pattern.",
        lookFor: ["Bilateral malar duskiness", "No tenderness like cellulitis", "Viral prodrome history"],
        easyToMiss: "Without bright pink it is called a bruise or eczema. Check both cheeks.",
      },
    },
  },
  {
    id: "meningococcal",
    name: "Meningococcal rash",
    aliases: [
      "petechiae",
      "purpura",
      "non blanching rash",
      "glass test",
      "meningococcus",
      "sepsis rash",
    ],
    category: "rash",
    summary:
      "Non-blanching petechiae and purpura. This is an emergency until proven otherwise. On dark skin search chest, arm, mucosa, palms, and soles — not only “red spots on pale legs.”",
    urgency: "emergency",
    schoolNurseNotes: [
      "Glass / tumbler test: if spots do not fade, treat as emergency. Do not wait for a textbook rash.",
      "Fever plus non-blanching spots is EMS.",
      "On richly pigmented skin the rash can look brown-purple or almost black.",
    ],
    redFlags: [
      "Non-blanching spots with fever, neck stiffness, photophobia, or severe limb pain",
      "Drowsy, confused, or rapidly worsening child",
      "Spreading purpura",
    ],
    presentations: {
      light: {
        appearance:
          "Pinpoint reddish-purple dots and, when severe, large irregular dark purple patches on arms and legs.",
        lookFor: ["Spots that stay under a glass", "Ill appearance", "Fever"],
        easyToMiss: "Early dots look like freckles or flea bites until you press.",
      },
      medium: {
        appearance:
          "Dark brownish-purple spots and confluent purpuric patches on forearm, neck, and chest.",
        lookFor: ["Non-blanching brown-purple specks", "Larger irregular blotches", "Toxic appearance"],
        easyToMiss: "Brown dots blend with freckling. Use a glass and bright light.",
      },
      dark: {
        appearance:
          "Extensive dark purple to reddish-brown petechiae and purpura on chest and arm. May look like many small bruises.",
        lookFor: [
          "Non-blanching dark specks and blotches",
          "Mucosal petechiae",
          "An ill child even if the rash looks sparse",
        ],
        easyToMiss:
          "Relying on a bright red leg rash will miss this. Check mucosa and use the glass test anyway.",
      },
    },
  },
  {
    id: "cold-sores",
    name: "Cold sores",
    aliases: ["herpes simplex", "hsv", "fever blister", "oral herpes"],
    category: "infection",
    summary:
      "HSV vesicles on the lip. On dark skin the blisters can look pearly-white with only subtle redness at the base.",
    urgency: "routine",
    schoolNurseNotes: [
      "Cover if possible. No sharing drinks, utensils, or lip products. Exclude from contact sports if policy requires while weeping.",
      "Not the same as impetigo — impetigo has honey crust that spreads; HSV is a tight vesicle cluster.",
      "First episodes can make a child miserable; recurrences are often milder.",
    ],
    redFlags: [
      "Spreading redness around the mouth with fever (bacterial superinfection)",
      "Lesions in the eye",
      "A very young infant with vesicles",
    ],
    presentations: {
      light: {
        appearance:
          "Cluster of small fluid-filled blisters on the lower lip corner sitting on a red base.",
        lookFor: ["Grouped vesicles", "Tingling history", "Lip border location"],
        easyToMiss: "Day one looks like chapped lip.",
      },
      medium: {
        appearance:
          "Cluster of small red raised blisters on the lower lip with localized swelling.",
        lookFor: ["Grouped vesicles on vermilion", "Pain more than itch", "Recurrent same spot"],
        easyToMiss: "Called impetigo until the tight grouping is noticed.",
      },
      dark: {
        appearance:
          "Pearly, almost white vesicles at the corner of the mouth. Base redness is subtle.",
        lookFor: ["Translucent grouped blisters", "Commissure location", "Pain"],
        easyToMiss: "Without a red halo it is called dry skin. Look at the corner of the mouth.",
      },
    },
  },
  {
    id: "frostbite",
    name: "Frostbite",
    aliases: ["frost bite", "cold injury", "frozen fingers"],
    category: "injury",
    summary:
      "Cold injury of fingers or other exposed parts. Dark purple-grey and black patches can be harder to judge on already dark skin — compare with the other hand and look for waxy, hard, or blistered tissue.",
    urgency: "urgent",
    schoolNurseNotes: [
      "Move to warmth. Do not rub snow on it. Do not use a hot radiator. Rewarm per emergency protocol / EMS.",
      "Remove wet gloves. Handle the part gently.",
      "Tetanus status and a clinician exam belong in urgent care or ED, not a wait-until-tomorrow plan if tissue looks dead or blistered.",
    ],
    redFlags: [
      "White, grey, purple-black, or hard tissue",
      "Blisters, especially cloudy or bloody",
      "No sensation in the part",
    ],
    presentations: {
      light: {
        appearance:
          "Fingers with deep purple to bluish-black tips, green-grey patches, and bright red swollen skin nearer the knuckles.",
        lookFor: ["Color zones", "Waxy or hard feel", "Pain then numbness"],
        easyToMiss: "Early frostnip just looks very red and cold.",
      },
      medium: {
        appearance:
          "Deep purple and dark red swelling around finger joints and mid-fingers against tawny skin.",
        lookFor: ["Dusky digits", "Swelling of phalanges", "Cold exposure history"],
        easyToMiss: "Purple-brown is called a bruise from a fall.",
      },
      dark: {
        appearance:
          "Deep purple, grey, and black patches on the fingers, sometimes with raw pink where skin is broken. Frost or ice crystals may still be on the skin.",
        lookFor: ["New darker or grey islands versus the child’s usual tone", "Waxy texture", "Blisters"],
        easyToMiss:
          "Black-brown change is blamed on baseline pigment. Compare both hands and feel for hardness.",
      },
    },
  },
  {
    id: "hives",
    name: "Hives",
    aliases: ["urticaria", "welts", "wheals", "allergic welts"],
    category: "allergic",
    summary:
      "Fleeting itchy welts that migrate. On dark skin they can be raised ridges that are brown-red or slightly paler, not bright pink.",
    urgency: "prompt",
    schoolNurseNotes: [
      "Airway, breathing, or circulation symptoms: anaphylaxis protocol now.",
      "Circle a lesion and recheck — hives move over hours.",
      "School triggers: food, stings, virus, heat.",
    ],
    redFlags: [
      "Trouble breathing, throat tightness, vomiting, or collapse",
      "Lip or tongue swelling",
    ],
    presentations: {
      light: {
        appearance:
          "Raised pink-red welts of many sizes, some joining into map-like patches.",
        lookFor: ["Migratory plaques", "Itch", "Blanching"],
        easyToMiss: "Very faint hives after antihistamine look like flush.",
      },
      medium: {
        appearance:
          "Large raised irregular welts, redder than surrounding tawny skin, puffy map-like patches.",
        lookFor: ["Palpable wheals", "Changing shape", "Itch"],
        easyToMiss: "Without a bright pink halo they are called “bumps.” Palpate.",
      },
      dark: {
        appearance:
          "Raised bumpy ridges on the forearm. Inflammation looks reddish-brown or slightly paler, not neon pink.",
        lookFor: ["Raised itchy plaques you can feel", "Move or flatten within 24 hours", "Possible lid swelling"],
        easyToMiss: "Photographs without side lighting look almost normal. Examine in person.",
      },
    },
  },
  {
    id: "acne",
    name: "Acne",
    aliases: ["pimples", "zits", "breakout", "papules pustules"],
    category: "rash",
    summary:
      "Inflamed papules and pustules, often on the face. On dark skin, leftover dark marks (hyperpigmentation) are often more visible than the original pimple.",
    urgency: "routine",
    schoolNurseNotes: [
      "Not contagious. Avoid picking in the clinic — scarring and dark marks last.",
      "Gentle cleanser advice. Refer if cystic, scarring, or the student is distressed.",
      "Do not shame. This is medical, not hygiene failure.",
    ],
    redFlags: [
      "Painful cysts, fever, or a very unwell adolescent (rare but possible fulminant acne — refer urgently)",
      "Sudden acne-like bumps that are actually molluscum or folliculitis after a sports trip",
    ],
    presentations: {
      light: {
        appearance:
          "Raised red papules and small white pustules on the chin and lower cheeks.",
        lookFor: ["Inflammatory papules", "Pustules", "Oily shine"],
        easyToMiss: "A few chin bumps are called “just a rash.”",
      },
      medium: {
        appearance:
          "Dense small reddish-brown papules on the cheek plus flatter leftover dark marks.",
        lookFor: ["Papules and PIH (dark marks)", "Jawline and cheek", "Uneven texture"],
        easyToMiss: "The dark marks are called scars or dirt. They are pigment left after inflammation.",
      },
      dark: {
        appearance:
          "Raised papules and pustules with many dark spots of post-inflammatory hyperpigmentation on the cheek and jaw.",
        lookFor: ["Active papules plus dark macules", "Jawline", "No honey crust of impetigo"],
        easyToMiss:
          "Staff see the dark marks and miss active acne — or see bumps and miss that the “stains” are from old acne, not infection.",
      },
    },
  },
];

export const CONDITION_BY_ID = Object.fromEntries(
  CONDITIONS.map((condition) => [condition.id, condition]),
) as Record<string, Condition>;
