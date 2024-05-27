const createPicture = ({ src, description }) => {
  const newSrc = src.replace('http://picsum.photos', 'https://loremflickr.com');
  return `<img class="event__photo" src="${newSrc}" alt=${description}>`;
};

export const createFormDestinationTemplate = ({ description, name, pictures }) =>
  (description, name, pictures) ?
    ` <h3 class="event__section-title  event__section-title--destination">${name}</h3>
      <p class="event__destination-description">${description}</p>

      <div class="event__photos-container">
        <div class="event__photos-tape">
          ${pictures.map((picture) => createPicture(picture)).join('')}
        </div>
      </div>
  ` : '';
