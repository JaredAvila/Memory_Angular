import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-game",
  templateUrl: "./game.component.html",
  styleUrls: ["./game.component.scss"]
})
export class GameComponent implements OnInit {
  shuffledCards: Array<Object> = [];
  playerOne: Object = {
    name: "",
    turn: "active",
    activeCards: [],
    score: 0
  };
  playerTwo: Object = {
    name: "",
    turn: "notActive",
    activeCards: [],
    score: 0
  };
  constructor(private router: Router) {}

  ngOnInit() {
    this.shuffleDeck();
    this.getPlayerOneName();
    this.getPlayerTwoName();
  }

  getPlayerOneName() {
    this.playerOne["name"] = prompt("Player One, enter your name: ", "Poppy");
  }

  getPlayerTwoName() {
    this.playerTwo["name"] = prompt("Player Two, enter your name: ", "Branch");
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
        this.shuffledCards.push({ card: randomNum, status: "notClicked" });
      }
    }
  }

  selectedCard(card) {
    card["status"] = "clicked";
    //PlAYER ONE
    if (this.playerOne["turn"] === "active") {
      this.playerOneTurn(card);
    }
    //PlAYER TWO
    if (this.playerTwo["turn"] === "active") {
      this.playerTwoTurn(card);
    }
    if (this.playerOne["score"] + this.playerTwo["score"] === 8) {
      setTimeout(() => {
        this.gameOver();
      }, 100);
    }
  }

  playerOneTurn(card) {
    this.playerOne["activeCards"].push(card);
    if (this.playerOne["activeCards"].length === 2) {
      if (
        this.playerOne["activeCards"][0]["card"] ===
        this.playerOne["activeCards"][1]["card"]
      ) {
        this.playerOne["score"]++;
        if (this.playerOne["score"] + this.playerTwo["score"] !== 8) {
          setTimeout(() => {
            alert("YAY! You found a match!! Take another turn.");
            this.playerOne["activeCards"] = [];
          }, 100);
        }
      } else {
        setTimeout(() => {
          alert("Not a match!");
          this.playerOne["activeCards"][0]["status"] = "notClicked";
          this.playerOne["activeCards"][1]["status"] = "notClicked";
          this.playerOne["activeCards"] = [];
          this.playerOne["turn"] = "notActive";
          this.playerTwo["turn"] = "active";
        }, 100);
      }
    }
  }

  playerTwoTurn(card) {
    this.playerTwo["activeCards"].push(card);
    if (this.playerTwo["activeCards"].length === 2) {
      if (
        this.playerTwo["activeCards"][0]["card"] ===
        this.playerTwo["activeCards"][1]["card"]
      ) {
        this.playerTwo["score"]++;
        if (this.playerOne["score"] + this.playerTwo["score"] !== 8) {
          setTimeout(() => {
            alert("YAY! You found a match!! Take another turn.");
            this.playerTwo["activeCards"] = [];
          }, 100);
        }
      } else {
        setTimeout(() => {
          alert("Not a match!");
          this.playerTwo["activeCards"][0]["status"] = "notClicked";
          this.playerTwo["activeCards"][1]["status"] = "notClicked";
          this.playerTwo["activeCards"] = [];
          this.playerTwo["turn"] = "notActive";
          this.playerOne["turn"] = "active";
        }, 100);
      }
    }
  }

  gameOver() {
    if (this.playerOne["score"] > this.playerTwo["score"]) {
      alert(`${this.playerOne["name"]} wins!`);
      this.router.navigate(["/"]);
    } else if (this.playerOne["score"] < this.playerTwo["score"]) {
      alert(`${this.playerTwo["name"]} wins!`);
      this.router.navigate(["/"]);
    } else {
      alert("It's a tie! EVEYRONE WINS!");
      this.router.navigate(["/"]);
    }
  }

  randomNumber(min, max) {
    return Math.random() * (max - min) + min;
  }
}
