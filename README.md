```markdown
# Beehive Monitoring API

## Introduction

The Beehive Monitoring API enables efficient management and monitoring of beehives, providing detailed information on hive status, humidity, temperature, weight, and bee flow. It supports secure user authentication and allows for comprehensive beehive management through its RESTful endpoints.

## Base URL

All API requests are made to the following base URL:
```
```
https://cscloud6-247.lnu.se/api-design/api/v1
```

## Authentication

To secure the API, we use JWT for authentication. Users must register and log in to obtain a token, which must be included in the request headers for accessing protected endpoints.

### Register

- **POST** `/auth/register`
  - Creates a new user account.
  - **Body**:
    ```json
    {
      "username": "desiredUsername",
      "password": "yourPassword"
    }
    ```

### Login

- **POST** `/auth/login`
  - Authenticates the user and returns a JWT.
  - **Body**:
    ```json
    {
      "username": "yourUsername",
      "password": "yourPassword"
    }
    ```

## Beehive Endpoints

### Create Hive

- **POST** `/create-hive` *(Authenticated)*
  - Creates a new beehive record.
  - **Body**:
    ```json
    {
      "hiveId": "hiveIdentifier",
      "name": "Hive Name",
      "location": "Hive Location",
      "measurements": [
        {
          "timestamp": "2023-03-30T10:00:00Z",
          "temperature": 35,
          "weight": 50.5,
          "humidity": 45
        }
      ],
      "beeFlow": [
        {
          "timestamp": "2023-03-30T10:00:00Z",
          "arrivals": 200,
          "departures": 150
        }
      ]
    }
    ```

### Get Hive Status

- **GET** `/hive-status/{hiveId}` *(Authenticated)*
  - Retrieves the status of a specified beehive.

### Get Hive Humidity

- **GET** `/hive-humidity?hiveId={hiveId}` *(Authenticated)*
  - Fetches humidity data for a specified hive.

### Get Hive Weight

- **GET** `/hive-weight?hiveId={hiveId}` *(Authenticated)*
  - Returns weight data for a specified hive.

### Get Hive Temperature

- **GET** `/hive-temperature?hiveId={hiveId}` *(Authenticated)*
  - Retrieves temperature data for a specified hive.

### Get Hive Flow

- **GET** `/hive-flow?hiveId={hiveId}` *(Authenticated)*
  - Fetches bee flow data for a specified hive.

### Update Hive

- **PUT** `/update-hive/{hiveId}` *(Authenticated)*
  - Updates information for a specified hive.
  - **Body**:
    ```json
    {
      "name": "Updated Name",
      "location": "Updated Location"
    }
    ```

### Delete Hive

- **DELETE** `/delete-hive/{hiveId}` *(Authenticated)*
  - Deletes a specified hive.

## Webhook Endpoints

### How to Test Webhook Functionality in Beehive Monitoring API

If you're utilizing the Beehive Monitoring API and want to set up and test webhooks, here's a simplified guide to help you through the process. This will allow you to see real-time notifications when certain events occur, such as the creation of a new beehive.

#### Setting Up Your Webhook:

1. **Choose a Webhook Testing Service:**
   - For the purpose of testing, I recommend using [Webhook.site](https://webhook.site). It provides you with a unique URL that will capture requests sent to it, making it perfect for testing webhook notifications without the need for server setup.

2. **Register a Webhook:**
   - With your Beehive Monitoring API, register a new webhook by sending a POST request to `/webhooks`.
   - In the request body, use the unique URL provided by Webhook.site as the `url` parameter, and specify the event you're interested in, for example, `"event": "newHiveCreated"`.
     ```json
     {
       "url": "https://webhook.site/<your-unique-id>",
       "event": "newHiveCreated"
     }
     ```

3. **Test the Webhook:**
   - Trigger the event you have subscribed to. If you subscribed to `newHiveCreated`, create a new beehive using the API.
   - Once the event occurs, Webhook.site will capture the webhook call, and you can review the data sent to the webhook URL in real-time on their website. This will confirm that your webhook is set up correctly and can receive events.

#### Confirming Webhook Receipt:

- After triggering the event, visit your unique Webhook.site URL to see the incoming webhook data.
- Webhook.site will display the payload, headers, and other request information, allowing you to verify that the webhook notification contains the expected information.


### Create Webhook

- **POST** `/webhooks`
  - Registers a new webhook.
  - **Body**:
    ```json
    {
      "url": "https://webhook.site/your-webhook-url",
      "event": "newHiveCreated"
    }
    ```

### Get All Webhooks

- **GET** `/webhooks`
  - Lists all registered webhooks.

### Delete Webhook

- **DELETE** `/webhooks/{webhookId}`
  - Removes a registered webhook.

## Testing with Postman

To test the API, import the Postman collection from the repo. "BEEHIVE API.postman_collection.json", follow these steps:

1. **Open Postman:** Launch the Postman application on your computer.

2. **Access Import Option:**
    - Click on the "Import" button located at the top left corner of the Postman interface. This opens a dialog where you can choose how to import your collection.

3. **Import the Collection:**
    - There are a few ways you can import your collection:
        - **File Upload:** Click on the "File" tab if it's not already selected. Then, click "Upload Files" and navigate to where your "BEEHIVE API.postman_collection.json" file is saved. Select it and open it to start the import process.
        - **Drag and Drop:** Alternatively, you can simply drag the JSON file from its location on your computer and drop it into the Postman window where it says "Drag and Drop".

4. **Complete the Import:**
    - After selecting the file, Postman will process it and show you a preview or an import summary. If everything looks correct, click "Import" to add the collection to your Postman workspace.

5. **Viewing Your Imported Collection:**
    - Once imported, the collection will appear in the left sidebar under the "Collections" tab. You can click on it to expand and view all the available requests.

6. **Using the Collection:**
    - To test an endpoint, click on one of the requests in the collection. This will open the request details where you can customize parameters, headers, and body as needed. Once ready, click the "Send" button to make the request and view the response from the API.

## Swagger Documentation

For an exhaustive guide to all our endpoints, parameters, and expected responses, visit our Swagger documentation page. It's a convenient way to explore and test our API in real-time.
    Swagger Docs: Access Here https://cscloud6-247.lnu.se/api-design/api/v1/docs/

