import LocalMoviesIcon from "@mui/icons-material/LocalMovies";

export const Header = (): JSX.Element => {
  return (
    <header>
      <LocalMoviesIcon />
      <h2>MOVIES</h2>
      <nav>
        <div>Products</div>
        <div>Pricing</div>
        <div>Blog</div>
      </nav>
    </header>
  );
};
