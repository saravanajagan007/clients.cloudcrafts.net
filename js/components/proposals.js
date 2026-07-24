/* AgencyOS — Interactive Proposal Builder Component */
import { appStore } from '../state.js';

export function renderProposalBuilder(containerEl) {
  if (!containerEl) return;

  const proposals = appStore.getProposals();

  containerEl.innerHTML = `
    <div class="panel-header" style="margin-bottom: 1.5rem;">
      <div>
        <h3 style="font-family: var(--font-heading); font-size: 1.25rem;">Interactive Proposal Builder & E-Sign Vault</h3>
        <p style="color: var(--text-muted); font-size: 0.85rem;">Create, track views, and accept digital signatures on client proposals.</p>
      </div>
      <button class="action-btn primary" onclick="createSampleProposal()">+ Create Proposal</button>
    </div>

    ${proposals.length === 0 ? `
      <div class="glass-panel" style="text-align: center; padding: 3rem 1.5rem; color: var(--text-muted);">
        <div style="font-size: 2.5rem; margin-bottom: 0.5rem;">✍️</div>
        <h4 style="font-family: var(--font-heading); font-size: 1.1rem; color: var(--text-main); margin-bottom: 0.35rem;">No Proposals Created Yet</h4>
        <p style="font-size: 0.85rem; max-width: 400px; margin: 0 auto 1.25rem;">Generate enterprise proposals with scope items, interactive pricing, and digital signature capabilities.</p>
        <button class="action-btn primary" onclick="createSampleProposal()">+ Create Proposal Now</button>
      </div>
    ` : `
      <div class="proposals-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 1.5rem;">
        ${proposals.map(prop => `
          <div class="glass-panel" style="margin-bottom: 0; position: relative;">
            <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 1rem;">
              <span class="badge ${prop.status === 'Accepted' ? 'badge-success' : 'badge-warning'}">
                <span class="badge-dot"></span> ${prop.status}
              </span>
              <span style="font-size: 0.78rem; color: var(--text-dim);">Valid until ${prop.validUntil}</span>
            </div>

            <h4 style="font-family: var(--font-heading); font-size: 1.1rem; margin-bottom: 0.5rem;">${escapeHtml(prop.title)}</h4>
            <p style="color: var(--text-muted); font-size: 0.85rem; margin-bottom: 1.25rem;">Client: <strong>${escapeHtml(prop.clientName)}</strong></p>

            <div style="background: rgba(10, 15, 26, 0.6); padding: 0.85rem; border-radius: var(--radius-sm); border: 1px solid var(--border-glass); margin-bottom: 1.25rem;">
              <div style="display: flex; justify-content: space-between; font-size: 0.82rem; color: var(--text-muted); margin-bottom: 0.35rem;">
                <span>Total Value:</span>
                <strong style="color: var(--color-emerald); font-size: 1rem;">$${prop.amount.toLocaleString()}</strong>
              </div>
              <div style="font-size: 0.75rem; color: var(--text-dim);">Public Share Token: <code>${prop.id}</code></div>
            </div>

            <div style="display: flex; gap: 0.5rem;">
              <button class="action-btn btn-sm btn-preview-proposal" data-prop-id="${prop.id}">👁️ Preview</button>
              <button class="action-btn btn-sm primary btn-esign-proposal" data-prop-id="${prop.id}">✍️ E-Sign</button>
            </div>
          </div>
        `).join('')}
      </div>
    `}
  `;

  // Global helper for creating proposal on demand
  window.createSampleProposal = () => {
    const clientName = prompt('Enter Client Company Name:') || 'New Client Enterprise';
    const title = prompt('Enter Proposal Title:') || 'Website & System Redesign Scope';
    const amount = parseFloat(prompt('Enter Proposal Amount ($):') || '15000');

    appStore.addProposal({
      clientName,
      title,
      amount,
      validUntil: '2026-08-30',
      items: [
        { desc: 'Core UI/UX & Glassmorphism Design System', cost: amount * 0.4 },
        { desc: 'Frontend & API Integration Milestone', cost: amount * 0.6 }
      ]
    });

    renderProposalBuilder(containerEl);
  };

  containerEl.querySelectorAll('.btn-preview-proposal').forEach(btn => {
    btn.addEventListener('click', () => {
      const propId = btn.getAttribute('data-prop-id');
      showProposalModal(propId);
    });
  });

  containerEl.querySelectorAll('.btn-esign-proposal').forEach(btn => {
    btn.addEventListener('click', () => {
      const propId = btn.getAttribute('data-prop-id');
      simulateESign(propId);
    });
  });
}

function showProposalModal(propId) {
  const proposals = appStore.getProposals();
  const prop = proposals.find(p => p.id === propId);
  if (!prop) return;

  const modal = document.createElement('div');
  modal.className = 'modal-backdrop active';
  modal.innerHTML = `
    <div class="modal-box" style="max-width: 680px; max-height: 85vh; overflow-y: auto;">
      <div class="modal-header">
        <h3>${escapeHtml(prop.title)}</h3>
        <button class="close-btn" onclick="this.closest('.modal-backdrop').remove()">&times;</button>
      </div>

      <div style="margin-bottom: 1.5rem;">
        <div style="display: flex; justify-content: space-between; background: rgba(99, 102, 241, 0.1); padding: 1rem; border-radius: var(--radius-sm); margin-bottom: 1rem;">
          <div>
            <div style="font-size: 0.78rem; color: var(--text-muted);">Client Organization</div>
            <div style="font-weight: 700; font-size: 1.1rem;">${escapeHtml(prop.clientName)}</div>
          </div>
          <div style="text-align: right;">
            <div style="font-size: 0.78rem; color: var(--text-muted);">Total Investment</div>
            <div style="font-weight: 700; font-size: 1.25rem; color: var(--color-emerald);">$${prop.amount.toLocaleString()}</div>
          </div>
        </div>

        <h4 style="font-size: 0.95rem; margin-bottom: 0.75rem;">Itemized Scope of Work:</h4>
        <table class="data-table" style="margin-bottom: 1.5rem;">
          <thead>
            <tr>
              <th>Deliverable Description</th>
              <th style="text-align: right;">Cost ($)</th>
            </tr>
          </thead>
          <tbody>
            ${(prop.items || []).map(item => `
              <tr>
                <td>${escapeHtml(item.desc)}</td>
                <td style="text-align: right; font-weight: 600;">$${item.cost.toLocaleString()}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>

        <div style="border-top: 1px dashed var(--border-glass-bright); padding-top: 1rem; margin-top: 1rem;">
          <h4 style="font-size: 0.9rem; margin-bottom: 0.5rem;">Digital Signature Status:</h4>
          <p style="font-size: 0.85rem; color: var(--text-muted);">
            ${prop.status === 'Accepted' ? `✅ Digitally signed on ${prop.createdDate}` : '⏳ Awaiting client signature online'}
          </p>
        </div>
      </div>

      <div style="display: flex; justify-content: flex-end; gap: 0.75rem;">
        <button class="action-btn" onclick="this.closest('.modal-backdrop').remove()">Close</button>
        <button class="action-btn primary" onclick="alert('Exporting PDF document...'); this.closest('.modal-backdrop').remove();">📥 Download PDF</button>
      </div>
    </div>
  `;
  document.body.appendChild(modal);
}

function simulateESign(propId) {
  const proposals = appStore.getProposals();
  const prop = proposals.find(p => p.id === propId);
  if (prop) {
    prop.status = 'Accepted';
    appStore.addActivityLog(`Proposal "${prop.title}" was digitally signed by ${prop.clientName}`, 'proposal');
    appStore.notify();
    alert(`E-Sign Successful! Proposal "${prop.title}" marked as Accepted.`);
  }
}

function escapeHtml(str) {
  if (!str) return '';
  return str.replace(/[&<>'"]/g, 
    tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
  );
}
