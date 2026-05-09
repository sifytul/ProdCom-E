export const dateFormatter = (dateStr: string) => {
  let dateObj = new Date(dateStr);
  let formattedDate = new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
  }).format(dateObj);

  return formattedDate;
};

export const formatDistanceToNow = (dateStr: string) => {
  let dateObj = new Date(dateStr);
  let now = new Date();
  let diffInSeconds = Math.floor((now.getTime() - dateObj.getTime()) / 1000);

  if (diffInSeconds < 60) {
    return `${diffInSeconds} seconds ago`;
  } else if (diffInSeconds < 3600) {
    let minutes = Math.floor(diffInSeconds / 60);
    return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
  } else if (diffInSeconds < 86400) {
    let hours = Math.floor(diffInSeconds / 3600);
    return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  } else {
    let days = Math.floor(diffInSeconds / 86400);
    return `${days} day${days > 1 ? "s" : ""} ago`;
  }
};
