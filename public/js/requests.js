const deleteOrder = (orderIndex, csrfToken) => {
    const order = document.getElementById('a' + orderIndex)

    fetch('/deleteorder/' + orderIndex, {
        method: 'DELETE',
        headers: {
            'csrf-token': csrfToken
        }
    })
    .then(result=> {
        return result.json()
    })
    .then(orderIndex => {
        console.log(orderIndex.data);
        order.remove()
        if(orderIndex.data) {
            document.getElementById('cart_items').innerText = orderIndex.data + ' items'
            return
        }
        document.getElementById('cart_items').innerText = 'Empty'
    })
    .catch(err => {
        console.log(err);
    })
}