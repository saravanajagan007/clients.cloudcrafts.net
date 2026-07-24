/* AgencyOS — Module 6 & 19: Quotation Builder & Service Catalog Component */

export function renderQuotationBuilder(containerEl) {
  if (!containerEl) return;

  const catalog = [
    { name: 'Corporate Website Redesign', category: 'Web Design', price: '$8,500 - $15,000' },
    { name: 'Shopify Plus E-Commerce Store', category: 'E-Commerce', price: '$12,000 - $25,000' },
    { name: 'SaaS Design System & Glassmorphism UI', category: 'UI/UX Design', price: '$6,000 - $12,000' },
    { name: 'Monthly SEO & Content Marketing Retainer', category: 'Marketing', price: '$2,500 / mo' },
    { name: 'Managed Cloud Hosting & SSL Maintenance', category: 'Infrastructure', price: '$500 / mo' }
  ];

  containerEl.innerHTML = `
    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem;">
      <!-- Service Catalog & Rates -->
      <div class="glass-panel">
        <div class="panel-header">
          <h3>Agency Service Catalog & Pricing Matrix</h3>
          <button class="action-btn btn-sm primary" id="btn-add-service">+ Add Service</button>
        </div>

        <table class="data-table">
          <thead>
            <tr>
              <th>Service Name</th>
              <th>Category</th>
              <th>Standard Rate</th>
            </tr>
          </thead>
          <tbody>
            ${catalog.map(item => `
              <tr>
                <td><strong>${escapeHtml(item.name)}</strong></td>
                <td><span class="service-tag">${escapeHtml(item.category)}</span></td>
                <td style="font-weight: 700; color: var(--color-emerald);">${escapeHtml(item.price)}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>

      <!-- Quick Quotation Generator -->
      <div class="glass-panel">
        <div class="panel-header">
          <h3>Quick Quote Generator (GST / Tax Included)</h3>
        </div>

        <form id="quote-gen-form" onsubmit="event.preventDefault(); alert('Quotation PDF generated & converted to Invoice draft!');">
          <div class="form-group">
            <label>Client Name</label>
            <input type="text" class="form-control" value="Novus FinTech Systems" required />
          </div>
          <div class="form-group">
            <label>Selected Service</label>
            <select class="form-control">
              <option>Corporate Website Redesign ($12,500)</option>
              <option>Shopify Plus E-Commerce ($18,000)</option>
              <option>SaaS Glassmorphism UI System ($9,500)</option>
            </select>
          </div>
          <div class="form-group">
            <label>Tax Rate (GST / VAT %)</label>
            <input type="number" class="form-control" value="18" />
          </div>
          <div style="display: flex; gap: 0.75rem; margin-top: 1.5rem;">
            <button type="submit" class="action-btn primary">Generate Quote PDF</button>
            <button type="button" class="action-btn" onclick="alert('Quotation converted to Invoice #INV-DRAFT')">Convert Quote ➔ Invoice</button>
          </div>
        </form>
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
