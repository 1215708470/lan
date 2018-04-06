SET NAMES UTF8;
DROP DATABASE IF EXISTS gd;
CREATE DATABASE gd CHARSET=UTF8;
USE gd;
#-------------------------------------------
#用户信息表
#-------------------------------------------
CREATE TABLE gd_user(		
	uid INT primary key AUTO_INCREMENT,	#主键约束，非空，自增列 用户的ID，为用户的唯一标识，由系统自动生成
	phone VARCHAR(16) NOT NULL DEFAULT '',	#手机号码
	upwd VARCHAR(32) NOT NULL DEFAULT '',	#密码
	mtime DATETIME NOT NULL DEFAULT 0,
	email VARCHAR(64) NOT NULL DEFAULT '',
	uname VARCHAR(16) UNIQUE NOT NULL DEFAULT '',	#用户名
	avatar VARCHAR(128) NOT NULL DEFAULT '',	#头像图片路径
	user_name VARCHAR(32) NOT NULL DEFAULT '',#用户名字
	gender INT		#性别 0-女 1-男
);
insert into gd_user values
(null,'15919715894','123456',now(),'h@qq.com','dingding','w.jpg','当当',1),
(null,'15912345678','123456',now(),'h@qq.com','dangdang','uy.jpg','丁丁',0),
(null,'15912312312','123456',now(),'h@qq.com','166823798','op.jpg','西西',1),
(null,'12331','123456',now(),'h@qq.com','111883798','wy.jpg','木木',1);

#-------------------------------------------
#用户地址表
#-------------------------------------------
create table gd_receiver_address(	
	aid INT PRIMARY KEY AUTO_INCREMENT,	#主键约束
	user_id INT,		#用户编号
	receiver VARCHAR(16),	#接收人姓名
	province VARCHAR(16),	#省
	city VARCHAR(16),	#市
	county VARCHAR(16),	#县
	address VARCHAR(160),	#详细地址
	cellphone VARCHAR(16),	#手机
	fixedphone VARCHAR(16),	#固定电话
	postcode CHAR(6),	#邮编,(定长字符串)
	tag VARCHAR(32),	#标签名
	is_default boolean	#是否为当前用户的默认收货地址
);
#-------------------------------------------
#用户购物车表
#-------------------------------------------
create table gd_shoppingcart_item(	
	cid INT primary key AUTO_INCREMENT,	#主键约束
	user_id INT,		#用户编号
	product_id INT,		#产品编号
	count INT,		#购买数量
	is_checked tinyint(1)	#是否选中
);
INSERT INTO gd_shoppingcart_item VALUES ('1', '1', '3', '5', '0');
INSERT INTO gd_shoppingcart_item VALUES ('2', '2', '2', '12', '0');
INSERT INTO gd_shoppingcart_item VALUES ('3', '3', '3', '1', '1');
INSERT INTO gd_shoppingcart_item VALUES ('4', '5', '4', '9', '0');
INSERT INTO gd_shoppingcart_item VALUES ('5', '14', '1', '1', '0');
INSERT INTO gd_shoppingcart_item VALUES ('13', '20', '1', '1', '1');
INSERT INTO gd_shoppingcart_item VALUES ('14', '22', '17', '11', '1');
INSERT INTO gd_shoppingcart_item VALUES ('15', '20', '28', '1', '0');
INSERT INTO gd_shoppingcart_item VALUES ('16', '25', '2', '1', '1');
INSERT INTO gd_shoppingcart_item VALUES ('17', '3', '28', '1', '1');

#-------------------------------------------
#用户订单表
#-------------------------------------------
create table gd_order(		
	aid int primary key auto_increment,
	user_id int,		#用户编号
	address int,
	status INT,		        #订单状态 1-等待付款 2-等待发货 3运输中 4-已签收 5-已取消
	order_time BIGINT,      #下单时间     
	pay_time BIGINT,        #付款时间
	deliver_time BIGINT,    #发货时间      
	received_time BIGINT    #签收时间
);
create table gd_order_detail(	#用户订单详情表
	did int PRIMARY KEY AUTO_INCREMENT,
	order_id INT,		#订单编号
	product_id INT,		#产品编号
	count INT           #购买数量
);
create table gd_clothing_family(	#商品类别表
	fid INT PRIMARY KEY AUTO_INCREMENT,	
	name VARCHAR(32)	    #类别名称
);

#-------------------------------------------
#商品表
#-------------------------------------------
create table gd_clothing(		
	lcid INT PRIMARY KEY AUTO_INCREMENT,	#衣服编号
	family_id INT,		    #所属型号家族编号
	title VARCHAR(128), 	#主标题
	#subtitle VARCHAR(64),	#副标题
	price DECIMAL(8,2), 	#价格
	#promise VARCHAR(64),        #服务承诺
	spec VARCHAR(64),           #规格/颜色图片
	clothes_size VARCHAR(32),    #衣服尺码
	os VARCHAR(32),             #操作系统
	memory VARCHAR(32),         #内存容量
	resolution VARCHAR(32),     #分辨率
	video_card VARCHAR(32),     #显卡型号
	cpu VARCHAR(32),            #处理器
	video_memory VARCHAR(32),   #显存容量
	category VARCHAR(32),       #所属分类
	disk VARCHAR(32),           #硬盘容量及类型
	details VARCHAR(5024),		#产品详细说明
	shelf_time BIGINT,          #上架时间
	evaluate int,               #累计评价
	popularity int,              #人气
	#sold_count INT,             #已售出的数量
	is_onsale BOOLEAN,           #是否促销中
	seq_top_sale int		    #销量
);
INSERT INTO `gd_clothing` VALUES 
('1', '1', '女装2018春季新款天衣无缝全成型套头针织衫A300239', '680.00', 'img/particulars/5a62e06fdfb58.jpg', 'AppleMacBook Air', 'MacOS', '8G', '1920*1080', '集成显卡', 'Intel i5低功耗版', '其它', '轻薄本', '128G固态', '<div id="content1" class="active exclusive">
								<img src="img/particulars/title.jpg">
								<img src="img/particulars/n_20171113.jpg">
								<img src="img/particulars/15166887773021.jpg">
								<img src="img/particulars/15166887875109.jpg">
								<img src="img/particulars/TB2Gn0TnRHH8KJjy0FbXXcqlpXa_!!728443962.jpg">
								<img src="img/particulars/TB2rB0ZnInI8KJjSspeXXcwIpXa_!!728443962.jpg">
								<img src="img/particulars/TB20MN6nTnI8KJjSszbXXb4KFXa_!!728443962.jpg">
								<img src="img/particulars/TB2l4aynL6H8KJjy0FjXXaXepXa_!!728443962.jpg">
								<img src="img/particulars/TB2j29EnLDH8KJjy1XcXXcpdXXa_!!728443962.jpg">
								<img src="img/particulars/TB2PxeynL6H8KJjy0FjXXaXepXa_!!728443962.jpg">
								<div>
									<div class="guide">尺码指南</div>
									<table class="size_list">
										<tbody>
											<tr>
										<td>尺码</td>
										<td>胸围(cm)</td>
										<td>衣长(cm)</td>
										<td>袖长(cm)</td>
											</tr>
											<tr>
										<td>2码(S)</td>
										<td>144</td>
										<td>68</td>
										<td>32</td>
											</tr>
											<tr>
										<td>3码(M)</td>
										<td>148</td>
										<td>69</td>
										<td>32</td>
											</tr>
											<tr>
										<td>4码(L)</td>
										<td>152</td>
										<td>69</td>
										<td>32</td>
											</tr>
										</tbody>
									</table>
									<div class="warm_prompt">*温馨提示：由于测量方法不同尺寸数据可能存在(1-3cm)误差，敬请谅解！</div>
									<img src="img/particulars/TB2anmRnNPI8KJjSspoXXX6MFXa_!!728443962.jpg">
									<table>
										<tbody>
											<tr>
										<td style="padding-top:30.0px;" valign="top" width="15%">
										<div style="font-size:24.0px;line-height:24.0px;">商品信息</div>
										</td>
										<td width="5%"></td>
										<td>
										<div style="padding-top:24.0px;line-height:42.0px;">
										<div>商品货号：A300239</div>
										<div>
											<div class="lf">产品面料：</div>
											<div class="lf">羊毛71.5% 羊绒28.5%</div>
											<div style="clear:both;"></div>
										</div>
										<div style="color:red;">(温馨提示：单独洗涤，勿浸泡，装洗衣袋脱水，请用中性丝、毛专用洗涤剂洗涤)</div>
										<div>纤维含量：产品或产品的某一部分含有2种及以上纤维时，除了许可不标注的纤维外，在标签上标明的每一种纤维含量允许偏差为5%</div>
										</td>
											</tr>
										</tbody>
									</table>
									<div class="expo_nent">商品指数</div>
									<table class="table3">
										<tbody>
											<tr>
										<td>厚度指数</td>
										<td>透视</td>
										<td>薄</td>
										<td>适中</td>
										<td>厚</td>
											</tr>
											<tr>
										<td>弹力指数</td>
										<td>无弹</td>
										<td>微弹</td>
										<td>弹力</td>
										<td>超弹</td>
											</tr>
											<tr>
										<td>柔软指数</td>
										<td>柔软</td>
										<td>较柔</td>
										<td>适中</td>
										<td>偏硬</td>
											</tr>
											<tr>
										<td>修身指数</td>
										<td>宽松</td>
										<td>合身</td>
										<td>修身</td>
										<td>紧身</td>
											</tr>
										</tbody>
									</table>
									<img src="img/particulars/TB249RVekfb_uJkSmLyXXcxoXXa_!!728443962.jpg">
								</div>
							</div>',now(),'1096', '2968', '1', '130'),
('2', '2', '女装2018春季新款短袖针织洋装连衣裙A500023', '480.00', 'img/particulars/5a6c2598cc7d9.jpg', 'AppleMacBook Air', 'MacOS', '8G', '1920*1080', '集成显卡', 'Intel i5低功耗版', '其它', '轻薄本', '256G固态', '<div> </div>',now(),'1096', '1922', '0', '77'),
('3', '3', '女装 双面羊毛呢中长大衣外套A400016','1080.00', 'img/particulars/5a31e146615b1.jpg', 'AppleMacBook Air', 'MacOS', '8G', '1920*1080', '集成显卡', 'Intel i5低功耗版', '其它', '轻薄本', '128G固态', '<div> </div>',now(),'1096', '62', '1', '6311'),
('10', '4', '女装2017冬季新款针织拼羽绒短款外套夹克A400090','650.00', 'img/particulars/5a4761bdd5be6.jpg', 'AppleMacBook Air', 'MacOS', '8G', '1920*1080', '集成显卡', 'Intel i5低功耗版', '其它', '轻薄本', '128G固态', '<div></div>',now(),'1096', '1', '1','497'),
('11', '5', '女装 2017秋冬新款长袖立领外套A400093', '500.00', 'img/particulars/598ec287e5464.jpg', 'AppleMacBook Air', 'MacOS', '8G', '1920*1080', '集成显卡', 'Intel i5低功耗版', '其它', '轻薄本', '128G固态', '<div></div>', now(),'1096', '2968', '1', '613'),
('12', '6', '女装 冬季新款 立领长袖刺绣拉链皮衣夹克外套A400114', '1500.00', 'img/particulars/59bcf45631d5c.jpg', 'AppleMacBook Air', 'MacOS', '8G', '1920*1080', '集成显卡', 'Intel i5低功耗版', '其它', '轻薄本', '128G固态', '<div></div>',now(),'1096', '2968', '1','469');

#衣服颜色表
create table gd_clothes_color(
    colid INT PRIMARY KEY AUTO_INCREMENT,   #衣服颜色编号
    clothing_id INT,	            #衣服编号
    clothing_color VARCHAR(128),	#衣服颜色
    repertory int                   #库存
);
INSERT INTO gd_clothes_color VALUES
('1', '3','img/particulars/5a5089914e837.jpg','驼色','1544'),
('2', '3','img/particulars/1472282134841240522.jpg','黑色','276'),
('3', '3','img/particulars/1503901183419804830.jpg','浅灰','145'),
('4', '3','img/particulars/1503901183416620815.jpg','浅绿','341'),
('5', '3','img/particulars/1503896218952100878.jpg','灰白','122'),
('6', '3','img/particulars/1503896218338556805.jpg','静谧蓝','104'),
('7', '3','img/particulars/1503896217758316359.jpg','焦糖','112'),
('8', '3','img/particulars/1513219409746589739.jpg','酒红色','0');
#-------------------------------------------
#衣服尺码表
#-------------------------------------------
create table gd_clothes_size(
	sid INT PRIMARY KEY AUTO_INCREMENT,    #衣服尺码编号
	clothing_id INT,	            #衣服颜色编号
	clothing_size VARCHAR(32),	    #衣服尺码
	repertory int                   #库存
);
INSERT INTO gd_clothes_size VALUES
('1','1','尺码:S','482'),
('2','1','尺码:M','975'),
('3','1','尺码:L','86'),
('4','2','尺码:S','88'),
('5','2','尺码:M','88'),
('6','2','尺码:L','100'),
('7','3','尺码:S','48'),
('8','3','尺码:M','100'),
('9','3','尺码:L','0'),
('10','4','尺码:S','210'),
('11','4','尺码:M','109'),
('12','4','尺码:L','22'),
('13','5','尺码:S','89'),
('14','5','尺码:M','30'),
('15','5','尺码:L','3'),
('16','6','尺码:S','37'),
('17','6','尺码:M','56'),
('18','6','尺码:L','11'),
('19','7','尺码:S','79'),
('20','7','尺码:M','33'),
('21','7','尺码:L','0'),
('22','8','尺码:S','0'),
('23','8','尺码:M','0'),
('24','8','尺码:L','0');

#-------------------------------------------
#商品详情图表
#-------------------------------------------
create table gd_clothing_pic(	
	pid INT PRIMARY KEY AUTO_INCREMENT,	
	clothing_id INT,	#衣服编号
	sm VARCHAR(128),	#小图片路径
	md VARCHAR(128),	#中图片路径
	lg VARCHAR(128)		#大图片路径
);
INSERT INTO gd_clothing_pic (`pid`, `clothing_id`, `sm`, `md`, `lg`) VALUES
(1, 1, 'img/particulars/5a62e06fdfb58.jpg', 'img/particulars/5a62e06fdfb58.jpg', 'img/particulars/5a62e06fdfb58.jpg'),
(2, 1, 'img/particulars/5a62e06fdff18.jpg', 'img/particulars/5a62e06fdff18.jpg', 'img/particulars/5a62e06fdff18.jpg'),
(3, 1, 'img/particulars/5a62e06fe09a2.jpg', 'img/particulars/5a62e06fe09a2.jpg', 'img/particulars/5a62e06fe09a2.jpg'),
(4, 1, 'img/particulars/5a62e06fe024f.jpg', 'img/particulars/5a62e06fe024f.jpg', 'img/particulars/5a62e06fe024f.jpg'),
(5, 1, 'img/particulars/5a62e06fe1031.jpg', 'img/particulars/5a62e06fe1031.jpg', 'img/particulars/5a62e06fe1031.jpg'),
(6, 2, 'img/particulars/5a6c2598cc7d9.jpg', 'img/particulars/5a6c2598cc7d9.jpg', 'img/particulars/5a6c2598cc7d9.jpg'),
(7, 2, 'img/particulars/5a6c25b717340.jpg', 'img/particulars/5a6c25b717340.jpg', 'img/particulars/5a6c25b717340.jpg'),
(8, 2, 'img/particulars/5a6c25b7178b8.jpg', 'img/particulars/5a6c25b7178b8.jpg', 'img/particulars/5a6c25b7178b8.jpg'),
(9, 2, 'img/particulars/5a6c25be9dc12.jpg', 'img/particulars/5a6c25be9dc12.jpg', 'img/particulars/5a6c25be9dc12.jpg'),
(10, 2, 'img/particulars/5a6c25be9e6c7.jpg', 'img/particulars/5a6c25be9e6c7.jpg', 'img/particulars/5a6c25be9e6c7.jpg'),
(11, 3, 'img/particulars/5a5089914e837.jpg', 'img/particulars/5a5089914e837.jpg', 'img/particulars/5a5089914e837.jpg'),
(12, 3, 'img/particulars/5a31e146615b1.jpg', 'img/particulars/5a31e146615b1.jpg', 'img/particulars/5a31e146615b1.jpg'),
(13, 3, 'img/particulars/5a31e146618e3.jpg', 'img/particulars/5a31e146618e3.jpg', 'img/particulars/5a31e146618e3.jpg'),
(14, 3, 'img/particulars/5a31e1465fcc2.jpg', 'img/particulars/5a31e1465fcc2.jpg', 'img/particulars/5a31e1465fcc2.jpg'),
(15, 3, 'img/particulars/5a31e14661f87.jpg', 'img/particulars/5a31e14661f87.jpg', 'img/particulars/5a31e14661f87.jpg'),
(16, 11, 'img/particulars/5a4761bdd5be6.jpg', 'img/particulars/5a4761bdd5be6.jpg', 'img/particulars/5a4761bdd5be6.jpg'),
(17, 11, 'img/particulars/5a4761c993b44.jpg', 'img/particulars/5a4761c993b44.jpg', 'img/particulars/5a4761c993b44.jpg'),
(18, 11, 'img/particulars/5a4761c993ed3.jpg', 'img/particulars/5a4761c993ed3.jpg', 'img/particulars/5a4761c993ed3.jpg'),
(19, 11, 'img/particulars/5a4761c99443d.jpg', 'img/particulars/5a4761c99443d.jpg', 'img/particulars/5a4761c99443d.jpg'),
(20, 11, 'img/particulars/5a4761c994a19.jpg', 'img/particulars/5a4761c994a19.jpg', 'img/particulars/5a4761c994a19.jpg'),
(21, 13, 'img/particulars/59cb0c9a30d7f.jpg', 'img/particulars/59cb0c9a30d7f.jpg', 'img/particulars/59cb0c9a30d7f.jpg'),
(22, 13, 'img/particulars/59bcf45631d5c.jpg', 'img/particulars/59bcf45631d5c.jpg', 'img/particulars/59bcf45631d5c.jpg'),
(23, 13, 'img/particulars/59bcf456318b3.jpg', 'img/particulars/59bcf456318b3.jpg', 'img/particulars/59bcf456318b3.jpg'),
(24, 13, 'img/particulars/59bcf4562f0fd.jpg', 'img/particulars/59bcf4562f0fd.jpg', 'img/particulars/59bcf4562f0fd.jpg'),
(25, 13, 'img/particulars/59bcf4562e465.jpg', 'img/particulars/59bcf4562e465.jpg', 'img/particulars/59bcf4562e465.jpg'),
(26, 13, 'img/particulars/59bcf45630708.jpg', 'img/particulars/59bcf45630708.jpg', 'img/particulars/59bcf45630708.jpg'),
(27, 12, 'img/index/598ec287e5464.jpg', 'img/index/598ec287e5464.jpg', 'img/index/598ec287e5464.jpg'),
(28, 4, 'img/particulars/1472282134877548172.jpg', 'img/particulars/1472282134841240522.jpg', 'img/particulars/1472282134841240522.jpg'),
(33, 5, 'img/particulars/1503901183658014544.jpg', 'img/particulars/1503901183419804830.jpg', 'img/particulars/1503901183419804830.jpg'),
(34, 6, 'img/particulars/1503901183416620815.jpg', 'img/particulars/1503901183416620815.jpg', 'img/particulars/1503901183416620815.jpg'),
(35, 7, 'img/particulars/1503896218952100878.jpg', 'img/particulars/1503896218952100878.jpg', 'img/particulars/1503896218952100878.jpg'),
(36, 8, 'img/particulars/1503896218338556805.jpg', 'img/particulars/1503896218338556805.jpg', 'img/particulars/1503896218338556805.jpg'),
(37, 9, 'img/particulars/1503896217758316359.jpg', 'img/particulars/1503896217758316359.jpg', 'img/particulars/1503896217758316359.jpg'),
(38, 10, 'img/particulars/1513219409746589739.jpg', 'img/particulars/1513219409746589739.jpg', 'img/particulars/1513219409746589739.jpg');


#-------------------------------------------
#首页轮播图表
#-------------------------------------------
create table gd_index_carousel(		
	cid INT PRIMARY KEY AUTO_INCREMENT,
	img VARCHAR(128),		#图片路径
	title VARCHAR(64),		#图片描述
	href VARCHAR(128)		#图片链接
);
INSERT INTO `gd_index_carousel` VALUES 
('9', 'img/index/pc_20180131031153.jpeg', '轮播广告商品1', 'detailContent.html?lcid=1'),
('10', 'img/index/pc_20180205105329.jpeg', '轮播广告商品2', 'detailContent.html?lcid=2'),
('11', 'img/index/pc_20180130104328.jpeg', '轮播广告商品3', 'detailContent.html?lcid=3'),
('12', 'img/index/pc_20171226114936.jpeg', '轮播广告商品4', 'detailContent.html?lcid=4');


#-------------------------------------------
#首页商品栏目表
#-------------------------------------------
create table gd_index_product(		
	pid INT PRIMARY KEY AUTO_INCREMENT,	
	title VARCHAR(64),		#商品标题
	pic VARCHAR(128),            	#图片
	price DECIMAL(10,2),		#商品价格
	href VARCHAR(128),		#链接
	seq_recommended TINYINT,
	seq_new_arrival TINYINT,
	seq_top_sale int		#销量
);
INSERT INTO `gd_index_product` VALUES
('1', '女装 2018春季新款天衣无缝全成型套头针织衫A300239', 'img/index/5a7577653fcc3.jpg', '680.00', 'detailContent.html?lcid=1', '1', '1', '130'),
('2', '女装 2018春季新款短袖针织洋装连衣裙A500023', 'img/index/5a6c2598cc7d9.jpg', '480.00', 'detailContent.html?lcid=2', '2', '2', '77'),
('3', '女装 双面羊毛呢中长大衣外套A400016', 'img/index/5a5089914e837.jpg', '1080.00', 'detailContent.html?lcid=3', '3', '2', '6311'),
('11', '女装 2017冬季新款针织拼羽绒短款外套夹克A400090', 'img/index/5a4761bdd5be6.jpg', '650.00', 'detailContent.html?lcid=10', '4', '2', '497'),
('12', '女装 2017秋冬新款长袖立领外套A400093', 'img/index/598ec287e5464.jpg', '500.00', 'detailContent.html?lcid=11', '5', '2', '613'),
('13', '女装 冬季新款 立领长袖刺绣拉链皮衣夹克外套A400114', 'img/index/59cb0c9a30d7f.jpg', '1500.00', 'detailContent.html?lcid=12', '6', '2', '469');
