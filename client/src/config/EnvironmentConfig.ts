type Config = {
  url: {
    API_BASE_URL: string;
  };
};

const prod: Config = {
  url: {
    API_BASE_URL: process.env.REACT_APP_API_BASE_URL_PROD ?? '',
  },
};

const dev: Config = {
  url: {
    API_BASE_URL: process.env.REACT_APP_API_BASE_URL_DEV ?? '',
  },
};

export const config: Config =
  process.env.NODE_ENV === 'development' ? dev : prod;
