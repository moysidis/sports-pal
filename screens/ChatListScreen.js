import React, { useContext, useState, useLayoutEffect, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { db, auth, storage } from '../firebase';
import { getDownloadURL, ref, listAll } from 'firebase/storage';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { ScrollView } from 'react-native-gesture-handler';
import UsersContext from '../context/usersContext';

const ChatScreen = ({ navigation, route }) => {
  const { usersState } = useContext(UsersContext);
  const [messages, setMessages] = useState([]);
  const [messageList, setMessageList] = useState([]);
  const [url, setUrl] = useState({});
  const [data, setData] = useState([]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  useEffect(() => {
    const getTheImages = async () => {
      const overviewRef = ref(storage, `profile`);
      const res = await listAll(overviewRef);
      try {
        res.prefixes.forEach(async (imageRef, index) => {
          const userId = imageRef._location.path_.substring(8);
          const fullRef = ref(storage, imageRef._location.path_ + '/image');
          const theUrl = await getDownloadURL(fullRef);
          setUrl((prev) => ({ ...prev, [userId]: theUrl }));
        });
      } catch (e) {
        console.log('error', e.message);
      }
    };

    getTheImages();
  }, []);

  console.log('url', url);

  useEffect(() => {
    const tempList = [
      ...new Set(
        messages.map((message) => {
          return message.user._id === auth.currentUser.uid
            ? message.recipientId
            : message.user._id;
        })
      ),
    ];
    setMessageList([...tempList]);
  }, [messages]);

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

  return (
    <View>
      <View style={{ marginTop: 50, alignItems: 'center' }}>
        <Text style={{ fontSize: 26, fontWeight: 'bold' }}>Chats</Text>
      </View>
      <ScrollView style={{ marginTop: 0 }}>
        {messageList?.map((userId, index) => {
          const user = usersState.userDocs.find((user) => user.id === userId);
          return (
            <TouchableOpacity
              key={index}
              style={{
                marginTop: 20,
                height: 100,
                padding: 20,
                flexDirection: 'row',
                alignItems: 'center',
              }}
              onPress={() => {
                navigation.navigate('TheChat', {
                  user: auth.currentUser.uid,
                  recipientId: user.id,
                  recipientName: user.data().name,
                });
              }}
            >
              <Image
                // source={require('../assets/user.png')}
                source={{ uri: url[user.id] }}
                resizeMode="cover"
                style={{
                  height: 100,
                  width: 100,
                  borderRadius: 100,
                }}
              />
              <Text
                style={{ fontSize: 20, fontWeight: 'bold', paddingLeft: 20 }}
              >
                {user.data().name}{' '}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default ChatScreen;
