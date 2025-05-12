import { round } from "./sessionUtils"


export const calculate = (inputs) => {
  const workDone = (inputs.reboundDamping + inputs.compressionDamping) * inputs.totalStrokeTravel
  const timeTaken = inputs.totalStrokeTravel / inputs.velocity
  const heatGeneration = workDone / timeTaken
  const massOfOil = inputs.densityOfOil * inputs.oilQuantity
  const temperatureGeneration = heatGeneration / (massOfOil * inputs.specificHeatCapacityOfOil)
  const temperatureInside = temperatureGeneration * inputs.totalTime

  const airFlowVelocity = inputs.airFlowRate / inputs.cylinderSurfaceArea
  const convectiveHeatTransfer = 10 + 5 * airFlowVelocity
  const qLoss = convectiveHeatTransfer * inputs.cylinderSurfaceArea * temperatureInside
  const temperatureDifference = (qLoss * 60) / (inputs.massFlowRate * inputs.specificHeatCapacityOfOil)
  const finalTemperature = temperatureInside - temperatureDifference

  return {
    workDone: round(workDone, 6),
    timeTaken: round(timeTaken, 6),
    heatGeneration: round(heatGeneration, 6),
    massOfOil: round(massOfOil, 6),
    temperatureGeneration: round(temperatureGeneration, 6),
    temperatureInside: round(temperatureInside, 6),

    airFlowVelocity: round(airFlowVelocity, 6),
    convectiveHeatTransfer: round(convectiveHeatTransfer, 6),
    qLoss: round(qLoss, 6),
    temperatureDifference: round(temperatureDifference, 6),
    finalTemperature: round(finalTemperature, 6),
  }
}

export const inputFields = [
  {
    id: "airFlowRate",
    field: "Air Flow rate specified by customer",
    unit: "m³/s",
    datatype: "float",
    example: 0.29,
    required: true,
  },
  {
    id: "reboundDamping",
    field: "Rebound damping",
    unit: "N",
    datatype: "integer",
    example: 5411,
    required: true,
  },
  {
    id: "compressionDamping",
    field: "Compression damping",
    unit: "N",
    datatype: "integer",
    example: 1256,
    required: true,
  },
  {
    id: "totalStrokeTravel",
    field: "Total stroke travel",
    unit: "m",
    datatype: "float",
    example: 0.03,
    required: true,
  },
  {
    id: "velocity",
    field: "Velocity",
    unit: "m/s",
    datatype: "float",
    example: 0.3,
    required: true,
  },
  {
    id: "densityOfOil",
    field: "Density of oil",
    unit: "kg/m³",
    datatype: "integer",
    example: 920,
    required: true,
  },
  {
    id: "oilQuantity",
    field: "Oil quantity",
    unit: "m³",
    datatype: "float",
    example: 0.000081,
    required: true,
  },
  {
    id: "specificHeatCapacityOfOil",
    field: "Specific heat capacity of oil",
    unit: "J/kg·°C",
    datatype: "float",
    example: 6368.1,
    required: true,
  },
  {
    id: "damperEffectiveArea",
    field: "Damper (effective area for air flow)",
    unit: "m²",
    datatype: "float",
    example: 0.0145,
    required: true,
  },
  {
    id: "damperLength",
    field: "Damper length",
    unit: "m",
    datatype: "float",
    example: 0.357,
    required: true,
  },
  {
    id: "totalTime",
    field: "Total time",
    unit: "s",
    datatype: "integer",
    example: 60,
    required: true,
  },
  {
    id: "convectiveHeatTransferCoefficient",
    field: "Convective heat transfer coefficient (h)",
    unit: "W/m²·K",
    datatype: "integer",
    example: 1000,
    required: true,
  },
  {
    id: "effectiveDamperSurfaceArea",
    field: "Effective damper surface area",
    unit: "m²",
    datatype: "float",
    example: 0.016,
    required: true,
  },
  {
    id: "ambientTemperature",
    field: "Ambient temperature",
    unit: "°C",
    datatype: "integer",
    example: 23,
    required: true,
  },
  {
    id: "specificHeatCapacityOfAir",
    field: "Specific heat capacity of air",
    unit: "J/kg°C",
    datatype: "integer",
    example: 1005,
    required: true,
  },
  {
    id: "cylinderSurfaceArea",
    field: "Cylinder surface area of outer tube",
    unit: "m²",
    datatype: "float",
    example: 0.036,
    required: true,
  },
  {
    id: "massFlowRate",
    field: "Mass flow rate",
    unit: "NA",
    datatype: "float",
    example: 0.2,
    required: true,
  },
]

// Formula descriptions for each output field
export const formulas = {
  // Results table 1
  workDone: {
    title: "Work Done",
    description:
      "The work done by the damper is calculated as the sum of rebound damping and compression damping, multiplied by the total stroke travel: (Rebound damping + Compression damping) * Total stroke travel",
  },
  timeTaken: {
    title: "Time Taken for one cycle",
    description:
      "The time taken for one cycle is calculated by dividing the total stroke travel by the velocity: Total stroke travel / Velocity",
  },
  heatGeneration: {
    title: "Heat Generation per Second",
    description:
      "The heat generation per second is calculated by dividing the work done by the time taken for one cycle: Work Done / Time Taken for one cycle",
  },
  massOfOil: {
    title: "Mass of Oil",
    description:
      "The mass of oil is calculated by multiplying the density of oil by the oil quantity: Density of oil * Oil quantity",
  },
  temperatureGeneration: {
    title: "Temperature Generation Inside the Damper",
    description:
      "The temperature generation inside the damper is calculated by dividing the heat generation per second by the product of the mass of oil and the specific heat capacity of oil: Heat Generation per Second / (Mass of Oil * Specific Heat Capacity of Oil)",
  },
  temperatureInside: {
    title: "Temperature Inside Damper After 1 Minute",
    description:
      "The temperature inside the damper after 1 minute is calculated by multiplying the temperature generation inside the damper by the total time: Temperature Generation Inside the Damper * Total Time",
  },

  // Results table 2
  airFlowVelocity: {
    title: "Air Flow to Velocity",
    description:
      "The air flow to velocity is calculated by dividing the air flow rate specified by the customer by the cylinder surface area of the outer tube: Air Flow Rate / Cylinder Surface Area of Outer Tube",
  },
  convectiveHeatTransfer: {
    title: "Convective Heat Transfer h",
    description: "The convective heat transfer coefficient is calculated as: 10 + 5 * Air Flow to Velocity",
  },
  qLoss: {
    title: "Q Loss",
    description:
      "The heat loss is calculated by multiplying the convective heat transfer coefficient, the cylinder surface area of the outer tube, and the temperature outside the damper after 1 minute: Convective Heat Transfer h * Cylinder Surface Area of Outer Tube * Temperature Outside Damper After 1 Minute",
  },
  temperatureDifference: {
    title: "Temperature Difference",
    description:
      "The temperature difference is calculated as: Q Loss * 60 / (Mass Flow Rate * Specific Heat Capacity of Oil)",
  },
  finalTemperature: {
    title: "Final Temperature Outside Cylinder",
    description:
      "The final temperature outside the cylinder is calculated by subtracting the temperature difference from the temperature outside the damper after 1 minute: Temperature Outside Damper After 1 Minute - Temperature Difference",
  },
}
