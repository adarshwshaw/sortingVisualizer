let canvas = document.getElementById("canvas")
arr = [10, 30, 50, 70, 90, 20, 40, 60, 80]
select = 'mark'
found = 'green'


function renderList(list) {
    canvas.innerHTML = ""
    cwidth = Math.round(list.length / canvas.clientWidth * 100);
    cheight = canvas.clientHeight;
    for (i = 0; i < list.length; i++) {
        let div = document.createElement('div');

        div.classList.add("bar")
        div.style.width = `${cwidth}%`
        div.style.height = `${Math.round(list[i] / cheight * 100)}%`
        canvas.appendChild(div)
    }
    return document.getElementsByClassName('bar')
}

function generate_rand() {
    let min = 10
    let max = canvas.clientHeight
    let arr = []
    let itr = Math.round(canvas.clientWidth / 10);
    for (let i = 0; i < itr; i++) {
        let num = Math.round(Math.random() * (max - min)) + min
        arr.push(num)
    }
    console.log(arr)
    return arr
}

function delay(time) {
    return new Promise(res => setTimeout(res, time))
}

async function mark(divs, i, j, green) {
    divs[i].classList.add(green)
    divs[j].classList.add(green)
}

function unmark(divs, i, j, green) {
    divs[i].classList.remove(green)
    divs[j].classList.remove(green)
}
async function sort(list, divs) {
    for (let i = 0; i < list.length - 1; i++) {
        min = i
        for (j = i + 1; j < list.length; j++) {
            oldmin = min
            mark(divs, oldmin, j, select)
            await delay(50)
            if (list[j] < list[min]) {
                min = j
            }
            unmark(divs, oldmin, j, select)
        }
        mark(divs, i, min, found)
        t = list[i]
        list[i] = list[min]
        list[min] = t
        await delay(100)
        divs = renderList(list)
    }
    console.log(list)
}
async function bbsort(list, divs) {
    for (let i = 0; i < list.length; i++) {
        for (j = 0; j < list.length - i - 1; j++) {
            mark(divs, j, j + 1, select)
            await delay(50)
            if (arr[j] > arr[j + 1]) {
                unmark(divs, j, j + 1, select)
                mark(divs, j, j + 1, found)
                t = list[j]
                list[j] = list[j + 1]
                list[j + 1] = t
                await delay(200)
                divs = renderList(list)
            }
            unmark(divs, j, j + 1, select)
        }
    }
    console.log(list)
}

function data() {
    let select = document.getElementById('method')
    let val = select.value;
    console.log(val)
    arr = generate_rand()
    divs = renderList(arr)
    document.getElementById('doit').disabled = true
    if (val === 'selection') {
        sort(arr, divs)
    }
    else if (val === 'bubble') {
        bbsort(arr, divs)
    }
    document.getElementById('doit').disabled = false
}
