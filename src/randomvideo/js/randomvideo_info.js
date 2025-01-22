import './../css/randomvideo_info.css';
import { useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import io from "socket.io-client";

const socket = io("https://video.random-chat.site");

const Randomvideo_info = () => {
    const navigate = useNavigate();
    const hasAlerted = useRef(false);
    // useEffect(() => {
    //     if (!hasAlerted.current && !localStorage.getItem('userToken')) {
    //         hasAlerted.current = true;
    //         alert("로그인 후 이용해주세요.");
    //         navigate('/login')
    //     }
    // }, [])

    const localVideoRef = useRef(null); // 자신의 비디오
    const remoteVideoRef = useRef(null); // 상대방의 비디오
    const [disconnected, setDisconnected] = useState(false); // 연결 끊김
    const [localStream, setLocalStream] = useState(null); // 비디오, 오디오 스트림 저장
    const [remoteStream, setRemoteStream] = useState(null); // 상대 비디오, 오디오 스트림 저장
    const [peerConnection, setPeerConnection] = useState(null); // 피어 연결 객체
    const [roomId, setRoomId] = useState(""); // 방 ID
    const [waiting, setWaiting] = useState(false); // 대기중 상태
    const [isRoomReady, setIsRoomReady] = useState(false); // 방 준비 완료 상태
  
    // 처리된 ICE 후보들을 추적하기 위한 Set 객체
    const processedCandidates = useRef(new Set());
  
    useEffect(() => {
        console.log("localStream:", localStream);
    }, [localStream]);
    useEffect(() => {
        console.log("remoteStream:", remoteStream);
    }, [remoteStream]);
  
    useEffect(() => {
      // 로컬 비디오 스트림 얻기
      const getUserMediaStream = async () => {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({
            video: true,
            audio: true,
          });
          setLocalStream(stream);
          if (localVideoRef.current) {
            localVideoRef.current.srcObject = stream;
          }
        } catch (error) {
          console.error("Error accessing media devices", error);
        }
      };
  
      getUserMediaStream();
    }, []);
  
  
    // startRoom 클릭 시 대기 상태로 설정
    const startRoom = async () => {
      setWaiting(true); 
      socket.emit("start-room"); 
    
      // 기존 join-room 리스너 제거
      socket.off("join-room");
    
      socket.on("join-room", async (roomId, isFirstUser) => {
        // console.log("join-room : ", roomId);
        setRoomId(roomId);
        setWaiting(false); 
        setIsRoomReady(true); 
    
        // peerConnection이 없을 경우에만 생성 
        if (!peerConnection && localStream) {
          // console.log("PeerConnection not initialized");
          // console.log("Creating new RTCPeerConnection for:", roomId);
          const pc = new RTCPeerConnection({
            iceServers: [{
              urls: "stun:stun.l.google.com:19302"}, 
              // {
              // urls: "turn:119.195.163.35:3478",
              // username: "user",
              // credential: "user",
              // }
            ],
          });
    
          // 로컬 스트림의 트랙(미디어 데이터 정보 및 전송 역할)을 peerConnection에 추가
          localStream.getTracks().forEach((track) => {
            // console.log("Adding track to PeerConnection:", track);
            // console.log("localStream : ", localStream.getTracks());
            pc.addTrack(track, localStream);
          });
          
          // Offer(연결 제안서 ex) 어떻게 연결하자!) 생성 후 전송
          if (isFirstUser) {
            try {
              const offer = await pc.createOffer();
              // console.log("Offer created:", offer);
              // offer 확정 및 전송 준비
              await pc.setLocalDescription(offer);
              // console.log("Local description set:", pc.localDescription);
              socket.emit("send-offer", offer, roomId); // 서버로 Offer 전송
  
            } catch (error) {
              console.error("Error creating offer:", error);
            }
          }
    
          // ICE 후보(webRTC 연결 경로) 정보 전송
          pc.onicecandidate = (event) => {
            if (event.candidate) {
              const candidateKey = `${event.candidate.sdpMid}-${event.candidate.sdpMLineIndex}`;
    
              // 이미 처리된 후보는 다시 보내지 않음
              if (!processedCandidates.current.has(candidateKey)) {
                // console.log("ice-candidate : ", candidateKey + ",,, " + roomId);
                // console.log("ice 후보 정보 : ", event.candidate);
                // 연결을 위한 가능한 여러 경로들 중 하나, 방 아이디
                socket.emit("send-ice-candidate", event.candidate, roomId);
                processedCandidates.current.add(candidateKey);
              }
            }
          };
  
  
          pc.oniceconnectionstatechange = () => {
            console.log("ICE state:", pc.iceConnectionState);
          };
    
          // 원격 비디오 스트림 처리
          pc.ontrack = (event) => {
            // console.log("ontrack event triggered:", event);
            console.log("Track status:", event.track.readyState)
            if (event.streams[0]) {
              if (remoteVideoRef.current) {
                setRemoteStream(event.streams[0]);
                // console.log("Remote stream received:",  event.streams[0]);
                // console.log("Remote stream received 활동:",  event.streams[0].active);
                remoteVideoRef.current.srcObject = event.streams[0];
                // console.log("Remote stream received 결론:", remoteVideoRef.current.srcObject);
              }
            }
          };
    
          setPeerConnection(pc);
        }
      });
    };
    
  
  
    useEffect(() => {
      // offer(두 피어가 어떤 방식으로 통신할지 제안(협상)) 수신 시 처리
      const handleReceiveOffer = async (offer) => {
        // peerConnection(webRTC 연결 객체)가 없으면 바로 종료
        if (!peerConnection) return;
  
        // console.log("상대방의 offer를 받음 : ", offer);
        // console.log("상대방의 offer를 받음 : ", peerConnection.signalingState);
  
        try {
          // peerConnection(webRTC 연결 객체)의 연결상태가 stable(안정적) 이라면..
          if (peerConnection.signalingState === "stable" || peerConnection.signalingState === "have-remote-offer") {
            // 상대방의 offer를 peerConnection(webRTC 연결 객체)의 remote description으로 저장
            await peerConnection.setRemoteDescription(offer); 
            // 상대방의 offer에 대해 자신의 네트워크에 맞게 answer을 생성
            const answer = await peerConnection.createAnswer();
            // console.log("Answer created: ", answer);
            // 생성된 answer을 peerConnection(webRTC 연결 객체)에 설정하여, WebRTC연결을 계속 진행할 준비
            await peerConnection.setLocalDescription(answer);
            // console.log("Local description set: ", peerConnection.localDescription);
            // console.log("answer 생성 및 방번호 : ", answer + ",,, ", roomId);
            // 서버로 "send-answer" 이벤트를 보내고, answer이랑 roomId 데이터도 함께 보낸다.
            socket.emit("send-answer", answer, roomId);
          }
        } catch (error) {
          console.error("Error setting remote description:", error);
        }
      };
  
      // 서버에서 "receive-offer" 이벤트를 보내면, handleReceiveOffer 실행
      socket.on("receive-offer", handleReceiveOffer);
  
      // 서버를 끄거나, 새로고침했을때 중복 또는 메모리 누수를 방지
      return () => {
        socket.off("receive-offer", handleReceiveOffer);
      };
    }, [peerConnection, roomId]);
  
  
    useEffect(() => {
      // answer(상대방의 offer에 대해 자신의 네트워크에 맞게 응답을 생성) 수신 시 처리
      const handleReceiveAnswer = async (answer) => {
        // peerConnection(webRTC 연결 객체)가 없으면 바로 종료
        if (!peerConnection) return;
  
        // console.log("상대방의 answer를 받음 : ", answer);
        // console.log("상대방의 answer를 받음 : ", peerConnection.signalingState);
  
        try {
          // peerConnection(webRTC 연결 객체)의 연결상태가 stable(안정적) 이라면..
          await peerConnection.setRemoteDescription(answer);
          if (peerConnection.signalingState === "stable") {
            // 상대방이 보내준 answer을 peerConnection(webRTC 연결 객체)에 설정하여, 연결 준비 마무리
            // console.log("offer 및 answer 구현 완료 !");
          }
        } catch (error) {
          console.error("Error setting remote answer:", error);
        }
      };
  
      // 서버에서 "receive-answer" 이벤트를 보내면, handleReceiveAnswer 실행
      socket.on("receive-answer", handleReceiveAnswer);
  
      // 서버를 끄거나, 새로고침했을때 중복 또는 메모리 누수를 방지
      return () => {
        socket.off("receive-answer", handleReceiveAnswer);
      };
    }, [peerConnection]);
  
  
    useEffect(() => {
      // ICE candidate 수신 시 처리
      const handleReceiveIceCandidate = (candidate) => {
        // peerConnection(webRTC 연결 객체)가 없으면 바로 종료
        if (!peerConnection) return;
  
        // candidata(ICE 후보)를 받아서 이 ICE 후보(주소)를 통해 연결하자
        // console.log("receive-ice-candidate1:", candidate);
        // console.log("peerConnection.remoteDescription : ", peerConnection.remoteDescription);
        
        // remoteDescription이 설정되지 않은 경우 후보를 대기
        if (peerConnection.remoteDescription) {
          // console.log("receive-ice-candidate2:", candidate);
          peerConnection.addIceCandidate(candidate);
        } else {
          const waitForRemoteDescription = setInterval(() => {
            if (peerConnection.remoteDescription) {
              // console.log("remoteDescription is now set.");
              peerConnection.addIceCandidate(candidate);
              clearInterval(waitForRemoteDescription); // 대기가 완료되면 타이머 종료
            }
          }, 100);
        }
      };
  
      // 서버에서 "receive-ice-candidate" 이벤트를 보내면, handleReceiveIceCandidate 실행
      socket.on("receive-ice-candidate", handleReceiveIceCandidate);
  
      // 서버를 끄거나, 새로고침했을때 중복 또는 메모리 누수를 방지
      return () => {
        socket.off("receive-ice-candidate", handleReceiveIceCandidate);
      };
    }, [peerConnection]);




    const retryRoom = () => {
        window.location.href = "/randomvideo";
    };

    const exitRoom = () => {
        if (peerConnection) {
            // 서버에 연결 종료 알림
            socket.emit("exit-room", roomId);
        
            // WebRTC 연결 종료
            peerConnection.close();
            setPeerConnection(null);
            setLocalStream(null);
            setRemoteStream(null);
        
            // 연결 상태 업데이트
            setDisconnected(true); // 상태 변경
        }
        // 페이지 이동 (예: 홈 화면)
        navigate("/");
    };
    useEffect(() => {
        const handleBeforeUnload = () => {
            // 새로고침 또는 페이지 이동 시 exit-room 호출
            socket.emit("exit-room", roomId);
        };
        
        // 이벤트 리스너 추가
        window.addEventListener("beforeunload", handleBeforeUnload);
        
        // 컴포넌트 언마운트 시 처리
        return () => {
            window.removeEventListener("beforeunload", handleBeforeUnload);
            socket.emit("exit-room", roomId);
        };
    }, [roomId, socket]);
    useEffect(() => {
        // 상대방 또는 서버가 연결을 끊었다고 알림
        socket.on("room-disconnected", (reason) => {
            console.log("Connection disconnected: ", reason);
            setDisconnected(true);
        });
        
        return () => {
            socket.off("room-disconnected");
        };
    }, [socket]);


    return(
        <div className='randomvideo_info_container'>
            <div className='randomvideo_info_me_container'>
                <video className='randomvideo_info_me' ref={localVideoRef} autoPlay muted></video>
            </div>
            <div className='randomvideo_info_call_container'>
            {waiting ? (
                <div></div>
            ) : (
                remoteStream ? (
                    disconnected ? (
                        <button onClick={retryRoom} className='randomvideo_info_call'>retry</button>
                    ) : (
                        <button onClick={exitRoom} className='randomvideo_info_call'>exit</button>
                    )
                ) : (
                    <button onClick={startRoom} className='randomvideo_info_call'>Call</button>
                )
            )}
            </div>
            <div className='randomvideo_info_other_container'>
                {waiting ? (
                    <div className='randomvideo_info_other_wait_content'>
                        <div className='randomvideo_info_other_wait'></div>
                    </div>
                ) : (
                    disconnected ? (
                        <div className='randomvideo_info_other_left'>
                            Partner Left
                        </div>
                    ) : (
                        <video className='randomvideo_info_other' ref={remoteVideoRef} autoPlay></video>
                    )
                )}
            </div>
        </div>
    )
}

export default Randomvideo_info