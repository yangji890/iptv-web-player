export function parseM3U(content) {
  const lines = content.split('\n');
  const channels = [];
  let current = {};

  lines.forEach(line => {
    if (line.startsWith('#EXTINF')) {
      const nameMatch = line.match(/,(.*)$/);
      const logoMatch = line.match(/tvg-logo="([^"]+)"/);
      current = {
        name: nameMatch ? nameMatch[1] : '未知频道',
        logo: logoMatch ? logoMatch[1] : ''
      };
    } else if (/^(http|rtmp)/.test(line)) {
      current.url = line.trim();
      channels.push({ ...current });
    }
  });

  return channels;
}