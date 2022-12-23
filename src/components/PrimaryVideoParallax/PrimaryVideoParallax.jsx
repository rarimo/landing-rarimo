const PrimaryVideoParallax = () => {
  return (
    <video
      muted
      loop
      playsInline
      className="primary-video-parallax"
      poster="/img/bg/primary-stains-bg.jpg"
    >
      <source src="/video/primary-video-bg.webm" type="video/webm" />
      <source src="/video/primary-video-bg.mp4" type="video/mp4" />
    </video>
  );
};

export default PrimaryVideoParallax;
