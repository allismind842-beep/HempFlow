import express from 'express';
import {
  checkAllUnitsHealth,
  getPlatformMetrics,
  getStatusReport,
} from '../services/platform.service';
import { getEnabledUnits } from '../config/platform.config';

const router = express.Router();

// Platform status
router.get('/status', async (req, res) => {
  try {
    const report = await getStatusReport();
    res.json(report);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

// Platform metrics
router.get('/metrics', async (req, res) => {
  try {
    const metrics = await getPlatformMetrics();
    res.json(metrics);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

// Business units status
router.get('/units', async (req, res) => {
  try {
    const statuses = await checkAllUnitsHealth();
    res.json(statuses);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

// Get specific unit status
router.get('/units/:unitId', async (req, res) => {
  try {
    const { unitId } = req.params;
    const statuses = await checkAllUnitsHealth();
    const unitStatus = statuses.find((s) => s.unit.id === unitId);

    if (!unitStatus) {
      return res.status(404).json({ error: 'Unit not found' });
    }

    res.json(unitStatus);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

// Get enabled units list
router.get('/units-list', (req, res) => {
  try {
    const units = getEnabledUnits();
    res.json(units);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

export default router;
