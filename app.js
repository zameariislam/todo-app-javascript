
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


const showUI = (data, index) => {
    
    const tr = document.createElement('tr')
    tr.innerHTML = `

    <tr >
        <td>${index}</td>
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


        const tasks = getDateFromLocalStorage()
        showUI(data, tasks.length + 1)

        tasks.push(data)
        setDateToLocalStorage(tasks)



    }

    this.reset()



})


window.onload = load()



function load() {
    tbody.innerHTML = ' '
    const tasks = getDateFromLocalStorage()
    tasks.forEach((task, index) => {
        showUI(task, index + 1)

    })



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




// Action 
tbody.addEventListener('click', function (e) {
    if (e.target.id == 'delete') {


        const tr = e.target.parentElement.parentElement
        const id = tr.dataset.id
        tr.remove()
        const tasks = getDateFromLocalStorage()
        const newTasks = tasks.filter(task => task.id !== id)
        setDateToLocalStorage(newTasks)
        load()

    }
    else if (e.target.id == 'check') {
        console.log('check')
        const tr = e.target.parentElement.parentElement
        const id = tr.dataset.id
        const tasks = getDateFromLocalStorage()
        const newTasks = tasks.map(task => {
            if (task.id === id) {
                return { ...task, status: 'complete' }
            }
            return task

        })
        console.log(newTasks)
        setDateToLocalStorage(newTasks)
        load()





    }
    else if (e.target.id == 'edit') {
        console.log('edit')
        const tr = e.target.parentElement.parentElement
        const id = tr.dataset.id

    }
    else {

    }



})





