// src/App.tsx
import React, { useState } from "react";
import HolidayForm from "./components/HolidayForm";
import HolidayList from "./components/HolidayList";
import { fetchHolidays } from "./api/holidayApi";
import { Holiday } from "./types/Holiday";
import styles from "./App.module.css";

const App: React.FC = () => {
  const [holidays, setHolidays] = useState<Holiday[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleFetchHolidays = async (country: string): Promise<void> => {
    setError(null);
    try {
      const holidays = await fetchHolidays(country);
      setHolidays(holidays);
    } catch (error) {
      setError("Failed to fetch holidays");
      setHolidays([]);
    }
  };

  return (
    <div className={styles.app}>
      <h1 className={styles.title}>Public Holiday Tracker</h1>
      <HolidayForm onSearch={handleFetchHolidays} />
      {error && <p className={styles.error}>{error}</p>}
      <HolidayList holidays={holidays} />
    </div>
  );
};

export default App;
