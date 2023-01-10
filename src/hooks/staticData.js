import { useState, useEffect } from 'react';
import {CategoryService} from '../services/categoryService';
import {CompanyService} from '../services/companyService';
import {LocationService} from '../services/locationService';

export function useGetStaticData(friendID) {
  const [companies, setCompanies] = useState();
  const [categories, setCategories] = useState();
  const [locations, setLocations] = useState();
  const [isLoding, setIsLoding] = useState(false);

  useEffect(() => {
 
    const fetchData = async () =>{
    
        try{
        setIsLoding(true);
        const [categoriesData, companiesData, locationData] = await
        Promise.all([CategoryService.getCategory(),CompanyService.getCompany(),LocationService.getLocations() ])
        setCompanies(companiesData.data);
        setCategories(categoriesData.data);
        setLocations(locationData.data);
        }
        catch(ex){
            setIsLoding(true);
        }
        setIsLoding(false);
    }
    fetchData();
   },[]);

  return {categories, locations, companies, isLoding};
}