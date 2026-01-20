// localStorage.clear()

let bannerT = ''
//Добавление информации постоянно новой в dialog 
try {
    const banners = document.querySelectorAll('.cart-object');
    const dialog = document.querySelector('.mobileCart');
    const dialogImg = dialog.querySelector('img');
    const dialogTitle = dialog.querySelector('h1');
    const dialogPrice = dialog.querySelector('.mobileCart__price');
    const dialogRating = dialog.querySelector('.mobileCart__rating');
    const dialogInfo = dialog.querySelector('.mobileCart__sub-title');


banners.forEach(banner => {
    banner.addEventListener('click', () => {
        // Получаем данные из атрибутов

        const imgSrc = banner.querySelector('img').src;
        const title = banner.querySelector('h3').innerText;
        const price = banner.querySelector('.cart-object__price').innerText;
        const rating = banner.querySelector('.cart-object__rating').innerText;
        const info = banner.querySelector('.cart-object__sub-title').innerText;

        bannerT = banner
        
        // Заполняем модальное окно
        dialogImg.src = imgSrc;
        dialogTitle.innerText = title;
        dialogPrice.innerText = price;
        dialogRating.innerText = rating
        dialogInfo.innerText = info;

    });
});



// Обработчик для второй группы блоков (Для плавного изменения фотографий)
document.querySelector('.teen').addEventListener('click', (e) => {
    if (e.target.closest('.cart-object')) {
        const item = e.target.closest('.cart-object');
        showDialog(item);
    }
});

function showDialog(item) {
    const imgElement = item.querySelector('img');
    const dialogImg1 = document.querySelector('.mobileCart__image');
    
    dialogImg1.src = imgElement.src;
    
    dialogImg1.onload = () => {
        if (window.innerWidth <= 1450) {
            dialogImg1.style.width = '329px';
            dialogImg1.style.height = 'auto';
        } else {
            dialogImg1.style.width = '329px';
            dialogImg1.style.height = '329px';
        }

    };
}


// Отключение взаимодействия на touch устройствах первого элемента select

const select = document.querySelector('select');
select.addEventListener('change', (e) => {
  if (e.target.value === 'filter') {
    e.preventDefault();

    select.value = select.previousValue || select.options[1].value;
}
});


// Корзина логика + бд


//Сохранение Корзины при переходе между страницами

// localStorage.clear()
// Функция сохранения счетчика
function saveCartCounter(counter) {
    localStorage.setItem('countSpan', counter);
}

function saveCartCounterOne(price, quantity) {
    localStorage.setItem('countPrice', price);
    localStorage.setItem('countQuantity', quantity);
}

// Функция для сохранения массива Baskets

// localStorage.clear()

function updateUI(countSpan) {
    const storedData = localStorage.getItem('countSpan');

    if (!storedData) {
        saveCartCounter(countSpan)
    }

    countSpan = storedData
    
    return countSpan
}

function updateUIone(countPrice, countProducts) {
    const storedPrice = localStorage.getItem('countPrice');
    const storedProducts = localStorage.getItem('countQuantity');

    countProducts = storedProducts
    countPrice = storedPrice

    return [countProducts, countPrice]
}

document.addEventListener('DOMContentLoaded', () => {


// Инициализация элементов

const banners1 = document.querySelectorAll('.cart-object');

const mobileCart = document.querySelector('.mobileCart');
const addToCartBtn = mobileCart.querySelector('.mobileCart__button');
const basketDialog = document.querySelector('.mobileCorsin');
let basketDialogBlock = basketDialog.querySelector('.mobileCorsin__block');
const basketContent = basketDialog.querySelector('.Basket');
const basketTitle = basketDialog.querySelector('.mobileOverlay__title');

const Header = document.querySelector('.header');

const headerButton = Header.querySelector('.header__corsin-button');
const headerSpan = headerButton.querySelector('.header__corsin-span');

const sizeSelect = mobileCart.querySelector('.mobileCart__select');

let countProducts = 0
let countPrice = 0
let countSpan = 0


headerSpan.innerText = updateUI(countSpan);
countSpan = Number(headerSpan.innerText)


const elems = updateUIone(countPrice, countProducts);
updateDialogTitle()

countPrice = Number(elems[1])
countProducts = Number(elems[0])

const basketNumberProducts = basketDialog.querySelector('.Basket__enter-title');
const basketTotalPrice = basketDialog.querySelector('.Basket__enter-price');

basketNumberProducts.innerText = 'Number of products: ' + countProducts
basketTotalPrice.innerText = 'Total price: ' + countPrice + ' rub.'

const DeleteThree = document.querySelector('.Basket')

DeleteThree.remove()

const sohrTitleFave = document.querySelector('.absolute__title')
if (!localStorage.getItem('countFave')) {
    sohrTitleFave.innerHTML = 0
} else {
    sohrTitleFave.innerHTML = localStorage.getItem('countFave')
}


// Функция обновления заголовка

function updateDialogTitle() {
    try {
        const basketItems = Object.keys(JSON.parse(localStorage.getItem('basketsElems'))).length;

        if (basketItems === 0) {
            basketTitle.innerText = 'Your shopping cart is empty';
            return;
        } else {
            basketTitle.innerText = 'The basket is full';
            return;
        }   
    } catch (error) {
        console.log(error)
    }

    basketTitle.innerText = 'Your shopping cart is empty';
    
}

function updateCorsinSpan(true2) {

    if (true2) {
        countSpan += 1
    } else if (true2 === false) {
        countSpan -= 1
    } else {
        countSpan = 0
    }

    headerSpan.innerText = countSpan

    saveCartCounter(countSpan);
    updateUI(countSpan)
}

function updatePriceAndNumberProducts(true1, price) {
    
    let priceOp = parseInt(price)

    if (true1) {
        countProducts += 1
        countPrice += priceOp

    } else if (true1 === false) {
        countProducts -= 1
        countPrice -= priceOp

    } else {
        countProducts = 0
        countPrice = 0
    }
   
    basketNumberProducts.innerText = 'Number of products: ' + countProducts
    basketTotalPrice.innerText = 'Total price: ' + countPrice + ' rub.'

    saveCartCounterOne(countPrice, countProducts);
    updateUIone(countPrice, countProducts)

}
function addBasketDialogFave(productData, newDialogFave) {

    // Заполняем поля данными товара
    newDialogFave.querySelector('.Basket__title').textContent = productData.title;
    newDialogFave.querySelector('.Basket__price').textContent = productData.price;
    newDialogFave.querySelector('.Basket__rating').textContent = productData.rating;
    newDialogFave.querySelector('.Basket__image').src = productData.image;
    newDialogFave.querySelector('.Basket__size').textContent = productData.size;

   return newDialogFave
}

function addBasketDialog(productData, newDialog) {

    // Заполняем поля данными товара
    newDialog.querySelector('.Basket__title').textContent = productData.title;
    newDialog.querySelector('.Basket__price').textContent = productData.price;
    newDialog.querySelector('.Basket__rating').textContent = productData.rating;
    newDialog.querySelector('.Basket__image').src = productData.image;
    newDialog.querySelector('.Basket__size').textContent = productData.size;

   return newDialog
}
// localStorage.clear()

let basketsList = ''

if (localStorage.getItem('basketsElems') === '') {
    basketsList = {};
} else {
    basketsList = JSON.parse(localStorage.getItem('basketsElems')) || {};
}
let countBaskets = 0


function sohrBasketsElems() {
    if ( (!('basketsElems1' in basketsList)) ) {
        localStorage.setItem('basketsElems', JSON.stringify(basketsList));
    } else {
        localStorage.setItem('basketsElems', JSON.stringify(basketsList['basketsElems1']));
    }
    localStorage.setItem('countBaskets', countBaskets);
}

function sohrBasketsElemsFave() {
    if ( (!('basketsElems1Fave' in basketsListFave)) ) {
        localStorage.setItem('basketsElemsFave', JSON.stringify(basketsListFave));
    } else {
        localStorage.setItem('basketsElemsFave', JSON.stringify(basketsListFave['basketsElems1Fave']));
    }
    localStorage.setItem('countBasketsFave', countBasketsFave);
}


let nomer = 0
let nomerFave = 0

let veenFave = 0

//Обработчик нажатия на кнопку "Избранное"

const selectorsFave = document.querySelectorAll('.absolute__button')


let basketsListFave = ''

if (localStorage.getItem('basketsElemsFave') === '') {
    basketsListFave = {};
} else {
    basketsListFave = JSON.parse(localStorage.getItem('basketsElemsFave')) || {};
}
let countBasketsFave = 0

for (let k = 0; k < selectorsFave.length; k++) {

    selectorsFave[k].addEventListener('click', () => {

        const attrFave = selectorsFave[k].parentElement

        const productTitle = attrFave.querySelector('.mobileCart__title').textContent;
        const productPrice = attrFave.querySelector('.mobileCart__price').textContent;
        const productRating = attrFave.querySelector('.mobileCart__rating').textContent;
        const productImage = attrFave.querySelector('.mobileCart__image').src;
        let productSize = 0
        if (!attrFave.querySelector('.mobileCart__select').value) {
            productSize = 'Size: S'
        } else {
            productSize = attrFave.querySelector('.mobileCart__select').value;
        }
        console.log(attrFave.querySelector('.mobileCart__select').value)


        const productData = {
            title:  productTitle,
            price: productPrice ,
            rating: productRating ,
            image: productImage ,
            size: productSize ,
        };

        
        let newDialogFave = document.createElement('dialog');

        newDialogFave.classList.add('Basket');
        
        newDialogFave.innerHTML = `
                 <nav class="Basket__block">
                    <img src="" alt="" class="Basket__image"> 
                    <div class="Basket__titles">
                        <div class="Basket__top">
                            <div class="Basket__top-item">
                                <h1 class="Basket__title">Название</h1>
                                <nav class="Basket__mini-block-titles">
                                    <h2 class="Basket__price">4900 rub.</h2>
                                    <h3 class="Basket__rating star">4.8</h3>
                                    <h1 class="Basket__size">Size: XXL</h1>
                                </nav>
                            </div> 
                            <div class="Basket__top-item">
                                <details class="mobileCart__details">
                                <summary class="mobileCart__summary">
                                    <h2 class="mobileCart__summary-title">Read more</h2>
                                    <span class="mobileCart__open-window"></span>
                                </summary>
                                <div class="mobileCart__sub-title">
                                    <p>
                                        This stylish men's winter jacket is a combination of elegance and practicality. It is made in classic black color, which makes it versatile for any wardrobe. The model is an elongated parka with a voluminous hood trimmed with fluffy faux fur, which not only adds sophistication, but also perfectly protects from the cold.
                                    </p>
                                </div>
                                </details> 
                            </div> 
                        </div>
                        <div class="Basket__bottom">
                            <button class="Basket__button-add-cart button" type="button">
                                add to cart
                            </button>
                            <form class="Basket__form-button">
                                <button class="Basket__button-delete-fave button" type="button">
                                    Delete
                                </button>
                            </form>
                        </div>
                    </div>
                    </nav>
        `;

        newDialogFave = addBasketDialogFave(productData, newDialogFave);

        if (!localStorage.getItem('nomerFave')) {
            localStorage.setItem('nomerFave', nomerFave)
        }
        let nomerIdFave = +localStorage.getItem('nomerFave')

        const localNewDialogFave = newDialogFave.querySelector('.Basket__block')
        
        nomerIdFave += 1
        localNewDialogFave.dataset.nomer = nomerIdFave

        localStorage.setItem('nomerFave', nomerIdFave)

        if (Object.keys(basketsListFave).length === 0) {
            basketsListFave['basketsElems1Fave'] = {}
        } 

        const bm = localStorage.getItem('basketsElemsFave')
        if (bm) {
            countBasketsFave = Object.keys(JSON.parse(bm)).length
        }  
        if (bm) {
            if (!('basketsElems1Fave' in basketsListFave)) {
                basketsListFave[countBasketsFave] = newDialogFave.innerHTML
            } else { 
                basketsListFave['basketsElems1Fave'][countBasketsFave] = newDialogFave.innerHTML
            }
            
        } else {
            basketsListFave['basketsElems1Fave'][countBasketsFave] = newDialogFave.innerHTML
        }

        countBasketsFave += 1
        sohrBasketsElemsFave()

        const localCountFave = localStorage.getItem('countFave')
        const queryAbsoluteTitlle = document.querySelector('.absolute__title')
        if (!localCountFave) {
            veenFave = 1
            queryAbsoluteTitlle.innerHTML = veenFave
        } else {
            veenFave = +localCountFave + 1
            queryAbsoluteTitlle.innerHTML = veenFave
        }
        localStorage.setItem('countFave', veenFave)


    })
}  

// localStorage.clear()

function AddToCartItems() {
    // Получаем данные из MobileCart
        const productTitle = mobileCart.querySelector('.mobileCart__title').textContent;
        const productPrice = mobileCart.querySelector('.mobileCart__price').textContent;
        const productRating = mobileCart.querySelector('.mobileCart__rating').textContent;
        const productImage = mobileCart.querySelector('.mobileCart__image').src;
        const productSize = mobileCart.querySelector('.mobileCart__select').value;

        const productData = {
            title:  productTitle,
            price: productPrice ,
            rating: productRating ,
            image: productImage ,
            size: productSize ,
        };

        
        let newDialog = document.createElement('dialog');

        newDialog.classList.add('Basket');
        
        newDialog.innerHTML = `
                <nav class="Basket__block">
                <img src="" alt="" class="Basket__image"> 
                <div class="Basket__titles">
                    <div class="Basket__top">
                        <div class="Basket__top-item">
                            <h1 class="Basket__title">Название</h1>
                            <nav class="Basket__mini-block-titles">
                                <h2 class="Basket__price">4900 rub.</h2>
                                <h3 class="Basket__rating star">4.8</h3>
                            </nav>
                            <h1 class="Basket__size">Size: XXL</h1>
                        </div> 
                        <div class="Basket__top-item">
                            <details class="mobileCart__details">
                            <summary class="mobileCart__summary">
                                <h2 class="mobileCart__summary-title">Read more</h2>
                                <span class="mobileCart__open-window"></span>
                            </summary>
                            <div class="mobileCart__sub-title">
                                <p>
                                    This stylish men's winter jacket is a combination of elegance and practicality. It is made in classic black color, which makes it versatile for any wardrobe. The model is an elongated parka with a voluminous hood trimmed with fluffy faux fur, which not only adds sophistication, but also perfectly protects from the cold.
                                </p>
                            </div>
                            </details> 
                        </div> 
                    </div>
                    <div class="Basket__bottom">
                        <button class="Basket__button-buy button" type="button">
                            Buy
                        </button>
                        <form class="Basket__form-button">
                            <button class="Basket__button-delete button" type="button">
                                Delete
                            </button>
                        </form>
                    </div>
                </div>
                </nav>
        `;
      

        newDialog = addBasketDialog(productData, newDialog);

        if (!localStorage.getItem('nomer')) {
            localStorage.setItem('nomer', nomer)
        }
        let nomerId = +localStorage.getItem('nomer')

        const localNewDialog = newDialog.querySelector('.Basket__block')

        nomerId += 1
        localNewDialog.dataset.nomer = nomerId
        localStorage.setItem('nomer', nomerId)

        console.log('BasketsList: ', basketsList)


        if (Object.keys(basketsList).length === 0) {
            basketsList['basketsElems1'] = {}
        } 

        const bm = localStorage.getItem('basketsElems')
        if (bm) {
            countBaskets = Object.keys(JSON.parse(bm)).length
        }
        
        if (bm) {
            if (!('basketsElems1' in basketsList)) {
                basketsList[countBaskets] = newDialog.innerHTML
            } else {
                
                basketsList['basketsElems1'][countBaskets] = newDialog.innerHTML
                
            }
            
        } else {
            basketsList['basketsElems1'][countBaskets] = newDialog.innerHTML
        }

 
        console.log('Локал сторег после добавления товара: ', localStorage)
        countBaskets += 1

        sohrBasketsElems()

        updatePriceAndNumberProducts(true, productPrice);
        updateCorsinSpan(true);
        updateDialogTitle()

}

// Обработчик нажатия кнопки "Добавить в корзину"
addToCartBtn.addEventListener('click', async () => {
    AddToCartItems()
});
// localStorage.clear()



headerButton.addEventListener('click', () => {

    basketDialog.style.visibility = 'visible';

    CorsinItems();
    
});

const footerFaveButton = document.querySelector('.absolute__buttonFave')

footerFaveButton.addEventListener('click', () => {
    CorsinItemsFave()
})

const basketCorsinClose = document.querySelector('.mobileOverlay__button-new')

basketCorsinClose.addEventListener('click', () => {
    let List1Fave = []
    try {
        List1Fave = Object.values(JSON.parse(localStorage.getItem('basketsElemsFave'))) || {}

        List1Fave.forEach(() => {
            const gokDOM = document.querySelector('.mobileFavourites')
            const yFave = gokDOM.querySelector('.mobileCorsin__block')
            const newDialog1Fave = yFave.querySelector('.Basket');
            yFave.removeChild(newDialog1Fave)
        })
    } catch (error) {
        console.log(error)
    }
})


const mobileButtonCorsinDelete = document.querySelector('.mobileCorsin .mobileOverlay__button')

mobileButtonCorsinDelete.addEventListener('click', () => {

    let List1 = []
    try {
        List1 = Object.values(JSON.parse(localStorage.getItem('basketsElems'))) || {}

        basketDialog.style.visibility = 'hidden';

        List1.forEach(() => {
            const y = document.querySelector('.mobileCorsin__block')
            const newDialog1 = y.querySelector('.Basket');
            basketDialogBlock.removeChild(newDialog1)
        })
    } catch (error) {
        console.log(error)
    }

})

function storageItemsFave(indexHul1) {

    const YtFave = JSON.parse(localStorage.getItem('basketsElemsFave'))

    delete YtFave[indexHul1]
    const newObjFave = {}

    let countBasketsDeleteFave = +localStorage.getItem('countBasketsFave')
    countBasketsDeleteFave -= 1
    localStorage.setItem('countBasketsFave', countBasketsDeleteFave)


    for (let i = 0; i < Object.keys(YtFave).length; i++) {
        newObjFave[i] = Object.values(YtFave)[i]
    }   

    if (Object.keys(YtFave).length === 0) {
        localStorage.setItem('basketsElemsFave', '')
        basketsListFave = {}
    } else {
        localStorage.setItem('basketsElemsFave', JSON.stringify(newObjFave))
        basketsListFave = JSON.parse(localStorage.getItem('basketsElemsFave'));
    }
}

// localStorage.clear()
function storageItems(indexHul1) {

    const Yt = JSON.parse(localStorage.getItem('basketsElems'))

    delete Yt[indexHul1]
    const newObj = {}

    let countBasketsDelete = +localStorage.getItem('countBaskets')
    countBasketsDelete -= 1
    localStorage.setItem('countBaskets', countBasketsDelete)

    for (let i = 0; i < Object.keys(Yt).length; i++) {
        newObj[i] = Object.values(Yt)[i]
    }   
    
    if (Object.keys(Yt).length === 0) {
        localStorage.setItem('basketsElems', '')
        basketsList = {}
    } else {
        localStorage.setItem('basketsElems', JSON.stringify(newObj))
        basketsList = JSON.parse(localStorage.getItem('basketsElems'));
    }

    console.log('локал сторег после удаления товара: ', localStorage)
          
}


function CorsinItemsFave() {
    
    let countBasketsIoFave = 20;
    let ygFave = 0

    let ListFave = []
    
    const localV = localStorage.getItem('productRatings')
    if (!localV) {
        let i = 0
    } else {
        const ratingsStorage = JSON.parse(localV)
        for (let productId in ratingsStorage) {
            updateRatingOnAllElements(productId, ratingsStorage[productId]);
        }
    }

    try {

        if (localStorage.getItem('basketsElemsFave') === '') {
            ListFave = []
        } else {
            ListFave = Object.values(JSON.parse(localStorage.getItem('basketsElemsFave'))) || {}
        }

        const queryT = document.querySelector('.mobileFavourites .mobileCorsin__block')

        ListFave.forEach((elem) => {
            const newDialogFave = document.createElement('dialog');
            newDialogFave.classList.add('Basket');
            newDialogFave.innerHTML = elem
            queryT.appendChild(newDialogFave);
        })

        const tagClassFave1 = document.querySelector('.mobileFavourites')
        const tagClassFave = tagClassFave1.getElementsByClassName('Basket')
        console.log(tagClassFave)
        
        const objHul1Fave = {}
        for (let i = 0; i < tagClassFave.length; i++) {
            objHul1Fave[i] = tagClassFave[i]
        }
        ///
        const objHul2Fave = {}
        for (let i = 0; i < ListFave.length; i++) {
            objHul2Fave[i] = ListFave[i]
        }
        for (let k = 0; k < tagClassFave.length; k++) { 
            objHul1Fave[k].style.display = 'block';
            objHul1Fave[k].style.marginTop = countBasketsIoFave + 'px';
            countBasketsIoFave += 200;

            const deleteBtnFave = objHul1Fave[k].querySelector('.Basket__button-delete-fave'); 
            deleteBtnFave.addEventListener('click', () => {

                let nomerF = +localStorage.getItem('nomerFave')
                nomerF -= 1
                localStorage.setItem('nomerFave', nomerF)
    
                const nextElemF = objHul1Fave[k].nextElementSibling; 
                
                const opDlin = JSON.parse(localStorage.getItem('basketsElemsFave'))

                if (k >= Object.keys(JSON.parse(localStorage.getItem('basketsElemsFave'))).length) {
                
                    for (let y = 0; y < Object.keys(opDlin).length; y++) {
                        if (objHul2Fave[k] === opDlin[y]) {
                            ygFave = y
                        }
                    }
                } else if (k < Object.keys(JSON.parse(localStorage.getItem('basketsElemsFave'))).length && k !== 0) {
                    for (let y = 0; y < Object.keys(opDlin).length; y++) {
                        if (objHul2Fave[k] === opDlin[y]) {
                            ygFave = y
                        }
                    }
                } else {
                    ygFave = 0
                }

                storageItemsFave(ygFave)
                tagClassFave[ygFave].remove();
                
                if (nextElemF) {

                    let newCount = parseInt(objHul1Fave[k].style.marginTop);
                    let currentElem = nextElemF;
                    while (currentElem) {
                        currentElem.style.marginTop = newCount + 'px';
                        newCount += 200;
                        currentElem = currentElem.nextElementSibling;
                    }
                }

                const queryTitleDelete = document.querySelector('.absolute__title')
                queryTitleDelete.innerHTML = +queryTitleDelete.innerHTML - 1
                localStorage.setItem('countFave', queryTitleDelete.innerHTML)

            });

            const docBtnFave = objHul1Fave[k].querySelector(`.Basket__button-add-cart`)
            docBtnFave.addEventListener('click', () => {
                const elemFave = objHul1Fave[k]

                const elemPrice = objHul1Fave[k].querySelector('.Basket__price').innerText;
                    
                //здесь добавление товара из избранного в корзину!

                let newDialog = document.createElement('dialog');
                newDialog.classList.add('Basket');
                newDialog.innerHTML = `
                            <nav class="Basket__block">
                            <img src="" alt="" class="Basket__image"> 
                            <div class="Basket__titles">
                                <div class="Basket__top">
                                    <div class="Basket__top-item">
                                        <h1 class="Basket__title">Название</h1>
                                        <nav class="Basket__mini-block-titles">
                                            <h2 class="Basket__price">4900 rub.</h2>
                                            <h3 class="Basket__rating star">4.8</h3>
                                        </nav>
                                        <h1 class="Basket__size">Size: S</h1>
                                    </div> 
                                    <div class="Basket__top-item">
                                        <details class="mobileCart__details">
                                        <summary class="mobileCart__summary">
                                            <h2 class="mobileCart__summary-title">Read more</h2>
                                            <span class="mobileCart__open-window"></span>
                                        </summary>
                                        <div class="mobileCart__sub-title">
                                            <p>
                                                This stylish men's winter jacket is a combination of elegance and practicality. It is made in classic black color, which makes it versatile for any wardrobe. The model is an elongated parka with a voluminous hood trimmed with fluffy faux fur, which not only adds sophistication, but also perfectly protects from the cold.
                                            </p>
                                        </div>
                                        </details> 
                                    </div> 
                                </div>
                                <div class="Basket__bottom">
                                    <button class="Basket__button-buy button" type="button">
                                        Buy
                                    </button>
                                    <form class="Basket__form-button">
                                        <button class="Basket__button-delete button" type="button">
                                            Delete
                                        </button>
                                    </form>
                                </div>
                            </div>
                            </nav>
                `;
                newDialog.querySelector('.Basket__title').textContent = elemFave.querySelector('.Basket__title').innerHTML;
                newDialog.querySelector('.Basket__price').textContent = elemFave.querySelector('.Basket__price').innerHTML;
                newDialog.querySelector('.Basket__rating').textContent = elemFave.querySelector('.Basket__rating').innerHTML;
                newDialog.querySelector('.Basket__image').src = elemFave.querySelector('.Basket__image').src;
                newDialog.querySelector('.Basket__size').textContent = elemFave.querySelector('.Basket__size').textContent;
                //правильный дата атрибут
                const docElem = newDialog.querySelector('.Basket__block')

                if (!localStorage.getItem('nomer')) {
                    nomer += 1
                    localStorage.setItem('nomer', nomer)
                    docElem.dataset.nomer = nomer
                } else {
                    let localNomer = +localStorage.getItem('nomer')
                    localNomer += 1
                    localStorage.setItem('nomer', localNomer)
                    docElem.dataset.nomer = localNomer
                }
                //вставка элемента в корзину
                let localBasketsElems = localStorage.getItem('basketsElems')
                if (!localBasketsElems) {
                    const newObjFave = {}
                    newObjFave[0] = newDialog.innerHTML   
                    console.log('OBJFAVE ----->>>>> ', newObjFave)  
                    basketsList = newObjFave
                    localStorage.setItem('basketsElems', JSON.stringify(newObjFave))
                } else {
                    localBasketsElems = JSON.parse(localStorage.getItem('basketsElems'))
                    const attrElemFave = +docElem.dataset.nomer - 1
                    localBasketsElems[attrElemFave] = newDialog.innerHTML

                    basketsList = localBasketsElems
                    localStorage.setItem('basketsElems', JSON.stringify(localBasketsElems))
                    console.log(localStorage)
                } 

                updatePriceAndNumberProducts(true, elemPrice);
                updateCorsinSpan(true);
                updateDialogTitle();

                let getBasketsCount = +localStorage.getItem('countBaskets')
                getBasketsCount += 1
                localStorage.setItem('countBaskets', getBasketsCount)
                
        }
    )}
    } catch (error) {
        console.log(error)
    }        
}

// localStorage.clear()
function CorsinItems() {
    
    let countBasketsIo = 20;
    let yg = 0

    isProcessing = false
    let List = []

    const localV = localStorage.getItem('productRatings')
    if (!localV) {
        let i = 0
    } else {
        const ratingsStorage = JSON.parse(localV)
        for (let productId in ratingsStorage) {
            updateRatingOnAllElements(productId, ratingsStorage[productId]);
        }
    }

    try {

        if (localStorage.getItem('basketsElems') === '') {
            List = []
        } else {
            List = Object.values(JSON.parse(localStorage.getItem('basketsElems'))) || {}
            console.log('Итоговая корзина товаров: ', List)
        }
    

        List.forEach((elem) => {
            const newDialog1 = document.createElement('dialog');
            newDialog1.classList.add('Basket');
            newDialog1.innerHTML = elem
            basketDialogBlock.appendChild(newDialog1);
        })

        const tagClassParent = document.querySelector('.mobileCorsin')
        const tagClass = tagClassParent.getElementsByClassName('Basket')
        console.log(tagClass)
        
        const objHul1 = {}
        for (let i = 0; i < tagClass.length; i++) {
            objHul1[i] = tagClass[i]
        }
        ///
        const objHul2 = {}
        for (let i = 0; i < List.length; i++) {
            objHul2[i] = List[i]
        }
        for (let k = 0; k < tagClass.length; k++) { 
            objHul1[k].style.display = 'block';
            objHul1[k].style.marginTop = countBasketsIo + 'px';
            countBasketsIo += 200;

            const deleteBtn = objHul1[k].querySelector('.Basket__button-delete'); 
            deleteBtn.addEventListener('click', () => {

                let nomerT = +localStorage.getItem('nomer')
                nomerT -= 1
                localStorage.setItem('nomer', nomerT)
    
                const nextElem = objHul1[k].nextElementSibling; 
                const elemPrice = objHul1[k].querySelector('.Basket__price').innerText;
                
                const opDlin = JSON.parse(localStorage.getItem('basketsElems'))

                if (k >= Object.keys(JSON.parse(localStorage.getItem('basketsElems'))).length) {
                
                    for (let y = 0; y < Object.keys(opDlin).length; y++) {
                        if (objHul2[k] === opDlin[y]) {
                            yg = y
                        }
                    }
                } else if (k < Object.keys(JSON.parse(localStorage.getItem('basketsElems'))).length && k !== 0) {
                    for (let y = 0; y < Object.keys(opDlin).length; y++) {
                        if (objHul2[k] === opDlin[y]) {
                            yg = y
                        }
                    }
                } else {
                    yg = 0
                }

                storageItems(yg)
                tagClass[yg].remove();
                
                if (nextElem) {

                    let newCount = parseInt(objHul1[k].style.marginTop);
                    let currentElem = nextElem;
                    while (currentElem) {
                        currentElem.style.marginTop = newCount + 'px';
                        newCount += 200;
                        currentElem = currentElem.nextElementSibling;
                    }
                } 

                updatePriceAndNumberProducts(false, elemPrice);
                updateCorsinSpan(false);
                updateDialogTitle();
  

            });
            const buyBtn = objHul1[k].querySelector('.Basket__button-buy'); 
            buyBtn.addEventListener('click', async () => {

                setTimeout(() => {
                    alert('заказ оформлен!')
                }, 2000)

                let nomerT = +localStorage.getItem('nomer')
                nomerT -= 1
                localStorage.setItem('nomer', nomerT)
                
                const basketItems = []; // Массив для хранения данных о товарах
                const title = objHul1[yg].querySelector('.Basket__title').textContent;
                const price = parseFloat(objHul1[yg].querySelector('.Basket__price').textContent);
                const size = objHul1[yg].querySelector('.Basket__size')?.textContent || '';
                basketItems.push({ title, price, size });

        
                const nextElem = objHul1[k].nextElementSibling; 
                const elemPrice = objHul1[k].querySelector('.Basket__price').innerText;

                const opDlin1 = JSON.parse(localStorage.getItem('basketsElems'))

                if (k >= Object.keys(JSON.parse(localStorage.getItem('basketsElems'))).length) {
                    for (let y = 0; y < Object.keys(opDlin1).length; y++) {
                        if (objHul2[k] === opDlin1[y]) {
                            yg = y
                        }
                    }
                } else if (k < Object.keys(JSON.parse(localStorage.getItem('basketsElems'))).length && k !== 0) {
                    for (let y = 0; y < Object.keys(opDlin1).length; y++) {
                        if (objHul2[k] === opDlin1[y]) {
                            yg = y
                        }
                    }
                } else {
                    yg = 0
                }

                storageItems(yg)
                tagClass[yg].remove();
                
                if (nextElem) {
                    let newCount = parseInt(objHul1[k].style.marginTop);
                    let currentElem = nextElem;
                    while (currentElem) {
                        currentElem.style.marginTop = newCount + 'px';
                        newCount += 200;
                        currentElem = currentElem.nextElementSibling;
                    }
                }
                
                updatePriceAndNumberProducts(false, elemPrice);
                updateCorsinSpan(false);
                updateDialogTitle();


                await sendToDatabase(basketItems);

               
            });
            const basketDeleteAll = basketDialog.querySelector('.Basket__enter-button-delete');
            basketDeleteAll.addEventListener('click', () => {

                Object.values(objHul1).forEach((elem1) => {
                    elem1.remove();      
                });

                localStorage.setItem('basketsElems', '')
                localStorage.setItem('countBaskets', 0)
                localStorage.setItem('nomer', 0)
                basketsList = {}

                updateDialogTitle();
                updatePriceAndNumberProducts(null, '');
                updateCorsinSpan(null);

            });
            const basketBuyAll = basketDialog.querySelector('.Basket__enter-button-buy');
            basketBuyAll.addEventListener('click', async () => {

                try {
                    const basketData1 = collectBasketData();

                    if (basketData1.length === 0) {

                        return;
                    } else {
                        Object.values(objHul1).forEach((elem2) => {
                            elem2.remove();      
                        });

                        localStorage.setItem('basketsElems', '')
                        localStorage.setItem('countBaskets', 0)
                        localStorage.setItem('nomer', 0)
                        basketsList = {}
                    }

                    updateDialogTitle();
                    updatePriceAndNumberProducts(null, '');
                    updateCorsinSpan(null);

                    await sendToDatabase(basketData1);
                    
                } catch (error) {
                    console.error('Произошла ошибка:', error);
                }

            
            });
        }
        
    } catch (error) {
        console.log(error)
    }        
}

//Отправляем данные на database.js

async function sendToDatabase(data) {
  try {
    const response = await fetch('http://localhost:4000/api/cart', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ items: data }),
    });

    const result = await response.json();
    
    return result

    } catch (error) {
        console.error('Ошибка при отправке данных:', error);
        throw error;
    }
}

// Функция сбора данных из корзины (Для кнопки Buy All) (Все данные)
function collectBasketData() {
    const basketItems = [];
    const items = document.querySelectorAll('.Basket');
    
    items.forEach(item => {
        const title = item.querySelector('.Basket__title').textContent;
        const price = parseFloat(item.querySelector('.Basket__price').textContent);
        const size = item.querySelector('.Basket__size').textContent;
        
        basketItems.push({
            title,
            price,
            size
        });
    });
    
    return basketItems;
}

});

} catch (error) {
    console.log(error)
}

try {

function SortAZ(name, cont) {
    // Анимация появления фоток
    name.forEach((item) => {
        cont.appendChild(item);
        
        const delay = 100; 
        
        setTimeout(() => {
            let currentOpacity = 0;
            const interval = setInterval(() => {
                currentOpacity += 0.1; // увеличиваем на 10%
                item.style.opacity = currentOpacity;

                setTimeout(() => {
                    clearInterval(interval)
                }, 1000)
            }, 20); 
        }, delay);
        
    });
}


// Filter логика
function sortContainer(container, direction) {
    const items = container.querySelectorAll('.cart-object');

    items.forEach(item => {
        item.style.opacity = 0; // Скрываем элемент
    });
    
    if (direction === 'A-Z' || direction === 'Z-A') {
        const sortedItems = Array.from(items).sort((a, b) => {
        const firstLetterA = a.getAttribute("data-name").toLowerCase().charAt(0);
        const firstLetterB = b.getAttribute("data-name").toLowerCase().charAt(0);
        
        if (direction === 'A-Z') {
            if (firstLetterA < firstLetterB) {
                return -1;
            }
            if (firstLetterA > firstLetterB) {
                return 1;
            }
        } else if (direction === 'Z-A') {
            if (firstLetterA > firstLetterB) {
                return -1;
            }
            if (firstLetterA < firstLetterB) {
                return 1;
            }
        }
        return 0;
    });
    
    SortAZ(sortedItems, container)

    } else if (direction === 'By price') {
            const sortedItemsPrice = Array.from(items).sort((a, b) => {
            const firstPrice = a.getAttribute("data-price");
            const secondPrice = b.getAttribute("data-price");
            
            if (Number(firstPrice) > Number(secondPrice)) {
                return 1;
            }
            if (Number(firstPrice) < Number(secondPrice)) {
                return -1;
            }

            return 0;
        });

        SortAZ(sortedItemsPrice, container)
    } else {
        const sortedItemsPrice1 = Array.from(items).sort((a, b) => {
            const firstPrice = a.getAttribute("data-review");
            const secondPrice = b.getAttribute("data-review");
            
            if (Number(firstPrice) > Number(secondPrice)) {
                return 1;
            }
            if (Number(firstPrice) < Number(secondPrice)) {
                return -1;
            }

            return 0;
        });

        SortAZ(sortedItemsPrice1, container)
    }
    
}

// Функция для обработки всех контейнеров сортировки
function sortBlocks(selectElement) {
    const sortType = selectElement.value;
    
    // Получаем все контейнеры для сортировки
    const containers = document.querySelectorAll('.cart__block'); 
    
    containers.forEach(container => {
        if (sortType === 'A-Z') {
            sortContainer(container, 'A-Z');
        }
        if (sortType === 'Z-A') {
            sortContainer(container, 'Z-A');
        } else if (sortType === 'By price' || sortType === 'Reviews') {
            sortContainer(container, sortType);
        } else {
            // Возвращаем исходный порядок
            const items = container.querySelectorAll('.cart-object');
            items.forEach(item => container.appendChild(item));
        }
    });
}


//Доп функционал к сайту
//светлая темная и тд темы


document.addEventListener('DOMContentLoaded', () => {
    const select = document.getElementById('theme-selector');
    const body = document.body;
    
    // Функция для применения темы
    function applyTheme(theme) {
        // Удаляем все классы тем
        ['black', 'green', 'blue', 'white'].forEach(className => {
            body.classList.remove(`theme-${className}`);
        });
        
        // Добавляем выбранный класс
        body.classList.add(`theme-${theme}`);
    }
    
    // Обработчик изменения select
    select.addEventListener('change', () => {
        const selectedTheme = select.value;
        applyTheme(selectedTheme);
        
        // Сохраняем выбор в localStorage
        localStorage.setItem('selectedTheme', selectedTheme);

    });
    
    // При загрузке проверяем сохраненную тему
    const savedTheme = localStorage.getItem('selectedTheme');
    if (savedTheme) {
        applyTheme(savedTheme);
    }
});


//средний рейтинг товаров на сайте и высчитывание самого рейтинга

try {
    const slider = document.querySelector('.mobileReviews__input');
    const valueSpan = document.querySelector('.mobileReviews__span');

// Инициализируем отображение текущего значения
valueSpan.textContent = slider.value

// Обработчик изменения значения ползунка
slider.addEventListener('input', function() {
    if (this.value.length === 1) {
        valueSpan.textContent = this.value + '.0'; 
    } else {
        valueSpan.textContent = this.value; // Обновляем текст в span
    }

});

function SendReviews() {
    setTimeout(() => {
        alert('Отзыв успешно отправлен!')
    }, 1000)

    const query = document.querySelector('.mobileCart__rating')
    query.innerHTML = valueSpan.textContent
    
}
} catch (error) {
    console.log(error)
}

// localStorage.clear()
//логика сохранения рейтинга везде где надо!

let ratingsStorage = JSON.parse(localStorage.getItem('productRatings')) || {};
let totalRatings = JSON.parse(localStorage.getItem('totalRatings')) || {
    count: 32,
    sum: 145.9
};

// Функция для сохранения общего рейтинга
function saveTotalRating() {
    localStorage.setItem('totalRatings', JSON.stringify(totalRatings));
}

// Функция для расчета среднего рейтинга
function calculateAverageRating() {
    return totalRatings.sum / totalRatings.count;
}


// Функция сохранения и обновления рейтинга
function saveRating(productId, newRating) {
    ratingsStorage[productId] = newRating;
    localStorage.setItem('productRatings', JSON.stringify(ratingsStorage));
}

// localStorage.clear()
// Функция обновления отображения рейтинга
function updateRatingOnAllElements(productId, rating) {

  // Обновляем в диалоге
    const dialog = document.querySelector(`.cart-object[data-id="${productId}"]`);
    if (dialog) {
        dialog.querySelector('.cart-object__rating').textContent = rating;
        dialog.dataset.review = rating

        const queryTitle= dialog.querySelector('.cart-object__title')
        let corsinItems = []
        if (!localStorage.getItem('basketsElems')) {
            corsinItems = []
        } else {
            corsinItems = Object.values(JSON.parse(localStorage.getItem('basketsElems')))
        }

        for (let i = 0; i < corsinItems.length; i++) {
            const newDialog1 = document.createElement('dialog');
            newDialog1.classList.add('Basket');
            newDialog1.innerHTML = corsinItems[i]

            if (queryTitle.textContent === newDialog1.querySelector('.Basket__title').textContent) {
                const queryRating = newDialog1.querySelector('.Basket__rating')
                queryRating.textContent = rating

                const objBasketsKey = JSON.parse(localStorage.getItem('basketsElems'))
                objBasketsKey[i] = newDialog1.innerHTML
                localStorage.setItem('basketsElems', JSON.stringify(objBasketsKey)) 
            }  
        }

        let corsinItems1 = []
        if (!localStorage.getItem('basketsElemsFave')) {
            corsinItems1 = []
        } else {
            corsinItems1 = Object.values(JSON.parse(localStorage.getItem('basketsElemsFave')))
        }
   
        for (let i = 0; i < corsinItems1.length; i++) {
            const newDialog2 = document.createElement('dialog');
            newDialog2.classList.add('Basket');
            newDialog2.innerHTML = corsinItems1[i]

            if (queryTitle.textContent === newDialog2.querySelector('.Basket__title').textContent) {
                const queryRating1 = newDialog2.querySelector('.Basket__rating')
                queryRating1.textContent = rating

                const objBasketsKey1 = JSON.parse(localStorage.getItem('basketsElemsFave'))
                objBasketsKey1[i] = newDialog2.innerHTML
                localStorage.setItem('basketsElemsFave', JSON.stringify(objBasketsKey1))
            }
        }
    }

    //обновляем средний рейтинг
    const avgRatingElement = document.querySelector('.header__title-sr-znach');
    if (avgRatingElement) {
        avgRatingElement.textContent = calculateAverageRating().toFixed(2);
    }
}

// Обработчик кнопки отправки
document.querySelector('.mobileReviews__submit-button')?.addEventListener('click', () => {
    const productId = bannerT.dataset.id;
    const newRating = document.querySelector('.mobileReviews__span').innerHTML;
    
    updateProductRating(productId, newRating);

});

// Функция для обновления рейтинга
function updateProductRating(productId, newRating) {
    // Обновляем локальное хранилище
    ratingsStorage[productId] = newRating;
    localStorage.setItem('productRatings', JSON.stringify(ratingsStorage));
    
    // Обновляем общий рейтинг
    if (ratingsStorage[productId] !== undefined) {
        // Вычитаем старый рейтинг
        totalRatings.sum -= +(bannerT.querySelector(`.cart-object[data-id="${productId}"] .cart-object__rating`).textContent);
        totalRatings.sum += +newRating
    }

    // Обновляем отображение
    updateRatingOnAllElements(productId, newRating);

    // Сохраняем новый рейтинг
    saveRating(productId, newRating);
    //сохранение рейтинга общего
    saveTotalRating()
}

// Функция загрузки сохраненных рейтингов при загрузке страницы
// localStorage.clear()
updateRatingOnAllElements();
window.addEventListener('load', () => {
    
    const DeleteDOM = document.querySelector('.mobileFavourites .Basket')
    DeleteDOM.remove()

    for (let productId in ratingsStorage) {
        updateRatingOnAllElements(productId, ratingsStorage[productId]);
    }
});

console.log(localStorage)
} catch (error) {
    console.log(error)
}