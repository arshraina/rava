import React from 'react';
import VideoPlayer from './VideoPlayer';

const App = () => {
    const playbackUrl = "https://9a41b9a5b15d.ap-south-1.playback.live-video.net/api/video/v1/ap-south-1.390403890116.channel.pPKZ46F7OCAD.m3u8";

    return (
        <div>
            <h1>Live Stream Player</h1>
            <VideoPlayer playbackUrl={playbackUrl} />
        </div>
    );
};

export default App;
