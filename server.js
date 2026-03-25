import express from "express";
import axios from "axios";

const app = express();
app.use(express.json());

const PI_API_KEY = process.env.PI_API_KEY;

// ✅ اختبار السيرفر
app.get("/", (req, res) => {
  res.send("Server running ✅");
});

// ✅ approve
app.post("/approve", async (req, res) => {
  const { paymentId } = req.body;

  try {
    const r = await axios.post(
      `https://api.minepi.com/v2/payments/${paymentId}/approve`,
      {},
      {
        headers: { Authorization: `Key ${PI_API_KEY}` }
      }
    );

    res.json(r.data);
  } catch (e) {
    console.error(e.response?.data || e.message);
    res.status(500).json({ error: "approve failed" });
  }
});

// ✅ complete
app.post("/complete", async (req, res) => {
  const { paymentId, txid } = req.body;

  try {
    const r = await axios.post(
      `https://api.minepi.com/v2/payments/${paymentId}/complete`,
      { txid },
      {
        headers: { Authorization: `Key ${PI_API_KEY}` }
      }
    );

    res.json(r.data);
  } catch (e) {
    console.error(e.response?.data || e.message);
    res.status(500).json({ error: "complete failed" });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
