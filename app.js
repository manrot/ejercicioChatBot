const toggleButton = document.getElementById('chat-toggle');
const closeButton=  document.getElementById('chat-close');
const chatContainer = document.getElementById('chat-container');
const sendButton = document.getElementById('send-button');
const inputField = document.getElementById('message-input');
const messages = document.getElementById('chat-messages');

toggleButton.addEventListener('click', () => {
  chatContainer.style.display = chatContainer.style.display === 'flex' ? 'none' : 'flex';
  if (chatContainer.style.display === 'flex') {
    setTimeout(() => inputField.focus(), 300);
  }
});

closeButton.addEventListener('click', () => {
  chatContainer.style.display = chatContainer.style.display === 'flex' ? 'none' : 'flex';
  if (chatContainer.style.display === 'flex') {
    setTimeout(() => inputField.focus(), 300);
  }
});

sendButton.addEventListener('click', sendMessage);
inputField.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') sendMessage();
});

function sendMessage() {
  const text = inputField.value.trim();
  if (text === '') return;

  // Mostrar mensaje del usuario
  const userMsg = document.createElement('div');
  userMsg.className = 'message user';

  const userIcon = document.createElement('img');
      userIcon.src = 'icons/avatar.png';
      userIcon.alt = 'User'; 

  //userMsg.textContent = text;
const userText = document.createElement('div');
      userText.textContent = text;


      userMsg.appendChild(userText);
  userMsg.appendChild(userIcon);
      
  messages.appendChild(userMsg);
  inputField.value = '';
  messages.scrollTop = messages.scrollHeight;

  // Preparar URL con query param para la pregunta
  const url = 'https://yqa5umdrm2.execute-api.us-east-1.amazonaws.com/prod/chatbot?question=' + encodeURIComponent(text);

  // Llamar a Lambda via API Gateway
  fetch(url)
    .then(response => response.json())
    .then(data => {
      // Mostrar respuesta del bot
      const botMsg = document.createElement('div');
      botMsg.className = 'message bot';

      const botIcon = document.createElement('img');
      botIcon.src = 'icons/robot.png';
      botIcon.alt = 'Bot';

      const botText = document.createElement('div');
      botText.textContent = data.answer || data.message;

      botMsg.appendChild(botIcon);
      botMsg.appendChild(botText);
      messages.appendChild(botMsg);
      messages.scrollTop = messages.scrollHeight;
    })
    .catch(err => {
      console.error('Error al llamar al chatbot:', err);
      const errorMsg = document.createElement('div');
      errorMsg.className = 'message bot';
      errorMsg.textContent = 'Error al obtener respuesta del chatbot.';
      messages.appendChild(errorMsg);
      messages.scrollTop = messages.scrollHeight;
    });
}
