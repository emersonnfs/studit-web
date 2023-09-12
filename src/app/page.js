'use client'
import { useEffect } from 'react';

export default function Home() {

  useEffect(() => {
    const loginData = localStorage.getItem('loginData');

    if (!loginData) {
      window.location.href = '/login';
    } else {
      window.location.href = '/homepage';
    }
  }, []);

  return null;
}
