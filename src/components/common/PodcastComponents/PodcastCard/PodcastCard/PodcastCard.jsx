import React from 'react';
import "../PodcastCard/PodcastCard.css";
import {  NavLink } from 'react-router-dom';

const PodcastCard = ({id,title,displayImage}) => {
  return (
    <NavLink to={`/podcasts/${id}`}>
      <div className='podcast-card'>
        <img className='display-image-podcast' src={displayImage} />
        <p className='title-podcast'>{title}</p>
      </div>
      </NavLink>
  )
}

export default PodcastCard;