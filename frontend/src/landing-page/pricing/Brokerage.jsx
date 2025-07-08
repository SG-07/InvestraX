function Brokerage() {
  return (
    <div className="max-w-7xl mx-auto px-10 mt-16 mb-16">
      <div className="flex flex-wrap -mx-4 items-start">
        {/* Tag Line */}
        <div className="w-full px-4 mt-5">
          <h1 className="text-base text-center md:text-3xl font-semibold text-gray-900 mb-10">
            Charges explained
          </h1>
        </div>

        {/* Left Column */}
        <div className="w-full md:w-1/2 px-4 mt-5">
          <h2 className="text-xl font-semibold text-gray-700 mt-6 mb-2">
            Securities/Commodities transaction tax
          </h2>
          <p className="text-sm font-medium text-gray-500 mb-6">
            Tax by the government when transacting on the exchanges. Charged as
            above on both buy and sell sides when trading equity delivery.
            Charged only on selling side when trading intraday or on F&O.
            <br />
            <br />
            When trading at Zerodha, STT/CTT can be a lot more than the
            brokerage we charge. Important to keep a tab.
          </p>

          <h2 className="text-xl font-semibold text-gray-700 mt-4 mb-2">
            Transaction/Turnover Charges
          </h2>
          <p className="text-sm font-medium text-gray-500 mb-6">
            Charged by exchanges (NSE, BSE, MCX) on the value of your
            transactions.
            <br />
            <br />
            BSE has revised transaction charges in XC, XD, XT, Z and ZP groups
            to ₹10,000 per crore w.e.f 01.01.2016. (XC and XD groups have been
            merged into a new group X w.e.f 01.12.2017)
            <br />
            <br />
            BSE has revised transaction charges in SS and ST groups to ₹1,00,000
            per crore of gross turnover.
            <br />
            <br />
            BSE has revised transaction charges for group A, B and other
            non-exclusive scrips at ₹375 per crore of turnover on flat rate
            basis w.e.f. December 1, 2022.
            <br />
            <br />
            BSE has revised transaction charges in M, MT, TS and MS groups to
            ₹275 per crore of gross turnover.
          </p>

          <h2 className="text-xl font-semibold text-gray-700 mt-4 mb-2">
            Call & trade
          </h2>
          <p className="text-sm font-medium text-gray-500 mb-6">
            Additional charges of ₹50 per order for orders placed through a
            dealer at Zerodha including auto square off orders.
          </p>

          <h2 className="text-xl font-semibold text-gray-700 mt-4 mb-2">
            Stamp charges
          </h2>
          <p className="text-sm font-medium text-gray-500 mb-6">
            Stamp charges by the Government of India as per the Indian Stamp Act
            of 1899 for transacting in instruments on the stock exchanges and
            depositories.
          </p>

          <h2 className="text-xl font-semibold text-gray-700 mt-6 mb-2">
            NRI brokerage charges
          </h2>
          <ul className="list-disc list-inside space-y-2 text-gray-500 text-sm font-medium mb-6">
            <li>₹100 per order for futures and options.</li>
            <li>
              For a non-PIS account, 0.5% or ₹100 per executed order for equity
              (whichever is lower).
            </li>
            <li>
              For a PIS account, 0.5% or ₹200 per executed order for equity
              (whichever is lower).
            </li>
            <li>₹500 + GST as yearly account maintenance charges (AMC).</li>
          </ul>

          <h2 className="text-xl font-semibold text-gray-700 mt-4 mb-2">
            Account with debit balance
          </h2>
          <p className="text-sm font-medium text-gray-500 mb-6">
            If the account is in debit balance, any order placed will be charged
            ₹40 per executed order instead of ₹20 per executed order.
          </p>

          <h2 className="text-xl font-semibold text-gray-700 mt-6 mb-2">
            Charges for Investor's Protection Fund Trust (IPFT) by NSE
          </h2>
          <ul className="list-disc list-inside space-y-2 text-gray-500 text-sm font-medium mb-6">
            <li>
              Equity and Futures - ₹10 per crore + GST of the traded value.
            </li>
            <li>Options - ₹50 per crore + GST traded value (premium value).</li>
            <li>
              Currency - ₹0.05 per lakh + GST of turnover for Futures and ₹2 per
              lakh + GST of premium for Options.
            </li>
          </ul>

          <h2 className="text-xl font-semibold text-gray-700 mt-6 mb-2">
            Margin Trading Facility (MTF)
          </h2>
          <ul className="list-disc list-inside space-y-2 text-gray-500 text-sm font-medium mb-6">
            <li>
              MTF Interest: 0.04% per day (₹40 per lakh) on the funded amount.
            </li>
            <li>
              MTF Brokerage: 0.3% or ₹20/executed order, whichever is lower.
            </li>
            <li>
              MTF pledge charge: ₹15 + GST per pledge and unpledge request per
              ISIN.
            </li>
          </ul>
        </div>

        {/* Right Column */}
        <div className="w-full md:w-1/2 px-4 mt-5">
          {[
            {
              title: "GST",
              content:
                "Tax levied by the government on the services rendered. 18% of (brokerage + SEBI charges + transaction charges)",
            },
            {
              title: "SEBI Charges",
              content:
                "Charged at ₹10 per crore + GST by Securities and Exchange Board of India for regulating the markets.",
            },
            {
              title: "DP (Depository participant) charges",
              content:
                "₹15.34 per scrip (₹3.5 CDSL fee + ₹9.5 Zerodha fee + ₹2.34 GST) is charged when stocks are sold, irrespective of quantity.\n\nFemale demat account holders (as first holder) will enjoy a discount of ₹0.25 per transaction on the CDSL fee.\n\nDebit transactions of mutual funds & bonds get an additional discount of ₹0.25 on the CDSL fee.",
            },
            {
              title: "Pledging charges",
              content: "₹30 + GST per pledge request per ISIN.",
            },
            {
              title: "AMC (Account maintenance charges)",
              content:
                "For BSDA demat account: Zero charges if the holding value is less than ₹4,00,000.\n\nFor non-BSDA demat accounts: ₹300/year + 18% GST charged quarterly (90 days).",
            },
            {
              title: "Corporate action order charges",
              content:
                "₹20 plus GST will be charged for OFS / buyback / takeover / delisting orders placed through Console.",
            },
            {
              title: "Off-market transfer charges",
              content: "₹25 per transaction.",
            },
            {
              title: "Physical CMR request",
              content:
                "First CMR request is free. ₹20 + ₹100 (courier charge) + 18% GST for subsequent requests.",
            },
            {
              title: "Payment gateway charges",
              content: "₹9 + GST (Not levied on transfers done via UPI)",
            },
            {
              title: "Delayed Payment Charges",
              content:
                "Interest is levied at 18% a year or 0.05% per day on the debit balance in your trading account.",
            },
          ].map(({ title, content }, index) => (
            <div key={index}>
              <h2 className="text-xl font-semibold text-gray-700 mt-4 mb-2">
                {title}
              </h2>
              <p
                className="text-sm font-medium text-gray-500 mb-6"
                dangerouslySetInnerHTML={{
                  __html: content.replace(/\n/g, "<br />"),
                }}
              />
            </div>
          ))}

          <h2 className="text-xl font-semibold text-gray-700 mt-6 mb-2">
            Trading using 3-in-1 account with block functionality
          </h2>
          <ul className="list-disc list-inside space-y-2 text-gray-500 text-sm font-medium mb-6">
            <li>Delivery & MTF Brokerage: 0.5% per executed order.</li>
            <li>Intraday Brokerage: 0.05% per executed order.</li>
          </ul>
        </div>
      </div>
      <h2 className="text-xl font-semibold text-gray-700 mt-6 mb-2">
        Disclaimer
      </h2>
      <p className="text-sm font-medium text-gray-500 mb-6">
        For Delivery based trades, a minimum of ₹0.01 will be charged
        per contract note. Clients who opt to receive physical contract notes
        will be charged ₹20 per contract note plus courier charges. Brokerage
        will not exceed the rates specified by SEBI and the exchanges. All
        statutory and regulatory charges will be levied at actuals. Brokerage is
        also charged on expired, exercised, and assigned options contracts. Free
        investments are available only for our retail individual clients.
        Companies, Partnerships, Trusts, and HUFs need to pay 0.1% or ₹20
        (whichever is less) as delivery brokerage. A brokerage of 0.25% of the
        contract value will be charged for contracts where physical delivery
        happens. For netted off positions in physically settled contracts, a
        brokerage of 0.1% will be charged.
      </p>
    </div>
  );
}

export default Brokerage;
