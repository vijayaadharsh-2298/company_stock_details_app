import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Post from "./Post";

const HomePage = () => {
  const [posts, setPosts] = useState([]);
  const [showInfo, setShowInfo] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    let unMount = true;
    if (unMount) {
      const getPosts = async () => {
        const endPoint =
          "https://my-json-server.typicode.com/typicode/demo/posts";

        await fetch(endPoint)
          .then((res) => {
            return res.json();
          })
          .then((res) => {
            setPosts(res);
          })
          .catch((err) => {
            console.log("Error: ", err);
          });
      };
      getPosts();
    }

    return () => {
      unMount = false;
    };
  }, []);

  useEffect(() => {
    if (showInfo) {
      console.log("showInfo: ", showInfo);
    }
  }, [showInfo]);

  // componentDidMount
  // componentWillMount
  // componentDidUnMount
  // componentDidUpdate

  return (
    <div>
      {posts.length <= 0 ? (
        <p>Loading...</p>
      ) : (
                  posts.map((eachPost) => <Post eachPostProps={eachPost} setShowInfo={setShowInfo} />)
      )}
      <p
        onClick={() => {
          navigate("/about", {
            query: "?key=test",
          });
        }}
      >
        Navigate to About Me
      </p>
    </div>
  );
};

export default HomePage;
