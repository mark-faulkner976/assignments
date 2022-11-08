const list = document.getElementById('list')

document.getElementById('input').addEventListener('click', function(event) {
    event.preventDefault()

    const input = document.getElementById('title').value
    document.getElementById('title').value = ''
    const li = document.createElement('li')
    const div = document.createElement('div')
    div.textContent = input
    list.append(li)
    li.append(div)
    const edit = document.createElement('button')
    edit.innerHTML = 'Edit'
    li.append(edit)
    const X = document.createElement('button')
    X.innerHTML = 'X'
    X.addEventListener('click', event => {
        
    })
    li.append(X)


})
