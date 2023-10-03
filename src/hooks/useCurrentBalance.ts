// third party
import Web3 from 'web3';

// next
import { useSession } from 'next-auth/react';

import MRN_ABI from './MRN.json';
import { useCallback, useEffect, useState } from 'react';

const web3 = new Web3('https://eth-goerli.g.alchemy.com/v2/KqDagOiXKFQ8T_QzPNpKBk1Yn-3Zgtgl');
const musdContract = new web3.eth.Contract(MRN_ABI as any[], '0xe6b563962Ee0Cc80DEFD618232BE9A5357e9cc7f');

export const useCurrentBalance = () => {
  const { data: session } = useSession();
  const [balance, setBalance] = useState<number>(0);
  const [isLoading, setLoading] = useState<boolean>(true);
  const [walletAddress, setWalletAddress] = useState<string>('');

  useEffect(() => {
    if (session && web3 && musdContract && web3.utils.isAddress(session.token.walletAddress)) {
      setWalletAddress(session.token.walletAddress);
      setLoading(false);
    } else if (session && !web3.utils.isAddress(session.token.walletAddress)) {
      setLoading(true);
      let res: any;
      const getWalletAddress = async () => {
        const response = await fetch('/api/auth/current');
        const newData = await response.json();
        if (!web3.utils.isAddress(newData.walletAddress)) {
          getWalletAddress();
          return;
        }
        const oldData = session.token;
        if (
          // String(newData.fullName) !== String(oldData.fullName) ||
          // newData.role !== oldData.role ||
          // Number(newData.kycStatus) !== Number(oldData.kycStatus) ||
          String(newData.walletAddress) !== String(oldData.walletAddress)
          // String(newData.cus_id) !== String(oldData.cusId)
        ) {
          // `/api/auth/session?fullName=${newData.fullName}&role=${newData.role}&kycStatus=${newData.kycStatus}&walletAddress=${newData.walletAddress}&cusId=${newData.cus_id}`;
          res = await fetch(`/api/auth/session?walletAddress=${newData.walletAddress}`);
          if (res.status === 200) {
            setWalletAddress(newData.walletAddress);
          }
        }
        setLoading(false);
      };
      getWalletAddress();
    }
  }, [session]);

  const refresh = useCallback(async () => {
    if (!web3.utils.isAddress(walletAddress)) return;

    setLoading(true);
    musdContract.methods
      .balanceOf(walletAddress)
      .call({ from: web3.utils.toChecksumAddress('0x000000000000000000000000000000000000abcd') })
      .then((res: string) => {
        setBalance(Number(web3.utils.fromWei(res, 'ether')));
        setLoading(false);
      })
      .catch((err: any) => {
        console.log(err);
        setLoading(false);
      });
  }, [walletAddress]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return { balance, isLoading, refresh };
};
