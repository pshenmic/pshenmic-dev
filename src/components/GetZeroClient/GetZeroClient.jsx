'use client'

import { clearWalletStore } from '@/components/Registration/ImportWalletWindow'
import { showToast } from "@/lib/showToast";
import { useEffect } from "react";
import useGlobalStore from "@/store/store";
import Dash from "dash";

export default function GetZeroClient() {
    const { setClient } = useGlobalStore();

    // adding a zero client
    useEffect(() => {
        const addClient = async () => {
            try {
                const clientOpts = {
                    network: 'testnet',
                    apps: {
                        tutorialContract: {
                            contractId: process.env.NEXT_PUBLIC_INITIAL_CLIENT,
                        },
                        "pshenmic-dev-dfo": {
                            contractId: process.env.NEXT_PUBLIC_CONTRACT_ID,
                        },
                    },
                    wallet: {
                        skipSynchronizationBeforeHeight: 1,
                        offlineMode: true,
                    },
                };
                const client = new Dash.Client(clientOpts);

                if (client) {
                    setClient(client)
                }
            } catch (error) {
                console.error('Error:', error);
                showToast('error', 'Error logging in, try again later');
                clearWalletStore()
            }
            
            return () => {
                if (client) {
                    try {
                        client.disconnect();
                        client = null;
                    } catch (error) {
                        console.error('Error disconnecting client:', error);
                    }
                }
            };
        }
        addClient()
    }, [])

    return <></>
}