import { createContext, useContext, useMemo, useState, type ReactNode } from "react";

export type Lang = "id" | "en";

type Entry = { id: string; en: string };

const dict: Record<string, Entry> = {
  // ---------- Common ----------
  "common.save": { id: "Simpan", en: "Save" },
  "common.saveChanges": { id: "Simpan Perubahan", en: "Save Changes" },
  "common.cancel": { id: "Batal", en: "Cancel" },
  "common.delete": { id: "Hapus", en: "Delete" },
  "common.remove": { id: "Hapus", en: "Remove" },
  "common.edit": { id: "Edit", en: "Edit" },
  "common.add": { id: "Tambah", en: "Add" },
  "common.confirm": { id: "Konfirmasi", en: "Confirm" },
  "common.search": { id: "Cari", en: "Search" },
  "common.next": { id: "Lanjut", en: "Next" },
  "common.apply": { id: "Terapkan", en: "Apply" },
  "common.comingSoon": { id: "Segera hadir di prototipe ini", en: "Coming soon in this prototype" },

  // ---------- Splash / Onboarding ----------
  "splash.tagline": { id: "Kelola Keuanganmu dengan Mudah", en: "Manage Your Money with Ease" },
  "onb.skip": { id: "Lewati", en: "Skip" },
  "onb.getStarted": { id: "Mulai Sekarang", en: "Get Started" },
  "onb.p1.title": { id: "Catat Pemasukan", en: "Track Your Income" },
  "onb.p1.desc": {
    id: "Catat setiap pemasukan dari gaji, freelance, atau hadiah dalam hitungan detik.",
    en: "Record every income from salary, freelance, or gifts in seconds.",
  },
  "onb.p2.title": { id: "Kelola Pengeluaran", en: "Manage Expenses" },
  "onb.p2.desc": {
    id: "Pantau pengeluaran harianmu dengan kategori yang jelas dan visual yang rapi.",
    en: "Monitor your daily spending with clear categories and tidy visuals.",
  },
  "onb.p3.title": { id: "Capai Target Tabungan", en: "Achieve Savings Goals" },
  "onb.p3.desc": {
    id: "Tetapkan target tabungan dan lihat progresmu tumbuh setiap hari.",
    en: "Set savings goals and watch your progress grow every day.",
  },

  // ---------- Auth ----------
  "auth.welcome": { id: "Selamat Datang Kembali", en: "Welcome Back" },
  "auth.loginSubtitle": { id: "Masuk untuk mengelola keuanganmu", en: "Login to continue managing your money" },
  "auth.email": { id: "Email", en: "Email" },
  "auth.password": { id: "Kata Sandi", en: "Password" },
  "auth.forgot": { id: "Lupa Kata Sandi?", en: "Forgot Password?" },
  "auth.login": { id: "Masuk", en: "Login" },
  "auth.noAccount": { id: "Belum punya akun?", en: "Don't have an account?" },
  "auth.register": { id: "Daftar", en: "Register" },
  "auth.createAccount": { id: "Buat Akun", en: "Create Account" },
  "auth.registerSubtitle": { id: "Mulai perjalanan menuju kebebasan finansial.", en: "Start your journey to financial freedom." },
  "auth.fullName": { id: "Nama Lengkap", en: "Full Name" },
  "auth.confirmPassword": { id: "Konfirmasi Kata Sandi", en: "Confirm Password" },
  "auth.haveAccount": { id: "Sudah punya akun?", en: "Already have an account?" },
  "auth.minChars": { id: "Min. 6 karakter", en: "Min. 6 characters" },
  "auth.reenter": { id: "Masukkan ulang kata sandi", en: "Re-enter password" },
  "auth.mismatch": { id: "Kata sandi tidak cocok", en: "Passwords do not match" },

  // ---------- Bottom nav ----------
  "nav.home": { id: "Beranda", en: "Home" },
  "nav.history": { id: "Riwayat", en: "History" },
  "nav.reports": { id: "Laporan", en: "Reports" },
  "nav.profile": { id: "Profil", en: "Profile" },

  // ---------- Home ----------
  "home.greeting": { id: "Selamat datang,", en: "Welcome back," },
  "home.balance": { id: "Saldo Saat Ini", en: "Current Balance" },
  "home.income": { id: "Pemasukan", en: "Income" },
  "home.expense": { id: "Pengeluaran", en: "Expenses" },
  "home.addIncome": { id: "Pemasukan", en: "Income" },
  "home.addExpense": { id: "Pengeluaran", en: "Expense" },
  "home.addSavings": { id: "Tabungan", en: "Savings" },
  "home.topGoal": { id: "Target Tabungan Utama", en: "Top Savings Goal" },
  "home.recent": { id: "Transaksi Terbaru", en: "Recent Transactions" },
  "home.seeAll": { id: "Lihat Semua", en: "See All" },
  "home.of": { id: "dari", en: "of" },

  // ---------- Categories ----------
  "cat.Salary": { id: "Gaji", en: "Salary" },
  "cat.Freelance": { id: "Freelance", en: "Freelance" },
  "cat.Gift": { id: "Hadiah", en: "Gift" },
  "cat.Investment": { id: "Investasi", en: "Investment" },
  "cat.Food & Drink": { id: "Makanan & Minuman", en: "Food & Drink" },
  "cat.Shopping": { id: "Belanja", en: "Shopping" },
  "cat.Transport": { id: "Transportasi", en: "Transport" },
  "cat.Bills": { id: "Tagihan", en: "Bills" },
  "cat.Housing": { id: "Tempat Tinggal", en: "Housing" },
  "cat.Coffee": { id: "Kopi", en: "Coffee" },
  "cat.Health": { id: "Kesehatan", en: "Health" },
  "cat.Education": { id: "Pendidikan", en: "Education" },

  // ---------- Seeded notes ----------
  "note.salary": { id: "Gaji bulan ini", en: "This month's salary" },
  "note.lunch": { id: "Makan siang bareng tim", en: "Lunch with team" },
  "note.gojek": { id: "Gojek ke kantor", en: "Gojek to office" },
  "note.logo": { id: "Proyek desain logo", en: "Logo design project" },
  "note.headphones": { id: "Headphone baru", en: "New headphones" },
  "note.internet": { id: "Tagihan internet", en: "Internet bill" },
  "note.rent": { id: "Sewa kos bulanan", en: "Monthly room rent" },
  "note.pharmacy": { id: "Apotek", en: "Pharmacy" },
  "note.birthday": { id: "Hadiah dari ibu", en: "Birthday from mom" },
  "note.course": { id: "Kursus online", en: "Online course" },
  "note.groceries": { id: "Belanja kebutuhan", en: "Groceries" },

  // ---------- Goals ----------
  "goal.emergency": { id: "Dana Darurat", en: "Emergency Fund" },
  "goal.laptop": { id: "Laptop Baru", en: "New Laptop" },
  "goal.bali": { id: "Liburan ke Bali", en: "Bali Holiday" },

  // ---------- Transactions (add) ----------
  "tx.addIncome": { id: "Tambah Pemasukan", en: "Add Income" },
  "tx.addExpense": { id: "Tambah Pengeluaran", en: "Add Expense" },
  "tx.amount": { id: "Jumlah", en: "Amount" },
  "tx.category": { id: "Kategori", en: "Category" },
  "tx.date": { id: "Tanggal", en: "Date" },
  "tx.notes": { id: "Catatan", en: "Notes" },
  "tx.notePlaceholder": { id: "Tambahkan catatan (opsional)", en: "Add a note (optional)" },
  "tx.saveIncome": { id: "Simpan Pemasukan", en: "Save Income" },
  "tx.saveExpense": { id: "Simpan Pengeluaran", en: "Save Expense" },
  "tx.enterAmount": { id: "Masukkan jumlah terlebih dahulu", en: "Please enter an amount" },
  "tx.incomeAdded": { id: "Pemasukan {amt} ditambahkan", en: "Income of {amt} added" },
  "tx.expenseAdded": { id: "Pengeluaran {amt} ditambahkan", en: "Expense of {amt} added" },

  // ---------- Savings ----------
  "savings.title": { id: "Target Tabungan", en: "Savings Goals" },
  "savings.totalSaved": { id: "Total Tabungan", en: "Total Saved" },
  "savings.ofTarget": { id: "dari target {amt}", en: "of {amt} target" },
  "savings.reached": { id: "{pct}% dari semua target tercapai", en: "{pct}% of all goals reached" },
  "savings.addSavings": { id: "Tambah Tabungan", en: "Add Savings" },
  "savings.addTo": { id: "Tambah ke {name}", en: "Add to {name}" },
  "savings.amount": { id: "Jumlah", en: "Amount" },
  "savings.added": { id: "{amt} ditambahkan ke {name}", en: "{amt} added to {name}" },
  "savings.empty": { id: "Belum ada target tabungan", en: "No savings goals yet" },
  "savings.newGoal": { id: "Target Baru", en: "New Goal" },
  "savings.editGoal": { id: "Edit Target", en: "Edit Goal" },
  "savings.name": { id: "Nama Target", en: "Goal Name" },
  "savings.namePlaceholder": { id: "mis. Liburan ke Jepang", en: "e.g. Trip to Japan" },
  "savings.target": { id: "Jumlah Target", en: "Target Amount" },
  "savings.alreadySaved": { id: "Tabungan Awal (opsional)", en: "Already Saved (optional)" },
  "savings.color": { id: "Warna", en: "Color" },
  "savings.goalAdded": { id: "Target tabungan ditambahkan", en: "Savings goal added" },
  "savings.goalUpdated": { id: "Target tabungan diperbarui", en: "Savings goal updated" },
  "savings.goalRemoved": { id: "Target tabungan dihapus", en: "Savings goal deleted" },
  "savings.removeConfirm": { id: "Hapus target tabungan ini? Tabungan yang terkumpul tidak akan dikembalikan.", en: "Delete this savings goal? Saved progress will not be refunded." },
  "savings.incomplete": { id: "Masukkan nama dan target yang valid", en: "Please enter a valid name and target" },

  // ---------- Reminders ----------
  "rem.title": { id: "Pengingat", en: "Reminders" },
  "rem.intro": {
    id: "Tetap kelola keuanganmu dengan notifikasi tepat waktu.",
    en: "Stay on top of your finances with timely notifications.",
  },
  "rem.new": { id: "Pengingat Baru", en: "New Reminder" },
  "rem.editTitle": { id: "Edit Pengingat", en: "Edit Reminder" },
  "rem.titleLabel": { id: "Judul", en: "Title" },
  "rem.titlePlaceholder": { id: "mis. Catat pengeluaran harian", en: "e.g. Log daily expenses" },
  "rem.notifTime": { id: "Waktu Notifikasi", en: "Notification Time" },
  "rem.repeat": { id: "Pengulangan", en: "Repeat" },
  "rem.save": { id: "Simpan Pengingat", en: "Save Reminder" },
  "rem.saveChanges": { id: "Simpan Perubahan", en: "Save Changes" },
  "rem.added": { id: "Pengingat ditambahkan", en: "Reminder added" },
  "rem.updated": { id: "Pengingat diperbarui", en: "Reminder updated" },
  "rem.removed": { id: "Pengingat dihapus", en: "Reminder deleted" },
  "rem.removeConfirm": { id: "Hapus pengingat ini?", en: "Delete this reminder?" },
  "rem.enterTitle": { id: "Masukkan judul pengingat", en: "Please enter a reminder title" },
  "rem.editToast": { id: "Edit pengingat", en: "Edit reminder" },
  "rem.logDaily": { id: "Catat pengeluaran harian", en: "Log daily expenses" },
  "rem.electricity": { id: "Bayar tagihan listrik", en: "Pay electricity bill" },
  "rem.review": { id: "Tinjau target tabungan", en: "Review savings goals" },
  // repeat options
  "rep.daily": { id: "Setiap hari", en: "Every day" },
  "rep.sundays": { id: "Setiap Minggu", en: "Every Sunday" },
  "rep.monthly25": { id: "Bulanan · tgl 25", en: "Monthly · 25th" },
  "rep.weekdays": { id: "Hari kerja", en: "Weekdays" },

  // ---------- History ----------
  "hist.title": { id: "Riwayat Transaksi", en: "Transaction History" },
  "hist.search": { id: "Cari transaksi", en: "Search transactions" },
  "hist.f.all": { id: "Semua", en: "All" },
  "hist.f.today": { id: "Hari Ini", en: "Today" },
  "hist.f.7days": { id: "7 Hari", en: "7 Days" },
  "hist.f.30days": { id: "30 Hari", en: "30 Days" },
  "hist.f.income": { id: "Pemasukan", en: "Income" },
  "hist.f.expense": { id: "Pengeluaran", en: "Expense" },
  "hist.category": { id: "Kategori", en: "Category" },
  "hist.count": { id: "{n} transaksi", en: "{n} transactions" },
  "hist.empty": { id: "Tidak ada transaksi ditemukan", en: "No transactions found" },

  // ---------- Reports ----------
  "rep.title": { id: "Laporan Keuangan", en: "Financial Report" },
  "rep.totalIncome": { id: "Total Pemasukan", en: "Total Income" },
  "rep.totalExpense": { id: "Total Pengeluaran", en: "Total Expense" },
  "rep.totalSaved": { id: "Total Tabungan", en: "Total Saved" },
  "rep.savingsRate": { id: "Rasio Tabungan", en: "Savings Rate" },
  "rep.incomeVsExpense": { id: "Pemasukan vs Pengeluaran", en: "Income vs Expense" },
  "rep.last6": { id: "6 bulan terakhir", en: "Last 6 months" },
  "rep.breakdown": { id: "Rincian Pengeluaran Bulanan", en: "Monthly Expense Breakdown" },
  "rep.byCategory": { id: "Berdasarkan kategori", en: "By category" },
  "rep.insight": { id: "Wawasan Tabungan", en: "Savings Insight" },
  "rep.insightDesc": {
    id: "Kamu menabung {pct}% dari pemasukan periode ini — kerja bagus! Pertahankan di atas 20% untuk mencapai targetmu lebih cepat.",
    en: "You saved {pct}% of your income this period — great job! Keep it above 20% to reach your goals faster.",
  },
  "month.jan": { id: "Jan", en: "Jan" },
  "month.feb": { id: "Feb", en: "Feb" },
  "month.mar": { id: "Mar", en: "Mar" },
  "month.apr": { id: "Apr", en: "Apr" },
  "month.may": { id: "Mei", en: "May" },
  "month.jun": { id: "Jun", en: "Jun" },

  // ---------- Profile ----------
  "profile.title": { id: "Profil", en: "Profile" },
  "profile.edit": { id: "Edit", en: "Edit" },
  "profile.stat.balance": { id: "Saldo", en: "Balance" },
  "profile.stat.transactions": { id: "Transaksi", en: "Transactions" },
  "profile.stat.goals": { id: "Target", en: "Goals" },
  "profile.section.notifications": { id: "Pengaturan Notifikasi", en: "Notification Settings" },
  "profile.section.security": { id: "Pengaturan Keamanan", en: "Security Settings" },
  "profile.section.general": { id: "Umum", en: "General" },
  "profile.pushNotifications": { id: "Notifikasi Push", en: "Push Notifications" },
  "profile.biometric": { id: "Login Biometrik", en: "Biometric Login" },
  "profile.changePassword": { id: "Ubah Kata Sandi", en: "Change Password" },
  "profile.privacyData": { id: "Privasi & Data", en: "Privacy & Data" },
  "profile.paymentMethods": { id: "Metode Pembayaran", en: "Payment Methods" },
  "profile.language": { id: "Bahasa", en: "Language" },
  "profile.helpSupport": { id: "Bantuan & Dukungan", en: "Help & Support" },
  "profile.logout": { id: "Keluar", en: "Logout" },
  "profile.logoutConfirm": {
    id: "Anda perlu masuk kembali untuk mengakses akun Anda.",
    en: "You will need to sign in again to access your account.",
  },
  "profile.notifOn": { id: "Notifikasi push diaktifkan", en: "Push notifications enabled" },
  "profile.notifOff": { id: "Notifikasi push dinonaktifkan", en: "Push notifications disabled" },
  "profile.bioOn": { id: "Login biometrik diaktifkan", en: "Biometric login enabled" },
  "profile.bioOff": { id: "Login biometrik dinonaktifkan", en: "Biometric login disabled" },

  // ---------- Edit Profile ----------
  "ep.title": { id: "Edit Profil", en: "Edit Profile" },
  "ep.changePhoto": { id: "Ubah Foto", en: "Change Photo" },
  "ep.none": { id: "Tanpa", en: "None" },
  "ep.fullName": { id: "Nama Lengkap", en: "Full Name" },
  "ep.email": { id: "Alamat Email", en: "Email Address" },
  "ep.phone": { id: "Nomor Telepon", en: "Phone Number" },
  "ep.invalidEmail": { id: "Masukkan alamat email yang valid", en: "Enter a valid email address" },
  "ep.checkFields": { id: "Periksa nama dan email Anda", en: "Please check your name and email" },
  "ep.updated": { id: "Profil diperbarui", en: "Profile updated" },

  // ---------- Change Password ----------
  "cp.title": { id: "Ubah Kata Sandi", en: "Change Password" },
  "cp.current": { id: "Kata Sandi Saat Ini", en: "Current Password" },
  "cp.new": { id: "Kata Sandi Baru", en: "New Password" },
  "cp.confirm": { id: "Konfirmasi Kata Sandi Baru", en: "Confirm New Password" },
  "cp.update": { id: "Perbarui Kata Sandi", en: "Update Password" },
  "cp.mismatch": { id: "Kata sandi tidak cocok", en: "Passwords do not match" },
  "cp.hint": { id: "Gunakan minimal 8 karakter", en: "Use at least 8 characters" },
  "cp.weak": { id: "Lemah", en: "Weak" },
  "cp.fair": { id: "Sedang", en: "Fair" },
  "cp.strong": { id: "Kuat", en: "Strong" },
  "cp.success": { id: "Kata sandi berhasil diubah", en: "Password changed successfully" },
  "cp.incomplete": { id: "Lengkapi semua kolom dengan benar", en: "Please complete all fields correctly" },
  "cp.note": {
    id: "Demi keamanan, jangan bagikan kata sandi Anda kepada siapa pun.",
    en: "For your security, never share your password with anyone.",
  },

  // ---------- Privacy & Data ----------
  "pv.title": { id: "Privasi & Data", en: "Privacy & Data" },
  "pv.section.data": { id: "Data Saya", en: "My Data" },
  "pv.section.legal": { id: "Privasi", en: "Privacy" },
  "pv.managePersonal": { id: "Kelola Data Pribadi", en: "Manage Personal Data" },
  "pv.managePersonalDesc": { id: "Lihat & perbarui informasi Anda", en: "View & update your info" },
  "pv.download": { id: "Unduh Data Saya", en: "Download My Data" },
  "pv.downloadDesc": { id: "Ekspor seluruh data keuangan", en: "Export all your financial data" },
  "pv.permissions": { id: "Izin Data", en: "Data Permissions" },
  "pv.permissionsDesc": { id: "Atur akses aplikasi", en: "Control app access" },
  "pv.policy": { id: "Kebijakan Privasi", en: "Privacy Policy" },
  "pv.deleteAccount": { id: "Hapus Akun", en: "Delete Account" },
  "pv.deleteConfirm": {
    id: "Tindakan ini permanen dan tidak dapat dibatalkan. Semua data keuangan Anda akan dihapus.",
    en: "This action is permanent and cannot be undone. All your financial data will be erased.",
  },
  "pv.downloadStarted": { id: "Menyiapkan data Anda…", en: "Preparing your data…" },
  "pv.deleteDisabled": { id: "Hapus akun dinonaktifkan di prototipe ini", en: "Account deletion is disabled in this prototype" },

  // ---------- Payment Methods ----------
  "pm.title": { id: "Metode Pembayaran", en: "Payment Methods" },
  "pm.intro": { id: "Kelola rekening bank dan e-wallet Anda.", en: "Manage your bank accounts and e-wallets." },
  "pm.addBank": { id: "Tambah Rekening Bank", en: "Add Bank Account" },
  "pm.addEwallet": { id: "Tambah E-Wallet", en: "Add E-Wallet" },
  "pm.default": { id: "Utama", en: "Default" },
  "pm.setDefault": { id: "Jadikan Utama", en: "Set as Default" },
  "pm.added": { id: "Metode pembayaran ditambahkan", en: "Payment method added" },
  "pm.removed": { id: "Metode pembayaran dihapus", en: "Payment method removed" },
  "pm.defaultSet": { id: "Metode utama diperbarui", en: "Default method updated" },
  "pm.newBank": { id: "Rekening Bank Baru", en: "New Bank Account" },
  "pm.newEwallet": { id: "E-Wallet Baru", en: "New E-Wallet" },
  "pm.editBank": { id: "Edit Rekening Bank", en: "Edit Bank Account" },
  "pm.editEwallet": { id: "Edit E-Wallet", en: "Edit E-Wallet" },
  "pm.updated": { id: "Metode pembayaran diperbarui", en: "Payment method updated" },
  "pm.provider": { id: "Penyedia", en: "Provider" },
  "pm.number": { id: "Nomor", en: "Number" },
  "pm.holder": { id: "Nama Pemilik", en: "Account Holder" },
  "pm.numberBank": { id: "No. Rekening", en: "Account No." },
  "pm.numberEwallet": { id: "No. HP / Akun", en: "Phone / Account No." },
  "pm.removeConfirm": { id: "Hapus metode pembayaran ini?", en: "Remove this payment method?" },
  "pm.incomplete": { id: "Lengkapi semua kolom dengan benar", en: "Please complete all fields correctly" },

  // ---------- Language ----------
  "lang.title": { id: "Pengaturan Bahasa", en: "Language Settings" },
  "lang.current": { id: "Bahasa saat ini", en: "Current language" },
  "lang.intro": { id: "Pilih bahasa aplikasi. Perubahan langsung diterapkan.", en: "Choose the app language. Changes apply instantly." },
  "lang.id": { id: "Bahasa Indonesia", en: "Bahasa Indonesia" },
  "lang.en": { id: "English", en: "English" },
  "lang.idSub": { id: "Bahasa default", en: "Default language" },
  "lang.enSub": { id: "Bahasa Inggris", en: "English" },

  // ---------- Help & Support ----------
  "hs.title": { id: "Bantuan & Dukungan", en: "Help & Support" },
  "hs.intro": { id: "Kami siap membantu Anda kapan saja.", en: "We're here to help anytime." },
  "hs.faq": { id: "FAQ", en: "FAQ" },
  "hs.faqDesc": { id: "Pertanyaan yang sering diajukan", en: "Frequently asked questions" },
  "hs.guide": { id: "Panduan Pengguna", en: "User Guide" },
  "hs.guideDesc": { id: "Pelajari cara memakai SakuKu", en: "Learn how to use SakuKu" },
  "hs.contact": { id: "Hubungi Dukungan", en: "Contact Support" },
  "hs.contactDesc": { id: "Balasan dalam 24 jam", en: "Reply within 24 hours" },
  "hs.feedback": { id: "Kirim Masukan", en: "Send Feedback" },
  "hs.feedbackDesc": { id: "Bagikan ide & saran Anda", en: "Share your ideas & suggestions" },
  "hs.report": { id: "Laporkan Masalah", en: "Report a Problem" },
  "hs.reportDesc": { id: "Beri tahu kami jika ada kendala", en: "Let us know if something's wrong" },
  "hs.chatOpened": { id: "Obrolan dukungan dibuka", en: "Support chat opened" },

  // ---------- Help Center ----------
  "hc.title": { id: "Pusat Bantuan", en: "Help Center" },
  "hc.search": { id: "Cari artikel bantuan", en: "Search help articles" },
  "hc.browse": { id: "Telusuri berdasarkan topik", en: "Browse by topic" },
  "hc.cat.transactions": { id: "Transaksi", en: "Transactions" },
  "hc.cat.savings": { id: "Tabungan", en: "Savings" },
  "hc.cat.security": { id: "Keamanan", en: "Security" },
  "hc.cat.payments": { id: "Pembayaran", en: "Payments" },
  "hc.cat.account": { id: "Akun", en: "Account" },
  "hc.cat.other": { id: "Lainnya", en: "Other" },
  "hc.results": { id: "Hasil ({n})", en: "Results ({n})" },
  "hc.faqTitle": { id: "Pertanyaan yang Sering Diajukan", en: "Frequently Asked Questions" },
  "hc.noResults": { id: "Tidak ada artikel ditemukan", en: "No articles found" },
  "hc.stillHelp": { id: "Masih butuh bantuan?", en: "Still need help?" },
  "hc.replyTime": { id: "Tim dukungan kami membalas dalam 24 jam.", en: "Our support team replies within 24 hours." },
  "hc.contact": { id: "Hubungi Dukungan", en: "Contact Support" },
  "hc.chatOpened": { id: "Obrolan dukungan dibuka", en: "Support chat opened" },
  "hc.q1": { id: "Bagaimana cara menambah transaksi baru?", en: "How do I add a new transaction?" },
  "hc.a1": {
    id: "Tekan tombol hijau + di navigasi bawah, pilih Pemasukan atau Pengeluaran, masukkan jumlah dan kategori, lalu tekan Simpan.",
    en: "Tap the green + button in the bottom navigation, choose Income or Expense, enter the amount and category, then tap Save.",
  },
  "hc.q2": { id: "Bagaimana cara membuat target tabungan?", en: "How do I create a savings goal?" },
  "hc.a2": {
    id: "Buka Tabungan dari beranda, lalu tambahkan jumlah target. SakuKu melacak progresmu otomatis.",
    en: "Go to Savings from the home screen, then add a target amount. SakuKu tracks your progress automatically.",
  },
  "hc.q3": { id: "Apakah data keuangan saya aman?", en: "Is my financial data secure?" },
  "hc.a3": {
    id: "Ya. Semua data dienkripsi menyeluruh, dan Anda dapat mengaktifkan login biometrik di Pengaturan Keamanan.",
    en: "Yes. All data is encrypted end-to-end, and you can enable biometric login in Security Settings.",
  },
  "hc.q4": { id: "Bisakah saya mengekspor laporan keuangan?", en: "Can I export my financial reports?" },
  "hc.a4": {
    id: "Ya. Buka Profil → Privasi & Data → Unduh Data Saya dan pilih format yang diinginkan.",
    en: "Yes. Open Profile → Privacy & Data → Download My Data and choose your format.",
  },
  "hc.q5": { id: "Bagaimana cara mengganti bahasa aplikasi?", en: "How do I change the app language?" },
  "hc.a5": {
    id: "Buka Profil → Bahasa untuk beralih antara Bahasa Indonesia dan English.",
    en: "Open Profile → Language to switch between Bahasa Indonesia and English.",
  },

  // ---------- About App ----------
  "about.title": { id: "Tentang SakuKu", en: "About SakuKu" },
  "about.version": { id: "Versi 1.0.0 (Build 100)", en: "Version 1.0.0 (Build 100)" },
  "about.desc": {
    id: "SakuKu membantu pelajar dan profesional muda mencatat pemasukan, mengelola pengeluaran, dan mencapai target tabungan — semua dalam satu aplikasi yang sederhana.",
    en: "SakuKu helps students and young professionals track income, manage expenses, and reach savings goals — all in one clean, simple app.",
  },
  "about.legal": { id: "Hukum", en: "Legal" },
  "about.terms": { id: "Syarat & Ketentuan", en: "Terms & Conditions" },
  "about.privacy": { id: "Kebijakan Privasi", en: "Privacy Policy" },
  "about.licenses": { id: "Lisensi", en: "Licenses" },
  "about.connect": { id: "Terhubung", en: "Connect" },
  "about.rate": { id: "Beri Nilai SakuKu", en: "Rate SakuKu" },
  "about.share": { id: "Bagikan ke Teman", en: "Share with Friends" },
  "about.website": { id: "Kunjungi Situs Web", en: "Visit Website" },
  "about.shareCopied": { id: "Tautan berbagi disalin", en: "Share link copied" },
  "about.copyright": { id: "© 2026 SakuKu. Hak cipta dilindungi.", en: "© 2026 SakuKu. All rights reserved." },
};

interface I18nValue {
  lang: Lang;
  locale: string;
  setLang: (l: Lang) => void;
  t: (key: string, params?: Record<string, string | number>) => string;
}

const I18nContext = createContext<I18nValue | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("id");
  const value = useMemo<I18nValue>(
    () => ({
      lang,
      locale: lang === "id" ? "id-ID" : "en-US",
      setLang,
      t: (key, params) => {
        let str = dict[key]?.[lang] ?? dict[key]?.en ?? key;
        if (params) {
          for (const [k, v] of Object.entries(params)) {
            str = str.replace(new RegExp(`\\{${k}\\}`, "g"), String(v));
          }
        }
        return str;
      },
    }),
    [lang],
  );
  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
}
