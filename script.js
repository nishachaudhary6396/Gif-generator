let submitBtn = document.getElementById("btn");
let addMoreBtn = document.getElementById("add-more");
let apiKey = "JJRG5GVYCkCwaKRPL2t6JulBCSOn2NNc";
let offset = 0;
let gifCount = 10;

// Default query to load 'laugh' GIFs initially
let defaultQuery = "laugh";

// Function to generate GIFs
let generateGif = (query) => {
    let loader = document.querySelector(".loader");
    loader.style.display = "block";
    document.querySelector(".wrapper").style.display = "none";

    let url = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${query}&limit=${gifCount}&offset=${offset}&rating=g&lang=en`;

    fetch(url)
        .then((resp) => resp.json())
        .then((info) => {
            let gifData = info.data;

            gifData.forEach((gif) => {
                let container = document.createElement("div");
                container.classList.add("container");

                let iframe = document.createElement("img");
                iframe.setAttribute("src", gif.images.downsized_medium.url);

                let saveButton = document.createElement("button");
                saveButton.textContent = "Save";
                saveButton.classList.add("save-btn");
                saveButton.onclick = () => {
                    let link = document.createElement("a");
                    link.href = gif.images.downsized_medium.url;
                    link.download = "gif-download.gif";
                    link.click();
                };

                container.append(iframe);
                container.append(saveButton);

                document.querySelector(".wrapper").append(container);
            });

            loader.style.display = "none";
            document.querySelector(".wrapper").style.display = "grid";

            addMoreBtn.style.display = "block";
        })
        .catch((error) => {
            console.error("Error fetching GIFs:", error);
            loader.style.display = "none";
        });
};

// Default to search for "laugh" when the page loads
window.addEventListener("load", () => {
    document.querySelector("#search-box").value = defaultQuery;
    generateGif(defaultQuery);
    addMoreBtn.style.display = "none";
});

// Event listener for search button
submitBtn.addEventListener("click", () => {
    offset = 0;
    let query = document.getElementById("search-box").value || defaultQuery; // Use default "laugh" if no query entered
    document.querySelector(".wrapper").innerHTML = "";
    generateGif(query);
});

// Event listener for add more button
addMoreBtn.addEventListener("click", () => {
    offset += gifCount;
    let query = document.getElementById("search-box").value || defaultQuery; // Use default "laugh" if no query entered
    generateGif(query);
});
