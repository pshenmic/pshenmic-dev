import { useDashClient } from "./useDashClient";

export async function useDashForageClient({ dataDashClient = {}, errorCallback, successCallback }) {
    const { identityIds, client } = await useDashClient(dataDashClient);

    try {
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

        await localforage.setItem('identitiesDataDash', identitiesData);
        await localforage.setItem('clientDash', client);

        if (successCallback) {
            successCallback(identitiesData);
        }
    } catch (error) {
        console.error('Ошибка при получении данных идентичности:', error);
        if (errorCallback) {
            errorCallback(error);
        }
    }
};