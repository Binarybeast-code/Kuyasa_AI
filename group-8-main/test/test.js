document.addEventListener("DOMContentLoaded", function() {
    document.getElementById('user-input').focus();
});

function sendMessage() {
    var userMessage = document.getElementById('user-input').value;
    
    if (userMessage.trim() === '') {
        return;
    }

    appendMessage("You: " + userMessage);
    document.getElementById('user-input').value = '';

    // Send the user message to the server (or process it with an AI framework)
    // For simplicity, let's simulate a response from the chatbot
    simulateChatbotResponse(userMessage);
}

function simulateChatbotResponse(message) {
    // Simulated response from the chatbot (replace this with your actual AI model or API call)
    var botResponse = "I am a simple AI chatbot. You said: '" + message + "'";
    setTimeout(function() {
        appendMessage("Chatbot: " + botResponse);
    }, 500); // Simulating delay for a more natural conversation flow
}

function appendMessage(message) {
    var chatBox = document.getElementById('chat-box');
    var messageElement = document.createElement('div');
    messageElement.textContent = message;
    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight; // Auto-scroll to the bottom
}
