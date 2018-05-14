let tList = [];

function chooseFun() {
    let attrs = document.getElementById("attrs");
    let opt = selectOne.options[selectOne.selectedIndex];
    document.getElementById("tables").style.display = "inline";
    switch (opt.value) {
        case "selectOne":
            document.getElementById("create").style.display = "none";
            document.getElementById("commit").style.display = "none";
            document.getElementById("warning").style.display = "none";
            document.getElementById("tables").style.display = "none";
            while (attrs.hasChildNodes()) {
                attrs.removeChild(attrs.firstChild);
            }
            break;
        case "createTable":
            document.getElementById("create").style.display = "inline";
            document.getElementById("commit").style.display = "inline";
            document.getElementById("warning").style.display = "none";
            createTablePre();
            break;
        case "addRow":
            document.getElementById("create").style.display = "none";
            document.getElementById("commit").style.display = "inline";
            document.getElementById("warning").style.display = "none";
            addRowPre();
            break;
        case "deleteRow":
            document.getElementById("create").style.display = "none";
            document.getElementById("commit").style.display = "inline";
            document.getElementById("warning").style.display = "none";
            deleteRowPre();
            break;
        case "deleteTable":
            document.getElementById("create").style.display = "none";
            document.getElementById("commit").style.display = "inline";
            document.getElementById("warning").style.display = "block";
            deleteTablePre();
            break;
    }
}

function commitFun() {
    let opt = selectOne.options[selectOne.selectedIndex];
    switch (opt.value) {
        case "createTable":
            if (!checkPre())return;
            createTableFun();
            break;
        case "addRow":
            addRowFun();
            break;
        case "deleteRow":
            deleteRowFun();
            break;
        case "deleteTable":
            deleteTableFun();
            break;
    }
}

function createAttr(num) {
    let attrs = document.getElementById("attrs");
    while (attrs.hasChildNodes()) {
        attrs.removeChild(attrs.firstChild);
    }
    if (num > 0) {
        for (let i = 0; i < num; ++i) {
            let attr = document.createElement("input");
            attr.placeholder = "Attr" + (i + 1);
            attrs.appendChild(attr);
        }
    }
}

function chooseTable() {
    let tables = document.getElementById("tables");
    let n = tables.children.length;
    let optn = selectTwo.selectedIndex-1;
    for (let i = 0; i < n; ++i)
        tables.getElementsByTagName("table")[i].style.display = "none";
    if (optn==-1) return;
    tables.getElementsByTagName("table")[optn].style.display = "inline";
    chooseFun();
}

function createTablePre() {
    let num = document.getElementsByName("columnsNum")[0].value;
    createAttr(num);
}

function checkPre() {
    let n = document.getElementsByName("columnsNum")[0].value;
    let name = document.getElementsByName("tableName")[0].value;
    let attrs = document.getElementById("attrs");
    let flag = true;
    if(n<1||name=="")return 0;
    for (let i = 0; i < n; ++i) {
        let text = attrs.getElementsByTagName("input")[i].value;
        if(text=="")flag=false;
    }
    return flag;
}

function createTableFun() {
    let attrs = document.getElementById("attrs");
    let ths = document.createElement("tr");
    let n = document.getElementsByName("columnsNum")[0].value;
    let newTable = new LabTable(document.getElementsByName("tableName")[0].value,n);
    for (let i = 0; i < n; ++i) {
        let th = document.createElement("th");
        let text = document.createTextNode(attrs.getElementsByTagName("input")[i].value);
        th.appendChild(text);
        ths.appendChild(th);
    }
    newTable.setHead(ths);
    tList.push(newTable);
    document.getElementById("tables").appendChild(newTable.table);
    let newopt = document.createElement("option");
    newopt.value = newTable.name.nodeValue;
    newopt.innerHTML = newTable.name.nodeValue;
    document.getElementById("selectTwo").appendChild(newopt);
    newopt.selected = true;
    document.getElementById("selectTwo").style.display = "inline";
    chooseTable();
}

function addRowPre() {
    let attrs = document.getElementById("attrs");
    while (attrs.hasChildNodes()) {
        attrs.removeChild(attrs.firstChild);
    }
    let tables = document.getElementById("tables");
    let optn = selectTwo.selectedIndex-1;
    if (optn == -1) return;
    let n = tList[optn].colNum;
    createAttr(n);
}

function addRowFun() {
    let attrs = document.getElementById("attrs");
    let optn = selectTwo.selectedIndex-1;
    if (optn == -1) return;
    let obj = tList[optn];
    let n = obj.colNum;
    let newtr = document.createElement("tr");
    for (let i = 0; i < n; ++i) {
        let tdata = document.createElement("td");
        let text = document.createTextNode(attrs.getElementsByTagName("input")[i].value);
        tdata.appendChild(text);
        newtr.appendChild(tdata);
    }
    obj.addRow(newtr);
}

function deleteRowPre() {
    let attrs = document.getElementById("attrs");
    while (attrs.hasChildNodes()) {
        attrs.removeChild(attrs.firstChild);
    }
    let tables = document.getElementById("tables");
    let optn = selectTwo.selectedIndex-1;
    if (optn == -1) return;
    let n = tList[optn].colNum;
    createAttr(n);
}

function deleteRowFun(){
    let optn = selectTwo.selectedIndex-1;
    if (optn == -1) return;
    let obj = tList[optn];
    let keyList = attrs.getElementsByTagName("input");
    let isNotTarget = false;
    for(let i=0;i<obj.tdList.length;++i){
        isNotTarget = false;
        for(let j=0;j<obj.colNum;++j){
            let tdata=obj.tdList[i].getElementsByTagName("td")[j];
            let kdata=keyList[j];
            if ((keyList[j].value == tdata.innerHTML) || (kdata.value == ""))continue;
            else {
                isNotTarget = true;
                break;
            }
        }
        if (!isNotTarget) obj.deleteRow(i--);
    }
}

function deleteTablePre() {
    let attrs = document.getElementById("attrs");
    while (attrs.hasChildNodes()) {
        attrs.removeChild(attrs.firstChild);
    }
    let optn = selectTwo.selectedIndex - 1;
    if (optn == -1) return;
}

function deleteTableFun(){
    let tables = document.getElementById("tables");
    let optn = selectTwo.selectedIndex-1;
    if (optn == -1)return;
    let obj = document.getElementById("tables").getElementsByTagName("table")[optn];
    let objName = document.getElementById("selectTwo").getElementsByTagName("option")[optn+1];
    tList.splice(optn,1);
    tables.removeChild(obj);
    selectTwo.removeChild(objName);
    delete obj;
    selectTwo.children[1].selected = true;
    chooseTable();
}

window.onload = function () {
    let columnsNum = document.getElementsByName("columnsNum")[0];
    let selectOne = document.getElementById("selectOne");
    let selectTwo = document.getElementById("selectTwo");
    let commitBtn = document.getElementById("commitBtn");
    columnsNum.onchange = createTablePre;
    selectOne.onchange = chooseFun;
    selectTwo.onchange = chooseTable;
    chooseFun();
}