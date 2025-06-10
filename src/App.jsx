import React, { useState } from "react";
import { parseM3U } from "./m3uParser.js";
import Header from "./components/Header.jsx";
import ChannelList from "./components/ChannelList.jsx";
import Player from "./components/Player.jsx";
import "./style.css";

function App() {
  const [channels, setChannels] = useState([]);
  const [current, setCurrent] = useState(null);
  const [m3uUrl, setM3uUrl] = useState("");

  // 上传本地文件
  const onInputFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const ch = parseM3U(ev.target.result);
      setChannels(ch);
      setCurrent(ch[0] || null);
    };
    reader.readAsText(file);
  };

  // 加载 m3u 地址
  const onInputUrl = async () => {
    if (!m3uUrl) return;
    try {
      const res = await fetch(m3uUrl);
      const txt = await res.text();
      const ch = parseM3U(txt);
      setChannels(ch);
      setCurrent(ch[0] || null);
    } catch {
      alert("无法加载m3u地址");
    }
  };

  return (
    <div className="container">
      <Header
        onInputFile={onInputFile}
        onInputUrl={onInputUrl}
        m3uUrl={m3uUrl}
        setM3uUrl={setM3uUrl}
      />
      <ChannelList channels={channels} current={current} onSelect={setCurrent} />
      <Player url={current?.url} />
    </div>
  );
}

export default App;