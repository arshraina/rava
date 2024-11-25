import React from 'react';
import VideoPlayer from './VideoPlayer';
import { Layout, Typography } from 'antd';

const { Header, Footer, Content } = Layout;
const { Title } = Typography;

const App = () => {
    const playbackUrl = "https://9a41b9a5b15d.ap-south-1.playback.live-video.net/api/video/v1/ap-south-1.390403890116.channel.2yaKi1MVeD7c.m3u8";

    return (
        <Layout style={{ minHeight: '100vh', background: '#f0f2f5' }}>
            <Header
                style={{
                    background: '#001529',
                    padding: '10px 20px',
                    color: 'white',
                    textAlign: 'center',
                }}
            >
                <Title level={2} style={{ color: 'white', margin: 0 }}>
                    RAVA Stream
                </Title>
            </Header>
            <Content style={{ padding: '20px' }}>
                <VideoPlayer playbackUrl={playbackUrl} />
            </Content>
            <Footer style={{ textAlign: 'center' }}>
                <Typography.Text type="secondary">© 2024 Rava Stream. All Rights Reserved.</Typography.Text>
            </Footer>
        </Layout>
    );
};

export default App;
