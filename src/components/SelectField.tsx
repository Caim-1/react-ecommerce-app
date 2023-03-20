import { Grid, InputLabel, MenuItem, Select, TextField } from "@mui/material";

export default function SelectField({ label, value, array, handleFunction }: {label: string, value: string, array: any[], handleFunction: any}) {
  if (!array) {
    return (
      <Grid item xs={12} sm={6}>
        <InputLabel>{label}</InputLabel>
        <TextField fullWidth defaultValue="Loading..." disabled />
      </Grid>
    )
  }
  
  return (
    <Grid item xs={12} sm={6}>
      <InputLabel>{label}</InputLabel>
      <Select value={value} fullWidth onChange={e => handleFunction(e.target.value)}>
        {array?.map((item: any) => (
          <MenuItem key={item.id} value={item.id}>
            {item.label}
          </MenuItem>
        ))}
      </Select>
    </Grid>
  );
}