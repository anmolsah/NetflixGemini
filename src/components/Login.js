import { checkValidData } from "../utils/validate";
import Header from "./Header";
import { useRef, useState } from "react";
import toast, { Toaster } from 'react-hot-toast';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../utils/firebase";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { AVATAR, BG_IMAGE } from "../utils/constants";
import Spinner from "./../spinner/Spinner";

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false); //Spinner
  const dispatch = useDispatch();

  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);

  const handleButtonClick = () => {
    setIsLoading(true); //spinner

    const message = checkValidData(email.current.value, password.current.value);

    if (message) {
      toast.error(message);
      setIsLoading(false); //spinner
      return;
    }

    if (!isSignInForm) {
      //sign up logic
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;
          toast.success("Account created successfully! Welcome to Netflix Gemini!");
          updateProfile(user, {
            displayName: name.current.value,
            photoURL: AVATAR,
          })
            .then(() => {
              const { uid, email, displayName, photoURL } = auth.currentUser;
              dispatch(
                addUser({
                  uid: uid,
                  email: email,
                  displayName: displayName,
                  photoURL: photoURL,
                })
              );
              setIsLoading(false); //spinner
            })
            .catch((error) => {
              toast.error("Failed to update profile. Please try again.");
              setIsLoading(false); //spinner
            });
        })
        .catch((error) => {
          const errorCode = error.code;
          let errorMessage = "Something went wrong. Please try again.";
          
          if (errorCode === 'auth/email-already-in-use') {
            errorMessage = "This email is already registered. Please sign in instead.";
          } else if (errorCode === 'auth/weak-password') {
            errorMessage = "Password is too weak. Please use at least 6 characters.";
          } else if (errorCode === 'auth/invalid-email') {
            errorMessage = "Please enter a valid email address.";
          }
          
          toast.error(errorMessage);
          setIsLoading(false); //spinner
        });
    } else {
      //sign in logic
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          toast.success("Welcome back! Successfully signed in.");
          setIsLoading(false); //spinner
        })
        .catch((error) => {
          const errorCode = error.code;
          let errorMessage = "Sign in failed. Please try again.";
          
          if (errorCode === 'auth/user-not-found') {
            errorMessage = "No account found with this email. Please sign up first.";
          } else if (errorCode === 'auth/wrong-password') {
            errorMessage = "Incorrect password. Please try again.";
          } else if (errorCode === 'auth/invalid-email') {
            errorMessage = "Please enter a valid email address.";
          } else if (errorCode === 'auth/user-disabled') {
            errorMessage = "This account has been disabled. Please contact support.";
          } else if (errorCode === 'auth/too-many-requests') {
            errorMessage = "Too many failed attempts. Please try again later.";
          } else if (errorCode === 'auth/invalid-credential') {
            errorMessage = "Invalid email or password. Please check your credentials.";
          }
          
          toast.error(errorMessage);
          setIsLoading(false);
        });
    }
  };

  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
  };
  return (
    <div>
      <Header />
      <Toaster 
        position="top-center"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#333',
            color: '#fff',
            fontSize: '14px',
            borderRadius: '8px',
            padding: '12px 16px',
          },
          success: {
            iconTheme: {
              primary: '#10B981',
              secondary: '#fff',
            },
          },
          error: {
            iconTheme: {
              primary: '#EF4444',
              secondary: '#fff',
            },
          },
        }}
      />
      {isLoading && <Spinner />}
      <div className="relative">
        <img
          src={BG_IMAGE}
          alt="background-img"
          className="w-full h-screen object-cover"
        />
        <div className="form-wrapper absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black/75 rounded-md p-8 sm:w-96 md:w-1/3 lg:w-1/4">
          <h2 className="text-white text-2xl text-center mb-4">
            {isSignInForm ? "Sign In" : "Sign Up"}
          </h2>
          <form onSubmit={(e) => e.preventDefault()} className="">
            {!isSignInForm && (
              <div className="mb-4">
                <input
                  ref={name}
                  type="text"
                  id="name"
                  required
                  className="w-full bg-gray-800 text-white rounded-md px-5 py-3 focus:bg-gray-700 focus:outline-border focus:py-2"
                  placeholder="Name"
                />
              </div>
            )}
            <div className="mb-4">
              <input
                ref={email}
                type="text"
                id="email-or-phone"
                required
                className="w-full bg-gray-800 text-white rounded-md px-5 py-3 focus:bg-gray-700 focus:outline-border focus:py-2"
                placeholder="Email"
              />
            </div>
            <div className="mb-4">
              <input
                ref={password}
                type="password"
                id="password"
                required
                className="w-full bg-gray-800 rounded-md px-5 py-3 text-white focus:bg-gray-700 focus:outline-border focus:py-2"
                placeholder="Password"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-red-600 hover:bg-red-700 text-white py-4 rounded-md font-medium"
              onClick={handleButtonClick}
            >
              {isSignInForm ? "Sign In" : "Sign Up"}
            </button>
            <div className="form-help flex justify-between mt-6">
              <div className="remember-me flex items-center">
                <input
                  type="checkbox"
                  id="remember-me"
                  className="mr-2 accent-gray-400"
                />
                <label className="text-gray-300 text-sm">Remember me</label>
              </div>
            </div>
          </form>
          <p
            className="text-gray-300 text-sm mt-4 cursor-pointer"
            onClick={toggleSignInForm}
          >
            {isSignInForm
              ? "New to Netflix? Sign up now"
              : "Already a User? Sign In Now"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
