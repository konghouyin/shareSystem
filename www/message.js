var cards = document.getElementsByClassName('list')[0];
var arr = new Array(10);
for (var i = 0; i < 7; i++) {
    cards.children[i].asd = 0;
    arr[i] = cards.children[i];
}


//cards.addEventListener('click', function (e) {
//    console.log(e);
//    alert(e.path[e.path.length - 6]);
//    var card = e.path[e.path.length - 6];
//    console.log(card);
//    if (card.asd == 0) {
//        card.children[2].setAttribute("style", "asd");
//        card.asd = 1;
//    } else {
//        card.children[2].style.height = "0";
//        card.asd = 0;
//    }
//})

for (var i = 0; i < 7; i++) {
    (function (e) {
        cards.children[e].addEventListener("click", function () {
            if (cards.children[e].asd == 0) {
                cards.children[e].children[2].setAttribute("style", "");
                cards.children[e].asd = 1;
            } else {
                cards.children[e].children[2].style.height = "0";
                cards.children[e].asd = 0;
            }
        })
    } )(i)

}

