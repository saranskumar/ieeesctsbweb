const fs = require('fs');
const pdf = require('pdf-parse');

async function parse(file) {
    if (!fs.existsSync(file)) {
        console.log(`File not found: ${file}`);
        return;
    }
    const dataBuffer = fs.readFileSync(file);
    const data = await pdf(dataBuffer);
    console.log(`--- START OF ${file} ---`);
    console.log(data.text);
    console.log(`--- END OF ${file} ---\n\n`);
}

async function main() {
    await parse('../newsletter.pdf');
    await parse('../sb_reports_merged.pdf');
}

main().catch(console.error);
