import React from "react";

const Post = (props) => {
  return (
    <div
      key={props.eachPostProps.id}
      onClick={() => {
        props.setShowInfo(props.eachPostProps);
      }}
    >
      <p>{props.eachPostProps.title}</p>
    </div>
  );
};

export default Post;
