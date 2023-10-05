// next
import { useSession } from 'next-auth/react';
import { useCallback, useEffect, useState } from 'react';

export const useCurrentBalance = () => {
  const { data: session, update } = useSession();
  const [balance, setBalance] = useState<number>(0);
  const [isLoading, setLoading] = useState<boolean>(true);

  const refresh = useCallback(async () => {
    setLoading(true);
    fetch(`/api/auth/balance`).then(async (res) => {
      if (res.status === 200) {
        const { balance, walletAddress } = await res.json();
        setBalance(Number(balance));
        if (session?.token.walletAddress === '' && walletAddress !== '') {
          update({ walletAddress });
        }
        setLoading(false);
      } else {
        setLoading(false);
      }
    });
  }, [session, update]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return { balance, isLoading, refresh };
};
