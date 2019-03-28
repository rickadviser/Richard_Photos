/* eslint-disable no-plusplus */

/*  Execute this file from the command line by typing:
 *    mysql -u root < schema.sql
 *  to execute the queries in this file.
 */
const faker = require('faker');
const photo_url = 'https://s3.us-east-2.amazonaws.com/ghrden01-rickadvisor/'

const generateHotelName = () => {
  const randomSuffixes = [
    'Hotel',
    'Inn',
    'Resort',
    'Lodge',
    'Deluxe',
    'Courtyard',
  ];

  return `${faker.address.city()} ${
    randomSuffixes[Math.floor(Math.random() * randomSuffixes.length)]
  }`;
}



-- Drop the database if it already exists
DROP DATABASE IF EXISTS rickadvisor;

-- Create database
CREATE DATABASE rickadvisor;

-- Use database
USE rickadvisor;

-- Create the tables
CREATE TABLE hotels (
  hotel_id SERIAL PRIMARY KEY,
  hotel_name VARCHAR(255);
);

CREATE TABLE photos (
  photo_id SERIAL PRIMARY KEY,
  hotel_id VARCHAR(255) REFERENCES hotels(hotel_id),
  lg_photo_url TEXT,
  sm_photo_url TEXT,
  photo_type TEXT,
);

-- Add seed data
const createHotels = () => {
  for (let i = 0; i < 99; i ++) {
    INSERT INTO hotels (hotel_name) VALUES (generateHotelName());
  };
}

INSERT INTO hotels (hotel_name) VALUES ('Stanley Hotel');

// loop through and insert Stanley Hotel exterior photos
for (let i = 401; i < 421; i++) {
  INSERT INTO photos (hotel_id, lg_photos_url, sm_photos_url, photo_type) VALUES (100, `${photo_url}${i}.png`, `${photo_url}${i+100}.png`, 'Exterior');
}; 
// insert Stanley Hotel Traveler photo
INSERT INTO photos (hotel_id, lg_photos_url, sm_photos_url, photo_type) VALUES (100, `${photo_url}604.png`, `${photo_url}654.png`, 'Traveler');
};

// insert Stanley Hotel Rooms & Suites photo
INSERT INTO photos (hotel_id, lg_photos_url, sm_photos_url, photo_type) VALUES (100, `${photo_url}601.png`, `${photo_url}651.png`, 'Rooms & Suites');
};

// insert Stanley Hotel exterior Panorama photo
INSERT INTO photos (hotel_id, lg_photos_url, sm_photos_url, photo_type) VALUES (100, `${photo_url}421.png`, `${photo_url}521.png`, 'Panorama');
};

// insert 25 random, 1 traveler, 1 rooms, and 1 other for each of the other 99 hotels
for (const hotels = 0; hotels < 99; hotels++) {
  var hotelPhotosDuplicateTracker = []
  while (hotelPhotosDuplicateTracker < 25) {
    const randomNumber = Math.floor(Math.random() * 70) + 1;
    // check for unique values 
    if (hotelPhotosDuplicateTracker.indexOf(randomNumber) === -1) {
      // add to duplicate checking array to prevent duplication
      hotelPhotosDuplicateTracker.push(randomNumber);
      const paddedNumber = ('00' + randomNumber).slice(-3);
      const smallNumber = 300 + randomNumber;
        INSERT INTO photos (hotel_id, lg_photos_url, sm_photos_url, photo_type) VALUES (hotels, `${photo_url}${paddedNumber}.png`, `${photo_url}{smallNumber}.png`, 'Exterior');
    }
  }

  var otherDuplicateTracker = []
  while (otherDuplicateTracker < 3) {
    const randomNumber = Math.floor(Math.random() * 8) + 701;
    // check for unique values 
    if (otherDuplicateTracker.indexOf(randomNumber) === -1) {
      // add to duplicate checking array to prevent duplication
      hotelPhotosDuplicateTracker.push(randomNumber);
    }
  }

  INSERT INTO photos (hotel_id, lg_photos_url, sm_photos_url, photo_type) VALUES (hotels, `${photo_url}${otherDuplicateTracker[0]}.png`, '', 'Traveler');

  INSERT INTO photos (hotel_id, lg_photos_url, sm_photos_url, photo_type) VALUES (hotels, `${photo_url}${otherDuplicateTracker[1]}.png`, '', 'Rooms & Suites');

  const otherOptions = ['Pool', 'Dining', 'Video', 'Panorama']
  const randomOption = Math.floor(Math.random() * 4) + 1;

  INSERT INTO photos (hotel_id, lg_photos_url, sm_photos_url, photo_type) VALUES (hotels, `${photo_url}${otherDuplicateTracker[2]}.png`, '', '{otherOptions(randomOption)}');
}
