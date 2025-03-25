const winterDataEl = document.getElementById('winter-data');
const winterJSON = winterDataEl ? winterDataEl.textContent.trim().replace(/\n/g, '') : '[]';
window.winterMediaItems = JSON.parse(winterJSON);
const summerDataEl = document.getElementById('summer-data');
const summerJSON = summerDataEl ? summerDataEl.textContent.trim().replace(/\n/g, '') : '[]';
window.summerMediaItems = JSON.parse(summerJSON);
function createMediaCard(item) {
  const container = document.createElement('div');
  container.className = "w-10/12 mt-4";
  const card = document.createElement('div');
  const hasBorder = item.hasBorder || false;
  card.className = "card p-4 bg-black rounded-lg shadow-md hover:bg-li " + (hasBorder ? "border-b border-gray-700" : "");
  card.setAttribute('data-images', JSON.stringify(item.imageUrls || []));
  card.setAttribute('data-video', item.videoLink ? item.videoLink : "");
  const titleEl = document.createElement('h3');
  titleEl.className = "text-2xl font-bold text-white";
  titleEl.textContent = item.title || "Untitled";
  card.appendChild(titleEl);
  const speakerEl = document.createElement('p');
  speakerEl.className = "text-sm text-gray-300";
  speakerEl.textContent = "by " + (item.speaker || "Unknown");
  card.appendChild(speakerEl);
  const formattedDate = new Date(item.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: '2-digit' });
  const dateEl = document.createElement('p');
  dateEl.className = "text-sm text-gray-300";
  dateEl.textContent = "Date: " + formattedDate;
  card.appendChild(dateEl);
  const speakerIntroDiv = document.createElement('div');
  speakerIntroDiv.className = "mt-2";
  const speakerIntroButton = document.createElement('button');
  speakerIntroButton.className = "text-sm text-gray-300 font-semibold flex items-center";
  speakerIntroButton.setAttribute('data-target', ".speakerIntro");
  speakerIntroButton.setAttribute('data-arrow', ".speakerIntroArrow");
  speakerIntroButton.setAttribute('onclick', "toggleSection(this)");
  const speakerIntroSpan = document.createElement('span');
  speakerIntroSpan.textContent = "Speaker Introduction";
  speakerIntroButton.appendChild(speakerIntroSpan);
  const speakerIntroSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  speakerIntroSvg.setAttribute("class", "speakerIntroArrow ml-2 w-4 h-4 transform");
  speakerIntroSvg.setAttribute("fill", "none");
  speakerIntroSvg.setAttribute("stroke", "currentColor");
  speakerIntroSvg.setAttribute("viewBox", "0 0 24 24");
  const speakerIntroPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
  speakerIntroPath.setAttribute("stroke-linecap", "round");
  speakerIntroPath.setAttribute("stroke-linejoin", "round");
  speakerIntroPath.setAttribute("stroke-width", "2");
  speakerIntroPath.setAttribute("d", "M19 9l-7 7-7-7");
  speakerIntroSvg.appendChild(speakerIntroPath);
  speakerIntroButton.appendChild(speakerIntroSvg);
  speakerIntroDiv.appendChild(speakerIntroButton);
  const speakerIntroContent = document.createElement('p');
  speakerIntroContent.className = "speakerIntro text-sm text-gray-300";
  speakerIntroContent.style.display = "none";
  speakerIntroContent.textContent = item.speakerIntro || "";
  speakerIntroDiv.appendChild(speakerIntroContent);
  card.appendChild(speakerIntroDiv);
  const abstractDiv = document.createElement('div');
  abstractDiv.className = "mt-2";
  const abstractButton = document.createElement('button');
  abstractButton.className = "text-sm text-gray-300 font-semibold flex items-center";
  abstractButton.setAttribute('data-target', ".abstractContent");
  abstractButton.setAttribute('data-arrow', ".abstractArrow");
  abstractButton.setAttribute('onclick', "toggleSection(this)");
  const abstractSpan = document.createElement('span');
  abstractSpan.textContent = "Abstract";
  abstractButton.appendChild(abstractSpan);
  const abstractSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  abstractSvg.setAttribute("class", "abstractArrow ml-2 w-4 h-4 transform");
  abstractSvg.setAttribute("fill", "none");
  abstractSvg.setAttribute("stroke", "currentColor");
  abstractSvg.setAttribute("viewBox", "0 0 24 24");
  const abstractPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
  abstractPath.setAttribute("stroke-linecap", "round");
  abstractPath.setAttribute("stroke-linejoin", "round");
  abstractPath.setAttribute("stroke-width", "2");
  abstractPath.setAttribute("d", "M19 9l-7 7-7-7");
  abstractSvg.appendChild(abstractPath);
  abstractButton.appendChild(abstractSvg);
  abstractDiv.appendChild(abstractButton);
  const abstractContent = document.createElement('p');
  abstractContent.className = "abstractContent mt-2 text-gray-300";
  abstractContent.style.display = "none";
  abstractContent.textContent = item.abstract || "";
  abstractDiv.appendChild(abstractContent);
  card.appendChild(abstractDiv);
  const carouselWrapper = document.createElement('div');
  carouselWrapper.className = "mt-4";
  const carouselContainer = document.createElement('div');
  carouselContainer.className = "carousel-container relative";
  const carousel = document.createElement('div');
  carousel.className = "carousel flex overflow-x-auto space-x-4";
  let videoExists = false;
  if (item.videoLink && item.videoLink.trim() !== "") {
    videoExists = true;
    const videoContainer = document.createElement('div');
    videoContainer.className = "flex-none w-1/3 video-container cursor-pointer";
    videoContainer.setAttribute('onclick', "openPopup(this, 0)");
    const iframe = document.createElement('iframe');
    iframe.setAttribute("width", "100%");
    iframe.setAttribute("height", "200");
    iframe.setAttribute("src", item.videoLink);
    iframe.setAttribute("title", "YouTube video player");
    iframe.setAttribute("frameborder", "0");
    iframe.setAttribute("allow", "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture");
    iframe.setAttribute("allowfullscreen", "");
    iframe.className = "mb-4";
    videoContainer.appendChild(iframe);
    carousel.appendChild(videoContainer);
  }
  if (item.imageUrls && item.imageUrls.length > 0) {
    item.imageUrls.forEach((url, i) => {
      const imageDiv = document.createElement('div');
      imageDiv.className = "flex-none w-1/3";
      const img = document.createElement('img');
      img.setAttribute("src", url);
      img.setAttribute("alt", "Media image");
      img.className = "w-full h-48 object-cover rounded-lg cursor-pointer hover:scale-105 transition-transform";
      const popupIndex = videoExists ? i + 1 : i;
      img.setAttribute("onclick", `openPopup(this, ${popupIndex})`);
      imageDiv.appendChild(img);
      carousel.appendChild(imageDiv);
    });
  }
  carouselContainer.appendChild(carousel);
  carouselWrapper.appendChild(carouselContainer);
  card.appendChild(carouselWrapper);
  container.appendChild(card);
  return container;
}
function toggleSection(button) {
  const card = button.closest('.card');
  const targetSelector = button.getAttribute('data-target');
  const arrowSelector = button.getAttribute('data-arrow');
  const section = card.querySelector(targetSelector);
  const arrow = card.querySelector(arrowSelector);
  if (targetSelector.includes('winterMedia') || targetSelector.includes('summerMedia')) {
    let mediaItems = [];
    if (targetSelector.includes('winter')) {
      mediaItems = window.winterMediaItems;
    } else if (targetSelector.includes('summer')) {
      mediaItems = window.summerMediaItems;
    }
    if (!section.hasChildNodes()) {
      mediaItems.forEach(item => {
        const mediaCardElement = createMediaCard(item);
        section.appendChild(mediaCardElement);
      });
      section.style.display = 'flex';
      arrow.classList.add('rotate-180');
    } else {
      section.innerHTML = '';
      section.style.display = 'none';
      arrow.classList.remove('rotate-180');
    }
  } else {
    if (section) {
      section.style.display = (section.style.display === 'none' || section.style.display === '') ? 'block' : 'none';
    }
    if (arrow) {
      arrow.classList.toggle('rotate-180');
    }
  }
}
window.toggleSection = toggleSection;
let currentPopupItems = [];
let currentPopupIndex = 0;
function openPopup(elem, index) {
  const card = elem.closest('.card');
  const video = card.getAttribute('data-video');
  const imagesData = card.getAttribute('data-images');
  let images = imagesData ? JSON.parse(imagesData) : [];
  currentPopupItems = [];
  if (video && video.trim() !== "") {
    currentPopupItems.push({ type: "video", url: video });
  }
  images.forEach((img) => {
    currentPopupItems.push({ type: "image", url: img });
  });
  currentPopupIndex = index;
  updatePopupContent();
  document.getElementById('imagePopup').style.display = 'flex';
}
function updatePopupContent() {
  const popupMedia = document.getElementById('popupMedia');
  popupMedia.innerHTML = "";
  if (currentPopupItems.length > 0 && currentPopupIndex >= 0 && currentPopupIndex < currentPopupItems.length) {
    const item = currentPopupItems[currentPopupIndex];
    if (item.type === "video") {
      const wrapper = document.createElement('div');
      wrapper.className = "video-wrapper";
      const iframe = document.createElement('iframe');
      iframe.src = item.url;
      iframe.setAttribute("allow", "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture");
      iframe.setAttribute("allowfullscreen", "");
      wrapper.appendChild(iframe);
      popupMedia.appendChild(wrapper);
    } else {
      const img = document.createElement('img');
      img.src = item.url;
      img.className = "popup-img";
      popupMedia.appendChild(img);
    }
  }
}
function popupPrev() {
  if (currentPopupItems.length > 0) {
    currentPopupIndex = (currentPopupIndex - 1 + currentPopupItems.length) % currentPopupItems.length;
    updatePopupContent();
  }
}
function popupNext() {
  if (currentPopupItems.length > 0) {
    currentPopupIndex = (currentPopupIndex + 1) % currentPopupItems.length;
    updatePopupContent();
  }
}
function closePopup() {
  document.getElementById('imagePopup').style.display = 'none';
}
document.getElementById('imagePopup').addEventListener('click', function(event) {
  if (event.target.id === 'imagePopup') {
    closePopup();
  }
});
document.addEventListener('keydown', function(event) {
  const popup = document.getElementById('imagePopup');
  if (popup.style.display !== 'none') {
    if (event.key === 'Escape') {
      closePopup();
    } else if (event.key === 'ArrowLeft') {
      popupPrev();
    } else if (event.key === 'ArrowRight') {
      popupNext();
    }
  }
});
window.openPopup = openPopup;
window.closePopup = closePopup;
window.popupPrev = popupPrev;
window.popupNext = popupNext;
document.addEventListener('DOMContentLoaded', () => {
  const winterButton = document.querySelector('button[data-target=".winterMedia"]');
  if (winterButton) {
    toggleSection(winterButton);
  }
});
