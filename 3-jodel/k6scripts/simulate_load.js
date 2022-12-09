import http from 'k6/http';

// Change this variable to the external IP returned by kubectl get svc
const externalIP = '10.101.144.70'

export const options = {
  duration: '300s',
  vus: 10,
  summaryTrendStats: ['med', 'p(95)', 'p(99)'],
};

export default () => {
  http.get(`http://${externalIP}:3000`);
  http.get(`http://${externalIP}:3000/api/post`);
}
