let content = document.querySelector('.content');
let prev = document.getElementById('prev')
let next = document.getElementById('next')
let currentPage = 1;

let uri = "https://jsonplaceholder.typicode.com/todos/"
let options = {
    method: "GET"
}

let pages = {}

let apiFetch = fetch(uri, options);
let response = apiFetch.then(response => response.json())
let data = response.then((results) => {
    let numEachPage = 10;

    let i, j;
    for(i=0, j=0; i<results.length; j++, i+=numEachPage) {
        pages['page' + (j+1)] = results.slice(i, i + numEachPage)
    }
}).catch(err => console.log(err))
.then(() => loadContent(pages, currentPage))
.then(() => loadPages())

const loadContent = (data, page) => {
    content.innerText = ''
    data["page" + page].forEach(d => {
        let titleEl = document.createElement('h1');
        titleEl.innerText = d.title;
        content.appendChild(titleEl)
    })
    currentPage = page;
}

const loadPages = () => {
    prev.addEventListener('click', e => {
        e.preventDefault()
        if(currentPage > 1) {
            loadContent(pages, currentPage - 1)
        } else {
            console.log('You should be on first page, otherwise you are cheating! :) ')
        }
    })

    next.addEventListener('click', e => {
        e.preventDefault()
        if(currentPage < 20) {
            loadContent(pages, currentPage + 1)
        } else {
            console.log('You should be on last page, otherwise you are cheating! :) ')
        }
    })
}