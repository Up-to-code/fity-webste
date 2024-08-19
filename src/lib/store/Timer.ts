import { create } from "zustand";

interface TimerState {
    time: number;
    isRunning: boolean;
    intervalId: NodeJS.Timeout | null;
    startTimer: () => void;
    stopTimer: () => void;
    resetTimer: () => void;
    setTime: (time: number) => void;
    getMinutes: () => number;
    getHours: () => number;
}

export const useTimer = create<TimerState>((set, get) => ({
    time: 0,
    isRunning: false,
    intervalId: null,

    startTimer: () => {
        if (!get().isRunning) {
            const intervalId = setInterval(() => {
                set((state) => ({ time: state.time + 1 }));
            }, 1000);

            set({ isRunning: true, intervalId });
        }
    },

    stopTimer: () => {
        const { intervalId } = get();
        if (intervalId) {
            clearInterval(intervalId);
            set({ isRunning: false, intervalId: null });
        }
    },

    resetTimer: () => {
        const { intervalId } = get();
        if (intervalId) {
            clearInterval(intervalId);
        }
        set({ time: 0, isRunning: false, intervalId: null });
    },

    setTime: (time: number) => set({ time }),

    getMinutes: () => {
        const time = get().time;
        return Math.floor(time / 60);
    },
    
    getHours: () => {
        const time = get().time;
        return Math.floor(time / 3600);
    },
}));
