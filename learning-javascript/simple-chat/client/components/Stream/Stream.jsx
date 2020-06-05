import React, { Component } from "react";
import Video from "Components/Video/Video";
import adapter from "webrtc-adapter";

// Here we're dealing with RTC peer connections and transferring video/audio
// via them.

export default class Stream extends Component {
  constructor(props) {
    super(props);

    this.createLocalDescription = this.createLocalDescription.bind(this);
    this.createNewConnection = this.createNewConnection.bind(this);
    this.initMedia = this.initMedia.bind(this);
    this.onJoinStream = this.onJoinStream.bind(this);
    this.onMediaMessage = this.onMediaMessage.bind(this);
    this.sendMediaMessage = this.sendMediaMessage.bind(this);
    this.streamOff = this.streamOff.bind(this);
    this.toggleVideoStream = this.toggleVideoStream.bind(this);

    this.answererConnection = null;
    // A peer connection which the client creates if it receives an offer.

    this.offererConnections = new Map();
    // A map where the offerer keeps all the peer connections. It's utilized
    // only by the offerer.

    this.isStreamOn = false;
    // It works in pair with "componentWillUpdate" method. If the prop with
    // the same is updated, its value is stored here ("componentWillUpdate"
    // doesn't allow to track what prop exactly has been changed, so we need
    // such an external variable). I decided to not make it a state. This
    // solution is far from being ideal, but I didn't come up with something
    // better yet.

    this.state = {
      isOfferer: false, // the user streaming video
      localStream: null, // stream the offerer broadcasts
      remoteStream: null // local stream of the offerer which others will get
    };
  }

  componentDidMount() {
    // We need some tool informing the folks that the streamer leaves. It's
    // "streamOff" function which is called when "beforeunload" occurs.

    window.addEventListener("beforeunload", this.streamOff);

    this.props.socket.addListener("joinStream", this.onJoinStream);
    this.props.socket.addListener("mediaMessage", this.onMediaMessage);
  }

  componentWillUnmount() {
    window.removeEventListener("beforeunload", this.streamOff);

    this.props.socket.removeListener("joinStream");
    this.props.socket.removeListener("mediaMessage");
  }

  // Well, "componentWillUpdate" is going to be deprecated. But it works for
  // the time being, and it's so convenient.
  componentWillUpdate(nextProps) {
    // "isStreamOn" is the only prop we care about here.
    if (nextProps.isStreamOn !== this.isStreamOn) {
      this.isStreamOn = nextProps.isStreamOn;

      this.toggleVideoStream();
    }
  }

  // Sets local description of the peer connection when dealing with offers and
  // answers.
  async createLocalDescription(pc, description, from, to) {
    try {
      await pc.setLocalDescription(description);
      this.sendMediaMessage({ "sdp": pc.localDescription }, from, to);

    } catch (error) {
      console.error(error);
    }
  }

  // Creates a new peer connection and returns it.
  createNewConnection(from, to) {
    const pcConfig = {
      iceServers: [{
        urls: "stun:stun.l.google.com:19302" // Google's public STUN server
      }]
    };

    const pc = new RTCPeerConnection(pcConfig);
    const { isOfferer } = this.state;

    // "onicecandidate" notifies us whenever an ICE agent needs to deliver a
    // message to the other peer through the signaling server.
    pc.onicecandidate = (event) => { // send the candidate to the remote peer
      if (event.candidate) {
        this.sendMediaMessage({ "candidate": event.candidate }, from, to);
      }
    };

    // If the user is an offerer, then let's... create an offer.
    if (isOfferer) {
      pc.addStream(this.state.localStream); // the stuff for remote peers
      pc.onnegotiationneeded = async () => {
        // The tricky construction below is for Chrome because it tends to fire
        // "negotiationneeded" event twice without any reasonable reason [1].
        // It caused me a weird exception in Chrome's console (and a few
        // worrying minutes).

        if (pc._negotiating === true)
          return;

        pc._negotiating = true;

        try {
          const offer = await pc.createOffer();
          this.createLocalDescription(pc, offer, from, to);

        } finally {
          pc._negotiating = false;
        }
      }
    }

    // When a remote stream arrives, grab it. It will be passed on to a video
    // element later.
    pc.ontrack = (track) => {
      this.setState({ remoteStream: track.streams[0] });
    };

    return pc;
  }

  // Starts the local stream and sets it as "localStream" state.
  async initMedia() {
    try {
      const localStream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true
      });

      this.setState({ localStream });

    } catch (error) {
      console.error(error);
    }
  }

  // The "second" part of "onJoinBroadcast". This one helps to share the
  // stream with a newcomer.
  onJoinStream(incomingUser) {
    // The stuff related to adding the newcomer to the list of participants is
    // done in "Chatroom" component (there's a listener with the same name).

    const { isOfferer, localStream } = this.state;

    // If a newcomer arrives and there's a stream is going, let them to
    // participate in it. The idea is: the offerer watches newcomers, and, if
    // there's someone arrives, the offerer creates a new peer connection. A
    // new offer is created, then the newcomer gets that offer, and so on. 

    if (isOfferer && localStream) { // is there really a stream?
      const socketId = this.props.socket.getSocket().id;

      const from = socketId;
      const to = incomingUser.socketId;
      
      const pc = this.createNewConnection(from, to);
      this.offererConnections.set(to, pc);
    }
  }

  // A listener for "mediaMessage" event. Listens to WebRTC signaling messages.
  // "mediaMessage" is an SDP or a candidate object, it also may be a
  // notification. "from" and "to" are IDs of sockets from which the message
  // have been sent.
  async onMediaMessage(mediaMessage, from, to) {

    // A service function adding a new ICE candidate to the pc' remote
    // description.
    const _processCandidate = (pc, candidate) => {
      try {
        pc.addIceCandidate(new RTCIceCandidate(candidate));
      } catch (error) {
        console.error(error);
      }
    };

    // A service function processing received SDPs.
    const _processSdp = async (pc, socketId, sdp) => {
      try {
        await pc.setRemoteDescription(
          new RTCSessionDescription(sdp)
        );

        // Did we get an offer from another peer? Then it would be nice to
        // answer that.

        if (pc.remoteDescription.type === "offer") {
          const from = socketId;
          const to = from; // semantics; we're creating an *answer*, after all
          const answer = await pc.createAnswer();

          this.createLocalDescription(pc, answer, from, to);
        }

      } catch (error) {
        console.error(error);
      }
    };

    // If "mediaMessage" is a string, then it's some sort of notification.
    // Deal with it.

    if (typeof mediaMessage === "string") {
      switch (mediaMessage) {
        case "streamOff":
          this.setState({ localStream: null, remoteStream: null });
          break;
      }

      return; // it's enough for now
    }

    const { isOfferer } = this.state;
    const socketId = this.props.socket.getSocket().id;

    if (isOfferer) {
      const pc = this.offererConnections.get(from);

      const isAnswer = mediaMessage.sdp && mediaMessage.sdp.type === "answer";
      const isCandidate = mediaMessage.candidate;

      if (!pc) return;

      if (isAnswer) { // we've got an answer, the job's done
        pc.setRemoteDescription(new RTCSessionDescription(mediaMessage.sdp));

      } else if (isCandidate) {
        _processCandidate(pc, mediaMessage.candidate);
      }

    } else { // a client that receives an offer

      if (to !== socketId) // it's not even for us...
        return;

      if (!this.answererConnection)
        this.answererConnection = this.createNewConnection(socketId, from);
        // Create a new connection through which we'll be answering.

      const pc = this.answererConnection;

      const isCandidate = mediaMessage.candidate;
      const isSdp = mediaMessage.sdp;

      if (isSdp) {
        _processSdp(pc, socketId, mediaMessage.sdp);

      } else if (isCandidate) {
        _processCandidate(pc, mediaMessage.candidate);
      }
    }
  }

  // Performs WebRTC signaling message.
  sendMediaMessage(mediaMessage, from, to) {
    this.props.socket.mediaMessage(mediaMessage, from, to);
  }

  // Toggles video streaming. Only one user in the chatroom can stream at the
  // same time.
  async toggleVideoStream() {
    const startRTC = async () => {
      // Get the local stream we'll be streaming. "initMedia" will write this
      // stream in the state with the same name.

      await this.initMedia();

      // Now we must create a new exclusive peer connection for every user in
      // the chatroom excluding us.

      for (const user of users) {
        const from = socket.getSocket().id;
        const to = user[1].socketId;

        const pc = this.createNewConnection(from, to);

        if (to !== from) // let's not create a connection for ourselves
          this.offererConnections.set(to, pc);
      }
    };

    const stopRTC = () => {
      for (const pc of this.offererConnections) {
        localStream.getTracks().forEach(track => track.stop());
        pc[1].close();
        // "[1]"? "offererConnections" is a map, we're dealing with a tuple here.
      }

      this.offererConnections.clear();
      this.sendMediaMessage("streamOff"); // inform others: кина не будет
      return this.setState({
        isOfferer: false,
        localStream: null
      });
    };

    const { localStream, remoteStream } = this.state;
    const { socket, users } = this.props;

    if (remoteStream)
      return console.error("Only one user can stream at the same time");

    // The button "toggle stream" from "Chatroom" component is clicked (this
    // brings to us "isStreamOn" prop which allows to define whether the button
    // was actually "on" or "off").

    if (this.isStreamOn)
      this.setState({ isOfferer: true }, startRTC);
    else
      stopRTC();
  }

  // Tell the others that they can turn off the video.
  streamOff() {
    if (this.state.isOfferer && this.isStreamOn)
      this.sendMediaMessage("streamOff");
  }

  render() {
    const { isOfferer, localStream, remoteStream } = this.state;

    return (
      <Video stream={ (isOfferer) ? localStream : remoteStream }/>
    );
  }
}

// [1]: https://github.com/mdn/samples-server/issues/57#issuecomment-412468733