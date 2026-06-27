// --- KONFIGURASI PENGATURAN SUPER FAST ---
const MAX_PHOTOS_PER_FOLDER = 30; // Maksimal foto per folder yang akan di-cache
// Daftar folder yang ada di desktop kamu
const FOLDERS_TO_PRELOAD = ['camera', 'wisuda', 'kucing']; 

// Wadah memori untuk menyimpan elemen gambar yang sudah jadi (Cache)
const imageCache = {};

// --- DUAL BOOT GATEWAY ---
function bootToWindows() {
    document.getElementById('splash-screen').classList.add('hidden');
}

function bootToCyberpunk() {
    document.body.style.cursor = 'wait';
    document.querySelector('.please-wait').textContent = 'Redirecting to Matrix...';
    setTimeout(() => {
        window.location.href = '2/cyber/index.html';
    }, 500);
}

// --- FUNGSI PRELOAD (RAHASIA KECEPATAN INSTAN) ---
function preloadAllGalleries() {
    FOLDERS_TO_PRELOAD.forEach(folderName => {
        imageCache[folderName] = [];

        // Hantam semua request foto dari angka 1-30 secara paralel saat web baru dibuka
        for (let i = 1; i <= MAX_PHOTOS_PER_FOLDER; i++) {
            const imgUrl = `${folderName}/${i}.jpg`;
            const img = new Image();
            
            img.onload = function() {
                // Buat elemen kotaknya sekarang juga di memori (belum dimasukkan ke layar)
                const photoItem = document.createElement('div');
                photoItem.className = 'photo-item';
                photoItem.setAttribute('data-index', i);
                photoItem.innerHTML = `<img src="${imgUrl}" alt="Foto ${i}">`;
                
                photoItem.onclick = function() { 
                    openLightbox(imgUrl); 
                };
                
                // Simpan kotak yang sudah jadi ini ke dalam cache memori
                imageCache[folderName].push(photoItem);
            };
            
            img.src = imgUrl; // Unduh gambar diam-diam di latar belakang
        }
    });
}

// --- KONTROL MUAT GAMBAR (INSTAN DARI CACHE MEMORI) ---
function openFolder(folderName) {
    closeStartMenu();
    const win = document.getElementById('galleryWindow');
    const title = document.getElementById('windowTitle');
    const grid = document.getElementById('photoGridContent');
    
    title.textContent = `${folderName.toUpperCase()}.EXE`;
    grid.innerHTML = ''; 
    win.style.display = 'flex';

    // Ambil kotak gambar yang sudah di-download duluan dari memori cache
    const cachedItems = imageCache[folderName] || [];

    if (cachedItems.length === 0) {
        // Jaga-jaga jika internet super lemot dan preloading belum selesai saat folder diklik
        grid.innerHTML = '<div style="padding:10px; color:#000; font-size:18px;">Initializing files... Silakan coba klik folder lagi.</div>';
        return;
    }

    // Masukkan semua kotak gambar secara instan sekaligus ke layar
    cachedItems.forEach(item => grid.appendChild(item));
    
    // Rapikan urutan angkanya 1, 2, 3...
    sortGridItems(grid);
}

// Fungsi pembantu untuk merapikan urutan kotak di web
function sortGridItems(grid) {
    const items = Array.from(grid.children);
    items.sort((a, b) => {
        return parseInt(a.getAttribute('data-index')) - parseInt(b.getAttribute('data-index'));
    });
    grid.innerHTML = '';
    items.forEach(item => grid.appendChild(item));
}

// --- KONTROL START MENU ---
function toggleStartMenu(event) {
    event.stopPropagation();
    const menu = document.getElementById('startMenu');
    const btn = document.getElementById('startBtn');
    menu.classList.toggle('active');
    btn.classList.toggle('active');
}

function closeStartMenu() {
    document.getElementById('startMenu').classList.remove('active');
    document.getElementById('startBtn').classList.remove('active');
}

function closeFolder() {
    document.getElementById('galleryWindow').style.display = 'none';
}

// --- KONTROL LIGHTBOX GAMBAR ---
function openLightbox(url) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    lightboxImg.src = url;
    lightbox.classList.add('active');
}

// Fungsi preload dijalankan otomatis begitu browser selesai memuat file JS ini
preloadAllGalleries();

function closeLightbox() {
    document.getElementById('lightbox').classList.remove('active');
}

// Jam Digital Taskbar
function updateClock() {
    const now = new Date();
    let hours = now.getHours();
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    document.getElementById('liveClock').textContent = `${hours}:${minutes} ${ampm}`;
}
setInterval(updateClock, 1000);
updateClock();
