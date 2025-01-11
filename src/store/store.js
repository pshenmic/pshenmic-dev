import Project from '@/components/Projects/Project'
import { createWithEqualityFn } from 'zustand/traditional'

const useGlobalStore = createWithEqualityFn(
  (set, get) => ({
    userDash: null,
    setUserDash: (userDash) => set({ userDash }),

    client: null,
    setClient: (client) => set({ client }),

    indexWallet: 0,
    setIndexWallet: (indexWallet) => set({ indexWallet }),

    loadingGetUser: false,
    setLoadingGetUser: (loadingGetUser) => set({ loadingGetUser }),

    openImportWalletWindow: false,
    setOpenImportWalletWindow: (openImportWalletWindow) => set({ openImportWalletWindow }),

    admin: '',
    setAdmin: (admin) => set({ admin }),

    openEditingWindow: false,
    setOpenEditingWindow: (openEditingWindow) => set({ openEditingWindow }),

    projectDataEditing: {},
    setProjectDataEditing: (projectDataEditing) => set({ projectDataEditing }),
  })
)

export default useGlobalStore
