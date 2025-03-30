import { useState } from "react";
import "./App.css";
import json from "./data.json";

const List = ({ list, onAddFolder, onRemoveFolder }) => {
  const [isExpanded, setIsExpanded] = useState({});

  const toggleExpand = (id) => {
    setIsExpanded((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <>
      {list.map((item) => (
        <div key={item.id}>
          <p>
            <span
              style={{ cursor: "pointer" }}
              onClick={() => onRemoveFolder(item.id)}
            >
              ❌
            </span>{" "}
            {item.name}{" "}
            {item.isFolder && (
              <>
                <span
                  style={{
                    cursor: "pointer",
                    fontWeight: "bold",
                    marginLeft: 5,
                  }}
                  onClick={() => toggleExpand(item.id)}
                >
                  {isExpanded[item.id] ? "🔽" : "▶️"}
                </span>
                <span
                  style={{
                    cursor: "pointer",
                    fontWeight: "bold",
                    marginLeft: 5,
                  }}
                  onClick={() => onAddFolder(item.id)}
                >
                  📂
                </span>
              </>
            )}
          </p>

          {isExpanded[item.id] && item.children?.length > 0 && (
            <div style={{ paddingLeft: 20, borderLeft: "1px solid #ccc" }}>
              <List list={item.children} onAddFolder={onAddFolder} onRemoveFolder={onRemoveFolder} />
            </div>
          )}
          {isExpanded[item.id] && item.children?.length === 0 && (
            <div style={{ paddingLeft: 20, borderLeft: "1px solid #ccc" }}>
              empty
            </div>
          )}
        </div>
      ))}
    </>
  );
};

function App() {
  const [res, setRes] = useState(json);

  const handleAddFolder = (parentId) => {
    const newFolderName = prompt("Enter folder name");
    if (!newFolderName) return;

    setRes((prev) => addFolderRecursive(prev, parentId, newFolderName));
  };

  const handleRemoveFolder = (id) => {
    setRes((prev) => removeFolderRecursive(prev, id));
  };

  const addFolderRecursive = (items, parentId, name) => {
    return items.map((item) => {
      if (item.id === parentId) {
        return {
          ...item,
          children: [
            ...item.children,
            { id: Date.now(), name, isFolder: true, children: [] },
          ],
        };
      }
      if (item.children) {
        return {
          ...item,
          children: addFolderRecursive(item.children, parentId, name),
        };
      }
      return item;
    });
  };

  const removeFolderRecursive = (items, idToRemove) => {
    return items.filter((item) => {
      if (item.id === idToRemove) return false;
      if (item.children) {
        item.children = removeFolderRecursive(item.children, idToRemove);
      }
      return true;
    });
  };

  return (
    <div
      style={{
        marginLeft: 10,
        padding: 20,
        border: "1px solid black",
        borderRadius: 5,
        boxShadow: "2px 2px 5px rgba(0,0,0,0.3)",
        maxWidth: 300,
      }}
    >
      <h1>File System</h1>
      <List list={res} onAddFolder={handleAddFolder} onRemoveFolder={handleRemoveFolder} />
    </div>
  );
}

export default App;
