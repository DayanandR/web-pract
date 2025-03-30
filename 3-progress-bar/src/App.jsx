import { useState, useEffect } from "react";
import "./App.css";

const ProgressBar = ({ progress  }) => {
  const [animatedProgress, setAnimatedProgress] = useState(0);

  useEffect(() => {
    let animation;
    if (animatedProgress < progress) {
      animation = setTimeout(() => {
        setAnimatedProgress((prev) => Math.min(prev + 1, progress)); 
      }, 100); 
    }
    return () => clearTimeout(animation);
  }, [animatedProgress, progress]); 

  return (
    <div
      style={{
        border: "1px solid black",
        borderRadius: "10px",
        height: "24px",
        overflow: "hidden",
        margin: 5,
        width: "100%",
        backgroundColor: "#eee",
        position: "relative",
      }}
    >
      <div
        style={{
          width: `${animatedProgress}%`,
          backgroundColor: "green",
          color: animatedProgress < 5 ? "black" : "white",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: animatedProgress > 5 ? "center" : "flex-start",
          fontWeight: "bold",
          minWidth: animatedProgress > 0 ? "5px" : "0px",
          paddingLeft: animatedProgress < 5 ? "5px" : "0px",
          transition: "0.2s ease-in",
        }}
      >
        {animatedProgress}%
      </div>
    </div>
  );
};

function App() {
  const prog = [0, 1, 10, 20, 30, 40, 50, 60, 80, 100];

  return (
    <>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <h1>Progress Bar</h1>
      </div>
      <div style={{ width: "50%", margin: "auto" }}>
        {prog.map((item, idx) => (
          <ProgressBar key={idx} progress={item} />
        ))}
      </div>
    </>
  );
}

export default App;
