import React from "react";

export default function Header({ onInputFile, onInputUrl, m3uUrl, setM3uUrl }) {
  return (
    <div className="header">
      <div>
        <strong>IPTV Web Player</strong>
      </div>
      <div>
        <input
          type="file"
          accept=".m3u,.m3u8"
          onChange={onInputFile}
          title="上传本地m3u"
        />
        <input
          type="text"
          placeholder="输入m3u/m3u8在线地址"
          value={m3uUrl}
          onChange={e => setM3uUrl(e.target.value)}
          style={{ width: 220 }}
        />
        <button onClick={onInputUrl}>加载</button>
      </div>
    </div>
  );
}