export const birthdayDate = (currentDate: number) => {
var date = new Date(currentDate);
var year = date.getFullYear();
var month = ("0" + (date.getMonth() + 1)).slice(-2);
var day = ("0" + date.getDate()).slice(-2);
return `${month}/${day}/${year}`
};
