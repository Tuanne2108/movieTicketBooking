import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import './App.css'


export default function App() {
  return (
    <div className="App">
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
        </Elements>
      )}
    </div>
  );
}
