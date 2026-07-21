-- Datos de ejemplo para la tabla cars.
-- Correr después de la migración 0001_init.sql.
-- (En Supabase: SQL Editor, o `supabase db reset` en local.)

insert into public.cars
  (brand, model, version, year, km, price_usd, transmission, fuel, category, color, image_url, featured, status)
values
  ('Toyota', 'Hilux', 'SRX 2.8 TDI 4x4 AT', 2023, 32000, 48500, 'Automático', 'Diésel', 'Pick-up', 'Gris plata', 'https://images.unsplash.com/photo-1559416523-140ddc3d238c?auto=format&fit=crop&w=1200&q=70', true, 'disponible'),
  ('Volkswagen', 'Amarok', 'V6 Highline 3.0 TDI 4Motion', 2022, 45000, 42000, 'Automático', 'Diésel', 'Pick-up', 'Negro', 'https://images.unsplash.com/photo-1568844293986-8d0400bd4745?auto=format&fit=crop&w=1200&q=70', true, 'disponible'),
  ('BMW', 'X5', 'xDrive40i M Sport', 2021, 58000, 72000, 'Automático', 'Nafta', 'SUV', 'Blanco', 'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=1200&q=70', true, 'disponible'),
  ('Audi', 'A4', '2.0 TFSI S line', 2020, 61000, 35000, 'Automático', 'Nafta', 'Sedán', 'Gris', 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=1200&q=70', false, 'disponible'),
  ('Ford', 'Mustang', 'GT 5.0 V8', 2019, 40000, 58000, 'Manual', 'Nafta', 'Deportivo', 'Rojo', 'https://images.unsplash.com/photo-1584345604476-8ec5e12e42dd?auto=format&fit=crop&w=1200&q=70', true, 'disponible'),
  ('Chevrolet', 'Onix', '1.0 Turbo Premier AT', 2023, 18000, 19500, 'Automático', 'Nafta', 'Hatchback', 'Azul', 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=1200&q=70', false, 'disponible'),
  ('Mercedes-Benz', 'GLC', '300 4MATIC AMG Line', 2022, 34000, 68000, 'Automático', 'Nafta', 'SUV', 'Negro', 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=1200&q=70', false, 'disponible'),
  ('Volkswagen', 'Golf', 'GTI 2.0 TSI DSG', 2018, 72000, 27000, 'Automático', 'Nafta', 'Hatchback', 'Blanco', 'https://images.unsplash.com/photo-1517672651691-24622a91b550?auto=format&fit=crop&w=1200&q=70', false, 'reservado'),
  ('Toyota', 'Corolla', '2.0 XEI CVT', 2024, 9000, 31000, 'Automático', 'Nafta', 'Sedán', 'Gris plata', 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?auto=format&fit=crop&w=1200&q=70', true, 'disponible'),
  ('Porsche', '911', 'Carrera S', 2017, 48000, 125000, 'Automático', 'Nafta', 'Deportivo', 'Amarillo', 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=70', true, 'disponible'),
  ('Jeep', 'Compass', '1.3T Longitude AT', 2022, 41000, 33000, 'Automático', 'Nafta', 'SUV', 'Gris', 'https://images.unsplash.com/photo-1609521263047-f8f205293f24?auto=format&fit=crop&w=1200&q=70', false, 'disponible'),
  ('Ford', 'Ranger', 'Limited 3.2 TDI 4x4 AT', 2021, 55000, 39000, 'Automático', 'Diésel', 'Pick-up', 'Blanco', 'https://images.unsplash.com/photo-1605893477799-b99a3f8f2b98?auto=format&fit=crop&w=1200&q=70', false, 'disponible');
