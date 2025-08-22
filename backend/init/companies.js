const companies = [
  // 🔹 IT
  { symbol: "TCS.NS", name: "Tata Consultancy Services", category: "IT" },
  { symbol: "INFY.NS", name: "Infosys", category: "IT" },
  { symbol: "WIPRO.NS", name: "Wipro", category: "IT" },
  { symbol: "HCLTECH.NS", name: "HCL Technologies", category: "IT" },
  { symbol: "TECHM.NS", name: "Tech Mahindra", category: "IT" },
  { symbol: "LTIM.NS", name: "LTIMindtree", category: "IT" },
  { symbol: "PERSISTENT.NS", name: "Persistent Systems", category: "IT" },
  { symbol: "COFORGE.NS", name: "Coforge", category: "IT" },

  // 🔹 Banks & Financials
  { symbol: "HDFCBANK.NS", name: "HDFC Bank", category: "Bank" },
  { symbol: "ICICIBANK.NS", name: "ICICI Bank", category: "Bank" },
  { symbol: "SBIN.NS", name: "State Bank of India", category: "Bank" },
  { symbol: "KOTAKBANK.NS", name: "Kotak Mahindra Bank", category: "Bank" },
  { symbol: "AXISBANK.NS", name: "Axis Bank", category: "Bank" },
  { symbol: "INDUSINDBK.NS", name: "IndusInd Bank", category: "Bank" },
  { symbol: "PNB.NS", name: "Punjab National Bank", category: "Bank" },
  { symbol: "BAJFINANCE.NS", name: "Bajaj Finance", category: "Finance" },
  { symbol: "HDFCLIFE.NS", name: "HDFC Life Insurance", category: "Finance" },
  { symbol: "SBILIFE.NS", name: "SBI Life Insurance", category: "Finance" },
  { symbol: "ICICIPRULI.NS", name: "ICICI Prudential Life", category: "Finance" },

  // 🔹 Energy & Power
  { symbol: "RELIANCE.NS", name: "Reliance Industries", category: "Energy" },
  { symbol: "ONGC.NS", name: "Oil & Natural Gas Corporation", category: "Energy" },
  { symbol: "IOC.NS", name: "Indian Oil Corporation", category: "Energy" },
  { symbol: "BPCL.NS", name: "Bharat Petroleum", category: "Energy" },
  { symbol: "GAIL.NS", name: "GAIL India", category: "Energy" },
  { symbol: "NTPC.NS", name: "NTPC", category: "Power" },
  { symbol: "POWERGRID.NS", name: "Power Grid Corporation", category: "Power" },
  { symbol: "ADANIGREEN.NS", name: "Adani Green Energy", category: "Power" },
  { symbol: "ADANIPOWER.NS", name: "Adani Power", category: "Power" },

  // 🔹 FMCG & Consumer
  { symbol: "HINDUNILVR.NS", name: "Hindustan Unilever", category: "FMCG" },
  { symbol: "ITC.NS", name: "ITC", category: "FMCG" },
  { symbol: "NESTLEIND.NS", name: "Nestle India", category: "FMCG" },
  { symbol: "BRITANNIA.NS", name: "Britannia Industries", category: "FMCG" },
  { symbol: "MARICO.NS", name: "Marico", category: "FMCG" },
  { symbol: "DABUR.NS", name: "Dabur India", category: "FMCG" },
  { symbol: "COLPAL.NS", name: "Colgate-Palmolive India", category: "FMCG" },
  { symbol: "GODREJCP.NS", name: "Godrej Consumer Products", category: "FMCG" },

  // 🔹 Auto
  { symbol: "TATAMOTORS.NS", name: "Tata Motors", category: "Auto" },
  { symbol: "M&M.NS", name: "Mahindra & Mahindra", category: "Auto" },
  { symbol: "MARUTI.NS", name: "Maruti Suzuki", category: "Auto" },
  { symbol: "EICHERMOT.NS", name: "Eicher Motors", category: "Auto" },
  { symbol: "HEROMOTOCO.NS", name: "Hero MotoCorp", category: "Auto" },
  { symbol: "BAJAJ-AUTO.NS", name: "Bajaj Auto", category: "Auto" },
  { symbol: "ASHOKLEY.NS", name: "Ashok Leyland", category: "Auto" },
  { symbol: "TVSMOTOR.NS", name: "TVS Motor", category: "Auto" },

  // 🔹 Pharma & Healthcare
  { symbol: "SUNPHARMA.NS", name: "Sun Pharma", category: "Pharma" },
  { symbol: "DRREDDY.NS", name: "Dr. Reddy's Laboratories", category: "Pharma" },
  { symbol: "CIPLA.NS", name: "Cipla", category: "Pharma" },
  { symbol: "DIVISLAB.NS", name: "Divi's Laboratories", category: "Pharma" },
  { symbol: "AUROPHARMA.NS", name: "Aurobindo Pharma", category: "Pharma" },
  { symbol: "LUPIN.NS", name: "Lupin", category: "Pharma" },

  // 🔹 Metals & Mining
  { symbol: "TATASTEEL.NS", name: "Tata Steel", category: "Metals" },
  { symbol: "JSWSTEEL.NS", name: "JSW Steel", category: "Metals" },
  { symbol: "HINDALCO.NS", name: "Hindalco Industries", category: "Metals" },
  { symbol: "COALINDIA.NS", name: "Coal India", category: "Metals" },
  { symbol: "NMDC.NS", name: "NMDC", category: "Metals" },

  // 🔹 Cement
  { symbol: "ULTRACEMCO.NS", name: "UltraTech Cement", category: "Cement" },
  { symbol: "SHREECEM.NS", name: "Shree Cement", category: "Cement" },
  { symbol: "AMBUJACEM.NS", name: "Ambuja Cements", category: "Cement" },
  { symbol: "ACC.NS", name: "ACC", category: "Cement" },
  { symbol: "DALBHARAT.NS", name: "Dalmia Bharat", category: "Cement" },

  // 🔹 Telecom
  { symbol: "BHARTIARTL.NS", name: "Bharti Airtel", category: "Telecom" },
  { symbol: "IDEA.NS", name: "Vodafone Idea", category: "Telecom" },

  // 🔹 Aviation
  { symbol: "INDIGO.NS", name: "InterGlobe Aviation (IndiGo)", category: "Aviation" },
  { symbol: "SPICEJET.NS", name: "SpiceJet", category: "Aviation" },

  // 🔹 Retail & E-commerce
  { symbol: "DMART.NS", name: "Avenue Supermarts (DMart)", category: "Retail" },
  { symbol: "TRENT.NS", name: "Trent (Westside, Zudio)", category: "Retail" }
];

module.exports = companies;