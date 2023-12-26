const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const cors = require('cors');
const app = express();
const axios = require('axios');
const port = 8000;
app.use(bodyParser.json());
app.use(cors());
const commentapiUrl = 'https://jsonplaceholder.typicode.com/comments';


const allCitiesJson = 'indian-states-cities.json';

// trip planer json for pune city
const pune = {
  "tripPlans": [
    {
      "day": 1,
      "activities": [
        {
          "placeName": "Shaniwar Wada",
          "location": "Pune",
          "details": "Historic fortification. Explore the grand architecture and learn about its historical significance.",
          "time": "Morning",
          "meal": "Breakfast at local eatery",
          "image": "../../assets/img/shaniwarwada.jpg"
        },
        {
          "placeName": "Aga Khan Palace",
          "location": "Pune",
          "details": "Historical and architectural site. Admire the beautiful palace into its historical context.",
          "time": "Afternoon",
          "meal": "Lunch at Maharashtrian restaurant",
          "image": "../../assets/img/agakhanPune_Palace.jpg"
        },
        {
          "placeName": "Osho Ashram",
          "location": "Pune",
          "details": "Serenity and meditation. Experience tranquility at the Osho Ashram, a spiritual retreat.",
          "time": "Evening",
          "image": "../../assets/img/osho-ashram-pune-3887.jpg"
        }
      ],
      "nightStayOptions": [
        {
          "placeName": "Hotel ABC",
          "location": "Pune",
          "budget": 2500,
          "distanceFromBusStop": "3 km"
        },
        {
          "placeName": "Pune Adventure Camp",
          "location": "Pune",
          "budget": 1500,
          "details": "Camping with dinner and breakfast"
        }
      ]
    },
    {
      "day": 2,
      "activities": [
        {
          "placeName": "Sinhagad Fort",
          "location": "Pune",
          "details": "Trekking and panoramic views. Embark on a trek to Sinhagad Fort and enjoy breathtaking views of the surroundings.",
          "time": "Morning",
          "meal": "Breakfast on the fort or packed"
        },
        {
          "placeName": "Panshet Dam",
          "location": "Pune",
          "details": "Water activities. Indulge in water activities at Panshet Dam, offering a refreshing experience.",
          "time": "Afternoon",
          "meal": "Lunch at local dhaba"
        },
        {
          "placeName": "Parvati Hill",
          "location": "Pune",
          "details": "Sunset views. Enjoy the mesmerizing sunset views from Parvati Hill.",
          "time": "Evening",
          "meal": "Dinner at street food stall"
        }
      ],
      "nightStayOptions": [
        {
          "placeName": "Hotel XYZ",
          "location": "Pune",
          "budget": 3000,
          "distanceFromBusStop": "5 km"
        },
        {
          "placeName": "Government Guest House",
          "location": "Pune",
          "budget": 2000,
          "availability": "Subject to availability"
        }
      ]
    },
    {
      "day": 3,
      "activities": [
        {
          "placeName": "Saras Baug or Pu La Deshpande Garden",
          "location": "Pune",
          "details": "Visit famous gardens. Explore the beauty of Saras Baug or Pu La Deshpande Garden.",
          "time": "Morning",
          "meal": "Breakfast at nearby café"
        },
        {
          "placeName": "Laxmi Road Market",
          "location": "Pune",
          "details": "Shopping. Shop for local treasures at the bustling Laxmi Road market.",
          "time": "Afternoon",
          "meal": "Lunch at local eatery",
          "specialties": ["Thali"]
        },
        {
          "placeName": "Osho Teerth Park",
          "location": "Pune",
          "details": "Relaxation. Unwind amidst nature at Osho Teerth Park.",
          "time": "Evening",
          "meal": "Farewell dinner at fine-dining restaurant"
        }
      ],
      "nightStayOptions": [
        {
          "placeName": "Hotel LMN",
          "location": "Pune",
          "budget": 2800,
          "distanceFromBusStop": "2 km"
        },
        {
          "placeName": "Camping at Pawna Lake",
          "location": "Lonavala (Pune)",
          "budget": 1800,
          "details": "Includes dinner and breakfast"
        }
      ]
    }
  ],
  "estimatedBudget": {
    "hotel": 1000,
    "hostel": 1200,
    "fancyMeal": 1000,
    "food": 300
  },
  "highestBudgetOption": 5000,
  "additionalInformation": {
    "currency": "INR",
    "city": "Pune",
    "temprature": "27.24°C",
    "localLanguage": "Marathi",
    "currencyExchange": "1 USD = INR 83.14"
  },
  "localCuision": [
    "Misal Pav - A spicy and flavorful mixture of sprouts, spices, and crunchy farsan, topped with sev.",
    "Poha - Flattened rice cooked with onions, mustard seeds, and turmeric, garnished with coriander leaves.",
    "Bhakri with Thecha - Traditional Maharashtrian bread served with spicy chutney.",
    "Sabudana Khichdi - Tapioca pearls cooked with potatoes, peanuts, and spices."
  ],
  "highRatedRestaurants": [
    "Amanora The Fern - An Ecotel Hotel, Pune",
    "Royal Orchid Central",
    "The Central Park Hotel, Bund Garden Road, Agarkar Nagar",
    "Lemon Tree Premier City Center PuneOpens in new window"
  ],
  "suggestions": [
    "Use ride-sharing apps like Ola or Uber for convenient travel within the city.",
    "Take a heritage walk in the old Pune areas to soak in the historical charm.",
    "Visit Tulshi Baug for local shopping, known for its vibrant market",
    "For a serene evening, consider a boat ride in Khadakwasla Dam.",
    "Explore the nightlife in Koregaon Park for trendy cafes and pubs",
    "Pune has many Instagram-worthy spots. Keep your camera handy"
  ],

  "trivia": [
    {
      "question": "When is the best time to visit Pune?",
      "answer": "The best time to visit Pune October to June"
    },
    {
      "question": "What is the official language of Pune?",
      "answer": "The official language of Pune is Marathi."
    },
    {
      "question": "What is the ideal time for trekking to Sinhagad Fort without extreme weather conditions?",
      "answer": "The post-monsoon season, from September to November, is the ideal time for trekking to Sinhagad Fort."
    }
  ]

};

app.post('/api/itineraryData', (req, res) => {
  const receivedData = req.body;
  console.log('posted data :', receivedData);
  postData = receivedData;
  let respo = {};
  if (receivedData?.selectCity[0].toLowerCase() == 'pune') {
    respo = pune
  } 
  res.json({ message: 'Data received successfully', data: respo });
});

// comment api data
app.get('/api/comments', async (req, res) => {
  try {
    const commentApi = 'https://jsonplaceholder.typicode.com/comments';
    const response = await axios.get(commentApi);
    const responseData = response.data;

    res.json({ message: 'comment data received successfully', data: responseData });
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// for cities
app.get('/api/IND/states-cities', (req, res) => {
  fs.readFile(allCitiesJson, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading the file:', err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }

    try {
      const jsonData = JSON.parse(data);
      res.json(jsonData);
    } catch (error) {
      console.error('Error parsing JSON:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});