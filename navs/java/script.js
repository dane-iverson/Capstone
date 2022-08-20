let cart = [];
let totale = 0;

function Car(name, price) {
    this.name = name;
    this.price = price;
}
// total

function load() {
    let table = document.getElementById('table');
    //let tbody = document.createElement('tbody');

    table.innerText = '';

    //let head = document.createElement('th')
    let headRow = document.createElement('tr')

    let headName = document.createElement('th')
    headName.innerHTML = 'Name';

    let headPrice = document.createElement('th')
    headPrice.innerHTML = 'Price';

    let headDelete = document.createElement('th')
    headDelete.innerHTML = 'Delete';

    headRow.appendChild(headName);
    headRow.appendChild(headPrice);
    headRow.appendChild(headDelete);

    table.appendChild(headRow);

    if (sessionStorage.getItem("hasCodeRunBefore") === null) {
        sessionStorage.setItem("cart", JSON.stringify(cart));
        sessionStorage.setItem('total', JSON.stringify(totale));
        sessionStorage.setItem("hasCodeRunBefore", true);
    } else {
        cart = JSON.parse(sessionStorage.getItem('cart'));
        cart.forEach(function (a, b) {
            let row = document.createElement('tr');

            let carName = document.createElement('td');
            carName.id = b;

            let carPrice = document.createElement('td');
            carPrice.id = b;

            let deleteRow = document.createElement('td');
            let deleteBtn = document.createElement('button');

            carName.innerHTML = a.name;

            carPrice.innerHTML = a.price;

            deleteRow.id = b

            row.id = b

            carName.id = 'name' + b;
            carPrice.id = 'price' + b;

            deleteBtn.innerHTML = 'delete';
            deleteBtn.type = 'button';

            deleteBtn.addEventListener('click', function (e) {
                let arrIndex = Number(e.target.parentElement.id);
                console.log(arrIndex)
                console.log(cart[arrIndex]);
                //splice method array to remove the item in the array (index (from where), how many)
                cart.splice(arrIndex, 1);
                //update sessionStorage
                sessionStorage.setItem('cart', JSON.stringify(cart));
                // rerun load()

                load()
                updateTotal()
            });

            deleteRow.appendChild(deleteBtn);

            row.appendChild(carName);
            row.appendChild(carPrice);

            row.appendChild(deleteRow);
            table.appendChild(row);



        });
        // table.style.visibility = 'visible';
    };
};


let buttons = document.getElementsByClassName('button')

function addToCart(i) {
    cart = JSON.parse(sessionStorage.getItem('cart'));

    let newCar = new Car(
        document.getElementById('name' + i).innerHTML,
        parseInt(document.getElementById('price' + i).innerHTML)
    );

    cart.push(newCar);
    console.log(cart);
    sessionStorage.setItem('cart', JSON.stringify(cart));


    total();
    load();
};


//calculate total function w/ alert
function total() {
    cart = JSON.parse(sessionStorage.getItem('cart'));
    totale = JSON.parse(sessionStorage.getItem('total'));

    cart.forEach(function (a, b) {
        let price = a.price;

        //current VAT in south africa is 15%
        totale = totale + ((115 / 100) * price);
    });

    alert('Your total is: R' + totale.toFixed(2));

    sessionStorage.setItem('total', JSON.stringify(totale));
}



// function to update the cart total on the cart webpage
function updateTotal() {
    let badge = document.getElementById('totalOut')
    totale = Number(JSON.parse(sessionStorage.getItem('total')));
    cart = JSON.parse(sessionStorage.getItem('cart'));
    totale = 0;

    if (cart === null) {
        badge.innerHTML = 'R'
    } else {
        cart.forEach(function (a, b) {
            let price = a.price;

            totale = totale + ((115 / 100) * price);
        });
        badge.innerHTML = 'R ' + totale.toFixed(2);
    }
    console.log(typeof totale)
    // submit1.setAttribute('style', 'onclick:submit();')



    sessionStorage.setItem('total', JSON.stringify(totale));
}

let deliverybutton = document.getElementById('deliveryButton')

deliverybutton.addEventListener('click', function (e) {
    // function check(e) 
    e.preventDefault();
    // console.log(document.forms[0]);
    if (document.getElementById("collect").checked) {
        alert('Please click the submit button.')
        document.getElementById('submit2').removeAttribute('hidden');
        //do collect code
    } else if (document.getElementById('deliver').checked) {
        document.getElementById('form2').removeAttribute('hidden')
        document.getElementById('deliveryButton').setAttribute('style', 'visibility:hidden;')
    } else {
        alert("Select a delivery option");
    };
});

let submit1 = document.getElementById('submit1');

submit1.addEventListener('click', function () {
    cart = JSON.parse(sessionStorage.getItem('cart'));
    totale = JSON.parse(sessionStorage.getItem('total'));
    if (document.getElementById('shipping2').checked) {
        alert('Your total due is: R' + (totale + 180000));
    } else {
        alert('Your total due is: R' + (totale + 60000));
    };


    totale = 0;
    cart = [];

    sessionStorage.setItem('cart', JSON.stringify(cart));
    sessionStorage.setItem('total', JSON.stringify(totale));

    updateTotal();
    load()
});

let submit2 = document.getElementById('submit2');

submit2.addEventListener('click', function () {
    totale = JSON.parse(sessionStorage.getItem('total'));
    cart = JSON.parse(sessionStorage.getItem(cart))




    alert('Your Total due is: R' + totale);

    cart = [];
    totale = 0;

    sessionStorage.setItem('cart', JSON.stringify(cart));
    sessionStorage.setItem('total', JSON.stringify(totale));

    updateTotal();
    load()

})