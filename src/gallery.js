function createPhotoCards(photos) {
  const gallery = document.querySelector('.gallery');

  photos.forEach(photo => {
    const photoCard = createPhotoCard(photo);
    gallery.appendChild(photoCard);
  });
}

function createPhotoCard(photo) {
  const { webformatURL, tags, likes, views, comments, downloads } = photo;

  const photoCard = document.createElement('div');
  photoCard.classList.add('photo-card');

  const image = document.createElement('img');
  image.src = webformatURL;
  image.alt = tags;
  image.loading = 'lazy';
  photoCard.appendChild(image);

  const info = document.createElement('div');
  info.classList.add('info');
  photoCard.appendChild(info);

  const likesInfo = createInfoItem('Likes', likes);
  info.appendChild(likesInfo);

  const viewsInfo = createInfoItem('Views', views);
  info.appendChild(viewsInfo);

  const commentsInfo = createInfoItem('Comments', comments);
  info.appendChild(commentsInfo);

  const downloadsInfo = createInfoItem('Downloads', downloads);
  info.appendChild(downloadsInfo);

  return photoCard;
}

function createInfoItem(label, value) {
  const infoItem = document.createElement('p');
  infoItem.classList.add('info-item');
  infoItem.innerHTML = `<b>${label}</b>: ${value}`;
  return infoItem;
}

function clearGallery() {
  const gallery = document.querySelector('.gallery');
  gallery.innerHTML = '';
}

export { createPhotoCards, clearGallery };
