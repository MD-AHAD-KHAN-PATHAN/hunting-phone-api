
// fetch('https://openapi.programming-hero.com/api/phones?search=iphone')
//     .then(res => res.json())
//     .then(data => console.log(data))

const loadPhone = async (phoneName, isShowAll) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${phoneName}`);
    const data = await res.json();
    const phones = data.data;
    displayPhones(phones, isShowAll);
}

loadPhone('13');


const PhoneBrandButton = (isShowAll) => {
    loading(true);
    const inputText = document.getElementById('inputText');
    const inputTextValue = inputText.value;
    loadPhone(inputTextValue, isShowAll);
}

const displayPhones = (phones, isShowAll) => {

    const noData = document.getElementById('noData');
    if (phones.length == 0) {
        noData.classList.remove('hidden');
    }
    else {
        noData.classList.add('hidden');
    }

    if (phones.length > 9 && !isShowAll) {
        document.getElementById('show-all-container').classList.remove('hidden')
    }
    else {
        document.getElementById('show-all-container').classList.add('hidden');
    }

    if (!isShowAll) {
        phones = phones.slice(0, 9);
    }

    const phonesContainer = document.getElementById('phone-container');
    phonesContainer.textContent = '';
    phones.forEach(phone => {
        const phoneCard = document.createElement('div');
        phoneCard.classList = 'card card-compact bg-base-100 shadow-xl border';
        phoneCard.innerHTML = `
        <figure class="bg-gray-300 mx-10 mt-10 mb-5 rounded-xl" ><img class="rounded-xl my-10" src=" ${phone.image} " /></figure>
        <div class="card-body mx-10">
            <h2 class="card-title">${phone.phone_name}</h2>
            <p>${phone.slug}</p>
            <div class="card-actions justify-center">
                <button onclick="openModal('${phone.slug}')" class="btn btn-primary mb-7 mt-3">Show Details</button>
            </div>
        </div>
        `
        phonesContainer.appendChild(phoneCard);
    });

    loading(false);


}

const loading = (isTrue) => {
    const load = document.getElementById('loder');
    if (isTrue) {
        load.classList.remove('hidden');
    }
    else {
        load.classList.add('hidden');
    }

}

const showAll = () => {
    PhoneBrandButton(true);
}

const openModal = async (id) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
    const data = await res.json();
    const phone = data.data;
    phoneDetails(phone);
}

const phoneDetails = (phone) => {

    const showDetails = document.getElementById('show-details-container');

    showDetails.innerHTML = `
        <img class="mx-auto" src="${phone.image}" alt="">
        <div class="leading-8">
            <h3 class="font-bold text-3xl mt-8 mb-3">${phone?.name}</h3>
            <p> <span class="font-bold">Storage : </span>${phone?.mainFeatures?.storage}</p>
            <p> <span class="font-bold">Display Size : </span>${phone?.mainFeatures?.displaySize}</p>
            <p> <span class="font-bold">Chipset : </span>${phone?.mainFeatures?.chipSet}</p>
            <p> <span class="font-bold">Memory : </span>${phone?.mainFeatures?.memory}</p>
            <p> <span class="font-bold">Slug : </span>${phone?.slug}</p>
            <p> <span class="font-bold">Release data : </span>${phone?.releaseDate}</p>
            <p> <span class="font-bold">Brand : </span>${phone?.brand}</p>        
            <p> <span class="font-bold">GPS : </span>${phone?.others?.GPS || 'No GPS Available'}</p>        
        </div>
       
    `
    my_modal_5.showModal();
}

