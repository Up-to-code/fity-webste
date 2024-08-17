import { create } from "zustand";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";
interface UserState {
  user: User | null;
  setUser: (user: User | null) => void;
}
const useUser = create<UserState>((set) => ({
  user: null,
  setUser: (user: User | null) => set({ user }),
}));
export default useUser;

