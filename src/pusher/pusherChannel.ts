import { Pusher } from '@pusher/pusher-websocket-react-native';

export const connectToChannel = async (
  channelName: string,
  eventName: string,
) => {
  const pusher = Pusher.getInstance();
  await pusher.init({
    apiKey: '',
    cluster: '',
    onEvent: event => {
      return event.eventName;
    },
  });
  await pusher.connect();
  const channel = await pusher.subscribe({ channelName });
};
