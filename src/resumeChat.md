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
  <div class="suggested-questions">
 <button
      v-for="(question, index) in suggestedQuestions"
      :key="index"
      @click="useSuggestion(question)"
      :data-tooltip="question"  /* Add data-tooltip attribute */
    >
      {{ question }}
    </button>
  </div>
  <div class="input-box">
    <button class="left" @click="clearChat" title="Clear Chat">
      🧹
    </button>
    <input v-model="userInput" @keyup.enter="sendMessage" placeholder="Type your message..." />
    <button class="right" @click="sendMessage">
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
      suggestedQuestions: [],
    };
  },
  computed: {
    previousConversation() {
      return this.messages.map(message => `${message.type === 'user' ? "user's question" : "Christopher Godwin's answer"}: ${message.content}`).join('\n');
    }
  },
  mounted() {
    fetch('http://localhost:5000/suggestions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        previous_conversation: this.previousConversation
      }),
    })
      .then(response => response.json())
      .then(data => {
        this.suggestedQuestions = data.questions.map(questionObj => questionObj.question);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  },
  methods: {
    sendMessage() {
      if (this.userInput.trim() === '') return;

      this.messages.push({
        id: this.messageId++,
        content: this.userInput,
        type: 'user',
      });

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
      this.fetchSuggestions();

      this.userInput = '';
    },
    fetchSuggestions() {
      // Fetch suggestions from the /suggestions endpoint
      fetch('http://localhost:5000/suggestions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          previous_conversation: this.previousConversation
        }),
      })
        .then(response => response.json())
        .then(data => {
          // Map the questions array to an array of strings containing the questions
          this.suggestedQuestions = data.questions.map(questionObj => questionObj.question);
        })
        .catch(error => {
          console.error('Error:', error);
        });
    },
  },
    clearChat() {
      this.messages = [];
    },
    useSuggestion(question) {
      this.userInput = question;
      this.sendMessage();
    },
  },
};
</script>

<style scoped>
/* ... your existing styles ... */
.suggested-questions {
  margin: 1em 0;
}
.suggested-questions button {
  margin-right: 0.5em;
}
</style>


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

.suggested-questions{
  padding: 10px;
  background-color: white;
  margin: 0px;
  border: 0px 0px 1px 0px solid #4caf50;
}

.suggested-questions button {
  background-color: #4CAF50;  /* Green background */
  color: white;  /* White text */
  border: none;  /* No border */
  padding: 10px 15px;  /* Padding */
  margin: 5px 5px;  /* Margin for spacing between buttons */
  border-radius: 20px;  /* Rounded corners */
  cursor: pointer;  /* Hand cursor on hover */
  transition: background-color 0.3s;  /* Transition effect on hover */
  white-space: nowrap;  /* Prevent text wrapping */
  overflow: hidden;  /* Hide overflow */
  text-overflow: ellipsis;  /* Show ellipsis for overflow */
  max-width: 200px;  /* Set max width */
  position: relative;  /* Relative positioning for tooltip */
}

.suggested-questions button:hover {
  background-color: #45a049;  /* Darker green background on hover */
}

.suggested-questions button:hover::after {
    content: attr(data-tooltip);  /* Get tooltip text from data-tooltip attribute */
    position: absolute;  /* Absolute positioning */
    left: 100%;  /* Position to the right of the button */
    top: 0;  /* Align with the top of the button */
    white-space: pre;  /* Preserve whitespace in the tooltip */
    background-color: #4CAF50;  /* Background color */
    color: white;  /* Text color */
    padding: 10px;  /* Padding */
    border-radius: 5px;  /* Rounded corners */
    z-index: 1;  /* Bring to the front */
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
  border-radius: 0px 0 0 0px;
  outline: none;
}

.input-box button.left {
  background-color: #4CAF50;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 20px 0px 0px 20px;
  cursor: pointer;
  transition: background-color 0.3s;
  margin-left: 5px; /* Added margin for spacing between buttons */
}

.input-box button.right {
  background-color: #4CAF50;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 0px 20px 20px 0px;
  cursor: pointer;
  transition: background-color 0.3s;
  margin-right: 5px; /* Added margin for spacing between buttons */
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