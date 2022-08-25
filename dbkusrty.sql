-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Aug 25, 2022 at 04:58 PM
-- Server version: 10.4.17-MariaDB
-- PHP Version: 7.2.34

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `dbkusrty`
--

-- --------------------------------------------------------

--
-- Table structure for table `t_history`
--

CREATE TABLE `t_history` (
  `id` int(10) NOT NULL,
  `order_id` varchar(255) NOT NULL,
  `cashier_name` varchar(255) NOT NULL,
  `customer_name` varchar(255) NOT NULL,
  `item_order` text NOT NULL,
  `ppn_amount` int(10) NOT NULL,
  `total_amount` int(10) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `t_products`
--

CREATE TABLE `t_products` (
  `id` int(10) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `category` int(2) DEFAULT NULL,
  `price` int(10) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `created` datetime NOT NULL DEFAULT current_timestamp(),
  `updated` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `t_users`
--

CREATE TABLE `t_users` (
  `id` int(10) NOT NULL,
  `user_id` bigint(20) DEFAULT NULL,
  `name` varchar(255) DEFAULT 'username',
  `email` varchar(255) DEFAULT NULL,
  `password` text DEFAULT NULL,
  `token` text DEFAULT NULL,
  `expired` datetime DEFAULT NULL,
  `avatar` varchar(255) NOT NULL DEFAULT 'avatar.png',
  `access` int(1) DEFAULT 2 COMMENT 'admin = 1, cashier = 2',
  `status` int(1) NOT NULL DEFAULT 0 COMMENT 'inactive = 0, active = 1',
  `created` datetime NOT NULL DEFAULT current_timestamp(),
  `updated` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `t_users`
--

INSERT INTO `t_users` (`id`, `user_id`, `name`, `email`, `password`, `token`, `expired`, `avatar`, `access`, `status`, `created`, `updated`) VALUES
(1, 1640787241769, 'Admin', 'admin@gmail.com', '$2b$10$1wdTd9M8i/evog7BOzW1S.dsgstRpd64vhtGRlJJgm97.x1tO9mqO', NULL, NULL, 'avatar.png', 1, 1, '2021-12-29 21:14:01', '2022-08-25 21:52:21'),
(2, 1655812115660, 'cashier', 'cashier@gmail.com', '$2b$10$8Td4VMm1.y3l.AUG9s9KZO3Y82PrueVc.oXC3ZNSkPEld6xKk4r8q', NULL, NULL, 'avatar.png', 2, 1, '2022-06-21 18:48:35', '2022-06-21 20:03:48');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `t_history`
--
ALTER TABLE `t_history`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `t_products`
--
ALTER TABLE `t_products`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `t_users`
--
ALTER TABLE `t_users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `t_history`
--
ALTER TABLE `t_history`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `t_products`
--
ALTER TABLE `t_products`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `t_users`
--
ALTER TABLE `t_users`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
