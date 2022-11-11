import http from 'k6/http';

export const options = {
  duration: '10s',
  vus: 10,
  summaryTrendStats: ['avg', 'med', 'p(95)', 'p(99)'],
};

export default () => {
  http.post('http://localhost:5000/', JSON.stringify({ longUrl: 'google.com' }), {
    headers: { 'Content-Type': 'application/json' },
  });
};