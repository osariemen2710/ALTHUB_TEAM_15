import React, { createContext, useState, useContext, useMemo, useCallback } from 'react';

const ScheduleContext = createContext();

export const useSchedule = () => {
  const context = useContext(ScheduleContext);
  if (!context) {
    throw new Error('useSchedule must be used within a ScheduleProvider');
  }
  return context;
};

const initialState = {};

export const ScheduleProvider = ({ children }) => {
  const [scheduleData, setScheduleData] = useState(initialState);

  const updateScheduleData = useCallback((newData) => {
    setScheduleData(prevData => ({ ...prevData, ...newData }));
  }, []);

  const resetScheduleData = useCallback(() => {
    setScheduleData(initialState);
  }, []);

  const value = useMemo(() => ({
    scheduleData,
    updateScheduleData,
    resetScheduleData,
  }), [scheduleData, updateScheduleData, resetScheduleData]);

  return (
    <ScheduleContext.Provider value={value}>
      {children}
    </ScheduleContext.Provider>
  );
};
