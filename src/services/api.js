const awesomeapi = async () => {
  const response = await fetch('https://economia.awesomeapi.com.br/json/all');
  const data = await response.json();
  console.log(Object.keys(data));
  return data;
};

export default awesomeapi;
