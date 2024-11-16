import React from 'react';
import VideoPlayer from './VideoPlayer';

const App = () => {
    const playbackUrl = "https://3d26876b73d7.us-west-2.playback.live-video.net/api/video/v1/us-west-2.913157848533.channel.rkCBS9iD1eyd.m3u8";

    return (
        <div>
            <h1>Live Stream Player</h1>
            <VideoPlayer playbackUrl={playbackUrl} />
        </div>
    );
};

export default App;
