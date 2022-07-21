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
  const [url, setUrl] = useState([]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  useEffect(() => {
    const overviewRef = ref(storage, `profile`);
    listAll(overviewRef)
      .then((res) => {
        let promises = res.prefixes.forEach((imageRef) => {
          getDownloadURL(imageRef._location.path_ + '/image');
        });
        Promise.all(promises).then((urls) => {
          setUrl({
            urlLink: urls,
          });
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

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
    <ScrollView style={{ marginTop: 30 }}>
      {messageList?.map((userId, index) => {
        // const getTheImage = async () => {
        //   let imageRef = ref(storage, `profile/${id}/image`);
        //   const downloadURL = await getDownloadURL(imageRef);
        //   return downloadURL;
        // };

        const user = usersState.userDocs.find((user) => user.id === userId);
        // const imageUrl = getTheImage();
        return (
          <TouchableOpacity
            key={index}
            style={{
              height: 80,
              padding: 10,
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
              source={require('../assets/user.png')}
              resizeMode="contain"
              style={{
                height: 100,
                width: 100,
              }}
            />
            <Text style={{ fontSize: 20 }}>{user.data().name} </Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
};

export default ChatScreen;
