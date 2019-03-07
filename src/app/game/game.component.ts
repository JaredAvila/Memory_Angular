import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-game",
  templateUrl: "./game.component.html",
  styleUrls: ["./game.component.scss"]
})
export class GameComponent implements OnInit {
  shuffledCards: Array<Number> = [];
  constructor() {}

  ngOnInit() {
    this.shuffleDeck();
  }

  shuffleDeck() {
    let deckCheck = {
      size: 0,
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0,
      6: 0,
      7: 0,
      8: 0
    };
    while (deckCheck["size"] !== 16) {
      let randomNum = Math.floor(this.randomNumber(1, 9));
      if (deckCheck[randomNum] < 2) {
        deckCheck[randomNum] += 1;
        deckCheck["size"] += 1;
        this.shuffledCards.push(randomNum);
      }
    }
  }

  randomNumber(min, max) {
    return Math.random() * (max - min) + min;
  }
}
