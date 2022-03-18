// VG - Skapa en klass som du döper till Character med egenskaperna för
// name, gender, height, mass, hairColor & pictureUrl.

class Character {
  //constructor
  constructor(name, gender, height, mass, hair_color, imgUrl) {
    this.name = name;
    this.gender = gender;
    this.height = parseInt(height);
    this.mass = parseInt(mass);
    this.hair_color = hair_color;
    this.imgUrl = imgUrl;
  }

  //Klassen ska även innehålla metoder för att jämföra karaktärens egna egenskaper med en annan karaktär.
  //methods

  // Vad Karaktär 2:s vikt är - Skriv även ut om Karaktär 2 väger mer/mindre än hen, samt skillnaden i vikt.
  compareWeight(secondaryCharacter, textbox) {
    textbox.innerText = "";
    if (this.mass > secondaryCharacter.mass) {
      console.log(this.name + " is heavier than " + secondaryCharacter.name);
      console.log(this.mass - secondaryCharacter.mass);
      textbox.innerText = "poop";
    } else {
      console.log(secondaryCharacter.name + " is heavier than " + this.name);
      console.log(secondaryCharacter.mass - this.mass);
      textbox.innerText = "not poop";
    }
  }
  // Vad Karaktär 2s längd är. - Skriv även ut om Karaktär 2 är längre/kortare än hen, samt skillnaden i längd.
  compareHeight(secondaryCharacter, textbox) {
    textbox.innerText = "";
    if (this.height > secondaryCharacter.mass) {
      console.log(`${this.name} is taller than ${secondaryCharacter.name}.`);
    } else {
      console.log(`${secondaryCharacter.name} is taller than ${this.name}`);
    }
  }
  // Karaktär 2’s hårfärg. Om det är samma som Karaktär 1, skriv ut detta också.
  compareHairColor(secondaryCharacter, textbox) {
    textbox.innerText = "";
    console.log(secondaryCharacter.hair_color);
    if (secondaryCharacter.hair_color == this.hair_color) {
      console.log("We have the same hair color");
    }
  }
  // Karaktär 2’s kön. Om det är samma som Karaktär 1, skriv ut detta också.
  compareGender(secondaryCharacter, textbox) {
    textbox.innerText = "";
    console.log(secondaryCharacter.gender);
    if (secondaryCharacter.gender == this.gender) {
      console.log("We have the same gender");
    }
  }
  // Glöm ej att man ska kunna ställa samma frågor till Karaktär 2 också.
}

let characterOne;
let characterTwo;

const firstCharacterValue = document.getElementById("firstCharacter");
const secondCharacterValue = document.getElementById("secondCharacter");

const characterOneDiv = document.getElementById("renderCharacterOne");
const characterTwoDiv = document.getElementById("renderCharacterTwo");

const characterOneAnswerBox = document.createElement("p");
const characterTwoAnswerBox = document.createElement("p");

const chooseCharactersBtn = document.getElementById("chooseCharactersBtn");

chooseCharactersBtn.addEventListener("click", async () => {
  characterOne = await getCharacter(firstCharacterValue.value);
  characterTwo = await getCharacter(secondCharacterValue.value);

  renderCharacters(characterOne, characterTwo);
});

const getCharacter = async (characterId) => {
  const response = await axios.get(
    `https://swapi.dev/api/people/${characterId}/`
  );

  return new Character(
    response.data.name,
    response.data.gender,
    response.data.height,
    response.data.mass,
    response.data.hair_color,
    `./images/${characterId}.jpeg`
  );
};

const renderCharacters = (characterOne, characterTwo) => {
  characterOneDiv.innerHTML = "";
  renderCharacter(characterOne, characterTwo, characterOneDiv);

  characterTwoDiv.innerHTML = "";
  renderCharacter(characterTwo, characterOne, characterTwoDiv);
};

const renderCharacter = (
  primaryCharacter,
  secondaryCharacter,
  primaryCharacterDiv
) => {
  const characterParagraph = document.createElement("p");
  characterParagraph.innerText = primaryCharacter.name;

  const characterImage = document.createElement("img");
  characterImage.src = primaryCharacter.imgUrl;

  const textbox = document.createElement("p");

  const compareWeightBtn = document.createElement("button");
  compareWeightBtn.innerText = "What does the other one weigh?";
  compareWeightBtn.addEventListener("click", () => {
    primaryCharacter.compareWeight(secondaryCharacter, textbox);
  });

  const compareHeightBtn = document.createElement("button");
  compareHeightBtn.innerText = "How tall is the other one?";
  compareHeightBtn.addEventListener("click", () => {
    primaryCharacter.compareHeight(secondaryCharacter);
  });

  const compareHairColorBtn = document.createElement("button");
  compareHairColorBtn.innerText = "What's their hair color?";
  compareHairColorBtn.addEventListener("click", () => {
    primaryCharacter.compareHairColor(secondaryCharacter);
  });

  const compareGenderBtn = document.createElement("button");
  compareGenderBtn.innerText = "What's their gender?";
  compareGenderBtn.addEventListener("click", () => {
    primaryCharacter.compareGender(secondaryCharacter);
  });

  primaryCharacterDiv.append(
    characterParagraph,
    characterImage,
    compareWeightBtn,
    compareHeightBtn,
    compareHairColorBtn,
    compareGenderBtn,
    textbox
  );
};
