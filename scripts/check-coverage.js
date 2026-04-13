#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');

console.log('Running coverage check...');

try {
  // Run tests with coverage
  const output = execSync('npx nyc --reporter=json npm test', { encoding: 'utf8' });

  // Parse coverage JSON
  const coverage = JSON.parse(fs.readFileSync('.nyc_output/*.json', 'utf8'));
  const files = Object.values(coverage);

  // Calculate overall coverage
  let totalStatements = 0;
  let coveredStatements = 0;
  let totalBranches = 0;
  let coveredBranches = 0;
  let totalFunctions = 0;
  let coveredFunctions = 0;
  let totalLines = 0;
  let coveredLines = 0;

  files.forEach(file => {
    totalStatements += file.s ? Object.keys(file.s).length : 0;
    coveredStatements += file.s ? Object.values(file.s).filter(v => v > 0).length : 0;
    totalBranches += file.b ? Object.values(file.b).reduce((sum, branches) => sum + branches.length, 0) : 0;
    coveredBranches += file.b ? Object.values(file.b).reduce((sum, branches) => sum + branches.filter(v => v > 0).length, 0) : 0;
    totalFunctions += file.f ? Object.keys(file.f).length : 0;
    coveredFunctions += file.f ? Object.values(file.f).filter(v => v > 0).length : 0;
    totalLines += file.l ? Object.keys(file.l).length : 0;
    coveredLines += file.l ? Object.values(file.l).filter(v => v > 0).length : 0;
  });

  const stmtCoverage = totalStatements > 0 ? ((coveredStatements / totalStatements) * 100).toFixed(2) : 0;
  const branchCoverage = totalBranches > 0 ? ((coveredBranches / totalBranches) * 100).toFixed(2) : 0;
  const funcCoverage = totalFunctions > 0 ? ((coveredFunctions / totalFunctions) * 100).toFixed(2) : 0;
  const lineCoverage = totalLines > 0 ? ((coveredLines / totalLines) * 100).toFixed(2) : 0;

  console.log(`Coverage Report:`);
  console.log(`Statements: ${stmtCoverage}% (${coveredStatements}/${totalStatements})`);
  console.log(`Branches: ${branchCoverage}% (${coveredBranches}/${totalBranches})`);
  console.log(`Functions: ${funcCoverage}% (${coveredFunctions}/${totalFunctions})`);
  console.log(`Lines: ${lineCoverage}% (${coveredLines}/${totalLines})`);

  // Send Telegram notification
  const message = `📊 node-scanf Coverage Report (improve-test-coverage branch)\n\n` +
    `Statements: ${stmtCoverage}% (${coveredStatements}/${totalStatements})\n` +
    `Branches: ${branchCoverage}% (${coveredBranches}/${totalBranches})\n` +
    `Functions: ${funcCoverage}% (${coveredFunctions}/${totalFunctions})\n` +
    `Lines: ${lineCoverage}% (${coveredLines}/${totalLines})`;

  console.log('\nSending notification...');
  console.log(message);

} catch (error) {
  console.error('Error running coverage check:', error.message);
  process.exit(1);
}
