const API_KEY = 'AIzaSyCFO_wL-z8wip-PgVE9NXblbxMzKP9ggBk';
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-002:generateContent?key=${API_KEY}`;

const openChatbotBtn = document.getElementById('openChatbot');
const closeChatbotBtn = document.getElementById('closeChatbot');
const chatbotContainer = document.getElementById('chatbot');
const chatbotMessages = document.getElementById('chatbotMessages');
const userInput = document.getElementById('userInput');
const sendMessageBtn = document.getElementById('sendMessage');

let conversationHistory = [];

openChatbotBtn.addEventListener('click', () => {
    chatbotContainer.style.display = 'flex';
    openChatbotBtn.style.display = 'none';
});

closeChatbotBtn.addEventListener('click', () => {
    chatbotContainer.style.display = 'none';
    openChatbotBtn.style.display = 'flex';
});

sendMessageBtn.addEventListener('click', sendMessage);
userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
    }
});

async function sendMessage() {
    const message = userInput.value.trim();
    if (message) {
        addMessage('user', message);
        userInput.value = '';
        
        conversationHistory.push({ role: 'user', parts: [{ text: message }] });
        
        const response = await getGeminiResponse(conversationHistory);
        
        if (response) {
            addMessage('bot', response);
            conversationHistory.push({ role: 'model', parts: [{ text: response }] });
        } else {
            addMessage('bot', 'I apologize, but I encountered an error while processing your request. Please try again later.');
        }
    }
}

async function getGeminiResponse(conversationHistory) {
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                contents: conversationHistory,
                systemInstruction: {
                    "role": "user",
                    "parts": [
                        {
                            "text": "Your name is Web Tech Assistant.You are a helpful Web Technologies assistant. Provide clear and concise answers to questions about web development, programming languages, and related topics."
                        }
                            ]
                },
                generationConfig: {
                    temperature: 1,
                    topK: 40,
                    topP: 0.95,
                    maxOutputTokens: 8192,
                },
            }),
        });

        if (!response.ok) {
            throw new Error('API request failed');
        }

        const data = await response.json();
        return data.candidates[0].content.parts[0].text;
    } catch (error) {
        console.error('Error:', error);
        return null;
    }
}

function addMessage(sender, message) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', sender);
    
    // Use marked.js to parse markdown and highlight.js for syntax highlighting
    const parsedMessage = marked.parse(message);
    messageElement.innerHTML = parsedMessage;
    
    chatbotMessages.appendChild(messageElement);
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    
    // Apply syntax highlighting to code blocks
    messageElement.querySelectorAll('pre code').forEach((block) => {
        hljs.highlightBlock(block);
    });
}

// Initial greeting
addMessage('bot', 'Hello! I\'m your Web Tech Assistant. How can I help you today?');