
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
        <td id="name">${data.name}</td>
        <td  id="priority" > ${data.priority}</td>
        <td>
        ${data.status}
        </td>
        <td  id="date">${data.date}</td>
        <td id="action">

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




// Delete,Edit and Checked Action

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

        const tr = e.target.parentElement.parentElement
        const id = tr.dataset.id
        const tds = tr.children;
        let nameTd

        let priorityTd
        let dateTd
        let actionTd


        [...tds].forEach(td => {
            if (td.id == 'name') {
                nameTd = td


                const input = document.createElement('input');
                input.type = 'text';
                const preName = td.textContent
                td.innerHTML = ' '
                input.value = preName
                td.appendChild(input)


            }
            else if (td.id == 'priority') {
                priorityTd = td
                const select = document.createElement('select');
                const prePriority = td.innerText


                td.innerHTML = ' '
                select.innerHTML = ` <option disabled selected value="">Select One</option>
                <option value="high">high</option>
                <option value="low">low</option>
                <option value="medium">medium</option>`

                if (prePriority === 'high') {
                    select.selectedIndex = 1


                }
                else if (prePriority === 'low') {
                    select.selectedIndex = 2


                }
                else if (prePriority === 'medium') {
                    select.selectedIndex = 3


                }


                td.appendChild(select)

            }
            else if (td.id == 'date') {
                dateTd = td
                const input = document.createElement('input');
                input.type = 'date';
                const preDate = td.textContent
                td.innerHTML = ' '
                input.value = preDate
                td.appendChild(input)

            }
            else if (td.id == 'action') {
                actionTd=td
                const preBtn = td.innerHTML
                td.innerHTML = ' '
                const saveBtn = document.createElement('btn')
                saveBtn.innerHTML = ` <i  class="fas fa-sd-card" ></i> `
                saveBtn.addEventListener('click', function (e) {


                    const editedTask = {
                        id,

                        name: nameTd.children[0].value,
                        priority: priorityTd.children[0].value,
                        date: dateTd.children[0].value,
                        status: 'incomplete'
                    }

                    const tasks = getDateFromLocalStorage()
                    const newTasks = tasks.map(task => {
                        if (task.id === id) {
                            return editedTask
                        }
                        return task

                    })
                    // console.log(newTasks)
                    setDateToLocalStorage(newTasks)



                    // console.log(editedTask)



                   nameTd.innerHTML = nameTd.children[0].value
                    dateTd.innerHTML = dateTd.children[0].value
                    priorityTd.innerHTML = priorityTd.children[0].value
                    actionTd.innerHTML=preBtn

                    console.log('Hi')
                })

                td.appendChild(saveBtn)





            }


        })





        // const tasks = getDateFromLocalStorage()
        // const targetedTask = tasks.find(task => task.id === id)
        // console.log(targetedTask)

        // form[0].value = targetedTask.name
        // form[1].value = targetedTask.priority
        // form[2].value = targetedTask.date
        // const newTasks = tasks.filter(task => task.id !== id)
        // setDateToLocalStorage(newTasks)





        // load()


    }
    else {

    }



})





