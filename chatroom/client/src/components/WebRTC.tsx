import Peer from "peerjs";
import React, { useEffect, useRef, useState } from "react";
import { Button, Circle, Icon } from "@chakra-ui/react";
import { useMeQuery, useRoomQuery } from "../generated/graphql";
import { PhoneIcon } from "@chakra-ui/icons";
import { BsFillVolumeMuteFill, BsFillVolumeUpFill } from "react-icons/bs";

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
      <Circle
        size="40px"
        bg="teal.400"
        color="white"
        ml="2"
        as={Button}
        onClick={handleCall}
        _hover={{ bg: "teal.600" }}
      >
        <PhoneIcon />
      </Circle>
      {isEnable ? (
        <Circle
          onClick={handleMute}
          size="40px"
          bg="teal.400"
          color="white"
          ml="2"
          as={Button}
          _hover={{ bg: "teal.600" }}
        >
          <Icon as={BsFillVolumeUpFill} />
        </Circle>
      ) : (
        <Circle
          onClick={handleMute}
          size="40px"
          bg="teal.400"
          color="white"
          ml="2"
          as={Button}
          _hover={{ bg: "teal.600" }}
        >
          <Icon as={BsFillVolumeMuteFill} />
        </Circle>
      )}
      <video ref={videoRef} hidden={true} />
    </>
  );
};
