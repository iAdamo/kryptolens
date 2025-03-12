interface VideoPlayerProps {
  className?: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ className }) => {
  return (
    <video className={className} controls>
      <source src="/path/to/video.mp4" type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  );
};

export default VideoPlayer;
