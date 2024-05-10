import { Button, Card, CardActions, CardContent } from "@mui/material";
import { Movie } from "../types";

type Props = {
  movie: Movie;
  handleEdit: (id: string, title: string) => void;
  handleDelete: (id: string) => void;
};

export const MovieCard = ({
  movie,
  handleEdit,
  handleDelete,
}: Props): JSX.Element => {
  return (
    <Card
      sx={{
        height: 450,
      }}
    >
      <CardContent
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <img src={movie.poster} alt={`${movie.title} poster`} />
        <h2>{movie.title}</h2>
        <div className="movieDescription">{movie.description}</div>
        <CardActions
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Button
            variant="contained"
            onClick={() => handleEdit(movie.id, movie.title)}
          >
            EDITER
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={() => handleDelete(movie.id)}
          >
            SUPPRIMER
          </Button>
        </CardActions>
      </CardContent>
    </Card>
  );
};
