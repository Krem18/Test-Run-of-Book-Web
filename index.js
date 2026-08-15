const bookInput = document.querySelector(".BookInput");
const submit = document.querySelector(".SubmitBtn");
const bookform = document.querySelector(".formcard");
const card = document.querySelector(".card");
const card2 = document.querySelector(".card2")
const ApiKey = "AIzaSyDCdlJA3olB6R0wZjPS9OLdm4fGIq7-1OM"

bookform.addEventListener("submit" , async event =>{
    event.preventDefault();
    const book = bookInput.value;
    if(book){
        try{
            const BookData = await getbookdata(book);
            DisplayBookInfo(BookData);
        }
        catch(error){
            console.error(error)
            DisplayError(error)

        }
    }
    else{
        DisplayError("Please enter a book");

    }
});

async function getbookdata(book){
    const ApiUrl = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(book)}&key=${ApiKey}`;;
    const response = await fetch(ApiUrl);
    if(!response.ok){
        throw new Error("Could not fetch data");
    }
    return await response.json();
    
}

function DisplayBookInfo(data){
    card.textContent = "";
    card.style.display = "flex";
    card2.textContent = "";
    card2.style.display = "flex";
    const bookInfo = data.items[0].volumeInfo;

    const title = bookInfo.title || "No Title Available";
    const author = bookInfo.authors ? bookInfo.authors.join(", ") : "Unknown Author";
    const coverUrl = bookInfo.imageLinks ? bookInfo.imageLinks.thumbnail : "https://via.placeholder.com/128x192?text=No+Cover";
    const description = bookInfo.description || "No description available.";

    const titleHeader = document.createElement("p");
    const authorSub = document.createElement("p");
    const coverImg = document.createElement("img");
    const descPara = document.createElement("p");

    titleHeader.textContent = title;
    authorSub.textContent = `By ${author}`;
    coverImg.src = coverUrl;
    descPara.textContent = description;

    titleHeader.classList.add("BookName");
    authorSub.classList.add("Author");
    coverImg.classList.add("BookThumb");
    descPara.classList.add("BookDesc");

    card2.appendChild(titleHeader);
    card2.appendChild(authorSub);
    card.appendChild(coverImg);
    card2.appendChild(descPara);


}

function DisplayError(message){
    const errorDisplay = document.createElement("p");
    errorDisplay.textContent = message;
    errorDisplay.classList.add("ErrorDisplay");
    card2.textContent = "";
    card2.style.display = "flex";
    card2.appendChild(errorDisplay);
}