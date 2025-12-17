const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("./src/models/userModel");
const Plan = require("./src/models/planModel");

const run = async () => {
    try {
        await mongoose.connect("mongodb://localhost:27017/myproductsDB");
        console.log("Connected to DB");

        const email = "admin@gmail.com";
        const password = "admin123";

        // Check if exists
        let user = await User.findOne({ email });
        if (user) {
            console.log("Admin already exists");
        } else {
            const hashedPassword = await bcrypt.hash(password, 10);
            user = new User({
                email,
                password: hashedPassword,
                name: "Super Admin",
                phone: "0000000000",
                role: "admin"
            });
            await user.save();
            console.log("Admin created");
        }

        // Also check plans
        const planCount = await Plan.countDocuments();
        console.log("Plan count:", planCount);

        process.exit(0);
    } catch (e) {
        console.error(e);
        process.exit(1);
    }
};

run();
