
// selection 

function $(id) {
    return document.getElementById(id)


}
const form = $('form')
const today = new Date().toISOString().slice(0, 10)
const date = $('date')
date.value = today



form.addEventListener('submit', function (e) {
    e.preventDefault();
   
    let inputElements = this.elements
    let data = {}


    for (let input of inputElements) {
        if (input.type !== 'submit') {
            data[input.name] = input.value
        }

    } 
    data.status='incomplete'
 







})

