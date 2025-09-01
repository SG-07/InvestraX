const companies = [
  // 🔹 Indices
  { symbol: "SENSEX", name: "BSE Sensex", category: "Index", price: 0, priceopen: 0, high: 0, low: 0, volume: 0, 
    change: 0, changepct: 0, low52: 0, high52: 0, eps: 0, pe: 0, marketcap: 0, datadelay: 0, tradetime: null},

  { symbol: "NIFTY_50", name: "Nifty 50", category: "Index", price: 0, priceopen: 0, high: 0, low: 0, volume: 0, 
    change: 0, changepct: 0, low52: 0, high52: 0, eps: 0, pe: 0, marketcap: 0, datadelay: 0, tradetime: null},

  // 🔹 IT
  { symbol: "TCS", name: "Tata Consultancy Services", category: "IT", price: 0, priceopen: 0, high: 0, low: 0, volume: 0, 
    change: 0, changepct: 0, low52: 0, high52: 0, eps: 0, pe: 0, marketcap: 0, datadelay: 0, tradetime: null},

  { symbol: "INFY", name: "Infosys", category: "IT", price: 0, priceopen: 0, high: 0, low: 0, volume: 0, 
    change: 0, changepct: 0, low52: 0, high52: 0, eps: 0, pe: 0, marketcap: 0, datadelay: 0, tradetime: null},

  { symbol: "WIPRO", name: "Wipro", category: "IT", price: 0, priceopen: 0, high: 0, low: 0, volume: 0, 
    change: 0, changepct: 0, low52: 0, high52: 0, eps: 0, pe: 0, marketcap: 0, datadelay: 0, tradetime: null},

  { symbol: "HCLTECH", name: "HCL Technologies", category: "IT", price: 0, priceopen: 0, high: 0, low: 0, volume: 0, 
    change: 0, changepct: 0, low52: 0, high52: 0, eps: 0, pe: 0, marketcap: 0, datadelay: 0, tradetime: null},

  { symbol: "TECHM", name: "Tech Mahindra", category: "IT", price: 0, priceopen: 0, high: 0, low: 0, volume: 0, 
    change: 0, changepct: 0, low52: 0, high52: 0, eps: 0, pe: 0, marketcap: 0, datadelay: 0, tradetime: null},

  { symbol: "LTIM", name: "LTIMindtree", category: "IT", price: 0, priceopen: 0, high: 0, low: 0, volume: 0, 
    change: 0, changepct: 0, low52: 0, high52: 0, eps: 0, pe: 0, marketcap: 0, datadelay: 0, tradetime: null},

  { symbol: "PERSISTENT", name: "Persistent Systems", category: "IT", price: 0, priceopen: 0, high: 0, low: 0, volume: 0, 
    change: 0, changepct: 0, low52: 0, high52: 0, eps: 0, pe: 0, marketcap: 0, datadelay: 0, tradetime: null},

  { symbol: "COFORGE", name: "Coforge", category: "IT", price: 0, priceopen: 0, high: 0, low: 0, volume: 0, 
    change: 0, changepct: 0, low52: 0, high52: 0, eps: 0, pe: 0, marketcap: 0, datadelay: 0, tradetime: null},

  // 🔹 Banks & Financials
  { symbol: "HDFCBANK", name: "HDFC Bank", category: "Bank", price: 0, priceopen: 0, high: 0, low: 0, volume: 0, 
    change: 0, changepct: 0, low52: 0, high52: 0, eps: 0, pe: 0, marketcap: 0, datadelay: 0, tradetime: null},

  { symbol: "ICICIBANK", name: "ICICI Bank", category: "Bank", price: 0, priceopen: 0, high: 0, low: 0, volume: 0, 
    change: 0, changepct: 0, low52: 0, high52: 0, eps: 0, pe: 0, marketcap: 0, datadelay: 0, tradetime: null},

  { symbol: "SBIN", name: "State Bank of India", category: "Bank", price: 0, priceopen: 0, high: 0, low: 0, volume: 0, 
    change: 0, changepct: 0, low52: 0, high52: 0, eps: 0, pe: 0, marketcap: 0, datadelay: 0, tradetime: null},

  { symbol: "KOTAKBANK", name: "Kotak Mahindra Bank", category: "Bank", price: 0, priceopen: 0, high: 0, low: 0, volume: 0, 
    change: 0, changepct: 0, low52: 0, high52: 0, eps: 0, pe: 0, marketcap: 0, datadelay: 0, tradetime: null},

  { symbol: "AXISBANK", name: "Axis Bank", category: "Bank", price: 0, priceopen: 0, high: 0, low: 0, volume: 0, 
    change: 0, changepct: 0, low52: 0, high52: 0, eps: 0, pe: 0, marketcap: 0, datadelay: 0, tradetime: null},

  { symbol: "INDUSINDBK", name: "IndusInd Bank", category: "Bank", price: 0, priceopen: 0, high: 0, low: 0, volume: 0, 
    change: 0, changepct: 0, low52: 0, high52: 0, eps: 0, pe: 0, marketcap: 0, datadelay: 0, tradetime: null},

  { symbol: "PNB", name: "Punjab National Bank", category: "Bank", price: 0, priceopen: 0, high: 0, low: 0, volume: 0, 
    change: 0, changepct: 0, low52: 0, high52: 0, eps: 0, pe: 0, marketcap: 0, datadelay: 0, tradetime: null},

  { symbol: "BAJFINANCE", name: "Bajaj Finance", category: "Finance", price: 0, priceopen: 0, high: 0, low: 0, volume: 0, 
    change: 0, changepct: 0, low52: 0, high52: 0, eps: 0, pe: 0, marketcap: 0, datadelay: 0, tradetime: null},

  { symbol: "HDFCLIFE", name: "HDFC Life Insurance", category: "Finance", price: 0, priceopen: 0, high: 0, low: 0, volume: 0, 
    change: 0, changepct: 0, low52: 0, high52: 0, eps: 0, pe: 0, marketcap: 0, datadelay: 0, tradetime: null},

  { symbol: "SBILIFE", name: "SBI Life Insurance", category: "Finance", price: 0, priceopen: 0, high: 0, low: 0, volume: 0, 
    change: 0, changepct: 0, low52: 0, high52: 0, eps: 0, pe: 0, marketcap: 0, datadelay: 0, tradetime: null},

  { symbol: "ICICIPRULI", name: "ICICI Prudential Life", category: "Finance", price: 0, priceopen: 0, high: 0, low: 0, volume: 0, 
    change: 0, changepct: 0, low52: 0, high52: 0, eps: 0, pe: 0, marketcap: 0, datadelay: 0, tradetime: null},

  // 🔹 Energy & Power
  { symbol: "RELIANCE", name: "Reliance Industries", category: "Energy", price: 0, priceopen: 0, high: 0, low: 0, volume: 0, 
    change: 0, changepct: 0, low52: 0, high52: 0, eps: 0, pe: 0, marketcap: 0, datadelay: 0, tradetime: null},

  { symbol: "ONGC", name: "Oil & Natural Gas Corporation", category: "Energy", price: 0, priceopen: 0, high: 0, low: 0, volume: 0, 
    change: 0, changepct: 0, low52: 0, high52: 0, eps: 0, pe: 0, marketcap: 0, datadelay: 0, tradetime: null},

  { symbol: "IOC", name: "Indian Oil Corporation", category: "Energy", price: 0, priceopen: 0, high: 0, low: 0, volume: 0, 
    change: 0, changepct: 0, low52: 0, high52: 0, eps: 0, pe: 0, marketcap: 0, datadelay: 0, tradetime: null},

  { symbol: "BPCL", name: "Bharat Petroleum", category: "Energy", price: 0, priceopen: 0, high: 0, low: 0, volume: 0, 
    change: 0, changepct: 0, low52: 0, high52: 0, eps: 0, pe: 0, marketcap: 0, datadelay: 0, tradetime: null},

  { symbol: "GAIL", name: "GAIL India", category: "Energy", price: 0, priceopen: 0, high: 0, low: 0, volume: 0, 
    change: 0, changepct: 0, low52: 0, high52: 0, eps: 0, pe: 0, marketcap: 0, datadelay: 0, tradetime: null},

  { symbol: "NTPC", name: "NTPC", category: "Power", price: 0, priceopen: 0, high: 0, low: 0, volume: 0, 
    change: 0, changepct: 0, low52: 0, high52: 0, eps: 0, pe: 0, marketcap: 0, datadelay: 0, tradetime: null},

  { symbol: "POWERGRID", name: "Power Grid Corporation", category: "Power", price: 0, priceopen: 0, high: 0, low: 0, volume: 0, 
    change: 0, changepct: 0, low52: 0, high52: 0, eps: 0, pe: 0, marketcap: 0, datadelay: 0, tradetime: null},

  { symbol: "ADANIGREEN", name: "Adani Green Energy", category: "Power", price: 0, priceopen: 0, high: 0, low: 0, volume: 0, 
    change: 0, changepct: 0, low52: 0, high52: 0, eps: 0, pe: 0, marketcap: 0, datadelay: 0, tradetime: null},

  { symbol: "ADANIPOWER", name: "Adani Power", category: "Power", price: 0, priceopen: 0, high: 0, low: 0, volume: 0, 
    change: 0, changepct: 0, low52: 0, high52: 0, eps: 0, pe: 0, marketcap: 0, datadelay: 0, tradetime: null},

  // 🔹 FMCG & Consumer
  { symbol: "HINDUNILVR", name: "Hindustan Unilever", category: "FMCG", price: 0, priceopen: 0, high: 0, low: 0, volume: 0, 
    change: 0, changepct: 0, low52: 0, high52: 0, eps: 0, pe: 0, marketcap: 0, datadelay: 0, tradetime: null},

  { symbol: "ITC", name: "ITC", category: "FMCG", price: 0, priceopen: 0, high: 0, low: 0, volume: 0, 
    change: 0, changepct: 0, low52: 0, high52: 0, eps: 0, pe: 0, marketcap: 0, datadelay: 0, tradetime: null},

  { symbol: "NESTLEIND", name: "Nestle India", category: "FMCG", price: 0, priceopen: 0, high: 0, low: 0, volume: 0, 
    change: 0, changepct: 0, low52: 0, high52: 0, eps: 0, pe: 0, marketcap: 0, datadelay: 0, tradetime: null},

  { symbol: "BRITANNIA", name: "Britannia Industries", category: "FMCG", price: 0, priceopen: 0, high: 0, low: 0, volume: 0, 
    change: 0, changepct: 0, low52: 0, high52: 0, eps: 0, pe: 0, marketcap: 0, datadelay: 0, tradetime: null},

  { symbol: "MARICO", name: "Marico", category: "FMCG", price: 0, priceopen: 0, high: 0, low: 0, volume: 0, 
    change: 0, changepct: 0, low52: 0, high52: 0, eps: 0, pe: 0, marketcap: 0, datadelay: 0, tradetime: null},

  { symbol: "DABUR", name: "Dabur India", category: "FMCG", price: 0, priceopen: 0, high: 0, low: 0, volume: 0, 
    change: 0, changepct: 0, low52: 0, high52: 0, eps: 0, pe: 0, marketcap: 0, datadelay: 0, tradetime: null},

  { symbol: "COLPAL", name: "Colgate-Palmolive India", category: "FMCG", price: 0, priceopen: 0, high: 0, low: 0, volume: 0, 
    change: 0, changepct: 0, low52: 0, high52: 0, eps: 0, pe: 0, marketcap: 0, datadelay: 0, tradetime: null},

  { symbol: "GODREJCP", name: "Godrej Consumer Products", category: "FMCG", price: 0, priceopen: 0, high: 0, low: 0, volume: 0, 
    change: 0, changepct: 0, low52: 0, high52: 0, eps: 0, pe: 0, marketcap: 0, datadelay: 0, tradetime: null},

  // 🔹 Auto
  { symbol: "TATAMOTORS", name: "Tata Motors", category: "Auto", price: 0, priceopen: 0, high: 0, low: 0, volume: 0, 
    change: 0, changepct: 0, low52: 0, high52: 0, eps: 0, pe: 0, marketcap: 0, datadelay: 0, tradetime: null},

  { symbol: "M&M", name: "Mahindra & Mahindra", category: "Auto", price: 0, priceopen: 0, high: 0, low: 0, volume: 0, 
    change: 0, changepct: 0, low52: 0, high52: 0, eps: 0, pe: 0, marketcap: 0, datadelay: 0, tradetime: null},

  { symbol: "MARUTI", name: "Maruti Suzuki", category: "Auto", price: 0, priceopen: 0, high: 0, low: 0, volume: 0, 
    change: 0, changepct: 0, low52: 0, high52: 0, eps: 0, pe: 0, marketcap: 0, datadelay: 0, tradetime: null},

  { symbol: "EICHERMOT", name: "Eicher Motors", category: "Auto", price: 0, priceopen: 0, high: 0, low: 0, volume: 0, 
    change: 0, changepct: 0, low52: 0, high52: 0, eps: 0, pe: 0, marketcap: 0, datadelay: 0, tradetime: null},

  { symbol: "HEROMOTOCO", name: "Hero MotoCorp", category: "Auto", price: 0, priceopen: 0, high: 0, low: 0, volume: 0, 
    change: 0, changepct: 0, low52: 0, high52: 0, eps: 0, pe: 0, marketcap: 0, datadelay: 0, tradetime: null},

  { symbol: "BAJAJ-AUTO", name: "Bajaj Auto", category: "Auto", price: 0, priceopen: 0, high: 0, low: 0, volume: 0, 
    change: 0, changepct: 0, low52: 0, high52: 0, eps: 0, pe: 0, marketcap: 0, datadelay: 0, tradetime: null},

  { symbol: "ASHOKLEY", name: "Ashok Leyland", category: "Auto", price: 0, priceopen: 0, high: 0, low: 0, volume: 0, 
    change: 0, changepct: 0, low52: 0, high52: 0, eps: 0, pe: 0, marketcap: 0, datadelay: 0, tradetime: null},

  { symbol: "TVSMOTOR", name: "TVS Motor", category: "Auto", price: 0, priceopen: 0, high: 0, low: 0, volume: 0, 
    change: 0, changepct: 0, low52: 0, high52: 0, eps: 0, pe: 0, marketcap: 0, datadelay: 0, tradetime: null},

  // 🔹 Pharma & Healthcare
  { symbol: "SUNPHARMA", name: "Sun Pharma", category: "Pharma", price: 0, priceopen: 0, high: 0, low: 0, volume: 0, 
    change: 0, changepct: 0, low52: 0, high52: 0, eps: 0, pe: 0, marketcap: 0, datadelay: 0, tradetime: null},

  { symbol: "DRREDDY", name: "Dr. Reddy's Laboratories", category: "Pharma", price: 0, priceopen: 0, high: 0, low: 0, volume: 0, 
    change: 0, changepct: 0, low52: 0, high52: 0, eps: 0, pe: 0, marketcap: 0, datadelay: 0, tradetime: null},

  { symbol: "CIPLA", name: "Cipla", category: "Pharma", price: 0, priceopen: 0, high: 0, low: 0, volume: 0, 
    change: 0, changepct: 0, low52: 0, high52: 0, eps: 0, pe: 0, marketcap: 0, datadelay: 0, tradetime: null},

  { symbol: "DIVISLAB", name: "Divi's Laboratories", category: "Pharma", price: 0, priceopen: 0, high: 0, low: 0, volume: 0, 
    change: 0, changepct: 0, low52: 0, high52: 0, eps: 0, pe: 0, marketcap: 0, datadelay: 0, tradetime: null},

  { symbol: "AUROPHARMA", name: "Aurobindo Pharma", category: "Pharma", price: 0, priceopen: 0, high: 0, low: 0, volume: 0, 
    change: 0, changepct: 0, low52: 0, high52: 0, eps: 0, pe: 0, marketcap: 0, datadelay: 0, tradetime: null},

  { symbol: "LUPIN", name: "Lupin", category: "Pharma", price: 0, priceopen: 0, high: 0, low: 0, volume: 0, 
    change: 0, changepct: 0, low52: 0, high52: 0, eps: 0, pe: 0, marketcap: 0, datadelay: 0, tradetime: null},

  // 🔹 Metals & Mining
  { symbol: "TATASTEEL", name: "Tata Steel", category: "Metals", price: 0, priceopen: 0, high: 0, low: 0, volume: 0, 
    change: 0, changepct: 0, low52: 0, high52: 0, eps: 0, pe: 0, marketcap: 0, datadelay: 0, tradetime: null},

  { symbol: "JSWSTEEL", name: "JSW Steel", category: "Metals", price: 0, priceopen: 0, high: 0, low: 0, volume: 0, 
    change: 0, changepct: 0, low52: 0, high52: 0, eps: 0, pe: 0, marketcap: 0, datadelay: 0, tradetime: null},

  { symbol: "HINDALCO", name: "Hindalco Industries", category: "Metals", price: 0, priceopen: 0, high: 0, low: 0, volume: 0, 
    change: 0, changepct: 0, low52: 0, high52: 0, eps: 0, pe: 0, marketcap: 0, datadelay: 0, tradetime: null},

  { symbol: "COALINDIA", name: "Coal India", category: "Metals", price: 0, priceopen: 0, high: 0, low: 0, volume: 0, 
    change: 0, changepct: 0, low52: 0, high52: 0, eps: 0, pe: 0, marketcap: 0, datadelay: 0, tradetime: null},

  { symbol: "NMDC", name: "NMDC", category: "Metals", price: 0, priceopen: 0, high: 0, low: 0, volume: 0, 
    change: 0, changepct: 0, low52: 0, high52: 0, eps: 0, pe: 0, marketcap: 0, datadelay: 0, tradetime: null},

  // 🔹 Cement
  { symbol: "ULTRACEMCO", name: "UltraTech Cement", category: "Cement", price: 0, priceopen: 0, high: 0, low: 0, volume: 0, 
    change: 0, changepct: 0, low52: 0, high52: 0, eps: 0, pe: 0, marketcap: 0, datadelay: 0, tradetime: null},

  { symbol: "SHREECEM", name: "Shree Cement", category: "Cement", price: 0, priceopen: 0, high: 0, low: 0, volume: 0, 
    change: 0, changepct: 0, low52: 0, high52: 0, eps: 0, pe: 0, marketcap: 0, datadelay: 0, tradetime: null},

  { symbol: "AMBUJACEM", name: "Ambuja Cements", category: "Cement", price: 0, priceopen: 0, high: 0, low: 0, volume: 0, 
    change: 0, changepct: 0, low52: 0, high52: 0, eps: 0, pe: 0, marketcap: 0, datadelay: 0, tradetime: null},

  { symbol: "ACC", name: "ACC", category: "Cement", price: 0, priceopen: 0, high: 0, low: 0, volume: 0, 
    change: 0, changepct: 0, low52: 0, high52: 0, eps: 0, pe: 0, marketcap: 0, datadelay: 0, tradetime: null},
    
  { symbol: "DALBHARAT", name: "Dalmia Bharat", category: "Cement", price: 0, priceopen: 0, high: 0, low: 0, volume: 0, 
    change: 0, changepct: 0, low52: 0, high52: 0, eps: 0, pe: 0, marketcap: 0, datadelay: 0, tradetime: null},

  // 🔹 Telecom
  { symbol: "BHARTIARTL", name: "Bharti Airtel", category: "Telecom", price: 0, priceopen: 0, high: 0, low: 0, volume: 0, 
    change: 0, changepct: 0, low52: 0, high52: 0, eps: 0, pe: 0, marketcap: 0, datadelay: 0, tradetime: null},

  { symbol: "IDEA", name: "Vodafone Idea", category: "Telecom", price: 0, priceopen: 0, high: 0, low: 0, volume: 0, 
    change: 0, changepct: 0, low52: 0, high52: 0, eps: 0, pe: 0, marketcap: 0, datadelay: 0, tradetime: null},

  // 🔹 Aviation
  { symbol: "INDIGO", name: "InterGlobe Aviation (IndiGo)", category: "Aviation", price: 0, priceopen: 0, high: 0, low: 0, volume: 0, 
    change: 0, changepct: 0, low52: 0, high52: 0, eps: 0, pe: 0, marketcap: 0, datadelay: 0, tradetime: null},

  { symbol: "500285", name: "SpiceJet", category: "Aviation", price: 0, priceopen: 0, high: 0, low: 0, volume: 0, 
    change: 0, changepct: 0, low52: 0, high52: 0, eps: 0, pe: 0, marketcap: 0, datadelay: 0, tradetime: null},

  // 🔹 Retail & E-commerce
  { symbol: "DMART", name: "Avenue Supermarts (DMart)", category: "Retail", price: 0, priceopen: 0, high: 0, low: 0, volume: 0, 
    change: 0, changepct: 0, low52: 0, high52: 0, eps: 0, pe: 0, marketcap: 0, datadelay: 0, tradetime: null},

  { symbol: "TRENT", name: "Trent (Westside, Zudio)", category: "Retail", price: 0, priceopen: 0, high: 0, low: 0, volume: 0, 
    change: 0, changepct: 0, low52: 0, high52: 0, eps: 0, pe: 0, marketcap: 0, datadelay: 0, tradetime: null},
];

module.exports = companies;
