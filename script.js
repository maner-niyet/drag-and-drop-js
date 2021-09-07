const draggable_list = document.getElementById('draggable-list');
const check = document.getElementById('check');

const topRatedMovies = [
    'The Shawshank Redemption (1994)',
    'The Godfather (1972)',
    'The Godfather: Part II (1974)',
    'The Dark Knight (2008)',
    '12 Angry Men (1957)',
    "Schindler's List (1993)",
    'The Lord of the Rings: The Return of the King (2003)',
    ' Pulp Fiction (1994)',
    'The Good, the Bad and the Ugly (1966)',
    'The Lord of the Rings: The Fellowship of the Ring (2001)'
];

//Store list iteams
const listItems = [];

let dragStartIndex;

createList();

function createList(){
    [...topRatedMovies]
        .map(a => ({value: a, sort: Math.random()}))
        .sort((a, b) => a.sort - b.sort)
        .map(a => a.value)
        .forEach((movie, index) => {
            console.log(movie)
            const listItem = document.createElement('li');

            listItem.setAttribute('data-index', index);

            listItem.innerHTML = `
                <span class="number">${index + 1}</span>
                <div class="draggable" draggable="true">
                    <p class="movie-name">${movie}</p>
                    <i class="fas fa-grip-lines"></i>
                </div>
            `;

            listItems.push(listItem);

            draggable_list.appendChild(listItem)
        })

        addEventListeners();
}

function dragStart() {
    dragStartIndex = +this.closest('li').getAttribute('data-index')
    console.log(dragStartIndex)
}
function dragEnter() {
    this.classList.add('over')
}
function dragLeave() {
    this.classList.remove('over')
}
function dragOver(e) {
    e.preventDefault();
}

function dragDrop() {
    const dragEndIndex = +this.getAttribute('data-index')
    swapItems(dragStartIndex, dragEndIndex);

    this.classList.remove('over')
}

//Swap list items that are drag and drop
function swapItems(fromIndex, toIndex) {
    const itemOne = listItems[fromIndex].querySelector('.draggable')
    const itemTwo = listItems[toIndex].querySelector('.draggable')

    listItems[fromIndex].appendChild(itemTwo);
    listItems[toIndex].appendChild(itemOne);
}

//Check the order of list items
function checkOrder() {
    listItems.forEach((listItem, index) => {
        const movieName = listItem.querySelector('.draggable')
        .innerText.trim();

        if (movieName !== topRatedMovies[index]) {
            listItem.classList.add('wrong')
        } else {
            listItem.classList.remove('wrong')
            listItem.classList.add('right')
        }
    })
}

function addEventListeners() {
    const draggables = document.querySelectorAll('.draggable');
    const dragListItems = document.querySelectorAll('.draggable-list li');

    draggables.forEach(draggable => {
        draggable.addEventListener('dragstart', dragStart);
    })
    dragListItems.forEach(item => {
        item.addEventListener('dragover', dragOver);
        item.addEventListener('drop', dragDrop);
        item.addEventListener('dragenter', dragEnter);
        item.addEventListener('dragleave', dragLeave);
    })
}

check.addEventListener('click', checkOrder)