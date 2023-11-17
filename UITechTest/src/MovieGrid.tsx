import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Movie, MovieCompany } from './App';

const columns: GridColDef[] = [
  { field: 'title', headerName: 'Title', width: 150 },
  { field: 'score', headerName: 'Avg. Score', width: 150 },
  { field: 'company', headerName: 'Company', width: 150 },
];

type Props = {
  movies: Movie[];
  companies: MovieCompany[];
  handleRowClick: (movieId: string) => void;
};
export default function MovieGrid({ movies, companies, handleRowClick }: Props) {
  if (!movies || movies.length === 0) return;
  const rows = movies.map((movie) => ({
    id: parseInt(movie.id, 10),
    title: movie.title,
    score: (movie.reviews.reduce((acc, val) => acc + val, 0) / movie.reviews.length).toFixed(1),
    company: companies.find((company) => company.id === movie.filmCompanyId)?.name,
  }));

  return (
    <div style={{ height: 300, width: '100%' }}>
      <DataGrid rows={rows} columns={columns} onRowClick={(data) => handleRowClick(data.row.id)} />
    </div>
  );
}
