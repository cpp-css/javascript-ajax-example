function printTodos(listItems) {
  let ul = document.getElementById("list");
  ul.innerHTML = '';
  let items = JSON.parse(listItems);
  let length = items.length;
  for(let i = 0; i < length; i++) {
    let li = document.createElement("li");
    li.appendChild(document.createTextNode(items[i].value));
    li.onclick = removeItemAndGetList;
    ul.appendChild(li);
  }
}

function getList() {
  let xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      printTodos(this.responseText);
    }
  };
  xhttp.open("GET", "http://css.serveo.net/api/getList", true);
  xhttp.send();
}

function addItem() {
  event.preventDefault();
  let inputField = document.getElementById('itemInput');
  let item = inputField.value;
  inputField.value = '';

  let xhttp = new XMLHttpRequest();
   xhttp.onreadystatechange = function() {
     if (this.readyState == 4 && this.status == 200) {
       printTodos(this.responseText);
     }
   };
   let url = URLify("http://css.serveo.net/api/addItem/" + item);
   xhttp.open("POST", url, true);
   xhttp.send();
}

function removeItemAndGetList(e) {
  let xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      printTodos(this.responseText);
    }
  };
  let url = URLify("http://css.serveo.net/api/removeItem/" + e.target.innerHTML);
  xhttp.open("POST", url, true);
  xhttp.send();
}

function URLify(string) {
  return string.trim().replace(/\s/g, '%20');
}

getList();
