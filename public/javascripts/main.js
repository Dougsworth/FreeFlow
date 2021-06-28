const main = async () => {
    try {
        const metrics = await getMockMetrics();

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

const getMockMetrics = async () => {
    return [
        {
          "Date": "Thu Mar 18 2021 20:29:00 GMT-0500 (Eastern Standard Time)",
          "_id": "6053fe5c2870c6506c656710",
          "current": "0.03",
          "voltage": "64",
          "power": "98.9",
          "__v": 0
        },
        {
          "Date": "Thu Mar 18 2021 20:34:12 GMT-0500 (Eastern Standard Time)",
          "_id": "6053ff942870c6506c656711",
          "current": "0.03",
          "voltage": "64",
          "power": "98.9",
          "__v": 0
        },
        {
          "Date": "Thu Mar 18 2021 20:40:26 GMT-0500 (Eastern Standard Time)",
          "_id": "60540116c53af4359cf763e3",
          "current": "0.03",
          "voltage": "64",
          "power": "98.9",
          "__v": 0
        },
        {
          "Date": "Thu Mar 18 2021 20:47:24 GMT-0500 (Eastern Standard Time)",
          "_id": "60540332a348c860904d69e2",
          "current": "2.21",
          "voltage": "4.7",
          "power": "220.27",
          "__v": 0
        },
        {
          "Date": "Thu Mar 18 2021 20:54:56 GMT-0500 (Eastern Standard Time)",
          "_id": "6054047b140a2c33247bc5dc",
          "current": "0.03",
          "voltage": "64",
          "power": "98.9",
          "__v": 0
        },
        {
          "Date": "Thu Mar 18 2021 21:03:50 GMT-0500 (Eastern Standard Time)",
          "_id": "605406868962e414a4af8436",
          "current": "0.03",
          "voltage": "64",
          "power": "98.9",
          "__v": 0
        },
        {
          "Date": "Thu Mar 18 2021 21:04:42 GMT-0500 (Eastern Standard Time)",
          "_id": "605406be163fc5022cd4edb8",
          "current": "0.03",
          "voltage": "64",
          "power": "98.9",
          "__v": 0
        },
        {
          "Date": "Thu Mar 18 2021 22:16:46 GMT-0500 (Eastern Standard Time)",
          "_id": "60541a472be49d5da888d412",
          "current": "45",
          "voltage": "45",
          "power": "45",
          "__v": 0
        },
        {
          "Date": "Thu Mar 18 2021 22:16:46 GMT-0500 (Eastern Standard Time)",
          "_id": "60541af22be49d5da888d413",
          "current": "3200.00",
          "voltage": "0.32",
          "power": "1024.00",
          "__v": 0
        },
        {
          "Date": "Sun Mar 21 2021 14:11:56 GMT-0500 (Eastern Standard Time)",
          "_id": "60579a8252d7d96e5836329b",
          "current": "0.03",
          "voltage": "64",
          "power": "98.9",
          "__v": 0
        },
        {
          "Date": "Sun Mar 21 2021 14:17:09 GMT-0500 (Eastern Standard Time)",
          "_id": "60579c96340c783f40a8118b",
          "current": "-0.30",
          "voltage": "1.03",
          "power": "-0.31",
          "__v": 0
        },
        {
          "Date": "Sun Mar 21 2021 14:17:09 GMT-0500 (Eastern Standard Time)",
          "_id": "60579d0e340c783f40a8118c",
          "current": "3200.00",
          "voltage": "0.32",
          "power": "1024.00",
          "__v": 0
        },
        {
          "Date": "Sun Mar 21 2021 14:17:09 GMT-0500 (Eastern Standard Time)",
          "_id": "60579d47340c783f40a8118d",
          "current": "3200.00",
          "voltage": "0.32",
          "power": "1024.00",
          "__v": 0
        },
        {
          "Date": "Sun Mar 21 2021 14:25:54 GMT-0500 (Eastern Standard Time)",
          "_id": "60579e1b8d9b2e2508cd5c58",
          "current": "3200.00",
          "voltage": "0.32",
          "power": "1024.00",
          "__v": 0
        },
        {
          "Date": "Tue May 25 2021 18:51:39 GMT-0500 (Eastern Standard Time)",
          "_id": "60ad8dc2d539b95e1416d500",
          "current": " NAN",
          "voltage": "0.78",
          "power": " NAN",
          "__v": 0
        },
        {
          "Date": "Tue May 25 2021 18:51:39 GMT-0500 (Eastern Standard Time)",
          "_id": "60ad8dfad539b95e1416d501",
          "current": " NAN",
          "voltage": "0.26",
          "power": " NAN",
          "__v": 0
        },
        {
          "Date": "Tue May 25 2021 19:08:43 GMT-0500 (Eastern Standard Time)",
          "_id": "60ad93224f3fe8596cd0b69b",
          "current": "2.21",
          "voltage": "4.7",
          "power": "220.27",
          "__v": 0
        },
        {
          "Date": "Tue May 25 2021 19:08:43 GMT-0500 (Eastern Standard Time)",
          "_id": "60ad93624f3fe8596cd0b69c",
          "current": "2.21",
          "voltage": "4.7",
          "power": "220.27",
          "__v": 0
        },
        {
          "Date": "Tue May 25 2021 19:08:43 GMT-0500 (Eastern Standard Time)",
          "_id": "60ad93a04f3fe8596cd0b69d",
          "current": "2.21",
          "voltage": "4.7",
          "power": "220.27",
          "__v": 0
        },
        {
          "Date": "Tue May 25 2021 23:13:08 GMT-0500 (Eastern Standard Time)",
          "_id": "60adcc8deffaff7780ddd3da",
          "current": "-0.20",
          "voltage": "1.03",
          "power": "-0.21",
          "__v": 0
        },
        {
          "Date": "Tue May 25 2021 23:13:08 GMT-0500 (Eastern Standard Time)",
          "_id": "60adcdd0effaff7780ddd3db",
          "current": "0.30",
          "voltage": "1.04",
          "power": "0.31",
          "__v": 0
        },
        {
          "Date": "Tue May 25 2021 23:13:08 GMT-0500 (Eastern Standard Time)",
          "_id": "60adce24effaff7780ddd3dc",
          "current": "0.10",
          "voltage": "1.04",
          "power": "0.10",
          "__v": 0
        },
        {
          "Date": "Tue May 25 2021 23:13:08 GMT-0500 (Eastern Standard Time)",
          "_id": "60add0c1effaff7780ddd3dd",
          "current": "0.20",
          "voltage": "0.00",
          "power": "0.00",
          "__v": 0
        },
        {
          "Date": "Tue May 25 2021 23:38:32 GMT-0500 (Eastern Standard Time)",
          "_id": "60add110db089d6d5c45ec3b",
          "current": "0.10",
          "voltage": "0.00",
          "power": "0.00",
          "__v": 0
        },
        {
          "Date": "Tue May 25 2021 23:38:32 GMT-0500 (Eastern Standard Time)",
          "_id": "60add172db089d6d5c45ec3c",
          "current": "0.20",
          "voltage": "0.32",
          "power": "0.06",
          "__v": 0
        },
        {
          "Date": "Tue May 25 2021 23:38:32 GMT-0500 (Eastern Standard Time)",
          "_id": "60add30bdb089d6d5c45ec3d",
          "current": "0.20",
          "voltage": "1.04",
          "power": "0.21",
          "__v": 0
        },
        {
          "Date": "Tue May 25 2021 23:38:32 GMT-0500 (Eastern Standard Time)",
          "_id": "60add52edb089d6d5c45ec3e",
          "current": "0.00",
          "voltage": "1.03",
          "power": "0.00",
          "__v": 0
        },
        {
          "Date": "Fri May 28 2021 14:48:07 GMT-0500 (Eastern Standard Time)",
          "_id": "60b14a202c0637953453e4d5",
          "current": "2.80",
          "voltage": "8.96",
          "power": "25.09",
          "__v": 0
        },
        {
          "Date": "Fri May 28 2021 14:48:07 GMT-0500 (Eastern Standard Time)",
          "_id": "60b14a962c0637953453e4d6",
          "current": "436.60",
          "voltage": "5.20",
          "power": "2268.41",
          "__v": 0
        },
        {
          "Date": "Sun Jun 06 2021 08:27:56 GMT-0500 (Eastern Standard Time)",
          "_id": "60bccef2b5ec5c866c5f299c",
          "current": "2.21",
          "voltage": "4.7",
          "power": "220.27",
          "__v": 0
        },
        {
          "Date": "Fri Jun 11 2021 15:30:56 GMT-0500 (Eastern Standard Time)",
          "_id": "60c3c8792d3bb33b9c41d6c8",
          "current": "0.10",
          "voltage": "0.32",
          "power": "0.03",
          "__v": 0
        },
        {
          "Date": "Sun Jun 20 2021 23:07:46 GMT-0500 (Eastern Standard Time)",
          "_id": "60d010952043d81b50756e1c",
          "current": "0.03",
          "voltage": "64",
          "power": "98.9",
          "__v": 0
        },
        {
          "Date": "Mon Jun 21 2021 08:30:56 GMT-0500 (Eastern Standard Time)",
          "_id": "60d09509f53df47d1cff1aa8",
          "current": "-INF",
          "voltage": "0.65",
          "power": "-INF",
          "__v": 0
        },
        {
          "Date": "Mon Jun 21 2021 08:30:56 GMT-0500 (Eastern Standard Time)",
          "_id": "60d0962ff53df47d1cff1aa9",
          "current": "-INF",
          "voltage": "0.61",
          "power": "-INF",
          "__v": 0
        },
        {
          "Date": "Mon Jun 21 2021 08:30:56 GMT-0500 (Eastern Standard Time)",
          "_id": "60d09642f53df47d1cff1aaa",
          "current": "-INF",
          "voltage": "0.61",
          "power": "-INF",
          "__v": 0
        },
        {
          "Date": "Mon Jun 21 2021 08:30:56 GMT-0500 (Eastern Standard Time)",
          "_id": "60d0973bf53df47d1cff1aab",
          "current": " INF",
          "voltage": "0.61",
          "power": " INF",
          "__v": 0
        },
        {
          "Date": "Mon Jun 21 2021 08:30:56 GMT-0500 (Eastern Standard Time)",
          "_id": "60d0974df53df47d1cff1aac",
          "current": " INF",
          "voltage": "0.61",
          "power": " INF",
          "__v": 0
        },
        {
          "Date": "Mon Jun 21 2021 08:30:56 GMT-0500 (Eastern Standard Time)",
          "_id": "60d0980cf53df47d1cff1aad",
          "current": "-INF",
          "voltage": "0.61",
          "power": "-INF",
          "__v": 0
        },
        {
          "Date": "Mon Jun 21 2021 08:45:56 GMT-0500 (Eastern Standard Time)",
          "_id": "60d098268155b88ec8f4f713",
          "current": "-INF",
          "voltage": "0.61",
          "power": "-INF",
          "__v": 0
        },
        {
          "Date": "Mon Jun 21 2021 08:45:56 GMT-0500 (Eastern Standard Time)",
          "_id": "60d098cf8155b88ec8f4f714",
          "current": " INF",
          "voltage": "0.61",
          "power": " INF",
          "__v": 0
        },
        {
          "Date": "Mon Jun 21 2021 08:45:56 GMT-0500 (Eastern Standard Time)",
          "_id": "60d099038155b88ec8f4f715",
          "current": "-INF",
          "voltage": "0.61",
          "power": "-INF",
          "__v": 0
        },
        {
          "Date": "Mon Jun 21 2021 08:50:13 GMT-0500 (Eastern Standard Time)",
          "_id": "60d0991e88839065f0b15181",
          "current": "-INF",
          "voltage": "0.61",
          "power": "-INF",
          "__v": 0
        },
        {
          "Date": "Mon Jun 21 2021 08:50:13 GMT-0500 (Eastern Standard Time)",
          "_id": "60d099cd88839065f0b15182",
          "current": "-INF",
          "voltage": "0.76",
          "power": "-INF",
          "__v": 0
        },
        {
          "Date": "Mon Jun 21 2021 08:50:13 GMT-0500 (Eastern Standard Time)",
          "_id": "60d09c8588839065f0b15183",
          "current": " INF",
          "voltage": "0.63",
          "power": " INF",
          "__v": 0
        },
        {
          "Date": "Mon Jun 21 2021 08:50:13 GMT-0500 (Eastern Standard Time)",
          "_id": "60d09c9588839065f0b15184",
          "current": " INF",
          "voltage": "0.63",
          "power": " INF",
          "__v": 0
        },
        {
          "Date": "Mon Jun 21 2021 08:50:13 GMT-0500 (Eastern Standard Time)",
          "_id": "60d09da888839065f0b15185",
          "current": " INF",
          "voltage": "0.63",
          "power": " INF",
          "__v": 0
        },
        {
          "Date": "Mon Jun 21 2021 08:50:13 GMT-0500 (Eastern Standard Time)",
          "_id": "60d09db888839065f0b15186",
          "current": " INF",
          "voltage": "0.63",
          "power": " INF",
          "__v": 0
        },
        {
          "Date": "Mon Jun 21 2021 09:12:16 GMT-0500 (Eastern Standard Time)",
          "_id": "60d09f095c22fe0f24781efd",
          "current": " INF",
          "voltage": "0.65",
          "power": " INF",
          "__v": 0
        },
    ]
}

main()