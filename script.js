const textarea = document.getElementById('inputText');
const wordCountDisplay = document.getElementById('wordCount');
const errorDisplay = document.getElementById('error');
let originalText = '';

textarea.addEventListener('input', updateWordCount);

function updateWordCount() {
  const words = textarea.value.trim().split(/\s+/);
  const count = textarea.value.trim() === '' ? 0 : words.length;
  wordCountDisplay.textContent = `${count} / 1000 words`;
  errorDisplay.textContent = count > 1000 ? 'Word limit exceeded!' : '';
}

function transformText(type) {
  if (getWordCount() > 1000) return;
  originalText = originalText || textarea.value;
  let text = textarea.value;
  switch(type) {
    case 'uppercase':
      text = text.toUpperCase();
      break;
    case 'lowercase':
      text = text.toLowerCase();
      break;
    case 'capitalize':
      text = text.replace(/\b\w/g, l => l.toUpperCase());
      break;
    case 'sentence':
      text = text.replace(/([^.!?]*[.!?])/g, s =>
        s.trim().charAt(0).toUpperCase() + s.trim().slice(1).toLowerCase()
      );
      break;
    case 'alternating':
      text = [...text].map((c, i) => i % 2 ? c.toLowerCase() : c.toUpperCase()).join('');
      break;
    case 'inverse':
      text = [...text].map(c => c === c.toUpperCase() ? c.toLowerCase() : c.toUpperCase()).join('');
      break;
  }
  textarea.value = text;
  updateWordCount();
}

function resetText() {
  textarea.value = originalText;
  originalText = '';
  updateWordCount();
}

function copyText() {
  navigator.clipboard.writeText(textarea.value)
    .then(() => alert('Copied to clipboard!'))
    .catch(() => alert('Copy failed'));
}

function exportText() {
  const blob = new Blob([textarea.value], { type: 'text/plain' });
  const link = document.createElement('a');
  link.download = 'output.txt';
  link.href = URL.createObjectURL(blob);
  link.click();
}

function applyTheme() {
  const selected = document.getElementById('themeSelect').value;
  const body = document.body;
  body.className = '';
  if (selected) {
    body.classList.add(selected);
  }
}

function getWordCount() {
  const words = textarea.value.trim().split(/\s+/);
  return textarea.value.trim() === '' ? 0 : words.length;
}