const MODULE_ID = "PDFExport";
const MODULE_TITLE = "PDF Export";
const EXPORT_ACTION = "pdf-export";
const EXPORT_LABEL = "Export PDF";
const EXPORT_ICON = "fa-solid fa-file-pdf";
const EMPTY_VALUE = "-";

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
    onClick: () => exportActorSheet(app)
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
    onclick: () => exportActorSheet(app)
  });
}

function isSupportedActorSheet(app) {
  const actor = app?.actor;
  return actor?.type === "character" && actor.isOwner;
}

function exportActorSheet(app) {
  const actor = app?.actor;
  if (!actor) return;

  const title = escapeHtml(actor.name ?? "Character Sheet");
  const popup = window.open("", "_blank", "width=1400,height=1000");

  if (!popup) {
    ui.notifications?.warn("Please allow popups to export the character sheet to PDF.");
    return;
  }

  const portraitSrc = escapeHtml(firstDefined(actor.img, "https://placehold.co/240x300?text=Character+Portrait"));
  const stylesheetHref = `${window.location.origin}/modules/${MODULE_ID}/styles/module.css`;
  const abilityOrder = ["str", "dex", "con", "int", "wis", "cha"];
  const abilities = foundry.utils.getProperty(actor, "system.abilities") ?? {};
  const abilityRows = abilityOrder.map((ability) => {
    const abilityData = abilities[ability] ?? {};
    const score = escapeHtml(formatValue(firstDefined(abilityData.value, abilityData.score, abilityData.total)));
    const mod = escapeHtml(formatValue(firstDefined(abilityData.mod, abilityData.modifier)));

    return `
      <div class="ability-card">
        <div class="ability-name">${ability.toUpperCase()}</div>
        <div class="ability-score">${score}</div>
        <div class="ability-mod">${mod}</div>
      </div>`;
  }).join("");

  const classValue = escapeHtml(formatValue(firstDefined(
    foundry.utils.getProperty(actor, "system.details.class"),
    foundry.utils.getProperty(actor, "system.class")
  )));
  const levelValue = escapeHtml(formatValue(firstDefined(
    foundry.utils.getProperty(actor, "system.details.level"),
    foundry.utils.getProperty(actor, "system.level")
  )));
  const raceValue = escapeHtml(formatValue(foundry.utils.getProperty(actor, "system.details.race")));
  const backgroundValue = escapeHtml(formatValue(foundry.utils.getProperty(actor, "system.details.background")));
  const alignmentValue = escapeHtml(formatValue(foundry.utils.getProperty(actor, "system.details.alignment")));
  const xpValue = escapeHtml(formatValue(firstDefined(
    foundry.utils.getProperty(actor, "system.details.xp.value"),
    foundry.utils.getProperty(actor, "system.details.xp")
  )));
  const hpValue = escapeHtml(formatValue(foundry.utils.getProperty(actor, "system.attributes.hp.value")));
  const hpMax = escapeHtml(formatValue(foundry.utils.getProperty(actor, "system.attributes.hp.max")));
  const acValue = escapeHtml(formatValue(firstDefined(
    foundry.utils.getProperty(actor, "system.attributes.ac.value"),
    foundry.utils.getProperty(actor, "system.attributes.ac")
  )));
  const speedValue = escapeHtml(formatValue(firstDefined(
    foundry.utils.getProperty(actor, "system.attributes.speed.value"),
    foundry.utils.getProperty(actor, "system.attributes.movement.speed")
  )));
  const initValue = escapeHtml(formatValue(firstDefined(
    foundry.utils.getProperty(actor, "system.attributes.init.value"),
    foundry.utils.getProperty(actor, "system.attributes.initiative.value")
  )));
  const profValue = escapeHtml(formatValue(firstDefined(
    foundry.utils.getProperty(actor, "system.attributes.prof"),
    foundry.utils.getProperty(actor, "system.attributes.proficiency.value")
  )));
  const notes = escapeHtml(formatValue(firstDefined(
    foundry.utils.getProperty(actor, "system.details.notes"),
    foundry.utils.getProperty(actor, "system.details.biography")
  )));

  const content = `<!doctype html>
    <html lang="en">
      <head>
        <meta charset="utf-8">
        <title>${title}</title>
        <link rel="stylesheet" href="${stylesheetHref}">
      </head>
      <body>
        <div class="pdf-export-sheet">
          <div class="sheet-header">
            <div class="portrait-frame">
              <img id="portrait-preview" src="${portraitSrc}" alt="Character portrait">
            </div>
            <div class="identity-block">
              <div class="sheet-label">Character Sheet</div>
              <h1>${title}</h1>
              <div class="identity-grid">
                <div><span class="label">Class</span><strong>${classValue}</strong></div>
                <div><span class="label">Level</span><strong>${levelValue}</strong></div>
                <div><span class="label">Race</span><strong>${raceValue}</strong></div>
                <div><span class="label">Background</span><strong>${backgroundValue}</strong></div>
                <div><span class="label">Alignment</span><strong>${alignmentValue}</strong></div>
                <div><span class="label">XP</span><strong>${xpValue}</strong></div>
              </div>
              <div class="image-upload-box">
                <label for="image-upload">Upload character image</label>
                <input id="image-upload" type="file" accept="image/*">
              </div>
            </div>
          </div>

          <section class="sheet-box">
            <h2>Core Details</h2>
            <div class="stat-grid">
              <div class="stat-card"><span class="label">HP</span><strong>${hpValue}/${hpMax}</strong></div>
              <div class="stat-card"><span class="label">AC</span><strong>${acValue}</strong></div>
              <div class="stat-card"><span class="label">Speed</span><strong>${speedValue}</strong></div>
              <div class="stat-card"><span class="label">Initiative</span><strong>${initValue}</strong></div>
              <div class="stat-card"><span class="label">Proficiency</span><strong>${profValue}</strong></div>
            </div>
          </section>

          <section class="sheet-box">
            <h2>Ability Scores</h2>
            <div class="ability-grid">${abilityRows}</div>
          </section>

          <section class="sheet-box">
            <h2>Background & Notes</h2>
            <div class="notes-box">${notes}</div>
          </section>
        </div>
      </body>
    </html>`;

  popup.document.open();
  popup.document.write(content);
  popup.document.close();

  const preview = popup.document.getElementById("portrait-preview");
  const uploadInput = popup.document.getElementById("image-upload");
  if (preview && uploadInput) {
    uploadInput.addEventListener("change", (event) => {
      const file = event.target.files?.[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = () => {
        preview.src = reader.result;
      };
      reader.readAsDataURL(file);
    });
  }

  setTimeout(() => {
    popup.focus();
    popup.print();
  }, 600);
}

function firstDefined(...values) {
  return values.find((value) => value !== undefined && value !== null && value !== "");
}

function formatValue(value) {
  if (value === undefined || value === null || value === "") return EMPTY_VALUE;
  if (typeof value === "object") {
    if (value.name) return value.name;
    if (value.label) return value.label;
    if (value.value !== undefined) return formatValue(value.value);
    return EMPTY_VALUE;
  }
  return String(value);
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}
