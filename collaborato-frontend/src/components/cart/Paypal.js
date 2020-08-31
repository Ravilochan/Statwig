import React from "react";
import PaypalExpressBtn from "react-paypal-express-checkout";

export default class Paypal extends React.Component {
  render() {
    const onSuccess = (payment) => {
      console.log("The payment was succeeded!", payment);
      this.props.onSuccess(payment);
    };

    const onCancel = (data) => {
      this.props.transactionCanceled(data);
    };

    const onError = (err) => {
      this.props.transactionError(err);
    };

    let env = "sandbox";
    let currency = "USD";
    let total = this.props.toPay;

    const client = {
      sandbox:
        "ATLcRQyMx6rrlDwa6hUIctOIlARtRpymP3MWa7sXH1iTH_PdXClYMRjtnQlBfgRKWH-SvQw5uixWSfmE",
      production: "YOUR-PRODUCTION-APP-ID",
    };
    return (
      <PaypalExpressBtn
        env={env}
        client={client}
        currency={currency}
        total={total}
        onError={onError}
        onSuccess={onSuccess}
        onCancel={onCancel}
        style={{
          size: "medium",
          color: "blue",
          shape: "rect",
          label: "checkout",
        }}
      />
    );
  }
}
