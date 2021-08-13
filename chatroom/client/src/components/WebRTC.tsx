import Peer from "peerjs";
import React, { useEffect, useRef, useState } from "react";
import { Button } from "@chakra-ui/react";
import { useMeQuery, useRoomQuery } from "../generated/graphql";

type WebRTCProps = {};

export const WebRTC: React.FC<WebRTCProps> = () => {
  // id
  const [{ data: meData }] = useMeQuery();
  const id = meData?.me?.id;

  // bob
  const [{ data: roomData }] = useRoomQuery();
  const bob = roomData?.room?.users.find((user) => user.id !== meData?.me?.id);

  // peer
  const [peer, setPeer] = useState<Peer | null>(null);
  useEffect(() => {
    (async () => {
      const PeerJS = (await import("peerjs")).default;

      setPeer(
        new PeerJS(id, {
          host: "/",
          port: 8080,
        })
      );
    })();
  }, [id]);

  // stream
  const [stream, setStream] = useState<MediaStream | null>(null);
  useEffect(() => {
    (async () => {
      setStream(
        await navigator.mediaDevices.getUserMedia({
          video: false,
          audio: true,
        })
      );
    })();
  }, []);

  const handleIncomingStream = (incomingStream: MediaStream) => {
    setBobStream(incomingStream);
  };

  // bob stream
  const [bobStream, setBobStream] = useState<MediaStream | null>(null);
  useEffect(() => {
    if (!peer || !stream) {
      return;
    }

    (async () => {
      peer.on("open", (id) => {
        console.log(id);
      });

      peer.on("call", (call) => {
        console.log("someone call me!");
        call.answer(stream);

        call.on("stream", handleIncomingStream);

        call.on("close", () => {
          console.log("video_emt removed by called!");
        });
      });
    })();
  }, [peer, stream]);

  // video
  const videoRef = useRef<HTMLVideoElement | null>(null);
  useEffect(() => {
    (async () => {
      if (!videoRef || !videoRef.current || !bobStream) {
        return;
      }

      videoRef.current.srcObject = bobStream;
      await videoRef.current.play();
    })();
  }, [bobStream, videoRef]);

  // handle call
  const handleCall = () => {
    if (!peer || !stream || !bob) {
      return;
    }

    const call = peer.call(bob.id, stream);

    call.on("stream", handleIncomingStream);

    call.on("close", () => {
      console.log("close");
    });
  };

  // handle mute
  const [isEnable, setIsEnable] = useState(false);
  useEffect(() => {
    if (!stream) {
      return;
    }

    stream.getAudioTracks()[0].enabled = isEnable;
  }, [isEnable, stream]);

  const handleMute = () => {
    setIsEnable(!isEnable);
  };

  return (
    <>
      <Button colorScheme="teal" onClick={handleCall} ml="2">
        Call
      </Button>
      <Button colorScheme="teal" onClick={handleMute} ml="2">
        {isEnable ? "Mute" : "UnMute"}
      </Button>
      <video ref={videoRef} hidden={true} />
    </>
  );
};
