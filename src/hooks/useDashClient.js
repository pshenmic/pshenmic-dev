'use client'

import Dash from "dash";
import { useState, useRef, createContext, useContext, useEffect } from "react";

export function useDashClient(props) {
    const [client, setClient] = useState(null);
    const [account, setAccount] = useState(null);
    const [identityIds, setIdentityIds] = useState(null);
    const [totalProgress, setTotalProgress] = useState(0);

    useEffect(() => {
        if (!client) return;

        async function initializeAccount() {
            try {
                const account = await client.wallet.getAccount();
                if (!account) {
                    throw new Error('Failed to retrieve account');
                }

                let headerProgress = 0;
                let transactionProgress = 0;

                account.on('HEADERS_SYNC_PROGRESS', (progress) => {
                    headerProgress = progress.totalProgress;
                    const headersContribution = progress.totalProgress * 0.5;
                    const transactionsContribution = transactionProgress * 0.5;

                    setTotalProgress(Math.floor(headersContribution + transactionsContribution));
                });

                account.on('TRANSACTIONS_SYNC_PROGRESS', (progress) => {
                    transactionProgress = progress.progress;
                    const headersContribution = headerProgress * 0.5;
                    const transactionsContribution = progress.progress * 0.5;
                    
                    setTotalProgress(Math.floor(headersContribution + transactionsContribution))
                });

            } catch (error) {
                console.error('Error initializing account:', error);
            }
        }

        initializeAccount();
       
    }, [client]);

    const methods = useRef({
        disconnect: () => {
            if (client) {
                client.disconnect()
            }
            setTotalProgress(0);
            setClient(null);
            setAccount(null);
            setIdentityIds(null);
        },
        connect: async (innerProps) => {
            methods.current.disconnect();
            try {
                const client = new Dash.Client({ ...props, ...innerProps });

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
                    if(!identity) {
                        throw new Error(`Identity not found for ID: ${id}`);
                    }

                    const meta = identity.getMetadata();
                    if (!meta) {
                        throw new Error(`Metadata not found for identity ID: ${id}`);
                    }
                    
                    identity.setMetadata(meta);
                    if (!identity) {
                        throw new Error(`Identity not found for ID: ${id}`);
                    }

                    const identityIdentifier = identity.getId().toString();
                    if (typeof identityIdentifier !== 'string') {
                        throw new Error(`Invalid identity identifier for ID: ${id}`);
                    }

                    const document = await client.platform.names.resolveByRecord('identity', identityIdentifier);
                    if (!document) {
                        throw new Error(`Document not found for identity ID: ${id}`);
                    }
                    
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

                return Promise.resolve({ client, identityIds, account, identitiesData });
            } catch (error) {
                console.error('Error add client:', error);
                return Promise.reject(error);
            }
        }
    })

    return { identityIds, account, client, totalProgress, ...methods.current };
};

const DashContext = createContext();

export function DashProvider({ children }) {
    const data = useDashClient();

    return <DashContext.Provider value={data}>
        {children}
    </DashContext.Provider>
}

export function useDash() {
    return useContext(DashContext);
}