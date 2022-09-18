import { NativeModules, NativeEventEmitter } from 'react-native';
const { RNAudioRecord } = NativeModules;
const EventEmitter = new NativeEventEmitter(RNAudioRecord);

const AudioRecord = {};

AudioRecord.init = options => RNAudioRecord.init(options);
AudioRecord.start = () => RNAudioRecord.start();
AudioRecord.stop = () => RNAudioRecord.stop();
AudioRecord.base64IntoBlob = (b64) => RNAudioRecord.base64IntoBlob(b64);

const eventsMap = {
  data: 'data'
};

AudioRecord.on = (event, callback) => {
  const nativeEvent = eventsMap[event];
  if (!nativeEvent) {
    throw new Error('Invalid event');
  }
  EventEmitter.removeAllListeners(nativeEvent);
  return EventEmitter.addListener(nativeEvent, callback);
};

export default AudioRecord;
