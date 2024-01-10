import React, { useRef, useEffect } from 'react';

const VideoBackground = ({ videoUrl }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.autoplay = true;
      videoRef.current.loop = true;
      videoRef.current.muted = true;
    }
  }, []);

  return (
    <div className="video-background">
      <video ref={videoRef} style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }}>
        <source src={videoUrl} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default VideoBackground;
