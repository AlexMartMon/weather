import styles from "./App.module.css";
import Alert from "./components/Alert/Alert";
import SearchForm from "./components/Form/SearchForm";
import Spinner from "./components/Spinner/Spinner";
import WeatherDetail from "./components/WeatherDetail/WeatherDetail";
import useWeather from "./hooks/useWeather";

function App() {
  const { weather, loading, notFound, fetchWeather, hasWeatherData } = useWeather();

  return (
    <>
      <h1 className={styles.title}>hola mundo</h1>

      <div className={styles.container}>
        <SearchForm fetchWeather={fetchWeather} />
        {loading && <Spinner />}
        {hasWeatherData && <WeatherDetail weather={weather} />}
        {notFound && <Alert>City not found</Alert>}
      </div>
    </>
  );
}

export default App;
