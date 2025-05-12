"use client"

import { useState, useEffect } from "react"
import { useNotification } from "../context/NotificationContext"
import { useSession } from "../context/SessionContext"
import { inputFields, calculate } from "../utils/calculatorUtils"
import { generateJobId, formatDate, validateField } from "../utils/sessionUtils"
import Modal from "./Modal"

const CalculatorForm = ({ onCalculationComplete }) => {
  const [inputs, setInputs] = useState({})
  const [validationErrors, setValidationErrors] = useState({})
  const [showJobLoadModal, setShowJobLoadModal] = useState(false)
  const { showNotification } = useNotification()
  const { jobs, saveJob } = useSession()

  // Initialize form with empty values
  useEffect(() => {
    const initialInputs = {}
    inputFields.forEach((field) => {
      initialInputs[field.id] = ""
    })
    setInputs(initialInputs)
  }, [])

  const handleInputChange = (e) => {
    const { id, value } = e.target
    setInputs((prev) => ({
      ...prev,
      [id]: value,
    }))

    // Clear validation error when user types
    if (validationErrors[id]) {
      setValidationErrors((prev) => ({
        ...prev,
        [id]: null,
      }))
    }
  }

  const validateInputs = () => {
    const errors = {}
    let isValid = true

    inputFields.forEach((field) => {
      const value = inputs[field.id]
      const fieldIsValid = validateField(value, field.datatype)

      if (!fieldIsValid) {
        errors[field.id] = `Please enter a valid ${field.datatype === "integer" ? "integer" : "number"}`
        isValid = false
      }
    })

    setValidationErrors(errors)
    return isValid
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    // Validate inputs
    if (!validateInputs()) {
      showNotification("Please fix the validation errors before submitting.", "error")
      return
    }

    // Convert string inputs to numbers
    const numericInputs = {}
    Object.entries(inputs).forEach(([key, value]) => {
      numericInputs[key] = Number.parseFloat(value)
    })

    // Generate job ID and timestamp
    const jobId = generateJobId()
    const timestamp = formatDate(new Date())

    // Calculate results
    const results = calculate(numericInputs)

    // Create job object
    const job = {
      id: jobId,
      timestamp: timestamp,
      inputs: numericInputs,
      results: results,
    }

    // Save job
    saveJob(job)

    // Show notification
    showNotification("Calculation completed successfully!", "success")

    // Pass results to parent component
    onCalculationComplete(results, jobId, timestamp, numericInputs)
  }

  const handleClearForm = () => {
    const emptyInputs = {}
    inputFields.forEach((field) => {
      emptyInputs[field.id] = ""
    })
    setInputs(emptyInputs)
    setValidationErrors({})
    showNotification("Form cleared.", "success")
  }

  const handleLoadJob = (job) => {
    if (job && job.inputs) {
      setInputs(job.inputs)
      setShowJobLoadModal(false)
      showNotification(`Job ${job.id} loaded successfully.`, "success")
    }
  }

  return (
    <>
      <div className="calculator-container">
        <form id="calculator-form" className="calculator-form" onSubmit={handleSubmit}>
          <div className="form-section">
            <h2>Input Parameters</h2>
            <div className="form-grid">
              {inputFields.map((field) => (
                <div className="form-group" key={field.id}>
                  <label htmlFor={field.id}>{field.field}</label>
                  <div className={`input-wrapper ${field.unit && field.unit !== "NA" ? "has-unit" : ""}`}>
                    <input
                      type="text"
                      id={field.id}
                      name={field.id}
                      placeholder={`e.g., ${field.example}`}
                      value={inputs[field.id] || ""}
                      onChange={handleInputChange}
                      className={validationErrors[field.id] ? "invalid" : ""}
                      required={field.required}
                    />
                    {field.unit && field.unit !== "NA" && <span className="unit-label">{field.unit}</span>}
                  </div>
                  {validationErrors[field.id] && <div className="error-message">{validationErrors[field.id]}</div>}
                </div>
              ))}
            </div>
          </div>

          <div className="form-actions">
            <button
              type="button"
              id="load-job-btn"
              className="btn btn-secondary"
              onClick={() => setShowJobLoadModal(true)}
            >
              <span className="material-icons">file_upload</span>
              Load from Job
            </button>
          </div>
        </form>
      </div>

      {/* Job Load Modal */}
      <Modal
        id="job-load-modal"
        title="Load Job"
        isActive={showJobLoadModal}
        onClose={() => setShowJobLoadModal(false)}
      >
        <div className="jobs-list" id="modal-jobs-list">
          {jobs.length > 0 ? (
            jobs.map((job) => (
              <div className="job-item" key={job.id}>
                <div className="job-details">
                  <p className="job-id">{job.id}</p>
                  <p className="job-timestamp">{job.timestamp}</p>
                </div>
                <button className="btn btn-primary btn-sm" onClick={() => handleLoadJob(job)}>
                  Load
                </button>
              </div>
            ))
          ) : (
            <p style={{ textAlign: "center" }}>No jobs found.</p>
          )}
        </div>
      </Modal>
    </>
  )
}

export default CalculatorForm
