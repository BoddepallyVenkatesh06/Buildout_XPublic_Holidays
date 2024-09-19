// src/components/HolidayList.tsx
import React from "react";
import { Holiday } from "../types/Holiday";
import styles from "./HolidayList.module.css";

interface HolidayListProps {
  holidays: Holiday[];
}

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const options = { day: "numeric", month: "long" };
  return date.toLocaleDateString(undefined, options);
};

const HolidayList: React.FC<HolidayListProps> = ({ holidays }) => {
  return (
    <div className={styles.holidayList}>
      {holidays.map((holiday) => (
        <div key={holiday.Date} className={styles.holidayCard}>
          <strong className={styles.holidayTitle}>
            {holiday["Holiday Name"]}
          </strong>
          <span className={styles.holidayDate}>{formatDate(holiday.Date)}</span>
          <span className={styles.holidayType}>{holiday.Type}</span>
        </div>
      ))}
    </div>
  );
};

export default HolidayList;
