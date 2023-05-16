// Ini adalah contoh skrip JavaScript yang menggunakan token dari localStorage

// Mengimpor modul 'axios' untuk melakukan permintaan HTTP
const axios = require('axios');

// Mengambil token dari localStorage
const accessToken = localStorage.getItem('TinderWeb/APIToken');

// Memastikan token tersedia sebelum melanjutkan
if (!accessToken) {
  console.log('Token tidak ditemukan di localStorage');
  return;
}

// Mengambil daftar pengguna yang menyukai Anda
axios.get('https://api.gotinder.com/v2/fast-match/preview', {
  headers: {
    'Authorization': `Bearer ${accessToken}`
  }
})
  .then(response => {
    const likedUsers = response.data.data.results;
    
    // Mengambil foto-foto pengguna yang menyukai Anda
    likedUsers.forEach(user => {
      const photos = user.photos;

      // Mengambil foto bersih dari setiap pengguna
      photos.forEach(photo => {
        if (photo.processedFiles && photo.processedFiles.length > 0) {
          const cleanPhotoUrl = photo.processedFiles[0].url;
          console.log(cleanPhotoUrl);
        }
      });
    });
  })
  .catch(error => {
    console.log('Terjadi kesalahan saat mengambil pengguna yang menyukai Anda:', error);
  });
