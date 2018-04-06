
--
-- Database: `gd`
--

-- --------------------------------------------------------

--
-- 表的结构 `gd_index_carousel`
--

CREATE TABLE `gd_index_carousel` (
  `cid` int(11) NOT NULL,
  `img` varchar(128) DEFAULT NULL,
  `title` varchar(64) DEFAULT NULL,
  `href` varchar(128) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `gd_index_carousel` (`cid`, `img`, `title`, `href`) VALUES
(9, 'img/bg/pc_20180131031153.jpeg', '轮播广告商品1', 'product_details.html?lid=28'),
(10, 'img/bg/pc_20180205105329.jpeg', '轮播广告商品2', 'product_details.html?lid=19'),
(11, 'img/bg/pc_20180130104328.jpeg', '轮播广告商品3', 'lookforward.html'),
(12, 'img/bg/pc_20180104102407.jpeg', '轮播广告商品4', 'lookforward.html'),
(13, 'img/bg/pc_20171226114936.jpeg', '轮播广告商品5', 'lookforward.html'),
(14, 'img/bg/pc_20171226123656.jpeg', '轮播广告商品6', 'lookforward.html');


--
-- Indexes for dumped tables
--

--
-- Indexes for table `gd_index_carousel`
--
ALTER TABLE `gd_index_carousel`
  ADD PRIMARY KEY (`cid`);

--
-- 在导出的表使用AUTO_INCREMENT
--

--
-- 使用表AUTO_INCREMENT `gd_index_carousel`
