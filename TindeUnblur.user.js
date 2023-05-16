// ==UserScript==
// @name         Tinder API Script
// @namespace    your-namespace
// @version      1.0
// @description  Script to get clean photos of users who liked you on Tinder API
// @author       Your Name
// @match        https://example.com/*  // Ganti dengan URL Tinder atau halaman yang sesuai
// @grant        GM_xmlhttpRequest
// ==/UserScript==

(function() {
    'use strict';

    // Mengambil token dari localStorage
    const accessToken = localStorage.getItem('TinderWeb/APIToken');

    // Memastikan token tersedia sebelum melanjutkan
    if (!accessToken) {
        console.log('Token tidak ditemukan di localStorage');
        return;
    }

    // Mengambil daftar pengguna yang menyukai Anda
    GM_xmlhttpRequest({
        method: 'GET',
        url: 'https://api.gotinder.com/v2/fast-match/preview',
        headers: {
            'Authorization': `Bearer ${accessToken}`
        },
        onload: function(response) {
            const likedUsers = JSON.parse(response.responseText).data.results;

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
        },
        onerror: function(error) {
            console.log('Terjadi kesalahan saat mengambil pengguna yang menyukai Anda:', error);
        }
    });

})();
