const express = require('express');
const router = express.Router();
const db = require('sqlite3').verbose();

const database = new db.Database(process.env.DB_FILE || './data/frotapm.db');

// GET maintenance schedules for a vehicle
router.get('/schedules/:vehicleId', (req, res) => {
  const { vehicleId } = req.params;
  const sql = 'SELECT * FROM maintenance_schedules WHERE vehicle_id = ? ORDER BY next_due ASC';
  
  database.all(sql, [vehicleId], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});

// GET all maintenance records for a vehicle
router.get('/records/:vehicleId', (req, res) => {
  const { vehicleId } = req.params;
  const sql = 'SELECT * FROM maintenance_records WHERE vehicle_id = ? ORDER BY performed_at DESC';
  
  database.all(sql, [vehicleId], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});

// CREATE maintenance schedule
router.post('/schedules', (req, res) => {
  const { vehicle_id, maintenance_type, interval_km, interval_days, priority } = req.body;
  
  const sql = `
    INSERT INTO maintenance_schedules (vehicle_id, maintenance_type, interval_km, interval_days, priority, next_due)
    VALUES (?, ?, ?, ?, ?, datetime('now', '+' || ? || ' days'))
  `;
  
  database.run(sql, [vehicle_id, maintenance_type, interval_km, interval_days, priority || 'normal', interval_days || 30], function(err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ id: this.lastID, message: 'Schedule created' });
  });
});

// CREATE maintenance record
router.post('/records', (req, res) => {
  const { vehicle_id, maintenance_type, description, cost, performed_by, notes } = req.body;
  
  const sql = `
    INSERT INTO maintenance_records (vehicle_id, maintenance_type, description, cost, performed_by, notes)
    VALUES (?, ?, ?, ?, ?, ?)
  `;
  
  database.run(sql, [vehicle_id, maintenance_type, description, cost, performed_by, notes], function(err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ id: this.lastID, message: 'Record created' });
  });
});

// UPDATE maintenance record
router.put('/records/:id', (req, res) => {
  const { id } = req.params;
  const { maintenance_type, description, cost, performed_by, notes } = req.body;
  
  const sql = `
    UPDATE maintenance_records
    SET maintenance_type = ?, description = ?, cost = ?, performed_by = ?, notes = ?
    WHERE id = ?
  `;
  
  database.run(sql, [maintenance_type, description, cost, performed_by, notes, id], function(err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ success: true, message: 'Record updated' });
  });
});

// DELETE maintenance record
router.delete('/records/:id', (req, res) => {
  const { id } = req.params;
  
  database.run('DELETE FROM maintenance_records WHERE id = ?', [id], function(err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ success: true, message: 'Record deleted' });
  });
});

module.exports = router;
