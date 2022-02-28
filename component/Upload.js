import React from 'react'
import Button from "@mui/material/Button";
import MovieIcon from "@mui/icons-material/Movie";
import LinearProgress from "@mui/material/LinearProgress";
function Upload() {
  return (
    <div className="upload-btn">
      <Button
        variant="outlined"
        component="label"
        fullWidth
        style={{ marginTop: "1rem" }}
        color="secondary"
        startIcon={<MovieIcon />}
      >
        <input type="file" accept="image/*" style={{ display: "none" }} />
        Upload Reel
      </Button>
      <LinearProgress variant="determinate" value={50} sx={{marginTop:'0.1rem'}}/>
    </div>
  );
}

export default Upload