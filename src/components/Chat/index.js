import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { io } from 'socket.io-client';

import { addMessageActionCreator } from '../../store/chat';

const Chat = () => {
  const dispatch = useDispatch();

  const [chatInput, setChatInput] = useState('');
  const [messages, setMessages] = useState([]);

  const user = useSelector((state) => state.session.user);
  const messagesFromStore = useSelector((state) => state.messages);

  const socket = useRef();

  useEffect(() => {
    socket.current = io('http://localhost:5000');

    socket.current.on('connect', () => {
      console.log('connected to server');
    });

    socket.current.on('disconnect', () => {
      console.log('disconnected from server');
    });

    socket.current.on('chat', (chat) => {
      console.log({ chat });
      setMessages((messages) => [...messages, chat]);
    });

    // when component unmounts, disconnect
    return () => {
      socket.current.disconnect();
    };
  }, []);

  useEffect(() => {
    setMessages(Object.values(messagesFromStore));

    console.log(messagesFromStore);

    socket.current.emit('chat', { user: user.username, message: messages });
  }, [messagesFromStore]);

  const updateChatInput = (e) => {
    setChatInput(e.target.value);
  };

  const sendChat = (e) => {
    e.preventDefault();

    const newMsg = { user: user.username, message: chatInput };

    socket.current.emit('message', newMsg);

    setChatInput('');
    dispatch(
      addMessageActionCreator({
        user: user.username,
        message: chatInput,
      })
    );
  };

  return (
    user && (
      <div>
        <div>
          {Object.entries(messages).length === 0 && <div>No messages yet</div>}
          {Object.entries(messages).map(([key, message]) => (
            <div key={key}>{`${message.user}: ${message.message}`}</div>
          ))}
        </div>

        <form onSubmit={sendChat}>
          <input value={chatInput} onChange={updateChatInput} />
          <button type="submit">Send</button>
        </form>
      </div>
    )
  );
};

export default Chat;
