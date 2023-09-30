---
title: Resume Chat
icon: chat
article: false
headerDepth: 1
showInSidebar: false
sidebar: false
---
<template>
  <div class="chat-container">
    <div class="chat-box">
      <div v-for="message in messages" :key="message.id" :class="`message ${message.type}`">
        {{ message.content }}
      </div>
    </div>
    <div class="input-box">
      <input v-model="userInput" @keyup.enter="sendMessage" placeholder="Type your message..." />
      <button @click="sendMessage">Send</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userInput: '',
      messages: [],
      messageId: 0,
    };
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
        body: JSON.stringify({ prompt: this.userInput }),
      })
        .then((response) => response.json())
        .then((data) => {
          // Add GPT-4's response to chat
          this.messages.push({
            id: this.messageId++,
            content: data,
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
  width: 400px;
  height: 500px;
  border: 1px solid #ccc;
  padding: 10px;
  position: relative;
}

.chat-box {
  height: 400px;
  overflow-y: auto;
  padding: 10px;
  border: 1px solid #ddd;
}

.input-box {
  position: absolute;
  bottom: 10px;
  left: 10px;
  right: 10px;
}

.message {
  padding: 5px;
  margin: 5px 0;
  border-radius: 5px;
}

.message.user {
  background-color: #e6f7ff;
  text-align: right;
}

.message.bot {
  background-color: #fff2e6;
}

.message.error {
  background-color: #ffe6e6;
  text-align: center;
}
</style>