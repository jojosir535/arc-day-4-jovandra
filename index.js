const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
const PORT = 3000; // Port yang dipakai adalah 3000
const dataPath = './movies.json'; // Lokasi file JSON yang berisi data film

// Middleware untuk parsing request body
app.use(bodyParser.json());

// Fungsi untuk membaca data dari file JSON
const readData = () => {
  const jsonData = fs.readFileSync(dataPath);
  return JSON.parse(jsonData);
};

// Fungsi untuk menyimpan data ke file JSON
const saveData = (data) => {
  const stringifyData = JSON.stringify(data, null, 2);
  fs.writeFileSync(dataPath, stringifyData);
};

// Endpoint redirect dari / ke /movies
app.get('/', (req, res) => {
  res.redirect('/movies');
});

// Endpoint untuk menampilkan semua film
app.get('/movies', (req, res) => {
  res.json(readData());
});

// Endpoint untuk menampilkan rincian film berdasarkan imdbID
app.get('/movies/:id', (req, res) => {
  const movies = readData();
  const movie = movies.find(m => m.imdbID === req.params.id);
  if (movie) {
    res.json(movie);
  } else {
    res.status(404).send('Film tidak ditemukan');
  }
});

// Endpoint untuk menambahkan film baru
app.post('/movies', (req, res) => {
  const { Title, Year, imdbID, Type, Poster } = req.body;
  const movies = readData();
  movies.push({ Title, Year, imdbID, Type, Poster });
  saveData(movies);
  res.status(201).send('Film berhasil ditambahkan');
});

// Endpoint untuk menghapus film
app.delete('/movies/:id', (req, res) => {
  let movies = readData();
  movies = movies.filter(m => m.imdbID !== req.params.id);
  saveData(movies);
  res.send('Film berhasil dihapus');
});

// Endpoint untuk memperbarui film
app.put('/movies/:id', (req, res) => {
  const { Title, Year, Type, Poster } = req.body;
  const movies = readData();
  const movieIndex = movies.findIndex(m => m.imdbID === req.params.id);
  if (movieIndex !== -1) {
    movies[movieIndex] = { ...movies[movieIndex], Title, Year, Type, Poster };
    saveData(movies);
    res.send('Film berhasil diperbarui');
  } else {
    res.status(404).send('Film tidak ditemukan');
  }
});

// Endpoint untuk mencari film berdasarkan nama
app.get('/search', (req, res) => {
  const { Title } = req.query;
  
  // Memastikan judul merupakan string
  if (typeof Title === 'string') {
    const movies = readData();
    const searchedMovies = movies.filter(m => m.Title.toLowerCase().includes(Title.toLowerCase()));
    res.json(searchedMovies);
  } else {
    // Jika query "?Title=" kosong atau bukan string, muncul pesan error
    res.status(400).json({error: "Masukkan judul yang benar"});
  }
});

// Menyimpan data ketika server akan dimatikan dengan CTRL+C pada backend
process.on('SIGINT', () => {
  // Logika untuk menyimpan data ke file sebelum server dimatikan
  console.log('\nMenyimpan data...');
  // Simulasi penyimpanan data
  console.log('Data disimpan di ' + dataPath);
  process.exit();
});

app.listen(PORT, () => {
  console.log(`Server berjalan pada port ${PORT}`);
});