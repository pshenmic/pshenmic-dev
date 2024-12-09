import useGlobalStore from '@/store/store';
import { useRef } from 'react';
import { useDash } from './useDashClient';

export function useDashStoreClient () {
    const { setClientDash, setUserDash } = useGlobalStore();
    console.log(setClientDash, setUserDash)
    const { connect } = useDash();

    const methods = useRef({
        processIdentities: async (mnemonicTrim, errorCallback, successCallback) => {
            try {
                await connect({
                    network: 'testnet',
                    wallet: {
                        mnemonic: mnemonicTrim,
                        unsafeOptions: {
                            skipSynchronizationBeforeHeight: 1000000,
                        },
                    },
                }).then(async (resolveClient) => {
                    console.log('resolveClient', resolveClient)
                    const identitiesData = await Promise.all(resolveClient.identityIds.map(async (id) => {
                        const identity = await resolveClient.client.platform.identities.get(id);
                        const identityIdentifier = identity.getId().toString();
                        const document = await resolveClient.client.platform.names.resolveByRecord('identity', identityIdentifier);
    
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

                    console.log('identitiesData', identitiesData)
    
                    setClientDash(resolveClient.client);
                    setUserDash(identitiesData);
    
                    if (successCallback) {
                        successCallback();
                    }
                })
            } catch (error) {
                console.error('Error retrieving identity data:', error);
                if (errorCallback) {
                    errorCallback(error);
                }
            }
        },
    })

    return { ...methods.current }
}