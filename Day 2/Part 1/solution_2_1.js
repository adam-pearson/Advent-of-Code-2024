const fs = require('fs');

function readReportsFromFile() {
    // Read the file and call the callback with the content
    return fs.readFileSync('../resources/input.txt', 'utf-8');
}

function parseReports(reports) {
    return reports.split('\n').map(levels => levels.split(' ').map(n => parseInt(n)));
}

function checkReport(report) {
    let direction;

    return report.reduce((isSafe, curr, i) => {
        if (i === 0) return true;
        if (isSafe === false || curr === report[i - 1]) return false;

        if (!direction) {
            direction = curr > report[i - 1] ? 1 : -1;
        } else if ((curr > report[i - 1] ? 1 : -1) !== direction) {
            return false;
        }

        if (Math.abs(curr - report[i - 1])  > 3) return false;

        return true;
    }, true)
}

function checkSafenessOfReports(reports) {
    return parseReports(reports).map(report => checkReport(report));
}

function countSafeReports(reportResults) {
    return reportResults.filter(result => result).length;
}

const reports = readReportsFromFile();
console.log(countSafeReports(checkSafenessOfReports(reports)));