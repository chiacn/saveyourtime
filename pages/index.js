import ReactDOM from "react-dom/client";
import React from "react";
import ReactGA from 'react-ga';
import Link from 'next/link'; 
import Layout from "../components/Layout";

const TRACKING_ID = process.env.REACT_APP_GOOGLE_ANALYTICS_TRACKING_ID;
ReactGA.initialize(TRACKING_ID);

export default function App() { 
  return ( 
    <>
    </>
  ) 
}