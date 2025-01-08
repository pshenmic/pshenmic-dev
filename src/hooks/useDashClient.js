'use client'

import Dash from "dash";
import { useState, useRef, createContext, useContext, useEffect } from "react";

export function useDashClient() {
    const [client, setClient] = useState(null);
    const [account, setAccount] = useState(null);
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
        },
        connect: async (innerProps) => {
            methods.current.disconnect();
            try {
                const client = new Dash.Client({
                    network: innerProps.network || 'testnet',
                    wallet: {
                        mnemonic: innerProps.wallet.mnemonic,
                        adapter: innerProps.wallet.adapter,
                        unsafeOptions: {
                            skipSynchronizationBeforeHeight: innerProps.wallet?.unsafeOptions?.skipSynchronizationBeforeHeight || 0,
                        },
                    },
                    apps: {
                      "pshenmic-dev-dfo": {
                        contractId: 'GxWe9P43UAfWiMHpZzCXJaSwZkcqzvZR6wtgofyBG5cu',
                      },
                    }
                });

                if (!client) {
                    throw new Error('Client creation failed');
                }

                setClient(client);

                const account = await client.getWalletAccount();
                const identityIds = account.identities.getIdentityIds();
                if (account && identityIds?.length > 0) {
                    setAccount(account);
                } else {
                    throw new Error('Failed to retrieve account or identity IDs');
                }

                const identities = await Promise.all(identityIds.map(async (id) => {
                    const identity = await client.platform.identities.get(id);
                    if (!identity) {
                        throw new Error(`Identity not found for ID: ${id}`);
                    }

                    const identifier = identity.getId().toString();

                    if (typeof identifier !== 'string') {
                        throw new Error(`Invalid identity identifier for ID: ${id}`);
                    }

                    const document = await client.platform.names.resolveByRecord('identity', identifier);

                    if (!Array.isArray(document)) {
                        throw new Error(`Document not found for identity ID: ${id}`);
                    }

                    let name = identifier;
                    if (document.length > 0) {
                        document.forEach(doc => {
                            const data = doc.getData();
                            if (data.records.identity === identifier) {
                                name = data.label ? `${data.label}.${data.parentDomainName}` : name;
                            }
                        });
                    }
                    return { name, identifier, identity };
                }));

                return Promise.resolve({ client, account, identities });
            } catch (error) {
                console.error('Error add client:', error);
                return Promise.reject(error);
            }
        }
    })

    return { account, client, totalProgress, ...methods.current };
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