'use client';

import {PrivyProvider} from '@privy-io/react-auth';

export default function Providers({children}: {children: React.ReactNode}) {
  return (
    <PrivyProvider
      appId="cmblbvp6p01ijlb0ms0u4wjhh"
      clientId="client-WY6MBHGo6SFHNegUsqp8thP7T8rNecbD5hRHsNNZTBwtb"
      config={{
        // Create embedded wallets for users who don't have a wallet
        embeddedWallets: {
          solana: {
            createOnLogin: 'users-without-wallets'
          }
        }
      }}
    >
      {children}
    </PrivyProvider>
  );
}