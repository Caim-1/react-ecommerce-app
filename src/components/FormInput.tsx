import { Grid, TextField  } from "@mui/material";
import { useFormContext, Controller } from "react-hook-form";

export default function FormInput({ name, label }: any) {
  const { control } = useFormContext();
  
  return (
    <Grid item xs={12} sm={6}>
      <Controller
        name={name}
        control={control}
        defaultValue={''} 
        render={({ field }) => <TextField {...field} label={label} fullWidth required />}
      />
    </Grid>
  );
}