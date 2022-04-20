document.addEventListener("DOMContentLoaded", () => {
    const beerList = document.getElementById("beer-list");
    const beerName = document.getElementById("beer-name");
    const beerImage = document.querySelector("img");
    const beerDescription = document.getElementById("beer-description");
    const editDescriptionForm = document.getElementById("description-form");
    const customerReviews = document.getElementById("review-list");

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

    // function fetchBeer(id) {
    //     if(typeof(id) !== 'number') id = parseInt(id)
    //     fetch(`http://localhost:3000/beers/${id}`)
    //     .then(response => response.json())
    //     .then(beer => {
    //         displayBeerInfo(beer)
    //     })
    // }

    function displayReviews(beer) {
        beer.reviews.forEach(item => {
            let review = document.createElement("li")
            review.innerText = item
            customerReviews.append(review)
            review.addEventListener("click", function(){
                review.remove()
            })
        })
    }

    

    function displayBeerInfo(beer) {
        beerName.innerText = beer.name
        beerImage.setAttribute("src", beer.image_url)
        beerDescription.innerText = beer.description
        const id = beer.id

        customerReviews.innerHTML = ''
        displayReviews(beer)
        
        const reviewForm = document.getElementById("review-form")
        reviewForm.addEventListener("submit", function(e){
            e.preventDefault()
            const entry = reviewForm["review"].value
            submitReview(beer, id, entry)
        })
    }

    function submitReview(beer, id, entry) {
        // console.log("In submit review", id)
        beer.reviews.push(entry)
        const reviews = beer.reviews
        const data = {
            id: id,
            name: beer.name,
            description: beer.description,
            "image_url": beer.image_url,
            reviews: reviews
        }
        fetch(`http://localhost:3000/beers/${id}`, {
            method: 'PATCH',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(result => {
            customerReviews.innerHTML = ''
            displayReviews(result)
        })
        
    }
})
