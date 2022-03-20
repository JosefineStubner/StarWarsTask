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

  //methods

  // Vad Karaktär 2:s vikt är - Skriv även ut om Karaktär 2 väger mer/mindre än hen, samt skillnaden i vikt.
  compareWeight(secondaryCharacter, textbox) {
    textbox.innerText = "";
    if (this.mass > secondaryCharacter.mass) {
      textbox.innerText = `${secondaryCharacter.name} weighs ${
        secondaryCharacter.mass
      }kg's. I am ${this.mass - secondaryCharacter.mass}kg's heavier than ${
        secondaryCharacter.name
      }.`;
    } else {
      textbox.innerText = `${secondaryCharacter.name} weighs ${
        secondaryCharacter.mass
      }kg's. I am ${secondaryCharacter.mass - this.mass}kg's lighter than ${
        secondaryCharacter.name
      }.`;
    }
  }
  // Vad Karaktär 2s längd är. - Skriv även ut om Karaktär 2 är längre/kortare än hen, samt skillnaden i längd.
  compareHeight(secondaryCharacter, textbox) {
    textbox.innerText = "";
    if (this.height > secondaryCharacter.height) {
      textbox.innerText = `${secondaryCharacter.name} is ${
        secondaryCharacter.height
      }cm tall. I am ${this.height - secondaryCharacter.height}cm taller than ${
        secondaryCharacter.name
      }.`;
    } else {
      textbox.innerText = `${secondaryCharacter.name} is ${
        secondaryCharacter.height
      }cm tall. I am ${
        secondaryCharacter.height - this.height
      }cm shorter than ${secondaryCharacter.name}.`;
    }
  }
  // Karaktär 2’s hårfärg. Om det är samma som Karaktär 1, skriv ut detta också.
  compareHairColor(secondaryCharacter, textbox) {
    textbox.innerText = "";
    if (
      (secondaryCharacter.hair_color == this.hair_color &&
        secondaryCharacter.hair_color == "none") ||
      secondaryCharacter.hair_color == "n/a" ||
      this.hair_color == "none" ||
      this.hair_color == "n/a"
    ) {
      textbox.innerText = `${secondaryCharacter.name} doesn't have any hair, and neither do I! What are the odds?`;
    } else if (secondaryCharacter.hair_color == this.hair_color) {
      textbox.innerText = `${secondaryCharacter.name}'s hair color is ${secondaryCharacter.hair_color}. We have the same hair color!`;
    } else if (secondaryCharacter.hair_color == "none") {
      textbox.innerText = `${secondaryCharacter.name} doesn't have any hair. How strange!`;
    } else {
      textbox.innerText = `${secondaryCharacter.name}'s hair color is ${secondaryCharacter.hair_color}.`;
    }
  }
  // Karaktär 2’s kön. Om det är samma som Karaktär 1, skriv ut detta också.
  compareGender(secondaryCharacter, textbox) {
    textbox.innerText = "";
    if (secondaryCharacter.gender == this.gender) {
      textbox.innerText = `${secondaryCharacter.name} is a ${secondaryCharacter.gender}, we have the same gender!`;
    } else if (secondaryCharacter.gender == "n/a") {
      textbox.innerText = `${secondaryCharacter.name} is a robot! They do not conform to our puny ideas of gender, no indeed!`;
    } else {
      textbox.innerText = `${secondaryCharacter.name} is a ${secondaryCharacter.gender}. Intriguing...`;
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
  if (firstCharacterValue.value == secondCharacterValue.value) {
    alert("Please choose two different characters to compare!");
  } else {
    renderCharacters(characterOne, characterTwo);
  }
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
    primaryCharacter.compareHeight(secondaryCharacter, textbox);
  });

  const compareHairColorBtn = document.createElement("button");
  compareHairColorBtn.innerText = "What's their hair color?";
  compareHairColorBtn.addEventListener("click", () => {
    primaryCharacter.compareHairColor(secondaryCharacter, textbox);
  });

  const compareGenderBtn = document.createElement("button");
  compareGenderBtn.innerText = "What's their gender?";
  compareGenderBtn.addEventListener("click", () => {
    primaryCharacter.compareGender(secondaryCharacter, textbox);
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
