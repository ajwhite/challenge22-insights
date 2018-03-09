import FB from 'fb'
import Env from '../.env.local.json'

FB.setAccessToken(Env.ACCESS_TOKEN);

function request (endpoint) {
  return new Promise ((resolve, reject) => {
    FB.api(endpoint, resp => {
      if (resp.error) {
        reject(resp.error)
      } else {
        resolve(resp)
      }
    })
  })
}

export function getFeed() {
  return request(`${Env.GROUP_ID}/feed?fields=message,id,created_time,comments.limit(500){id,message,created_time,like_count,from{id,name,picture.height(300)},comments.limit(500){id,message,created_time,like_count,from{id,name,picture.height(300)}}},from{id,name,picture.height(300)}&limit=500&include_hidden=true`);
}
