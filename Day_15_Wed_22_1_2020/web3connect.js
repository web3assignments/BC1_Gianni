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
}
f();