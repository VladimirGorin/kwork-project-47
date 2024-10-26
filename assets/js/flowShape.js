'use strict';
const dataPoints = [];

fetch('https://min-api.cryptocompare.com/data/v2/histohour?fsym=BTC&tsym=USD&limit=24&api_key=b211bf64bb702b6ee7ea46d5b6bb729fc523710d625cfa330f209339b25dcede')
  .then(resp => {
    return resp.json()
  })
  .then(data => {
    const hourData = data.Data.Data;
    for(let i = 0; i < hourData.length; i++) {
      dataPoints.push({x: new Date(moment.unix(hourData[i].time)), y: Number(hourData[i].close)});
    }
  })
  .then(() => {
    const stockChart = new CanvasJS.StockChart("bitcoinChart", {
      theme: "light2",
      rangeSelector: {
        enabled: false
      },
      charts: [{
        axisX: {
          title: "",
          labelFormatter: function(e) {
            return "";
          }
        },
        axisY: {
          title: "",
          labelFormatter: function(e) {
            return "";
          }
        },
        zoomEnabled: false,
        data: [{
          type: "line",
          yValueFormatString: "$#,###.##",
          xValueFormatString: "HH:mm",
          dataPoints: dataPoints
        }]
      }],
      navigator: {
        enabled: false
      }
    });
    stockChart.render();
  })


fetch('https://api.blockchain.com/v3/exchange/tickers/BTC-USD')
  .then((resp) => resp.json())
  .then(function (data) {
    let price = data["price_24h"]
    let lastTradePrice = data["last_trade_price"]
    let dropPercentage = (100*(lastTradePrice-price)/price).toFixed(2)
    document.getElementById('pricePercentage').innerHTML = `$${price} <span class="${dropPercentage > 0 ? 'green' : 'red'}">${dropPercentage > 0 ? '+' : ''}${dropPercentage}%</span>`
  })
  .catch(function (error) {
    console.log(error);
  });

fetch('https://min-api.cryptocompare.com/data/blockchain/latest?fsym=BTC&api_key=b211bf64bb702b6ee7ea46d5b6bb729fc523710d625cfa330f209339b25dcede')
  .then(resp => resp.json())
  .then(data => {
    document.getElementById('transactionsCont').innerHTML = data.Data['transaction_count'].toLocaleString().replace(/,/g, ' ');
    document.getElementById('uniqueAddresses').innerHTML = data.Data['new_addresses'].toLocaleString().replace(/,/g, ' ');
    document.getElementById('sentToday').innerHTML = '$ ' + data.Data['average_transaction_value'].toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    document.getElementById('blockSize').innerHTML = data.Data['block_size'] / 1000 + ' GB';
    document.getElementById('hashRate').innerHTML = (data.Data.hashrate / 1000000).toFixed(2) + ' EH/s';
  })