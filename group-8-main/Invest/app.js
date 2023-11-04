document.addEventListener("DOMContentLoaded", function () {
    const connectButton = document.getElementById("connectButton");
    const selectedAccountSpan = document.getElementById("selectedAccount");
    const accountBalanceSpan = document.getElementById("accountBalance");

    let web3;

    connectButton.addEventListener("click", async () => {
        if (typeof window.ethereum !== "undefined") {
            try {
                // Request user account access
                await window.ethereum.request({ method: "eth_requestAccounts" });

                // Initialize Web3.js with the current provider
                web3 = new Web3(window.ethereum);

                // Get the selected account
                const accounts = await web3.eth.getAccounts();
                const selectedAccount = accounts[0];

                if (selectedAccount) {
                    selectedAccountSpan.textContent = selectedAccount;

                    // Get the account balance in Ether
                    const balanceWei = await web3.eth.getBalance(selectedAccount);
                    const balanceEther = web3.utils.fromWei(balanceWei, "ether");
                    accountBalanceSpan.textContent = balanceEther + " ETH";
                } else {
                    selectedAccountSpan.textContent = "No account selected";
                    accountBalanceSpan.textContent = "";
                }
            } catch (error) {
                console.error("Error connecting to Ganache:", error);
                selectedAccountSpan.textContent = "Connection Error";
                accountBalanceSpan.textContent = "";
            }
        } else {
            selectedAccountSpan.textContent = "Web3 not detected. Please install MetaMask or a similar extension.";
            accountBalanceSpan.textContent = "";
        }
    });
});
