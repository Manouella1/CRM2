-- Ta bort tabellerna om de redan finns
DROP TABLE IF EXISTS send_Log CASCADE;

DROP TABLE IF EXISTS customer_Tag CASCADE;

DROP TABLE IF EXISTS contact_Log CASCADE;

DROP TABLE IF EXISTS offer CASCADE;

DROP TABLE IF EXISTS customer CASCADE;

DROP TABLE IF EXISTS tag CASCADE;

DROP TABLE IF EXISTS company CASCADE;

-- 1. Skapa Company-tabellen
CREATE TABLE
  company (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL
  );

-- 2. Skapa Customer-tabellen (efter Company)
CREATE TABLE
  customer (
    id SERIAL PRIMARY KEY,
    company_id INTEGER REFERENCES Company (id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    address VARCHAR(255),
    email VARCHAR(255) UNIQUE
  );

-- 3. Skapa Tag-tabellen
CREATE TABLE
  tag (id SERIAL PRIMARY KEY, name VARCHAR(100) NOT NULL);

-- 4. Skapa Contact_Log-tabellen.
CREATE TABLE
  contact_Log (
    id SERIAL PRIMARY KEY,
    customer_id INTEGER REFERENCES Customer (id) ON DELETE CASCADE,
    date DATE NOT NULL,
    type VARCHAR(50),
    note TEXT
  );

-- 5. Skapa Offer-tabellen
CREATE TABLE
  offer (
    id SERIAL PRIMARY KEY,
    company_id INTEGER REFERENCES Company (id) ON DELETE CASCADE,
    type VARCHAR(100),
    content TEXT,
    send_date DATE
  );

-- 6. Skapa Customer_Tag-tabellen
CREATE TABLE
  customer_Tag (
    customer_id INTEGER REFERENCES Customer (id) ON DELETE CASCADE,
    tag_id INTEGER REFERENCES Tag (id) ON DELETE CASCADE,
    PRIMARY KEY (customer_id, tag_id)
  );

-- 7. Skapa Send_Log-tabellen
CREATE TABLE
  send_Log (
    id SERIAL PRIMARY KEY,
    offer_id INTEGER REFERENCES Offer (id) ON DELETE CASCADE,
    customer_id INTEGER REFERENCES Customer (id) ON DELETE CASCADE,
    send_status VARCHAR(50)
  );

--- lite test data
INSERT INTO
  company (name, email, password)
VALUES
  (
    'Tech Solutions CRM2  ',
    'info@techsolutions.com',
    'password123'
  ),
  (
    'Future Vision LLC',
    'contact@futurevision.com',
    'vision2023'
  );

INSERT INTO
  customer (company_id, name, phone, address, email)
VALUES
  (
    1,
    'Alice Andersson',
    '0701234567',
    'Main Street 10, Gothenburg',
    'alice@example.com'
  ),
  (
    1,
    'Bob Eriksson',
    '0709876543',
    'Second Avenue 5, Stockholm',
    'bob@example.com'
  ),
  (
    2,
    'Charlie Svensson',
    '0731234567',
    'Third Boulevard 8, Malmo',
    'charlie@example.com'
  );

INSERT INTO
  tag (name)
VALUES
  ('VIP'),
  ('Potential Lead'),
  ('Recurring Customer');

INSERT INTO
  contact_log (customer_id, date, type, note)
VALUES
  (
    1,
    '2024-10-01',
    'Email',
    'Sent welcome email to Alice.'
  ),
  (
    2,
    '2024-10-05',
    'Phone Call',
    'Discussed potential collaboration with Bob.'
  ),
  (
    3,
    '2024-10-10',
    'Meeting',
    'Met Charlie to present new offers.'
  );

INSERT INTO
  offer (company_id, type, content, send_date)
VALUES
  (
    1,
    'Discount',
    'Get 10% off on our new services.',
    '2024-10-15'
  ),
  (
    2,
    'Special Offer',
    'Exclusive deal for returning customers.',
    '2024-10-20'
  );

INSERT INTO
  customer_tag (customer_id, tag_id)
VALUES
  (1, 1), -- Alice är VIP
  (2, 2), -- Bob är potentiell lead
  (3, 3);

-- Charlie är återkommande kund customer
INSERT INTO
  send_log (offer_id, customer_id, send_status)
VALUES
  (1, 1, 'Sent'), -- Sent offer 1 to Alice
  (1, 2, 'Failed'), -- Failed to send offer 1 to Bob
  (2, 3, 'Sent');
