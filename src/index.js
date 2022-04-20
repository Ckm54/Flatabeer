document.addEventListener("DOMContentLoaded", () => {
    const mainBeerContainer = document.querySelector("main")
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
        // customerReviews.innerHTML = ''
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



    function displayBeerInfo(beer) {
        mainBeerContainer.innerHTML = '';

        const beerContainer = document.createElement("div")
        beerContainer.setAttribute("class", "beer-details")

        const detailHtml = `
            <h2 id="beer-name">${beer.name}</h2>
            <img
            id="beer-image"
            alt="Beer Name Goes Here"
            src="${beer.image_url}"
            />
            <p>
            <em id="beer-description">${beer.description}</em>
            </p>

            <form id="description-form">
            <label for="description">Edited Description:</label>
            <textarea id="description"></textarea>
            <button type="submit">Update Beer</button>
            </form>

            <h3>Customer Reviews</h3>
            <ul id="review-list">
            
            </ul>
            <form id="review-form">
            <label for="review">Your Review:</label>
            <textarea id="review"></textarea>
            <button type="submit">Add review</button>
            </form>
        `

        beerContainer.innerHTML = detailHtml

        beerContainer.querySelector("#description").value = beer.description

        let reviewsContainer = beerContainer.querySelector("#review-list")
        beer.reviews.forEach(item => {
            let review = document.createElement("li")
            review.innerText = item
            reviewsContainer.append(review)
            review.addEventListener("click", function(){
                review.remove()
            })
        })

        mainBeerContainer.appendChild(beerContainer)
        const id = beer.id
        console.log(id)

        const reviewForm = beerContainer.querySelector("#review-form")
        reviewForm.addEventListener("submit", function(e){
            e.preventDefault()
            const entry = reviewForm["review"].value
            submitReview(beer, id, entry)
        })

        // editDescriptionForm.addEventListener("submit", function(e) {
        //     e.preventDefault()
        //     const editedDesc = descriptionTextArea.value
        //     submitEditedBeerDescription(beer, editedDesc)
        // })
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
            displayReviews(result)
        })
        
    }

    function submitEditedBeerDescription(beer, editedDescription) {
        console.log(beer.name)
        console.log(editedDescription)
    }
})
