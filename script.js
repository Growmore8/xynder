// Event listeners for payment buttons
document.getElementById('localPaymentBtn').addEventListener('click', function() {
  console.log("Local Payment Button Clicked");

  // Show Local Payment and hide Crypto Payment
  document.getElementById('localPayment').style.display = 'block';
  document.getElementById('cryptoPayment').style.display = 'none';

  // Call the function to load merchants when Local Payment is selected
  loadMerchants();
});

document.getElementById('cryptoPaymentBtn').addEventListener('click', function() {
  console.log("Crypto Payment Button Clicked");

  // Show Crypto Payment and hide Local Payment
  document.getElementById('cryptoPayment').style.display = 'block';
  document.getElementById('localPayment').style.display = 'none';

  // Call the function to load crypto payment methods when Crypto Payment is selected
  loadCryptoPayment();
});

// Function to load merchants into the Local Payment section
function loadMerchants() {
  const merchants = [
    { name: 'Instant Crypto', accountName: 'Manoj Kumar', bankName: 'KOTAK MAHINDRA BANK', accountNumber: '9914866481', ifscCode: 'KKBK0008785', branch: 'TIRUPPUR', status: 'online', completion: 75, limit: 100000, lastSeen: '10 mins ago' },
    { name: 'Rich Trader', accountName: 'Auromaaknits', bankName: 'Karur Vysya Bank', accountNumber: '1235135000036210', ifscCode: 'KVBL0001235', branch: 'TIRUPPUR - P.N ROAD', status: 'online', completion: 80, limit: 100000, lastSeen: '30 mins ago' },
    { name: 'Crypto_Tamizan', accountName: 'KARKKI M', bankName: 'Tamilnad Mercantile Bank', accountNumber: '462100050302840', ifscCode: 'TMBL0000462', branch: 'ANTHIYUR', status: 'offline', completion: 60, limit: 4000, lastSeen: '1 day ago' },
    { name: 'GTC_Trader', accountName: 'G Shobana', bankName: 'Indian Overseas Bank', accountNumber: '340501000008911', ifscCode: 'IOBA0003405', branch: 'Thirumurugan poondi', status: 'offline', completion: 50, limit: 3000, lastSeen: '2 hours ago' },
    { name: 'Click2Buy', accountName: 'G Shobana', bankName: 'Development Credit Bank', accountNumber: '40914700000888', ifscCode: 'DCBL0000409', branch: 'Tiruppur', status: 'offline', completion: 60, limit: 5000, lastSeen: '3 hours ago' },
    { name: 'Royal_Exchange', accountName: 'Santhi', bankName: 'ICICI Bank', accountNumber: '621401501259', ifscCode: 'ICIC0006214', branch: 'Thirumurugan poondi', status: 'offline', completion: 70, limit: 7000, lastSeen: '5 hours ago' },
    { name: 'Crypto TopUp', accountName: 'Santhi', bankName: 'State bank of india', accountNumber: '20317009029', ifscCode: 'SBIN0003302', branch: 'Singanallur', status: 'offline', completion: 55, limit: 4500, lastSeen: '2 hours ago' },
    { name: 'SAI EXCHANGE', accountName: 'S. VASUDEVAN', bankName: 'Canara Bank', accountNumber: '1214101072546', ifscCode: 'CNRB0001214', branch: 'Perambalur', status: 'offline', completion: 40, limit: 2500, lastSeen: '1 day ago' },
    { name: 'Instant Crypto', accountName: 'CHITRA', bankName: 'HDFC BANK', accountNumber: '50100592901458', ifscCode: 'HDFC0002408', branch: 'Tiruppur', status: 'online', completion: 90, limit: 100000, lastSeen: '5 mins ago' }
  ];

  const merchantGrid = document.getElementById('merchantGrid');
  merchantGrid.innerHTML = ''; // Clear any previous content

  // Sort merchants to show online first, then offline
  merchants.sort((a, b) => (a.status === 'online' ? -1 : 1));

  // Populate the grid with merchant information
  merchants.forEach(merchant => {
    const merchantCard = document.createElement('div');
    merchantCard.classList.add('merchant-card', merchant.status);

    // Only show "Pay Now" button for online merchants
    const payNowButton = merchant.status === 'online' ? `<button class="pay-now" onclick="showMerchantDetails('${merchant.name}', '${merchant.accountNumber}', '${merchant.accountName}', '${merchant.bankName}', '${merchant.branch}', '${merchant.ifscCode}', '${merchant.lastSeen}', ${merchant.completion}, ${merchant.limit})">Pay Now</button>` : '';

    // Format the limit with commas (INR format)
    const formattedLimit = '₹' + merchant.limit.toLocaleString();

    merchantCard.innerHTML = `
      <h3>${merchant.name}</h3>
      <p class="status ${merchant.status}">${merchant.status.charAt(0).toUpperCase() + merchant.status.slice(1)}</p>
      <p class="completion">Completion: ${merchant.completion}%</p>
      <p class="limit">Limit: ${formattedLimit}</p>
      ${payNowButton}
    `;

    merchantGrid.appendChild(merchantCard);
  });
}


// Function to show merchant details in the modal for Local Payment
function showMerchantDetails(name, accountNumber, accountName, bankName, branch, ifscCode, lastSeen, completion, limit) {
  const modal = document.getElementById('myModal');
  const merchantDetails = document.getElementById('merchantDetails');

  // Format the limit with commas (INR format)
  const formattedLimit = '₹' + limit.toLocaleString();

  merchantDetails.innerHTML = `
    <p><strong>Merchant Name:</strong> ${name}</p>
    <p><strong>Account Number:</strong> ${accountNumber} <span class="copy-icon" onclick="copyText('${accountNumber}')">📋</span></p>
    <p><strong>Account Name:</strong> ${accountName} <span class="copy-icon" onclick="copyText('${accountName}')">📋</span></p>
    <p><strong>Bank Name:</strong> ${bankName} <span class="copy-icon" onclick="copyText('${bankName}')">📋</span></p>
    <p><strong>Branch Name:</strong> ${branch} <span class="copy-icon" onclick="copyText('${branch}')">📋</span></p>
    <p><strong>IFSC Code:</strong> ${ifscCode} <span class="copy-icon" onclick="copyText('${ifscCode}')">📋</span></p>
    <p><strong>Last Seen:</strong> ${lastSeen}</p>
    <p><strong>Completion:</strong> ${completion}%</p>
    <p><strong>Limit:</strong> ${formattedLimit}</p>
  `;

  modal.style.display = 'block';
}

// Function to show crypto payment details in the modal
function showCryptoDetails(cryptoType, cryptoAddress) {
  const modal = document.getElementById('cryptoModal');
  const cryptoDetails = document.getElementById('cryptoDetails');

  // Generate QR code for the given crypto address using an external API
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?data=${cryptoAddress}&size=200x200`;

  // Update the modal content with the crypto type, address, and QR code
  cryptoDetails.innerHTML = `
    <p><strong>Crypto Type:</strong> ${cryptoType}</p>
    <p><strong>Address:</strong> ${cryptoAddress} <span class="copy-icon" onclick="copyText('${cryptoAddress}')">📋</span></p>
    <img src="${qrUrl}" alt="QR Code">
  `;

  // Display the modal
  modal.style.display = 'block';
}

// Function to load crypto payment options into the Crypto Payment section
function loadCryptoPayment() {
  const cryptoGrid = document.getElementById('cryptoGrid');
  cryptoGrid.innerHTML = ''; // Clear any previous content

  const cryptoMethods = [
    { type: 'Ethereum (ERC20)', address: '0x3e78badf987a3cc50edd13954dc71a327b0a7a82', icon: 'assets/et.png' },
    { type: 'BNB Smart Chain (BEP20)', address: 'TKVgCg6x4qP4LXFcqVF9Q2AUHYLFsZLKv6', icon: 'assets/bep.png' },
    { type: 'Tron (TRC20)', address: '0x3e78badf987a3cc50edd13954dc71a327b0a7a82', icon: 'assets/trc.png' }
  ];

  // Populate the grid with crypto payment options
  cryptoMethods.forEach(crypto => {
    const cryptoCard = document.createElement('div');
    cryptoCard.classList.add('crypto-card');

    // Add icon, then crypto type below the icon, and Pay Now button
    cryptoCard.innerHTML = `
      <div style="text-align: center;">
        <img src="${crypto.icon}" alt="${crypto.type} Icon" style="width: 50px; margin-bottom: 10px;">
        <h4>${crypto.type}</h4> <!-- Display crypto type below the icon -->
        <button class="pay-now" onclick="showCryptoDetails('${crypto.type}', '${crypto.address}')">Pay Now</button>
      </div>
    `;

    cryptoGrid.appendChild(cryptoCard);
  });
}

// Function to copy text to the clipboard
function copyText(text) {
  const tempInput = document.createElement("input");
  tempInput.value = text;
  document.body.appendChild(tempInput);
  tempInput.select();
  document.execCommand("copy");
  document.body.removeChild(tempInput);
  alert("Copied to clipboard!");
}

// Close modal when the user clicks the close button
document.querySelectorAll('.close').forEach(closeButton => {
  closeButton.addEventListener('click', function() {
    closeModal();
  });
});

// Close modal if the user clicks outside the modal content
window.onclick = function(event) {
  if (event.target === document.getElementById('myModal') || event.target === document.getElementById('cryptoModal')) {
    closeModal();
  }
};

// Function to close the modal
function closeModal() {
  document.getElementById('myModal').style.display = 'none';
  document.getElementById('cryptoModal').style.display = 'none';
}
