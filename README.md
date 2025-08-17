# Bookinguru
Implement a backend service that will integrate data from an external API and return processed results according to specific business rules.

## Setup Instructions

1. Clone the repository:
   ```bash
   git clone <repo-url>
   cd <repo-folder>

2. Create a .env file from the provided example:
   ```bash
   cp .env.example .env

   Update the .env file with:

   * BASE_URL → Mock API base URL
   * USERNAME → mock api username
   * PASSWORD → mock api password

3. Install dependencies:
   ```bash
   npm install

4. Run the server:
   ```bash
   npm start

The API will now be available at:
```bash
http://localhost:3000
```
## API Usage
```bash
GET /cities?country=PL&page=1&limit=10


