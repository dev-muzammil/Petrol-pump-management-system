const express = require("express");
const connectDb = require("./utils/db");
const app = express();
app.use(express.json());
const tankRouter = require("./routes/tankRouter");
const productRouter = require("./routes/productRouter");
const transactionRouter = require("./routes/transactionRouter");
const stockRouter = require("./routes/stockRouter");
const accountRouter = require("./routes/accountRouter");
const lendRouter = require("./routes/lendRouter");
const cors = require("cors");

app.use(cors());
app.use(tankRouter);
app.use(productRouter);
app.use(transactionRouter);
app.use(stockRouter);
app.use(accountRouter);
app.use(lendRouter);

const PORT = 5000;
connectDb().then(() => {
  app.listen(PORT, () => {
    console.log(`App is listening on PORT ${PORT}`);
  });
});
