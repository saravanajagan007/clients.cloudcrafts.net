/* AgencyOS — Production Backend API Server & Database Audit Logger */

import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 3001;
const DB_NAME = process.env.DB_NAME || 'clients.cloudcrafts.net';
const DB_FILE = path.join(__dirname, 'backend', 'database.json');

// Ensure database file exists
function initDatabase() {
  const dir = path.join(__dirname, 'backend');
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  if (!fs.existsSync(DB_FILE)) {
    const initialDb = {
      db_name: DB_NAME,
      api_activity_logs: [],
      leads: [],
      clients: [],
      proposals: [],
      quotations: [],
      invoices: [],
      projects: [],
      tenants: [
        {
          id: 'tenant-default',
          name: 'AgencyOS Workspace',
          currency: 'INR',
          currencySymbol: '₹'
        }
      ]
    };
    fs.writeFileSync(DB_FILE, JSON.stringify(initialDb, null, 2), 'utf-8');
  }
}

function readDb() {
  try {
    initDatabase();
    const raw = fs.readFileSync(DB_FILE, 'utf-8');
    const parsed = JSON.parse(raw);
    parsed.db_name = DB_NAME;
    return parsed;
  } catch (err) {
    console.error('Error reading database:', err);
    return { db_name: DB_NAME, api_activity_logs: [], leads: [], clients: [], proposals: [], invoices: [], projects: [] };
  }
}

function writeDb(data) {
  try {
    data.db_name = DB_NAME;
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error writing to database:', err);
  }
}

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

/* API Activity Database Middleware */
app.use((req, res, next) => {
  const startTime = Date.now();

  res.on('finish', () => {
    // Only log /api/ requests
    if (req.path.startsWith('/api/')) {
      const durationMs = Date.now() - startTime;
      const db = readDb();

      const logEntry = {
        id: `log-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
        database: DB_NAME,
        method: req.method,
        path: req.path,
        status: res.statusCode,
        clientIp: req.ip || req.socket.remoteAddress || '127.0.0.1',
        payload: req.body && Object.keys(req.body).length > 0 ? req.body : null,
        durationMs: `${durationMs}ms`,
        timestamp: new Date().toISOString(),
        formattedTime: new Date().toLocaleTimeString()
      };

      if (!db.api_activity_logs) db.api_activity_logs = [];
      db.api_activity_logs.unshift(logEntry);

      // Keep last 500 API logs
      if (db.api_activity_logs.length > 500) {
        db.api_activity_logs = db.api_activity_logs.slice(0, 500);
      }

      writeDb(db);
    }
  });

  next();
});

/* API Endpoints */
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    app: 'AgencyOS',
    database: DB_NAME,
    connectionString: `postgresql://localhost:5432/${DB_NAME}`,
    version: '2.0.0'
  });
});

app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  if (email === 'saravanajagan@gmail.com' && password === 'Goldwinner007#') {
    res.json({
      success: true,
      token: 'jwt-agencyos-saravanajagan-token',
      user: { name: 'Saravana Jagan', email: 'saravanajagan@gmail.com', role: 'Agency Owner' }
    });
  } else {
    res.status(401).json({ success: false, message: 'Invalid email or password' });
  }
});

/* Leads API */
app.get('/api/leads', (req, res) => {
  const db = readDb();
  res.json({ success: true, database: DB_NAME, leads: db.leads || [] });
});

app.post('/api/leads', (req, res) => {
  const db = readDb();
  const leadData = req.body;

  const newLead = {
    id: `lead-${Date.now()}`,
    tenantId: leadData.tenantId || 'tenant-default',
    company: leadData.company,
    contactName: leadData.contactName,
    email: leadData.email,
    serviceType: leadData.serviceType,
    value: leadData.value || 0,
    currencySymbol: leadData.currencySymbol || '₹',
    score: 85,
    stage: leadData.stage || 'new-inquiry',
    createdAt: new Date().toISOString()
  };

  if (!db.leads) db.leads = [];
  db.leads.unshift(newLead);
  writeDb(db);

  res.status(201).json({ success: true, database: DB_NAME, lead: newLead });
});

app.put('/api/leads/:id/stage', (req, res) => {
  const db = readDb();
  const { id } = req.params;
  const { stage } = req.body;

  const lead = (db.leads || []).find(l => l.id === id);
  if (lead) {
    lead.stage = stage;
    lead.updatedAt = new Date().toISOString();
    writeDb(db);
    res.json({ success: true, database: DB_NAME, lead });
  } else {
    res.status(404).json({ success: false, message: 'Lead not found' });
  }
});

/* Proposals API */
app.get('/api/proposals', (req, res) => {
  const db = readDb();
  res.json({ success: true, database: DB_NAME, proposals: db.proposals || [] });
});

app.post('/api/proposals', (req, res) => {
  const db = readDb();
  const prop = req.body;

  const newProp = {
    id: `prop-${Math.floor(100 + Math.random() * 899)}`,
    tenantId: prop.tenantId || 'tenant-default',
    clientName: prop.clientName,
    title: prop.title,
    amount: prop.amount,
    currencySymbol: prop.currencySymbol || '₹',
    status: 'Sent',
    createdDate: new Date().toISOString().split('T')[0]
  };

  if (!db.proposals) db.proposals = [];
  db.proposals.unshift(newProp);
  writeDb(db);

  res.status(201).json({ success: true, database: DB_NAME, proposal: newProp });
});

/* Database API Activity Stream */
app.get('/api/activity', (req, res) => {
  const db = readDb();
  res.json({ success: true, database: DB_NAME, activityLogs: db.api_activity_logs || [] });
});

app.listen(PORT, () => {
  console.log(`⚡ AgencyOS API Server connected to Database "${DB_NAME}" running at http://localhost:${PORT}`);
});
