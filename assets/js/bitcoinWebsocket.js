import currencySettings from "./currencySettings.js"

console.log(currencySettings.currency)

var lastQTime = 0;

function loading(load) {
	if (load) {
		let div = document.createElement('div');
		div.style = "position: fixed;width: 100%;height: 100%;top: 0;background-color: white;left: 0;z-index: 5000;display: flex;align-items: center;justify-content: center;"
		div.id = "loader-wrapper"
		div.innerHTML = '<div class="loader" style="color:red;"></div>'
		document.body.append(div)
	} else {
		document.getElementById("loader-wrapper").remove()
	}
}

function number_format(number, decimals = 3, dec_point = ',', thousands_sep = '.') {
	var i, j, kw, kd, km;

	i = parseInt(number = (+number || 0).toFixed(decimals)) + "";

	if ((j = i.length) > 3) {
		j = j % 3;
	} else {
		j = 0;
	}

	km = (j ? i.substr(0, j) + thousands_sep : "");
	kw = i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands_sep);
	kd = (decimals ? dec_point + Math.abs(number - i).toFixed(decimals).replace(/-/, 0).slice(2) : "");

	return km + kw + kd;
}

function update_price(coin = 'BTC') {

	fetch('https://api.blockchain.com/v3/exchange/tickers/' + coin.toUpperCase() + '-USD', {
		'method': "get",
		'headers': {
			'Content-Type': 'application/json'
		},
	})
		.then((response) => {
			return response.json();
		})
		.then((data) => {
			$('#' + coin.toLowerCase() + '-box').attr('price', data.last_trade_price);
		});

	setTimeout(function () { update_price(coin); }, 1000);
}

function run_blockchain_coin(coin = 'btc') {
	update_price(coin);

	var coinDiv = $('#' + coin + '-box');
	var webSocket = $.simpleWebSocket({
		url: 'wss://ws.blockchain.info/coins',
		dataType: 'json',
		onError: function (event) {
		},
		onOpen: function (event) {
		}
	});

	webSocket.connect();
	webSocket.send({ "coin": coin, "command": "subscribe", "entity": "pending_transaction" });

	webSocket.listen(function (resp) {
		if (typeof resp.transaction !== 'undefined') {
			blockCount = $(coinDiv).find('div.inner__flex').length;

			if (($.now() > lastQTime + 1000) || (blockCount < 9)) {
				var dtm = new Date(resp.transaction.time * 1000);
				var value = 0; $.each(resp.transaction.out, function () { value = value + this.value; });
				var price = parseFloat($(coinDiv).attr('price'));
				var row = {
					"coin": resp.coin.toUpperCase(),
					"hash": resp.transaction.hash.substr(1, 5) + '-' + resp.transaction.hash.substr(-5),
					"time": dtm.toLocaleString().substr(-8),
					"value": number_format(value / 1E8, 8),
					"volume": number_format(price * value / 1E8, 2)
				};

				$(coinDiv).find('div:first-child').before('<div style="display:flex;" class="inner__flex"><button class="inner__btn">' + row.hash + '</button><p class="inner__coin">' + row.value + ' ' + row.coin + '</p><p class="inner__price">$ ' + row.volume + '</p></div>');

				if (blockCount > 10)
					$(coinDiv).find('div.inner__flex:last-child').remove();

				lastQTime = $.now();
			}

		}
	});
}
