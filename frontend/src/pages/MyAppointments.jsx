import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const MyAppointments = () => {
  const navigate = useNavigate();
  const { backendUrl, token, getDoctorsData } = useContext(AppContext);
  const [appointments, setAppointments] = useState([]);
  const months = [
    " ",
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Doc",
  ];

  const slotDateFormat = (slotDate) => {
    const dateArray = slotDate.split("_");
    return (
      dateArray[0] + " " + months[Number(dateArray[1])] + " " + dateArray[2]
    );
  };

  const getUserAppointments = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/user/appointments", {
        headers: { token },
      });
      if (data.success) {
        setAppointments(data.appointments.reverse());
        // console.log(data.appointments);
      } else {
        return toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
      console.log(error.message);
    }
  };

  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/user/cancel-appointment",
        { appointmentId },
        { headers: { token } }
      );
      if (data.success) {
        toast.success(data.message);
        getUserAppointments();
        getDoctorsData();
      } else {
        return toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
      console.log(error.message);
    }
  };

  // const initPay = (order) => {
  //   // <script src="https://checkout.razorpay.com/v1/checkout.js"></script>

  //   const options = {
  //     // "key": import.meta.env.VITE_RAZORPAY_KEY_ID, // Enter the Key ID generated from the Dashboard
  //     //     "amount": order.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
  //     //     "currency": order.currency,
  //     //     "name": "Appointment Payment ", //your business name
  //     //     "description": "Appointment Payment ",
  //     //     "image": "https://example.com/your_logo",
  //     //     "order_id": order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
  //     //     "receipt": order.receipt
  //     handler: async (response) => {
  //       console.log(response);

  //       try {
  //         const { data } = await axios.post(
  //           backendUrl + "/api/user/verify-razorpay",
  //           { response },
  //           { headers: { token } }
  //         );
  //         if (data.success) {
  //           // console.log(data);
  //           getUserAppointments();
  //           navigate("/");
  //         } else {
  //           return toast.error(data.message);
  //         }
  //       } catch (error) {
  //         toast.error(error.message);
  //         console.log(error.message);
  //       }
  //     },
  //   };

  //   // const rzp = new window.Razorpay(options)
  //   // rzp.open()
  // };

  // const appointmentRazorpay = async (appointmentId) => {
  //   try {
  //     const { data } = await axios.post(
  //       backendUrl + "/api/user/payment-razorpay",
  //       { appointmentId },
  //       { headers: { token } }
  //     );
  //     if (data.success) {
  //       // razorpay Web-Integration steps
  //       // toast.success(data.message);
  //       // initPay(data.order)

  //       console.log(data);
  //     } else {
  //       return toast.error(data.message);
  //     }
  //   } catch (error) {
  //     toast.error(error.message);
  //     console.log(error.message);
  //   }
  // };

  const bookingHandler = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/user/checkout-session",
        { appointmentId },
        { headers: { token } }
      );
      if (data.success) {
        // toast.success(data.message);
        if (data.session.url) {
          window.location.href = data.session.url;
        }
        console.log(data);
      } else {
        return toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
      console.log(error.message);
    }
  };

  useEffect(() => {
    if (token) {
      getUserAppointments();
    }
  }, [token]);

  return (
    <div>
      <p className="pb-3 mt-12 font-medium text-zinc-700 border-b ">
        MyAppointments
      </p>
      <div>
        {appointments.map((item, index) => (
          <div
            key={index}
            className="grid grid-col-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 border-b"
          >
            <div>
              <img
                className="w-32 bg-indigo-50"
                src={item.docData.image}
                alt=""
              />
            </div>
            <div className="flex-1 text-sm text-zinc-600">
              <p className="text-neutral-800 font-medium mt-1">
                {item.docData.name}
              </p>
              <p>{item.docData.speciality}</p>
              <p className="text-zinc-700 font-medium mt-1">Address:</p>
              <p className="text-xs">{item.docData.address.line1}</p>
              <p className="text-xs">{item.docData.address.line2}</p>
              <p className="text-xs mt-1">
                <span className="text-sm text-neutral-700 font-medium">
                  Date & Time
                </span>{" "}
                {slotDateFormat(item.slotDate)} | {item.slotTime}
              </p>
            </div>
            <div></div>
            <div className="flex flex-col gap-2 justify-end">
              {!item.cancelled && item.payment && !item.isCompleted && (
                <button className="text-sm text-stone-500 bg-indigo-50 text-center sm:min-w-48 py-2 border rounded hover:bg-primary hover:text-white transition-all duration-300">
                  Paid
                </button>
              )}

              {!item.cancelled && !item.payment && !item.isCompleted && (
                <button
                  onClick={() => bookingHandler(item._id)}
                  className="text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-primary hover:text-white transition-all duration-300"
                >
                  Pay Online
                </button>
              )}
              {!item.cancelled && !item.payment && !item.isCompleted && (
                <button
                  onClick={() => cancelAppointment(item._id)}
                  className="text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-red-600 hover:text-white transition-all duration-300"
                >
                  Cancel Appointment
                </button>
              )}
              {item.cancelled && !item.isCompleted && (
                <button className="sm:min-w-48 py-2 border border-red-500 rounded text-red-500">
                  Appointment Cancelled
                </button>
              )}
              {item.isCompleted && <button className="sm:min-w-48 py-2 border border-green-500 rounded text-green-500 ">Completed</button>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyAppointments;
