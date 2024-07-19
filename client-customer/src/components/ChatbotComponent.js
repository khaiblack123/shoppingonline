// import React, { useState } from 'react';
// import { TextField, Button, Paper, Typography, List, ListItem, ListItemText } from '@material-ui/core';

// const ChatbotComponent = () => {
//   const [messages, setMessages] = useState([]);
//   const [input, setInput] = useState('');

//   const handleSend = () => {
//     if (input.trim()) {
//       const newMessages = [...messages, { text: input, user: 'user' }];
//       setMessages(newMessages);
//       setInput('');

//       // Fake bot response for demonstration
//       setTimeout(() => {
//         setMessages(prevMessages => [
//           ...prevMessages,
//           { text: `Bot response to "${input}"`, user: 'bot' }
//         ]);
//       }, 1000);
//     }
//   };

//   return (
//     <Paper style={{ padding: '16px', margin: '16px' }}>
//       <Typography variant="h6">Chatbot</Typography>
//       <List>
//         {messages.map((message, index) => (
//           <ListItem key={index}>
//             <ListItemText
//               primary={message.text}
//               secondary={message.user === 'user' ? 'You' : 'Bot'}
//               align={message.user === 'user' ? 'right' : 'left'}
//             />
//           </ListItem>
//         ))}
//       </List>
//       <TextField
//         value={input}
//         onChange={(e) => setInput(e.target.value)}
//         label="Type a message"
//         fullWidth
//       />
//       <Button onClick={handleSend} variant="contained" color="primary" style={{ marginTop: '8px' }}>
//         Send
//       </Button>
//     </Paper>
//   );
// };

// export default ChatbotComponent;
