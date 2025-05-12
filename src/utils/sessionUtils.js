/**
 * Gets data from session storage
 * @param {string} key - Key to retrieve
 * @param {*} defaultValue - Default value if key doesn't exist
 * @returns {*} - Retrieved value or default
 */
export const getSessionData = (key, defaultValue = null) => {
  const data = sessionStorage.getItem(key)
  if (data === null) return defaultValue
  return JSON.parse(data)
}

/**
 * Sets data in session storage
 * @param {string} key - Key to set
 * @param {*} value - Value to store
 */
export const setSessionData = (key, value) => {
  sessionStorage.setItem(key, JSON.stringify(value))
}

/**
 * Removes data from session storage
 * @param {string} key - Key to remove
 */
export const removeSessionData = (key) => {
  sessionStorage.removeItem(key)
}

/**
 * Generates a unique job ID
 * @param {number} [counter=1] - Optional counter to append to ID
 * @returns {string} - Unique job ID in format "Job####"
 */
export const generateJobId = (counter = 1) => {
  const jobs = getSessionData("jobs", [])
  const jobCount = jobs.length + counter
  return `Job${jobCount.toString().padStart(4, "0")}`
}

/**
 * Formats a date as a string
 * @param {Date} date - Date object to format
 * @returns {string} - Formatted date string
 */
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

/**
 * Rounds a number to a specific number of decimal places
 * @param {number} value - Value to round
 * @param {number} [decimals=6] - Number of decimal places
 * @returns {number} - Rounded value
 */
export const round = (value, decimals = 6) => {
  return Number(Math.round(value + "e" + decimals) + "e-" + decimals)
}

/**
 * Validates a form field
 * @param {string} value - Field value to validate
 * @param {string} datatype - Datatype for validation
 * @returns {boolean} - True if valid, false otherwise
 */
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
