// next
import { useSession } from 'next-auth/react';
import { useCallback, useEffect, useState } from 'react';

export const useCurrentBalance = () => {
  const { data: session } = useSession();
  const [balance, setBalance] = useState<number>(0);
  const [isLoading, setLoading] = useState<boolean>(true);
  // const [walletAddress, setWalletAddress] = useState<string>('');

  useEffect(() => {
    const fetchBalance = () => {
      setLoading(true);
      fetch(`/api/auth/balance`)
        .then(async (res) => {
          if (res.status === 200) {
            const { balance } = await res.json();
            console.log(balance);
            setBalance(Number(balance));
            setLoading(false);
          }
        })
        .catch((err) => {
          setLoading(false);
          console.log(err);
        });
    };
    if (session && session.token.walletAddress !== '') {
      fetchBalance();
    }
  }, [session]);

  const refresh = useCallback(async () => {
    const fetchBalance = () => {
      setLoading(true);
      fetch(`/api/auth/balance`)
        .then(async (res) => {
          if (res.status === 200) {
            const { balance } = await res.json();
            setBalance(Number(balance));
            setLoading(false);
          }
        })
        .catch((err) => {
          setLoading(false);
          console.log(err);
        });
    };
    if (session && session.token.walletAddress !== '') {
      fetchBalance();
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return { balance, isLoading, refresh };
};
