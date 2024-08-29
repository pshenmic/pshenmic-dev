import { createWithEqualityFn } from "zustand/traditional";

const useGlobalStore = createWithEqualityFn (
    ( set, get ) => ({ 
        openAdminAccessPopup: false,
        setOpenAdminAccessPopup: (openAdminAccessPopup) => set({ openAdminAccessPopup }),

        admin: false,
        setAdmin: (admin) => set({ admin }),

        openEditingWindow: false,
        setOpenEditingWindow: (openEditingWindow) => set({ openEditingWindow }),
    }) 
)

export default useGlobalStore