-- Script to update upcoming_events table with missing fields and comprehensive event data
-- This script adds is_active and price_per_person fields and populates with all events

-- Step 1: Add missing columns to the upcoming_events table
ALTER TABLE upcoming_events 
ADD COLUMN IF NOT EXISTS is_active BOOLEAN DEFAULT true,
ADD COLUMN IF NOT EXISTS price_per_person DECIMAL(10,2),
ADD COLUMN IF NOT EXISTS duration VARCHAR(50),
ADD COLUMN IF NOT EXISTS destination VARCHAR(255),
ADD COLUMN IF NOT EXISTS itinerary JSONB,
ADD COLUMN IF NOT EXISTS included TEXT[],
ADD COLUMN IF NOT EXISTS excluded TEXT[],
ADD COLUMN IF NOT EXISTS created_at TIMESTAMPTZ DEFAULT NOW(),
ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT NOW();

-- Step 2: Clear existing data and insert comprehensive event data
DELETE FROM upcoming_events;

-- Step 3: Insert all events with complete information including prices
INSERT INTO upcoming_events (
  id, 
  title, 
  date, 
  description, 
  cover_image, 
  gallery_images, 
  category,
  price_per_person,
  duration,
  destination,
  itinerary,
  included,
  excluded,
  is_active
) VALUES
(
  'gorilla-trekking-4days',
  '4 Days Visit Rwanda with Double Gorilla Trekking Safari Experiences',
  '2024-07-15',
  'This trip takes you to the Volcanoes National Park, home to the Gorillas and have yourself a lifetime experience of trekking the mountain and Cultural experience at the Gorilla Guardian village plus city tour in Kigali on this 4 days'' tour, you will be using your own private safari jeep. Explore the lush landscapes, encounter majestic wildlife, and immerse yourself in the rich Rwandan culture. Our expert guides will ensure a safe and memorable journey, providing insights into the local flora, fauna, and traditions. This package is perfect for adventure seekers and nature lovers looking for an authentic African experience.',
  '/images/upcoming/gorrila1.webp',
  ARRAY['/images/upcoming/gorrila1.webp','/images/upcoming/gorrila2.png','/images/upcoming/gorrila3.jpg','/images/upcoming/volca1.jpg'],
  'Popular Gorilla Trekking',
  4608.00,
  '4 Days',
  'Volcanoes National Park',
  '[
    {"day": 1, "title": "Arrival in Kigali & City Tour", "description": "Arrive at Kigali International Airport, meet your guide, and transfer to your hotel. In the afternoon, embark on a city tour of Kigali, visiting key sites such as the Kigali Genocide Memorial, local markets, and art galleries to get a feel for Rwanda''s capital."},
    {"day": 2, "title": "Transfer to Volcanoes NP & Cultural Village", "description": "After breakfast, enjoy a scenic drive to Musanze, the gateway to Volcanoes National Park. Check into your lodge and in the afternoon, visit the Iby''Iwacu Cultural Village (now Gorilla Guardian Village) for an immersive experience of Rwandan traditions, dance, and local lifestyle."},
    {"day": 3, "title": "Gorilla Trekking Experience", "description": "An early start for a briefing at the park headquarters. Then, venture into the forest with experienced trackers to find a mountain gorilla family. Spend a magical hour observing these gentle giants in their natural habitat. Return to the lodge for relaxation."},
    {"day": 4, "title": "Second Gorilla Trek or Golden Monkeys & Departure", "description": "Choose between a second gorilla trek (permit extra) or a trek to see the playful golden monkeys. Alternatively, you can opt for a Dian Fossey hike. In the afternoon, drive back to Kigali for your departure flight."}
  ]'::jsonb,
  ARRAY[
    'Private 4x4 safari jeep with pop-up roof for game viewing',
    'Experienced English-speaking driver-guide',
    '2 Gorilla permits per person ($1500 each)',
    'Gorilla Guardian Village cultural visit',
    'Accommodation and meals as per itinerary (Full Board)',
    'Park entrance fees',
    'Bottled water in the vehicle'
  ],
  ARRAY[
    'International flights and Rwandan visa',
    'Travel insurance',
    'Personal expenses (souvenirs, laundry, etc.)',
    'Tips and gratuities for guides and staff',
    'Optional activities not mentioned in the itinerary'
  ],
  true
),
(
  'chimpanzee-trek-10days',
  '10-Day Discounted Rwanda Gorilla & Chimpanzee Trek Safari',
  '2024-08-20',
  'This trip takes you to experience the authentic Rwanda and her beauty from the wildlife safaris of Akagera park and the sunset boat cruise, Kigali city tours, you will trek chimpanzees, canopy walk adventure and tea experience in Nyungwe Forest National Park, Visit Lake Kivu, coffee experience, have a life time experience.',
  'https://via.placeholder.com/300x200/B8860B/001934?text=Chimpanzee+Trek',
  ARRAY[
    'https://via.placeholder.com/800x600/B8860B/001934?text=Chimp+1',
    'https://via.placeholder.com/800x600/001934/B8860B?text=Chimp+2',
    'https://via.placeholder.com/800x600/B8860B/001934?text=Chimp+3'
  ],
  'Luxury Safaris',
  3986.00,
  '10 Days',
  'Akagera NP, Nyungwe NP, Lake Kivu',
  '[
    {"day": 1, "title": "Arrival & Kigali City Tour", "description": "Arrival in Kigali, transfer to hotel, city tour."},
    {"day": 2, "title": "Akagera National Park Safari", "description": "Morning game drive and afternoon boat cruise in Akagera."},
    {"day": 3, "title": "Transfer to Nyungwe Forest", "description": "Drive to Nyungwe, prepare for chimpanzee trek."},
    {"day": 4, "title": "Chimpanzee Trekking & Canopy Walk", "description": "Chimpanzee trek in Nyungwe, followed by a canopy walk."},
    {"day": 5, "title": "Tea Experience & Lake Kivu", "description": "Visit a tea plantation, then transfer to Lake Kivu for relaxation."},
    {"day": 6, "title": "Lake Kivu Activities", "description": "Boat trip on Lake Kivu, visit coffee plantations."},
    {"day": 7, "title": "Transfer to Volcanoes NP", "description": "Scenic drive to Musanze, near Volcanoes National Park."},
    {"day": 8, "title": "Gorilla Trekking", "description": "Unforgettable gorilla trekking experience."},
    {"day": 9, "title": "Golden Monkey Trek / Cultural Tour", "description": "Trek golden monkeys or visit a local community."},
    {"day": 10, "title": "Departure", "description": "Drive back to Kigali for departure."}
  ]'::jsonb,
  ARRAY[
    'Accommodation',
    'Meals',
    'Park fees',
    'Permits (Gorilla, Chimpanzee)',
    'Safari vehicle',
    'Guide'
  ],
  ARRAY[
    'Flights',
    'Visas',
    'Insurance',
    'Personal items'
  ],
  true
),
(
  'cultural-immersion-5days',
  '5-Day Rwanda Cultural Immersion & Lake Kivu Retreat',
  '2024-09-10',
  'Immerse yourself in Rwandan culture with visits to local communities, historical sites, and relax by the beautiful Lake Kivu.',
  'https://via.placeholder.com/300x200/001934/B8860B?text=Culture+Kivu',
  ARRAY[
    'https://via.placeholder.com/800x600/001934/B8860B?text=Culture1',
    'https://via.placeholder.com/800x600/B8860B/001934?text=Kivu1'
  ],
  'Family Packages',
  1850.00,
  '5 Days',
  'Kigali, Nyanza, Lake Kivu',
  '[
    {"day": 1, "title": "Arrival & Kigali Exploration", "description": "Arrival in Kigali, transfer to hotel, city tour."},
    {"day": 2, "title": "Southern Province Cultural Tour", "description": "Visit the King''s Palace Museum in Nyanza and Murambi Genocide Memorial."},
    {"day": 3, "title": "Transfer to Lake Kivu & Relaxation", "description": "Drive to Lake Kivu, enjoy the lakefront and optional water activities."},
    {"day": 4, "title": "Community Visit & Coffee Experience", "description": "Explore local communities around Lake Kivu, learn about traditional crafts and coffee making."},
    {"day": 5, "title": "Departure", "description": "Morning at leisure, drive back to Kigali for departure."}
  ]'::jsonb,
  ARRAY[
    'Accommodation',
    'Meals',
    'Cultural site entries',
    'Transport',
    'Guide'
  ],
  ARRAY[
    'Drinks',
    'Tips',
    'Personal items'
  ],
  true
),
(
  'akagera-wildlife-3days',
  '3-Day Akagera National Park Wildlife Safari',
  '2024-10-05',
  'A short but intense safari experience in Akagera National Park, home to the Big Five and various wildlife species.',
  'https://via.placeholder.com/300x200/B8860B/001934?text=Akagera',
  ARRAY[
    'https://via.placeholder.com/800x600/B8860B/001934?text=Akagera1',
    'https://via.placeholder.com/800x600/001934/B8860B?text=Akagera2'
  ],
  'Group Tours',
  1200.00,
  '3 Days',
  'Akagera National Park',
  '[
    {"day": 1, "title": "Arrival & Game Drive", "description": "Transfer to Akagera NP, afternoon game drive."},
    {"day": 2, "title": "Full Day Safari & Boat Cruise", "description": "Morning game drive, afternoon boat cruise on Lake Ihema."},
    {"day": 3, "title": "Morning Game Drive & Departure", "description": "Final morning game drive, then return to Kigali."}
  ]'::jsonb,
  ARRAY[
    'Park entry fees',
    'Game drives',
    'Boat cruise',
    'Accommodation',
    'Meals',
    'Transport'
  ],
  ARRAY[
    'Drinks',
    'Personal expenses'
  ],
  true
),
(
  'honeymoon-kivu-7days',
  '7-Day Romantic Rwanda Honeymoon Retreat in Lake Kivu',
  '2024-11-15',
  'A perfect blend of relaxation and soft adventure for honeymooners, focusing on the serene beauty of Lake Kivu.',
  'https://via.placeholder.com/300x200/001934/B8860B?text=Honeymoon+Kivu',
  ARRAY[
    'https://via.placeholder.com/800x600/001934/B8860B?text=Honeymoon1',
    'https://via.placeholder.com/800x600/B8860B/001934?text=KivuSunset'
  ],
  'Honeymoon Packages',
  2500.00,
  '7 Days',
  'Lake Kivu',
  '[
    {"day": 1, "title": "Arrival & Kivu Transfer", "description": "Arrive in Kigali, direct transfer to a luxury resort on Lake Kivu."},
    {"day": 2, "title": "Lake Exploration", "description": "Relax by the lake, optional boat trip or kayaking."},
    {"day": 3, "title": "Coffee & Culture Tour", "description": "Visit a local coffee plantation and cultural sites around the lake."},
    {"day": 4, "title": "Relaxation Day", "description": "Enjoy resort amenities, spa treatments, or simply relax."},
    {"day": 5, "title": "Optional Activities", "description": "Choose from fishing, nature walks, or a visit to a local island."},
    {"day": 6, "title": "Sunset Cruise & Romantic Dinner", "description": "Evening sunset boat cruise followed by a private dinner."},
    {"day": 7, "title": "Departure", "description": "Morning leisure, then transfer back to Kigali for departure."}
  ]'::jsonb,
  ARRAY[
    'Luxury accommodation',
    'Romantic meals',
    'Lake activities',
    'Transport',
    'Guide'
  ],
  ARRAY[
    'Flights',
    'Spa treatments',
    'Personal expenses'
  ],
  true
),
(
  'volcanoes-golden-monkeys-2days',
  '2-Day Golden Monkey Trekking & Twin Lakes Visit',
  '2024-12-01',
  'A quick yet rewarding trip to Volcanoes National Park for golden monkey trekking and exploration of the beautiful Twin Lakes.',
  'https://via.placeholder.com/300x200/B8860B/001934?text=Golden+Monkey',
  ARRAY[
    'https://via.placeholder.com/800x600/B8860B/001934?text=GoldenMonkey1',
    'https://via.placeholder.com/800x600/001934/B8860B?text=TwinLakes'
  ],
  'Solo Tour Packages',
  950.00,
  '2 Days',
  'Volcanoes National Park, Twin Lakes',
  '[
    {"day": 1, "title": "Transfer & Golden Monkey Trek", "description": "Morning transfer to Musanze, afternoon golden monkey trekking."},
    {"day": 2, "title": "Twin Lakes & Departure", "description": "Visit the Twin Lakes (Burera and Ruhondo), then return to Kigali."}
  ]'::jsonb,
  ARRAY[
    'Accommodation',
    'Meals',
    'Permit',
    'Transport',
    'Guide'
  ],
  ARRAY[
    'Flights',
    'Personal expenses'
  ],
  true
);

-- Step 4: Create an index for better performance
CREATE INDEX IF NOT EXISTS idx_upcoming_events_is_active ON upcoming_events(is_active);
CREATE INDEX IF NOT EXISTS idx_upcoming_events_category ON upcoming_events(category);
CREATE INDEX IF NOT EXISTS idx_upcoming_events_date ON upcoming_events(date);

-- Step 5: Add a trigger to update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_upcoming_events_updated_at 
    BEFORE UPDATE ON upcoming_events 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Step 6: Verify the data
SELECT 
    id, 
    title, 
    price_per_person, 
    duration, 
    category, 
    is_active,
    created_at
FROM upcoming_events 
ORDER BY created_at DESC; 