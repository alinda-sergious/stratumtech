insert into cars (
  id, name, short_description, detailed_description, main_image, gallery_images, price_per_day, capabilities, specifications
) values
(
  'toyota-land-cruiser-v8',
  'Toyota Land Cruiser V8',
  'Premium 4WD for safari adventures and rough terrain.',
  'The Toyota Land Cruiser V8 is a legendary off-road vehicle, renowned for its durability, comfort, and unparalleled capability. Whether you''re navigating city streets or exploring Rwanda''s most challenging terrains, the Land Cruiser V8 offers a smooth, powerful, and secure ride. Its spacious interior, advanced safety features, and robust V8 engine make it the perfect choice for families, adventure groups, and VIP transport. Experience luxury and ruggedness combined.',
  '/images/vehicles/land4.jpg',
  ARRAY['/images/vehicles/land5.jpg','/images/vehicles/land6.jpg','/images/vehicles/land7.jpg','/images/vehicles/land8.jpg'],
  '$250/day',
  '[{"icon":"users","text":"7 Passengers"},{"icon":"fuel","text":"Diesel"},{"icon":"settings","text":"Automatic"},{"icon":"snowflake","text":"Air Conditioned"}]'::jsonb,
  '{"model":"SUV","year":2022,"doors":4,"color":"Pearl White","seats":7,"transmission":"Automatic","engine":"4.5L V8 Turbo Diesel","fuelType":"Diesel"}'::jsonb
),
(
  'land-rover-range-rover',
  'Land Rover Range Rover',
  'Premium luxury SUV for unparalleled comfort and versatile performance.',
  'Experience the pinnacle of luxury and capability with the Land Rover Range Rover. This iconic SUV offers a supremely comfortable ride, advanced technology, and robust off-road prowess, making it perfect for executive travel, family adventures, or exploring Rwanda''s diverse landscapes in style. Its opulent interior, intuitive infotainment, and powerful engine ensure every journey is an indulgence. Equipped with advanced safety features and a refined automatic transmission, it delivers a smooth and secure drive on any terrain.',
  '/images/vehicles/range.PNG',
  ARRAY['/images/vehicles/range1.PNG'],
  '$450/day',
  '[{"icon":"users","text":"4-5 Passengers"},{"icon":"fuel","text":"Petrol"},{"icon":"settings","text":"Automatic"},{"icon":"wind","text":"Climate Control"},{"icon":"briefcase","text":"Luxury & Executive Travel"}]'::jsonb,
  '{"model":"SUV","year":2020,"doors":5,"color":"Santorini Black","seats":5,"transmission":"Automatic","engine":"5.0L Supercharged V8","fuelType":"Petrol"}'::jsonb
),
(
  'kia-sportage',
  'Kia Sportage',
  'Stylish and versatile compact SUV, ideal for city and comfortable adventures.',
  'The Kia Sportage offers a compelling blend of modern design, comfortable interiors, and reliable performance, making it a perfect choice for navigating both city streets and more adventurous routes in Rwanda. Its spacious cabin accommodates up to five passengers with ample luggage room, ensuring a pleasant journey for families or small groups. Equipped with a responsive engine and smooth automatic transmission, the Sportage delivers an enjoyable driving experience, complemented by essential safety features and climate control for comfort.',
  '/images/vehicles/sportage.jpg',
  ARRAY['/images/vehicles/sportage.jpg','/images/vehicles/sportage1.jpg','/images/vehicles/sportage3.jpg','/images/vehicles/sportage4.jpg','/images/vehicles/sportage5.jpg','/images/vehicles/sportage6.jpg','/images/vehicles/sportage7.jpg'],
  '$100/day',
  '[{"icon":"users","text":"5 Passengers"},{"icon":"fuel","text":"Petrol"},{"icon":"settings","text":"Automatic"},{"icon":"road","text":"City & Highway Driving"}]'::jsonb,
  '{"model":"SUV","year":2014,"doors":5,"color":"Grey Metallic","seats":5,"transmission":"Automatic","engine":"2.0L Petrol","fuelType":"Petrol"}'::jsonb
),
(
  'mercedes-benz-g-class',
  'Mercedes-Benz G-Class (G-Wagon)',
  'Iconic luxury SUV combining rugged capability with unparalleled sophistication.',
  'The Mercedes-Benz G-Class, famously known as the G-Wagon, stands as a symbol of uncompromising luxury and legendary off-road prowess. Its distinctive, timeless design houses a highly refined interior featuring premium materials and cutting-edge technology. Perfect for making a statement, executive travel, or tackling challenging terrains in Rwanda, the G-Wagon delivers a powerful and commanding drive with unmatched comfort and prestige. Equipped with advanced safety systems and a sophisticated all-wheel-drive system, it ensures a secure and exhilarating journey.',
  '/images/vehicles/g-wagon.jpg',
  ARRAY['/images/vehicles/g-wagon.jpg','/images/vehicles/g-wagon1.jpg','/images/vehicles/g-wagon2.jpg','/images/vehicles/g-wagon4.jpg'],
  '$600/day',
  '[{"icon":"users","text":"5 Passengers"},{"icon":"fuel","text":"Petrol"},{"icon":"settings","text":"Automatic"},{"icon":"shield","text":"4MATIC All-Wheel Drive"},{"icon":"briefcase","text":"Luxury & Executive Travel"}]'::jsonb,
  '{"model":"Luxury SUV","year":2020,"doors":5,"color":"Obsidian Black","seats":5,"transmission":"9-speed Automatic","engine":"4.0L Bi-Turbo V8","fuelType":"Petrol"}'::jsonb
),
(
  'mercedes-benz-c-class',
  'Mercedes-Benz C-Class Sedan',
  'Elegant compact luxury sedan offering comfort, style, and a refined driving experience.',
  'The Mercedes-Benz C-Class combines sophisticated design with dynamic performance, making it an ideal choice for business travelers, couples, or individuals seeking a premium driving experience in Rwanda. Its meticulously crafted interior offers comfort and advanced features, while its responsive engine and smooth automatic transmission ensure a pleasurable journey whether navigating city streets or cruising on highways. Experience the renowned Mercedes-Benz luxury and reliability in this stylish sedan.',
  '/images/vehicles/benzc.jpg',
  ARRAY['/images/vehicles/benzc.jpg','/images/vehicles/benzc1.jpg','/images/vehicles/benzc2.jpg','/images/vehicles/benzc3.jpg','/images/vehicles/benzc4.jpg','/images/vehicles/benzc6.jpg'],
  '$150/day',
  '[{"icon":"users","text":"4-5 Passengers"},{"icon":"fuel","text":"Petrol"},{"icon":"settings","text":"Automatic"},{"icon":"wind","text":"Climate Control"},{"icon":"briefcase","text":"Executive & City Driving"}]'::jsonb,
  '{"model":"Sedan","year":2012,"doors":4,"color":"Polar White","seats":5,"transmission":"Automatic","engine":"1.8L Turbo Petrol","fuelType":"Petrol"}'::jsonb
),
(
  'toyota-corolla-hatchback',
  'Toyota Corolla Hatchback',
  'Economical and reliable hatchback, perfect for city commutes and small trips.',
  'The Toyota Corolla Hatchback is renowned for its exceptional fuel efficiency, legendary reliability, and easy maneuverability, making it an ideal choice for navigating Kigali''s urban landscape and short excursions. Its compact size belies a surprisingly spacious interior for up to five passengers, providing comfort for daily errands or quick getaways. With a dependable engine and user-friendly features, this Corolla offers a practical and cost-effective solution for your transportation needs in Rwanda.',
  '/images/vehicles/col1c.jpg',
  ARRAY['/images/vehicles/col.jpg','/images/vehicles/col1.jpg'],
  null,
  null,
  null
); 