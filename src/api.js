// 서버 주소
const server = "http://localhost:5000";

export default function api(url, method, body) {
  return fetch(`${server}/${url}`, {
    method,
    mode: "cors",
    headers: {
      "Content-Type": "application/json"
    },
    credentials: "include",
    body: JSON.stringify(body)
  })
    .then(res => res.json())
    .then(res => {
      if (res.error) {
        return Promise.reject(res.error);
      } else {
        return res;
      }
    });
}
