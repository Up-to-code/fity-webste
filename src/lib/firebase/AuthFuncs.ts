import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth } from "./firebaseConfig";
import { CreateUser } from "./FirebaseServes";

export const SignInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  try {
    await signInWithPopup(auth, provider).then((auth_data) => {
      CreateUser(
        (auth_data.user.displayName as string) || "User Name",
        auth_data.user.email as string,
        auth_data.user.uid
      );
    });
  } catch (error) {
    console.log(error);
  }
};
export const CreateUserWithEmailAndPassword = async (
  email: string,
  password: string,
  name: string
) => {
  try {
    // Create the user with email and password
    const auth_data = await createUserWithEmailAndPassword(auth, email, password);

    // Update the user's displayName
    await updateProfile(auth_data.user, {
      displayName: name,
    });

    // Ensure auth.currentUser is not null or undefined
    if (auth.currentUser) {
      // Call your CreateUser function with the necessary parameters
      await CreateUser(name, auth.currentUser.email as string, auth_data.user.uid);
    } else {
      return 
    }

    return true;
  } catch (error) {
    return error;
  }
};

export const SignInWithEmailAndPassword = async (
  email: string,
  password: string
) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    return true;
  } catch (error) {
    return false;
  }
};

export const ForgotPassword = async (email: string) => {
  try {
    await sendPasswordResetEmail(auth, email);
  } catch (error) {
    console.log(error);
  }
};

export const SignOut = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.log(error);
  }
};
