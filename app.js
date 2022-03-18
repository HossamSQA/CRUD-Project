/* variables */
let title = document.querySelector("#title");
let price = document.querySelector("#price");
let taxes = document.querySelector("#taxes");
let ads = document.querySelector("#ads");
let discount = document.querySelector("#discount");
let total = document.querySelector("#total");
let count = document.querySelector("#count");
let category = document.querySelector("#category");
let search = document.querySelector("#search");
let submit = document.querySelector("#add");
let deleteItem = document.querySelector("#delete");
let deleteAll = document.querySelector("#delete-all");
let mood = "Create";
let temp;
//let seacrTitle = document.querySelector("#searchTitle");
//let seacrCategory = document.querySelector("#searchCategory");

/* Get Total */
function getTotal() {
    if (price.value != "") {
        let result = (+price.value + +taxes.value + +ads.value) - (+discount.value);
        total.setAttribute("value", result);
    } else {
        total.setAttribute("value", "");
    }
}

/* Create Product and save it to local storage */
let dataProduct;

if (localStorage.product != null) {
    dataProduct = JSON.parse(localStorage.product)
} else {
    dataProduct = [];
}

submit.addEventListener("click", () => {
    let newProduct = {
        title: title.value.toLowerCase(),
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        total: total.value,
        count: count.value,
        category: category.value.toLowerCase()
    };

    if (title.value != "") {
        if (mood === "create") {
            if (newProduct.count > 1) {
                for (let i = 0; i < newProduct.count; i++) {
                    dataProduct.push(newProduct);
                }
            } else {
                dataProduct.push(newProduct);
            }
        } else {
            dataProduct[temp] = newProduct;
            mood = "create";
            submit.innerHTML = "Add Product";
            count.style.display = "block";
        }
    } else {
        clearData();
    }

    localStorage.setItem("product", JSON.stringify(dataProduct));
    clearData();
    showData();
})

/* clear Inputs */
function clearData() {
    title.value = "";
    price.value = "";
    taxes.value = "";
    ads.value = "";
    discount.value = "";
    total.value = "";
    count.value = "";
    category.value = "";
}

/* Show Data */
function showData() {

    getTotal();
    let table = "";
    for (let i = 0; i < dataProduct.length; i++) {
        table += `<tr>
        <th scope="row">${i+1}</th>
        <td>${dataProduct[i].title}</td>
        <td>${dataProduct[i].price}</td>
        <td>${dataProduct[i].taxes}</td>
        <td>${dataProduct[i].ads}</td>
        <td>${dataProduct[i].discount}</td>
        <td>${dataProduct[i].total}</td>
        <td>${dataProduct[i].category}</td>
        <td>
            <button onclick="updateData(${i})" type="button" class="btn btn-primary rounded-pill text-center mx-auto" id="update">Update</button>
        </td>
        <td>
            <button onclick="deleteData(${i})" type="button" class="btn btn-danger rounded-pill text-center mx-auto" id="delete">Delete</button>
        </td>
    </tr>`
    };

    document.querySelector("#tbody").innerHTML = table;

    if (dataProduct.length > 0) {
        deleteAll.removeAttribute("class", "d-none")
        deleteAll.className = "btn btn-danger rounded w-25"
    } else {
        deleteAll.setAttribute("class", "d-none")
    }
}

showData();

/* Delete Data */
function deleteData(i) {
    dataProduct.splice(i, 1);
    localStorage.product = JSON.stringify(dataProduct);
    showData();
};

/* Delete All Products */
function deleteAllProduct() {
    localStorage.clear();
    dataProduct.splice(0);
    showData();
}

/* Update Products */
function updateData(i) {
    title.value = dataProduct[i].title;
    price.value = dataProduct[i].price;
    taxes.value = dataProduct[i].taxes;
    ads.value = dataProduct[i].ads;
    discount.value = dataProduct[i].discount;
    getTotal();
    count.style.display = "none"
    category.value = dataProduct[i].category;
    submit.innerHTML = "Update Product"
    mood = "update";
    temp = i;
    scroll({
        top: 0,
        behavior: "smooth",
    })
}

/* Search */
let searchMood = "title";

function getSearchMood() {
    if (id = "searchTitle") {
        searchMood = "title";

    } else {
        searchMood = "category";
        search.placeholder = "Serching By Category"
    }
    search.placeholder = "Serching By " + search
    search.focus();
    search.value = "";
    showData();
}

function searchData(value) {
    let table = "";
    for (let i = 0; i < dataProduct.length; i++) {
        if (searchMood == "title") {

            if (dataProduct[i].title.includes(value)) {
                table += `<tr>
                    <th scope="row">${i}</th>
                    <td>${dataProduct[i].title}</td>
                    <td>${dataProduct[i].price}</td>
                    <td>${dataProduct[i].taxes}</td>
                    <td>${dataProduct[i].ads}</td>
                    <td>${dataProduct[i].discount}</td>
                    <td>${dataProduct[i].total}</td>
                    <td>${dataProduct[i].category}</td>
                    <td>
                        <button onclick="updateData(${i})" type="button" class="btn btn-primary rounded-pill text-center mx-auto" id="update">Update</button>
                    </td>
                    <td>
                        <button onclick="deleteData(${i})" type="button" class="btn btn-danger rounded-pill text-center mx-auto" id="delete">Delete</button>
                    </td>
                    </tr>`

            }
        } else {
            if (dataProduct[i].category.includes(value)) {
                table += `<tr>
                    <th scope="row">${i}</th>
                    <td>${dataProduct[i].title}</td>
                    <td>${dataProduct[i].price}</td>
                    <td>${dataProduct[i].taxes}</td>
                    <td>${dataProduct[i].ads}</td>
                    <td>${dataProduct[i].discount}</td>
                    <td>${dataProduct[i].total}</td>
                    <td>${dataProduct[i].category}</td>
                    <td>
                        <button onclick="updateData(${i})" type="button" class="btn btn-primary rounded-pill text-center mx-auto" id="update">Update</button>
                    </td>
                    <td>
                        <button onclick="deleteData(${i})" type="button" class="btn btn-danger rounded-pill text-center mx-auto" id="delete">Delete</button>
                    </td>
                    </tr>`
            }
        }

    }

    document.querySelector("#tbody").innerHTML = table;

}