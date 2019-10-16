import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import * as axe from 'axe-core';

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

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'test-app'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('test-app');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('.content span').textContent).toContain('test-app app is running!');
  });

  it('should contain no AXE violations', (done) => {
    const fixture = TestBed.createComponent(AppComponent);
    const contentElement: HTMLElement = fixture.nativeElement;
    const content = contentElement.querySelector('.content');
    axe.run(content, (err, result) => {
      expect(result.violations.length).toBe(0);
      if (result.violations.length > 0) {
        logAxeViolations(result.violations);
      }
      done();
    });
  });

});
