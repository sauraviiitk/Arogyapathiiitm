import { createContext, useContext } from 'react';
// import { Timestamp } from 'firebase/firestore';
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  FacebookAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  signInAnonymously
} from 'firebase/auth';

import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  updateDoc,
  collection,
  addDoc,
  
} from 'firebase/firestore'
const firebaseConfig = {
  apiKey: "AIzaSyDdqLZzX965muYS7nxxcH7BZmqSx3xrPYI",
  authDomain: "arogyapathiiitm.firebaseapp.com",
  projectId: "arogyapathiiitm",
  storageBucket: "arogyapathiiitm.firebasestorage.app",
  messagingSenderId: "832591147383",
  appId: "1:832591147383:web:cb379e7bee7fe36d42b172"
};

// Initialize Firebase
const FirebaseContext = createContext(null);
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db=getFirestore(app);
const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();

export const useFirebase = () => useContext(FirebaseContext);
export const FirebaseProvider = (props) => {
    const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async(currentUser) => {
      setUser(currentUser); // Automatically updates on login/logout
      if(currentUser){
        const useref=doc(db,"users",currentUser.uid);
        const usersnap=await getDoc(useref);
        console.log(currentUser);
        if(!usersnap.exists()){
          await setDoc(useref,{
            email:currentUser.email,
            createdat:new Date(),
            fullname:"",
            phone:"",
            gender:"",
            dob:"",

          });
          console.log("user record created");
        }

      }
    });
    return () => unsubscribe();
  }, []);


  const SignupUserWithEmailandPassword = (email, password) =>
    createUserWithEmailAndPassword(auth, email, password);

  const LoginUserWithEmailandPassword = (email, password) =>
    signInWithEmailAndPassword(auth, email, password);

  const SignInWithGoogle = () =>
    signInWithPopup(auth, googleProvider);

  const SignInWithFacebook = () =>
    signInWithPopup(auth, facebookProvider);
  const updateProfileData=async(uid,profiledata)=>{
    const useref=doc(db,"users",uid);
    await updateDoc(useref,{
      ...profiledata,
      updatedat:new Date(),
    })
  }

  return (
    <FirebaseContext.Provider
      value={{
        SignupUserWithEmailandPassword,
        LoginUserWithEmailandPassword,
        SignInWithGoogle,
        SignInWithFacebook,
        user,
        db,
        updateProfileData,
        signInAnonymously
      }}
    >
      {props.children}
    </FirebaseContext.Provider>
  );
};
