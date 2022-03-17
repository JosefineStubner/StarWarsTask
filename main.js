// VG - Skapa en klass som du döper till Character med egenskaperna för
// name, gender, height, mass, hairColor & pictureUrl.

class Character {
  //constructor
  constructor(name, gender, height, mass, hairColor, pictureUrl) {
    this.name = name;
    this.gender = gender;
    this.height = parseInt(height);
    this.mass = parseInt(mass);
    this.hairColor = hairColor;
    this.pictureUrl = pictureUrl;
  }

  //Klassen ska även innehålla metoder för att jämföra karaktärens egna egenskaper med en annan karaktär.
  //methods

  // Vad Karaktär 2:s vikt är - Skriv även ut om Karaktär 2 väger mer/mindre än hen, samt skillnaden i vikt.
  compareWeight(secondaryCharacter) {
    console.log(this.name + " compare weight with " + secondaryCharacter.name);
    if (this.mass > secondaryCharacter.mass) {
      console.log(this.name + " is heavier than " + secondaryCharacter.name);

    } 
    else {
      console.log(secondaryCharacter.name + " is heavier than " + this.name);
    }
  }
  // Vad Karaktär 2s längd är. - Skriv även ut om Karaktär 2 är längre/kortare än hen, samt skillnaden i längd.
  compareHeight() {}
  // Karaktär 2’s hårfärg. Om det är samma som Karaktär 1, skriv ut detta också.
  compareHairColor() {}
  // Karaktär 2’s kön. Om det är samma som Karaktär 1, skriv ut detta också.
  compareGender() {}
  // Glöm ej att man ska kunna ställa samma frågor till Karaktär 2 också.
}

//   VG-krav 3 - Skapa fyra knappar under varje karaktär
//När de klickas på, ska karaktären besvara frågor om den andre karaktären.
// Varje knapp ska köra en metod som definieras i din Character-klass.
// Frågorna ska besvaras i en textbox under respektive karaktär.
// T.ex ska du under Karaktär 1 ha knappar där hen besvarar följande frågor om Karaktär 2:

let characterOne;
let characterTwo;

const chooseCharactersBtn = document.getElementById("chooseCharactersBtn");

chooseCharactersBtn.addEventListener("click", async () => {
  const firstCharacterValue = document.getElementById("firstCharacter");
  const secondCharacterValue = document.getElementById("secondCharacter");

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
    "todo"
  );
};

const renderCharacters = (characterOne, characterTwo) => {
  const characterOneDiv = document.getElementById("renderCharacterOne");
  const characterTwoDiv = document.getElementById("renderCharacterTwo");

  renderCharacter(characterOne, characterTwo, characterOneDiv);
  renderCharacter(characterTwo, characterOne, characterTwoDiv);
};

const renderCharacter = (
  primaryCharacter,
  secondaryCharacter,
  primaryCharacterDiv
) => {
  const p = document.createElement("p");
  p.innerText = primaryCharacter.name;

  const compareWeightBtn = document.createElement("button");
  compareWeightBtn.innerText = "What does the other one weigh?";
  compareWeightBtn.addEventListener("click", () => {
    primaryCharacter.compareWeight(secondaryCharacter);
  });

  const compareHeightBtn = document.createElement("button");
  compareHeightBtn.innerText = "How tall is the other one?";
  compareHeightBtn.addEventListener("click", () => {
    primaryCharacter.compareHeight(secondaryCharacter);
  })

  primaryCharacterDiv.append(p, compareWeightBtn, compareHeightBtn);
};
