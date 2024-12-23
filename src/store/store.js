import { createWithEqualityFn } from 'zustand/traditional'

const useGlobalStore = createWithEqualityFn(
  (set, get) => ({
    userDash: null,
    setUserDash: (userDash) => set({ userDash }),

    indexWallet: 0,
    setIndexWallet: (indexWallet) => set({ indexWallet }),

    loadingGetUser: false,
    setLoadingGetUser: (loadingGetUser) => set({ loadingGetUser }),

    openImportWalletWindow: false,
    setOpenImportWalletWindow: (openImportWalletWindow) => set({ openImportWalletWindow }),

    openAdminAccessPopup: false,
    setOpenAdminAccessPopup: (openAdminAccessPopup) => set({ openAdminAccessPopup }),

    admin: false,
    setAdmin: (admin) => set({ admin }),

    openEditingWindow: false,
    setOpenEditingWindow: (openEditingWindow) => set({ openEditingWindow })
  })
)

export default useGlobalStore
