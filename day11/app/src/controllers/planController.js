const Plan = require("../models/planModel");

// GET plans by operator
exports.getPlansByOperator = async (req, res) => {
  try {
    const { operator } = req.params;
    const plans = await Plan.find({ operator });
    res.json(plans);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// CREATE plan (admin use)
exports.createPlan = async (req, res) => {
  try {
    const plan = await Plan.create(req.body);
    res.status(201).json(plan);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
// DELETE all plans
exports.deleteAllPlans = async (req, res) => {
  try {
    await Plan.deleteMany({});
    res.json({ message: "All plans deleted successfully ✅" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
