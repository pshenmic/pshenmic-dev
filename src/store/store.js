import { createWithEqualityFn } from 'zustand/traditional'

const useGlobalStore = createWithEqualityFn(
  (set, get) => ({
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
