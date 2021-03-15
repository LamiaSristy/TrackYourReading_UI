const baseUrl = 'http://localhost:3000';

// User table's endpoint:

export const loginStatusUrl = `${baseUrl}/logged_in`;

export const createUserUrl = `${baseUrl}/users`;

export const loginUserUrl = `${baseUrl}/login`;

export const logOutUserUrl = `${baseUrl}/logout`;


// Book table's endpoints:

export const fetchUserBookUrl = user_id => `${baseUrl}/users/${user_id}/books`

export const createBookUrl = user_id => `${baseUrl}/users/${user_id}/books`;

export const updateBookUrl = (user_id, id) => `${baseUrl}/users/${user_id}/books/${id}`;

export const deleteBookUrl = (user_id, id) => `${baseUrl}/users/${user_id}/books/${id}`;


// Tracking table's endpoints:

export const fetchReadingDaysUrl = (user_id, book_id) => `${baseUrl}/users/${user_id}/books/${book_id}/trackings`;

export const createDayUrl = (user_id, book_id) => `${baseUrl}/users/${user_id}/books/${book_id}/trackings`;

export const deleteDayUrl = (user_id, book_id, id) => `${baseUrl}/users/${user_id}/books/${book_id}/trackings/${id}`;

export const updateDayUrl = (user_id, book_id, id) => `${baseUrl}/users/${user_id}/books/${book_id}/trackings/${id}`; 