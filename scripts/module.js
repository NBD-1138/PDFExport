import { PDFDocument } from "./vendor/pdf-lib.esm.min.js";

const MODULE_ID = "PDFExport";
const MODULE_TITLE = "PDF Export";
const EXPORT_ACTION = "pdf-export";
const EXPORT_LABEL = "Export PDF";
const EXPORT_ICON = "fa-solid fa-file-pdf";
const TEMPLATE_FILE = "DnD_5E_CharacterSheet - Form Fillable.pdf";
const TEMPLATE_PATH = encodeURI(`/modules/${MODULE_ID}/${TEMPLATE_FILE}`);

const ABILITY_FIELDS = [
  { key: "str", score: "STR", mod: "STRmod", save: "ST Strength", proficientBox: "Check Box 11" },
  { key: "dex", score: "DEX", mod: "DEXmod ", save: "ST Dexterity", proficientBox: "Check Box 18" },
  { key: "con", score: "CON", mod: "CONmod", save: "ST Constitution", proficientBox: "Check Box 19" },
  { key: "int", score: "INT", mod: "INTmod", save: "ST Intelligence", proficientBox: "Check Box 20" },
  { key: "wis", score: "WIS", mod: "WISmod", save: "ST Wisdom", proficientBox: "Check Box 21" },
  { key: "cha", score: "CHA", mod: "CHamod", save: "ST Charisma", proficientBox: "Check Box 22" }
];

const SKILL_FIELDS = [
  { key: "acr", value: "Acrobatics", proficientBox: "Check Box 23" },
  { key: "ani", value: "Animal", proficientBox: "Check Box 24" },
  { key: "arc", value: "Arcana", proficientBox: "Check Box 25" },
  { key: "ath", value: "Athletics", proficientBox: "Check Box 26" },
  { key: "dec", value: "Deception ", proficientBox: "Check Box 27" },
  { key: "his", value: "History ", proficientBox: "Check Box 28" },
  { key: "ins", value: "Insight", proficientBox: "Check Box 29" },
  { key: "itm", value: "Intimidation", proficientBox: "Check Box 30" },
  { key: "inv", value: "Investigation ", proficientBox: "Check Box 31" },
  { key: "med", value: "Medicine", proficientBox: "Check Box 32" },
  { key: "nat", value: "Nature", proficientBox: "Check Box 33" },
  { key: "prc", value: "Perception ", proficientBox: "Check Box 34" },
  { key: "prf", value: "Performance", proficientBox: "Check Box 35" },
  { key: "per", value: "Persuasion", proficientBox: "Check Box 36" },
  { key: "rel", value: "Religion", proficientBox: "Check Box 37" },
  { key: "slt", value: "SleightofHand", proficientBox: "Check Box 38" },
  { key: "ste", value: "Stealth ", proficientBox: "Check Box 39" },
  { key: "sur", value: "Survival", proficientBox: "Check Box 40" }
];

const SPELL_SLOT_FIELDS = {
  1: { total: "SlotsTotal 19", remaining: "SlotsRemaining 19" },
  2: { total: "SlotsTotal 20", remaining: "SlotsRemaining 20" },
  3: { total: "SlotsTotal 21", remaining: "SlotsRemaining 21" },
  4: { total: "SlotsTotal 22", remaining: "SlotsRemaining 22" },
  5: { total: "SlotsTotal 23", remaining: "SlotsRemaining 23" },
  6: { total: "SlotsTotal 24", remaining: "SlotsRemaining 24" },
  7: { total: "SlotsTotal 25", remaining: "SlotsRemaining 25" },
  8: { total: "SlotsTotal 26", remaining: "SlotsRemaining 26" },
  9: { total: "SlotsTotal 27", remaining: "SlotsRemaining 27" }
};

const SPELL_FIELD_GROUPS = {
  0: {
    fields: [
      "Spells 1014",
      "Spells 1016",
      "Spells 1017",
      "Spells 1018",
      "Spells 1019",
      "Spells 1020",
      "Spells 1021",
      "Spells 1022"
    ]
  },
  1: {
    fields: [
      "Spells 1015",
      "Spells 1023",
      "Spells 1024",
      "Spells 1025",
      "Spells 1026",
      "Spells 1027",
      "Spells 1028",
      "Spells 1029",
      "Spells 1030",
      "Spells 1031",
      "Spells 1032",
      "Spells 1033"
    ],
    checkboxes: [
      "Check Box 251",
      "Check Box 309",
      "Check Box 3010",
      "Check Box 3011",
      "Check Box 3012",
      "Check Box 3013",
      "Check Box 3014",
      "Check Box 3015",
      "Check Box 3016",
      "Check Box 3017",
      "Check Box 3018",
      "Check Box 3019"
    ]
  },
  2: {
    fields: [
      "Spells 1046",
      "Spells 1034",
      "Spells 1035",
      "Spells 1036",
      "Spells 1037",
      "Spells 1038",
      "Spells 1039",
      "Spells 1040",
      "Spells 1041",
      "Spells 1042",
      "Spells 1043",
      "Spells 1044",
      "Spells 1045"
    ],
    checkboxes: [
      "Check Box 313",
      "Check Box 310",
      "Check Box 3020",
      "Check Box 3021",
      "Check Box 3022",
      "Check Box 3023",
      "Check Box 3024",
      "Check Box 3025",
      "Check Box 3026",
      "Check Box 3027",
      "Check Box 3028",
      "Check Box 3029",
      "Check Box 3030"
    ]
  },
  3: {
    fields: [
      "Spells 1048",
      "Spells 1047",
      "Spells 1049",
      "Spells 1050",
      "Spells 1051",
      "Spells 1052",
      "Spells 1053",
      "Spells 1054",
      "Spells 1055",
      "Spells 1056",
      "Spells 1057",
      "Spells 1058",
      "Spells 1059"
    ],
    checkboxes: [
      "Check Box 315",
      "Check Box 314",
      "Check Box 3031",
      "Check Box 3032",
      "Check Box 3033",
      "Check Box 3034",
      "Check Box 3035",
      "Check Box 3036",
      "Check Box 3037",
      "Check Box 3038",
      "Check Box 3039",
      "Check Box 3040",
      "Check Box 3041"
    ]
  },
  4: {
    fields: [
      "Spells 1061",
      "Spells 1060",
      "Spells 1062",
      "Spells 1063",
      "Spells 1064",
      "Spells 1065",
      "Spells 1066",
      "Spells 1067",
      "Spells 1068",
      "Spells 1069",
      "Spells 1070",
      "Spells 1071",
      "Spells 1072"
    ],
    checkboxes: [
      "Check Box 317",
      "Check Box 316",
      "Check Box 3042",
      "Check Box 3043",
      "Check Box 3044",
      "Check Box 3045",
      "Check Box 3046",
      "Check Box 3047",
      "Check Box 3048",
      "Check Box 3049",
      "Check Box 3050",
      "Check Box 3051",
      "Check Box 3052"
    ]
  },
  5: {
    fields: [
      "Spells 1074",
      "Spells 1073",
      "Spells 1075",
      "Spells 1076",
      "Spells 1077",
      "Spells 1078",
      "Spells 1079",
      "Spells 1080",
      "Spells 1081"
    ],
    checkboxes: [
      "Check Box 319",
      "Check Box 318",
      "Check Box 3053",
      "Check Box 3054",
      "Check Box 3055",
      "Check Box 3056",
      "Check Box 3057",
      "Check Box 3058",
      "Check Box 3059"
    ]
  },
  6: {
    fields: [
      "Spells 1083",
      "Spells 1082",
      "Spells 1084",
      "Spells 1085",
      "Spells 1086",
      "Spells 1087",
      "Spells 1088",
      "Spells 1089",
      "Spells 1090"
    ],
    checkboxes: [
      "Check Box 321",
      "Check Box 320",
      "Check Box 3060",
      "Check Box 3061",
      "Check Box 3062",
      "Check Box 3063",
      "Check Box 3064",
      "Check Box 3065",
      "Check Box 3066"
    ]
  },
  7: {
    fields: [
      "Spells 1092",
      "Spells 1091",
      "Spells 1093",
      "Spells 1094",
      "Spells 1095",
      "Spells 1096",
      "Spells 1097",
      "Spells 1098",
      "Spells 1099"
    ],
    checkboxes: [
      "Check Box 323",
      "Check Box 322",
      "Check Box 3067",
      "Check Box 3068",
      "Check Box 3069",
      "Check Box 3070",
      "Check Box 3071",
      "Check Box 3072",
      "Check Box 3073"
    ]
  },
  8: {
    fields: [
      "Spells 10101",
      "Spells 10100",
      "Spells 10102",
      "Spells 10103",
      "Spells 10104",
      "Spells 10105",
      "Spells 10106"
    ],
    checkboxes: [
      "Check Box 325",
      "Check Box 324",
      "Check Box 3074",
      "Check Box 3075",
      "Check Box 3076",
      "Check Box 3077",
      "Check Box 3078"
    ]
  },
  9: {
    fields: [
      "Spells 10108",
      "Spells 10107",
      "Spells 10109",
      "Spells 101010",
      "Spells 101011",
      "Spells 101012",
      "Spells 101013"
    ],
    checkboxes: [
      "Check Box 327",
      "Check Box 326",
      "Check Box 3079",
      "Check Box 3080",
      "Check Box 3081",
      "Check Box 3082",
      "Check Box 3083"
    ]
  }
};

Hooks.once("init", () => {
  console.log(`${MODULE_TITLE} | Initializing module.`);
});

Hooks.on("getHeaderControlsApplicationV2", (app, controls) => {
  if (!isSupportedActorSheet(app)) return;
  if (controls.some((control) => control.action === EXPORT_ACTION)) return;

  controls.unshift({
    action: EXPORT_ACTION,
    icon: EXPORT_ICON,
    label: EXPORT_LABEL,
    onClick: () => void exportActorSheet(app)
  });
});

Hooks.on("getApplicationV1HeaderButtons", addV1HeaderButton);
Hooks.on("getApplicationHeaderButtons", addV1HeaderButton);

function addV1HeaderButton(app, buttons) {
  if (!isSupportedActorSheet(app)) return;
  if (buttons.some((button) => button.class === EXPORT_ACTION)) return;

  buttons.unshift({
    class: EXPORT_ACTION,
    icon: EXPORT_ICON,
    label: EXPORT_LABEL,
    onclick: () => void exportActorSheet(app)
  });
}

function isSupportedActorSheet(app) {
  const actor = app?.actor;
  return actor?.type === "character" && actor.isOwner;
}

async function exportActorSheet(app) {
  const actor = app?.actor;
  if (!actor) return;

  try {
    ui.notifications?.info(`Preparing ${actor.name}'s PDF export...`);

    const response = await fetch(TEMPLATE_PATH);
    if (!response.ok) {
      throw new Error(`Could not load PDF template (${response.status}).`);
    }

    const templateBytes = await response.arrayBuffer();
    const pdfDoc = await PDFDocument.load(templateBytes);
    const form = pdfDoc.getForm();

    const exportData = buildActorPdfData(actor);
    applyTextFields(form, exportData.text);
    applyCheckBoxes(form, exportData.checkboxes);
    await applyActorPortrait(pdfDoc, form, actor);

    form.updateFieldAppearances();

    const pdfBytes = await pdfDoc.save();
    downloadPdf(pdfBytes, `${sanitizeFilename(actor.name || "character-sheet")}.pdf`);

    ui.notifications?.info(`Exported ${actor.name}'s character sheet PDF.`);
  } catch (error) {
    console.error(`${MODULE_TITLE} | PDF export failed.`, error);
    ui.notifications?.error("PDF export failed. Check the browser console for details.");
  }
}

function buildActorPdfData(actor) {
  const system = actor.system ?? {};
  const abilities = system.abilities ?? {};
  const skills = system.skills ?? {};
  const classes = getItemsByType(actor, "class");
  const backgrounds = getItemsByType(actor, "background");
  const races = getItemsByType(actor, "race");
  const features = getItemsByType(actor, "feat");
  const weapons = getItemsByType(actor, "weapon");
  const spells = getItemsByType(actor, "spell");
  const inventory = getInventoryItems(actor);

  const classSummary = getClassSummary(actor, classes);
  const backgroundName = firstDefined(
    backgrounds[0]?.name,
    getPropertyAny(system, ["details.background", "background"])
  );
  const raceName = firstDefined(
    races[0]?.name,
    getPropertyAny(system, ["details.race", "traits.race"])
  );

  const biographyText = joinParagraphs([
    htmlToPlainText(getPropertyAny(system, ["details.biography.value", "details.biography", "details.notes.value", "details.notes"])),
    htmlToPlainText(backgrounds[0]?.system?.description?.value)
  ]);

  const backstoryField = clipText(biographyText, 3200);

  const featureLines = buildFeatureLines(actor, features, classes, races, backgrounds);
  const [featuresPage1, featuresPage2] = splitLinesByBudget(featureLines, [2100, 1800]);

  const equipmentLines = buildEquipmentLines(inventory);
  const equipmentField = splitLinesByBudget(equipmentLines, [1500])[0];

  const treasureLines = buildTreasureLines(actor, inventory);
  const treasureField = splitLinesByBudget(treasureLines, [1500])[0];

  const proficiencyLines = buildProficiencyLines(actor);
  const proficienciesField = splitLinesByBudget(proficiencyLines, [1500])[0];

  const attackProfiles = buildAttackProfiles(actor, weapons);
  const attackSummaryLines = buildAttackSummaryLines(actor, attackProfiles);
  const attacksField = splitLinesByBudget(attackSummaryLines, [1050])[0];

  const personalityText = clipText(getPropertyAny(system, ["details.trait", "details.personalityTraits"]), 220);
  const idealsText = clipText(getPropertyAny(system, ["details.ideal"]), 220);
  const bondsText = clipText(getPropertyAny(system, ["details.bond"]), 220);
  const flawsText = clipText(getPropertyAny(system, ["details.flaw"]), 220);

  const text = {
    "CharacterName": actor.name ?? "",
    "CharacterName 2": actor.name ?? "",
    "ClassLevel": clipText(classSummary, 120),
    "Background": clipText(backgroundName, 60),
    "PlayerName": clipText(getPropertyAny(system, ["details.playerName", "details.player"]), 60) || game.user?.name || "",
    "Race ": clipText(raceName, 60),
    "Alignment": clipText(getPropertyAny(system, ["details.alignment"]), 40),
    "XP": formatPlainValue(getPropertyAny(system, ["details.xp.value", "details.xp"])),
    "Inspiration": getTruthyValue(getPropertyAny(system, ["attributes.inspiration"])) ? "X" : "",
    "ProfBonus": formatSigned(getPropertyAny(system, ["attributes.prof", "prof.flat", "prof"])),
    "AC": formatPlainValue(getPropertyAny(system, ["attributes.ac.value", "attributes.ac"])),
    "Initiative": formatSigned(getPropertyAny(system, ["attributes.init.total", "attributes.init.value", "attributes.init.mod"])),
    "Speed": formatMovement(getPropertyAny(system, ["attributes.movement", "attributes.speed"])),
    "PersonalityTraits ": personalityText,
    "Ideals": idealsText,
    "Bonds": bondsText,
    "Flaws": flawsText,
    "HPMax": formatPlainValue(getPropertyAny(system, ["attributes.hp.max"])),
    "HPCurrent": formatPlainValue(getPropertyAny(system, ["attributes.hp.value"])),
    "HPTemp": formatPlainValue(getPropertyAny(system, ["attributes.hp.temp"])),
    "HDTotal": formatPlainValue(getPropertyAny(system, ["attributes.hd.max"])),
    "HD": formatHitDice(system),
    "Passive": formatPlainValue(getPropertyAny(skills, ["prc.passive"])),
    "CP": formatPlainValue(getPropertyAny(system, ["currency.cp"])),
    "SP": formatPlainValue(getPropertyAny(system, ["currency.sp"])),
    "EP": formatPlainValue(getPropertyAny(system, ["currency.ep"])),
    "GP": formatPlainValue(getPropertyAny(system, ["currency.gp"])),
    "PP": formatPlainValue(getPropertyAny(system, ["currency.pp"])),
    "ProficienciesLang": proficienciesField,
    "Equipment": equipmentField,
    "Features and Traits": featuresPage1,
    "AttacksSpellcasting": attacksField,
    "Age": clipText(getPropertyAny(system, ["details.age", "details.appearance.age"]), 30),
    "Height": clipText(getPropertyAny(system, ["details.height", "details.appearance.height"]), 30),
    "Weight": clipText(getPropertyAny(system, ["details.weight", "details.appearance.weight"]), 30),
    "Eyes": clipText(getPropertyAny(system, ["details.eyes", "details.appearance.eyes"]), 30),
    "Skin": clipText(getPropertyAny(system, ["details.skin", "details.appearance.skin"]), 30),
    "Hair": clipText(getPropertyAny(system, ["details.hair", "details.appearance.hair"]), 30),
    "Allies": clipText(getPropertyAny(system, ["details.allies", "details.contacts", "details.relationships"]), 2200),
    "FactionName": clipText(getPropertyAny(system, ["details.faction", "details.organization", "details.affiliation"]), 100),
    "Backstory": backstoryField,
    "Feat+Traits": featuresPage2,
    "Treasure": treasureField,
    "Spellcasting Class 2": clipText(getSpellcastingClassSummary(actor, classes, spells), 120),
    "SpellcastingAbility 2": getSpellcastingAbilityAbbreviation(actor),
    "SpellSaveDC  2": formatPlainValue(getPropertyAny(system, ["attributes.spell.dc"])),
    "SpellAtkBonus 2": formatSigned(getPropertyAny(system, ["attributes.spell.attack"]))
  };

  for (const abilityField of ABILITY_FIELDS) {
    const ability = abilities[abilityField.key] ?? {};
    text[abilityField.score] = formatPlainValue(firstDefined(ability.value, ability.score));
    text[abilityField.mod] = formatSigned(firstDefined(ability.mod, ability.modifier));
    text[abilityField.save] = formatSigned(firstDefined(ability.save, ability.saveBonus, ability.mod));
  }

  for (const skillField of SKILL_FIELDS) {
    const skill = skills[skillField.key] ?? {};
    text[skillField.value] = formatSigned(firstDefined(skill.total, skill.mod, skill.bonus));
  }

  applyWeaponFields(text, attackProfiles);
  applySpellFields(actor, spells, text);

  const checkboxes = {
    "Check Box 12": getCountValue(getPropertyAny(system, ["attributes.death.success"])) >= 1,
    "Check Box 13": getCountValue(getPropertyAny(system, ["attributes.death.success"])) >= 2,
    "Check Box 14": getCountValue(getPropertyAny(system, ["attributes.death.success"])) >= 3,
    "Check Box 15": getCountValue(getPropertyAny(system, ["attributes.death.failure"])) >= 1,
    "Check Box 16": getCountValue(getPropertyAny(system, ["attributes.death.failure"])) >= 2,
    "Check Box 17": getCountValue(getPropertyAny(system, ["attributes.death.failure"])) >= 3
  };

  for (const abilityField of ABILITY_FIELDS) {
    checkboxes[abilityField.proficientBox] = hasAbilityProficiency(abilities[abilityField.key]);
  }

  for (const skillField of SKILL_FIELDS) {
    checkboxes[skillField.proficientBox] = hasSkillProficiency(skills[skillField.key]);
  }

  applySpellCheckboxes(spells, checkboxes);

  return { text, checkboxes };
}

function applyWeaponFields(text, attackProfiles) {
  const first = attackProfiles[0] ?? {};
  const second = attackProfiles[1] ?? {};
  const third = attackProfiles[2] ?? {};

  text["Wpn Name"] = clipText(first.name, 30);
  text["Wpn1 AtkBonus"] = formatSigned(first.toHit);
  text["Wpn1 Damage"] = clipText(first.damage, 40);

  text["Wpn Name 2"] = clipText(second.name, 30);
  text["Wpn2 AtkBonus "] = formatSigned(second.toHit);
  text["Wpn2 Damage "] = clipText(second.damage, 40);

  text["Wpn Name 3"] = clipText(third.name, 30);
  text["Wpn3 AtkBonus  "] = formatSigned(third.toHit);
  text["Wpn3 Damage "] = clipText(third.damage, 40);
}

function applySpellFields(actor, spells, text) {
  const spellsByLevel = new Map();
  for (let level = 0; level <= 9; level += 1) {
    spellsByLevel.set(level, []);
  }

  for (const spell of spells) {
    const level = Math.max(0, Math.min(9, Number(getPropertyAny(spell.system ?? {}, ["level"])) || 0));
    spellsByLevel.get(level)?.push(spell);
  }

  for (let level = 0; level <= 9; level += 1) {
    const config = SPELL_FIELD_GROUPS[level];
    if (!config) continue;

    const names = (spellsByLevel.get(level) ?? [])
      .sort(compareSpellsForPdf)
      .map(getSpellDisplayName);

    assignSingleLineFields(text, config.fields, names);
  }

  for (let level = 1; level <= 9; level += 1) {
    const slotFields = SPELL_SLOT_FIELDS[level];
    if (!slotFields) continue;

    const slots = getSpellSlotValues(actor, level);
    text[slotFields.total] = formatPlainValue(slots.max);
    text[slotFields.remaining] = formatPlainValue(slots.value);
  }
}

function applySpellCheckboxes(spells, checkboxes) {
  const spellsByLevel = new Map();
  for (let level = 1; level <= 9; level += 1) {
    spellsByLevel.set(level, []);
  }

  for (const spell of spells) {
    const level = Number(getPropertyAny(spell.system ?? {}, ["level"])) || 0;
    if (level < 1 || level > 9) continue;
    spellsByLevel.get(level)?.push(spell);
  }

  for (let level = 1; level <= 9; level += 1) {
    const config = SPELL_FIELD_GROUPS[level];
    if (!config?.checkboxes) continue;

    const availableSpells = (spellsByLevel.get(level) ?? [])
      .sort(compareSpellsForPdf)
      .map(isSpellMarkedAvailable);

    for (let index = 0; index < config.checkboxes.length; index += 1) {
      checkboxes[config.checkboxes[index]] = availableSpells[index] ?? false;
    }
  }
}

function applyTextFields(form, values) {
  for (const [fieldName, rawValue] of Object.entries(values)) {
    try {
      const field = form.getTextField(fieldName);
      field.setText(String(rawValue ?? ""));
    } catch (error) {
      console.debug(`${MODULE_TITLE} | Skipped missing or incompatible text field "${fieldName}".`, error);
    }
  }
}

function applyCheckBoxes(form, values) {
  for (const [fieldName, checked] of Object.entries(values)) {
    try {
      const field = form.getCheckBox(fieldName);
      if (checked) field.check();
      else field.uncheck();
    } catch (error) {
      console.debug(`${MODULE_TITLE} | Skipped missing or incompatible checkbox field "${fieldName}".`, error);
    }
  }
}

async function applyActorPortrait(pdfDoc, form, actor) {
  if (!actor?.img) return;

  try {
    const imageBytes = await imagePathToPngBytes(actor.img);
    const image = await pdfDoc.embedPng(imageBytes);
    form.getButton("CHARACTER IMAGE").setImage(image);
  } catch (error) {
    console.debug(`${MODULE_TITLE} | Could not embed actor portrait.`, error);
  }
}

async function imagePathToPngBytes(src) {
  const image = await loadImage(src);
  const canvas = document.createElement("canvas");
  canvas.width = image.naturalWidth || image.width;
  canvas.height = image.naturalHeight || image.height;

  const context = canvas.getContext("2d");
  if (!context) throw new Error("Could not create a canvas context for portrait conversion.");

  context.drawImage(image, 0, 0);

  const blob = await new Promise((resolve, reject) => {
    canvas.toBlob((result) => {
      if (result) resolve(result);
      else reject(new Error("Canvas conversion returned no data."));
    }, "image/png");
  });

  return blob.arrayBuffer();
}

function loadImage(src) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.crossOrigin = "anonymous";
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error(`Failed to load image: ${src}`));
    image.src = src;
  });
}

function getClassSummary(actor, classes = getItemsByType(actor, "class")) {
  const classLines = classes.map((item) => {
    const levels = firstDefined(getPropertyAny(item.system ?? {}, ["levels", "advancement.level", "level"]));
    return levels ? `${item.name} ${levels}` : item.name;
  });

  return classLines.length
    ? classLines.join(" / ")
    : String(firstDefined(
      getPropertyAny(actor.system ?? {}, ["details.class", "class"]),
      ""
    ));
}

function getSpellcastingClassSummary(actor, classes, spells) {
  const spellcastingClasses = classes.filter((item) => {
    const system = item.system ?? {};
    const progression = String(getPropertyAny(system, ["spellcasting.progression"]) ?? "").toLowerCase();
    return Boolean(getPropertyAny(system, ["spellcasting.ability"])) || (progression && progression !== "none");
  });

  if (spellcastingClasses.length) {
    return spellcastingClasses.map((item) => item.name).join(" / ");
  }

  if (spells.length) {
    return getClassSummary(actor, classes);
  }

  return "";
}

function getSpellcastingAbilityAbbreviation(actor) {
  const abilityKey = String(firstDefined(
    getPropertyAny(actor.system ?? {}, ["attributes.spellcasting", "attributes.spell.ability"]),
    ""
  )).trim().toLowerCase();

  if (!abilityKey) return "";

  const shortLabels = {
    str: "STR",
    dex: "DEX",
    con: "CON",
    int: "INT",
    wis: "WIS",
    cha: "CHA"
  };

  return shortLabels[abilityKey] ?? abilityKey.toUpperCase();
}

function getSpellSlotValues(actor, level) {
  const system = actor.system ?? {};
  const spellData = getPropertyAny(system, [`spells.spell${level}`]) ?? {};
  const pactData = getPropertyAny(system, ["spells.pact"]) ?? {};
  const pactLevel = Number(firstDefined(pactData.level, pactData.overrideLevel)) || 0;

  const spellMax = firstDefined(spellData.max, spellData.override);
  const spellValue = firstDefined(spellData.value, spellData.max);
  const pactMax = pactLevel === level ? firstDefined(pactData.max, 0) : undefined;
  const pactValue = pactLevel === level ? firstDefined(pactData.value, pactData.max, 0) : undefined;

  const hasAnySlots = [spellMax, spellValue, pactMax, pactValue].some((value) => value !== undefined && value !== null && value !== "");
  if (!hasAnySlots) {
    return { max: "", value: "" };
  }

  const max = toNumber(spellMax) + toNumber(pactMax);
  const value = toNumber(spellValue) + toNumber(pactValue);

  return {
    max,
    value
  };
}

function buildFeatureLines(actor, features, classes, races, backgrounds) {
  const lines = [];

  for (const item of [...classes, ...races, ...backgrounds, ...features]) {
    const description = clipText(htmlToPlainText(getPropertyAny(item.system ?? {}, ["description.value", "description.chat"])), 160);
    lines.push(description ? `${item.name}: ${description}` : item.name);
  }

  const resources = buildResourceLines(actor);
  if (resources.length) {
    lines.push(...resources);
  }

  return uniqueLines(lines);
}

function buildResourceLines(actor) {
  const resources = getPropertyAny(actor.system ?? {}, ["resources"]) ?? {};
  const lines = [];

  for (const slot of ["primary", "secondary", "tertiary"]) {
    const resource = resources[slot];
    if (!resource) continue;

    const label = firstDefined(resource.label, slot);
    const value = firstDefined(resource.value, 0);
    const max = firstDefined(resource.max, 0);
    if (!label || (!value && !max)) continue;

    lines.push(`${label}: ${value}/${max}`);
  }

  return lines;
}

function buildEquipmentLines(inventory) {
  const lines = inventory.map((item) => {
    const quantity = toNumber(firstDefined(item.system?.quantity, 1));
    const quantityPrefix = quantity > 1 ? `${quantity}x ` : "";
    const equipped = getTruthyValue(getPropertyAny(item.system ?? {}, ["equipped", "worn", "attuned"])) ? " (equipped)" : "";
    return `${quantityPrefix}${item.name}${equipped}`;
  });

  return uniqueLines(lines);
}

function buildTreasureLines(actor, inventory) {
  const currencyLine = compact([
    formatCurrencyAmount(actor, "pp", "PP"),
    formatCurrencyAmount(actor, "gp", "GP"),
    formatCurrencyAmount(actor, "ep", "EP"),
    formatCurrencyAmount(actor, "sp", "SP"),
    formatCurrencyAmount(actor, "cp", "CP")
  ]).join(" | ");

  const treasureItems = inventory
    .filter((item) => ["loot", "consumable"].includes(item.type))
    .map((item) => {
      const quantity = toNumber(firstDefined(item.system?.quantity, 1));
      return quantity > 1 ? `${quantity}x ${item.name}` : item.name;
    });

  return uniqueLines([currencyLine, ...treasureItems]);
}

function buildProficiencyLines(actor) {
  const system = actor.system ?? {};
  const config = CONFIG.DND5E ?? {};

  const sections = [
    buildTraitSection("Languages", getPropertyAny(system, ["traits.languages"]), config.languages),
    buildTraitSection("Armor", getPropertyAny(system, ["traits.armorProf"]), config.armorProficiencies),
    buildTraitSection("Weapons", getPropertyAny(system, ["traits.weaponProf"]), config.weaponProficiencies),
    buildTraitSection("Tools", firstDefined(
      getPropertyAny(system, ["traits.toolProf"]),
      getPropertyAny(system, ["tools"])
    ), config.toolProficiencies)
  ];

  return sections.filter(Boolean);
}

function buildTraitSection(label, data, dictionary) {
  const values = expandTraitValues(data, dictionary);
  if (!values.length) return "";
  return `${label}: ${values.join(", ")}`;
}

function expandTraitValues(data, dictionary = {}) {
  if (!data) return [];

  if (typeof data === "string") {
    return normalizeDelimitedText(data);
  }

  const values = [];
  const rawValues = Array.isArray(data.value) ? data.value : Array.isArray(data) ? data : [];

  for (const rawValue of rawValues) {
    values.push(dictionary?.[rawValue]?.label ?? dictionary?.[rawValue] ?? String(rawValue));
  }

  values.push(...normalizeDelimitedText(data.custom));

  return uniqueLines(values);
}

function buildAttackProfiles(actor, weapons) {
  const profiles = weapons.map((item) => {
    const activity = getPrimaryActivity(item);
    return {
      name: item.name,
      toHit: firstDefined(
        item.labels?.toHit,
        getPropertyAny(activity, ["attack.bonus", "attack.value", "attack.mod"]),
        getPropertyAny(item.system ?? {}, ["attack.bonus"])
      ),
      damage: firstDefined(
        getDamageLabel(item),
        getActivityDamage(activity),
        getLegacyDamage(item)
      )
    };
  });

  return profiles.filter((profile) => profile.name);
}

function buildAttackSummaryLines(actor, attackProfiles) {
  const lines = attackProfiles.map((profile) => compact([
    profile.name,
    profile.toHit !== undefined && profile.toHit !== null && profile.toHit !== "" ? `(${formatSigned(profile.toHit)})` : "",
    profile.damage ? `- ${profile.damage}` : ""
  ]).join(" "));

  const spellDc = formatPlainValue(getPropertyAny(actor.system ?? {}, ["attributes.spell.dc"]));
  const spellAttack = formatSigned(getPropertyAny(actor.system ?? {}, ["attributes.spell.attack"]));
  if (spellDc || spellAttack) {
    lines.push(compact([
      "Spellcasting",
      spellDc ? `DC ${spellDc}` : "",
      spellAttack ? `Attack ${spellAttack}` : ""
    ]).join(" | "));
  }

  return uniqueLines(lines);
}

function getItemsByType(actor, type) {
  return actor.itemTypes?.[type] ?? actor.items?.filter((item) => item.type === type) ?? [];
}

function getInventoryItems(actor) {
  const inventoryTypes = new Set(["weapon", "equipment", "consumable", "tool", "loot", "backpack"]);
  return actor.items?.filter((item) => inventoryTypes.has(item.type)) ?? [];
}

function getPrimaryActivity(item) {
  const activities = Object.values(getPropertyAny(item.system ?? {}, ["activities"]) ?? {});
  return activities.find((activity) => activity?.type === "attack")
    ?? activities.find((activity) => activity?.attack || activity?.damage)
    ?? activities[0]
    ?? null;
}

function getDamageLabel(item) {
  const labels = item.labels ?? {};
  if (Array.isArray(labels.damages) && labels.damages.length) {
    return labels.damages.join(", ");
  }

  return firstDefined(labels.damage, labels.damageFormula, labels.formula);
}

function getActivityDamage(activity) {
  if (!activity) return "";

  const parts = getPropertyAny(activity, ["damage.parts"]) ?? [];
  const formatted = parts.map((part) => {
    if (Array.isArray(part)) return part[0];
    if (typeof part === "string") return part;
    if (part?.formula) return part.formula;
    if (part?.number && part?.denomination) return `${part.number}${part.denomination}`;
    return "";
  }).filter(Boolean);

  return formatted.join(", ");
}

function getLegacyDamage(item) {
  const parts = getPropertyAny(item.system ?? {}, ["damage.parts"]) ?? [];
  return parts.map((part) => Array.isArray(part) ? part[0] : part?.formula).filter(Boolean).join(", ");
}

function compareSpellsForPdf(left, right) {
  const leftPrepared = Number(isSpellMarkedAvailable(left));
  const rightPrepared = Number(isSpellMarkedAvailable(right));
  if (leftPrepared !== rightPrepared) return rightPrepared - leftPrepared;

  return left.name.localeCompare(right.name);
}

function getSpellDisplayName(spell) {
  const suffixes = [];
  const system = spell.system ?? {};

  if (getTruthyValue(getPropertyAny(system, ["properties.ritual"]))) {
    suffixes.push("R");
  }

  if (String(getPropertyAny(system, ["preparation.mode"]) ?? "").toLowerCase() === "atwill") {
    suffixes.push("At Will");
  }

  if (String(getPropertyAny(system, ["preparation.mode"]) ?? "").toLowerCase() === "innate") {
    suffixes.push("Innate");
  }

  if (!suffixes.length) return spell.name;
  return `${spell.name} (${suffixes.join(", ")})`;
}

function isSpellMarkedAvailable(spell) {
  const mode = String(getPropertyAny(spell.system ?? {}, ["preparation.mode"]) ?? "").toLowerCase();
  if (mode === "prepared") {
    return getTruthyValue(getPropertyAny(spell.system ?? {}, ["preparation.prepared"]));
  }

  return mode !== "unp" && mode !== "none";
}

function assignSingleLineFields(text, fieldNames, values) {
  const usableValues = [...values];
  const overflowCount = Math.max(0, usableValues.length - fieldNames.length);

  for (let index = 0; index < fieldNames.length; index += 1) {
    const fieldName = fieldNames[index];
    const value = usableValues[index] ?? "";
    text[fieldName] = clipText(value, 60);
  }

  if (overflowCount > 0 && fieldNames.length) {
    const lastField = fieldNames[fieldNames.length - 1];
    const base = text[lastField];
    text[lastField] = clipText(`${base} (+${overflowCount} more)`, 60);
  }
}

function splitLinesByBudget(lines, budgets) {
  const source = uniqueLines(lines);
  const chunks = budgets.map(() => "");
  let index = 0;

  for (let budgetIndex = 0; budgetIndex < budgets.length; budgetIndex += 1) {
    const budget = budgets[budgetIndex];
    let chunk = "";

    while (index < source.length) {
      const nextLine = source[index];
      const candidate = chunk ? `${chunk}\n${nextLine}` : nextLine;

      if (chunk && candidate.length > budget) break;
      if (!chunk && nextLine.length > budget) {
        chunk = clipText(nextLine, budget);
        index += 1;
        break;
      }

      chunk = candidate;
      index += 1;
    }

    chunks[budgetIndex] = chunk;
  }

  if (index < source.length && chunks.length) {
    const lastIndex = chunks.length - 1;
    const budget = budgets[lastIndex];
    const remainder = source.slice(index).join("\n");
    chunks[lastIndex] = clipText(compact([chunks[lastIndex], remainder]).join("\n"), budget);
  }

  return chunks;
}

function formatMovement(movement) {
  if (!movement) return "";
  if (typeof movement === "string" || typeof movement === "number") return String(movement);

  const entries = [
    { key: "walk", label: "" },
    { key: "burrow", label: "burrow" },
    { key: "climb", label: "climb" },
    { key: "fly", label: "fly" },
    { key: "swim", label: "swim" }
  ];

  const parts = [];
  for (const entry of entries) {
    const raw = firstDefined(movement[entry.key], entry.key === "walk" ? movement.speed : undefined);
    if (raw === undefined || raw === null || raw === "") continue;

    const text = entry.label ? `${entry.label} ${raw}` : String(raw);
    parts.push(text.includes("ft") ? text : `${text} ft.`);
  }

  return parts.join("; ");
}

function formatHitDice(system) {
  const current = getPropertyAny(system, ["attributes.hd.value"]);
  const total = getPropertyAny(system, ["attributes.hd.max"]);
  const size = getPropertyAny(system, ["attributes.hd.largest"]);

  if (current === undefined && total === undefined && !size) return "";

  const countPart = total !== undefined ? `${formatPlainValue(current)}/${formatPlainValue(total)}` : formatPlainValue(current);
  return compact([countPart, size]).join(" ");
}

function formatCurrencyAmount(actor, key, label) {
  const value = getPropertyAny(actor.system ?? {}, [`currency.${key}`]);
  if (!value && value !== 0) return "";
  return `${label} ${value}`;
}

function sanitizeFilename(name) {
  return String(name).replace(/[<>:"/\\|?*]+/g, "").trim() || "character-sheet";
}

function downloadPdf(bytes, filename) {
  const blob = new Blob([bytes], { type: "application/pdf" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.append(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

function getPropertyAny(object, paths) {
  if (object === undefined || object === null) return undefined;

  for (const path of Array.isArray(paths) ? paths : [paths]) {
    if (!path) continue;
    const value = foundry.utils.getProperty(object, path);
    if (value !== undefined && value !== null && value !== "") return value;
  }

  return undefined;
}

function firstDefined(...values) {
  return values.find((value) => value !== undefined && value !== null && value !== "");
}

function compact(values) {
  return values.filter((value) => value !== undefined && value !== null && value !== "");
}

function clipText(value, maxLength) {
  const text = normalizeWhitespace(value);
  if (!text) return "";
  if (text.length <= maxLength) return text;
  return `${text.slice(0, Math.max(0, maxLength - 3)).trimEnd()}...`;
}

function normalizeWhitespace(value) {
  if (value === undefined || value === null) return "";
  return String(value)
    .replace(/\r/g, "")
    .replace(/\u00a0/g, " ")
    .replace(/[ \t]+\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function normalizeDelimitedText(value) {
  return normalizeWhitespace(value)
    .split(/[;,]\s*|\n+/)
    .map((part) => normalizeWhitespace(part))
    .filter(Boolean);
}

function joinParagraphs(parts) {
  return compact(parts.map((part) => normalizeWhitespace(part))).join("\n\n");
}

function htmlToPlainText(value) {
  const html = normalizeWhitespace(value);
  if (!html) return "";
  if (!html.includes("<")) return html;

  const document = new DOMParser().parseFromString(html, "text/html");
  return normalizeWhitespace(document.body?.textContent ?? "");
}

function formatPlainValue(value) {
  if (value === undefined || value === null || value === "") return "";
  return String(value);
}

function formatSigned(value) {
  if (value === undefined || value === null || value === "") return "";

  const numeric = Number(value);
  if (Number.isFinite(numeric)) {
    if (numeric > 0) return `+${numeric}`;
    return String(numeric);
  }

  return String(value);
}

function hasAbilityProficiency(data) {
  if (!data) return false;
  const proficiencyValue = firstDefined(data.proficient, data.prof, data.saveProf);
  if (typeof proficiencyValue === "boolean") return proficiencyValue;
  if (typeof proficiencyValue === "number") return proficiencyValue > 0;
  return false;
}

function hasSkillProficiency(data) {
  if (!data) return false;
  const proficiencyValue = firstDefined(data.value, data.prof, data.proficient);
  if (typeof proficiencyValue === "boolean") return proficiencyValue;
  if (typeof proficiencyValue === "number") return proficiencyValue > 0;
  return false;
}

function getTruthyValue(value) {
  if (typeof value === "string") {
    return ["true", "yes", "on", "1"].includes(value.toLowerCase());
  }

  return Boolean(value);
}

function getCountValue(value) {
  const numeric = Number(value);
  return Number.isFinite(numeric) ? numeric : 0;
}

function toNumber(value) {
  const numeric = Number(value);
  return Number.isFinite(numeric) ? numeric : 0;
}

function uniqueLines(lines) {
  const seen = new Set();
  const result = [];

  for (const rawLine of lines) {
    const line = normalizeWhitespace(rawLine);
    if (!line || seen.has(line)) continue;
    seen.add(line);
    result.push(line);
  }

  return result;
}
