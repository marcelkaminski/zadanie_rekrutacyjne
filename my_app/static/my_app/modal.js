const body = document.querySelector('body');
const overlayDiv = document.createElement('div');
let displayBool = false;
overlayDiv.style.position = 'fixed';
overlayDiv.style.width = '100%';
overlayDiv.style.height = '100%';
overlayDiv.style.top = '0';
overlayDiv.style.left = '0';
overlayDiv.style.right = '0';
overlayDiv.style.bottom = '0';
overlayDiv.style.backgroundColor = 'rgba(0,0,0,0.5)';
overlayDiv.style.zIndex = '2';
overlayDiv.style.textAlign = '-webkit-center';
overlayDiv.style.display = "none";
body.appendChild(overlayDiv);
function styleOverlay() {
  const contentContainer = document.querySelector('#container');
  contentContainer.style.textAlign = 'center';   
  contentContainer.style.marginTop = '27vh'; 
  contentContainer.style.backgroundColor = 'white'; 
  contentContainer.style.width = '50%'; 
  contentContainer.style.height = '50%';
}
function displayOverlay(name) {
  if(displayBool) {

    var xmlhttp = new XMLHttpRequest();
    var url = `/product/?name=${name}`;
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            return JSON.parse(this.responseText);
        }
    };
    xmlhttp.open("GET", url, false);
    xmlhttp.send();
    var item = xmlhttp.onreadystatechange();
    console.log(item);
    console.log(item.SKU);
    console.log(item.name);
    console.log(item.description);
    console.log(item.price);

    var out = `<div id="container">
    <img src="https://image.flaticon.com/icons/png/512/263/263142.png" alt="image" style="width:300px;height:300px;"><br/>
    ${item.SKU} | ${item.name} | ${item.description} | `;
    if (item.discount>0){
        out += `<s>${item.price}</s> <span style="color:green;">`
        out += (item.price * (1-(item.discount/100))).toFixed(2);
        out += `</span><br/><button id="close-btn">Close</button></div>`;
    }
    else {
        out += `${item.price}<br/><button id="close-btn">Close</button></div>`
    };
    overlayDiv.innerHTML = out;
    styleOverlay();
    overlayDiv.style.display = 'block';
  } else {
      overlayDiv.style.display = 'none';
    }
}

body.addEventListener('click', event => {
  if(event.target.className === 'btn btn-primary') {
        var name = event.target.value;
       displayBool = !displayBool;
       displayOverlay(name);
  } else if(event.target.id === 'close-btn') {
      displayBool = !displayBool;
      displayOverlay(name);
    }
})