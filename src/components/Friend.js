import React, { useState, useEffect } from "react";
import "./Friend.css";

const Friend = ({ name, photo, awards }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedAward, setSelectedAward] = useState(null);

  useEffect(() => {
    setIsVisible(true);
  }, [awards]);

  return (
    <div className={`friend ${isVisible ? "visible" : ""} mt-4 mb-4`}>
      <img className="friend-photo" src={photo} alt={name} />
      <h3>{name}</h3>
      <div className="friend-awards">
        {awards.map((award, index) => (
          <div
            key={index}
            className="award-container"
            onMouseEnter={() => setSelectedAward(award)}
            onMouseLeave={() => setSelectedAward(null)}
          >
            <img
              src="/images/award.png"
              alt={`Award ${index + 1}`}
              className="award-image"
            />
            {selectedAward === award && (
              <div className="award-tooltip">
                <p>
                  <strong>{award.title}</strong>
                </p>
                <p>{`${award.date}`}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Friend;
