function game() {
  const cards = document.querySelectorAll(".card");
  const audio = document.querySelector("audio");
  shuffleCards();
  let click = 0;
  let previousCard = null;

  cards.forEach((card) => card.addEventListener("click", flip));
  // document.addEventListener("click", flip);

  function flip() {
    click = click + 1;
    this.classList.toggle("flip");
    togglePictures(this);

    if (click % 2 == 1) {
      previousCard = this;
      return;
    }

    if (this != previousCard && isMatch(this, previousCard)) {
      this.removeEventListener("click", flip);
      previousCard.removeEventListener("click", flip);
      audio.play();
      // alert("Hurreyyy, you've matched cards!");
      return;
    }
    //togglePictures(previousCard);
    //togglePictures(this);
    unflipCards(this, previousCard);
  }

  function isMatch(firstCard, secondCard) {
    const img1 = firstCard.querySelector(".back").src;
    const img2 = secondCard.querySelector(".back").src;

    // if (img1 == img2) {
    // return true;
    // }

    return img1 == img2;
  }

  function togglePictures(card) {
    card.querySelector(".front").classList.toggle("hide");
    card.querySelector(".back").classList.toggle("show");
  }

  function unflipCards(firstCard, secondCard) {
    setTimeout(() => {
      // remove class flip
      firstCard.classList.remove("flip");
      secondCard.classList.remove("flip");

      // togglePicture
      togglePictures(firstCard);
      togglePictures(secondCard);
    }, 1000);
  }

  function shuffleCards() {
    const cardsContainer = document.querySelector(".cards");

    //for (i = 0; i < cards.lenght; i++) {
    //index = Math.floor(Math.random() * i);
    //cardsContainer.appendChild(cards[index]);
    //}

    cards.forEach((card) => {
      const index = Math.floor(Math.random() * 12);
      card.style.order = index;
    });
  }
}

export default game;
