-- phpMyAdmin SQL Dump
-- version 4.2.7.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Sep 19, 2016 at 05:57 AM
-- Server version: 5.6.20
-- PHP Version: 5.5.15

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `kuesioner`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE IF NOT EXISTS `admin` (
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

CREATE TABLE IF NOT EXISTS `data` (
`id_data` int(10) NOT NULL,
  `id_soal` int(5) NOT NULL,
  `hasil` int(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `kuesioner`
--

CREATE TABLE IF NOT EXISTS `kuesioner` (
  `id_kuesioner` int(10) NOT NULL,
  `jenis_skala` char(10) NOT NULL,
  `id_skala` int(11) NOT NULL,
  `id_peneliti` int(10) NOT NULL,
  `judul_penelitian` text NOT NULL,
  `keterangan` text NOT NULL,
  `tanggal` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `peneliti`
--

CREATE TABLE IF NOT EXISTS `peneliti` (
`id_peneliti` int(100) NOT NULL,
  `nama_peneliti` varchar(30) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL,
  `ttl` date NOT NULL,
  `jenis_kelamin` varchar(12) NOT NULL,
  `alamat` varchar(100) NOT NULL,
  `kepentingan` varchar(12) NOT NULL,
  `konfirmasi` varchar(5) NOT NULL
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=9 ;

--
-- Dumping data for table `peneliti`
--

INSERT INTO `peneliti` (`id_peneliti`, `nama_peneliti`, `email`, `password`, `ttl`, `jenis_kelamin`, `alamat`, `kepentingan`, `konfirmasi`) VALUES
(5, 'Handi', 'handiswan@gmail.com', '6512bd43d9caa6e02c990b0a82652dca', '2016-05-01', 'Perempuan', 'aa', 'Pribadi', '0'),
(6, 'Indrawan', 'indrawan@gmail.com', '6512bd43d9caa6e02c990b0a82652dca', '2016-05-31', 'Laki-laki', 'MM', 'Pribadi', '0'),
(7, 'Handi', 'Handi@gmail.com', '698d51a19d8a121ce581499d7b701668', '2016-06-01', 'Laki-laki', 'Makassar', 'Pribadi', '0'),
(8, 'Anu', 'Anu@gmail.com', '202cb962ac59075b964b07152d234b70', '2016-09-01', 'Laki-laki', 'MMM', 'Organisasi', '0');

-- --------------------------------------------------------

--
-- Table structure for table `q_gutman`
--

CREATE TABLE IF NOT EXISTS `q_gutman` (
  `id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `q_gutman_pilihan_f`
--

CREATE TABLE IF NOT EXISTS `q_gutman_pilihan_f` (
`id` int(11) NOT NULL,
  `nilai` int(11) NOT NULL,
  `keterangan` varchar(100) NOT NULL,
  `q_gutman_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `q_gutman_pilihan_uf`
--

CREATE TABLE IF NOT EXISTS `q_gutman_pilihan_uf` (
`id` int(11) NOT NULL,
  `q_gutman_id` int(11) NOT NULL,
  `nilai` int(11) NOT NULL,
  `keterangan` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `q_liker`
--

CREATE TABLE IF NOT EXISTS `q_liker` (
`id_liker` int(11) NOT NULL,
  `jumlah_jawab` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `q_liker_pilihan_f`
--

CREATE TABLE IF NOT EXISTS `q_liker_pilihan_f` (
`id` int(11) NOT NULL,
  `q_liker_id` int(11) NOT NULL,
  `nilai` int(11) NOT NULL,
  `keterangan` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `q_liker_pilihan_uf`
--

CREATE TABLE IF NOT EXISTS `q_liker_pilihan_uf` (
`id` int(11) NOT NULL,
  `q_liker_id` int(11) NOT NULL,
  `nilai` int(11) NOT NULL,
  `keterangan` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `q_rating`
--

CREATE TABLE IF NOT EXISTS `q_rating` (
`id` int(11) NOT NULL,
  `nilai_min` int(11) NOT NULL,
  `nilai_max` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `q_semantik`
--

CREATE TABLE IF NOT EXISTS `q_semantik` (
`id` int(11) NOT NULL,
  `nilai_min` int(11) NOT NULL,
  `nilai_max` int(11) NOT NULL,
  `label_min` varchar(100) NOT NULL,
  `label_max` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `responden`
--

CREATE TABLE IF NOT EXISTS `responden` (
`id_responden` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `responden_info`
--

CREATE TABLE IF NOT EXISTS `responden_info` (
`id` int(11) NOT NULL,
  `responden_id` int(11) NOT NULL,
  `biodata` varchar(100) NOT NULL,
  `nilai` varchar(100) NOT NULL,
  `keterangan` text NOT NULL,
  `tipe` enum('TEXT','TGL','PILIHAN') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `soal`
--

CREATE TABLE IF NOT EXISTS `soal` (
`id_soal` int(10) NOT NULL,
  `id_responden` int(10) NOT NULL,
  `id_kuesioner` int(10) NOT NULL,
  `no_soal` int(11) NOT NULL,
  `pertanyaan` text NOT NULL,
  `f_or_uf` varchar(2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

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
-- AUTO_INCREMENT for table `peneliti`
--
ALTER TABLE `peneliti`
MODIFY `id_peneliti` int(100) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=9;
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
MODIFY `id_liker` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `q_liker_pilihan_f`
--
ALTER TABLE `q_liker_pilihan_f`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `q_liker_pilihan_uf`
--
ALTER TABLE `q_liker_pilihan_uf`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
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
MODIFY `id_soal` int(10) NOT NULL AUTO_INCREMENT;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
