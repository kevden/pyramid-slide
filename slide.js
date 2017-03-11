function getMaterials(select) {
    var result = [];
    var options = select && select.options;
    var opt;

    for (var i=0; i < options.length; i++) {
        opt = options[i];

        if (opt.selected) {
            result.push(opt.value);
        }
    } 
    return result;
}

var materialElement = document.getElementById("material");
var heightElement = document.getElementById("height");
var switchElement = document.getElementById("leftRight");
var heightLabel = document.getElementById("heightNumber");

materialElement.addEventListener("change", function(){
    material = getMaterials(materialElement);
    height= heightElement.value;
    drawPyramid(material, height);
})

heightElement.addEventListener("input", function(){
    material = getMaterials(materialElement);
    height = heightElement.value;
    drawPyramid(material, height);
    document.getElementById("heightNumber").innerHTML = heightElement.value;
})

switchElement.addEventListener("change", function(){
    drawPyramid(getMaterials(materialElement), heightElement.value);
})

function drawPyramid(material, height) {

    // first, clear the old content
    document.getElementById("pyramid").innerHTML = "";
    var materialArrayIx = 0;
    var materialChar = materialArrayIx;
    heightLabel.innerText = heightElement.value;


    // for each row....
    for (var row = 0; row < height; row++) {

        // figure out number of bricks and spaces
        var numBricks = row + 2;
        var numSpaces = height - row - 1;

        // build up a string for this row
        var rowStr = "";
        if (switchElement.checked){
            for (var i = 0; i < numSpaces; i++) {
                var spaceChar = "&nbsp"; // this is the HTML encoding for a space " "
                rowStr += spaceChar;
            }
        }
        for (var i = 0; i < numBricks; i++) {
            rowStr += material[materialChar];
            materialArrayIx ++;
            materialChar = materialArrayIx % material.length;
        }
        // make a <p> element for this row, and insert it into the #pyramid container
        rowElem = document.createElement("p");
        rowElem.innerHTML = rowStr;
        document.getElementById("pyramid").appendChild(rowElem);
    }
}
drawPyramid(getMaterials(materialElement), heightElement.value);
