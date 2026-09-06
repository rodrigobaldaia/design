import { useEffect, useRef, useState } from "react";

/**
 * Muted, looping, inline video that only loads and plays while inside the
 * viewport. Optional `paused` prop force-pauses regardless of visibility
 * (used by the montage, where only the active layer should decode).
 */
const SmartVideo = ({ src, paused = false, preload = "metadata", ...rest }) => {
  const videoRef = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.25 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    if (inView && !paused) {
      el.play().catch(() => {
        /* autoplay unavailable (e.g. iOS low-power mode) */
      });
    } else {
      el.pause();
    }
  }, [inView, paused]);

  return (
    <video
      ref={videoRef}
      muted
      loop
      playsInline
      preload={preload}
      tabIndex={-1}
      {...rest}
    >
      <source src={src} type={src.endsWith(".webm") ? "video/webm" : "video/mp4"} />
    </video>
  );
};

export default SmartVideo;
