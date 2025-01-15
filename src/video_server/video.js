import React, { useEffect, useRef, useState } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:5000");

const Video = () => {
  const localVideoRef = useRef(null); // 자신의 비디오
  const remoteVideoRef = useRef(null); // 상대방의 비디오
  const [localStream, setLocalStream] = useState(null); // 비디오, 오디오 스트림 저장
  const [peerConnection, setPeerConnection] = useState(null); // 피어 연결 객체
  const [roomId, setRoomId] = useState(""); // 방 ID
  const [waiting, setWaiting] = useState(false); // 대기중 상태
  const [isRoomReady, setIsRoomReady] = useState(false); // 방 준비 완료 상태

  // 처리된 ICE 후보들을 추적하기 위한 Set 객체
  const processedCandidates = useRef(new Set());

  useEffect(() => {
    console.log("상대방 비디오 정보 : ", remoteVideoRef)
  }, [remoteVideoRef])

  // 1!
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


  // 5!
  // startRoom 클릭 시 대기 상태로 설정
  const startRoom = async () => {
    setWaiting(true); // 대기 중 상태로 변경
    socket.emit("start-room"); // 서버에 방 생성 요청
  
    // 기존 join-room 리스너 제거
    socket.off("join-room");
  
    socket.on("join-room", async (roomId, isFirstUser) => {
      console.log("join-room : ", roomId);
      setRoomId(roomId);
      setWaiting(false); // 대기 중 상태 해제
      setIsRoomReady(true); // 방이 준비되었음을 표시
  
      // peerConnection이 없을 경우에만 생성 
      if (!peerConnection && localStream) {
        console.log("PeerConnection not initialized");
        console.log("Creating new RTCPeerConnection for:", roomId);
        const pc = new RTCPeerConnection({
          iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
        });
  
        // 로컬 스트림의 트랙(미디어 데이터 정보 및 전송 역할)을 peerConnection에 추가
        localStream.getTracks().forEach((track) => {
          console.log("Adding track to PeerConnection:", track);
          console.log("localStream : ", localStream.getTracks());
          // console.log("pc : ", pc);
          pc.addTrack(track, localStream);
        });
        
        // Offer(연결 제안서 ex) 어떻게 연결하자!) 생성 후 전송
        if (isFirstUser) {
          try {
            const offer = await pc.createOffer();
            console.log("Offer created:", offer);
            // offer 확정 및 전송 준비
            await pc.setLocalDescription(offer);
            console.log("Local description set:", pc.localDescription);
            socket.emit("send-offer", offer, roomId); // 서버로 Offer 전송
          } catch (error) {
            console.error("Error creating offer:", error);
          }
        }
  
        // ICE 후보가 중복되지 않도록 처리
        pc.onicecandidate = (event) => {
          if (event.candidate) {
            const candidateKey = `${event.candidate.sdpMid}-${event.candidate.sdpMLineIndex}`;
  
            // 이미 처리된 후보는 다시 보내지 않음
            if (!processedCandidates.current.has(candidateKey)) {
              // ㅁㄴㅇㄹ
              console.log("ice-candidate : ", candidateKey + ",,, " + roomId);
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
          console.log("ontrack event triggered:", event);
          if (event.streams[0]) {
            console.log("Remote stream received:",  event.streams[0]);
            if (remoteVideoRef.current) {
              remoteVideoRef.current.srcObject = event.streams[0];
            }
          }
        };
  
        setPeerConnection(pc);
      }
    });
  };


  // 10!
  useEffect(() => {
    // offer(두 피어가 어떤 방식으로 통신할지 제안(협상)) 수신 시 처리
    const handleReceiveOffer = async (offer) => {
      // peerConnection(webRTC 연결 객체)가 없으면 바로 종료
      if (!peerConnection) return;

      console.log("상대방의 offer를 받음 : ", offer);
      console.log("상대방의 offer를 받음 : ", peerConnection.signalingState);

      try {
        // peerConnection(webRTC 연결 객체)의 연결상태가 stable(안정적) 이라면..
        if (peerConnection.signalingState === "stable" || peerConnection.signalingState === "have-remote-offer") {
          // 상대방의 offer를 peerConnection(webRTC 연결 객체)의 remote description으로 저장
          await peerConnection.setRemoteDescription(offer); 
          // 상대방의 offer에 대해 자신의 네트워크에 맞게 answer을 생성
          const answer = await peerConnection.createAnswer();
          console.log("Answer created: ", answer);
          // 생성된 answer을 peerConnection(webRTC 연결 객체)에 설정하여, WebRTC연결을 계속 진행할 준비
          await peerConnection.setLocalDescription(answer);
          console.log("Local description set: ", peerConnection.localDescription);
          console.log("answer 생성 및 방번호 : ", answer + ",,, ", roomId);
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


  // 12!
  useEffect(() => {
    // answer(상대방의 offer에 대해 자신의 네트워크에 맞게 응답을 생성) 수신 시 처리
    const handleReceiveAnswer = async (answer) => {
      // peerConnection(webRTC 연결 객체)가 없으면 바로 종료
      if (!peerConnection) return;

      console.log("상대방의 answer를 받음 : ", answer);
      console.log("상대방의 answer를 받음 : ", peerConnection.signalingState);

      try {
        // peerConnection(webRTC 연결 객체)의 연결상태가 stable(안정적) 이라면..
        await peerConnection.setRemoteDescription(answer);
        if (peerConnection.signalingState === "stable") {
          // 상대방이 보내준 answer을 peerConnection(webRTC 연결 객체)에 설정하여, 연결 준비 마무리
          console.log("offer 및 answer 구현 완료 !");
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


  // 4!
  useEffect(() => {
    // ICE candidate 수신 시 처리
    const handleReceiveIceCandidate = (candidate) => {
      // peerConnection(webRTC 연결 객체)가 없으면 바로 종료
      if (!peerConnection) return;

      // candidata(ICE 후보)를 받아서 이 ICE 후보(주소)를 통해 연결하자
      // peerConnection.addIceCandidate(candidate);

      console.log("receive-ice-candidate:", candidate);
      
      // remoteDescription이 설정되지 않은 경우 후보를 대기
      if (peerConnection.remoteDescription) {
        peerConnection.addIceCandidate(candidate);
      } else {
        // remoteDescription이 설정되기 전에는 candidate를 대기
        socket.once("receive-offer", () => {
          peerConnection.addIceCandidate(candidate);
        });
      }
    };

    // 서버에서 "receive-ice-candidate" 이벤트를 보내면, handleReceiveIceCandidate 실행
    socket.on("receive-ice-candidate", handleReceiveIceCandidate);

    // 서버를 끄거나, 새로고침했을때 중복 또는 메모리 누수를 방지
    return () => {
      socket.off("receive-ice-candidate", handleReceiveIceCandidate);
    };
  }, [peerConnection]);



  return (
    <div>
      <h1>WebRTC Video Call</h1>
      <div>
        {waiting ? (
          <p>대기 중... 두 명이 모두 모이면 영상통화가 시작됩니다.</p>
        ) : (
          <button onClick={startRoom}>Start Room</button>
        )}
      </div>
      <div>
        <h3>Your Face</h3>
        <video ref={localVideoRef} autoPlay muted></video>
      </div>
      {isRoomReady && (
        <div>
          <h3>Remote Face</h3>
          <video ref={remoteVideoRef} autoPlay></video>
        </div>
      )}
    </div>
  );
};

export default Video;
