const mongoose = require("mongoose");

const stockSchema = new mongoose.Schema(
  {
    symbol: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    category: { type: String },
    price: { type: Number, required: true },       
    priceopen: { type: Number },                   
    high: { type: Number },                        
    low: { type: Number },                         
    volume: { type: Number },                      
    datadelay: { type: Number },                   
    tradetime: { type: Date },                     
    change: { type: Number },                      
    changepct: { type: Number },                   
    low52: { type: Number },                       
    high52: { type: Number },                      
    eps: { type: Number },                         
    pe: { type: Number },                          
    marketcap: { type: Number },                   
  },
  { timestamps: true }
);

module.exports = stockSchema;
