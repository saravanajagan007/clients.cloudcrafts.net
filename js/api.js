/* AgencyOS — Backend API Client for Database Storage & Audit Logging */

const API_BASE_URL = 'http://localhost:3001/api';

export async function fetchHealth() {
  try {
    const res = await fetch(`${API_BASE_URL}/health`);
    return await res.json();
  } catch (err) {
    console.warn('Backend API server offline, falling back to local store', err);
    return null;
  }
}

export async function loginApi(email, password) {
  try {
    const res = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    return await res.json();
  } catch (err) {
    console.warn('API login offline', err);
    return null;
  }
}

export async function fetchLeadsApi() {
  try {
    const res = await fetch(`${API_BASE_URL}/leads`);
    const data = await res.json();
    return data.leads || [];
  } catch (err) {
    console.warn('API fetchLeads error', err);
    return null;
  }
}

export async function createLeadApi(leadData) {
  try {
    const res = await fetch(`${API_BASE_URL}/leads`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(leadData)
    });
    return await res.json();
  } catch (err) {
    console.warn('API createLead error', err);
    return null;
  }
}

export async function updateLeadStageApi(leadId, stage) {
  try {
    const res = await fetch(`${API_BASE_URL}/leads/${leadId}/stage`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ stage })
    });
    return await res.json();
  } catch (err) {
    console.warn('API updateLeadStage error', err);
    return null;
  }
}

export async function fetchApiActivityLogs() {
  try {
    const res = await fetch(`${API_BASE_URL}/activity`);
    const data = await res.json();
    return data.activityLogs || [];
  } catch (err) {
    console.warn('API fetchActivityLogs error', err);
    return null;
  }
}
