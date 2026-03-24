// DATE SELECTION

// Find our date picker inputs on the page
const startInput = document.getElementById('startDate');
const endInput = document.getElementById('endDate');

// Call the setupDateInputs function from dateRange.js
// This sets up the date pickers to:
// - Default to a range of 9 days (from 9 days ago to today)
// - Restrict dates to NASA's image archive (starting from 1995)
setupDateInputs(startInput, endInput);

// GALLERY RETRIEVAL

const getImagesBtn = document.getElementById("getImages");
const gallery = document.getElementById("gallery");
const placeholder = document.getElementsByClassName("placeholder")[0];
const loadingMessage = document.getElementsByClassName("placeholder")[1];

// Load images from selected date range
async function getImages()
{
  // Hide Placeholder and Show Loading Message
  placeholder.style.display = "none";
  loadingMessage.style.display = "initial";

  // Clear old gallery items
  const galleryItems = document.getElementsByClassName("gallery-item")
  const galleryModals = document.getElementsByClassName("modal")
  while (galleryItems[0])
    galleryItems[0].parentNode.removeChild(galleryItems[0]);
  while (galleryModals[0])
    galleryModals[0].parentNode.removeChild(galleryModals[0]);

  // Fetch Data then Hide Loading Message
  let response = await fetch(
    `https://api.nasa.gov/planetary/apod?start_date=${startInput.value}&end_date=${endInput.value}&api_key=PuncRyaOdCS0H6H6mo0Q7e3NVXjzoSNWMGStJ5LI`
  );
  let data = await response.json();
  loadingMessage.style.display = "none";

  // Insert Gallery Items and Modals
  for (let i = 0; i < data.length; ++i)
  {
    if (data[i].media_type == "video")
    {
      gallery.insertAdjacentHTML("beforeend", 
        `<div class="gallery-item">
          <video autoplay="true" loop="true"> <source src="${data[i].url}" type="video/mp4"> </video>
          <h2>${data[i].title}</h2>
          <h3>${data[i].date} <button class="expand" data-bs-toggle="modal" data-bs-target="#modal${i}">+</button></h3>
        </div>`
      )
      gallery.insertAdjacentHTML("beforeend",
        `<div class="modal" id="modal${i}" data-bs-keyboard="false" tabindex="-1">
          <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
              <div class="gallery-modal">
              <video autoplay="true" loop="true"> <source src="${data[i].url}" type="video/mp4"> </video>
              <h2>${data[i].title}</h2>
              <h3>${data[i].date}</h3>
              <p class="explanation">${data[i].explanation.replace("Almost Hyperspace: Random APOD Generator","")}</p>
            </div>
            </div>
          </div>
        </div>`
      )
    }
    else
    {
      gallery.insertAdjacentHTML("beforeend", 
        `<div class="gallery-item">
          <img src="${data[i].url}">
          <h2>${data[i].title}</h2>
          <h3>${data[i].date} <button class="expand" data-bs-toggle="modal" data-bs-target="#modal${i}">+</button></h3>
        </div>`
      )
      gallery.insertAdjacentHTML("beforeend", 
        `<div class="modal" id="modal${i}" data-bs-keyboard="false" tabindex="-1">
          <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
              <div class="gallery-modal">
              <img src="${data[i].url}">
              <h2>${data[i].title}</h2>
              <h3>${data[i].date}</h3>
              <p class="explanation">${data[i].explanation.replace("Almost Hyperspace: Random APOD Generator","")}</p>
            </div>
            </div>
          </div>
        </div>`
      )
    }
  }
}

// Allow image loading
getImagesBtn.addEventListener("click", getImages);