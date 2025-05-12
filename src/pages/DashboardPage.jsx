import { useState } from "react"
import Sidebar from "../components/Sidebar"
import CalculatorForm from "../components/CalculatorForm"
import ResultsPage from "../components/ResultsPage"
import JobsPage from "../components/JobsPage"
import Notification from "../components/Notification"
import { useNotification } from "../context/NotificationContext"

const DashboardPage = () => {
  const [activePage, setActivePage] = useState("calculator")
  const [showResults, setShowResults] = useState(false)
  const [calculationResults, setCalculationResults] = useState(null)
  const [jobId, setJobId] = useState("")
  const [timestamp, setTimestamp] = useState("")
  const [inputs, setInputs] = useState({})
  const { showNotification } = useNotification()

  const handlePageChange = (page) => {
    setActivePage(page)
    setShowResults(false)
  }

  const handleCalculationComplete = (results, id, time, inputValues) => {
    setCalculationResults(results)
    setJobId(id)
    setTimestamp(time)
    setInputs(inputValues)
    setShowResults(true)
  }

  const handleBackToCalculator = () => {
    setShowResults(false)
  }

  const handleNewCalculation = () => {
    setShowResults(false)
  }

  const handleViewJob = (job) => {
    setCalculationResults(job.results)
    setJobId(job.id)
    setTimestamp(job.timestamp)
    setInputs(job.inputs)
    setShowResults(true)
    setActivePage("calculator")
  }

  const handleLoadJob = (job) => {
    setActivePage("calculator")
    setShowResults(false)
    showNotification(`Job ${job.id} loaded successfully.`, "success")
  }

  const getPageTitle = () => {
    switch (activePage) {
      case "calculator":
        return "Endurance Thermal Calculator"
      case "jobs":
        return "Job History"
      default:
        return "Endurance Thermal Calculator"
    }
  }

  return (
    <div className="app-container">
      <Sidebar activePage={activePage} onPageChange={handlePageChange} />

      <main className="main-content">
        <header className="main-header">
          <h1 id="page-title">{getPageTitle()}</h1>
          <div
            className="header-actions"
            id="calculator-actions"
            style={{ display: activePage === "calculator" && !showResults ? "flex" : "none" }}
          >
            <button id="clear-form-btn" className="btn btn-text">
              <i className="fas fa-trash-alt"></i>
              Clear Form
            </button>
            <button id="calculate-btn" className="btn btn-primary" form="calculator-form" type="submit">
              <i className="fas fa-play"></i>
              Calculate
            </button>
          </div>
        </header>

        <div className="content-container">
          {/* Calculator Page */}
          <div id="calculator-page" className={`page ${activePage === "calculator" && !showResults ? "active" : ""}`}>
            <CalculatorForm onCalculationComplete={handleCalculationComplete} />
          </div>

          {/* Results Page */}
          <div id="results-page" className={`page ${activePage === "calculator" && showResults ? "active" : ""}`}>
            {calculationResults && (
              <ResultsPage
                results={calculationResults}
                jobId={jobId}
                timestamp={timestamp}
                inputs={inputs}
                onBackToCalculator={handleBackToCalculator}
                onNewCalculation={handleNewCalculation}
              />
            )}
          </div>

          {/* Jobs Page */}
          <div id="jobs-page" className={`page ${activePage === "jobs" ? "active" : ""}`}>
            <JobsPage onViewJob={handleViewJob} onLoadJob={handleLoadJob} />
          </div>
        </div>
      </main>

      <Notification />
    </div>
  )
}

export default DashboardPage
