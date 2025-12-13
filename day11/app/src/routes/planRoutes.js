const express = require("express");
const router = express.Router();
const planController = require("../controllers/planController");
// DELETE all plans
router.delete("/", planController.deleteAllPlans);

// Routes
router.get("/:operator", planController.getPlansByOperator);
router.post("/", planController.createPlan);

module.exports = router;
