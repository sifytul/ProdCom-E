export const dateFormatter = (dateStr: string) => {
  let dateObj = new Date(dateStr);
  let formattedDate = new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
  }).format(dateObj);

  return formattedDate;
};
