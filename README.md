# Vitextile System - ERP Profesional

Sistem Enterprise Resource Planning (ERP) yang komprehensif untuk mengelola seluruh aspek bisnis tekstil.

## Fitur Utama

### 📊 Modul Keuangan & Akuntansi
- Manajemen invoice dan pembayaran
- Buku besar (General Ledger)
- Laporan keuangan otomatis
- Reconciliation

### 👥 Modul HR & Payroll
- Manajemen karyawan
- Pencatatan kehadiran
- Perhitungan gaji otomatis
- Manajemen cuti & lembur

### 📦 Modul Inventory
- Manajemen stok barang
- Multi-warehouse
- Tracking barang
- Reorder points

### 🛒 Modul Penjualan
- Manajemen pelanggan
- Pembuatan quotation & order
- Tracking pengiriman
- Invoice penjualan

### 🏭 Modul Produksi
- Perencanaan produksi
- Manajemen work order
- Tracking progress produksi
- Bill of Materials (BOM)

### 🤝 Modul Procurement
- Manajemen supplier
- Purchase order
- Receiving & inspection
- Supplier performance

### 📈 Modul Reporting & Dashboard
- Dashboard real-time
- Laporan analitik
- KPI monitoring
- Custom reports

## Tech Stack

- **Frontend**: Next.js + React + TypeScript
- **Backend**: Nest.js + TypeScript
- **Database**: PostgreSQL
- **Authentication**: JWT
- **API**: RESTful API

## Struktur Proyek

```
vitextile-system/
├── backend/           # Nest.js Backend
├── frontend/          # Next.js Frontend
├── docker-compose.yml # Docker configuration
└── README.md
```

## Instalasi & Setup

### Prerequisites
- Node.js v16+
- PostgreSQL 12+
- Docker (opsional)

### Setup Backend
```bash
cd backend
npm install
cp .env.example .env
npm run typeorm migration:run
npm run start:dev
```

### Setup Frontend
```bash
cd frontend
npm install
cp .env.local.example .env.local
npm run dev
```

## Dokumentasi

Lihat dokumentasi lengkap di folder `docs/`

## License

Proprietary - Vitextile System
