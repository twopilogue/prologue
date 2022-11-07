import React from "react";

const Profile = () => {
  const author = {
    name: "tmpAuthor",
    summary: "tmpSummary",
  };

  return (
    <div className="bio">
      <img className="bio-avatar" src={require("./assets/tiger.png")} width={200} height={200} alt="Profile picture" />
      <div>
        {author?.name && (
          <div>
            <p>
              <strong>{author.name}</strong>
            </p>
            <p>{author?.summary || null}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
