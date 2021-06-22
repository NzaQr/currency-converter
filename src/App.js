import { useEffect, useState } from "react";
import "./App.css";
import { Text, Input, Button, Select, Stack } from "@chakra-ui/react";

function App() {
  const [baseCurrency, setBaseCurrency] = useState([]);
  const [selectedBaseCurrency, setSelectedBaseCurrency] = useState("USD");
  const [resultCurrency, setResultCurrency] = useState([]);
  const [selectedResultCurrency, setSelectedResultCurrency] = useState("USD");
  const [amount, setAmout] = useState();
  const [conversion, setConversion] = useState([]);
  const api_key = process.env.REACT_APP_API_KEY;
  const url = `https://v6.exchangerate-api.com/v6/${api_key}/pair/${selectedBaseCurrency}/${selectedResultCurrency}/${amount}`;
  const currenciesUrl = `https://v6.exchangerate-api.com/v6/7fd0cae0839817c19ca0e5d8/latest/USD`;

  useEffect(() => {
    fetchCurrency();
  }, []);

  const fetchCurrency = async () => {
    const response = await fetch(currenciesUrl);
    const currencies = await response.json();
    setBaseCurrency(currencies.conversion_rates);
    setResultCurrency(currencies.conversion_rates);
  };

  const handleInputChange = (e) => {
    setAmout(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(url);
      const data = await response.json();
      setConversion(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleBaseCurrencyChange = (e) => {
    setSelectedBaseCurrency(e.target.value);
  };

  const handleResultCurrencyChange = (e) => {
    setSelectedResultCurrency(e.target.value);
  };

  return (
    <>
      <Text textAlign="center" fontSize="35px" mt="10" mb="5">
        Currency Converter
      </Text>

      <form onSubmit={handleSubmit}>
        <Stack spacing={4} align="center" p="5">
          <Stack direction="row" mb="6">
            <Input
              boxShadow="gray.600"
              variant="flushed"
              placeholder="Enter amount"
              value={amount}
              onChange={handleInputChange}
            />
            <Select onChange={(e) => handleBaseCurrencyChange(e)}>
              {Object.entries(baseCurrency).map(([key]) => (
                <option value={key.toString()}>{key.toString()}</option>
              ))}
            </Select>
          </Stack>
          <Button
            _hover={{
              background: "gray.600",
              color: "gray.200",
            }}
            size="lg"
            onClick={handleSubmit}
          >
            Convert
          </Button>
        </Stack>
      </form>
      <Stack spacing={4} align="center" p="5">
        <Stack direction="row">
          <Input variant="filled" value={conversion.conversion_result} />
          <Select onChange={(e) => handleResultCurrencyChange(e)}>
            {Object.entries(resultCurrency).map(([key]) => (
              <option value={key.toString()}>{key.toString()}</option>
            ))}
          </Select>
        </Stack>
      </Stack>
    </>
  );
}

export default App;
