/* AgencyOS — Module 17 & 25: Reports, Revenue Analytics & Custom Dashboards Component */
import { appStore } from '../state.js';

export function renderReportsAnalytics(containerEl) {
  if (!containerEl) return;

  const tenant = appStore.getActiveTenant();

  containerEl.innerHTML = `
    <div style="display: flex; flex-direction: column; gap: 1.5rem;">
      <div class="panel-header" style="margin-bottom: 0;">
        <div>
          <h3 style="font-family: var(--font-heading); font-size: 1.25rem;">Agency Performance Reports & Financial Metrics</h3>
          <p style="color: var(--text-muted); font-size: 0.85rem;">Analytical reports on lead sources, conversion rates, MRR growth, and team profitability.</p>
        </div>
        <button class="action-btn primary" onclick="alert('Exporting CSV Executive Financial Report...')">📊 Export Executive CSV Report</button>
      </div>

      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 1.25rem;">
        <div class="metric-card">
          <div class="metric-header">
            <span>Annual Recurring Revenue (ARR)</span>
            <div class="metric-icon">📈</div>
          </div>
          <div class="metric-value" style="color: var(--color-emerald);">$${(tenant.mrr * 12).toLocaleString()}</div>
          <div class="metric-trend trend-up">▲ 24% YoY Growth</div>
        </div>

        <div class="metric-card">
          <div class="metric-header">
            <span>Proposal Win Rate</span>
            <div class="metric-icon">🎯</div>
          </div>
          <div class="metric-value">68.4%</div>
          <div class="metric-trend trend-up">▲ 5.2% industry benchmark</div>
        </div>

        <div class="metric-card">
          <div class="metric-header">
            <span>Avg Client LTV</span>
            <div class="metric-icon">💼</div>
          </div>
          <div class="metric-value">$68,500</div>
          <div class="metric-trend trend-up">18 month avg retention</div>
        </div>
      </div>

      <div class="glass-panel" style="margin-bottom: 0;">
        <div class="panel-header">
          <h3>Lead Acquisition Source Performance</h3>
        </div>

        <table class="data-table">
          <thead>
            <tr>
              <th>Channel Source</th>
              <th>Total Leads Captured</th>
              <th>Qualified Deals</th>
              <th>Won Revenue ($)</th>
              <th>Conversion Rate</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Website Inbound Forms</strong></td>
              <td>42</td>
              <td>28</td>
              <td>$142,000</td>
              <td><span class="badge badge-success"><span class="badge-dot"></span> 66.6%</span></td>
            </tr>
            <tr>
              <td><strong>LinkedIn Organic Outreach</strong></td>
              <td>18</td>
              <td>12</td>
              <td>$78,500</td>
              <td><span class="badge badge-success"><span class="badge-dot"></span> 66.6%</span></td>
            </tr>
            <tr>
              <td><strong>Meta Ads / Lead Funnels</strong></td>
              <td>35</td>
              <td>15</td>
              <td>$45,000</td>
              <td><span class="badge badge-warning"><span class="badge-dot"></span> 42.8%</span></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `;
}
