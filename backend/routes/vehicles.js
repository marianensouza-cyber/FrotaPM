const express = require('express');
const router = express.Router();
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const database = new sqlite3.Database(process.env.DB_FILE || './data/frotapm.db');

router.get('/', (req, res) => {
  database.all('SELECT * FROM vehicles ORDER BY plate ASC', (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows || []);
  });
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  database.get('SELECT * FROM vehicles WHERE id = ?', [id], (err, row) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (!row) {
      return res.status(404).json({ error: 'Vehicle not found' });
    }
    res.json(row);
  });
});

router.post('/', (req, res) => {
  const { plate, model, year, mileage } = req.body;
  
  if (!plate || !model) {
    return res.status(400).json({ error: 'Plate and model are required' });
  }
  
  const sql = `
    INSERT INTO vehicles (plate, model, year, mileage, status)
    VALUES (?, ?, ?, ?, 'available')
  `;
  
  database.run(sql, [plate, model, year || null, mileage || 0], function(err) {
    if (err) {
      if (err.message.includes('UNIQUE constraint failed')) {
        return res.status(400).json({ error: 'Plate already exists' });
      }
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ id: this.lastID, plate, model, year, mileage });
  });
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { plate, model, year, mileage, status, latitude, longitude } = req.body;
  
  const sql = `
    UPDATE vehicles 
    SET plate = ?, model = ?, year = ?, mileage = ?, status = ?, latitude = ?, longitude = ?, updated_at = CURRENT_TIMESTAMP
    WHERE id = ?
  `;
  
  database.run(sql, [plate, model, year, mileage, status, latitude, longitude, id], function(err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (this.changes === 0) {
      return res.status(404).json({ error: 'Vehicle not found' });
    }
    res.json({ success: true, message: 'Vehicle updated' });
  });
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  
  database.run('DELETE FROM vehicles WHERE id = ?', [id], function(err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (this.changes === 0) {
      return res.status(404).json({ error: 'Vehicle not found' });
    }
    res.json({ success: true, message: 'Vehicle deleted' });
  });
});

module.exports = router;
