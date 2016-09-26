-- phpMyAdmin SQL Dump
-- version 4.5.2
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Sep 26, 2016 at 12:03 
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
(68, 354, 'Usia', 'text'),
(69, 397, 'Nama', 'text'),
(70, 397, 'Nama', 'tanggal'),
(71, 397, 'Lal', 'text'),
(72, 406, 'Nama', 'text'),
(73, 406, 'Nama', 'tanggal'),
(74, 406, 'Nama', 'angka'),
(75, 406, 'Nama', 'angka'),
(76, 406, 'Nama', 'angka'),
(77, 406, 'Usia', 'angka'),
(78, 408, 'Keren', 'text'),
(79, 408, 'Keren', 'text'),
(80, 408, 'Keren', 'text'),
(81, 408, 'Keren', 'text'),
(82, 408, 'Keren', 'text'),
(83, 408, 'Keren', 'text'),
(84, 408, 'Keterangan dua', 'text'),
(85, 408, 'Keren ok', 'text'),
(86, 408, 'Keren ok', 'text'),
(87, 409, 'Lalu saya ganti lzgi', 'text'),
(88, 413, 'Nama Bapak', 'text'),
(89, 413, 'Nama Ibu', 'text'),
(90, 416, 'Nama', 'text'),
(91, 416, 'Usia', 'angka'),
(92, 416, 'Jenis Kelamin', 'gender');

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
(334, 'likert', 262, 9, 'Pengaruh cinta dan kasih sayang terhadap perilaku berprestasi anak muda kota Makassar', 'Penelitian ini menggunakan pendekatan kasih dan sayang kepada 500 pemuda kota Makassar yang terserang virus cinta.', '2016-09-24', 'L5QYhxYktG'),
(416, 'guttman', 63, 9, 'Linux vs Anggur', 'Keterangan diisi disini...', '2016-09-26', 'pNyA6AwZDz');

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
(16, 363),
(17, 364),
(18, 365),
(19, 366),
(20, 367),
(21, 368),
(22, 369),
(23, 370),
(24, 371),
(25, 372),
(26, 373),
(27, 374),
(28, 375),
(29, 376),
(30, 377),
(31, 378),
(32, 379),
(33, 380),
(34, 381),
(35, 382),
(36, 383),
(37, 384),
(38, 385),
(39, 386),
(40, 387),
(41, 388),
(42, 389),
(43, 390),
(44, 391),
(45, 392),
(46, 393),
(47, 394),
(48, 395),
(49, 396),
(50, 398),
(51, 399),
(52, 400),
(53, 401),
(54, 402),
(55, 403),
(56, 404),
(57, 405),
(58, 406),
(59, 407),
(60, 413),
(61, 414),
(62, 415),
(63, 416);

-- --------------------------------------------------------

--
-- Table structure for table `q_gutman_pilihan`
--

CREATE TABLE `q_gutman_pilihan` (
  `id` int(11) NOT NULL,
  `kuesioner_id` int(11) NOT NULL,
  `q_gutman_id` int(11) NOT NULL,
  `nilai_a` int(11) NOT NULL,
  `keterangan_a` varchar(100) NOT NULL,
  `nilai_b` int(11) NOT NULL,
  `keterangan_b` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `q_gutman_pilihan`
--

INSERT INTO `q_gutman_pilihan` (`id`, `kuesioner_id`, `q_gutman_id`, `nilai_a`, `keterangan_a`, `nilai_b`, `keterangan_b`) VALUES
(1, 396, 0, 0, '', 0, ''),
(2, 396, 0, 0, '', 0, ''),
(3, 398, 154, 10, 'Keren', 30, 'Super'),
(4, 399, 155, 0, '', 0, ''),
(5, 400, 156, 100, 'Gembira', 10, 'Sedih'),
(6, 400, 157, 0, '', 0, ''),
(7, 401, 158, 0, '', 0, ''),
(8, 401, 159, 0, '', 0, ''),
(9, 402, 160, 0, '', 0, ''),
(10, 402, 161, 0, '', 0, ''),
(11, 403, 162, 0, '', 0, ''),
(12, 404, 163, 0, '', 0, ''),
(13, 405, 164, 0, '', 0, ''),
(14, 405, 165, 0, 'eioj', 0, ''),
(15, 405, 166, 88, 'eioj', 0, ''),
(16, 405, 167, 88, 'eioj', 0, '8'),
(17, 405, 168, 88, 'eioj', 98, '8'),
(18, 405, 169, 111, 'huihiu', 909, 'bbbjkbh'),
(19, 405, 170, 88, 'eioj', 98, '8'),
(20, 406, 171, 0, '', 0, ''),
(21, 406, 172, 0, '', 0, ''),
(22, 406, 173, 0, 'A', 0, ''),
(23, 406, 174, 10, 'A', 0, ''),
(24, 406, 175, 10, 'A', 0, 'NN'),
(25, 406, 176, 10, 'A', 10, 'NN'),
(26, 406, 177, 88, 'a', 0, 'joiji'),
(27, 407, 178, 0, '', 0, ''),
(28, 407, 179, 0, 'Ni', 0, ''),
(29, 407, 180, 8, 'Ni', 0, ''),
(30, 407, 181, 8, 'Ni', 0, 'No'),
(31, 407, 182, 8, 'Ni', 9, 'No'),
(32, 407, 183, 8, 'Ni', 9, 'No'),
(33, 413, 188, 0, '', 0, ''),
(34, 413, 189, 0, '', 0, ''),
(35, 413, 190, 0, '', 0, ''),
(36, 413, 191, 0, '11', 0, ''),
(37, 413, 192, 89, '11', 0, ''),
(38, 413, 193, 89, '11', 0, 'Pli'),
(39, 413, 194, 89, '11', 89, 'Pli'),
(40, 413, 195, 88, 'Lalu', 89, 'Pk'),
(41, 414, 196, 0, '', 0, ''),
(42, 414, 197, 0, 'Ya', 0, ''),
(43, 414, 198, 10, 'Ya', 0, ''),
(44, 414, 199, 10, 'Ya', 0, 'Tidak'),
(45, 414, 200, 10, 'Ya', 1, 'Tidak'),
(46, 414, 201, 10, 'Betul Sekali', 3, 'Tidak Juga'),
(47, 414, 202, 10, 'Jangan ditanya', 2, 'Entahlah'),
(48, 414, 203, 10, 'Ya', 1, 'Tidak'),
(49, 414, 204, 10, 'Ya', 1, 'Tidak'),
(50, 416, 205, 10, '2 tahun lalu', 1, 'Baru saja'),
(51, 416, 206, 10, 'Dari mana Anda tahu', 3, 'Yup, tentu saja'),
(52, 416, 207, 10, 'Wow', 2, 'Ehm...'),
(53, 416, 208, 10, '2 hari berlalu', 3, 'Di masa depan');

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
(275, 354),
(276, 397),
(277, 408),
(278, 409),
(279, 410),
(280, 411),
(281, 412);

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
(215, 275, 89, 'Iki'),
(216, 276, 88, 'jio'),
(217, 276, 888, 'joijio'),
(218, 276, 7789, 'oijoiioj'),
(219, 277, 88, 'H'),
(220, 278, 88, 'joij'),
(221, 279, 88, 'jio'),
(222, 280, 88, 'jij'),
(223, 281, 88, 'jioj');

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
(215, 275, 8, 'Iki'),
(216, 276, 7789, 'jio'),
(217, 276, 888, 'joijio'),
(218, 276, 88, 'oijoiioj'),
(219, 277, 88, 'H'),
(220, 278, 88, 'joij'),
(221, 279, 88, 'jio'),
(222, 280, 88, 'jij'),
(223, 281, 88, 'jioj');

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
(97, 0, 354, 0, 'ff', 'uf'),
(98, 0, 388, 0, '', ''),
(99, 0, 388, 0, 'JOIJoijeiowf', ''),
(100, 0, 388, 0, 'JOIJoijeiowf', ''),
(101, 0, 388, 0, 'JOIJoijeiowf', ''),
(102, 0, 388, 0, 'JOIJoijeiowf', ''),
(103, 0, 388, 0, 'kopkopkopk', ''),
(104, 0, 388, 0, 'kopkopkopk', ''),
(105, 0, 388, 0, 'JOIJoijeiowf', ''),
(106, 0, 388, 0, 'JOIJoijeiowf', ''),
(107, 0, 388, 0, 'JOIJoijeiowf', ''),
(108, 0, 388, 0, 'JOIJoijeiowf', ''),
(109, 0, 388, 0, 'JOIJoijeiowf', ''),
(110, 0, 388, 0, 'JOIJoijeiowf', ''),
(111, 0, 388, 0, 'JOIJoijeiowf', ''),
(112, 0, 388, 0, 'JOIJoijeiowf', ''),
(113, 0, 388, 0, 'JOIJoijeiowf', ''),
(114, 0, 388, 0, 'JOIJoijeiowf', ''),
(115, 0, 389, 0, 'jioioijiji', ''),
(116, 0, 389, 0, 'jioioijiji', ''),
(117, 0, 389, 0, 'jioioijiji', ''),
(118, 0, 389, 0, 'jioioijiji', ''),
(119, 0, 389, 0, 'jioioijiji', ''),
(120, 0, 389, 0, 'jioioijiji', ''),
(121, 0, 389, 0, 'jioioijiji', ''),
(122, 0, 389, 0, 'jioioijiji', ''),
(123, 0, 389, 0, 'jioioijiji', ''),
(124, 0, 389, 0, 'jioioijiji', ''),
(125, 0, 389, 0, 'jioioijiji', ''),
(126, 0, 389, 0, 'jioioijiji', ''),
(127, 0, 389, 0, 'jioioijiji', ''),
(128, 0, 389, 0, 'jioioijiji', ''),
(129, 0, 389, 0, 'jioioijiji', ''),
(130, 0, 389, 0, 'jioioijiji', ''),
(131, 0, 389, 0, 'jioioijiji', ''),
(132, 0, 389, 0, 'jioioijiji', ''),
(133, 0, 390, 0, '', ''),
(134, 0, 390, 0, 'afewf', ''),
(135, 0, 390, 0, 'afewf', ''),
(136, 0, 390, 0, 'afewf', ''),
(137, 0, 390, 0, 'afewf', ''),
(138, 0, 391, 0, '', ''),
(139, 0, 391, 0, '', ''),
(140, 0, 391, 0, '', ''),
(141, 0, 392, 0, 'Maka dari itu..... saya perbaharui lagi', ''),
(142, 0, 393, 0, '', ''),
(143, 0, 394, 0, 'Perta', ''),
(144, 0, 395, 0, '', ''),
(145, 0, 396, 0, 'Helo', ''),
(146, 0, 396, 0, 'Helo', ''),
(147, 0, 396, 0, 'Helo', ''),
(148, 0, 396, 0, 'Helo', ''),
(149, 0, 396, 0, 'Helo', ''),
(150, 0, 396, 0, 'Hallo', ''),
(151, 0, 397, 0, 'nwenfn', 'f'),
(152, 0, 397, 0, 'lfoiewjiofj', 'f'),
(153, 0, 397, 0, 'loiewjfiojoiji', 'f'),
(154, 0, 398, 0, 'Linux itu keren sekali loh...', ''),
(155, 0, 399, 0, 'Apa saja itu?', ''),
(156, 0, 400, 0, 'Lalu apa', ''),
(157, 0, 400, 0, 'Berikunya', ''),
(158, 0, 401, 0, 'Sampai kapan?', ''),
(160, 0, 402, 0, 'guygyg', ''),
(162, 0, 403, 0, 'e', ''),
(164, 0, 405, 0, 'oifjio', ''),
(165, 0, 405, 0, 'oifjio', ''),
(166, 0, 405, 0, 'oifjio', ''),
(167, 0, 405, 0, 'oifjio', ''),
(168, 0, 405, 0, 'oifjio', ''),
(169, 0, 405, 0, 'giuhiuh', ''),
(170, 0, 405, 0, 'oifjio', ''),
(171, 0, 406, 0, '', ''),
(172, 0, 406, 0, 'Bahkan', ''),
(173, 0, 406, 0, 'Bahkan', ''),
(174, 0, 406, 0, 'Bahkan', ''),
(175, 0, 406, 0, 'Bahkan', ''),
(176, 0, 406, 0, 'Bahkan', ''),
(177, 0, 406, 0, 'Keren', ''),
(178, 0, 407, 0, 'Halo', ''),
(179, 0, 407, 0, 'Halo', ''),
(180, 0, 407, 0, 'Halo', ''),
(181, 0, 407, 0, 'Halo', ''),
(182, 0, 407, 0, 'Halo', ''),
(183, 0, 407, 0, 'Lalu', ''),
(184, 0, 408, 0, 'Keren', 'uf'),
(185, 0, 408, 0, 'Bagus', 'f'),
(186, 0, 409, 0, 'jioj', 'f'),
(187, 0, 412, 0, 'Keren', 'uf'),
(188, 0, 413, 0, 'Keren', ''),
(189, 0, 413, 0, 'Keren', ''),
(190, 0, 413, 0, 'Keren', ''),
(191, 0, 413, 0, 'Keren', ''),
(192, 0, 413, 0, 'Keren', ''),
(193, 0, 413, 0, 'Keren', ''),
(194, 0, 413, 0, 'Keren', ''),
(195, 0, 413, 0, 'Kern', ''),
(196, 0, 414, 0, 'Apakah Anda merasa lingkungan Anda cukup nyaman?', ''),
(197, 0, 414, 0, 'Apakah Anda merasa lingkungan Anda cukup nyaman?', ''),
(198, 0, 414, 0, 'Apakah Anda merasa lingkungan Anda cukup nyaman?', ''),
(199, 0, 414, 0, 'Apakah Anda merasa lingkungan Anda cukup nyaman?', ''),
(200, 0, 414, 0, 'Apakah Anda merasa lingkungan Anda cukup nyaman?', ''),
(201, 0, 414, 0, 'Apakah keadaan ekonomi cukup mendukung di daerah tempat tinggal Anda?', ''),
(202, 0, 414, 0, 'Apakah Anda merasa awet muda tinggal dan menetap di daerah yang Anda senangi?', ''),
(203, 0, 414, 0, 'Apakah Anda merasa lingkungan Anda cukup nyaman?', ''),
(204, 0, 414, 0, 'Apakah Anda merasa lingkungan Anda cukup nyaman?', ''),
(205, 0, 416, 0, 'Kapan terakhir kali Anda mengenal Linux?', ''),
(206, 0, 416, 0, 'Anda mengenal Cortana dengan sangat baik?', ''),
(207, 0, 416, 0, 'Anda selalu melihat ke dalam setiap inci wawasan terperinci di tiap kincir angin penglihatan yang telah berlalu?', ''),
(208, 0, 416, 0, 'Kapan terakhir kali Anda melihat akhir cerita terlahir yang mapan dan berkelebat secepat kilat balapan?', '');

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
-- Indexes for table `q_gutman_pilihan`
--
ALTER TABLE `q_gutman_pilihan`
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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=93;
--
-- AUTO_INCREMENT for table `kuesioner`
--
ALTER TABLE `kuesioner`
  MODIFY `id_kuesioner` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=417;
--
-- AUTO_INCREMENT for table `peneliti`
--
ALTER TABLE `peneliti`
  MODIFY `id_peneliti` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;
--
-- AUTO_INCREMENT for table `q_gutman`
--
ALTER TABLE `q_gutman`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=64;
--
-- AUTO_INCREMENT for table `q_gutman_pilihan`
--
ALTER TABLE `q_gutman_pilihan`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=54;
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
  MODIFY `id_liker` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=282;
--
-- AUTO_INCREMENT for table `q_liker_pilihan_f`
--
ALTER TABLE `q_liker_pilihan_f`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=224;
--
-- AUTO_INCREMENT for table `q_liker_pilihan_uf`
--
ALTER TABLE `q_liker_pilihan_uf`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=224;
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
  MODIFY `id_soal` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=209;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
