import Peer from "peerjs";
import { getStream } from "./getStream";

let peer: Peer | null = null;

export const getPeer = async (id: string): Promise<Peer> => {
  if (!peer) {
    const PeerJS = (await import("peerjs")).default;

    peer = new PeerJS(id, {
      host: "/",
      port: 8080,
    });

    peer.on("open", (id) => {
      // this.socket.emit('join-room', ROOM_ID, id)
      console.log(id);
    });

    const stream = await getStream();

    peer.on("call", (call) => {
      console.log("someone call me!");
      call.answer(stream);

      call.on("stream", (bobStream) => {
        console.log(bobStream);
      });

      call.on("close", () => {
        console.log("video_emt removed by called!");
      });
    });
  }

  return peer;
};
