const body = document.querySelector('body');
const overlay = document.querySelector('.overlay');
const inner = document.querySelector('.overlay__inner');
const content = document.querySelector('.overlay__content');
const spinner = document.querySelector('.spinner');
const photoBox = document.querySelector('.photoBox');
const grid = document.querySelector('.gridLayout');
const verticalGrid = document.querySelector('.verticalGridLayout');
const modal = document.querySelector('.modal');
const modalImg = document.querySelector('.modalImg');
const modalClose = document.querySelector('.close');

// const clientId = 'nNZ4wgIgZNFR4aqVQUbkOH7i58YTgiH9_f8Rcl1omEo';
const clientId = 'a-s3jbXr7eL7o_OjnCiVnVMRcQB-8yEJnCuTI02uI6E';
let page = 0;
loadNewPage();

window.addEventListener('scroll', function () {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 200) {
    page++;
    loadNewPage();
  }
});

function loadNewPage() {
  fetch(
    `https://api.unsplash.com/photos?page=${
      page + 1
    }&per_page=10&client_id=${clientId}&query=photos`
  )
    .then((response) => {
      return response.json();
    })
    .then((photos) => {
      overlay.classList.add('overlay');
      inner.classList.add('overlay__inner');
      content.classList.add('overlay__content');
      spinner.classList.add('spinner');
      const array = [];
      let id = '';
      photos.forEach((photo) => {
        id = photo.id;
        fetch(
          `https://api.unsplash.com/photos/${id}?&client_id=${clientId}&query=photos`
        )
          .then((response) => {
            return response.json();
          })
          .then((id) => {
            downloads.innerHTML = `<i class="fas fa-download"></i> ${id.downloads}`;
          });
        let photoUrl = photo.urls.regular;
        let photoAlt = photo.alt_description;

        let imgDiv = document.createElement('div');
        let imgInfo = document.createElement('div');
        let img = document.createElement('img');

        imgDiv.classList.add('imgDiv');
        imgInfo.classList.add('imgInfo');
        img.classList.add('image');

        img.setAttribute('src', photoUrl);
        img.setAttribute('alt', photoAlt);

        photoBox.appendChild(imgDiv);
        imgDiv.appendChild(imgInfo);
        imgDiv.appendChild(img);

        let avatar = document.createElement('div');
        let info = document.createElement('div');
        let downloads = document.createElement('div');
        let likes = document.createElement('div');
        let username = document.createElement('div');
        let portfolio = document.createElement('div');
        let socialMedia = document.createElement('div');
        let instagram = document.createElement('div');
        let twitter = document.createElement('div');

        avatar.classList.add('avatar');
        info.classList.add('info');
        likes.classList.add('likes');
        downloads.classList.add('downloads');
        username.classList.add('username');
        portfolio.classList.add('portfolio');
        socialMedia.classList.add('socialMedia');
        instagram.classList.add('instagram');
        twitter.classList.add('twitter');

        avatar.innerHTML = `<img src="${photo.user.profile_image.large}" />`;
        likes.innerHTML = `<i class="far fa-thumbs-up"></i> ${photo.likes}`;
        username.innerHTML = `<i class="far fa-user"></i> ${photo.user.username}`;
        if (photo.user.portfolio_url === null) {
          portfolio.innerHTML = 'Not Available';
        } else {
          portfolio.innerHTML = `<a href="${photo.user.portfolio_url}"><i class="fas fa-address-card"></i> ${photo.user.portfolio_url}</a>`;
        }
        if (photo.user.instagram_username === null) {
          instagram.innerHTML = 'Not Available';
        } else {
          instagram.innerHTML = `<i class="fab fa-instagram"></i> ${photo.user.instagram_username}`;
        }
        if (photo.user.twitter_username === null) {
          twitter.innerHTML = 'Not Available';
        } else {
          twitter.innerHTML = `<i class="fab fa-twitter"></i> ${photo.user.twitter_username}`;
        }

        imgInfo.appendChild(avatar);
        imgInfo.appendChild(info);
        info.appendChild(username);
        info.appendChild(likes);
        info.appendChild(downloads);
        imgInfo.appendChild(portfolio);
        imgInfo.appendChild(socialMedia);

        socialMedia.appendChild(instagram);
        socialMedia.appendChild(twitter);

        img.onload = function () {
          array.push(img);
          if (array.length === 10) {
            overlay.classList.remove('overlay');
            inner.classList.remove('overlay__inner');
            content.classList.remove('overlay__content');
            spinner.classList.remove('spinner');
          }
        };
        img.addEventListener('click', function () {
          openModal(img);
        });
      });
    });
}

function openModal(img) {
  let imgSrc = img.src;
  let imgAlt = img.alt;
  modalImg.setAttribute('src', imgSrc);
  modalImg.setAttribute('alt', imgAlt);
  modal.classList.add('block');
}

modalClose.addEventListener('click', function () {
  modal.classList.remove('block');
});

grid.addEventListener('click', function () {
  body.classList.add('gridLayout');
});

verticalGrid.addEventListener('click', function () {
  body.classList.remove('gridLayout');
});
