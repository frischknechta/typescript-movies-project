import { useEffect, useState } from "react";
import "./App.css";
import { Header } from "./components/Header";
import axios from "axios";
import { MovieCard } from "./components/MovieCard";
import { Box, Button, Grid, Modal, TextField } from "@mui/material";
import { Movies, MoviesSchema } from "./types";

function App() {
  const [data, setData] = useState<Movies>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [editOpen, setEditOpen] = useState<boolean>(false);
  const [deleteOpen, setDeleteOpen] = useState<boolean>(false);
  const [filmName, setFilmName] = useState<string>("");
  const [filmToTarget, setFilmToTarget] = useState<number>();
  const [refresh, setRefresh] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:4005/movies");
        console.log(response.data);
        const parsedMovies = MoviesSchema.parse(response.data);
        setData(parsedMovies);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [refresh]);

  const handleEdit = (id: string, title: string) => {
    setEditOpen(true);
    setFilmToTarget(Number(id));
    setFilmName(title);
  };

  const handleDelete = (id: string) => {
    setDeleteOpen(true);
    setFilmToTarget(Number(id));
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:4005/movies/${filmToTarget}`, {
        title: filmName,
      });
      setEditOpen(false);
      setRefresh((prev) => prev + 1);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleting = async () => {
    try {
      await axios.delete(`http://localhost:4005/movies/${filmToTarget}`);
      setDeleteOpen(false);
      setRefresh((prev) => prev + 1);
    } catch (error) {
      console.log(error);
    }
  };

  return isLoading || data === undefined ? (
    <div>Loading...</div>
  ) : (
    <>
      <Header />
      <main>
        <Grid container spacing={4} padding={3}>
          {data.map((movie) => {
            return (
              <Grid item xs={3} key={movie.id}>
                <MovieCard
                  movie={movie}
                  handleEdit={handleEdit}
                  handleDelete={handleDelete}
                />
              </Grid>
            );
          })}
        </Grid>
      </main>

      <Modal open={editOpen} onClose={() => setEditOpen(false)}>
        <Box
          sx={{
            position: "absolute" as "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 2,
          }}
        >
          <h2>Mettre à jour le titre</h2>
          <TextField
            value={filmName}
            onChange={(event) => setFilmName(event.target.value)}
            sx={{
              width: "100%",
            }}
          />
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <Button
              variant="contained"
              color={"error"}
              onClick={() => setEditOpen(false)}
            >
              ANNULER
            </Button>
            <Button
              variant="contained"
              onClick={() => {
                handleUpdate();
              }}
            >
              ENREGISTRER
            </Button>
          </Box>
        </Box>
      </Modal>

      <Modal open={deleteOpen} onClose={() => setDeleteOpen(false)}>
        <Box
          sx={{
            position: "absolute" as "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 2,
          }}
        >
          <div>
            Voulez-vous vraiement supprimer le film? Cette opération est
            irréversible.
          </div>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <Button variant="contained" onClick={() => setDeleteOpen(false)}>
              ANNULER
            </Button>
            <Button
              variant="contained"
              color={"error"}
              onClick={() => {
                handleDeleting();
              }}
            >
              SUPPRIMER
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
}

export default App;
