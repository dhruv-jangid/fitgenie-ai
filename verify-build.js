/**
 * Build verification script for FitGenie AI.
 * Run using 'node verify-build.js' to validate file structural integrity.
 */

const fs = require('fs');
const path = require('path');

const requiredFiles = ['index.html', 'style.css', 'app.js'];
let errors = 0;

console.log('--- FITGENIE BUILD VALIDATION ---');

// Check file existence
requiredFiles.forEach(file => {
  const filePath = path.join(__dirname, file);
  if (fs.existsSync(filePath)) {
    const stats = fs.statSync(filePath);
    console.log(`✓ File [${file}] exists - Size: ${stats.size} bytes`);
  } else {
    console.error(`✗ ERROR: File [${file}] is missing!`);
    errors++;
  }
});

if (errors > 0) {
  process.exit(1);
}

// Validate HTML Tag boundaries & CDNs
const htmlContent = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');

const expectedCDNs = [
  'unpkg.com/lucide',
  'cdn.jsdelivr.net/npm/chart.js',
  'cdn.jsdelivr.net/npm/canvas-confetti'
];

expectedCDNs.forEach(cdn => {
  if (htmlContent.includes(cdn)) {
    console.log(`✓ HTML contains linked dependency: ${cdn}`);
  } else {
    console.error(`✗ WARNING: Linked dependency [${cdn}] is missing from index.html!`);
  }
});

// Simple HTML balance checker
const tags = ['html', 'head', 'body', 'nav', 'main', 'aside'];
tags.forEach(tag => {
  const openCount = (htmlContent.match(new RegExp(`<${tag}[>\\s]`, 'g')) || []).length;
  const closeCount = (htmlContent.match(new RegExp(`</${tag}>`, 'g')) || []).length;
  if (openCount === closeCount) {
    console.log(`✓ Balanced tag check for <${tag}>: Found ${openCount} open and close tags.`);
  } else {
    console.warn(`✗ WARNING: Unbalanced tag count for <${tag}>: Found ${openCount} opens but ${closeCount} closes.`);
  }
});

console.log('\nValidation Complete: 0 critical errors found.');
process.exit(0);
