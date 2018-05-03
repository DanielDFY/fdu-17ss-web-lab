function creatItem() {
    for(let count = 0;count<4;++count){
        let item = document.createElement("div");
        let title_h2 = document.createElement("h2");
        let innerBox_1 = document.createElement("div");
        let innerBox_2 = document.createElement("div");
        let list = document.createElement("ul");
        let title_h3_1 = document.createElement("h3");
        let title_h3_2 = document.createElement("h3");


        item.className = "item";
        innerBox_1.className = "inner-box";
        innerBox_2.className = "inner-box";

        title_h2.appendChild(document.createTextNode(countries[count].name));
        item.appendChild(title_h2);
        let para = document.createElement("p");
        para.appendChild(document.createTextNode(countries[count].continent));
        item.appendChild(para);

        title_h3_1.appendChild(document.createTextNode("Cities"));
        innerBox_1.appendChild(title_h3_1);

        for (let i of countries[count].cities) {
            let para = document.createElement("li");
            para.appendChild(document.createTextNode(i));
            list.appendChild(para);
        }
        innerBox_1.appendChild(list);

        item.appendChild(innerBox_1);

        title_h3_2.appendChild(document.createTextNode("Popular Photos"));
        innerBox_2.appendChild(title_h3_2);

        for (let i of countries[count].photos) {
            let image = document.createElement("img");
            image.src = "images/" + i;
            image.className = "photo";
            innerBox_2.appendChild(image);
        }

        item.appendChild(innerBox_2);

        let button = document.createElement("button");
        button.className = "button";
        button.appendChild(document.createTextNode("Vist"));

        item.appendChild(button);

        document.getElementById("container").appendChild(item);
    }
    
}

window.onload = function () {
    creatItem();
}




