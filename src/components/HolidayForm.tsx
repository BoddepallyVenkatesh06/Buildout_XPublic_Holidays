// src/components/HolidayForm.tsx
import React, { useState, useEffect, FormEvent, ChangeEvent } from "react";
import { fetchCountries } from "../api/holidayApi";
import styles from "./HolidayForm.module.css";

interface HolidayFormProps {
  onSearch: (country: string) => Promise<void>;
}

const HolidayForm: React.FC<HolidayFormProps> = ({ onSearch }) => {
  const [countries, setCountries] = useState<string[]>([]);
  const [country, setCountry] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchAndSetCountries = async () => {
      try {
        const countries = await fetchCountries();
        setCountries(countries);
        if (countries.length > 0) {
          setCountry(countries[0]);
        }
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };

    fetchAndSetCountries();
  }, []);

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();
    setLoading(true);
    await onSearch(country);
    setLoading(false);
  };

  const handleCountryChange = (event: ChangeEvent<HTMLSelectElement>): void => {
    setCountry(event.target.value);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <select
        value={country}
        onChange={handleCountryChange}
        className={styles.select}
        disabled={loading}
      >
        {countries.map((country) => (
          <option key={country} value={country}>
            {country}
          </option>
        ))}
      </select>
      <button type="submit" className={styles.button} disabled={loading}>
        {loading ? <div className={styles.spinner}></div> : "Fetch Holidays"}
      </button>
    </form>
  );
};

export default HolidayForm;
