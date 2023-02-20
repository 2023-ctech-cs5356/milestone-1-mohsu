const baseUrl = window.location.href.replace("index.html", "");
let currentItem = 0;
let tableRows = null;
let totalItems = 0;
let data = null;
const table = document.getElementById("product-table");
const previousButton = document.getElementById('previous-button');
const nextButton = document.getElementById('next-button');

window.onload = async () => {
    data = await promiseOfProducts;

    const tableBody = document.createElement("div");
    data.forEach((item, index) => {
        if (!item.active) {
            return;
        }
        totalItems++;
        const row = document.createElement("div");
        row.classList.add("columns");

        // image cell
        const figureCell = document.createElement("div");
        figureCell.classList.add("column", "is-6");
        const img = document.createElement("img");
        img.src = item.imageUrl;
        figureCell.appendChild(img);
        row.appendChild(figureCell);

        // info cell
        const infoCell = document.createElement("div");
        infoCell.classList.add("column", "is-6");
        const infoDiv = document.createElement("div");
        infoDiv.classList.add("content");
        // info cell - title
        const title = document.createElement("h1");
        title.textContent = item.title.replace("dog", "cat");
        infoDiv.appendChild(title);
        // info cell - description
        const description = document.createElement("p");
        description.textContent = item.description;
        infoDiv.appendChild(description);
        //info cell - features
        const featuresDiv = document.createElement("div");
        const featuresUl = document.createElement("ul");
        featuresUl.classList.add("has-bullets");
        item.highlighted_features.forEach((f) => {
            const featureli = document.createElement("li");
            featureli.textContent = f.replace("dog", "cat");
            featuresUl.appendChild(featureli);
        })
        featuresDiv.appendChild(featuresUl)
        infoDiv.appendChild(featuresDiv);

        // info cell - price
        const price = document.createElement("p");
        price.classList.add("py-3");
        price.textContent = "Price: $" + item.price;
        infoDiv.appendChild(price);

        infoCell.appendChild(infoDiv);
        row.appendChild(infoCell);

        //append row
        row.classList.add("table-row");
        if (index != 0) {
            row.classList.add("is-hidden")
        }
        tableBody.appendChild(row);
    });

    table.appendChild(tableBody);
    tableRows = tableBody.querySelectorAll(".table-row");
};

previousButton.addEventListener("click", () => {
    tableRows[currentItem].classList.add("is-hidden");
    currentItem--;
    if (currentItem < 0) {
        currentItem += totalItems;
    }
    tableRows[currentItem].classList.remove("is-hidden");
})

nextButton.addEventListener("click", () => {
    tableRows[currentItem].classList.add("is-hidden");
    currentItem++;
    if (currentItem >= totalItems) {
        currentItem -= totalItems;
    }
    tableRows[currentItem].classList.remove("is-hidden");
})

const buyButton = document.getElementById("buy-button");
buyButton.addEventListener("click", () => {
    window.location = data[currentItem].paymentLink;
})

const promiseOfProducts = fetch(baseUrl + "data/products.json")
    .then((response) => {
        return response.json()
    })
    .then((data) => {
        return data;
    })
    .catch((error) => {
        console.log(error);
    })