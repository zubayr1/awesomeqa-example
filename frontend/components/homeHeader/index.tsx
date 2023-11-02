import { Box, Link, Typography } from "@mui/material";

const HomeHeader = () => {
  return (
    <Link href="/" sx={{ textDecoration: "none", color: "inherit" }}>
      <Box sx={{ border: 1, justifyContent: "center", mt: 5, borderRadius: 2, padding: 1, background: "floralwhite" }}>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Typography variant="h2" component="div">
            Awesome tech challenge
          </Typography>
        </Box>

        {/* <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Typography variant="h4">Don{"'"}t Trust Your Food. Verify It!</Typography>
        </Box> */}
      </Box>
    </Link>
  );
};

export default HomeHeader;
