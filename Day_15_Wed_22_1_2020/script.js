function log(logstr) {
	document.getElementById("log").innerHTML +=logstr+"\n";
}

Web3 = new Web3(Web3.givenProvider);
web3.extend({ // web3.eth.requestAccounts() isn't available (yet)
	methods: [{
		name: 'eth_requestAccounts',
		call: 'eth_requestAccounts',
		params: 0
	}]
}); 

const ContractABI = [
	{
		"constant":true,"inputs":[],"name":"amountOfDonator","outputs":[
			{
				"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"people","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"amountOfDonations","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"_id","type":"address"}],"name":"registrationStatus","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"contractBalance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"donator","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"removeDonator","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"donate","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[],"name":"addDonator","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":true,"stateMutability":"payable","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"","type":"address"}],"name":"newPerson","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"","type":"address"}],"name":"losePerson","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"","type":"address"}],"name":"donated","type":"event"}];

    const ContractAddress = "0x2c5749ec175F9b9E3106B22982291c779AB294b5";
    const ContractDonator = new web3.eth.Contract(ContractABI, ContractAddress);
    
    async function addDonator() {
		Web3 = new Web3(Web3.givenProvider);
		web3.extend({ // web3.eth.requestAccounts() isn't available (yet)
			methods: [{
				name: 'eth_requestAccounts',
				call: 'eth_requestAccounts',
				params: 0
			}]
		}); 
        var userAddress = await web3.eth_requestAccounts().catch(x=>log(x.message));
    	var result = await ContractDonator.methods.addDonator().send({from: `${userAddress}`});
    	if (result) {
       			 log(`You're an donator now!'`);
    		} else {
       			 log(`please try again`);
    		}
		}

		async function removeDonator() {
			Web3 = new Web3(Web3.givenProvider);
			web3.extend({ // web3.eth.requestAccounts() isn't available (yet)
				methods: [{
					name: 'eth_requestAccounts',
					call: 'eth_requestAccounts',
					params: 0
				}]
			}); 
			var userAddress = await web3.eth_requestAccounts().catch(x=>log(x.message));
			var result = await ContractDonator.methods.removeDonator().send({from: `${userAddress}`});
			if (result) {
						log(`You have been removed from the donator list'`);
				} else {
						log(`please try again`);
				}
			}

			async function amountDonators() {
				Web3 = new Web3(Web3.givenProvider);
				var result = await ContractDonator.methods.amountOfDonator().call();
				log('There are ${result} donators');
				}
			
			async function registrationStatus() {
				Web3 = new Web3(Web3.givenProvider);
				var result = await ContractDonator.methods.registrationStatus().call();
				log('You are registered');
				}
			
			async function Donate() {
				Web3 = new Web3(Web3.givenProvider);
				web3.extend({ // web3.eth.requestAccounts() isn't available (yet)
					methods: [{
						name: 'eth_requestAccounts',
						call: 'eth_requestAccounts',
						params: 0
					}]
				}); 
				var userAddress = await web3.eth_requestAccounts().catch(x=>log(x.message));
				var result = await ContractDonator.methods.donate().send({from: `${userAddress}`});
			    	if (result) {
						log(`You have donated!`);
						} else {
						log(`please try again`);
						}
				}

			async function contractBalance() {
				Web3 = new Web3(Web3.givenProvider);
				var result = await ContractDonator.methods.contractBalance().call();
				log('This contract has ${result} eth.');
				}

				async function web3connection() {
					const web3Connect = new Web3Connect.Core({
						network: "mainnet",
						providerOptions: {
							walletconnect: {
								package: WalletConnectProvider,
									options: { infuraId: "0" }
							}
						}
					});
					web3Connect.toggleModal();
					web3Connect.on("connect", OnConnect);
				}
				
				async function OnConnect(provider) {
					const web3 = new Web3(provider);
					var acts=await web3.eth.getAccounts().catch(log);
					log(`Here are the accounts: ${JSON.stringify(acts)}`);
				}
				
				web3connection();
			
