import React from "react";

export default function ChannelList({ channels, current, onSelect }) {
  return (
    <div className="channel-list">
      <ul>
        {channels.map((ch, idx) => (
          <li key={idx}>
            <button
              className={current && ch.url === current.url ? "selected" : ""}
              onClick={() => onSelect(ch)}
            >
              {ch.logo && (
                <img src={ch.logo} alt="" style={{ height: 18, verticalAlign: "middle", marginRight: 8 }} />
              )}
              {ch.name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}