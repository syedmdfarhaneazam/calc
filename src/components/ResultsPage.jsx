"use client"

import { useState } from "react"
import { formulas } from "../utils/calculatorUtils"
import Modal from "./Modal"
import html2pdf from "html2pdf.js"

const ResultsPage = ({ results, jobId, timestamp, inputs, onBackToCalculator, onNewCalculation }) => {
  const [showFormulaModal, setShowFormulaModal] = useState(false)
  const [formulaInfo, setFormulaInfo] = useState({ title: "", description: "" })
  const [inputSummaryCollapsed, setInputSummaryCollapsed] = useState(false)

  const showFormulaDetails = (formulaId) => {
    if (formulas[formulaId]) {
      setFormulaInfo(formulas[formulaId])
      setShowFormulaModal(true)
    }
  }

  const generatePDF = () => {
    const element = document.getElementById("results-page")
    const opt = {
      margin: 1,
      filename: "thermal-calculation-report.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
    }

    html2pdf().set(opt).from(element).save()
  }

  return (
    <div className="results-container">
      <div className="results-header">
        <div className="job-info">
          <h2>
            Job: <span id="job-id">{jobId}</span>
          </h2>
          <p>
            Created: <span id="job-timestamp">{timestamp}</span>
          </p>
        </div>
        <div className="action-buttons">
          <button id="back-to-calculator" className="btn btn-text" onClick={onBackToCalculator}>
            <span className="material-icons">arrow_back</span>
            Back to Calculator
          </button>
          <button id="new-calculation" className="btn btn-secondary" onClick={onNewCalculation}>
            <span className="material-icons">add</span>
            New Calculation
          </button>
          <button id="print-results" className="btn btn-primary" onClick={generatePDF}>
            <span className="material-icons">picture_as_pdf</span>
            Generate PDF
          </button>
        </div>
      </div>

      <div className="results-content">
        <div className={`input-summary-section ${inputSummaryCollapsed ? "collapsed" : ""}`}>
          <div className="section-header" onClick={() => setInputSummaryCollapsed(!inputSummaryCollapsed)}>
            <h3>Input Parameters</h3>
            <span className="material-icons">expand_more</span>
          </div>
          <div id="input-summary" className="section-content">
            {Object.entries(inputs).map(([key, value]) => {
              const field = formulas[key] ? formulas[key] : null
              return (
                <div className="input-summary-row" key={key}>
                  <span className="input-label">{key}:</span>
                  <span className="input-value">{value}</span>
                </div>
              )
            })}
          </div>
        </div>

        <div className="results-tables">
          <div className="result-table">
            <h3>Temperature damper after 1 minute without external air flow</h3>
            <table id="result-table-1">
              <thead>
                <tr>
                  <th>Parameter</th>
                  <th>Value</th>
                  <th>Unit</th>
                  <th>Info</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Work Done</td>
                  <td>{results.workDone}</td>
                  <td>J</td>
                  <td>
                    <span className="material-icons info-icon" onClick={() => showFormulaDetails("workDone")}>
                      info
                    </span>
                  </td>
                </tr>
                <tr>
                  <td>Calculate Time Taken for one cycle</td>
                  <td>{results.timeTaken}</td>
                  <td>Sec</td>
                  <td>
                    <span className="material-icons info-icon" onClick={() => showFormulaDetails("timeTaken")}>
                      info
                    </span>
                  </td>
                </tr>
                <tr>
                  <td>Calculate heat generation per second</td>
                  <td>{results.heatGeneration}</td>
                  <td>W</td>
                  <td>
                    <span className="material-icons info-icon" onClick={() => showFormulaDetails("heatGeneration")}>
                      info
                    </span>
                  </td>
                </tr>
                <tr>
                  <td>Mass of oil</td>
                  <td>{results.massOfOil}</td>
                  <td>kg</td>
                  <td>
                    <span className="material-icons info-icon" onClick={() => showFormulaDetails("massOfOil")}>
                      info
                    </span>
                  </td>
                </tr>
                <tr>
                  <td>Calc. temperature generation inside the damper</td>
                  <td>{results.temperatureGeneration}</td>
                  <td>°C</td>
                  <td>
                    <span
                      className="material-icons info-icon"
                      onClick={() => showFormulaDetails("temperatureGeneration")}
                    >
                      info
                    </span>
                  </td>
                </tr>
                <tr>
                  <td>Temperature inside damper after 1 minute</td>
                  <td>{results.temperatureInside}</td>
                  <td>°C</td>
                  <td>
                    <span className="material-icons info-icon" onClick={() => showFormulaDetails("temperatureInside")}>
                      info
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="result-table">
            <h3>Temperature outside damper due to External Air Flow</h3>
            <table id="result-table-2">
              <thead>
                <tr>
                  <th>Parameter</th>
                  <th>Value</th>
                  <th>Unit</th>
                  <th>Info</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Air flow to velocity</td>
                  <td>{results.airFlowVelocity}</td>
                  <td>m/sec</td>
                  <td>
                    <span className="material-icons info-icon" onClick={() => showFormulaDetails("airFlowVelocity")}>
                      info
                    </span>
                  </td>
                </tr>
                <tr>
                  <td>Convective heat transfer h</td>
                  <td>{results.convectiveHeatTransfer}</td>
                  <td>W/m²·K</td>
                  <td>
                    <span
                      className="material-icons info-icon"
                      onClick={() => showFormulaDetails("convectiveHeatTransfer")}
                    >
                      info
                    </span>
                  </td>
                </tr>
                <tr>
                  <td>Q loss</td>
                  <td>{results.qLoss}</td>
                  <td>W</td>
                  <td>
                    <span className="material-icons info-icon" onClick={() => showFormulaDetails("qLoss")}>
                      info
                    </span>
                  </td>
                </tr>
                <tr>
                  <td>Temperature difference</td>
                  <td>{results.temperatureDifference}</td>
                  <td>°C</td>
                  <td>
                    <span
                      className="material-icons info-icon"
                      onClick={() => showFormulaDetails("temperatureDifference")}
                    >
                      info
                    </span>
                  </td>
                </tr>
                <tr>
                  <td>Final Temperature Outside cylinder</td>
                  <td>{results.finalTemperature}</td>
                  <td>°C</td>
                  <td>
                    <span className="material-icons info-icon" onClick={() => showFormulaDetails("finalTemperature")}>
                      info
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="report-images">
          <h3>Report Images</h3>
          <div className="image-gallery">
            <div className="image-placeholder">
              <span className="material-icons">image</span>
              <p>Thermal Image 1</p>
            </div>
            <div className="image-placeholder">
              <span className="material-icons">image</span>
              <p>Thermal Image 2</p>
            </div>
            <div className="image-placeholder">
              <span className="material-icons">image</span>
              <p>Chart</p>
            </div>
          </div>
        </div>
      </div>

      {/* Formula Modal */}
      <Modal
        id="formula-modal"
        title={formulaInfo.title}
        isActive={showFormulaModal}
        onClose={() => setShowFormulaModal(false)}
      >
        <p id="formula-description">{formulaInfo.description}</p>
      </Modal>
    </div>
  )
}

export default ResultsPage
