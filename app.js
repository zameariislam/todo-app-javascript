
// selection 

function $(id) {
    return document.getElementById(id)


}

// selection 
const form = $('form')
const date = $('date')
const tbody = $('tbody')

const today = new Date().toISOString().slice(0, 10)

date.value = today



form.addEventListener('submit', function (e) {
    e.preventDefault();

    let inputElements = this.elements
    let data = {}
    let isValid = true


    for (let input of inputElements) {

        if (input.type !== 'submit') {
            if (input.value === '') {
                alert('please fill up all field ')
                isValid = false
                return

            }
            data[input.name] = input.value

        }

    }
    if (isValid) {
        data.status = 'incomplete'
        data.id = "AA" + Date.now()

        showUI(data)
        const tasks = getDateFromLocalStorage()

        tasks.push(data)
        setDateToLocalStorage(tasks)



    }

    this.reset()



})


window.onload = function () {
    const tasks = getDateFromLocalStorage()
    tasks.forEach(task => {
        showUI(task)

    })








}


const showUI = (data) => {
    console.log(data)
    const tr = document.createElement('tr')
    tr.innerHTML = `

    <tr >
        <td>0</td>
        <td>${data.name}</td>
        <td> ${data.priority}</td>
        <td>
        ${data.status}
        </td>
        <td>${data.date}</td>
        <td>

            <button 
            
             id="delete">
                <i class="fas fa-trash-can"></i>
            </button>
            <button id="check">
                <i class="fas fa-check"></i>
            </button>
            <button id="edit">
                <i class="fa-regular fa-pen-to-square"></i>
            </button>


        </td>
    </tr>
    `
    tr.dataset.id = data.id
    tbody.appendChild(tr)


}


function getDateFromLocalStorage() {
    let tasks = []
    const data = localStorage.getItem('tasks')
    if (data) {
        tasks = JSON.parse(data)
    }
    return tasks



}

function setDateToLocalStorage(tasks) {
    localStorage.setItem('tasks', JSON.stringify(tasks))

}



