import React, { useRef, useEffect, useState } from 'react';
import Hls from 'hls.js';

const VideoPlayer = ({ playbackUrl }) => {
    const videoRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);

    const handlePlay = () => {
        const video = videoRef.current;

        if (Hls.isSupported()) {
            const hls = new Hls();
            hls.loadSource(playbackUrl);
            hls.attachMedia(video);
            hls.on(Hls.Events.MANIFEST_PARSED, () => {
                console.log('HLS manifest loaded, starting playback...');
                video.play();
                setIsPlaying(true);
            });

            hls.on(Hls.Events.ERROR, (event, data) => {
                console.error('HLS.js error:', event, data);
            });

            return () => {
                hls.destroy();
            };
        } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
            video.src = playbackUrl;
            video.addEventListener('loadedmetadata', () => {
                video.play();
                setIsPlaying(true);
            });

            return () => {
                video.removeEventListener('loadedmetadata', () => video.play());
            };
        } else {
            console.error('HLS is not supported in this browser.');
        }
    };

    return (
        <div style={{ textAlign: 'center', margin: '20px' }}>
            {!isPlaying && (
                <button
                    onClick={handlePlay}
                    style={{
                        padding: '10px 20px',
                        fontSize: '16px',
                        backgroundColor: '#007bff',
                        color: 'white',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer',
                    }}
                >
                    Play Stream
                </button>
            )}
            <video
                ref={videoRef}
                controls
                style={{
                    width: '100%',
                    height: 'auto',
                    display: isPlaying ? 'block' : 'none',
                    border: '1px solid #ccc',
                    borderRadius: '5px',
                }}
            />
        </div>
    );
};

export default VideoPlayer;
