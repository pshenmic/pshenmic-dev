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
            if(client) {
                client.disconnect()
            }
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

                const identitiesData = await Promise.all(identityIds.map(async (id) => {
                    const identity = await client.platform.identities.get(id);
                    const identityIdentifier = identity.getId().toString();
                    const document = await client.platform.names.resolveByRecord('identity', identityIdentifier);

                    const firstPart = identityIdentifier.slice(0, 5);
                    const lastPart = identityIdentifier.slice(-5);

                    let name = `${firstPart}...${lastPart}`;
                    if (document.length > 0) {
                        document.forEach(doc => {
                            const data = doc.getData();
                            if (data.records.identity === identityIdentifier) {
                                name = data.label && data.parentDomainName ? `${data.label}.${data.parentDomainName}` : name;
                            }
                        });
                    }
                    return { name, identityIdentifier };
                }));

                return Promise.resolve({client, identityIds, account, identitiesData});
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