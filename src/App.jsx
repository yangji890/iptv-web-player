import React, { useState } from 'react'
import { parseM3U } from './m3uParser'
import ChannelList from './components/ChannelList'
import Player from './components/Player'
import Header from './components/Header'

function App() {
  const [channels, setChannels] = useState([])
  const [currentChannel, setCurrentChannel] = useState(null)

  const handleFileUpload = (event) => {
    const file = event.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const content = e.target.result
        const parsedChannels = parseM3U(content)
        setChannels(parsedChannels)
      }
      reader.readAsText(file)
    }
  }

  const handleUrlSubmit = async (url) => {
    try {
      const response = await fetch(url)
      const content = await response.text()
      const parsedChannels = parseM3U(content)
      setChannels(parsedChannels)
    } catch (error) {
      console.error('Error loading M3U file:', error)
      alert('Error loading M3U file. Please check the URL and try again.')
    }
  }

  return (
    <div className="container">
      <Header onFileUpload={handleFileUpload} onUrlSubmit={handleUrlSubmit} />
      <div className="content">
        <ChannelList 
          channels={channels} 
          currentChannel={currentChannel}
          onChannelSelect={setCurrentChannel} 
        />
        {currentChannel && <Player url={currentChannel.url} />}
      </div>
    </div>
  )
}

export default App
