import { ToastAndroid } from 'react-native';

// Android toaster to show Messages when open success
export const toastAndroid = (
  message: string,
  duration?: 'short' | 'long',
  gravity?: 'top' | 'bottom' | 'center',
) => {
  if (gravity) {
    switch (gravity) {
      case 'top':
        ToastAndroid.showWithGravity(
          message.trim(),
          ToastAndroid.SHORT,
          ToastAndroid.TOP,
        );
        break;
      case 'bottom':
        ToastAndroid.showWithGravity(
          message.trim(),
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM,
        );
        break;
      case 'center':
        ToastAndroid.showWithGravity(
          message.trim(),
          ToastAndroid.SHORT,
          ToastAndroid.CENTER,
        );
        break;
      default:
        ToastAndroid.showWithGravity(
          message.trim(),
          ToastAndroid.SHORT,
          ToastAndroid.CENTER,
        );
    }
  }
};
