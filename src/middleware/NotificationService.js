import firebase from 'react-native-firebase';
import { UpdateToken } from './API';

const NotificationService = (userId, onDataNotifs) => {

  const channel = new firebase.notifications.Android.Channel(
    'nxtstore123',
    'nxtstore123 channel',
    firebase.notifications.Android.Importance.Max,
  )
  .setDescription('nxtstore123')
  .setSound('notif.mp3');

  firebase.notifications().android.createChannel(channel);

  // firebase.messaging().subscribeToTopic('user_Suraj');  //to receive message for individual users

  const checkPermission = async () => {
    const enabled = await firebase.messaging().hasPermission();
    if (enabled) {
      getToken();
    } else {
      requestPermission();
    }
  }

  const saveToken = (fcmToken) => {
    let formData = {
      "fcmToken": fcmToken
    };
    UpdateToken(userId, formData)
      .then((result) => {
        // console.warn(result);
      })
      .catch((err) => {
        // console.warn('Notification Service Error');
      })
  }

  //Get token from firebase
  const getToken = async () => {
    try {
      fcmToken = await firebase.messaging().getToken();
      if (fcmToken) {
        saveToken(fcmToken);
      } else {
        //error occurred
      }
    } catch (err) {
      console.warn('No Internet!');
    }
  }

  //Request permission for firebase
  const requestPermission = async () => {
    try {
      await firebase.messaging().requestPermission();
      getToken();
    } catch (error) {
      console.log('permission rejected');
    }
  }

  const createNotificationListeners = () => {
    //We have to check for refreshed tokens
    onTokenRefreshListener = firebase.messaging().onTokenRefresh(fcmToken => {
      subscribe(fcmToken);
    });

    //Listen for notifications
    firebase.notifications().onNotificationOpened((notificationOpen) => {
      // const { title, body, _data } = notification;
      onDataNotifs(notificationOpen.notification._data);
    });

    // app tapped/opened in killed state
    firebase.notifications().getInitialNotification()
      .then((notificationOpen) => {
        if (notificationOpen) {
          onDataNotifs(notificationOpen.notification._data);
          // anything you want to do with notification object.....
        }
      });

    // showing notification when app is in foreground.
    firebase.notifications().onNotification(notification => {
      if (notification._data) {
        onDataNotifs(notification._data);
      }
      const localNotification = new firebase.notifications.Notification({
        sound: 'notif.mp3',
        show_in_foreground: true,
      })
      .setNotificationId(notification.notificationId)
      .setTitle(notification.title)
      .setBody(notification.body)
      .setSound(channel.sound)
      .android.setChannelId('nxtstore123')
      .android.setAutoCancel(true);

      firebase.notifications().displayNotification(localNotification);

    });

  }

  checkPermission();
  createNotificationListeners();
}

export default NotificationService;