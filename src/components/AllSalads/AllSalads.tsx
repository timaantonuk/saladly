import './all-salads.scss';
import SaladCard from '../SaladCard/SaladCard.tsx';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSalads } from '../../store/slices/saladSlice/saladActions.ts'; // Import Axios

export interface ISalad {
  name: string;
  description: string;
  price: number;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  weight: string;
  imageUrl: string;
}

function AllSalads() {
  // const [salads, setSalads] = useState<ISalad[]>([]);
  // const sanityAPI = `https://tgg25nr2.api.sanity.io/v1/data/query/production?query=*[_type == "salad"]{name, description, price, calories, protein, carbs, fat, weight, popularity, filters, "imageUrl": image.asset->url}`;
  //
  // useEffect(() => {
  //   const fetchSalads = async () => {
  //     try {
  //       const response = await axios.get(sanityAPI); // Make a GET request using Axios
  //       setSalads(response.data.result); // Access the data from the response
  //     } catch (error) {
  //       console.error('Error fetching salads:', error); // Handle errors
  //     }
  //   };
  //
  //   fetchSalads(); // Call the function to fetch data
  // }, [sanityAPI]);

  // console.log(salads);

  const salads = useSelector((state) => state.salad.allSalads);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchSalads());
  }, []);

  return (
    <main className="salads-menu">
      <h2 className="salads-menu__title">All Salads</h2>

      <ul className="salads-menu__list">
        {salads.map((salad) => (
          <SaladCard key={salad.name} {...salad} />
        ))}
      </ul>
    </main>
  );
}

export default AllSalads;
