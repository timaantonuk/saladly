import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchSalads = createAsyncThunk(
  'saladSlice/getSalads',
  function fetchSalads() {
    const sanityAPI = `https://tgg25nr2.api.sanity.io/v1/data/query/production?query=*[_type == "salad"]{name, description, price, priceXl, calories, protein, carbs, fat, weight, popularity, filters, "imageUrl": image.asset->url}`;

    const fetchSalads = async () => {
      try {
        const response = await axios.get(sanityAPI); // Make a GET request using Axios
        console.log(response);
        return response.data.result; // Access the data from the response
      } catch (error) {
        console.error('Error fetching salads:', error); // Handle errors
      }
    };

    return fetchSalads();
  },
);
