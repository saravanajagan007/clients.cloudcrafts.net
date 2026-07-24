/* AgencyOS — Module 22 & 23: Integrations & Channels Hub Component */

export function renderIntegrationsHub(containerEl) {
  if (!containerEl) return;

  const integrations = [
    { name: 'Stripe Payment Gateway', cat: 'Finance & Invoicing', status: 'Connected', icon: '💳' },
    { name: 'WhatsApp Business API', cat: 'Messaging & Follow-ups', status: 'Connected', icon: '💬' },
    { name: 'Resend / Amazon SES', cat: 'Email Automation', status: 'Connected', icon: '✉️' },
    { name: 'Cloudflare DNS & SSL', cat: 'Infrastructure Vault', status: 'Connected', icon: '☁️' },
    { name: 'Slack Notifications', cat: 'Team Communication', status: 'Connected', icon: '🔔' },
    { name: 'Google Workspace & Meet', cat: 'Calendar & Video Meetings', status: 'Connected', icon: '📅' },
    { name: 'Figma API', cat: 'Design Proofing', status: 'Connected', icon: '🎨' },
    { name: 'GitHub Webhooks', cat: 'Code Deployments', status: 'Connected', icon: '🚀' }
  ];

  containerEl.innerHTML = `
    <div style="display: flex; flex-direction: column; gap: 1.5rem;">
      <div class="panel-header" style="margin-bottom: 0;">
        <div>
          <h3 style="font-family: var(--font-heading); font-size: 1.25rem;">Integrations & Omnichannel Ecosystem</h3>
          <p style="color: var(--text-muted); font-size: 0.85rem;">Connect Stripe, WhatsApp Business, Resend, Cloudflare, Slack, and Google Workspace.</p>
        </div>
        <button class="action-btn primary" onclick="alert('Opening Integration API Key Generator...')">+ Connect New Service</button>
      </div>

      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.25rem;">
        ${integrations.map(ig => `
          <div class="glass-panel" style="margin-bottom: 0; display: flex; align-items: center; justify-content: space-between;">
            <div style="display: flex; align-items: center; gap: 0.85rem;">
              <div style="width: 40px; height: 40px; border-radius: var(--radius-sm); background: rgba(99, 102, 241, 0.15); display: flex; align-items: center; justify-content: center; font-size: 1.2rem;">
                ${ig.icon}
              </div>
              <div>
                <h4 style="font-family: var(--font-heading); font-size: 0.95rem;">${escapeHtml(ig.name)}</h4>
                <p style="font-size: 0.78rem; color: var(--text-muted);">${escapeHtml(ig.cat)}</p>
              </div>
            </div>
            <span class="badge badge-success"><span class="badge-dot"></span> Active</span>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

function escapeHtml(str) {
  if (!str) return '';
  return str.replace(/[&<>'"]/g, 
    tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
  );
}
