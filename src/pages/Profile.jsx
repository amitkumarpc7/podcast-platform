import React, { useEffect, useState } from "react";
import Header from "../components/common/Header/Header";
import { useDispatch, useSelector } from "react-redux";
import Button from "../components/common/Button/Button";
import { toast } from "react-toastify";
import { auth, db } from "../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import Loader from "../components/common/Loader/Loader";
import { useNavigate } from "react-router-dom";
import { collection, doc, getDoc, onSnapshot, query } from "firebase/firestore";
import { setUser } from "../slices/userSlice";
import PodcastCard from "../components/common/PodcastComponents/PodcastCard/PodcastCard/PodcastCard";
const Profile = () => {
  const user = useSelector((state) => state.user.user);
  const [userPodcasts, setUserPodcasts] = useState([]);
  const [uid, setUid] = useState("");
  // const [userDataLoaded, setUserDataLoaded] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [update, setUpdate] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUid(user.uid);
        getUserData(user.uid);
      } else {
        <Loader />;
      }
    });
    const podcastData = [];
    const unsubscribe = onSnapshot(
      query(collection(db, "podcasts")),
      (querySnapshot) => {
        querySnapshot.forEach((doc) => {
          podcastData.push({ id: doc.id, ...doc.data() });
        });
        // for filtering User Podcasts
        const filteredPodcasts = podcastData.filter(
          (podcasts) => podcasts.createdBy === uid
        );
        setUserPodcasts(filteredPodcasts);
      },
      (error) => {
        console.error("Error-> ", error);
      }
    );
    return () => {
      unsubscribe();
    };
  }, [uid, update]);

  const getUserData = async (uid) => {
    const userDoc = await getDoc(doc(db, "users", uid));
    const userData = userDoc.data();
    try {
      dispatch(
        setUser({
          name: userData.name,
          email: userData.email,
          uid: userData.uid,
          profileImage: userData.profileImage,
          profileCoverImage: userData.profileCoverImage,
        })
      );
      // setUserDataLoaded(true);
    } catch (error) {
      console.log(error);
    }
  };
  // if(!userDataLoaded){
  //   console.log(user)
  //   return <Loader/>
  // }
  function handleNavigate() {
    navigate("/create-a-podcast");
  }

  function handleLogout() {
    signOut(auth)
      .then(() => {
        toast.success("User Logged out");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  }

  return (
    <div className="profile-wrapper">
      <Header />
      <div className="input-wrapper">
        <h1>Profile</h1>
      </div>
      <div className="banner-wrapper profile-cover">
        <img src={user?.profileCoverImage} alt="" />
      </div>
      <div className="podcast-card profile">
        <img
          className="display-image-podcast profile-image"
          src={user?.profileImage}
          alt=""
        />
      </div>

      <div className="profile-details">
        <h1>Name : {user?.name}</h1>
        <h1>Email : {user?.email}</h1>
        <h1>User Id : {user?.uid}</h1>
      </div>

      <div className="input-wrapper">
        <h1>Your Podcasts</h1>
        <div className="podcasts-flex" style={{ margin: "1.5rem" }}>
          {userPodcasts.length > 0 ? (
            userPodcasts.map((pod) => (
              <PodcastCard
                key={pod.id}
                id={pod.id}
                title={pod.title}
                displayImage={pod.displayImage}
              />
            ))
          ) : (
            <p onClick={handleNavigate} style={{ cursor: "pointer" }}>
              No Podcast Found. Click Here To Create Podcast
            </p>
          )}
        </div>
      </div>

      <Button
        className="logout-button"
        text={"Logout"}
        onClick={handleLogout}
        style={{
          position: "absolute",
          right: "5px",
          top: "60px",
          width: "60px",
        }}
      />
    </div>
  );
};

export default Profile;
