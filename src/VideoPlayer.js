import React, { useRef, useState } from 'react';
import Hls from 'hls.js';
import { Button, Spin, Typography, Card, Row, Col } from 'antd';
import { PlayCircleOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

const VideoPlayer = ({ playbackUrl }) => {
    const videoRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [loading, setLoading] = useState(false);

    const handlePlay = () => {
        const video = videoRef.current;

        if (Hls.isSupported()) {
            setLoading(true);
            const hls = new Hls();
            hls.loadSource(playbackUrl);
            hls.attachMedia(video);
            hls.on(Hls.Events.MANIFEST_PARSED, () => {
                console.log('HLS manifest loaded, starting playback...');
                video.play();
                setIsPlaying(true);
                setLoading(false);
            });

            hls.on(Hls.Events.ERROR, (event, data) => {
                console.error('HLS.js error:', event, data);
                setLoading(false);
            });

            return () => {
                hls.destroy();
            };
        } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
            setLoading(true);
            video.src = playbackUrl;
            video.addEventListener('loadedmetadata', () => {
                video.play();
                setIsPlaying(true);
                setLoading(false);
            });

            return () => {
                video.removeEventListener('loadedmetadata', () => video.play());
            };
        } else {
            console.error('HLS is not supported in this browser.');
        }
    };

    return (
        <Card
            style={{
                maxWidth: '800px',
                margin: '20px auto',
                padding: '20px',
                borderRadius: '8px',
                boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.15)',
            }}
            bodyStyle={{ padding: '0' }}
        >
            <Title level={3} style={{ textAlign: 'center', margin: '20px 0' }}>
                Live Streaming Player
            </Title>
            <Row justify="center">
                {!isPlaying && !loading && (
                    <Button
                        type="primary"
                        icon={<PlayCircleOutlined />}
                        onClick={handlePlay}
                        size="large"
                        style={{ marginBottom: '20px' }}
                    >
                        Start Stream
                    </Button>
                )}
                {loading && <Spin tip="Loading stream..." size="large" />}
            </Row>
            <Row>
                <Col span={24}>
                    <video
                        ref={videoRef}
                        controls
                        style={{
                            width: '100%',
                            height: 'auto',
                            display: isPlaying ? 'block' : 'none',
                            borderRadius: '8px',
                            border: '1px solid #ddd',
                        }}
                    />
                </Col>
            </Row>
            {!isPlaying && !loading && (
                <Text type="secondary" style={{ display: 'block', textAlign: 'center', marginTop: '20px' }}>
                    Click "Start Stream" to play the live stream.
                </Text>
            )}
        </Card>
    );
};

export default VideoPlayer;
