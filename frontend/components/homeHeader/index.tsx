import { Box, Link, Typography } from "@mui/material";

const HomeHeader = () => {
  return (
    <Link href="/" sx={{ textDecoration: "none", color: "inherit" }}>
      <Box sx={{ border: 1, justifyContent: "center", mt: 5, borderRadius: 2, padding: 1 }}>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Typography variant="h2" component="div"
          sx={{
            '@media (min-width:0px) and (max-width:600px)': {
              fontSize: '2rem', 
            },
            '@media (min-width:601px) and (max-width:1024px)': {
              fontSize: '3rem', 
            },
            '@media (min-width:1025px)': {
              fontSize: '4rem', 
            },
          }}
          >
            Awesome tech challenge
          </Typography>
        </Box>
      </Box>
    </Link>
  );
};

export default HomeHeader;
