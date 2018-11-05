var cards = document.getElementsByClassName('list')[0];
var arr = new Array(10);
for (var i = 0; i < 7; i++) {
    cards.children[i].asd = 0;
    arr[i] = cards.children[i];
}
cards.setAttribute
cards.addEventListener('click', function (e) {
    console.log(e);
    var card = e.path[e.path.length - 6];
    console.log(card);
    if (card.asd == 0) {
        card.children[2].setAttribute("style", "asdasd");
        card.asd = 1;
    } else {
        card.children[2].style.height = "0rem";
        card.asd = 0;
    }
})