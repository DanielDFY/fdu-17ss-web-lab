class LabTable{
    constructor(name,colNum){
        this.name = document.createTextNode(name);
        this.table = document.createElement("table");
        this.colNum = colNum;
        this.tdList = [];
    }

    setHead(ths){
        if (this.table.hasChildNodes()){
            this.table.replaceChild(ths,this.table.firstChild());
        }
        else{
            this.table.appendChild(ths);
        }
    }

    addRow(newtr){
        this.table.appendChild(newtr);
        this.tdList.push(newtr);
        this.checkColor();
    }

    checkColor(){
        let n = this.tdList.length;
        for (let i = 0; i < n; ++i) {
            if (i % 2) this.table.getElementsByTagName("tr")[i+1].className = "odd";
            else this.table.getElementsByTagName("tr")[i+1].className = "even";
        }
    }

    deleteRow(n){
        this.tdList.splice(n,1);
        this.table.deleteRow(n+1);
        this.checkColor();
    }
}