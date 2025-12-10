const headerInner = document.getElementById("headerInner");
const buttonClose = document.getElementById("buttonClose");

buttonClose.addEventListener("click", () => {
  headerInner.classList.add("hidden");
});





function toggleAnswer(item) {
    const answer = item.querySelector('.faq-answer');
    answer.style.display = answer.style.display === 'block' ? 'none' : 'block';
  
  icon.textContent = answer.style.display === 'block' ? '-' : '+';
  }



function toggleAnswer(item) {
  const answer = item.querySelector('.faq-answer');
  const icon = item.querySelector('.faq-icon'); 

  const isVisible = answer.style.display === 'block';
  answer.style.display = isVisible ? 'none' : 'block';
   icon.innerHTML = isVisible
  ? `<img src="icons/arrow-open.svg" alt="minus" width="40" height="40">`
  : `<img src="icons/arrow-close.svg" alt="plus" width="40" height="40">`;

}
