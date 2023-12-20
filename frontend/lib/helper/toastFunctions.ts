import { toast } from "react-toastify";

const success = (message = "Request Successful Chief!") =>
  toast.success(message);
const failed = (message = "Something went wrong") => toast.error(message);

export { success, failed };
