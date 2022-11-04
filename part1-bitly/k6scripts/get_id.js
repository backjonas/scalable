import http from 'k6/http';

export const options = {
  duration: '10s',
  vus: 10,
  summaryTrendStats: ['avg', 'med', 'p(95)', 'p(99)'],
};

export const setup = () => {
  const data = [
    { longUrl: 'google.com' },
    { longUrl: 'http://google.com' },
    { longUrl: 'https://google.com' },
  ];
  const urls = [];
  data.forEach((url => {
    const res = http.post('http://localhost:5000/', JSON.stringify(url), {
      headers: { 'Content-Type': 'application/json' },
    });
    urls.push(res.json());
  }));
  return { existingUrl: urls[0].shortUrl };
}

export default (data) => {
  http.get(data.existingUrl, { redirects: 0 });
}