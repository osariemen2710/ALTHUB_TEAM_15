import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// utils/localStorage.js
// Simple localStorage utility functions for your waste collection app

const STORAGE_KEYS = {
  SCHEDULE_FORM: 'scheduleFormData',
  USER_PREFERENCES: 'userPreferences',
  DRAFT_DATA: 'draftScheduleData'
};

// Basic localStorage operations
export const storage = {
  // Save data to localStorage
  save: (key, data) => {
    try {
      const jsonData = JSON.stringify(data);
      localStorage.setItem(key, jsonData);
      return true;
    } catch (error) {
      console.error('Error saving to localStorage:', error);
      return false;
    }
  },

  // Get data from localStorage
  get: (key) => {
    try {
      const jsonData = localStorage.getItem(key);
      return jsonData ? JSON.parse(jsonData) : null;
    } catch (error) {
      console.error('Error reading from localStorage:', error);
      return null;
    }
  },

  // Remove data from localStorage
  remove: (key) => {
    try {
      localStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error('Error removing from localStorage:', error);
      return false;
    }
  },

  // Clear all app data
  clear: () => {
    try {
      Object.values(STORAGE_KEYS).forEach(key => {
        localStorage.removeItem(key);
      });
      return true;
    } catch (error) {
      console.error('Error clearing localStorage:', error);
      return false;
    }
  },

  // Check if data exists
  exists: (key) => {
    return localStorage.getItem(key) !== null;
  }
};

// Specific functions for your schedule form
export const scheduleStorage = {
  // Save form data
  saveFormData: (data) => {
    const timestamp = new Date().toISOString();
    const formDataWithMeta = {
      ...data,
      savedAt: timestamp,
      version: '1.0'
    };
    return storage.save(STORAGE_KEYS.SCHEDULE_FORM, formDataWithMeta);
  },

  // Get form data
  getFormData: () => {
    const data = storage.get(STORAGE_KEYS.SCHEDULE_FORM);
    if (!data) return null;
    
    // Return data without metadata
    const { savedAt, version, ...formData } = data;
    return formData;
  },

  // Update specific form fields
  updateFormFields: (newFields) => {
    const existingData = scheduleStorage.getFormData() || {};
    const updatedData = {
      ...existingData,
      ...newFields
    };
    return scheduleStorage.saveFormData(updatedData);
  },

  // Clear form data
  clearFormData: () => {
    return storage.remove(STORAGE_KEYS.SCHEDULE_FORM);
  },

  // Check if form has saved data
  hasFormData: () => {
    return storage.exists(STORAGE_KEYS.SCHEDULE_FORM);
  },

  // Get form data age (how old is the saved data)
  getFormDataAge: () => {
    const data = storage.get(STORAGE_KEYS.SCHEDULE_FORM);
    if (!data?.savedAt) return null;
    
    const savedTime = new Date(data.savedAt);
    const now = new Date();
    const ageInHours = (now - savedTime) / (1000 * 60 * 60);
    
    return {
      hours: Math.floor(ageInHours),
      isOld: ageInHours > 24 // Consider data old after 24 hours
    };
  }
};

// React hook for easy component usage
import { useState, useEffect } from 'react';

export const useLocalStorage = (key, defaultValue = null) => {
  const [value, setValue] = useState(defaultValue);
  const [loading, setLoading] = useState(true);

  // Load data on component mount
  useEffect(() => {
    const stored = storage.get(key);
    setValue(stored || defaultValue);
    setLoading(false);
  }, [key, defaultValue]);

  // Save data and update state
  const saveValue = (newValue) => {
    setValue(newValue);
    return storage.save(key, newValue);
  };

  // Update specific fields (for objects)
  const updateValue = (updates) => {
    const newValue = { ...value, ...updates };
    setValue(newValue);
    return storage.save(key, newValue);
  };

  // Clear data
  const clearValue = () => {
    setValue(defaultValue);
    return storage.remove(key);
  };

  return {
    value,
    loading,
    save: saveValue,
    update: updateValue,
    clear: clearValue,
    exists: storage.exists(key)
  };
};

// Specific hook for schedule form
export const useScheduleForm = () => {
  const {
    value: formData,
    loading,
    save,
    update,
    clear
  } = useLocalStorage(STORAGE_KEYS.SCHEDULE_FORM, {});

  return {
    formData,
    loading,
    saveFormData: save,
    updateFormData: update,
    clearFormData: clear,
    hasData: scheduleStorage.hasFormData(),
    dataAge: scheduleStorage.getFormDataAge()
  };
};

export default { storage, scheduleStorage, STORAGE_KEYS };