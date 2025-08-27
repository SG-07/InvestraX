const companies = [
  // 🔹 Indices
  { symbol: "INDEXBOM:SENSEX", name: "BSE Sensex", category: "Index" },
  { symbol: "INDEXNSE:NIFTY_50", name: "Nifty 50", category: "Index" },

  // 🔹 IT
  { symbol: "NSE:TCS", name: "Tata Consultancy Services", category: "IT" },
  { symbol: "NSE:INFY", name: "Infosys", category: "IT" },
  { symbol: "NSE:WIPRO", name: "Wipro", category: "IT" },
  { symbol: "NSE:HCLTECH", name: "HCL Technologies", category: "IT" },
  { symbol: "NSE:TECHM", name: "Tech Mahindra", category: "IT" },
  { symbol: "NSE:LTIM", name: "LTIMindtree", category: "IT" },
  { symbol: "NSE:PERSISTENT", name: "Persistent Systems", category: "IT" },
  { symbol: "NSE:COFORGE", name: "Coforge", category: "IT" },

  // 🔹 Banks & Financials
  { symbol: "NSE:HDFCBANK", name: "HDFC Bank", category: "Bank" },
  { symbol: "NSE:ICICIBANK", name: "ICICI Bank", category: "Bank" },
  { symbol: "NSE:SBIN", name: "State Bank of India", category: "Bank" },
  { symbol: "NSE:KOTAKBANK", name: "Kotak Mahindra Bank", category: "Bank" },
  { symbol: "NSE:AXISBANK", name: "Axis Bank", category: "Bank" },
  { symbol: "NSE:INDUSINDBK", name: "IndusInd Bank", category: "Bank" },
  { symbol: "NSE:PNB", name: "Punjab National Bank", category: "Bank" },
  { symbol: "NSE:BAJFINANCE", name: "Bajaj Finance", category: "Finance" },
  { symbol: "NSE:HDFCLIFE", name: "HDFC Life Insurance", category: "Finance" },
  { symbol: "NSE:SBILIFE", name: "SBI Life Insurance", category: "Finance" },
  { symbol: "NSE:ICICIPRULI", name: "ICICI Prudential Life", category: "Finance" },

  // 🔹 Energy & Power
  { symbol: "NSE:RELIANCE", name: "Reliance Industries", category: "Energy" },
  { symbol: "NSE:ONGC", name: "Oil & Natural Gas Corporation", category: "Energy" },
  { symbol: "NSE:IOC", name: "Indian Oil Corporation", category: "Energy" },
  { symbol: "NSE:BPCL", name: "Bharat Petroleum", category: "Energy" },
  { symbol: "NSE:GAIL", name: "GAIL India", category: "Energy" },
  { symbol: "NSE:NTPC", name: "NTPC", category: "Power" },
  { symbol: "NSE:POWERGRID", name: "Power Grid Corporation", category: "Power" },
  { symbol: "NSE:ADANIGREEN", name: "Adani Green Energy", category: "Power" },
  { symbol: "NSE:ADANIPOWER", name: "Adani Power", category: "Power" },

  // 🔹 FMCG & Consumer
  { symbol: "NSE:HINDUNILVR", name: "Hindustan Unilever", category: "FMCG" },
  { symbol: "NSE:ITC", name: "ITC", category: "FMCG" },
  { symbol: "NSE:NESTLEIND", name: "Nestle India", category: "FMCG" },
  { symbol: "NSE:BRITANNIA", name: "Britannia Industries", category: "FMCG" },
  { symbol: "NSE:MARICO", name: "Marico", category: "FMCG" },
  { symbol: "NSE:DABUR", name: "Dabur India", category: "FMCG" },
  { symbol: "NSE:COLPAL", name: "Colgate-Palmolive India", category: "FMCG" },
  { symbol: "NSE:GODREJCP", name: "Godrej Consumer Products", category: "FMCG" },

  // 🔹 Auto
  { symbol: "NSE:TATAMOTORS", name: "Tata Motors", category: "Auto" },
  { symbol: "NSE:M&M", name: "Mahindra & Mahindra", category: "Auto" },
  { symbol: "NSE:MARUTI", name: "Maruti Suzuki", category: "Auto" },
  { symbol: "NSE:EICHERMOT", name: "Eicher Motors", category: "Auto" },
  { symbol: "NSE:HEROMOTOCO", name: "Hero MotoCorp", category: "Auto" },
  { symbol: "NSE:BAJAJ-AUTO", name: "Bajaj Auto", category: "Auto" },
  { symbol: "NSE:ASHOKLEY", name: "Ashok Leyland", category: "Auto" },
  { symbol: "NSE:TVSMOTOR", name: "TVS Motor", category: "Auto" },

  // 🔹 Pharma & Healthcare
  { symbol: "NSE:SUNPHARMA", name: "Sun Pharma", category: "Pharma" },
  { symbol: "NSE:DRREDDY", name: "Dr. Reddy's Laboratories", category: "Pharma" },
  { symbol: "NSE:CIPLA", name: "Cipla", category: "Pharma" },
  { symbol: "NSE:DIVISLAB", name: "Divi's Laboratories", category: "Pharma" },
  { symbol: "NSE:AUROPHARMA", name: "Aurobindo Pharma", category: "Pharma" },
  { symbol: "NSE:LUPIN", name: "Lupin", category: "Pharma" },

  // 🔹 Metals & Mining
  { symbol: "NSE:TATASTEEL", name: "Tata Steel", category: "Metals" },
  { symbol: "NSE:JSWSTEEL", name: "JSW Steel", category: "Metals" },
  { symbol: "NSE:HINDALCO", name: "Hindalco Industries", category: "Metals" },
  { symbol: "NSE:COALINDIA", name: "Coal India", category: "Metals" },
  { symbol: "NSE:NMDC", name: "NMDC", category: "Metals" },

  // 🔹 Cement
  { symbol: "NSE:ULTRACEMCO", name: "UltraTech Cement", category: "Cement" },
  { symbol: "NSE:SHREECEM", name: "Shree Cement", category: "Cement" },
  { symbol: "NSE:AMBUJACEM", name: "Ambuja Cements", category: "Cement" },
  { symbol: "NSE:ACC", name: "ACC", category: "Cement" },
  { symbol: "NSE:DALBHARAT", name: "Dalmia Bharat", category: "Cement" },

  // 🔹 Telecom
  { symbol: "NSE:BHARTIARTL", name: "Bharti Airtel", category: "Telecom" },
  { symbol: "NSE:IDEA", name: "Vodafone Idea", category: "Telecom" },

  // 🔹 Aviation
  { symbol: "NSE:INDIGO", name: "InterGlobe Aviation (IndiGo)", category: "Aviation" },
  { symbol: "BOM:500285", name: "SpiceJet", category: "Aviation" }, 
  // 🔹 Retail & E-commerce
  { symbol: "NSE:DMART", name: "Avenue Supermarts (DMart)", category: "Retail" },
  { symbol: "NSE:TRENT", name: "Trent (Westside, Zudio)", category: "Retail" }
];

module.exports = companies;
