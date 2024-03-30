const createPicture = ({ src, description }) => `
  <img class="event__photo" src=${src} alt=${description}>;
`;

export const createFormDestinationTemplate = ({ description, name, pictures }) => `
  <section class="event__section  event__section--destination">
    <h3 class="event__section-title  event__section-title--destination">${name}</h3>
    <p class="event__destination-description">${description}</p>

    <div class="event__photos-container">
      <div class="event__photos-tape">
        ${pictures.map((picture) => createPicture(picture))}
      </div>
    </div>
  </section>
`;

