import { ReactSession } from 'react-client-session';
import React, { useState, useEffect } from 'react';

export const getDatas = (url, authorization) => {
  const options = {
    methode: 'GET', 
    headers: {
      Accept: 'application/json',
      Authorization: authorization,
    }
  };

  return fetch(url, options)
  .then(response => response.json())
}

