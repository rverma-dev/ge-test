import { sleep, check } from 'k6';
import { Options } from 'k6/options';
import http from 'k6/http';
import exec from 'k6/execution';

export let options: Options = {
  vus: 50,
  duration: '10s'
};

export default () => {
  const res = http.get('https://test-api.k6.io');
  check(res, {
    'status is 200': () => res.status === 200,
  });
  sleep(1);
};


export function iter(): void {
  console.log(`Execution context
    Instance info
    -------------
    Vus active: ${exec.instance.vusActive}
    Iterations completed: ${exec.instance.iterationsCompleted}
    Iterations interrupted:  ${exec.instance.iterationsInterrupted}
    Iterations completed:  ${exec.instance.iterationsCompleted}
    Iterations active:  ${exec.instance.vusActive}
    Initialized vus:  ${exec.instance.vusInitialized}
    Time passed from start of run(ms):  ${exec.instance.currentTestRunDuration}

    Scenario info
    -------------
    Name of the running scenario: ${exec.scenario.name}
    Executor type: ${exec.scenario.executor}
    Scenario start timestamp: ${exec.scenario.startTime}
    Percenatage complete: ${exec.scenario.progress}
    Iteration in instance: ${exec.scenario.iterationInInstance}
    Iteration in test: ${exec.scenario.iterationInTest}

    Test info
    ---------
    All test options: ${exec.test.options}

    VU info
    -------
    Iteration id: ${exec.vu.iterationInInstance}
    Iteration in scenario: ${exec.vu.iterationInScenario}
    VU ID in instance: ${exec.vu.idInInstance}
    VU ID in test: ${exec.vu.idInTest}
    VU tags: ${exec.vu.tags}`);
}