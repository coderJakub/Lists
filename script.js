let clicked = false;
let menuClicked = false;
let delClicked = false;
let list = JSON.parse(localStorage.getItem('list'));
let lists = JSON.parse(localStorage.getItem('lists'));
let currentlyList = localStorage.getItem("currentlyList");
function loadFromLocalStorage(){
    if (currentlyList ==null || currentlyList =="" || currentlyList == undefined){
        if ((document.getElementById("name-of-list").innerHTML == "Einkaufliste") && (list ==null || list ==" " ||list =="")){
            lists = ["Einkaufsliste"];
            currentlyList = lists[0];
            localStorage.setItem("currentlyList", currentlyList);
            localStorage.setItem("lists", JSON.stringify(lists));
            localStorage.removeItem("list");
            localStorage.setItem(currentlyList, JSON.stringify(lists));
            updateMenu();
        }
        else{
            lists = ["My 1st List"];
            currentlyList = lists[0];
            localStorage.setItem("currentlyList", currentlyList);
            localStorage.setItem("lists", JSON.stringify(lists));
            updateMenu();
        }     
    }
    else{
        list = JSON.parse(localStorage.getItem(currentlyList));
    }
    if (list ==null || list ==" " ||list ==""){
        list = [];
    }
    update(list)
    if (lists ==null || lists ==" " ||lists ==""){
        lists = [];
    }
    else{
        updateMenu();
    }
}
function add_buy(){
    let buy = document.getElementById("buy");
    if ((buy.value!="") && (buy.value.length<101)){
        list.push([buy.value, "false"]);
        localStorage.setItem(currentlyList, JSON.stringify(list));
        buy.value = "";
        update(list);
        if (!document.getElementById("alert").innerHTML == ""){
            document.getElementById("alert").innerHTML = "";
        }
    }else if(buy.value.length>100){
        document.getElementById("alert").innerHTML = "Es dürfen maximal 100 Zeichen genutzt werden!";
    }
    buy.focus();
}
function update(list){
    let list_html = document.getElementById("liste");
    list_html.innerHTML = " ";
    let name = document.getElementById("name-of-list");
    name.innerHTML = currentlyList;
    for (let i = 0; i < list.length; i++) {
        list_html.innerHTML += "<div class='bg_item' id=bg_"+i+">"+
                                "<li class='item' id=" + i + ">" + 
                                  "<p class='item-text' style='text-decoration: none' id='t_"+i+"'>"+list[i][0]+"</p>" +
                                  "<div class='buttons'>"+
                                    "<button class='buttonl' id=d_" + i + " onclick='delete_item(id)'><img src='papierkorb.png' width='20px' alt='DEL'></button>" +
                                    "<div id=ed_"+ i + " class='editbox'><button class='buttonl edit' id=e_" + i + " onclick='edit_item(id)'><img src='bearbeiten.png' width='18px' alt='EDIT'></button></div>" +
                                    "<button class='buttonl checkbox'id=c_" + i + " onclick='check(id)'><img src='check-button.png' width='20px' alt='check'></button>" +
                                  "</div>"
                                "</li>" +
                              "</div>";
       if (list[i][1] == "true"){
            document.getElementById("t_" + i).style = "text-decoration: line-through";
            document.getElementById("ed_"+ i).innerHTML = "";
            document.getElementById("c_"+i).classList = "buttonl checkbox checked";
            document.getElementById("bg_" + i).classList = "bg_item finish";
            document.getElementById("d_"+i).classList = "buttonl checked";
       }
                              
    }
}

function check(id){
    id = split_id(id);
    if (list[id][1] == "false"){
        list[id][1] = "true";
        localStorage.setItem(currentlyList, JSON.stringify(list));
        update(list);
    } else {
        list[id][1] = "false";
        localStorage.setItem(currentlyList, JSON.stringify(list));
        update(list);
    }
}

function edit_item(id){
    id = split_id(id);
    document.getElementById(id).innerHTML = "<input onkeydown='pressedEnter(id)' class='edit-field' id='l_" + id + "' type='text' onfocusout='edit_escape(id)'>"+
                                            "<div class='buttons'><button  class='buttonl checkbox edit' id =ef_" + id + " onclick='edit_finish(id)' onmouseover='clicked = true;' onmouseout='clicked = false;'><img src='check-button.png' width='18px' alt='EDIT'></button> </div>";
    document.getElementById("l_"+id).focus();
    document.getElementById("l_"+id).value = list[id][0];
}
function edit_escape(){
    if (!clicked){
        update(list);
    }
    if (!document.getElementById("alert").innerHTML == ""){
        document.getElementById("alert").innerHTML = "";
    }

}
function edit_finish(id){
    index = split_id(id);
    let edit_item = document.getElementById("l_"+index);
    if ((edit_item.value != "") && (edit_item.value.length<101)){
        list[index][0] = edit_item.value;
        localStorage.setItem(currentlyList, JSON.stringify(list));
        update(list);
        clicked = false;
        if (!document.getElementById("alert").innerHTML == ""){
            document.getElementById("alert").innerHTML = "";
        }
    }else if(edit_item.value.length>100){
        document.getElementById("alert").innerHTML = "Es dürfen maximal 100 Zeichen genutzt werden!";
        edit_item.focus();
    }
    else{
        edit_item.focus();
    }
}

function delete_item(id){
    index = split_id(id);
    list.splice(index,1);
    localStorage.setItem(currentlyList, JSON.stringify(list));
    update(list);
}

function split_id(id){
    id_list = id.split("_");
    id = id_list[1];
    return id;
}
function pressedEnter(id){
    if(event.key === 'Enter'){
        if(id =="buy"){
            add_buy();
        }else{
            edit_finish(id);
        }
    }
}
function menuToggle(){
    let hamburger =  document.getElementsByClassName("hamburger")[0];
    let menu = document.getElementsByClassName("menu")[0];
    menu.classList.toggle("menu-open");
    hamburger.classList.toggle("cross");
}
function addNewList(){
    let menuLists = document.getElementById("lists-menu");
    menuLists.innerHTML += "<div class='menu-item'>" +
                                "<input id='new-list' onfocusout='newAddExit()' type='text' class='menu-item-input'>"+
                                "<div class='buttons'>" +
                                    "<button  onmouseover='menuClicked = true;' onmouseout='menuClicked = false;' class='buttonl m' onclick='newList()'><img src='check-button.png' width='18px' alt='EDIT'></button>"+
                                "</div>"+
                            "</div>";
    document.getElementById("new-list").focus();
}
function newList(){
    menuClicked = false;
    let newList = document.getElementById("new-list");
    if((newList.value!="") && (newList.value.length<16) && (!lists.includes(newList.value))){
        lists.push(newList.value);
        localStorage.setItem('lists', JSON.stringify(lists));
        updateMenu();
    }
    else{
        newList.focus();
    }
}
function updateMenu(){
    let menuLists = document.getElementById("lists-menu");
    menuLists.innerHTML = "";
    for (let i = 0; i < lists.length; i++) {
        menuLists.innerHTML += '<div id=m_'+i+' class="menu-item" onclick="selectList(id)">'+
                                    "<span>"+lists[i]+"</span>"+
                                    '<div class="buttons">'+
                                        "<button id=d_"+i+" class='buttonl m' onclick='deleteList(id)'><img src='papierkorb.png' width='20px' alt='DEL'></button>"+
                                    "</div>"+
                                "</div>";
    }
}
function deleteList(id){
    id = split_id(id);
    localStorage.removeItem(lists[id]);
    if(lists[id] == currentlyList){
        if(id == 0){
            currentlyList = lists[1];
        }
        else{currentlyList = lists[0];}
    }
    lists.splice(id,1);
    localStorage.setItem('lists', JSON.stringify(lists));
    delClicked = true;
    localStorage.setItem('currentlyList', currentlyList);
    loadFromLocalStorage()
    updateMenu();
}
function newAddExit(){
    if (!menuClicked){
        updateMenu();
    } 
}
function selectList(id){
    if(!delClicked){
        let hamburger =  document.getElementsByClassName("hamburger")[0];
        let menu = document.getElementsByClassName("menu")[0];
        menu.classList.toggle("menu-open");
        hamburger.classList.toggle("cross");
        id = split_id(id);
        currentlyList = lists[id];
        list = JSON.parse(localStorage.getItem(currentlyList));
        localStorage.setItem('currentlyList', currentlyList);
        loadFromLocalStorage();}
    else{
        delClicked = false;
    }
}
function editNameCurrentList(){
    if(!menuClicked){
        let name = document.getElementById("name-of-list");
        name.innerHTML = "<input id='edit-list' value="+currentlyList+" onfocusout='editListExit()' type='text'>"+
                        "<div class='buttons'>" +
                                    "<button id=editbutton onmouseover='menuClicked = true;' onmouseout='menuClicked = false;' class='buttonl m' onclick='editListsFinish()'><img src='check-button.png' width='18px' alt='EDIT'></button>"+
                        "</div>";
        document.getElementById("edit-list").focus();
    }
    menuClicked = false;
}
function editListExit(){
    if(!menuClicked){
        update(list);
    }
}
function editListsFinish(){
    let element = document.getElementById("edit-list");
    if((element.value!="") && (element.value.length<16) && (!lists.includes(element.value) || element.value == currentlyList)){
        let id = 0;
        for (let i = 0; i < lists.length; i++) {
            if(lists[i] == currentlyList){
                id = i;
                break
            }
        }
        localStorage.removeItem(currentlyList);
        lists[id] = element.value;
        localStorage.setItem('lists', JSON.stringify(lists));
        currentlyList = element.value;
        localStorage.setItem("currentlyList", currentlyList);
        localStorage.setItem(currentlyList, JSON.stringify(list))
        update(list);
        updateMenu();
    }
    else{
        element.focus();
    }
}