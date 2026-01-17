'use client';

import { useState } from 'react';
import { TipLink } from '@tiplink/api';
import {
  Connection,
  SystemProgram,
  Transaction,
  LAMPORTS_PER_SOL,
  PublicKey,
} from '@solana/web3.js';

// Phantom provider interface
interface PhantomProvider {
  isPhantom: boolean;
  connect: () => Promise<{ publicKey: PublicKey }>;
  publicKey: PublicKey;
  signTransaction: (tx: Transaction) => Promise<Transaction>;
}

// Extend the global Window type
declare global {
  interface Window {
    solana?: PhantomProvider;
  }
}

export default function TipLinkGenerator() {
  const [solAmount, setSolAmount] = useState('0.1');
  const [tipUrl, setTipUrl] = useState('');
  const [walletAddress, setWalletAddress] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const createTipLinkAndSend = async () => {
    setLoading(true);
    setTipUrl('');
    setError('');
    setWalletAddress('');

    try {
      const amountNum = parseFloat(solAmount);
      if (isNaN(amountNum) || amountNum <= 0) {
        throw new Error('Please enter a valid SOL amount greater than 0');
      }

      const connection = new Connection(
        'https://api.devnet.solana.com',
        'confirmed'
      );

      // Create TipLink wallet and URL
      const { keypair: tipKeypair, url } = await TipLink.create();

      setWalletAddress(tipKeypair.publicKey.toBase58());

      const provider = window.solana;
      if (!provider?.isPhantom) throw new Error('Phantom wallet not found');

      const { publicKey: fromPubkey } = await provider.connect();

      const lamportsToSend = Math.floor(amountNum * LAMPORTS_PER_SOL);
      const tx = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey,
          toPubkey: tipKeypair.publicKey,
          lamports: lamportsToSend,
        })
      );

      tx.feePayer = fromPubkey;
      const { blockhash, lastValidBlockHeight } =
        await connection.getLatestBlockhash();
      tx.recentBlockhash = blockhash;

      const signedTx = await provider.signTransaction(tx);
      const txid = await connection.sendRawTransaction(signedTx.serialize());

      console.log('⏳ Waiting for confirmation...');
      await connection.confirmTransaction(
        { signature: txid, blockhash, lastValidBlockHeight },
        'confirmed'
      );

      console.log('✅ Transaction sent:', txid);

      setTipUrl(url.toString());
    } catch (err) {
      const error = err as Error;
      console.error(error);
      setError(
        error.message.includes('User rejected')
          ? 'You rejected the transaction.'
          : error.message
      );
    }

    setLoading(false);
  };

  return (
    <div className='min-h-screen bg-[#FEF4F0] flex justify-center items-center'>
      <div className="max-w-md mx-auto p-6 bg-gradient-to-br from-green-500 to-purple-600 text-white rounded shadow w-full">
        <h2 className="text-2xl font-bold mb-4">Create TipLink (Devnet)</h2>

        <label className="block mb-2 text-sm font-medium">
          Enter amount of SOL to tip:
        </label>
        <input
          type="number"
          min="0"
          step="0.0001"
          value={solAmount}
          onChange={(e) => setSolAmount(e.target.value)}
          className="mb-4 w-full rounded px-3 py-2 text-black"
          placeholder="0.01"
        />

        <button
          onClick={createTipLinkAndSend}
          disabled={loading}
          className="bg-black text-white px-4 py-2 rounded hover:bg-gray-900 w-full"
        >
          {loading ? 'Processing...' : 'Create TipLink & Send SOL'}
        </button>

        {error && <p className="mt-4 text-red-300">{error}</p>}

        {walletAddress && (
          <p className="mt-2 text-sm text-yellow-100 break-all">
            📬 Tip Wallet Address: {walletAddress}
          </p>
        )}

        {tipUrl && (
          <p className="mt-4 text-blue-100 break-all">
            🔗 TipLink URL:{' '}
            <a
              href={tipUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
            >
              {tipUrl}
            </a>
          </p>
        )}
      </div>
    </div>
  );
}
