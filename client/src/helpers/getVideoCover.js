const getVideoCover = (source, seekTo = 0.0) => {
  return new Promise((resolve, reject) => {
    if (!source) return resolve(null);
    const videoPlayer = document.createElement("video");
    videoPlayer.crossOrigin = "anonymous";

    // Event listener to capture when the video's metadata is loaded
    videoPlayer.addEventListener("loadedmetadata", () => {
      // Seek to the beginning of the video
      videoPlayer.currentTime = 0;
    });

    // Event listener to capture when the video has seeked to the beginning
    videoPlayer.addEventListener("seeked", () => {
      // Define a canvas with same dimension as the video
      const canvas = document.createElement("canvas");
      canvas.width = videoPlayer.videoWidth;
      canvas.height = videoPlayer.videoHeight;
      const context = canvas.getContext("2d");
      context.drawImage(videoPlayer, 0, 0, canvas.width, canvas.height);
      context.canvas.toBlob(
        (blob) => {
          resolve(blob);
        },
        "image/jpeg",
        0.75 /* quality */
      );
    });

    // Event listener to handle errors during video loading
    videoPlayer.addEventListener("error", (event) => {
      reject(new Error("Error loading video"));
    });

    // Check if the source is a URL or a File/Blob
    if (typeof source === "string") {
      videoPlayer.src = source; // URL
    } else if (source instanceof File || source instanceof Blob) {
      const videoURL = URL.createObjectURL(source); // File/Blob
      videoPlayer.src = videoURL;
    } else {
      reject(new Error("Invalid video source"));
    }
  });
};

export default getVideoCover;
