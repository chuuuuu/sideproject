import "dotenv-safe/config";
import express from "express";
import request from "request";

const PAYPAL_API = "https://api-m.sandbox.paypal.com";

const main = async () => {
  const app = express();

  app.set("view-engine", "ejs");
  app.use(express.urlencoded({ extended: false }));
  app.get("/", (_req, res) => {
    res.render("index.ejs");
  });

  // Set up the payment:
  // 1. Set up a URL to handle requests from the PayPal button
  app.post("/my-api/create-payment/", function (_req, res) {
    console.log("create payment")
    // 2. Call /v1/payments/payment to set up the payment
    request.post(
      PAYPAL_API + "/v1/payments/payment",
      {
        auth: {
          user: process.env.CLIENT_ID,
          pass: process.env.SECRET,
        },
        body: {
          intent: "sale",
          payer: {
            payment_method: "paypal",
          },
          transactions: [
            {
              amount: {
                total: "0.99",
                currency: "USD",
              },
            },
          ],
          redirect_urls: {
            return_url: "https://example.com",
            cancel_url: "https://example.com",
          },
        },
        json: true,
      },
      (err, response) => {
        if (err) {
          console.error(err);
          res.sendStatus(500);
          return;
        }
        // 3. Return the payment ID to the client
        res.json({
          id: response.body.id,
        });
      }
    );
  });

  // Execute the payment:
  // 1. Set up a URL to handle requests from the PayPal button.
  app.post("/my-api/execute-payment/", function (req, res) {
    console.log("execute payment")
    console.log(req.body);
    // 2. Get the payment ID and the payer ID from the request body.
    var paymentID = req.body.paymentID;
    var payerID = req.body.payerID;
    // 3. Call /v1/payments/payment/PAY-XXX/execute to finalize the payment.
    request.post(
      PAYPAL_API + "/v1/payments/payment/" + paymentID + "/execute",
      {
        auth: {
          user: process.env.CLIENT_ID,
          pass: process.env.SECRET,
        },
        body: {
          payer_id: payerID,
          transactions: [
            {
              amount: {
                total: "0.99",
                currency: "USD",
              },
            },
          ],
        },
        json: true,
      },
      (err, _response) => {
        if (err) {
          console.error(err);
          res.sendStatus(500);
          return;
        }
        // 4. Return a success response to the client
        res.json({
          status: "success",
        });
      }
    );
  });

  app.listen(3000, () => {
    console.log("server started on localhost:3000");
  });
};

main().catch((e) => console.log(e));
