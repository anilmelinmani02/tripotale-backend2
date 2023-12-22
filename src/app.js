// const express = require('express');
// const bodyParser = require('body-parser');
// const cors = require('cors');

// const app = express();
// const port = 3000;

// app.use(bodyParser.json());
// app.use(cors());
// let postData = [];

// app.post('/api/itineraryData', (req, res) => {
//     const receivedData = req.body;
//     console.log('Received data :', receivedData);  
//     postData = receivedData;
//     res.json({ message: 'Data received successfully', postData:postData });
//   });

//   app.get('/api/itineraryData', (req, res) => {
//     res.json(postData);
// });
// app.listen(port, () => {
//   console.log(`Server listening at http://localhost:${port}`);
// });

// ----------------------------------------------------------------------------------------------------------------------------


const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const cors = require('cors');
const app = express();
const port = 8000;
app.use(bodyParser.json());
app.use(cors());

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
    "climate": "Tropical wet and dry",
    "localLanguage": "Marathi",
    "currencyExchange": "Available at major banks and authorized centers",
    "triviaQuestion": "Best time to visit Pune is during winter (November to February)"
  },
  "localCuision":[
    "Misal Pav - A spicy and flavorful mixture of sprouts, spices, and crunchy farsan, topped with sev.",
    "Poha - Flattened rice cooked with onions, mustard seeds, and turmeric, garnished with coriander leaves.",
    "Bhakri with Thecha - Traditional Maharashtrian bread served with spicy chutney.", 
    "Sabudana Khichdi - Tapioca pearls cooked with potatoes, peanuts, and spices."
  ]
};

app.post('/api/itineraryData', (req, res) => {
    const receivedData = req.body;
    console.log('posted data :', receivedData);  
    postData = receivedData;
    let respo = {};
    if (receivedData?.selectCity[0].toLowerCase()=='pune') {
      respo = pune
    }else {
     respo = {} 
    }
    res.json({ message: 'Data received successfully',data :respo });
  });


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