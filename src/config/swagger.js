import swaggerJsdoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Event Ticket Booking API",
      version: "1.0.0",
      description:
        "REST API for Event Ticket Booking and Reservation System",
    },

    servers: [
      {
        url: "http://localhost:5000/api/v1",
        description: "Local Server",
      },
    ],

    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },

    security: [
      {
        bearerAuth: [],
      },
    ],
  },

  apis: [
    "./src/routes/*.js",
  ],
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;