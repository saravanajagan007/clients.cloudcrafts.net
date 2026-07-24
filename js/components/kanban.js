/* AgencyOS — Sales Pipeline Kanban Component */
import { appStore } from '../state.js';

export function renderKanbanBoard(containerEl) {
  if (!containerEl) return;

  const leads = appStore.getLeads();
  const tenant = appStore.getActiveTenant();
  const stages = [
    { id: 'new-inquiry', title: 'New Inquiry', probability: '25%', color: '#06b6d4' },
    { id: 'discovery-call', title: 'Discovery Call', probability: '50%', color: '#6366f1' },
    { id: 'proposal-sent', title: 'Proposal Sent', probability: '75%', color: '#8b5cf6' },
    { id: 'contract-signed', title: 'Contract Signed', probability: '90%', color: '#f59e0b' },
    { id: 'in-onboarding', title: 'In Onboarding', probability: '100%', color: '#10b981' }
  ];

  let totalPipelineValue = 0;
  leads.forEach(l => totalPipelineValue += (l.value || 0));

  containerEl.innerHTML = `
    <div class="kanban-header-bar">
      <div>
        <h3 style="font-family: var(--font-heading); font-size: 1.25rem;">Sales Pipeline Kanban</h3>
        <p style="color: var(--text-muted); font-size: 0.85rem;">Total Weighted Pipeline: <strong style="color: var(--color-emerald);">${tenant.currencySymbol}${totalPipelineValue.toLocaleString()}</strong> (${leads.length} active leads)</p>
      </div>
      <button class="action-btn primary" onclick="document.getElementById('add-lead-modal').classList.add('active')">+ Add Lead</button>
    </div>

    <div class="kanban-board">
      ${stages.map(stage => {
        const stageLeads = leads.filter(l => l.stage === stage.id);
        const stageVal = stageLeads.reduce((acc, curr) => acc + (curr.value || 0), 0);

        return `
          <div class="kanban-column" data-stage-id="${stage.id}">
            <div class="column-header" style="border-top: 3px solid ${stage.color};">
              <div class="column-title-group">
                <span class="column-name">${stage.title}</span>
                <span class="column-count">${stageLeads.length}</span>
              </div>
              <div class="column-value">${tenant.currencySymbol}${stageVal.toLocaleString()} · ${stage.probability} win prob</div>
            </div>

            <div class="kanban-cards-container" data-stage="${stage.id}">
              ${stageLeads.length === 0 ? `
                <div style="padding: 1.5rem 0.5rem; text-align: center; color: var(--text-dim); font-size: 0.8rem; border: 1px dashed var(--border-glass); border-radius: var(--radius-sm);">
                  No leads in stage
                </div>
              ` : stageLeads.map(lead => `
                <div class="kanban-card" draggable="true" data-lead-id="${lead.id}">
                  <div class="card-tags">
                    <span class="service-tag">${lead.serviceType || 'Agency Service'}</span>
                    <span class="score-tag">Score ${lead.score}</span>
                  </div>
                  <h4 class="card-company">${escapeHtml(lead.company)}</h4>
                  <p class="card-contact">👤 ${escapeHtml(lead.contactName)} (${escapeHtml(lead.email)})</p>
                  
                  <div class="card-footer">
                    <span class="card-value">${lead.currencySymbol || tenant.currencySymbol}${(lead.value || 0).toLocaleString()}</span>
                    <span class="card-owner">${lead.assignedTo ? lead.assignedTo.split(' ')[0] : 'Unassigned'}</span>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        `;
      }).join('')}
    </div>
  `;

  setupDragAndDrop(containerEl);
}

function setupDragAndDrop(containerEl) {
  const cards = containerEl.querySelectorAll('.kanban-card');
  const columns = containerEl.querySelectorAll('.kanban-cards-container');

  cards.forEach(card => {
    card.addEventListener('dragstart', (e) => {
      card.classList.add('is-dragging');
      e.dataTransfer.setData('text/plain', card.getAttribute('data-lead-id'));
    });

    card.addEventListener('dragend', () => {
      card.classList.remove('is-dragging');
    });
  });

  columns.forEach(col => {
    col.addEventListener('dragover', (e) => {
      e.preventDefault();
      col.classList.add('drag-over');
    });

    col.addEventListener('dragleave', () => {
      col.classList.remove('drag-over');
    });

    col.addEventListener('drop', (e) => {
      e.preventDefault();
      col.classList.remove('drag-over');
      const leadId = e.dataTransfer.getData('text/plain');
      const targetStage = col.getAttribute('data-stage');

      if (leadId && targetStage) {
        appStore.updateLeadStage(leadId, targetStage);
        renderKanbanBoard(containerEl);
      }
    });
  });
}

function escapeHtml(str) {
  if (!str) return '';
  return str.replace(/[&<>'"]/g, 
    tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
  );
}
