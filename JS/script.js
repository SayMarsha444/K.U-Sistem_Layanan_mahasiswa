// Logika yang berjalan ketika seluruh DOM selesai dimuat
document.addEventListener("DOMContentLoaded", () => {
    const formLayanan = document.getElementById("formLayanan");
    const tabelData = document.getElementById("tabelData");
    const btnClear = document.getElementById("btnClear"); 

    // --- LOGIKA HALAMAN FORM ---
    if (formLayanan) {
        formLayanan.addEventListener("submit", (e) => {
            e.preventDefault(); // Mencegah reload halaman saat submit

            // Ambil data nilai dari form
            const nama = document.getElementById("nama").value;
            const nim = document.getElementById("nim").value;
            const jenisLayanan = document.getElementById("jenisLayanan").value;
            const keterangan = document.getElementById("keterangan").value;

            // Buat objek data baru
            const dataBaru = { nama, nim, jenisLayanan, keterangan };

            // Ambil data lama dari localStorage (jika ada), lalu tambahkan data baru
            let listData = JSON.getLocalStorageData();
            listData.push(dataBaru);

            // Simpan kembali ke localStorage
            localStorage.setItem("dataLayanan", JSON.stringify(listData));

            // Reset Form & Beri Notifikasi
            formLayanan.reset();
            alert("Data berhasil disimpan! Silakan cek di halaman Tabel Data.");
        });
    }

    // --- LOGIKA HALAMAN TABEL ---
    if (tabelData) {
        renderTabel();

        // Tombol hapus semua data
        if (btnClear) {
            btnClear.addEventListener("click", () => {
                if (confirm("Apakah Anda yakin ingin menghapus semua data?")) {
                    localStorage.removeItem("dataLayanan");
                    renderTabel();
                }
            });
        }
    }
});

// Fungsi pembantu untuk mengambil data dari localStorage secara aman
JSON.getLocalStorageData = function() {
    const dataRaw = localStorage.getItem("dataLayanan");
    return dataRaw ? JSON.parse(dataRaw) : [];
};

// Fungsi untuk merender data dari localStorage ke elemen tabel HTML
function renderTabel() {
    const tbody = document.querySelector("#tabelData tbody");
    if (!tbody) return;

    tbody.innerHTML = ""; // Bersihkan isi tabel lama
    const listData = JSON.getLocalStorageData();

    if (listData.length === 0) {
        tbody.innerHTML = `<tr><td colspan="5" style="text-align: center; color: #64748b;">Belum ada data terkumpul.</td></tr>`;
        return;
    }

    // Loop data untuk dimasukkan ke baris tabel
    listData.forEach((item, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${item.nama}</td>
            <td>${item.nim}</td>
            <td>${item.jenisLayanan}</td>
            <td>${item.keterangan}</td>
        `;
        tbody.appendChild(row);
    });
}
