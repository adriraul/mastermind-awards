import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import postFriendsData from "../utils/postFriendsData";
import DatePicker from "react-datepicker";
import "./AwardModal.css";
import { format } from "date-fns";

const AwardModal = ({ isOpen, onClose, friends, onAwardSubmit }) => {
  const [selectedFriend, setSelectedFriend] = useState("");
  const [awardTitle, setAwardTitle] = useState("");
  const [awardDate, setAwardDate] = useState(new Date());
  const [awardDescription, setAwardDescription] = useState("");

  const handleFriendChange = (e) => {
    setSelectedFriend(e.target.value);
  };

  const handleTitleChange = (e) => {
    setAwardTitle(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setAwardDescription(e.target.value);
  };

  const handleSaveAward = async () => {
    const updatedFriends = friends.map((friend) => {
      if (friend.name === selectedFriend) {
        return {
          ...friend,
          awards: [
            ...friend.awards,
            {
              title: awardTitle,
              date: format(new Date(awardDate), "dd-MM-yyyy"),
              description: awardDescription,
            },
          ],
        };
      }
      return friend;
    });

    try {
      await postFriendsData(updatedFriends);
      onAwardSubmit(updatedFriends);
      onClose();
    } catch (error) {
      console.error("Error al guardar el premio:", error);
    }
  };

  return (
    <Modal show={isOpen} onHide={onClose} className="custom-modal">
      <Modal.Header closeButton>
        <Modal.Title>New Award</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="friendSelect">
            <Form.Label>Member</Form.Label>
            <Form.Control
              as="select"
              value={selectedFriend}
              onChange={handleFriendChange}
              className="mb-2"
            >
              <option value="" disabled>
                Select a member
              </option>
              {friends.map((friend, index) => (
                <option key={index} value={friend.name}>
                  {friend.name}
                </option>
              ))}
            </Form.Control>
          </Form.Group>

          <Form.Group controlId="awardTitle">
            <Form.Label>Award Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter award title"
              value={awardTitle}
              onChange={handleTitleChange}
              className="mb-2"
            />
          </Form.Group>

          <Form.Group controlId="awardDate">
            <div>
              <Form.Label>Date</Form.Label>
            </div>
            <div>
              <DatePicker
                selected={awardDate}
                onChange={(date) => setAwardDate(date)}
                dateFormat="dd/MM/yyyy"
                className="mb-2"
              />
            </div>
          </Form.Group>

          <Form.Group controlId="awardDescription">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Enter award description"
              value={awardDescription}
              onChange={handleDescriptionChange}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Cerrar
        </Button>
        <Button variant="primary" onClick={handleSaveAward}>
          Guardar Award
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AwardModal;
