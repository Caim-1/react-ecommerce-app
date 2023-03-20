import ReactLoading from "react-loading";
import { Typography } from "@mui/material";

export default function Loading({ title, toolbar }: {title: string, toolbar: boolean}) {
  return (
    <div className='loading'>
      {toolbar && <div className='toolbar' />}
      <ReactLoading type={'spin'} color={'black'} height={'100px'} width={'100px'}/>
      <Typography variant='h4' gutterBottom>{title}</Typography>
    </div>
  );
}