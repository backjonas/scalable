import http from 'k6/http';

// Change this variable to the external IP returned by kubectl get svc
const externalIP = '10.101.144.70'

export const options = {
  duration: '10s',
  vus: 10,
  summaryTrendStats: ['med', 'p(95)', 'p(99)'],
};

export const setup = () => {
  http.post(
    `http://${externalIP}:3000/api/post`, 
    JSON.stringify({ content: "Nice posts" }), 
    {
      headers: { 
        'Content-Type': 'application/json',
        Authorization: 'Bearer SomeUserToken' },
    }
  );
}

export default () => {
  http.post(
    `http://${externalIP}:3000/api/reply`, 
    JSON.stringify({ content: "Nice replies", postId: 1 }), 
    {
      headers: { 
        'Content-Type': 'application/json',
        Authorization: 'Bearer SomeUserToken' },
    }
  );
};