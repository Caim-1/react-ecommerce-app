import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Button, Grid, Typography } from "@mui/material";
import FormInput from "./FormInput";

import { commerce } from "../lib/commerce";
import { Link } from "react-router-dom";
import SelectField from "./SelectField";

export default function AddressForm({ checkoutToken, next }: any) {
  const methods = useForm();
  const [shippingCountries, setShippingCountries] = useState<any>();
  const [shippingCountry, setShippingCountry] = useState('');
  const [shippingSubdivisions, setShippingSubdivisions] = useState<any>();
  const [shippingSubdivision, setShippingSubdivision] = useState('');
  const [shippingOptions, setShippingOptions] = useState<any >();
  const [shippingOption, setShippingOption] = useState('');

  const countries = shippingCountries && Object.entries(shippingCountries).map(([code, name]: any) => ({ id: code, label: name }));
  const subdivisions = shippingSubdivisions && Object.entries(shippingSubdivisions).map(([code, name]: any) => ({ id: code, label: name }));
  const options = shippingOptions && shippingOptions.map((shippingOption: any) => ({ id: shippingOption.id, label: `${shippingOption.description} - (${shippingOption.price.formatted_with_symbol})` }));

  async function fetchShippingCountries(checkoutTokenId: string) {
    const { countries } = await commerce.services.localeListShippingCountries(checkoutTokenId);
    
    setShippingCountries(countries);
    setShippingCountry(Object.keys(countries)[0]); // Gives only the keys of the object, which results in an array of countries, from which we get the first index.
  }

  async function fetchSubdivisions(countryCode: string) {
    const { subdivisions } = await commerce.services.localeListSubdivisions(countryCode);
    
    setShippingSubdivisions(subdivisions);
    setShippingSubdivision(Object.keys(subdivisions)[0]);
  }

  async function fetchShippingOptions(checkoutTokenId: string, country: string, region: any = null) { // Wanted to do region: string, but it results in an error.
    const options = await commerce.checkout.getShippingOptions(checkoutTokenId, { country, region });
    
    setShippingOptions(options);
    setShippingOption(options[0].id); // Gets the first available shipping option.
  }

  useEffect(() => {
    fetchShippingCountries(checkoutToken.id);
  }, []);
  
  useEffect(() => {
    if (shippingCountry) fetchSubdivisions(shippingCountry);
  }, [shippingCountry]);

  useEffect(() => {
    if (shippingSubdivision) fetchShippingOptions(checkoutToken.id, shippingCountry, shippingSubdivision);
  }, [shippingSubdivision]);

  return (
    <>
      <Typography variant='h6' gutterBottom>Shipping Address</Typography>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(data => next({ ...data, shippingCountry, shippingSubdivision, shippingOption }))}>
          <Grid container spacing={3}>  
            <FormInput name='firstName' label='First Name' />
            <FormInput name='lastName' label='Last Name' />
            <FormInput name='address' label='Address' />
            <FormInput name='email' label='Email' />
            <FormInput name='city' label='City' />
            <FormInput name='zip' label='ZIP / Postal Code' />
            <SelectField label={'Shipping Country'} value={shippingCountry} array={countries} handleFunction={setShippingCountry} />
            <SelectField label={'Shipping Subdivision'} value={shippingSubdivision} array={subdivisions} handleFunction={setShippingSubdivision} />
            <SelectField label={'Shipping Options'} value={shippingOption} array={options} handleFunction={setShippingOption} />
          </Grid>
          <br />
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button component={Link} to='/cart' variant='outlined'>Back to Cart</Button>
            <Button type='submit' variant='contained' color='primary' disabled={!options && true} >Next</Button>
          </div>
        </form>
      </FormProvider>
    </>
  );
}