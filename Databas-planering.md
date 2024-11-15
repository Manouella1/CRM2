# ER Diagram

```
+-------------+         +-----------+        +----------+         +----------------+         +------------+
|  Company    |1      n | Customer  |1      n| Contact_Log |1      n|   Offer       |n       1|   Tag      |
+-------------+---------+-----------+--------+------------+--------+----------------+---------+------------+
| id (PK)     |         | id (PK)   |        | id (PK)   |        | id (PK)       |         | id (PK)    |
| name        |         | company_id (FK)    | customer_id (FK)   | company_id (FK)|         | name       |
| email       |         | name       |        | date      |        | type          |         |            |
| password    |         | phone      |        | type      |        | content       |         +------------+
+-------------+         | address    |        | note      |        | send_date     |
                        | email      |        +------------+        +----------------+
                        +-----------+

        |                                              |
        |                                              |1
        | n                                            |
+---------------+                          +--------------+
| Customer_Tag  |                          |   Send_Log   |
+---------------+                          +--------------+
| customer_id (FK) |                       | id (PK)      |
| tag_id (FK)      |                       | offer_id (FK)|
+---------------+                          | customer_id (FK) |
                                           | send_status |
                                           +--------------+
```

# Company (Företag)

\* Representerar företaget som använder CRM-systemet. Företagets information, som namn, e-post och lösenord, lagras här. \* Relation: Ett företag kan ha flera kunder, men varje kund är kopplad till ett företag.

# Customer (Kund)

\* Representerar varje kund som tillhör ett företag, med information som namn, telefonnummer, adress och e-post. \* Relation: Varje kund tillhör ett företag (company_id) och kan ha flera interaktioner (Contact_Log) samt få utskick via Offer/Newsletter.

# Contact_Log (Kommunikationslogg)

\* Loggar interaktioner mellan företaget och kunden, inklusive datum, typ av interaktion (samtal, e-post) och en anteckning om vad som diskuterades. \* Relation: Varje loggpost är kopplad till en specifik kund.

# Offer/Newsletter (Utskick)

\* Representerar erbjudanden eller nyhetsbrev som företaget skickar ut till sina kunder. \* Kolumner: \* type: Specificerar om det är ett nyhetsbrev eller erbjudande. \* content: Innehållet i utskicket. \* send_date: När utskicket är planerat att skickas. \* Relation: Varje utskick är kopplat till företaget som skickar det och registreras i Send_Log för att hålla koll på vilka kunder som har fått det.

# Send_Log (Utskickslogg)

\* En logg för att hålla koll på när och till vilka kunder ett specifikt utskick har skickats. \* Kolumner: \* send_status: Status för utskicket (skickat/ej skickat eller misslyckades). \* Relation: Varje loggpost är kopplad till en specifik kund och ett specifikt utskick.

# Tag (Tagg)

\* Används för att märka eller kategorisera kunder för att möjliggöra segmentering och filtrering.

# Customer_Tag (KundTagg)

\* Mellantabell som kopplar taggar med kunder, vilket gör det möjligt för ett företag att tilldela flera taggar till en kund och för en tagg att kopplas till flera kunder.

# Systemet

\* Kontohantering för företag: Varje företag kan skapa ett konto och logga in med en unik uppsättning inloggningsuppgifter. När de är inloggade får de tillgång till sina specifika kunder och kan hantera utskick.

\* Kundhantering: Varje företag kan lägga till, redigera och söka efter sina kunder, samt kategorisera dem med hjälp av taggar för enkel segmentering.

\* Utskick av erbjudanden och nyhetsbrev: Företaget kan skapa erbjudanden och nyhetsbrev och välja att skicka dem till alla kunder eller en specifik kund (genom Send_Log). Send_Log hjälper till att hålla reda på vilka kunder som har mottagit ett specifikt utskick, vilket också möjliggör uppföljning.

\* Interaktionslogg: Contact_Log används för att logga alla kommunikationer och interaktioner mellan företaget och kunden, vilket gör det enkelt att se historiken för varje kund
