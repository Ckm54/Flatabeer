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
        customerReviews.innerHTML = ''
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

    function fetchBeer(id) {
        if(typeof(id) !== 'number') id = parseInt(id)
        fetch(`http://localhost:3000/beers/${id}`)
        .then(response => response.json())
        .then(beer => {
            displayBeerInfo(beer)
        })
    }

    fetchBeer(1)

    function displayBeerInfo(beer) {
        beerName.innerText = beer.name
        beerImage.setAttribute("src", beer.image_url)
        beerDescription.innerText = beer.description

        console.log(beer.reviews)

        beer.reviews.forEach(item => {
            let review = document.createElement("li")
            review.innerText = item
            customerReviews.append(review)
        })
    }
})
