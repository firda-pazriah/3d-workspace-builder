// Catalogue based on monis.rent (Bali), checked 2026-09-28. `id` is the
// product's slug on monis.rent and `weeklyPrice` is the listed "from" weekly
// price in USD, sale included. Desks use their 140 × 70 cm variant, the size
// modelled in the scene.
const MONIS = "https://www.monis.rent/products/";

// Cover photo of each product on monis.rent.
const IMAGES = "https://strapi.monis.rent/uploads/";

export const furnitureData = [
  // =========================
  // DESKS
  // =========================

  {
    id: "electrical-adjustable-desk",
    name: "Electrical Adjustable Desk",
    category: "desk",
    description:
      "Electric sit-stand desk, 70–118 cm height, quiet motor, 140 × 70 cm particleboard top on a steel frame.",
    image: `${IMAGES}desk_titel_new_3db151d44c.jpg`,
    weeklyPrice: 8.4,
    surfaceHeight: 1.95,
  },

  {
    id: "dual-motor-electric-standing-desk",
    name: "Dual-Motor Electric Standing Desk",
    category: "desk",
    description:
      "Dual motors on 3-stage columns, 120 kg load, 36 mm/s lift, 18 mm scratch-resistant 140 × 70 cm top.",
    image: `${IMAGES}Dual_Motor_Standing_Desk_8_9f364ae87f.jpg`,
    weeklyPrice: 14,
    surfaceHeight: 1.95,
  },

  // =========================
  // CHAIRS
  // =========================

  {
    id: "ergonomic-office-chair",
    name: "Ergonomic Office Chair",
    category: "chair",
    description:
      "Breathable mesh back, 4D armrests, adjustable headrest and lumbar support, reclining backrest, 5-star metal base.",
    image: `${IMAGES}fantech_oca259s_chair_6_b632a0c529.jpg`,
    weeklyPrice: 6.3,
  },

  // Listed in monis.rent's Chiang Mai catalogue (USD).
  {
    id: "ergonomic-chair-furradec-cm",
    name: "Ergonomic Chair Furradec",
    category: "chair",
    description:
      "Furradec Haru Plus with breathable mesh backrest, adjustable components and a slim modern frame.",
    image: `${IMAGES}Furradec_Haru_Plus_1_452a27fb44.jpg`,
    weeklyPrice: 10.4,
  },

  // =========================
  // MONITORS
  // =========================

  {
    id: "24-full-hd-office-monitor-a24i-2026",
    name: '24" Full HD Office Monitor A24i 2026',
    category: "monitor",
    description:
      "Xiaomi 23.8″ Fast IPS, 1920 × 1080, 144 Hz, 300 nits, 99% sRGB, HDMI and DisplayPort.",
    image: `${IMAGES}24_full_HD_office_monitor_a24i_2026_be9e6bf958.jpg`,
    weeklyPrice: 9,
  },

  {
    id: "27-4-k-multimedia-monitor",
    name: '27" 4K Multimedia Monitor',
    category: "monitor",
    description:
      "Redmi 27″ IPS, 3840 × 2160, 350 nits, 95% DCI-P3, HDR, USB-C or HDMI.",
    image: `${IMAGES}27_4_K_A27_U_Multitasking_Monitor_1_ce29d15357.jpg`,
    weeklyPrice: 12.75,
  },

  {
    id: "34-4-k-curved-monitor-180-hz",
    name: '34" Curved Gaming Monitor',
    category: "monitor",
    description:
      "Xiaomi curved 34″ ultrawide, 3440 × 1440, 180 Hz, 1 ms, 95% DCI-P3.",
    image: `${IMAGES}34_4_K_Gaming_Monitor_7_3f6b2ba627.jpg`,
    weeklyPrice: 18.4,
  },

  {
    id: "32-4-k-ergonomic-monitor",
    name: '32" QHD Ergonomic Monitor',
    category: "monitor",
    description:
      "LG Ergo 32″ QHD IPS on a desk-clamp arm, USB-C with 96 W charging, HDR10.",
    image: `${IMAGES}32_LG_Fine_Art_addtition_1_1c49831c40.jpg`,
    weeklyPrice: 20.8,
  },

  {
    id: "apple-studio-display",
    name: '27" 5K Apple Studio Display',
    category: "monitor",
    description:
      "27″ 5K Retina, 600 nits, P3, True Tone, 12 MP Center Stage camera, six speakers.",
    image: `${IMAGES}Apple_Studio_Display_6_94c6329a05.jpg`,
    weeklyPrice: 119,
  },

  // =========================
  // LAPTOPS
  // =========================

  {
    id: "apple-mac-book-neo",
    name: "Apple MacBook Neo",
    category: "laptop",
    description:
      "13″ Liquid Retina, A18 Pro, 8 GB memory, 256 GB SSD, up to 16 hours battery, aluminium.",
    image: `${IMAGES}Mac_Book_Neo_Silver_6_ceb2d1d671.jpg`,
    weeklyPrice: 25.6,
  },

  {
    id: "office-windows-laptop",
    name: '15" Office Windows Laptop',
    category: "laptop",
    description:
      "15″ touchscreen, 11th-gen Intel Core i3, 8 GB RAM, 256 GB SSD, Windows.",
    image: `${IMAGES}15_Office_Windows_Laptop_1_c1221bb234.jpg`,
    weeklyPrice: 24,
  },

  // =========================
  // KEYBOARDS
  // =========================

  {
    id: "logitech-mx-keyboard",
    name: "Logitech MX Keyboard",
    category: "keyboard",
    description:
      "Wireless full-size keyboard, Easy-Switch between 3 computers, 10 m range, 5-month battery.",
    image: `${IMAGES}Logitech_MX_keys_1_9977480ae1.jpg`,
    weeklyPrice: 7.2,
  },

  {
    id: "apple-magic-keyboard",
    name: "Apple Magic Keyboard",
    category: "keyboard",
    description:
      "Wireless Magic Keyboard with Touch ID and numeric keypad for Apple silicon Macs.",
    image: `${IMAGES}magic_keyboard_with_touch_id_1_7124075f1d.jpg`,
    weeklyPrice: 12,
  },

  // =========================
  // MICE
  // =========================

  {
    id: "logitech-mx-mouse",
    name: "Logitech M331 Silent Mouse",
    category: "mouse",
    description:
      "Quiet-click wireless mouse with Logi Bolt 2.4 GHz receiver, works with any OS.",
    image: `${IMAGES}mouse_side_M33_030834aea0.jpg`,
    weeklyPrice: 2,
  },

  {
    id: "logitech-mx-master-mouse-s3",
    name: "Logitech MX Master Mouse S3",
    category: "mouse",
    description:
      "Ergonomic wireless mouse, 8,000 DPI Darkfield sensor, 70 days per charge.",
    image: `${IMAGES}Logitech_S3_6_4cf1e523b8.jpg`,
    weeklyPrice: 4,
  },

  {
    id: "apple-magic-mouse",
    name: "Apple Magic Mouse",
    category: "mouse",
    description:
      "Wireless mouse with a Multi-Touch surface and automatic pairing.",
    image: `${IMAGES}Apple_Magic_Mouse_4_022f966524.jpg`,
    weeklyPrice: 9,
  },

  // =========================
  // LAMPS
  // =========================

  {
    id: "smart-led-desk-lamp-1-s",
    name: "Smart LED Desk Lamp 1S",
    category: "lamp",
    description:
      "520 lm, Ra 90, 2600–5000 K, four lighting modes, flicker-free, Wi-Fi and voice control.",
    image: `${IMAGES}Xiaomi_Mi_Led_Desk_Lamp_1_S_10_3777ddd163.jpg`,
    weeklyPrice: 3.2,
  },

  // =========================
  // SPEAKERS
  // =========================

  {
    id: "marshall-woburn-ii-bluetooth",
    name: "Marshall Woburn III Bluetooth",
    category: "speaker",
    description:
      "110 W home speaker, dual 5.25″ woofers and 1″ tweeters, Bluetooth 5.0, analog bass/treble knobs.",
    image: `${IMAGES}marshall_woburn_2_1_227171e0f8.jpg`,
    weeklyPrice: 19.2,
  },

  {
    id: "apple-home-pod",
    name: "Apple HomePod",
    category: "speaker",
    description:
      "2nd-gen HomePod with spatial audio, Siri, AirPlay 2 and a Matter/Thread smart-home hub.",
    image: `${IMAGES}Apple_homepod_1_4fe0a77250.jpg`,
    weeklyPrice: 19,
  },

  // =========================
  // COMPUTERS
  // =========================

  {
    id: "apple-mac-mini-m4",
    name: "Apple Mac Mini M4",
    category: "cpu",
    description:
      "M4 with 10-core CPU and GPU, 16 GB memory, 256 GB SSD, Thunderbolt 4, HDMI.",
    image: `${IMAGES}Mac_mini_M4_front_b152d10743.jpg`,
    weeklyPrice: 27.3,
  },

  {
    id: "apple-mac-mini-m2-new",
    name: "Apple Mac Mini M2",
    category: "cpu",
    description:
      "M2 with 8-core CPU and 10-core GPU, 8/16 GB memory, 256/512 GB SSD.",
    image: `${IMAGES}Apple_Mac_Mini_M2_6_1d4fce6808.jpg`,
    weeklyPrice: 39,
  },

  {
    id: "apple-mac-studio",
    name: "Apple Mac Studio",
    category: "cpu",
    description:
      "M1 Max or M2 Ultra, up to 64 GB memory and 1 TB SSD, 10 Gb Ethernet, SD card slot.",
    image: `${IMAGES}Mac_Studio_M1_6_7488521ebb.jpg`,
    weeklyPrice: 69,
  },

  // =========================
  // COFFEE
  // =========================

  {
    id: "nespresso-essenza-coffee-machine",
    name: "Nespresso Essenza Coffee Machine",
    category: "coffee_machine",
    description:
      "Compact capsule machine, 19-bar pump, 0.6 L tank, 25-second heat-up, espresso and lungo.",
    image: `${IMAGES}NESPRESSO_Essenza_Mini_2_4ea4cc0abc.jpg`,
    weeklyPrice: 9.6,
  },

  {
    id: "bosch-coffee-maker",
    name: "Bosch Coffee Maker",
    category: "coffee_machine",
    description:
      "Filter coffee maker, 1.4 L tank (10–15 cups), glass carafe, drip-stop, black finish.",
    image: `${IMAGES}Bosch_Drip_95f3cf0130.jpg`,
    weeklyPrice: 5,
  },

  // =========================
  // AIR CARE
  // =========================

  {
    id: "smart-air-purifier",
    name: "Smart Air Purifier",
    category: "air_care",
    description:
      "Covers 50 m², 5-layer filtration, UV-LED, CADR 443 m³/h, 32 dB sleep mode, app control.",
    image: `${IMAGES}Smart_Air_Purifier_6_5_bad4579786.jpg`,
    weeklyPrice: 11,
  },

  {
    id: "smart-air-purifier-elite",
    name: "Smart Air Purifier Elite",
    category: "air_care",
    description:
      "Covers 125 m², CADR 600 m³/h, UV-C + plasma, PM2.5/PM10 sensors, 20.2 dB sleep mode.",
    image: `${IMAGES}Xiaomi_Smart_Air_Purifier_Elite_1_90abdbb814.jpg`,
    weeklyPrice: 21,
  },

  {
    id: "smart-tower-fan",
    name: "Smart Tower Fan",
    category: "air_care",
    description:
      "Slim tower fan, 494 m³/h, 150° oscillation, 100 speed levels, 28.7 dB, app control.",
    image: `${IMAGES}Xiaomi_Smart_Tower_Fan_2_1_564cd4ec1e.jpg`,
    weeklyPrice: 8,
  },

  // =========================
  // FITNESS
  // =========================

  {
    id: "foldable-walk-pad",
    name: "Foldable Walking Pad R2 Pro",
    category: "fitness",
    description:
      "Kingsmith R2 Pro, 0.5–12 km/h, foldable handrail, remote control, quiet 918 W motor.",
    image: `${IMAGES}Walking_pad_new_05f1ab2d48.jpg`,
    weeklyPrice: 22.4,
  },

  {
    id: "home-spinning-bike-yesoul-S3",
    name: "Home Spinning Bike",
    category: "fitness",
    description:
      "Yesoul S3 smart exercise bike, magnetic resistance, Bluetooth, up to 120 kg.",
    image: `${IMAGES}Home_Spinning_Bike_4_45de07b098.jpg`,
    weeklyPrice: 24.65,
  },
];

export const getFurnitureItem = (id) =>
  furnitureData.find((item) => item.id === id) ?? null;

export const getSourceUrl = (item) => `${MONIS}${item.id}`;

const priceFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export const formatPrice = (value) => priceFormatter.format(value);
