import http from 'k6/http';

export const options = {
  duration: '1s',
  vus: 10,
  summaryTrendStats: ['avg', 'med', 'p(95)', 'p(99)'],
};

export function setup() {
  const data = [
    { longUrl: 'google.com' },
    { longUrl: 'http://google.com' },
    { longUrl: 'https://google.com' },
  ];
  for (let i = 0; i < 1000; i++) {
    data.forEach((url => {
      const res = http.post('http://localhost:5000/', JSON.stringify(url), {
        headers: { 'Content-Type': 'application/json' },
      });
    }))
  }
}

export default () => {
  http.get('http://localhost:5000');
}