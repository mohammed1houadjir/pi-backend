const express = require("express");
const axios = require("axios");

const app = express();
app.use(express.json());

const PI_API_KEY = process.env.PI_API_KEY;

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
    res.status(500).json({ error: "approve failed" });
  }
});

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
    res.status(500).json({ error: "complete failed" });
  }
});

app.listen(process.env.PORT || 3000);
