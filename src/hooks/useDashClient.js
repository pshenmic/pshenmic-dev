'use client'

import Dash from "dash";
import { useState, useRef, createContext, useContext } from "react";

export function useDashClient (props) {
    const [client, setClient] = useState(null);
    const [account, setAccount] = useState(null);
    const [identityIds, setIdentityIds] = useState(null);
    const methods = useRef({
        disconnect: () => {
            setClient(null);
            setAccount(null);
            setIdentityIds(null);
        },
        connect: async (innerProps) => {
            methods.current.disconnect();
            try {
                const client = new Dash.Client({...props, ...innerProps});

                if (!client) {
                    throw new Error('Client creation failed');
                }

                setClient(client);

                const account = await client.getWalletAccount();
                const identityIds = account.identities.getIdentityIds();

                if (account && identityIds) {
                    setAccount(account);
                    setIdentityIds(identityIds);
                } else {
                    throw new Error('Failed to retrieve account or identity IDs');
                }

                return Promise.resolve({client, identityIds, account});
            } catch (error) {
                console.error('Error add client:', error);
                return Promise.reject(error);
            }
        }
    })

    return { identityIds, account, client, ...methods.current };
};

const DashContext = createContext();

export function DashProvider ({children}) {
    const data = useDashClient();

    return <DashContext.Provider value={data}>
        {children}
    </DashContext.Provider>
}

export function useDash () {
    return useContext(DashContext);
}