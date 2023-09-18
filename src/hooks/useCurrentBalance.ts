// third party
import Web3 from 'web3';

// next
import { useSession } from 'next-auth/react';

import MRN_ABI from './MRN.json';
import { useCallback, useEffect, useState } from 'react';

const web3 = new Web3('https://eth-goerli.g.alchemy.com/v2/KqDagOiXKFQ8T_QzPNpKBk1Yn-3Zgtgl');
const musdContract = new web3.eth.Contract(MRN_ABI as any[], '0xA3F4Ee29BDcA287e6DEe9bf0C8F38154f8695B6f');

export const useCurrentBalance = () => {
  const { data: session } = useSession();
  const [balance, setBalance] = useState<number>(0);
  const [isLoading, setLoading] = useState<boolean>(true);

  const refresh = useCallback(() => {
    if (session && web3 && musdContract) {
      setLoading(true);
      musdContract.methods
        .balanceOf(session.token.walletAddress)
        .call({ from: web3.utils.toChecksumAddress('0x000000000000000000000000000000000000abcd') })
        .then((res: string) => {
          setBalance(Number(web3.utils.fromWei(res, 'ether')));
          setLoading(false);
        })
        .catch((err: any) => {
          console.log(err);
          setLoading(false);
        });
    }
  }, [session]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return { balance, isLoading, refresh };
};
