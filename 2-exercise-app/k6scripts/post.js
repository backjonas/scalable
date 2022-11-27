import http from 'k6/http';

export const options = {
  duration: '10s',
  vus: 10,
  summaryTrendStats: ['med', 'p(95)', 'p(99)'],
};

export default () => {
  http.post(
    'http://localhost:5000/api/submission', 
    JSON.stringify({ exerciseId: 3, submittedCode: "abc123Code" }), 
    {
      headers: { 
        'Content-Type': 'application/json',
        Authorization: 'Bearer SomeUserToken' },
    }
  );
};