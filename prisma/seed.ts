import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const categories = [
  // Construction & Site Work
  {
    nameEn: "Mason",
    nameHi: "राजमिस्त्री",
    icon: "🧱",
    sector: "Construction"
  },
  {
    nameEn: "Carpenter",
    nameHi: "बढ़ई",
    icon: "🔨",
    sector: "Construction"
  },
  {
    nameEn: "Electrician",
    nameHi: "बिजली मिस्त्री",
    icon: "⚡",
    sector: "Construction"
  },
  {
    nameEn: "Plumber",
    nameHi: "प्लंबर",
    icon: "🔧",
    sector: "Construction"
  },
  {
    nameEn: "Welder",
    nameHi: "वेल्डर",
    icon: "🔥",
    sector: "Construction"
  },
  {
    nameEn: "Painter",
    nameHi: "पेंटर",
    icon: "🎨",
    sector: "Construction"
  },
  {
    nameEn: "Tile Layer",
    nameHi: "टाइल मिस्त्री",
    icon: "🏗️",
    sector: "Construction"
  },
  {
    nameEn: "Site Helper / Labourer",
    nameHi: "सहायक मज़दूर",
    icon: "👷",
    sector: "Construction"
  },

  // Household Services
  {
    nameEn: "Domestic Help",
    nameHi: "घरेलू सहायक",
    icon: "🏠",
    sector: "Household"
  },
  {
    nameEn: "Cook",
    nameHi: "रसोइया",
    icon: "👨‍🍳",
    sector: "Household"
  },
  {
    nameEn: "Babysitter / Nanny",
    nameHi: "आया",
    icon: "👶",
    sector: "Household"
  },
  {
    nameEn: "Elderly Caretaker",
    nameHi: "बुजुर्ग देखभाल",
    icon: "👴",
    sector: "Household"
  },
  {
    nameEn: "Driver",
    nameHi: "ड्राइवर",
    icon: "🚗",
    sector: "Household"
  },
  {
    nameEn: "Gardener",
    nameHi: "माली",
    icon: "🌱",
    sector: "Household"
  },
  {
    nameEn: "Sweeper / Cleaner",
    nameHi: "सफाईकर्मी",
    icon: "🧹",
    sector: "Household"
  },
  {
    nameEn: "Pest Control Worker",
    nameHi: "कीट नियंत्रण",
    icon: "🐛",
    sector: "Household"
  },

  // Maintenance & Repairs
  {
    nameEn: "AC Technician",
    nameHi: "एसी तकनीशियन",
    icon: "❄️",
    sector: "Maintenance"
  },
  {
    nameEn: "Refrigerator / Washing Machine Technician",
    nameHi: "फ्रिज / वाशिंग मशीन तकनीशियन",
    icon: "🔧",
    sector: "Maintenance"
  },
  {
    nameEn: "RO / Water Purifier Technician",
    nameHi: "आरओ / वाटर प्यूरिफायर तकनीशियन",
    icon: "💧",
    sector: "Maintenance"
  },
  {
    nameEn: "Appliance Repair Mechanic",
    nameHi: "उपकरण मरम्मत मैकेनिक",
    icon: "🔨",
    sector: "Maintenance"
  },
  {
    nameEn: "Mobile Repair Technician",
    nameHi: "मोबाइल मरम्मत तकनीशियन",
    icon: "📱",
    sector: "Maintenance"
  },
  {
    nameEn: "CCTV Installer",
    nameHi: "सीसीटीवी इंस्टॉलर",
    icon: "📹",
    sector: "Maintenance"
  },
  {
    nameEn: "Lift Technician",
    nameHi: "लिफ्ट तकनीशियन",
    icon: "🛗",
    sector: "Maintenance"
  },

  // Factory / Industrial Work
  {
    nameEn: "Machine Operator",
    nameHi: "मशीन ऑपरेटर",
    icon: "⚙️",
    sector: "Factory"
  },
  {
    nameEn: "CNC Operator",
    nameHi: "सीएनसी ऑपरेटर",
    icon: "🏭",
    sector: "Factory"
  },
  {
    nameEn: "Fitter",
    nameHi: "फिटर",
    icon: "🔧",
    sector: "Factory"
  },
  {
    nameEn: "Quality Checker",
    nameHi: "गुणवत्ता जांचकर्ता",
    icon: "✅",
    sector: "Factory"
  },
  {
    nameEn: "Loader / Unloader",
    nameHi: "लोडर / अनलोडर",
    icon: "📦",
    sector: "Factory"
  },
  {
    nameEn: "Packing Helper",
    nameHi: "पैकिंग सहायक",
    icon: "📦",
    sector: "Factory"
  },
  {
    nameEn: "Forklift Operator",
    nameHi: "फोर्कलिफ्ट ऑपरेटर",
    icon: "🚜",
    sector: "Factory"
  },

  // Transportation & Delivery
  {
    nameEn: "Auto Driver",
    nameHi: "ऑटो ड्राइवर",
    icon: "🛺",
    sector: "Transportation"
  },
  {
    nameEn: "Cab Driver (Ola/Uber)",
    nameHi: "कैब ड्राइवर (ओला/उबर)",
    icon: "🚕",
    sector: "Transportation"
  },
  {
    nameEn: "Truck Driver (Heavy Vehicle)",
    nameHi: "ट्रक ड्राइवर (भारी वाहन)",
    icon: "🚛",
    sector: "Transportation"
  },
  {
    nameEn: "Delivery Boy (Food / Courier)",
    nameHi: "डिलीवरी बॉय (खाना / कूरियर)",
    icon: "🛵",
    sector: "Transportation"
  },
  {
    nameEn: "Tempo Driver",
    nameHi: "टेम्पो ड्राइवर",
    icon: "🚐",
    sector: "Transportation"
  },

  // Hospitality & Cleaning
  {
    nameEn: "Hotel Cleaning Staff",
    nameHi: "होटल सफाई कर्मचारी",
    icon: "🧹",
    sector: "Hospitality"
  },
  {
    nameEn: "Waiter / Steward",
    nameHi: "वेटर / स्टीवर्ड",
    icon: "🍽️",
    sector: "Hospitality"
  },
  {
    nameEn: "Kitchen Helper",
    nameHi: "रसोई सहायक",
    icon: "👨‍🍳",
    sector: "Hospitality"
  },
  {
    nameEn: "Housekeeping",
    nameHi: "हाउसकीपिंग",
    icon: "🛏️",
    sector: "Hospitality"
  },
  {
    nameEn: "Dishwashing Staff",
    nameHi: "बर्तन धोने वाला",
    icon: "🍽️",
    sector: "Hospitality"
  },

  // Office & Commercial Support
  {
    nameEn: "Office Boy / Peon",
    nameHi: "ऑफिस बॉय / चपरासी",
    icon: "🏢",
    sector: "Office"
  },
  {
    nameEn: "Security Guard",
    nameHi: "सिक्यूरिटी गार्ड",
    icon: "🛡️",
    sector: "Office"
  },
  {
    nameEn: "Reception Assistant",
    nameHi: "रिसेप्शन असिस्टेंट",
    icon: "📞",
    sector: "Office"
  },
  {
    nameEn: "Courier Staff",
    nameHi: "कूरियर कर्मचारी",
    icon: "📮",
    sector: "Office"
  },
  {
    nameEn: "Data Entry Operator",
    nameHi: "डेटा एंट्री ऑपरेटर",
    icon: "💻",
    sector: "Office"
  },

  // Skilled Artisans & Miscellaneous
  {
    nameEn: "Tailor / Stitching Worker",
    nameHi: "दर्जी / सिलाई कार्यकर्ता",
    icon: "✂️",
    sector: "Miscellaneous"
  },
  {
    nameEn: "Shoemaker / Cobbler",
    nameHi: "मोची",
    icon: "👞",
    sector: "Miscellaneous"
  },
  {
    nameEn: "Barber / Hairdresser",
    nameHi: "नाई / हेयरड्रेसर",
    icon: "✂️",
    sector: "Miscellaneous"
  },
  {
    nameEn: "Mehendi Artist",
    nameHi: "मेहंदी कलाकार",
    icon: "✋",
    sector: "Miscellaneous"
  },
  {
    nameEn: "Beautician (Basic)",
    nameHi: "ब्यूटीशियन (बेसिक)",
    icon: "💄",
    sector: "Miscellaneous"
  },
  {
    nameEn: "Event Setup Labour",
    nameHi: "इवेंट सेटअप मजदूर",
    icon: "🎪",
    sector: "Miscellaneous"
  },
  {
    nameEn: "Vehicle Washer",
    nameHi: "वाहन धोने वाला",
    icon: "🚗",
    sector: "Miscellaneous"
  }
];

async function main() {
  console.log('Start seeding categories...');
  
  for (const category of categories) {
    await prisma.category.create({
      data: {
        nameEn: category.nameEn,
        nameHi: category.nameHi,
        icon: category.icon,
        sector: category.sector,
      },
    });
  }
  
  console.log('Seeding finished.');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
