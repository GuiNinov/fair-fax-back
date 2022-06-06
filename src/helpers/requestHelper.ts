import axios from 'axios';

const access_key: any = process.env.AWS_DV_API_KEY;

const getRequest = async (url: string | undefined, endpoint: string) => {
  const res = await axios({
    method: 'get',
    url: endpoint,
    baseURL: url,
    headers: {
      'x-api-key': access_key,
    },
    timeout: 150000,
  });

  return res;
};

const postRequest = async (
  url: string | undefined,
  endpoint: string,
  data: any = {},
  key: string = access_key
) => {
  const res = await axios({
    method: 'post',
    url: endpoint,
    baseURL: url,
    data,
    headers: {
      'x-api-key': key,
    },
    timeout: 150000,
  });

  return res;
};

export { getRequest, postRequest };
