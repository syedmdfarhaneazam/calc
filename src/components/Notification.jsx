import { useNotification } from "../context/NotificationContext"

const Notification = () => {
  const { notification } = useNotification()

  return (
    <div id="notification" className={`notification ${notification.type} ${notification.show ? "show" : ""}`}>
      {notification.message}
    </div>
  )
}

export default Notification
