import Contact from "../models/contactmodel.js";

// 🔥 SEND CONTACT
export const sendContact = async (req, res) => {
  try {
    const { name, schoolName, email, mobile, address, message } = req.body;

    // SAME VALIDATION
    if (!name || !email || !mobile || !message) {
      return res.status(400).json({
        message: "Required fields missing",
      });
    }

    if (String(mobile).length !== 10) {
      return res.status(400).json({
        success: false,
        message: "Invalid mobile number",
      });
    }

    if (!email.includes("@")) {
      return res.status(400).json({
        success: false,
        message: "Invalid email",
      });
    }

    await Contact.create({
      name,
      schoolName,
      email,
      mobile,
      address,
      message,
    });

    return res.status(201).json({
      success: true,
      message: "Message saved",
    });

  } catch (error) {
    // console.log("🔥 CONTACT ERROR:", error);

    return res.status(500).json({
      message: error.message,
    });
  }
};

// 🔥 GET CONTACTS
export const getAllContacts = async (req, res) => {
  try {
    const data = await Contact.find()
      .sort({ createdAt: -1 })
      .select("-__v");

    return res.json({
      success: true,
      data,
    });

  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
export const deleteContact = async (req, res) => {
  try {
    await Contact.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};