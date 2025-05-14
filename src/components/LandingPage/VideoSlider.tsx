import React, { useEffect, useRef, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { hightlightsSlides } from "../../constants/index";
import pauseImg from "../../assets/images/pause.svg";
import playImg from "../../assets/images/play.svg";
import replayImg from "../../assets/images/replay.svg";

const VideoCarousel: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement[]>([]);
  const carouselRef = useRef<HTMLDivElement>(null);
  const firstPlayDoneRef = useRef(false);

  const [video, setVideo] = useState({
    isEnd: false,
    videoId: 0,
    isLastVideo: false,
    isPlaying: false,
    isInView: false,
    hasEnded: false,
  });

  const controls = useAnimation();

  const { videoId, isLastVideo, isPlaying, isInView } = video;

  // Get current video element
  const getCurrentVideo = () => videoRef.current[videoId];

  // Calculate remaining time in video
  const getRemainingTime = () => {
    const currentVideo = getCurrentVideo();
    if (!currentVideo) return 0;
    return currentVideo.duration - currentVideo.currentTime;
  };

  // Setup intersection observer
  useEffect(() => {
    if (!carouselRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;

        if (entry.isIntersecting) {
          // Component is in view
          setVideo((prev) => ({ ...prev, isInView: true }));

          // Start playing automatically on first view
          if (!firstPlayDoneRef.current) {
            firstPlayDoneRef.current = true;
            setVideo((prev) => ({ ...prev, isPlaying: true }));
          }
        } else {
          // Component is out of view - pause video
          setVideo((prev) => {
            const currentVideo = getCurrentVideo();
            if (currentVideo && prev.isPlaying) {
              currentVideo.pause();
              controls.stop();
            }
            return { ...prev, isInView: false };
          });
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(carouselRef.current);
    return () => {
      if (carouselRef.current) observer.unobserve(carouselRef.current);
    };
  }, []);

  // Track progress for animation
  const [progress, setProgress] = useState(0);

  // Handle video timeupdate event
  const handleTimeUpdate = () => {
    const currentVideo = getCurrentVideo();
    if (!currentVideo) return;

    const newProgress =
      (currentVideo.currentTime / currentVideo.duration) * 100;
    if (Math.abs(newProgress - progress) > 1) {
      setProgress(newProgress);
    }
  };

  // Effect to handle video changes
  useEffect(() => {
    const videos = videoRef.current;
    if (!videos.length) return;

    // Add listeners to all videos
    videos.forEach((video) => {
      if (!video) return;
      video.addEventListener("timeupdate", handleTimeUpdate);
      video.addEventListener("ended", () => {
        const index = videos.indexOf(video);
        handleProcess("video-end", index);
      });
    });

    return () => {
      videos.forEach((video) => {
        if (!video) return;
        video.removeEventListener("timeupdate", handleTimeUpdate);
      });
    };
  }, [videoRef.current.length]);

  // Handle play/pause state
  useEffect(() => {
    const currentVideo = getCurrentVideo();
    if (!currentVideo) return;

    if (isPlaying && isInView) {
      // Play from current position
      const playPromise = currentVideo.play();
      if (playPromise) {
        playPromise.catch((error) => {
          console.error("Play error:", error);
        });
      }

      // Update progress bar
      const remainingTime = getRemainingTime();
      const progressPercent =
        (currentVideo.currentTime / currentVideo.duration) * 100;

      controls.set({ width: `${progressPercent}%` });
      controls.start({
        width: "100%",
        transition: { duration: remainingTime, ease: "linear" },
      });
    } else {
      currentVideo.pause();
      controls.stop();
    }
  }, [isPlaying, isInView, videoId]);

  // Process different actions
  const handleProcess = (type: string, i: number = 0) => {
    const currentVideo = getCurrentVideo();

    switch (type) {
      case "video-end":
        if (i + 1 < hightlightsSlides.length) {
          // Move to next video
          setVideo((prev) => ({
            ...prev,
            videoId: i + 1,
            hasEnded: false,
          }));
        } else {
          // Last video ended
          setVideo((prev) => ({
            ...prev,
            isLastVideo: true,
            isPlaying: false,
            hasEnded: true,
          }));
          controls.stop();
        }
        break;

      case "video-reset":
        // Reset to first video
        if (currentVideo) {
          currentVideo.currentTime = 0;
        }

        setVideo((prev) => ({
          ...prev,
          videoId: 0,
          isLastVideo: false,
          isPlaying: isInView,
          hasEnded: false,
        }));

        controls.set({ width: "0%" });
        break;

      case "play":
        setVideo((prev) => ({
          ...prev,
          isPlaying: true,
          hasEnded: false,
        }));
        break;

      case "pause":
        setVideo((prev) => ({
          ...prev,
          isPlaying: false,
        }));
        break;

      default:
        break;
    }
  };

  return (
    <div ref={carouselRef}>
      {/* Video Carousel */}
      <div className="flex items-center overflow-hidden">
        {hightlightsSlides.map((list, i) => (
          <div
            key={list.id}
            className="min-w-full flex-shrink-0 transition-transform duration-700"
            style={{ transform: `translateX(${-100 * videoId}%)` }}
          >
            <div className="relative w-full h-[60vh] flex items-center justify-center bg-black rounded-3xl overflow-hidden">
              <video
                playsInline
                muted
                preload="auto"
                ref={(el) => {
                  if (el) videoRef.current[i] = el;
                }}
                className="w-full h-full object-cover object-center"
                onEnded={() => handleProcess("video-end", i)}
              >
                <source src={list.video} type="video/mp4" />
              </video>
            </div>
          </div>
        ))}
      </div>

      {/* Dot Progress Bar */}
      <div className="relative flex justify-center items-center mt-10">
        <div className="flex py-5 px-7 bg-gray-700 backdrop-blur rounded-full">
          {hightlightsSlides.map((_, i) => {
            const isActive = videoId === i;
            return (
              <span
                key={i}
                className={`mx-2 h-3 rounded-full relative cursor-pointer transition-all duration-300 ${
                  isActive ? "w-12 bg-gray-400" : "w-3 bg-gray-500"
                }`}
                onClick={() => {
                  // Reset current time for new video selection
                  const newVideo = videoRef.current[i];
                  if (newVideo) {
                    newVideo.currentTime = 0;
                  }

                  setVideo((prev) => ({
                    ...prev,
                    videoId: i,
                    isLastVideo: false,
                    hasEnded: false,
                    isPlaying: true, // Always play when selecting a new video
                  }));

                  controls.set({ width: "0%" });
                }}
              >
                {isActive && (
                  <motion.span
                    className="absolute top-0 left-0 h-full bg-white rounded-full"
                    initial={{ width: "0%" }}
                    animate={controls}
                  />
                )}
              </span>
            );
          })}
        </div>

        {/* Play/Pause/Replay Button */}
        <button
          className="ml-4 bg-gray-500 rounded-full w-[3rem] h-[3rem] flex items-center justify-center shadow-lg"
          onClick={() => {
            if (isLastVideo) {
              handleProcess("video-reset");
            } else {
              handleProcess(isPlaying ? "pause" : "play");
            }
          }}
        >
          <img
            src={isLastVideo ? replayImg : !isPlaying ? playImg : pauseImg}
            alt={isLastVideo ? "replay" : !isPlaying ? "play" : "pause"}
          />
        </button>
      </div>
    </div>
  );
};

export default VideoCarousel;
