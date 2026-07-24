/* AgencyOS — AI Assistant & Copilot Engine Component */

export function renderAiCopilotPanel(containerEl) {
  if (!containerEl) return;

  containerEl.innerHTML = `
    <div class="glass-panel" style="border: 1px solid rgba(139, 92, 246, 0.3); background: linear-gradient(135deg, rgba(19, 27, 46, 0.8), rgba(139, 92, 246, 0.1));">
      <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 1.25rem;">
        <div style="display: flex; align-items: center; gap: 0.75rem;">
          <div style="width: 36px; height: 36px; border-radius: var(--radius-sm); background: linear-gradient(135deg, var(--color-purple), var(--color-cyan)); display: flex; align-items: center; justify-content: center; font-size: 1.1rem; color: #fff;">🤖</div>
          <div>
            <h3 style="font-family: var(--font-heading); font-size: 1.15rem;">AgencyOS AI Assistant & Copilot</h3>
            <p style="font-size: 0.8rem; color: var(--text-muted);">Trained specifically for Website Agencies, Software Dev & Digital Marketing Companies.</p>
          </div>
        </div>
        <span class="badge badge-success"><span class="badge-dot"></span> AI Engine Online</span>
      </div>

      <div class="ai-quick-actions" style="display: flex; gap: 0.75rem; flex-wrap: wrap; margin-bottom: 1.25rem;">
        <button class="action-btn btn-sm btn-ai-action" data-action="summarize-lead">📄 Summarize Lead Inquiry</button>
        <button class="action-btn btn-sm btn-ai-action" data-action="predict-win">📊 Predict Deal Closing Probability</button>
        <button class="action-btn btn-sm btn-ai-action" data-action="generate-proposal">✍️ Generate Proposal Outline</button>
        <button class="action-btn btn-sm btn-ai-action" data-action="write-followup">💬 Draft WhatsApp Follow-up</button>
      </div>

      <div class="ai-output-box" id="ai-response-output" style="background: rgba(10, 15, 26, 0.75); border: 1px solid var(--border-glass); border-radius: var(--radius-md); padding: 1.25rem; font-size: 0.88rem; color: var(--text-main); line-height: 1.6; min-height: 120px;">
        <em>Select an AI action above or type a command to generate proposals, analyze lead requirement docs, or predict revenue closing velocity...</em>
      </div>
    </div>
  `;

  containerEl.querySelectorAll('.btn-ai-action').forEach(btn => {
    btn.addEventListener('click', () => {
      const action = btn.getAttribute('data-action');
      handleAiAction(action);
    });
  });
}

function handleAiAction(action) {
  const outputEl = document.getElementById('ai-response-output');
  if (!outputEl) return;

  outputEl.innerHTML = '<div style="color: var(--color-cyan);">🤖 AgencyOS AI is analyzing workspace data & client metrics...</div>';

  setTimeout(() => {
    switch (action) {
      case 'summarize-lead':
        outputEl.innerHTML = `
          <strong>AI Lead Summary — Novus FinTech Systems:</strong><br/>
          • <strong>Core Need:</strong> Next-generation web portal & responsive design system for high-volume transactions.<br/>
          • <strong>Budget Match:</strong> $24,500 allocated (High fit for Apex Web Design Studios).<br/>
          • <strong>Key Risks:</strong> Requires strict SOC2 compliance & 3D WebGL showcase deliverables.<br/>
          • <strong>Recommended Action:</strong> Send interactive proposal #PROP-801 with milestone payment breakdown.
        `;
        break;

      case 'predict-win':
        outputEl.innerHTML = `
          <strong>AI Win Probability Analysis:</strong><br/>
          • <strong>Novus FinTech Systems:</strong> <span style="color: var(--color-emerald); font-weight: 700;">89% Win Probability</span> (Proposal viewed 3x, engagement high).<br/>
          • <strong>Krypton Luxury E-Commerce:</strong> <span style="color: var(--color-amber); font-weight: 700;">58% Win Probability</span> (Needs follow-up on custom Liquid checkout scope).
        `;
        break;

      case 'generate-proposal':
        outputEl.innerHTML = `
          <strong>Generated Proposal Outline:</strong><br/>
          1. Executive Summary & Problem Definition<br/>
          2. UX Wireframing & Glassmorphism Design System<br/>
          3. Next.js 15 Frontend & API Integration Scope<br/>
          4. Fixed Milestone Schedule: 4 Weeks Sprint<br/>
          5. Total Proposed Investment: $24,500
        `;
        break;

      case 'write-followup':
        outputEl.innerHTML = `
          <strong>Drafted WhatsApp Follow-up Message:</strong><br/>
          <em>"Hi Elena, Marcus here from Apex Web Studios! Just following up on proposal #PROP-801 for the Novus FinTech Web Portal. Let me know if you have any questions on the wireframing milestone!"</em>
        `;
        break;

      default:
        outputEl.textContent = 'AI processing complete.';
    }
  }, 800);
}
