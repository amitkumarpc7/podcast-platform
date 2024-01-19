import React, { useEffect, useState } from 'react'
import Header from '../components/common/Header/Header'
import PodcastCard from '../components/common/PodcastComponents/PodcastCard/PodcastCard';
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../firebase"
import { collection, doc, onSnapshot, query } from "firebase/firestore";
import { ToastContainer} from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { setPodcasts } from '../slices/podcastSlice';
import Input from '../components/common/Input/Input';

const PodcastsPage = () => {
  const dispatch = useDispatch();
  const podcasts = useSelector((state) => state.podcasts.podcasts);
  const [search, setSearch] = useState("");

  useEffect(() => {
    // onSnapshot to listen change in document
    const unsubscribe = onSnapshot(
      // Standard code to get all data
      query(collection(db, "podcasts")),
      // Callback by which we can access all data
      (querySnapShot) => {
        const podcastsData = [];
        querySnapShot.forEach((doc) => {
          podcastsData.push({ id: doc.id, ...doc.data() });
        });
        dispatch(setPodcasts(podcastsData));
      },
      (err) => {
        console.error("Error fetching podcasts:", err);
      }
    );

    return () => {
      unsubscribe();
    };
  }, [dispatch]);

  var filteredPodcasts = podcasts.filter((item) =>
    item.title.trim().toLowerCase().includes(search.trim().toLowerCase())
  );

  return (
    <div>
      <Header />
      <div className="input-wrapper">
        <h1>Discover Podcasts</h1>
        <Input
          state={search}
          setState={setSearch}
          placeholder={"Search By Title"}
          type={"text"}
        />
        {filteredPodcasts.length > 0 ? (
          <div className="podcasts-flex" style={{ marginTop: "1.5rem" }}>
            {filteredPodcasts.map((item) => {
              return (
                <PodcastCard
                  key={item.id}
                  id={item.id}
                  title={item.title}
                  displayImage={item.displayImage}
                />
              );
            })}
          </div>
        ) : (
          <p>{search ? "Podcast Not Found" : "No Podcast On the Platform"}</p>
        )}
      </div>
    </div>
  );
};

export default PodcastsPage