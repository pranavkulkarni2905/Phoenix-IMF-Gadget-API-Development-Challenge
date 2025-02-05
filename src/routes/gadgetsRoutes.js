const express = require('express');
const router = express.Router();
const gadgetsController = require('../controllers/gadgetsController');
const authenticateJWT = require('../middleware/authMiddleware');


// Route to get all gadgets
router.get('/gadgets', authenticateJWT, gadgetsController.getAllGadgets);
router.post('/gadgets', authenticateJWT, gadgetsController.createGadget);
router.patch('/gadgets/:id', authenticateJWT, gadgetsController.updateGadget);
router.delete('/gadgets/:id', authenticateJWT, gadgetsController.decommissionGadget);

// Route to trigger self-destruct for a specific gadget
router.post('/gadgets/:id/self-destruct',authenticateJWT, gadgetsController.triggerSelfDestruct);

module.exports = router;
