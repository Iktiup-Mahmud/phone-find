// const loadData = () => {
//     const url = ('https://openapi.programming-hero.com/api/phones?search=Apple')
//     fetch (url)
//     .then(res => res.json())
//     .then(data => console.log(data))
// }
// loadData()


const loadData = async(search, dataLimit) => {
    const url = (`https://openapi.programming-hero.com/api/phones?search=${search}`)
    const res = await fetch(url);
    const data = await res.json();
    displayPhones(data.data, dataLimit)
}
const displayPhones = (phones, dataLimit) => {
    const phonesContainer = document.getElementById('phones-container');
    phonesContainer.textContent = ``;

    const btn = document.getElementById('show-all')
    if (dataLimit &&  phones.length > 10){
        btn.classList.remove('d-none')
        phones = phones.slice(0, 10);
    }
    else{
        btn.classList.add('d-none')
    }
    // showAll(phones);

    
    // display no phone found
    const noPhone = document.getElementById('no-phone-msg');

    // show only 10 phone 
    if (dataLimit && phones.length === 0) {
        noPhone.classList.remove('d-none')
    }
    else{
        noPhone.classList.add('d-none')
    }
    phones.forEach(phone => {
        const phoneDiv = document.createElement('div');
        phoneDiv.classList.add('col')
        phoneDiv.innerHTML = `
        <div class="card p-4">
                <img src="${phone.image}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${phone.phone_name}</h5>
                <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                <button  onclick="loadPhoneDetails('${phone.slug}')" href="#" class="btn btn-primary"  data-bs-toggle="modal" data-bs-target="#phoneDetailsModal">Show Details</button>
            </div>
        </div>`
        phonesContainer.appendChild(phoneDiv);
    });
    // stop loader
    toogleSpinner(false)
}

const processSearch = (dataLimit) => {
    // start loader
    toogleSpinner(true)
    const searchField = document.getElementById('search-field');
    const searchValue = searchField.value; 
    // searchField.value = '';
    loadData(searchValue, dataLimit);
}

document.getElementById('btn-search').addEventListener('click', function () {
    processSearch(10);
})

const toogleSpinner = isLoading => {
    const  spinnerSection = document.getElementById('spinner');
    if (isLoading){
        spinnerSection.classList.remove('d-none');
    }
    else{
        spinnerSection.classList.add('d-none');
    }
}


// const showAll = (data) => {
//     const btn = document.getElementById('show-all')
//     if (data.length > 10){
//         btn.classList.remove('d-none')
//         data = data.slice(0, 10);
//     }
//     else{
//         btn.classList.add('d-none')
//     }
// }



// input key enter in event handler
document.getElementById('search-field').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        processSearch(10)
    }
})


// not the best way to load show all data
// show all button
document.getElementById('btn-show-all').addEventListener('click', function () {
    processSearch();
})


const loadPhoneDetails = async id => {
    const url = `https://openapi.programming-hero.com/api/phone/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    displayPhoneDetails(data.data)
}

// display phone details 
const displayPhoneDetails = phone => {
    console.log(phone);
    const modalTitle = document.getElementById('phoneDetailsModalLabel');
    modalTitle.innerText = phone.name;
    const phoneDetails = document.getElementById('phone-details');
    phoneDetails.innerHTML = `
    <p>Release Date: ${phone.releaseDate ? phone.releaseDate : "no release date found"} </p>
    <p>Storage: ${phone.mainFeatures ? phone.mainFeatures.storage : "no storage info found"} </p>
    <p>Others: ${phone.others ? phone.others.Bluetooth : "no bluetooth info found"}</p>
    
    `
    console.log(modalTitle)
}


loadData('apple');