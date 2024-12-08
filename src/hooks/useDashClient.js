export async function useDashClient ({ dataDashClient = {}, errorCallback }) {
    try {
        const client = new Dash.Client(dataDashClient);

        if (!client) {
            throw new Error('Client creation failed');
        }

        const account = await client.getWalletAccount();
        const identityIds = account.identities.getIdentityIds();

        if (client && account && identityIds) {
            return { client, account, identityIds }
        } else {
            throw new Error('Failed to retrieve account or identity IDs');
        }
    } catch (error) {
        console.error('Error:', error);
        if (errorCallback) {
            errorCallback();
        }
        return null;
    }
};