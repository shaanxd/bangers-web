import moment from 'moment';

export const getImageUrl = imageUrl =>
  `${process.env.REACT_APP_IMAGE_URL}${imageUrl}`;

export const getTomorrow = () =>
  moment()
    .add(1, 'd')
    .toDate();

export const getNextDate = selectedDate =>
  moment(selectedDate)
    .add(1, 'd')
    .toDate();

export const getMinStartDate = () => moment().toDate();

export const getMinReturnDate = startDate => moment(startDate).toDate();

export const getMaxReturnDate = startDate =>
  moment(startDate)
    .add(2, 'w')
    .toDate();

export const getDateStringInUTC = date =>
  moment(date)
    .utc()
    .format();
