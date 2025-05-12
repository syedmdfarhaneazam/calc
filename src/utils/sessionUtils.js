
export const getSessionData = (key, defaultValue = null) => {
  const data = sessionStorage.getItem(key)
  if (data === null) return defaultValue
  return JSON.parse(data)
}

export const setSessionData = (key, value) => {
  sessionStorage.setItem(key, JSON.stringify(value))
}


export const removeSessionData = (key) => {
  sessionStorage.removeItem(key)
}

export const generateJobId = (counter = 1) => {
  const jobs = getSessionData("jobs", [])
  const jobCount = jobs.length + counter
  return `Job${jobCount.toString().padStart(4, "0")}`
}

export const formatDate = (date) => {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  })
    .format(date)
    .replace(",", "")
}

export const round = (value, decimals = 6) => {
  return Number(Math.round(value + "e" + decimals) + "e-" + decimals)
}


export const validateField = (value, datatype) => {
  value = value.trim()

  if (value === "") {
    return false
  }

  switch (datatype) {
    case "integer":
      if (!/^-?\d+$/.test(value)) {
        return false
      }
      break
    case "float":
      if (!/^-?\d*\.?\d+$/.test(value)) {
        return false
      }
      break
    default:
      break
  }

  return true
}
