import { create } from "zustand";
import { getCollectionList } from "../firebase/FirebaseServes";
import { DocumentData } from "firebase/firestore"; // Import only if needed

interface PlayerState {
  playList: DocumentData[]; // Replace `DocumentData` with a more specific type if you have one
  currentIndex: number;
  isPlay: boolean;
  playlistName: string;
  setPlayList: (playList: DocumentData[]) => void;
  play: () => Promise<void>;
  next: () => void;
  back: () => void;
  togglePlay: () => void;
}

const usePlayer = create<PlayerState>((set, get) => ({
  playList: [],
  currentIndex: 0,
  isPlay: false,
  playlistName: "test",
  setPlayList: (playList) => set({ playList }),
  play: async () => {
    try {
      const { playlistName } = get();
      const playList = await getCollectionList(playlistName);
      set({ playList, currentIndex: 0, isPlay: true });
    } catch (error) {
      console.error("Failed to fetch playlist:", error);
    }
  },
  next: () => {
    const { playList, currentIndex } = get();
    if (playList.length > 0) {
      set({ currentIndex: (currentIndex + 1) % playList.length });
    }
  },
  back: () => {
    const { playList, currentIndex } = get();
    if (playList.length > 0) {
      set({
        currentIndex: (currentIndex - 1 + playList.length) % playList.length,
      });
    }
  },
  togglePlay: () => {
    set((state) => ({ isPlay: !state.isPlay }));
  },
}));

export default usePlayer;
