import useUIStore from '../store/ui.js';

const Channels = ({ channels }) => {
  const setCurrentChannelId = useUIStore((state) => state.setCurrentChannelId);
  const currentChannelId = useUIStore((state) => state.currentChannelId);

  return (
    <div style={{
      width: 300, borderRight: '1px solid #ddd', overflowY: 'auto', padding: 10,
    }}
    >
      <h3>Каналы</h3>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {channels.map((channel) => (
          <li
            key={channel.id}
            onClick={() => setCurrentChannelId(channel.id)}
            style={{
              padding: 10,
              cursor: 'pointer',
              background: currentChannelId === channel.id ? '#e0e0e0' : 'transparent',
              borderRadius: 5,
              marginBottom: 5,
            }}
          >
            {channel.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Channels;
