import express from "express";

const app = express();
app.use(express.json());

const PI_API_KEY = process.env.PI_API_KEY;

// اختبار السيرفر
app.get("/", (req, res) => {
  res.send("Server running ✅");
});

// approve
app.post("/approve", async (req, res) => {
  const { paymentId } = req.body;

  try {
    const response = await fetch(
      `https://api.minepi.com/v2/payments/${paymentId}/approve`,
      {
        method: "POST",
        headers: {
          Authorization: `Key ${PI_API_KEY}`
        }
      }
    );

    const data = await response.json();
    res.json(data);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "approve failed" });
  }
});

// complete
app.post("/complete", async (req, res) => {
  const { paymentId, txid } = req.body;

  try {
    const response = await fetch(
      `https://api.minepi.com/v2/payments/${paymentId}/complete`,
      {
        method: "POST",
        headers: {
          Authorization: `Key ${PI_API_KEY}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ txid })
      }
    );

    const data = await response.json();
    res.json(data);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "complete failed" });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
