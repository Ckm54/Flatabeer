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
        const id = beer.id

        console.log(beer.reviews)

        customerReviews.innerHTML = ''
        beer.reviews.forEach(item => {
            let review = document.createElement("li")
            review.innerText = item
            customerReviews.append(review)
        })

        reviewForm.addEventListener("submit", function(e) {
            e.preventDefault()
            submitReview(beer, id)
        })
    }
})

function submitReview(beer) {
    const entry = document.getElementById("review").value
    const id = beer.id
    console.log(id)
    let data = {
        reviews: [...(beer.reviews), entry]
    }
    fetch(`http://localhost:3000/beers/${id}`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => console.log(data))
    
}
