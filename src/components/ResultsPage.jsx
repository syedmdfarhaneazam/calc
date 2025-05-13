import { useState, useEffect } from "react";
import { formulas } from "../utils/calculatorUtils";
import Modal from "./Modal";
import html2pdf from "html2pdf.js";

const ResultsPage = ({
    results,
    jobId,
    timestamp,
    inputs,
    onBackToCalculator,
    onNewCalculation,
}) => {
    const [showFormulaModal, setShowFormulaModal] = useState(false);
    const [formulaInfo, setFormulaInfo] = useState({
        title: "",
        description: "",
    });
    const [inputSummaryCollapsed, setInputSummaryCollapsed] = useState(true);
    const [outputSummaryCollapsed, setOutputSummaryCollapsed] = useState(false);

    // Handle formula modal display
    const showFormulaDetails = (formulaId) => {
        if (formulas[formulaId]) {
            setFormulaInfo(formulas[formulaId]);
            setShowFormulaModal(true);
        }
    };

    // Generate PDF
    const generatePDF = () => {
        const element = document.getElementById("results-content");
        const opt = {
            margin: 0,
            filename: "thermal-calculation-report.pdf",
            image: { type: "jpeg", quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
        };

        html2pdf().set(opt).from(element).save();
    };

    // Use useEffect to monitor state changes
    useEffect(() => {
        // This ensures state changes for collapsed states don't interfere
        // Add side effects here if needed (e.g., logging, analytics)
    }, [inputSummaryCollapsed, outputSummaryCollapsed]);

    return (
        <div id="results-page" className="results-container">
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
                    <button
                        id="back-to-calculator"
                        className="btn btn-text"
                        onClick={onBackToCalculator}
                    >
                        <i className="fas fa-arrow-left"></i>
                        Back to Calculator
                    </button>
                    <button
                        id="print-results"
                        className="btn btn-primary"
                        onClick={generatePDF}
                    >
                        <i className="fas fa-file-pdf"></i>
                        Generate PDF
                    </button>
                </div>
            </div>

            <div className="results-content" id="results-content">
                <div
                    className={`input-summary-section ${inputSummaryCollapsed ? "collapsed" : ""}`}
                >
                    <div
                        className="section-header"
                        onClick={() =>
                            setInputSummaryCollapsed(!inputSummaryCollapsed)
                        }
                    >
                        <h3>Input Parameters</h3>
                        <span className="material-icons">
                            <i className="fa-solid fa-arrow-down"></i>
                        </span>
                    </div>
                    <div id="input-summary" className="section-content">
                        {Object.entries(inputs).map(([key, value]) => {
                            const field = formulas[key] ? formulas[key] : null;
                            return (
                                <div className="input-summary-row" key={key}>
                                    <span className="input-label">{key}:</span>
                                    <span className="input-value">{value}</span>
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div
                    className={`output-summary-section ${outputSummaryCollapsed ? "collapsed" : ""}`}
                >
                    <div
                        className="section-header"
                        onClick={() =>
                            setOutputSummaryCollapsed(!outputSummaryCollapsed)
                        }
                    >
                        <h3>Output Parameters</h3>
                        <span className="material-icons">
                            <i className="fa-solid fa-arrow-down"></i>
                        </span>
                    </div>
                    <div className="section-content results-tables">
                        <div className="result-table">
                            <h3>
                                Temperature damper after 1 minute without
                                external air flow
                            </h3>
                            <div className="result-cards">
                                <div className="result-card">
                                    <span className="result-label">
                                        Work Done:
                                    </span>
                                    <span className="result-value">
                                        {results.workDone} J
                                    </span>
                                </div>
                                <div className="result-card">
                                    <span className="result-label">
                                        Time Taken for one cycle:
                                    </span>
                                    <span className="result-value">
                                        {results.timeTaken} Sec
                                    </span>
                                </div>
                                <div className="result-card">
                                    <span className="result-label">
                                        Heat generation per second:
                                    </span>
                                    <span className="result-value">
                                        {results.heatGeneration} W
                                    </span>
                                </div>
                                <div className="result-card">
                                    <span className="result-label">
                                        Mass of oil:
                                    </span>
                                    <span className="result-value">
                                        {results.massOfOil} kg
                                    </span>
                                </div>
                                <div className="result-card">
                                    <span className="result-label">
                                        Temperature generation inside the
                                        damper:
                                    </span>
                                    <span className="result-value">
                                        {results.temperatureGeneration} °C
                                    </span>
                                </div>
                                <div className="result-card">
                                    <span className="result-label">
                                        Temperature inside damper after 1
                                        minute:
                                    </span>
                                    <span className="result-value">
                                        {results.temperatureInside} °C
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="result-table">
                            <h3>
                                Temperature outside damper due to External Air
                                Flow
                            </h3>
                            <div className="result-cards">
                                <div className="result-card">
                                    <span className="result-label">
                                        Air flow to velocity:
                                    </span>
                                    <span className="result-value">
                                        {results.airFlowVelocity} m/sec
                                    </span>
                                </div>
                                <div className="result-card">
                                    <span className="result-label">
                                        Convective heat transfer h:
                                    </span>
                                    <span className="result-value">
                                        {results.convectiveHeatTransfer} W/m²·K
                                    </span>
                                </div>
                                <div className="result-card">
                                    <span className="result-label">
                                        Q loss:
                                    </span>
                                    <span className="result-value">
                                        {results.qLoss} W
                                    </span>
                                </div>
                                <div className="result-card">
                                    <span className="result-label">
                                        Temperature difference:
                                    </span>
                                    <span className="result-value">
                                        {results.temperatureDifference} °C
                                    </span>
                                </div>
                                <div className="result-card">
                                    <span className="result-label">
                                        Final Temperature Outside cylinder:
                                    </span>
                                    <span className="result-value">
                                        {results.finalTemperature} °C
                                    </span>
                                </div>
                            </div>
                        </div>
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

            <Modal
                id="formula-modal"
                title={formulaInfo.title}
                isActive={showFormulaModal}
                onClose={() => setShowFormulaModal(false)}
            >
                <p id="formula-description">{formulaInfo.description}</p>
            </Modal>
        </div>
    );
};

export default ResultsPage;
