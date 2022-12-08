import http from 'k6/http';

export const options = {
  duration: '100s',
  vus: 10,
  summaryTrendStats: ['med', 'p(95)', 'p(99)'],
};

export default () => {
  http.get('http://10.103.101.121:5000');
}
