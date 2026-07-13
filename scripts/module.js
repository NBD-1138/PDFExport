const MODULE_ID = 'pdf-export';
const MODULE_TITLE = 'PDF Export';

Hooks.once('init', () => {
  console.log(`${MODULE_TITLE} | Initializing module.`);
});

Hooks.on('renderActorSheet', (app, html) => {
  if (!app?.actor || app.actor.type !== 'character') return;
  if (!app.actor.isOwner) return;
  if (html.find('.pdf-export-button').length) return;

  const header = html.find('.window-header');
  if (!header.length) return;

  const button = $('<button type="button" class="pdf-export-button"><i class="fas fa-file-pdf"></i><span>Export PDF</span></button>');
  button.on('click', (event) => {
    event.preventDefault();
    exportActorSheet(app);
  });

  header.append(button);
});

function exportActorSheet(app) {
  const actor = app?.actor;
  const title = actor?.name ?? 'Character Sheet';
  const popup = window.open('', '_blank', 'width=1400,height=1000');

  if (!popup) {
    ui.notifications?.warn('Please allow popups to export the character sheet to PDF.');
    return;
  }

  const portraitSrc = actor?.img || 'https://placehold.co/240x300?text=Character+Portrait';
  const abilityOrder = ['str', 'dex', 'con', 'int', 'wis', 'cha'];
  const abilities = foundry.utils.getProperty(actor, 'system.abilities') ?? {};
  const abilityRows = abilityOrder.map((ability) => {
    const abilityData = abilities[ability] ?? {};
    const score = formatValue(abilityData.value ?? abilityData.score ?? abilityData.total);
    const mod = formatValue(abilityData.mod ?? abilityData.modifier);
    return `
      <div class="ability-card">
        <div class="ability-name">${ability.toUpperCase()}</div>
        <div class="ability-score">${score}</div>
        <div class="ability-mod">${mod}</div>
      </div>`;
  }).join('');

  const classValue = formatValue(foundry.utils.getProperty(actor, 'system.details.class') || foundry.utils.getProperty(actor, 'system.class'));
  const levelValue = formatValue(foundry.utils.getProperty(actor, 'system.details.level') || foundry.utils.getProperty(actor, 'system.level'));
  const raceValue = formatValue(foundry.utils.getProperty(actor, 'system.details.race'));
  const backgroundValue = formatValue(foundry.utils.getProperty(actor, 'system.details.background'));
  const alignmentValue = formatValue(foundry.utils.getProperty(actor, 'system.details.alignment'));
  const xpValue = formatValue(foundry.utils.getProperty(actor, 'system.details.xp.value') || foundry.utils.getProperty(actor, 'system.details.xp'));
  const hpValue = formatValue(foundry.utils.getProperty(actor, 'system.attributes.hp.value'));
  const hpMax = formatValue(foundry.utils.getProperty(actor, 'system.attributes.hp.max'));
  const acValue = formatValue(foundry.utils.getProperty(actor, 'system.attributes.ac.value') || foundry.utils.getProperty(actor, 'system.attributes.ac'));
  const speedValue = formatValue(foundry.utils.getProperty(actor, 'system.attributes.speed.value') || foundry.utils.getProperty(actor, 'system.attributes.movement.speed'));
  const initValue = formatValue(foundry.utils.getProperty(actor, 'system.attributes.init.value') || foundry.utils.getProperty(actor, 'system.attributes.initiative.value'));
  const profValue = formatValue(foundry.utils.getProperty(actor, 'system.attributes.prof') || foundry.utils.getProperty(actor, 'system.attributes.proficiency.value'));
  const notes = formatValue(foundry.utils.getProperty(actor, 'system.details.notes') || foundry.utils.getProperty(actor, 'system.details.biography'));

  const content = `<!doctype html>
    <html lang="en">
      <head>
        <meta charset="utf-8">
        <title>${title}</title>
        <link rel="stylesheet" href="/modules/${MODULE_ID}/styles/module.css">
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

  const preview = popup.document.getElementById('portrait-preview');
  const uploadInput = popup.document.getElementById('image-upload');
  if (preview && uploadInput) {
    uploadInput.addEventListener('change', (event) => {
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

function formatValue(value) {
  if (value === undefined || value === null || value === '') return '—';
  if (typeof value === 'object') {
    if (value.name) return value.name;
    if (value.label) return value.label;
    if (value.value !== undefined) return formatValue(value.value);
    return '—';
  }
  return String(value);
}
