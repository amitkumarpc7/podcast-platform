import React from 'react'
import Header from '../components/common/Header/Header'
import CreatePodcastForm from '../components/StartAPodcast/CreatePodcastForm'

const CreateAPodcast = () => {
  return (
    <div >
        <Header/>
        <div className="input-wrapper">
            <h1>Create a Podcast</h1>
                <CreatePodcastForm/>

        </div>
        
    </div>
  )
}

export default CreateAPodcast