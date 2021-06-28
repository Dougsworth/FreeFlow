const main = async () => {
    try {
        const metrics = await getMetrics();

        // Create arrays of each metric value by field
        const dateLabels = metrics.map(metric => formatDateAMPM(new Date(metric.Date)))
        const voltages = metrics.map(metric => metric.voltage);
        const currents = metrics.map(metric => metric.current);
        const powers = metrics.map(metric => metric.power);

        // Setup chart for voltage vs time
        const voltageConfig = createChartConfig("Voltage", dateLabels, voltages, "#FFD046");
        const voltageChart = new Chart(document.getElementById("voltage-chart"), voltageConfig);

        // Setup chart for current vs time
        const currentConfig = createChartConfig("Current", dateLabels, currents);
        const currentChart = new Chart(document.getElementById("current-chart"), currentConfig);

        // Setup chart for power vs time
        const powerConfig = createChartConfig("Power", dateLabels, powers, '#E36390');
        const powerChart = new Chart(document.getElementById("power-chart"), powerConfig);

    }
    catch (err) {
        console.error(`Something went wrong when fetching data: ${err}`);
    }
}


/**
 * Creates configuration for a chart to be displayed by the chart.js library
 * @param {String} title 
 * @param {any[]} xData 
 * @param {any[]} yData 
 * @param {*} baseConfig 
 * @returns 
 */
const createChartConfig = (title, xData, yData, color = "#8ef9f3", baseConfig = {type: "line", options: {}}) => {
    const data = {
        labels: xData,
        datasets: [
            {
                label: title,
                backgroundColor: color,
                borderColor: color,
                data: yData
            }
        ]
    }

    const config = {
        ...baseConfig,
        data
    }

    return config
}

/**
 * Fetches the metrics that were loaded into the database
 * @returns a Promise containing an array of EnergyMetrics
 */
const getMetrics = async () => {
    return fetch("/datas")
        .then(res => {
            return res
                .json()
                .then(data => data)
        })
        .catch(err => err)
}

const formatDateAMPM = (date) => {
    let hours = date.getHours();
    let minutes = date.getMinutes();

    const ampm = hours >= 12 ? 'pm' : 'am';

    hours = hours % 12;
    hours = hours ? hours : 12;

    minutes = minutes < 10 ? `0${minutes}` : minutes;

    return `${hours}:${minutes} ${ampm}`;
}

main()