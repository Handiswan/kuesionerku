-- phpMyAdmin SQL Dump
-- version 4.5.2
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Sep 23, 2016 at 09:14 
-- Server version: 10.1.16-MariaDB
-- PHP Version: 5.6.24

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `kuesioner`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `user` varchar(30) NOT NULL,
  `password` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`user`, `password`) VALUES
('admin', 'admin');

-- --------------------------------------------------------

--
-- Table structure for table `data`
--

CREATE TABLE `data` (
  `id_data` int(10) NOT NULL,
  `id_soal` int(5) NOT NULL,
  `hasil` int(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `form_isian`
--

CREATE TABLE `form_isian` (
  `id` int(11) DEFAULT NULL,
  `kuesioner_id` int(11) NOT NULL,
  `keterangan` varchar(100) NOT NULL,
  `tipe` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `kuesioner`
--

CREATE TABLE `kuesioner` (
  `id_kuesioner` int(10) NOT NULL,
  `jenis_skala` char(10) NOT NULL,
  `id_skala` int(11) NOT NULL,
  `id_peneliti` int(10) NOT NULL,
  `judul_penelitian` text NOT NULL,
  `keterangan` text NOT NULL,
  `tanggal` date NOT NULL,
  `url` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `kuesioner`
--

INSERT INTO `kuesioner` (`id_kuesioner`, `jenis_skala`, `id_skala`, `id_peneliti`, `judul_penelitian`, `keterangan`, `tanggal`, `url`) VALUES
(267, 'likert', 195, 9, 'Skeffo', 'Keterangan diisi disini...', '2016-09-23', '3tV7sBCPYR'),
(268, 'likert', 196, 9, '6', 'Keterangan diisi disini...', '2016-09-23', 'YwNIK65mbv'),
(269, 'likert', 197, 9, 'ii', 'Keterangan diisi disini...', '2016-09-23', 'MvggY9vKie'),
(270, 'likert', 198, 9, '43', 'Keterangan diisi disini...', '2016-09-23', '4RIMHAzu1s'),
(271, 'likert', 199, 9, 'dsaf', 'Keterangan diisi disini...', '2016-09-23', 'vuwtnJg0iw'),
(272, 'likert', 200, 9, 'Rasi', 'Keterangan diisi disini...', '2016-09-23', 'ZgrfiRUvLm'),
(273, 'likert', 201, 9, 'Rasi', 'Keterangan diisi disini...', '2016-09-23', 'WxGLwXFyPn'),
(274, 'likert', 202, 9, 'jij', 'Keterangan diisi disini...', '2016-09-23', 'XohDpOVNQz'),
(275, 'likert', 203, 9, 'd', 'Keterangan diisi disini...', '2016-09-23', 'dV7jB9il1B'),
(276, 'likert', 204, 9, '11', 'Keterangan diisi disini...', '2016-09-23', '8LZHSsqm9M');

-- --------------------------------------------------------

--
-- Table structure for table `peneliti`
--

CREATE TABLE `peneliti` (
  `id_peneliti` int(100) NOT NULL,
  `nama_peneliti` varchar(30) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL,
  `ttl` date NOT NULL,
  `jenis_kelamin` varchar(12) NOT NULL,
  `alamat` varchar(100) NOT NULL,
  `kepentingan` varchar(12) NOT NULL,
  `konfirmasi` varchar(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `peneliti`
--

INSERT INTO `peneliti` (`id_peneliti`, `nama_peneliti`, `email`, `password`, `ttl`, `jenis_kelamin`, `alamat`, `kepentingan`, `konfirmasi`) VALUES
(5, 'Handi', 'handiswan@gmail.com', '6512bd43d9caa6e02c990b0a82652dca', '2016-05-01', 'Perempuan', 'aa', 'Pribadi', '0'),
(6, 'Indrawan', 'indrawan@gmail.com', '6512bd43d9caa6e02c990b0a82652dca', '2016-05-31', 'Laki-laki', 'MM', 'Pribadi', '0'),
(7, 'Handi', 'Handi@gmail.com', '698d51a19d8a121ce581499d7b701668', '2016-06-01', 'Laki-laki', 'Makassar', 'Pribadi', '0'),
(8, 'Anu', 'Anu@gmail.com', '202cb962ac59075b964b07152d234b70', '2016-09-01', 'Laki-laki', 'MMM', 'Organisasi', '0'),
(9, 'Ismail Sudirman', 'ismailsudirman@skeffo.com', 'ead49e57ab13cb79f9572b8cda10b96b', '1994-12-21', 'Laki-laki', 'Pekkabata, Pinrang, Indonesia', 'Pribadi', '0');

-- --------------------------------------------------------

--
-- Table structure for table `q_gutman`
--

CREATE TABLE `q_gutman` (
  `id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `q_gutman_pilihan_f`
--

CREATE TABLE `q_gutman_pilihan_f` (
  `id` int(11) NOT NULL,
  `nilai` int(11) NOT NULL,
  `keterangan` varchar(100) NOT NULL,
  `q_gutman_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `q_gutman_pilihan_uf`
--

CREATE TABLE `q_gutman_pilihan_uf` (
  `id` int(11) NOT NULL,
  `q_gutman_id` int(11) NOT NULL,
  `nilai` int(11) NOT NULL,
  `keterangan` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `q_liker`
--

CREATE TABLE `q_liker` (
  `id_liker` int(11) NOT NULL,
  `kuesioner_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `q_liker`
--

INSERT INTO `q_liker` (`id_liker`, `kuesioner_id`) VALUES
(195, 267),
(196, 268),
(197, 269),
(198, 270),
(199, 271),
(200, 272),
(201, 273),
(202, 274),
(203, 275),
(204, 276);

-- --------------------------------------------------------

--
-- Table structure for table `q_liker_pilihan_f`
--

CREATE TABLE `q_liker_pilihan_f` (
  `id` int(11) NOT NULL,
  `q_liker_id` int(11) NOT NULL,
  `nilai` int(11) NOT NULL,
  `keterangan` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `q_liker_pilihan_f`
--

INSERT INTO `q_liker_pilihan_f` (`id`, `q_liker_id`, `nilai`, `keterangan`) VALUES
(139, 195, 33, '123'),
(140, 196, 1, '666'),
(141, 197, 12, 'vsvs'),
(142, 198, 111, 'dqw'),
(143, 200, 2, 'ee'),
(144, 201, 8, 'j'),
(145, 202, 3, 'ii'),
(146, 203, 1, 'qq'),
(147, 204, 1, 'qq');

-- --------------------------------------------------------

--
-- Table structure for table `q_liker_pilihan_uf`
--

CREATE TABLE `q_liker_pilihan_uf` (
  `id` int(11) NOT NULL,
  `q_liker_id` int(11) NOT NULL,
  `nilai` int(11) NOT NULL,
  `keterangan` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `q_liker_pilihan_uf`
--

INSERT INTO `q_liker_pilihan_uf` (`id`, `q_liker_id`, `nilai`, `keterangan`) VALUES
(139, 195, 33, '123'),
(140, 196, 1, '666'),
(141, 197, 12, 'vsvs'),
(142, 198, 111, 'dqw'),
(143, 200, 2, 'ee'),
(144, 201, 8, 'j'),
(145, 202, 3, 'ii'),
(146, 203, 1, 'qq'),
(147, 204, 1, 'qq');

-- --------------------------------------------------------

--
-- Table structure for table `q_rating`
--

CREATE TABLE `q_rating` (
  `id` int(11) NOT NULL,
  `nilai_min` int(11) NOT NULL,
  `nilai_max` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `q_semantik`
--

CREATE TABLE `q_semantik` (
  `id` int(11) NOT NULL,
  `nilai_min` int(11) NOT NULL,
  `nilai_max` int(11) NOT NULL,
  `label_min` varchar(100) NOT NULL,
  `label_max` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `responden`
--

CREATE TABLE `responden` (
  `id_responden` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `responden_info`
--

CREATE TABLE `responden_info` (
  `id` int(11) NOT NULL,
  `form_isian_id` int(11) NOT NULL,
  `nilai` varchar(100) NOT NULL,
  `keterangan` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `soal`
--

CREATE TABLE `soal` (
  `id_soal` int(10) NOT NULL,
  `id_responden` int(10) NOT NULL,
  `id_kuesioner` int(10) NOT NULL,
  `no_soal` int(11) NOT NULL,
  `pertanyaan` text NOT NULL,
  `f_or_uf` varchar(2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `soal`
--

INSERT INTO `soal` (`id_soal`, `id_responden`, `id_kuesioner`, `no_soal`, `pertanyaan`, `f_or_uf`) VALUES
(1, 0, 223, 0, 'Siapa nama saya?', 'f'),
(2, 0, 223, 0, 'Siapa nama saya?', 'f'),
(3, 0, 224, 0, 'Saya update lagi ljhih', 'f'),
(4, 0, 226, 0, '', 'f'),
(5, 0, 227, 0, '', 'f'),
(6, 0, 228, 0, 'iii', 'f'),
(8, 0, 230, 0, 'Siapa nama saya?', 'f'),
(9, 0, 231, 0, 'Siapa nama Anda', 'uf'),
(10, 0, 232, 0, 'Seperti apa layanan kami', 'f'),
(11, 0, 233, 0, '', 'f'),
(12, 0, 234, 0, '', 'f'),
(13, 0, 235, 0, '', 'f'),
(14, 0, 235, 0, '', 'f'),
(15, 0, 235, 0, '', 'f'),
(16, 0, 236, 0, 'Data baru', 'f'),
(17, 0, 236, 0, 'Saya perbaharui lagi', 'f'),
(18, 0, 236, 0, '', 'f'),
(21, 0, 237, 0, 'Test lgi', 'f'),
(22, 0, 258, 0, '', 'f'),
(23, 0, 259, 0, '', 'f'),
(24, 0, 260, 0, '', 'f'),
(25, 0, 261, 0, '3f32', 'f'),
(26, 0, 262, 0, '', 'uf'),
(27, 0, 262, 0, 'fewf', 'f'),
(28, 0, 262, 0, 'fwefewfwef', 'f'),
(29, 0, 263, 0, 'Linux', 'f'),
(30, 0, 264, 0, '12', 'f'),
(31, 0, 265, 0, '1', 'f'),
(32, 0, 267, 0, '3', 'f'),
(33, 0, 269, 0, '', 'f'),
(34, 0, 270, 0, '12', 'f'),
(35, 0, 272, 0, 'ddd', 'f'),
(36, 0, 273, 0, '00', 'f'),
(37, 0, 275, 0, '11', 'f'),
(38, 0, 276, 0, '11', 'f');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `data`
--
ALTER TABLE `data`
  ADD PRIMARY KEY (`id_data`);

--
-- Indexes for table `kuesioner`
--
ALTER TABLE `kuesioner`
  ADD PRIMARY KEY (`id_kuesioner`);

--
-- Indexes for table `peneliti`
--
ALTER TABLE `peneliti`
  ADD PRIMARY KEY (`id_peneliti`);

--
-- Indexes for table `q_gutman`
--
ALTER TABLE `q_gutman`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `q_gutman_pilihan_f`
--
ALTER TABLE `q_gutman_pilihan_f`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `q_gutman_pilihan_uf`
--
ALTER TABLE `q_gutman_pilihan_uf`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `q_liker`
--
ALTER TABLE `q_liker`
  ADD PRIMARY KEY (`id_liker`);

--
-- Indexes for table `q_liker_pilihan_f`
--
ALTER TABLE `q_liker_pilihan_f`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `q_liker_pilihan_uf`
--
ALTER TABLE `q_liker_pilihan_uf`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `q_rating`
--
ALTER TABLE `q_rating`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `q_semantik`
--
ALTER TABLE `q_semantik`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `responden`
--
ALTER TABLE `responden`
  ADD PRIMARY KEY (`id_responden`);

--
-- Indexes for table `responden_info`
--
ALTER TABLE `responden_info`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `soal`
--
ALTER TABLE `soal`
  ADD PRIMARY KEY (`id_soal`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `data`
--
ALTER TABLE `data`
  MODIFY `id_data` int(10) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `kuesioner`
--
ALTER TABLE `kuesioner`
  MODIFY `id_kuesioner` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=277;
--
-- AUTO_INCREMENT for table `peneliti`
--
ALTER TABLE `peneliti`
  MODIFY `id_peneliti` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;
--
-- AUTO_INCREMENT for table `q_gutman_pilihan_f`
--
ALTER TABLE `q_gutman_pilihan_f`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `q_gutman_pilihan_uf`
--
ALTER TABLE `q_gutman_pilihan_uf`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `q_liker`
--
ALTER TABLE `q_liker`
  MODIFY `id_liker` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=205;
--
-- AUTO_INCREMENT for table `q_liker_pilihan_f`
--
ALTER TABLE `q_liker_pilihan_f`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=148;
--
-- AUTO_INCREMENT for table `q_liker_pilihan_uf`
--
ALTER TABLE `q_liker_pilihan_uf`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=148;
--
-- AUTO_INCREMENT for table `q_rating`
--
ALTER TABLE `q_rating`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `q_semantik`
--
ALTER TABLE `q_semantik`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `responden`
--
ALTER TABLE `responden`
  MODIFY `id_responden` int(10) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `responden_info`
--
ALTER TABLE `responden_info`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `soal`
--
ALTER TABLE `soal`
  MODIFY `id_soal` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=39;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
