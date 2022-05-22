import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";

const TvChart = ({ symbol = "AAPL" }) => {
  const useScript = (url) => {
    useEffect(() => {
      const script = document.createElement("script");

      script.src = url;
      script.async = true;

      document.body.appendChild(script);


      return () => {
        document.body.removeChild(script);
      };
    }, [url]);
  };

  return (
    <div className="tradingview-widget-container">
      {useScript("https://s3.tradingview.com/tv.js")}
      <div id="tradingview_2d7e4"></div>
      <div className="tradingview-widget-copyright">
        <a
          href="https://www.tradingview.com/symbols/NASDAQ-AAPL/"
          rel="noopener"
          target="_blank"
        ></a>
      </div>
      <Helmet>
        <script type="text/javascript">
          {`
            new window.TradingView.widget({
                "width": 400,
                "height": 400,
                "symbol": \`${symbol}\`,
                "interval": "D",
                "timezone": "Etc/UTC",
                "theme": "dark",
                "style": "1",
                "locale": "en",
                "toolbar_bg": "#f1f3f6",
                "enable_publishing": false,
                "allow_symbol_change": true,
                "container_id": "tradingview_2d7e4"
            })
        `}
        </script>
      </Helmet>
    </div>
  );
};

export default TvChart;
