function log(logstr) {
	document.getElementById("log").innerHTML +=logstr+"\n";
}
const hash = '0x16935a8175A01Ff4d50cf90Aa3AF212B8fe9485B';
const ContractABI = [{"constant":true,"inputs":[],"name":"amountOfDonator","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"people","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"amountOfDonations","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"_id","type":"address"}],"name":"registrationStatus","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"contractBalance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"donator","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"removeDonator","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"donate","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[],"name":"addDonator","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":true,"stateMutability":"payable","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"","type":"address"}],"name":"newPerson","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"","type":"address"}],"name":"losePerson","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"","type":"address"}],"name":"donated","type":"event"}];

async function f() {                     
	const web3Connect = new Web3Connect.Core({
		network: "mainnet", // optional
		providerOptions: {
			walletconnect: {
				package: WalletConnectProvider,
					options: { infuraId: "0" } // dummy infura code!!
			}
		}
	});
	web3Connect.toggleModal();
	web3Connect.on("connect", OnConnect);
}        
async function OnConnect(provider) {
	const web3 = new Web3(provider); // add provider to web3
	var userAddress=await web3.eth.getAccounts().catch(log);
	log(`Here are the accounts: ${JSON.stringify(userAddress)}`);
	web3.eth.getBlockNumber().then(console.log);
	web3.eth.getTransactionFromBlock(hash, 2).then(console.log);
}
f();

    const ContractAddress = '0x16935a8175A01Ff4d50cf90Aa3AF212B8fe9485B';
	const ContractDonator = new web3.eth.Contract(ContractABI, ContractAddress);
	
    async function addDonator() {
    	var result = await ContractDonator.methods.addDonator().send({from: `${userAddress}`});
    	if (result) {
       			 log(`You're on the donator list now!'`);
    		} else {
       			 log(`please try again to join the list`);
    		}
		}

		async function removeDonator() {
			var result = await ContractDonator.methods.removeDonator().send({from: `${userAddress}`});
			if (result) {
						log(`You have been removed from the donator list'`);
				} else {
						log(`please try again to leave the list`);
				}
			}

			async function amountDonators() {
				var result = await ContractDonator.methods.amountOfDonator().call(`${userAddress}`);
				log('There are ${result} donators');
				}
			
			async function registrationStatus() {
				var result = await ContractDonator.methods.registrationStatus().call(`${userAddress}`);
				log('You are registered');
				}
			
			async function Donate() {
				var result = await ContractDonator.methods.donate().send({from: `${userAddress}`});
			    	if (result) {
						log(`You have donated!`);
						} else {
						log(`please try again`);
						}
				}

			async function contractBalance() {
				var result = await ContractDonator.methods.contractBalance().call();
				log('This contract has ${result} eth.');
				}
			
