
// selection 

function $(id) {
    return document.getElementById(id)


}

// selection 
const form = $('form')
const date = $('date')
const tbody = $('tbody')
const searchField = $('search')
const filterField = $('filter')
const sortField = $('sortFilter')
const dateField = $('by_date')
const allSelect = $('all_select')
const checkboxes = [...document.getElementsByClassName('checkbox')]

const today = new Date().toISOString().slice(0, 10)

date.value = today

let selectedTask = []


function selectFunc(e) {
    const isChecked = e.target.checked
    const tr = e.target.parentElement.parentElement
    const id = tr.dataset.id

    if (isChecked) {


        selectedTask.push(tr)
        bulkActionHandler()
    }
    else {
        const index =
            selectedTask.findIndex(tr => tr.dataset.id === id)
        if (index !== -1) {
            selectedTask.splice(index, 1)
        }
        bulkActionHandler()


    }
    console.log(selectedTask)



}
allSelect.addEventListener('change', function (e) {
    const isChecked = this.checked
    selectedTask = []
    const checkboxes = [...document.getElementsByClassName('checkbox')]
    if (isChecked) {
        checkboxes.forEach(box => {
            box.checked = true
            selectedTask.push(box.parentElement.parentElement)

        })
        bulkActionHandler()
    }
    else {
        checkboxes.forEach(box => {
            box.checked = false


        })
        bulkActionHandler()

    }
    console.log(selectedTask)



})

const bulkActionHandler = () => {


    if (selectedTask.length > 0) {
        $('bulk_action').style.display = 'flex'

    }
    else {
        $('bulk_action').style.display = 'none'
    }


}

$('bulk_dismiss').addEventListener('click', function (e) {
    selectedTask = []
    bulkActionHandler()
    const checkboxes = [...document.getElementsByClassName('checkbox')]
    checkboxes.forEach(box => {
        box.checked = false

    })
    allSelect.checked = false
    $('bulk_priority').selectedIndex=0
    $('bulk_status').selectedIndex=0
    $('edit_section').selectedIndex=0
    $("edit_task").value=' '
    $("edit_task").type='text'

    console.log(selectedTask)


})

$('bulk_btn').addEventListener('click', function (e) {
    let tasks = getDateFromLocalStorage()
    console.log(selectedTask)


    selectedTask.forEach(tr => {
        const id = tr.dataset.id

        tasks = tasks.filter(task => task.id !== id)



        tr.remove()




    })
    setDateToLocalStorage(tasks)
    $('bulk_action').style.display = 'none'
    allSelect.checked = false
    console.log(selectedTask)



})

$('bulk_priority').addEventListener('change', function (e) {

    let tasks = getDateFromLocalStorage()

    selectedTask.forEach(tr => {
        [...tr.children].forEach(td => {
            if (td.id == 'priority') {
                td.textContent = e.target.value



            }


        })
        tasks = tasks.map((task) => {
            if (task.id == tr.dataset.id) {
                return { ...task, priority: e.target.value }
            }
            else {
                return task
            }

        })



    })
    setDateToLocalStorage(tasks)

})

$("bulk_status").addEventListener('change', function (e) {

    let tasks = getDateFromLocalStorage()

    selectedTask.forEach(tr => {
        [...tr.children].forEach(td => {
            if (td.id == 'status') {
                td.textContent = e.target.value



            }


        })
        tasks = tasks.map((task) => {
            if (task.id == tr.dataset.id) {
                return { ...task, status: e.target.value }
            }
            else {
                return task
            }

        })



    })
    setDateToLocalStorage(tasks)

})

$('edit_section').onchange = function (e) {
    const value = e.target.value
    if (value == 'date') {
        $('edit_task').value = ' '
        $('edit_task').type = 'date'


    }

    else {
        $('edit_task').value = ' '
        $('edit_task').type = 'text'


    }
}

$('edit_task').oninput = function (e) {
    let tasks = getDateFromLocalStorage()
    if (this.type == 'text') {

        selectedTask.forEach(tr => {
            [...tr.children].forEach(td => {
                if (td.id == 'name') {
                    td.textContent = e.target.value



                }


            })
            tasks = tasks.map((task) => {
                if (task.id == tr.dataset.id) {
                    return { ...task, name: e.target.value }
                }
                else {
                    return task
                }

            })



        })





    }
    else {
        selectedTask.forEach(tr => {
            [...tr.children].forEach(td => {
                if (td.id == 'date') {
                    td.textContent = e.target.value



                }


            })
            tasks = tasks.map((task) => {
                if (task.id == tr.dataset.id) {
                    return { ...task, date: e.target.value }
                }
                else {
                    return task
                }

            })



        })


    }
    setDateToLocalStorage(tasks)


}













const showUI = (data, index) => {
    const tr = document.createElement('tr')
    const check = document.createElement('input')
    check.type = 'checkbox'
    check.value = data.id
    check.className = 'checkbox'
    check.addEventListener('change', selectFunc)



    tr.innerHTML = `
 
         <td  id="check"></td>
        <td>${index}</td>
        <td id="name">${data.name}</td>
        <td  id="priority" > ${data.priority}</td>
        <td id="status">
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
   
    `
    tr.dataset.id = data.id
    tr.firstElementChild.append(check)

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
    $('date').value = today



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

        const tr = e.target.parentElement.parentElement
        const id = tr.dataset.id
        const tasks = getDateFromLocalStorage()
        const newTasks = tasks.map(task => {
            if (task.id === id) {
                return { ...task, status: 'complete' }
            }
            return task

        })

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
                actionTd = td
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
                    actionTd.innerHTML = preBtn


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



// search functionality 

searchField.addEventListener('input', (e) => {
    filterField.selectedIndex = 0

    console.log('hi')
    tbody.innerHTML = ' '
    const searchTerm = e.target.value.toLowerCase()


    const tasks = getDateFromLocalStorage()
    let no = 1
    tasks.forEach(task => {

        if (task.name.toLowerCase().includes(searchTerm)) {

            showUI(task, no)
            no++

        }
    })





})

// filter  functionality added 
filterField.addEventListener('change', (e) => {
    searchField.value = ' '

    tbody.innerHTML = ' '
    const filterTerm = e.target.value
    console.log(filterTerm)
    const tasks = getDateFromLocalStorage()


    switch (filterTerm) {
        case 'all':
            tasks.forEach((task, i) => {
                showUI(task, i++)

            })

            console.log('all')

            break;
        case 'complete':
            tasks.forEach((task, i) => {

                if (task.status === 'complete')
                    showUI(task, i++)

            })

            break;
        case 'incomplete':
            tasks.forEach((task, i) => {

                if (task.status === 'incomplete')
                    showUI(task, i++)

            })


            console.log('i am  incomplete')

            break;

        case 'high':
            tasks.forEach((task, i) => {

                if (task.priority === 'high')
                    showUI(task, i++)

            })

            break;
        case 'low':
            tasks.forEach((task, i) => {

                if (task.priority === 'low')
                    showUI(task, i++)

            })

            break;
        case 'medium':
            tasks.forEach((task, i) => {

                if (task.priority === 'medium')
                    showUI(task, i++)

            })

            break;
        case 'today':

            tasks.forEach((task, i) => {

                if (task.date === today)
                    showUI(task, i++)

            })
            console.log('today')

            break;

        default:
            break;
    }





})


// sort by date 

sortField.addEventListener('change', (e) => {
    filterField.selectedIndex = 0
    tbody.innerHTML = ' ';
    const sortTerm = e.target.value
    const tasks = getDateFromLocalStorage()
    if (sortTerm == 'newest') {
        tasks.sort((a, b) => {

            if (new Date(a.date) > new Date(b.date)) {
                return -1
            }
            else if (new Date(a.date) < new Date(b.date)) {
                return 1

            }
            else return 0




        })

    }
    else {

        tasks.sort((a, b) => {

            if (new Date(a.date) > new Date(b.date)) {
                return 1
            }
            else if (new Date(a.date) < new Date(b.date)) {
                return -1

            }
            else return 0




        })

    }

    tasks.forEach((task, i) => {
        showUI(task, i++)
    })

})

// search by date 

dateField.addEventListener('change', (e) => {
    sortField.selectedIndex = 0

    filterField.selectedIndex = 0
    tbody.innerHTML = ' ';
    const dateTerm = e.target.value
    console.log(new Date(dateTerm))
    const tasks = getDateFromLocalStorage()

    tasks.forEach((task, i) => {

        if ((task.date) === (dateTerm)) {
            console.log('I am from date')
            showUI(task, i++)

        }

    })

    dateField.value = ' '
})














