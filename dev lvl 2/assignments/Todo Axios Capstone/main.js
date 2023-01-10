function getData(){
    axios.get("https://api.vschool.io/markf/todo")
        .then(res => listData(res.data))
        .catch(err => console.log(err))
}

// REMOVES LIST BEFORE MAKING A NEW ONE obsolete after the reload implementations
function clearList(){
    const el = document.getElementById("todo-List")
    while (el.firstChild){
        el.removeChild(el.firstChild)
    }
}

const todoForm = document["todo-Form"]
const kappa = document.getElementById("todo-List")

// LISTS THE TODO TITLES TO THE DOM
function listData(data){
    // clearList();
    for(let i = 0; i < data.length; i++){
        const li = document.createElement('li')
        const checkbox = document.createElement("input")
        const title = document.createElement("h2")
        const description = document.createElement("p")
        const price = document.createElement("p")
        const image = document.createElement("img")
        const deleteBtn = document.createElement("button")
        const editBtn = document.createElement("button")

        li.classList.add("list-items")
        title.textContent = data[i].title
        title.classList.add("title")
        description.textContent = data[i].description
        description.classList.add("description")
        price.textContent = data[i].price
        price.classList.add("price")
        image.src = data[i].imgUrl
        image.classList.add("image")
        checkbox.setAttribute("type", "checkbox")
        checkbox.classList.add("checkbox")
        deleteBtn.textContent = "Delete"
        deleteBtn.classList.add("delete-btn")
        editBtn.textContent = "Edit"
        editBtn.classList.add("edit-btn")
        
        //styles the line through
        if(data[i].completed === true) {
            title.style.textDecoration = "line-through"
            checkbox.checked = true
        }
        
        // change completed status
        checkbox.addEventListener('click', function(){
            axios.put("https://api.vschool.io/markf/todo/" + data[i]._id, {completed: !data[i].completed})
            .then(res => console.log(res.data))
            .catch(err => console.log(err))
            getData()
            setTimeout(() => {
                document.location.reload();
              }, 1500)
        })

        // delete button
        deleteBtn.addEventListener('click', e => {
            e.preventDefault()

            console.log("Is deleteBtn working?")
            
            axios.delete("https://api.vschool.io/markf/todo/" + data[i]._id)
            .then(res => console.log(res.data))
            .catch(err => console.log(err))
            setTimeout(() => {
                document.location.reload();
              }, 1500)
        })

        // edit bttn functionality, currently struggling with it
        // editBtn.addEventListener('click', e => {
        //     e.preventDefault()

        //     console.log('edit btn working')

        //     if (e.target.textContent === 'Edit' ){
        //         const newInput = document.createElement('input')
        //         newInput.type = 'text'
        //         newInput.value = li.textContent
        //         newInput.id = 'newInput'
                
        //         edit.textContent = 'save'
                
        //     } else if (e.target.textContent === 'save'){
        //         axios.put("https://api.vschool.io/markf/todo/" + data[i]._id, newInput)
        //         .then(res => console.log(res.data))
        //         .catch(err => console.log(err))

        //     }
        // })

        //adds elements to the form want to to it to the ul
        kappa.append(li)
            li.append(title, description, price, image, editBtn, deleteBtn)
            title.prepend(checkbox)
    }
    
    // FORM FOR THE POST REQUEST
    todoForm.addEventListener("submit", e => {
        e.preventDefault()
        
        const newTodo = {
            title: todoForm.Post.value,
            price: todoForm.price.value,
            description: todoForm.description.value,
            imgUrl: todoForm.imgUrl.value
        }
        todoForm.Post.value = ""
        todoForm.price.value = ""
        todoForm.description.value = ""
        todoForm.imgUrl.value = ""
        
        axios.post("https://api.vschool.io/markf/todo", newTodo)
            .then(res => getData(res.data))
            .catch(err => console.log(err))
            setTimeout(() => {
                document.location.reload();
              }, 1500)
    })
}

getData()