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

  useEffect(() => {
    if (localStream && !peerConnection) {
      // WebRTC 연결 설정
      const pc = new RTCPeerConnection({
        iceServers: [{ urls: "stun:stun.l.google.com:19302" }], // ICE 서버 설정
      });

      // 로컬 스트림을 피어 연결에 추가
      localStream.getTracks().forEach((track) => {
        pc.addTrack(track, localStream);
      });

      // ICE 후보가 생길 때마다 서버로 보내기
      pc.onicecandidate = (event) => {
        if (event.candidate) {
          socket.emit("send-ice-candidate", event.candidate, roomId);
        }
      };

      // 원격 스트림 수신 시 처리
      pc.ontrack = (event) => {
        if (remoteVideoRef.current && event.streams[0]) {
          remoteVideoRef.current.srcObject = event.streams[0]; // 상대방 스트림을 remoteVideoRef에 설정
        }
      };

      setPeerConnection(pc);
    }
  }, [localStream, peerConnection, roomId]);

  // startRoom 클릭 시 대기 상태로 설정
  const startRoom = () => {
    setWaiting(true); // 대기 중 상태로 변경
    socket.emit("start-room"); // 서버에 방 생성 요청
  };

  useEffect(() => {
    // 방에 들어갔을 때 처리
    const handleJoinRoom = (roomId) => {
      setRoomId(roomId);
      setWaiting(false); // 대기 중 상태 해제
      setIsRoomReady(true); // 방이 준비되었음을 표시
      console.log("Joined room:", roomId);
    };

    socket.on("join-room", handleJoinRoom);

    // cleanup 함수로 이벤트 리스너 제거
    return () => {
      socket.off("join-room", handleJoinRoom);
    };
  }, []);

  useEffect(() => {
    // offer 수신 시 처리
    const handleReceiveOffer = async (offer) => {
      if (!peerConnection) return;

      try {
        if (peerConnection.signalingState === "stable") {
          await peerConnection.setRemoteDescription(offer); // 원격 offer 설정
          const answer = await peerConnection.createAnswer();
          await peerConnection.setLocalDescription(answer);
          socket.emit("send-answer", answer, roomId);
        }
      } catch (error) {
        console.error("Error setting remote description:", error);
      }
    };

    socket.on("receive-offer", handleReceiveOffer);

    return () => {
      socket.off("receive-offer", handleReceiveOffer);
    };
  }, [peerConnection, roomId]);

  useEffect(() => {
    // answer 수신 시 처리
    const handleReceiveAnswer = async (answer) => {
      if (!peerConnection) return;

      try {
        if (peerConnection.signalingState === "stable") {
          await peerConnection.setRemoteDescription(answer);
        }
      } catch (error) {
        console.error("Error setting remote answer:", error);
      }
    };

    socket.on("receive-answer", handleReceiveAnswer);

    return () => {
      socket.off("receive-answer", handleReceiveAnswer);
    };
  }, [peerConnection]);

  useEffect(() => {
    // ICE candidate 수신 시 처리
    const handleReceiveIceCandidate = (candidate) => {
      if (!peerConnection) return;

      peerConnection.addIceCandidate(candidate);
    };

    socket.on("receive-ice-candidate", handleReceiveIceCandidate);

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
