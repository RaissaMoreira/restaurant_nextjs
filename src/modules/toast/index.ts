import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

interface IToast {
  message: string;
  status: "success" | "error" | "warning";
}

export const showToast = ( {message, status}: IToast ) => {
  switch (status) {
    case "success":
      toast.success( message ,{
          position: "bottom-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        }
      );
      break;
    case "error":
      toast.error( message ,{
          position: "bottom-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        }
      );
      break;
    case "warning":
      toast.warning( message ,{
          position: "bottom-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        }
      );
      break;
    default:
      return null;
  }
};