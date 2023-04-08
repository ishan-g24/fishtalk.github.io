// Prompt the user for their name
const username = prompt('What is your name?');

// Greet the user
const messageList = document.querySelector('.messages');
const greeting = document.createElement('li');
greeting.textContent = `Hello ${username}! Hope you brought pizza 🍕`;
messageList.appendChild(greeting);

// Connect to the server using Socket.io
const socket = io();

// Get references to the DOM elements
const messageForm = document.querySelector('.message-form');
const messageInput = messageForm.querySelector('input');
const messagesContainer = document.querySelector('.messages-container');

// Function to create a new message and append it to the list
function appendMessage(message) {
  const messageItem = document.createElement('li');
  messageItem.textContent = message;
  messageList.appendChild(messageItem);

  // Scroll to the bottom of the messages container
  messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

// Handle form submission
messageForm.addEventListener('submit', (event) => {
  // Prevent default form submission behavior
  event.preventDefault();

  // Get the message text from the input field
  const messageText = messageInput.value;

  // Only send the message if there is some text
  if (messageText.trim().length > 0) {
    // Get the current time
    const now = new Date();
    const options = { hour: 'numeric', minute: 'numeric', hour12: true };

    // Create the message text with the user's name and current time
    const message = `(${now.toLocaleString('en-US', options)}) ${username} ❁ ${messageText} `;

    // Send the message
    socket.emit('message', message);

    // Append the message to the list
    appendMessage(message);

    // Clear the input field
    messageInput.value = '';
  }
});

// Handle incoming messages
socket.on('message', (message) => {
  // Append the message to the list
  appendMessage(message);
});
