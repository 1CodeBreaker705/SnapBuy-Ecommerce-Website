from enum import Enum

class MainCategory(str,Enum):
    ELECTRONICS = "ELECTRONICS"
    FASHION = "FASHION"
    HOME = "HOME"
    FOOD = "FOOD"
    BEAUTY = "BEAUTY"
    HEALTH = "HEALTH"
    SPORTS = "SPORTS"
    BOOKS = "BOOKS"
    KIDS = "KIDS"
    PETS = "PETS"
    AUTOMOTIVE = "AUTOMOTIVE"
    TOOLS = "TOOLS"
    OFFICE = "OFFICE"
    DIGITAL = "DIGITAL"
    GAMING = "GAMING"
    JEWELLERY = "JEWELLERY"
    TRAVEL = "TRAVEL"
    ART = "ART"
    MUSIC = "MUSIC"
    OTHER = "OTHER"
 
CATEGORY_MAP = {

    MainCategory.ELECTRONICS: [
        "PHONES",
        "SMARTPHONES",
        "FEATURE_PHONES",
        "LAPTOPS",
        "GAMING_LAPTOPS",
        "DESKTOPS",
        "MONITORS",
        "KEYBOARDS",
        "MOUSE",
        "HEADPHONES",
        "EARPHONES",
        "SPEAKERS",
        "SMARTWATCHES",
        "TABLETS",
        "CAMERAS",
        "PRINTERS",
        "PROJECTORS",
        "ROUTERS",
        "POWERBANKS",
        "CHARGERS",
        "CABLES",
        "MEMORY_CARDS",
        "PENDRIVES",
        "SSDS",
        "HARD_DISKS",
        "GRAPHIC_CARDS",
        "PROCESSORS",
        "MOTHERBOARDS",
        "RAM",
        "CPU_COOLERS",
        "MICROPHONES",
        "WEBCAMS",
        "DRONES",
        "VR_HEADSETS",
        "TVS",
        "AIRPODS",
        "GAMING_CONSOLES"
    ],

    MainCategory.FASHION: [
        "MEN_CLOTHING",
        "WOMEN_CLOTHING",
        "KIDS_CLOTHING",
        "TSHIRTS",
        "SHIRTS",
        "JEANS",
        "TROUSERS",
        "HOODIES",
        "JACKETS",
        "KURTAS",
        "SAREES",
        "LEHENGAS",
        "TOPS",
        "DRESSES",
        "SKIRTS",
        "TRACKPANTS",
        "SHORTS",
        "INNERWEAR",
        "SHOES",
        "SNEAKERS",
        "FORMAL_SHOES",
        "SLIPPERS",
        "SANDALS",
        "HEELS",
        "WATCHES",
        "SUNGLASSES",
        "HANDBAGS",
        "WALLETS",
        "BELTS",
        "CAPS",
        "JEWELLERY",
        "RINGS",
        "NECKLACES",
        "BRACELETS"
    ],

    MainCategory.HOME: [
        "FURNITURE",
        "SOFAS",
        "BEDS",
        "MATTRESSES",
        "TABLES",
        "CHAIRS",
        "WARDROBES",
        "HOME_DECOR",
        "CURTAINS",
        "CARPETS",
        "LIGHTING",
        "CLOCKS",
        "SHOWPIECES",
        "KITCHEN",
        "COOKWARE",
        "UTENSILS",
        "DINING",
        "STORAGE",
        "WATER_BOTTLES",
        "HOME_CLEANING",
        "BATHROOM_ACCESSORIES",
        "GARDENING"
    ],

    MainCategory.FOOD: [
        "SNACKS",
        "CHOCOLATES",
        "BISCUITS",
        "NOODLES",
        "PASTA",
        "RICE",
        "PULSES",
        "SPICES",
        "COOKING_OIL",
        "TEA",
        "COFFEE",
        "JUICES",
        "SOFT_DRINKS",
        "DRY_FRUITS",
        "BAKERY",
        "ORGANIC_FOOD",
        "PROTEIN_FOOD",
        "BABY_FOOD"
    ],

    MainCategory.BEAUTY: [
        "SKINCARE",
        "FACE_WASH",
        "MOISTURIZERS",
        "SERUMS",
        "SUNSCREEN",
        "MAKEUP",
        "FOUNDATION",
        "LIPSTICK",
        "EYELINER",
        "MASCARA",
        "HAIRCARE",
        "SHAMPOO",
        "CONDITIONER",
        "HAIR_OIL",
        "PERFUMES",
        "DEODORANTS",
        "TRIMMERS",
        "BEAUTY_TOOLS"
    ],

    MainCategory.HEALTH: [
        "VITAMINS",
        "SUPPLEMENTS",
        "PROTEIN_POWDER",
        "MASS_GAINERS",
        "MEDICAL_DEVICES",
        "THERMOMETERS",
        "BP_MONITORS",
        "GLUCOMETERS",
        "FIRST_AID",
        "MASKS",
        "SANITIZERS",
        "ORTHOPEDIC",
        "PERSONAL_CARE"
    ],

    MainCategory.SPORTS: [
        "GYM_EQUIPMENT",
        "DUMBBELLS",
        "BARBELLS",
        "BENCHES",
        "RESISTANCE_BANDS",
        "YOGA_MATS",
        "CRICKET",
        "FOOTBALL",
        "BASKETBALL",
        "BADMINTON",
        "TENNIS",
        "CYCLING",
        "RUNNING",
        "SWIMMING",
        "SPORTS_SHOES",
        "SPORTS_WEAR"
    ],

    MainCategory.BOOKS: [
        "FICTION",
        "NON_FICTION",
        "ACADEMIC",
        "ENGINEERING",
        "MEDICAL",
        "COMICS",
        "MANGA",
        "NOVELS",
        "SELF_HELP",
        "BUSINESS",
        "FINANCE",
        "PROGRAMMING",
        "COMPETITIVE_EXAMS",
        "CHILDREN_BOOKS",
        "RELIGIOUS_BOOKS"
    ],

    MainCategory.KIDS: [
        "TOYS",
        "REMOTE_CONTROL_TOYS",
        "SOFT_TOYS",
        "LEARNING_TOYS",
        "BABY_PRODUCTS",
        "DIAPERS",
        "BABY_CLOTHING",
        "BABY_CARE",
        "SCHOOL_SUPPLIES",
        "SCHOOL_BAGS",
        "WATER_BOTTLES"
    ],

    MainCategory.PETS: [
        "DOG_FOOD",
        "CAT_FOOD",
        "PET_TOYS",
        "PET_BEDS",
        "PET_GROOMING",
        "PET_ACCESSORIES",
        "PET_MEDICINE"
    ],

    MainCategory.AUTOMOTIVE: [
        "BIKE_ACCESSORIES",
        "CAR_ACCESSORIES",
        "HELMETS",
        "CAR_CLEANING",
        "ENGINE_OIL",
        "CAR_COVERS",
        "PHONE_HOLDERS",
        "TYRES"
    ],

    MainCategory.TOOLS: [
        "HAND_TOOLS",
        "POWER_TOOLS",
        "DRILLS",
        "CUTTING_TOOLS",
        "MEASURING_TOOLS",
        "SAFETY_EQUIPMENT",
        "TOOLBOXES"
    ],

    MainCategory.OFFICE: [
        "NOTEBOOKS",
        "PENS",
        "PRINTER_PAPER",
        "OFFICE_CHAIRS",
        "OFFICE_TABLES",
        "FILES_FOLDERS",
        "CALCULATORS",
        "WHITEBOARDS"
    ],

    MainCategory.DIGITAL: [
        "SOFTWARE",
        "COURSES",
        "EBOOKS",
        "DIGITAL_ART",
        "TEMPLATES",
        "PRESETS",
        "SUBSCRIPTIONS",
        "GIFT_CARDS"
    ],

    MainCategory.GAMING: [
        "PC_GAMES",
        "PLAYSTATION_GAMES",
        "XBOX_GAMES",
        "NINTENDO_GAMES",
        "GAMING_MOUSE",
        "GAMING_KEYBOARD",
        "GAMING_CHAIR",
        "GAME_CONTROLLERS"
    ],

    MainCategory.JEWELLERY: [
        "GOLD_JEWELLERY",
        "SILVER_JEWELLERY",
        "DIAMOND_JEWELLERY",
        "RINGS",
        "CHAIN",
        "EARRINGS",
        "BANGLES"
    ],

    MainCategory.TRAVEL: [
        "TROLLEY_BAGS",
        "BACKPACKS",
        "TRAVEL_ACCESSORIES",
        "PASSPORT_COVERS",
        "TRAVEL_PILLOWS"
    ],

    MainCategory.ART: [
        "PAINTINGS",
        "ART_SUPPLIES",
        "CANVAS",
        "BRUSHES",
        "SKETCHBOOKS"
    ],

    MainCategory.MUSIC: [
        "GUITARS",
        "KEYBOARDS",
        "DRUMS",
        "MICROPHONES",
        "STUDIO_EQUIPMENT"
    ],

    MainCategory.OTHER: [
        "MISCELLANEOUS"
    ]
}