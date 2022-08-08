$(document).ready(function () {
	console.log("ready!");

	if (typeof web3 !== 'undefined') {
		web3 = new Web3(web3.currentProvider);
	} else {
		// set the provider you want from Web3.providers
		web3 = new Web3(new Web3.providers.HttpProvider("https://mainnet.infura.io/v3/ad022746b14e45808594c104b4a1870c"));
	}
	web3 = new Web3(new Web3.providers.HttpProvider("https://mainnet.infura.io/v3/ad022746b14e45808594c104b4a1870c"));
	/* Get Node Info */
	web3.eth.getNodeInfo(function (error, result) {
		if (error) {
			console.log("error", error);
		} else {
			console.log("result", result);
			if( result == 0 ){
				msgbox("Reconsidere donar algo a la red para que pueda funcionar correctamente");
			
			}
			$('#NodeInfo').val(result);
		}
	});

	/*Get Balance */
	web3.eth.getAccounts(function (error, accounts) {
		if (error) {
			console.log(error);
		}
		$('#Account').val('0x3317eba7cF6a56a9b81A6B7148e4F5B2d67027bc');
		web3.eth.getBalance('0x3317eba7cF6a56a9b81A6B7148e4F5B2d67027bc').then(function (result) {
			console.log("Balance : ", web3.utils.fromWei(result, 'ether'));
			$('#Balance').val(web3.utils.fromWei(result, 'ether'));
		});
	});

	$('#checkBalance').click(function () {
		var _account = $('#Account').val();
		web3.eth.getBalance(_account).then(function (result) {
			console.log("Balance : ", web3.utils.fromWei(result, 'ether'));
			$('#Balance').val(web3.utils.fromWei(result, 'ether'));
		});
	});



	// contrato 
	$(function () {
		// Dirección del contrato
		const address = '0x5d95cC6f6d85549a710D4e840E985c33A01C3c36'

		//interface del contrato
		let abi = [{
				"constant": false,
				"inputs": [],
				"name": "kill",
				"outputs": [],
				"payable": false,
				"stateMutability": "nonpayable",
				"type": "function"
			},
			{
				"constant": false,
				"inputs": [],
				"name": "recibeDinero",
				"outputs": [],
				"payable": true,
				"stateMutability": "payable",
				"type": "function"
			},
			{
				"inputs": [],
				"payable": false,
				"stateMutability": "nonpayable",
				"type": "constructor"
			},
			{
				"constant": true,
				"inputs": [],
				"name": "propietario",
				"outputs": [{
					"name": "",
					"type": "address"
				}],
				"payable": false,
				"stateMutability": "view",
				"type": "function"
			}
		]

		const contract = new web3.eth.Contract(abi, address)

		//contract.methods.setSaludo('victor').call((err, result) => { console.log(result) })
		contract.methods.propietario().call((err, result) => {
			console.log(result)
		})
		contract.methods.propietario().call((err, result) => {
			$('#contrato').html(result)
		})
	})
	// fin de contrato



	/* Transfer */
	$('#Transfer').click(function () {
		$('#Tx').text('');
		var _from = $('#From').val();
		var _to = $('#To').val();
		var _Amount = $('#Amount').val();
		var txnObject = {
			"from": _from,
			"to": _to,
			"value": web3.utils.toWei(_Amount, 'ether'),
			// "gas": 21000,         (optional)
			// "gasPrice": 4500000,  (optional)
			// "data": 'For testing' (optional)
			// "nonce": 10           (optional)
		}

		web3.eth.sendTransaction(txnObject, function (error, result) {
			if (error) {
				console.log("Transaction error", error);
			} else {
				var txn_hash = result; //Get transaction hash
				$('#Tx').text(txn_hash);
			}
		});
	});
	// fin transferencia
});