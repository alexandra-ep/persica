export default function displayMessage(messageType, message, targetElement) {
  const target = document.querySelector(targetElement);

  target.innerHTML = `<div class="message ${messageType}">${message}</div>`;
}
