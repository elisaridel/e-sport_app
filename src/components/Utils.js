import { ReactSession } from 'react-client-session';
import React, { useState, useEffect } from 'react';

export const getDatas = (url) => {

  const options = {
    methode: 'GET', 
    headers: {
      Accept: 'application/json',
    }
  };

  return fetch(url, options)
  .then(response => response.json())
}

