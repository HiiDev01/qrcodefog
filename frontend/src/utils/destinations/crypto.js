const COINS = {
  bitcoin: { label: 'Bitcoin (BTC)', scheme: 'bitcoin', amountKey: 'amount' },
  ethereum: { label: 'Ethereum (ETH)', scheme: 'ethereum', amountKey: 'value' },
  litecoin: { label: 'Litecoin (LTC)', scheme: 'litecoin', amountKey: 'amount' },
  dogecoin: { label: 'Dogecoin (DOGE)', scheme: 'dogecoin', amountKey: 'amount' },
};

export default {
  id: 'crypto', label: 'Cryptocurrency', icon: 'Bitcoin',
  initial: { coin: 'bitcoin', address: '', amount: '' },
  fields: [
    { name: 'coin', label: 'Cryptocurrency', type: 'select',
      options: Object.entries(COINS).map(([k, v]) => [k, v.label]) },
    { name: 'address', label: 'Wallet address', placeholder: 'Paste wallet address' },
    { name: 'amount', label: 'Amount (optional)', placeholder: '0.01' },
  ],
  validate: (d) => ({
    ...(!/^[A-Za-z0-9]{20,100}$/.test(d.address.trim()) ? { address: 'Enter a valid wallet address.' } : {}),
    ...(d.amount.trim() && !(Number(d.amount) > 0) ? { amount: 'Amount must be a positive number.' } : {}),
  }),
  build: (d) => {
    const c = COINS[d.coin];
    let uri = `${c.scheme}:${d.address.trim()}`;
    if (d.amount.trim()) {
      // Ethereum URIs (EIP-681) use wei; the others use the coin amount.
      const val = d.coin === 'ethereum'
        ? (BigInt(Math.round(Number(d.amount) * 1e6)) * 10n ** 12n).toString()
        : String(Number(d.amount));
      uri += `?${c.amountKey}=${val}`;
    }
    return uri;
  },
};
