/**
 * Created by johnny on 27/06/17.
 */
export const normalizeUnit = unit => {
  const {
    unitid,
    title,
    description,
    status,
    formattedPrice,
    price,
    imageURL,
    mpCategorySet,
    lastModifiedTimestamp,
    ...rest
  } = unit;

  return {
    id: unitid,
    title,
    description,
    status,
    price,
    formattedPrice,
    imageURL,
    categories: mpCategorySet || [],
    lastModifiedTimestamp
  };
};

export const normalizeCategory = category => {
  const {
    id, description, title, unitCount, ...rest
  } = category;

  return { id: id||title, description, title, unitCount };
};
