# Node.js CRUD API Documentation

This document provides a detailed overview of a Node.js CRUD API for managing tasks. The API uses Express.js for routing, MongoDB for data storage, and additional middleware for enhanced functionality.

## Table of Contents
1. [Installation](#installation)
2. [Configuration](#configuration)
3. [Endpoints](#endpoints)
   - [GET /](#get-)
   - [POST /tasks](#post-tasks)
   - [GET /tasks](#get-tasks)
   - [GET /tasks/:id](#get-tasksid)
   - [PUT /tasks/:id](#put-tasksid)
   - [DELETE /tasks/:id](#delete-tasksid)
4. [Middleware](#middleware)
5. [Error Handling](#error-handling)
6. [Starting the Server](#starting-the-server)

## Installation

To install and run the project, follow these steps:

1. Clone the repository:
    ```sh
    git clone <repository-url>
    cd <repository-directory>
    ```

2. Install the required dependencies:
    ```sh
    npm install
    ```

3. Ensure MongoDB is running on your local machine or set up a connection to a remote MongoDB instance.

## Configuration

This project requires a connection to a MongoDB database. The connection setup is managed in the `connect` module. Ensure your MongoDB URI is correctly set in this module.

## Endpoints

### GET /

**Description:**  
Returns a welcome message indicating the API's purpose.


