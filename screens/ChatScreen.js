import React, {
  useCallback,
  useState,
  useLayoutEffect,
  useEffect,
} from 'react';
import { View, Text, Image } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import { db, storage } from '../firebase';
import { getDownloadURL, ref } from 'firebase/storage';
import {
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
} from 'firebase/firestore';

const ChatScreen = ({ navigation, route }) => {
  const { user, recipientId, recipientName, recipientCity } = route.params ?? {
    user: null,
    recipientId: null,
    recipientName: '',
    recipientCity: '',
  };

  const [image, setImage] = useState(null);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const getTheImage = async () => {
      let imageRef = ref(storage, `profile/${recipientId}/image`);
      const downloadURL = await getDownloadURL(imageRef);
      setImage(downloadURL);
    };

    getTheImage();
  }, [image]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: 'Chatting with ' + recipientName,
    });
  });

  useLayoutEffect(() => {
    const q = query(collection(db, 'chats'), orderBy('createdAt', 'desc'));

    const unsubscribe = onSnapshot(q, (snapshot) =>
      setMessages(
        snapshot.docs.map((doc) => ({
          _id: doc.data()._id,
          createdAt: doc.data().createdAt.toDate(),
          text: doc.data().text,
          user: doc.data().user,
          recipientId: doc.data().recipientId,
        }))
      )
    );

    return () => {
      unsubscribe();
    };
  }, [navigation]);

  const onSend = useCallback((messages = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages)
    );

    const { _id, createdAt, text, user } = messages[0];
    console.log(_id, createdAt, text, user, recipientId);

    addDoc(collection(db, 'chats'), {
      _id,
      createdAt,
      text,
      user,
      recipientId,
    });
  }, []);

  console.log(
    'messages',
    messages.filter(
      (message) =>
        (message.recipientId === user && message.user._id === recipientId) ||
        (message.recipientId === recipientId && message.user._id === user)
    ).length
  );
  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1, flexDirection: 'row', marginTop: 0 }}>
        {image ? (
          <Image
            source={{ uri: image }}
            resizeMode="contain"
            style={{
              marginLeft: 30,
              height: 120,
              width: 120,
              borderRadius: 100,
            }}
          />
        ) : null}
        <View style={{ justifyContent: 'center', padding: 20, marginTop: 15 }}>
          <Text style={{ fontSize: 22, fontWeight: 'bold' }}>
            {recipientName}
          </Text>
          <Text style={{ fontSize: 18 }}>{recipientCity}</Text>
        </View>
      </View>
      <View style={{ flex: 6 }}>
        <GiftedChat
          messages={messages.filter(
            (message) =>
              (message.recipientId === user &&
                message.user._id === recipientId) ||
              (message.recipientId === recipientId && message.user._id === user)
          )}
          showAvatarForEveryMessage={true}
          onSend={(messages) => onSend(messages)}
          user={{
            _id: user,
            // avatar: 'https://i.pravatar.cc/300',
            // name: auth?.currentUser?.displayName,
            // avatar: auth?.currentUser?.photoURL,
          }}
          listViewProps={{
            style: {
              backgroundColor: '#fbfbfb',
            },
          }}
        />
      </View>
    </View>
  );
};

export default ChatScreen;

{
  /* <View style={{ flex: 1, flexDirection: 'row' }}>
        {image ? (
          <Image
            source={{ uri: image }}
            resizeMode="contain"
            style={{
              flex: 2,
              borderRadius: 100,
            }}
          />
        ) : null}

        <View>
          <Text>Name</Text>
          <Text>Location</Text>
        </View>
      </View> */
}
