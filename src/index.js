document.addEventListener("DOMContentLoaded", () => {
    const beerList = document.getElementById("beer-list");
    const beerName = document.getElementById("beer-name");
    const beerImage = document.querySelector("img");
    const beerDescription = document.getElementById("beer-description");
    const editDescriptionForm = document.getElementById("description-form");
    const customerReviews = document.getElementById("review-list");
    const reviewForm = document.getElementById("review-form")

    fetch("http://localhost:3000/beers")
    .then(response => response.json())
    .then(beerData => {
        beerList.innerHTML = ''
        beerName.innerText = beerData[0].name
        beerImage.setAttribute("src", beerData[0].image_url)
        beerDescription.innerText = beerData[0].description
        beerData.forEach(item => {
            createDOM(item)
        })
    })

    function createDOM(beerDataItem) {
        let beer = document.createElement("li")
        beer.addEventListener("click", function() {
            displayBeerInfo(beerDataItem)
        })
        beer.innerText = beerDataItem.name
        beerList.appendChild(beer)

    }

    

    function displayBeerInfo(beer) {
        beerName.innerText = beer.name
        beerImage.setAttribute("src", beer.image_url)
        beerDescription.innerText = beer.description
    }
})
