(function () {
  'use strict';
  const dialog = document.getElementById('membership-checkout');
  const status = document.getElementById('payment-status');
  const recipient = (window.DATING_MEMBERSHIP?.recipient || '').trim();

  function validAddress(address) {
    if (!/^[1-9A-HJ-NP-Za-km-z]{32,44}$/.test(address)) return false;
    const alphabet = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz';
    let value = 0n;
    for (const character of address) value = value * 58n + BigInt(alphabet.indexOf(character));
    let bytes = 0;
    while (value > 0n) { bytes++; value >>= 8n; }
    return bytes + (address.match(/^1*/)[0].length) === 32;
  }

  const ready = validAddress(recipient);
  document.querySelectorAll('[data-membership-open]').forEach((button) => {
    button.hidden = false;
    button.addEventListener('click', () => {
      dialog.showModal();
      document.body.classList.add('checkout-open');
    });
  });
  document.getElementById('checkout-close').addEventListener('click', () => dialog.close());
  dialog.addEventListener('close', () => document.body.classList.remove('checkout-open'));
  if (!ready) return;

  const order = 'DR-' + crypto.randomUUID();
  const parameters = new URLSearchParams({
    amount: '1',
    label: 'DatingRelating.com',
    message: 'Lifetime membership — Solana Breakpoint special',
    memo: order
  });
  const paymentURL = 'solana:' + recipient + '?' + parameters.toString();
  document.getElementById('payment-unavailable').hidden = true;
  document.getElementById('payment-ready').hidden = false;
  document.getElementById('payment-recipient').value = recipient;
  // Encode the address itself, so any wallet scanner can use it. Amount is entered by the payer.
  try {
    const qr = qrcode(0, 'M');
    qr.addData(recipient, 'Byte');
    qr.make();
    document.getElementById('payment-qr').innerHTML = qr.createSvgTag({cellSize: 4, margin: 16, scalable: true});
  } catch {
    document.querySelector('.payment-qr').hidden = true;
  }
  document.getElementById('payment-recipient-note').textContent = window.DATING_MEMBERSHIP.recipientNote || '';
  document.getElementById('payment-order').textContent = order;
  document.getElementById('payment-wallet').href = paymentURL;
  document.getElementById('payment-link').value = paymentURL;
  document.getElementById('membership-availability').textContent = 'In-person offer. Mars confirms your membership and badge.';
  document.getElementById('payment-receipt').href = 'mailto:datingrelatingdotcom@gmail.com?' + new URLSearchParams({
    subject: 'Lifetime membership · ' + order,
    body: 'Hello! Please verify my 1 SOL lifetime membership payment.\n\nOrder: ' + order + '\nReceiving wallet: ' + recipient + '\nTransaction signature or explorer link: \nMy profile or social link: \n'
  }).toString().replace(/\+/g, '%20');
  document.getElementById('address-copy').addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(recipient);
      status.textContent = 'Address copied. Send 1 SOL on Solana mainnet.';
    } catch {
      const address = document.getElementById('payment-recipient');
      address.focus(); address.select();
      status.textContent = 'Select and copy the address above. Send 1 SOL on Solana mainnet.';
    }
  });
  document.getElementById('payment-copy').addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(paymentURL);
      status.textContent = 'Payment link copied. Open it in a Solana Pay compatible wallet.';
    } catch {
      const input = document.getElementById('payment-link');
      input.focus(); input.select();
      status.textContent = 'Select and copy the payment link below.';
    }
  });
}());
