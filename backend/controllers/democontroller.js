import Demo from "../models/demomodel.js";
import emailQueue from "../queue/emailqueue.js";
export const requestDemo = async (req, res) => {
  try {
    const { name, schoolName, email, mobile, address, message } = req.body;

    if (!name || !schoolName || !email || String(mobile).length !==10) {
      return res.status(400).json({
        message: "Required fields missing"
      });
    }

    const demo = await Demo.create({
      name,
      schoolName,
      email,
      mobile,
      address,
      message
    });

    // console.log("📢 DEMO REQUEST:", demo);
      try {
        await emailQueue.add({
          type: "DEMO_REQUEST",
          email: "supportvidayanta@gmail.com",
          data: {
            schoolName: req.body.schoolName,
            name: req.body.name,
            email: req.body.email,
            phone: req.body.mobile,
          },
        });

        console.log("✅ Queue Added");

      } catch (err) {
        console.log("❌ Queue Error FULL:", err);
      }
    res.status(201).json({
      success: true,
      message: "Demo requested"
    });

  } catch (error) {
    // console.log("🔥 DEMO ERROR:", error);
    res.status(500).json({
      message: error.message
    });
  }
};
export const getAllDemoRequests = async (req, res) => {
  try {
    const data = await Demo.find().sort({ createdAt: -1 });
    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteDemo = async (req, res) => {
  try {
    await Demo.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};