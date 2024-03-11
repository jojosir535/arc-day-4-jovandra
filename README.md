# arc-day-4-jovandra
Ini adalah repository program ExpressJS yang menghandle data movies.json.

Panduan Program ExpressJS:

Untuk menjalankan program ini:
Jalankan intepreter Node.JS dengan command di terminal/cmd "node index.js". Pastikan index.js dan movies.json berada di folder sama.

Untuk membaca file dari data JSON:
Buka http://localhost:3000/movies pada browser

Untuk menampilkan rincian film berdasarkan imdbID:
Buka http://localhost:3000/movies/[imdbID], contoh: http://localhost:3000/movies/tt0875609

Untuk menambahkan film baru:
Jalankan command ini pada terminal/cmd:
```
curl -X POST -H "Content-Type: application/json" -d "{\"Title\":\"Movie Title\", \"Year\":2022, \"imdbID\":\"tt1234567\", \"Type\":\"movie\", \"Poster\":\"http://example.com/poster.jpg\"}" http://localhost:3000/movies
```
Contoh:
```
curl -X POST -H "Content-Type: application/json" -d "{\"Title\":\"Agak Laen\", \"Year\":2024, \"imdbID\":\"tt28856462\", \"Type\":\"movie\", \"Poster\":\"https://static.promediateknologi.id/crop/0x0:0x0/0x0/webp/photo/p2/230/2024/02/02/poster-agak-laen-1642305654.jpg\"}" http://localhost:3000/movies
```
Untuk menghapus film berdasarkan imdbID:
Jalankan command ini pada terminal/cmd:
```
curl -X DELETE http://localhost:3000/movies/[imdbID]
```
Contoh: 
```
curl -X DELETE http://localhost:3000/movies/tt28856462
```
Untuk memperbarui film berdasarkan imdbID:
Jalankan command ini pada terminal/cmd:
```
curl -X PUT -H "Content-Type: application/json" -d "{\"Title\":\"[Judul Baru]\", \"Year\":2023, \"Type\":\"movie\", \"Poster\":\"[URL baru]"}" http://localhost:3000/movies/[imdbID]
```
Contoh:
```
curl -X PUT -H "Content-Type: application/json" -d "{\"Title\":\"Updated Movie Title\", \"Year\":2023, \"Type\":\"updated\", \"Poster\":\"http://example.com/updated_poster.jpg\"}" http://localhost:3000/movies/tt0875609
```
Untuk mencari film sesuai nama:
Jalankan command:
```
curl -X GET http://localhost:3000/search?Title="[Judul Film]"
```
Contoh:
```
curl -X GET http://localhost:3000/search?Title="Detective"
```
Untuk menutup program ini:
Tekan CTRL+C pada terminal/cmd untuk menutup intepreter.
