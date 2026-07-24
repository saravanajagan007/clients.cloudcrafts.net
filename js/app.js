/* clients.cloudcrafts.net — Main Application Logic */

document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initServerControls();
  initApiKeyMasking();
  initSupportModal();
  initMetricSimulation();
});

/* Navigation / View Switching */
function initNavigation() {
  const navItems = document.querySelectorAll('.nav-item[data-view]');
  const viewSections = document.querySelectorAll('.view-section');

  navItems.forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      const targetView = item.getAttribute('data-view');

      navItems.forEach(n => n.classList.remove('active'));
      item.classList.add('active');

      viewSections.forEach(section => {
        if (section.id === `view-${targetView}`) {
          section.classList.add('active');
        } else {
          section.classList.remove('active');
        }
      });
    });
  });
}

/* Server Power State Toggling */
function initServerControls() {
  const powerButtons = document.querySelectorAll('.btn-power-toggle');

  powerButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const row = btn.closest('tr');
      const badge = row.querySelector('.badge');
      const isRunning = badge.classList.contains('badge-success');

      if (isRunning) {
        badge.className = 'badge badge-danger';
        badge.innerHTML = '<span class="badge-dot"></span> Stopped';
        btn.textContent = 'Start';
        btn.className = 'action-btn btn-sm primary';
      } else {
        badge.className = 'badge badge-success';
        badge.innerHTML = '<span class="badge-dot"></span> Running';
        btn.textContent = 'Restart';
        btn.className = 'action-btn btn-sm';
      }
    });
  });
}

/* API Key Reveal & Copy */
function initApiKeyMasking() {
  const toggleBtns = document.querySelectorAll('.btn-key-toggle');
  const copyBtns = document.querySelectorAll('.btn-key-copy');

  toggleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const container = btn.closest('.key-item');
      const keyText = container.querySelector('.key-value');
      const isMasked = keyText.getAttribute('data-masked') === 'true';

      if (isMasked) {
        keyText.textContent = keyText.getAttribute('data-secret');
        keyText.setAttribute('data-masked', 'false');
        btn.textContent = 'Hide';
      } else {
        keyText.textContent = '••••••••••••••••••••••••••••••••';
        keyText.setAttribute('data-masked', 'true');
        btn.textContent = 'Show';
      }
    });
  });

  copyBtns.forEach(btn => {
    btn.addEventListener('click', async () => {
      const container = btn.closest('.key-item');
      const secret = container.querySelector('.key-value').getAttribute('data-secret');

      try {
        await navigator.clipboard.writeText(secret);
        const origText = btn.textContent;
        btn.textContent = 'Copied!';
        setTimeout(() => {
          btn.textContent = origText;
        }, 1500);
      } catch {
        alert('Failed to copy API Key.');
      }
    });
  });
}

/* Support Ticket Modal */
function initSupportModal() {
  const modalBackdrop = document.getElementById('ticket-modal');
  const openModalBtn = document.getElementById('btn-new-ticket');
  const closeModalBtn = document.getElementById('btn-close-modal');
  const ticketForm = document.getElementById('ticket-form');
  const ticketsTable = document.getElementById('tickets-body');

  if (openModalBtn) {
    openModalBtn.addEventListener('click', () => {
      modalBackdrop.classList.add('active');
    });
  }

  if (closeModalBtn) {
    closeModalBtn.addEventListener('click', () => {
      modalBackdrop.classList.remove('active');
    });
  }

  if (modalBackdrop) {
    modalBackdrop.addEventListener('click', (e) => {
      if (e.target === modalBackdrop) {
        modalBackdrop.classList.remove('active');
      }
    });
  }

  if (ticketForm) {
    ticketForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const subject = document.getElementById('ticket-subject').value;
      const category = document.getElementById('ticket-category').value;

      if (!subject) return;

      const ticketId = `TK-${Math.floor(1000 + Math.random() * 9000)}`;
      const dateStr = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

      const newRow = document.createElement('tr');
      newRow.innerHTML = `
        <td><strong>#${ticketId}</strong></td>
        <td>${escapeHtml(subject)}</td>
        <td><span class="badge badge-warning"><span class="badge-dot"></span> Open</span></td>
        <td>${category}</td>
        <td>${dateStr}</td>
        <td><button class="action-btn btn-sm">View</button></td>
      `;

      ticketsTable.insertBefore(newRow, ticketsTable.firstChild);

      ticketForm.reset();
      modalBackdrop.classList.remove('active');
    });
  }
}

/* Dynamic Live Metric Fluctuation Simulation */
function initMetricSimulation() {
  const cpuVal = document.getElementById('metric-cpu');
  const ramVal = document.getElementById('metric-ram');

  setInterval(() => {
    if (cpuVal) {
      const currentCpu = parseInt(cpuVal.textContent);
      const newCpu = Math.max(12, Math.min(88, currentCpu + (Math.floor(Math.random() * 7) - 3)));
      cpuVal.textContent = `${newCpu}%`;
    }

    if (ramVal) {
      const currentRam = parseFloat(ramVal.textContent);
      const newRam = (Math.max(8.0, Math.min(28.0, currentRam + (Math.random() * 0.4 - 0.2)))).toFixed(1);
      ramVal.textContent = `${newRam} GB`;
    }
  }, 4000);
}

function escapeHtml(str) {
  return str.replace(/[&<>'"]/g, 
    tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
  );
}
