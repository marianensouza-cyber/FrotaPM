const express = require('express');
const router = express.Router();
const db = require('sqlite3').verbose();

const database = new db.Database(process.env.DB_FILE || './data/frotapm.db');

// GET dashboard KPIs
router.get('/kpis', (req, res) => {
  database.all(`
    SELECT 
      COUNT(*) as total_vehicles,
      SUM(CASE WHEN status = 'available' THEN 1 ELSE 0 END) as available_vehicles,
      SUM(CASE WHEN status = 'maintenance' THEN 1 ELSE 0 END) as in_maintenance,
      SUM(CASE WHEN status = 'inactive' THEN 1 ELSE 0 END) as inactive_vehicles
    FROM vehicles
  `, (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows[0]);
  });
});

// GET vehicles needing maintenance soon
router.get('/upcoming-maintenance', (req, res) => {
  database.all(`
    SELECT 
      v.id, v.plate, v.model, ms.maintenance_type, ms.next_due, ms.priority
    FROM vehicles v
    JOIN maintenance_schedules ms ON v.id = ms.vehicle_id
    WHERE ms.next_due <= datetime('now', '+30 days')
    ORDER BY ms.next_due ASC
  `, (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});

// GET maintenance cost summary
router.get('/cost-summary', (req, res) => {
  database.all(`
    SELECT 
      maintenance_type,
      COUNT(*) as count,
      SUM(cost) as total_cost,
      AVG(cost) as avg_cost
    FROM maintenance_records
    WHERE performed_at >= datetime('now', '-1 year')
    GROUP BY maintenance_type
    ORDER BY total_cost DESC
  `, (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});

module.exports = router;
