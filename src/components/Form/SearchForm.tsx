import { ChangeEvent, FormEvent, useState } from "react";
import { countries } from "../../data/countries";
import styles from './Form.module.css'
import { SearchType } from "../../types";
import Alert from "../Alert/Alert";
import useWeather from "../../hooks/useWeather";

type SearchFormProps= {
  fetchWeather: (search: SearchType) => Promise<void>
}

export default function SearchForm({fetchWeather}: SearchFormProps) {
  const [search, setSearch] = useState<SearchType>({city: '', country: ''})
  const [alert, setAlert] = useState('')
  const handleChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
    setSearch({
      ...search,
      [e.target.name]: e.target.value
    })
  }

  const {loading} = useWeather()

  const handleSubmit = (e : FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (Object.values(search).includes('')) {
      setAlert('All fields are required')
      return;
    } 
    
    fetchWeather(search)
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      {alert && <Alert>{alert}</Alert>}
      <div className={styles.field}>
        <label htmlFor="city">City:</label>
        <input type="text" id="city" name="city" onChange={handleChange} value={search.city} placeholder="City" />
      </div>
      <div className={styles.field}>
        <label htmlFor="country">Country:</label>
        <select name="country" onChange={handleChange} value={search.country} id="country">
          <option value="">-- Select a country --</option>
          {countries.map((country) => (
            <option key={country.code} value={country.code}>
              {country.name}
            </option>
          ))}
        </select>
      </div>

      <input disabled={loading} type="submit" className={styles.submit} value="Search weather" />
    </form>
  );
}
