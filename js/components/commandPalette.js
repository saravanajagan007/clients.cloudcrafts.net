/* AgencyOS — Command Palette Engine (Cmd/Ctrl + K) */
import { appStore } from '../state.js';

export function initCommandPalette() {
  const palette = document.createElement('div');
  palette.className = 'command-palette-backdrop';
  palette.id = 'cmd-palette';
  palette.style.display = 'none';

  palette.innerHTML = `
    <div class="command-palette-box">
      <div class="cmd-input-wrapper">
        <span style="font-size: 1.1rem; color: var(--color-primary);">🔍</span>
        <input type="text" id="cmd-input" placeholder="Type a command or search leads, clients, invoices, proposals... (Esc to close)" />
      </div>
      <div class="cmd-results" id="cmd-results">
        <div class="cmd-section-title">Quick Actions</div>
        <div class="cmd-item" data-action="nav-dashboard">📊 Go to Overview Dashboard</div>
        <div class="cmd-item" data-action="nav-kanban">📌 Open Pipeline Kanban Board</div>
        <div class="cmd-item" data-action="nav-proposals">✍️ Open Proposal Builder</div>
        <div class="cmd-item" data-action="nav-automation">⚡ Open Visual Automation Builder</div>
        <div class="cmd-item" data-action="nav-clientportal">🌐 Switch to Client Portal View</div>
      </div>
    </div>
  `;

  document.body.appendChild(palette);

  // Keyboard shortcut Ctrl/Cmd + K
  document.addEventListener('keydown', (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      toggleCommandPalette();
    } else if (e.key === 'Escape' && palette.style.display === 'flex') {
      palette.style.display = 'none';
    }
  });

  palette.addEventListener('click', (e) => {
    if (e.target === palette) {
      palette.style.display = 'none';
    }
  });

  const input = palette.querySelector('#cmd-input');
  input.addEventListener('input', (e) => {
    filterSearchResults(e.target.value);
  });

  palette.querySelectorAll('.cmd-item').forEach(item => {
    item.addEventListener('click', () => {
      const action = item.getAttribute('data-action');
      executeCmdAction(action);
      palette.style.display = 'none';
    });
  });
}

export function toggleCommandPalette() {
  const palette = document.getElementById('cmd-palette');
  if (palette) {
    const isHidden = palette.style.display === 'none';
    palette.style.display = isHidden ? 'flex' : 'none';
    if (isHidden) {
      document.getElementById('cmd-input').focus();
    }
  }
}

function filterSearchResults(query) {
  const q = query.toLowerCase().trim();
  const resultsEl = document.getElementById('cmd-results');
  if (!resultsEl) return;

  if (!q) {
    resultsEl.innerHTML = `
      <div class="cmd-section-title">Quick Actions</div>
      <div class="cmd-item" data-action="nav-dashboard">📊 Go to Overview Dashboard</div>
      <div class="cmd-item" data-action="nav-kanban">📌 Open Pipeline Kanban Board</div>
      <div class="cmd-item" data-action="nav-proposals">✍️ Open Proposal Builder</div>
      <div class="cmd-item" data-action="nav-automation">⚡ Open Visual Automation Builder</div>
      <div class="cmd-item" data-action="nav-clientportal">🌐 Switch to Client Portal View</div>
    `;
    return;
  }

  const leads = appStore.getLeads().filter(l => l.company.toLowerCase().includes(q) || l.contactName.toLowerCase().includes(q));
  const clients = appStore.getClients().filter(c => c.name.toLowerCase().includes(q));

  let html = '<div class="cmd-section-title">Search Results</div>';

  leads.forEach(l => {
    html += `<div class="cmd-item" onclick="alert('Lead selected: ${l.company}'); document.getElementById('cmd-palette').style.display='none';">🏢 Lead: <strong>${l.company}</strong> ($${l.value.toLocaleString()})</div>`;
  });

  clients.forEach(c => {
    html += `<div class="cmd-item" onclick="alert('Client selected: ${c.name}'); document.getElementById('cmd-palette').style.display='none';">💼 Client: <strong>${c.name}</strong> (${c.industry})</div>`;
  });

  if (leads.length === 0 && clients.length === 0) {
    html += `<div style="padding: 1rem; color: var(--text-muted); font-size: 0.85rem;">No matching leads or clients found for "${q}"</div>`;
  }

  resultsEl.innerHTML = html;
}

function executeCmdAction(action) {
  switch (action) {
    case 'nav-dashboard':
      document.querySelector('[data-view="dashboard"]')?.click();
      break;
    case 'nav-kanban':
      document.querySelector('[data-view="kanban"]')?.click();
      break;
    case 'nav-proposals':
      document.querySelector('[data-view="proposals"]')?.click();
      break;
    case 'nav-automation':
      document.querySelector('[data-view="automation"]')?.click();
      break;
    case 'nav-clientportal':
      document.querySelector('[data-view="clientportal"]')?.click();
      break;
  }
}
