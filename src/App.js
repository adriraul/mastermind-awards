import React, { useState } from "react";
import "./App.css";
import Friend from "./components/Friend";
import VideoBackground from "./components/VideoBackground";
import AwardModal from "./components/AwardModal";
import { AppProvider, useAppContext } from "./AppContext";

const App = () => {
  const { friends, updateFriendsData } = useAppContext();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleAwardSubmit = (updatedFriends) => {
    updateFriendsData(updatedFriends);
    handleCloseModal();
  };

  return (
    <div className="App">
      <VideoBackground videoUrl="/images/library.mp4" />
      <div className="pt-4 content">
        <div className="header-container">
          <div className="title-container">
            <h1>Mastermind Awards</h1>
          </div>
          <div className="button-container">
            <button className="rounded-button" onClick={handleOpenModal}>
              <span className="button-background"></span>
              <span className="button-text">+</span>
            </button>
          </div>
        </div>
        <div className="friends-container">
          {friends.map((friend, index) => (
            <Friend key={index} {...friend} />
          ))}
        </div>
      </div>
      <AwardModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        friends={friends}
        onAwardSubmit={handleAwardSubmit}
      />
    </div>
  );
};

const AppWrapper = () => {
  return (
    <AppProvider>
      <App />
    </AppProvider>
  );
};

export default AppWrapper;
