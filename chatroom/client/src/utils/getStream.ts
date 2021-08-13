let stream: MediaStream | null = null;

export const getStream = async (): Promise<MediaStream> => {
  if (!stream) {
    stream = await navigator.mediaDevices.getUserMedia({
      video: false,
      audio: true,
    });
  }

  return stream;
};
