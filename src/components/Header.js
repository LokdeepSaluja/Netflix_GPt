import React, { useEffect } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { addUser, removeUser } from "../utils/userSlice";
import { useDispatch } from "react-redux";
import { Background, Logo, Supported_Languages } from "../utils/constants";
import { toggleGptSearchView } from "../utils/gptSlice";
import { changeLanguage } from "../utils/configSlice";

const Header = () => {
  const navigate = useNavigate();
  const dispatcher = useDispatch();
  const user = useSelector((store) => store.user);
  const gptSearch = useSelector((store) => store.gpt.showGptSearch);
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
      })
      .catch((error) => {
        navigate("/error");
        // An error happened.
      });
  };

  const handleGptSeachClick = () => {
    dispatcher(toggleGptSearchView());
  };

  const handleLanguageChange = (e) => {
    dispatcher(changeLanguage(e.target.value));
  };
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName } = user;
        dispatcher(
          addUser({ uid: uid, email: email, displayName: displayName })
        );
        navigate("/browse");
      } else {
        // User is signed out
        dispatcher(removeUser());
        navigate("/ ");
      }
    });
    return () => unsubscribe();
  }, []);
  return (
    <div className="absolute w-screen px-8 py-2 bg-gradient-to-b from-black z-10 flex flex-col md:flex-row justify-between">
      <img className=" w-44 mx-auto md:mx-0" src={Logo} alt="Logo" />
      {user && (
        <div className="flex p-5 justify-between">
          {gptSearch && (
            <select
              className="p-2 m-2 bg-gray-900 text-white"
              onChange={handleLanguageChange}
            >
              {Supported_Languages.map((lang) => (
                <option key={lang.identifier} value={lang.identifier}>
                  {lang.name}
                </option>
              ))}
            </select>
          )}

          <button
            className="py-2 px-4 mx-4 my-2 bg-purple-800 text-white rounded-lg "
            onClick={handleGptSeachClick}
          >
            {gptSearch ? "Homepage" : "GPT Search"}
          </button>
          <p className="text-black">{user.displayName}</p>
          <img
            className="hidden md:block w-7 h-10"
            src={Background}
            alt="User Icon"
          />
          <button onClick={handleSignOut} className="font-bold text-white">
            (SignOut)
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
