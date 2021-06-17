class Main {
  constructor() {
  }

  async init(){
    this.calls = {}

    this.socket = io('/')
    this.set_socket()

    this.peer = new Peer(undefined, {
      host: '/',
      port: '3001'
    })

    this.set_peer()

    this.video_emts = document.getElementById('video-emts') 
    
    this.stream = await this.get_stream()
    this.set_my_stream()
  }

  async get_stream(){
    return await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: false,
    })
  }

  set_my_stream(){
    let video_emt = document.createElement('video')
    video_emt.muted = true
    this.set_video_emt(video_emt, this.stream)
  }

  connect(usr_id) {
    console.log('I call someone')
    let call = this.peer.call(usr_id, this.stream)
    let video_emt = document.createElement('video')

    call.on('stream', usr_stream => {
      this.set_video_emt(video_emt, usr_stream)
    })

    call.on('close', () => {
      console.log('video_emt removed!')
      video_emt.remove()
    })

    this.calls[usr_id] = call
  }

  set_video_emt(video_emt, stream) {
    video_emt.srcObject = stream
    video_emt.addEventListener('loadedmetadata', () => {
      video_emt.play()
    })
    this.video_emts.append(video_emt)
  }

  set_socket() {
    this.socket.on('usr-connected', usr_id => {
      this.connect(usr_id)
    })

    this.socket.on('usr-disconnected', usr_id => {
      if (this.calls[usr_id]) this.calls[usr_id].close()
    })
  }

  set_peer() {
    this.peer.on('open', id => {
      this.socket.emit('join-room', ROOM_ID, id)
    })

    this.peer.on('call', call => {
      console.log('someone call me!')
      call.answer(this.stream)

      let video_emt = document.createElement('video')
      call.on('stream', usr_stream => {
        this.set_video_emt(video_emt, usr_stream)
      })
      call.on('close', () => {
        console.log('video_emt removed by called!')
        video_emt.remove()
      })
    })
  }
}

let main = new Main()
main.init();