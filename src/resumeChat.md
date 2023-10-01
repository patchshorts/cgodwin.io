---
title: Resume Chat
icon: chat
article: false
headerDepth: 1
showInSidebar: false
sidebar: false
---
<div class="chat-container">
  <div class="chat-header">
    Chat with Virtual Christopher Godwin
  </div>
  <div class="chat-box">
    <div v-for="message in messages" :key="message.id" :class="`message ${message.type}`">
      <div class="message-content">
        {{ message.content }}
      </div>
    </div>
  </div>
  <div class="input-box">
    <input v-model="userInput" @keyup.enter="sendMessage" placeholder="Type your message..." />
    <button @click="sendMessage">
      ✉️
    </button>
  </div>
</div>

<script>
export default {
  data() {
    return {
      userInput: '',
      messages: [],
      messageId: 0,
    };
  },
  computed: {
    previousConversation() {
      return this.messages.map(message => `${message.type === 'user' ? "user's question" : "Christopher Godwin's answer"}: ${message.content}`).join('\n');
    }
  },
  methods: {
    sendMessage() {
      if (this.userInput.trim() === '') return;

      // Add user's message to chat
      this.messages.push({
        id: this.messageId++,
        content: this.userInput,
        type: 'user',
      });

      // Send POST request to Flask backend
      fetch('http://localhost:5000/ask', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          question: this.userInput,
          previous_conversation: this.previousConversation
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          // Add GPT-4's response to chat
          this.messages.push({
            id: this.messageId++,
            content: data.response,
            type: 'bot',
          });
        })
        .catch((error) => {
          console.error('Error:', error);
          this.messages.push({
            id: this.messageId++,
            content: 'Error communicating with the backend.',
            type: 'error',
          });
        });

      this.userInput = '';
    },
  },
};
</script>

<style scoped>
.chat-container {
  min-width: 100%;
  height: fit-content;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  font-family: 'Arial', sans-serif;
  position: relative;
}

.chat-header {
  background-color: #4CAF50;
  color: white;
  padding: 10px 20px;
  font-weight: bold;
}

.chat-box {
  height: 400px;
  overflow-y: auto;
  padding: 10px 20px;
  background-color: #f5f5f5;
}

.input-box {
  display: flex;
  padding: 10px 20px;
  background-color: #fff;
  border-top: 1px solid #ddd;
}

.input-box input {
  flex-grow: 1;
  padding: 10px;
  border: none;
  border-radius: 20px 0 0 20px;
  outline: none;
}

.input-box button {
  background-color: #4CAF50;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 0 20px 20px 0;
  cursor: pointer;
  transition: background-color 0.3s;
}

.input-box button:hover {
  background-color: #45a049;
}

.message {
  padding: 10px;
  margin: 10px 0;
  border-radius: 10px;
  width: fit-content;
  max-width: 75% !important;
  min-width: 25% !important;
}

.message-content {
  padding: 10px 15px;
  border-radius: 10px;
}

.message.user {
  background-color: #e6f7ff;
  margin-left: auto;
}

.message.bot {
  background-color: #fff2e6;
  margin-right: auto;
}

.message.error {
  background-color: #ffe6e6;
  text-align: center;
}
</style>