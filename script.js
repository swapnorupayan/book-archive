// Add preloader 
const loader = param => {
    document.getElementById('spinner').style.display = param;
}
// Load Data From Api Using Fetch 
const loadData = async () => {
    const searchInput = document.getElementById('search-input');
    const searchText = searchInput.value;
    // Error Handle for Empty Search 
    if (searchText === '') {
        document.getElementById('count').innerText = `
        Please search Something`;
        document.getElementById('books-container').textContent = '';
    }
    else {
        loader('block');
        // Url Dynamic 
        const url = `https://openlibrary.org/search.json?q=${searchText}`
        const res = await fetch(url);
        const data = await res.json();
        showBooksData(data.docs);
        // Clear Search Input 
        searchInput.value = '';
    }


}
const showBooksData = (books) => {
    const booksContainer = document.getElementById('books-container');
    // Clear Books Container Data 
    booksContainer.textContent = '';
    // Count Items 
    document.getElementById('count').innerText = `
        Your Result: ${books.length}
        `;
    // Error Handle for No items in result 
    if (books.length === 0) {
        document.getElementById('count').innerText = `
        Result Not found.`;
    }
    else {
        books.forEach(book => {
            // Create Dynamically Div in UI 
            const div = document.createElement('div');
            div.classList.add('col');
            div.classList.add('card-style')
            div.innerHTML = `
                <div class="card">
                    <img height= '350px' p-5 src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" class="card-img-top" alt="...">
                    <div class="card-body" style="height:200px; overflow:hidden">
                        <h5 class="card-title"> <b>Book Name:</b> ${book.title}</h5>
                        <p><b>Author Name:</b> ${book.author_name}</p>
                        <p><b>Publisher:</b> ${book.publisher}</p>

                        <p class="card-text"><b>Published year:</b> ${book.first_publish_year}</p>
                    </div>
                </div>
            `;
            booksContainer.appendChild(div);
        });

    }
    loader('none');

}