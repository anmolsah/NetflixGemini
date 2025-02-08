import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { addUser, removeUser } from "../utils/userSlice";
import { LOGO, SUPPORTED_LANGUAGE } from "./../utils/constants";
import { toggleGptSearchView } from "../utils/gptSlice";
import { changeLanguage } from "../utils/configSlice";
import "../responsive/header.css";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);
  const showGptSearch = useSelector((store) => store.gpt.showGptSearch);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {})
      .catch((error) => {
        navigate("/error");
      });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName, photoURL } = user;
        dispatch(
          addUser({
            uid: uid,
            email: email,
            displayName: displayName,
            photoURL: photoURL,
          })
        );
        navigate("/browse");
      } else {
        dispatch(removeUser());
        navigate("/");
      }
    });

    return () => unsubscribe();
  }, []);

  const handleGptSearchClick = () => {
    //toggle GPT Search
    dispatch(toggleGptSearchView());
  };

  const handleLanguageChange = (e) => {
    dispatch(changeLanguage(e.target.value));
  };

  return (
    <div className="flex justify-between items-center absolute z-20 top-0 left-0 w-full px-8 py-2 bg-gradient-to-b from-black">
      <img className="w-32 md:w-52" src={LOGO} alt="logo" />
      {user && (
        <div className="flex items-center">
          {showGptSearch && (
            <select
              className="rounded-sm py-1 opacity-40 text-black"
              onChange={handleLanguageChange}
            >
              {SUPPORTED_LANGUAGE.map((lang) => (
                <option
                  className="rounded-sm bg-black text-white opacity-60"
                  key={lang.identifier}
                  value={lang.identifier}
                >
                  {lang.name}
                </option>
              ))}
            </select>
          )}
          <button
            className="rounded-md text-md text-white py-2 px-4 m-2 hover:bg-purple-900 md:text-xl md:py-3"
            onClick={handleGptSearchClick}
          >
            {showGptSearch ? "Home" : "GeminiSearch"}
          </button>
          <img
            className="w-8 h-8  mr-2 rounded-md cursor-pointer"
            src={user?.photoURL}
            alt="User-icon"
            onClick={() => window.location.reload()}
          />
          <button
            onClick={handleSignOut}
            className="text-white rounded-md px-4 py-2  hover:text-black hover:bg-red-600 md:text-xl md:py-3"
          >
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
