import React, { useEffect } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { addUser, removeUser } from "../utils/userSlice";
import { useDispatch } from "react-redux";
import { Background, Logo } from "../utils/constants";

const Header = () => {
  const navigate = useNavigate();
  const dispatcher = useDispatch();
  const user = useSelector((store) => store.user);
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
    <div className="absolute w-screen px-8 py-2 bg-gradient-to-b from-black z-10 flex justify-between">
      <img className="w-44 " src={Logo} alt="Logo" />
      {user && (
        <div className="flex p-5">
          <p className="text-black">{user.displayName}</p>
          <img className="w-7 h-10" src={Background} alt="User Icon" />
          <button onClick={handleSignOut} className="font-bold text-white">
            (SignOut)
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
