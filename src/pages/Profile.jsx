import React, { useEffect, useState } from 'react'
import Header from '../components/common/Header/Header'
import { useDispatch, useSelector } from 'react-redux'
import Button from '../components/common/Button/Button';
import { toast } from 'react-toastify';
import { auth, db } from '../firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import Loader from '../components/common/Loader/Loader';
import EditImage from '../components/common/EditImage/EditImage';

import { useNavigate } from 'react-router-dom';
import PodcastCard from '../components/common/PodcastComponents/PodcastCard/PodcastCard/PodcastCard';
import { collection, doc, getDoc, onSnapshot, query } from 'firebase/firestore';

const Profile = () => {
    const user=useSelector((state)=>state.user.user);
    const [userPodcasts, setUserPodcasts] = useState([]);
    const [uid, setUid] = useState("");
    const [userDataLoaded, setUserDataLoaded] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [update, setUpdate] = useState(false);
    const [loading, setLoading] = useState(false);
    const [editCoverImage, setEditCoverImage] = useState(false);
    const [editProfileImage, setEditProfileImage] = useState(false);

   
  
    //Automatically disabling edit profile button
    useEffect(() => {
      const intervalId = setInterval(() => {
        setEditCoverImage(false);
        setEditProfileImage(false);
      }, 20000);
  
      return () => clearInterval(intervalId);
    }, [editCoverImage, editProfileImage]);
  
    // Triggers whenever profile page renders
    useEffect(() => {
      // Triggers when new user logged in or page reloads
      onAuthStateChanged(auth, (user) => {
        if (user) {
          setUid(user.uid);
          // Rendering new data on page
          retriveData(user.uid);
        } else {
          <Loader />;
        }
      });
  
      const podcastsData = [];
      // Listens to Document and triggers when ever it changes
      const unsubscribe = onSnapshot(
        query(collection(db, "podcasts")),
        (querySnapShot) => {
          querySnapShot.forEach((doc) => {
            podcastsData.push({ id: doc.id, ...doc.data() });
          });
  
          // Filtering User's Podcasts
          const filteredPodcasts = podcastsData.filter(
            (podcasts) => podcasts.createdBy === uid
          );
          setUserPodcasts(filteredPodcasts);
        },
        (err) => {
          console.error("Error Profile", err);
        }
      );
  
      return () => {
        unsubscribe();
      };
    }, [uid, update]);
  
    // Retriving data After Reload
    async function retriveData(uid) {
      const userDoc = await getDoc(doc(db, "users", uid));
      const userData = userDoc.data();
  
      try {
        // Storing data in Store
        dispatch(
          setUser({
            name: userData.name,
            email: userData.email,
            uid: userData.uid,
            profileImage: userData.profileImage,
            profileCoverImage: userData.profileCoverImage,
          })
        );
  
        setUserDataLoaded(true);
      } catch (err) {
        console.log("retive Error", err);
      }
    }

    function handleNavigate() {
      navigate("/start-podcast");
    }


    function handleEditCoverImage() {
      setEditCoverImage(true);
      setEditProfileImage(false);
    }
  
    // Handle Edit ProfileImage
    function handleEditProfileImage() {
      setEditCoverImage(false);
      setEditProfileImage(true);
    }



    if(!user){
      return <Loader/>
    }

    function handleLogout(){
      signOut(auth).then(() => {
        toast.success("User Logged out");
      }).catch((error) => {
      
      });
    }

  return (
    <div className='profile-wrapper'>
        <Header/>
        <div className="input-wrapper">
        <h1>Profile</h1>
        <div className="banner-wrapper profile-cover">
          <img src={user.profileCoverImage} alt="" />
          <div className="profileCoverEdit" onClick={handleEditCoverImage}>
            {!editCoverImage && "Edit"}
            {editCoverImage && (
              <EditImage
                imageName="profileCoverImage"
                uid={uid}
                setUpdate={setUpdate}
                update={update}
                loading={loading}
                setLoading={setLoading}
                setEditImage={setEditCoverImage}
                editImage={editCoverImage}
              />
            )}
          </div>
        </div>
        <div className="podcast-card profile">
          <img
            className="display-image-podcast profile-image"
            src={user.profileImage}
            alt=""
          />
          <div className="profileEdit" onClick={handleEditProfileImage}>
            {!editProfileImage && "Edit"}
            {editProfileImage && (
              <EditImage
                imageName="profileImage"
                uid={uid}
                setUpdate={setUpdate}
                update={update}
                loading={loading}
                setLoading={setLoading}
                editImage={editProfileImage}
                setEditImage={setEditProfileImage}
              />
            )}
          </div>
        </div>
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
        text={"Logout"} 
        onClick={handleLogout}
        style={{
            position: "absolute",
            right: "60px",
            top: "60px",
            width: "120px",
        }}
        />
            
    </div>
    
  )
}

export default Profile