# FrotaPM API Documentation

## Base URL
```
http://localhost:5000/api
```

## Endpoints

### Vehicles

#### GET /vehicles
Retrieve all vehicles
```bash
curl http://localhost:5000/api/vehicles
```

#### GET /vehicles/:id
Retrieve a specific vehicle
```bash
curl http://localhost:5000/api/vehicles/1
```

#### POST /vehicles
Create a new vehicle
```bash
curl -X POST http://localhost:5000/api/vehicles \
  -H "Content-Type: application/json" \
  -d '{
    "plate": "ABC-1234",
    "model": "Fiat Toro",
    "year": 2022,
    "mileage": 0
  }'
```

#### PUT /vehicles/:id
Update a vehicle
```bash
curl -X PUT http://localhost:5000/api/vehicles/1 \
  -H "Content-Type: application/json" \
  -d '{
    "plate": "ABC-1234",
    "model": "Fiat Toro",
    "year": 2022,
    "mileage": 1500,
    "status": "available"
  }'
```

#### DELETE /vehicles/:id
Delete a vehicle
```bash
curl -X DELETE http://localhost:5000/api/vehicles/1
```

### Maintenance

#### GET /maintenance/schedules/:vehicleId
Retrieve maintenance schedules for a vehicle

#### GET /maintenance/records/:vehicleId
Retrieve maintenance records for a vehicle

#### POST /maintenance/records
Create a maintenance record
```bash
curl -X POST http://localhost:5000/api/maintenance/records \
  -H "Content-Type: application/json" \
  -d '{
    "vehicle_id": 1,
    "maintenance_type": "Troca de óleo",
    "description": "Troca de óleo e filtro",
    "cost": 150.00,
    "performed_by": "João da Silva",
    "notes": "Óleo sintético de qualidade premium"
  }'
```

### Dashboard

#### GET /dashboard/kpis
Retrieve dashboard KPIs (total vehicles, available, in maintenance, etc)

#### GET /dashboard/upcoming-maintenance
Retrieve upcoming maintenance schedules

#### GET /dashboard/cost-summary
Retrieve maintenance cost summary by type

### Reports

#### GET /reports/maintenance-csv
Download maintenance records as CSV

#### GET /reports/fleet-status
Get complete fleet status report

#### GET /reports/upcoming
Get upcoming maintenance report
