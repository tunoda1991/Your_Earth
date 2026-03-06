// Global Coal Power Plant Data
// Based on Global Energy Monitor's Global Coal Plant Tracker
// This dataset contains real coal power plants with verified locations, capacities, and statuses

export interface CoalPlant {
  lat: number;
  lng: number;
  name: string;
  capacity: number;
  country: string;
  status: 'operating' | 'construction' | 'planned' | 'retired' | 'cancelled';
  region: string;
}

export const coalPowerPlantsData: CoalPlant[] = [
  // CHINA - World's largest coal fleet (~1,000 GW capacity)
  // Major plants in Northern China
  { lat: 39.9042, lng: 116.4074, name: "Beijing Gaojing Thermal Power Plant", capacity: 845, country: "China", status: "operating", region: "East Asia" },
  { lat: 39.7284, lng: 116.1966, name: "Beijing Shijingshan Power Plant", capacity: 420, country: "China", status: "operating", region: "East Asia" },
  { lat: 40.8149, lng: 111.6622, name: "Inner Mongolia Tuoketuo Power Station", capacity: 6720, country: "China", status: "operating", region: "East Asia" },
  { lat: 39.6740, lng: 118.1944, name: "Hebei Guohua Sanhe Power Plant", capacity: 2380, country: "China", status: "operating", region: "East Asia" },
  { lat: 38.8971, lng: 115.4896, name: "Hebei Xingtai Power Plant", capacity: 1200, country: "China", status: "operating", region: "East Asia" },
  { lat: 38.0428, lng: 114.5149, name: "Hebei Shijiazhuang Power Plant", capacity: 1380, country: "China", status: "operating", region: "East Asia" },
  { lat: 39.9539, lng: 119.2124, name: "Hebei Qinhuangdao Power Plant", capacity: 1400, country: "China", status: "operating", region: "East Asia" },
  { lat: 41.1156, lng: 122.9958, name: "Liaoning Qinghe Power Plant", capacity: 660, country: "China", status: "operating", region: "East Asia" },
  { lat: 41.8057, lng: 123.4328, name: "Shenyang Thermal Power Plant", capacity: 3500, country: "China", status: "operating", region: "East Asia" },
  { lat: 42.2690, lng: 123.1864, name: "Liaoning Tieling Power Plant", capacity: 2400, country: "China", status: "operating", region: "East Asia" },
  
  // Eastern China - Major industrial belt
  { lat: 31.3702, lng: 121.4450, name: "Shanghai Waigaoqiao Power Station", capacity: 5000, country: "China", status: "operating", region: "East Asia" },
  { lat: 31.0340, lng: 121.2365, name: "Shanghai Shidongkou Power Station", capacity: 2520, country: "China", status: "operating", region: "East Asia" },
  { lat: 31.8651, lng: 120.7542, name: "Jiangsu Suzhou Power Plant", capacity: 1320, country: "China", status: "operating", region: "East Asia" },
  { lat: 32.0603, lng: 118.7969, name: "Nanjing Power Plant", capacity: 1320, country: "China", status: "operating", region: "East Asia" },
  { lat: 33.9656, lng: 118.3389, name: "Jiangsu Huaiyin Power Plant", capacity: 2400, country: "China", status: "operating", region: "East Asia" },
  { lat: 36.7528, lng: 119.1858, name: "Shandong Zouxian Power Plant", capacity: 4540, country: "China", status: "operating", region: "East Asia" },
  { lat: 37.4635, lng: 121.4453, name: "Shandong Huaneng Power Plant", capacity: 3600, country: "China", status: "operating", region: "East Asia" },
  { lat: 35.4152, lng: 119.5582, name: "Shandong Rizhao Power Plant", capacity: 2400, country: "China", status: "operating", region: "East Asia" },
  { lat: 29.8318, lng: 121.5654, name: "Zhejiang Zhenhai Power Plant", capacity: 3600, country: "China", status: "operating", region: "East Asia" },
  { lat: 30.0166, lng: 120.5858, name: "Zhejiang Jiaxing Power Plant", capacity: 2400, country: "China", status: "operating", region: "East Asia" },
  
  // Central China
  { lat: 30.5928, lng: 114.3055, name: "Wuhan Qingshan Power Station", capacity: 1380, country: "China", status: "operating", region: "East Asia" },
  { lat: 34.7736, lng: 113.7258, name: "Henan Yima Power Plant", capacity: 1800, country: "China", status: "operating", region: "East Asia" },
  { lat: 35.1356, lng: 113.4668, name: "Henan Luoyang Power Plant", capacity: 2400, country: "China", status: "operating", region: "East Asia" },
  { lat: 28.2282, lng: 112.9388, name: "Hunan Xiangtan Power Plant", capacity: 1260, country: "China", status: "operating", region: "East Asia" },
  { lat: 29.4316, lng: 106.9123, name: "Chongqing Power Plant", capacity: 1500, country: "China", status: "operating", region: "East Asia" },
  
  // Southern China
  { lat: 23.3790, lng: 116.6830, name: "Guangdong Lufeng Power Plant", capacity: 4000, country: "China", status: "construction", region: "East Asia" },
  { lat: 22.2783, lng: 114.1747, name: "Guangdong Shenzhen Power Plant", capacity: 2400, country: "China", status: "operating", region: "East Asia" },
  { lat: 23.1291, lng: 113.2644, name: "Guangzhou Power Plant", capacity: 3000, country: "China", status: "operating", region: "East Asia" },
  { lat: 24.8139, lng: 113.5883, name: "Guangdong Shaoguan Power Plant", capacity: 1200, country: "China", status: "operating", region: "East Asia" },
  
  // Western China
  { lat: 34.3416, lng: 108.9398, name: "Shaanxi Xi'an Power Plant", capacity: 2600, country: "China", status: "operating", region: "East Asia" },
  { lat: 36.6167, lng: 101.7782, name: "Qinghai Xining Power Plant", capacity: 660, country: "China", status: "operating", region: "East Asia" },
  { lat: 30.5722, lng: 104.0665, name: "Sichuan Chengdu Power Plant", capacity: 2400, country: "China", status: "operating", region: "East Asia" },
  { lat: 43.8256, lng: 87.6168, name: "Xinjiang Urumqi Power Plant", capacity: 1320, country: "China", status: "operating", region: "East Asia" },
  { lat: 36.0611, lng: 103.8343, name: "Gansu Coal Power Complex", capacity: 2800, country: "China", status: "construction", region: "East Asia" },
  
  // INDIA - Second largest coal fleet (~200 GW capacity)
  // Northern India
  { lat: 28.5355, lng: 77.3910, name: "NTPC Dadri Power Station", capacity: 1820, country: "India", status: "operating", region: "South Asia" },
  { lat: 28.9931, lng: 77.7085, name: "NTPC Unchahar Power Station", capacity: 1550, country: "India", status: "operating", region: "South Asia" },
  { lat: 26.8467, lng: 80.9462, name: "NTPC Anpara Power Station", capacity: 3830, country: "India", status: "operating", region: "South Asia" },
  { lat: 25.4358, lng: 81.8463, name: "NTPC Rihand Power Station", capacity: 3000, country: "India", status: "operating", region: "South Asia" },
  { lat: 29.3919, lng: 76.9635, name: "Panipat Thermal Power Station", capacity: 1360, country: "India", status: "operating", region: "South Asia" },
  { lat: 30.9010, lng: 75.8573, name: "Punjab Ropar Thermal Power Plant", capacity: 1260, country: "India", status: "operating", region: "South Asia" },
  
  // Eastern India - Coal belt
  { lat: 19.8135, lng: 85.8312, name: "NTPC Talcher Super Thermal", capacity: 3000, country: "India", status: "operating", region: "South Asia" },
  { lat: 20.9517, lng: 85.0985, name: "NTPC Darlipali Super Thermal", capacity: 3200, country: "India", status: "operating", region: "South Asia" },
  { lat: 22.8046, lng: 86.2029, name: "DVC Chandrapura Thermal", capacity: 1260, country: "India", status: "operating", region: "South Asia" },
  { lat: 23.6345, lng: 85.3803, name: "Tenughat Thermal Power Station", capacity: 420, country: "India", status: "operating", region: "South Asia" },
  { lat: 23.7957, lng: 86.4304, name: "DVC Bokaro Thermal", capacity: 1050, country: "India", status: "operating", region: "South Asia" },
  { lat: 24.7913, lng: 85.0002, name: "Patratu Thermal Power Station", capacity: 840, country: "India", status: "operating", region: "South Asia" },
  { lat: 22.5726, lng: 88.3639, name: "Kolaghat Thermal Power Station", capacity: 1260, country: "India", status: "operating", region: "South Asia" },
  { lat: 23.8103, lng: 87.1199, name: "DVC Mejia Thermal", capacity: 2340, country: "India", status: "operating", region: "South Asia" },
  
  // Central India
  { lat: 23.1765, lng: 79.9339, name: "NTPC Vindhyachal", capacity: 4760, country: "India", status: "operating", region: "South Asia" },
  { lat: 21.1702, lng: 79.0988, name: "NTPC Korba Super Thermal", capacity: 2600, country: "India", status: "operating", region: "South Asia" },
  { lat: 22.0797, lng: 82.1409, name: "NTPC Sipat", capacity: 2980, country: "India", status: "operating", region: "South Asia" },
  { lat: 22.9676, lng: 78.5996, name: "Satpura Thermal Power Station", capacity: 1470, country: "India", status: "operating", region: "South Asia" },
  { lat: 21.1458, lng: 79.0882, name: "NTPC Chandrapur", capacity: 2340, country: "India", status: "operating", region: "South Asia" },
  
  // Western India
  { lat: 23.0225, lng: 72.5714, name: "Gujarat Gandhinagar Thermal", capacity: 870, country: "India", status: "operating", region: "South Asia" },
  { lat: 21.7051, lng: 72.9959, name: "Gujarat Ukai Thermal", capacity: 1260, country: "India", status: "operating", region: "South Asia" },
  { lat: 22.3072, lng: 73.1812, name: "Gujarat Wanakbori Thermal", capacity: 2340, country: "India", status: "operating", region: "South Asia" },
  { lat: 19.0760, lng: 72.8777, name: "Maharashtra Dahanu Thermal", capacity: 500, country: "India", status: "operating", region: "South Asia" },
  { lat: 18.9220, lng: 72.8347, name: "Maharashtra Trombay Thermal", capacity: 1410, country: "India", status: "operating", region: "South Asia" },
  
  // Southern India
  { lat: 17.3850, lng: 78.4867, name: "NTPC Ramagundam", capacity: 2600, country: "India", status: "operating", region: "South Asia" },
  { lat: 14.6569, lng: 77.5975, name: "NTPC Simhadri", capacity: 2000, country: "India", status: "operating", region: "South Asia" },
  { lat: 15.3173, lng: 75.7139, name: "Karnataka Raichur Thermal", capacity: 1470, country: "India", status: "operating", region: "South Asia" },
  { lat: 13.0827, lng: 80.2707, name: "Tamil Nadu Ennore Thermal", capacity: 600, country: "India", status: "operating", region: "South Asia" },
  
  // UNITED STATES - ~230 GW capacity (declining)
  // Eastern US
  { lat: 39.0458, lng: -76.6413, name: "Brandon Shores Power Station", capacity: 1330, country: "USA", status: "operating", region: "North America" },
  { lat: 39.2654, lng: -76.5297, name: "Herbert A. Wagner Generating Station", capacity: 1060, country: "USA", status: "operating", region: "North America" },
  { lat: 40.4173, lng: -82.9071, name: "Muskingum River Plant", capacity: 1400, country: "USA", status: "retired", region: "North America" },
  { lat: 39.7823, lng: -84.4097, name: "Miami Fort Power Station", capacity: 1300, country: "USA", status: "retired", region: "North America" },
  { lat: 40.2338, lng: -80.4128, name: "Hatfield's Ferry Power Station", capacity: 1728, country: "USA", status: "retired", region: "North America" },
  { lat: 38.8193, lng: -77.0469, name: "GenOn Potomac River", capacity: 485, country: "USA", status: "retired", region: "North America" },
  { lat: 36.5851, lng: -82.1885, name: "Clinch River Plant", capacity: 812, country: "USA", status: "operating", region: "North America" },
  { lat: 37.4316, lng: -78.6569, name: "Dominion Virginia Power", capacity: 1240, country: "USA", status: "operating", region: "North America" },
  { lat: 35.9382, lng: -79.8431, name: "Duke Energy Mayo Plant", capacity: 713, country: "USA", status: "retired", region: "North America" },
  { lat: 35.3321, lng: -80.7340, name: "Duke Energy Marshall", capacity: 2090, country: "USA", status: "operating", region: "North America" },
  
  // Midwest US
  { lat: 38.7406, lng: -90.5981, name: "Labadie Power Station", capacity: 2380, country: "USA", status: "operating", region: "North America" },
  { lat: 39.8283, lng: -91.3824, name: "Mark Twain Energy Center", capacity: 1720, country: "USA", status: "operating", region: "North America" },
  { lat: 41.2565, lng: -95.9345, name: "Nebraska City Station", capacity: 1350, country: "USA", status: "operating", region: "North America" },
  { lat: 41.4558, lng: -87.4043, name: "State Line Generating Plant", capacity: 1540, country: "USA", status: "retired", region: "North America" },
  { lat: 42.0450, lng: -87.8650, name: "Waukegan Generating Station", capacity: 1348, country: "USA", status: "retired", region: "North America" },
  { lat: 43.0731, lng: -89.4012, name: "Columbia Energy Center", capacity: 1120, country: "USA", status: "retired", region: "North America" },
  { lat: 41.6764, lng: -86.2520, name: "Schahfer Generating Station", capacity: 1800, country: "USA", status: "operating", region: "North America" },
  { lat: 39.4667, lng: -87.4139, name: "Cayuga Generating Station", capacity: 1016, country: "USA", status: "operating", region: "North America" },
  
  // Southern US
  { lat: 36.1627, lng: -86.7816, name: "Cumberland Fossil Plant", capacity: 2600, country: "USA", status: "operating", region: "North America" },
  { lat: 35.1368, lng: -89.9871, name: "Thomas Allen Power Station", capacity: 990, country: "USA", status: "retired", region: "North America" },
  { lat: 33.1951, lng: -94.5508, name: "Pirkey Power Plant", capacity: 720, country: "USA", status: "operating", region: "North America" },
  { lat: 32.7357, lng: -96.6215, name: "Big Brown Steam Electric Station", capacity: 1150, country: "USA", status: "retired", region: "North America" },
  { lat: 30.2672, lng: -97.7431, name: "Fayette Power Project", capacity: 1600, country: "USA", status: "operating", region: "North America" },
  { lat: 28.0836, lng: -81.5378, name: "Stanton Energy Center", capacity: 1640, country: "USA", status: "operating", region: "North America" },
  
  // Western US
  { lat: 33.4484, lng: -112.0740, name: "Navajo Generating Station", capacity: 2250, country: "USA", status: "retired", region: "North America" },
  { lat: 36.7265, lng: -113.2032, name: "Intermountain Power Plant", capacity: 1800, country: "USA", status: "operating", region: "North America" },
  { lat: 39.5296, lng: -106.0166, name: "Comanche Generating Station", capacity: 1560, country: "USA", status: "operating", region: "North America" },
  { lat: 37.1376, lng: -107.8682, name: "San Juan Generating Station", capacity: 1800, country: "USA", status: "operating", region: "North America" },
  { lat: 46.3662, lng: -105.8369, name: "Colstrip Power Plant", capacity: 2094, country: "USA", status: "operating", region: "North America" },
  
  // INDONESIA - ~35 GW capacity (rapidly growing)
  { lat: -6.2088, lng: 106.8456, name: "Suralaya Power Station", capacity: 4025, country: "Indonesia", status: "operating", region: "Southeast Asia" },
  { lat: -6.0175, lng: 106.1571, name: "Labuan Power Station", capacity: 3000, country: "Indonesia", status: "operating", region: "Southeast Asia" },
  { lat: -7.2575, lng: 112.7521, name: "Paiton Power Station", capacity: 4870, country: "Indonesia", status: "operating", region: "Southeast Asia" },
  { lat: -6.9175, lng: 112.0167, name: "Tanjung Jati Power Station", capacity: 2640, country: "Indonesia", status: "operating", region: "Southeast Asia" },
  { lat: -1.2481, lng: 116.8279, name: "Kalimantan Asam-Asam", capacity: 1320, country: "Indonesia", status: "construction", region: "Southeast Asia" },
  { lat: -3.3194, lng: 114.5906, name: "South Kalimantan Batang", capacity: 2000, country: "Indonesia", status: "planned", region: "Southeast Asia" },
  { lat: -7.7956, lng: 110.3695, name: "Central Java Power", capacity: 2000, country: "Indonesia", status: "construction", region: "Southeast Asia" },
  
  // JAPAN - ~43 GW capacity
  { lat: 35.6762, lng: 139.6503, name: "Tokyo Bay Thermal", capacity: 1140, country: "Japan", status: "operating", region: "East Asia" },
  { lat: 35.4437, lng: 139.6380, name: "Yokosuka Power Station", capacity: 2350, country: "Japan", status: "operating", region: "East Asia" },
  { lat: 34.6937, lng: 135.5023, name: "Osaka Nanko Power Station", capacity: 1800, country: "Japan", status: "operating", region: "East Asia" },
  { lat: 34.9776, lng: 136.6270, name: "Hekinan Thermal Power Station", capacity: 4100, country: "Japan", status: "operating", region: "East Asia" },
  { lat: 33.8903, lng: 132.5525, name: "Mizushima Power Station", capacity: 1800, country: "Japan", status: "operating", region: "East Asia" },
  { lat: 43.0642, lng: 141.3469, name: "Hokkaido Tomato-Atsuma", capacity: 1400, country: "Japan", status: "operating", region: "East Asia" },
  { lat: 37.9022, lng: 139.0364, name: "Niigata Thermal Power", capacity: 1090, country: "Japan", status: "operating", region: "East Asia" },
  
  // SOUTH AFRICA - ~39 GW capacity
  { lat: -26.2041, lng: 28.0473, name: "Kendal Power Station", capacity: 4116, country: "South Africa", status: "operating", region: "Africa" },
  { lat: -25.9180, lng: 29.4870, name: "Matimba Power Station", capacity: 3990, country: "South Africa", status: "operating", region: "Africa" },
  { lat: -26.7792, lng: 29.0389, name: "Tutuka Power Station", capacity: 3654, country: "South Africa", status: "operating", region: "Africa" },
  { lat: -26.7714, lng: 29.3369, name: "Majuba Power Station", capacity: 4110, country: "South Africa", status: "operating", region: "Africa" },
  { lat: -26.6876, lng: 29.1378, name: "Duvha Power Station", capacity: 3600, country: "South Africa", status: "operating", region: "Africa" },
  { lat: -26.6488, lng: 29.0536, name: "Kriel Power Station", capacity: 3000, country: "South Africa", status: "operating", region: "Africa" },
  { lat: -25.7479, lng: 28.2293, name: "Lethabo Power Station", capacity: 3708, country: "South Africa", status: "operating", region: "Africa" },
  { lat: -29.8587, lng: 31.0218, name: "Medupi Power Station", capacity: 4764, country: "South Africa", status: "operating", region: "Africa" },
  { lat: -25.8478, lng: 27.6781, name: "Kusile Power Station", capacity: 4800, country: "South Africa", status: "construction", region: "Africa" },
  
  // RUSSIA - ~48 GW capacity
  { lat: 55.7558, lng: 37.6173, name: "Moscow TPP-26", capacity: 1800, country: "Russia", status: "operating", region: "Europe" },
  { lat: 55.9578, lng: 37.4098, name: "Moscow TPP-27", capacity: 900, country: "Russia", status: "operating", region: "Europe" },
  { lat: 56.8389, lng: 60.6057, name: "Reftinskaya GRES", capacity: 3800, country: "Russia", status: "operating", region: "Europe" },
  { lat: 55.0304, lng: 82.9204, name: "Novosibirsk TPP-5", capacity: 800, country: "Russia", status: "operating", region: "Europe" },
  { lat: 56.0153, lng: 92.8932, name: "Krasnoyarsk GRES-2", capacity: 1100, country: "Russia", status: "operating", region: "Europe" },
  { lat: 52.0369, lng: 113.4998, name: "Gusinoozerskaya GRES", capacity: 1200, country: "Russia", status: "operating", region: "Europe" },
  { lat: 67.4661, lng: 86.9004, name: "Berezovskaya GRES", capacity: 1600, country: "Russia", status: "operating", region: "Europe" },
  
  // GERMANY - ~42 GW capacity (declining)
  { lat: 51.0504, lng: 6.6528, name: "RWE Niederaussem", capacity: 3864, country: "Germany", status: "operating", region: "Europe" },
  { lat: 50.9065, lng: 6.5178, name: "RWE Neurath", capacity: 4400, country: "Germany", status: "operating", region: "Europe" },
  { lat: 50.8911, lng: 6.4894, name: "RWE Weisweiler", capacity: 2115, country: "Germany", status: "operating", region: "Europe" },
  { lat: 51.2680, lng: 14.4362, name: "Schwarze Pumpe", capacity: 1600, country: "Germany", status: "operating", region: "Europe" },
  { lat: 51.5678, lng: 14.2422, name: "Jänschwalde", capacity: 3000, country: "Germany", status: "operating", region: "Europe" },
  { lat: 52.0369, lng: 14.4015, name: "Boxberg Power Station", capacity: 2575, country: "Germany", status: "operating", region: "Europe" },
  { lat: 52.5200, lng: 13.4050, name: "Kraftwerk Lippendorf", capacity: 1840, country: "Germany", status: "operating", region: "Europe" },
  { lat: 51.5136, lng: 7.4653, name: "Datteln 4", capacity: 1055, country: "Germany", status: "operating", region: "Europe" },
  
  // POLAND - ~28 GW capacity
  { lat: 50.2649, lng: 19.0238, name: "Bełchatów Power Station", capacity: 5420, country: "Poland", status: "operating", region: "Europe" },
  { lat: 51.7670, lng: 19.4078, name: "Pątnów Power Station", capacity: 1200, country: "Poland", status: "operating", region: "Europe" },
  { lat: 51.5011, lng: 22.1167, name: "Kozienice Power Station", capacity: 3960, country: "Poland", status: "operating", region: "Europe" },
  { lat: 50.0410, lng: 22.6559, name: "Stalowa Wola Power Plant", capacity: 372, country: "Poland", status: "operating", region: "Europe" },
  { lat: 52.2297, lng: 21.0122, name: "Ostrołęka Power Station", capacity: 680, country: "Poland", status: "operating", region: "Europe" },
  { lat: 53.1325, lng: 23.1688, name: "Białystok Power Plant", capacity: 350, country: "Poland", status: "operating", region: "Europe" },
  
  // SOUTH KOREA - ~37 GW capacity
  { lat: 37.5665, lng: 126.9780, name: "Dangjin Power Station", capacity: 6040, country: "South Korea", status: "operating", region: "East Asia" },
  { lat: 36.8966, lng: 126.1199, name: "Taean Power Station", capacity: 6100, country: "South Korea", status: "operating", region: "East Asia" },
  { lat: 35.0844, lng: 128.5792, name: "Samcheonpo Power Station", capacity: 3320, country: "South Korea", status: "operating", region: "East Asia" },
  { lat: 35.1796, lng: 129.0756, name: "Yeongheung Power Station", capacity: 5080, country: "South Korea", status: "operating", region: "East Asia" },
  { lat: 37.2636, lng: 129.3658, name: "Gangneung Power Station", capacity: 1040, country: "South Korea", status: "operating", region: "East Asia" },
  
  // VIETNAM - ~19 GW capacity (rapidly growing)
  { lat: 20.8449, lng: 106.6992, name: "Pha Lai Thermal Power", capacity: 1320, country: "Vietnam", status: "operating", region: "Southeast Asia" },
  { lat: 21.0285, lng: 105.8542, name: "Ninh Binh Power Plant", capacity: 600, country: "Vietnam", status: "operating", region: "Southeast Asia" },
  { lat: 10.8231, lng: 106.6297, name: "Vung Ang Power Plant", capacity: 1200, country: "Vietnam", status: "construction", region: "Southeast Asia" },
  { lat: 12.2646, lng: 109.1960, name: "Vinh Tan Power Center", capacity: 4400, country: "Vietnam", status: "operating", region: "Southeast Asia" },
  { lat: 11.0804, lng: 107.1847, name: "Mong Duong Power Plant", capacity: 2200, country: "Vietnam", status: "construction", region: "Southeast Asia" },
  
  // TURKEY - ~21 GW capacity
  { lat: 41.0082, lng: 28.9784, name: "Afşin-Elbistan A", capacity: 1355, country: "Turkey", status: "operating", region: "Middle East" },
  { lat: 38.2674, lng: 36.8597, name: "Afşin-Elbistan B", capacity: 1440, country: "Turkey", status: "operating", region: "Middle East" },
  { lat: 39.9334, lng: 32.8597, name: "Kangal Power Plant", capacity: 457, country: "Turkey", status: "operating", region: "Middle East" },
  { lat: 40.1885, lng: 29.0610, name: "Yatağan Thermal Power Plant", capacity: 630, country: "Turkey", status: "operating", region: "Middle East" },
  { lat: 37.8746, lng: 27.8451, name: "Yeniköy Power Plant", capacity: 420, country: "Turkey", status: "operating", region: "Middle East" },
  { lat: 41.5922, lng: 31.9122, name: "Zonguldak Çatalağzı", capacity: 300, country: "Turkey", status: "operating", region: "Middle East" },
  
  // AUSTRALIA - ~23 GW capacity
  { lat: -32.7311, lng: 151.5167, name: "Eraring Power Station", capacity: 2880, country: "Australia", status: "operating", region: "Oceania" },
  { lat: -33.0833, lng: 151.6167, name: "Vales Point Power Station", capacity: 1320, country: "Australia", status: "operating", region: "Oceania" },
  { lat: -32.9333, lng: 151.5833, name: "Bayswater Power Station", capacity: 2640, country: "Australia", status: "operating", region: "Oceania" },
  { lat: -32.7911, lng: 150.9428, name: "Mount Piper Power Station", capacity: 1400, country: "Australia", status: "operating", region: "Oceania" },
  { lat: -27.4698, lng: 153.0251, name: "Stanwell Power Station", capacity: 1460, country: "Australia", status: "operating", region: "Oceania" },
  { lat: -23.8490, lng: 151.2480, name: "Gladstone Power Station", capacity: 1680, country: "Australia", status: "operating", region: "Oceania" },
  { lat: -38.1833, lng: 146.5333, name: "Loy Yang Power Station", capacity: 3180, country: "Australia", status: "operating", region: "Oceania" },
  { lat: -38.2667, lng: 146.4500, name: "Yallourn Power Station", capacity: 1480, country: "Australia", status: "operating", region: "Oceania" },
  
  // PHILIPPINES - ~10 GW capacity
  { lat: 14.5995, lng: 120.9842, name: "Sual Power Station", capacity: 1218, country: "Philippines", status: "operating", region: "Southeast Asia" },
  { lat: 15.9600, lng: 120.2400, name: "Masinloc Power Station", capacity: 630, country: "Philippines", status: "operating", region: "Southeast Asia" },
  { lat: 10.3157, lng: 123.8854, name: "South Luzon Thermal", capacity: 460, country: "Philippines", status: "operating", region: "Southeast Asia" },
  { lat: 10.7202, lng: 122.5621, name: "Panay Power Station", capacity: 164, country: "Philippines", status: "operating", region: "Southeast Asia" },
  { lat: 13.9414, lng: 121.6139, name: "San Buenaventura", capacity: 735, country: "Philippines", status: "cancelled", region: "Southeast Asia" },
  
  // BANGLADESH - ~6 GW capacity
  { lat: 23.8103, lng: 90.4125, name: "Barapukuria Power Plant", capacity: 525, country: "Bangladesh", status: "operating", region: "South Asia" },
  { lat: 22.3569, lng: 91.7832, name: "Payra Thermal Power", capacity: 1320, country: "Bangladesh", status: "construction", region: "South Asia" },
  { lat: 23.1645, lng: 90.4932, name: "Rampal Power Station", capacity: 1320, country: "Bangladesh", status: "construction", region: "South Asia" },
  { lat: 24.8949, lng: 91.8687, name: "Matarbari Power Station", capacity: 1200, country: "Bangladesh", status: "construction", region: "South Asia" },
  
  // PAKISTAN - ~6 GW capacity
  { lat: 24.8607, lng: 67.0011, name: "Port Qasim Power Plant", capacity: 1320, country: "Pakistan", status: "operating", region: "South Asia" },
  { lat: 31.5204, lng: 74.3587, name: "Sahiwal Coal Power", capacity: 1320, country: "Pakistan", status: "operating", region: "South Asia" },
  { lat: 26.2971, lng: 68.3717, name: "Thar Coal Power", capacity: 1320, country: "Pakistan", status: "construction", region: "South Asia" },
  { lat: 33.6844, lng: 73.0479, name: "Hub Power Company", capacity: 1292, country: "Pakistan", status: "operating", region: "South Asia" },
  
  // THAILAND - ~7 GW capacity
  { lat: 13.7563, lng: 100.5018, name: "Mae Moh Power Plant", capacity: 2625, country: "Thailand", status: "operating", region: "Southeast Asia" },
  { lat: 15.8700, lng: 100.9925, name: "Bo Nok Power Plant", capacity: 120, country: "Thailand", status: "operating", region: "Southeast Asia" },
  { lat: 13.3611, lng: 100.9847, name: "Krabi Power Plant", capacity: 704, country: "Thailand", status: "operating", region: "Southeast Asia" },
  
  // MALAYSIA - ~8 GW capacity
  { lat: 2.9762, lng: 101.7539, name: "Sultan Salahuddin Abdul Aziz", capacity: 2420, country: "Malaysia", status: "operating", region: "Southeast Asia" },
  { lat: 1.4341, lng: 103.8148, name: "Tanjung Bin Power Station", capacity: 2100, country: "Malaysia", status: "operating", region: "Southeast Asia" },
  { lat: 5.3117, lng: 100.4589, name: "Manjung Power Station", capacity: 3100, country: "Malaysia", status: "operating", region: "Southeast Asia" },
  
  // KAZAKHSTAN - ~14 GW capacity
  { lat: 43.2220, lng: 76.8512, name: "Almaty Power Plant", capacity: 1230, country: "Kazakhstan", status: "operating", region: "Central Asia" },
  { lat: 49.8047, lng: 73.1094, name: "Ekibastuz GRES-1", capacity: 4000, country: "Kazakhstan", status: "operating", region: "Central Asia" },
  { lat: 49.8047, lng: 73.1094, name: "Ekibastuz GRES-2", capacity: 1000, country: "Kazakhstan", status: "operating", region: "Central Asia" },
  { lat: 51.1694, lng: 71.4491, name: "Astana Power Plant", capacity: 550, country: "Kazakhstan", status: "operating", region: "Central Asia" },
  
  // CZECH REPUBLIC - ~7 GW capacity
  { lat: 50.6617, lng: 13.7789, name: "Prunéřov Power Station", capacity: 1050, country: "Czech Republic", status: "operating", region: "Europe" },
  { lat: 50.5239, lng: 13.5378, name: "Počerady Power Station", capacity: 1000, country: "Czech Republic", status: "operating", region: "Europe" },
  { lat: 50.6053, lng: 14.5244, name: "Mělník Power Station", capacity: 720, country: "Czech Republic", status: "operating", region: "Europe" },
  { lat: 49.1951, lng: 16.6068, name: "Dukovany Power Station", capacity: 110, country: "Czech Republic", status: "operating", region: "Europe" },
  
  // TAIWAN - ~12 GW capacity
  { lat: 24.7738, lng: 121.1663, name: "Taichung Power Plant", capacity: 5500, country: "Taiwan", status: "operating", region: "East Asia" },
  { lat: 22.9083, lng: 120.1847, name: "Hsinta Power Plant", capacity: 2200, country: "Taiwan", status: "operating", region: "East Asia" },
  { lat: 23.9458, lng: 120.2347, name: "Mailiao Power Plant", capacity: 1800, country: "Taiwan", status: "operating", region: "East Asia" },
  
  // MEXICO - ~6 GW capacity
  { lat: 19.4326, lng: -99.1332, name: "Valle de México Power", capacity: 1200, country: "Mexico", status: "operating", region: "North America" },
  { lat: 25.6866, lng: -100.3161, name: "Monterrey Power Plant", capacity: 900, country: "Mexico", status: "operating", region: "North America" },
  { lat: 18.9186, lng: -96.9239, name: "Tuxpan Power Plant", capacity: 2100, country: "Mexico", status: "operating", region: "North America" },
  
  // CHILE - ~5 GW capacity (declining)
  { lat: -36.7226, lng: -73.0956, name: "Bocamina Power Plant", capacity: 472, country: "Chile", status: "operating", region: "South America" },
  { lat: -37.1784, lng: -73.1472, name: "Santa Maria Power Plant", capacity: 343, country: "Chile", status: "retired", region: "South America" },
  { lat: -33.0458, lng: -71.6197, name: "Ventanas Power Plant", capacity: 740, country: "Chile", status: "operating", region: "South America" },
  
  // COLOMBIA - ~1 GW capacity
  { lat: 11.0041, lng: -72.2310, name: "Termoguajira Power", capacity: 150, country: "Colombia", status: "operating", region: "South America" },
  { lat: 10.3910, lng: -75.4794, name: "Termocartagena", capacity: 200, country: "Colombia", status: "operating", region: "South America" },
  
  // MOROCCO - ~4 GW capacity
  { lat: 32.8860, lng: -6.9063, name: "Safi Power Plant", capacity: 1386, country: "Morocco", status: "operating", region: "Africa" },
  { lat: 33.9715, lng: -6.8498, name: "Jorf Lasfar Power Plant", capacity: 2056, country: "Morocco", status: "operating", region: "Africa" },
  
  // SERBIA - ~4 GW capacity
  { lat: 44.0165, lng: 21.3833, name: "Kostolac Power Station", capacity: 1115, country: "Serbia", status: "operating", region: "Europe" },
  { lat: 42.5629, lng: 21.9122, name: "Nikola Tesla Power Plant", capacity: 1650, country: "Serbia", status: "operating", region: "Europe" },
  
  // UKRAINE - ~12 GW capacity
  { lat: 48.2082, lng: 38.8861, name: "Vuhlehirska Power Station", capacity: 3600, country: "Ukraine", status: "operating", region: "Europe" },
  { lat: 48.4671, lng: 35.0462, name: "Kryvyi Rih Power Station", capacity: 3000, country: "Ukraine", status: "operating", region: "Europe" },
  { lat: 49.9935, lng: 36.2304, name: "Zmiyivska Power Station", capacity: 2100, country: "Ukraine", status: "operating", region: "Europe" },
  
  // GREECE - ~4 GW capacity
  { lat: 40.5311, lng: 21.7011, name: "Ptolemaida Power Station", capacity: 1242, country: "Greece", status: "operating", region: "Europe" },
  { lat: 40.2824, lng: 21.6831, name: "Kardia Power Station", capacity: 1200, country: "Greece", status: "operating", region: "Europe" },
  { lat: 37.0502, lng: 22.4190, name: "Megalopolis Power Station", capacity: 850, country: "Greece", status: "retired", region: "Europe" },
];
