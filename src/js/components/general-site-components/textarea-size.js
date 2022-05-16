export function onInputTextarea() {
  const heightWindow = Number(window.innerHeight);
  const heighModal = Number(document.querySelector('#create-post').offsetHeight);
  if (heighModal >= heightWindow * 0.6) {
    this.removeEventListener('input', onInputTextarea);
    this.style.height = '60vh';
    this.style.overflow = 'scroll';
  } else {
    this.style.height = 'auto';
    this.style.height = `${this.scrollHeight}px`;
  }
}

export function creationTextareaSize() {
  const initialSizeTextarea = document.getElementById('create-post');
  initialSizeTextarea.setAttribute('style', 'height: 80px;');
  initialSizeTextarea.addEventListener('input', onInputTextarea, false);
}

export function readingTextareaSize() {
  const textareaSize = document.querySelectorAll('.post-text-reading');
  for (let i = 0; i < textareaSize.length; i += 1) {
    textareaSize[i].setAttribute('style', `height: ${textareaSize[i].scrollHeight}px;`);
    textareaSize[i].addEventListener('input', onInputTextarea, false);
  }
}
