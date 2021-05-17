document.getElementById('info').style.color = '#2f2f2f'
const linkelement = document.getElementById('link_active')
const infoLink = document.getElementById('info')
const orderLink = document.getElementById('order')
const favoriteLink = document.getElementById('favorites')
const settingLink = document.getElementById('setting')
const profileInfo = document.getElementById('profile_info')
const profileOrders = document.getElementById('profile_orders')
const profileFavorites = document.getElementById('profile_favorites')
const profileSettings = document.getElementById('profile_settings')
const linkActive = (size) => {
    linkelement.style.marginTop = size + 'vw'
    noneVisible(profileOrders,orderLink)
    noneVisible(profileInfo,infoLink)
    noneVisible(profileSettings,settingLink)
    noneVisible(profileFavorites,favoriteLink)
    if(size == 9) {
        visible(profileInfo,infoLink)
    } 
    if(size == 13) {
        visible(profileOrders,orderLink)
    }
    if(size == 17) { 
        visible(profileFavorites,favoriteLink)
    }
    if(size == 21) {
        visible(profileSettings,settingLink)
    }
}
const noneVisible = (attr,link) => {
    attr.style.visibility = 'hidden'
    attr.style.opacity = '0'
    attr.style.position = 'absolute'
    link.style.color = 'grey'
}
const visible = (attr,link) => {
    link.style.color = '#2f2f2f'
    attr.style.visibility = 'visible'
    attr.style.position = 'static'
    attr.style.opacity = '1'
}

const updateUser = () => {
    const name = document.getElementById('user_name').value
    const surname = document.getElementById('user_surname').value
    const email = document.getElementById('user_email').value
    const phone = document.getElementById('user_phone').value
    const address = document.getElementById('user_address').value
    const postalCode = document.getElementById('user_postalcode').value
    const csrfToken = document.getElementById('csrf_token').value
    console.log(name,surname,email);
    const data = {name,surname,email,phone,address,postalCode}
    fetch('/profile/updateuser', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'csrf-token': csrfToken
        },
        body: JSON.stringify(data)
    })
    .then(response=> {
        return response.json()
    })
    .then(user => {
        console.log(user);
        document.getElementById('save_explanation').innerHTML = 'Saved'
    })
    .catch(err=> {
        console.log('failed');
    })
}