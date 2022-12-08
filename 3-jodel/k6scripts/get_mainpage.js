import http from 'k6/http';

// Change this variable to the external IP returned by kubectl get svc
const externalIP = '10.108.199.249'

export const options = {
  duration: '10s',
  vus: 10,
  summaryTrendStats: ['med', 'p(95)', 'p(99)'],
};

export default () => {
  http.get(`http://${externalIP}:5000`);
}