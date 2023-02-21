

let select = document.querySelector("#country")
let selectValue = 'fr'
select.addEventListener("change", function () {
  selectValue = document.querySelector("select").value
  updateContent("https://newsapi.org/v2/top-headlines?country=" + selectValue + "&sortBy=publishedAt&apiKey=ae4f0f8e31b3431aa4ba2b3e6021248e")
})

let selectCategory = document.querySelector("#category")
let categoryValue
selectCategory.addEventListener("change", function () {
  categoryValue = selectCategory.value;
  updateContent("https://newsapi.org/v2/top-headlines?country=" + selectValue + "&sortBy=publishedAt&apiKey=ae4f0f8e31b3431aa4ba2b3e6021248e&category="+categoryValue)
})


async function updateContent(url) {
  let response = await fetch(url);
  let data = await response.json();

  let section = document.querySelector("section")
  section.innerHTML = "";
  data.articles.forEach(element => {
    if (element.urlToImage != null) {
      let newArticle = document.createElement("article");
      let newA = document.createElement("a")
      newA.href = element.url
      newA.target="blank"
      newArticle.innerHTML = `
                <img src="${element.urlToImage}" alt="New Image">
                <h2>${element.title}</h2>
                <p>${element.description}</p>
                <span>`
      newA.append(newArticle)
      section.append(newA)
    }
  });
}

async function updateGif(url) {
  let response = await fetch(url);
  let michel = await response.json();

  let asideFirst = document.querySelector("#first")

  michel.data.forEach(element => {
    let newImg = document.createElement("img")
    newImg.src = element.images.downsized.url
    newImg.alt = element.title
    asideFirst.append(newImg)
  })

}

async function updateGif2(url) {
  let response = await fetch(url);
  let michel = await response.json();

  let asideSecond = document.querySelector("#second")

  michel.data.forEach(element => {
    let newImg = document.createElement("img")
    newImg.src = element.images.downsized.url
    newImg.alt = element.title
    asideSecond.append(newImg)
  })

}

updateGif2("https://api.giphy.com/v1/gifs/search?api_key=1cK5IjzDd0Q0edYKVZZMwhCONAyfoZq9&q=vladimir-poutin&limit=25&offset=0&rating=g&lang=en")
updateGif("https://api.giphy.com/v1/gifs/trending?api_key=1cK5IjzDd0Q0edYKVZZMwhCONAyfoZq9&limit=25&rating=g")
updateContent("https://newsapi.org/v2/top-headlines?country=fr&sortBy=publishedAt&apiKey=ae4f0f8e31b3431aa4ba2b3e6021248e")



const debounce = (func, wait) => {
  let timeout;

  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };

    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

let searchBar = document.querySelector("input")
searchBar.addEventListener("input", debounce(() => {   updateContent("https://newsapi.org/v2/top-headlines?country=" + selectValue + "&sortBy=publishedAt&apiKey=ae4f0f8e31b3431aa4ba2b3e6021248e&category="+categoryValue+"&q=" + searchBar.value) }, 500))




// function debounce(waitTime, ...funcs) {
//     console.log(funcs);
//     let timeout;                                //timeout variable
//     return () => {
//         clearTimeout(timeout);                   //clear timeout everytime the function is triggered
//         timeout = setTimeout(() => {      //assign the timeout when the event is fired and fire the array of functions once the timeout arrive to 0
//             for (func of funcs) {
//                 console.log(func);
//                 func();
//             }
//         }, waitTime);
//     }
// }
// inputField.addEventListener("input", debounce(1000, () => { filter.query = inputField.value }, displayCatalogue));

