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
    button.addEventListener('click', () => dialog.showModal());
  });
  document.getElementById('checkout-close').addEventListener('click', () => dialog.close());
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
  document.getElementById('payment-recipient').textContent = recipient;
  document.getElementById('payment-recipient-note').textContent = window.DATING_MEMBERSHIP.recipientNote || '';
  document.getElementById('payment-order').textContent = order;
  document.getElementById('payment-wallet').href = paymentURL;
  document.getElementById('payment-link').value = paymentURL;
  document.getElementById('membership-availability').textContent = 'One payment. Membership confirmed manually.';
  document.getElementById('payment-receipt').href = 'mailto:datingrelatingdotcom@gmail.com?' + new URLSearchParams({
    subject: 'Lifetime membership · ' + order,
    body: 'Hello! Please verify my 1 SOL lifetime membership payment.\n\nOrder: ' + order + '\nReceiving wallet: ' + recipient + '\nTransaction signature or explorer link: \nMy profile or social link: \n'
  }).toString().replace(/\+/g, '%20');
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
