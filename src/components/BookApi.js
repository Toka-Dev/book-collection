import {useState, useEffect} from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

/**
 * BookApi for api calls,
 * on rendering and on events / conditions
 */

/**
 * Useful for http data as a dependency in rendering
 *
 * @param {string} method, http method
 * @param {string} path, relative path to baseUrl
 * @returns response Data
*/
export default function useBookApi(method, path) {
  const [data, setData] = useState(null);
  const history = useHistory()

  useEffect(() => {
    bookApi(
      method,
      path,
      dataOrError => dataOrError instanceof Error ? history.push('/404') : setData(dataOrError)
    )
  }, [method, path, history])

  return data;
}

/**
 * Useful for calls on events or in condition
 *
 * @param {string} method, http method
 * @param {string} path, relative path to baseUrl
 * @param {function} callback, callback, gets `response.data` as an argument
 * @param {object} data, body data
*/
export function bookApi(method, path, callback, data = {}) {
  const baseUrl = 'https://api3.angular-buch.com/secure'
  
  axios({
    method: method,
    url: `${baseUrl}/${path}`,
    headers: {Authorization: 'Bearer 1234567890'},
    data
  })
    .then((response) => callback(response.data))
    .catch((error) => callback(error))
}
