-- phpMyAdmin SQL Dump
-- version 4.5.2
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Sep 26, 2016 at 04:36 
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
  `id` int(11) NOT NULL,
  `kuesioner_id` int(11) NOT NULL,
  `keterangan` varchar(100) NOT NULL,
  `tipe` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `form_isian`
--

INSERT INTO `form_isian` (`id`, `kuesioner_id`, `keterangan`, `tipe`) VALUES
(64, 334, 'Nama', 'text'),
(65, 334, 'Usia', 'angka'),
(66, 334, 'Jenis Kelamin', 'gender'),
(67, 354, 'Nama', 'text'),
(68, 354, 'Usia', 'text');

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
(334, 'likert', 262, 9, 'Pengaruh cinta dan kasih sayang terhadap perilaku menyimpang anak muda kota Makassar', 'Penelitian ini menggunakan pendekatan kasih dan sayang kepada 500 pemuda kota Makassar yang terserang virus cinta.', '2016-09-24', 'L5QYhxYktG'),
(346, 'guttman', 0, 0, 'untuk guttman', 'jfio', '2016-09-25', 'QiqM5CP7Yk'),
(347, 'guttman', 0, 0, 'Iji', 'Keterangan diisi disini...', '2016-09-25', '1jLsq9eZVf'),
(348, 'guttman', 0, 0, 'fe', 'Keterangan diisi disini...', '2016-09-25', 'jM1nYw0wC3'),
(349, 'guttman', 0, 0, 'JJi', 'Keterangan diisi disini...', '2016-09-25', '2GUqAdXGBy'),
(350, 'guttman', 0, 0, 'Ijioj', 'Keterangan diisi disini...', '2016-09-25', '5KoCDpRQEC'),
(351, 'guttman', 0, 0, 'jio', 'Keterangan diisi disini...', '2016-09-25', 'fwR1bwjlaS'),
(353, 'guttman', 0, 0, 'guttman', 'Keterangan diisi disini...', '2016-09-25', 'HgxZ8DrJs7'),
(355, 'guttman', 0, 0, 'jfeioj', 'Keterangan diisi disini...', '2016-09-25', 'xdzFwEL4A4'),
(356, 'guttman', 0, 0, 'Ismail Sudirman', 'Keterangan diisi disini...', '2016-09-25', 'z2VHxqXYMR'),
(357, 'guttman', 0, 0, 'Halo', 'Keterangan diisi disini...', '2016-09-25', 'H4fWgwvm7f'),
(358, 'guttman', 0, 0, 'Helo', 'Keterangan diisi disini...', '2016-09-25', 'yKG0yTHdQv'),
(359, 'guttman', 0, 0, 'Data baru yang banyak', 'Keterangan diisi disini...', '2016-09-25', 'JpF7gESE3h'),
(360, 'guttman', 0, 0, 'Linux', 'joij Keterangan diisi disini...', '2016-09-25', 'UDJWBlTokC'),
(361, 'guttman', 0, 0, 'Linux', 'Keterangan diisi disini...', '2016-09-25', '8WR2eKFeTG'),
(362, 'guttman', 0, 0, 'Linux', 'Keterangan diisi disini...', '2016-09-25', 'SB13OAAJsH'),
(363, 'guttman', 0, 0, 'Keren...', 'Keterangan diisi disini...', '2016-09-25', 'l8fQEI5yBs');

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
  `id` int(11) NOT NULL,
  `kuesioner_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `q_gutman`
--

INSERT INTO `q_gutman` (`id`, `kuesioner_id`) VALUES
(1, 346),
(2, 347),
(3, 348),
(4, 349),
(5, 350),
(6, 351),
(7, 353),
(8, 355),
(9, 356),
(10, 357),
(11, 358),
(12, 359),
(13, 360),
(14, 361),
(15, 362),
(16, 363);

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

--
-- Dumping data for table `q_gutman_pilihan_f`
--

INSERT INTO `q_gutman_pilihan_f` (`id`, `nilai`, `keterangan`, `q_gutman_id`) VALUES
(1, 89, 'Jijoi', 16);

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

--
-- Dumping data for table `q_gutman_pilihan_uf`
--

INSERT INTO `q_gutman_pilihan_uf` (`id`, `q_gutman_id`, `nilai`, `keterangan`) VALUES
(1, 16, 89, 'Jijoi');

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
(262, 334),
(263, 335),
(264, 336),
(265, 337),
(266, 338),
(267, 339),
(268, 340),
(269, 341),
(270, 342),
(271, 343),
(272, 344),
(273, 345),
(274, 352),
(275, 354);

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
(203, 262, 4, 'Sangat Sesuai'),
(204, 262, 3, 'Sesuai'),
(205, 262, 2, 'Tidak Sesuai'),
(206, 262, 1, 'Sangat Tidak Sesuai'),
(207, 263, 88, 'Ijieo'),
(208, 263, 8, 'jioj'),
(209, 263, 88, 'ejwoij'),
(210, 264, 88, '3'),
(211, 265, 88, 'jioj'),
(212, 265, 8, 'i8j'),
(213, 265, 89998, '888'),
(214, 275, 8, 'jioj'),
(215, 275, 89, 'Iki');

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
(203, 262, 1, 'Sangat Sesuai'),
(204, 262, 2, 'Sesuai'),
(205, 262, 3, 'Tidak Sesuai'),
(206, 262, 4, 'Sangat Tidak Sesuai'),
(207, 263, 88, 'Ijieo'),
(208, 263, 8, 'jioj'),
(209, 263, 88, 'ejwoij'),
(210, 264, 88, '3'),
(211, 265, 89998, 'jioj'),
(212, 265, 8, 'i8j'),
(213, 265, 88, '888'),
(214, 275, 89, 'jioj'),
(215, 275, 8, 'Iki');

-- --------------------------------------------------------

--
-- Table structure for table `q_rating`
--

CREATE TABLE `q_rating` (
  `id` int(11) NOT NULL,
  `nilai_min` int(11) NOT NULL,
  `nilai_max` int(11) NOT NULL,
  `kuesioner_id` int(11) NOT NULL
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
  `label_max` int(11) NOT NULL,
  `kuesioner_id` int(11) NOT NULL
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
(89, 0, 334, 0, 'Saya sangat senang ketika melihat lawan jenis yang menyenangkan', 'f'),
(90, 0, 334, 0, 'Saya sangat tidak senang ketika melihat lawan jenis yang menyebalkan', 'uf'),
(91, 0, 334, 0, 'Saya merasa nyaman berkenalan dengan sahabat baru karena kenyamanan darinya', 'f'),
(92, 0, 334, 0, 'Saya merasa tidak nyaman berkenaan dengan mengenal kenalan baru karena dia merasa tidak aman', 'uf'),
(93, 0, 334, 0, 'Hati saya layu tersipu malu seperti kayu dari sagu bila bertemu dengan orang lugu bawa sapu', 'f'),
(94, 0, 334, 0, 'Hati saya beku seperti abu vulkanik ketika merayu orang lugu yang tersipu malu tapi mau', 'uf'),
(95, 0, 354, 0, 'joijfe ', 'uf'),
(96, 0, 354, 0, 'Data joij f  weffe ', 'f'),
(97, 0, 354, 0, 'ff', 'uf');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `data`
--
ALTER TABLE `data`
  ADD PRIMARY KEY (`id_data`);

--
-- Indexes for table `form_isian`
--
ALTER TABLE `form_isian`
  ADD PRIMARY KEY (`id`);

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
-- AUTO_INCREMENT for table `form_isian`
--
ALTER TABLE `form_isian`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=69;
--
-- AUTO_INCREMENT for table `kuesioner`
--
ALTER TABLE `kuesioner`
  MODIFY `id_kuesioner` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=364;
--
-- AUTO_INCREMENT for table `peneliti`
--
ALTER TABLE `peneliti`
  MODIFY `id_peneliti` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;
--
-- AUTO_INCREMENT for table `q_gutman`
--
ALTER TABLE `q_gutman`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;
--
-- AUTO_INCREMENT for table `q_gutman_pilihan_f`
--
ALTER TABLE `q_gutman_pilihan_f`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `q_gutman_pilihan_uf`
--
ALTER TABLE `q_gutman_pilihan_uf`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `q_liker`
--
ALTER TABLE `q_liker`
  MODIFY `id_liker` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=276;
--
-- AUTO_INCREMENT for table `q_liker_pilihan_f`
--
ALTER TABLE `q_liker_pilihan_f`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=216;
--
-- AUTO_INCREMENT for table `q_liker_pilihan_uf`
--
ALTER TABLE `q_liker_pilihan_uf`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=216;
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
  MODIFY `id_soal` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=98;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
