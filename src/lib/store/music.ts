import { create } from "zustand";
import { DocumentData } from "firebase/firestore";
import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "../firebase/firebaseConfig";

export interface Track extends DocumentData {
  url: string;
}

interface PlayerState {
  playList: Track[];
  currentIndex: number;
  isPlay: boolean;
  playlistName: string;
  audio: HTMLAudioElement | null;
  volume: number;
  currentTime: number;
  duration: number;
  setPlayList: (playList: Track[]) => void;
  setVolume: (volume: number) => void;
  setCurrentTime: (time: number) => void;
  play: () => void;
  next: () => void;
  back: () => void;
  togglePlay: () => void;
}

const usePlayer = create<PlayerState>((set, get) => ({
  playList: [],
  currentIndex: 0,
  isPlay: false,
  playlistName: "test",
  audio: null,
  volume: 1,
  currentTime: 0,
  duration: 0,

  setPlayList: (playList) => {
    console.log("Setting playlist:", playList);
    set({ playList });
  },

  setVolume: (volume) => {
    const { audio } = get();
    if (audio) {
      console.log("Setting volume to:", volume);
      audio.volume = volume;
    }
    set({ volume });
  },

  setCurrentTime: (time) => {
    const { audio, currentTime } = get();
    const timeDifferenceThreshold = 0.5; // Adjust this threshold as needed

    if (audio && Math.abs(time - currentTime) > timeDifferenceThreshold) {
      console.log("Setting current time to:", time);
      audio.currentTime = time;
      set({ currentTime: time });
    }
  },

  play: async () => {
    console.log("Attempting to play audio");

    const { currentIndex, playList, setCurrentTime, setVolume } = get();

    if (playList.length === 0) {
      console.log("No tracks in the playlist");
      return;
    }

    const track = playList[currentIndex];
    const { url } = track;
    console.log("Selected track:", track);

    let playbackStarted = false; // Flag to prevent multiple play calls

    const handleLoadedMetadata = (event: Event) => {
      const newAudio = event.target as HTMLAudioElement;
      console.log("Loaded metadata for audio:", newAudio);
      set({ duration: newAudio.duration });
    };

    const handleTimeUpdate = (event: Event) => {
      const newAudio = event.target as HTMLAudioElement;
      set({ currentTime: newAudio.currentTime });
    };

    const handleEnded = () => {
      console.log("Audio ended");
      set({ isPlay: false });
      get().next(); // Automatically play the next track
    };

    const handleCanPlayThrough = (event: Event) => {
      const newAudio = event.target as HTMLAudioElement;
      console.log("Audio can play through");

      if (!playbackStarted) {
        playbackStarted = true; // Set the flag to true to prevent multiple play calls
        newAudio.play().catch(error => {
          console.error("Error playing audio:", error);
          set({ isPlay: false });
        });

        set({ audio: newAudio, isPlay: true });
        console.log("Playing track:", track);

        // Remove the event listener to prevent the loop
        newAudio.removeEventListener("canplaythrough", handleCanPlayThrough);
      }
    };

    // Clean up previous audio instance if it exists
    const { audio: oldAudio } = get();
    if (oldAudio) {
      console.log("Cleaning up old audio instance");
      oldAudio.pause();
      oldAudio.src = ""; // Clear previous source
      oldAudio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      oldAudio.removeEventListener("timeupdate", handleTimeUpdate);
      oldAudio.removeEventListener("ended", handleEnded);
      oldAudio.removeEventListener("canplaythrough", handleCanPlayThrough);
    }

    try {
      console.log("Fetching audio URL");
      const audioRef = ref(storage, url);
      const uri = await getDownloadURL(audioRef);
      console.log("Audio URL fetched:", uri);

      const newAudio = new Audio(uri);
      newAudio.volume = get().volume;

      // Set event listeners for the new audio instance
      newAudio.addEventListener("loadedmetadata", handleLoadedMetadata);
      newAudio.addEventListener("timeupdate", handleTimeUpdate);
      newAudio.addEventListener("ended", handleEnded);
      newAudio.addEventListener("canplaythrough", handleCanPlayThrough);

      // Preload the audio
      newAudio.preload = "auto";
      console.log("Audio preloaded");

      // Handle potential errors
      newAudio.addEventListener("error", (event) => {
        console.error("Error loading audio:", event);
        set({ isPlay: false });
      });

    } catch (error) {
      console.error("Error loading audio:", error);
    }
  },

  next: () => {
    const { playList, currentIndex } = get();
    if (playList.length > 0) {
      const newIndex = (currentIndex + 1) % playList.length;
      console.log("Moving to next track:", newIndex);
      set({ currentIndex: newIndex });
      get().play();
    }
  },

  back: () => {
    const { playList, currentIndex } = get();
    if (playList.length > 0) {
      const newIndex = (currentIndex - 1 + playList.length) % playList.length;
      console.log("Moving to previous track:", newIndex);
      set({ currentIndex: newIndex });
      get().play();
    }
  },

  togglePlay: () => {
    const { isPlay, audio } = get();
    if (audio) {
      if (isPlay) {
        console.log("Pausing audio");
        audio.pause();
      } else {
        console.log("Resuming audio");
        audio.play().catch(error => {
          console.error("Error toggling play:", error);
          set({ isPlay: false });
        });
      }
      set({ isPlay: !isPlay });
    } else {
      console.log("No audio instance, starting playback");
      get().play();
    }
  },
}));

export default usePlayer;
