// Diva Savitri = biar kode berjalan tidak terlalu cepat
document.addEventListener('DOMContentLoaded', function() {
    
    // Diva Savitri = akses untuk mengendalikan tiap apa yang kiota lakukan seperti menunjuk/pencet
    const display = document.getElementById('display');
    const statusImage = document.getElementById('statusImage');
    const buttons = document.querySelectorAll('.btn-calc'); // Mengakses semua tombol kalkulator

    // Diva Savitri = Menyimpan alamat gambar/foto
    const imgNormal = 'https://placehold.co/400x100/374151/E5E7EB?text=Kalkulator';
    const imgSuccess = 'https://placehold.co/400x100/16A34A/FFFFFF?text=Sukses!';
    const imgError = 'https://placehold.co/400x100/DC2626/FFFFFF?text=Error!';

    /**
      Diva Savitri = mengubah tampilan gambar status
     */
    function changeImage(state) {
        if (state === 'success') {
            statusImage.src = imgSuccess;
            statusImage.alt = "Perhitungan Sukses";
        } else if (state === 'error') {
            statusImage.src = imgError;
            statusImage.alt = "Error Perhitungan";
        } else {
            // Diva Savitri = kondisi default yang dimana bukan sukses atau error
            statusImage.src = imgNormal;
            statusImage.alt = "Status Kalkulator";
        }
    }

    /**
      Diva Savitri = mengembalikan status kayak awal 
     */
    function clearDisplay() {
        display.value = '';
        changeImage('normal'); // Memanggil function untuk merubah gambar
    }

    /**
      Diva Savitri = mengahapus satu karakter diakhir
     */
    function deleteLastChar() {
        display.value = display.value.slice(0, -1);
    }

    /**
      Diva Savitri = menambahkan karakter
     */
    function appendToDisplay(value) {
        display.value += value;
    }

    /**
      Diva Savitri = mengeluarkan hasil
     */
    function calculateResult() {
        // Diva Savitri = mencegah kalkulator menghitung hal yang kosong
        if (display.value === '') {
            changeImage('error');
            display.value = 'Kosong!';
            // Diva Savitri = untuk memberikan jeda waktu
            setTimeout(clearDisplay, 1500);
            return;
        }

        try {
            // Diva Savitri = untuk menghitung
            let result = eval(display.value
                .replace(/%/g, '/100') // mengubah format %
            ); 
            
            // Diva Savitri = Untuk memastikan hitungan valid
            if (isFinite(result)) {
                display.value = result;
                changeImage('success'); // sukses
            } else { // untuk memastikan hitungan
                throw new Error("Hasil tidak valid");
            }

        } catch (error) {
            console.error("Error kalkulasi:", error);
            display.value = 'Error';
            changeImage('error'); // untuk memastikan hitungan gagal 
            setTimeout(clearDisplay, 1500);
        }
    }


    // Diva Savitri = agar tombol bisa di pencet
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const value = button.getAttribute('data-value');

            // Diva Savitri = untuk mengontrol tindakan yang beda
            switch(value) {
                case 'C':
                    // untuk membuat display yang kosong
                    clearDisplay();
                    break;
                case 'DEL':
                    // untuk menghapus karakter terakhir
                    deleteLastChar();
                    break;
                case '=':
                    // untuk tombol hasil
                    calculateResult();
                    break;
                default:
                    // untuk memastikan layar bersih jika kita mulai ngetik error/sukses
                    if (statusImage.src === imgSuccess || statusImage.src === imgError) {
                        clearDisplay();
                    }
                    appendToDisplay(value);
                    break;
            }
        });
    });

    // Diva Savitri = fungsionalitas buat input di keyboard
    document.addEventListener('keydown', (e) => {
        const key = e.key;

        if (key >= '0' && key <= '9' || key === '.' || key === '+' || key === '-' || key === '*' || key === '/' || key === '%') {
            if (statusImage.src === imgSuccess || statusImage.src === imgError) {
                clearDisplay();
            }
            appendToDisplay(key);
            e.preventDefault();
        } else if (key === 'Enter' || key === '=') {
            calculateResult();
            e.preventDefault();
        } else if (key === 'Backspace') {
            deleteLastChar();
            e.preventDefault();
        } else if (key === 'Escape' || key.toLowerCase() === 'c') {
            clearDisplay();
            e.preventDefault();
        }
    });

});
        
