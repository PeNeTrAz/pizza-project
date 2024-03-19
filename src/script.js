let cart = []
let modalQt = 1
let modalKey = 0

const p = (el) => document.querySelector(el)
const pa = (el) => document.querySelectorAll(el)


pizzaJson.map((item, index) => {
    let pizzaItem = p('.models .pizza-item').cloneNode(true)
    
    pizzaItem.setAttribute('data-key', index)
    pizzaItem.querySelector('.pizza-item--img img').src = item.img
    pizzaItem.querySelector('.pizza-item--price').innerHTML = `R$ ${item.price.toFixed(2)}`
    pizzaItem.querySelector('.pizza-item--name').innerHTML = item.name
    pizzaItem.querySelector('.pizza-item--desc').innerHTML = item.description
    pizzaItem.querySelector('a').addEventListener('click', (e) => {
        e.preventDefault()
        let key = e.target.closest('.pizza-item').getAttribute('data-key')
        modalQt = 1
        modalKey = key

        p('.pizzaInfo h1').innerHTML = item.name
        p('.pizzaInfo--desc').innerHTML = item.description
        p('.pizzaBig img').src = item.img
        p('.pizzaInfo--actualPrice').innerHTML = `R$ ${item.price.toFixed(2)}`
        p('.pizzaInfo--size.selected').classList.remove('selected')
        pa('.pizzaInfo--size').forEach((size, sizeIndex) => {
            if(sizeIndex == 2) {
                size.classList.add('selected')
            }
            size.querySelector('span').innerHTML = item.sizes[sizeIndex]
        })

        p('.pizzaInfo--qt').innerHTML = modalQt

        p('.pizzaWindowArea').style.opacity = 0
        p('.pizzaWindowArea').style.display = 'flex'
        setTimeout(() => {
            p('.pizzaWindowArea').style.opacity = 1
        }, 200)
    })
    
    p('.pizza-area').append(pizzaItem)
})


function closeModal() {
    p('.pizzaWindowArea').style.opacity = 0
    setTimeout(() => {
        p('.pizzaWindowArea').style.display = 'none'
    }, 500)
}

pa('.pizzaInfo--cancelButton, .pizzaInfo--cancelMobileButton').forEach((item) => {
    item.addEventListener('click', closeModal)
})

p('.pizzaInfo--qtmenos').addEventListener('click', () => {
    if(modalQt > 1) {
        modalQt--
        p('.pizzaInfo--qt').innerHTML = modalQt
    }
})

p('.pizzaInfo--qtmais').addEventListener('click', () => {
    modalQt++
    p('.pizzaInfo--qt').innerHTML = modalQt
})

pa('.pizzaInfo--size').forEach((size, sizeIndex) => {
    size.addEventListener('click', (e) => {
        p('.pizzaInfo--size.selected').classList.remove('selected')
        size.classList.add('selected')
    })
})

p('.pizzaInfo--addButton').addEventListener('click', () => {

    let size = parseInt(p('.pizzaInfo--size.selected').getAttribute('data-key'))
    let identifier = pizzaJson[modalKey].id+'@'+size
    let key = cart.findIndex((item) => item.identifier == identifier)

    if(key > -1) {
        cart[key].qt += modalQt
        } else {
            cart.push({
                identifier,
                id: pizzaJson[modalKey].id,
                size,
                qt: modalQt
        })
    }
    closeModal()
})