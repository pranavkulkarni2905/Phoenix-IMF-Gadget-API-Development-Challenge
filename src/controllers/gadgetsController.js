const Gadget = require('../models/gadgetModel');
const { v4: uuidv4 } = require('uuid');

// Controller to get all gadgets
// Controller to get all gadgets or filter by status
exports.getAllGadgets = async (req, res) => {
    const { status } = req.query;
  
    try {
      let gadgets;
      if (status) {
        // If a status query is provided, filter gadgets by status
        gadgets = await Gadget.findAll({
          where: { status }
        });
      } else {
        // If no status query is provided, fetch all gadgets
        gadgets = await Gadget.findAll();
      }
  
      res.status(200).json(gadgets);
    } catch (error) {
      res.status(500).json({ message: 'Error retrieving gadgets', error });
    }
  };
  

// Controller to create a new gadget
exports.createGadget = async (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ message: 'Name is required' });
  }

  try {
    const newGadget = await Gadget.create({
      name,
      status: 'Available',
      missionSuccessProbability: Math.floor(Math.random() * 100) + 1, // Random probability
    });
    res.status(201).json(newGadget);
  } catch (error) {
    res.status(500).json({ message: 'Error creating gadget', error });
  }
};

// Controller to update a gadget
exports.updateGadget = async (req, res) => {
  const { id } = req.params;
  const { name, status } = req.body;

  try {
    const gadget = await Gadget.findByPk(id);
    if (!gadget) {
      return res.status(404).json({ message: 'Gadget not found' });
    }

    gadget.name = name || gadget.name;
    gadget.status = status || gadget.status;
    await gadget.save();

    res.status(200).json(gadget);
  } catch (error) {
    res.status(500).json({ message: 'Error updating gadget', error });
  }
};

// Controller to mark a gadget as decommissioned
exports.decommissionGadget = async (req, res) => {
  const { id } = req.params;

  try {
    const gadget = await Gadget.findByPk(id);
    if (!gadget) {
      return res.status(404).json({ message: 'Gadget not found' });
    }

    gadget.status = 'Decommissioned';
    gadget.decommissionedAt = new Date();
    await gadget.save();

    res.status(200).json(gadget);
  } catch (error) {
    res.status(500).json({ message: 'Error decommissioning gadget', error });
  }
};

// Controller to trigger self-destruct for a gadget
exports.triggerSelfDestruct = async (req, res) => {
  const { id } = req.params;
  const { confirmationCode } = req.body;

  // Simulate confirmation code (you can replace it with real logic later)
  const generatedCode = uuidv4(); // For example, generate a random code

  if (confirmationCode !== "c1b2b8f4-4bb5-4634-a22f-34276ffb3071") {
    return res.status(400).json({ message: 'Invalid confirmation code' });
  }

  try {
    const gadget = await Gadget.findByPk(id);
    if (!gadget) {
      return res.status(404).json({ message: 'Gadget not found' });
    }

    gadget.status = 'Destroyed';
    await gadget.save();

    res.status(200).json({ message: `Gadget ${gadget.name} self-destructed successfully!` });
  } catch (error) {
    res.status(500).json({ message: 'Error triggering self-destruct', error });
  }
};
