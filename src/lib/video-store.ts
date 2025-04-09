"use client"

import { create } from "zustand"

type VideoStore = {
    isOpen: boolean
    videoSrc: string | null
    openVideo: (src: string) => void
    closeVideo: () => void
}

export const useVideoStore = create<VideoStore>((set) => ({
    isOpen: false,
    videoSrc: null,
    openVideo: (src) => set({ isOpen: true, videoSrc: src }),
    closeVideo: () => set({ isOpen: false }),
}))

