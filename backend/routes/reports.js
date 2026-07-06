const express = require('express');
const router = express.Router();
const db = require('sqlite3').verbose();

const database = new db.Database(process.env.DB_FILE || './data/frotapm.db');

// GET report - All maintenance records (CSV)
router.get('/maintenance-csv', (req, res) => {
  database.all(`
    SELECT 
      v.plate, v.model, 
      mr.maintenance_type, mr.description, mr.cost, mr.performed_by, mr.performed_at, mr.notes
    FROM maintenance_records mr
    JOIN vehicles v ON mr.vehicle_id = v.id
    ORDER BY mr.performed_at DESC
  `, (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    
    // Convert to CSV
    let csv = 'Placa,Modelo,Tipo de Manutenção,Descrição,Custo,Realizado por,Data,Notas\n';
    rows.forEach(row => {
      csv += `${row.plate},${row.model},${row.maintenance_type},"${row.description}",${row.cost},${row.performed_by},${row.performed_at},"${row.notes}"\n`;
    });
    
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename=maintenance-report.csv');
    res.send(csv);
  });
});

// GET report - Fleet status (JSON)
router.get('/fleet-status', (req, res) => {
  database.all(`
    SELECT 
      v.id, v.plate, v.model, v.year, v.mileage, v.status,
      COUNT(mr.id) as total_maintenances,
      SUM(mr.cost) as total_spent,
      MAX(mr.performed_at) as last_maintenance
    FROM vehicles v
    LEFT JOIN maintenance_records mr ON v.id = mr.vehicle_id
    GROUP BY v.id
    ORDER BY v.plate ASC
  `, (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});

// GET report - Upcoming maintenance (JSON)
router.get('/upcoming', (req, res) => {
  database.all(`
    SELECT 
      v.plate, v.model,
      ms.maintenance_type, ms.next_due, ms.priority,
      (julianday(ms.next_due) - julianday('now')) as days_until_due
    FROM maintenance_schedules ms
    JOIN vehicles v ON ms.vehicle_id = v.id
    WHERE ms.next_due IS NOT NULL
    ORDER BY ms.next_due ASC
  `, (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});

module.exports = router;
