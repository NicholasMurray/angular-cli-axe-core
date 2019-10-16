import { AppPage } from './app.po';
import { browser, logging } from 'protractor';
import axe from 'axe-webdriverjs';
import { resolve } from 'path';

function logAxeViolations(violations) {

  let violationsLogOutput = '\n';

  if (violations.length > 0) {
    violationsLogOutput = violationsLogOutput + '\n';
    violationsLogOutput = violationsLogOutput + '\n';
    violationsLogOutput = violationsLogOutput + '-------------- AXE Violations Start ------------------------' + '\n';
    violations.forEach((violation) => {
      violationsLogOutput = violationsLogOutput + '\n' + 'AXE Violation' + '\n';
      violationsLogOutput = violationsLogOutput + 'Type: ' + violation.id + '\n';
      violationsLogOutput = violationsLogOutput + 'Impact: ' + violation.impact + '\n';
      violationsLogOutput = violationsLogOutput + 'Description: ' + violation.description + '\n';
      violationsLogOutput = violationsLogOutput + 'Help URL: ' + violation.helpUrl + '\n';
      violationsLogOutput = violationsLogOutput + 'WCAG Overview: ' + 'https://www.w3.org/WAI/WCAG21/Understanding/' + '\n';
      violationsLogOutput = violationsLogOutput + 'WCAG Tutorials: ' + 'https://www.w3.org/WAI/tutorials/' + '\n';
    });
    violationsLogOutput = violationsLogOutput + '\n' + '-------------- AXE Violations End --------------------------' + '\n';
  }

  console.log('\x1b[31m', violationsLogOutput);
  console.log('\x1b[37m', '\n');
}

const analyzeAccessibility = () => 
  new Promise(resolve => {
    axe(browser.driver).analyze(results => resolve(results));
  }); 

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getTitleText()).toEqual('test-app app is running!');
  });

  it('should contain no AXE violations', async () => {
    page.navigateTo();
    const results: any = await analyzeAccessibility();

    expect(results.violations.length).toBe(0);
    if (results.violations.length > 0) {
      logAxeViolations(results.violations);
    }

  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
