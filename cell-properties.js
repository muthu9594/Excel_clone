//Storage
let sheetDB = [];

for (let i = 0; i < rows; i++) {
  let sheetRow = [];
  for (let j = 0; j < cols; j++) {
    let cellProp = {
      bold: false,
      italic: false,
      underline: false,
      alignment: "left",
      fontFamily: "monospace",
      fontSize: "14",
      fontColor: "#000000",
      BGcolor: "#000000",
      value:"",
      formula:"",
      children:[]
    };
    sheetRow.push(cellProp);
  }
  sheetDB.push(sheetRow);
}

//selectors for cell properties
let bold = document.querySelector(".bold");
let italic = document.querySelector(".italic");
let underline = document.querySelector(".underline");
let fontSize = document.querySelector(".font-size-prop");
let fontFamily = document.querySelector(".font-family-prop");
let fontColor = document.querySelector(".font-color-prop");
let BGcolor = document.querySelector(".BGcolor-prop");

let alignment = document.querySelectorAll(".alignment");
let leftAlign = alignment[0];
let centerAlign = alignment[1];
let rightAlign = alignment[2];

let activeColorProp = "#d1d8e0";
let inactiveColorProp = "#ecf0f1";

//Application of two way binding
//Attach properties listener
bold.addEventListener("click", (e) => {
  let address = addressBar.value;

  let [cell, cellProp] = getCellAndCellProp(address);


  //modification
  cellProp.bold = !cellProp.bold;
  cell.style.fontWeight = cellProp.bold ? "bold" : "normal"; //UI change (1)
  bold.style.backgroundColor = cellProp.bold
    ? activeColorProp
    : inactiveColorProp; // UI change (2)
});

italic.addEventListener("click", (e) => {
  let address = addressBar.value;
  let [cell, cellProp] = getCellAndCellProp(address);

  //modification
  cellProp.italic = !cellProp.italic;
  cell.style.fontStyle = cellProp.italic ? "italic" : "normal"; //UI change (1)
  italic.style.backgroundColor = cellProp.italic
    ? activeColorProp
    : inactiveColorProp; // UI change (2)
});

underline.addEventListener("click", (e) => {
  let address = addressBar.value;
  let [cell, cellProp] = getCellAndCellProp(address);

  //modification
  cellProp.underline = !cellProp.underline;
  cell.style.textDecoration = cellProp.underline ? "underline" : "none"; //UI change (1)
  underline.style.backgroundColor = cellProp.underline
    ? activeColorProp
    : inactiveColorProp; // UI change (2)
});

fontSize.addEventListener("change", (e) => {
  let address = addressBar.value;
  let [cell, cellProp] = getCellAndCellProp(address);

  cellProp.fontSize = fontSize.value;
  cell.style.fontSize = cellProp.fontSize + "px";
  fontSize.value = cellProp.fontSize;
});

fontFamily.addEventListener("change", (e) => {
  let address = addressBar.value;
  let [cell, cellProp] = getCellAndCellProp(address);

  cellProp.fontFamily = fontFamily.value;
  cell.style.fontFamily = cellProp.fontFamily;
  fontFamily.value = cellProp.fontFamily;




});

fontColor.addEventListener("change", (e) => {
  let address = addressBar.value;
  let [cell, cellProp] = getCellAndCellProp(address);

  cellProp.fontColor = fontColor.value;
  cell.style.color = cellProp.fontColor;
  fontColor.value = cellProp.fontColor;
});

BGcolor.addEventListener("change", (e) => {
  let address = addressBar.value;
  let [cell, cellProp] = getCellAndCellProp(address);

  cellProp.BGcolor = BGcolor.value;
  cell.style.backgroundColor = cellProp.BGcolor;
  BGcolor.value = cellProp.BGcolor;
});

alignment.forEach((alignElem) => {
  alignElem.addEventListener("click", (e) => {
    let address = addressBar.value;
    let [cell, cellProp] = getCellAndCellProp(address);

    let alignValue = e.target.classList[0];
    cellProp.alignment = alignValue; //data change
    cell.style.textAlign = cellProp.alignment; //UI change (1)
    switch (
      alignValue // UI change (2)
    ) {
      case "left":
        leftAlign.style.backgroundColor = activeColorProp;
        centerAlign.style.backgroundColor = inactiveColorProp;
        rightAlign.style.backgroundColor = inactiveColorProp;
        break;
      case "center":
        leftAlign.style.backgroundColor = inactiveColorProp;
        centerAlign.style.backgroundColor = activeColorProp;
        rightAlign.style.backgroundColor = inactiveColorProp;
        break;
      case "right":
        leftAlign.style.backgroundColor = inactiveColorProp;
        centerAlign.style.backgroundColor = inactiveColorProp;
        rightAlign.style.backgroundColor = activeColorProp;
        break;
    }
   
  });
});

let allCells = document.querySelectorAll(".cell");
for (let i = 0; i < allCells.length; i++) {
  addListenerToAttachCellProperties(allCells[i]);
}

function addListenerToAttachCellProperties(cell) {
  cell.addEventListener("click", (e) => {
    let address = addressBar.value;
    let [rid, cid] = decodeRIDCIDFromAddress(address);
    let cellProp = sheetDB[rid][cid];

    cell.style.fontWeight = cellProp.bold ? "bold" : "normal"; //UI change (1)
    cell.style.fontStyle = cellProp.italic ? "italic" : "normal"; //UI change (1)
    cell.style.textDecoration = cellProp.underline ? "underline" : "none"; //UI change (1)
    cell.style.fontSize = cellProp.fontSize + "px";
    cell.style.fontFamily = cellProp.fontFamily;
    cell.style.color = cellProp.fontColor;
    cell.style.backgroundColor =
      cellProp.BGcolor === "#000000" ? "transparent" : cellProp.BGcolor;
    cell.style.textAlign = cellProp.alignment; //UI change (1)


    //apply properties ui container
    bold.style.backgroundColor = cellProp.bold
      ? activeColorProp
      : inactiveColorProp;
    italic.style.backgroundColor = cellProp.italic
      ? activeColorProp
      : inactiveColorProp;
    underline.style.backgroundColor = cellProp.underline
      ? activeColorProp
      : inactiveColorProp;
    fontColor.value = cellProp.fontColor;
    BGcolor.value = cellProp.BGcolor;
    fontSize.value = cellProp.fontSize;
    fontFamily.value = cellProp.fontFamily;

    switch (
      cellProp.alignment // UI change (2)
    ) {
      case "left":
        leftAlign.style.backgroundColor = activeColorProp;
        centerAlign.style.backgroundColor = inactiveColorProp;
        rightAlign.style.backgroundColor = inactiveColorProp;
        break;
      case "center":
        leftAlign.style.backgroundColor = inactiveColorProp;
        centerAlign.style.backgroundColor = activeColorProp;
        rightAlign.style.backgroundColor = inactiveColorProp;
        break;
      case "right":
        leftAlign.style.backgroundColor = inactiveColorProp;
        centerAlign.style.backgroundColor = inactiveColorProp;
        rightAlign.style.backgroundColor = activeColorProp;
        break;
    }
    let formulaBar = document.querySelector(".formula-bar");
    formulaBar.value = cellProp.formula;
    cell.value = cellProp.value 
  });
}

function getCellAndCellProp(address) {
  let [rid, cid] = decodeRIDCIDFromAddress(address);
  //Access cell and storage object
  let cell = document.querySelector(`.cell[rid="${rid}"][cid="${cid}"]`);
  let cellProp = sheetDB[rid][cid];
  return [cell, cellProp];
}

function decodeRIDCIDFromAddress(address) {
  let rid = Number(address.slice(1) - 1);
  let cid = Number(address.charCodeAt(0)) - 65;

  return [rid, cid];
}
