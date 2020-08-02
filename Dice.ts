//row and div element where my dices will be appended to
const cont: HTMLElement = document.getElementById("container-die") as HTMLElement;
// new dice button
const dieBtn: HTMLElement = document.getElementById("newdie") as HTMLElement;
// reroll dice button
const rrBtn: HTMLElement = document.getElementById("reroll") as HTMLElement;
// sum of all dices button
const sumBtn: HTMLElement = document.getElementById("sum") as HTMLElement;

class Dice {
    //array of all of each class object for each die
    static collection: Array <Dice> = [];

    //computes the sum of the all the die on the screen
    static addEmUp(): void {
        if (Dice.collection.length > 0) {
            let total: number = Dice.collection.reduce(
                (tally: number, die: Dice) =>  (tally += die.value),
                0
            );
            alert(`The sum of all the dice values is ${total}.`);
        } else alert(`The sum of all the dice values is 0.`);
    }

    //rerolls all the die on the screen
    static rollEmUp(): void {
        if (Dice.collection.length)
            Dice.collection.forEach((die: Dice) => die.reRoll());
        else
            alert(
                "You currently do not have any dice on screen. You need to add at least one dice in order to use this feature."
            );
    }
    //records individual dice face value
    private value: number;
    // individual dice div element
    private readonly div: HTMLElement;
    constructor() {
        //return random dice value (1-6)
        this.value = this.roll();
        //creating individual dice
        this.div = document.createElement("div");
        this.div.classList.add(
            "text-center",
            "px-0",
            "mx-2",
            "mb-5",
            "col",
            "bg-white",
            "rounded"
        );
        //based on the specific dice value I can load an image dice face value w/in this div element; essentially my dice element
        this.div.innerHTML = `<img src="http://javascriptkit.com/complete/images/d${this.value}.gif"  alt="Responsive image">`;
        //when I click this image w/in the div element I essentially roll again and get a new value and upload a new corresponding image face value as well
        this.div
            .getElementsByTagName("img")[0]
            .addEventListener("click", () => this.reRoll());
        //double clicking an image will remove a div element (dice) all together
        this.div.getElementsByTagName("img")[0].addEventListener("dblclick", () => {
            const dieIdx: number = Dice.collection.indexOf(this);
            Dice.collection.splice(dieIdx, 1);
            cont.removeChild(this.div);
        });
        //div element (dice) appends to the 'dice contaniner'
        cont.append(this.div);
        Dice.collection.push(this);
    }
    //generates random dice value
    roll(): number {
        return Math.floor(Math.random() * 6) + 1;
    }
    //rerolls dice face value
    reRoll(): void {
        this.value = this.roll();
        this.div.getElementsByTagName(
            "img"
        )[0].src = `http://javascriptkit.com/complete/images/d${this.value}.gif`;
    }
}

/* The methods/functions below go affect all dices in the 'dice-container'*/

//clicking will create an instance of the Dice class and a new dice is appended to the 'dice-conatiner'
dieBtn.addEventListener("click", () => new Dice());

//reroll dice button loops through each of the current dices and rerolls and updates their face image values based on reroll value
rrBtn.addEventListener("click", () => Dice.rollEmUp());

//takes the sum of all the dices displayed on the screen. loops through each dice and extracts and parses the integer value in the src of each image
sumBtn.addEventListener("click", () => Dice.addEmUp());
